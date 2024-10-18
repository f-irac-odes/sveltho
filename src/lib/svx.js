import { parse } from "svelte/compiler";

// Function to get and remove JavaScript lines starting with '@'
function extractJs(content) {
    const lines = content.split('\n');
    const js = [];
    const html = [];

    lines.forEach(line => {
        if (line.trim().startsWith("@")) {
            // Remove "@" and add the JavaScript to js array
            js.push(line.trim().slice(1)); 
        } else {
            // Keep the remaining HTML lines intact
            html.push(line);
        }
    });

    return {
        jsContent: js.join("\n"), // JavaScript block
        htmlContent: html.join("\n") // HTML block without JavaScript
    };
}

function getComponents (content) {
    const lines = content.split('\n');
    const snippet = [];

    lines.forEach(line => {
        if (line.trim().startsWith("{")) {
            snippet.push(line);
            while(line.charAt(-1) != "}") {
                snippet.push(line);
            }
        } 
    });

    return {
        
    }
}

// Function to process HTML content using Svelte's `parse`
function html(content) {
    // Extract JavaScript and HTML from content
    const { jsContent, htmlContent } = extractJs(content);

    // Parse HTML content using Svelte compiler to check validity
    const parsed = parse(htmlContent); // Parse only the cleaned HTML

    // For debugging, log the separated content
    console.log("JavaScript content:\n", jsContent);
    console.log("HTML content:\n", htmlContent);

    // Return HTML and JavaScript content separately
    return `<script>${jsContent}</script>\n${htmlContent}`;
}

export function svx() {
    return {
        name: 'svx',
        markup({ content, filename }) {
            if (filename.endsWith(".svx")) {
                // Process the content if it’s an `.svx` file
                return {
                    code: html(content), // Process and clean the content
                    map: null // No sourcemap handling for now
                };
            }
        }
    }
}
