import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Hero } from '../hero';
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  
  constructor(
    private route: ActivatedRoute,//保存着到这个 HeroDetailComponent 实例的路由信息,可以从中提取Id参数
    private heroService: HeroService,
    private location: Location//是一个angular的服务 用来与浏览器打交道。本处使用它来导航回上一个视图
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  /**
   * route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
   * paramMap 是一个从 URL 中提取的路由参数值的字典。 "id" 对应的值就是要获取的英雄的 id。
   * 路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
   */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(re => {
      this.hero = re
    });
  }

  goBack(): void {
    this.location.back();//利用Location 服务在浏览器的历史栈中后退一步。
  }

}
