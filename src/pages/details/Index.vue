<template>
  <section class="details background">
    <Header background="dark"/>
    <main class="main">
      <div class="destination">
        <template v-if="!isEdit">
          <img class="banner" :src="destination.banner" alt="banner">
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
            @upload="upload"
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
      api: this.$store.state.api,
      id: "",
      isEdit: false,
      destination: {
        description: "",
        address: "",
        name: "",
        banner: "",
        updated: "",
        created: ""
      },
      comments: []
    };
  },
  mounted() {
    const id = this.$router.history.current.query.id;
    if (!id) {
      this.$Message.error("Query params error.");
      setTimeout(() => {
        this.$router.push("/");
      }, 800);
    } else {
      this.id = id;
      this.fetch();
    }
  },
  methods: {
    fetch() {
      this.$http
        .get(this.api.destination.replace("{id}", this.id))
        .then(res => {
          this.destination = res.data[0];
        });
    },
    upload(path) {
      this.destination.banner = path;
    },
    onOperate() {
      /**
       * Save data
       */
      if (this.isEdit) {
        this.$http
          .put(this.api.destination.replace("{id}", this.id), this.destination)
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
        width: 950px;
        height: 460px;
        margin: 4px 20px;
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
      }
      input,
      textarea {
        display: block;
        width: 60%;
        margin: 15px auto;
      }
    }
  }
}
</style>
