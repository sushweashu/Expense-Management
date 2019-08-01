import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarComponent } from '../expense/components/sidebar/sidebar.component';
import { ExpenseRoutingModule } from './expense-routing/expense-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { AddExpenseModalComponent } from './components/add-expense-modal/add-expense-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExpenseRoutingModule,
    NgbModule,
    DataTablesModule
  ],
  exports: [ConfirmationModalComponent],
  entryComponents: [AddExpenseModalComponent, ConfirmationModalComponent],
  declarations: [HomeComponent, SettingsComponent, SidebarComponent, AddExpenseModalComponent, ConfirmationModalComponent]
})
export class ExpenseModule { }
