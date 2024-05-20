import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ingresos-egresos';
  constructor(private autService: AuthService) {}

  ngOnInit(): void {
    this.autService.initAuthListener();
  }
}
