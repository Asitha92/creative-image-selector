Guide to Start...

1. Redirect your cmd terminal to demo-backend.
2. npm install
3. npm run devStart
4. This will open server and listen using port 5000
5. Redirect another cmd terminal to react-redux-demo.
6. npm install
7. npm start


ASSUMPTIONS - 

1. After initial data fetch from the backend there will be no other get until consumer do it manually. 
   If user want to start search again with initial data he has to do a fetch again.

2. All tha tags previously known to developer.

3. Tags are limited.(e.g - color, cylinders etc.)


Development - 

1. Used module.scss to minimize conflicts in css classes.

2. Most of the granular components hand written. Not imported from libraries.

3. Granular component will handle their own states without using redux states.

4. Only states that are affected to other components have redux states.

Futher development - 

1. Closing image button update later in list panel.

2. Need to enter loading indicator.
