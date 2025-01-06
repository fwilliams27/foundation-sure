import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private boxes: { x: number; y: number; width: number; height: number }[] = [];
  private selectedBox: any = null;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image.src = e.target.result;
        this.image.onload = () => {
          this.ctx.drawImage(this.image, 0, 0, 800, 600);
          this.drawBoxes();
        };
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addBox(x: number, y: number, width: number, height: number) {
    this.boxes.push({ x, y, width, height });
    this.drawBoxes();
  }

  drawBoxes() {
    this.ctx.clearRect(0, 0, 800, 600);
    this.ctx.drawImage(this.image, 0, 0, 800, 600);
    this.ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
    this.boxes.forEach(box => {
      this.ctx.fillRect(box.x, box.y, box.width, box.height);
    });
  }

  saveEditedPhoto() {
    const link = document.createElement('a');
    link.download = 'edited-photo.png';
    link.href = this.canvas.nativeElement.toDataURL();
    link.click();
  }

  handleMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.addBox(x, y, 100, 100); // Add default-sized box
  }
}
