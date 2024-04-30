import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../db/mongodb'
import UserModel from '../../../models/user'

export async function GET({ params }) {
  try {
    const { email } = params;
    await connectMongoDB();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}