<script setup lang="ts">
import VButton from '../components/VButton.vue';
import VListItem from '../components/VListItem.vue';
import VModal from '../components/VModal.vue';

defineProps({
    visible: {
        type: Boolean,
        require: true
    },
    items: {
        type: Array<{
            text: String,
            event: PropertyKey
        }>,
        require: true
    }
});

const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
}>();

function updateVisible(e: MouseEvent) {
    const el = e.target as HTMLInputElement;
    emit('update:visible', el.getAttribute('data-visible') != 'false');
}

</script>

<template>
    <VModal v-if="visible">
        <div class="modal-header">
            <h5 class="modal-title">이동</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="updateVisible"
                data-visible="false"><span aria-hidden="true" data-visible="false">×</span></button>
        </div>
        <div class="modal-body">
            <VListItem v-for="item in items" :key="item.event">{{ item.text }}</VListItem>
        </div>
        <div class="modal-footer">
            <VButton @click="updateVisible" data-visible="false">취소</VButton>
            <VButton>적용</VButton>
        </div>
    </VModal>
</template>

<style scoped>
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