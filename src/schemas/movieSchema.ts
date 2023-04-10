import Joi from "joi";

export const moviesSchemma = Joi.object({
  movie_name: Joi.string().min(2).required(),
  director: Joi.string().min(2).required(),
  year: Joi.number().required(),
});