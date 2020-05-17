## Project Architecture

We have a lot to add to this game still and although we could add it all in one giant function. That is not best practice for a variety of reasons. Lets add the following files to the `src` folder.

1. Create `noms.ts`
   - [noms.ts source file](https://github.com/cassieview/SnakeVR/blob/master/src/noms.ts)
2. Create `envBox.ts`
   - [envBox.ts source file](https://github.com/cassieview/SnakeVR/blob/master/src/envBox.ts)
3. Create `score.ts`
   - [score.ts source file](https://github.com/cassieview/SnakeVR/blob/master/src/score.ts)
4. Create `snake.ts`
   - [snake.ts source file](https://github.com/cassieview/SnakeVR/blob/master/src/snake.ts)
5. Create `particles.ts`
   - [snake.ts source file](https://github.com/cassieview/SnakeVR/blob/master/src/particles.ts)
6. Copy `assets` folder if you want to use the fruit 3D objects referenced in the `noms` file.

Then go back to `index.ts` and import errors should have been resolved.

Now would be a good time to `npm run build` or `npm start` to see that you completed the logic move successfully.

[<- Prev Step](step1.md) |
[Next Step ->](step3.md)
