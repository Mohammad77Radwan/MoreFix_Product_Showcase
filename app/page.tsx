/**
 * MoreFix - Site Vitrine
 * Développé par Mohammad Radwan
 * © 2025 MoreFix
 */
"use client"

import { useState, useMemo } from "react"
import {
  Phone,
  Mail,
  Search,
  Heart,
  MessageCircle,
  Grid,
  List,
  X,
  Menu,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"
import { ContactForm } from "@/components/contact-form"
import Image from "next/image"

const products = [
  // Hard Drives / Storage
  {
    id: 1,
    name: "Toshiba Canvio Basics 2TB",
    price: 94.9,
    originalPrice: 119.9,
    image: "/images/toshiba_canvio_front.png",
    gallery: [
      "/images/toshiba_canvio_front.png",
      "/images/toshiba_canvio_side.png",
      "/images/toshiba_canvio_port.png",
      "/images/toshiba_canvio_dimensions.png",
      "/images/toshiba_canvio_connected.png",
    ],
    category: "Stockage",
    condition: "Neuf",
    description:
      "Disque dur externe portable Toshiba Canvio Basics 2TB, USB 3.0, compact et fiable pour vos sauvegardes",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    features: ["2TB", "USB 3.0", "Portable", "Plug & Play", "Compatible PC/Mac"],
  },
  {
    id: 2,
    name: "Verbatim Mobile Hard Drive 500GB",
    price: 49.9,
    originalPrice: 69.9,
    image: "/images/verbatim_500gb.png",
    category: "Stockage",
    condition: "Neuf",
    description: "Disque dur externe Verbatim 500GB, design compact et élégant, parfait pour le stockage mobile",
    rating: 4.3,
    reviews: 45,
    inStock: true,
    features: ["500GB", "USB 3.0", "Design compact", "Sauvegarde automatique"],
  },
  {
    id: 3,
    name: "Verbatim Mobile Hard Drive 320GB",
    price: 34.9,
    originalPrice: 54.9,
    image: "/images/verbatim_320gb.png",
    category: "Stockage",
    condition: "Neuf",
    description: "Disque dur externe Verbatim 320GB, solution de stockage économique et fiable",
    rating: 4.2,
    reviews: 38,
    inStock: true,
    features: ["320GB", "USB 2.0", "Portable", "Économique", "Fiable"],
  },
  // Laptops
  {
    id: 4,
    name: "Dell Latitude 5400",
    price: 249,
    originalPrice: 399,
    image: "/images/dell_latitude_5400_windows.png",
    gallery: [
      "/images/dell_latitude_5400_windows.png",
      "/images/dell_latitude_5400_nature.png",
      "/images/dell_latitude_5400_rear.png",
      "/images/dell_latitude_5400_closed.png",
    ],
    category: "Ordinateurs",
    condition: "Neuf",
    description: "Ordinateur portable professionnel Dell Latitude 5400, parfait pour le travail et les études",
    rating: 4.4,
    reviews: 29,
    inStock: true,
    features: ["Intel i5-8365U", "8GB RAM", "256GB SSD", "14' Display", "Garantie 1 an"],
  },
  {
    id: 5,
    name: "Lenovo ThinkPad T480",
    price: 289,
    originalPrice: 449,
    image: "/images/thinkpad_t480_colorful.jpeg",
    gallery: ["/images/thinkpad_t480_colorful.jpeg", "/images/thinkpad_t480_dark.png", "/images/thinkpad_t480_red.png"],
    category: "Ordinateurs",
    condition: "Neuf",
    description: "Lenovo ThinkPad T480, robuste et performant, idéal pour les professionnels exigeants",
    rating: 4.6,
    reviews: 41,
    inStock: true,
    features: ["Intel i5-8250U", "8GB RAM", "240GB SSD", "14' Display", "Garantie 1 an"],
  },
  // Headphones
  {
    id: 6,
    name: "Energy Sistem Style 3 Bluetooth",
    price: 39.9,
    originalPrice: 59.9,
    image: "/images/energy_sistem_style3_lavender.png",
    gallery: [
      "/images/energy_sistem_style3_lavender.png",
      "/images/energy_sistem_style3_front.png",
      "/images/energy_sistem_style3_side.png",
      "/images/energy_sistem_style3_controls.png",
      "/images/energy_sistem_style3_package.png",
      "/images/energy_sistem_style3_box.png",
    ],
    category: "Audio",
    condition: "Neuf",
    description:
      "Casque Bluetooth Energy Sistem Style 3 en lavande, son de qualité et design moderne pour vos déplacements",
    rating: 4.1,
    reviews: 52,
    inStock: true,
    features: ["Bluetooth 5.1", "Autonomie 25h", "Micro intégré", "Pliable", "Deep Bass"],
  },
  {
    id: 7,
    name: "Sony MDR-ZX310AP Bleu",
    price: 29.9,
    originalPrice: 49.9,
    image: "/images/sony_mdr_zx310ap_side.png",
    gallery: ["/images/sony_mdr_zx310ap_side.png", "/images/sony_mdr_zx310ap_top.png"],
    category: "Audio",
    condition: "Neuf",
    description: "Casque filaire Sony MDR-ZX310AP en bleu, son équilibré et confort optimal pour un usage quotidien",
    rating: 4.3,
    reviews: 78,
    inStock: true,
    features: ["Filaire 3.5mm", "Micro intégré", "Pliable", "Confortable", "Son équilibré"],
  },
  {
    id: 8,
    name: "Sony MDR-ZX110AP Blanc",
    price: 29.9,
    originalPrice: 49.9,
    image: "/images/sony_mdr_zx110ap_white_front.png",
    gallery: [
      "/images/sony_mdr_zx110ap_white_front.png",
      "/images/sony_mdr_zx110ap_white_top.png",
      "/images/sony_mdr_zx110ap_white_angle.png",
    ],
    category: "Audio",
    condition: "Neuf",
    description: "Casque filaire Sony MDR-ZX110AP en blanc, design épuré et qualité sonore Sony reconnue",
    rating: 4.2,
    reviews: 63,
    inStock: true,
    features: ["Filaire 3.5mm", "Micro intégré", "Design léger", "Confortable", "Qualité Sony"],
  },
  // Smartphones with real images
  {
    id: 9,
    name: "Realme Note 60",
    price: 139.9,
    originalPrice: 179.9,
    image: "/images/realme_note_60_front_back.png",
    gallery: [
      "/images/realme_note_60_front_back.png",
      "/images/realme_note_60_specs.png",
      "/images/realme_note_60_display.png",
      "/images/realme_note_60_camera.png",
      "/images/realme_note_60_waterproof.png",
      "/images/realme_note_60_performance.png",
      "/images/realme_note_60_quality.png",
    ],
    category: "Smartphones",
    condition: "Neuf",
    description: "Smartphone Realme Note 60, performance et autonomie exceptionnelles pour un usage quotidien optimal",
    rating: 4.4,
    reviews: 89,
    inStock: true,
    features: ["Écran 6.74' 90Hz", "Batterie 5000mAh", "32MP Camera", "IP64", "4+128GB", "Android 14"],
  },
  {
    id: 10,
    name: "Xiaomi Redmi A5",
    price: 139.9,
    originalPrice: 179.9,
    image: "/images/xiaomi_redmi_a5_front_back.png",
    gallery: ["/images/xiaomi_redmi_a5_front_back.png", "/images/xiaomi_redmi_a5_back.png"],
    category: "Smartphones",
    condition: "Neuf",
    description: "Xiaomi Redmi A5 avec caméra IA 32MP double, photographie avancée et performances fluides",
    rating: 4.5,
    reviews: 94,
    inStock: true,
    features: ["32MP AI Dual Camera", "Écran 6.71'", "Batterie 5000mAh", "Android 14", "Charge rapide 18W"],
  },
]

const categories = ["Tous", "Stockage", "Ordinateurs", "Audio", "Smartphones"]

type Product = (typeof products)[0]
type ViewMode = "grid" | "list"
type SortOption = "price-asc" | "price-desc" | "rating" | "newest"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactProduct, setContactProduct] = useState<Product | null>(null)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: number]: number }>({})

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
        default:
          return b.id - a.id
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    toast({
      title: wishlist.includes(productId) ? "Retiré des favoris" : "Ajouté aux favoris",
      description: wishlist.includes(productId)
        ? "Le produit a été retiré de votre liste de souhaits"
        : "Le produit a été ajouté à votre liste de souhaits",
    })
  }

  const openContactModal = (product: Product) => {
    setContactProduct(product)
    setContactDialogOpen(true)
  }

  const handleImageNavigation = (productId: number, direction: "prev" | "next", galleryLength: number) => {
    setSelectedImageIndex((prev) => {
      const currentIndex = prev[productId] || 0
      let newIndex
      if (direction === "next") {
        newIndex = (currentIndex + 1) % galleryLength
      } else {
        newIndex = currentIndex === 0 ? galleryLength - 1 : currentIndex - 1
      }
      return { ...prev, [productId]: newIndex }
    })
  }

  const getCurrentImage = (product: Product) => {
    if (product.gallery && product.gallery.length > 0) {
      const index = selectedImageIndex[product.id] || 0
      return product.gallery[index]
    }
    return product.image
  }

  // Lightbox functions
  const openLightbox = (product: Product, imageIndex = 0) => {
    setLightboxProduct(product)
    setLightboxImageIndex(imageIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxProduct(null)
    setLightboxImageIndex(0)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxProduct) return

    const gallery = lightboxProduct.gallery || [lightboxProduct.image]
    const maxIndex = gallery.length - 1

    if (direction === "next") {
      setLightboxImageIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    } else {
      setLightboxImageIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    }
  }

  const getCurrentLightboxImage = () => {
    if (!lightboxProduct) return ""

    const gallery = lightboxProduct.gallery || [lightboxProduct.image]
    return gallery[lightboxImageIndex] || lightboxProduct.image
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="MoreFix Logo" width={120} height={40} className="h-10 w-auto" />
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher un produit..."
                  className="pl-10 w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Heart className="w-5 h-5" />
                    {wishlist.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {wishlist.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Mes Favoris</SheetTitle>
                    <SheetDescription>
                      {wishlist.length} produit{wishlist.length !== 1 ? "s" : ""} dans votre liste de souhaits
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {wishlist.map((id) => {
                      const product = products.find((p) => p.id === id)
                      if (!product) return null
                      return (
                        <div key={id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="w-16 h-16 relative overflow-hidden rounded">
                            <Image
                              src={getCurrentImage(product) || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-purple-600 font-semibold">{product.price}€</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => toggleWishlist(id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                    {wishlist.length === 0 && (
                      <p className="text-gray-500 text-center py-8">Aucun produit dans vos favoris</p>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Contact Button - Always Visible */}
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Nous contacter</span>
                <span className="sm:hidden">Contact</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={category === selectedCategory ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedCategory(category)
                            setMobileMenuOpen(false)
                          }}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <Button
                        onClick={() => {
                          scrollToContact()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all duration-300"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Nous contacter
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-400 via-purple-500 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Hero Logo - White version */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="MoreFix Logo"
              width={240}
              height={80}
              className="h-24 w-auto brightness-0 invert"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">Produits High-Tech</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez notre sélection de produits électroniques reconditionnés et neufs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Voir tous les produits
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToContact}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b" id="products">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === selectedCategory ? "default" : "outline"}
                  size="sm"
                  className={category === selectedCategory ? "bg-gradient-to-r from-orange-500 to-purple-600" : ""}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                  <SelectItem value="newest">Plus récents</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="border-r"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé
            {filteredProducts.length !== 1 ? "s" : ""}
            {searchQuery && ` pour "${searchQuery}"`}
            {selectedCategory !== "Tous" && ` dans ${selectedCategory}`}
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Aucun produit trouvé</h3>
              <p className="text-gray-600 mb-8">Essayez de modifier vos critères de recherche</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Tous")
                }}
                className="bg-gradient-to-r from-orange-500 to-purple-600"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden cursor-pointer bg-white ${
                          viewMode === "list" ? "w-full h-full aspect-square" : "w-full h-48"
                        }`}
                        onClick={() => {
                          const currentIndex = selectedImageIndex[product.id] || 0
                          openLightbox(product, currentIndex)
                        }}
                      >
                        <Image
                          src={getCurrentImage(product) || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Image navigation for products with gallery */}
                      {product.gallery && product.gallery.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleImageNavigation(product.id, "prev", product.gallery!.length)
                            }}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleImageNavigation(product.id, "next", product.gallery!.length)
                            }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>

                          {/* Image indicators */}
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                            {product.gallery.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === (selectedImageIndex[product.id] || 0) ? "bg-purple-600" : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg px-4 py-2">
                          Rupture de stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className={viewMode === "list" ? "flex-1" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="rounded-full px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-purple-600 shadow-sm">
                          Neuf
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>

                      {viewMode === "list" && (
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {product.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">{product.price}€</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                          disabled={!product.inStock}
                          onClick={() => openContactModal(product)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contacter
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!product.inStock}
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxProduct && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation buttons */}
            {lightboxProduct.gallery && lightboxProduct.gallery.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={() => navigateLightbox("prev")}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                  onClick={() => navigateLightbox("next")}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Main image */}
            <div className="relative w-full h-full max-w-3xl max-h-[80vh] bg-white/10 rounded-lg p-4">
              <Image
                src={getCurrentLightboxImage() || "/placeholder.svg"}
                alt={lightboxProduct.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image counter and product info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
              <h3 className="text-lg font-semibold mb-2">{lightboxProduct.name}</h3>
              {lightboxProduct.gallery && lightboxProduct.gallery.length > 1 && (
                <p className="text-sm opacity-75">
                  {lightboxImageIndex + 1} / {lightboxProduct.gallery.length}
                </p>
              )}
            </div>

            {/* Thumbnail navigation */}
            {lightboxProduct.gallery && lightboxProduct.gallery.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {lightboxProduct.gallery.map((image, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 relative overflow-hidden rounded border-2 ${
                      index === lightboxImageIndex ? "border-white" : "border-white/50"
                    }`}
                    onClick={() => setLightboxImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${lightboxProduct.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Modal - Used for product-specific contact */}
      <Dialog
        open={contactDialogOpen}
        onOpenChange={(open) => {
          setContactDialogOpen(open)
          if (!open) setContactProduct(null)
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contacter le vendeur</DialogTitle>
            <DialogDescription>Produit: {contactProduct?.name}</DialogDescription>
          </DialogHeader>
          <ContactForm
            productId={contactProduct?.id}
            productName={contactProduct?.name}
            defaultMessage={
              contactProduct
                ? `Bonjour, je suis intéressé(e) par le produit "${contactProduct.name}" au prix de ${contactProduct.price}€. Pourriez-vous me donner plus d'informations ?`
                : ""
            }
            onSuccess={() => {
              setContactDialogOpen(false)
              setContactProduct(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Intéressé par un produit ?</h2>
              <p className="text-xl text-gray-600">
                Contactez-nous pour plus d'informations, négocier le prix ou organiser un rendez-vous
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Appelez-nous</h3>
                <p className="text-gray-600 mb-4 text-center">Discutez directement avec notre équipe</p>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-purple-600"
                  onClick={() => window.open("tel:0745923538")}
                >
                  07 45 92 35 38
                </Button>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">Envoyez un message</h3>
                <p className="text-gray-600 mb-4 text-center">Décrivez le produit qui vous intéresse</p>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section with Google Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Magasin</h2>
              <p className="text-xl text-gray-600">Venez nous rendre visite à Saint-Étienne</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Location Info */}
              <Card className="p-6 h-fit">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">MoreFix Saint-Étienne</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">
                        10 Rue Mi-Carême
                        <br />
                        42000 Saint-Étienne
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600">07 45 92 35 38</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contact@morefix.fr</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Horaires d'ouverture</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mardi - Samedi</span>
                      <span className="text-gray-600">10h00 - 19h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche</span>
                      <span className="text-gray-600">Fermé</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lundi</span>
                      <span className="text-gray-600">Fermé</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-600"
                    onClick={() =>
                      window.open("https://maps.google.com/?q=10+Rue+Mi-Carême,+42000+Saint-Étienne", "_blank")
                    }
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ouvrir dans Google Maps
                  </Button>
                </div>
              </Card>

              {/* Google Map */}
              <div className="relative">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.8234567890123!2d4.3876543210987654!3d45.43876543210987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f5a9876543210f%3A0x1234567890abcdef!2s10%20Rue%20Mi-Car%C3%AAme%2C%2042000%20Saint-%C3%89tienne%2C%20France!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MoreFix Location - 10 Rue Mi-Carême, Saint-Étienne"
                    className="w-full h-96 lg:h-[500px]"
                  />
                </div>

                {/* Map overlay with business info */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full"></div>
                    <span className="font-semibold text-sm">MoreFix</span>
                  </div>
                  <p className="text-xs text-gray-600">10 Rue Mi-Carême</p>
                  <p className="text-xs text-gray-600">42000 Saint-Étienne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Image
                src="/logo.png"
                alt="MoreFix Logo"
                width={150}
                height={50}
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 mb-4 max-w-md">
                Votre marketplace de confiance pour les produits high-tech reconditionnés et neufs. Qualité garantie et
                prix compétitifs.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(1).map((category) => (
                  <li key={category}>
                    <button
                      className="hover:text-white transition-colors text-left"
                      onClick={() => {
                        setSelectedCategory(category)
                        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <button
                  className="block hover:text-white transition-colors"
                  onClick={() => window.open("tel:0745923538")}
                >
                  📞 07 45 92 35 38
                </button>
                <button className="block hover:text-white transition-colors" onClick={scrollToContact}>
                  📧 contact@morefix.fr
                </button>
                <p>📍 10 Rue Mi-Carême, 42000 Saint-Étienne</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MoreFix. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
