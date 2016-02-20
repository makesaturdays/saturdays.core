An integral part of __Make__ Saturdays is transparency. Transparency with funding and pricing, with the design and research processes, and with code as well. Evidently, every software project out there makes use of open sourced code from different communities across the Internet. We'd like to contribute as well and every line of code we write will be available here on GitHub.

## saturdays.core
The [saturdays.core](https://github.com/makesaturdays/saturdays.core) project is the code repository that powers our [makesaturdays.com](https://makesaturdays.com). Our intentions with this is to build a solid foundation for developping e-commerce businesses efficiently without the constraints of current cloud hosted platforms. We're open to all comments and [contributions](https://github.com/makesaturdays/saturdays.core/pulls), as well as [bug reports](https://github.com/makesaturdays/saturdays.core/issues) of course.

It's design and development will work towards these basic principles:

1. Express ideas or introduce concepts in plain words
2. Be mindful of existing user representations or perceptions
3. Provide consistent design patterns
4. Aim to reduce cognitive load
5. Protect the user's data
6. Be helpful when things go wrong
7. Always permit undoing

Technically, saturdays.core runs on a Python 3.5 [Flask](http://flask.pocoo.org/) app with a [MongoDB 3.2](https://docs.mongodb.org/manual/) database, [Grunt](http://gruntjs.com/) for running compilation tasks, [Celery](http://docs.celeryproject.org/en/latest/index.html) for its asynchronous task manager, [Elasticsearch](https://www.elastic.co/products/elasticsearch) for its search capabilities, and [Stripe Connect](https://stripe.com/connect) as its payment processor.

### Getting Started
To run the saturdays.core source code locally on your own machines, you'll need to install the following:

1. Node.js: https://nodejs.org/en/
2. Grunt: http://gruntjs.com/getting-started
3. Python 3.5: https://www.python.org/downloads/

After [cloning this repository](https://github.com/makesaturdays/saturdays.core) run the following commandes in your terminal to install the required dependencies:

1. `cd path/to/your/repository`
2. `npm install`
3. `grunt install`

Once everything's successfully installed, run the following in seperate terminal windows to power a local server and livereloadable Sass, CoffeeScript and Handlebars compile tasks:

1. `grunt start`
2. `grunt compilers`

A good place to start is at the [saturdays/templates](https://github.com/makesaturdays/saturdays.core/tree/master/saturdays/templates) layout files and look into the [saturdays/source/scss](https://github.com/makesaturdays/saturdays.core/tree/master/saturdays/source/scss) styles and [saturdays/source/coffee](https://github.com/makesaturdays/saturdays.core/tree/master/saturdays/source/coffee) scripts folders.

### Setting up MongoDB

By default, saturdays.core attempts to connect to local MongoDB database with the URI `mongodb://127.0.0.1:27017/database`. However we recommend setting up a secure MongoDB deployment with [compose.io](https://compose.io/mongodb/), and once you have a new URI, you may update your environment variable by running the commands:

1. `source environment/bin/activate`
2. `export MONGO_URI='mongodb://127.0.0.1:27017/database'`

Don't hesitate to get in touch if there's anything we can help with: makesaturdays@gmail.com
