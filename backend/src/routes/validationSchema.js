const Joi= require('joi');

const userschema= Joi.object({
    username:Joi.string()
    .min(3)
    .max(30)
    .required().lowercase().trim(),

    password: Joi.string()
    .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}'))
    .required().trim().max(30).min(8),

    confirmPassword: Joi.ref('password'),
    email: Joi.string().lowercase().email().required().trim(),
});

module.exports={
    userschema
};