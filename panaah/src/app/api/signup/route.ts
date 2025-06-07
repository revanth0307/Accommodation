import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma"; // adjust if your path is different
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Step 1: Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    // Step 2: Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    // Step 3: Hash the password
    const hashedPassword = await hash(password, 10);

    // Step 4: Store new user in the DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "", // Optional: you can later set this from user uploads or Gravatar
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
