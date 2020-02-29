const {Client, Collection} = require("discord.js");
const {join} = require('path');
const {readdirSync} = require('fs');
const AmeClient = require("amethyste-api");
class AmeBot extends Client {
    constructor(option) {
        super(option);
        this.config = require("../config/config");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.prefixes = this.config.prefix ? [this.config.prefix] : [];
        this.log = require('./utils/log');
        this.utils = require('./utils/MessageForm');
        this.initialize();
        this.ameAPI = new AmeClient(this.config.ameToken);
    }

    /**
     * Initialize the bot
     **/
    initialize() {
        this.loadCommands();
        this.loadEvents();
    }

    loadCommands() {
        const categories = readdirSync(join(__dirname, '../commands'));
        let totalCommands = 0;
        for (let i = 0; i < categories.length; i++) {
            let thisCommands = readdirSync(join(__dirname, '../commands', categories[i]));
            totalCommands = totalCommands + thisCommands.length;
            thisCommands.forEach(c => {
                try {
                    let command = require(join(__dirname, '../commands', categories[i], c));
                    if (!command.help) {
                        command = new command(this);
                    }
                    //Add the command and its aliases to the collection
                    this.commands.set(command.cmd, command);
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command.cmd);
                    });
                } catch (err) {
                    this.log.error(`Unable to load command ${c}: ${err.stack || err}`);
                }
            });
        }
        this.log.info(`Command ${this.commands.size}/${totalCommands} loading`);
    }

    /**
     * Load Events
     **/
    loadEvents() {
        //Load events
        const events = readdirSync(join(__dirname, '../events'));
        let loadedEvents = 0;
        events.forEach(e => {
            try {
                const eventName = e.split(".")[0];
                const event = require(join(__dirname, '../events', e));
                loadedEvents++;
                //create event with params
                this.on(eventName, (...args) => {
                    new event(this).run(...args)
                });
                delete require.cache[require.resolve(join(__dirname, '../events', e))];
            } catch (err) {
                this.log.error(`Failed to load event ${e}: ${err.stack || err}`);
            }
        });
        //token
        this.login(this.config.token);
        //logged
        this.log.info(`Loaded ${loadedEvents}/${events.length} events`);
        process.on('unhandledRejection', (err) => this.log.error(err));
        process.on('uncaughtException', (err) => this.log.error(err));
    }
}

module.exports = AmeBot;