const btnStay = document.getElementById("btn-stay");
const statusDiv = document.getElementById("status");
const toast = document.getElementById("toast");

let fleeCount = 0;
let isFleeing = false;

const messages = [
    "you can't stay here.",
    "seriously, there's nothing.",
    "the button doesn't want you.",
    "stop chasing it.",
    "...you're still trying?",
    "okay this is impressive.",
    "the void applauds your dedication.",
    "just go home already.",
    "fine. you win.",
];

function flee() {
    fleeCount++;
    isFleeing = true;
    btnStay.classList.add("fleeing");

    const pad = 20;
    const bw = btnStay.offsetWidth;
    const bh = btnStay.offsetHeight;
    const x = pad + Math.random() * (window.innerWidth - bw - pad * 2);
    const y = pad + Math.random() * (window.innerHeight - bh - pad * 2);

    btnStay.style.left = x + "px";
    btnStay.style.top = y + "px";

    const msgIdx = Math.min(fleeCount - 1, messages.length - 1);
    statusDiv.textContent = messages[msgIdx];
    statusDiv.classList.add("highlight");
    setTimeout(() => statusDiv.classList.remove("highlight"), 1500);

    if (fleeCount === 5) {
        showToast("the button is getting faster...");
        btnStay.style.transitionDuration = "0.15s";
    }

    if (fleeCount >= messages.length) {
        btnStay.style.opacity = "0";
        btnStay.style.pointerEvents = "none";
        setTimeout(() => {
            btnStay.remove();
            statusDiv.textContent = "the button has dissolved into the void.";
            statusDiv.classList.add("highlight");
            showToast("achievement: void embracer");
        }, 300);
    }
}

btnStay.addEventListener("mouseenter", flee);

btnStay.addEventListener("click", (e) => {
    e.preventDefault();
    if (isFleeing) {
        showToast("caught it! but why?");
        btnStay.classList.remove("fleeing");
        btnStay.style.position = "";
        btnStay.style.left = "";
        btnStay.style.top = "";
        btnStay.style.transitionDuration = "";
        statusDiv.textContent = "HTTP 404 - NOT FOUND";
        fleeCount = 0;
        isFleeing = false;
    }
});

let trailTimeout;
document.addEventListener("mousemove", (e) => {
    clearTimeout(trailTimeout);
    const dot = document.createElement("div");
    dot.className = "cursor-trail";
    dot.style.left = e.clientX - 3 + "px";
    dot.style.top = e.clientY - 3 + "px";
    document.body.appendChild(dot);
    requestAnimationFrame(() => dot.classList.add("visible"));
    setTimeout(() => dot.remove(), 600);
});

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

document.querySelectorAll("#code span").forEach((span) => {
    span.addEventListener("mouseenter", () => {
        let ticks = 0;
        const scramble = setInterval(() => {
            span.textContent = Math.floor(Math.random() * 10);
            ticks++;
            if (ticks > 6) {
                clearInterval(scramble);
                span.textContent = span.dataset.digit;
            }
        }, 50);
    });
});

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
let ki = 0;
document.addEventListener("keydown", (e) => {
    if (e.code === konami[ki]) {
        ki++;
        if (ki === konami.length) {
            ki = 0;
            document.body.style.transition = "filter 1s ease";
            document.body.style.filter = "hue-rotate(180deg) invert(1)";
            showToast("reality inverted");
            setTimeout(() => {
                document.body.style.filter = "";
            }, 4000);
        }
    } else {
        ki = 0;
    }
});
