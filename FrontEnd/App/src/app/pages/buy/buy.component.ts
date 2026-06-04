import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  reciboData = {
    IdMetodoPago: null,
    IdCarrito: 0,
    Subtotal: 0,
    Impuestos: 0.18,
    Campo: '',
    Signature: ''  // Agregado para almacenar la firma
  };
  metodosDePago: any[] = [];
  carritoProductos: any[] = [];
  mostrarDetalles = false;
  total: number = 0;
  firmaGenerada: string | null = null; // Variable para almacenar la firma digital

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getMetodosDePago();
    this.getCarritoProductos(1, 8);
  }

  // Método para calcular el total de la compra
  calcularTotal(): void {
    let subtotal = 0;
    for (const producto of this.carritoProductos) {
      subtotal += producto.cantidad * producto.producto.precio;
    }
    this.reciboData.Subtotal = subtotal;
    this.total = subtotal + subtotal * this.reciboData.Impuestos;
    console.log(this.total + " " + subtotal);
  }

  // Método para obtener los métodos de pago
  getMetodosDePago(): void {
    const apiUrl = 'http://localhost:5230/Metodo'; // URL de la API para obtener los métodos de pago
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (data: any[]) => {
        console.log(data);
        this.metodosDePago = data;
      },
      (error) => {
        console.error('Error al obtener los métodos de pago', error);
      }
    );
  }

  // Getter para mostrar los impuestos en porcentaje
  get formattedImpuestos(): string {
    return (this.reciboData.Impuestos * 100).toFixed(0) + '%';
  }

  // Setter para los impuestos
  set formattedImpuestos(value: string) {
    this.reciboData.Impuestos = parseFloat(value) / 100;
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token en localStorage');
      return;
    }

    // Primero, obtenemos la firma de la transacción
    this.firmarTransaccion().subscribe(
      (signedData: any) => {
        // Cuando recibimos la firma, la almacenamos en reciboData
        this.firmaGenerada = signedData.signature;
        this.reciboData.Signature = signedData.signature;

        // Imprimir la firma en la consola para depuración
        console.log("Firma Generada (Base64):", this.firmaGenerada);

        // Luego, enviamos los datos de la compra junto con la firma
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.post('http://localhost:5230/Comprar', this.reciboData, { headers }).subscribe(
          (response: any) => {
            alert('Compra hecha con éxito');
            this.router.navigateByUrl('/inicio');
          },
          (error) => {
            alert(error.error);
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener la firma', error);
      }
    );
}

  // Método para solicitar la firma de la transacción
  firmarTransaccion() {
    const apiUrl = 'http://localhost:5230/api/transaction/sign'; // URL del endpoint de firma digital

    const transactionData = {
      IdMetodoPago: this.reciboData.IdMetodoPago,
      IdCarrito: this.reciboData.IdCarrito,
      Subtotal: this.reciboData.Subtotal,
      Impuestos: this.reciboData.Impuestos,
      Campo: this.reciboData.Campo
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizamos la solicitud POST para obtener la firma digital
    return this.http.post<any>(apiUrl, transactionData, { headers });
  }

  // Método para obtener los productos del carrito
  getCarritoProductos(page: number, pageSize: number): void {
    const url = `http://localhost:5230/CarritoProducto?page=${page}&pageSize=${pageSize}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(url, { headers }).subscribe(
      (data: any[]) => {
        this.carritoProductos = data;
        this.calcularTotal();
      },
      (error) => {
        console.error('Error al obtener los productos del carrito', error);
      }
    );
  }

  // Método que se llama al hacer clic en "Generar Firma"
  generarFirma(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token en localStorage');
      return;
    }

    this.firmarTransaccion().subscribe(
      (signedData: any) => {
        // Cuando recibimos la firma, la almacenamos
        this.firmaGenerada = signedData.signature;
      },
      (error) => {
        console.error('Error al obtener la firma', error);
      }
    );
  }
}
