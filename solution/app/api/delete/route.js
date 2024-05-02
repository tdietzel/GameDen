import { connectMongoDB } from '../../db/mongodb'
import { NextResponse } from 'next/server'
import User from '../../models/user'

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/';

  try {
    await connectMongoDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing email in request body" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await User.findByIdAndDelete(user._id);

    const baseUrl = req.nextUrl.origin;
    const absoluteRedirectUrl = new URL(redirectUrl, baseUrl).toString();

    return NextResponse.redirect(`${ absoluteRedirectUrl }?message=User deleted successfully`, 302);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}