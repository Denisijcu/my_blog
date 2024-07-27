const API_URL = 'https://script.google.com/macros/s/AKfycbwW4EazLabB73iDa_ICo-sjj3RJNPTWEm25mLoV0ZbKfVcs0ZEdzp8aqV0vGMhfNROz/exec';

export async function fetchPostData(postId) {
    const response = await fetch(`${API_URL}?action=getPost&postId=${postId}`);
    return await response.json();
}

export async function incrementViews(postId) {
    const response = await fetch(`${API_URL}?action=incrementViews&postId=${postId}`);
    return await response.json();
}

export async function addLikeDislike(postId, like, dislike) {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'addLikeDislike',
            postId: postId,
            like: like,
            dislike: dislike
        })
    });
    return await response.json();
}

export async function addComment(postId, name, commentText) {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'addComment',
            postId: postId,
            name: name,
            commentText: commentText
        })
    });
    return await response.json();
}
