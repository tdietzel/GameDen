import UserModel from '../../models/user'
import mongoose from 'mongoose'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sortBy = searchParams.get('sortBy') || 'maxCoins';

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const sortCriteria = {
            'maxCoins': { maxCoins: -1 },
            'wl': { wl: -1 },
            'blackjack': { blackjackWins: -1 },
            'roulette': { rouletteWins: -1 },
            'spades': { spadesWins: -1 },
            'uno': { unoWins: -1 },
        };

        const topUsers = await UserModel.find({})
            .sort(sortCriteria[sortBy] || sortCriteria.maxCoins)
            .limit(10)
        .exec();

        await mongoose.connection.close();

        return new Response(JSON.stringify(topUsers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching top users:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}