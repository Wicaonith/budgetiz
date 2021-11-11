import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['../../pages.component.css']
})
export class LabelComponent implements OnInit {

  links: string[] = ['/label/section', '/label/undersection', '/label/account'];
  activeLink : string = "";
  background: ThemePalette;
  constructor() { }

  ngOnInit(): void {
    
  }
}
