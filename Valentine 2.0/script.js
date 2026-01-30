const introWrapper = document.getElementById("introWrapper");
const introText = document.getElementById("introText");
const container = document.getElementById("container");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const flash = document.getElementById("flash");
const bgMusic = document.getElementById("bgMusic");
const question = document.getElementById("question");

// YES scale
let yesScale = 1;

// FIRST CLICK ON INTRO
introWrapper.addEventListener("click", () => {
  bgMusic.volume = 0;
  bgMusic.play();

  // Fade music in
  let v = 0;
  const fade = setInterval(() => {
    if(v<0.4){ v+=0.02; bgMusic.volume=v; }
    else clearInterval(fade);
  },100);

  introText.classList.add("hide");
  setTimeout(() => {
    introWrapper.style.display = "none";
    container.classList.remove("hidden");

    // Show background heart
    const bgHeart = document.getElementById("bgHeart");
    bgHeart.style.opacity = 1;
  },900);
});

// NO BUTTON CLICK
noBtn.addEventListener("click", () => {
  // FLASH + SHAKE
  flash.style.opacity = "0.4";
  flash.style.animation = "shake 0.4s";
  setTimeout(()=>{ flash.style.opacity="0"; flash.style.animation=""; },400);

  // YES grows proportionally
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;

  // Question moves up slightly based on YES size
  question.style.marginBottom = (yesScale*15) + "px";
});

// YES BUTTON CLICK
yesBtn.addEventListener("click", () => {
  createHeartDust(); // magical heart particles

  // Smooth fade-out background heart
  const bgHeart = document.getElementById("bgHeart");
  bgHeart.style.transition = "opacity 1s ease";
  bgHeart.style.opacity = 0;
  setTimeout(() => { bgHeart.style.display = "none"; }, 1000); // remove after fade

  container.innerHTML = `
    <div class="final">
      <img src="besito-catlove.gif">
      <p class="love-text">
        YAAAAAAA! I can't wait to spend valentines day with you baby ❤️<br>
      </p>
    </div>
  `;
});

// FLOATING HEARTS
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random()*100 + "vw";
  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
},500);

// HEART DUST EFFECT
function createHeartDust() {
  const heartsCount = 40;
  for(let i = 0; i < heartsCount; i++) {
    const heart = document.createElement("div");
    heart.className = "dust-heart";
    heart.textContent = "❤️";
    
    heart.style.left = (window.innerWidth/2 + (Math.random()-0.5)*200) + "px";
    heart.style.top = (window.innerHeight/2 + (Math.random()-0.5)*100) + "px";
    
    heart.style.fontSize = (Math.random()*20 + 10) + "px";
    heart.style.opacity = 1;

    document.body.appendChild(heart);

    const dx = (Math.random()-0.5)*200;
    const dy = - (Math.random()*250 + 50);
    const rotate = (Math.random()*360);

    heart.animate([
      { transform: `translate(0px,0px) rotate(0deg) scale(1)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg) scale(1.5)`, opacity: 0 }
    ], {
      duration: 1800 + Math.random()*500,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(()=>heart.remove(), 2300);
  }
}
