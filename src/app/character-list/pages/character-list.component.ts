import { Component, OnInit } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';
import {Character} from '@shared/interfaces/Icharacters'
import { Subscription, take } from 'rxjs';
import {RequestInfo} from '@shared/interfaces/IrequestInfo'
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };

  private pageNum = 1;
  private query!: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  private queryParamsSubscription?: Subscription;

  constructor(
    private CharacterSvc: CharacterService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.getDataFromService();
    this.getCharactersByQuery();
  }


  private getCharactersByQuery(): void {
    this.queryParamsSubscription =  this.route.queryParams.subscribe(params => {
      console.log('params->', params);
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  private onUrlChanged(): void{
    
  }

  private getDataFromService (): void {
    this.CharacterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
      ).subscribe((res:any)=>{
        if(res?.results?.length){
          console.log(res)
          const {info, results} = res;
          this.characters = [...results];
          this.info = info;
        } else {
          this.characters = [];
        }
    })
  }

}
