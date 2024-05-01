import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../db/mongodb'
import GroupModel from '../../models/group'
import UserModel from '../../models/user'

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const redirectUrl = searchParams.get('redirectUrl') || '/';

  try {
    await connectMongoDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email in request body" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const group = await GroupModel.findById(user.group);

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    user.group = null;
    await user.save();

    group.members.pull(user._id);
    await group.save();

    return NextResponse.redirect(redirectUrl, 302);
  } catch (error) {
    console.error("Error leaving group:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}