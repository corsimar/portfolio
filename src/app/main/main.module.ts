import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { IndexComponent } from './index/index.component';
import { CardComponent } from './card/card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [IndexComponent, CardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzButtonModule,
  ],
})
export class MainModule {}
