import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '~/lib/prisma' // your existing prisma import
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials)
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            console.log("Missing credentials")
            return null
          }

          const email = credentials.email as string
          const password = credentials.password as string

          console.log("Looking for user with email:", email)

          const user = await prisma.user.findUnique({
            where: { email },
          })

          console.log("User found:", user ? "Yes" : "No")

          if (!user || !user.hashedPassword) {
            console.log("No user found or no password set for user with email:", email)
            return null
          }

          const isValid = await compare(password, user.hashedPassword)

          if (!isValid) {
            console.log("Invalid password for user with email:", email)
            return null
          }

          console.log("Authentication successful for:", email)

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
