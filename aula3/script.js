function loadImgAsBase64(url, callback) {
    let canvas = document.createElement('CANVAS');
    let img = document.createElement('img');
    img.setAttribute('crossorigin', 'anonymous');
    img.src = 'https://cors-anywhere.herokuapp.com/' + url;
  
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      let context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL('image/png');
      canvas = null;
      callback(dataURL);
    };
  }
  
  
  let url = 'https://randomuser.me/api/portraits/thumb/men/71.jpg';
  
  this.loadImgAsBase64(url, (dataURL) => {
     msg.innerText = dataURL.slice(0,50)+'...';
     // show pic
     document.body.innerHTML += `<img src="${dataURL}">`
  });