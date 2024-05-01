import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../db/mongodb'
import GroupModel from '../../../models/group'
import UserModel from '../../../models/user'

export async function POST(req) {
  try {
    const { name, description, isPublic, userEmail } = await req.json();

    await connectMongoDB();

    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newGroup = new GroupModel({
      name,
      description,
      members: [user._id],
      isPublic
    });
    await newGroup.save();

    user.group = newGroup._id;
    await user.save();

    return new NextResponse(
      JSON.stringify(newGroup),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}