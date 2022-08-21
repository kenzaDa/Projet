import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CooptedEntityService } from 'src/app/core/services/coopted-entity.service';

@Component({
  selector: 'app-information-coopte-form',
  templateUrl: './information-coopte-form.component.html',
  styleUrls: ['./information-coopte-form.component.css']
})
export class InformationCoopteFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<FormData>();
  @Input() cooptationForm!: FormGroup;
  @Input() saveClicked:boolean = false;
  CooptedEntityTable! :any;
  DepartementTable! :any;
  Pole:any;
  SelectedEntity : any= {id:"0" , name: ""};
  constructor(private formBuilder: FormBuilder, private CooptedEntityService: CooptedEntityService) { }

  ngOnInit(): void {
    this.OnCooptedEntity();
    this.OnDepartement();
    this.OnSelect(this.SelectedEntity.id);
  }

OnCooptedEntity() {
  this.CooptedEntityService.getAllCooptedEntity().subscribe(data=>{this.CooptedEntityTable=data});
  
}

OnDepartement() {
  this.CooptedEntityService.getAllDepartements().subscribe(data=>{this.DepartementTable=data});
  
}

sendForm(value:FormData)
{
  this.newItemEvent.emit(value);
}

OnSelect(Entity :any){
  this.CooptedEntityService.getAllDepartements().subscribe((res:any)=>{
    this.Pole=res.filter((e:any)=> e.coopted_entity.id == Entity?.value)
    console.log(res.filter((e:any)=> e.coopted_entity.id == Entity?.value));
  });
}
}
