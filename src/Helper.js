/**
 * This Helper class contains the technical functionality for the tool.
 */
class Helper {

    // A dictionary containing all the five-letter words in words/solutions.json as keys
    static dictionary = require("./words/solutions.json")

    /**
     * Returns an array of words that match the current input.
     */
    static getMatches(state) {
        // charRegexes is an array where each index represents the regex that must match the respective character in a
        // matching word. The list will be merged from character regexes into one word regex later to match whole words.
        let charRegexes = ["[^]", "[^]", "[^]", "[^]", "[^]"];

        // yellows are characters which are in the word, but have not been placed yet.
        let yellows = [];

        // Iterate through the grid state and fill in the previously defined arrays
        for (let i = 0; i !== 5; i++) {
            for (let j = 0; j !== 6; j++) {
                if (state[j][i][1][0] === "") {
                    continue;
                }
                if (state[j][i][0][0] === "grey") {
                    // No character can be this value, so update their regexes accordingly.
                    for (let k = 0; k !== 5; k++) {
                        if (charRegexes[k][1] === '^') {
                            charRegexes[k] = charRegexes[k].slice(0, 2) + state[j][i][1][0] + charRegexes[k].slice(2);
                        }
                    }
                } else if (state[j][i][0][0] === "green") {
                    charRegexes[i] = `[${state[j][i][1][0]}]`;
                } else {
                    if (!yellows.includes(state[j][i][1][0])) {
                        yellows.push(state[j][i][1][0]);
                    }
                    // This character cannot be this value, but we only want to note this if we don't already have a
                    // green value here (there is a green value if the caret has been removed).
                    if (charRegexes[i][1] === '^') {
                        charRegexes[i] = charRegexes[i].slice(0, 2) + state[j][i][1][0] + charRegexes[i].slice(2);
                    }
                }
            }
        }

        // combine the character regexes into one word matching regex:
        let regex = RegExp(charRegexes.join(""));

        // Find all matching strings in dictionary
        let matches = []
        for (const word of Object.keys(this.dictionary)) {
            if (word.match(regex) !== null) {
                // This word matches regex, so we must check that it contains the necessary yellow characters
                let hasYellows = true;
                for (const char of yellows) {
                    if (!word.includes(char)) {
                        hasYellows = false
                    }
                }
                if (hasYellows) {
                    // This word contains the necessary yellow characters, so it is a proper match
                    matches.push(word);
                }
            }
        }

        return matches;
    }
}

export default Helper;