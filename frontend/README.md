### Installation

1. Clone the repository

2. Check that you have [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed 9

   - to check you have node and installed:
     - `node -v`
     - `npm -v`

3. make sure you are in the `frontend/` directory

4. Run `npm install` to install all relevant packages

### Running the UI

1. make sure you are in the `frontend` directory

2. Run `npm start:dev` to run the application

3. the application will run on `http://localhost:8080/`

### Running the UI as the extension on Chrome

#### First time setup

1. make sure you are in the `frontend` directory

2. Run `npm run start:prod`: this will run the build script for the UI and put the relevant files in the `extension` directory

3. Open Chrome and in search bar type `chrome://extension` - _alternatively you can just open the extension tab_

4. Click on `load unpacked` and select the `extension` Folder _(if already done this click the refresh button)_

**To reload extension: repeat steps 2-4**

###### Note

- _The React project needs to be built again each time and chrome needs to be refreshed to see changes in Chrome. It's less of a hassle to come to Chrome testing when you want to check extension behaviour with the page_
- _As a future tasks we can see if we can automate this process_

## Learn More

**Refer to our [Resources](https://armin-lp.jetbrains.space/p/tl-dr/documents/Resources/f/3jnjJF2tZpIP) Page on Space**
