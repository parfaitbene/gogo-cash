import { Injectable } from '@angular/core';
import '@capacitor-community/sqlite';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JsonSQLite } from '@capacitor-community/sqlite';
import { db } from 'src/app/utils/db';
import { CapacitorSQLite,  } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
 
const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'db_name';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  // dbReady = new Subject<boolean>();
  dbName = '';
 
  constructor(private http: HttpClient, private alertCtrl: AlertController, public platform: Platform, public storageService: StorageService) { }
 
  async init(): Promise<void> {
    if (this.platform.is('android')) {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: 'No DB access',
          message: 'This app can\'t work without Database access.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }
 
  private async setupDatabase() {
    const dbSetupDone = await this.storageService.get(DB_SETUP_KEY);

    if (!dbSetupDone) {
      this.downloadDatabase();
    } else {
      this.dbName = (await this.storageService.get(DB_NAME_KEY));
      await CapacitorSQLite.createConnection({database:this.dbName})

      CapacitorSQLite.isDBOpen({database: this.dbName}).then(
        async (data) => {
          if(!data.result){
            await CapacitorSQLite.open({ database: this.dbName });
          }
        }
      );
      // this.dbReady.next(true);
    }
  }
 
  // Potentially build this out to an update logic:
  // Sync your data on every app start and update the device DB
  private downloadDatabase(update = false) {
      let jsonExport = db;

      const jsonstring = JSON.stringify(jsonExport);
      const isValid = CapacitorSQLite.isJsonValid({ jsonstring });
      isValid.then(
        async (value) => {
          if(value){
            this.dbName = jsonExport.database;
            await this.storageService.set(DB_NAME_KEY, this.dbName);
            CapacitorSQLite.importFromJson({ jsonstring });
            
            // Your potential logic to detect offline changes later
            if (!update) {
              // CapacitorSQLite.createSyncTable({database: this.dbName});
              await CapacitorSQLite.createConnection({database:this.dbName})
              await CapacitorSQLite.open({ database: this.dbName });
              await this.storageService.set(DB_SETUP_KEY, '1');
            } else {
              CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() })
            }
            // this.dbReady.next(true);
          }
        }
      );
  }
}