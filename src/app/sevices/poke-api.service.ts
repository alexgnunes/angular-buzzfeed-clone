import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokeApiService {
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) {}

  getPokemonImg(name: string): Observable<string> {
    return this.http.get<any>(`${this.baseUrl}${name}`);
  }
}
