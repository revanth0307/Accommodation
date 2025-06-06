## Tier 1 – HabitatHub MVP

These are the **must-have features** for your first public release.

---

### 🔐 1. **User Authentication**

* Email/password login
* Google OAuth (via NextAuth.js)
* No roles — all users can browse and post

---

### 🏘️ 2. **Multi-Type Property Listings**

* Categories: Rent, Buy, PGs, Homestays, Couchsurfing, Dharamshalas
* Fields: Title, Description, Price, Images, Location (city/locality), Availability

---

### ✍️ 3. **Listing Management (My Listings)**

* Users can create, edit, delete their listings
* Upload multiple images (via Supabase Storage)
* Mark listing as *Available* or *Booked*

---

### 🔍 4. **Search & Filters**

* Filter by: City, Price Range, Accommodation Type, Availability

---

### ⭐ 5. **Reviews & Ratings**

* Logged-in users can post reviews and star ratings
* Show average rating on listing page

---

### 👤 6. **User Profile Page**

* Public profile showing:

  * Basic user info
  * Listings posted
  * Reviews received

---

### 💬 7. **Contact Owner (Mailto Link)**

* A "Contact Owner" button opens user’s email client
  (e.g., Gmail, Outlook, etc.) with listing owner's email filled

---

### ❤️ 8. **Saved Listings (Bookmarks)**

* Logged-in users can "Save" a listing
* View their saved listings under a **"Favorites"** section

---

## 🔧 Tech Stack

| Layer    | Tech                         |
| -------- | ---------------------------- |
| Frontend | Next.js 15 + Tailwind CSS    |
| Auth     | NextAuth.js                  |
| Backend  | Supabase (DB + Storage only) |
| ORM      | Prisma or Drizzle ORM        |
| Hosting  | Vercel                       |

---

## 🧠 Final Thought

✅ This plan gives users everything they need:

* Can **log in**
* Can **search + filter**
* Can **post and view listings**
* Can **contact owner** easily
* Can **save favorites**
* Can **leave reviews**

...All in a clean, fast MVP.

