<template>
    <div v-if="active" :class="active==true?'ui dimmer modals page transition visible active':'ui dimmer modals page transition'"
        style="display: flex !important;">
        <div class="ui standard test modal transition hidden">
        </div>
        <div class="ui small basic test modal transition visible active scrolling" style="display: block !important;">
            <div class="ui icon header">
                <i style="color:#f44336;" class="hand paper icon"></i>
                Hey Stop! There is a Question that you need to read below.
            </div>
            <div class="content" style="text-align: center;">
                <p>{{question}}</p>
            </div>
            <div class="actions"  style="text-align: center;">
                <div @click="close" class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>
                    No
                </div>
                <div @click="save" class="ui green ok inverted button">
                    <i class="checkmark icon"></i>
                    Yes
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comfirm',
        data() {
            return {
                active: false,
                question:'',
                callback: false
            }
        },
        mounted() {

        },
        methods: {
            close(){   
                if(this.callback!==false){
                    this.active=false;
                    this.question='';
                    this.callback(false);
                    this.callback = false;
                }
            },
            save(){
               if(this.callback!==false){
                    this.active=false;
                    this.question='';
                    this.callback(true);
                    this.callback = false;
                } 
            },
            ask(q,callback){
                this.question=q;
                this.callback=callback;
                this.active=true;
            }
        },
    }
</script>

<style scoped>
    .inv2 {
        width: 220px;
        background-color: #2f3133;
    }

    .mt5 {
        margin-top: 5px;
    }

    .mt20 {
        margin-top: 20px;
    }
</style>