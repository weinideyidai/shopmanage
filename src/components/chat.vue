<template>
    <div class="main">
        <div class="talkshow">
            <div v-for="(data,key) in datas" :key="key" class="btalk">

                <span>{{data}}</span>
            </div>
        </div>
        <div class="sendbox">

                    <input type="text1" v-model="text" class="inputword" clearable @keyup.enter="sendMessage"/>
                    <input type="button" value="发送" @click="sendMessage" class="btnsend"/>
        </div>

    </div>
</template>
<script>
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    export default {
        name: 'ChatRoom',
        data () {
            return {
                text: '',
                text1:"",
                text2:"",
                datas: [],
                stompClient: null,
                arry:[]
            }
        },
        mounted () {
            if ('WebSocket' in window) {
                this.initWebSocket()
            } else {
                this.$message.error('当前浏览器 Not support websocket')
            }
        },
        methods: {
            sendMessage () {
               // this.text2=this.$store.state.username+":"
                this.text=this.$store.state.username+":"+this.text
                console.log(this.text1)
                console.log(this.text)
                this.stompClient.send('/app/hello', {}, this.text)
                this.text=""
                console.log(this.datas)

            },
            initWebSocket () {
                this.connection()
            },
            connection () {
                const socket = new SockJS('http://120.24.27.228:8082/chat')
                this.stompClient = Stomp.over(socket)
                this.stompClient.connect({}, (frame) => {
                    this.stompClient.subscribe('/topic/greetings', (greeting) => {
                        if(this.datas.length<12){
                        this.datas.push(greeting.body)
                        }else {
                           this.arry=[]
                            this.arry.push(greeting.body)
                            this.arry.slice(1)
                            this.datas=this.arry

                        }

                    })
                })
            }
        },
        computed:{
            username(){
                return store.state.username
            }
        }
    }
</script>

<style scoped>
   body{
       background-color: lightblue;
   }
.main{
    height: 85%;

    background-color: silver;
}
    div::-webkit-scrollbar{
        display: none;
    }
    .btalk{
        text-align: right;
        margin: 10px;
    }
    .btalk span{
        display:inline-block;
        padding: 3px 10px;
        border: 1px solid aliceblue;
        border-radius: 15px;
        background-color: white;
    }
    .sendbox{
        height: 50px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        margin-top: 50px;
        margin-left: 2%;

    }
    .inputword{
        outline: none;
        width: 80%;
        height: 25px;
        border-radius: 15px;
        text-indent: 12px;

    }
    .btnsend{
        outline: none;
        width: 13%;
        height: 25px;
        border-radius: 15px;
        border:1px solid grey;
        margin-left: 2%;
    }
    .talkshow{
        height: 480px;
        overflow: scroll;
    }
</style>
