import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Imember } from 'src/app/interfaces/imember';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gestion-de-members',
  templateUrl: './gestion-de-members.component.html',
  styleUrls: ['./gestion-de-members.component.css']
})
export class GestionDeMembersComponent implements OnInit {
  memberForm: FormGroup;
  members: Imember[] = [];
  data = localStorage.getItem('clubData') ?? "";
  addingNewRole: boolean = false;
  clubRoles: string[] = [];
  clubExclusiveRoles: string[] = [];
  isExclusive: boolean = false;

  clubData: {
    id: string,
    email: string,
    isAdmin: boolean,
    roles: { clubId: string, role: string }[],
  } = JSON.parse(this.data);


  constructor(
    private formBuilder: FormBuilder,
    private api: APIService
  ) {
    this.memberForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      roles: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClubRoles();

    // Load members of the current club
    console.log(this.clubData)
    this.api.getMembersByClubId(this.clubData.id).subscribe((members) => {
      this.members = members;
    });
  }


  getClubRoles() {
    this.api.getClubRoles(this.clubData.id).subscribe({
      next: (res) => {
        this.clubRoles = res.roles.sort();
        this.clubExclusiveRoles = res.exclusiveRoles.sort();

      }
    });
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      const memberData: Imember = this.memberForm.value;
      this.api.createMember(memberData).subscribe(() => {
        // Reload members after adding/updating
        this.api.getMembersByClubId(this.clubData.id).subscribe((members) => {
          this.members = members;
          this.resetForm();
        });
      });
    }
  }

  resetForm(): void {
    this.memberForm.reset();
    // this.roles.clear();
  }

  onRoleSelect(event: any): void {
    const selectedRole = event.target.value;

    if (selectedRole === 'addRole') {
      this.addingNewRole = true;
      document.body.classList.add('prevent-scroll');
      // Open the window for adding a new role

      // Reset the selected value back to the default (Select Role)
      this.memberForm.get('roles')!.setValue('');
    }
  }

  addRole(role: string, isExclusive: boolean) {
    this.api.addRoleToClub(this.clubData.id, role, isExclusive).subscribe({
      next: (response) => {
        document.body.classList.remove('prevent-scroll');
        this.addingNewRole = false;
        this.getClubRoles();
      }
    })
  }
  togglePopUp() {
    if (this.addingNewRole) {
      document.body.classList.remove('prevent-scroll');
      this.addingNewRole = false
    }
    else {
      document.body.classList.add('prevent-scroll');
      this.addingNewRole = true
    }
  }

  removeMember(id: string) {
    this.api.deleteMemberFromClub(id, this.clubData.id).subscribe({
      next: (res) => {
        this.api.getMembersByClubId(this.clubData.id).subscribe((members) => {
          this.members = members;


        });
      }
    })
  }
}
