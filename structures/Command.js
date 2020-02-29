class Command {
    constructor(bot) {
        this.bot = bot;
        this.aliases = [];
        this.disabled = false;
        this.hidden = false;
        this.ownerOnly = false;
        this.needGuild = true;
    }

    run (msg) {

    }
}

module.exports = Command;