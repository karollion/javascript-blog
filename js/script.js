'use strict';
{/**
 * Obiekt z szablonami do HTML
 * Object with HTML templates
 */
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  }
  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

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

  const generateTitleLinks = function (customSelector = ''){
    /* remove all links of articles from left list */
    let titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    let list = document.querySelector('.list');
    list.innerHTML = '';
    const allArticles = document.querySelectorAll(select.all.articles + customSelector);
    /* variable to store links */
    let html = '';

    for(let article of allArticles){
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;
      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const articleLink = templates.articleLink(linkHTMLData);
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

  /**
   *  The function checks the number of tag occurrences.
   *  Returns the maximum and minimum number of tag occurrences.
   * @param {*} tags
   * @returns Max and Min number of tag in tags
   */
  const calculateTagsParams = function(tags){
    const params = {max: 0, min: 999999};
    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  }

  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

    return opts.tagSizes.classPrefix, classNumber;
  }

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty obiect */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWraper = article.querySelector(select.article.tags);
      /* make html variable with empty string */
      let tagsHTML = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      let tagsArray =  articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of tagsArray){
        /* generate HTML of the link */
        const linkHTMLData = {id: tag, tag: tag};
        const tagLinkHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        tagsHTML = tagsHTML + tagLinkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWraper.innerHTML = tagsHTML
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '">' +  tag + '</a></li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeLink of activeLinks){
      /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const linksHref = document.querySelectorAll('a[href="' + href + '"]');
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
    /* START LOOP: for each link */
    for(let link of allTagsLinks){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  const generateAuthors = function(){
    /* create a new variable allauthors with an empty obiect */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    for(let article of articles){
      /* find authors wrapper */
      const authorWraper = article.querySelector(select.article.author);
      /* get authors from data-author attribute */
      const authorAttribute = article.getAttribute('data-author');
      const linkHTMLData = {id: authorAttribute, author: authorAttribute};
      const authorHtml = templates.authorLink(linkHTMLData);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[authorAttribute]) {
        /* [NEW] add tag to allTags object */
          allAuthors[authorAttribute] = 1;
        } else {
          allAuthors[authorAttribute]++;
      }
      authorWraper.innerHTML = authorHtml;
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);
    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each autor in allAuthors: */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
      });
      //allAuthorsHTML += '<li><a href="#author-' + author + '">' +  author + '</a></li>';
    }
    /*[NEW] add HTML from allAuthorsHTML to authorList */
    authorList.innerHTML = templates.authorListLink(allAuthorsData);
    console.log(allAuthorsData);
  }
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    const href = clickedElement.getAttribute('href');
    const author =  href.replace('#author-', '');

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
    /* START LOOP: for each link */
    for(let link of allAuthorsLinks){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();
}
