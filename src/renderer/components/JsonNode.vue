<template>
  <div>
    <div v-if="isArray(internalValue)">
      <Collapse v-model="collapseValue">
        <Panel>
          {{prop}}
          <Poptip
              confirm
              title="Delete this?"
              @on-ok="sendDeleteEvent">
            <Button class="delete-button" type="ghost" shape="circle" icon="close-round" size="small"></Button>
          </Poptip>
          <p slot="content">
            <template v-for="(item, index) in internalValue">
              <json-node
                :prop="index.toString()"
                v-model="internalValue[index]"
                v-on:delete-this-node="removeNode(index)"
              ></json-node>
            </template>
            <Button class="add-button" type="dashed" icon="plus" @click="addValue"></Button>
          </p>
        </Panel>
      </Collapse>
    </div>
    <div v-else-if="isObject(internalValue)">
      <Collapse v-model="collapseValue">
        <Panel isActive=true>
          {{prop}}
          <Button class="delete-value-button" type="dashed" icon="minus" size="small" @click.stop.prevent="sendDeleteEvent"></Button>
          <p slot="content">
            <template v-for="(subvalue, subprop) in internalValue">
              <json-node :prop="subprop" v-model="internalValue[subprop]"></json-node>
            </template>
          </p>
        </Panel>
      </Collapse>
    </div>
    <div v-else-if="isString(internalValue)">
      <Form-item :label="prop">
        <Input v-model="internalValue" :placeholder="internalValue"></Input>
      </Form-item>
    </div>
    <div v-else-if="isNumber(internalValue)">
      <Form-item :label="prop" class="switch">
        <Input-number
          v-model="internalValue"
          :step="settings.numberStep || 1"
        >
        </Input-number>
      </Form-item>
    </div>
    <div v-else-if="isBoolean(internalValue)">
      <Form-item :label="prop" class="switch">
        <i-switch v-model="internalValue" size="large">
          <span slot="open">true</span>
          <span slot="close">false</span>
        </i-switch>
      </Form-item>
    </div>
    <div v-else>
      <Form-item :label="prop">
        {{internalValue}}
      </Form-item>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import settings from '@/lib/settings'

  export default {
    name: 'json-node',
    data () {
      return {
        settings,
        collapseValue: '0',
        internalValue: this.value
      }
    },
    props: {
      prop: [String, Number],
      value: null
    },
    components: {
      'json-node': this
    },
    watch: {
      value: function (newValue) {
        this.internalValue = newValue
      },
      internalValue: function (newValue) {
        this.$emit('input', newValue)
      }
    },
    methods: {
      add (params) {
        var name = params.name
        var type = params.type

        const nameToNew = {
          Array: [],
          Object: {},
          String: '',
          Number: 0,
          Boolean: false
        }

        var newItem = nameToNew[type]

        if (this.isArray(this.value)) {
          this.value.push(newItem)
        } else if (this.isObject(this.value)) {
          Vue.set(this.value, name, newItem)
        }
      },
      addValue () {
        const tpl = Object.assign({}, this.internalValue[(this.internalValue.length - 1)])
        console.log(tpl)
        this.value.push(tpl)
      },
      removeNode (index) {
        this.value.splice(index, 1)
      },
      sendDeleteEvent () {
        this.$emit('delete-this-node')
      },
      isArray (value) {
        return Array.isArray(value)
      },
      isObject (value) {
        return (!(Array.isArray(value)) &&
                !(value === null) &&
                (typeof value === 'object'))
      },
      isString (value) {
        return typeof value === 'string'
      },
      isNumber (value) {
        return typeof value === 'number'
      },
      isBoolean (value) {
        return typeof value === 'boolean'
      },
      isNull (value) {
        return value === null
      }
    }
  }
</script>

<style scoped>
  .switch {
    //display: inline-block;
    text-align: left;
  },

  .delete-button {
    margin: auto;
  },

  .add-button {
    /*margin-top: 10px;*/
  }

  Collapse {
    margin-bottom: 10px;
  }

</style>
