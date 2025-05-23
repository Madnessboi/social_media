let posts = [];

const TITLE_VALIDATION_LIMIT = 15;
const TEXT_VALIDATION_LIMIT = 25;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const postBtnNode = document.querySelector(".js-post-btn");
const postsNode = document.querySelector(".js-posts");
const postsDate = document.querySelector(".js-post-date");
const validationMessage = document.querySelector(".validationMessage");

postBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();

  postTitleInputNode.value = "";
  postTextInputNode.value = "";
});

postTitleInputNode.addEventListener("input", validation);

postTextInputNode.addEventListener("input", validation);

function validation() {
  const titleLen = postTitleInputNode.value.length;
  const textLen = postTextInputNode.value.length;

  if (titleLen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    postBtnNode.setAttribute("disabled", true);
    return;
  }

  if (textLen > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    postBtnNode.setAttribute("disabled", true);
    return;
  }

  if (titleLen === 0) {
    validationMessage.innerText = `Заполните поле заголовка для публикации`;
    validationMessage.classList.remove("validationMessage_hidden");
    postBtnNode.setAttribute("disabled", true);
    return;
  }

  if (textLen === 0) {
    validationMessage.innerText = `Заполните поле с содержимым поста для публикации`;
    validationMessage.classList.remove("validationMessage_hidden");
    postBtnNode.setAttribute("disabled", true);
    return;
  }

  if (titleLen < 4) {
    validationMessage.innerText = `Заголовок короткий, введите более 3х символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    postBtnNode.setAttribute("disabled", true);
    return;
  }

  validationMessage.classList.add("validationMessage_hidden");
  postBtnNode.removeAttribute("disabled");
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  const date = new Date();
  const dateTime =
    date.getUTCDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " | " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return {
    title: title,
    text: text,
    date: dateTime,
  };
}

function addPost({date, title, text}) {
  posts.push({
    date,
    title,
    text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
      <div class='post'>
      <p class='post__date'>${post.date}</p>
    <p class='post__title'>${post.title}</p>
    <p class='post__text'>${post.text}</p>
  </div>
    `;
  });

  postsNode.innerHTML = postsHTML;
}
