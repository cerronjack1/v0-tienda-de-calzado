import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductCard from "@/components/product-card"
import { categorias, productosDestacados } from "@/lib/data"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              SportShoes
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/productos" className="text-sm font-medium hover:underline">
                Todos los Productos
              </Link>
              <Link href="/hombres" className="text-sm font-medium hover:underline">
                Hombres
              </Link>
              <Link href="/mujeres" className="text-sm font-medium hover:underline">
                Mujeres
              </Link>
              <Link href="/niños" className="text-sm font-medium hover:underline">
                Niños
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative w-full max-w-sm items-center">
              <Input type="search" placeholder="Buscar productos..." className="pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
                <span className="sr-only">Buscar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </Button>
            </div>
            <Link href="/carrito">
              <Button size="icon" variant="ghost">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrito</span>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="hidden md:flex">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="hidden md:flex">
              Registrarse
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25" />
          <div
            className="h-[500px] w-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/placeholder.svg?height=500&width=1200')",
            }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-lg space-y-4 text-white">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Las Mejores Zapatillas Deportivas
                </h1>
                <p className="text-lg">
                  Descubre nuestra colección de calzado deportivo de alta calidad para todos tus entrenamientos.
                </p>
                <div className="flex gap-4">
                  <Button size="lg">Comprar Ahora</Button>
                  <Button variant="outline" size="lg" className="text-white border-white hover:text-white">
                    Ver Colecciones
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-16">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Categorías Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.slug}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <img
                  src={categoria.imagen || "/placeholder.svg"}
                  alt={categoria.nombre}
                  className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{categoria.nombre}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Productos Destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productosDestacados.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Suscríbete a Nuestro Newsletter</h2>
              <p className="mb-6 text-muted-foreground">
                Recibe las últimas novedades, ofertas exclusivas y consejos sobre calzado deportivo directamente en tu
                bandeja de entrada.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Tu correo electrónico" className="max-w-sm" />
                <Button>Suscribirse</Button>
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=600"
                alt="Newsletter"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">SportShoes</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/nosotros" className="text-muted-foreground hover:text-foreground">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/tiendas" className="text-muted-foreground hover:text-foreground">
                    Nuestras Tiendas
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Ayuda</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/envios" className="text-muted-foreground hover:text-foreground">
                    Envíos y Entregas
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="text-muted-foreground hover:text-foreground">
                    Devoluciones
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categorías</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/running" className="text-muted-foreground hover:text-foreground">
                    Running
                  </Link>
                </li>
                <li>
                  <Link href="/futbol" className="text-muted-foreground hover:text-foreground">
                    Fútbol
                  </Link>
                </li>
                <li>
                  <Link href="/baloncesto" className="text-muted-foreground hover:text-foreground">
                    Baloncesto
                  </Link>
                </li>
                <li>
                  <Link href="/fitness" className="text-muted-foreground hover:text-foreground">
                    Fitness
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Calle Principal 123, Madrid</li>
                <li className="text-muted-foreground">+34 912 345 678</li>
                <li className="text-muted-foreground">info@sportshoes.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2023 SportShoes. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
