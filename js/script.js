'use strict';
{
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

const generateTitleLinks = function (){
  /* remove all links of articles from left list */
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let list = document.querySelector(".list");
  list.innerHTML = '';
  const allArticles = document.querySelectorAll(optArticleSelector);
  /* variable to store links */
  let html = '';

  for(let article of allArticles){
    /* get the article id */
    const articleId = article.getAttribute("id");
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    let articleLink = ('<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a><li>');
    /* insert link into html variable */
    html = html + articleLink;
    
  }
  /* add links to left list of articles */
  titleList.innerHTML = html;

  /* to the function of clicking on the titles of articles */
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
}