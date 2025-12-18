# trouv AI - Mock Application

This is a simple static web application mocking the "trouv AI" automated Google Tag Manager setup tool. It is designed for visual testing and demonstration purposes.

## Features (Mocked)

- **Landing Page**: Accepts a URL to "scan".
- **Configuration**: Inputs for GTM Container ID, GA4 Measurement ID, and Facebook Pixel ID.
- **Scanning Simulation**: Visual feedback of the AI crawling the site.
- **Results Dashboard**: 
    - Displays identified events (Purchase, Add to Cart, Lead, etc.).
    - **Data Layer Preview**: Shows the exact code snippet for developers.
    - **AI Insights**: Explains how properties (like `value`, `currency`, `items`) are used for advanced analytics (ROAS, Remarketing).
- **Deployment**: Mock button to "push" tags to GTM.

## Usage

1. Open `index.html` in a web browser.
2. Enter a URL (e.g., `https://myshop.com`).
3. Click "Next: Configure IDs".
4. Enter dummy IDs (or keep defaults) for GTM, GA4, and FB.
5. Click "Start AI Scan".
6. View the simulated results, including Data Layer previews and insights.

## Deployment

This static site can be deployed directly to GitHub Pages.
