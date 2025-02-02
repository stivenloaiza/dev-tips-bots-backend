<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Bot Tips

## Description

This project is a Discord and Telegram bot developed with NestJS, designed to send information about current programming language updates (tips) to a specific Discord channel. The tips include a title, description, documentation link, language, and developer level (junior or senior).

The bot consumes an API that contains programming tips and automatically sends them to a Discord channel based on the frequency specified by the user (daily, weekly, or monthly). Additionally, it saves the sent tips in a MongoDB database to avoid sending the same tip multiple times.

## Technologies Used

- **NestJS**: Framework for creating server-side applications.
- **Discord.js**: Library for interacting with the Discord API.
- **Node-Telegram-Bot-API**: Library for interacting with the Telegram API.
- **MongoDB**: NoSQL database used to store sent tips.
- **Mongoose**: Data modeling library for MongoDB and Node.js.
- **Swagger**: Tool for API documentation.

## Dependencies

- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/mongoose`
- `@nestjs/swagger`
- `class-validator`
- `discord.js`
- `Node-Telegram-Bot-API`
- `mongoose`

## Project Setup

### Requirements:
- **NodeJs** (v14 or higher).
- **MongoDB:** Version 4.4 or higher.
- **npm** (v6 or higher).

### Step by Step

1. **Clone the Repository**
    ```bash
    git clone https://github.com/stivenloaiza/dev-tips-bots-backend.git
    cd discord-bot-tips
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment Variables**
    Create a `.env` file at the root of the project with the following properties:
    ```env
    # Database configuration for localhost Server
    
    DB_CONNECTION = mongodb://
    DB_HOST = localhost:27017
    MONGO_HOST = mongodb+srv:/
    DB_NAME = db_name
    DB_USER = db_user
    DB_CLUSTER = @cluster-name
    DB_PASSWORD = db-password
    ENVIROMENT = 'production'

    AUTH_URL = 
    BOT_APIKEY = 
    BOT_TOKEN = 
    TELEGRAM_BOT_TOKEN = 
    ```

4. **Start the Project**
    ```bash
    npm run start
    ```

5. **Access Swagger Documentation**
    - URL: `http://localhost:3000/api-doc`

6. **Endpoint to Send a Tip**
    - URL: `http://localhost:3000/discord-bot/tip`
    - Method: `POST`
    - JSON Format:
      ```json
      "Example:" 
        {
          "multimedia_url": "http://example.com/image.png",
          "title": "How to use Docker",
          "body": "Here is a quick tip on using Docker effectively...",
          "link": "http://example.com/docker-guide",
          "level": "Junior",
          "lang": "English",
          "technology": "Docker",
          "subtechnology": "Docker Compose",
          "channelId": "123456789",
          "channel": "discord"
        }
      ```

## URL to Install the Bot in the Discord Channel

Click here to [install Bot](https://discord.com/oauth2/authorize?client_id=1256684001209487511&permissions=8&integration_type=0&scope=bot), and select channel.

## Contribution

If you want to contribute to this project, please open an issue or submit a pull request with your improvements.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
