const input = document.getElementById('input'),
        btn = document.getElementById('btn'),
        qrImage = document.getElementById('qrImage'),
        qrcode = document.getElementById('qrcode'),
        content = document.getElementById('content');



btn.addEventListener('click',()=>{
        if(input.value === ""){
                content.classList.add('error')
                qrcode.classList.remove('showImage')
                qrImage.src="";
                setTimeout(function(){
                        content.classList.remove('error');
                },500)
        }
        else{
                qrImage.src =  'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + input.value;
                qrcode.classList.add('showImage');
                btn.style.display = 'block';
                copyImg.style.display = 'inline-block';
                btnDownload.style.display = 'inline-block';
                qrcode.style.display = 'block';
        }
})

let btnDownload = document.querySelector('#dlqrImg');
let imgdwn = document.querySelector('#qrImage');

btnDownload.addEventListener('click', () => {
    let imagePath = imgdwn.src;
    let fileName = getFileName(imagePath);
    saveAs(imagePath, fileName);
});

function getFileName(str) {
    let gotstr = str.substring(str.lastIndexOf('=') + 1 );
    let format = ".png";
    return gotstr.concat(format);
}

const copyImg = document.getElementById('copyImg');
copyImg.addEventListener('click',()=>{
        copyToClipboard(qrImage.src);
        const clickButton = event.currentTarget;
        if(clickButton === copyImg){
                copyAlert.style.display = 'block';
        }else{
                copyAlert.style.display = 'none';
        }
        setTimeout(() => {
                copyAlert.style.display = 'none';
        }, 2000);
       
})

async function copyToClipboard(src){
        const data = await fetch(src);
        const blob = await data.blob();
        try{
               await  navigator.clipboard.write([
                        new ClipboardItem({
                                [blob.type]:blob,
                        })
                ])
                console.log("success");
        } catch(e){
                console.log('error');
        }

}

const copyAlert = document.getElementById('CopyInfo');

