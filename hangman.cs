using System;
using System.Linq;

class HangmanGame
{
    // random 100 words that could be guessed
    private static readonly string[] allWords = {
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
    };

    // hangman display incorrect guesses (6 parts: head, body, left arm, right arm, left leg, right leg)
    private static readonly string[] hangmanDisplayStages = {
        @"
   -----
   |   |
       |
       |
       |
       |
  ---------",
        @"
   -----
   |   |
   O   |
       |
       |
       |
  ---------",
        @"
   -----
   |   |
   O   |
   |   |
       |
       |
  ---------",
        @"
   -----
   |   |
   O   |
  /|   |
       |
       |
  ---------",
        @"
   -----
   |   |
   O   |
  /|\  |
       |
       |
  ---------",
        @"
   -----
   |   |
   O   |
  /|\  |
  /    |
       |
  ---------",
        @"
   -----
   |   |
   O   |
  /|\  |
  / \  |
       |
  ---------"
    };

    private static int guesses = 6;
    private static string randomWord;
    private static char[] hiddenWord;

    // displaying the hangman figure based on remaining guesses
    private static void DisplayHangmanParts()
    {
        Console.WriteLine(hangmanDisplayStages[6 - guesses]);
    }

    public static void Main()
    {
        Random random = new Random();
        randomWord = allWords[random.Next(allWords.Length)];
        hiddenWord = new string('_', randomWord.Length).ToCharArray();

        Console.WriteLine("Welcome to The Hangman Game!");
        Console.WriteLine($"You have {guesses} chances to guess the correct word.");
        Console.WriteLine($"Word to guess: {string.Join(" ", hiddenWord)}");

        StartingGame();
    }

    private static void StartingGame()
    {
        while (guesses > 0 && hiddenWord.Contains('_'))
        {
            Console.Write("Guess a letter or the whole word: ");
            string guess = Console.ReadLine().ToLower();

            // guessing a letter
            if (guess.Length == 1)
            {
                // if correct letter
                if (randomWord.Contains(guess))
                {
                    for (int i = 0; i < randomWord.Length; i++)
                    {
                        if (randomWord[i] == guess[0])
                        {
                            hiddenWord[i] = guess[0];
                        }
                    }
                    Console.WriteLine("You guessed correct letter!");
                }

                // if incorrect letter
                else
                {
                    guesses--;
                    Console.WriteLine($"You guessed wrong letter. You have {guesses} guesses left.");
                    DisplayHangmanParts();
                }
            }

            // guessing whole hidden word (correct)
            else if (guess == randomWord)
            {
                hiddenWord = randomWord.ToCharArray();
                Console.WriteLine("You guessed the whole word!");
            }

            // guessing whole hidden word (incorrect)
            else
            {
                guesses--;
                Console.WriteLine($"Wrong word. You have {guesses} guesses left.");
                DisplayHangmanParts();
            }

            Console.WriteLine($"Word to guess: {string.Join(" ", hiddenWord)}");
        }

        // if there are no more guesses or the word does not have "_"
        if (hiddenWord.Contains('_'))
        {
            Console.WriteLine($"Game over! The word was: {randomWord}");
            DisplayHangmanParts();
        }
        else
        {
            Console.WriteLine("Congratulations, you won!");
        }
    }
}
