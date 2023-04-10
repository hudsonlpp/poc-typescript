CREATE TABLE IF NOT EXISTS "movies"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "category" VARCHAR(20) NOT NULL,
    "duration" INTERVAL NOT NULL,
    "price" NUMERIC(8,2) NOT NULL
);
