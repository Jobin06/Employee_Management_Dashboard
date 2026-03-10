<<<<<<< HEAD
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'performanceRating',
  standalone: true
})
export class PerformanceRatingPipe implements PipeTransform {
  transform(score: number): string {
    if (score >= 4.5) {
      return 'Excellent';
    } else if (score >= 4.0) {
      return 'Good';
    } else if (score >= 3.5) {
      return 'Satisfactory';
    } else {
      return 'Needs Improvement';
    }
  }
}
=======
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'performanceRating',
  standalone: true
})
export class PerformanceRatingPipe implements PipeTransform {
  transform(score: number): string {
    if (score >= 4.5) {
      return 'Excellent';
    } else if (score >= 4.0) {
      return 'Good';
    } else if (score >= 3.5) {
      return 'Satisfactory';
    } else {
      return 'Needs Improvement';
    }
  }
}
>>>>>>> 6143766f5d839bcae2d6f2cf6f0d0b688d2e5ad6
