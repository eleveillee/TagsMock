document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-scan');
    const urlInput = document.getElementById('url-input');
    const heroSection = document.getElementById('hero-section');
    const scanningSection = document.getElementById('scanning-section');
    const resultsSection = document.getElementById('results-section');
    const steps = document.querySelectorAll('.step');
    const eventsGrid = document.querySelector('.events-grid');
    const siteUrlDisplay = document.getElementById('site-url-display');
    const siteInitial = document.getElementById('site-initial');

    const MOCK_EVENTS = [
        {
            title: 'Add to Cart',
            trigger: 'Click on .add-to-cart, button[type="submit"]',
            description: 'Tracks when a user adds an item to their shopping cart.',
            confidence: 98,
            type: 'e-commerce'
        },
        {
            title: 'Purchase Complete',
            trigger: 'Pageview /thank-you, /order-confirmed',
            description: 'Fires when a transaction is successfully completed.',
            confidence: 99,
            type: 'e-commerce'
        },
        {
            title: 'Newsletter Signup',
            trigger: 'Form Submit #newsletter-form',
            description: 'Tracks successful email subscription form submissions.',
            confidence: 92,
            type: 'lead'
        },
        {
            title: 'View Content',
            trigger: 'Pageview /blog/*, /article/*',
            description: 'Tracks when a user reads a content piece.',
            confidence: 85,
            type: 'content'
        },
        {
            title: 'Contact Link Click',
            trigger: 'Click a[href^="mailto:"], a[href^="tel:"]',
            description: 'Tracks clicks on contact email or phone links.',
            confidence: 88,
            type: 'lead'
        },
        {
            title: 'Video Engagement',
            trigger: 'YouTube Video Play > 10s',
            description: 'Tracks when a user watches embedded product videos.',
            confidence: 76,
            type: 'engagement'
        }
    ];

    startBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) return;

        // Transition to Scanning
        heroSection.style.display = 'none';
        scanningSection.style.display = 'block';

        // Simulate Scanning Steps
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex > 0) {
                steps[stepIndex - 1].classList.remove('active');
                steps[stepIndex - 1].classList.add('completed');
                steps[stepIndex - 1].innerHTML = `✓ ${steps[stepIndex - 1].dataset.text}`;
            }

            if (stepIndex < steps.length) {
                steps[stepIndex].classList.add('active');
                stepIndex++;
            } else {
                clearInterval(interval);
                setTimeout(showResults, 1000);
            }
        }, 1500);

        function showResults() {
            scanningSection.style.display = 'none';
            resultsSection.style.display = 'block';
            
            // Set site info
            try {
                const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
                siteUrlDisplay.textContent = domain;
                siteInitial.textContent = domain.charAt(0).toUpperCase();
            } catch (e) {
                siteUrlDisplay.textContent = url;
                siteInitial.textContent = 'W';
            }

            // Render Events
            renderEvents();
        }
    });

    function renderEvents() {
        eventsGrid.innerHTML = '';
        MOCK_EVENTS.forEach((event, index) => {
            const isHighConfidence = event.confidence > 90;
            const card = document.createElement('div');
            card.className = 'event-card';
            card.style.animationDelay = `${index * 100}ms`;
            
            card.innerHTML = `
                <div class="confidence-badge ${isHighConfidence ? 'confidence-high' : ''}">
                    ${event.confidence}% AI Match
                </div>
                <span class="event-title">${event.title}</span>
                <span class="event-trigger">${event.trigger}</span>
                <p class="event-desc">${event.description}</p>
                <div class="toggle-switch">
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider"></span>
                    </label>
                    <span>Track this event</span>
                </div>
            `;
            eventsGrid.appendChild(card);
        });
    }

    // Mock Deployment
    document.getElementById('deploy-btn').addEventListener('click', () => {
        const btn = document.getElementById('deploy-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Publishing to GTM...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Success! Tags Live';
            btn.style.backgroundColor = '#22c55e';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
                alert('Mock: Configuration successfully pushed to Google Tag Manager container GTM-XXXXXX');
            }, 3000);
        }, 2000);
    });
});
