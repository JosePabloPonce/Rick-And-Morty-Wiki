import { Component, OnInit } from '@angular/core';
import { CharacterService } from '@app/shared/services/character.service';
import {Character} from '@shared/interfaces/Icharacters'
import { Subscription, take } from 'rxjs';
import {RequestInfo} from '@shared/interfaces/IrequestInfo'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, of } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  isButtonDisabled: boolean = false;

  info: RequestInfo = {
    next: null,
  };

  private pageNum = 1;
  private pageNumQuery = 1;

  private query!: string;
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
      this.pageNum=1
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  loadMoreCharacters(): void{
    this.CharacterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(
      take(1)
      ).subscribe((res:any)=>{
          const {info, results} = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
          this.pageNum+=1
          
          if(info.next === null){
            this.isButtonDisabled = true
          }
    })
  }

  private getDataFromService (): void {
    this.CharacterSvc.searchCharacters(this.query, this.pageNum)
      .pipe(
        take(1),
        catchError((error) => {
          if (error.status === 404) {
            this.characters = [];
            this.isButtonDisabled = true;
            return of(null);
          }
          return throwError(error);
        })
      )
      .subscribe((res: any) => {
        if (res === null) {
          return;
        }
  
        if (res?.results?.length) {
          const { info, results } = res;
          this.characters = [...results];
          this.info = info;
  
          if (info.next === null) {
            this.isButtonDisabled = true;
          } else {
            this.isButtonDisabled = false;
          }
        }
      });
    this.pageNum += 1;
  }

}
