// 页面过渡动画通用修复脚本
// 为所有页面添加统一的页面过渡功能

function addPageTransitionToPage() {
    // 1. 添加页面过渡动画覆盖层HTML
    if (!document.getElementById('pageTransitionOverlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'pageTransitionOverlay';
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="page-transition-content">
                <div class="transition-loader"></div>
                <h3 class="text-2xl font-bold mb-2">🧸 正在跳转...</h3>
                <p class="text-lg opacity-90">请稍候，即将为您加载精彩内容</p>
            </div>
        `;
        document.body.insertBefore(overlay, document.body.firstChild);
    }

    // 2. 添加CSS样式
    if (!document.getElementById('pageTransitionStyles')) {
        const style = document.createElement('style');
        style.id = 'pageTransitionStyles';
        style.textContent = `
            /* 页面过渡动画 */
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(107, 91, 149, 0.9), rgba(255, 204, 0, 0.9));
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .page-transition-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .page-transition-content {
                text-align: center;
                color: white;
                transform: translateY(20px);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .page-transition-overlay.active .page-transition-content {
                transform: translateY(0);
            }

            .transition-loader {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // 3. 添加JavaScript功能
    window.showPageTransition = function (callback) {
        const overlay = document.getElementById('pageTransitionOverlay');
        if (overlay) {
            overlay.classList.add('active');
            setTimeout(() => {
                if (callback) callback();
            }, 800);
        }
    };

    window.hidePageTransition = function () {
        const overlay = document.getElementById('pageTransitionOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };

    window.initPageTransitions = function () {
        const pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (window.showPageTransition) {
                    window.showPageTransition(() => {
                        window.location.href = href;
                    });
                } else {
                    window.location.href = href;
                }
            });
        });
    };

    // 4. 页面加载完成后隐藏过渡层
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (window.hidePageTransition) {
                window.hidePageTransition();
            }
        }, 300);
    });

    // 5. 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (window.initPageTransitions) {
                    window.initPageTransitions();
                }
            }, 100);
        });
    } else {
        setTimeout(() => {
            if (window.initPageTransitions) {
                window.initPageTransitions();
            }
        }, 100);
    }
}

// 立即执行
addPageTransitionToPage();