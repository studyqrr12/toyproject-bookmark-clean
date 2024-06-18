<script setup lang="ts">
defineProps({
    items: {
        type: Array<{
            text: String,
            event: PropertyKey
        }>,
        require: true
    }
});

</script>

<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.event"><a :data-menu-action="item.event">{{ item.text }}</a></li>
        </ul>
    </div>
</template>

<style scoped>
div {
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: block;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    position: absolute;
    text-align: start;
    text-size-adjust: 100%;
    unicode-bidi: isolate;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    left: 0px;
    top: 0px;
    width: 0;
    height: 0;
}

ul {
    background-clip: padding-box;
    background-color: rgb(255, 255, 255);
    border-bottom-color: rgba(0, 0, 0, 0.176);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.176);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.176);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.176);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: block;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    margin-block-end: 0px;
    margin-block-start: 0px;
    margin-bottom: 0px;
    margin-inline-end: 0px;
    margin-inline-start: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    max-height: 225px;
    min-width: 160px;
    overflow-x: auto;
    overflow-y: auto;
    padding-bottom: 8px;
    padding-inline-start: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 8px;
    position: absolute;
    text-align: left;
    text-size-adjust: 100%;
    unicode-bidi: isolate;
    width: 160px;
    z-index: 1000;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

li {
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: list-item;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    font-weight: 400;
    height: 32px;
    line-height: 24px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    text-align: left;
    text-size-adjust: 100%;
    unicode-bidi: isolate;
    width: 158px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a {
    background-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgb(33, 37, 41);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-style: none;
    border-bottom-width: 0px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgb(33, 37, 41);
    border-left-style: none;
    border-left-width: 0px;
    border-right-color: rgb(33, 37, 41);
    border-right-style: none;
    border-right-width: 0px;
    border-top-color: rgb(33, 37, 41);
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-top-style: none;
    border-top-width: 0px;
    box-sizing: border-box;
    clear: both;
    color: rgb(33, 37, 41);
    cursor: pointer;
    display: block;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 16px;
    font-weight: 400;
    height: 32px;
    line-height: 24px;
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
    padding-bottom: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 4px;
    text-align: left;
    text-decoration-color: rgb(33, 37, 41);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-decoration-thickness: auto;
    text-size-adjust: 100%;
    text-wrap: nowrap;
    white-space-collapse: collapse;
    width: 158px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>