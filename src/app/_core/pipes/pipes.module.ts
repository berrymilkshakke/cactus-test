import {NgModule} from '@angular/core';
import {KeysPipe} from './pipes/keys.pipe';
import {ToDateObjPipe} from './pipes/to-date-obj-pipe.pipe';
import {HideEmailPipe} from './pipes/hide-email.pipe';
import {ListFilterPipe} from './pipes/list-filter.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';
import {SplitPipe} from './pipes/split.pipe';


@NgModule({
  declarations: [
    KeysPipe,
    ToDateObjPipe,
    HideEmailPipe,
    ListFilterPipe,
    TruncatePipe,
    SplitPipe
  ],
  exports: [
    KeysPipe,
    ToDateObjPipe,
    HideEmailPipe,
    ListFilterPipe,
    TruncatePipe,
    SplitPipe
  ],
})
export class PipesModule {
}
