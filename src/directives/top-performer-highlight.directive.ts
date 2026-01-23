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
