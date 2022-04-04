import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonClient, EggGroups } from 'pokenode-ts'; // import the PokemonClient (EggGroups enum is fully optional)
import { map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  show = false;
  type = false;
  select = true;
  searchMode = true;
  errorMessageShow = false;
  errorMessage = 'There was an error';
  pokemonsShow = false;
  showMoves = false;

  pokemons: any = [];
  pokemonNameInput: string = '';
  listPokemon: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.searchPokemon();
    // this.searchPokemonByType();
    this.fetchPokemonData();
  }

  searchPokemon() {
    this.show = true;
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(this.pokemonNameInput)
        .then((data) => {
          console.log(data);
          this.pokemons = [{ ...data }];
          this.pokemonsShow = true;
          this.errorMessageShow = false;
        })

        .catch((error) => {
          this.errorMessage = error;
          this.errorMessageShow = true;
          this.pokemonsShow = false;
        });
    })();
  }

  searchPokemonByType() {
    (async () => {
      const api = new PokemonClient();

      await api
        .getEggGroupById(EggGroups.BUG)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    })();
  }

  fetchPokemonData() {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=400')
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
        // console.log(pokemonCreatures);
        // this.listPokemon = pokemonCreatures;
      });
  }

  onSwitchMode() {
    this.searchMode = !this.searchMode;
    this.type = !this.type;
    this.select = !this.select;
  }

  onCloseModal() {
    this.show = false;
  }

  onMoves() {
    this.showMoves = true;
  }
}
