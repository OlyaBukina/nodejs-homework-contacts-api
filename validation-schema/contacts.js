const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    phone: Joi.string().min(7).required(),
});

const updateSchema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email({
        minDomainSegments: 2,
    }),
    phone: Joi.string().min(7),
});

module.exports = { addSchema, updateSchema };
