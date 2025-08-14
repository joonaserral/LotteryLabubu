# Firebase配置指南 🔥

## 概述

为了启用云端数据同步功能，您需要创建一个Firebase项目并配置相关服务。本指南将帮助您完成整个设置过程。

## 第一步：创建Firebase项目

### 1. 访问Firebase控制台
- 打开 [Firebase控制台](https://console.firebase.google.com/)
- 使用Google账户登录

### 2. 创建新项目
- 点击"创建项目"
- 输入项目名称：`labubu-lottery`（或您喜欢的名称）
- 选择是否启用Google Analytics（推荐启用）
- 等待项目创建完成

## 第二步：启用Authentication

### 1. 进入Authentication设置
- 在左侧菜单中点击"Authentication"
- 点击"开始"按钮

### 2. 设置登录方法
- 点击"Sign-in method"标签
- 启用"电子邮件地址/密码"登录方式
- 点击"保存"

## 第三步：创建Firestore数据库

### 1. 启用Firestore
- 在左侧菜单中点击"Firestore Database"
- 点击"创建数据库"

### 2. 选择安全规则
- 选择"测试模式"（开发时使用）
- 选择数据库位置（推荐选择离您最近的地区）

### 3. 设置安全规则
在Firestore规则中添加以下内容：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的数据
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 第四步：启用Storage

### 1. 启用Cloud Storage
- 在左侧菜单中点击"Storage"
- 点击"开始"

### 2. 设置Storage规则
添加以下安全规则：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 用户头像存储规则
    match /avatars/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 第五步：获取配置信息

### 1. 添加Web应用
- 在项目设置中点击"添加应用"
- 选择Web图标（</>）
- 输入应用名称：`Labubu Lottery`
- 可选择启用Firebase Hosting

### 2. 复制配置代码
Firebase会提供配置代码，类似这样：

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "your-app-id"
};
```

## 第六步：更新代码配置

### 1. 替换配置信息
在 `user-center.html` 文件中找到以下部分：

```javascript
// Firebase配置
const firebaseConfig = {
    apiKey: "AIzaSyBYq7VBCRPFhNlGmcGY5K3fU7H4R8B7XqM",
    authDomain: "labubu-lottery.firebaseapp.com",
    projectId: "labubu-lottery",
    storageBucket: "labubu-lottery.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

### 2. 替换为您的真实配置
将示例配置替换为从Firebase控制台复制的真实配置。

## 第七步：测试功能

### 1. 测试注册
- 打开网站的用户中心页面
- 尝试注册一个新账户
- 检查Firebase控制台中的Authentication部分

### 2. 测试数据存储
- 编辑用户资料
- 检查Firestore中是否创建了用户数据

### 3. 测试文件上传
- 上传头像
- 检查Storage中是否保存了图片文件

## 安全建议

### 1. 生产环境设置
- 将Firestore规则改为生产模式
- 启用更严格的验证规则
- 定期检查安全设置

### 2. 数据保护
- 定期备份重要数据
- 监控使用情况和成本
- 设置适当的配额限制

### 3. 域名限制
在Firebase项目设置中，添加您的域名到授权域名列表中。

## 成本考虑

### 免费额度
Firebase提供慷慨的免费额度：
- Authentication: 每月10,000次验证
- Firestore: 每天50,000次读取，20,000次写入
- Storage: 5GB存储空间

### 监控使用量
- 在Firebase控制台中查看使用情况
- 设置预算提醒
- 优化查询以减少费用

## 故障排除

### 常见问题

1. **"Firebase未初始化"错误**
   - 检查配置信息是否正确
   - 确保网络连接正常
   - 检查浏览器控制台错误信息

2. **认证失败**
   - 确认邮箱/密码登录方式已启用
   - 检查安全规则设置
   - 验证域名是否在授权列表中

3. **数据无法保存**
   - 检查Firestore安全规则
   - 确认用户已登录
   - 查看浏览器网络请求是否成功

### 调试技巧
- 打开浏览器开发者工具
- 查看Console和Network标签
- 检查Firebase控制台的日志

## 部署到生产环境

### 1. 域名配置
- 将您的域名添加到Firebase授权域名
- 更新CORS设置（如需要）

### 2. HTTPS要求
- Firebase要求在生产环境中使用HTTPS
- 确保您的网站支持SSL证书

### 3. 性能优化
- 启用Firestore缓存
- 优化图片上传大小
- 使用CDN加速静态资源

## 支持和帮助

如果在配置过程中遇到问题：
- 查看 [Firebase官方文档](https://firebase.google.com/docs)
- 访问 [Firebase社区论坛](https://firebase.community/)
- 检查 [Firebase状态页面](https://status.firebase.google.com/)

---

**注意**: 本指南假设您具有基本的Web开发知识。如果您是初学者，建议先学习Firebase的基础概念。

**安全提醒**: 请妥善保管您的Firebase配置信息，不要在公开代码库中暴露敏感信息。