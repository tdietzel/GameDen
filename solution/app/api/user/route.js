import { getServerSession } from 'next-auth/next'
import { connectMongoDB } from '../../db/mongodb'
import UserModel from '../../models/user'
import { NextResponse } from 'next/server'

export const GET = async (req) => {
  try {
    const session = await getServerSession(req)
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    await connectMongoDB()
    const user = await UserModel.findOne({ email: session.user.email })

    return new NextResponse(
      JSON.stringify({ coins: user.coins, email: user.email, name: user.screenName, level: user.level, exp: user.exp }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}