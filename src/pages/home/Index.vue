<template>
  <div class="home">
    <Header/>

    <main class="main">
      <!-- top -->
      <div class="top">
        <div class="banner" ref="banner">
          <swiper :options="swiperOption" au>
            <swiper-slide v-for="(item,idx) in images" :key="idx">
              <img :src="item" alt>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
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

      <!-- newest -->
      <div class="newest">
        <h2 class="sperator">Newest destination</h2>

        <ul class="destinations">
          <li v-for="(item,idx) in newest" :key="idx">
            <img :src="item.banner">
            <div class="detials">
              <h2>{{ item.name }}</h2>
              <h4>{{ item.address }}</h4>
              <p>{{item.description}}</p>
              <button>See details</button>
            </div>
          </li>
        </ul>

        <button class="allButton">All Destinations</button>
      </div>

      <!-- introduce -->
      <div class="introduce">
        <h2 class="sperator">Why Happy Travel ?</h2>
        <p>
          At this moment.
          <br>who is paying attention to the same travel destination with you?
          <br>The world is so big,
          <br>where is our next destination, why go there?
          <br>
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
    return {
      api: this.$store.state.api,
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      images: [
        "/banner/b1.jpg",
        "/banner/b2.jpg",
        "/banner/b3.jpg",
        "/banner/b4.jpg"
      ],
      newest: []
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this._fetchDestination();
  },
  methods: {
    /**
     * @methods fetch data
     * load newest destination
     */
    _fetchDestination() {
      this.$http
        .get(this.api.destination, {
          sort: "created",
          min: 0,
          max: 4
        })
        .then(res => {
          this.newest = res.data;
        });
    },
    /**
     * @event scroll
     */
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
    .newest {
      width: 1190px;
      margin: 0 auto;
      text-align: center;
      .allButton {
        margin: 40px 0;
      }
      .destinations {
        margin: 0 auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          margin-bottom: 40px;
          border: 1px solid #ddd;
          border-radius: 4px;
          img {
            min-width: 380px;
            min-height: 380px;
            width: 380px;
            height: 380px;
          }
          .detials {
            padding: 20px 20px;
            p {
              line-height: 1.8;
              text-align: left;
            }
            button {
              padding: 8px 8px;
              background: #fff;
              color: #495057;
              &:hover {
                color: #fff;
                background: #228be6;
              }
              transition: all 0.4s ease-in-out;
            }
          }
        }
      }
    }
    .sperator {
      color: #495057;
      font-size: 32px;
      position: relative;
      margin: 22px 0;
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
            width: 96px;
            height: 96px;
          }

          margin: 0 60px;
          padding: 10px;
          background: #228be6;
        }
        p {
          font-size: 16px;
        }
      }
    }
    .introduce {
      p {
        margin: 20px;
        padding: 0 80px;
        font-size: 17px;
        text-align: center;
      }
    }
    .top {
      position: relative;
      .banner {
        width: 100%;
        height: 640px;
        min-width: 1190px;
        min-height: 640px;
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
        line-height: 1.8;
        hr {
          height: 3px;
          color: #fff;
          background: #fff;
          border: none;
          outline: none;
        }
      }
      .arrow {
        cursor: pointer;
        position: absolute;
        z-index: 3;
        left: 50%;
        bottom: 5%;
        transform: translate(-50%, 0);
        color: #fff;
        font-size: 28px;
      }
    }
  }
}
</style>