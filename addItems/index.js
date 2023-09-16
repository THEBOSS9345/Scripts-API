import { Player, Entity, system, world, ItemStack, Enchantment, EnchantmentTypes, EnchantmentType } from "@minecraft/server";

/**
 * Adds items to a player's inventory.
 *
 * @param {Player} player - The player object.
 * @param {Array<[Item, number, Array<Enchantment>]>} items - An array of items to add, where each item is represented by [item, count, enchants].
 * @param {Array<Enchantment>=} enchants - Optional array of enchantments to apply to all items.
 */

function addItems(player, items) {
  try {
    const inv = player.getComponent('inventory').container;
    for (let [item, count, enchants] of items) {
      const itemStack = new ItemStack(item, count)
      if (enchants && enchants.length > 0) {
        const enchantComp = itemStack.getComponent("minecraft:enchantments").enchantments;
        for (const enchant of enchants) enchantComp.addEnchantment(enchant);
        itemStack.getComponent("minecraft:enchantments").enchantments = enchantComp;
      }
      inv.addItem(itemStack);
    }
  } catch (error) {
    console.warn('inventory', error);
  }
}


world.getPlayers().map((player) => {
  addItems(player, [
    ["minecraft:diamond_chestplate", 1, [new Enchantment('mending', 1)]],
    ["minecraft:diamond_boots", 1, [new Enchantment('mending', 1)]],
    ["minecraft:diamond_leggings", 1, [new Enchantment('mending', 1)]],
    ["minecraft:diamond_helmet", 1, [new Enchantment('mending', 1)]],
    ['minecraft:bread', 1]
  ])
})