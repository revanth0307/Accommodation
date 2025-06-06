CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "image" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "listings" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "price" numeric NOT NULL,
  "category" text NOT NULL,
  "city" text NOT NULL,
  "locality" text NOT NULL,
  "status" text NOT NULL,
  "images" text[] NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "reviews" (
  "id" uuid PRIMARY KEY,
  "listing_id" uuid,
  "user_id" uuid,
  "rating" int NOT NULL,
  "comment" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "favorites" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "listing_id" uuid,
  "created_at" timestamp DEFAULT (now())
);

COMMENT ON COLUMN "reviews"."rating" IS '1 to 5 stars';

ALTER TABLE "listings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("listing_id") REFERENCES "listings" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("listing_id") REFERENCES "listings" ("id");
