import { storiesOf } from '@storybook/angular';
import {
  SpeechSynthesisDemoComponent,
} from '../app/components/speech-synthesis-demo/speech-synthesis-demo.component';
import {
  SpeechSynthesisModule,
  Pitch,
  Rate,
  Volume,
} from '../../projects/speech-synthesis/src/public_api';

import { action } from '@storybook/addon-actions';

import { FormsModule } from '@angular/forms';

storiesOf('DEMO', module)
  .add('English', () => ({
    moduleMetadata: {
      imports: [
        SpeechSynthesisModule,
        SpeechSynthesisModule,
        FormsModule,
      ],
      providers: [
        { provide: Volume, useValue: 1.0 },
        { provide: Pitch, useValue: 1.0 },
        { provide: Rate, useValue: 1.0 },
      ],
    },
    component: SpeechSynthesisDemoComponent,
    props: {
      content: [
        'Peter Piper picked a peck of pickled peppers.',
        'A peck of pickled peppers Peter Piper picked.',
        'If Peter Piper picked a peck of pickled peppers,',
        'Where\'s the peck of pickled peppers Peter Piper picked?',
      ].join('\n'),
      lang: 'en-US',
      utterance: action('utterance'),
    },
  }))
  .add('Japanese', () => ({
    moduleMetadata: {
      imports: [
        SpeechSynthesisModule.forRoot({
          volume: 1.0,
          pitch: 1.0,
          rate: 1.0,
        }),
        FormsModule,
      ],
    },
    component: SpeechSynthesisDemoComponent,
    props: {
      content: [
        'お宮の前の飴屋に',
        'あんまと尼が雨やどり',
        '雨やむまで',
        'あんまももうと',
        'あんま申す',
        'あんま尼もみ',
        '尼あんまもむ',
        'あんまうまいか',
        '尼うまいか',
        'あんまも尼もみなうまい',
        'あんまもおもみやれ',
        '尼もおもみやれ',
        '雨やどり'
      ].join('\n'),
      lang: 'ja',
      utterance: action('utterance'),
    },
  }));

storiesOf('Settings', module)
  .add('You can pitch/rate/voice by factory.', () => ({
    moduleMetadata: {
      imports: [
        SpeechSynthesisModule.forRoot({
          volume: 1.0,
          pitch: 0.9,
          rate: 2.2,
        }),
        FormsModule,
      ],
    },
    component: SpeechSynthesisDemoComponent,
    props: {
      setting: true,
      content: [
        'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
        'He would chuck, he would, as much as he could, and chuck as much wood',
        'As a woodchuck would if a woodchuck could chuck wood',
      ].join('\n'),
      lang: 'en-US',
      utterance: action('utterance'),
    },
  }))
  .add('You can pitch/rate/voice by provider.', () => ({
    moduleMetadata: {
      imports: [
        SpeechSynthesisModule.forRoot({
          volume: 1.0,
        }),
        FormsModule,
      ],
      providers: [
        {
          provide: Pitch,
          useValue: 2,
        },
        {
          provide: Rate,
          useValue: 2,
        },
      ],
    },
    component: SpeechSynthesisDemoComponent,
    props: {
      content: [
        '可逆反応の逆不可逆反応',
        '不可逆反応の逆可逆反応',
        '可逆反応も不可逆反応も化学反応',
      ].join('\n'),
      lang: 'ja',
      utterance: action('utterance'),
    },
  }));

