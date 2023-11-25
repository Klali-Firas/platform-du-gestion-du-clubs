import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/interfaces/imaterial';
import { Salle } from 'src/app/interfaces/isalle';
import { Stand } from 'src/app/interfaces/istand';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-material-stand-salle',
  templateUrl: './gestion-material-stand-salle.component.html',
  styleUrls: ['./gestion-material-stand-salle.component.css']
})
export class GestionMaterialStandSalleComponent implements OnInit {
  materials: Material[] = [];
  salles: Salle[] = [];
  stands: Stand[] = []
  materialInput: string = "";
  salleInput: string = "";
  standInput: string = "";
  constructor(private api: APIService) { }
  ngOnInit(): void {
    this.getSalles();
    this.getMaterials();
    this.getStands();
  }

  getMaterials() {
    this.api.getAllMaterials().subscribe({
      next: (res) => {
        this.materials = res;
      }
    })
  }
  getSalles() {
    this.api.getAllSalles().subscribe({
      next: (res) => {
        this.salles = res
      }
    })
  }

  getStands() {
    this.api.getAllStands().subscribe({
      next: (res) => {
        this.stands = res
      }
    })
  }

  addMaterial() {
    if (!(this.materialInput == "")) {
      this.api.createMaterial({ label: this.materialInput }).subscribe({
        next: (res) => {
          this.getMaterials()
          this.materialInput = ""
        }
      })
    }

  }
  addSalle() {
    if (!(this.salleInput == "")) {
      this.api.createSalle({ label: this.salleInput }).subscribe({
        next: (res) => {
          this.getSalles()
          this.salleInput = ""
        }
      })
    }

  }
  addStand() {
    if (!(this.standInput == "")) {
      this.api.createStand({ label: this.standInput }).subscribe({
        next: (res) => {
          this.getStands()
          this.standInput = ""
        }
      })
    }

  }
  deleteMaterial(id: string) {
    console.log(id)
    this.api.desactivateMaterial(id).subscribe({
      next: (res) => {
        this.getMaterials()
      }
    })
  }
  activateMaterial(id: string) {
    this.api.activateMaterial(id).subscribe({
      next: (res) => {
        this.getMaterials()
      }
    })
  }
  deleteSalle(id: string) {
    console.log(id)
    this.api.desactivateSalle(id).subscribe({
      next: (res) => {
        this.getSalles()
      }
    })
  }
  activateSalle(id: string) {
    this.api.activateSalle(id).subscribe({
      next: (res) => {
        this.getSalles()
      }
    })
  }
  deleteStand(id: string) {
    console.log(id)
    this.api.desactivateStand(id).subscribe({
      next: (res) => {
        this.getStands()
      }
    })
  }
  activateStand(id: string) {
    this.api.activateStand(id).subscribe({
      next: (res) => {
        this.getStands()
      }
    })
  }


}
