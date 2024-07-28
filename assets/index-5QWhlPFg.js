(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const i="https://script.google.com/macros/s/AKfycbzHItP3rgLkyiJMGK0nt_1x9AZwwRyytT11vZJtEprhQrx2Csg5OTcdyk_wmV1urIbF/exec";async function d(){return await(await fetch(`${i}?action=getAllPosts`)).json()}document.addEventListener("DOMContentLoaded",async()=>{const n=document.getElementById("blog-posts-container"),r=await d();document.getElementById("spinner").classList.add("hidden"),r.sort((o,s)=>s.postId-o.postId),r.forEach(o=>{const s=document.createElement("article");s.classList.add("blog-post"),s.innerHTML=`
            <img src='${o.imageUrl}' alt="Blog Post Image">
            <div class="post-content">
                <h2><a href="/blog.html?postId=${o.postId}">${o.title}</a></h2>
                <p>${o.description}</p>
                <a href="/blog.html?postId=${o.postId}" class="read-more">Read More</a>
            </div>
        `,n.appendChild(s)})});
