# User Management SPA

This is a really simple User Management SPA that show the usage of Next.js with TypeScript.

## Before you start

First rename `.env-sample` file to `.env`. It contains all default values for proper work on your local machine.

```
GRAPHQL_ENDPOINT_URL=
```

## How to run it

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## How to deploy on AWS Elastic Beanstalk

Download the Elastic Beanstalk (EB) command line tool which will be used to deploy the docker container manually from your machine. Follow these instructions on how to set up the [EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html).

Don't forget to change `GRAPHQL_ENDPOINT_URL` value in the `.env` file to your production URL of API.

Open `/frontend` directory in terminal. The first command to run is `eb init`. The init command configures Elastic Beanstalk for your project.

If it is your first time using `eb cli`, the first thing it will ask is for your user credentials, so paste in your access keys.

Once the init command successfully finishes, notice there is a new directory in your project called .elasticbeanstalk which contains the generated configurations. Now you can create a new environment to deploy to by running `eb create`.

It should take a few minutes for your application to be created.

🎉🎉🎉 Check you AWS account and make sure everything went well.
