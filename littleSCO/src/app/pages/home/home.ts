import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScrollCard } from '../../../model/ScrollCard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit{

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('scrollItem') scrollItems!: QueryList<ElementRef<HTMLDivElement>>;

  cards: ScrollCard[] = [
    {
      image: 'https://placehold.co/400x500/F2C267/ffffff?text=Child+1',
      bg: '#F2C267',
      alt: 'Child 1'
    },
    {
      image: 'https://placehold.co/400x500/F3B3C8/ffffff?text=Child+2',
      bg: '#F3B3C8',
      alt: 'Child 2'
    },
    {
      image: 'https://placehold.co/400x500/F0C94F/ffffff?text=Child+3',
      bg: '#F0C94F',
      alt: 'Child 3'
    },
    {
      image: 'https://placehold.co/400x500/F099AA/ffffff?text=Child+4',
      bg: '#F099AA',
      alt: 'Child 4'
    },
    {
      image: 'https://placehold.co/400x500/E8A359/ffffff?text=Child+5',
      bg: '#E8A359',
      alt: 'Child 5'
    }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.centerMiddleCard();
      this.updateCurve();
    });
  }

  onScroll(): void {
    this.updateCurve();
  }

  onResize(): void {
    this.updateCurve();
  }

  private centerMiddleCard(): void {
    const container = this.scrollContainer.nativeElement;
    const items = this.scrollItems.toArray();

    const centerIndex = Math.floor(items.length / 2);
    const target = items[centerIndex].nativeElement;

    container.scrollLeft =
      target.offsetLeft -
      container.clientWidth / 2 +
      target.clientWidth / 2;
  }

  private updateCurve(): void {
    const container = this.scrollContainer.nativeElement;
    const items = this.scrollItems.toArray();

    const containerCenter =
      container.scrollLeft + container.clientWidth / 2;

    items.forEach((itemRef) => {
      const item = itemRef.nativeElement;

      const itemCenter =
        item.offsetLeft + item.clientWidth / 2;

      const distance = Math.abs(containerCenter - itemCenter);

      const curveFactor = 0.0008;

      let translateY = Math.pow(distance, 2) * curveFactor;

      translateY = Math.min(translateY, 200);

      const scale = 1 - distance * 0.0002;

      item.style.transform = `translateY(${translateY}px) scale(${scale})`;

      if (distance < 200) {
        item.style.opacity = '1';
        item.style.zIndex = '10';
      } else {
        item.style.opacity = '0.8';
        item.style.zIndex = '1';
      }
    });
  }

}
