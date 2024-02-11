import { open } from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';

const dbPath = path.join(app.getPath('userData'), 'db', 'ThermWatch.tmdb');
let db;

function initializeDatabase() {
  db = open(dbPath, { verbose: console.log });

  const createCompanyTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      companyName TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      country TEXT,
      zipCode TEXT,
      phoneNumber TEXT,
      email TEXT
    )
  `);

  const createPlantTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS plant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plantName TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      country TEXT,
      zipCode TEXT,
      phoneNumber TEXT,
      email TEXT,
      companyId INTEGER,
      FOREIGN KEY (companyId) REFERENCES company(id)
    )
  `);

  const createAssetTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS asset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assetName TEXT,
      plantId INTEGER,
      capacity REAL,
      rating REAL,
      temperatureThreshold REAL,
      FOREIGN KEY (plantId) REFERENCES plant(id)
    )
  `);

  const createSensorTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS sensor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensorName TEXT,
      sensorFamily TEXT,
      sensorType TEXT,
      sensorVariant TEXT,
      assetId INTEGER,
      position INTEGER,
      FOREIGN KEY (assetId) REFERENCES asset(id)
    )
  `);

  db.transaction(() => {
    createCompanyTable.run();
    createPlantTable.run();
    createAssetTable.run();
    createSensorTable.run();
  })();
}

function saveDatabaseState() {
  const backupPath = path.join(app.getPath('desktop'), 'ThermWatchBackup.tmdb');
  db.backup(backupPath).then(() => {
    console.log('Database backup completed successfully.');
  }).catch((err) => {
    console.error('Database backup failed:', err);
  });
}

function importDatabase(filePath) {
  const importedDb = open(filePath);
  const backupPath = dbPath;

  importedDb.backup(backupPath).then(() => {
    console.log('Database import completed successfully.');
    db = importedDb;
  }).catch((err) => {
    console.error('Database import failed:', err);
  });
}

export { initializeDatabase, saveDatabaseState, importDatabase, db };