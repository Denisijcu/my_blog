import { fetchPostData, incrementViews, addLikeDislike, addComment } from './api.js';


const spArticle = document.getElementById("speakArticle");
const stopVoice = document.getElementById("stopSpeaking");

let mytext = "hello";

let utterance;


document.addEventListener('DOMContentLoaded', async () => {
    const postId = new URLSearchParams(window.location.search).get('postId'); // Obtener el postId de la URL


    const postData = await fetchPostData(postId);
   

 
    document.getElementById('post-title').innerText = postData.title;
    document.getElementById('post-author').innerText = `By ${postData.author}`;
    document.getElementById('post-date').innerText = new Date(postData.date).toLocaleDateString();
    document.getElementById('post-content').innerHTML = postData.content;
    document.getElementById('post-image').src = postData.imageUrl;
    document.getElementById('buy-button').href = postData.buyLink;
    document.getElementById('like-count').innerText = postData.likes;
    document.getElementById('dislike-count').innerText = postData.dislikes;
    document.getElementById('view-count').innerText = postData.totalViews;


    document.getElementById('spinner').classList.add('hidden');
  
  
    mytext = postData.content;
 

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
            <p id="article-content">${comment.text}</p>
        `;

   
     
        commentsContainer.appendChild(commentElement);
    

      
       

    });
}

spArticle.addEventListener('click', speakArticle, true);
stopVoice.addEventListener('click', stopSpeaking, true);

function speakArticle() {
    const articleText = mytext;
    const utterance = new SpeechSynthesisUtterance(articleText);
    utterance.lang = 'en-US';

   // console.log(articleText);

    const voices = speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google'));
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    speechSynthesis.speak(utterance);
}

function stopSpeaking() {
   // mytext = "";
   // console.log("Voy my text esta limpio"+mytext)
    speechSynthesis.cancel();
}