import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Recette, RecetteService } from '../../services/recette.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from '../ingredient/ingredient.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IngredientComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent implements OnInit {
  recetteForm: FormGroup;
  recetteId: any;
  recette: any;
  receivedIngredientData: any[] = [];
  formIngredientHide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.recetteForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      preparation: [0, [Validators.required, Validators.min(1)]],
      cuisson: [0, [Validators.required]],
      difficulte: ['', Validators.required],
      typePlat: ['', Validators.required],
      auteur: ['', Validators.required]
    });
  }

  handleIngredientData(data: any[]): void {
    console.log('Données reçues du composant enfant:', data);
    this.receivedIngredientData = data;
    this.formIngredientHide = true
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          return of(null);
        }
        this.recetteId = String(id);
        return this.recetteService.getRecette(this.recetteId);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.recette = data;
          this.recetteForm.patchValue({
            nom: this.recette.nom,
            description: this.recette.description,
            ingredients: this.recette.ingredients,
            preparation: this.recette.preparation,
            cuisson: this.recette.cuisson,
            difficulte: this.recette.difficulte,
            typePlat: this.recette.typePlat,
            auteur: this.recette.auteur,
          });

        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la recette :', err);
      }
    });
  }



  onSubmit(): void {
    if (this.recetteForm.valid) {
      const recette: Recette = this.recetteForm.value;

      recette.ingredients = this.receivedIngredientData;

      console.log(recette)

      if (this.recetteId) {
        this.recetteService.updateRecette(this.recetteId, recette).subscribe((data) => {
          this.router.navigate([`/recettes`]);
        }, error => {
          console.error('Erreur lors de la modification de la recette', error);
        });
      } else {
        this.recetteService.addRecette(recette).subscribe((data) => {
          this.receivedIngredientData = [];
          this.recetteForm.reset();
          this.router.navigate([`/recettes`]);
        }, error => {
          console.error('Erreur lors de l\'ajout de la recette', error);
        });
      }
    }
  }

}
