import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    { path: '', redirectTo: '/expense/home', pathMatch: 'full' },
    { path: 'expense', loadChildren: '../expense/expense.module#ExpenseModule' }

];

@NgModule({
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [],
})
export class AppRoutingModule {
}


