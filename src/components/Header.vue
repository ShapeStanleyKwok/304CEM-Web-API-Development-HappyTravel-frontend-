<template>
  <header class="header">
    <div class="inner">
      <a href="/">
        <img class="logo" src="@assets/images/logo.png" alt="logo">
      </a>
      <ul class="navbar">
        <li v-for="(item,idx) in navbar" :key="idx">
          <a :href="item.link">{{ item.text }}</a>
        </li>

        <template v-if="!isLogin">
          <li class="signin">
            <a href="/sign?type=signin">Sign in</a>
            <i class="fa fa-sign-in"></i>
          </li>

          <li class="signup">
            <a href="/sign?type=signup">Sign up</a>
          </li>
        </template>

        <template else>
          <li class="userInfo" v-if="isLogin">
            <a href="/user">
              <img :src="userInfo.avatar" alt="userInfo">
              <span>{{ userInfo.nickname }}</span>
            </a>
          </li>
          <li class="signout" v-if="isLogin">
            <a href="#" @click="onSignOut">SIGN OUT</a>
            <i class="fa fa-sign-out"></i>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import * as Types from "@types";

export default {
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      navbar: [
        {
          text: "HOME",
          link: "/"
        },
        {
          text: "DESTINATIONS",
          link: "#"
        }
      ]
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    onSignOut() {
      // clear login state
      this.$store.commit(Types.SIGN_OUT);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: relative;
  z-index: 3;

  .inner {
    width: 980px;
    height: 90px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 80px;
    }
    .navbar {
      li {
        margin: 0 16px;
        padding: 12px 10px;
        display: inline-block;
        a {
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
        border-radius: 4px;
        border: 1px solid #fff;
        a {
          font-size: 14px;
        }
        i {
          color: #fff;
          margin: 0 8px;
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