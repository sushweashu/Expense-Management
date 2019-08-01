import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

  baseUrl = environment.apiURL;

  constructor(private httpService: HttpService) {
    console.log('baseUrl', this.baseUrl);
  }
  addCategory(data) {
    console.log('data in service', data);
    return this.httpService.post(`${this.baseUrl}/category/addCategory`, data);
  }
  getCategory(pageLimit) {
    return this.httpService.get(`${this.baseUrl}/category/getAllCategory/${pageLimit}`);
  }
  deleteCategory(categoryId) {
    return this.httpService.delete(`${this.baseUrl}/category/${categoryId}`);
  }
  addExpense(expenseData) {
    console.log('expenseData in service', expenseData);
    return this.httpService.post(`${this.baseUrl}/expense/addExpense`, expenseData);
  }
  getExpense(pageLimit) {
    return this.httpService.get(`${this.baseUrl}/expense/getAllExpense/${pageLimit}`);
  }
  getExpenseById(expenseId) {
    return this.httpService.get(`${this.baseUrl}/expense/${expenseId}`);
  }
  updateExpense(expenseData) {
    console.log('expenseData in service', expenseData);
    return this.httpService.put(`${this.baseUrl}/expense/update/${expenseData.expenseId}`, expenseData.expense);
  }
  deleteExpense(expenseId) {
    return this.httpService.delete(`${this.baseUrl}/expense/${expenseId}`);
  }
}
