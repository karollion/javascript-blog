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
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function (customSelector = ''){
    /* remove all links of articles from left list */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    let list = document.querySelector('.list');
    list.innerHTML = '';
    const allArticles = document.querySelectorAll(optArticleSelector + customSelector);
    /* variable to store links */
    let html = '';

    for(let article of allArticles){
      /* get the article id */
      const articleId = article.getAttribute('id');
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
  };
  generateTitleLinks();

  const generateTags = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWraper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let tagsHTML = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      let tagsArray =  articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of tagsArray){
        /* generate HTML of the link */
        let tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        tagsHTML = tagsHTML + tagLinkHTML;
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWraper.innerHTML = tagsHTML
    /* END LOOP: for every article: */
    }
  }
  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag =  href.replace('#tag-', '');   // Remove '#tag-' from href ( #tag-news ---> news)
    console.log(tag);

    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeLinks);

    /* START LOOP: for each active tag link */
    for(let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const linksHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log(linksHref);
    /* START LOOP: for each found tag link */
    for(let linkHref of linksHref){
      /* add class active */
      linkHref.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  const addClickListenersToTags = function(){
    /* find all links to tags */
    const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
    console.log(allTagsLinks);
    /* START LOOP: for each link */
    for(let link of allTagsLinks){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    for(let article of articles){
      const authorWraper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWraper);
      const authorAttribute = article.getAttribute('data-author');
      console.log(authorAttribute);
      const authorHtml = '<a href="#author-' + authorAttribute + '">' + authorAttribute + '</a>';
      console.log(authorHtml);
      authorWraper.innerHTML = authorHtml;
    }
  }
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    const author =  href.replace('#author-', '');
    console.log(author);

    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    const linksHref = document.querySelectorAll('a[href="' + href + '"]');
    for(let linkHref of linksHref){
      linkHref.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  const addClickListenersToAuthors = function(){
    /* find all links to authors */
    const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');
    console.log(allAuthorsLinks);
    /* START LOOP: for each link */
    for(let link of allAuthorsLinks){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();
}
