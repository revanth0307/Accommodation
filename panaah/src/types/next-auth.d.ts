import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name: string | null
    email: string | null
    image: string | null
    emailVerified?: Date | null
    hashedPassword?: string | null
  }

  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      image: string | null
    }
  }
}

// Also extend the JWT type if needed
declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}