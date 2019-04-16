<template>
  <section class="details background">
    <Header background="dark"/>
    <main class="main">
      <div class="destination">
        <template v-if="!isEdit">
          <img class="banner" :src="destination.banner" alt="banner" v-if="destination.banner">
          <h2>{{destination.name}}</h2>
          <h4>{{destination.address}}</h4>
          <h5>created at: {{ destination.created.substring(0,10) }}</h5>
          <h5>updated at: {{ destination.updated.substring(0,10) }}</h5>
          <p>{{destination.description}}</p>
        </template>
        <template v-else>
          <Upload
            width="950px"
            height="460px"
            :srcPath="destination.banner"
            @upload="uploadBanner"
            class="banner"
          />

          <input type="text" v-model="destination.name">
          <input type="text" v-model="destination.address">

          <h5>created at: {{ destination.created.substring(0,10) }}</h5>
          <h5>updated at: {{ destination.updated.substring(0,10) }}</h5>

          <textarea v-model="destination.description"></textarea>
        </template>

        <button class="eidt" @click="onOperate">{{ !isEdit ? 'EDIT': 'SAVE'}}</button>
      </div>
      <h2 class="separator">Comments</h2>
      <p v-if="comments.length ===0" class="nocomments">No comments still.</p>

      <ul v-else class="commentList">
        <li v-for="(item,idx) in comments" :key="idx"></li>
      </ul>

      <h2 class="separator">New Comment</h2>
      <div ref="form" v-if="isLogin" class="form">
        <label for="content">Content:</label>
        <textarea v-model="form.content" name="content" placeholder="Write your opinion"/>

        <label for="gallery">Gallery:</label>

        <ul class="gallery" name="gallery">
          <li class="item" v-for="(item,idx) in form.gallery" :key="idx">
            <img :src="item" alt>
            <i class="fa fa-close" @click="onClose(idx)"></i>
          </li>
          <li class="item">
            <Upload
              text="Upload"
              @upload="uploadGallery"
              width="100px"
              height="100px"
              :isCover="false"
            />
            <i class="fa fa-upload"></i>
          </li>
        </ul>

        <button :disabled="submitAble" @click="onSubmit">SUBMIT</button>
      </div>
      <router-link
        v-else
        class="signin"
        :to="{path: '/sign',query:{type:'signin',from:`details?id=${id}`}}"
      >
        <button class="siginbutton">You can add a comment after signing in</button>
      </router-link>
    </main>
    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
import Upload from "@components/Upload";
export default {
  components: {
    Header,
    Footer,
    Upload
  },
  data() {
    return {
      destinationId: "",
      isEdit: false,
      destination: {
        description: "",
        address: "",
        name: "",
        banner: "",
        updated: "",
        created: ""
      },
      comments: [],
      form: {
        content: "",
        gallery: []
      },
      submitAble: false
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    api() {
      return this.$store.state.api;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  watch: {
    /**
     * @wathc varify form
     */
    ["form.content"](newValue) {
      newValue ? (this.submitAble = false) : (this.submitAble = true);
    }
  },
  mounted() {
    const id = this.$router.history.current.query.id;
    if (!id) {
      this.$Message.error("Query params error.");
      setTimeout(() => {
        this.$router.push("/");
      }, 800);
    } else {
      this.destinationId = id;
      this.fetchDetails();
      this.fetchComments();
    }
  },
  methods: {
    onClose(idx) {
      this.form.gallery.splice(idx, 1);
    },
    /**
     * submit comment
     */
    onSubmit() {
      this.$http
        .post(
          this.api.comment.replace("/{id}", ""),
          Object.assign(
            {},
            {
              destination: this.destinationId,
              user: this.userId,
              sort: "created"
            },
            this.form
          )
        )
        .then(
          res => {
            this.$Message.success(res.message);
            this.comments = res.data;
            this.form.content = "";
            this.form.gallery = [];
          },
          err => {
            this.$Message.error(err);
          }
        );
    },
    /**
     * fetch
     */
    fetchComments() {
      this.$http
        .get(this.api.comment.replace("/{id}", ""), {
          params: {
            destinationId: this.destinationId
          }
        })
        .then(
          res => {
            console.log(res);
          },
          err => {
            this.$Message.error(err);
          }
        );
    },
    /**
     * fetch
     */
    fetchDetails() {
      this.$http
        .get(this.api.destination.replace("{id}", this.destinationId))
        .then(res => {
          this.destination = res.data[0];
        });
    },
    uploadBanner(path) {
      this.destination.banner = path;
    },
    uploadGallery(path) {
      this.form.gallery.push(path);
    },
    /**
     * @method edit || save
     */
    onOperate() {
      /**
       * Save data
       */
      if (this.isEdit) {
        this.$http
          .put(
            this.api.destination.replace("{id}", this.destinationId),
            this.destination
          )
          .then(res => {
            this.$Message.success(res.message);
          });
      }
      this.isEdit = !this.isEdit;
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  .main {
    width: 1190px;
    min-height: 1280px;
    margin: 0 auto;
    text-align: center;
    .nocomments {
      margin: 36px 0;
      font-size: 18px;
    }
    .destination {
      .banner {
        min-width: 950px;
        min-height: 460px;
        width: 950px;
        height: 460px;
        margin: 20px;
      }
      h2,
      h4,
      h5 {
        margin: 10px 0;
      }
      h5 {
        color: gray;
      }

      p {
        line-height: 1.8;
        font-size: 16px;
        padding: 0 60px;
      }
      input,
      textarea {
        display: block;
        width: 60%;
        margin: 15px auto;
      }
    }
    .form {
      width: 880px;
      margin: 0 auto;
      .gallery {
        display: flex;
        .item {
          display: flex;
          flex-direction: column;
          margin-right: 18px;

          img {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
          }
          .fa {
            margin-top: 10px;
            font-size: 20px;
          }
          .fa-close {
            font-size: 24px;
            color: #e26d6d;
            cursor: pointer;
          }
        }
      }
      button {
        display: block;
        margin: 40px auto;
      }
    }
  }
}
</style>
