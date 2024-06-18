<script setup lang="ts">

</script>

<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    bottom: 0px;
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    left: 0px;
    line-height: 24px;
    outline-color: rgb(33, 37, 41);
    outline-style: none;
    outline-width: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 17px;
    position: fixed;
    right: 0px;
    text-align: left;
    text-size-adjust: 100%;
    top: 0px;
    transition-behavior: normal;
    transition-delay: 0s;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    unicode-bidi: isolate;
    width: 1545px;
    z-index: 1072;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, .5);
}

.modal-dialog {
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 28px;
    margin-left: 514px;
    margin-right: 514px;
    margin-top: 28px;
    max-width: 500px;
    pointer-events: none;
    position: relative;
    text-align: left;
    text-size-adjust: 100%;
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition-behavior: normal, normal;
    transition-delay: 0s, 0s;
    transition-duration: 0.3s, 0.3s;
    transition-property: transform, -webkit-transform;
    transition-timing-function: ease-out, ease-out;
    unicode-bidi: isolate;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}


.modal-content {
    background-clip: padding-box;
    background-color: rgb(255, 255, 255);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 4.8px;
    border-bottom-right-radius: 4.8px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-image-outset: 0;
    border-image-repeat: stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    border-left-color: rgba(0, 0, 0, 0.2);
    border-left-style: solid;
    border-left-width: 1px;
    border-right-color: rgba(0, 0, 0, 0.2);
    border-right-style: solid;
    border-right-width: 1px;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 4.8px;
    border-top-right-radius: 4.8px;
    border-top-style: solid;
    border-top-width: 1px;
    box-sizing: border-box;
    color: rgb(33, 37, 41);
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    outline-color: rgb(33, 37, 41);
    outline-style: none;
    outline-width: 0px;
    pointer-events: auto;
    position: relative;
    text-align: left;
    text-size-adjust: 100%;
    unicode-bidi: isolate;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>