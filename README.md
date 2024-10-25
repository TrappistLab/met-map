# MET-Map

**MET-Map** is a meteorological map visualization tool designed to simplify the display and analysis of meteorological data. Built with [Leaflet.js](https://leafletjs.com/) and [FastAPI](https://fastapi.tiangolo.com/), this project supports heatmap visualization, weather overlays, and customizable interactive maps to assist researchers, meteorologists, and developers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive weather map with heatmap visualization
- FastAPI backend for handling data processing and API requests
- Leaflet.js frontend for map rendering and interaction
- Customizable overlays with location markers and weather details
- Support for GeoJSON and JSON files for data representation

## Installation

### Prerequisites

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js & npm](https://nodejs.org/en/download/) (for frontend dependencies)

### Clone the repository

```bash
git clone https://github.com/TrappistLab/met-map.git
cd met-map
```

### Backend Setup (FastAPI)

1. **Create a virtual environment:**
   ```bash
   python3 -m venv env
   source env/bin/activate   # On Windows, use `env\Scripts\activate`
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```

The server should now be running at `http://127.0.0.1:8000`.

### Frontend Setup (Leaflet.js)

If the frontend is using npm for additional dependencies:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install npm dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```

## Usage

- Access the frontend map at `http://localhost:3000` (or configured port).
- Use the backend API for fetching and updating meteorological data.

## API Endpoints

Here’s a summary of the main API endpoints available:

- `GET /weather-data` - Fetch weather data for the map
- `POST /weather-data` - Upload weather data
- `GET /heatmap` - Fetch heatmap layer data
- `POST /heatmap` - Upload heatmap data for visualization

*Note*: Customize these based on the actual endpoints defined in your FastAPI code.

## Contributing

We welcome contributions to **MET-Map**! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
