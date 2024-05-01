import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../db/mongodb'
import GroupModel from '../../../models/group'
import UserModel from '../../../models/user'

export async function PUT(req) {
  try {
    const { groupId, userEmail } = await req.json();

    await connectMongoDB();

    const group = await GroupModel.findById(groupId);
    const user = await UserModel.findOne({ email: userEmail });

    if (!group) {
      return new NextResponse("Group not found", { status: 404 });
    }

    if (group.members.includes(user._id)) {
      return new NextResponse("User is already a member", { status: 400 });
    }

    group.members.push(user._id);
    await group.save();

    user.group = group._id;
    await user.save();

    return new NextResponse("User joined the group successfully", { status: 200 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}