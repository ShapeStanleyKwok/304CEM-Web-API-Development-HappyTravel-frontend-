<template>
  <div class="home">
    <Header/>

    <main class="main">
      <!-- top -->
      <div class="top">
        <div class="banner" ref="banner">
          <img src="@assets/images/banner.jpg" alt>
        </div>
        <div class="info">
          <hr>
          <p>
            OUR BEST OFFERS
            <br>CHECK OUT OUR BEST TOURS
          </p>
          <hr>
        </div>
        <div class="arrow fade" @click="onScroll">
          <i class="fa fa-arrow-down"></i>
        </div>
      </div>

      <!-- popularity -->
      <div class="popularity">
        <h2 class="sperator">Popular destination</h2>
      </div>

      <!-- introduce -->
      <div class="introduce">
        <h2 class="sperator">Why Happy Travel ?</h2>
        <p>
          Happy Travel is a company which provides travel and tourism related services to the customers on behalf of suppliers.
          Products include airlines, hotels, package tours and travel insurance.
        </p>
      </div>

      <!-- features -->
      <div class="features">
        <div class="item">
          <div>
            <img src="@assets/images/fea1.png" alt>
          </div>
          <p>Professional advisers</p>
        </div>
        <div class="item">
          <div>
            <img src="@assets/images/fea2.png" alt>
          </div>
          <p>Popular destination</p>
        </div>
        <div class="item">
          <div>
            <img src="@assets/images/fea3.png" alt>
          </div>
          <p>Route recommendation</p>
        </div>
      </div>
    </main>

    <Footer/>
  </div>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  },
  methods: {
    onScroll() {
      let bannerHeight = this.$refs.banner.offsetHeight;
      window.scrollTo({
        top: bannerHeight,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    bottom: 10%;
    opacity: 0.5;
  }

  25% {
    bottom: 9%;
    opacity: 0.8;
  }

  50% {
    bottom: 9%;
    opacity: 0.8;
  }

  100% {
    bottom: 10%;
    opacity: 0.5;
  }
}

.fade {
  animation: fade 1s ease-in-out infinite;
}

.home {
  .main {
    margin-top: -100px;
    z-index: 2;
    .features,
    .introduce,
    .popularity {
      width: 1190px;
      margin: 0 auto;
      text-align: center;
    }
    .sperator {
      color: #495057;
      font-size: 32px;
      position: relative;
      &::before,
      &::after {
        position: absolute;
        top: 50%;
        width: 25%;
        height: 4px;
        content: "";
        background: #495057;
      }
      &::before {
        left: 5%;
      }
      &::after {
        right: 5%;
      }
    }
    .features {
      display: flex;
      justify-content: center;
      margin-top: 5vh;
      margin-bottom: 5vh;
      .item {
        div {
          img {
            width: 100px;
            height: 100px;
          }

          margin: 0 36px;
          padding: 10px;
          background: #228be6;
        }
        p {
          font-size: 17px;
        }
      }
    }
    .introduce {
      p {
        margin: 20px;
        font-size: 17px;
      }
    }
    .top {
      position: relative;
      .banner {
        width: 100%;
        height: 100vh;
        min-width: 1190px;
        min-height: 680px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 34px;
        font-weight: 800;
        hr {
          height: 1px;
          color: #fff;
          background: #fff;
        }
      }
      .arrow {
        cursor: pointer;
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 10%;
        transform: translate(-50%, 0);
        color: #fff;
        font-size: 28px;
      }
    }
  }
}
</style>