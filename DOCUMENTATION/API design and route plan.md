# API Design and Route Plan

### 1. Authentication (via NextAuth.js)

* Mostly handled by NextAuth internally, so minimal API needed here
* Endpoints you may expose:

  * `GET /api/auth/session` — Get current user session info

---

### 2. Users

* `GET /api/users/:userId`
  Get public profile info, including posted listings and received reviews
* `PUT /api/users/:userId`
  Update user profile (name, email, profile image URL)

---

### 3. Listings

* `GET /api/listings`
  Get all listings with optional filters via query params:

  * `?city=`
  * `?type=` (Rent, Buy, PG, etc.)
  * `?price_min=` & `?price_max=`
  * `?availability=` (available/booked)
  * Pagination: `?page=` & `?limit=`
* `GET /api/listings/:listingId`
  Get full details of a specific listing (includes images URLs and reviews)
* `POST /api/listings`
  Create a new listing (auth required)

  * Body includes listing details + array of image URLs uploaded to Supabase Storage from frontend
* `PUT /api/listings/:listingId`
  Edit an existing listing (auth + ownership check)

  * Body includes updated listing data + updated array of image URLs (add/remove handled on frontend)
* `DELETE /api/listings/:listingId`
  Delete a listing (auth + ownership check)

  * Backend triggers deletion of associated images from Supabase Storage

---

### 4. Reviews

* `POST /api/listings/:listingId/reviews`
  Create a review for a listing (auth required)
* `GET /api/listings/:listingId/reviews`
  List all reviews for a listing

---

### 5. Favorites (Saved Listings)

* `GET /api/users/:userId/favorites`
  Get saved listings for a user (auth required)
* `POST /api/users/:userId/favorites`
  Save a listing to favorites (body: `{ listingId }`) (auth required)
* `DELETE /api/users/:userId/favorites/:listingId`
  Remove a saved listing from favorites (auth required)

---

### 6. Contact Owner

* No dedicated API route
* Frontend implements a **mailto link button** that opens the user's default email client with the owner’s email filled in

---

### Notes:

* **Image uploads** are handled fully on the frontend using Supabase Storage SDK; only the image URLs are sent in listing create/update payloads
* Deletion of images when deleting listings is handled in the backend logic triggered on `DELETE /api/listings/:listingId`
* No roles distinction; every authenticated user can browse, post, edit, and delete their own listings
* Authentication and session management handled by NextAuth.js with Supabase as the database only
