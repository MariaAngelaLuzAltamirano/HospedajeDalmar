import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  loadingSuscription: Subscription;
  
  constructor(private services: LoadingScreenService) { }

  ngOnInit(): void {
    this.loadingSuscription = this.services.loadingStatus.subscribe((value: boolean) =>{
      this.loading = value;
    });
  }

  ngOnDestroy(){
    this.loadingSuscription.unsubscribe();
  }

}
