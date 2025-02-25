if (!sessionStorage.getItem("hintShown")) {
    const hintMessage = document.querySelector(".hint");
    hintMessage.style.display = "block";

    setTimeout(() => {
        hintMessage.style.display = "none";
    }, 3000);

    sessionStorage.setItem("hintShown", "true");
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let scrollToBottom = true;

document.querySelector('.menu').addEventListener('click', function (e) {
    e.preventDefault();

    if (scrollToBottom) {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToBottom = !scrollToBottom;
});

const rotationContainer = document.querySelector('.rotation-container');
const caseElements = document.querySelectorAll('.case-3');

caseElements.forEach(caseElement => {
    const targetImage = caseElement.querySelector('img[data-target="true"]');
    
    caseElement.addEventListener('mouseenter', () => {
        rotationContainer.classList.add('paused');
    });

    caseElement.addEventListener('mouseleave', () => {
        rotationContainer.classList.remove('paused');
    });
});

function updateTime() {
    function updateTime() {
        const clockElement = document.getElementById('clock');
        const now = new Date();

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        /*const milliseconds = now.getMilliseconds().toString().padStart(3, '0');*/

        clockElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        /*clockElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;*/
    }
    /*setInterval(updateTime, 10);*/
    setInterval(updateTime, 1000);

    updateTime();
}

updateTime();

function updateVisitCount() {
    const visitCountElement = document.getElementById('visit-count');
    let visitCount = localStorage.getItem('visitCount');

    if (visitCount === null) {
        visitCount = 0;
    } else {
        visitCount = parseInt(visitCount, 10);
    }

    visitCount += 1;
    localStorage.setItem('visitCount', visitCount);
    visitCountElement.textContent = `You interacted with this website ${visitCount} times.`;
}

updateVisitCount();

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.changeContentBtn').forEach(button => {
        button.addEventListener('click', function () {
            var bioContent = document.getElementById('bioContent');
            if (this.textContent === 'ENG') {
                bioContent.innerHTML = `<p>
                    Hi! My name is Taewon Yoon, and I am a junior studying Manufacturing and Design Engineering at
                    Northwestern University, with a passion for product and UI/UX design.
                    <br><br>
                    From brainstorming to prototyping, I am always striving to find innovative solutions. My goal is to
                    create products that balance functionality and aesthetics. Through this process, I hope to provide
                    users better experiences and contribute to making life more convenient and beautiful.
            </p>`
            } else if (this.textContent === 'KOR') {
                bioContent.innerHTML = `<p>안녕하세요! 저는 현재 노스웨스턴 대학교에서 제조와 디자인 공학을 전공하고 있는 윤태원입니다. 저는 제품 및 UI/UX 디자인에 깊은 관심을 가지고 있으며, 앞으로 이 분야에서 전문성을 키워나가고 싶습니다.<br><br>저는 아이디어 구상부터 프로토타이핑까지, 항상 혁신적인 해결책을 찾으려고 노력합니다. 특히, 효용성과 미관을 모두 갖춘 제품을 만드는 것을 목표로 하고 있습니다. 이러한 과정을 통해 사용자들에게 더 나은 경험을 제공하고, 삶을 조금 더 편리하고 아름답게 만드는 데 기여하고 싶습니다.</p>`;
            } else if (this.textContent === 'JPN') {
                bioContent.innerHTML = `<p>こんにちは！私は現在、ノースウェスタン大学で製造およびデザイン工学を専攻しているユン・テウォンと申します。私は製品デザインやUI/UXデザインに深い関心を持っており、将来的にはこの分野で専門性を高めていきたいと考えています。<br><br>アイデアの発想からプロトタイピングに至るまで、常に革新的な解決策を見つけるよう努力しています。特に、機能性と美しさの両方を兼ね備えた製品を作ることを目標としています。このプロセスを通じて、ユーザーにより良い体験を提供し、生活を少しでも便利で美しいものにすることに貢献したいと考えています。</p>`;
            }
        });
    });
});

document.getElementById("resumeBtn").addEventListener("click", function() {
    window.open("resume.pdf", "_blank");
});