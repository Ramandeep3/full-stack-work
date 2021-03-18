const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

function fetchUsers() {
    return fetchData(`${ BASE_URL }/users`)

}
fetchUsers().then(function(data) {
    console.log(data);

});


function renderUser(user) {
    return $(`<div class="user-card">
                <header>
                  <h2>${user.name}</h2>
                </header>
                <section class="company-info">
                  <p><b>Contact:</b> ${user.email}</p>
                  <p><b>Works for:</b>${user.company.name} </p>
                  <p><b>Company creed:</b>${user.company.catchPhrase}, which will ${user.company.bs}"</p>
                </section>
                <footer>
                  <button class="load-posts">POST BY ${user.username}</button>
                  <button class="load-albums">ALBUMS BY ${user.username}</button>
                </footer>
              </div>`).data('user', user);

}

function renderUserList(userList) {

    $('#user-list').empty();
    userList.forEach(function(user) {
        $('#user-list').append(renderUser(user))

    })
}

$('#user-list').on('click', '.user-card .load-posts', function() {
    fetchUserPosts($(this).closest("div").data('user').id).then(renderPostList)

});

$('#user-list').on('click', '.user-card .load-albums', function() {

    fetchUserAlbumList($(this).closest("div").data('user').id).then(renderAlbumList)

});



function fetchUserAlbumList(userId) {

    return fetchData(`${ BASE_URL }/users/${userId}/albums?_expand=user&_embed=photos`)
        // convert from JSON to an object, and return

    // console.error out the error

}

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error))
}

function renderAlbum(album) {
    album.photos.forEach(photo => $('.photo-list').append(renderPhoto(photo)))
    return `<div class="album-card">
                <header>
                <h3> quidem molestiae enim, by ${album.user.username} </h3> </header> 
                <section class="photo-list">
                </section> 
            </div>`

}

/* render a single photo */
function renderPhoto(photo) {
    return `<div class = "photo-card" >
                <a href="${photo.url}" target="_blank" >
                    <img src="${photo.thumbnailUrl}" >
                    <figure>${photo.title}</figure>
                </a> 
             </div>`

}

/* render an array of albums */
function renderAlbumList(albumList) {
    $('#app section').removeClass('active');
    $('#album-list').addClass('active');
    $('#album-list').empty();
    albumList.forEach(album => $('#album-list').append(renderAlbum(album)))
}

function fetchUserPosts(userId) {
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
}

function fetchPostComments(postId) {
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}

function setCommentsOnPost(post) {

    // if undefined, fetch them then set the result
    if (post.comments) {
        return Promise.reject(null)
    }
    // fetch, upgrade the post object, then return
    return fetchPostComments(post.id).then(function(comments) {
        post.comments = comments;
        return post;
    });

}

function renderPost(post) {
    return $(`<div class="post-card">
                <header>
                    <h3>${post.title}</h3>
                    <h3>---${post.user.username}</h3> 
                </header> 
                <p>${post.body}</p> 
                <footer>
                    <div class="comment-list"> </div> 
                    <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
                </footer>
            </div>`).data('post', post);
}

function renderPostList(postList) {
    $('#app section').removeClass('active');
    $('#post-list').addClass('active');
    $('#post-list').empty();
    postList.forEach(post => $('#post-list').append(renderPost(post)))
}

function toggleComments(postCardElement) {
    const footerElement = postCardElement.find('footer');

    if (footerElement.hasClass('comments-open')) {
        footerElement.removeClass('comments-open');
        footerElement.find('.verb').text('show');
    } else {
        footerElement.addClass('comments-open');
        footerElement.find('.verb').text('hide');
    }
}

$('#post-list').on('click', '.post-card .toggle-comments', function() {
    const postCardElement = $(this).closest('.post-card');
    const post = postCardElement.data('post');
    setCommentsOnPost(post)
        .then(function(post) {
            console.log('building comments for the first time...', post);
            $('.comment-list').empty();
            post.comments.forEach(comment => $('.comment-list').append(`<h3>${comment.body} ${comment.email}</h3>`))
            toggleComments(postCardElement);
        })
        .catch(function() {
            console.log('comments previously existed, only toggling...', post);
            toggleComments(postCardElement);
        });
});

function bootstrap() {
    fetchUsers().then(renderUserList);

}
bootstrap();