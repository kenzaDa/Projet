
import { Component, Input, OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';


@Component({
  selector: 'save-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Soumission de la cooptation</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>Voulez-vous soumettre cette cooptation ?</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Annuler
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('Save')"
      >
        OK
      </button>
    </div>
  `,
})
export class SaveModal {
  constructor(public modal: NgbActiveModal) {}
}


@Component({
  selector: 'cancel-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title"> Annulation de la cooptation</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>Êtes-vous sûr(e)?</strong>
      </p>
      <p> Toutes les modifications réalisées sur cette cooptation seront définitivement supprimées</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Annuler
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('test')"
      >
        OK
      </button>
    </div>
  `,
})
export class CancelModal {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  saveModal: SaveModal,
  cancelModal: CancelModal,
};

import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cooptation-request',
  templateUrl: './cooptation-request.component.html',
  styleUrls: ['./cooptation-request.component.css'],
})
export class CooptationRequestComponent implements OnInit {
  alert:boolean=false;
  cancelalert:boolean=false;
  savealert:boolean=false;
  uploadedCV!:File;
  civility!:string;
  firstForm!:FormGroup;
  secondForm!:FormGroup;
  thirdForm!:FormGroup;
  formData:FormData = new FormData();
  form = {
    fieldActivities:'0',
    keyValues:'0',
    values:'0'
  };
  saveClicked:boolean=false;

  constructor(private _modalService: NgbModal ,private fb: FormBuilder, private http:HttpClient, private alertService: AlertService, private router:Router ) {}

  ngOnInit(): void {
    
    this.firstForm = this.fb.group({
      civility : ['', [Validators.required ]],
      username: ['', [Validators.required ]],
      lastname: ['', [Validators.required ]],
      email: ['', [Validators.required ,  Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required , Validators.minLength(8), Validators.maxLength(8),Validators.pattern("^\\d{0,9}$")]  ],
      cv: ['', [Validators.required ]],
     });

     this.secondForm = this.fb.group({
      link: ['', [Validators.required]],
      coopted_entity: ['', [Validators.required]],
      firstExperienceDate: '',
      departement: ['', [Validators.required]],
      professionalExperience: null,
      applicationDate: '',
      currentPosition: null,
      DisponibilityDate: null,
      geographicalWishes: null,
  });

  this.thirdForm = this.fb.group({
    interview_date: [null, [this.dateValidator() , Validators.required ]],
    interview_type :[null],
    comments: ['', [Validators.required ]],
    secondcomments :[''],
    fildesofactivity :['0'],
    keyfiguers :['0'],
    values:['0'],
    skills:[''],
    character:[''],
    experience:[''],
    desiredsalary:[''],
    currentsalary:[''],
    });

    this.formData.append('fieldActivities','0');
    this.formData.append('keyfiguers','0');
    this.formData.append('values','0');

    

  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const currentDate = new Date();
  
      if(!(control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }
  
      // return null if there's no errors
      return new Date(control.value).getTime() < currentDate.getTime() 
      ? null
      : {invalidDate: ' Entrer une date inférieur à la date actuelle' } ;
    }
  } 

  getCivility(civility:string){
    this.civility = civility;
  }

  getUplodedFile(file:File){
    this.uploadedCV = file;
  }

  getFieldActivities(value:string){
    this.formData.set('fieldActivities',value);
  }

  getKeyValues(value:string){
    this.formData.set('keyfiguers',value);
  }

  getValues(value:string){
    this.formData.set('values',value);
  }


