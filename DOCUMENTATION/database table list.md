# Final Database Table List (Tier 1 – MVP)

---

### 1. `users`

Stores all user accounts.

```ts
users {
  id: UUID,                   // Primary Key (from Auth)
  name: TEXT,
  email: TEXT,                // Unique
  image: TEXT,                // Profile picture URL (required)
  created_at: TIMESTAMP DEFAULT now()
}
```

---

### 2. `listings`

Stores all types of accommodation listings.

```ts
listings {
  id: UUID,                   // Primary Key
  user_id: UUID,              // FK → users.id (owner)
  title: TEXT,
  description: TEXT,
  price: NUMERIC,
  category: TEXT,             // Rent, Buy, PG, etc.
  city: TEXT,
  locality: TEXT,
  status: TEXT,               // Available / Booked
  images: TEXT[],             // Array of Supabase image URLs
  created_at: TIMESTAMP DEFAULT now()
}
```

---

### 3. `reviews`

Stores reviews left by users on listings.

```ts
reviews {
  id: UUID,                   // Primary Key
  listing_id: UUID,           // FK → listings.id
  user_id: UUID,              // FK → users.id (reviewer)
  rating: INTEGER,            // 1–5 stars
  comment: TEXT,
  created_at: TIMESTAMP DEFAULT now()
}
```

---

### 4. `favorites`

Stores bookmarked listings for each user.

```ts
favorites {
  id: UUID,                   // Primary Key
  user_id: UUID,              // FK → users.id
  listing_id: UUID,           // FK → listings.id
  created_at: TIMESTAMP DEFAULT now()
}
```

---

# 🧱 Summary – Final Table Overview

| Table Name  | Purpose                                    |
| ----------- | ------------------------------------------ |
| `users`     | Stores all users with profile images       |
| `listings`  | Stores property listings with image arrays |
| `reviews`   | Stores user reviews on listings            |
| `favorites` | Stores user's bookmarked listings          |

---

- DSL Format for making ER Diagram:
```
Table users {
  id uuid [pk]
  name text [not null]
  email text [not null, unique]
  image text [not null]
  created_at timestamp [default: `now()`]
}

Table listings {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  title text [not null]
  description text [not null]
  price numeric [not null]
  category text [not null]
  city text [not null]
  locality text [not null]
  status text [not null]  // Available, Booked, etc.
  images text[] [not null]
  created_at timestamp [default: `now()`]
}

Table reviews {
  id uuid [pk]
  listing_id uuid [ref: > listings.id]
  user_id uuid [ref: > users.id]
  rating int [not null, note: "1 to 5 stars"]
  comment text
  created_at timestamp [default: `now()`]
}

Table favorites {
  id uuid [pk]
  user_id uuid [ref: > users.id]
  listing_id uuid [ref: > listings.id]
  created_at timestamp [default: `now()`]
}
```

