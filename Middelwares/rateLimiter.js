const  rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    limit: 10, // Limit each IP to 100 requests per `windowMs`
    standardHeaders: 'draft-7', // Setting appropriate headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: async (req, res) => {
        // Custom message when limit is exceeded
        res.status(429).json({
            error: "Too many requests",
            message: "You have exceeded the 100 requests limit in 2 minutes. Please try again later."
        });
    }
});


module.exports = rateLimiter