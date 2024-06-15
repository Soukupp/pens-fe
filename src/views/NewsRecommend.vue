<template>
    <h class="viewTitle tracking-in-expand">新闻推荐</h>
</template>

<script>
export default {
    name: "NewsRecommend"
}
</script>

<style>
.viewTitle {
    background-image: linear-gradient(96.14deg,
    rgba(24, 103, 154, 0.69) 0%,
    #0093bf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left;

    font: 600 20px "Poppins", sans-serif;
}

.tracking-in-expand {
    -webkit-animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}
</style>