// 第一种 全局过滤器转换时间
/*Vue.filter("dataFormat",function (dataStr,pattern) {
    var dt = new Date(dataStr);
    //年月日
    var y = dt.getFullYear();
    var m = dt.getMonth()+1;
    var d = dt.getDate();

    if(pattern.toLowerCase()=="yyyy-mm-dd"){
        return `${y}-${m}-${d}`
    }else{
        hh = dt.getHours();
        mm = dt.getMinutes();
        ss = dt.getSeconds();
        if(mm<10){
            mm = '0'+mm;
        }
        if(ss<10){
            ss = '0'+ss;
        }
        return  `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
});*/
//使用Vue.directive（）定义全局指令 v-focus
Vue.directive('focus',{
    bind:function (el) {
        //每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
        // el.focus() //在每个函数中，第一个参数，永远是el，表示被绑定了指令的哪个元素，这个el参数，是一个原生的JS对象
    },
    inserted:function (el) {
        //inserted表示元素 插入到Dom中的时候，会执行inserted函数【触发一次】
        el.focus();
    },
    updated:function (el) {
        //当VNode更新的时候，会执行updated，可能会触发多次
    }
});
//设置自定义颜色指令
Vue.directive('color',{
    bind:function (el,binding) {
        //样式只要通过指令绑定给了元素，不管这个元素有没有被插入到页面中去，这个元素肯定有了一个内联样式
        //钩子函数
        el.style.color=binding.value;
    }
});
var app =new Vue({
    el:"#app",
    data:{
        list:[
            {id:1,name:'奔驰',ctime:new Date()},
            {id:2,name:'法拉利',ctime:new Date()},
            {id:3,name:'兰博基尼',ctime:new Date()}
        ],
        id:"",
        name:"",
        ctime:new Date(),
        keywords:"",
        dataFormat:""
    },
    methods: {
        add:function () {
            var car = {id:this.id,name:this.name,ctime:this.ctime};
            this.list.push(car);
            this.name=this.id="";
        },
        del:function (id) {
            //第一种方法
            /*this.list.some((item,i)=>{
                if(item.id==id){
                    this.list.splice(i,1);
                    return true;
                }
            })*/

            //第二种
            var index = this.list.findIndex(item=>{
                if(item.id==id){
                    return true;
                }
            });
            this.list.splice(index,1);
        },
        Search:function (keywords) {
            var newlist = [];
            //第一种匹配方法
            /*this.list.forEach(item=>{
                if(item.name.indexOf(keywords)!=-1){
                    newlist.push(item);
                }
            });
            return newlist;*/

            //第二种匹配方法
            this.list.filter(item=>{
                if(item.name.includes(keywords)){
                    newlist.push(item);
                }
            });
            return newlist;

        }
    },
    //第二种 局部过滤器转换时间格式，过滤器调用采样就近原则，如果全局和私有过滤器都存在，优先使用私有的
    filters:{
        dataFormat: function (dataStr,pattern) {
            var dt = new Date(dataStr);
            //年月日
            var y = dt.getFullYear();
            var m = (dt.getMonth()+1).toString().padStart(2,"0");
            var d = dt.getDate().toString().padStart(2,"0");

            if(pattern.toLowerCase()=="yyyy-mm-dd"){
                return `${y}-${m}-${d}`
            }else{
                hh = dt.getHours().toString().padStart(2,"0");
                mm = dt.getMinutes().toString().padStart(2,"0");
                ss = dt.getSeconds().toString().padStart(2,"0");
                //第一种让一位数的时候前面加0填充
                /*if(mm<10){
                    mm = '0'+mm;
                }
                if(ss<10){
                    ss = '0'+ss;
                }*/
                return  `${y}-${m}-${d} ${hh}:${mm}:${ss}`
            }
        }
    }
});

