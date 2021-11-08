import { Component, OnInit } from '@angular/core';
import { DataTransaction } from 'src/app/models/dataTransaction';
import { TEST_DATAS } from './mock-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../pages.component.css']
})
export class HomeComponent implements OnInit {

  /** Attribut contenant une données de dataTransaction */
  dataTransactions: DataTransaction[] = [];
  /** Colonnes à afficher dans le tableau */
  displayedColumns: string[] = ['id', 'month', 'amount', 'section', 'account'];

  value : string ='';

  constructor() { }

  ngOnInit(): void {
    this.dataTransactions = TEST_DATAS;
  }

  onClick(){
    console.log("Gg !");
  }

  onKey(event: KeyboardEvent){
    this.value = 'Bonjour ' + (<HTMLInputElement>event.target).value;
  }

  selectData(data: DataTransaction){
    alert("Données n°" + data.id)
  }
}
