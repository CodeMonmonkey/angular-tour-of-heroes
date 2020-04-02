import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes/heroes.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component'

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent},//如果网址类似于 localhost:4200/heroes 就显示 HeroesComponent。
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: HeroDetailComponent},//:id 是一个占位符，它表示某个特定英雄的 id
  { path: '', redirectTo: '/dashboard', pathMatch:'full'}//默认地址
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule//AppRoutingModule 导出 RouterModule，以便它在整个应用程序中生效。
  ]
})
export class AppRoutingModule { }
