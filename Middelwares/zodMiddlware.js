// middleware/zodValidator.js

/**
 * Creates a middleware function that validates the request body against a Zod schema.
 * @param {z.ZodObject} schema The Zod schema to validate against.
 * @returns {function} Express middleware function.
 */
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