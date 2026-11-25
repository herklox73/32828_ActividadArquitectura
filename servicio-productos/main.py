from fastapi import FastAPI

from config.database import engine, Base
from router.producto_router import router as producto_router

app = FastAPI(
    title="Servicio de Productos",
    description="Servicio desarrolado en clases de arquitectura de software",
    version="1.0.0",
    redirect_slashes=False
)
Base.metadata.create_all(bind=engine)
app.include_router(producto_router,prefix="/api")

@app.get("/")
def inicio():
    return {"mensaje": "Servicio Factura Ejecutandose con exito"}