
import { fetchAllPosts } from './api.js'







document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('blog-posts-container');
    const posts = await fetchAllPosts();

    document.getElementById('spinner').classList.add('hidden');

    posts.forEach(post => {
        console.log(post)
         // Muestra el spinner
       
        const postElement = document.createElement('article');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <img src='${post.imageUrl}' alt="Blog Post Image" width="400" height="200">
            <div class="post-content">
                <h2><a href="/blog.html?postId=${post.postId}">${post.title}</a></h2>
                <p>${post.description}</p>
                <a href="/blog.html?postId=${post.postId}" class="read-more">Read More</a>
            </div>
        `;
       // document.getElementById('spinner').classList.remove('hidden');
        postsContainer.appendChild(postElement);
      
    });
});
