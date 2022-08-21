import { ExcelService } from './../../services/excel.service';
import { Cooptations } from 'src/app/cooptations';
import { CooptationService } from '../../services/cooptation.service';
import {Component, Input, OnInit, QueryList, ViewChild,Type,} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'ngx-alerts';
import { diffDates } from '@fullcalendar/angular';
import { MatSelectChange } from '@angular/material/select';
import { DataSource } from '@angular/cdk/collections';
import { Columns } from './columns';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'ngbd-modal-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Suppression de la cooptation</h4>
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
      <p><strong>Êtes-vous sûr(e)?</strong></p>
      <p>
        Une fois supprimée, vous ne pourrez plus récupérer cette cooptation.
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
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalConfirm {

  constructor(public modal: NgbActiveModal) {}

}

const MODALS: { [name: string]: Type<any> } = {
  delete: NgbdModalConfirm,
};
export interface StatutFilters {
  name: string;
  options: string[];
  defaultValue: string;
}

@Component({
  selector: 'app-cooptation-table',
  templateUrl: './cooptation-table.component.html',
  styleUrls: ['./cooptation-table.component.css'],
})
export class CooptationTableComponent implements OnInit {

    filterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    status: new FormControl(),
    interview_date: new FormControl()
  });

  cooptation!: any;
  displayedColumns: string[] = ['nom', 'prenom', 'date', 'statut', 'action'];
  dataSource: MatTableDataSource<any>;
  status: string[] = ['Tous les statuts', 'Encours', 'A valider'];
  statutFilters: StatutFilters[] = [];
  defaultValue = "Tous les statuts";

  filterDictionary = new Map<string, string>();
  allCooptations: any;

  dataSourceFilters!: MatTableDataSource<Columns>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private cooptationService: CooptationService, private _modalService: NgbModal, private alertService: AlertService, private excelService : ExcelService, private router:Router ) {

    this.dataSource = new MatTableDataSource();

  }
  
  ngOnInit(): void {
    this.getAllCooptations();

    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = function (record, filter) {
      return record.nom.toLocaleLowerCase() == filter.toLocaleLowerCase();
    };

    this.statutFilters.push({ name: 'Statut', options: this.status, defaultValue: this.defaultValue });

  }
  ngAfterViewInit() {
    this.dataSourceFilters.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyCoopFilter(key: any) {
    this.filterDictionary.set(key, this.filterForm.get(key)?.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSourceFilters.filterPredicate = function (record, filter) {
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        let recordValue: any;
        if (key == "status") {
          recordValue = (record[key as keyof Columns] as any)?.name;
        }
        else if (key == "interview_date") {
          recordValue = new Date(record[key as keyof Columns]);
        }
        else {
          recordValue = record[key as keyof Columns];
        }
        isMatch = (value == "tous les statuts") || recordValue.trim().toLowerCase().includes((value as String).trim().toLowerCase());
        if (!isMatch) return false;
      }
      return isMatch;
    }
    this.dataSourceFilters.filter = jsonString;
  }

  getAllCooptations() {
    this.cooptationService.getCooptation().subscribe((data: any) => {
      this.dataSourceFilters = new MatTableDataSource(data);
      this.allCooptations = data;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort;
      this.dataSourceFilters.paginator = this.paginator;
      return data
    })
  }


  onDeleteCooptation(id: number) {
    this.cooptationService.deleteCooptations(id).subscribe((res: any) => {
      if (res === "deleted") {
        this.alertService.success('cooptation supprimée avec sucèes');
      } else if (res === "cooptation not found") {
        this.alertService.danger("cooptation n'a pas toujours existé !");
      }
      else if (res === "error") {
        this.alertService.warning('impossible de supprimer !');
      }
      this.getAllCooptations();
    }
    );
  }

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;

  open(name: string, id: number) {
    this._modalService.open(MODALS[name]).result.then((result => {
      if (result === 'Ok click') {
        this.onDeleteCooptation(id);
      }
    }), (reason => { }));}


    saveToFileSystem(response: BlobPart) {
      let newBlob = new Blob([response], {
        type: 'application/vnd.ms-excel;charset=utf-8',
      });
      const nav = window.navigator as any;
      if (window.navigator && nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(newBlob);
        return;
      }
      let data = window.URL.createObjectURL(newBlob);
      let link = document.createElement('a');
      link.href = data;
      link.download = 'cooptation_list.xlsx';
      link.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true, view: window })
      );
      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();}, 100);
    }
  
    generateExcel() {
      this.excelService.exportfile().toPromise().then((response) => this.saveToFileSystem(response));}

      onViewEdit(id:number) {

          this.router.navigateByUrl(`cooptation/${id}`);
          
        }
  }





