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
        const stored = localStorage.getItem('_vip_auth_token');
        if (!stored) {
            return requestVIPCode();
        }

        try {
            const decoded = atob(stored);
            const timestamp = parseInt(decoded.split('|')[1]);
            const now = Date.now();

            // Token有效期24小时
            if (now - timestamp > 86400000) {
                localStorage.removeItem('_vip_auth_token');
                return requestVIPCode();
            }

            return true;
        } catch (e) {
            localStorage.removeItem('_vip_auth_token');
            return requestVIPCode();
        }
    };

    function requestVIPCode() {
        const code = prompt('请输入股东姓名：');
        if (!code) {
            console.log('🚫 VIP认证取消');
            window.location.href = 'welcome.html';
            return false;
        }

        if (_vipCodes.includes(code)) {
            const token = btoa(code + '|' + Date.now());
            localStorage.setItem('_vip_auth_token', token);
            return true;
        } else {
            alert('股东姓名验证失败，请确认您的股东身份');
            window.location.href = 'welcome.html';
            return false;
        }
    }

    // 页面加载时验证
    document.addEventListener('DOMContentLoaded', function () {
        if (!checkVIPAccess()) {
            return;
        }

        // 显示VIP标识
        const vipBadge = document.createElement('div');
        vipBadge.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #8B4513;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
        `;
        vipBadge.textContent = '👑 股东身份已认证';
        document.body.appendChild(vipBadge);
    });

    // 防复制保护
    document.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', '🧸 Labubu基金会VIP专享内容受版权保护');
        e.preventDefault();
    });

    // 水印保护已移除 - 根据用户要求

})();