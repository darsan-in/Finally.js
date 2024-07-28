#!/usr/bin/env node
import { Command } from "commander";
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
  .option("--ftpVerbose", "Enable FTP verbose mode", false)
  .requiredOption("--host <host>", "FTP server host")
  .requiredOption("--port <port>", "FTP server port")
  .requiredOption("--user <user>", "FTP server username")
  .requiredOption("--password <password>", "FTP server password")
  .option("--secure", "Enable secure FTP connection", false)
  .action(async (options) => {
    try {
      await vehicle(options);
      console.log("Files were deployed successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  });

program.parse(process.argv);
