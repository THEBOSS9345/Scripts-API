# Minecraft Bedrock API Database

This is a custom database implementation for Minecraft Bedrock server using the Minecraft Bedrock API. The code provides a convenient way to store and manage dynamic properties for both the world and players in a Minecraft server.

## Usage

This module exports a database object directly. To use it, require the module in your project:

`import Database from './Database.js'`

### Storing Data

To store data in the database, use the `set` method. The `set` method also accepts a third optional parameter, a boolean value, determining where the data should be stored. If `boolean` is `true`, the data is stored globally in the `world` DynamicProperty. If `boolean` is `false`, the data is stored individually in each player's DynamicProperty, default value is true.

`Database.set('key', 'value');` same thing as `Database.set('key', 'value', true);`

`Database.set('key', 'value', false);` 


### Retrieving Data

To retrieve data from the database, use the `get` method:

`const value = Database.get('key');`

### Checking if a Key Exists

To check if a key exists in the database, use the `has` method:

`const exists = Database.has('key');`

### Deleting Data

To delete data from the database, use the `delete` method:

`Database.delete('key');`

### Getting All Entries

To retrieve all key-value pairs from the database, use the `entries` property:

`const allEntries = Database.entries;`

## Author

This database module was created by THE BOSS9345 for use with Minecraft Bedrock Api.

## License

This project is licensed under the [MIT License](LICENSE.md).

Feel free to contribute and enhance this database module for your Minecraft Bedrock server needs!
