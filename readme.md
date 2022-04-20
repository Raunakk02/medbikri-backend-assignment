# Medbikri Backend Assignment

This project is created as an assignment for the position of Backend Intern at Medbikri. It is a Node.js and Express.js application which uses the Youtube Data API V3 to periodically fetch the latest videos related to a pre-defined topic and save them to the MongoDB Atlas Database. This application also provides the API to fetch the stored video data in a paginated response sorted in descending order of published datetime. The users can also use the search API to search the stored videos using their title and description.

## Installation Instructions

- Inside the project directory, run the following commands in the terminal:
  ```
  npm i
  ```
 #### Enabling YouTube Data API V3:
 - Now, go to the Google Cloud Console > select `APIs and Services` from the `navigation menu` > Then click on the `ENABLE API AND SERVICES` button > Search for "YouTube Data API v3" > Enable the API. <br> Alternatively, you can also visit this link: https://console.cloud.google.com/apis/library/youtube.googleapis.com.
 - After enabling the YouTube API, generate new Credentials (API key) for this YouTube Data API.
 - **NOTE: A comma separated list of API keys is necessary to utilize the feature of multiple API keys**
 
 #### Connecting to MongoDB Atlas:
 - Use the MongoDB Atlas cloud console to get the connection string for your cluster.

## The .env File

Now create a new `.env` file in the project's root directory similar to the provided `example.env` file and store the required comma separated list of Google API Keys and the atlas connection string in the required variables.

After that, if you have nodemon installed, then simply run the following command:
```
nodemon server
```
