import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { CoreModule } from './core/core.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



//import {ToastModule} from 'ng2-toastr/ng2-toastr';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        NgSelectModule,
        CoreModule,
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        CommonModule,
      
         SharedModule,
        DataTablesModule,
        NgMultiSelectDropDownModule,
        NgbModule.forRoot(),
       
    ],
    providers: [
        ],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}
