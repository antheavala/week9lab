import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";

@Component({
  selector: "app-actor",
  templateUrl: "./actor.component.html",
  styleUrls: ["./actor.component.css"],
})

export class ActorComponent implements OnInit {
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  moviesDB: any[] = [];
  movieTitle : string = "";
  movieYear : number = 0;
  deleteYear : number = 0;

  filteredDB : any [] = [];

  selectedMovie: any;
  selectedActor: any;

  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }



  //MOVIES

  //Get all movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.movieTitle, year: this.movieYear};
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteYear() {
    this.dbService.deleteMovieByYear(this.deleteYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Add actor to movie
  addActorToMovie(){
    let idMovie = this.selectedMovie._id;
    let idActor = this.selectedActor._id;
    this.dbService.addActorToMovie(idMovie, idActor).subscribe(result => {
      this.onGetMovies();
    });
  }

  radioChangeHandlerMov(movie:any){
    this.selectedMovie = movie;
  }

  radioChangeHandlerAct(actor:any){
    this.selectedActor = actor;
  }

  actor2Movies(section){
    this.dbService.checkActor().subscribe((data: any[]) => {
      this.filteredDB = data;
    });
    this.section = section;
  }


  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  
  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
  }
}