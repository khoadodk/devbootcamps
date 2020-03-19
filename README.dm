![Image description](https://github.com/khoadodk/devbootcamps/blob/master/homepage.PNG)

# devBootcamps API

> Backend API for devBootcamps application, which is a bootcamp directory website

## Usage

Rename "example-env.env" to ".env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```