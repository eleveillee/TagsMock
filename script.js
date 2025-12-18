document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startScanBtn = document.getElementById('start-scan-btn');
    const startCrawlingBtn = document.getElementById('start-crawling-btn');
    const urlInput = document.getElementById('url-input');
    const heroSection = document.getElementById('hero-section');
    const configSection = document.getElementById('config-section');
    const scanningSection = document.getElementById('scanning-section');
    const resultsSection = document.getElementById('results-section');
    
    // Inputs
    const gtmIdInput = document.getElementById('gtm-id');
    const ga4IdInput = document.getElementById('ga4-id');
    const fbIdInput = document.getElementById('fb-id');

    // Display Elements
    const steps = document.querySelectorAll('.step');
    const eventsGrid = document.querySelector('.events-grid');
    const siteUrlDisplay = document.getElementById('site-url-display');
    const siteInitial = document.getElementById('site-initial');

    // State
    let userConfig = {
        url: '',
        gtmId: '',
        ga4Id: '',
        fbId: ''
    };

    // 1. Move from URL Input to Config
    startScanBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) return;
        userConfig.url = url;
        
        heroSection.style.display = 'none';
        configSection.style.display = 'block';
        configSection.style.animation = 'fadeIn 0.5s ease-out';
    });

    // 2. Move from Config to Scanning
    startCrawlingBtn.addEventListener('click', () => {
        userConfig.gtmId = gtmIdInput.value.trim() || 'GTM-MOCK123';
        userConfig.ga4Id = ga4IdInput.value.trim() || 'G-MOCK12345';
        userConfig.fbId = fbIdInput.value.trim() || '123456789';

        configSection.style.display = 'none';
        scanningSection.style.display = 'block';
        
        startScanningProcess();
    });

    function startScanningProcess() {
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
    }

    function showResults() {
        scanningSection.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Set site info
        try {
            const domain = new URL(userConfig.url.startsWith('http') ? userConfig.url : `https://${userConfig.url}`).hostname;
            siteUrlDisplay.textContent = domain;
            siteInitial.textContent = domain.charAt(0).toUpperCase();
        } catch (e) {
            siteUrlDisplay.textContent = userConfig.url;
            siteInitial.textContent = 'W';
        }

        renderEvents();
    }

    function renderEvents() {
        eventsGrid.innerHTML = '';
        const events = getMockEvents(userConfig);
        
        events.forEach((event, index) => {
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
                
                <div class="insight-box">
                    <strong>💡 AI Insight:</strong> ${event.insight}
                </div>

                <span class="datalayer-label">Data Layer Preview</span>
                <div class="datalayer-preview">
                    ${formatDataLayer(event.dataLayer)}
                </div>

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
                alert(`Mock: Configuration successfully pushed to ${userConfig.gtmId}.
GA4 Variable: ${userConfig.ga4Id}
FB Pixel ID: ${userConfig.fbId}`);
            }, 3000);
        }, 2000);
    });

    function formatDataLayer(obj) {
        // Simple syntax highlighting mock
        const json = JSON.stringify(obj, null, 2);
        return json.replace(/(".*?"):/g, '<span style="color:#60a5fa">$1</span>:');
    }

    function getMockEvents(config) {
        return [
            {
                title: 'Purchase Complete',
                trigger: 'Pageview /thank-you',
                description: 'Fires when a transaction is successfully completed. Includes full ecommerce payload.',
                confidence: 99,
                insight: `Tracks revenue, tax, and shipping. Essential for calculating ROAS in GA4 (${config.ga4Id}) and FB Ads.`,
                dataLayer: {
                    event: "purchase",
                    ecommerce: {
                        transaction_id: "T_12345",
                        value: 99.99,
                        tax: 4.90,
                        shipping: 5.99,
                        currency: "USD",
                        items: [
                            {
                                item_id: "SKU_12345",
                                item_name: "Stan and Friends Tee",
                                price: 99.99,
                                quantity: 1
                            }
                        ]
                    }
                }
            },
            {
                title: 'Add to Cart',
                trigger: 'Click .add-to-cart',
                description: 'Tracks when items are added to cart. capture product details for dynamic remarketing.',
                confidence: 98,
                insight: `Enables "Abandon Cart" campaigns. Populates the "Items" array for detailed product performance analysis.`,
                dataLayer: {
                    event: "add_to_cart",
                    ecommerce: {
                        currency: "USD",
                        value: 29.99,
                        items: [
                            {
                                item_id: "SKU_12345",
                                item_name: "Stan and Friends Tee",
                                price: 29.99,
                                quantity: 1
                            }
                        ]
                    }
                }
            },
            {
                title: 'Generate Lead',
                trigger: 'Form Submit #newsletter',
                description: 'Captures user interest. Useful for calculating Cost Per Lead (CPL).',
                confidence: 92,
                insight: `We'll map this to the "generate_lead" standard event in GA4 and "Lead" in Facebook Pixel (${config.fbId}).`,
                dataLayer: {
                    event: "generate_lead",
                    form_id: "newsletter_footer",
                    method: "email"
                }
            },
            {
                title: 'Search',
                trigger: 'Query Param ?q=',
                description: 'Tracks internal site search usage to understand user intent.',
                confidence: 88,
                insight: `Capturing the "search_term" property helps you identify content gaps and what users can't find.`,
                dataLayer: {
                    event: "search",
                    search_term: "blue t-shirt"
                }
            },
             {
                title: 'Contact Click',
                trigger: 'Click a[href^="tel:"]',
                description: 'Tracks clicks on phone numbers as a conversion intent.',
                confidence: 85,
                insight: `Important for service businesses. We'll tag this as a conversion event in your analytics setup.`,
                dataLayer: {
                    event: "contact",
                    method: "phone",
                    value: 10 // Arbitrary lead value
                }
            }
        ];
    }
});
