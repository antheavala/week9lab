import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  checkActor(){
    let url = "/actors/2movies";
    return this.http.get(url);
  }

  //MOVIES
  getMovies() {
    return this.http.get("/movies");
  }
  createMovie(data){
    return this.http.post("/movies", data, httpOptions)
  }
  deleteMovie(id) {
    console.log
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieByYear(year) {
    let url = "/movies/year/" + year;
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(idMovie, idActor){
    let url = "/movies/" + idMovie + "/" + idActor;
    return this.http.post(url, httpOptions)
  };
  
}