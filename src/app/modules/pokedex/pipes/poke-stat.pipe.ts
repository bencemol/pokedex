import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Pipe({
  name: 'pokeStat',
})
export class PokeStatPipe implements PipeTransform {
  transform(pokemon: Pokemon, statName: string): number {
    return pokemon?.stats.find((s) => s.stat.name === statName).base_stat;
  }
}
