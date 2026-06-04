import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  private apiUrl = 'https://tu-backend-api.com/api/transaction/sign';  // Cambia por la URL de tu API

  constructor(private http: HttpClient) { }

  signTransaction(transactionData: any): Observable<any> {
    // Obtener el token JWT desde el localStorage o donde lo tengas guardado
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, transactionData, { headers });
  }
}
