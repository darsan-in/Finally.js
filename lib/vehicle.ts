import { Client } from "basic-ftp";
import { SingleBar } from "cli-progress";
import { copyFile, rm } from "fs/promises";
import { globSync } from "glob";
import { dirname, join, relative } from "path";
import configurations from "../configLoader";
import { batchProcess, makeDirf } from "./utils";

/* vehicle completion funtion */
function _complete(
  resolve: () => void,
  startTime: Date,
  progress: SingleBar
): void {
  const end: Date = new Date();
  progress.stop();

  console.log("Taken Seconds: " + (end.getTime() - startTime.getTime()) / 1000);

  resolve();
}

export async function vehicle(
  basePath: string,
  remoteBasePath: string = "/",
  ignorePattern: string[] = [],
  ftpVerbose: boolean = false
): Promise<void> {
  //process starting time
  const startTime: Date = new Date();

  /* default ignore pattern */
  ignorePattern =
    ignorePattern.length !== 0
      ? ignorePattern
      : ["./node_modules/**", ".git/**"];

  const productionFiles = globSync("**/*", {
    ignore: ignorePattern,
    absolute: true,
    cwd: join(process.cwd(), basePath),
    nodir: true,
    dot: true,
  });

  const tempDir: string = join(process.cwd(), ".finally");

  //copy file to tempdir
  const promises: (() => Promise<void>)[] = [];

  productionFiles.forEach((sourcePath: string) => {
    //mk dir if not exist
    makeDirf(dirname(sourcePath));

    const destinationPath: string = join(
      tempDir,
      relative(process.cwd(), sourcePath)
    );

    promises.push((): Promise<void> => {
      return copyFile(sourcePath, destinationPath);
    });
  });

  await batchProcess(promises, 35);

  return new Promise((resolve, reject) => {
    //ftp client
    const client = new Client();

    //handling ftp communication verbose
    client.ftp.verbose = ftpVerbose;

    //progress bar
    const progress = new SingleBar({
      format: `Upload Progress | {bar} | {percentage}% || Uploaded: {value}/{total}`,
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    client.trackProgress((info) => {
      if (info.type === "upload" && info.bytes !== 0) {
        progress.increment();
      }
    });

    //authenticating
    client
      .access(configurations)
      .then(() => {
        console.log("FTP Access Granted");

        //start the progress
        progress.start(productionFiles.length, 0);

        console.log("Uploading Files");
        //uploading
        client
          .uploadFromDir(tempDir, remoteBasePath)
          .then(() => {
            //closing session
            client.close();

            //remove tempfiles
            rm(tempDir, { force: true, recursive: true }).catch(console.warn);

            _complete(resolve, startTime, progress);
          })
          .catch(reject);
      })
      .catch(reject);
  }); //promise
}
