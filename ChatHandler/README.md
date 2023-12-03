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
 import ChatCommand from './ChatCommands.js'

ChatCommand.create('Help', 'Help Command: Shows all available commands', ['h', 'help'], false, (player) => {
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

ChatCommand.create('test', 'testing command', ['test'], (player => player.hasTag('test')), ((player, args, commandString) => {
    player.sendMessage(`${player.name}, ${commandString}, ${args}`) 
}))  
  ```

**Status:**
🚀 Ready for Use - Stable Version

Elevate your Minecraft Bedrock server experience with our ChatCommand Handler. Facilitate seamless communication, empower your players, and enhance community engagement. Install now and revolutionize your chat interactions in Minecraft Bedrock Edition!
