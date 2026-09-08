# Rajlaxmi Granite & Marble — Final Production Website

This package is configured for the supplied Google Form and is suitable for a static GitHub Pages site.

## Customer enquiry flow
1. Customer fills Name, Phone, Product Interest and Requirement on the website.
2. The website posts those values directly to the configured Google Form in a hidden iframe.
3. The customer stays on the Rajlaxmi website.
4. After Google finishes the submission, the website shows:
   **Thank you for your enquiry! Your requirement has been received. Our team will connect with you soon.**
5. The response is available under Google Form -> Responses and in its linked Google Sheet.
6. If the Form owner enables Google Forms response notifications, Google sends the owner the new-response email. There is no custom email-sending service in this website.

## Google Form configured
Form ID:
`1FAIpQLSerVHTjxgMQNbZVZWAZQN6D_dVXPMLfiSh0_wescAK3n7mtVg`

Field mapping:
- Customer Name -> `entry.1675016083`
- Phone Number -> `entry.2040272201`
- Product Interest -> `entry.1069626652`
- Requirement -> `entry.477109684`

## Google Form owner setup (one time)
- Google Form -> Responses -> Link to Sheets
- Google Form -> Responses -> three dots -> Get email notifications for new responses
- Keep the Form available to public responders; do not require sign-in / Limit to 1 response for website visitors.

## Business details
- WhatsApp / Phone: +91 97843 70260
- Contact email displayed on site: raotejpal97@gmail.com
- Showroom: Plot Number 1129, Khutari Mumbra Panvel Road, near Jio-bp, Navi Mumbai, Maharashtra, India

## Deployment
Copy `index.html`, `styles.css`, `script.js`, and `README.md` to the root of your GitHub Pages repository.
