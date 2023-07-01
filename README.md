# TODO app
Just another TODO app.

## Local setup guide

### Prerequisites

- Make sure that ports `8080`, `5432` and `3000` are free on your local machine
- Make sure you have docker and docker-compose installed
  - I used docker `v24.0.2` and docker-compose `v2.18.1` but I am sure it works with older version, too

### Setup guide

A `Makefile` was prepared to make the local setup as easy and convenient as possible.
Take a look at the file to see the exact commands that are being executed. Also, you can check `README.md` file
in both `frontend` and `backend` folders for more information.

1. Setup both frontend and backend:
    ```bash
    make setup
    ```
2. Run both backend and frontend:
   ```bash
   make run
   ```

## Implemented stories
- I as a user can create to-do items, such as a grocery list
- I as another user can collaborate in real-time with user - so that we can
  (for example) edit our family shopping-list together
- I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on
  things that are still pending
- I as a user can create multiple to-do lists where each list has it's unique URL that I can
  share with my friends - so that I could have separate to do lists for my groceries and
  work related tasks
- I as a user can be sure that my todos will be persisted so that important information is
  not lost when server restarts
