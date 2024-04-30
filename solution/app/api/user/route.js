import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../db/mongodb'
import UserModel from '../../models/user'

const calculateExpToNextLevel = (level) => {
  return 100 * 2 ** (level - 1)
}

const handleLevelUp = async (user) => {
  if (user.exp >= user.expToNextLevel || user.expToNextLevel === 0) {
    user.level += 1;
    user.exp -= user.expToNextLevel;
    user.expToNextLevel = calculateExpToNextLevel(user.level);
    await user.save();
  }
};

export const GET = async (req) => {
  try {
    const session = await getServerSession(req);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectMongoDB();
    const user = await UserModel.findOne({ email: session.user.email });
    let wl;
    if (user.loses !== 0) {
      wl = user.wins / user.loses;
    } else {
      wl = 0;
    }

    const expToNextLevel = calculateExpToNextLevel(user.level);
    user.expToNextLevel = expToNextLevel;
    await user.save();

    await handleLevelUp(user);

    return new NextResponse(
      JSON.stringify({
        email: user.email,
        name: user.screenName,
        level: user.level,
        exp: user.exp,
        expToNextLevel: user.expToNextLevel,
        coins: user.coins,
        maxCoins: user.maxCoins,
        wins: user.wins,
        loses: user.loses,
        wl: wl,
        totalGamesPlayed: user.totalGamesPlayed,
        group: user.group,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const PUT = async (req) => {
  try {
    const session = await getServerSession(req);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { action } = await req.json();

    await connectMongoDB();
    const user = await UserModel.findOne({ email: session.user.email });

    if (action === 'blackjackWin') {
      user.wins += 1;
      user.blackjackWins += 1;
      user.totalGamesPlayed += 1;
      user.exp += 200;
      user.wl = user.wins / user.loses;
      user.coins += 200;
    } else if (action === 'rouletteWin') {
      user.wins += 1;
      user.rouletteWins += 1;
      user.totalGamesPlayed += 1;
      user.exp += 200;
      user.wl = user.wins / user.loses;
      user.coins += 200;
    } else if (action === 'spadesWin') {
      user.wins += 1;
      user.spadesWins += 1;
      user.totalGamesPlayed += 1;
      user.exp += 200;
      user.wl = user.wins / user.loses;
      user.coins += 200;
    } else if (action === 'unoWin') {
      user.wins += 1;
      user.unoWins += 1;
      user.totalGamesPlayed += 1;
      user.exp += 200;
      user.wl = user.wins / user.loses;
      user.coins += 200;
    } else if (action === 'lose') {
      user.loses += 1;
      user.totalGamesPlayed += 1;
      user.level > 1 ? user.exp -= 100 : null;
      user.wl = user.wins / user.loses;
      user.coins -= 200;
    }

    if (user.coins > user.maxCoins) {
      user.maxCoins = user.coins
      await user.save()
    }

    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "User stats updated" }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};