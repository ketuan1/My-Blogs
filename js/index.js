// const elSearchForm = document.getElementById('search-form');

// render top category icon
//categories_news/featured?limit=4
fetch(`${baseUrl}categories_news?limit=4`)
  .then((response) => response.json())
  .then((res) => {
    const topCategory = res.data;
    const listTopCategory = document.getElementById('top-category');

    let htmlTopCategory = '';
    const ICONS = ['fa fa-bath', 'fa fa-female', 'fa fa-cutlery', 'fa fa-pie-chart'];
    topCategory.forEach((topCate, index) => {
      htmlTopCategory +=
        `     
        <div class="col-lg-3 col-6 grids-feature">
        <a href="category.html?id=${topCate.id}">
          <div class="area-box">
            <span class="${ICONS[index]}"></span>
            <h4 class="title-head">${topCate.name}</h4>
          </div>
        </a>
      </div>
       `;
    })
    listTopCategory.innerHTML = htmlTopCategory;
  });

//render articles highlight

fetch(`${baseUrl}articles?limit=2`)
  .then((response) => response.json())
  .then((res) => {
    const elHighlight = res.data;
    const listHighlight = document.getElementById('articles-highlight');

    let htmlHighlight = '';

    elHighlight.forEach((highlight) => {
      let classLiked = '';
      if (ARTICLES_LIKED.includes(highlight.id)) classLiked = 'liked';
      const pubDate = dayjs(highlight.publish_date).fromNow();

      //handle 20 characters
      const arrDesc = highlight.description.split(' ');
      const arrShort = arrDesc.slice(0, 20);
      let shortDesc = arrShort.join(' ');

      if (arrDesc.length > 20) shortDesc += ' ...';
      htmlHighlight +=/*html*/ `
      <div class="col-lg-6 col-md-6 item">
      <div class="card h-100">
      <div class="card-header p-0 position-relative">
        <a href="details.html?id=${highlight.id}">
          <img class="card-img-bottom d-block radius-image-full" src="${highlight.thumb}"
            alt="Card image cap">
        </a>
      </div>
      <div class="card-body blog-details">
        <a href="details.html?id=${highlight.id}" class="blog-desc">${highlight.title}</a>
        <p>${shortDesc}</p>
        <div class="author align-items-center mt-3 mb-1">
          <img src="${highlight.thumb}" alt="" class="img-fluid rounded-circle" />
          <ul class="blog-meta">
            <li>
              <a href="details.html?id=${highlight.id}">${highlight.author}</a>
            </li>
            <li class="meta-item blog-lesson">
            <span class="fa fa-clock-o"></span>${pubDate}</span>
            </li>
          </ul>
          <i class="fa fa-heart icon-like ${classLiked}" data-id="${highlight.id}" aria-hidden="true"></i>
        </div>
      </div>
    </div>
    </div>
      `;
    });
    listHighlight.innerHTML = htmlHighlight;
  });


//render topics-list-category(list subject)
fetch(`${baseUrl}categories_news?limit=4`)
  .then((response) => response.json())
  .then((res) => {
    const topCategory = res.data;
    const listCategorySubject = document.getElementById('topics-list-category');

    let htmlCategory = '';
    const ICONS = ['fa fa-bath', 'fa fa-female', 'fa fa-cutlery', 'fa fa-pie-chart'];
    topCategory.forEach((cateSubject, index) => {
      htmlCategory +=
        `     
        <a href="category.html?id=${cateSubject.id}" class="topics-list mt-3">
              <div class="list1">
                <span class="${ICONS[index]}"></span>
                <h4>${cateSubject.name}</h4>
              </div>
            </a>
       `;
    })
    listCategorySubject.innerHTML = htmlCategory;
  });


