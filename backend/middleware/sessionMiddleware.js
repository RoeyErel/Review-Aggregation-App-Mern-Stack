const sessionMiddleware = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized: No session available');
    }
};

export { sessionMiddleware }