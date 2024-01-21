  # Minecraft Bedrock API Database
  
  This is a custom database implementation for the Minecraft Bedrock server using the Minecraft Bedrock API. The code provides a convenient way to store and manage dynamic properties for both the world and players in a Minecraft server.
  
  ## Usage
  
```js

import Database from './database.js'

world.beforeEvents.playerLeave.subscribe(({ player }) => {
    const games = Database.get('games') || []
    if (!games && games.some((v) => v.id === player.id)) {
        Database.set('games', games.filter((v) => v.id !== player.id))
        return world.sendMessage(`§a${player.name}§r left the game!`)
    }
})
```

  ## Author
  
  This database module was created by THE BOSS9345 for use with Minecraft Bedrock Api.
  
  ## License
  
  This project is licensed under the [MIT License](LICENSE.md).
  
  Feel free to contribute and enhance this database module for your Minecraft Bedrock server needs!
