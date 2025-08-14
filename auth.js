// VIP股东认证系统 - 加密保护
(function () {
    'use strict';

    // 反调试保护
    const _0x4a2b = function () {
        let _0x1f3c = function () {
            return ![];
        };
        return _0x1f3c.toString().search('debugger') === -1;
    };

    setInterval(function () {
        if (!_0x4a2b()) {
            window.location.href = 'about:blank';
        }
    }, 4000);

    // 禁用开发者工具
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            console.log('🚫 开发者工具被禁用');
        }
    });

    // 禁用右键菜单
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // 禁用文本选择
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    // VIP认证码验证
    const _vipCodes = [
        '雷爽'
    ];

    // 基础混淆的验证函数
    const _0x52f1 = function (_0x3a1b, _0x4c2d) {
        return btoa(_0x3a1b).includes(btoa(_0x4c2d));
    };

    // 检查VIP访问权限
    window.checkVIPAccess = function () {
        // 防止重复认证的标记
        if (window._vipAuthInProgress) {
            console.log('🔄 认证进行中，请稍候...');
            return false;
        }

        const stored = localStorage.getItem('_vip_auth_token');
        if (!stored) {
            window._vipAuthInProgress = true;
            const result = requestVIPCode();
            window._vipAuthInProgress = false;
            return result;
        }

        try {
            const decoded = atob(stored);
            const timestamp = parseInt(decoded.split('|')[1]);
            const now = Date.now();

            // Token有效期24小时
            if (now - timestamp > 86400000) {
                localStorage.removeItem('_vip_auth_token');
                window._vipAuthInProgress = true;
                const result = requestVIPCode();
                window._vipAuthInProgress = false;
                return result;
            }

            console.log('✅ 股东身份验证成功');
            return true;
        } catch (e) {
            localStorage.removeItem('_vip_auth_token');
            window._vipAuthInProgress = true;
            const result = requestVIPCode();
            window._vipAuthInProgress = false;
            return result;
        }
    };

    function requestVIPCode() {
        console.log('🔐 开始股东身份验证...');
        const code = prompt('🏢 Labubu基金会VIP系统\n\n请输入股东姓名：');
        if (!code) {
            console.log('🚫 股东认证已取消');
            alert('系统需要验证股东身份才能访问');
            window.location.href = 'welcome.html';
            return false;
        }

        if (_vipCodes.includes(code)) {
            const token = btoa(code + '|' + Date.now());
            localStorage.setItem('_vip_auth_token', token);
            console.log('✅ 股东身份验证成功，欢迎 ' + code);
            return true;
        } else {
            console.log('❌ 股东姓名验证失败');
            alert('❌ 股东姓名验证失败\n\n请确认您的股东身份，或联系基金会管理员');
            window.location.href = 'welcome.html';
            return false;
        }
    }

    // VIP标识显示函数（由主程序调用）
    window.showVIPBadge = function () {
        // 检查是否已经显示过标识
        if (document.querySelector('.vip-badge')) {
            return;
        }

        // 显示VIP标识
        const vipBadge = document.createElement('div');
        vipBadge.className = 'vip-badge';

        // 响应式样式，避免挡住导航按钮
        const isMobile = window.innerWidth <= 768;

        vipBadge.style.cssText = `
            position: fixed;
            ${isMobile ? 'top: 70px; right: 10px;' : 'top: 10px; right: 10px;'}
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #8B4513;
            padding: ${isMobile ? '6px 12px' : '8px 16px'};
            border-radius: 20px;
            font-size: ${isMobile ? '11px' : '12px'};
            font-weight: bold;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
            transition: all 0.3s ease;
            max-width: ${isMobile ? '140px' : 'none'};
            text-align: center;
        `;
        vipBadge.textContent = '👑 股东身份已认证';
        document.body.appendChild(vipBadge);

        // 监听窗口大小变化，动态调整位置
        const adjustBadgePosition = () => {
            const isMobileView = window.innerWidth <= 768;
            if (isMobileView) {
                vipBadge.style.top = '70px';
                vipBadge.style.right = '10px';
                vipBadge.style.padding = '6px 12px';
                vipBadge.style.fontSize = '11px';
                vipBadge.style.maxWidth = '140px';
            } else {
                vipBadge.style.top = '10px';
                vipBadge.style.right = '10px';
                vipBadge.style.padding = '8px 16px';
                vipBadge.style.fontSize = '12px';
                vipBadge.style.maxWidth = 'none';
            }
        };

        window.addEventListener('resize', adjustBadgePosition);

        // 5秒后自动隐藏（可选）
        setTimeout(() => {
            if (vipBadge && vipBadge.parentNode) {
                vipBadge.style.opacity = '0.8';
                vipBadge.style.transform = 'scale(0.9)';
            }
        }, 5000);
    };

    // 防复制保护
    document.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', '🧸 Labubu基金会VIP专享内容受版权保护');
        e.preventDefault();
    });

    // 水印保护已移除 - 根据用户要求

})();