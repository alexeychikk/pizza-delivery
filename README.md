# Pizza Delivery API

## Installation

### 1. Prerequisites

It is assumed that you have [git](https://git-scm.com/),
[NodeJS ~12.14.0](https://nodejs.org/dist/v12.14.0/)
and [npm ~6.13.4](https://www.npmjs.com/) installed on your machine.
You can manage NodeJS and npm versions using [nvm](https://github.com/nvm-sh/nvm).

### 2. Clone this repository:

```
git clone https://github.com/alexeychikk/pizza-delivery.git
```

### 3. Install npm dependencies:

```
npm i
```

### 4. _(Optional)_ Set your own env variables:

You can set your own `MAILGUN_DOMAIN`, `MAILGUN_EMAIL` and `MAILGUN_API_KEY` in `.env-cmdrc` file.  
**IMPORTANT**: `MAILGUN_API_KEY` must be converted to base64 string **TWICE** before you pass it to `.env-cmdrc`, example in browser console:

```
btoa(btoa("YOUR_API_KEY"))
```

**I know that this is completely unsafe and must not be stored in Git, but my API key is used only for the testing purposes.**

## Build and Run

### 1. Build:

```
npm run build
```

### 2. Run:

```
npm run start:dev
```

### _(Optional)_ Watch files and debug:

```
npm run watch
```

## API Documentation

Live documentation is available at  
https://documenter.getpostman.com/view/812225/TVYF8du8

Postman exported collection is included in the repo as  
`pizza-delivery.postman_collection.json`
