import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(re => this.heroes = re);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.addHero({name} as Hero).subscribe(
      re => { this.heroes.push(re)}
    );
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter( h => h !== hero);//先将本地列表删除该项
    this.heroService.deleteHero(hero).subscribe();
  }

}
