import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api'

import { Hero } from './hero'
import { MaxLengthValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService{

  /**
   * 安装完这个模块之后，应用将会通过 HttpClient 来发起请求和接收响应，
   * 而不用在乎实际上是这个内存 Web API 在拦截这些请求、操作一个内存数据库，并且给出仿真的响应。
   */
  constructor() { }
  createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
    // throw new Error("Method not implemented.");
    const heroes = [
      { id: 11, name: 'fangpengfei' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }
  //确保一个hero总是有Id。如果数组为空，返回初始值11,；非空，返回最大英雄Id+1 ？？？？这个函数干嘛用的
  getId(heros: Hero[]): number {
    return heros.length > 0 ? Math.max(...heros.map(hero => hero.id)) + 1 : 11;//...是扩展运算符，此处将number[]数组转换为number序列
  }
}
