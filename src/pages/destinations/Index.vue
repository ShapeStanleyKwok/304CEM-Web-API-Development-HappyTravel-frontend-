<template>
  <section class="destinations background">
    <Header background="dark"/>
    <main class="main">
      <h2 class="separator">All</h2>
      <div class="gallery">
        <Card :destinations="destinations"/>
      </div>

      <h3>{{ total }} destinations in total.</h3>
      <button class="more" @click="onMore" :disabled="moreAble">Discover More</button>

      <h2 class="separator">New Destination</h2>
      <div v-if="isLogin" class="form">
        <label for="banner">BANNER:</label>
        <Upload text="Upload Banner" @upload="upload" name="banner" />

        <label for="name">NAME:</label>
        <input v-model="form.name" name="name">

        <label for="address">ADDRESS:</label>
        <input v-model="form.address" name="address">

        <label for="description">DESCRIPTION:</label>
        <textarea v-model="form.description" name="description"/>

        <button :disabled="submitAble" @click="onSubmit">SUBMIT</button>
      </div>

      <router-link
        v-else
        class="signin"
        :to="{path: '/sign',query:{type:'signin',from:'destinations'}}"
      >
        <button class="siginbutton">You can add a destination after signing in</button>
      </router-link>
    </main>

    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
import Card from "@components/Card";
import Upload from "@components/Upload";

export default {
  data() {
    return {
      min: 0,
      max: 4,
      per: 2,
      destinations: [],
      total: 0,
      moreAble: false,
      form: {
        userId: this.$store.state.userId || "5cb1946038a09e2f88cdcb94",
        banner: "",
        name: "",
        description: "",
        address: ""
      },
      submitAble: true
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    api() {
      return this.$store.state.api;
    }
  },
  components: {
    Header,
    Footer,
    Card,
    Upload
  },
  mounted() {
    this.fetch();
  },
  watch: {
    /**
     * @wathc varify form
     */
    form: {
      deep: true,
      handler: function(newValue) {
        for (let key of Object.keys(newValue)) {
          if (newValue[key] === "") {
            this.submitAble = true;
            return;
          }
        }
        this.submitAble = false;
      }
    }
  },
  methods: {
    upload(path = "") {
      this.form.banner = path;
    },
    fetch() {
      this.$http
        .get(this.api.destination.replace("/{id}", ""), {
          params: {
            sort: "created",
            min: this.min,
            max: this.max
          }
        })
        .then(res => {
          const data = res.data.destinations;
          const total = res.data.total;
          if (data.length === 0) {
            this.$Message.info("No more destinations.");
            this.moreAble = true;
            return;
          }
          this.total = total;
          this.destinations = this.destinations.concat(data);
        });
    },
    /**
     * @event loadMore
     */
    onMore() {
      this.min = this.max;
      this.max = this.max + this.per;
      this.fetch();
    },
    /**
     * @event submit
     */
    onSubmit() {
      this.submitAble = true;
      this.$http
        .post(this.api.destination.replace("/{id}", ""), this.form)
        .then(res => {
          this.$Message.success(res.message);

          // reset form
          this.form.banner = "";
          this.form.name = "";
          this.form.description = "";
          this.form.address = "";
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.destinations {
  .main {
    .gallery {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .item {
        display: flex;
        flex-direction: column;
        .banner {
          width: 360px;
          height: 360px;
        }
      }
    }
    .signin {
      font-size: 16px;
    }
    .more {
      display: block;
      margin: 40px auto 100px auto;
    }

    .form,
    .signin {
      margin: 120px auto;
    }
    .form {
      width: 80%;
      @media screen and(min-width:1189px) {
        width: 880px;
      }

      input {
        height: 40px;
        border: none;
        border-bottom: 1px solid #ddd;
        &:focus {
          border-bottom: 1px solid #228be6;
        }
        transition: all 0.4s ease-in-out;
      }
    }
    button {
      margin: 40px 0;
    }
  }
}
</style>
