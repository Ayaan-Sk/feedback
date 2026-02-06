// Firebase Configuration (Provided by user)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3ziCKSIX5hceHP6BLC_p3gTUFG0ATNlk",
  authDomain: "airsight-fn1yq.firebaseapp.com",
  projectId: "airsight-fn1yq",
  storageBucket: "airsight-fn1yq.firebasestorage.app",
  messagingSenderId: "82987058042",
  appId: "1:82987058042:web:07652f9678a46dedee4cc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reveal on Scroll Logic
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Feedback Form Logic
document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = feedbackForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                contact: document.getElementById('contact').value,
                feedback: document.getElementById('message').value,
                timestamp: serverTimestamp()
            };

            try {
                await addDoc(collection(db, "advantage_vidarbha_feedback"), formData);
                alert('Thank you for your feedback!');
                feedbackForm.reset();
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Error submitting feedback. Please try again.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
