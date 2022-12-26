import Vue from 'vue'

const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  true,
  // Only include .vue files
  /\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const arr = fileName.split('/')
  const _fileName = arr[arr.length - 1].replace(/\.\w+$/, '')
  const componentName = _fileName.charAt(0).toUpperCase() + _fileName.slice(1)

  Vue.component(componentName, componentConfig.default || componentConfig)
})
