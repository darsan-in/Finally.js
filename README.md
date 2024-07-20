## Finally

### Overview

**Finally** is a simple and efficient Node.js tool for deploying website files to an FTP server. It collects source files from a specified directory and pushes them to an FTP server using environment variable-based authentication for secure credential management.

### Features

- **Simple Deployment:** Easily deploy website files to your FTP server.
- **Environment Variable Authentication:** Securely manage FTP credentials through environment variables.
- **Automated File Transfer:** Automatically push files from the local directory to the FTP server.

### Best Use cases

- With Github Action
- Local Deployment

### Getting Started

#### Prerequisites

- Node.js installed on your local machine or environment.

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamspdarsan/finally.git
   cd finally
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

#### Configuration

1. Set the following environment variables in your `finally.json` file:

```json
{
  "FTP_SERVER": "ftp.example.com",
  "FTP_USERNAME": "exampleuser",
  "FTP_PASSWORD": "examplepass",
  "FTP_TARGET_DIR": "/",
  "LOCAL_DIR": "/dist"
}
```

#### Usage

1. Run the deployment script:

   ```bash
   npx finally
   ```

2. The script will connect to the FTP server and upload all files from the specified local directory to the target directory on the server.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
