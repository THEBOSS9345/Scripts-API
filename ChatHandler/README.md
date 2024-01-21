### ChatCommand Handler 📜

**Description:**
Experience effortless communication in Minecraft Bedrock with our ChatCommand Handler. This powerful tool allows you to create new chat commands seamlessly. Stable and optimized for Minecraft Bedrock, it ensures uninterrupted gameplay, allowing players to interact and coordinate effectively.

**Features:**
- **Intuitive Command Creation:** Easily design new chat commands for enhanced gameplay and server management.
- **Bedrock Edition Optimization:** Tailored for Minecraft Bedrock, ensuring compatibility and smooth performance.
- **Stable Operation:** Reliable execution of commands, providing uninterrupted gaming experiences.
- **Future-Ready:** Periodic updates enhance functionality and introduce new features, keeping you ahead in the game.
- **EX**:
```js
 import ChatCommand from './ChatCommands.js';
import {commands} from './ChatCommands.js';
// way 1 to make commands
ChatCommand.create('Help', 'Help Command: Shows all available commands', ['h', 'help'], false, false, (player) => {
    const helpMessage = commands
        .filter(command => !command.permissions || command.permissions(player))
        .map(command => {
            const alias = command.alias.length > 0 ? `[${command.alias.join(', ')}] ` : '';
            const description = command.description ? command.description : '';
            return `§7${command.command} - ${alias}${description}`;
        })
        .join('\n');
    player.sendMessage(`§aAvailable Commands\n${helpMessage}\n`);
});

//  way 2 make commands
ChatCommand.create('test', 'testing command', ['test'], false, (player => player.hasTag('test')), ((player, _, commandString) => {
    player.sendMessage(`${player.name}, ${commandString}`) 
}))

// way 3 to make commands
ChatCommand.create('find', 'find player', ['d ssd ds'], { 'target': 'string' }, false, (player, args) => {
    const findplayer = world.getPlayers({name: `${args['target']?.split('"')[1]}`})[0]
    if (!findplayer) return player.sendMessage('player not found')
    console.warn(findplayer.name)
});

// way 4 to commands
ChatCommand('help', 'Server', [], { 'target': 'string', 'page': 'number', required: ['target'] }, false, ((player) => {
    let message = commands.map((data) => {
        return [
            `§e${data.command}§r`,
            data.description.length > 0 ? `- §7Description: §f${data.description}` : '',
            data.alias.length > 0 ? `- §7Alias: §f(§f${data.alias.join(', ')})` : '',
        ].filter(Boolean);
    }).join('\n').replace(',', '');
    player.sendMessage(`§aAvailable Commands:\n${message}`);
}))
  ```

**Status:**
🚀 Ready for Use - Stable Version

Elevate your Minecraft Bedrock server experience with our ChatCommand Handler. Facilitate seamless communication, empower your players, and enhance community engagement. Install now and revolutionize your chat interactions in Minecraft Bedrock Edition!
