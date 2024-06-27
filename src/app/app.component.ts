import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MorrisAreaChartDirective, MorrisJsModule } from "angular-morris-js";
import "animate.css";
import { NgxSpinnerModule,  } from "ngx-spinner";
import { HttpClientModule } from "@angular/common/http";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, HttpClientModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
