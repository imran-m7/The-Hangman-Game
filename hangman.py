import random

# array of 100 words that could be guessed
all_words = [
    "apple", "banana", "mango", "orange", "lemon", "pineapple", "watermelon", "grape", "cherry", "papaya",
    "carrot", "potato", "tomato", "cucumber", "broccoli", "spinach", "eggplant", "kale", "lettuce", "pea",
    "tesla", "ferrari", "lamborghini", "porsche", "mercedes", "bmw", "audi", "ford", "toyota", "honda",
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "gray",
    "tiger", "lion", "elephant", "giraffe", "dolphin", "kangaroo", "panda", "zebra", "fox", "wolf",
    "chair", "table", "phone", "laptop", "camera", "bottle", "clock", "mirror", "pencil", "notebook",
    "doctor", "engineer", "teacher", "farmer", "artist", "lawyer", "chef", "pilot", "nurse", "writer",
    "canada", "brazil", "japan", "germany", "australia", "france", "india", "china", "italy", "mexico",
    "river", "mountain", "forest", "ocean", "desert", "rainbow", "thunder", "snow", "breeze", "sunrise",
    "soccer", "basketball", "cricket", "tennis", "baseball", "golf", "hockey", "swimming", "boxing", "running"
]

# hangman parts
hangman_display_stages = [
    """
   -----
   |   |
       |
       |
       |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
       |
       |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
   |   |
       |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
  /|   |
       |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
  /|\\  |
       |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
  /|\\  |
  /    |
       |
  ---------
    """,
    """
   -----
   |   |
   O   |
  /|\\  |
  / \\  |
       |
  ---------
    """
]

# displaying hangman parts
def display_hangman(guesses):
    print(hangman_display_stages[6 - guesses])

def play_hangman():

    random_word = random.choice(all_words)
    hidden_word = ["_"] * len(random_word)
    guesses = 6

    print("Welcome to The Hangman Game!")
    print(f"You have {guesses} chances to guess the correct word.")
    print(f"Word to guess: {' '.join(hidden_word)}")

    while guesses > 0 and "_" in hidden_word:
        guess = input("Guess a letter or the whole word: ").lower()

        # if guessing a letter
        if len(guess) == 1:
            if guess in random_word:
                for i, letter in enumerate(random_word):
                    if letter == guess:
                        hidden_word[i] = guess
                print(f"Good job! {guess} is in the word.")

            else:
                guesses -= 1
                print(f"Wrong letter! You have {guesses} guesses left.")
                display_hangman(guesses)

        # else if guessing the whole word
        elif guess == random_word:  
            hidden_word = list(random_word)
            print("You guessed the word!")
            break
        
        # if incorrect whole word guess
        else:  
            guesses -= 1
            print(f"Wrong word! You have {guesses} guesses left.")
            display_hangman(guesses)

        print(f"Word to guess: {' '.join(hidden_word)}")

    if "_" in hidden_word:
        print(f"Game over! The word was: {random_word}")
    else:
        print("Congratulations! You guessed the word!")

# Start the game
play_hangman()
