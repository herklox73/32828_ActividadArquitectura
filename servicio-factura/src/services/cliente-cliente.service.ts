import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import type { Cliente } from '../models/cliente.model.js';

@Injectable()
export class ClienteClienteService {
  private url = process.env['CLIENTES_URL'];

  async consultar(codigo: number): Promise<Cliente> {
    try {
      const respuesta = await fetch(`${this.url}/${codigo}`);
      if (respuesta.status === 404 || respuesta.status === 400) {
        throw new NotFoundException('Cliente no encontrado');
      }
      if (!respuesta.ok) {
        throw new ServiceUnavailableException('Servicio de clientes no disponible');
      }
      return await respuesta.json();
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ServiceUnavailableException) {
        throw error;
      }
      throw new ServiceUnavailableException('Servicio de clientes no disponible');
    }
  }
}
