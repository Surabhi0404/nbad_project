import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.firebaseService.logout();
    this.isLogout.emit();

  }

}