//render top pic(articles new)
fetch(`${baseUrl}articles?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const topPic = res.data;
    const listTopPic = document.getElementById('articles-latest');

    let htmlTopPic = '';
    topPic.forEach((topPic, index) => {

      //code here
      let classLiked = '';
      if (ARTICLES_LIKED.includes(topPic.id)) classLiked = 'liked';
      const pubDate = dayjs(topPic.publish_date).fromNow();
      htmlTopPic += /*html*/
        `
      <div class="col-lg-4 col-md-6">
          <div class="top-pic${index + 1}" style="background: url(${topPic.thumb}) no-repeat 0px 0px; background-size: cover">
            <div class="card-body blog-details">
              <a href="details.html?id=${topPic.id}" class="blog-desc">${topPic.title}</a>
              <div class="author align-items-center">
                <img src="${topPic.thumb}" alt="${topPic.title}" class="img-fluid rounded-circle" />
                <ul class="blog-meta">
                  <li>
                  <a href="/">${topPic.author ?? 'Admin'}</a>
                  </li>
                  <li class="meta-item blog-lesson">
                 <span class="meta-value ml-2">
                 <span class="fa fa-clock-o"></span>${pubDate}</span>
                  </li>
                </ul>
                <i class="fa fa-heart icon-like ${classLiked}" data-id="${topPic.id}" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    listTopPic.innerHTML = htmlTopPic;
  });

//render card articles (article seen more)

fetch(`${baseUrl}articles/popular?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const cardArticles = res.data;
    const listCardArticles = document.getElementById('card-articles');

    let htmlCardArticles = '';
    cardArticles.forEach((article) => {

      //code here
      let classLiked = '';
      if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';
      const pubDate = dayjs(article.publish_date).fromNow();
      //handle 20 characters
      const arrDesc = article.description.split(' ');
      const arrShort = arrDesc.slice(0, 20);
      let shortDesc = arrShort.join(' ');

      if (arrDesc.length > 20) shortDesc += ' ...';

      htmlCardArticles += /*html*/
        `
              <div class="col-lg-4 col-md-6 item">
              <div class="card h-100">
                <div class="card-header p-0 position-relative">
                  <a href="details.html?id=${article.id}" class="zvn-article-thumb">
                    <img class="card-img-bottom d-block radius-image-full" src="${article.thumb}"
                      alt="${article.title}">
                  </a>
                </div>
                <div class="card-body blog-details">
                <span class="label-blue">${article.category.name}</span>
                  <a href="details.html?id=${article.id}" class="blog-desc line-clamp-2">${article.title}</a>
                  <p>${shortDesc}</p>
                  <div class="author align-items-center">
                    <img src="${article.thumb}" alt="${article.title}" class="img-fluid rounded-circle" />
                    <ul class="blog-meta">
                      <li>
                        <a href="/">${article.author}</a> </a>
                      </li>
                      <li class="meta-item blog-lesson">
                        <span class="meta-value ml-2"><span class="fa fa-clock-o"></span>${pubDate}</span>
                      </li>
                    </ul>
                    <i class="fa fa-heart icon-like ${classLiked}" data-id="${article.id}" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
              `;
      listCardArticles.innerHTML = htmlCardArticles;
    });
  });

//render article general

let currentPage = 2;

renderArticlesGeneral(currentPage);

const btnLoadMore = document.getElementById('btn-load-more');
btnLoadMore.addEventListener('click', () => {
  currentPage++;
  const iconLoading = `
  <svg style="display: inline-block; width: 1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="currentColor" stroke-width="10" r="35"
      stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(120.057 50 50)">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
        values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
  </svg>`;
  btnLoadMore.innerHTML = `${iconLoading} Xem Thêm`;
  renderArticlesGeneral(currentPage);
})

function renderArticlesGeneral(page = 1) {
  fetch(`${baseUrl}articles?limit=4&page=${page}`)
    .then((response) => response.json())
    .then((res) => {
      const articlesGeneral = res.data;
      const listArticlesGeneral = document.getElementById('articles-general');

      let htmlArticlesGeneral = '';

      articlesGeneral.forEach((article) => {

        //code here
        let classLiked = '';
        if (ARTICLES_LIKED.includes(article.id)) classLiked = 'liked';
        const pubDate = dayjs(article.publish_date).fromNow();
        htmlArticlesGeneral +=/*html*/ `

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
                  <img src="assets/images/a1.jpg" alt="" class="img-fluid rounded-circle" />
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
      listArticlesGeneral.innerHTML += htmlArticlesGeneral;
      btnLoadMore.innerHTML = 'Xem Thêm';
    });
}

