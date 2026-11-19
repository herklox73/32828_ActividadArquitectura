import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../../prisma/db.js';
import type { Factura } from '../../models/factura.model.js';
import type { DetalleFactura } from '../../models/detalle-factura.model.js';
import { ProductoClienteService } from '../../services/producto-cliente.service.js';

@Injectable()
export class FacturaService {
  constructor(private readonly productoCliente: ProductoClienteService) {}

    //eso es una sola factura
  async crear(data: Factura) {
    const factura = await db.orm.Factura.where({ codigo: data.codigo }).first();
    if (factura) {
      throw new ConflictException('Codigo ya existente');
    }
    return db.orm.Factura.create({
      ...data,
      fecha: new Date(data.fecha),
      descuento: 0,
    });
  }

  async listar() {
    return db.orm.Factura.all();
  }

  async consultar(codigo: string) {
    const factura = await db.orm.Factura.where({ codigo: codigo }).first();
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }
    return factura;
  }

  async actualizar(codigo: string, data: Partial<Factura>) {
    const cambios:Record<string, unknown> = {...data};
    if (data.fecha) {
        cambios.fecha = new Date(data.fecha);
        }
    const factura = await db.orm.Factura.where({ codigo:codigo }).update(cambios);
    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }
    return factura;
  }

  async eliminar(codigo: string) {
    await this.consultar(codigo);
    await db.orm.Factura.where({ codigo }).delete();
    return { mensaje: `Factura eliminada correctamente` };
  }
  //Detalle Factura
  async agregarDetalle(codigo: string, data: DetalleFactura) {
    const factura = await this.consultar(codigo);
    const producto = await this.productoCliente.consultar(data.cod_producto);
    const subtotal = this.calcularSubtotal(producto.precio, data.cantidad);
    const detalles = [...factura.detalles_factura, { ...data, subtotal }];

    await db.orm.Factura.where({ codigo }).update({
      detalles_factura: detalles,
    });

    return this.consultar(codigo);
  }
   //actualizar detalle que sera un patch
  async actualizarDetalle(codigo: string, cod_detalle: number, data: Partial<DetalleFactura>) {
    const factura = await this.consultar(codigo);
    const detalles = factura.detalles_factura.map((detalle) =>
      detalle.codigo === cod_detalle ? { ...detalle, ...data } : detalle
    );

    await db.orm.Factura.where({ codigo }).update({
      detalles_factura: detalles,
    });

    return this.consultar(codigo);
  }

  //Eliminar detalle
  async eliminarDetalle(codigo: string, cod_detalle: number) {
    const factura = await this.consultar(codigo);
    const detalles = factura.detalles_factura.filter(
      (detalle) => detalle.codigo !== cod_detalle
    );

    await db.orm.Factura.where({ codigo }).update({
      detalles_factura: detalles,
    });

    return this.consultar(codigo);
  }

  //Calcular subtotal del detalle
  public calcularSubtotal(precio: number, cantidad: number) {
    return precio * cantidad;
  }
}
