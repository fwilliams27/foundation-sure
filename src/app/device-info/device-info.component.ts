import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {
  deviceInfo: any;

  async ngOnInit() {
    this.deviceInfo = await Device.getInfo(); // Ensure this matches plugin API
  }
}
