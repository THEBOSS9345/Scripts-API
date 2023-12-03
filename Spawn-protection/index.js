import { BlockVolumeUtils, BoundingBoxUtils, Vector, world, system } from '@minecraft/server';

class SpawnPro {
    constructor() {
        this.box = (players, res) => players.some(player => BoundingBoxUtils.isInside(BoundingBoxUtils.createValid(res.data.from, res.data.to), player.location));
        this.spawnLocations = [];
        this.playersInside = new Set();
        system.runInterval(() => this.updatePlayerLocations());
        world.beforeEvents.itemUseOn.subscribe((data) => this.playersInside.has(data.source.name) ? (data.cancel = true) : null);
        world.beforeEvents.playerBreakBlock.subscribe((data) => this.playersInside.has(data.player.name) ? (data.cancel = true) : null);
    }
    setSpawn(locations) {
        this.spawnLocations = locations.map((location) => ({ from: new Vector(location.from.x, location.from.y, location.from.z), to: new Vector(location.to.x, location.to.y, location.to.z) }));
    }
    updatePlayerLocations() {
        for (const player of world.getPlayers()) {
            const isInsideAnyBox = this.spawnLocations.some((location) => this.box([player], { data: { from: location.from, to: location.to } }));
            if (isInsideAnyBox) this.playersInside.add(player.name); else this.playersInside.delete(player.name);
        }
    }
}

const spawnProInstance = new SpawnPro();
spawnProInstance.setSpawn([
    { from: { x: -116, y: -41, z: 186 }, to: { x: 123, y: 207, z: -73 } },
]); 
