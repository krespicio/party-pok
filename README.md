# party-pok :tada:
A centralized party planner.

Planning parties can be a difficult task to manage. From guest management to theme planning, there's plently of things to manage and look over. Party-Pok seeks to simplify the process by bringing all the necessary tools to one domain.

## Features

### Invitations with SMS :speech_balloon:

Users are able to send text messages to guests and guests are able to reply to the message. This will update the guests status on the database. Twilio's API and webhooks are the key components to this feature.

**Limitations**: this project works off of a free trial Twilio account and thus phone numbers must be verified to receive texts.

### Budget Visualization :bar_chart:

Users are able to visualize their budget in varying ways. Chart.js and Bootstrap provided the tools to make this possible.

### Decoration Suggestions :paintbrush:

With the pintrest API, users can query relevant decorations from different themes

**Limitations**: the pintrest API only allows ten calls per hour and it does not provide direct images for posts. Instead, pictures must be scraped off the post's associated website.
