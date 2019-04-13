<template>
  <div class="sign">
    <header class="header">
      <a href="/">
        <img class="travel" src="@assets/images/travel.png" alt="logo">
        <span class="text">Happy Travel</span>
      </a>
    </header>
    <main class="main">
      <div class="inner">
        <h2 class="title">{{ type ==='signin' ? 'Sign In' : 'Sign Up'}}</h2>

        <!-- sign in -->
        <div class="form" v-if="type === 'signin'">
          <label for="email">Email Address</label>
          <div class="form-item">
            <input type="text" name="email" placeholder="e.g. i@happy.com" v-model="signin.email">
            <i class="fa fa-envelope-o"></i>
          </div>

          <label for="password">Password</label>
          <div class="form-item">
            <input type="password" name="password" v-model="signin.password">
            <i class="fa fa-lock"></i>
          </div>

          <button class="signbutton">
            <span>Sign In</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <p class="tips">
            <span>New to HappyTravel ?</span>
            <a href="#" @click="onSignUp">Create an account.</a>
          </p>
        </div>
        <!-- sign up -->
        <div class="form" v-if="type === 'signup'">
          <label for="email">Email Address</label>
          <div class="form-item">
            <input type="text" name="email" placeholder="e.g. i@happy.com" v-model="signup.email">
            <i class="fa fa-envelope-o"></i>
          </div>

          <label for="password">Password</label>
          <div class="form-item">
            <input type="password" name="password" v-model="signup.password">
            <i class="fa fa-lock"></i>
          </div>

          <label for="comfirm">Comfirm Password</label>
          <div class="form-item">
            <input type="password" name="comfirm" v-model="signup.comfirm">
            <i class="fa fa-lock"></i>
          </div>
          <button class="signbutton">
            <span>Sign Up</span>
          </button>
          <p class="tips">
            <span>Have an account ?</span>
            <a href="#" @click="onSignIn">Sign in.</a>
          </p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="inner">
        <span>© 2019 Happy Travel , All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "signin",
      signin: {
        email: "",
        password: ""
      },
      signup: {
        email: "",
        password: "",
        comfirm: ""
      }
    };
  },
  mounted() {
    const type = this.$router.history.current.query.type;
    if (type) {
      this.type = type;
    } else this.type = "signin";
  },
  methods: {
    onSignUp() {
      this.type = "signup";
    },
    onSignIn() {
      this.type = "signin";
    }
  }
};
</script>

<style lang="scss" scoped>
.sign {
  color: #495057;
  .header {
    width: 1190px;
    margin: 0 auto;
    height: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .travel {
      height: 40px;
      vertical-align: middle;
    }
    .text {
      font-size: 36px;
      vertical-align: middle;
      font-weight: 600;
      margin-left: 20px;

      &:hover {
        color: #228be6;
      }
    }
  }
  .main {
    position: relative;
    padding-top: 5vh;
    min-height: 680px;
    height: calc(100vh - 70px - 100px);
    box-sizing: border-box;

    .inner {
      width: 1190px;
      margin: 0 auto;
      text-align: center;
      .title {
        margin: 0 0 22px;
        font-size: 48px;
      }
      .form {
        margin: 0 auto;
        width: 470px;
        padding: 12px 22px;
        background: #fff;
        border-radius: 2px;
        border: 1px solid #f1f1f1;
        box-sizing: border-box;
        .tips {
          text-align: right;
          a {
            color: #228be6;
          }
        }
        .signbutton {
          margin: 32px 0;
          width: 100%;
          font-size: 18px;
          .fa {
            margin-left: 5px;
          }
        }
      }
    }
    &:after {
      background-image: url(~@assets/images/sign.svg);
      background-repeat: repeat;
      opacity: 0.1;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  }
  .footer {
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    background: #212529;
    .inner {
      width: 1190px;
      margin: 0 auto;
      color: #fff;
    }
  }
}
</style>