let posts = [];

const likedPostsId = [];
const reportedPostsId = [];

const selectById = (id) => document.getElementById(id);

const getPosts = (term) => posts.filter(({ id }) => term.includes(id));

const isLiked = (id) => {
  return likedPostsId?.length && !!likedPostsId.includes(id);
};

const addToLiked = (id) => {
  // if does not like before add liked post
  if (likedPostsId.includes(id)) return;

  likedPostsId.push(id);
  showPosts(posts.filter(({ id }) => !reportedPostsId.includes(id)));
};

const reportPost = (id) => {
  reportedPostsId.push(id);
  const remainingPosts = posts.filter(
    (post) => !reportedPostsId.includes(post.id)
  );
  showPosts(remainingPosts);
};

const displayContent = (text) => {
  return text.length < 30
    ? text
    : text.slice(0, 30) + "<span class='fw-bold'>... read more</span>";
};

const switchTab = (id) => {
  if (id === "posts") {
    selectById("posts").style.display = "grid";
    selectById("liked").style.display = "none";
    selectById("reported").style.display = "none";
  } else if (id === "liked") {
    selectById("liked").style.display = "block";
    selectById("posts").style.display = "none";
    selectById("reported").style.display = "none";

    // displayLikedPosts
    displayPosts(getPosts(likedPostsId), id);
  } else {
    selectById("reported").style.display = "block";
    selectById("posts").style.display = "none";
    selectById("liked").style.display = "none";

    // displayReportedPosts
    displayPosts(getPosts(reportedPostsId), id);
  }
};

const createPost = ({ id, userImage, image, description, comments }) => {
  // const  = post;

  const div = document.createElement("article");
  div.classList.add("post");
  div.innerHTML = `
              <div class="post__header">
                <div class="post__profile">
                  <a
                    href="https://github.com/ProgrammingHero1"
                    target="_blank"
                    class="post__avatar"
                  >
                    <img src="${userImage}" alt="User Picture" />
                  </a>
                  <a href="#" class="post__user">phero</a>
                </div>

                <button class="post__more-options">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              <div class="post__content">
                <div class="post__medias">
                  <img
                    class="post__media"
                    src="${image}"
                    alt="Post Content"
                  />
                </div>
              </div>

              <div class="post__footer">
                <div class="post__buttons">
                  <button class="post__button" onclick="addToLiked(${id})">
                  <i class="fa-solid fa-heart ${
                    isLiked(id) && "text-danger"
                  }"></i>
                    
                  </button>
                  <button class="post__button">
                    <i class="fa-solid fa-comment"></i>
                  </button>
                  

                  <div class="post__indicators"></div>

                  <button class="post__button post__button--align-right" onclick="reportPost(${id})">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                </div>

                <div class="post__content">${displayContent(description)}</div>

                <div class="post__infos">
                  <div class="post__likes">
                    <a href="#" class="post__likes-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="User Picture" />
                    </a>

                    <span>Liked by
                      <a class="post__name--underline" href="#">user123</a> and
                      <a href="#">73 others</a></span>
                  </div>

                  <hr/>

                  <div class="post__description">
                    <small>
                      <a class="post__name--underline" href="#">
                          ${comments[0].user}
                      </a>
                      ${comments[0].text}
                    </small>
                  </div>
                  <span class="post__date-time">30 minutes ago</span>
                </div>
              </div>
      `;
  return div;
};

const showPosts = (posts) => {
  const productsContainer = selectById("posts");
  productsContainer.innerHTML = "";

  posts.forEach((post) => {
    const div = createPost(post);
    productsContainer.appendChild(div);
  });
};

const displayPosts = (posts, term) => {
  // there is no posts to show
  if (posts.length === 0) return;

  const container = selectById(term);

  const postsStr = posts.map((post) => createPost(post)["outerHTML"]).join("");

  container.innerHTML = container.firstElementChild.outerHTML + postsStr;
};

const loadPosts = async () => {
  let data = await fetch("../data/posts.json");
  posts = await data.json();
  showPosts(posts);
};

loadPosts();
