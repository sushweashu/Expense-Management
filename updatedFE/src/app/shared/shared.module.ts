import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConfirmationModalComponent} from './modals/confirmation-modal/confirmation-modal.component';
import { RejectReasonComponent } from './modals/reject-reason/reject-reason.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [ConfirmationModalComponent, RejectReasonComponent, ],
    exports: [ConfirmationModalComponent],
    entryComponents: [ConfirmationModalComponent, RejectReasonComponent],
    providers: []
})
export class SharedModule {
}
