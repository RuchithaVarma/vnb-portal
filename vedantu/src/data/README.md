# Firebase Data Import for Vedantu Academy

This directory contains the seed data for the Vedantu Academy application.

## Files

- `seed-data.json` - Contains all the seed data for the application including:
  - courses
  - stats
  - features
  - results
  - teachers
  - testimonials
  - studyMaterials
  - batches
  - announcements
  - users

## How to Import Data

### Option 1: Using the emulator script (Recommended for development)

```bash
# From the root directory
./import-with-emulator.sh

# Or using yarn
yarn import:emulator
```

### Option 2: Manual import with emulator

1. Start the Firebase emulator:
   ```bash
   cd vedantu
   firebase emulators:start --only firestore
   ```

2. In another terminal, run the import:
   ```bash
   cd vedantu
   npx tsx src/scripts/import-data.ts
   ```

### Option 3: Import to cloud Firebase

⚠️ **Warning**: This will import data to your production Firebase project. Make sure you have the correct Firebase configuration in `src/lib/firebase.ts`.

```bash
cd vedantu
npx tsx src/scripts/import-data.ts
```

## Data Structure

Each collection in the JSON file contains an array of documents. When imported, each document will receive:
- `id`: Auto-generated document ID
- `createdAt`: Current timestamp
- `updatedAt`: Current timestamp

## Adding New Data

To add or modify data:

1. Edit `seed-data.json`
2. Run the import script again
3. The script will clear existing data and import fresh data

## Collections

- **courses**: Available courses with pricing, duration, and features
- **stats**: Statistics displayed on the home page
- **features**: Key features of the platform
- **results**: Topper results and achievements
- **teachers**: Teacher profiles and qualifications
- **testimonials**: Student testimonials
- **studyMaterials**: Available study materials
- **batches**: Active batch information
- **announcements**: Platform announcements
- **users**: User accounts (including admin)
