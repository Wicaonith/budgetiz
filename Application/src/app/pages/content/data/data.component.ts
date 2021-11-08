import { Component, OnInit } from '@angular/core';
import { DataTransaction } from 'src/app/models/dataTransaction';
import { TEST_DATAS } from '../home/mock-data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['../../pages.component.css']
})
export class DataComponent implements OnInit {

    /** Attribut contenant une données de dataTransaction */
    dataTransactions: DataTransaction[] = [];
      /** Colonnes à afficher dans le tableau */
  displayedColumns: string[] = ['id', 'month', 'amount', 'section', 'account'];

  constructor() { }

  ngOnInit(): void {
    this.dataTransactions = TEST_DATAS;
  }
}
