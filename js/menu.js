fetch(`${baseUrl}categories_news`)
  .then((response) => response.json())
  .then((res) => {
    const categories_news = res.data;
    const listCategories = document.getElementById('main-menu');

    let htmlContentMenu = '';
    let htmlContentOtherMenu = '';

    categories_news.forEach((category, index) => {
      if (index < 2) {
        htmlContentMenu += ` <li class="nav-item">
        <a class="nav-link" href="category.html?id=${category.id}">${category.name}</a>
      </li>`
      } else {
        htmlContentOtherMenu += `<a class="dropdown-item" href="category.html?id=${category.id}">${category.name}</a>`
      }
    });

    if (htmlContentMenu !== '') {
      htmlContentOtherMenu = /*html*/
        `
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Khác <span class="fa fa-angle-down"></span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="menu-categories"> ${htmlContentOtherMenu}</div>
      </li>
         `;
    }
    listCategories.innerHTML = htmlContentMenu + htmlContentOtherMenu + `<li class="nav-item"><a class="nav-link" href="favorite.html">Yêu thích <span class="text-danger" id="total-liked">(0)</span></a></li>`;

    document.getElementById('total-liked').innerText = `(${ARTICLES_LIKED.length})`;
});