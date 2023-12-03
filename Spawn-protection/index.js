import { world, Player } from '@minecraft/server';
const database = [];

  /**
   * @param {{ cords1: {x: number, y: number, z: number}, cords2: {x: number, y: number, z: number}}} location
   * @param {((player: Player) => boolean) } permissions
   */ function SpawnPro(location, permissions) {
    database.push({ location: location, permissions: permissions });
    const box = (player, location) =>  player.location.x >= Math.min(location.cords1.x, location.cords2.x) && player.location.x <= Math.max(location.cords1.x, location.cords2.x) && player.location.y >= Math.min(location.cords1.y, location.cords2.y) && player.location.y <= Math.max(location.cords1.y, location.cords2.y) && player.location.z >= Math.min(location.cords1.z, location.cords2.z) && player.location.z <= Math.max(location.cords1.z, location.cords2.z);
    world.beforeEvents.playerBreakBlock.subscribe((data) => {
      const isInsideAnyLocation = database.filter((value) => box(data.block, value.location))[0]
      if (!isInsideAnyLocation) return
      isInsideAnyLocation.permissions ? isInsideAnyLocation.permissions(data.player) ? null : data.cancel = true : data.cancel = true
    })
    world.beforeEvents.playerInteractWithBlock.subscribe((data) => {
        const isInsideAnyLocation = database.filter((value) => box(data.block, value.location))[0]
        if (!isInsideAnyLocation) return
        isInsideAnyLocation.permissions ? isInsideAnyLocation.permissions(data.player) ? null : data.cancel = true : data.cancel = true
    })
  }
// Example usage
SpawnPro({ cords1: { x: 80, y: -61, z: 80 }, cords2: { x: 900, y: 900, z: 900 }}, ((player) => player.hasTag('diamond') ));
