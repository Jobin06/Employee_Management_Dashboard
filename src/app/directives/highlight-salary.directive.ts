import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlightSalary]',
    standalone: true
})
export class HighlightSalaryDirective implements OnChanges {
    @Input('appHighlightSalary') salary!: number;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        if (this.salary && this.salary > 100000) {
            this.renderer.setStyle(this.el.nativeElement, 'color', '#388e3c'); // Material Green 700
            this.renderer.setStyle(this.el.nativeElement, 'font-weight', '500');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'color', 'inherit');
            this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'normal');
        }
    }
}
