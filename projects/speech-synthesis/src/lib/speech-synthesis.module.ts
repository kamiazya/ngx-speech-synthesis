import { NgModule, ModuleWithProviders } from '@angular/core';
import { SpeechSynthesisUtteranceConfig, Config } from './configs';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class SpeechSynthesisModule {

  static forRoot(config: SpeechSynthesisUtteranceConfig): ModuleWithProviders {
    return {
      ngModule: SpeechSynthesisModule,
      providers: [
        {
          provide: Config,
          useValue: config,
        },
      ],
    };
  }
}
