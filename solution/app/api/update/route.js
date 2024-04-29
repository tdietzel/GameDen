import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { connectMongoDB } from '../../db/mongodb'
import User from '../../models/user'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    await connectMongoDB();

    const { screenName, email, newEmail } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { screenName: screenName, email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Internal server error', { status: 500 });
  }
}