import { Component, OnInit } from '@angular/core';
import { TEST_SECTION } from 'src/app/mock/mock-section';
import { BankAccount } from 'src/app/models/bankAccount';
import { EnumSectionType } from 'src/app/models/enum/enumSectionType';
import { Section } from 'src/app/models/section';
import { Undersection } from 'src/app/models/undersection';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['../../pages.component.css']
})
export class LabelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
}
