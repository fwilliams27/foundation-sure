// File: src/app/services/data.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getItems(): Observable<any[]> {
    const itemsRef = collection(this.firestore, 'items');
    return collectionData(itemsRef, { idField: 'id' });
  }
}
