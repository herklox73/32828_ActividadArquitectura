import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { FacturaService } from './factura.service.js';
import type { Factura } from '../../models/factura.model.js';
import type { DetalleFactura } from '../../models/detalle-factura.model.js';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  crear(@Body() data:any) {
    return this.facturaService.crear(data);
  }

  @Get()
  listar() {
    return this.facturaService.listar();
  }

  @Get(':codigo')
  consultar(@Param('codigo') codigo: string) {
    return this.facturaService.consultar(codigo);
  }

  @Put(':codigo')
  actualizar(@Param('codigo') codigo: string, @Body() data: Partial<Factura>) {
    return this.facturaService.actualizar(codigo, data);
  }

  @Delete(':codigo')
  eliminar(@Param('codigo') codigo: string) {
    return this.facturaService.eliminar(codigo);
  }

  //Detalle Factura
  @Post(':codigo/detalle')
  agregarDetalle(@Param('codigo') codigo: string, @Body() data: DetalleFactura) {
    return this.facturaService.agregarDetalle(codigo, data);
  }

  @Patch(':codigo/detalle/:cod_detalle')
  actualizarDetalle(
    @Param('codigo') codigo: string,
    @Param('cod_detalle') cod_detalle: string,
    @Body() data: Partial<DetalleFactura>,
  ) {
    return this.facturaService.actualizarDetalle(codigo, Number(cod_detalle), data);
  }

  @Delete(':codigo/detalle/:cod_detalle')
  eliminarDetalle(@Param('codigo') codigo: string, @Param('cod_detalle') cod_detalle: string) {
    return this.facturaService.eliminarDetalle(codigo, Number(cod_detalle));
  }

  
}
