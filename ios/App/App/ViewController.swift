//
//  ViewController.swift
//  App
//
//  Created by Fred Williams on 1/6/25.
//

import UIKit
import CoreLocation
import Capacitor

class ViewController: CAPBridgeViewController, CLLocationManagerDelegate {

    let locationManager = CLLocationManager()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        checkLocationPermissions() // Check location permissions
    }

    // MARK: - Location Permissions
    func checkLocationPermissions() {
        locationManager.delegate = self

        // Check authorization status dynamically (iOS 14+ compatible)
        let status = CLLocationManager.authorizationStatus()
        print("Authorization status: \(status.rawValue)")

        if CLLocationManager.locationServicesEnabled() {
            switch status {
            case .notDetermined:
                locationManager.requestWhenInUseAuthorization() // Request permission
            case .restricted, .denied:
                print("Location access is restricted or denied.")
            case .authorizedWhenInUse, .authorizedAlways:
                startUpdatingLocation() // Start updates if authorized
            @unknown default:
                print("Unknown status")
            }
        } else {
            print("Location services disabled.")
        }
    }

    // MARK: - Start Updating Location
    func startUpdatingLocation() {
        locationManager.startUpdatingLocation()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        if let location = locations.last {
            print("Location: \(location.coordinate.latitude), \(location.coordinate.longitude)")
        }
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        print("Location error: \(error.localizedDescription)")
    }
}
