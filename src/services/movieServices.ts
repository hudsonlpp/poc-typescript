import { Request } from "express"
import { QueryArrayResult } from "pg";
import { MovieEntity, MovieRequest } from "../protocols.js";
import * as moviesRepository from "../repositories/movieRepository.js";

interface MoviesService {
  postMovie(payload: MovieRequest): Promise<MovieEntity>;
  getMovies(request: Request): Promise<MovieEntity[]>;
  getMovieById(id: number): Promise<MovieEntity>;
  updateMovie(payload: Partial<MovieRequest>, id: number): Promise<MovieEntity>;
  deleteMovie(id: number): Promise<void>;
}

class DefaultMoviesService implements MoviesService {
  async postMovie(payload: MovieRequest): Promise<MovieEntity> {
    const queryResult = await moviesRepository.createMovie(payload);
    return queryResult.rows[0];
  }

  async getMovies(request: Request): Promise<MovieEntity[]> {
    const queryResult = await moviesRepository.getAllMovies();
    return queryResult.rows;
  }

  async getMovieById(id: number): Promise<MovieEntity> {
    const queryResult = await moviesRepository.getAnyMovieById(id);
    return queryResult.rows[0];
  }

  async updateMovie(payload: Partial<MovieRequest>, id: number): Promise<MovieEntity> {
    const queryResult = await moviesRepository.updatePartialMovie(payload, id);
    return queryResult.rows[0];
  }

  async deleteMovie(id: number): Promise<void> {
    await moviesRepository.deleteAnyMovieById(id);
  }
}

class MoviesServiceWithCategoryFilter implements MoviesService {
  async postMovie(payload: MovieRequest): Promise<MovieEntity> {
    const queryResult = await moviesRepository.createMovie(payload);
    return queryResult.rows[0];
  }

  async getMovies(request: Request): Promise<MovieEntity[]> {
    const category = request.query.category;
    const queryResult = await moviesRepository.getAllMoviesByCategory(category);
    return queryResult.rows;
  }

  async getMovieById(id: number): Promise<MovieEntity> {
    const queryResult = await moviesRepository.getAnyMovieById(id);
    return queryResult.rows[0];
  }

  async updateMovie(payload: Partial<MovieRequest>, id: number): Promise<MovieEntity> {
    const queryResult = await moviesRepository.updatePartialMovie(payload, id);
    return queryResult.rows[0];
  }

  async deleteMovie(id: number): Promise<void> {
    await moviesRepository.deleteAnyMovieById(id);
  }
}

export { MoviesService, DefaultMoviesService, MoviesServiceWithCategoryFilter };
