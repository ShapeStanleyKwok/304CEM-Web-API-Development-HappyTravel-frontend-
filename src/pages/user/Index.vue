<template>
  <section class="user background">
    <Header background="dark"/>
    <main class="main">
      <h2 class="separator">USERINFO</h2>
      <div class="userinfo">
        <label for>AVATAR:</label>
        <Upload size="mini" :srcPath="userInfo.avatar" @upload="upload"/>

        <div class="item">
          <label for>EMAIL:</label>
          <input type="text" disabled v-model="userInfo.email">
        </div>
        <div class="item">
          <label for>NICKNAME:</label>
          <input type="text" v-model="userInfo.nickname">
        </div>
        <div class="item">
          <label for>ADDRESS:</label>
          <input type="text" v-model="userInfo.address">
        </div>

        <p class="tips">Last updated at: {{userInfo.updated.substring(0,19)}}</p>

        <button class="update" @click="onUpdate">Update</button>
      </div>

      <h2 class="separator">Your destinations</h2>
      <table class="destinations">
        <tr>
          <th>name</th>
          <th>address</th>
          <th>banner</th>
          <th>description</th>
          <th>created at</th>
          <th>operate</th>
        </tr>

        <p v-if="destinations.length === 0" class="nodata">No data.</p>

        <tr v-for="(item,idx) in destinations" :key="idx" v-else>
          <td>
            <router-link :to="{path:'details',query:{id:item._id}}">{{ item.name }}</router-link>
          </td>
          <td>{{ item.address}}</td>
          <td>
            <img class="logo" :src="item.banner" alt>
          </td>
          <td>
            <span class="description">{{ item.description && item.description.substring(0,30)}} ...</span>
          </td>
          <td>{{ item.created &&item.created.substring(0,10) }}</td>
          <td>
            <button class="delete" @click="onDeleteDestination(idx)">Delete</button>
          </td>
        </tr>
      </table>

      <h2 class="separator">Your comments</h2>
      <table class="comments">
        <tr>
          <th>destination</th>
          <th>content</th>
          <th>gallery</th>
          <th>created at</th>
          <th>operate</th>
        </tr>

        <p v-if="comments.length === 0" class="nodata">No data.</p>

        <tr v-for="(item,idx) in comments" :key="idx" v-else>
          <td>
            <router-link
              :to="{path:'details',query:{id:item.destination._id}}"
            >{{ item.destination.name }}</router-link>
          </td>
          <td>{{ item.content }}</td>
          <td>
            <img
              class="logo"
              :src="gallery"
              v-for="(gallery,idx) in item.gallery.slice(0,2)"
              :key="idx"
            >
          </td>
          <td>{{ item.created && item.created.substring(0,10) }}</td>
          <td>
            <button class="delete" @click="onDeleteComment(idx)">Delete</button>
          </td>
        </tr>
      </table>
    </main>
    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
import Upload from "@components/Upload";
import * as Types from "@types";

export default {
  data() {
    return {
      userInfo: {
        address: "",
        avatar: "",
        email: "",
        nickname: "",
        updated: ""
      },
      destinations: [],
      comments: []
    };
  },
  computed: {
    id() {
      return this.$store.state.userId;
    },
    api() {
      return this.$store.state.api;
    }
  },
  mounted() {
    this._setValues();
    this._fetchComment();
    this._fetchDestination();
  },
  components: {
    Header,
    Footer,
    Upload
  },
  methods: {
    /**
     * @method initValues
     */
    _setValues() {
      const userInfo = this.$store.state.userInfo;
      Object.keys(userInfo).forEach(key => {
        this.userInfo[key] = userInfo[key];
      });
    },
    /**
     * @method find user's destinations
     */
    _fetchDestination() {
      this.$http
        .get(this.api.destination.replace("/{id}", ""), {
          params: {
            min: 0,
            max: 99,
            userId: this.id
          }
        })
        .then(res => {
          this.destinations = res.data.destinations;
        });
    },
    /**
     * @method find user's comments
     */
    _fetchComment() {
      this.$http
        .get(this.api.comment.replace("/{id}", ""), {
          params: {
            userId: this.id
          }
        })
        .then(
          res => {
            this.comments = res.data;
          },
          err => {
            this.$Message.error(err);
          }
        );
    },
    /**
     * @method update
     */
    onUpdate() {
      this.$http
        .put(this.api.user.userInfo.replace("{id}", this.id), this.userInfo)
        .then(
          res => {
            this.$Message.success("success");
            this.$store.commit(Types.SET_USER_INFO, {
              userInfo: this.userInfo
            });
          },
          err => {
            this.$Message.error(err.toString());
          }
        );
    },
    /**
     * @method delete
     */
    onDeleteDestination(idx) {
      const id = this.destinations[idx]._id;

      this.$http.delete(this.api.destination.replace("{id}", id)).then(
        res => {
          // reload
          this._fetchDestination();
          this.$Message.success("success");
        },
        err => {
          this.$Message.error(err.toString());
        }
      );
    },
    /**
     * @method delete
     */
    onDeleteComment(idx) {
      const id = this.comments[idx]._id;

      this.$http.delete(this.api.comment.replace("{id}", id)).then(
        res => {
          // reload
          this._fetchComment();
          this.$Message.success("success");
        },
        err => {
          this.$Message.error(err.toString());
        }
      );
    },
    upload(path) {
      this.userInfo.avatar = path;
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .main {
    width: 96%;
    @media screen and(min-width:1189px) {
      width: 960px;
    }
    .userinfo {
      text-align: center;
      padding: 20px 10px;
      background: #fff;
      border-radius: 4px;

      label {
        text-align: center;
        width: 30%;
        margin-right: 12px;
        font-size: 14px;
      }

      input {
        width: 50%;
        height: 40px;
        line-height: 40px;
      }

      .item {
        display: flex;
        align-items: center;
        margin: 22px 0;
      }

      .update {
        display: block;
        margin: 40px auto;
      }

      .tips {
        text-align: right;
        color: #666;
        font-size: 14px;
        margin-right: 40px;
      }
    }

    table {
      width: 100%;
      margin: 40px 0;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      th {
        font-size: 18px;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }

      td {
        text-align: center;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
      }

      .logo {
        width: 80px;
        height: 80px;
        margin: 5px;
      }

      .description {
        width: 220px;
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .delete {
        background-color: #e26d6d;
      }

      .nodata {
        font-size: 16px;
      }
    }
  }
}
</style>