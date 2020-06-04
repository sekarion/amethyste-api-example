/**
 * Class MessageForm
 * used for formatting message content
 */
class MessageForm {
  /**
   * Renders a list with the passed array, does not check for maxlength etc.
   * @param {array} contentArray Array of content to render
   * @param {string}lang Optionally define a markup language to use
   * @param {boolean}block=true Optionally wrap the content in a text block
   * @return {string}
   */
  renderList(contentArray, lang = '', block = true) {
    let list = '';
    contentArray.forEach(c => {
      list += c + '\n';
    });
    if (block) {
      list = wrapBlock(list, lang);
    }
    return list;
  }

  /**
   * @param {string} content
   * @param {string} lang
   * @return {string}
   */
  wrapBlock(content, lang = '') {
    let list = `\`\`\`${lang}\n`;
    list += content;
    list += '```';
    return list;
  }

  /**
   * simple wrap
   * @param {string} content the content to be wrapped
   * @return {string} wrapped content
   */
  simplewrapBlock(content) {
    let list = '`';
    list += content;
    list += '`';
    return list;
  }

  /**
   * @param {Array} contentArray Array of strings that should get prefixed
   * @return {Array} Array of prefixed-strings
   */
  prefixIndex(contentArray) {
    let i = 0;
    return contentArray.map(c => {
      i++;
      return `[${i}] ${c}`;
    });
  }

  /**
   * @param {Array} contentArray Array of strings that should get prefixed
   * @return {Array} returns prefixed-string array
   */
  prefixIndexModif(contentArray) {
    let i = 0;
    return contentArray.map(c => {
      i++;
      return `${i}. ${c}\n`;
    });
  }

  /**
   * Used to find a guild Member
   * @param {object} guild guild in which member will be searched
   * @param {string} query member to search for
   * @param {object} bot the Client object
   * @return {object} returns the user object
   */
  findMember(guild, query, bot) {
    let user;
    console.log(query);
    const search = query.toLowerCase();
    user = guild.members.cache.filter(
      m =>
        m.displayName.toLowerCase().includes(search) ||
        m.user.tag.toLowerCase().includes(search) ||
        m.id === search
    );
    if (user) return user;
    user = bot.users.fetch(search).catch(() => {});
    return user;
  }

  /**
   * format members in a messag string
   * @param {object} client the Client object
   * @param {Array} list array of members
   * @return {string} returns formatted message string
   */
  formatMembers(client, list) {
    let message = `⚠ Found **${list.size}** members :\n${list
      .first(5)
      .map(m => `- **${m.user.tag}** (ID:${m.id})`)
      .join('\n')}\n`;
    if (list.size > 5) message += `And ${list.size - 5} more...`;
    return message;
  }
}

module.exports = new MessageForm();
