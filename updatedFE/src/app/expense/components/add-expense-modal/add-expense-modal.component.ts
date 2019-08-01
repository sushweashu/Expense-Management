import { Component, OnInit } from '@angular/core';
import { ExpenseServiceService } from '../../../core/services/expense-service.service';
import { Expense } from '../../../expense/components/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.css']
})
export class AddExpenseModalComponent implements OnInit {
  expense = new Expense();
  limit = 10;
  page = 0;
  categoryList: any;
  expenseId: any;

  constructor(private expenseService: ExpenseServiceService, private activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategory();
    if (this.expenseId) {
      this.getExpenseById();
    }
  }

  // get the list of categories added
  getCategory() {
    const data = '?limit=' + this.limit +
      '&page=' + this.page;
    this.expenseService.getCategory(data).subscribe(resp => {
      this.categoryList = resp.categories;
    })
  }

  // add the expense
  addExpense() {
    const confirmDetailsMessage = 'Do you want to add the Expense?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        this.expenseService.addExpense(this.expense).subscribe(resp => {
          this.activeModal.close(this.expense);
        })
      }
    })
  }

  // get the data of Expense based on Id
  getExpenseById() {
    this.expenseService.getExpenseById(this.expenseId).subscribe(resp => {
      console.log('data for particular id', resp);
      this.expense = resp;
    })
  }

  // update an expense data
  updateExpense() {
    const confirmDetailsMessage = 'Do you want to update the Expense?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        this.expenseService.updateExpense({ expenseId: this.expenseId, expense: this.expense }).subscribe(resp => {
          this.activeModal.close(this.expense);
        })
      }
    })
  }
}
