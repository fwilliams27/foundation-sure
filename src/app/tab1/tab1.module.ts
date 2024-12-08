import { Component } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera, Geolocation, Device, Network, Browser } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  // Method to capture an image using Camera plugin
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
      });
      console.log('Image captured:', image);
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  // Method to get current location using Geolocation plugin
  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Current position:', position);
    } catch (error) {
      console.error('Geolocation error:', error);
    }
  }

  // Method to get device information using Device plugin
  async getDeviceInfo() {
    try {
      const info = await Device.getInfo();
      console.log('Device Info:', info);
    } catch (error) {
      console.error('Device info error:', error);
    }
  }

  // Method to check network status using Network plugin
  async checkNetwork() {
    try {
      const status = await Network.getStatus();
      console.log('Network Status:', status);
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  // Method to open a browser using InAppBrowser plugin
  async openBrowser() {
    try {
      await Browser.open({ url: 'https://example.com' });
      console.log('Browser opened');
    } catch (error) {
      console.error('Browser error:', error);
    }
  }
}
