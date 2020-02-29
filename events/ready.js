module.exports = class {
    constructor(bot) {
        this.bot = bot;
    }

    async run() {
        this.bot.prefixes.push(`<@!${this.bot.user.id}>`, `<@${this.bot.user.id}>`);
        this.bot.log.info(`${this.bot.user.username} ready !`);
    }
};