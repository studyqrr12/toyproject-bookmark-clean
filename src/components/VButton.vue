<script setup lang="ts">

</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    box-sizing: border-box;
    margin: 0;
    text-transform: none;
    -webkit-appearance: button;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    align-items: flex-start;
    appearance: button;
    background-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgb(13, 110, 253);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgb(13, 110, 253);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgb(13, 110, 253);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgb(13, 110, 253);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    color: rgb(13, 110, 253);
    cursor: pointer;
    display: inline-block;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-feature-settings: normal;
    font-kerning: auto;
    font-optical-sizing: auto;
    font-size: 16px;
    font-stretch: 100%;
    font-style: normal;
    font-variant-alternates: normal;
    font-variant-caps: normal;
    font-variant-east-asian: normal;
    font-variant-ligatures: normal;
    font-variant-numeric: normal;
    font-variant-position: normal;
    font-variation-settings: normal;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 24px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 8px;
    margin-top: 0px;
    padding-block-end: 6px;
    padding-block-start: 6px;
    padding-bottom: 6px;
    padding-inline-end: 12px;
    padding-inline-start: 12px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 6px;
    text-align: center;
    text-decoration-color: rgb(13, 110, 253);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-decoration-thickness: auto;
    text-indent: 0px;
    text-rendering: auto;
    text-shadow: none;
    text-size-adjust: 100%;
    text-transform: none;
    user-select: none;
    vertical-align: middle;
    word-spacing: 0px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>