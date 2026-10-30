import { Component } from '@angular/core';
import { LoaderService } from '../services/loader-service';

@Component({
  selector: 'app-loader-component',
  standalone: false,
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css',
})
export class LoaderComponent {
/**
 *
 */
constructor(public loaderService:LoaderService) {}
}
