let Command = require('../../structures/Command');
module.exports = class Help extends Command {
    constructor(bot) {
        super(bot);
        this.bot = bot;
        this.cmd = "help";
        this.aliases = ['commands', 'h', 'cmds'];
        this.cat = 'utility';
        this.needGuild = false;
        this.help = {
            short: 'help.help.short',
            usage: 'help.help.usage',
            example: 'help.help.example'
        }
    }

    async run(msg) {
        let args = msg.content.split(' ').splice(1);
        if (args.length > 0) {
        } else {
            await msg.channel.send(await this.buildMenu(msg, this.bot.commands));
        }
    }
    async buildMenu(msg, commands){
        let categories = {};
        let i =0;
        //recupère les catégories non traduite la
        commands.forEach(c => {
            if (!c.hidden) {
                i++;
                if (!categories[c.cat]) {
                    categories[c.cat] = [c];
                } else {
                    categories[c.cat].push(c);
                }
            }
        });
        let helpMessage = "";
        let title = 'Améthyste API Example' + '\n';
        let sortedCategories = [];
        for (let key in categories) {
            if (categories.hasOwnProperty(key)) {
                sortedCategories.push(key);
                categories[key].sort((a, b) => {
                    if (a.cmd > b.cmd) {
                        return 1;
                    }
                    if (a.cmd < b.cmd) {
                        return -1;
                    }
                    return 0;
                })
            }
        }
        sortedCategories.sort((a, b) => {
            let aCatValue = this.getCategoryRanking(a);
            let bCatValue = this.getCategoryRanking(b);
            if (aCatValue > bCatValue) {
                return 1;
            }
            if (aCatValue < bCatValue) {
                return -1;
            }
            return 0;
        });
        for (let i = 0; i < sortedCategories.length; i++) {
            let category = categories[sortedCategories[i]];
            helpMessage += '**' + `${sortedCategories[i]}` + '**' + ': \n';
            for (let x = 0; x < category.length; x++) {
                helpMessage += `\`${category[x].cmd}\``;
                if (category.length - 1 !== x) {
                    helpMessage += " ";
                }
            }
            helpMessage += '\n\n'
        }
        return { embed: { title: title, description: helpMessage} };
    }
    /**
     * Returns the sorting number for a ranking in help
     * @param {String} category Name of the category to be evaluated
     * @return {Number}
     */
    getCategoryRanking(category) {
        let ranking = 0;
        switch (category) {
            case 'ame':
                ranking = 0;
                break;
            case 'moderation':
                ranking = 1;
                break;
            case 'economy':
                ranking = 2;
                break;
            case 'utility':
                ranking = 3;
                break;
            case 'search':
                ranking = 4;
                break;
            case 'fun':
                ranking = 5;
                break;
            case 'image':
                ranking = 6;
                break;
            case 'music':
                ranking = 7;
                break;
            case 'playlist':
                ranking = 9;
                break;
            case 'radio':
                ranking = 8;
                break;
            case 'permission':
                ranking = 10;
                break;
            case 'nsfw':
                ranking = 11;
                break;
        }
        return ranking;
    }
};