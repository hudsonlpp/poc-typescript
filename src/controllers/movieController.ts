import { Request, Response } from "express";
import { Movie } from "../models/movie.js";

export const moviePostController = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const movieGetController = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const movieGetByIdController = async ({ params: { id } }: Request, res: Response) => {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.status(200).json(movie);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const moviePatchController = async ({ body, params: { id } }: Request, res: Response) => {
  try {
    const [rowsUpdated] = await Movie.update(body, { where: { id } });
    if (rowsUpdated === 0) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      const movie = await Movie.findByPk(id);
      res.status(200).json(movie);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const movieDeleteController = async ({ params: { id } }: Request, res: Response) => {
  try {
    const rowsDeleted = await Movie.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
