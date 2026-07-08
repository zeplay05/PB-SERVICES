/**
 * Supabase Connection Diagnostic Utility
 * Run this file from the project directory to test if your Supabase database 
 * is connected successfully and displays the tables:
 * 
 * Command: node check_supabase.js
 */

import fetch from 'node-fetch';

const API_URL = "https://eguwkutijgqxaosjshgn.supabase.co/rest/v1/";
const ANON_KEY = "sb_publishable_bhwPJpSNONc34HH7Z6s3Bw_N2dZERMd";

async function runDiagnostics() {
    console.log("\x1b[36m=== Supabase Diagnostic Test ===\x1b[0m");
    console.log(`URL: ${API_URL}`);
    console.log(`Key Length: ${ANON_KEY.length} characters`);
    
    try {
        console.log("\nProbing connection...");
        const response = await fetch(API_URL, {
            headers: {
                "apikey": ANON_KEY,
                "Authorization": `Bearer ${ANON_KEY}`
            }
        });
        
        if (!response.ok) {
            console.error(`\x1b[31m[-] Diagnostic Failed: Status ${response.status} (${response.statusText})\x1b[0m`);
            const text = await response.text();
            console.error("Details:", text);
            return;
        }
        
        const data = await response.json();
        const tables = Object.keys(data.paths || {})
            .filter(path => path !== '/' && !path.includes('*'))
            .map(path => path.replace(/^\//, ''));
            
        console.log("\x1b[32m[+] Connection successful!\x1b[0m");
        console.log("\x1b[33m[+] Detected Tables:\x1b[0m", tables);
        
        if (tables.includes('slips')) {
            console.log("\x1b[32m[+] Table 'slips' is ready in your database!\x1b[0m");
        } else {
            console.log("\x1b[33m[!] Table 'slips' is missing. Please run the SQL command in walkthrough.md to create it.\x1b[0m");
        }
        
    } catch (err) {
        console.error("\x1b[31m[-] Connection error:\x1b[0m", err.message);
    }
}

runDiagnostics();
