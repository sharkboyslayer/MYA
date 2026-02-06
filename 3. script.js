// ---------- Configuration ----------
const config = {
    valentineName: "MYA",
    questions: [
        {
            text: "Do you love me?",
            yesBtn: "Yes",
            noBtn: "No..",
            secretAnswer: "One out of the many reasons I love you. You shine like the brightest star in the nightsky and help guide souls to need help or comfort."
        },
        {
            text: "How much do you love me?(๑>◡<๑)",
            yesBtn: "Very much!",
            noBtn: "as much as i love my big toe",
            secretAnswer: "You and your soul are calming like a beautiful field of flowers in spring."
        },
        {
            text: "Would maybe...possibly answer my next question for me?ꉂ(˵˃ ᗜ ˂˵)",
            yesBtn: "Yes ofc!",
            noBtn: "No..never you stinky person..ew",
            secretAnswer: "Another out of many of the reasons I love you. You're such a beautiful and radiant soul. I wish that we keep meeting in our different lifetimes."
        },
        {
            text: "Will you be my Valentine...?",
            yesBtn: "Yes!",
            noBtn: "No",
            secretAnswer: ""
        }
    ],
    floatingEmojis: ['❤︎', 'ꉂ(˵˃ ᗜ ˂˵)', '۶ৎ', '💗', '❀', '🧸', '🪼'],
    celebration: {
        title: "Yay! I'm the luckiest person...",
        message: "Thank you so much for gracing my life with your presence and light.",
        emojis: "💐🌸💞💗💋🫂"
    },
    music: {
        enabled: true,
        musicUrl: "https://res.cloudinary.com/dx6ryp7rl/video/upload/v1770355133/Cults_-_Always_Forever_a_l_b_u_m_-_Static__mp3.pm_qfyi5i.mp3",
        volume: 0.5,
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music"
    },
    messageDisplayTime: 12000 // 12 seconds
};

// ---------- Elements ----------
const questionText = document.getElementById('question-text');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const hiddenMessage = document.getElementById('hidden-message');
const celebration = document.getElementById('celebration');
const celebrationTitle = document.getElementById('celebration-title');
const celebrationMessage = document.getElementById('celebration-message');
const celebrationEmojis = document.getElementById('celebration-emojis');
const musicBtn = document.getElementById('music-btn');
const music = document.getElementById('music');

let currentQuestion = 0;

// ---------- Initialize ----------
function showQuestion(index) {
    if(index >= config.questions.length){
        showCelebration();
        return;
    }

    const q = config.questions[index];
    questionText.textContent = q.text;
    yesBtn.textContent = q.yesBtn;
    noBtn.textContent = q.noBtn;
    hiddenMessage.classList.add('hidden');
}

function showCelebration() {
    document.querySelector('.buttons').style.display = 'none';
    questionText.style.display = 'none';
    hiddenMessage.style.display = 'none';
    celebration.classList.remove('hidden');
    celebrationTitle.textContent = config.celebration.title;
    celebrationMessage.textContent = config.celebration.message;
    celebrationEmojis.textContent = config.celebration.emojis;
}

// ---------- Button Handlers ----------
yesBtn.addEventListener('click', () => {
    const message = config.questions[currentQuestion].secretAnswer;
    if(!message) {
        currentQuestion++;
        showQuestion(currentQuestion);
        return;
    }
    hiddenMessage.textContent = message;
    hiddenMessage.classList.remove('hidden');
    yesBtn.disabled = true;
    noBtn.disabled = true;

    setTimeout(() => {
        hiddenMessage.classList.add('hidden');
        currentQuestion++;
        showQuestion(currentQuestion);
        yesBtn.disabled = false;
        noBtn.disabled = false;
    }, config.messageDisplayTime);
});

noBtn.addEventListener('click', () => {
    currentQuestion++;
    showQuestion(currentQuestion);
});

// ---------- Music ----------
if(config.music.enabled){
    music.src = config.music.musicUrl;
    music.volume = config.music.volume;

    musicBtn.addEventListener('click', () => {
        if(music.paused){
            music.play();
            musicBtn.textContent = config.music.stopText;
        } else {
            music.pause();
            musicBtn.textContent = config.music.startText;
        }
    });
} else {
    musicBtn.style.display = 'none';
}

// ---------- Floating Emojis ----------
function createFloatingEmoji(emoji){
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.position = 'absolute';
    span.style.fontSize = `${Math.random()*30 + 20}px`;
    span.style.top = `${Math.random()*100}%`;
    span.style.left = `${Math.random()*100}%`;
    span.style.opacity = Math.random();
    span.style.animation = `float ${Math.random()*15 + 10}s linear infinite`;
    document.getElementById('floating-emojis').appendChild(span);
}

config.floatingEmojis.forEach(e => createFloatingEmoji(e));

// Floating animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
    0% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-50px) translateX(50px); }
    100% { transform: translateY(0) translateX(0); }
}`;
document.head.appendChild(style);

// ---------- Start ----------
showQuestion(currentQuestion);
