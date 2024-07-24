const authenticateToken = async (req,res,next) => {

    const token = req.headers['authorization'];
    
        if (!token) {
            return res.status(401).json({ message: 'Token required' });
        }
    
        const tokenParts = token.split(' ')[1];
        try {
            const decoded = jwt.verify(tokenParts, secretKey);
            if (decoded) {
                req.user.id = decoded.user.id;
                next();
            }
           
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
}
