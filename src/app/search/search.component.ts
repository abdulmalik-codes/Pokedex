import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonClient, EggGroups } from 'pokenode-ts'; // import the PokemonClient (EggGroups enum is fully optional)
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  show = false;
  type = false;
  select = true;
  searchMode = true;
  errorMessageShow = false;
  errorMessage = 'There was an error';
  pokemonsShow = true;
  showMoves = false;
  pokemons: any = [];
  pokemonNameInput: string = '';
  listPokemon: any = [];

  constructor(private http: HttpClient) {}
  //  private subscription: Subscription
  ngOnInit() {
    this.searchPokemon();
    // this.searchPokemonByType();
    this.fetchPokemonData();
  }

  fetchPokemonData() {
    // this.subscription =
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

  searchPokemon() {
    this.show = true;
    (async () => {
      const api = new PokemonClient();

      // normal spearow
      // fire charizard
      // water squirtle
      // grass bulbasaur
      // electric pikachu
      // ice froslass
      // fighting lucario
      // poison crobat
      // ground sandslash
      // flying charizard [1]
      // psychic lugia
      // bug butterfree
      // rock aerodactyl
      // ghost gastly
      // dark sneasel
      // dragon rayquaza
      // steel steelix
      // fairy togekiss

      await api
        .getPokemonByName('pikachu')
        // this.pokemonNameInput
        .then((data) => {
          console.log(data);
          this.pokemons = [{ ...data }];
          console.log(this.pokemons[0].types[0].type.name, 'line 63');

          this.pokemonsShow = true;
          this.errorMessageShow = false;
        })

        .catch((error) => {
          console.log(error);

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

  onSwitchMode() {
    this.searchMode = !this.searchMode;
    this.type = !this.type;
    this.select = !this.select;
  }

  onCloseModal() {
    this.show = false;
  }

  onMoves() {
    this.showMoves = !this.showMoves;
  }

  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

  // type of pokemon

  pokemonTypes() {
    for (let types of this.pokemons[0].types) {
      // console.log(types);
      // console.log(types.type.name);
      const type = types.type.name;
      console.log(type);
    }
    return {
      normal: this.pokemons[0].types[0].type.name == 'normal',
      fire: this.pokemons[0].types[0].type.name == 'fire',
      water: this.pokemons[0].types[0].type.name == 'water',
      grass: this.pokemons[0].types[0].type.name == 'grass',
      electric: this.pokemons[0].types[0].type.name == 'electric',
      ice: this.pokemons[0].types[0].type.name == 'ice',
      fighting: this.pokemons[0].types[0].type.name == 'fighting',
      poison: this.pokemons[0].types[0].type.name == 'poison',
      ground: this.pokemons[0].types[0].type.name == 'ground',
      flying: this.pokemons[0].types[0].type.name == 'flying',
      psychic: this.pokemons[0].types[0].type.name == 'psychic',
      bug: this.pokemons[0].types[0].type.name == 'bug',
      rock: this.pokemons[0].types[0].type.name == 'rock',
      ghost: this.pokemons[0].types[0].type.name == 'ghost',
      dark: this.pokemons[0].types[0].type.name == 'dark',
      dragon: this.pokemons[0].types[0].type.name == 'dragon',
      steel: this.pokemons[0].types[0].type.name == 'steel',
      fairy: this.pokemons[0].types[0].type.name == 'fairy',
    };
  }
}

// return {
//   water: this.pokemons[0].types[0].type.name === 'water',
//   fire: this.pokemons[0].types[0].type.name === 'fire',
//   flying: this.pokemons[0].types[0].type.name === 'flying',
//   poison: this.pokemons[0].types[0].type.name === 'poison',
//   grass: this.pokemons[0].types[0].type.name === 'grass',
// };

// if (type == 'water') {
//   return { water: type == 'water' };
// }

// if (type == 'fire') {
//   return { fire: type == 'fire' };
// }

// if (type == 'flying') {
//   return { flying: type == 'flying' };
// }
