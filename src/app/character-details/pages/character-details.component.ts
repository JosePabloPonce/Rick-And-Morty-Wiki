import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interfaces/Icharacters';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  
  character$: Observable<Character> | undefined;

  constructor(private route: ActivatedRoute, private characterSvc:CharacterService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) =>{
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id)
    })
  }

  GoBack(): void{
    this.location.back();
  }

}
