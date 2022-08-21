import { Component, Input, OnInit, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { CooptationService } from 'src/app/core/services/cooptation.service';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cooptation-edit',
  templateUrl: './cooptation-edit.component.html',
  styleUrls: ['./cooptation-edit.component.css']
})
export class CooptationEditComponent implements OnInit {
  coop!:any;
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
  constructor(private _modalService: NgbModal ,private fb: FormBuilder, private http:HttpClient, private alertService: AlertService, private router:Router,private ActivatedRouter:ActivatedRoute, private CooptationService: CooptationService ) { }

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

    this.getCoopById()
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
        this.alertService.info('cooptation modifiée avec succès');
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
    this.alertService.danger('Modifications annulées ');
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
  
  getCoopById(){
   
    this.CooptationService.getCooptationById(this.ActivatedRouter.snapshot.params.id).subscribe((data: any)=>{
      console.log(this.formatDate(data[0].first_experience_date));
      console.log(data);
     
      console.log(this.formatDate(new Date (data[0].first_experience_date)));
      
      this.firstForm.patchValue({
        civility : data[0].civility,
        username: data[0].firstname,
        lastname: data[0].lastname,
        email: data[0].email, 
        phone: data[0].phone, 
        cv: data[0].cv, 
       });

       
     this.secondForm.patchValue({
      link:  data[0].link,
      coopted_entity: data[0].coopted_entity,
      firstExperienceDate: '22/08/2022',
      departement: data[0].departement,
      professionalExperience:  data[0].professional_experience,
      applicationDate:  data[0].application_date,
      currentPosition:  data[0].current_position,
      DisponibilityDate:  data[0].disponibility_date,
      geographicalWishes:  data[0].geographical_wishes,
  });
  
   
  this.thirdForm.patchValue({
    interview_date:  data[0].interview_date,
    interview_type : data[0].interview_type,
    comments:  data[0].comments,
    secondcomments : data[0].secondcomments,
    fildesofactivity : data[0].fildesofactivity,
    keyfiguers : data[0]. keyfiguers,
    values: data[0].values,
    skills: data[0].skills,
    character: data[0].character,
    experience: data[0].experience,
    desiredsalary: data[0].desired_salary,
    currentsalary: data[0].current_salary,
    });
     });
  }
  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('/');
  }
  
}
