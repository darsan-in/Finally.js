import { Client } from "basic-ftp";
import { SingleBar } from "cli-progress";
import { copyFile, rm } from "fs/promises";
import { globSync } from "glob";
import { dirname, join, relative } from "path";
import configurations from "../configLoader";
import { ConfigurationOptions } from "./options";
import { batchProcess, makeDirf } from "./utils";

const tempDir: string = join(process.cwd(), ".finally");

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

async function _processFiles(
  basePath: string,
  ignorePattern: string[]
): Promise<number> {
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

  return productionFiles.length;
}

function _upload(
  remoteBasePath: string,
  configurations: ConfigurationOptions,
  numberOfFiles: number,
  startTime: Date,
  ftpVerbose: boolean
): Promise<void> {
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
        progress.start(numberOfFiles, 0);

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

export async function vehicle({
  basePath,
  remoteBasePath = "/",
  ignorePattern = [],
  ftpVerbose = false,
  host = configurations.host,
  port = configurations.port,
  user = configurations.user,
  password = configurations.password,
  secure = configurations.secure,
}: {
  basePath: string;
  remoteBasePath: string;
  ignorePattern: string[];
  ftpVerbose: boolean;
} & ConfigurationOptions): Promise<void> {
  //process starting time
  const startTime: Date = new Date();

  const numberOfFiles: number = await _processFiles(basePath, ignorePattern);

  const localConfig: ConfigurationOptions = {
    host: host,
    port: port,
    user: user,
    password: password,
    secure: secure,
  };

  return _upload(
    remoteBasePath,
    localConfig,
    numberOfFiles,
    startTime,
    ftpVerbose
  );
}
