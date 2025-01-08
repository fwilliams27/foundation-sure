import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Import Camera API
import { Geolocation } from '@capacitor/geolocation'; // Import Geolocation API

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.checkLocationPermission(); // Call to check location permission at startup
  }

  // Method to open the camera
  async openCamera() {
    try {
      // Capture photo using Camera plugin
      const image = await Camera.getPhoto({
        quality: 90, // Set image quality
        allowEditing: true, // Allow editing
        resultType: CameraResultType.Uri, // Return image as URI
        source: CameraSource.Camera, // Use the camera as the source
        saveToGallery: true, // Save to gallery
        width: 800, // Resize width
        height: 600, // Resize height
      });

      // Log the photo URI or path
      console.log('Photo saved at:', image.webPath); // Use webPath to display in web apps
    } catch (error) {
      console.error('Failed to capture photo:', error); // Log error if capture fails
    }
  }

  // Method to check and request location permissions
  async checkLocationPermission() {
    try {
      // Request permission for location access
      const permission = await Geolocation.requestPermissions();
      console.log('Location permission status:', permission);

      if (permission.location === 'granted') {
        // Get current position if permission is granted
        const position = await Geolocation.getCurrentPosition();
        console.log('Current Position:', position.coords.latitude, position.coords.longitude);
      } else {
        console.warn('Location permission not granted.');
      }
    } catch (error) {
      console.error('Error checking location permissions:', error);
    }
  }
}

