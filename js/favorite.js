const elArticles = document.getElementById('articles');

//variable notifications
const elNotifications = document.getElementById('notification-title');

if (ARTICLES_LIKED.length === 0) elNotifications.innerText = 'chưa có bài viết yêu thích';

elArticles.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('icon-like-favorite')) {
        const id = el.dataset.id;
        const item = document.getElementById(`favorite-item-${id}`);
        item.remove();

        if(ARTICLES_LIKED.length === 1) elNotifications.innerText = 'chưa có bài viết yêu thích'
    }
})

ARTICLES_LIKED.forEach((articleId) => {
  fetch(`${baseUrl}articles/${articleId}`)
        .then((response) => response.json())
        .then((res) => {
            const article = res.data;
            const pubDate = dayjs(article.publish_date).fromNow();

            const content = /*html*/ `
        <div class="col-lg-6 mt-4" id="favorite-item-${article.id}">
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
                  <i class="fa fa-heart icon-like liked icon-like-favorite" data-id="${article.id}" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>`;
        elArticles.innerHTML += content;
      });
});
