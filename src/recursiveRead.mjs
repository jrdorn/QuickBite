//temp, delete if no longer needed

let recursiveRead = (myAdd) => {
  rl.question(
    chalk.green(`\nYour address is: ${myAdd}\n\nIs that correct? (y/n) `),
    (a) => {
      let answer = a[0].toLowerCase();
      //base case, for recursion: close readline and return
      if (answer === "y") {
        return rl.close();
        //prompt for address if user selects "no"
      } else if (answer === "n") {
        console.log("prompt for address");
      } else {
        //Recurse
        recursiveRead(a);
      }
    }
  );
};

recursiveRead(myAdd);
rl.on("close", () => {
  console.log("Goodbye.\n");
  process.exit(0);
});
