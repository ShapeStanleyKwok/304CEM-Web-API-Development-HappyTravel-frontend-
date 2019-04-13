<template>
  <footer class="footer">
    <div class="meta">
      <div class="inner">
        <div class="inner-item">
          <img src="@assets/images/travel-white.png" alt="logo">
        </div>
        <div class="inner-item">
          <h2>{{ support.text }}</h2>
          <ul>
            <li v-for="(item,idx) in support.list" :key="idx">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="inner-item">
          <h2>{{ contact.text }}</h2>
          <ul class="contact-list">
            <li v-for="(item,idx) in contact.list" :key="idx">
              <i :class="item.icon"></i>
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
        <div class="inner-item">
          <h2>{{ follow.text }}</h2>
          <ul class="follow-list">
            <li v-for="(item,idx) in follow.list" :key="idx">
              <i :class="item"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="copyright">
      <div class="inner">
        <span>{{ copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      support: {
        text: "support",
        list: ["Feedback", "Get Help", "About Us"]
      },
      contact: {
        text: "contact info",
        list: [
          {
            icon: "fa fa-location-arrow",
            text:
              "Rooms 801-804,8th Floor, Alexandra House,18 Chater Road, Central,Hong Kong."
          },
          {
            icon: "fa fa-phone",
            text: "+852-26549815"
          },
          {
            icon: "fa fa-envelope-o",
            text: "happytravel@info.com"
          }
        ]
      },
      follow: {
        text: "follow us",
        list: [
          "fa fa-facebook",
          "fa fa-twitter",
          "fa fa-instagram",
          "fa fa-google-plus"
        ]
      },
      copyright: "© 2019 Happy Travel , All Rights Reserved."
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  color: #dee2e6;

  .meta {
    height: 200px;
    background: #343a40;
    display: flex;
    align-items: center;
    .inner {
      min-width: 1190px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .inner-item {
        width: 25%;
        text-align: center;
        img {
          height: 56px;
        }
        h2 {
          font-size: 14px;
          color: #868e96;
          text-transform: uppercase;
        }
        ul {
          margin: 0 auto;
          width: 80%;
          text-align: center;
          li {
            color: #fff;
            margin-bottom: 6px;
          }
        }
        .contact-list {
          i {
            margin-right: 10px;
          }
          span {
            font-size: 13px;
          }
        }
        .follow-list {
          li {
            display: inline-block;
            margin-right: 20px;
          }
          i {
            font-size: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .copyright {
    height: 40px;
    line-height: 40px;
    background: #212529;
    text-align: center;
    .inner {
      width: 1190px;
      margin: 0 auto;
    }
  }
}
</style>