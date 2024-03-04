# JET_grad_assignment

Coding assignment for the JET Graduate Scheme 2024

## How to Build, Compile, and Run The Program

1. Install Node.js. You can verify that Node.js is installed if you get a version response when you type "node -v" in your console or you can download it from the [Node.js website](https://nodejs.org/en/download).
2. Navigate to the correct directpry in your consol "cd JET_grad_assignment".
3. Run it by typing "node main.js" in the console and inputting the post codes as requested.

![Console screenshot 1](https://github.com/sraddheya/JET_grad_assignment/blob/main/JET_console1.png)
![Console screenshot 2](https://github.com/sraddheya/JET_grad_assignment/blob/main/JET_console2.png)

## Assumptions

- The data would be for UK based restaurants and therefore follow the [UK postal code format](https://assets.publishing.service.gov.uk/media/5a81ebbded915d74e6234d42/Appendix_C_ILR_2017_to_2018_v1_Published_28April17.pdf)
- Restaurant name outputted instead of unique restaurant name because assumed that the output is purely for humans to read and so normal restuarant name is more readable.
- As rating was requested as a number, outputted the star rating because assumed this would be most meaningful to human reader.
- Restaurant address is outputted, not incuding the coordinates, because assumed that output is purely for humans to read so coordinates would not be meaningful.

## Improvements

- Create a user interface for the program.
- Conduct more rigorous unit tests.
