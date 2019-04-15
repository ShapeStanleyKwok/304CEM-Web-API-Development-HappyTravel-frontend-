<template>
  <section class="user background">
    <Header background="dark"/>
    <main class="main">
      <h2 class="separator">USERINFO</h2>
      <div class="userinfo">
        <label for>AVATAR:</label>
        <Upload width="120px" height="120px" :srcPath="userInfo.avatar" @upload="upload"/>

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
          <td>{{ item.name }}</td>
          <td>{{ item.address}}</td>
          <td>
            <img class="logo" :src="item.banner" alt>
          </td>
          <td>
            <span class="description">{{ item.description.substring(0,30)}} ...</span>
          </td>
          <td>{{ item.created.substring(0,10) }}</td>
          <td>
            <button class="delete" @click="onDeleteDestination(idx)">Delete</button>
          </td>
        </tr>
      </table>

      <h2 class="separator">Your comments</h2>
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
      api: this.$store.state.api,
      id: this.$store.state.userId,
      userInfo: {
        address: "",
        avatar: "",
        email: "",
        nickname: "",
        updated: ""
      },
      destinations: []
    };
  },
  mounted() {
    this._setValues();
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
          this.destinations = res.data;
        });
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
          console.log(res);
          // reload
          this._fetchDestination();
          this.$Message.success("success");
        },
        err => {
          this.$Message.error(err.toString());
        }
      );
    },
    upload(path = "") {
      this.userInfo.avatar = path;
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .main {
    width: 940px;
    margin: 0 auto;
    min-height: 420px;
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
    }
    input {
      width: 50%;
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
    margin: 20px;
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
    }
    .logo {
      width: 80px;
      height: 80px;
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
</style>
