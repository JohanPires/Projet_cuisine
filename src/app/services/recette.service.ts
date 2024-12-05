import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Recette {
  id: number;
  nom: string;
  description: string;
  ingredients: string[];
  preparation: number;
  cuisson: number;
  difficulte: string;
  typePlat: string;
  auteur: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  readonly url = 'http://localhost:3000/recettes';
  private http = inject(HttpClient);
  public recette = signal<Recette[]>([])

  constructor() { }


  getRecettes(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.url)
  }

  getRecette(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${this.url}/${id}`);
  }

  addRecette(recette: Recette): Observable<Recette> {
    return this.http.post<Recette>(this.url, recette);
  }

  updateRecette(id: number, recette: Recette): Observable<Recette> {
    return this.http.put<Recette>(`${this.url}/${id}`, recette);
  }

  deleteRecette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
