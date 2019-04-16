<template>
  <div class="upload">
    <div class="file" name="upload" @click="onUpload" :style="mountedStyle">
      <input type="file" name="file" ref="file">
      <span v-if="!path">{{ text }}</span>
      <img v-if="path" :src="path" class="image" :style="mountedStyle">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    text: {
      type: String,
      default: "Upload"
    },
    srcPath: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "880px"
    },
    height: {
      type: String,
      default: "340px"
    },
    isCover: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    mountedStyle() {
      return {
        width: this.width,
        height: this.height,
        lineHeight: this.height
      };
    },
    api() {
      return this.$store.state.api;
    }
  },
  data() {
    return {
      path: ""
    };
  },
  watch: {
    srcPath(val) {
      this.path = this.srcPath;
    }
  },
  mounted() {
    this.path = this.srcPath;
    this.uploadFile();
  },
  methods: {
    onUpload() {
      this.$refs.file.click();
    },
    uploadFile() {
      const file = this.$refs.file;

      file.addEventListener("change", () => {
        if (file.files.length === 0) return;
        const formData = new FormData();
        formData.append("file", file.files[0], file.files[0].name);

        axios
          .post(this.api.file, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => res.data)
          .then(
            res => {
              if (res.code === 200) {
                if (this.isCover) this.path = res.data.path;
                this.$emit("upload", res.data.path);
              }
            },
            err => {
              this.$Message.error(err.toString());
            }
          );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: inline-block;
  position: relative;
  .file {
    text-align: center;
    border: 1px solid #ddd;
    box-sizing: border-box;
    cursor: pointer;
    input[type="file"] {
      width: 1px;
      height: 1px;
      position: fixed;
      right: 100%;
      bottom: 100%;
      opacity: 0;
    }
    span {
      font-size: 22px;
      z-index: 10;
      color: #000;
    }
    .image {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.9;
    }
  }
}
</style>