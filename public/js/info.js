// Removes 'https://localhost:3000/' from the img src

const fixImgSrc = () => {
    const imgSrc = document.querySelector('.product-img').src;
    let newSrc = imgSrc.split('');
    newSrc.splice(0, 41);
    newSrc = newSrc.join('');
    document.querySelector('.product-img').src = newSrc;
}

fixImgSrc(); 
