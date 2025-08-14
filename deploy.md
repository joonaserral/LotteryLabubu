# VIP股东系统安全部署指南

## 🛡️ 安全特性

### 1. 访问控制
- **VIP认证码验证**: 需要输入正确的VIP码才能访问
- **域名白名单**: 只允许特定域名访问
- **Token有效期**: 24小时自动过期，需重新验证

### 2. 代码保护
- **混淆加密**: 关键数据和逻辑进行base64编码
- **反调试**: 检测开发者工具，自动跳转
- **防复制**: 禁用右键、选择文本、复制等操作
- **水印保护**: 页面显示"VIP SHAREHOLDERS ONLY"水印

### 3. 反逆向工程
- **虚假函数**: 插入干扰性假代码
- **变量名混淆**: 使用随机16进制变量名
- **代码分离**: 敏感配置独立文件

## 🔑 VIP访问码

当前有效的访问码：
- `VIP2024LAB`
- `STOCK2024`
- `LABUBU888`
- `SHAREHOLDER`
- `PREMIUM2024`

## 📁 文件结构

```
LotteryLabubu/
├── index.html          # 主页面
├── admin.html          # 管理页面
├── shop.html           # 商城页面（如需要）
├── auth.js             # 安全验证模块
├── config.enc.js       # 加密配置文件
├── obfuscate.py        # 代码混淆工具
├── .gitignore          # Git忽略文件
└── deploy.md           # 部署文档
```

## 🚀 部署步骤

### 1. 代码混淆（可选）
```bash
# 运行混淆工具
python3 obfuscate.py

# 使用混淆后的文件
mv index.obf.html index.html
mv admin.obf.html admin.html
```

### 2. GitHub Pages 部署
1. 将代码推送到GitHub仓库
2. 在仓库Settings中启用GitHub Pages
3. 选择部署分支（通常是main）

### 3. 环境配置
```bash
# 将敏感文件添加到.gitignore
echo "*.key" >> .gitignore
echo "*.env" >> .gitignore
echo "config.local.js" >> .gitignore
```

## 🔐 安全建议

### 1. 定期更换访问码
- 每月更换一次VIP访问码
- 通知授权股东新的访问码
- 在 `auth.js` 中更新 `_vipCodes` 数组

### 2. 监控访问
- 检查GitHub Pages访问日志
- 监控异常访问模式
- 设置访问频率限制

### 3. 代码更新
- 定期重新混淆代码
- 更换变量名和函数名
- 更新反调试策略

### 4. 备份安全
- 保持源代码私有仓库备份
- 不要在公开渠道分享访问码
- 定期审查访问权限

## ⚠️ 注意事项

1. **不要暴露源码**: 确保 `.gitignore` 正确配置
2. **访问码安全**: 通过安全渠道分发VIP码
3. **定期检查**: 监控是否有未授权访问
4. **应急预案**: 准备紧急更换域名的方案

## 🆘 紧急应对

如发现安全问题：
1. 立即更换所有VIP访问码
2. 更新 `config.enc.js` 中的域名白名单
3. 重新混淆并部署代码
4. 通知所有授权用户新的访问方式

## 📞 技术支持

如需技术支持或发现安全问题，请联系：
- 技术负责人
- 安全邮箱: security@labubu-foundation.com

---
**保密提醒**: 本文档包含敏感信息，请勿外传 🔒