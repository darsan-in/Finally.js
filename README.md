# Finally.js

**Finally.js** is a simple and efficient Node.js tool for deploying website files to an FTP server. It collects source files from a specified directory and pushes them to an FTP server using environment variable-based authentication for secure credential management. Additionally, it can be seamlessly integrated with GitHub Actions for automated deployment workflows.

## Features

- **Simple Deployment:** Easily deploy website files to your FTP server.
- **Environment Variable Authentication:** Securely manage FTP credentials through environment variables.
- **Automated File Transfer:** Automatically push files from the local directory to the FTP server.
- **Progress Tracking:** Track upload progress with a visual progress bar.
- **Error Handling:** Robust error handling and cleanup of temporary files.
- **GitHub Actions Integration:** Use with GitHub Actions for continuous deployment.

## Best Use Cases

- GitHub Actions integration for continuous deployment.
- Local deployment for development and testing purposes.

## Getting Started

### Prerequisites

- Node.js installed on your local machine or environment.

### Installation

1. Add finally.js to your project:

   ```bash
   npm install finally.js
   ```

### Configuration (optional⚠️)

1. Create a `finally.c.json` file in the root of your project with the following content:

   ```json
   {
     "host": "FTPSERV_ENV_VAR",
     "port": 21,
     "user": "FTPUSER_ENV_VAR",
     "password": "FTPPASS_ENV_VAR",
     "secure": false
   }
   ```

### Usage

1. Run the deployment script:

   ```bash
   finally -b dist -r /public_html
   ```

2. The script will connect to the FTP server and upload all files from the specified local directory to the target directory on the server.

### CLI Options

- `-b, --basePath <path>`: Base path of the files to upload (required)
- `-r, --remoteBasePath <path>`: Remote base path on the FTP server (required)
- `-i, --ignorePattern <patterns...>`: Patterns to ignore (optional, default: ["./node_modules/**", ".git/**"])
- `-n, --ftpVerbose`: Enable FTP verbose mode (optional)
- `-h, --host <host>`: FTP server host (default: from configured environment variable)
- `-p, --port <port>`: FTP server port (default: from configuration)
- `-u, --user <user>`: FTP server username (default: from configured environment variable)
- `-a, --password <password>`: FTP server password (default: from configured environment variable)
- `--secure`: Enable secure FTP connection (default: from configuration)

### Advanced Usage

To use Finally.js with additional options and custom configurations, you can pass more options through the CLI:

```bash
npx finally -b dist -r /public_html -i test/** devfiles/** --ftpVerbose -h ftp.example.com -p 21 -u exampleuser --password examplepass --secure
```

### Example

Here’s an example of how to use Finally.js to deploy files:

1. **Setup a Sample Project**: Create a sample project directory and add some files to a `dist` folder.

   ```bash
   mkdir sample-project
   cd sample-project
   mkdir dist
   echo "Hello World" > dist/index.html
   ```

2. **Create Configuration File (optional⚠️)**: In the `sample-project` directory, create a `finally.c.json` file with your FTP server details.

   ```json
   {
     "host": "FTPSERV_ENV_VAR",
     "port": 21,
     "user": "FTPUSER_ENV_VAR",
     "password": "FTPPASS_ENV_VAR",
     "secure": false
   }
   ```

3. **Deploy Files**: Run the deployment command.

   ```bash
   npx finally -b dist -r /public_html
   ```

### GitHub Actions Integration

To use Finally.js with GitHub Actions for continuous deployment, you can add the following workflow file to your repository:

```yaml
name: FTP Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4.1.7

      - name: Set up Node.js
        uses: actions/setup-node@v4.0.3
        with:
          node-version: "22"

      - name: Install Finally
        run: npm install finally.js

      - name: Deploy to FTP
        env:
          FTP_SERVER: ${{ secrets.FTP_SERVER }}
          FTP_USERNAME: ${{ secrets.FTP_USERNAME }}
          FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
        run: finally --basePath dist --remoteBasePath /public_html -h $FTP_SERVER -u $FTP_USERNAME --password $FTP_PASSWORD --port 21
```

In this example, make sure to add your FTP server credentials as secrets in your GitHub repository settings.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing

We welcome contributions to Finally.js! If you find a bug or have a feature request, please create an issue or submit a pull request on [GitHub](https://github.com/iamspdarsan/finally.js).

### Contact

For any questions or inquiries, please contact the author:

**Darsan**

- Email: [hello@darsan.in](mailto:hello@darsan.in)
- GitHub: [iamspdarsan](https://github.com/iamspdarsan)
