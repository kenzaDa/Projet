
import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-identity-coopted-form',
  templateUrl: './identity-coopted-form.component.html',
  styleUrls: ['./identity-coopted-form.component.css']
})
export class IdentityCooptedFormComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() ItemEvent = new EventEmitter<any>();
  @Input() angForm: FormGroup | any;
  @Input() saveClicked:boolean = false;
  

  constructor() {
    }

  ngOnInit(): void {
    
  }

  onCheckChange(event:any){
    this.ItemEvent.emit(event.value);
    }
  

  onFileSelected(event:any){
    this.newItemEvent.emit(event.target.files[0]);
  }

}
 
