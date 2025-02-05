import { AfterContentInit, Directive, ElementRef } from '@angular/core';

/**
 * Eine Direktive, welche den Focus aus das damit beglückte 
 * HTMLElement setzt.
 * 
 * Sollten mehrere Element damit versorgt sein, so ist das Verhalten
 * undefiniert...irgend ein Element "gewinnt".
 * 
 */
@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  /**
   * 
   * @param element 
   */
  constructor(
    private element: ElementRef) {

  }

  /**
   * Nach erzeugen den Contents wird der Focus gesetzt. Um das ganze ein
   * wenig zu entzerren wird dies async mit einem Delay von 10ms
   * durchgeführt.
   */
  public ngAfterContentInit() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 10);
  }
}
