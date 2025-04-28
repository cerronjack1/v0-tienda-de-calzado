"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Heart, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { productosDestacados } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const producto = productosDestacados.find((p) => p.slug === params.slug)

  const [selectedColor, setSelectedColor] = useState(producto?.colores?.[0] || "")
  const [selectedSize, setSelectedSize] = useState<number | null>(producto?.tallas?.[0] || null)
  const [quantity, setQuantity] = useState(1)

  if (!producto) {
    return <div className="container py-12">Producto no encontrado</div>
  }

  const precioFinal = producto.precio * (1 - producto.descuento / 100)

  return (
    <div className="min-h-screen">
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/categoria/${producto.categoria.toLowerCase()}`} className="hover:text-foreground">
            {producto.categoria}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{producto.nombre}</span>
        </div>
      </div>

      <div className="container py-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <img
                src={producto.imagen || "/placeholder.svg"}
                alt={producto.nombre}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="overflow-hidden rounded-lg border cursor-pointer">
                <img
                  src={producto.imagen || "/placeholder.svg"}
                  alt={`${producto.nombre} - Vista 1`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border cursor-pointer">
                <img
                  src={producto.imagenSecundaria || producto.imagen}
                  alt={`${producto.nombre} - Vista 2`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border cursor-pointer">
                <img
                  src="/placeholder.svg?height=100&width=100&text=Vista+3"
                  alt={`${producto.nombre} - Vista 3`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg border cursor-pointer">
                <img
                  src="/placeholder.svg?height=100&width=100&text=Vista+4"
                  alt={`${producto.nombre} - Vista 4`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{producto.nombre}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reseñas)</span>
                </div>
                <span className="text-sm text-muted-foreground">Código: {producto.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">€{precioFinal.toFixed(2)}</span>
              {producto.descuento > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">€{producto.precio.toFixed(2)}</span>
                  <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                    -{producto.descuento}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{producto.descripcion}</p>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {producto.colores.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className="rounded-md"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Talla</h3>
                <div className="flex flex-wrap gap-2">
                  {producto.tallas.map((talla) => (
                    <Button
                      key={talla}
                      variant={selectedSize === talla ? "default" : "outline"}
                      className="h-10 w-12 rounded-md"
                      onClick={() => setSelectedSize(talla)}
                    >
                      {talla}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Cantidad</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="flex h-10 w-14 items-center justify-center border-y">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 gap-2" size="lg">
                <ShoppingCart className="h-5 w-5" />
                Añadir al Carrito
              </Button>
              <Button variant="outline" size="lg" className="flex-1 gap-2">
                <Heart className="h-5 w-5" />
                Añadir a Favoritos
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Envío gratuito en pedidos superiores a €50</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">Entrega estimada: 3-5 días laborables</div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="descripcion">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
              <TabsTrigger value="opiniones">Opiniones</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion" className="mt-6">
              <div className="prose max-w-none">
                <p>
                  {producto.descripcion} Estas zapatillas deportivas están diseñadas para ofrecer el máximo rendimiento
                  y comodidad durante tus actividades físicas.
                </p>
                <p>
                  Fabricadas con materiales de alta calidad, estas zapatillas proporcionan una excelente amortiguación,
                  soporte y durabilidad. Su diseño ergonómico se adapta perfectamente a la forma del pie, reduciendo la
                  fatiga y previniendo lesiones.
                </p>
                <p>
                  La suela exterior de goma ofrece una tracción excepcional en diferentes superficies, mientras que la
                  entresuela absorbe los impactos para proteger tus articulaciones. El sistema de ventilación integrado
                  mantiene tus pies frescos y secos durante todo el día.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="especificaciones" className="mt-6">
              <div className="prose max-w-none">
                <ul>
                  <li>
                    <strong>Material exterior:</strong> Malla transpirable y sintético
                  </li>
                  <li>
                    <strong>Material interior:</strong> Textil
                  </li>
                  <li>
                    <strong>Suela:</strong> Goma resistente a la abrasión
                  </li>
                  <li>
                    <strong>Tecnología:</strong> Sistema de amortiguación avanzado
                  </li>
                  <li>
                    <strong>Peso:</strong> Aproximadamente 300g (talla 42)
                  </li>
                  <li>
                    <strong>Altura de la caña:</strong> Baja
                  </li>
                  <li>
                    <strong>Tipo de cierre:</strong> Cordones
                  </li>
                  <li>
                    <strong>Uso recomendado:</strong> {producto.categoria}
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="opiniones" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Opiniones de clientes</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2">4.0 de 5 (24 reseñas)</span>
                    </div>
                  </div>
                  <Button>Escribir una reseña</Button>
                </div>

                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-user.jpg" alt="@usuario" />
                          <AvatarFallback>MG</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">María García</div>
                          <div className="text-sm text-muted-foreground">Hace 2 semanas</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        Excelentes zapatillas, muy cómodas desde el primer uso. La amortiguación es perfecta para mis
                        entrenamientos diarios. Recomendadas 100%.
                      </p>
                    </div>
                  </div>

                  <div className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-user.jpg" alt="@usuario" />
                          <AvatarFallback>JR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Juan Rodríguez</div>
                          <div className="text-sm text-muted-foreground">Hace 1 mes</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 3 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        Buenas zapatillas, aunque esperaba un poco más de amortiguación. El diseño es muy bonito y la
                        calidad de los materiales parece buena. Talla según lo esperado.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder-user.jpg" alt="@usuario" />
                          <AvatarFallback>LP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Laura Pérez</div>
                          <div className="text-sm text-muted-foreground">Hace 2 meses</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p>
                        Muy satisfecha con mi compra. Las zapatillas son ligeras y cómodas, perfectas para mis
                        entrenamientos de running. La entrega fue rápida y el producto llegó en perfectas condiciones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
