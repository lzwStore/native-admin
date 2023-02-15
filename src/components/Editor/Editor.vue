<template>
  <TinymceEditor
    :id="id"
    v-model:value="tinymceContent"
    :init="initOptions"
    :disabled="disabled"
  />
</template>

<script lang="ts" setup>
import appStore from '@/store/index'
import { v4 as uuidv4 } from 'uuid'
// Docs: https://www.tiny.cloud/docs/advanced/usage-with-module-loaders/
// Import TinyMCE
import 'tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
import { plugins, toolbar } from './config'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: uuidv4()
  },
  toolbar: {
    type: Array,
    default: () => {
      return []
    }
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table'
  },
  height: {
    type: [String, Number],
    default: '660px'
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['input'])

const { config } = appStore()

const tinymceContent = computed(() => {
  return props.value
})
const disabled = computed(() => props.disabled)

const dataMap = reactive({
  fullscreen: true,
  containerWidth: () => {
    const width = props.width
    // Test matches `100`, `'100'`
    if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
      return `${width}px`
    }
    return width
  }
})

const BASE_URL = import.meta.env.VITE_PUBLIC
console.log('BASE_URL', import.meta.env, BASE_URL)

const initOptions = ref(
  {
    selector: `#${props.id}`,
    height: props.height,
    body_class: 'panel-body',
    object_resizing: false,
    resize: true,
    toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
    menubar: props.menubar,
    plugins,
    language_url: `${BASE_URL}/tinymce/langs/${config.$state.config.type}.js`,
    language: 'zh_CN',
    skin_url: `${BASE_URL}/tinymce/skins/ui/oxide`,
    content_css: `${BASE_URL}/tinymce/skins/ui/oxide/content.min.css`,
    emoticons_database_url: `${BASE_URL}/tinymce/emojis.min.js`,
    end_container_on_empty_block: true,
    powerpaste_word_import: 'clean',
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: 'square',
    advlist_number_styles: 'default',
    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
    default_link_target: '_blank',
    link_title: false,
    // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
    nonbreaking_force_tab: true,
    // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
    // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
    convert_urls: false,
    init_instance_callback: (editor: any) => {
      if (props.value) {
        editor.setContent(props.value)
      }
      editor.on('NodeChange Change KeyUp SetContent', () => {
        emit('input', editor.getContent())
      })
    },
    images_upload_handler: (blobInfo: any, success: Function, failure: Function) => {
      const img = 'data:image/jpeg;base64,' + blobInfo.base64()
      console.log('图片上传处理：', img)
      success(img)
    },
    setup: (editor: any) => {
      editor.on('FullscreenStateChanged', (e: any) => {
        dataMap.fullscreen = e.state
      })
    }
  }
)

</script>

<style scoped>
</style>
