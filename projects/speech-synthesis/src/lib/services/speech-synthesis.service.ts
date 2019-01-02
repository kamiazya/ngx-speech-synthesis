import { Injectable } from '@angular/core';

type VoicesChangedEventHandler = ((this: SpeechSynthesis, ev: Event) => any) | null;

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {

  /**
   * If SpeechSynthesis API is supported
   * by the browser instance will be included.
   */
  private internal: SpeechSynthesis;

  constructor() {
    this.internal = window.speechSynthesis;
  }


  /**
   * This attribute is true if the queue for
   * the global SpeechSynthesis instance contains any utterances
   * which have not started speaking.
   */
  get pending(): boolean {
    return this.internal.pending;
  }

  /**
   * This attribute is true if an utterance is being spoken.
   * Specifically if an utterance has begun being spoken
   * and has not completed being spoken.
   * This is independent of whether the global SpeechSynthesis instance is
   * in the paused state.
   */
  get speaking(): boolean {
    return this.internal.speaking;
  }

  /**
   * This attribute is true when the global SpeechSynthesis instance is
   * in the paused state.
   * This state is independent of whether anything is in the queue.
   * The default state of a the global SpeechSynthesis instance
   * for a new window is the non-paused state.
   */
  get paused(): boolean {
    return this.internal.paused;
  }

  /**
   * Fired when the contents of the SpeechSynthesisVoiceList,
   * that the getVoices method will return, have changed.
   * Examples include: server-side synthesis where the list is determined asynchronously,
   * or when client-side voices are installed/uninstalled.
   */
  set onvoiceschanged(handler: VoicesChangedEventHandler) {
    this.internal.onvoiceschanged = handler;
  }

  /**
   * This method appends the SpeechSynthesisUtterance object utterance
   * to the end of the queue for the global SpeechSynthesis instance.
   * It does not change the paused state of the SpeechSynthesis instance.
   * If the SpeechSynthesis instance is paused, it remains paused.
   * If it is not paused and no other utterances are in the queue,
   * then this utterance is spoken immediately, else this utterance is queued
   * to begin speaking after the other utterances in the queue have been spoken.
   * If changes are made to the SpeechSynthesisUtterance object after calling
   * this method and prior to the corresponding end or error event,
   * it is not defined whether those changes will affect what is spoken,
   * and those changes may cause an error to be returned.
   * The SpeechSynthesis object takes exclusive ownership of the SpeechSynthesisUtterance object.
   * Passing it as a speak() argument to another SpeechSynthesis object should throw an exception.
   * (For example, two frames may have the same origin and each will contain a SpeechSynthesis object.)
   */
  public speak(utterance: SpeechSynthesisUtterance): void {
    this.internal.speak(utterance);
  }

  /**
   * This method removes all utterances from the queue.
   * If an utterance is being spoken, speaking ceases immediately.
   * This method does not change the paused state of the global SpeechSynthesis instance.
   */
  public cancel(): void {
    this.internal.cancel();
  }

  /**
   * This method puts the global SpeechSynthesis instance into the paused state.
   * If an utterance was being spoken, it pauses mid-utterance.
   * (If called when the SpeechSynthesis instance was already in the paused state, it does nothing.)
   */
  public pause(): void {
    this.internal.pause();
  }

  /**
   * This method puts the global SpeechSynthesis instance into the non-paused state.
   * If an utterance was speaking, it continues speaking the utterance
   * at the point at which it was paused, else it begins speaking
   * the next utterance in the queue (if any).
   * (If called when the SpeechSynthesis instance was already in the non-paused state, it does nothing.)
   */
  public resume(): void {
    this.internal.resume();
  }

  /**
   * This method returns the available voices.
   * It is user agent dependent which voices are available.
   * If there are no voices available, or if the the list of available voices
   * is not yet known (for example: server-side synthesis where the list is determined asynchronously),
   * then this method must return a SpeechSynthesisVoiceList of length zero.
   */
  public getVoices(): SpeechSynthesisVoice[] {
    return this.internal.getVoices();
  }
}
