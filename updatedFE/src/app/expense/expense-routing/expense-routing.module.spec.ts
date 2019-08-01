import { ExpenseRoutingModule } from './expense-routing.module';

describe('ExpenseRoutingModule', () => {
  let expenseRoutingModule: ExpenseRoutingModule;

  beforeEach(() => {
    expenseRoutingModule = new ExpenseRoutingModule();
  });

  it('should create an instance', () => {
    expect(expenseRoutingModule).toBeTruthy();
  });
});
