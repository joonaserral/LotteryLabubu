// 加密配置文件 - 敏感数据保护
const _config = {
    // 管理员密码 (加密)
    _0x1a2b: 'MTIz',  // base64: 123

    // API密钥 (混淆)
    _0x2c3d: '$2a$10$VjQj.Gc8Q7q8q4k4K4k4Ou',

    // 奖品池配置 (编码)
    _pool: 'W3sibmFtZSI6IuWGjeaOpeWGjeWKsyIsIndlaWdodCI6MzAsInF1YW50aXR5Ijo1fSx7Im5hbWUiOiLpgJHojYnkuIDmnq8iLCJ3ZWlnaHQiOjI1LCJxdWFudGl0eSI6MTB9LHsibmFtZSI6IueOsOmHke+8iOa4heepuuiusOW9lSksIndlaWdodCI6MjAsInF1YW50aXR5IjoxNX0seyJuYW1lIjoi5aKo6YWJ5oq5IiwiaWV9LHsid2VpZ2h0IjoyMCwicXVhbnRpdHkiOjEwfSx7Im5hbWUiOiLkuJjlvoXnj63lrp4iLCJ3ZWlnaHQiOjE1LCJxdWFudGl0eSI6OH1d',

    // VIP特权倍率 (加密)
    _multiplier: 'Mi4w',  // base64: 2.0

    // 域名白名单 (混淆)
    _domains: ['*.github.io', 'localhost', '127.0.0.1'],

    // 加密解码器
    decode: function (str) {
        try {
            return atob(str);
        } catch (e) {
            return str;
        }
    },

    // 安全检查
    validate: function () {
        const domain = window.location.hostname;
        return this._domains.some(d => {
            if (d.startsWith('*')) {
                return domain.endsWith(d.substring(1));
            }
            return domain === d;
        });
    }
};

// 导出配置 (防篡改)
Object.freeze(_config);
window._secureConfig = _config;