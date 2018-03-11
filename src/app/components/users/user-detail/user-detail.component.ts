import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../_models/User';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';
import { NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  education = [];
  workXp = [];
  project = [];
  skills = [];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.loadImages();
    this.loadEducation();
    //this.loadWorkExperience();
    //this.loadProject();
    //this.loadSkills();
  }

  loadEducation() {
    for (let i = 0; i < this.user.education.length; i++) {
      this.education.push(this.user.education[i]);
    }
    return this.education;
  }

  loadWorkExperience() {
    for (let i = 0; i < this.user.workExperience.length; i++) {
      this.workXp.push(this.user.workExperience[i]);
    }
    return this.workXp;
  }

  loadProject() {
    for (let i = 0; i < this.user.project.length; i++) {
      this.project.push(this.user.project[i]);
    }
    return this.project;
  }

  loadSkills() {
    for (let i = 0; i < this.user.skill.length; i++) {
      this.skills.push(this.user.skill[i]);
    }
    return this.skills;
  }

  loadImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url
      });
    }
    return imageUrls;
  }

}
