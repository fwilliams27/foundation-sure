import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  constructor(private storage: AngularFireStorage) {}

  // Handle file input change and initiate upload
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadFile(file);
    }
  }

  // Upload file to Firebase Storage
  async uploadFile(file: File) {
    try {
      const filePath = `uploads/${file.name}`;
      const task = this.storage.upload(filePath, file);

      // Get the download URL once upload is complete
      (await task).ref.getDownloadURL().then((url) => {
        console.log('File uploaded successfully. File URL:', url);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
