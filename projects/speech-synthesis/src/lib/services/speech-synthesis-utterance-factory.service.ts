import { Injectable, Optional, Inject } from '@angular/core';

import {
  Lang,
  Voice,
  Volume,
  Rate,
  Pitch,
  OnStartHandler,
  OnEndHandler,
  OnErrorHandler,
  OnPauseHandler,
  OnResumeHandler,
  OnMarkHandler,
  OnBoundaryHandler,
  SpeechSynthesisUtteranceEventHandler,
  SpeechSynthesisUtteranceConfig,
  Config,
} from '../configs';

/** @dynamic */
@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisUtteranceFactoryService {

  constructor(
    @Optional() @Inject(Config)
    public config: SpeechSynthesisUtteranceConfig,

    @Optional() @Inject(Lang)
    /**
     * This attribute specifies the language of the speech synthesis for the utterance,
     * using a valid BCP 47 language tag.
     * [BCP47] If unset it remains unset for getting in script,
     * but will default to use the language of the html document root element and associated hierarchy.
     * This default value is computed and used when the input request opens a connection
     * to the recognition service.
     */
    public lang?: string,

    @Optional() @Inject(Voice)
    /**
     * This attribute specifies the speech synthesis voice that the web application wishes to use.
     * When a SpeechSynthesisUtterance object is created this attribute must be initialized to null.
     * If, at the time of the speak() method call,
     * this attribute has been set to one of the SpeechSynthesisVoice objects returned by getVoices(),
     * then the user agent must use that voice. If this attribute is unset or null at the time of the speak()
     * method call, then the user agent must use a user agent default voice.
     * The user agent default voice should support the current language (see lang) and
     * can be a local or remote speech service and can incorporate end user choices via interfaces
     * provided by the user agent such as browser configuration parameters.
     */
    public voice?: SpeechSynthesisVoice,

    @Optional() @Inject(Volume)
    /**
     * This attribute specifies the speaking volume for the utterance.
     * It ranges between 0 and 1 inclusive, with 0 being the lowest volume and 1 the highest volume,
     * with a default of 1. If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    public volume?: number,

    @Optional() @Inject(Rate)
    /**
     * This attribute specifies the speaking rate for the utterance.
     * It is relative to the default rate for this voice.
     * 1 is the default rate supported by the speech synthesis engine or specific voice
     * (which should correspond to a normal speaking rate).
     * 2 is twice as fast, and 0.5 is half as fast. Values below 0.1 or above 10 are strictly disallowed,
     * but speech synthesis engines or specific voices may constrain the minimum and maximum rates further,
     * for example, a particular voice may not actually speak faster than 3 times normal
     * even if you specify a value larger than 3.
     * If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    public rate?: number,

    @Optional() @Inject(Pitch)
    /**
     * This attribute specifies the speaking pitch for the utterance.
     * It ranges between 0 and 2 inclusive, with 0 being the lowest pitch and 2 the highest pitch.
     * 1 corresponds to the default pitch of the speech synthesis engine or specific voice.
     * Speech synthesis engines or voices may constrain the minimum and maximum rates further.
     * If SSML is used, this value will be overridden by prosody tags in the markup.
     */
    public pitch?: number,

    @Optional() @Inject(OnStartHandler)
    /**
     * Fired when this utterance has begun to be spoken.
     */
    public onstart?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnEndHandler)
    /**
     * Fired when this utterance has completed being spoken. If this event fires,
     * the error event must not be fired for this utterance.
     */
    public onend?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnErrorHandler)
    /**
     * Fired if there was an error that prevented successful speaking of this utterance.
     * If this event fires, the end event must not be fired for this utterance.
     */
    public onerror?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnPauseHandler)
    /**
     * Fired when and if this utterance is paused mid-utterance.
     */
    public onpause?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnResumeHandler)
    /**
     * Fired when and if this utterance is resumed after being paused mid-utterance.
     * Adding the utterance to the queue while the global SpeechSynthesis instance is in the paused state,
     * and then calling the resume method does not cause the resume event to be fired,
     * in this case the utterance’s start event will be called when the utterance starts.
     */
    public onresume?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnMarkHandler)
    /**
     * Fired when the spoken utterance reaches a named "mark" tag in SSML.
     * [SSML] The user agent must fire this event if the speech synthesis engine provides the event.
     */
    public onmark?: SpeechSynthesisUtteranceEventHandler,

    @Optional() @Inject(OnBoundaryHandler)
    /**
     * Fired when the spoken utterance reaches a word or sentence boundary.
     * The user agent must fire this event if the speech synthesis engine provides the event.
     */
    public onboundary?: SpeechSynthesisUtteranceEventHandler,
  ) {

    console.log({
      'this.lang': this.lang,
      'this.voice': this.voice,
      'this.volume': this.volume,
      'this.rate': this.rate,
      'this.pitch': this.pitch,
      'this.onstart': this.onstart,
      'this.onend': this.onend,
      'this.onerror': this.onerror,
      'this.onpause': this.onpause,
      'this.onresume': this.onresume,
      'this.onmark': this.onmark,
      'this.onboundary': this.onboundary,
    });
  }

  /**
   * This attribute specifies the text to be synthesized and spoken for this utterance.
   * This may be either plain text or a complete, well-formed SSML document.
   * [SSML] For speech synthesis engines that do not support SSML,
   * or only support certain tags, the user agent or speech engine must strip away
   * the tags they do not support and speak the text. There may be a maximum length of the text,
   * it may be limited to 32,767 characters.
   */
  text(text: string): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang       = this.lang       || this.config.lang       || null;
    utterance.voice      = this.voice      || this.config.voice      || null;
    utterance.volume     = this.volume     || this.config.volume     || null;
    utterance.rate       = this.rate       || this.config.rate       || null;
    utterance.pitch      = this.pitch      || this.config.pitch      || null;
    utterance.onstart    = this.onstart    || this.config.onstart    || null;
    utterance.onend      = this.onend      || this.config.onend      || null;
    utterance.onerror    = this.onerror    || this.config.onerror    || null;
    utterance.onpause    = this.onpause    || this.config.onpause    || null;
    utterance.onresume   = this.onresume   || this.config.onresume   || null;
    utterance.onmark     = this.onmark     || this.config.onmark     || null;
    utterance.onboundary = this.onboundary || this.config.onboundary || null;

    return utterance;
  }
}
