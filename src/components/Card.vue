<template>
  <ul class="card">
    <li v-for="(item,idx) in destinations" :key="idx" :class="idx%2 !=0 ? 'item even': 'item'">
      <img :src="item.banner">
      <div class="detials">
        <h2>{{ item.name }}</h2>
        <h4>{{ item.address }}</h4>
        <p>{{item.description}}</p>
        <router-link :to="{path:'details',query:{id:item._id}}">
          <button>See details</button>
        </router-link>
      </div>
    </li>
  </ul>
</template>


<script>
export default {
  props: {
    destinations: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  .even {
    flex-direction: row-reverse;
  }
  .item {
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
      text-align: center;
      max-height: 380px;
      overflow: hidden;
      flex-grow: 1;
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
</style>
