'use client'

import { useState, useEffect } from 'react'
import { Search, MessageCircle, Calendar, CreditCard, Star, Phone, Video, Filter, ChevronRight, Heart, Shield, Zap, Users, TrendingUp, Award, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tervisResponse, setTervisResponse] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState('todas')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Carlos Silva', content: 'Olá! Como posso ajudar você hoje?', time: '10:30', unread: true },
    { id: 2, sender: 'AssineSaúde', content: 'Seu cupom de 20% de desconto está disponível!', time: '09:15', unread: true }
  ])

  // Obter localização do usuário
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Reverse geocoding para obter cidade/estado
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`
            )
            const data = await response.json()
            const city = data.address?.city || data.address?.town || data.address?.village
            const state = data.address?.state
            
            if (city && state) {
              const location = `${city}/${state}`
              setUserLocation(location)
              setSelectedLocation(location)
            }
          } catch (error) {
            console.error('Error getting location:', error)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
        }
      )
    }
  }, [])

  const specialties = [
    { id: 'clinica', name: 'Clínica Geral', icon: '🩺', count: 245 },
    { id: 'pediatria', name: 'Pediatria', icon: '👶', count: 89 },
    { id: 'cardiologia', name: 'Cardiologia', icon: '❤️', count: 67 },
    { id: 'psiquiatria', name: 'Psiquiatria', icon: '🧠', count: 54 },
    { id: 'dermatologia', name: 'Dermatologia', icon: '🌿', count: 78 },
    { id: 'ginecologia', name: 'Ginecologia', icon: '👩', count: 92 }
  ]

  const professionals = [
    {
      id: 1,
      name: 'Dra. Ana Carolina Santos',
      specialty: 'Cardiologia',
      rating: 4.9,
      reviews: 234,
      price: 280,
      avatar: '/avatars/doctor1.jpg',
      nextAvailable: 'Hoje, 14:00',
      experience: 15,

      languages: ['Português', 'Inglês'],
      consultationType: ['Presencial', 'Online']
    },

    {
      id: 2,

      name: 'Dr. Roberto Mendes',
      specialty: 'Clínica Geral',
      rating: 4.8,
      reviews: 189,
      price: 150,
      avatar: '/avatars/doctor2.jpg',
      available: true,
      nextAvailable: 'Hoje, 16:30',
      experience: 12,
      languages: ['Português'],
      consultationType: ['Presencial']
    },
    {
      id: 3,
      name: 'Dra. Mariana Costa',
      specialty: 'Pediatria',
      rating: 5.0,
      reviews: 312,
      price: 220,
      avatar: '/avatars/doctor3.jpg',
      available: false,
      nextAvailable: 'Amanhã, 09:00',
      experience: 18,
      languages: ['Português', 'Espanhol'],
      consultationType: ['Online', 'Presencial']
    }
  ]

  const coupons = [
    { code: 'BEMVINDO20', discount: '20%', description: 'Para primeira consulta', validUntil: '2024-12-31' },
    { code: 'SAUDE10', discount: '10%', description: 'Em todas as consultas', validUntil: '2024-11-30' },
    { code: 'TERVIS15', discount: '15%', description: 'Usando IA Tervis', validUntil: '2024-12-15' }
  ]

  const handleTervisSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    
    // Simulação de busca IA Tervis com localização
    setTimeout(() => {
      const locationText = selectedLocation ? ` em ${selectedLocation}` : ''
      const responses = [
        `Encontrei 3 especialistas em ${searchQuery}${locationText} disponíveis hoje. A Dra. Ana Carolina Santos tem as melhores avaliações (4.9⭐) e está disponível às 14:00. A consulta custa R$280, mas você tem um cupom de 20% de desconto disponível!`,
        `Baseado na sua busca por "${searchQuery}"${locationText}, recomendo o Dr. Roberto Mendes, com 12 anos de experiência e excelente feedback dos pacientes. Ele atende presencialmente${selectedLocation && ` em ${selectedLocation}`}. Valor: R$150.`,
        `Para ${searchQuery}${locationText}, a Dra. Mariana Costa é especialista renomada com 5.0 estrelas e 312 avaliações. Ela atende crianças e adolescentes, com consulta online disponível.`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setTervisResponse(randomResponse)
      setIsSearching(false)
    }, 2000)
  }

  const handleCouponApply = () => {
    if (couponCode === 'BEMVINDO20') {
      alert('🎉 Cupom aplicado! Você ganhou 20% de desconto na sua primeira consulta!')
      setShowCouponModal(false)
      setCouponCode('')
    } else {
      alert('Cupom inválido. Tente novamente!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
      {/* Logo AssineSaúde no Topo */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <img 
              src="/assinesaude-logo.png" 
              alt="AssineSaúde" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Carrossel Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Cuidar da sua saúde nunca foi tão fácil</h1>
            <p className="text-xl mb-4 text-orange-300">A tecnologia que nos conecta,</p>
            <p className="text-xl mb-8">Agora te conecta com Profissionais da Saúde, ATUALIZADOS!</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Search className="w-5 h-5 mr-2" />
                Buscar Médicos
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <img src="/tervis-logo.png" alt="Tervis AI" className="w-5 h-5" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  IA Tervis
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <MessageCircle className="w-4 h-4 mr-2" />
                Mensagens
                {messages.filter(m => m.unread).length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {messages.filter(m => m.unread).length}
                  </span>
                )}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Cupons
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>🎁 Seus Cupons de Desconto</DialogTitle>
                    <DialogDescription>
                      Use os cupons para economizar em suas consultas
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {coupons.map((coupon, index) => (
                      <Card key={index} className="border-green-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 mb-2">
                                {coupon.code}
                              </Badge>
                              <p className="font-medium">{coupon.description}</p>
                              <p className="text-sm text-gray-500">Desconto: {coupon.discount}</p>
                              <p className="text-xs text-gray-400">Válido até: {coupon.validUntil}</p>
                            </div>
                            <Button size="sm" onClick={() => setCouponCode(coupon.code)}>
                              Usar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Agendar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com IA Tervis */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
            Busca Inteligente com IA Tervis
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Encontre o profissional perfeito para suas necessidades de saúde
          </p>
          
          {/* Busca IA Tervis com Localização */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="space-y-4">
              {/* Seleção de Localização */}
              <div className="flex items-center justify-center space-x-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Sua localização:</span>
                {userLocation ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {userLocation}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-500">Detectando...</span>
                )}
                <Input
                  placeholder="Ou digite sua cidade"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-48"
                />
              </div>
              
              {/* Busca Principal */}
              <div className="relative">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder={`Pergunte à IA Tervis: 'Preciso de um cardiologista${selectedLocation ? ` em ${selectedLocation}` : ''}'`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleTervisSearch()}
                      className="pl-12 pr-4 py-4 text-lg border-2 border-green-200 focus:border-green-400 rounded-xl"
                    />
                  </div>
                  <Button 
                    onClick={handleTervisSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-green-500 to-purple-600 hover:from-green-600 hover:to-purple-700 px-8 rounded-xl"
                  >
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Buscando...
                      </>
                    ) : (
                      <>
                        Buscar com IA
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Filtros Rápidos */}
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm text-gray-600">Filtros:</span>
                {['Presencial', 'Online', 'Hoje', 'Cupons'].map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Resposta IA Tervis */}
            {tervisResponse && (
              <div className="mt-4 p-6 bg-gradient-to-r from-green-50 to-purple-50 rounded-xl border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <img src="/tervis-logo.png" alt="Tervis AI" className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-800 mb-2">IA Tervis encontrou:</h3>
                    <p className="text-gray-700">{tervisResponse}</p>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Útil
                      </Button>
                      <Button size="sm" variant="outline" className="text-gray-600">
                        <XCircle className="w-3 h-3 mr-1" />
                        Não útil
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800">50.000+</div>
              <div className="text-green-600">Pacientes Atendidos</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-800">1.200+</div>
              <div className="text-purple-600">Profissionais</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800">4.9</div>
              <div className="text-blue-600">Avaliação Média</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-800">15+</div>
              <div className="text-orange-600">Especialidades</div>
            </CardContent>
          </Card>
        </div>

        {/* Especialidades */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Especialidades Disponíveis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specialties.map((specialty) => (
              <Card key={specialty.id} className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{specialty.icon}</div>
                  <h3 className="font-semibold text-sm">{specialty.name}</h3>
                  <p className="text-xs text-gray-500">{specialty.count} profissionais</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Profissionais em Destaque */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Profissionais em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <Card key={professional.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={professional.avatar} />
                      <AvatarFallback>
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{professional.name}</CardTitle>
                      <CardDescription>{professional.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{professional.rating}</span>
                        <span className="text-sm text-gray-500">({professional.reviews})</span>
                      </div>
                      <Badge variant={professional.available ? "default" : "secondary"}>
                        {professional.available ? "Disponível" : "Ocupado"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>Experiência:</strong> {professional.experience} anos</p>
                      <p><strong>Próximo:</strong> {professional.nextAvailable}</p>
                      <p><strong>Valor:</strong> R$ {professional.price}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {professional.consultationType.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full" disabled={!professional.available}>
                      {professional.available ? "Agendar Consulta" : "Indisponível"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Como Funciona */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Busque</h3>
                <p className="text-sm text-gray-600">Use nossa IA Tervis para encontrar o profissional ideal</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Agende</h3>
                <p className="text-sm text-gray-600">Escolha o melhor horário para sua consulta</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Pague</h3>
                <p className="text-sm text-gray-600">Use cupons e pague de forma segura</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">4. Cuide-se</h3>
                <p className="text-sm text-gray-600">Receba o melhor cuidado para sua saúde</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AssineSaúde</h3>
              <p className="text-gray-400">Cuidar da sua saúde nunca foi tão fácil com tecnologia de ponta.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Pacientes</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Buscar Médicos</li>
                <li>Agendar Consultas</li>
                <li>Cupons de Desconto</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Para Profissionais</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cadastrar Perfil</li>
                <li>Gerenciar Agenda</li>
                <li>Receber Pacientes</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>suporte@assinesaude.com</li>
                <li>(11) 3000-0000</li>
                <li>Chat 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AssineSaúde. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
