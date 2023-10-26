import {world} from '@minecraft/server';
Object.defineProperty(globalThis, 'Database', {
    get: function () {
        const players = world.getPlayers();
        let database = [...new Set([...world.getDynamicPropertyIds() || [], ...(players.flatMap(player => player.getDynamicPropertyIds()) || [])])].reduce((acc, id) => ({
            ...acc,
            world: world.getDynamicPropertyIds().includes(id) ? { ...acc.world, [id]: world.getDynamicProperty(id) } : acc.world,
            player: !world.getDynamicPropertyIds().includes(id) ? { ...acc.player, [id]: players.map(player => player.getDynamicProperty(id)) } : acc.player
        }), { world: {}, player: {} });

        return {
            set(key, value, boolean = true) {
                if (typeof key !== 'string' || typeof value !== 'string') return console.error(`Invalid input: ${typeof key === 'string' ? `value: ${value}` : `key: ${key}`}`);
                boolean ? database.world[key] = value : database.player[key] = value;
                this.save();
            },
            get(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                return boolean ? database.world[key] : database.player[key];
            },
            has(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                return boolean ? database.world.hasOwnProperty(key) : database.player.hasOwnProperty(key);
            },
            delete(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                if (!database.world.hasOwnProperty(key) && !database.player.hasOwnProperty(key)) return console.error(`Key ${key} does not exist in the database.`);
                boolean ? database.world[key] = null : database.player[key] = null;
                this.save();
            },
            get entries() {
                return [database];
            },
            save() {
                for (const key in database.world) world.setDynamicProperty(key, database.world[key]);
                for (const key in database.player) players.forEach(player => player.setDynamicProperty(key, database.player[key]));
            }
        };
    }
});
export default globalThis.Database;
