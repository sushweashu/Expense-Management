import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpModule } from '@angular/http';
import { HttpService } from '../core/services/http.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        HttpModule,
      
    ],
    declarations: [],
    providers: [
        HttpService
       
    ]
})

export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
