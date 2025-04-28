export interface Categoria {
  id: number
  nombre: string
  slug: string
  imagen: string
}

export interface Producto {
  id: number
  nombre: string
  slug: string
  descripcion: string
  precio: number
  descuento: number
  imagen: string
  imagenSecundaria?: string
  categoria: string
  colores: string[]
  tallas: number[]
  destacado: boolean
}
