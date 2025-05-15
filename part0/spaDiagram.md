```mermaid
sequenceDiagram
participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->>browser: spa.html
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser: spa.js
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: data.json
Note right of browser: The browser display the notes to the page using the DOM-API
```