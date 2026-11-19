import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import type { Producto } from '../models/producto.model.js';

@Injectable()
export class ProductoClienteService {
  private url = process.env['PRODUCTOS_URL'];

  async consultar(codigo: number): Promise<Producto> {
    try {
      const respuesta = await fetch(`${this.url}/${codigo}`);
      if (respuesta.status === 404) {
        throw new NotFoundException('Producto no encontrado');
      }
      if (!respuesta.ok) {
        throw new ServiceUnavailableException('Servicio de productos no disponible');
      }
      return await respuesta.json();
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ServiceUnavailableException) {
        throw error;
      }
      throw new ServiceUnavailableException('Servicio de productos no disponible');
    }
  }
}
