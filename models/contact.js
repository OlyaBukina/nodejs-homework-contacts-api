const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

/**
 * Mongooose schema
 */
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

/**
 * Schemas for validation
 */

const addSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string().min(7),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
