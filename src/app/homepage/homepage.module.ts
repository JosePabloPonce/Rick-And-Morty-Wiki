import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomepageRoutingModule } from '@homepage/homepage-routing.module';
import { HomepageComponent } from '@homepage/pages/homepage.component';
import { SharedModule } from '@app/shared/shared.module';
import { CharacterListModule } from '@app/character-list/character-list.module';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    SharedModule,
    HomepageRoutingModule,
    CharacterListModule,
  ]
})
export class HomepageModule { }
