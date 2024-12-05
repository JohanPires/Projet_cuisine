import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Recette, RecetteService } from '../../services/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recettes: Recette[] = [];

  constructor (private router: Router) {}

  private recetteService = inject(RecetteService);

  ngOnInit(): void {
    this.recetteService.getRecettes().subscribe({
      next: (data) => {
        this.recettes = data
      },
    });
  }

  delete( id: number): void {
    this.recetteService.deleteRecette(id).subscribe(() => {
      console.log(`Recette avec l'ID ${id} supprimée`);
    });
  }

  modify( id: number): void {
    this.router.navigate([`/form/${id}`]);
  }
}
