import { Component } from "@angular/core";
import { teeth } from "../../Shared/Static Data/teeth";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-new-treat-teeth",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./new-treat-teeth.component.html",
  styleUrl: "./new-treat-teeth.component.css",
})
export class NewTreatTeethComponent {
  data: any[] = [];
  colors = [
    { color: "#FFFFFF", class: "btn-simple", label: "undo" },

    { color: "#3F51B5", class: "bg-indigo", label: "Missing" },
    { color: "#009688", class: "bg-teal", label: "No moving" },
    { color: "#FFC107", class: "bg-amber", label: "Implant" },
    { color: "#F44336", class: "bg-red", label: "Crown" },
  ];

  color: any = {};
  teeth = teeth;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    teeth.forEach((element) => {
      let t = { num: element.id, status: element.status };
      this.data.push(t);
    });
  }
  pickColor(color: any) {
    this.color = color;
  }
  changeColor(id: number) {
    this.teeth.find((currentItem) => {
      if (currentItem.id === id) {
        currentItem.color = this.color.color;
      }
    });
    this.data.find((currentItem) => {
      if (currentItem.num === id) {
        currentItem.status = this.colors.indexOf(this.color);
      }
    });
  }
  onSubmit() {
    console.log(this.data.filter((x) => x.status != 0));
  }
  onReset() {
    this.teeth = teeth;

    teeth.forEach((element) => {
      let t = { num: element.id, status: element.status };
      this.data.push(t);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log(this.data.filter((x) => x.status != 0));
  }
}
