![PixelShare](readme-src/banner.png)

# [PixelShare API](https://github.com/PixelShareInc/API "PixelShare API")

[![Build Status](https://travis-ci.org/derekkramer/pixelshare.svg?branch=master)](https://travis-ci.org/derekkramer/pixelshare)
[![GitHub release](https://img.shields.io/github/release/derekkramer/pixelshareAPI.svg)]()
[![Maintainability](https://api.codeclimate.com/v1/badges/488915244bb49c3e604b/maintainability)](https://codeclimate.com/github/derekkramer/pixelshareAPI/maintainability)
[![Issue Count](https://codeclimate.com/github/derekkramer/pixelshareAPI/badges/issue_count.svg)](https://codeclimate.com/github/derekkramer/pixelshareAPI)
[![Dependencies Status](https://david-dm.org/PixelShareInc/API.svg)](https://david-dm.org/PixelShareInc/API)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fderekkramer%2FpixelshareAPI.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fderekkramer%2FpixelshareAPI?ref=badge_shield)

---

**PixelShare** is a simple and easy-to-use amalgamated art project inspired by [Jordan Fred](https://github.com/JCFred). Users can access the quilt without login and can add their own pixel art to it. The API uses a [NodeJS](https://nodejs.org) back end with [Express](https://expressjs.com) and [MongoDB](https://mongodb.com).  

## Table of contents

- [Installation for Development](#Installation)
- [Community Resources](#Resources)
- [License](#License)

## <a name="Installation"><a>Installation for Development

First ensure that you have Node and Git installed by entering:

```
$ brew update
$ brew install node
$ brew install git
```

Ensure that you have MongoDB installed:

```
$ mongod --version
```

If you don't have MongoDB installed, either follow the [instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) on their website, or install using brew with [Treehouse](https://treehouse.github.io/installation-guides/mac/mongo-mac.html).

Once you've installed MongoDB, in a separate terminal window, start the service:

```
$ mongod
```

Then, in your original terminal window, navigate into the directory where you want to clone the repository and enter:

```
$ git clone https://www.github.com/derekkramer/pixelshareAPI.git
```

Navigate into the repository directory and install dependencies:

```
$ npm install
```

Then create the `pixelshare` database, collections, and documents:

```
$ node db/migrate.js
$ node db/seed.js
```

Finally start the API server by running:

```
$ npm start
```

As it says in the terminal, the PixelShare development API is now available at `localhost:3001`

## <a name="Resources"><a>Community Resources


##### &emsp;&emsp;&emsp;&emsp;&emsp; [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/591px-Node.js_logo_2015.svg.png" height="50" align="top">](https://nodejs.org)
##### &emsp;&emsp;&emsp;&emsp;&emsp; [<img src="http://www.amt.in/img/services/express.png" height="50" align="top">](https://expressjs.com)
##### &emsp;&emsp;&emsp;&emsp;&emsp; [<img src="https://cdn-images-1.medium.com/max/1200/1*grduxDaLhR2W-JXPqNJ4uw.png" height="50" align="top">](http://www.socket.io)
##### &emsp;&emsp;&emsp;&emsp;&emsp; [<img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB-Logo-5c3a7405a85675366beb3a5ec4c032348c390b3f142f5e6dddf1d78e2df5cb5c.png" height="50" align="top">](https://mongodb.com)

## <a name="License"><a>License

The MIT License (MIT)

Copyright &copy; 2018 Derek Kramer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
