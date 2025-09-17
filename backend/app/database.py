from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base


SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://postgres:9LMl6iVcnHtS80Kl@db.pftkzkelmiuaoodmutjb.supabase.co:5432/postgres"

# Added pool_size and max_overflow (adjust numbers as needed)
engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True  # Helps avoid stale connections
)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
