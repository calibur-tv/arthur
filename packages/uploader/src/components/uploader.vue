<template>
  <div ref="elRef" class="uploader" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileRename from 'filepond-plugin-file-rename'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import lang from 'filepond/locale/zh-cn.js'

FilePond.setOptions(lang)
FilePond.registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileRename
)

const elRef = ref(null)

onMounted(() => {
  const pond = FilePond.create(elRef.value, {
    allowMultiple: false,
    allowRevert: false
  })
  $axios.get(`${BASE_URL}v1/desk/upload_token`).then((res) => {
    const data = res.data
    pond.setOptions({
      fileRenameFunction: (file) => {
        return `${Date.now()}-${Math.random()
          .toString(36)
          .substring(3, 6)}${file.extension}`
      },
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // fieldName is the name of the input field
          // file is the actual file object to send
          const formData = new FormData()
          formData.append('name', file.name)
          formData.append('key', data.dir + '${filename}')
          formData.append('policy', data.policy)
          formData.append('OSSAccessKeyId', data.accessid)
          formData.append('success_action_status', 200)
          formData.append('callback', data.callback)
          formData.append('signature', data.signature)
          formData.append('file', file, file.name)

          const request = new XMLHttpRequest()
          request.open('POST', data.host)

          // Should call the progress method to update the progress to 100% before calling load
          // Setting computable to false switches the loading indicator to infinite mode
          request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total)
          }

          // Should call the load method when done and pass the returned server file id
          // this server file id is then used later on when reverting or restoring a file
          // so your server knows which file to return without exposing that info to the client
          request.onload = function() {
            if (request.status >= 200 && request.status < 300) {
              // the load method accepts either a string (id) or an object
              load(request.responseText)
            } else {
              // Can call the error method if something is wrong, should exit after
              error('oh no')
            }
          }

          request.send(formData)

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              request.abort()

              // Let FilePond know the request has been cancelled
              abort()
            }
          }
        }
      }
    })
  })
})
</script>

<style lang="scss">
.uploader {
  width: 300px;
  //height: 84px;

  .filepond {
    &--root {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }
  }

  /* use a hand cursor intead of arrow for the action buttons */
  .filepond--file-action-button {
    cursor: pointer;
  }

  /* the text color of the drop label*/
  .filepond--drop-label {
    color: #555;
  }

  /* underline color for "Browse" button */
  .filepond--label-action {
    text-decoration-color: #aaa;
  }

  /* the background color of the filepond drop area */
  .filepond--panel-root {
    background-color: #eee;
  }

  /* the border radius of the drop area */
  .filepond--panel-root {
    border-radius: 0.5em;
  }

  /* the border radius of the file item */
  .filepond--item-panel {
    border-radius: 0.5em;
  }

  /* the background color of the file and file panel (used when dropping an image) */
  .filepond--item-panel {
    background-color: #555;
  }

  /* the background color of the drop circle */
  .filepond--drip-blob {
    background-color: #999;
  }

  /* the background color of the black action buttons */
  .filepond--file-action-button {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* the icon color of the black action buttons */
  .filepond--file-action-button {
    color: white;
  }

  /* the color of the focus ring */
  .filepond--file-action-button:hover,
  .filepond--file-action-button:focus {
    box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
  }

  /* the text color of the file status and info labels */
  .filepond--file {
    color: white;
  }

  /* error state color */
  [data-filepond-item-state*='error'] .filepond--item-panel,
  [data-filepond-item-state*='invalid'] .filepond--item-panel {
    background-color: red;
  }

  [data-filepond-item-state='processing-complete'] .filepond--item-panel {
    background-color: green;
  }

  /* bordered drop area */
  .filepond--panel-root {
    background-color: #edf0f4;
  }

  .filepond--credits {
    display: none;
  }
}
</style>
