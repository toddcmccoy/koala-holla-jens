CREATE TABLE "koalas" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "age" INTEGER,
    "ready_to_transfer" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR(250)
);

INSERT INTO "koalas"(
    "name", "gender", "age", "ready_to_transfer", "notes"
)

VALUES
('Scotty', 'M', '4', 'true', 'Born in Guatemala'),
('Jean', 'F', '5', 'true', 'Allergic to lots of lava'),
('Ororo', 'F', '7', 'false', 'Loves listening to Paula (Abdul)'),
('Logan', 'M', '15', 'false', 'Loves the sauna')
('Charlie', 'M', '9', 'true', 'Favorite band is Nirvana')
('Betsy', 'F', '4', 'true', 'Has a per iguana');

SELECT * FROM "koalas";