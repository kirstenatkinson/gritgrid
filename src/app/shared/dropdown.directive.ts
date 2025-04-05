import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[gritgridDropdown]',
  standalone: false
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('recipe:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}