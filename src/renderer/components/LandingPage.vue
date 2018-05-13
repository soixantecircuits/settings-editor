<template>
  <div id="landing-page">
    <img class="vue-logo" v-if="settings.useLogo" src="./../assets/logo.svg">
    <div class="vue-json-form">
      <h1>Settings <code>{{settings.filepath}}</code></h1>
      <Button type="primary" :loading="isSaving" @click="save">Save</Button>
      <!--<Input v-model="jsonString" type="textarea" :autosize="true" placeholder="JSON..."></Input>
      <br><br>
      <Button type="primary" @click="jsonToForm">Convert JSON to Form</Button>
      <br><br><br>
      <Button type="primary" @click="formToJSON">Convert Form to JSON</Button>
      <Button type="primary" @click="clear">Clear</Button>
      <br><br>-->
      <json-form ref="form" :label-width="200" v-model="data"></json-form>
      <Button type="primary" :loading="isSaving" @click="save">Save</Button>
    </div>
    <Modal
        v-model="errorModal"
        title="Error">
      <p>
        {{error}}
      </p>
    </Modal>
  </div>
</template>

<script>
  import JsonForm from './JsonForm'
  import settings from '@/lib/settings'
  let fs
  if (!settings.useSpacebro) {
    fs = require('fs')
  }

  export default {
    name: 'landing-page',
    components: {
      JsonForm
    },
    data () {
      return {
        jsonString: '',
        settings: settings,
        isSaving: false,
        data: {
          aString: 'this is a string',
          aNumber: 99,
          aNumberArray: [
            1, 2, 3
          ],
          aStringArray: [
            'a', 'b', 'c'
          ],
          anObject: {
            aStringInObj: 'this is a string in an Object',
            aNumberInObj: 0
          },
          aNull: null
        },
        errorModal: false,
        error: ''
      }
    },
    spacebroEvents: {
      connect: function () {
        this.getSettings()
      }
    },
    created () {
      let vm = this
      if (!settings.useSpacebro) {
        fs.readFile(settings.filepath, 'utf-8', (err, data) => {
          if (err) {
            console.log('An error ocurred reading the file :' + err.message)
            return
          }

          // console.log('The file content is : ' + data)
          vm.data = JSON.parse(data)
        })
      } else {
        this.getSettings()
      }
    },
    methods: {
      getSettings () {
        let vm = this
        this.$spacebro.emit('getSettings', {path: settings.filepath}, function (data) {
          console.log(data)
          vm.data = JSON.parse(data.content)
        })
      },
      jsonToForm () {
        try {
          this.data = JSON.parse(this.jsonString)
        } catch (e) {
          this.error = 'Invalid JSON!'
          this.errorModal = true
        }
      },
      formToJSON () {
        try {
          this.jsonString = ''
          this.jsonString = JSON.stringify(this.data, null, 4)
        } catch (e) {
          this.error = 'Connot convert to JSON!'
          this.errorModal = true
        }
      },
      save () {
        this.isSaving = true
        let vm = this
        this.formToJSON()
        if (this.jsonString) {
          if (!settings.useSpacebro) {
            fs.writeFile(settings.filepath, this.jsonString, (error) => {
              if (error) {
                this.error = 'Cannot write to file!'
                this.errorModal = true
              }
              setTimeout(function () {
                vm.isSaving = false
              }, 500)
            })
          } else {
            this.$spacebro.emit('writeSettings', {path: settings.filepath, content: this.jsonString}, function (data) {
              if (data.error) {
                this.error = 'Cannot write to file!'
                this.errorModal = true
              }
              setTimeout(function () {
                vm.isSaving = false
              }, 500)
            })
          }
        }
      },
      reset () {
        this.$refs['form'].reset()
      },
      clear () {
        this.$refs['form'].clear()
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .vue-logo {
    display: block;
    margin: 0 auto;
    height: 3em;
  }

  .vue-json-form {
    display: block;
    margin: 0 auto;
    width: 60%;
  }
</style>
