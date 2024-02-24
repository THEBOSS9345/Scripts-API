import { Player, system, ItemStack, Enchantment } from "@minecraft/server";

/**
 * Adds items to a player's inventory.
 *
 * @param {Player} player - The player object.
 * @param {Array<[Item, number, Array<Enchantment>]>} items - An array of items to add, where each item is represented by [item, count, enchants].
 * @param {Array<Enchantment>=} enchants - Optional array of enchantments to apply to all items.
 */

function addItems(player, items) {
    system.run(() => {
        const inv = player.getComponent('inventory').container;
        for (let [item, count, enchants] of items) {
            const itemStack = new ItemStack(item, count)
            if (enchants && enchants.length > 0) {
                const enchantComp = itemStack.getComponent("enchantable")
                for (const enc of enchants) console.log(JSON.stringify(enc))
                for (const enchant of enchants) enchantComp.addEnchantment(enchant);
            }
            inv.addItem(itemStack);
        }
    })
}
