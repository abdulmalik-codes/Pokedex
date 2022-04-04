import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pokedex';
  id = '';
  listPokemon: any = [];
  pokemons: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPokemon();
    this.fetchPokemonData();
  }

  public fetchPokemon() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=400')
      .pipe(
        map((responseData) => {
          const pokemonArray = [];
          for (const data in responseData) {
            pokemonArray.push(responseData);
          }
          // console.log(pokemonArray);
          return pokemonArray;
        })
      )

      .subscribe((pokemon) => {
        // console.log(pokemon);
        // this.pokemons = pokemon;
      });
  }

  fetchPokemonData() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
      .pipe(
        map((pokeData) => {
          console.log(pokeData);

          const pokeList = { ...pokeData };
          // this.listPokemon = pokeList.push(pokeData);
          console.log(pokeList);

          this.listPokemon = { ...pokeData };
        })
      )
      .subscribe((pokemonCreatures) => {
        console.log(pokemonCreatures);
        // this.listPokemon = pokemonCreatures;
      });
  }

  searchPokemon() {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(this.id)
        .then((data) => {
          console.log(data);
          this.pokemons = [{ ...data }];
        })

        .catch((error) => {
          error.log(error);
        });
    })();
  }
}
