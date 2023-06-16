import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from '@character-list/character-list-routing.module';
import { CharacterListComponent } from '@character-list/pages/character-list.component';


@NgModule({
  declarations: [
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule
  ],
  exports: [
    CharacterListComponent
  ]
})
export class CharacterListModule { }
