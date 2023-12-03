import { Player, world } from '@minecraft/server';
const commands = []
let CommandInitialized = false;
Object.defineProperty(globalThis, 'ChatCommand', {
    get: function () {
        const prefix = '.';
        return {
            /**
       * Creates a new chat command.
       * @param {string} command - The command name.
       * @param {string} description - Description of the command.
       * @param {string[]} [alias=[]] - Array of aliases for the command.
       * @param {boolean|((player: Player) => boolean)} [permissions=false] - Boolean or function indicating if the player has permission to use the command.
       * @param {((player: Player, args: string, commandString: string) => void)} callback - The function to execute when the command is triggered.
       * @returns {void}
       */
            create(command, description, alias = [], permissions = false, callback) {
                if (typeof description !== 'string' || typeof command !== 'string') return console.error(`${typeof command === "string" ? 'description' : 'name'} is not a string at create`);
                commands.push({ command, description, alias, permissions, callback });
                ChatCommand.handleChatCommand
            },
            get handleChatCommand() {
                if (CommandInitialized) return;
                CommandInitialized = true;
                world.beforeEvents.chatSend.subscribe((data) => {
                    const { message, sender: player } = data;
                    if (!message.startsWith(prefix)) return;
                    data.cancel = true;
                    const commandString = message.slice(prefix.length).trim();
                    const matchedCommand = commands.find(({ command, alias }) => new RegExp(`^${command}(\\s|$)`, 'i').test(commandString) || (alias && alias.some(a => new RegExp(`^${a}(\\s|$)`, 'i').test(commandString))));
                    if (matchedCommand && (!matchedCommand.permissions || matchedCommand.permissions(player))) {
                        const args = commandString.slice(matchedCommand.command.length).trim();
                        matchedCommand.callback(player, args, commandString);
                    } else player.sendMessage(`§cUnknown command: ${commandString}, Please check that the command exists and that you have permission to use it.`);
                });
            }
        };
    }
});
export default globalThis.ChatCommand
/** ex: 
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
}))  */
