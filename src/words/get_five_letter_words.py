import json


class Reader:
    """This class is a helper for the wordle-helper project.

    Its purpose is to make a JSON file of only five-letter words in the words_dictionary found at
    https://github.com/dwyl/english-words ! This tool should only need to be used when the dictionary is updated.
    """
    # A Python dictionary containing contents of words_dictionary.json in (word: length) format.
    words = {}

    @staticmethod
    def read_words() -> None:
        """Read the contents of words_dictionary.json into the words class variable as a dictionary."""
        with open('words_dictionary.json') as dictionary:
            Reader.words = json.load(dictionary)
        Reader.words = {word: len(word) for word in Reader.words}

    @staticmethod
    def write_fives() -> None:
        """Write only the five-letter words in words class variable to a file called fives.json, overwriting if file already
        exists.
        """
        words = Reader.words
        # Make a dictionary containing only five-letter words
        fives = {(word if words[word] == 5 else None): 5 for word in words}
        del fives[None]

        # Save the dictionary to JSON
        with open('fives.json', 'w') as file:
            json.dump(fives, file)


if __name__ == "__main__":
    print("Reading words_dictionary.json")
    Reader.read_words()
    print("Writing five-letter words to fives.json")
    Reader.write_fives()
    print("Done!")
