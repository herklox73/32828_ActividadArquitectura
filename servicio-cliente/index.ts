import fastify from "fastify";
import { clienteRouter } from "./src/router/cliente.router";
import { sequelize } from "./src/config/database";

const app = fastify({
  logger: true
});
app.register(clienteRouter, { prefix: "/api" });

const iniciar = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await app.listen({ port: Number(process.env.PORT)|| 3001, host: "0.0.0.0" });
    console.log("Servidor escuchando en el puerto " + process.env.PORT);
  } catch (error) {
    app.log.error(error);
    process.exit(1); 
    
  }
};

iniciar();