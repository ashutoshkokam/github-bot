const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const log = require("simple-node-logger");

const FILE_PATH = "./data.json";
const FILE_PATH_LOG = "./mylogfiles/logfile.log";

const loggerOpts = {
  logFilePath: FILE_PATH_LOG,
  timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
};

const logger = log.createSimpleLogger(loggerOpts);

//a function to make commits
const makeRandomCommits = (n) => {
  if (n === 0) {
    simpleGit().push();
    logger.log("info", "==========END Commiting=======");
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const DATE = moment()
    .subtract(1, "year")
    .add(1, "day")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date: DATE };
  const dataLog = { date: DATE, count: n };

  //jsonfile.writeFileSync(FILE_PATH_LOG, dataLog, { flag: "a" });

  logger.log("info", JSON.stringify(dataLog));
  //console.log(DATE, n);
  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE }, makeRandomCommits.bind(this, --n));
  });
};

logger.log("info", "==========START Commiting=======");
makeRandomCommits(25);
