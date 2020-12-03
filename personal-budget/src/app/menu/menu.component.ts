import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {
  userBudget: any;
  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FirebaseService, private budget: DataService) { }

  @Input() user: any;
  ngOnInit(): void {
    this.budget.getData(this.user.user_id).subscribe(res=>{
      this.userBudget=res;
      console.log(this.userBudget);
    });
  }

  logout(): void{
    this.firebaseService.logout();
    this.isLogout.emit();

  }

}
