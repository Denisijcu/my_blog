import { fetchPostData, incrementViews, addLikeDislike, addComment } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const postId = '2'; // Asegúrate de obtener este valor dinámicamente en un entorno real

    const postData = await fetchPostData(postId);

    document.getElementById('post-title').innerText = postData.title;
    document.getElementById('post-author').innerText = `By ${postData.author}`;
    document.getElementById('post-date').innerText = new Date(postData.date).toLocaleDateString();
    document.getElementById('post-content').innerHTML = postData.content;
    document.getElementById('like-count').innerText = postData.likes;
    document.getElementById('dislike-count').innerText = postData.dislikes;
    document.getElementById('view-count').innerText = postData.totalViews;

    loadComments(postData.comments);

    document.getElementById('like-btn').addEventListener('click', async () => {
        await addLikeDislike(postId, true, false);
        const updatedData = await fetchPostData(postId);
        document.getElementById('like-count').innerText = updatedData.likes;
        document.getElementById('dislike-count').innerText = updatedData.dislikes;
    });

    document.getElementById('dislike-btn').addEventListener('click', async () => {
        await addLikeDislike(postId, false, true);
        const updatedData = await fetchPostData(postId);
        document.getElementById('like-count').innerText = updatedData.likes;
        document.getElementById('dislike-count').innerText = updatedData.dislikes;
    });

    document.getElementById('comment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('comment-name').value;
        const commentText = document.getElementById('comment-text').value;
        if (name && commentText) {
            await addComment(postId, name, commentText);
            const updatedData = await fetchPostData(postId);
            loadComments(updatedData.comments);
            document.getElementById('comment-form').reset();
        }
    });

    await incrementViews(postId);
});

function loadComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p class="comment-author">${comment.name || 'Anonymous'}</p>
            <p class="comment-date">${new Date(comment.date).toLocaleDateString()}</p>
            <p>${comment.text}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}
