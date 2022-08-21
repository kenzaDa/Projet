import { Cooptations } from 'src/app/cooptations';
import { CooptationService } from '../services/cooptation.service';
import { Component, Input, OnInit, QueryList, ViewChild, Type } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';




@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Suppression de la cooptation</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Êtes-vous sûr(e)?</strong></p>
    <p>Une fois supprimée, vous ne pourrez plus récupérer cette cooptation.
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})


export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  delete: NgbdModalConfirm,
};

@Component({
  selector: 'app-manager-cooptation',
  templateUrl: './manager-cooptation.component.html',
  styleUrls: ['./manager-cooptation.component.css']
})
export class ManagerCooptationComponent implements OnInit {
  cooptation!:any;
  displayedColumns: string[] = ['nom', 'prenom', 'date', 'statut','action'];
  dataSource: MatTableDataSource<any>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // cooptation$!:Observable<Cooptations[]>
  
  constructor( private cooptationService:CooptationService, private _modalService: NgbModal,private alertService: AlertService) {
    
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.getCooptationByManager();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (record,filter) {
      return record.nom.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCooptationByManager() { 
    this.cooptationService.getCooptationByManager().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource <any> (data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
      return data
      
    })}
    onDeleteCooptation(id: number) {
      this.cooptationService.deleteCooptations(id).subscribe((res:any)=> {
        console.log(res);
        if(res==="deleted"){
          this.alertService.success('cooptation supprimée avec sucèes');
        }else if(res==="cooptation not found") {
          this.alertService.danger("cooptation n'a pas toujours existé !");
        }
        else if(res==="error"){
          this.alertService.warning('impossible de supprimer !');
        }
        this.getCooptationByManager();
      }
      );
    }

    withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;
  
    open(name: string,id:number) {
      this._modalService.open(MODALS[name]).result.then((result => {
        console.log(result);
        if(result === 'Ok click') {
         this.onDeleteCooptation(id) ; 
        }
      }),(reason => {}));
    }

}
