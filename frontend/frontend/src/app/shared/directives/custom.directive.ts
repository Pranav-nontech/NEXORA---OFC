import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCustom]', // Usage: <div appCustom="red">
  standalone: true
})
export class CustomDirective {
  @Input('appCustom') color: string = 'blue'; // Default color

  constructor(private el: ElementRef) {
    this.applyStyle();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }

  private applyStyle() {
    this.el.nativeElement.style.cursor = 'pointer';
  }
}