#!/usr/bin/env python3
"""
代码混淆工具 - 保护VIP股东系统
使用前请确保安装: pip install jsbeautifier
"""

import re
import base64
import random
import string
import json

def generate_random_var():
    """生成随机变量名"""
    return '_0x' + ''.join(random.choices('0123456789abcdef', k=4))

def obfuscate_strings(content):
    """混淆字符串"""
    # 查找所有字符串
    strings = re.findall(r'"([^"]*)"', content)
    
    for s in strings:
        if len(s) > 5 and 'labubu' in s.lower():
            # 对包含敏感信息的字符串进行base64编码
            encoded = base64.b64encode(s.encode()).decode()
            var_name = generate_random_var()
            content = content.replace(f'"{s}"', f'atob("{encoded}")')
    
    return content

def obfuscate_function_names(content):
    """混淆函数名"""
    function_map = {
        'performDraw': generate_random_var(),
        'addToCart': generate_random_var(),
        'submitComment': generate_random_var(),
        'loadComments': generate_random_var(),
    }
    
    for old_name, new_name in function_map.items():
        content = re.sub(rf'\b{old_name}\b', new_name, content)
    
    return content

def add_fake_functions(content):
    """添加虚假函数干扰"""
    fake_functions = [
        """
        function _0x1234() {
            const _fake = 'console.log("fake function")';
            return false;
        }
        """,
        """
        function _0x5678() {
            if (Math.random() > 0.5) {
                return 'decoy_data';
            }
            return null;
        }
        """,
        """
        const _0x9abc = {
            fake_key: 'fake_value',
            decoy: function() { return 'nothing'; }
        };
        """
    ]
    
    # 在script标签后插入虚假函数
    script_pos = content.find('<script>')
    if script_pos != -1:
        insert_pos = content.find('\n', script_pos)
        fake_code = '\n' + '\n'.join(fake_functions) + '\n'
        content = content[:insert_pos] + fake_code + content[insert_pos:]
    
    return content

def obfuscate_html_file(file_path):
    """混淆HTML文件"""
    print(f"正在混淆 {file_path}...")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 添加反调试代码
    anti_debug = """
    <script>
    // 反调试保护
    setInterval(function(){
        if(window.console && (console.firebug || console.table && /firebug/i.test(console.table()) || window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200)){
            window.location.href = 'about:blank';
        }
    }, 500);
    
    // 检测开发者工具
    let devtools = {open: false, orientation: null};
    setInterval(function(){
        if(window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200){
            if(!devtools.open){
                devtools.open = true;
                window.location.href = 'https://www.labubu.com';
            }
        }
    }, 500);
    </script>
    """
    
    # 在head标签中插入反调试代码
    head_pos = content.find('</head>')
    if head_pos != -1:
        content = content[:head_pos] + anti_debug + content[head_pos:]
    
    # 执行混淆
    content = obfuscate_strings(content)
    content = add_fake_functions(content)
    
    # 保存混淆后的文件
    output_path = file_path.replace('.html', '.obf.html')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"混淆完成: {output_path}")

def create_env_file():
    """创建环境配置文件"""
    config = {
        "VIP_CODES": [
            "VIP2024LAB",
            "STOCK2024", 
            "LABUBU888",
            "SHAREHOLDER",
            "PREMIUM2024"
        ],
        "ADMIN_PASSWORD": "123",
        "API_ENDPOINTS": {
            "comments": "https://api.jsonbin.io/v3/b/fake_id",
            "analytics": "https://fake-analytics.com/track"
        },
        "SECURITY": {
            "token_expire": 86400000,
            "max_attempts": 3,
            "lockout_time": 3600000
        }
    }
    
    with open('.env.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)
    
    print("环境配置文件已创建: .env.json")

if __name__ == "__main__":
    print("🛡️  VIP股东系统代码保护工具")
    print("================================")
    
    # 混淆主要文件
    files_to_obfuscate = [
        'index.html',
        'admin.html',
        'shop.html'
    ]
    
    for file_path in files_to_obfuscate:
        try:
            obfuscate_html_file(file_path)
        except FileNotFoundError:
            print(f"文件不存在: {file_path}")
        except Exception as e:
            print(f"混淆失败 {file_path}: {str(e)}")
    
    # 创建环境配置
    create_env_file()
    
    print("\n✅ 代码保护完成!")
    print("\n📋 部署建议:")
    print("1. 将 .obf.html 文件重命名为 .html 后部署")
    print("2. 确保 auth.js 和 config.enc.js 一起部署")
    print("3. 将 .env.json 添加到 .gitignore")
    print("4. 定期更换 VIP 访问码")
    print("5. 监控访问日志，发现异常及时处理")