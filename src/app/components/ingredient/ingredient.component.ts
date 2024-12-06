import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of, switchMap } from 'rxjs';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent implements OnInit {

  @Output() ingredientDataSent = new EventEmitter<any[]>();
  formHide: boolean = false;

  ingredientForm: FormGroup;
  ingredientData: any[] = [];

  recetteId: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recetteService: RecetteService,
  ) {
    this.ingredientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      category: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['',Validators.required],
    });
  }

  onSubmit(): void {
    if (this.ingredientForm.valid) {

      this.ingredientData.push(this.ingredientForm.value);

      this.ingredientForm.reset();
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  sendIngredient(): void {
    this.ingredientDataSent.emit(this.ingredientData);
    this.formHide = true
  }

  delete(nom: string): void {
    this.ingredientData = this.ingredientData.filter((ing) => ing.nom !== nom);
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
          // this.recette = data;
          this.ingredientData = data.ingredients;
          this.ingredientDataSent.emit(this.ingredientData);

        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la recette :', err);
      }
    });
  }

}
