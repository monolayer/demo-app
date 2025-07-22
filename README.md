# Monolayer demo

App build with Next.js and the monolayer SDK.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/orm/)

## Requirements

- [Docker](https://www.docker.com) in installed in your local development environment.

## Getting Started

```bash
mkdir demo-app
cd demo-app
npx degit https://github.com/monolayer/demo-app
npm install
```

## Running Locally

Start the local environment with:

```bash
npm monolayer start dev
```

Then, run the database migrations and seed the database:

```bash
npm db:bootstrap
```

Finally, run the Next.js development server:

```bash
npm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.
