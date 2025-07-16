# Dynamic Odds Table Application

This is a dynamic, client-side web application built with Next.js and React that displays sports betting odds from a local JSON data source. It features a real-time search, a detailed match view with a live countdown timer, and a sophisticated table layout that intelligently pivots and formats complex odds data.

## Features

- **Dynamic Data Loading**: Imports and parses a large, complex `data.json` file.
- **Real-time Search**: Instantly search for matches by ID or team name, with a dropdown of suggestions as you type.
- **Detailed Match View**: When a match is selected, a detailed header appears with team names, match time, and a live countdown to the start of the match.
- **Intelligent Odds Tables**: The application features collapsible sections for each bet type. The tables are dynamically generated to handle a wide variety of complex and nested odds structures, including:
    - 3-Way Result (Home/Draw/Away)
    - Home/Away
    - Over/Under
    - Asian Handicap
    - Result / Total Goals
- **Clean, Modern UI**: The user interface is designed to be clean, intuitive, and visually appealing, with a dark theme inspired by modern sports betting websites.
- **Robust and Resilient**: The application is built to gracefully handle inconsistencies and malformed data within the JSON source, preventing crashes and ensuring a smooth user experience.
- **Component-Based Architecture**: The code is well-structured and organized into reusable React components, with a centralized type system for maintainability.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/MahadiHossain28/tbm-test2.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd tbm-test2
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

or

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The application is organized into the following key files and directories:

- **`/src/app/page.tsx`**: The main application page, which handles the search functionality and data processing.
- **`/src/app/MatchView.tsx`**: A component that encapsulates the display of a selected match, including the header and odds table.
- **`/src/app/MatchHeader.tsx`**: The component that displays the header for a selected match, including the live countdown timer.
- **`/src/app/OddsDisplay.tsx`**: The core component that intelligently parses and renders the complex odds data into a variety of table layouts.
- **`/src/app/types.ts`**: A centralized file containing all the TypeScript interfaces for the application's data structures.
- **`/src/data/data.json`**: The local JSON file that serves as the data source for the application.
- **`/public`**: Contains static assets like images and fonts.
- **`/styles`**: Contains global CSS styles.
