<script setup lang="ts">
import VButton from '../components/VButton.vue';
import VModal from '../components/VModal.vue';

const props = defineProps<{
    visible: boolean,
    text: string,
    link: string
}>();

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'update:text', value: string): void
    (e: 'update:link', value: string): void
}>();

function updateVisible(e: MouseEvent) {
    const el = e.target as HTMLInputElement;
    emit('update:visible', el.getAttribute('data-visible') != 'false');
}

function updateText(e: InputEvent) {
    const el = e.target as HTMLInputElement;
    emit('update:text', el.value);
}

function updateLink(e: InputEvent) {
    const el = e.target as HTMLInputElement;
    emit('update:link', el.value);
}

</script>

<template>
    <VModal v-if="visible">
        <div class="modal-header">
            <h5 class="modal-title">수정</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-visible="false"
                @click="updateVisible"><span aria-hidden="true" data-visible="false">×</span></button>
        </div>
        <div class="modal-body">

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">텍스트</span>
                </div>
                <input type="text" class="form-control" aria-describedby="basic-addon3" :value="text"
                    @input="updateText">
            </div>

            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">링크</span>
                </div>
                <input type="text" class="form-control" aria-describedby="basic-addon3" :value="link"
                    @input="updateLink">
            </div>

        </div>
        <div class="modal-footer">
            <VButton data-visible="false" @click="updateVisible">취소</VButton>
            <VButton>적용</VButton>
        </div>
    </VModal>
</template>

<style scoped>
.form-control {
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.input-group {
    box-sizing: border-box;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
    margin-bottom: 1rem !important;
}

.input-group-prepend {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-right: -1px;
}

.input-group-text {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: .375rem .75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.modal-header {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}

.modal-header h5 {
    box-sizing: border-box;
    display: block;
    font-size: 0.83em;
    margin-block-start: 1.67em;
    margin-block-end: 1.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
    margin-top: 0;
    margin-bottom: .5rem;
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 700;
    line-height: 1.2;
    color: inherit;
    font-size: 1.25rem;
    margin-bottom: 0;
    line-height: 1.5;
}

.modal-header button {
    box-sizing: border-box;
    border-radius: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
    text-transform: none;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    padding: 1rem;
    margin: -1rem -1rem -1rem auto;
    cursor: pointer;
}

.modal-body {
    box-sizing: border-box;
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1rem;
}

.modal-footer {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    border-top: 1px solid #e9ecef;
    padding: 1rem;
}
</style>