const jwt = require('jsonwebtoken'); // 导入jsonwebtoken

const authMiddleware = (req, res, next) => {
    // 增强头部检查
    const authHeader = req.headers.authorization;
    // console.log('[DEBUG] Authorization Header:', authHeader); 

    // 1. 检查头是否存在且格式正确
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error: "Invalid authorization header format. Use: Bearer <token>" 
        });
    }

    // 2. 安全提取Token
    const token = authHeader.split(' ')[1]?.trim(); // 防止空格干扰
    
    if (!token) {
        return res.status(401).json({ error: "Token missing after Bearer prefix" });
    }

    // 3. 验证Token（增加详细错误日志）
    jwt.verify(token, 'jwtpswd', (err, decoded) => {
        if (err) {
            console.error('[JWT ERROR]', err.name, err.message);
            let errorMsg = 'Invalid token';
            if (err.name === 'TokenExpiredError') errorMsg = 'Token expired';
            return res.status(401).json({ error: errorMsg }); 
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware; // 确保正确导出