import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "../../../_models/Photo";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../_services/auth.service";
import { UserService } from "../../../_services/user.service";
import { AlertifyService } from "../../../_services/alertify.service";
import * as _ from "underscore";
@Component({
  selector: "app-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.css"]
})
export class PhotoComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Input() Photos: Photo[];
  @Output() changedUserPhoto = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;
  currentProfilePic: Photo;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        "users/" +
        this.authService.decodedToken.nameid +
        "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };
        this.Photos.push(photo);
      }
    };
  }

  setProfilePicture(photo: Photo) {
    this.userService
      .setProfilePicture(this.authService.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentProfilePic = _.findWhere(this.Photos, { isMain: true });
          this.currentProfilePic.isMain = false;
          photo.isMain = true;
          this.authService.changeUserPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            "user",
            JSON.stringify(this.authService.currentUser)
          );
        },
        error => {
          this.alertify.success(error);
        }
      );
  }

  deletePhoto(photoId: Number) {
    this.alertify.confirm("Are you sure you want to delete this photo", () => {
      this.userService
        .deletePhoto(this.authService.decodedToken.nameid, photoId)
        .subscribe(
          () => {
            this.Photos.splice(_.findIndex(this.Photos, { id: photoId }), 1);
            this.alertify.success("Photo has been deleted");
          },
          error => {
            this.alertify.error("Failed to delete photo");
          }
        );
    });
  }
}
