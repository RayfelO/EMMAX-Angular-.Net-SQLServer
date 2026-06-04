import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private readonly imageBase = 'https://picsum.photos/640/360?random=';
  private readonly heroBase = 'https://static.photos/technology/1200x630/';

  private products = [
    { idProducto: 1, nombre: 'Laptop Pro X1', precio: 1299.99, stock: 15, descripcion: 'Laptop de alta gama con procesador Intel i7, 16GB RAM y SSD 512GB. Ideal para desarrollo y diseño profesional.', imagen: `${this.imageBase}1` },
    { idProducto: 2, nombre: 'Monitor 4K Ultra', precio: 499.99, stock: 8, descripcion: 'Monitor 27 pulgadas 4K UHD con tecnología IPS y 144Hz. Colores vibrantes y ángulos de visión amplios.', imagen: `${this.imageBase}2` },
    { idProducto: 3, nombre: 'Teclado Mecánico RGB', precio: 149.99, stock: 25, descripcion: 'Teclado mecánico con switches Cherry MX Red, iluminación RGB personalizable y reposamuñecas ergonómico.', imagen: `${this.imageBase}3` },
    { idProducto: 4, nombre: 'Mouse Gamer Elite', precio: 79.99, stock: 40, descripcion: 'Mouse gaming con sensor óptico de 16000 DPI, 8 botones programables y peso ajustable.', imagen: `${this.imageBase}4` },
    { idProducto: 5, nombre: 'Auriculares NoiseCancel', precio: 249.99, stock: 12, descripcion: 'Auriculares con cancelación activa de ruido, 30 horas de batería y sonido de alta fidelidad.', imagen: `${this.imageBase}5` },
    { idProducto: 6, nombre: 'Webcam HD Pro', precio: 89.99, stock: 30, descripcion: 'Webcam 1080p con autoenfoque, micrófono estéreo y corrección de luz. Perfecta para videollamadas.', imagen: `${this.imageBase}6` },
    { idProducto: 7, nombre: 'Disco SSD 1TB', precio: 109.99, stock: 50, descripcion: 'SSD NVMe de 1TB con velocidades de lectura de hasta 3500 MB/s. Compatible con PCIe 3.0.', imagen: `${this.imageBase}7` },
    { idProducto: 8, nombre: 'Router WiFi 6', precio: 199.99, stock: 18, descripcion: 'Router de última generación con WiFi 6, cobertura de hasta 200m² y soporte para 50+ dispositivos.', imagen: `${this.imageBase}8` },
  ];

  // Datos para la sección "Categorías destacadas" del dashboard
  private categoryProducts = [
    { idProducto: 101, categoria: { nombre: 'Computadoras', descripcion: 'Portátiles y equipos de escritorio de última generación' }, imagen: `${this.heroBase}101` },
    { idProducto: 102, categoria: { nombre: 'Periféricos', descripcion: 'Teclados, mouse, monitores y accesorios gaming' }, imagen: `${this.heroBase}102` },
    { idProducto: 103, categoria: { nombre: 'Audio', descripcion: 'Auriculares, altavoces y equipos de sonido profesional' }, imagen: `${this.heroBase}103` },
    { idProducto: 104, categoria: { nombre: 'Redes', descripcion: 'Routers, switches y soluciones de conectividad' }, imagen: `${this.heroBase}104` },
  ];

  // Productos recientes
  private recentProducts = [
    { idProducto: 8, nombre: 'Router WiFi 6', descripcion: 'Router de última generación con WiFi 6, cobertura de hasta 200m².', precio: 199.99, imagen: `${this.imageBase}8` },
    { idProducto: 6, nombre: 'Webcam HD Pro', descripcion: 'Webcam 1080p con autoenfoque, micrófono estéreo.', precio: 89.99, imagen: `${this.imageBase}6` },
    { idProducto: 7, nombre: 'Disco SSD 1TB', descripcion: 'SSD NVMe de 1TB con velocidades de hasta 3500 MB/s.', precio: 109.99, imagen: `${this.imageBase}7` },
    { idProducto: 5, nombre: 'Auriculares NoiseCancel', descripcion: 'Auriculares con cancelación activa de ruido.', precio: 249.99, imagen: `${this.imageBase}5` },
  ];

  // Productos mejor calificados
  private popularProducts = [
    { idProducto: 1, nombre: 'Laptop Pro X1', descripcion: 'Laptop de alta gama con procesador Intel i7, 16GB RAM.', precio: 1299.99, imagen: `${this.imageBase}1` },
    { idProducto: 3, nombre: 'Teclado Mecánico RGB', descripcion: 'Teclado mecánico con switches Cherry MX Red.', precio: 149.99, imagen: `${this.imageBase}3` },
    { idProducto: 2, nombre: 'Monitor 4K Ultra', descripcion: 'Monitor 27 pulgadas 4K UHD con tecnología IPS.', precio: 499.99, imagen: `${this.imageBase}2` },
    { idProducto: 4, nombre: 'Mouse Gamer Elite', descripcion: 'Mouse gaming con sensor óptico de 16000 DPI.', precio: 79.99, imagen: `${this.imageBase}4` },
  ];

  private categories = [
    { idCategoria: 1, nombre: 'Computadoras' },
    { idCategoria: 2, nombre: 'Periféricos' },
    { idCategoria: 3, nombre: 'Almacenamiento' },
    { idCategoria: 4, nombre: 'Redes' },
    { idCategoria: 5, nombre: 'Audio' },
  ];

  private reviews: any = {
    1: [
      { idReseña: 1, valorReseña: 5, comentario: 'Excelente laptop, superó mis expectativas. El rendimiento es increíble.', usuario: 'Carlos M.' },
      { idReseña: 2, valorReseña: 4, comentario: 'Muy buena, aunque la batería dura un poco menos de lo esperado.', usuario: 'Ana L.' },
    ],
    2: [
      { idReseña: 3, valorReseña: 5, comentario: 'La calidad de imagen es espectacular. Los colores son muy fieles.', usuario: 'Pedro R.' },
    ],
    3: [
      { idReseña: 4, valorReseña: 5, comentario: 'Me encanta el sonido de los switches. Muy cómodo para escribir.', usuario: 'María G.' },
      { idReseña: 5, valorReseña: 4, comentario: 'Buen teclado, pero el software de RGB podría mejorar.', usuario: 'Juan D.' },
    ],
    4: [
      { idReseña: 6, valorReseña: 5, comentario: 'Preciso y ergonómico. Perfecto para gaming de largas sesiones.', usuario: 'Luis F.' },
    ],
    5: [
      { idReseña: 7, valorReseña: 5, comentario: 'La cancelación de ruido es impresionante. No escucho nada externo.', usuario: 'Sofía T.' },
    ],
    6: [
      { idReseña: 8, valorReseña: 4, comentario: 'Buena calidad de video, pero el audio podría ser más nítido.', usuario: 'Diego H.' },
    ],
    7: [
      { idReseña: 9, valorReseña: 5, comentario: 'Velocidad increíble. Mi sistema arranca en segundos.', usuario: 'Laura P.' },
    ],
    8: [
      { idReseña: 10, valorReseña: 4, comentario: 'Excelente cobertura. La configuración fue muy sencilla.', usuario: 'Roberto K.' },
    ],
  };

  private carrito = [
    { idCarrito: 1, cantidad: 2, precio: 1299.99, producto: this.products[0] },
    { idCarrito: 2, cantidad: 1, precio: 149.99, producto: this.products[2] },
    { idCarrito: 3, cantidad: 3, precio: 79.99, producto: this.products[3] },
  ];

  private listaDeseos = [
    { idListaProducto: 1, producto: this.products[1] },
    { idListaProducto: 2, producto: this.products[4] },
  ];

  private historial = [
    {
      idOrden: 1001,
      fecha: '2024-11-15T10:30:00',
      total: 1449.98,
      estado: 'Entregado',
      detalles: [
        { producto: this.products[0], cantidad: 1, precioUnitario: 1299.99 },
        { producto: this.products[2], cantidad: 1, precioUnitario: 149.99 },
      ]
    },
    {
      idOrden: 1002,
      fecha: '2024-12-01T14:45:00',
      total: 329.98,
      estado: 'Enviado',
      detalles: [
        { producto: this.products[5], cantidad: 2, precioUnitario: 89.99 },
        { producto: this.products[6], cantidad: 1, precioUnitario: 109.99 },
      ]
    },
  ];

  private dashboardStats = {
    totalVentas: 24580.50,
    totalProductos: 8,
    totalOrdenes: 156,
    productosMasVendidos: [
      { nombre: 'Laptop Pro X1', cantidadVendida: 42, totalGenerado: 54599.58 },
      { nombre: 'Auriculares NoiseCancel', cantidadVendida: 38, totalGenerado: 9499.62 },
      { nombre: 'Monitor 4K Ultra', cantidadVendida: 25, totalGenerado: 12499.75 },
    ]
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request.url;

    // Productos paginados (Shop)
    if (url.includes('/Producto?page=') && !url.includes('categoryProduct') && !url.includes('recentProduct') && !url.includes('reviewProduct')) {
      const page = parseInt(url.match(/page=(\d+)/)?.[1] || '1');
      const pageSize = parseInt(url.match(/pageSize=(\d+)/)?.[1] || '8');
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      
      let filtered = [...this.products];
      
      const categoryFilter = url.match(/categoryFilter=([^&]*)/)?.[1];
      if (categoryFilter && categoryFilter !== '---') {
        const catIds: any = { 'Computadoras': [1], 'Periféricos': [2,3,4,6], 'Almacenamiento': [7], 'Redes': [8], 'Audio': [5] };
        const ids = catIds[categoryFilter] || [];
        filtered = this.products.filter(p => ids.includes(p.idProducto));
      }
      
      const productFilter = url.match(/productFilter=([^&]*)/)?.[1];
      if (productFilter) {
        filtered = filtered.filter(p => p.nombre.toLowerCase().includes(productFilter.toLowerCase()));
      }
      
      const paginated = filtered.slice(start, end);
      return of(new HttpResponse({ status: 200, body: paginated }));
    }

    // Dashboard: Categorías destacadas
    if (url.includes('categoryProduct=true')) {
      return of(new HttpResponse({ status: 200, body: this.categoryProducts }));
    }

    // Dashboard: Productos recientes
    if (url.includes('recentProduct=true')) {
      return of(new HttpResponse({ status: 200, body: this.recentProducts }));
    }

    // Dashboard: Productos mejor calificados
    if (url.includes('reviewProduct=true')) {
      return of(new HttpResponse({ status: 200, body: this.popularProducts }));
    }

    // Categorías
    if (url.endsWith('/Categoria')) {
      return of(new HttpResponse({ status: 200, body: this.categories }));
    }

    // Detalle de producto
    const productDetailMatch = url.match(/\/Producto\/(\d+)$/);
    if (productDetailMatch) {
      const id = parseInt(productDetailMatch[1]);
      const product = this.products.find(p => p.idProducto === id);
      if (product) {
        return of(new HttpResponse({ status: 200, body: product }));
      }
    }

    // Reseñas de producto
    const reviewMatch = url.match(/\/reseña\/(\d+)$/);
    if (reviewMatch) {
      const id = parseInt(reviewMatch[1]);
      const reviews = this.reviews[id] || [];
      return of(new HttpResponse({ status: 200, body: reviews }));
    }

    // Carrito
    if (url.endsWith('/CarritoProducto') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.carrito }));
    }

    // Agregar a carrito (POST)
    if (url.endsWith('/CarritoProducto') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: { success: true, message: 'Agregado al carrito' } }));
    }

    // Lista de deseos
    if (url.endsWith('/ListaProducto') && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.listaDeseos }));
    }

    // Agregar a lista (POST)
    if (url.endsWith('/ListaProducto') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: { success: true, message: 'Agregado a favoritos' } }));
    }

    // Historial
    if (url.includes('/Historial')) {
      return of(new HttpResponse({ status: 200, body: this.historial }));
    }

    // Dashboard
    if (url.includes('/Dashboard') || url.includes('/dashboard')) {
      return of(new HttpResponse({ status: 200, body: this.dashboardStats }));
    }

    // Comentarios (POST)
    if (url.endsWith('/Comentarios') && request.method === 'POST') {
      return of(new HttpResponse({ status: 201, body: { success: true, message: 'Comentario publicado' } }));
    }

    // Login/Register mock
    if (url.endsWith('/login') || url.endsWith('/register') || url.endsWith('/Auth/login')) {
      const mockUser = {
        token: 'mock-jwt-token-12345',
        user: { id: 1, nombre: 'Usuario Demo', email: 'demo@emmax.com' }
      };
      return of(new HttpResponse({ status: 200, body: mockUser }));
    }

    // Si no es un endpoint mock, deja pasar la petición normal
    return next.handle(request);
  }
}
