window.onload=function(){
    var search_toggle    = document.querySelector('.search-toggle');
    var search_container = document.querySelector('#search-container');
    search_toggle.addEventListener('click',function(){
        if(search_container.className.indexOf("hide") > -1){
            search_container.className = "search-box-wrapper";
        }else{
            search_container.className = "search-box-wrapper hide";
        }
    });
};

