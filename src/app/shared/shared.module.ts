import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from '@shared/shared-routing.module';
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { FormSearchComponent } from './form-search/form-search.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FormSearchComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormSearchComponent
  ]
})
export class SharedModule { }
