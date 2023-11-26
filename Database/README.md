  # Minecraft Bedrock API Database
  
  This is a custom database implementation for the Minecraft Bedrock server using the Minecraft Bedrock API. The code provides a convenient way to store and manage dynamic properties for both the world and players in a Minecraft server.
  
  ## Usage
  
  This module exports a database object directly. To use it, require the module in your project:
  
  ```javascript
  import Database from './Database.js'
  ```
  
  ### Storing Data
   To store data to the database, use the `set` method:
   ```js

   Database.set('key', 'value', player) // store data to the world
   Database.set('key', 'value', player) // store data to the player 
  
  ```
  
  
  ### Retrieving Data
  
  To retrieve data from the database, use the `get` method:
  
  ```javascript
  const value = Database.get('key'); // get the value from the world
const value = Database.get('key', player); // get the value from the player

  ```
  
  ### Checking if a Key Exists
  
  To check if a key exists in the database, use the `has` method:
  
  ```javascript
  const exists = Database.has('key'); // has the key in the world 
  const exists = Database.has('key', player); // has the key in the player
  ```
  
  ### Deleting Data
  
  To delete data from the database, use the `delete` method:
  
  ```javascript
  Database.delete('key'); // delete from the world
  Database.delete('key', player); // delete from the player
  ```
  

  ## Author
  
  This database module was created by THE BOSS9345 for use with Minecraft Bedrock Api.
  
  ## License
  
  This project is licensed under the [MIT License](LICENSE.md).
  
  Feel free to contribute and enhance this database module for your Minecraft Bedrock server needs!
