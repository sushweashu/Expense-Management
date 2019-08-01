import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddExpenseModalComponent } from '../add-expense-modal/add-expense-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ExpenseServiceService } from '../../../core/services/expense-service.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  limit = 10;
  page = 0;
  expenseList = [];
  totalExpenseAmount = 0;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any>;
  dtOptions: any = {};
  constructor(private modalService: NgbModal, private expenseService: ExpenseServiceService) {
    this.dtTrigger = new Subject<any>();
  }

  ngOnInit() {
    this.getAllExpense();
    this.dtTrigger.next();
    this.rerender();
  }

  // add the expense
  addExpense() {
    const confirmDetailsMessage = 'Do you want to add the Expense?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        const modalRef = this.modalService.open(AddExpenseModalComponent, { size: 'lg', centered: true });
        modalRef.result.then(experienceDetails => {
          if (experienceDetails) {
            this.getAllExpense();
          } else {
          }
        }, err => { });
      }
    })
  }

  // get all the list of expense
  getAllExpense() {
    const data = '?limit=' + this.limit +
      '&page=' + this.page;
    this.expenseService.getExpense(data).subscribe(resp => {
      this.expenseList = resp.expenses;
      this.rerender();
      console.log('resp in expense', this.expenseList);
      for (let i = 0; i < this.expenseList.length; i++) {
        this.totalExpenseAmount += Number(this.expenseList[i].amount);
      }
    })
  }

  // edit the list of expense
  editExpense(expenseId) {
    const confirmDetailsMessage = 'Do you want to edit the Expense?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        const modalRef = this.modalService.open(AddExpenseModalComponent, { size: 'lg', centered: true });
        modalRef.componentInstance.expenseId = expenseId;
        modalRef.result.then(updatedExperienceDetails => {
          if (updatedExperienceDetails) {
            this.getAllExpense();
          } else {
          }
        }, err => { });
      }
    })
  }
  deleteExpense(expenseId) {
    const confirmDetailsMessage = 'Do you want to delete the Expense?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        this.expenseService.deleteExpense(expenseId).subscribe(resp => {
          console.log('resp', resp);
          this.getAllExpense();
        })
      }
    })
  }
  rerender(): void {
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }
}
