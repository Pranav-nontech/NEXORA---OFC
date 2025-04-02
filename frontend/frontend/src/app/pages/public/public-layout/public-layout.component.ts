import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'app/components/footer/footer.component';
import { HeaderComponent } from 'app/components/header/header.component';

@Component({
  selector: 'app-public-layout',
  imports: [ HeaderComponent, FooterComponent, RouterOutlet ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
