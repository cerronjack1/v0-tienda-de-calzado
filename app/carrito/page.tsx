"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { productosDestacados } from "@/lib/data"

export default function CartPage() {
  const [cart, setCart] = useState([
    { producto: productosDestacados[0], cantidad: 1, talla: 42, color: "Negro" },
    { producto: productosDestacados[2], cantidad: 1, talla: 41, color: "Blanco" },
  ])

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const newCart = [...cart]
    newCart[index].cantidad = newQuantity
    setCart(newCart)
  }

  const removeItem = (index: number) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const subtotal = cart.reduce((sum, item) => {
    const precio = item.producto.precio * (1 - item.producto.descuento / 100)
    return sum + precio * item.cantidad
  }, 0)

  const envio = subtotal > 50 ? 0 : 4.99
  const total = subtotal + envio

  if (cart.length === 0) {
    return (
      <div className="container py-12 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">Tu carrito está vacío</h1>
          <p className="mt-2 text-muted-foreground">
            Parece que aún no has añadido ningún producto a tu carrito de compras.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Continuar comprando</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Carrito de Compra</h1>
      <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="p-6">
              <h2 className="text-lg font-medium">Productos ({cart.length})</h2>
            </div>
            <Separator />
            {cart.map((item, index) => (
              <div key={`${item.producto.id}-${item.talla}-${item.color}`}>
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.producto.imagen || "/placeholder.svg"}
                        alt={item.producto.nombre}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/producto/${item.producto.slug}`} className="hover:underline">
                              {item.producto.nombre}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">Color: {item.color}</p>
                          <p className="text-sm text-muted-foreground">Talla: {item.talla}</p>
                        </div>
                        <p className="font-medium">
                          €{(item.producto.precio * (1 - item.producto.descuento / 100)).toFixed(2)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(index, item.cantidad - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Reducir cantidad</span>
                          </Button>
                          <div className="flex h-8 w-8 items-center justify-center text-sm">{item.cantidad}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(index, item.cantidad + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar cantidad</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {index < cart.length - 1 && <Separator />}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/">Continuar comprando</Link>
            </Button>
          </div>
        </div>
        <div>
          <div className="rounded-lg border">
            <div className="p-6">
              <h2 className="text-lg font-medium">Resumen del pedido</h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">€{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Envío</p>
                  <p className="font-medium">{envio === 0 ? "Gratis" : `€${envio.toFixed(2)}`}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p>Total</p>
                  <p className="text-xl font-bold">€{total.toFixed(2)}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Impuestos incluidos. El envío se calcula en el siguiente paso.
                </div>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Finalizar compra
              </Button>
            </div>
            <Separator />
            <div className="p-6">
              <h3 className="mb-4 text-sm font-medium">Código promocional</h3>
              <div className="flex gap-2">
                <Input placeholder="Código" className="flex-1" />
                <Button variant="outline">Aplicar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
