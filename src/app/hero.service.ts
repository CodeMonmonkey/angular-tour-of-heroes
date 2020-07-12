import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { Hero } from './hero'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';//angular-in-memory-web-api拦截了所有HTTP请求，这个URL是无关的

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetch heroes'))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetch hero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`added a hero id=${hero.id}`))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete a hero id=${hero.id}`))
    );
  }

  /**
   * 搜索功能的核心是通过带查询字符串的HTTP get请求来实现的。
   * get请求返回一个数组，搜索框的候选列表将该数组显示出来
   * 这里的QueryParam name应该是in-memory-data给处理的，实际中需要自己做查询（可用java JPA like实现）
   * @param term 查询字符串
   */
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {//string.trim(),Removes the leading and trailing white space and line terminator characters from a string.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`);//由搜索词组成的查询字符串
  }
}
