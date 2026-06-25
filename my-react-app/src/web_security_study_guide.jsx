import { useState } from "react";

const topics = [
  {
    id: "intro",
    title: "L1-2: Intro & Web Tech",
    color: "#6366f1",
    emoji: "🌐",
    sections: [
      {
        heading: "What is Web Security?",
        bullets: [
          "Browser security — e.g. Same Origin Policy: isolate sites from each other while running in the same browser",
          "Server-side security — attackers can run arbitrary HTTP clients and send anything to the server",
          "Client-side security — prevent the user from being attacked while using a web app locally",
          "Protect the user — from social engineering, trackers, and private data being leaked",
        ],
      },
      {
        heading: "Why Is Web Security Hard?",
        bullets: [
          "Extremely ambitious goal: run untrusted code securely (different sites interacting in the same tab — \"mashups\")",
          "Desire for high performance & strict backwards compatibility (\"Don't break the web\")",
          "Lots of buggy code + social engineering is very effective + money to be made exploiting systems",
          "Motivations to attack: Ransomware, cryptocurrency mining, geopolitical reasons",
        ],
      },
      {
        heading: "Core Web Technologies",
        bullets: [
          "HTML (lots of tags: <img>, <script>, <p>), CSS, JavaScript",
          "JavaScript: flexible, immediate feedback, pre-installed on every device (built into browsers)",
          "localStorage: stores data per origin (~5 MB quota). Subdomains treated as separate origins → bypass possible",
          "URL structure: protocol://hostname:port/path?query#fragment",
        ],
      },
      {
        heading: "Course Goals",
        bullets: [
          "Attacker mindset: think like an attacker",
          "Defender mindset: think like a defender",
          "Architect secure systems: Security by Design, Risk Assessment & Threat Modeling, Compliance (NIST, GDPR...)",
        ],
      },
    ],
  },
  {
    id: "dns_http",
    title: "L3-5: DNS & HTTP",
    color: "#0ea5e9",
    emoji: "📡",
    sections: [
      {
        heading: "DNS Resolution Flow (when you type a URL)",
        bullets: [
          "1. Client asks DNS Recursive Resolver to lookup hostname (e.g. stanford.edu)",
          "2. Recursive Resolver → Root Nameserver → gets TLD Nameserver IP (.edu)",
          "3. Recursive Resolver → TLD Nameserver → gets Domain Nameserver IP (stanford.edu)",
          "4. Recursive Resolver → Domain Nameserver (authoritative) → gets server IP",
          "5. Recursive Resolver responds to Client with server IP (e.g. 171.67.215.200)",
        ],
      },
      {
        heading: "DNS Attacks",
        bullets: [
          "DNS Hijacking: attacker changes DNS record to point to attacker IP → phishing, mining, ads",
          "Hijack vectors: recursive resolver, nameserver, compromised account at DNS provider, malware changes local DNS, hijacked router",
          "DNS Privacy: queries are in plaintext → ISPs can sell this data. Solution: use 1.1.1.1 (Cloudflare) with DNS over HTTPS/TLS",
          "HTTPS protects content, but DNS is a separate layer — true privacy requires securing DNS too",
        ],
      },
      {
        heading: "HTTP Basics",
        bullets: [
          "Client-server, stateless, human-readable text protocol, extensible (just add headers)",
          "Request: GET / HTTP/1.1 → method, path, version | Host, User-Agent headers",
          "Response: HTTP/1.1 200 OK → Content-Length, Content-Type, Date",
          "HTTP is stateless — state is implemented as a layer on top (cookies, sessions)",
        ],
      },
      {
        heading: "HTTP Status Codes",
        bullets: [
          "1xx Informational, 2xx Success (200 OK, 201 Created, 206 Partial Content)",
          "3xx Redirection (301 Moved Permanently, 302 Found, 304 Not Modified)",
          "4xx Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)",
          "5xx Server Error (500 Internal, 502 Bad Gateway, 503 Unavailable, 504 Gateway Timeout)",
        ],
      },
      {
        heading: "HTTP Proxy Servers",
        bullets: [
          "Can cache content, block content (malware, adult), modify content",
          "Can sit in front of many servers (reverse proxy)",
        ],
      },
      {
        heading: "Important HTTP Headers",
        bullets: [
          "Request: Host, User-Agent, Referer (misspelled), Cookie, Range, Cache-Control, If-Modified-Since, Accept-Language",
          "Response: Set-Cookie, Cache-Control, Expires, Last-Modified, Location (for redirects), Content-Type, Vary",
          "Vary: Accept-Language → cache separate copy per language; Vary: Accept-Encoding → cache per compression",
        ],
      },
      {
        heading: "What Happens When You Type a URL",
        bullets: [
          "1. DNS lookup → IP address",
          "2. Open TCP socket to IP:80",
          "3. Send HTTP request with desired path",
          "4. Read HTTP response",
          "5. Parse HTML into DOM (Document Object Model)",
          "6. Render page from DOM",
          "7. Repeat for all external resources (images, scripts, etc.)",
        ],
      },
    ],
  },
  {
    id: "sop",
    title: "L6-7: Same Origin Policy",
    color: "#10b981",
    emoji: "🛡️",
    sections: [
      {
        heading: "SOP — The Fundamental Security Model",
        bullets: [
          "Most important concept in this course: two pages from different sources (origins) should not interfere with each other",
          "Without SOP: any website could read your emails, steal banking data, or manipulate other tabs",
          "The web is an OS: origin ≈ OS process, browser ≈ OS kernel",
          "Origin = protocol + hostname + port (the 'protocol-host-port tuple')",
        ],
      },
      {
        heading: "Same Origin Examples",
        bullets: [
          "https://example.com/a/ → https://example.com/b/ ✅ SAME (same protocol, host, port)",
          "https://example.com/a/ → https://www.example.com/b/ ❌ DIFFERENT (hostname mismatch)",
          "https://example.com/ → http://example.com/ ❌ DIFFERENT (protocol mismatch)",
          "https://example.com/ → https://example.com:444/ ❌ DIFFERENT (port mismatch)",
          "http://example.com/ → http://example.com:80/ ✅ SAME (port 80 is default for http)",
        ],
      },
      {
        heading: "What SOP Allows vs. Blocks",
        bullets: [
          "ALLOWED: embedding iframes cross-origin, loading images/scripts/styles from other origins",
          "ALLOWED: navigating a child iframe to new URL, form submissions cross-origin",
          "BLOCKED: reading/modifying iframe's DOM cross-origin (attacker.com can't read bank.com DOM)",
          "BLOCKED: cross-origin fetch response reading (fetch works, but res.body.text() fails)",
          "SOP was designed for functionality, not security — exceptions are a source of many attacks",
        ],
      },
      {
        heading: "SOP Limitations",
        bullets: [
          "Too narrow: subdomains of same org can't talk (login.stanford.edu ≠ axess.stanford.edu)",
          "Too broad: pages on same hostname can't be isolated (web.stanford.edu/cs106a same-origin as web.stanford.edu/cs253)",
          "Not enforced for all features: images, scripts, stylesheets bypass SOP by design",
        ],
      },
      {
        heading: "document.domain (workaround, dangerous)",
        bullets: [
          "Both login.stanford.edu and axess.stanford.edu can set document.domain = 'stanford.edu' to become same-origin",
          "Problem: ANY subdomain can join — attacker.stanford.edu can also set domain = 'stanford.edu'",
          "Both sides must opt-in; protocols must still match; being deprecated",
        ],
      },
      {
        heading: "Fragment Identifier Communication (old hack)",
        bullets: [
          "Parent changes iframe URL fragment (#data), child polls window.location.hash",
          "Problems: one-way (parent→child only), requires polling, visible in URL bar, limited size",
          "This is why postMessage was introduced",
        ],
      },
      {
        heading: "postMessage (the modern solution)",
        bullets: [
          "Browser-supported solution for secure cross-origin communication between cooperating origins",
          "Can send complex JS objects via Structured Clone Algorithm (handles circular refs, Date, Map, Set, ArrayBuffer)",
          "SENDER must specify target origin (2nd argument) — not '*' which leaks to any origin",
          "RECEIVER must validate event.origin before acting on the message",
          "Summary: Always specify intended recipient AND always validate the sender!",
        ],
      },
      {
        heading: "SOP Exceptions (Automatic — source of many attacks)",
        bullets: [
          "Embedded static resources from another origin: Images, Scripts (Facebook like, ads, tracking), Styles (Google Fonts)",
          "All allowed! Designed before security was a serious concern",
          "If SOP blocked all of these, the web as we know it would break",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "L8-9: Cookies & Sessions",
    color: "#f59e0b",
    emoji: "🍪",
    sections: [
      {
        heading: "Why Cookies?",
        bullets: [
          "HTTP is stateless — cookies were invented to give the web 'memory'",
          "Server sends Set-Cookie header; browser includes Cookie header on subsequent requests",
          "Understanding cookies is critical: nearly every web attack (XSS, CSRF, session hijacking) targets cookies",
        ],
      },
      {
        heading: "Sessions",
        bullets: [
          "A session is the server-side concept built on top of cookies",
          "Goal: server keeps data related to user's current browsing session (login, shopping cart, analytics)",
          "Without sessions you'd re-authenticate on every page",
        ],
      },
      {
        heading: "Session Security Evolution (4 Demos)",
        bullets: [
          "Demo 1 — Insecure: stores username directly in cookie → attacker can forge any username",
          "Demo 2 — Signed cookies: integrity ✅, confidentiality ❌, revocability ❌ (stolen cookie works forever)",
          "Demo 3 — Sequential session IDs: integrity ✅, revocability ✅, confidentiality ❌ (guess ID 4 if you have ID 5)",
          "Demo 4 — Cryptographically random IDs (128-bit): integrity ✅, confidentiality ✅, revocability ✅ — THIS IS CORRECT",
        ],
      },
      {
        heading: "Signature Schemes",
        bullets: [
          "Triple (G, S, V): G() → key; S(k, x) → tag t; V(k, x, t) → accept/reject",
          "Correctness: V(k, x, S(k, x)) = accept always",
          "Security: attacker without k cannot forge a valid tag",
        ],
      },
      {
        heading: "Ambient Authority",
        bullets: [
          "Access control based on a global, persistent property (browser silently sends credentials automatically)",
          "4 types on the web: Cookies (most common), IP checking, Built-in HTTP Auth, Client Certificates",
          "Alternative: Explicit authorization (OAuth) — permission given for one specific action",
        ],
      },
      {
        heading: "Secure Cookie Configuration (memorize this!)",
        bullets: [
          "HttpOnly — prevent cookie from being read by JavaScript (blocks XSS cookie theft)",
          "Secure — only send cookie over HTTPS connections",
          "SameSite=Lax — default since 2020 in Chrome/Edge/Firefox/Safari, protects against CSRF",
          "Set reasonable Expires (30-90 days for social media, 15-30 min for banking)",
          "Ideal: Set-Cookie: session=<random>; HttpOnly; Secure; SameSite=Lax",
        ],
      },
      {
        heading: "Cookies Don't Obey SOP",
        bullets: [
          "Cookies were created before SOP — they have a different security model",
          "Path attribute: partitions cookies by path but is INEFFECTIVE (same-origin pages can access each other's DOMs)",
          "Domain attribute: pages with same hostname share cookies, protocol and port IGNORED",
          "cs253.stanford.edu can set cookies for stanford.edu, but not reverse",
          "This is why ritaj.birzeit.edu NOT birzeit.edu/ritaj (compromised subdomain could overwrite session cookie)",
        ],
      },
    ],
  },
  {
    id: "csrf_session",
    title: "L10-12: Session Attacks & CSRF",
    color: "#ef4444",
    emoji: "🔓",
    sections: [
      {
        heading: "Session Hijacking",
        bullets: [
          "Sending cookies over unencrypted HTTP is dangerous — attacker on same network sees the cookie",
          "Attacker sends victim's cookie as their own → server is fooled",
          "Firesheep (2010): Firefox extension sniffed unencrypted session cookies on Wi-Fi",
          "Fix: Use Secure cookie attribute + HTTPS for entire website",
          "Via XSS: attacker injects code → exfiltrates document.cookie. Fix: HttpOnly attribute",
        ],
      },
      {
        heading: "Cookie Attributes Detail",
        bullets: [
          "Expires: when to delete. No date = lasts until browser session closes",
          "Path: restricts which URL paths receive the cookie — NOT a security feature (bypassed via iframe)",
          "Domain: cs253.stanford.edu can set cookies for stanford.edu (broader domain within same registrable domain)",
          "Do NOT use Path to keep secrets — any JS on example.com/ can read cookies set for example.com/secret/",
        ],
      },
      {
        heading: "CSRF — Cross-Site Request Forgery",
        bullets: [
          "Attacker tricks browser into using victim's logged-in status to perform unintended actions",
          "Cookies use 'ambient authority' — browser auto-sends bank.com cookies even for requests from attacker.com",
          "Normal users: forced to transfer funds, change email. Admin users: attacker can take over server",
          "Effective even when attacker cannot read the HTTP response",
        ],
      },
      {
        heading: "CSRF Attack Example",
        bullets: [
          "attacker.com has: <img src='https://bank.com/transfer?to=attacker&amt=1000'>",
          "When victim visits attacker.com, browser sends request to bank.com WITH victim's cookies attached",
          "Bank.com is fooled into thinking victim initiated the transfer",
        ],
      },
      {
        heading: "CSRF Mitigations",
        bullets: [
          "Referer Header Check: inspect Referer, reject if not on allowlist — BUT sites can omit Referer (privacy), browser extensions strip it, caches need special handling (Vary: Referer). NOT reliable.",
          "SameSite=Lax (recommended): withholds cookies on subresource requests (img, iframe) from other sites; allows on top-level navigation (clicking a link)",
          "SameSite=Strict: only sends cookies if request originates from the same site that set them",
          "SameSite=None: old default (before 2020), always sends cookies",
          "CSRF Tokens: secret, unpredictable nonce embedded in HTML forms as hidden input; server rejects missing/invalid token",
        ],
      },
      {
        heading: "CSRF Tokens",
        bullets: [
          "What websites did before SameSite was implemented",
          "Secret unpredictable nonce generated by server, transmitted to client in form",
          "Client must include token in subsequent HTTP requests",
          "Stateful: generated randomly; Stateless: generated based on request information (e.g. HMAC of session ID)",
          "Attacker from attacker.com cannot read the token (SOP blocks it) → cannot forge valid requests",
        ],
      },
      {
        heading: "Final Cookie Best Practice",
        bullets: [
          "Never trust data from the client!",
          "Don't use broken cookie Path for security",
          "Use SameSite=Lax to protect against CSRF",
          "Use HttpOnly + Secure flags always",
          "Set reasonable cookie expiry",
        ],
      },
    ],
  },
  {
    id: "xss_attacks",
    title: "L13: XSS Attacks",
    color: "#8b5cf6",
    emoji: "💉",
    sections: [
      {
        heading: "XSS — Code Injection Vulnerability",
        bullets: [
          "Code injection: untrusted user data unexpectedly becomes code",
          "XSS: unexpected code is JavaScript in an HTML document",
          "SOP prevents cross-origin DOM manipulation → attacker needs JS running IN the page",
          "If successful: attacker can view/exfiltrate cookies, send any HTTP request with victim's cookies",
          "53% chance a random website has an XSS vulnerability",
        ],
      },
      {
        heading: "Reflected vs Stored XSS",
        bullets: [
          "Reflected XSS: attack code is in the HTTP request (URL). Code runs once in victim's browser. Script is in the address bar.",
          "Stored XSS: attack code persisted in database. Once stored, server includes it in all pages. Code runs for every visitor. Script is in the website's database.",
          "Example reflected: example.com/?search=<script>alert(document.cookie)</script>",
        ],
      },
      {
        heading: "HTML Element Context",
        bullets: [
          "User input <script>alert()</script> → injected directly into HTML → executes",
          "Fix: change < to &lt; and & to &amp;",
          "IMPORTANT: <style> and <script> have different rules — can't use same filter for both!",
          "Color input: red; } body { display:none; } → hides entire site if put in <style>, harmless in <script>",
        ],
      },
      {
        heading: "HTML Attribute Context",
        bullets: [
          "User input: Feross' onload='alert(document.cookie) → breaks out of attribute",
          "Fix: escape ' as &apos;, \" as &quot;, & as &amp;",
          "ALWAYS quote attributes — unquoted attributes can be broken out of with space, %, *, +, -, ;, <, =, >, ^, |",
          "Beware src and href: <script src='USER DATA'> can never be safe even with escaping",
          "Watch for data: and javascript: URLs — javascript:alert() executes JS",
        ],
      },
      {
        heading: "Script Element Context",
        bullets: [
          "Escaping quotes alone is not enough — \\ can be neutered by placing another \\ in front",
          "Must also escape backslashes: \\ → \\\\",
          "Better fix: Hex encode user data (chars 0-9, A-F), include inside JS string, decode with parseInt(hex, 16)",
          "Best fix: Use a <template> tag to store data (simple HTML encoding: escape < and &)",
          "HTML parser runs first, then JS parser — parser chains create extra attack surface",
        ],
      },
      {
        heading: "Never Safe Contexts",
        bullets: [
          "Directly inside a <script> tag without a template",
          "HTML comments: <!-- USER DATA -->",
          "CSS: <style>USER DATA</style>",
          "Inside event handler attributes without proper escaping",
          "Never put user data in URLs without validation (javascript:, data: URIs)",
        ],
      },
      {
        heading: "Big Ideas",
        bullets: [
          "NEVER trust the client — any data from the client is suspect",
          "Robustness Principle ('be liberal in what you accept') is TERRIBLE for security",
          "HTML parsers are extremely lax — will execute malformed tags like <IMG/onmouseover=alert()>",
          "WHERE user data is safe: HTML element bodies, quoted HTML attributes, JavaScript strings (with hex encoding)",
        ],
      },
    ],
  },
  {
    id: "xss_defenses",
    title: "L14: XSS Defenses & CSP",
    color: "#06b6d4",
    emoji: "🔒",
    sections: [
      {
        heading: "XSS Defense Overview",
        bullets: [
          "Goal: 'Filter', 'escape', or 'sanitize' user input before combining with code (HTML template)",
          "Untrusted data comes from: HTTP requests (query params, form fields, headers, cookies), database (don't trust!), third-party services",
          "ALWAYS escape on the way OUT (at render time), not on the way in to database",
          "Why? You don't know in advance what context data will appear in, and different contexts have different control chars",
          "Use your framework's built-in escaping (EJS, React) — battle-tested and maintained",
        ],
      },
      {
        heading: "EJS & React Escaping",
        bullets: [
          "EJS: <%= variable %> → auto-escapes HTML. <%- variable %> → raw HTML (dangerous!)",
          "React: {variable} in JSX → auto-escapes. dangerouslySetInnerHTML → should look dangerous on purpose",
          "Rule: Dangerous code should LOOK dangerous to make code reviewers scrutinize it",
        ],
      },
      {
        heading: "DOM-based XSS",
        bullets: [
          "Valid server-side script modifies DOM, attacker tricks script into adding malicious nodes",
          "Unlike reflected/stored XSS: attacker doesn't change server-rendered HTML. Attack happens at runtime.",
          "Solution: Instead of innerHTML (executes scripts), use textContent (treats everything as text)",
        ],
      },
      {
        heading: "X-Frame-Options",
        bullets: [
          "Prevents your page from being embedded in an iframe by another site",
          "DENY: never allow framing. SAMEORIGIN: only allow same origin. ALLOW-FROM: specify allowed origin",
          "Replaced by CSP frame-ancestors directive",
        ],
      },
      {
        heading: "Content Security Policy (CSP)",
        bullets: [
          "HTTP response header that tells browser which sources are allowed to load",
          "script-src: controls JS sources. style-src: CSS sources. img-src: images. connect-src: fetch/XHR",
          "default-src: fallback for all fetch directives. Non-fetch directives DON'T inherit from default-src!",
          "Non-fetch directives: base-uri, form-action, frame-ancestors, navigate-to, upgrade-insecure-requests",
          "Most XSS attacks use inline scripts → script-src blocks them. Using 'unsafe-inline' defeats CSP.",
        ],
      },
      {
        heading: "CSP 'strict-dynamic' (The Modern Approach)",
        bullets: [
          "Problem: 94.68% of policies that try to limit script execution are ineffective (whitelists have unsafe endpoints)",
          "Solution: Use nonce (random value) on each <script> tag, changes on every page load",
          "strict-dynamic: trust propagates from nonced script to scripts it loads dynamically — no whitelist needed",
          "Attacker cannot guess nonce (unpredictable, changes each load), cannot read it (blocked by SOP unless XSS already running)",
          "When strict-dynamic is present: whitelist and 'self' and 'unsafe-inline' are IGNORED",
          "Starter CSP: Content-Security-Policy: script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'none'",
        ],
      },
      {
        heading: "Trusted Types",
        bullets: [
          "New web spec for DOM-based XSS (CSP doesn't cover DOM-based XSS)",
          "Block any attempt to assign raw strings to innerHTML — only allow TrustedHTML objects",
          "Every string must go through createHTML() policy before reaching innerHTML",
          "If deployed, would eliminate most DOM-based XSS",
        ],
      },
      {
        heading: "CSP Gotchas",
        bullets: [
          "JavaScript from 'public hosting' domains (e.g. CDNs) can be abused to bypass CSP whitelist",
          "AngularJS: controlling templates = arbitrary JS execution even with nonce",
          "Error messages echoing request params can be loaded as scripts (violates 'self' CSP)",
          "'CSP is Dead' paper: 75.81% of policies using whitelists allow CSP bypass, 99.34% of hosts with CSP provide no benefit against XSS",
        ],
      },
    ],
  },
  {
    id: "code_injection",
    title: "L15: Code Injection",
    color: "#dc2626",
    emoji: "⚠️",
    sections: [
      {
        heading: "Code Injection Overview",
        bullets: [
          "Attacker supplies input that breaks out of the data context (using syntax with special significance)",
          "Attacker input gets interpreted as program instructions, executed as if written by the programmer",
          "We've seen XSS (HTML/JS injection) — same concept applies to OS commands and SQL",
        ],
      },
      {
        heading: "Command Injection",
        bullets: [
          "Goal: execute arbitrary OS commands via a vulnerable application",
          "Happens when app passes unsafe user input to a system shell",
          "Example: file.txt → cat file.txt (safe). file.txt; rm -rf / → cat file.txt; rm -rf / (dangerous!)",
          "Shell metacharacters: ;, &&, ||, |, $(), `` all allow command chaining",
          "Fix: NEVER use shell to run commands with user input. Use execFile() or spawn() with argument arrays instead of exec() with template strings",
        ],
      },
      {
        heading: "SQL Injection",
        bullets: [
          "Goal: execute arbitrary queries to database via vulnerable application",
          "Can read sensitive data, modify data, execute admin operations, sometimes execute OS commands",
          "Example: username=bob\" -- → query: SELECT * FROM users WHERE username=\"bob\" -- \" AND password=...",
          "The -- comments out the rest of the query, bypassing password check",
          "db.exec (unlike db.get) can execute MULTIPLE queries → DROP TABLE users",
        ],
      },
      {
        heading: "SQL Injection Demo Payloads",
        bullets: [
          "bob\" -- → log into Bob's account (bypass password)",
          "\" OR 1=1 -- → log into FIRST account (always true)",
          "\" OR balance > 1000000 -- → log into first account with lots of money",
          "\"); UPDATE users SET password = \"root\" WHERE username = \"bob\" -- → change Bob's password",
          "\"); DROP TABLE users -- → delete the entire users table",
        ],
      },
      {
        heading: "Blind SQL Injection",
        bullets: [
          "When database doesn't output data to the page → steal data by asking true/false questions",
          "Content-based: page responds differently if query matches → binary search for data",
          "Time-based: make database PAUSE when query matches. Attacker observes timing difference.",
          "Example: alice\" AND CASE SUBSTR(password,1,1) WHEN CHAR(112) THEN [long computation] ELSE null END",
          "Much harder but not impossible to exploit",
        ],
      },
      {
        heading: "SQL Injection Defenses",
        bullets: [
          "NEVER build SQL queries with string concatenation!",
          "Parameterized SQL / Prepared Statements: db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])",
          "Object Relational Mappers (ORMs) — automatically handle escaping",
          "Both options: will automatically handle escaping untrusted user input for you",
        ],
      },
    ],
  },
  {
    id: "server_safe",
    title: "L16: Server Security & Safe Coding",
    color: "#059669",
    emoji: "🏗️",
    sections: [
      {
        heading: "CSRF Tokens (deep dive)",
        bullets: [
          "CSRF token = 'nonce': secret, unpredictable value generated by server",
          "Server transmits to client (in hidden form field), client must include in HTTP requests",
          "Server rejects requests with missing or invalid token",
          "Stateful: random token stored server-side. Stateless: HMAC of session ID + timestamp",
          "Attacker from attacker.com cannot read the CSRF token (SOP prevents reading cross-origin responses)",
        ],
      },
      {
        heading: "GitHub OAuth CSRF Vulnerability (Case Study)",
        bullets: [
          "GitHub's 'Authorize' button sent POST with CSRF token to /login/oauth/authorize",
          "Same URL handled both GET (show page) and POST (grant permission)",
          "Bug: Ruby on Rails routes HEAD requests to same handler as GET",
          "request.get? returns false for HEAD → falls through to else branch (treats HEAD like POST!)",
          "Exploit: attacker sends HEAD request to authorization URL → grants OAuth permissions without user knowledge",
          "Fix: Use SameSite cookies, separate controllers for GET/HEAD vs POST, explicit request.post? check",
        ],
      },
      {
        heading: "Safe Coding Lessons",
        bullets: [
          "Complexity is the enemy of security — leaky abstractions create edge cases attackers exploit",
          "Explicit code is better than clever code — don't be magic, be readable",
          "Fail early — opposite of Robustness Principle: validate upfront, reject invalid input immediately",
          "Code defensively — your assumptions may be violated, always verify them upfront",
          "Dangerous code should LOOK dangerous (React's dangerouslySetInnerHTML is a good example)",
        ],
      },
      {
        heading: "Bad API Design Examples (Node.js Buffer)",
        bullets: [
          "new Buffer(str) → converts string to Buffer. new Buffer(number) → allocates uninitialized memory",
          "If user can pass a number where a string is expected → reads raw uninitialized process memory!",
          "Affected: 'ws' (18M weekly downloads), 'request' (16M), 'bl' (5M) — thousands of packages vulnerable",
          "Fix: Buffer.from(str) for strings, Buffer.alloc(n) for zero-initialized. Buffer.allocUnsafe(n) for explicit uninitialized.",
          "Principle: unsafe behavior should have an explicitly unsafe name. Safe behavior should be the default.",
        ],
      },
      {
        heading: "Other Server Security Practices",
        bullets: [
          "Hide error details from client — errors expose file paths, internal packages, tech stack",
          "Prevent server fingerprinting — remove/change Server: header (Express shows 'Express' by default)",
          "Validate ALL inputs — use JSON Schema or typed classes to ensure expected types",
          "Application-level access control: SQL injection bypasses it → consider DB-level permissions too",
        ],
      },
    ],
  },
  {
    id: "dos_phishing",
    title: "L17: DoS, Phishing & Side Channels",
    color: "#7c3aed",
    emoji: "🎣",
    sections: [
      {
        heading: "UI Denial-of-Service",
        bullets: [
          "Override browser defaults to disorient/trap the user (scareware, popup loops, moving windows)",
          "Browser defense levels: L0=no restriction (DOM, CSS), L1=user interaction required (fullscreen, window.open), L2=user engagement required (autoplay sound), L3=user permission required (camera, mic, geolocation)",
          "Infinite alert loop → browsers added checkbox to stop further alerts, now handled by multiprocess architecture",
          "Key idea: the more sensitive the API, the more proof of user intent required",
        ],
      },
      {
        heading: "Phishing",
        bullets: [
          "Acting like a reputable entity to trick user into divulging sensitive info (credentials, account info)",
          "IDN Homograph Attack: use Unicode chars that look like ASCII (е looks like e) → paypal.com looks legitimate",
          "Subdomain confusion: http://paypal.com.webapps.a12323894574389574322389243579w2349.example.com:9999",
          "Picture-in-picture attack: overlay a fake login prompt over a real website",
          "Chromeless windows: open window without browser chrome (URL bar) → user can't verify URL",
          "User defense: use a password manager (won't be fooled by IDN homograph attacks)",
        ],
      },
      {
        heading: "Side Channel Attacks",
        bullets: [
          "'An attack based on information gained from the implementation of a computer system, rather than weaknesses in the algorithm itself'",
          "Possible leaks: timing information, power consumption, electromagnetic emissions",
          "XS-Leaks (Cross-site Leaks): vulnerabilities from side-channels built into the web platform itself",
          "The web is composable — even with SOP, websites can interact → these interactions may leak user info",
        ],
      },
      {
        heading: "CSS History Leak (Classic)",
        bullets: [
          "CSS :visited pseudo-class would style visited links differently → JS could detect colors → read browser history",
          "Fix (2010): Prevent high-bandwidth extraction. Only allow CSS color changes for :visited. DOM APIs always report link styles as UNVISITED. Equalize code paths to prevent timing attacks.",
          "Modern attacks: detect visited links via redraw timing (render time difference) — even after the CSS fix",
        ],
      },
      {
        heading: "XS-Leaks Examples",
        bullets: [
          "Cross-origin images: image width/height can differ based on whether user is logged in → detect login status",
          "W3C Ambient Light Sensor API (2019): screen color can reveal what's on screen → data exfiltration",
          "Gyrophone (2014): mobile MEMS gyroscopes can be used for fingerprinting and side channel attacks",
          "Tension: security vs. capabilities — side channels exist all over, are really hard to prevent",
        ],
      },
    ],
  },
];

const flashcardData = [
  { q: "What is the Same Origin Policy (SOP)?", a: "The fundamental security model of the web: two pages from different origins (protocol+hostname+port) cannot access each other's data. Without SOP, any site could read your emails or banking data." },
  { q: "What 3 things define an 'origin'?", a: "Protocol (http vs https) + Hostname (example.com vs other.com) + Port (80 vs 8080). ALL three must match exactly." },
  { q: "What is a CSRF attack?", a: "Cross-Site Request Forgery: attacker tricks victim's browser into making an unintended request to a site where the victim is logged in. Works because cookies use 'ambient authority' (browser auto-sends cookies)." },
  { q: "How do SameSite cookies prevent CSRF?", a: "SameSite=Strict: only send cookies if request originates from same site. SameSite=Lax (default since 2020): withhold cookies on subresource requests from other sites, allow on top-level navigation. SameSite=None: always send." },
  { q: "What is XSS?", a: "Cross-Site Scripting: a code injection vulnerability where untrusted user data unexpectedly becomes JavaScript code in a page. Lets attacker steal cookies, send requests as victim." },
  { q: "Reflected XSS vs Stored XSS?", a: "Reflected: attack code is in the URL/request, runs once. Stored: attack code saved to database, runs for every visitor. Stored is more severe." },
  { q: "How do you fix SQL injection?", a: "Use Parameterized SQL (prepared statements) or ORMs. NEVER concatenate user input into SQL strings. Parameterized: db.get('SELECT * FROM users WHERE id = ?', [userId])" },
  { q: "What is Blind SQL Injection?", a: "When DB doesn't output data to page, attacker asks true/false questions. Content-based: page looks different if query matches. Time-based: DB delays if query matches (observable timing difference)." },
  { q: "What is a CSRF token?", a: "A secret, unpredictable nonce generated by the server, embedded as a hidden form field. Client must send it back with form submissions. Attacker can't read it (SOP blocks cross-origin response reading)." },
  { q: "What does CSP strict-dynamic do?", a: "Trust propagates from a nonce-d script to any scripts it dynamically loads. Eliminates need for whitelist. Nonce changes every page load — attacker can't predict it. When used, whitelist/'self'/'unsafe-inline' are ignored." },
  { q: "What is DOM-based XSS?", a: "Attack happens at runtime in the browser — valid server script modifies DOM, attacker tricks it into adding malicious nodes. NOT in server-rendered HTML. Fix: use textContent instead of innerHTML." },
  { q: "Why is document.domain dangerous?", a: "To communicate, both subdomains must set document.domain to parent. But then ANY subdomain (including attacker.stanford.edu) can also set it and access them all. Being deprecated." },
  { q: "What is postMessage and how to use it securely?", a: "Browser API for cross-origin communication. Sender: specify target origin (not '*'). Receiver: always validate event.origin before acting. Must do BOTH to be secure." },
  { q: "What cookie flags should you always set?", a: "HttpOnly (blocks JS access, prevents XSS cookie theft), Secure (HTTPS only), SameSite=Lax (CSRF protection). Example: Set-Cookie: session=X; HttpOnly; Secure; SameSite=Lax" },
  { q: "What is Command Injection?", a: "Attacker executes arbitrary OS commands by injecting shell metacharacters (; && || |) into user input passed to a system shell. Fix: use execFile()/spawn() with argument arrays instead of exec() with template strings." },
  { q: "What is DNS hijacking?", a: "Attacker changes DNS record to point to attacker's IP. All visitors get sent to attacker's server. Used for phishing, crypto mining, ads. Fix: DNSSEC, DoH/DoT." },
  { q: "What is an IDN homograph attack?", a: "Using Unicode characters that look identical to ASCII (е looks like e) to register lookalike domains (e.g. pаypal.com). Defense: use a password manager (won't be fooled by visual tricks)." },
  { q: "When should you escape user data?", a: "Always on the way OUT (at render time), NOT on the way into the database. Reason: different output contexts need different escaping, and you can't know in advance which context data will appear in." },
  { q: "Secure session requirements?", a: "1. Browser remembers user (cookie). 2. Users cannot forge sessions. 3. Sessions expire (30-90 days). 4. Server can invalidate sessions (revocability). Use 128-bit cryptographically random session IDs." },
  { q: "What is ambient authority?", a: "Access control based on a global, persistent property — browser silently sends credentials (cookies) automatically with every request, without explicit user approval per action. Enables CSRF." },
];

export default function WebSecurityGuide() {
  const [activeTab, setActiveTab] = useState("topics");
  const [activeTopic, setActiveTopic] = useState(null);
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcShuffle, setFcShuffle] = useState([...Array(flashcardData.length).keys()]);
  const [search, setSearch] = useState("");

  const shuffleCards = () => {
    const arr = [...Array(flashcardData.length).keys()];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setFcShuffle(arr);
    setFcIndex(0);
    setFcFlipped(false);
  };

  const currentCard = flashcardData[fcShuffle[fcIndex]];

  const filteredTopics = topics.map(topic => ({
    ...topic,
    sections: topic.sections.map(section => ({
      ...section,
      bullets: section.bullets.filter(b =>
        !search || b.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(s => !search || s.bullets.length > 0 || s.heading.toLowerCase().includes(search.toLowerCase()))
  })).filter(t => !search || t.sections.length > 0 || t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", background: "#0f0f13", color: "#e8e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "24px 20px 16px", borderBottom: "1px solid #2a2a3e" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#6366f1", textTransform: "uppercase", marginBottom: 4 }}>CSEC4330 — Web Security</div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#f0f0ff" }}>Study Guide — Today (Jun 25) + Jun 30</h1>
          <p style={{ margin: "6px 0 16px", fontSize: 13, color: "#9898b8" }}>Exam: July 2 · All 10 lecture sets covered · ~20 flashcards included</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["topics", "flashcards"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: activeTab === tab ? "#6366f1" : "#1e1e2e", color: activeTab === tab ? "#fff" : "#9898b8", transition: "all 0.15s" }}>
                {tab === "topics" ? "📚 Topics" : "🃏 Flashcards"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        {activeTab === "topics" && (
          <>
            <input
              placeholder="🔍 Search topics, concepts, or keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #2a2a3e", background: "#1a1a2e", color: "#e8e8f0", fontSize: 14, marginBottom: 16, boxSizing: "border-box", outline: "none" }}
            />

            {/* Topic Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 20 }}>
              {filteredTopics.map(topic => (
                <button key={topic.id} onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                  style={{ background: activeTopic === topic.id ? topic.color + "22" : "#1a1a2e", border: `1px solid ${activeTopic === topic.id ? topic.color : "#2a2a3e"}`, borderRadius: 12, padding: "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", color: "#e8e8f0" }}>
                  <span style={{ fontSize: 18 }}>{topic.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, marginLeft: 8, color: activeTopic === topic.id ? topic.color : "#c8c8e0" }}>{topic.title}</span>
                </button>
              ))}
            </div>

            {/* Expanded Topic Content */}
            {activeTopic && (() => {
              const topic = filteredTopics.find(t => t.id === activeTopic);
              if (!topic) return null;
              return (
                <div style={{ background: "#13131f", border: `1px solid ${topic.color}44`, borderRadius: 16, padding: "20px 20px", marginBottom: 20 }}>
                  <h2 style={{ margin: "0 0 16px", fontSize: 18, color: topic.color }}>
                    {topic.emoji} {topic.title}
                  </h2>
                  {topic.sections.map((section, si) => (
                    <div key={si} style={{ marginBottom: 18 }}>
                      <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#c8c8e0", letterSpacing: 0.3 }}>
                        <span style={{ color: topic.color, marginRight: 6 }}>▶</span>{section.heading}
                      </h3>
                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                        {section.bullets.map((bullet, bi) => (
                          <li key={bi} style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.6, color: "#b0b0cc" }}>
                            {bullet.startsWith("Demo") || bullet.includes("✅") || bullet.includes("❌") || bullet.startsWith("Starter") || bullet.startsWith("Ideal") ?
                              <span style={{ background: topic.color + "15", borderLeft: `3px solid ${topic.color}`, paddingLeft: 8, paddingTop: 2, paddingBottom: 2, display: "block", borderRadius: "0 4px 4px 0", color: "#d0d0e8" }}>{bullet}</span> :
                              bullet
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* If no topic selected, show all */}
            {!activeTopic && search && filteredTopics.map(topic => (
              <div key={topic.id} style={{ background: "#13131f", border: `1px solid ${topic.color}44`, borderRadius: 16, padding: "20px 20px", marginBottom: 16 }}>
                <h2 style={{ margin: "0 0 12px", fontSize: 16, color: topic.color }}>{topic.emoji} {topic.title}</h2>
                {topic.sections.map((section, si) => section.bullets.length > 0 && (
                  <div key={si} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#c8c8e0", marginBottom: 6 }}><span style={{ color: topic.color }}>▶ </span>{section.heading}</div>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {section.bullets.map((b, bi) => <li key={bi} style={{ fontSize: 13, color: "#b0b0cc", marginBottom: 4, lineHeight: 1.5 }}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {!activeTopic && !search && (
              <div style={{ background: "#13131f", borderRadius: 12, padding: 16, border: "1px solid #2a2a3e", textAlign: "center", color: "#6868a0", fontSize: 13 }}>
                👆 Click any topic card above to expand its notes
              </div>
            )}
          </>
        )}

        {activeTab === "flashcards" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#6868a0" }}>Card {fcIndex + 1} of {flashcardData.length}</div>
              <button onClick={shuffleCards} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #2a2a3e", background: "#1a1a2e", color: "#9898b8", fontSize: 12, cursor: "pointer" }}>🔀 Shuffle</button>
            </div>

            {/* Progress bar */}
            <div style={{ background: "#1a1a2e", borderRadius: 4, height: 4, marginBottom: 20 }}>
              <div style={{ background: "#6366f1", height: 4, borderRadius: 4, width: `${((fcIndex + 1) / flashcardData.length) * 100}%`, transition: "width 0.3s" }} />
            </div>

            {/* Flashcard */}
            <div onClick={() => setFcFlipped(!fcFlipped)}
              style={{ background: fcFlipped ? "#16213e" : "#1a1a2e", border: `2px solid ${fcFlipped ? "#6366f1" : "#2a2a3e"}`, borderRadius: 16, padding: "32px 28px", minHeight: 180, cursor: "pointer", transition: "all 0.2s", marginBottom: 20, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: fcFlipped ? "#6366f1" : "#5858a0", textTransform: "uppercase", marginBottom: 12 }}>
                {fcFlipped ? "ANSWER" : "QUESTION — click to reveal"}
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.65, color: fcFlipped ? "#d8d8f8" : "#c0c0e0", fontWeight: fcFlipped ? 400 : 500 }}>
                {fcFlipped ? currentCard.a : currentCard.q}
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setFcIndex(Math.max(0, fcIndex - 1)); setFcFlipped(false); }}
                disabled={fcIndex === 0}
                style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid #2a2a3e", background: "#1a1a2e", color: fcIndex === 0 ? "#3a3a5a" : "#9898b8", fontSize: 14, cursor: fcIndex === 0 ? "not-allowed" : "pointer" }}>
                ← Previous
              </button>
              <button onClick={() => { setFcFlipped(false); setTimeout(() => { setFcIndex(Math.min(flashcardData.length - 1, fcIndex + 1)); }, 50); }}
                disabled={fcIndex === flashcardData.length - 1}
                style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid #6366f1", background: fcIndex === flashcardData.length - 1 ? "#1a1a2e" : "#6366f1", color: "#fff", fontSize: 14, cursor: fcIndex === flashcardData.length - 1 ? "not-allowed" : "pointer", fontWeight: 600 }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
