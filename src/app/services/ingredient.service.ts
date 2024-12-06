// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable, signal } from '@angular/core';
// import { Observable } from 'rxjs';


// export interface Ingredient {
//   id: number;
//   nom: string;
//   categorie: string;
//   stock?: number;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class IngredientService {

//   readonly url = 'http://localhost:3000/ingredient';
//   private http = inject(HttpClient);
//   public ingredient = signal<Ingredient[]>([])

//   constructor() { }


//   getIngredients(): Observable<Ingredient[]> {
//     return this.http.get<Ingredient[]>(this.url)
//   }

//   getIngredient(id: number): Observable<Ingredient> {
//     return this.http.get<Ingredient>(`${this.url}/${id}`);
//   }

//   addIngredient(ingredient: Ingredient): Observable<Ingredient> {
//     return this.http.post<Ingredient>(this.url, ingredient);
//   }

//   updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
//     return this.http.put<Ingredient>(`${this.url}/${id}`, ingredient);
//   }

//   deleteIngredient(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }
// }
