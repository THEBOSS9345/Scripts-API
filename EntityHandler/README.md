# Entity Interaction Handler 🤝

**Description:**
Enhance your Minecraft Bedrock server by implementing the Entity Interaction Handler. This handler allows you to manage and customize player interactions with entities seamlessly. Empower your server with personalized entity behaviors, creating a unique and engaging gaming experience.

## Features:
- **Dynamic Entity Interactions:** Customize how players interact with entities through a powerful and flexible handler.
- **Permission System:** Control access to specific entity interactions based on player permissions.
- **NameTag Customization:** Personalize entity nametags dynamically during gameplay.
- **Stable and Efficient:** Optimized for performance and stability, ensuring smooth operation on your server.

## Usage:
2. Utilize the provided `newEntity` function to set up custom entity interactions.
3. Specify the `entityId`, options (`args`), and a callback function to define the behavior.
4. Optionally, set up permissions to control player access to specific entity interactions.
5. The callback expects two parameters: `player` representing an instance of the player class, and `target` representing an instance of the entity class.
6. Watch as your server comes to life with enhanced entity interactions!

## Installation:
1. Copy and paste the `newEntity` function into your server-side codebase.
2. Customize the function calls to create unique entity interactions for your server.
3. Ensure that the necessary modules are properly imported.

## Example:
```javascript
newEntity('minecraft:cow', { nameTag: 'ho2la' }, ((player, target) => {
    console.warn(player.name, target.typeId)
}))

newEntity('minecraft:chicken', { nameTag: 'hoad', permissions: ((player) => player.hasTag('Admin')) }, ((player) => {
    console.warn(player.name, target.typeId)
}))
newEntity('minecraft:warden', {}, ((player) => {
    console.warn(player.name, target.typeId)
}))
```
