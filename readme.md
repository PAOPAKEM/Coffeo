Node.js Installation

Before you started, make sure you have the following prerequisites installed which are:

    A terminal or command prompt
    A reliable internet connection

Installation Steps
Step 1: Download Node.js

Visit the official Node.js website at https://nodejs.org and click on the "Downloads" tab.
Choose the appropriate version for your operating system. For instane, Linux / Windows / Macintosh

Step 2: Run the installer

Step 3: Add Path environmet. Setting > Advance System Setting > Environment variable > Add Path


Express.js Installation
Step 1: download the project and Extract ZIP files then open terminal and follow this command 
	
	cd gr9_pj1_ID_006_014_080_096/

Step 2: Initialize the Project
	npm init -y

Step 3: Install Express.js
	npm install express

MySQL Database Installation
Step 1: Download MySQL Installer

Visit the official MySQL website at https://dev.mysql.com/downloads/installer/ 

Step 2: Verify MySQL Installation
	mysql --version


To RUN this Project 
in order to run this project we have 2 option
1 Download and RUN on the local Mechine
2 RUN on Ubuntu Server


To download and RUN locally on the Local Mechine

Step 1: install NPM in order to Generate package.json
	npm install

Step 2: Go to MySQL workbench Click connect to the workbench to starts the MySQL server or type this command to the terminal
	sqlcmd 

Step 3: use the command below to starts the project
	npm start

To run on Ubuntu server

Step 1: Open the "Settings"

Step 2: Go to "Apps" and then "Optional Features."

Step 3: find "OpenSSH Client" and "OpenSSH Server." then install

Step 4 : check the installation by
	ssh -V


After ssh installation, open new terminal

Step 5: ssh team19@203.159.93.114

Step 6: then type the Password: GZBzktg9

Step 7: open 2 terminal for Client and Service

Step 8: type the following command
	npm start
