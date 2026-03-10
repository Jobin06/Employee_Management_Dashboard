<<<<<<< HEAD
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTopPerformerHighlight]',
  standalone: true
})
export class TopPerformerHighlightDirective implements OnInit {
  @Input() appTopPerformerHighlight: number = 0;
  @Input() threshold: number = 4.5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.appTopPerformerHighlight >= this.threshold) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e8f5e9');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #4caf50');
    }
  }
}
=======
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTopPerformerHighlight]',
  standalone: true
})
export class TopPerformerHighlightDirective implements OnInit {
  @Input() appTopPerformerHighlight: number = 0;
  @Input() threshold: number = 4.5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.appTopPerformerHighlight >= this.threshold) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e8f5e9');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #4caf50');
    }
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
