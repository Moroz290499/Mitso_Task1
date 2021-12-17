const { Transform } = require("stream");
const { math } = require("./code");
const { mathArr } = require("./code");

class MathTransform extends Transform  {
  constructor(task) {
    super();
    this.task=task;
    
  }

  _transform(chunk, _, done) {
    console.log("start transform");
    let task1 = null;
    switch (this.task) {    
      case '1':
        task1 = math(chunk.toString("utf8"));
        break;
      case '2':
        task1 = mathArr(chunk.toString("utf8"));
        break;
    }
          
    this.push(task1);
    done();
  }
}

module.exports = MathTransform;
