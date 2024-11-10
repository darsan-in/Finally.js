<div align="center">

# Finally.js - Effortless FTP Deployments for Your Website

<p id="intro">Finally.js is a Node.js tool for seamlessly deploying website files to an FTP server. It automates the process of collecting files from a specified directory and ensures secure authentication through environment variables. Ideal for developers looking to streamline their deployment process, Finally.js can be effortlessly integrated with GitHub Actions for automated deployments.</p>

### Supported Platforms

[![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)]()
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)]()
[![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()

---

<p>

<span>
  <a href="https://github.com/darsan-in/Finally.js/commits/main">
    <img src="https://img.shields.io/github/last-commit/darsan-in/Finally.js?display_timestamp=committer&style=for-the-badge&label=Updated%20On" alt="GitHub last commit"/>
  </a>
</span>

<span>
  <a href="">
    <img src="https://img.shields.io/github/commit-activity/m/darsan-in/Finally.js?style=for-the-badge&label=Commit%20Activity" alt="GitHub commit activity"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/darsan-in/Finally.js?style=for-the-badge&label=License" alt="GitHub License"/>
  </a>
</span>

<span>
  <a href="https://github.com/darsan-in/Finally.js/releases">
    <img src="https://img.shields.io/github/v/release/darsan-in/Finally.js?include_prereleases&sort=date&display_name=tag&style=for-the-badge&label=Latest%20Version" alt="GitHub Release"/>
  </a>
</span>

</p>

<p>

<span>
  <a href="https://www.codefactor.io/repository/github/darsan-in/Finally.js/issues/main">
    <img src="https://img.shields.io/codefactor/grade/github/darsan-in/Finally.js?style=for-the-badge&label=Code%20Quality%20Grade" alt="CodeFactor Grade"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="">
    <img src="https://img.shields.io/npm/d18m/finally.js?style=for-the-badge&label=Downloads%20On%20NPM" alt="NPM Downloads"/>
  </a>
</span>

<span>
  <a href="">
    <img src="https://img.shields.io/github/stars/darsan-in/Finally.js?style=for-the-badge&label=Stars" alt="GitHub Repo stars"/>
  </a>
</span>

</p>

---

</div>

## Table of Contents 📝

- [Features and Benefits](#features-and-benefits-)
- [Use Cases](#use-cases-)
- [Friendly request to users](#-friendly-request-to-users)

- [Installation - Step-by-Step Guide](#installation---step-by-step-guide-)
- [Usage](#usage)

- [License](#license-%EF%B8%8F)
- [Contributing to Our Project](#contributing-to-our-project-)
- [Website](#website-)

- [Contact Information](#contact-information)
- [Credits](#credits-)

## Features and Benefits ✨

- **Automated File Collection**: Gathers files from a specified directory for deployment.
- **Secure Authentication**: Utilizes environment variables for secure FTP authentication.
- **GitHub Actions Integration**: Easily integrates with GitHub Actions for CI/CD pipelines.
- **Efficient Deployment**: Simplifies the process of deploying website files to an FTP server.
- **Customizable Directory**: Allows specification of the directory from which files are collected.
- **Node.js Compatible**: Built on Node.js, making it easy to integrate with existing Node.js projects.

## Use Cases ✅

- **Automated Website Deployment**: Deploy your website files to an FTP server automatically after each commit.
- **Secure FTP Uploads**: Use secure environment variables to authenticate FTP uploads without exposing credentials.
- **CI/CD Integration**: Seamlessly integrate with GitHub Actions to automate deployment in your CI/CD pipeline.
- **Custom Directory Deployment**: Deploy files from any directory you specify, giving you control over what gets uploaded.

---

### 🙏🏻 Friendly Request to Users

Every star on this repository is a sign of encouragement, a vote of confidence, and a reminder that our work is making a difference. If this project has brought value to you, even in the smallest way, **please consider showing your support by giving it a star.** ⭐

_"Star" button located at the top-right of the page, near the repository name._

Your star isn’t just a digital icon—it’s a beacon that tells us we're on the right path, that our efforts are appreciated, and that this work matters. It fuels our passion and drives us to keep improving, building, and sharing.

If you believe in what we’re doing, **please share this project with others who might find it helpful.** Together, we can create something truly meaningful.

Thank you for being part of this journey. Your support means the world to us. 🌍💖

---

## Installation - Step-by-Step Guide 🪜

### Prerequisites

- **Step 1:** Ensure you have Node.js installed on your local machine or environment.

### Installation

- **Step 2:** Add _Finally.js_ to your project:

  ```bash
  npm install finally.js
  ```

### Configuration (optional⚠️)

- **Step 3:** Create a `finally.c.json` file in the root of your project.

- **Step 4:** Add the following content to the `finally.c.json` file:

  ```json
  {
    "host": "FTPSERV_ENV_VAR",
    "port": 21,
    "user": "FTPUSER_ENV_VAR",
    "password": "FTPPASS_ENV_VAR",
    "secure": false
  }
  ```

- **Step 5:** Replace `FTPSERV_ENV_VAR`, `FTPUSER_ENV_VAR`, and `FTPPASS_ENV_VAR` with the respective environment variables for your FTP server.

## Usage

### Running the Deployment Script

- **Step 1:** Run the deployment script to upload your files:

  ```bash
  finally -b dist -r /public_html
  ```

- **Step 2:** The script will connect to the FTP server and upload all files from the specified local directory (`dist`) to the target directory (`/public_html`) on the server.

### CLI Options

_Finally.js_ provides a variety of CLI options to customize your deployment process:

- **`-b, --basePath <path>`**: Specifies the local base path of the files to upload. This option is required.
- **`-r, --remoteBasePath <path>`**: Specifies the remote base path on the FTP server. This option is required.
- **`-i, --ignorePattern <patterns...>`**: Defines patterns to ignore during the upload. The default is `["./node_modules/**", ".git/**"]`.
- **`-n, --ftpVerbose`**: Enables verbose mode for FTP, which provides detailed logs during the upload process.
- **`-h, --host <host>`**: Sets the FTP server host. By default, it is fetched from the configured environment variable.
- **`-p, --port <port>`**: Sets the FTP server port. By default, it is fetched from the configuration.
- **`-u, --user <user>`**: Sets the FTP server username. By default, it is fetched from the configured environment variable.
- **`-a, --password <password>`**: Sets the FTP server password. By default, it is fetched from the configured environment variable.
- **`--secure`**: Enables a secure FTP connection (FTPS). By default, it is determined by the configuration.

### Advanced Usage

You can pass additional options to _Finally.js_ for more advanced deployments:

```bash
npx finally -b dist -r /public_html -i test/** devfiles/** --ftpVerbose -h ftp.example.com -p 21 -u exampleuser --password examplepass --secure
```

In this example:

- Files from the `dist` folder will be uploaded to the `/public_html` directory on the FTP server.
- The folders `test` and `devfiles` will be ignored during the upload.
- FTP verbose mode is enabled to provide detailed logs.
- Custom FTP server credentials (`host`, `user`, `password`) are provided directly through the CLI.

### Example Deployment Process

Here's a step-by-step example of how to deploy files using _Finally.js_:

- **Step 1: Setup a Sample Project**: Create a sample project directory and add some files to a `dist` folder:

  ```bash
  mkdir sample-project
  cd sample-project
  mkdir dist
  echo "Hello World" > dist/index.html
  ```

- **Step 2: Create Configuration File (optional⚠️)**: In the `sample-project` directory, create a `finally.c.json` file with your FTP server details:

  ```json
  {
    "host": "FTPSERV_ENV_VAR",
    "port": 21,
    "user": "FTPUSER_ENV_VAR",
    "password": "FTPPASS_ENV_VAR",
    "secure": false
  }
  ```

- **Step 3: Deploy Files**: Run the deployment command to upload your files to the FTP server:

  ```bash
  npx finally -b dist -r /public_html
  ```

### GitHub Actions Integration

To automate deployments with _Finally.js_ using GitHub Actions, add the following workflow file (`.github/workflows/deploy.yml`) to your repository:

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
          node-version: "20"

      - name: Install Finally.js
        run: npm install finally.js

      - name: Deploy to FTP
        env:
          FTP_SERVER: ${{ secrets.FTP_SERVER }}
          FTP_USERNAME: ${{ secrets.FTP_USERNAME }}
          FTP_PASSWORD: ${{ secrets.FTP_PASSWORD }}
        run: finally -b dist -r /public_html -h ${{ secrets.FTP_SERVER }} -u ${{ secrets.FTP_USERNAME }} --password ${{ secrets.FTP_PASSWORD }} --port 21 --secure
```

**Key Points**:

- The workflow triggers on every push to the `main` branch.
- The workflow installs Node.js and _Finally.js_, checks out the code, and then runs the deployment command.
- FTP credentials are securely stored as secrets in your GitHub repository settings and referenced in the workflow file.

By following these steps, you can set up automated deployments directly from your GitHub repository to your FTP server.

## License ©️

This project is licensed under the [MIT](LICENSE).

## Contributing to Our Project 🤝

We’re always open to contributions and fixing issues—your help makes this project better for everyone.

If you encounter any errors or issues, please don’t hesitate to [raise an issue](../../issues/new). This ensures we can address problems quickly and improve the project.

For those who want to contribute, we kindly ask you to review our [Contribution Guidelines](CONTRIBUTING) before getting started. This helps ensure that all contributions align with the project's direction and comply with our existing [license](LICENSE).

We deeply appreciate everyone who contributes or raises issues—your efforts are crucial to building a stronger community. Together, we can create something truly impactful.

Thank you for being part of this journey!

## Website 🌐

<a id="url" href="https://www.npmjs.com/package/finally.js">npmjs - finally.js</a>

## Contact Information

For any questions, please reach out via hello@darsan.in or [LinkedIn](https://www.linkedin.com/in/darsan-in/).

## Credits 🙏🏻

Credit to [patrickjuchli](https://github.com/patrickjuchli) for the [basic-ftp](https://www.npmjs.com/package/basic-ftp) npm package.

---

<p align="center">

<span>
<a href="https://www.linkedin.com/in/darsan-in/"><img width='45px' height='45px' src="https://darsan.in/readme-src/footer-icons/linkedin.png" alt="Darsan at Linkedin"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://darsan.in/readme-src/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.youtube.com/@darsan-in"><img width='45px' height='45px' src="https://darsan.in/readme-src/footer-icons/youtube.png" alt="Darsan at Youtube"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://darsan.in/readme-src/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.npmjs.com/~darsan.in"><img width='45px' height='45px' src="https://darsan.in/readme-src/footer-icons/npm.png" alt="Darsan at NPM"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://darsan.in/readme-src/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://github.com/darsan-in"><img width='45px' height='45px' src="https://darsan.in/readme-src/footer-icons/github.png" alt="Darsan at Github"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://darsan.in/readme-src/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://darsan.in/"><img width='45px' height='45px' src="https://darsan.in/readme-src/footer-icons/website.png" alt="Darsan Website"></a>
</span>

<p>

---

#### Topics

<ul id="keywords">
<li>ftp deployment</li>
<li>node.js deployment tool</li>
<li>automated website deployment</li>
<li>github actions integration</li>
<li>ftp server</li>
<li>secure authentication</li>
<li>ci/cd pipeline</li>
<li>web development</li>
<li>ftp upload</li>
<li>environment variables</li>
<li>node.js</li>
<li>website deployment</li>
<li>automated deployment</li>
<li>ftp automation</li>
<li>ftp tool</li>
<li>deploy website</li>
<li>file transfer</li>
<li>web hosting</li>
<li>ftp integration</li>
<li>ftp client</li>
</ul>
