# waffles.

## Description

This project is designed to enhance the driving experience by integrating traffic monitoring, music playback based on traffic conditions, and news reading functionalities into one platform. It's ideal for commuters looking to stay informed and entertained during their drives. waffles uses React for the frontend, Node.js for the backend, and Python for handling the core functionalities including traffic data interpretation, music selection, and news reading.

## PORTS

`React (Frontend): Port 3000`

`Nodejs (Backend): Port 8000`

(make sure to have these two avail thx)

## Installation

BEFORE CONTINUING MAKE SURE U CAN NODEJS AND REACT THANKS

To install this project, follow these steps:

1. Clone the repository to your local machine (make sure the bloody link still works):
```
git clone https://github.com/ceewaigithub/waffles.git
```
2. Navigate to the project directory:
```
cd waffles
```
3. UPDATE config.py and settings.py under server/config/*, when I mean update I mean put your API keys 🔑.

News API:
```
https://newsapi.org/docs/client-libraries/python
```

4. install python packages

```
pip3 install -r requirements.txt
```

5. Run the shell script on LINUX/MAC:
```
bash compile_run.sh
```
OR batch file on windows:
```
./compile_run.bat
```
6. (if you want) Running containers, make sure u have docker installed and open up the daemon in the background. run the following command:
(keep in mind that in the future, we will have to add a build script to the backend's package.json if we need to build something like TypeScript)

```
docker-compose up --build
```

7. Ensure you have Python installed on your machine as the project uses Python scripts for traffic monitoring, music selection, and news reading functionalities.
Your default web browser should open automatically to `http://localhost:3000` where you can interact with the application.



## Features

- Traffic monitoring: The application provides real-time traffic monitoring to help users plan their routes efficiently.
- Music playback based on traffic conditions: The application selects music based on the current traffic conditions to enhance the driving experience.
- News reading: Users can listen to news articles while driving, keeping them informed and entertained.

## Dependencies

The project has the following dependencies:

- React: ^16.8.0
- Node.js: ^12.0.0
- Python: ^3.0.0

Please ensure you have these dependencies installed on your machine before running the application.

## Roadmap

We have the following plans for future development:

- Integration with additional music streaming services.
- Enhanced traffic data interpretation and analysis.
- Personalized news reading based on user preferences.

