"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Producto } from "@/lib/types"

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div
        className="relative h-[200px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/producto/${producto.slug}`}>
          <img
            src={isHovered && producto.imagenSecundaria ? producto.imagenSecundaria : producto.imagen}
            alt={producto.nombre}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {producto.descuento > 0 && (
            <Badge className="absolute left-2 top-2 bg-red-500 hover:bg-red-600">-{producto.descuento}%</Badge>
          )}
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 text-sm text-muted-foreground">{producto.categoria}</div>
        <Link href={`/producto/${producto.slug}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2">{producto.nombre}</h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold">€{(producto.precio * (1 - producto.descuento / 100)).toFixed(2)}</span>
          {producto.descuento > 0 && (
            <span className="text-sm text-muted-foreground line-through">€{producto.precio.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
