### addItems Function 🎁 (Minecraft Bedrock Edition)

**Overview:**
The `addItems` function streamlines item management in Minecraft Bedrock server plugins. It simplifies the process of adding items to a player's inventory, enhancing gameplay and user experience.

**How to Use:**
- **Parameters:**
  - `player`: The player object.
  - `items`: An array representing items to add, structured as [item, count, enchants].
  - `enchants`: Optional array of enchantments to apply to the items.

**Example:**
```javascript
addItems(player, [
  ["minecraft:diamond_sword", 1, [new Enchantment('sharpness', 3)]],
  ["minecraft:iron_armor", 1, [new Enchantment('protection', 2)]],
  ["minecraft:golden_apple", 5]
]);
