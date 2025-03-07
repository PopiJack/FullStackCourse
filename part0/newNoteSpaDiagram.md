```mermaid
sequenceDiagram %% diagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->>browser: new_note_spa.json
Note right of browser: The browser stays on the same page, and it sends no further HTTP requests.
Note right of browser: The browser rerenders the note list on the page
```