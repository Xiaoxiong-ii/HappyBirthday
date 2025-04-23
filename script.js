document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const questionsContainer = document.getElementById('questions-container');
    const transitionScreen = document.getElementById('transition-screen');
    const transitionText = document.getElementById('transition-text');
    const photoGallery = document.getElementById('photo-gallery');
    const singlePhotoContainer = document.getElementById('single-photo-container');
    const birthdaySplash = document.getElementById('birthday-splash');
    const confettiContainer = document.querySelector('.confetti-container');
    const photoWall = document.getElementById('photo-wall');
    const photoGrid = document.querySelector('.photo-grid');
    const birthdayWish = document.getElementById('birthday-wish');
    const birthdayMessage = document.getElementById('birthday-message');
    const firstSong = document.getElementById('first-song');
    const birthdaySong = document.getElementById('birthday-song');
    
    // 当前问题索引
    let currentQuestionIndex = 1;
    
    // 照片列表 - 编号1-10的照片
    const numberedPhotos = [
        'image/1.jpg',
        'image/2.jpg',
        'image/3.jpg',
        'image/4.jpg',
        'image/5.jpg',
        'image/6.jpg',
        'image/7.jpg',
        'image/8.jpg',
        'image/9.jpg',
        'image/10.jpg'
    ];
    
    // 其他照片
    const otherPhotos = [
        'image/44d63029838cdda8d28f9d9c2c389c6.jpg',
        'image/5eaf48668ed417c05ae34c68a7f64c8.jpg',
        'image/29a42140840ef5f1f9c24b0d5e3b68f.jpg',
        'image/40926d32ea382e12961f1bf56020020.jpg',
        'image/44dc0bcbfbce4192ee0a81abae0eaa0.jpg',
        'image/75acbe8077a57707da7c9227934eed7.jpg',
        'image/76779f8f16077b5a3a89b1d351a8818.jpg',
        'image/80f78eaff819a63fe4b2a43f6754464.jpg',
        'image/9b164b09ba696db375ddf849fd33127.jpg',
        'image/399672dc8740e90f960a8cea2954b2a.jpg',
        'image/548b4695766329569d88584178b40c6.jpg',
        'image/1900cc5d8867f64e961645d1338ac15.jpg',
        'image/2a9e9754192406bf1d2be6bcdc205ea.jpg',
        'image/6cbffbd1a34187346b5ee1791604365.jpg',
        'image/a1b97400520ed2ad57df81702965f7a.jpg',
        'image/a2b36a6297ece3018cafa147f7b5f32.jpg',
        'image/a651bd6463ca92246d97715c159acc4.jpg',
        'image/a96c572049a38b73621513e4153cbc8.jpg',
        'image/b13ba1f137a9fe00bc4b2a2e3a8275b.jpg',
        'image/b2dd280f3ad32bcdc3dfbf5d0cff3eb.jpg',
        'image/b8af2468db260ff265dc716d1a4f757.jpg',
        'image/b9190c3583263d7a7f796a7b2dc451d.jpg',
        'image/bb30036d10169afae179241cddd6083.jpg',
        'image/caa9c381e3de480d2e303472c8e21d0.jpg',
        'image/cdff5901e08c20983de03326b959d26.jpg',
        'image/ce6dbda0827c7ca3efe5bef0206ce15.jpg',
        'image/daoiwbd.jpg',
        'image/fc21243edfc7f8512ef9ef0806de4f0.jpg',
        'image/fcb99ce06f547037525d26ee210d169.jpg',
        'image/fd89773cdeb89cfdd5ab04df09b7d8d.jpg',
        'image/7ce081fb450b53e327a6217da63ce4a.jpg'
    ];
    
    // 初始化事件监听
    function initEvents() {
        // 为所有回答按钮添加点击事件
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach(button => {
            button.addEventListener('click', handleAnswer);
        });
    }
    
    // 处理回答
    function handleAnswer(e) {
        const isCorrect = e.target.getAttribute('data-correct') === 'true';
        
        if (isCorrect) {
            // 正确答案的处理
            if (currentQuestionIndex < 5) {
                // 显示下一个问题
                document.getElementById(`question-${currentQuestionIndex}`).classList.add('hidden');
                currentQuestionIndex++;
                document.getElementById(`question-${currentQuestionIndex}`).classList.remove('hidden');
            } else {
                // 最后一个问题回答正确，开始转场
                startTransition();
            }
        } else {
            // 错误答案震动效果
            e.target.classList.add('animate-wrong');
            setTimeout(() => {
                e.target.classList.remove('animate-wrong');
            }, 500);
        }
    }
    
    // 开始转场
    function startTransition() {
        // 隐藏问题容器
        questionsContainer.classList.add('hidden');
        
        // 显示黑屏过渡
        transitionScreen.classList.remove('hidden');
        
        // 2秒后显示文字并同时播放第一首歌
        setTimeout(() => {
            transitionText.style.opacity = '1';
            
            // 同时播放第一首歌
            firstSong.play();
            
            // 5秒后开始照片展示
            setTimeout(() => {
                startPhotoShow();
            }, 5000);
        }, 2000);
    }
    
    // 开始照片展示
    function startPhotoShow() {
        // 隐藏转场屏幕，显示照片区域
        transitionScreen.classList.add('hidden');
        photoGallery.classList.remove('hidden');
        
        // 先展示其他照片
        showOtherPhotos(0);
    }
    
    // 显示非编号照片
    function showOtherPhotos(index) {
        if (index >= otherPhotos.length) {
            // 所有非编号照片展示完毕，准备显示生日快乐和彩带
            showBirthdaySplash();
            return;
        }
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = otherPhotos[index];
        img.classList.add('single-photo');
        
        // 清空之前的图片并添加新图片
        singlePhotoContainer.innerHTML = '';
        singlePhotoContainer.appendChild(img);
        
        // 如果是最后一张非编号照片，淡出第一首歌
        if (index === otherPhotos.length - 1) {
            // 在1秒内淡出第一首歌
            let volume = 1.0;
            const fadeInterval = setInterval(() => {
                volume -= 0.1;
                if (volume <= 0) {
                    clearInterval(fadeInterval);
                    firstSong.pause();
                    firstSong.currentTime = 0;
                } else {
                    firstSong.volume = volume;
                }
            }, 100); // 每100ms降低音量一次，共10次，大约1秒
            
            // 2秒后显示生日快乐闪屏
            setTimeout(() => {
                showBirthdaySplash();
            }, 2000);
        } else {
            // 2秒后显示下一张
            setTimeout(() => {
                showOtherPhotos(index + 1);
            }, 2000);
        }
    }
    
    // 显示生日快乐闪屏和彩带
    function showBirthdaySplash() {
        // 隐藏单张照片容器，显示生日快乐闪屏
        singlePhotoContainer.classList.add('hidden');
        birthdaySplash.classList.remove('hidden');
        
        // 先启动彩带效果
        createConfetti();
        
        // 提前1秒播放生日快乐歌
        setTimeout(() => {
            birthdaySong.play();
        }, 1000);
        
        // 3秒后开始展示编号照片
        setTimeout(() => {
            // 隐藏生日快乐闪屏，显示单张照片容器
            birthdaySplash.classList.add('hidden');
            singlePhotoContainer.classList.remove('hidden');
            
            // 开始展示编号照片
            showNumberedPhotos(0);
        }, 3000);
    }
    
    // 创建彩带效果
    function createConfetti() {
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#277da1'];
        const totalConfetti = 100;
        
        // 清空之前的彩带
        confettiContainer.innerHTML = '';
        
        // 创建新的彩带
        for (let i = 0; i < totalConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // 随机位置、颜色、形状和动画时间
            const left = Math.random() * 100; // 随机水平位置（百分比）
            const width = Math.random() * 10 + 5; // 随机宽度 5-15px
            const height = Math.random() * 15 + 10; // 随机高度 10-25px
            const color = colors[Math.floor(Math.random() * colors.length)]; // 随机颜色
            const delay = Math.random() * 3; // 随机延迟 0-3s
            const duration = Math.random() * 3 + 3; // 随机动画时间 3-6s
            
            confetti.style.left = `${left}%`;
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            // 随机旋转角度
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // 添加到容器
            confettiContainer.appendChild(confetti);
        }
    }
    
    // 显示编号照片
    function showNumberedPhotos(index) {
        if (index >= numberedPhotos.length) {
            // 所有编号照片都展示完毕，显示照片墙
            showPhotoWall();
            return;
        }
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = numberedPhotos[index];
        img.classList.add('single-photo');
        
        // 清空之前的图片并添加新图片
        singlePhotoContainer.innerHTML = '';
        singlePhotoContainer.appendChild(img);
        
        // 2秒后显示下一张
        setTimeout(() => {
            showNumberedPhotos(index + 1);
        }, 2000);
    }
    
    // 显示照片墙
    function showPhotoWall() {
        // 隐藏单张照片容器，显示照片墙
        singlePhotoContainer.classList.add('hidden');
        photoWall.classList.remove('hidden');
        
        // 创建并添加所有照片到照片墙
        const allPhotos = [...numberedPhotos, ...otherPhotos];
        
        // 打乱照片顺序，但保留数字照片在前面
        const shuffledOtherPhotos = shuffleArray([...otherPhotos]);
        const finalPhotos = [...numberedPhotos, ...shuffledOtherPhotos];
        
        finalPhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            photoGrid.appendChild(img);
        });
        
        // 先显示生日祝福
        setTimeout(() => {
            birthdayWish.classList.remove('hidden');
            
            // 再显示生日祝福语录
            setTimeout(() => {
                birthdayMessage.classList.remove('hidden');
                
                // 给祝福语录添加打字效果
                const messageText = birthdayMessage.querySelector('p');
                const originalText = messageText.textContent;
                messageText.textContent = '';
                
                let charIndex = 0;
                const typeWriter = setInterval(() => {
                    if (charIndex < originalText.length) {
                        messageText.textContent += originalText.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeWriter);
                    }
                }, 50);
            }, 1000);
        }, 1000);
    }
    
    // 数组随机排序
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 添加错误答案的震动动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wrongShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        .animate-wrong {
            animation: wrongShake 0.5s ease;
            background-color: rgba(255, 0, 0, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
    
    // 初始化
    initEvents();
}); 