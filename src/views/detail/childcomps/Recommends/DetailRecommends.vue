<template>
  <div class="detailrecommends">
      <re-item v-for="item in recommends" :key="item.id" :reitems="item"/>
  </div>
</template>

<script>
import ReItem from './ReItem.vue'

export default {
  components: { ReItem },
    name:'DetailRecommends',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    },

}
</script>

<style scoped>
.detailrecommends{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>