  onClicksubmit (){
  
    this.saveClicked = true;
    if (!this.firstForm.invalid && !this.secondForm.invalid && !this.thirdForm.invalid) 
    {
      this.formData.append('civility',this.civility);
      this.formData.append('username',this.firstForm.value['username']);
      this.formData.append('lastname',this.firstForm.value['lastname']);
      this.formData.append('email',this.firstForm.value['email']);
      this.formData.append('phone',this.firstForm.value['phone']);
      this.formData.append('cv',this.uploadedCV);
      this.formData.append('link',this.secondForm.value['link']);
      this.formData.append('coopted_entity',this.secondForm.value['coopted_entity']);
      this.formData.append('firstExperienceDate',this.secondForm.value['firstExperienceDate']);
      this.formData.append('departement',this.secondForm.value['departement']);
      this.formData.append('professionalExperience',this.secondForm.value['professionalExperience']);
      this.formData.append('applicationDate',this.secondForm.value['applicationDate']);
      this.formData.append('currentPosition',this.secondForm.value['currentPosition']);
      this.formData.append('DisponibilityDate',this.secondForm.value['DisponibilityDate']);
      this.formData.append('geographicalWishes',this.secondForm.value['geographicalWishes']);
      this.formData.append('interview_date',this.thirdForm.value['interview_date']);
      this.formData.append('interview_type',this.thirdForm.value['interview_type']);
      this.formData.append('comments',this.thirdForm.value['comments']);
      this.formData.append('secondcomments',this.thirdForm.value['secondcomments']);
      this.formData.append('skills',this.thirdForm.value['skills']);
      this.formData.append('character',this.thirdForm.value['character']);
      this.formData.append('experience',this.thirdForm.value['experience']);
      this.formData.append('desiredsalary',this.thirdForm.value['desiredsalary']);
      this.formData.append('currentsalary',this.thirdForm.value['currentsalary']);
      this.formData.append('postType','2');

      this.http.post<any>('http://127.0.0.1:8000/api/cooptation',this.formData).subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.success('Formulaire de Cooptation soumis avec succès ');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      });
    }
    
  }


  onClicksave() 
  { 
    this.saveClicked = true;
    if (!this.firstForm.invalid && !this.secondForm.invalid && !this.thirdForm.invalid) 
    {
      this.formData.append('civility',this.civility);
      this.formData.append('username',this.firstForm.value['username']);
      this.formData.append('lastname',this.firstForm.value['lastname']);
      this.formData.append('email',this.firstForm.value['email']);
      this.formData.append('phone',this.firstForm.value['phone']);
      this.formData.append('cv',this.uploadedCV);
      this.formData.append('link',this.secondForm.value['link']);
      this.formData.append('coopted_entity',this.secondForm.value['coopted_entity']);
      this.formData.append('firstExperienceDate',this.secondForm.value['firstExperienceDate']);
      this.formData.append('departement',this.secondForm.value['departement']);
      this.formData.append('professionalExperience',this.secondForm.value['professionalExperience']);
      this.formData.append('applicationDate',this.secondForm.value['applicationDate']);
      this.formData.append('currentPosition',this.secondForm.value['currentPosition']);
      this.formData.append('DisponibilityDate',this.secondForm.value['DisponibilityDate']);
      this.formData.append('geographicalWishes',this.secondForm.value['geographicalWishes']);
      this.formData.append('interview_date',this.thirdForm.value['interview_date']);
      this.formData.append('interview_type',this.thirdForm.value['interview_type']);
      this.formData.append('comments',this.thirdForm.value['comments']);
      this.formData.append('secondcomments',this.thirdForm.value['secondcomments']);
      this.formData.append('skills',this.thirdForm.value['skills']);
      this.formData.append('character',this.thirdForm.value['character']);
      this.formData.append('experience',this.thirdForm.value['experience']);
      this.formData.append('desiredsalary',this.thirdForm.value['desiredsalary']);
      this.formData.append('currentsalary',this.thirdForm.value['currentsalary']);
      this.formData.append('postType','1');

      this.http.post<any>('http://127.0.0.1:8000/api/cooptation',this.formData).subscribe(()=>
      {
        this.router.navigateByUrl('cooptation-list');
        this.alertService.info('Formulaire enregistré avec succès');
        this.firstForm.reset();
        this.secondForm.reset();
        this.thirdForm.reset();
      });
    }
  }

  simpleAlert() {
    this.onClicksave();
    }
 
  cancelAlert() {
    this.alertService.danger('Formulaire de cooptation annulé ');
    this.router.navigateByUrl('cooptation-list');
  }
  
  open(name: string) {
    this._modalService.open(MODALS[name]).result.then(
      (result) => {
        if (result == 'Save') {
         this.onClicksubmit()
    
        }
        if (result == 'test') {
          this.cancelAlert() }
      },
    );
  }
}
