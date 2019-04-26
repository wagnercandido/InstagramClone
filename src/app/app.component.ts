import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app3';

  ngOnInit() {

    var config = {
      apiKey: "AIzaSyCaHBhesGwSDeYIkOv4coqpuKXj3LKJoPg",
      authDomain: "instagram-clone-27909.firebaseapp.com",
      databaseURL: "https://instagram-clone-27909.firebaseio.com",
      projectId: "instagram-clone-27909",
      storageBucket: "instagram-clone-27909.appspot.com",
      messagingSenderId: "485113000554"
    };

    firebase.initializeApp(config);

  }
}
