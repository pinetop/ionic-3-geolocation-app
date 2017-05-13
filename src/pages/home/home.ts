import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 latLng: any;

  @ViewChild('map') mapElement: ElementRef;
   map: any;



  constructor(private geolocation: Geolocation) {
    this.latLng = new google.maps.LatLng(2.9427466,101.8737259);

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){


      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



    }


  getLocation(){

        this.geolocation.getCurrentPosition().then((resp) => {

          this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

       let mapOptions = {
         center: this.latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position: this.latLng
       });

       let content = "<h4>Current Location</h4>";

       this.addInfoWindow(marker, content);



    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}


}
