import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Recette, RecetteService } from '../../services/recette.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../services/recette.service';

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
  selectedCuisson: number = 0;
  selectedCategory: string = '';
  selectedIngredient: string = '';
  filteredRecettes = [...this.recettes];


  constructor (private router: Router) {}

  private recetteService = inject(RecetteService);

  ngOnInit(): void {
    this.recetteService.getRecettes().subscribe({
      next: (data) => {
        this.recettes = data
        this.filteredRecettes = data;

      },
    });

  }

  delete( id: number): void {
    this.recetteService.deleteRecette(id).subscribe(() => {
      console.log(`Recette avec l'ID ${id} supprimée`);
      this.recettes = this.recettes.filter(recette => recette.id !== id);
      this.filter();
    });
  }

  modify( id: number): void {
    this.router.navigate([`/form/${id}`]);
  }


  filter(): void {
      this.filteredRecettes = this.recettes.filter((recette) => {
        const matchesDifficulte = this.selectedDifficulte ? recette.difficulte === this.selectedDifficulte : true;
        const matchesType = this.selectedType ? recette.typePlat === this.selectedType : true;

        const matchesCuisson = this.selectedCuisson ? recette.cuisson <= this.selectedCuisson : true;

        const matchesCategory = this.selectedCategory
        ? Array.isArray(recette.ingredients) && recette.ingredients.some((ingredient: Ingredient) => ingredient.category === this.selectedCategory)
        : true;



        const matchesIngredient = this.selectedIngredient
        ? Array.isArray(recette.ingredients) && recette.ingredients.some((ingredient: Ingredient) =>
        ingredient.nom.toLowerCase().includes(this.selectedIngredient.toLowerCase())
        )
        : true;


        return matchesDifficulte && matchesType && matchesCuisson && matchesCategory && matchesIngredient;
      });
  }
}
