const { Parser } = require("json2csv");
const fs = require("fs");
const _ = require("lodash");
const data = [[1, 2], [3, 4], [5]];
const cartesianProduct = arr => {
  return arr.reduce(
    (a, b) => {
      return a
        .map(x => {
          return b.map(y => {
            return x.concat([y]);
          });
        })
        .reduce((a, b) => {
          return a.concat(b);
        }, []);
    },
    [[]]
  );
};
const add_answer_in_choice = (choices, answer) => {
  return choices.map(choice => {
    return [...choice, answer];
  });
};
const create_label = count => {
  let name = "choice";
  let label = [];
  for (let i = 1; i <= count; i++) {
    label.push(name + i);
  }
  label.push("answer");
  return label;
};
const arr_to_json = (pre_csv , label ) => pre_csv.map(v => _.zipObject(label, v))

let choice = JSON.parse(JSON.stringify(cartesianProduct(data), null, 4));
const pre_csv = add_answer_in_choice(choice, 12);
console.log(pre_csv);
//[ [ 1, 3, 5, 12 ], [ 1, 4, 5, 12 ], [ 2, 3, 5, 12 ], [ 2, 4, 5, 12 ] ]
let count_choice = data.length;
console.log(count_choice);
//3
const label = create_label(count_choice);
console.log(label);
//[ 'choice1', 'choice2', 'choice3', 'answer' ]
let ready_csv = arr_to_json(pre_csv, label);
console.log(ready_csv);
// [
//     { choice1: 1, choice2: 3, choice3: 5, answer: 12 },
//     { choice1: 1, choice2: 4, choice3: 5, answer: 12 },
//     { choice1: 2, choice2: 3, choice3: 5, answer: 12 },
//     { choice1: 2, choice2: 4, choice3: 5, answer: 12 }
//   ]

const parser = new Parser({
  fields: label,
  unwind: label
});

const csv = parser.parse(ready_csv);
fs.writeFile("file.csv", csv, function(err) {
  if (err) throw err;
  console.log("file saved");
});
