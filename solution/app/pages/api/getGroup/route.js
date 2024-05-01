import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../db/mongodb'
import GroupModel from '../../../models/group'

export async function GET() {
  try {
    await connectMongoDB();

    const groups = await GroupModel.find({});

    return new NextResponse(
      JSON.stringify(groups),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}