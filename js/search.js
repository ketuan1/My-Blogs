const keyword = getQueryString('keyword');

renderArticles(1);

function renderArticlesItem(article) {

    //code here
    let classLiked = '';
    if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';
    const pubDate = dayjs(article.publish_date).fromNow();
    return/*html*/ `
    <div class="col-lg-4 col-md-6 item mb-4">
    <div class="card h-100">
        <div class="card-header p-0 position-relative">
            <a href="details.html?id=${article.id}" class="zvn-article-thumb">
                <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                    alt="${article.title}">
            </a>
        </div>
        <div class="card-body blog-details">
            <a href="details.html?id=${article.id}" class="blog-desc">${article.title}</a>
            <p>${article.description}</p>
            <div class="author align-items-center mt-3 mb-1">
                <img src="${article.thumb}" alt="${article.title}" class="img-fluid rounded-circle" />
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
    `
}

//render page
function renderArticles(page = 1, searchValue = '') {
    fetch(`${baseUrl}articles/search?q=${keyword}&limit=9&page=${page}`)
        .then((response) => response.json())
        .then((res) => {
            const articles = res.data;
            const total = res.meta.total;
            //console.log(res);
            const totalPage = res.meta.last_page;
            const listArticle = document.getElementById('articles');
            
            document.getElementById('search-title').innerHTML = `Đã tìm thấy <span class="font-italic">${total}</span> bài viết với từ khóa <span class="font-italic">"${keyword}"</span>`;

            let htmlArticle = '';
            articles.forEach((article, index) => {
            
                htmlArticle += renderArticlesItem(article);
            });
            listArticle.innerHTML = htmlArticle;
            renderPagination(page, totalPage);
        });
}


