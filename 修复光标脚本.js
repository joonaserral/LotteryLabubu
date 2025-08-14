// 光标修复脚本 - 适用于所有页面

// 检查是否已经有自定义光标系统
if (!window.customCursorFixed) {
    window.customCursorFixed = true;

    // 备用光标方案
    function enableCursorFallback() {
        document.body.classList.remove('custom-cursor-enabled');
        document.body.classList.add('cursor-fallback');
        console.log('🖱️ 已启用系统光标备用方案');

        // 隐藏自定义光标元素
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.display = 'none';
        }

        // 显示通知（如果有通知系统）
        if (window.showMusicNotification) {
            showMusicNotification('🖱️ 使用系统光标', 'info');
        }
    }

    // 切换光标模式
    function toggleCursorMode() {
        if (document.body.classList.contains('cursor-fallback')) {
            // 尝试重新启用自定义光标
            document.body.classList.remove('cursor-fallback');
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.display = 'block';
            }

            // 如果有自定义光标初始化函数，重新调用
            if (window.initCustomCursor) {
                window.customCursorEnabled = false;
                window.cursorInitialized = false;
                initCustomCursor();
            } else {
                document.body.classList.add('custom-cursor-enabled');
            }

            if (window.showMusicNotification) {
                showMusicNotification('🖱️ 尝试重新启用自定义光标', 'info');
            }
        } else {
            // 切换到系统光标
            enableCursorFallback();
        }
    }

    // 暴露到全局
    window.enableCursorFallback = enableCursorFallback;
    window.toggleCursorMode = toggleCursorMode;

    // 检查自定义光标是否正常工作
    function checkCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            console.log('🖱️ 未找到自定义光标元素，启用备用方案');
            enableCursorFallback();
            return;
        }

        // 设置检查定时器
        let hasMoved = false;

        function onMouseMove() {
            hasMoved = true;
            document.removeEventListener('mousemove', onMouseMove);
        }

        document.addEventListener('mousemove', onMouseMove);

        // 3秒后检查
        setTimeout(() => {
            if (!hasMoved && !document.body.classList.contains('custom-cursor-enabled')) {
                console.log('🖱️ 自定义光标可能有问题，启用备用方案');
                enableCursorFallback();
            }
        }, 3000);
    }

    // 页面加载完成后检查
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkCustomCursor);
    } else {
        checkCustomCursor();
    }

    console.log('🖱️ 光标修复脚本已加载');
}