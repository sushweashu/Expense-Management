import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  message: string;
    isInfoModal: boolean;
    confirmDetailsMessage: any;
    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    submit(state: Boolean) {
        this.activeModal.close(state);
    }


}
