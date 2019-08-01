import { Component, OnInit } from '@angular/core';
import { Parameters } from '../models';
import { ExpenseServiceService } from '../../../core/services/expense-service.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  param = new Parameters();
  categoryList: any;
  page = 0;
  limit = 0;

  constructor(private expenseService: ExpenseServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategory();
  }

  // add the category
  addCategory() {
    const confirmDetailsMessage = 'Do you want to add the Category?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        this.expenseService.addCategory({ category: this.param.category }).subscribe(resp => {
          window.scroll(0, 0);
          this.getCategory();
        },
          err => {
            window.scroll(0, 0);
          });
      }
    })
  }

  // get all list of categories
  getCategory() {
    const data = '?limit=' + this.limit +
      '&page=' + this.page;
    this.expenseService.getCategory(data).subscribe(resp => {
      this.categoryList = resp.categories;
      console.log('resp', this.categoryList);
    })
  }

  // delete the category
  deleteCategory(categoryId) {
    const confirmDetailsMessage = 'Do you want to delete the Category?';
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'lg', centered: true });
    (modalRef.componentInstance).message = confirmDetailsMessage;
    modalRef.result.then(value => {
      if (value === true) {
        this.expenseService.deleteCategory(categoryId).subscribe(resp => {
          this.getCategory();
        })
      }
    })
  }
}
