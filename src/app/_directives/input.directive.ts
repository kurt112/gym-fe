import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[focusElement]'
})
export class InputDirective {

  @Input() focus: boolean = true;

  constructor(private element: ElementRef) {
    console.log('the input ' + this.focus);
    
  }

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.element.nativeElement.focus(); 
      },1000)
    }
  }
}
