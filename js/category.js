//render pagination category
const categoryId = getQueryString('id');

renderArticles(1);

function renderArticles(page = 1) {
  fetch(`${baseUrl}categories_news/${categoryId}/articles?limit=10&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articles = res.data;
      const totalPage = res.meta.last_page;
      const listArticle = document.getElementById('articles');

      let htmlArticle = '';
      articles.forEach((article, index) => {

        //render menu interface follow name 
        if (index === 0) {
          const categoryName = article.category.name;
          document.getElementById('category-title').innerText = categoryName;
          console.log(categoryName);
        }

        //code here
        let classLiked = '';
        if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';

        const pubDate = dayjs(article.publish_date).fromNow();

        htmlArticle += /*html*/ `
        <div class="col-lg-6 mt-4">
          <div class="bg-clr-white hover-box h-100">
            <div class="row h-100">
              <div class="col-sm-5 position-relative">
                <a href="details.html?id=${article.id}" class="image-mobile zvn-article-thumb h-100">
                  <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                    alt="${article.title}">
                </a>
              </div>
              <div class="col-sm-7 card-body blog-details align-self">
                <a href="details.html?id=${article.id}" class="blog-desc line-clamp-2">${article.title}</a>
                <div class="author align-items-center">
                  <img src="${article.thumb}" alt="" class="img-fluid rounded-circle" />
                  <ul class="blog-meta">
                    <li>
                      <a href="/">${article.author}</a>
                    </li>
                    <li class="meta-item blog-lesson">
                      <span class="meta-value"> <span class="fa fa-clock-o"></span> ${pubDate} </span>
                    </li>
                  </ul>
                  <i class="fa fa-heart icon-like ${classLiked}" data-id="${article.id}" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      });
      listArticle.innerHTML = htmlArticle;
      renderPagination(page, totalPage);
    })
    .catch((error) => {
      window.location.href = '404.html';
  })
}


