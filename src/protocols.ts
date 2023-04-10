export type MovieRequest = {
    name: string,
    category: string,
    duration: number,
    price: number
};

export type MovieResult = QueryResult<MovieEntity>;

export interface MovieEntity extends MovieRequest {
    id: number
};

export type Movie = Omit<MovieEntity, "id">;