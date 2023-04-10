import { Pool, QueryResult } from "pg";
import { MovieRequest, MovieResult, MovieEntity } from "../protocols.js";
import format from "pg-format";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createMovie(payload: MovieRequest): Promise<MovieResult> {
  const queryResult = await pool.query(
    "INSERT INTO movies(name, category, duration, price) VALUES($1, $2, $3, $4) RETURNING *;",
    [payload.name, payload.category, payload.duration, payload.price]
  );
  return queryResult.rows;
}

async function getAllMovies(): Promise<MovieEntity[]> {
  const queryResult = await pool.query("SELECT * FROM movies;");
  return queryResult.rows;
}

async function getAllMoviesByCategory(
  category: string
): Promise<QueryResult<MovieEntity[]>> {
  const queryResult = await pool.query(
    "SELECT * FROM movies WHERE category=$1;",
    [category]
  );
  return queryResult;
}

async function getAnyMovieById(id: number): Promise<MovieEntity> {
  const queryResult = await pool.query("SELECT * FROM movies WHERE id=$1;", [
    id,
  ]);
  return queryResult.rows[0];
}

async function updatePartialMovie(
  payload: Partial<MovieRequest>,
  id: number
): Promise<MovieEntity> {
  const setValues: string[] = [];
  const setParams: any[] = [id];

  Object.entries(payload).forEach(([key, value]) => {
    setValues.push(`${key} = $${setParams.push(value)}`);
  });

  const queryString: string = format(
    `UPDATE movies SET ${setValues.join(", ")} WHERE id = $1 RETURNING *;`,
    setParams
  );

  const queryResult = await pool.query(queryString);
  return queryResult.rows[0];
}

async function deleteAnyMovieById(id: number): Promise<MovieEntity> {
  const queryResult = await pool.query(
    "DELETE FROM movies WHERE id = $1 RETURNING *;",
    [id]
  );
  return queryResult.rows[0];
}

async function findMovieByName(name: string): Promise<MovieEntity[]> {
  const queryResult = await pool.query(
    "SELECT * FROM movies WHERE name=$1;",
    [name]
  );
  return queryResult.rows;
}

export {
  createMovie,
  getAllMovies,
  getAllMoviesByCategory,
  getAnyMovieById,
  updatePartialMovie,
  deleteAnyMovieById,
  findMovieByName,
};
