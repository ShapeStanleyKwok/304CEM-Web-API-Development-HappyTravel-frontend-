<template>
  <header :class="background === 'dark'? 'header dark': 'header'">
    <div class="inner">
      <router-link to="home">
        <img class="logo" src="@assets/images/logo.png" alt="logo">
      </router-link>

      <ul class="navbar">
        <li v-for="(item,idx) in navbar" :key="idx">
          <router-link :to="item.link">{{ item.text }}</router-link>
        </li>

        <template v-if="!isLogin">
          <li class="signin">
            <router-link :to="{path:'/sign',query:{type:'signin'}}">Sign in</router-link>
            <i class="fa fa-sign-in"></i>
          </li>

          <li class="signup">
            <router-link :to="{path:'/sign',query:{type:'signup'}}">Sign up</router-link>
          </li>
        </template>

        <template else>
          <li class="userInfo" v-if="isLogin">
            <router-link to="user">
              <img :src="userInfo.avatar" alt="userInfo">
              <span>{{ userInfo.nickname }}</span>
            </router-link>
          </li>
          <li class="signout" v-if="isLogin">
            <a href="#" @click="onSignOut">SIGN OUT</a>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import * as Types from "@types";

export default {
  props: {
    background: String
  },
  data() {
    return {
      navbar: [
        {
          text: "HOME",
          link: "/"
        },
        {
          text: "DESTINATIONS",
          link: "/destinations"
        }
      ]
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    onSignOut() {
      // clear login state
      this.$store.commit(Types.SIGN_OUT);
      // clear cookies
      this.$cookies.remove("_id");
      // messgae
      this.$Message.success("success");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.dark {
  background: #343a40;
  border-bottom: 1px solid;
}
.header {
  width: 100%;
  position: relative;
  z-index: 3;
  .inner {
    width: 980px;
    height: 100px;
    @media screen and (max-width: 570px) {
      background: #343a40;
      display: block;
      width: 100%;
      height: auto;
    }

    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      height: 80px;
      @media screen and (max-width: 570px) {
        display: none;
      }
    }
    .navbar {
      @media screen and (max-width: 570px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
      li {
        margin: 0 6px;
        display: inline-block;
        @media screen and (min-width: 1187px) {
          margin: 0 16px;
        }
        @media screen and (max-width: 570px) {
          margin-bottom: 22px;
        }
        a {
          padding: 12px 10px;
          letter-spacing: 0.5px;
          font-size: 15px;
          color: #fff;

          &:hover {
            text-decoration: underline;
          }
        }
      }
      .signin,
      .signup {
        margin: 0 8px;
      }
      .signin {
        padding: 8px 6px;
        border-radius: 4px;
        border: 1px solid #fff;
        i {
          color: #fff;
          margin: 0 8px;
          font-size: 16px;
        }
      }
      .signout {
        margin: 0;
        padding: 2px 4px;
        a {
          font-size: 14px;
        }
      }
      .userInfo {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>