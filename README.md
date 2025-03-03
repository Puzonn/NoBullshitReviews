# NoBullshitReviews

NoBullshitReviews is a web application with a React frontend and an ASP.NET backend. This README provides a quick start guide to set up and run the project using Docker.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Run

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/NoBullshitReviews.git
cd NoBullshitReviews
```

2. **Start the application using Docker Compose:**

```bash
docker-compose up --build
```

3. **Access the application:**

- Frontend (React) will be available at: [http://localhost:3000](http://localhost:3000)
- Backend (ASP.NET) will be available at: [http://localhost:5000](http://localhost:5000)

## Stopping the application

To stop the application, use:

```bash
docker-compose down
```

## Development

For development, you can modify the frontend and backend code while Docker is running. Changes should be reflected automatically if hot-reloading is enabled.

---

Happy coding! 🚀

