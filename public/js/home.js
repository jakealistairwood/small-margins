const truncateText = () => {
    let productDescription = document.querySelectorAll('.product__description');
    productDescription.forEach(item => {
        if (item.innerHTML.length > 100) {
            const shortenedText = item.innerHTML.substr(0, 150) + "...";
            item.innerHTML = shortenedText;
        }
    });
}

truncateText();