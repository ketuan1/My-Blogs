//render pagination category
const articleId = getQueryString('id');

const elArticleTitle = document.getElementById('article-title');
const elArticleDate = document.getElementById('article-date');
const elArticleAuthor = document.getElementById('article-author');
const elArticleCategory = document.getElementById('article-category');
const elArticleThumb = document.getElementById('article-thumb');
const elArticleContent = document.getElementById('article-content');
const elArticlesRelated = document.getElementById('articles-related');
//articles of seen
const elArticlesSeen = document.getElementById('articles-seen');
//variable comment
const inputCommentName = document.getElementById('comment-name');
const inputCommentMessage = document.getElementById('comment-message');
const elCommentForm = document.getElementById('comment-form');
const elCommentTotal = document.getElementById('comment-total');

//COMMENT
let COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || {};

renderComments(COMMENTS);

elCommentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const commentName = inputCommentName.value;
  const commentMessage = inputCommentMessage.value;
  const commentItem = {
    id: createId(),
    name: commentName,
    message: commentMessage,
    date: new Date(),
    articleId: articleId,
  };

  if (COMMENTS[articleId]) {
    COMMENTS[articleId].push(commentItem);
  } else {
    COMMENTS[articleId] = [commentItem];
  }

  renderComments(COMMENTS);
  inputCommentName.value = '';
  inputCommentMessage.value = '';
  localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS));
})

//function COMMENT
function renderComments(items) {
  let contentHTML = '';
  const listComment = items[articleId] || [];
  elCommentTotal.innerText = listComment.length;

  listComment.forEach((item) => {
    contentHTML += /* html */ `
    <div class="media-grid">
      <div class="media">
        <a class="comment-img" href="#url"><img src="assets/images/a1.jpg" class="img-responsive" width="100px" alt="${item.name}"></a>
        <div class="media-body comments-grid-right">
          <h5>${item.name}</h5>
          <ul class="p-0 comment">
            <li class="">${item.date}</li>
            <li>
              <a href="#comment" class="text-primary">Reply</a>
            </li>
          </ul>
          <p>${item.message}</p>
        </div>
      </div>
    </div>`;
  });
  document.getElementById('comment-list').innerHTML = contentHTML;
}

//article related
let articlesSeen = JSON.parse(localStorage.getItem('ARTICLES_SEEN')) || [];

if (!articlesSeen.includes(articleId)) {
    if (articlesSeen.length >= 4) {
      articlesSeen.shift();
    }
    articlesSeen.push(articleId);
    localStorage.setItem('ARTICLES_SEEN', JSON.stringify(articlesSeen));
  }

//render articles seen
const articlesSeenRender = articlesSeen.filter(id => id !== articleId);

articlesSeenRender.forEach((articleSeenId) => {
    fetch(`${baseUrl}articles/${articleSeenId}`)
      .then((response) => response.json())
      .then((res) => {
        const article = res.data;
  
        const content = `
        <article class="post">
          <figure class="post-thumb"><img src="${article.thumb}" alt="${
            article.title
          }" class="h-100 w-100" style="object-fit: cover"></figure>
          <div class="text">
            <a href="details.html?id=${article.id}">${article.title}</a>
          </div>
          <div class="post-info">${dayjs(article.publish_date).fromNow()}</div>
        </article>`;
        elArticlesSeen.innerHTML += content;
      });
  });


//render title top details
fetch(`${baseUrl}articles/${articleId}`)
  .then((response) => response.json())
  .then((res) => {
    const article = res.data;

    elArticleTitle.innerText = article.title;
    elArticleDate.innerText = dayjs(article.publish_date).fromNow();
    elArticleAuthor.innerText = article.author;
    elArticleCategory.href = `category.html?id=${article.category_id}`;
    elArticleCategory.innerHTML = `<strong>${article.category.name}</strong>`;
    elArticleThumb.src = article.thumb;
    elArticleContent.innerHTML = article.content;
  });

//render article related    
fetch(`${baseUrl}articles/${articleId}/related?limit=3`)
  .then((response) => response.json())
  .then((res) => {
    const articles = res.data;

    let content = '';
    articles.forEach((article) => {
      content += `
      <article class="post">
        <figure class="post-thumb">
        <img src="${article.thumb}" alt="${article.title}" class="h-100 w-100" style="object-fit: cover">
      </figure>
        <div class="text">
          <a href="details.html?id=${article.id}">${article.title}</a>
        </div>
        <div class="post-info">${dayjs(article.publish_date).fromNow()}</div>
        <i class="fa fa-heart icon-like" aria-hidden="true"></i>
      </article>`;
    });
    elArticlesRelated.innerHTML = content;
  });
