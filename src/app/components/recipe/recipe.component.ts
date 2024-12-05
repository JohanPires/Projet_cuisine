import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Recette, RecetteService } from '../../services/recette.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit {

  recettes: Recette[] = [];
  filterType: any;
  selectedDifficulte: string = '';
  selectedType: string = '';

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

  filter(): void {
    console.log(this.selectedDifficulte)
    console.log(this.selectedType)
    this.recettes.filter(() => {

    })
  }
}
