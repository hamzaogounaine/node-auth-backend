
const zodValidator = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errorDetails = result.error.issues;
        
        const errors = errorDetails && errorDetails.reduce((acc, current) => {
            acc[current.path[0]] = current.message; 
            return acc;
        }, {});

        return res.status(400).json({ errors });
    }

    req.body = result.data; 
    
    next();
};

module.exports = zodValidator;