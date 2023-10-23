# Insight Platform

Welcome to the Insight Platform repository. This project requires Apache (XAMPP or Laragon), MySQL server and npm with specific configurations to run. Follow the steps below to set up and run the project.

## Prerequisites

Before you can run the project, make sure you have the following prerequisites installed on your system:

- Apache server (XAMPP, Laragon, or equivalent)
- MySQL server with the following configurations:
  - Username: root
  - Password: (no password)
  - Port: 3306
- Git (to clone this repository)


## Installation

1. **Install and Configure Apache Server**:

   - Download and install Apache server. You can use [XAMPP](https://www.apachefriends.org/index.html) or [Laragon](https://laragon.org/).

2. **Configure MySQL Server**:

   - Open your MySQL server and configure it with the following settings:
     - Username: root
     - Password: (no password)
     - Port: 3306

If you have different config for MySQL server, please go to client/insight/insight/settings.py and replace your config in DATABASES object.

3. **Create a MySQL Database**:

   - Create a new MySQL database and name it `insight_database`.

## Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git
cd repository-name

```
## Running the Project

### On Windows

1. **Open a PowerShell Terminal**.

2. **Run the `runScripts.ps1` Script**:

```powershell
./runScripts.ps1

```

On macOS or Linux
1. **Open a  Terminal**.

2. **Run the `runScripts.sh` Script**:

bash
./runScripts.sh
```


The scripts will start the necessary components of the project. Please follow any further instructions provided by the project.