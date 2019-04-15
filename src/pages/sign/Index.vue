<template>
  <section class="sign">
    <header class="header">
      <a href="/">
        <img class="travel" src="@assets/images/travel.png" alt="logo">
        <span class="text">Happy Travel</span>
      </a>
    </header>
    <main class="main background">
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

          <button class="signbutton" @click="onSignIn">
            <span>Sign In</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <p class="tips">
            <span>New to HappyTravel ?</span>
            <a href="#" @click="onToSignUp">Create an account.</a>
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
          <button class="signbutton" @click="onSignUp">
            <span>Sign Up</span>
          </button>
          <p class="tips">
            <span>Have an account ?</span>
            <a href="#" @click="onToSignIn">Sign in.</a>
          </p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="inner">
        <span>© 2019 Happy Travel , All Rights Reserved.</span>
      </div>
    </footer>
  </section>
</template>

<script>
import MD5 from "js-md5";
import * as Types from "@types";

export default {
  data() {
    return {
      api: this.$store.state.api,
      type: "signin",
      signin: {
        email: "HT@me.com",
        password: "123456"
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
    console.log(this.$router);
  },
  methods: {
    /**
     * @event signup
     */
    onSignUp() {
      let signup = this.signup;
      // varify
      if (!signup.email || !signup.password || !signup.comfirm) {
        return this.$Message.warning("The data is empty");
      }
      if (signup.password != signup.comfirm) {
        return this.$Message.warning("The passwords are inconsistent");
      }
      // request
      this.$http
        .post(this.api.user.register, {
          email: signup.email,
          password: MD5.base64(signup.password)
        })
        .then(
          res => {
            this._authSuccess(res);
          },
          err => {
            this.$Message.error(err);
          }
        );
    },
    /**
     * @event signin
     */
    onSignIn() {
      let signin = this.signin;
      // varify
      if (!signin.email || !signin.password) {
        return this.$Message.warning("The data is empty");
      }
      // request
      this.$http({
        url: this.api.user.authorization,
        method: "post",
        headers: {
          Authorization: `HT ${signin.email}:${MD5.base64(signin.password)}`
        }
      }).then(
        res => {
          this._authSuccess(res);
        },
        err => {
          this.$Message.error(err);
        }
      );
    },
    /**
     * @method auth success
     */
    _authSuccess(res) {
      let path = this.$router.history.current.query.from || "";

      this.$store.dispatch("getUserInfo", { _id: res.data._id });
      this.$Message.success(res.message);
      setTimeout(() => {
        this.$router.push("/" + path);
      }, 1000);
    },
    /**
     * @event toggle
     */
    onToSignUp() {
      this.type = "signup";
    },
    /**
     * @event toggle
     */
    onToSignIn() {
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
    min-height: 720px;
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