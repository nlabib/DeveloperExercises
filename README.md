# Baseball Data Visualization

This project provides a web-based interface for visualizing various baseball statistics, backed by a Flask API server that reads data from an Excel file.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Visualization](#visualization)
- [License](#license)

## Getting Started

### Prerequisites

- Python 3
- Node.js and npm

### Backend Setup

1. Clone the repository and navigate to the backend directory:

```sh
git clone https://github.com/nlabib/DeveloperExercises.git
cd DeveloperExercises
```

2. Create a virtual environment (recommended):

   ```
   python -m venv .venv
   ```

3. Activate the virtual environment:

   - On Windows:

     ```
     .venv\Scripts\activate
     ```

   - On macOS and Linux:

     ```
     source .venv/bin/activate
     ```

4. Install the required Python packages:

```sh
pip install -r requirements.txt
```

5. Run the Flask application:

```sh
python app.py
```

The backend server will start on `http://127.0.0.1:5000/`.

### Frontend Setup

1. Navigate to the frontend directory:

```sh
cd frontend
```

2. Install the required npm packages:

```sh
npm install
```

3. Run the React application:

```sh
npm start
```

The frontend application will start on `http://127.0.0.1:3000/`.

## API Endpoints

The backend server provides several API endpoints for fetching baseball statistics:

- `/api/homeruns`: Get the top 10 batters by home runs.
- `/api/exitspeed`: Get the top 10 hits by exit speed.
- `/api/hitdistance`: Get the top 10 hits by distance.
- `/api/sweetspots`: Get the top 10 batters by sweet spot hits (launch angle between 25 and 35 degrees).
- `/api/toppitchers`: Get the top 10 pitchers by average exit velocity against.
- `/api/topspinrate`: Get the top 10 pitchers by average spin rate.
- `/api/strikeouts`: Get the top 10 pitchers by strikeouts.
- `/api/scatterdata`: Get data for scatter plot of launch angle vs. exit speed.
- `/api/heatmapdata`: Get data for heatmap of exit direction vs. hit distance.
- `/api/playoutcome`: Get data for play outcomes with launch angle, exit speed, and exit direction.

## Visualization

The frontend application provides various visualizations for the baseball statistics, including bar charts, scatter plots, and heatmaps.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

```

The table of contents has clickable links, so users can jump to the desired section with ease.
```
