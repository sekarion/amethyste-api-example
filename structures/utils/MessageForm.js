class MessageForm {
    /**
     * Renders a list with the passed array, does not check for maxlength etc.
     * @param contentArray Array of content to render
     * @param [lang] Optionally define a markup language to use
     * @param [block=true] Optionally wrap the content in a text block
     */
    renderList(contentArray, lang = '', block = true) {
        let list = "";
        contentArray.forEach(c => {
            list += c + '\n';
        });
        if (block) {
            list = wrapBlock(list, lang);
        }
        return list;
    };

    /**
     * @param content
     * @param lang
     * @returns {string}
     */
    wrapBlock(content, lang = '') {
        let list = `\`\`\`${lang}\n`;
        list += content;
        list += "```";
        return list;
    };

    simplewrapBlock(content) {
        let list = "`";
        list += content;
        list += "`";
        return list;
    }

    /**
     * @param contentArray Array of strings that should get prefixed
     */
    prefixIndex(contentArray) {
        let i = 0;
        return contentArray.map(c => {
            i++;
            return `[${i}] ${c}`;
        });
    };

    /**
     * @param contentArray Array of strings that should get prefixed
     */
    prefixIndexModif(contentArray) {
        let i = 0;
        return contentArray.map(c => {
            i++;
            return `${c}\n`;
        });
    };

    findMember(guild, query, bot) {
        let user;
        const search = query.toLowerCase();
        user = guild.members.cache.filter(m => m.displayName.toLowerCase().includes(search)
            || m.user.tag.toLowerCase().includes(search)
            || m.id === search);
        if(user) return user;
        user = bot.users.fetch(search).catch(() => {});
        return user;
    }
    formatMembers(client, list) {
        let message = `⚠ Found **${list.size}** members :\n${list.first(5).map(m => `- **${m.user.tag}** (ID:${m.id})`).join('\n')}\n`;
        if (list.size > 5) message += `And ${(list.size - 5)} more...`;
        return message;
    }

}

module.exports = new MessageForm();