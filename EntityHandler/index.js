import { world, system, Player, Entity } from '@minecraft/server';
const database = new Map()
let isInitialized = false;
  /**
     * @param {string} entityId - Entity ID
     * @param {{nameTag?, permissions?}} args - Options for the entity
     * @param {(player: Player, entity: Entity) => void} callback - Callback function
     */
export function newEntity(entityId, args, callback) {
        database.set(entityId, { args, callback })
        if (isInitialized) return;
        isInitialized = true;
        world.beforeEvents.playerInteractWithEntity.subscribe(({ target, player }) => {
            const entityData = database.get(target.typeId)
            if (!entityData) return;
            if (entityData.args.permissions && !entityData.args.permissions(player, target)) return player.sendMessage(`§c<AntiCheat Error>§7 You don't have the right permissions to use this entity.`);
            entityData.callback(player, target);
        });
        system.runInterval(() => {
            world.getDimension('overworld').getEntities().forEach((entity) => {
                if (entity instanceof Player) return;
                const entityData = database.get(entity.typeId)
                if (!entityData) return;
                if (entityData.args.nameTag) entity.nameTag = entityData.args.nameTag;
            });
        });
}