document.querySelector('.btnS').addEventListener('click', function () {
  let searchTerm = document.getElementById('search-input').value.trim();
  console.log(searchTerm);
  if (!searchTerm || searchTerm === undefined) {
    searchTerm = "";
  }
  console.log(searchTerm);

  let apiUrl = 'http://203.159.93.114:8038/productserviceswithjwt/products';

  if (searchTerm && searchTerm !== "") {
    apiUrl = `http://203.159.93.114:8038/productserviceswithjwt/product/${searchTerm}`;
  }

  fetch(apiUrl, { method: "GET" })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      console.log(products);
      console.log(products.data);
      const productsContainer = document.querySelector('.product');
      productsContainer.innerHTML = '';

      products.data.forEach(product => {
        const productHTML = `
          <div class="product-card" data-name="${product.id}">
            <img src="https://cdn.discordapp.com/attachments/1151198513078730862/1151198861210169405/italian.png?ex=65661afc&is=6553a5fc&hm=1571f091ce1767f519df64e1bca65fd38797c8cb8f63a39f141cbe0e5325a5f9&">
            <div class="short-info" alt="product-image">
              <h3>${product.product_name}</h3>
              <p>${product.roast_level}</p>
              <p>$${product.price}</p>
              <p>${product.country}</p>
            </div>
          </div>
        `;
        productsContainer.innerHTML += productHTML;
      });
    })
    .catch(error => console.error("Error: Can't Add Card", error));
});