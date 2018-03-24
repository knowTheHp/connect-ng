import { Component, OnInit, Input } from "@angular/core";
import { Photo } from "../../../_models/Photo";
import { FileUploader } from "ng2-file-upload";
@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.css"]
})
export class PhotoComponent implements OnInit {
  @Input() Photos: Photo[];

  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;

  constructor() {}

  ngOnInit() {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
