const { z } = require('zod');

const userSignUpSchema = z.object({
    username: z.string().min(3, { message: "usernameTooShort" }).max(30),
    
    email: z.string().email({ message: "emailNotValid" }),
    
    password: z.string().min(6, { message: "passwordTooShort" }),
    
    confirmPassword: z.string(), 
    
    firstName: z.string().min(2, { message: "firstNameRequired" }),
    lastName: z.string().min(2, { message: "lastNameRequired" }),
})
// Refine the object to check that confirmPassword matches password
.refine((data) => data.password === data.confirmPassword, {
    message: "passwordsDontMatch",
    path: ["confirmPassword"], 
});

module.exports = {
    userSignUpSchema,
};