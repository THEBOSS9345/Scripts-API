import { world } from '@minecraft/server';
Object.defineProperty(globalThis, 'Database', {
    get: function () {
        const players = world.getPlayers();
        let database = [...new Set([...world.getDynamicPropertyIds() || [], ...(players.flatMap(player => player.getDynamicPropertyIds()) || [])])].reduce((acc, id) => ({
            ...acc,
            world: world.getDynamicPropertyIds().includes(id) ? { ...acc.world, [id]: world.getDynamicProperty(id) } : acc.world,
            player: !world.getDynamicPropertyIds().includes(id) ? { ...acc.player, [id]: players.map(player => player.getDynamicProperty(id))[0] } : acc.player
        }), { world: {}, player: {} });
        return {

            /**
            * Sets a value in the database for the given key, either in the world or player context.
            *
            * @param {string} key - The key under which the value will be stored.
            * @param {number|string|boolean|object} value - The value to be stored in the database.
            * @param {boolean} [boolean=true] - If true, stores the data in the world context. If false, stores it in the player context.
            */
            set(key, value, boolean = true) {
                if (typeof key !== 'string') return console.error(`Invalid input: ${typeof key === 'string' ? `value: ${value}` : `key: ${key}`}`);
                if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'boolean' && typeof value !== 'object') return console.error(`Invalid input: value must be a number, string, boolean, or object.`);
                boolean ? database.world[key] = value : database.player[key] = value;
                this.save();
            },
            /**
           * Retrieves the value associated with the given key from the database.
           *
           * @param {string} key - The key for which to retrieve the stored value.
           * @param {boolean} [boolean=true] - If true, retrieves data from the world context. If false, retrieves data from the player context.
           * @returns {number|string|boolean|object} - The stored value for the specified key.
            */
            get(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                return boolean ? database.world[key] : database.player[key];
            },

            /**
             * Checks if the specified key exists in the database, either in the world or player context.
             *
             * @param {string} key - The key to check for existence.
             * @param {boolean} [boolean=true] - If true, checks for key existence in the world context. If false, checks in the player context.
             * @returns {boolean} - True if the key exists, false otherwise.
             */
            has(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                return boolean ? database.world.hasOwnProperty(key) : database.player.hasOwnProperty(key);
            },

            /**
            * Deletes the specified key from the database, either in the world or player context.
            *
            * @param {string} key - The key to delete.
            * @param {boolean} [boolean=true] - If true, deletes the key from the world context. If false, deletes it from the player context.
            */
            delete(key, boolean = true) {
                if (typeof key !== 'string' || typeof boolean !== "boolean") return console.warn(`Invalid input: ${typeof key === 'string' ? `key: ${key}` : `boolean: ${boolean}`}`);
                if (!database.world.hasOwnProperty(key) && !database.player.hasOwnProperty(key)) return console.error(`Key ${key} does not exist in the database.`);
                boolean ? database.world[key] = null : database.player[key] = null;
                this.save();
            },
            /**
           * Provides access to all world and player database entries separately.
           *
           * @example
           * // Access world context data
           * const worldData = Database.entries.world;
           *
           * // Access player context data
           * const playerData = Database.entries.player;
           *
           * @type {object}
           */
            get entries() {
                return database;
            },
            /**
             * Saves world and player context data to their respective contexts.
             * 
             * But you never need to use it.
             *
             * @example
             * // Save changes to the database
             * Database.save();
             */
            save() {
                for (const key in database.world) world.setDynamicProperty(key, database.world[key]);
                for (const key in database.player) players.forEach(player => player.setDynamicProperty(key, database.player[key]));
            },
            /**
            * Iterates over all database entries and executes a callback function for each entry.
            *
            * @param {Function} callback - A function to be executed for each entry. The callback function receives parameters (key, value, combinedDatabase).
            * @param {boolean} [boolean=true] - If true, iterates over keys in the world context. If false, iterates in the player context.
            *
            * @example
            * // Log all keys and values in the player context
            * Database.forEach((key, value) => {
            *     console.log(key, value);
            * });
            */
            forEach(callback, boolean = true) {
                const combinedDatabase = { ...database.world, ...database.player };
                return boolean ? combinedDatabase.world.hasOwnProperty(key) ? callback(key, combinedDatabase.world[key], combinedDatabase) : null : combinedDatabase.player.hasOwnProperty(key) ? callback(key, combinedDatabase.player[key], combinedDatabase) : null
            }
        };
    }
});
export default globalThis.Database;
