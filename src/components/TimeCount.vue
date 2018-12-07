<template lang="pug">
.comp.flex
    .item(v-for="item in array") {{item}}
</template>

<script>
export default {
    props: {
        split: {
            type: Number,
            default: 4
        }
    },
    computed: {
        array() {
            return this.split === 4 ? [3, 9, 15, 21] : [2, 6, 10, 14, 18, 22];
        }
    }
};
</script>


<style lang="scss" scoped>
.comp {
    text-align: center;
    align-items: stretch;
    height: 34px;
    .item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #000;
        width: 100%;
        word-break: break-all;
        word-wrap: break-word;
        &:last-child {
            border-right: 0 none;
        }
    }
}
</style>
