import dotenv from "dotenv";

const environmentFound = dotenv.config();

if (environmentFound.error) {
  console.log("*****Dot Env File Not Found*****");
}

const decimal = (value) => {
  return value ? Number.parseInt(value, 10) : 0;
};

export default {
  PORT: decimal(process.env["PORT"]),
  MONGODB: process.env["MONGODB_CONNECTION"],
  SECRET_KEY: process.env["SECRET_KEY"],
};
