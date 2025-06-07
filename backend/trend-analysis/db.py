import os
import asyncpg


POSTGRES_DSN = os.getenv(
    "POSTGRES_DSN",
    "postgresql://postgres:postgres@localhost:5433/trendwhisper"
)


async def get_db_pool():
    return await asyncpg.create_pool(dsn=POSTGRES_DSN)


async def create_trends_table(pool):
    async with pool.acquire() as conn:
        await conn.execute(
            '''
            CREATE TABLE IF NOT EXISTS trends (
                id SERIAL PRIMARY KEY,
                platform TEXT NOT NULL,
                trend TEXT NOT NULL,
                description TEXT,
                thumbnail_url TEXT,
                engagement JSONB,
                timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                extra JSONB
            )
            '''
        )
