# settings-editor

> An editor for settings in JSON format

## ❓Why ?

We use [standard-settings](https://github.com/soixantecircuits/standard-settings) a lot.
Actually we use it in every nodeJS and electron project.

Sometimes, we need a non-developer humans to change the settings in production.  
This an alternative to `ssh` + `vim`

## 🌍 Installation

`yarn`


## ⚙ Configuration

```
cp settings/settings.default.json settings/settings.json
```

And edit settings.json,  
change the `filepath` value to a path of a settings file that you want
to be available for web editing.


You can also change settings with argv parameters.
Learn more about this on [standard-settings](https://github.com/soixantecircuits/standard-settings)




## 👋 Usage

```
yarn run dev
```

## Full Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

## 🕳 Troubleshooting

Ask emmanuel on soixantecircuits.slack.com

## ❤️ Contribute

Please do!

---

This project was generated with [electron-vue](https://github.com/soixantecircuits/electron-vue)@[1c165f7](https://github.com/soixantecircuits/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://soixantecircuits.gitbooks.io/electron-vue/content/index.html).
