### addItems Function 🎁

**Overview:**
The `addItems` function streamlines item management in Minecraft Bedrock server plugins. It simplifies the process of adding items to a player's inventory, enhancing gameplay and user experience.

**How to Use:**
- **Parameters:**
  - `player`: The player class.
  - `items`: An array representing items to add, structured as [item, count, enchants].
  - `enchants`: Optional array of enchantments to apply to the items.

**Example:**
```javascript
addItems(player, [
    ["minecraft:diamond_sword", 1, [{type: 'sharpness', level: 1}],
    ["minecraft:iron_armor", 1, [{type: 'protection', level: 1}],
    ["minecraft:golden_apple", 5]
  ]
]])
