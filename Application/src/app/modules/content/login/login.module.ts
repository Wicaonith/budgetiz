import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Component
import { LoginComponent } from './components/login.component';
import { SingupComponent } from './components/singup.component';
import { ResetPwdComponent } from './components/reset-pwd.component';


// Material Module
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
    declarations: [
        LoginComponent,
        SingupComponent,
        ResetPwdComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Modules de Material
        MatTabsModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
    ]
})
export class LoginModule { }
