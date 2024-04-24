import { connectMongoDB } from '../../../db/mongodb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import UserModel from '../../../models/user'

export async function POST(req) {
  try {
    const { screenName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await UserModel.create({
      screenName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}