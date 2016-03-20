seajs.config({
    base : '/build/js'
});
seajs.use(['../app/user/login','../app/user/data'],function(login,data){

    data.init();

})