import fs from "fs";
import util from "util";

const logFile = fs.createWriteStream(__dirname + "/../../error.log", {
  flags: "a",
});

export const errorHandler = (e: Error): void => {
  const timestamp = new Date();
  const { name, stack, message } = e;
  logFile.write(
    util.format(
      `---${timestamp}---\nName: ${name}, Message: ${message}, \nStack: ${stack}\n\n`
    )
  );
  console.log(e);
};

export const dbErrorHandler = (e: any): void => {
  const timestamp = new Date();
  const {
    length,
    name,
    severity,
    code,
    detail,
    hint,
    position,
    internalPosition,
    internalQuery,
    where,
    schema,
    table,
    column,
    dataType,
    constraint,
    file,
    line,
    routine,
  } = e;
  logFile.write(
    util.format(
      `---${timestamp}---\nName: ${name}, Code: ${code}, Detail : ${detail}, Where : ${where}, Table : ${table}, Column : ${column}, Constraint : ${constraint}}`
    ) + "\n"
  );
  console.log(e);
  // const logStdout = process.stdout; // print to console
  // logStdout.write(util.format(e) + "\n");
};
