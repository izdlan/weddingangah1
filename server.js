const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for wedding details (optional)
app.get('/api/wedding-details', (req, res) => {
    res.json({
        couple: 'Sarah & Michael',
        date: 'June 15, 2024',
        location: 'San Francisco, California',
        ceremony: {
            venue: 'Golden Gate Park',
            time: '4:00 PM'
        },
        reception: {
            venue: 'The Palace Hotel',
            time: '6:00 PM'
        },
        dressCode: 'Cocktail Attire'
    });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Wedding website server running at http://localhost:${PORT}`);
    console.log(`Open your browser and navigate to http://localhost:${PORT} to view the website`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
