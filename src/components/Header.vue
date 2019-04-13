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

        <li class="signin">
          <a href="/sign?type=signin">Sign in</a>
          <i class="fa fa-sign-in"></i>
        </li>

        <li class="signup">
          <a href="/sign?type=signup">Sign up</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navbar: [
        {
          text: "HOME",
          link: "#"
        },
        {
          text: "ABOUT",
          link: "#"
        }
      ]
    };
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
        margin: 0 28px;
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
        margin: 0 10px;
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
    }
  }
}
</style>