# Preact Minesweeper Game
Coded by **Jesse Hart** 

## Play the Game Here
https://jessheart.github.io/demos/minesweeper/

## About this Project
I created this to serve as a sample of work I am capable of.
I elected to write a minesweeper game, because it has more complicated mechanics than the usual Tic Tac Toe or TODO List sample apps.
I have 16 years of experience in writing Java server side software professionally.
I strongly believe in maintaining a fresh and diverse set of experiences.
The more practice I get with different technologies and ideas,
the better my decision making can be on these types of thing in the workplace.

## Objective
To explore ideas working with
- Typescript https://www.typescriptlang.org/docs/home.html
- Preact https://preactjs.com/
- Prettier https://prettier.io/
- Jest https://jestjs.io/en/
- Enzyme https://enzymejs.github.io/enzyme/

## About the Code
Tests can be found next to each `.ts` and `.tsx` file.  The files have a postfix like `.test.ts` and `.test.tsx`.
Placing the tests next to their test subjects is a pattern that I picked up from using Angular.
I like how the tests are front and center, making it more encouraging to test.

`src/components` contains the Preact code for the UI.  All of the components are stateless functional components.
If you have used React before, the `.tsx` files should look pretty familiar.

`src/minesweeper` has the logic for the game.
`src/stats` has the logic for tracking statistics about finished games.
This code contains nothing specific to Preact, and is plain `.ts` files.
All of the logic is implemented with functions that produce new versions of the state.

## Conclusion
I think Preact is pretty slick for a quick hobby prototype or two, but I think the resources are a bit lacking.
Especially when it comes to using Typescript and getting the tests configured properly.
I have worked with Angular for a few years and I like that it generally works without a lot of fuss.
There was a good amout of fuss to get my Preact app building and testable- more than I would want if I were to be using it professionally.
For an employer, I would recommend using React over Preact.

## NPM Notes
*   `npm install`: Installs dependencies
*   `npm run start`: Runs `serve` or `dev`, depending on `NODE_ENV` value. Defaults to `dev server`
*   `npm run dev`: Run a development, HMR server
*   `npm run serve`: Run a production-like server
*   `npm run build`: Production-ready build
*   `npm run lint`: Pass TypeScript files using TSLint
*   `npm run test`: Run Tests
