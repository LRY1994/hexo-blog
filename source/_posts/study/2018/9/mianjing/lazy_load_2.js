var lazyImg=[].slice.call(document.querySelectorAll(".lazyImg"));

function loadImage(images){ 
    let scrollParent,src,el; 
    for(let i = 0;i < images.length;i++){ 
      scrollParent=images[i].scrollParent; //img所属的最近的可滚动祖先节点
      el=images[i].el; 
      //offset为预留的预加载距离 
      if(checkInView(el,scrollParent,this.options.offset)){ 
        src=el.dataset.src; 
        el.setAttribute("src",src);
        images.splice(i--,1); //将该img元素移除 
      } 
    }
  }
  
  const checkInView=(el,scrollParent,offset)=>{
    let scrollTop,clientH,clientW,scrollLeft;
    let offsetTop=0,offsetLeft=0;
    if(scrollParent === window) {
        scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
        clientH=document.documentElement.clientHeight||document.body.clientHeight;
        clientW=document.documentElement.clientWidth||document.body.clientWidth;
    }
    else {
        scrollTop = scrollParent.scrollTop;
        scrollLeft=scrollParent.scrollLeft;
        clientH = scrollParent.clientHeight;
        clientW=scrollParent.clientWidth;
    }
    while(el!=scrollParent && el!=null){
        offsetTop+=el.offsetTop+el.clientTop;
        offsetLeft+=el.offsetLeft+el.clientLeft;
        el=el.offsetParent;
    }
    if(scrollTop+clientH>offsetTop-offset && scrollLeft+clientW>offsetLeft-offset){
        return true;
    }
    else return false;
}
function initListener(el){
    let scrollParent=getScrollParent(el);
    if(this.scrollParent.indexOf(scrollParent)<0){
        position = getStyle(scrollParent, "position");  //若为window则返回null
        if (position==="" || position === "static"){
           scrollParent.style.position = "relative";   //确保能检测到正确的offsetTop和offsetLeft
        }        
        this.scrollParent.push(scrollParent);  //数组用于保存已经监听的可滚动祖先节点
        this.eventsList.forEach((event)=>{
            scrollParent.addEventListener(event,this.loadImage.bind(this));
        })
    }
}