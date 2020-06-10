import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private readonly pageSize = 150;

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<ApiResponse<Pokemon>>(`/pokemon?limit=${this.pageSize}`)
      .pipe(map(res => res.results.map(
        pokemon => ({ id: Number(pokemon.url.match(/\d+(?=\/$)/)[0]), ...pokemon })
      )));
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`/pokemon/${id}`);
  }
}
