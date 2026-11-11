import type { FastifyInstance } from "fastify";
import {
  obtenerClientes,
  obtenerClienteId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/cliente.controller";

export const clienteRouter = async (app: FastifyInstance) => {
  app.get("/clientes", obtenerClientes);

  app.get("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      return await obtenerClienteId(Number(id));
    } catch (error) {
      console.log("Error al obtener el cliente");
      res.code(400).send({ "mensaje": "Error al obtener el cliente" });
    }
  });

  app.post("/clientes", async (req, res) => {
    try {
      const cliente = req.body;
      return await crearCliente(cliente);
    } catch (error: any) {
      console.log("Error al crear el cliente:", error.message);
      res.code(400).send({ "mensaje": error.message });
    }
  });

  app.put("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      const cliente = req.body;
      return await actualizarCliente(Number(id), cliente);
    } catch (error) {
      console.log("Error al actualizar el cliente");
      res.code(400).send({ "mensaje": "Error al actualizar el cliente" });
    }
  });

  app.delete("/clientes/:id", async (req, res) => {
    try {
      const { id } = req.params as any;
      return await eliminarCliente(Number(id));
    } catch (error) {
      console.log("Error al eliminar");
      res.code(400).send({ "mensaje": "Error al eliminar el cliente" });
    }
  });
};