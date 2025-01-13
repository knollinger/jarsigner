import { AfterContentInit, Directive, ElementRef } from '@angular/core';

/**
 * Eine Direktive, welche den Focus aus die damit beglückte 
 * Kopmponent setzt.
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
   * Nach erzeigen den Contents wird der Focus gesetzt. Um das ganze ein
   * wenig zu entzerren wird dies asynch mit einem Delay von 10ms
   * durchgeführt.
   */
  public ngAfterContentInit() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 10);
  }
}
