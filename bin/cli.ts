#!/usr/bin/env node
import { Command } from "commander";
import configurations from "../configLoader";
import { vehicle } from "../lib/vehicle";

const program = new Command();

program
  .name("finally")
  .description("CLI for uploading files via FTP")
  .version("1.0.0")
  .requiredOption("-b, --basePath <path>", "Base path of the files to upload")
  .requiredOption(
    "-r, --remoteBasePath <path>",
    "Remote base path on the FTP server"
  )
  .option("-i, --ignorePattern <patterns...>", "Patterns to ignore", [])
  .option("-n, --ftpVerbose", "Enable FTP verbose mode", false)
  .option("-h, --host <host>", "FTP server host", configurations.host)
  .option("-p, --port <port>", "FTP server port", `${configurations.port}`)
  .option("-u, --user <user>", "FTP server username", configurations.user)
  .option(
    "-a, --password <password>",
    "FTP server password",
    configurations.password
  )
  .option("--secure", "Enable secure FTP connection", configurations.secure)
  .action(async (options) => {
    try {
      await vehicle(options);
      console.log("Files were deployed successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  });

program.parse(process.argv);
