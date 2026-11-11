import { Cliente } from "../models/cliente.model";

export const obtenerClientes = async () => {
  return Cliente.findAll();
};

export const obtenerClienteId = async (id: number) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("Cliente no encontrado");
  }
  return cliente;
};

export const crearCliente = async (data: any) => {
  if (!data) {
    throw new Error("Datos incorrectos");
  }
  if (!data.nombre || data.nombre.trim() === "") {
    throw new Error("El nombre es obligatorio");
  }
  if (!data.direccion || data.direccion.trim() === "") {
    throw new Error("La dirección es obligatoria");
  }
  if (!data.telefono || data.telefono.length !== 10 || isNaN(Number(data.telefono))) {
    throw new Error("El teléfono debe tener 10 dígitos");
  }
  return Cliente.create(data);
};

export const actualizarCliente = async (id: number, data: any) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("Cliente no encontrado");
  }
  await cliente.update(data);
  return cliente;
};

export const eliminarCliente = async (id: number) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    throw new Error("Cliente no encontrado");
  }
  await cliente.destroy();
  return { message: "Cliente eliminado correctamente" };
};
