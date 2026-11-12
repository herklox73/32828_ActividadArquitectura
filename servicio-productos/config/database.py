from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,declarative_base

engine = create_engine("sqlite:///productos.db")

sessionLoca= sessionmaker(autoflush=False,autocommit=False,bind=engine) 
Base = declarative_base()
def obtener_db():
    db = sessionLoca()
    try:
      yield db
    except:
      db.rollback()
    finally:
      db.close()