let d = document.getElementById("m_arts") 
let context1 = d.getContext("2d");

let loadImage1 = (src,callback)=>{
let img1 = document.createElement("img");
img1.onload = () => callback(img1);
img1.src = src;
};

let imagePath = (frameNumber,animation) => {
    return "pics/" +website+"/"+ frameNumber + ".png";
};

let frames = {
    i:[1,2,3,4,5,6,7,8],
    k: [1,2,3,4,5,6,7],
    p: [1,2,3,4,5,6,7],
    f: [1,2,3,4,5,6],
    bl: [1,2,3,4,5,6,7,8,9],
    b:[1,2,3,4,5,6],
};

let loadImages1 = (callback) => {
let images = {i:[], k:[], p:[], f:[], bl:[], b:[]};
let imagesToLoad = 0;

["i", "k", "p", "f", "bl", "b"].forEach((animation)=>{
    let animationFrames = frames[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber)=>{
        let path = imagePath(frameNumber,animation);

        loadImage1(path, (image) => {
            images[animation][frameNumber-1] = image;
            imagesToLoad = imagesToLoad-1;
            
            if (imagesToLoad===0){
                callback(images);
            }
        });
    });
});
};

let animate = (ctx,images,animation,callback) => {
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            context1.clearRect(0,0,500,500);
            context1.drawImage(image,0,0,500,500);
        }, index*100);
        });
        setTimeout(callback,images[animation].length * 100);
    };
    loadImages1((images)=> {
        //let selectedAnimation = "idle";
        let queuedAnimations = [];
        let aux = () =>{
            //animate(ctx,images,selectedAnimation,aux)
            let selectedAnimation;
            if (queuedAnimations.length===0){
                selectedAnimation = "i";
            }
            else {
                selectedAnimation = queuedAnimations.shift();
            }
            animate(context1,images,selectedAnimation,aux);
        };
        
        aux();
        document.getElementById("k").onclick = () =>{
            //selectedAnimation = "kick";
            queuedAnimations.push("k");
        };
        document.getElementById("p").onclick = () =>{
            //selectedAnimation = "punch";
            queuedAnimations.push("p");
        };
        document.getElementById("bl").onclick = () =>{
            //selectedAnimation = "block";
            queuedAnimations.push("bl");
        };
        document.getElementById("f").onclick = () =>{
            //selectedAnimation = "forward";
            queuedAnimations.push("f");
        };
        document.getElementById("b").onclick = () =>{
            //selectedAnimation = "backward";
            queuedAnimations.push("b");
        };
        document.addEventListener("keyup",(event)=>{
            const key=event.key;
            if(key==="ArrowLeft")
            {
                queuedAnimations.push("k");
            }
            else if(key==="ArrowRight")
            {
                queuedAnimations.push("p");  
            }
            
        });
  });
