# waffles.

## Description

This project is designed to enhance the driving experience by integrating traffic monitoring, music playback based on traffic conditions, and news reading functionalities into one platform. It's ideal for commuters looking to stay informed and entertained during their drives. The Traffic LLM DJ Platform uses React for the frontend, Node.js for the backend, and Python for handling the core functionalities including traffic data interpretation, music selection, and news reading. This project was built to showcase how different technologies can work together seamlessly to provide a valuable service.

## PORTS
React: Port 80
Nodejs: Port 8000

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
3. Run the shell script on LINUX/MAC or the batch file on windows:
```
bash compile_run.sh
```
OR
```
./compile_run.bat
```
4. UPDATE config.py and settings.py under server/config/*, when I mean update I mean put your API keys.

5. (if you want) Running containers, make sure u have docker installed and open up the daemon in the background. run the following command:
(keep in mind that in the future, we will have to add a build script to the backend's package.json if we need to build something like TypeScript)

```
docker-compose up --build
```

6. ya thats about it lol

Ensure you have Python installed on your machine as the project uses Python scripts for traffic monitoring, music selection, and news reading functionalities.
Your default web browser should open automatically to `http://localhost:3000` where you can interact with the application.

## Contributing

This is how u contribute if you're part of the group:
1. just push to main branch and make sure we dont touch the same files.

BUT FOLLOW THESE IF YOURE NOT PART OF THE 5:
1. Fork the repository.
2. Create a new branch: `git checkout -b your-branch-name`.
3. Make your changes and commit them: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin your-branch-name`.
5. Create a new pull request.
Please ensure your code adheres to the project's coding standards and includes appropriate tests. Contributions without tests are unlikely to be accepted.

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

## Troubleshooting

If you encounter any issues while using the application, try the following troubleshooting steps:

1. Make sure you have all the required dependencies installed and properly configured.
2. Check if there are any error messages in the console or logs.
3. Restart the application and try again.
4. If the issue persists, please open an issue on the project's GitHub repository for further assistance (or uk just msg the group).

## Roadmap

We have the following plans for future development:

- Integration with additional music streaming services.
- Enhanced traffic data interpretation and analysis.
- Personalized news reading based on user preferences.

Stay tuned for these exciting features in future releases!

## Changelog

- Version 0.0.1 (2024-16-03): Initial creation of React, Nodejs and python modules and components.

## License

LOL WGT license
