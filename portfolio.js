'use strict';

// ===== AI KNOWLEDGE AGENT ENGINE =====
const knowledgeBase = [
    {
        keywords: ['who', 'about', 'manifesto', 'recruiter', 'philosophy', 'value'],
        sectionId: 'narrative',
        sectionLabel: '01 // Executive Brief',
        answer: "Pavan views mastery as an obsession rather than an academic checklist. He dissects systems, eliminates waste, and builds autonomous solutions."
    },
    {
        keywords: ['skills', 'tools', 'revit', 'autocad', 'python', 'spss', 'gis', 'staad', 'leadership', 'competencies'],
        sectionId: 'capabilities',
        sectionLabel: '02 // Core Competencies',
        answer: "Pavan commands 5 core pillars: Autonomous Leadership, Lean 5S, Rapid Tech Absorption (Revit/QGIS/Python/SPSS), Commercial Acumen, and Stakeholder Trust."
    },
    {
        keywords: ['amazon', 'experience', 'work', 'uph', '5s', 'track', 'geospatial', 'remote sensing', 'lead'],
        sectionId: 'execution',
        sectionLabel: '03 // Operational Track Record',
        answer: "Pavan maintains a 1,300+ UPH record (+20% target) at Amazon UK as 5S Proxy Lead, led an 8-person geospatial NDVI project, and ranked 3rd/12+ in Coventry BIM."
    },
    {
        keywords: ['degree', 'msc', 'btech', 'education', 'coventry', 'nebosh', 'pitman', 'distinction', 'credentials'],
        sectionId: 'credentials',
        sectionLabel: '04 // Academic Pedigree',
        answer: "Holds an MSc with Distinction (73%) in Construction Management & BIM (Coventry), B.Tech Civil (First Class), and 2024-2026 diplomas in NEBOSH, HR, Web Dev & IT."
    },
    {
        keywords: ['services', 'freelance', 'hire', 'contract', 'house design', 'cad', 'windows', 'consulting'],
        sectionId: 'engagements',
        sectionLabel: '05 // Consulting & Solutions',
        answer: "Pavan provides 7 specialized solutions including 2D/3D BIM drafting, 5S floor optimization, NEBOSH compliance, SPSS analytics, and Web/IT systems setup."
    },
    {
        keywords: ['contact', 'email', 'phone', 'call', 'reach', 'message', 'hire him', 'connect'],
        sectionId: 'connection',
        sectionLabel: '06 // Direct Engagement',
        answer: "Direct Line: +44 7767 710809 | Email: pavanbedamsetty@gmail.com | Location: United Kingdom."
    }
];

// Open & Close Bot Modal
function openBotModal() {
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.getElementById('aiInput')?.focus();
    }
}

function closeBotModal() {
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Close Modal on clicking backdrop
window.addEventListener('click', (e) => {
    const modal = document.getElementById('aiModal');
    if (e.target === modal) closeBotModal();
});

// Trigger query on Enter key
function handleAiKey(e) {
    if (e.key === 'Enter') executeAiQuery();
}

// Process user input
function executeAiQuery() {
    const input = document.getElementById('aiInput');
    const chat = document.getElementById('aiChat');
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    // Append user query bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'ai-bubble outgoing';
    userBubble.textContent = input.value;
    chat.appendChild(userBubble);
    input.value = '';

    // Search knowledgeBase
    let match = null;
    for (const item of knowledgeBase) {
        if (item.keywords.some(k => query.includes(k))) {
            match = item;
            break;
        }
    }

    // Generate response with slight delay for realistic feeling
    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'ai-bubble incoming';

        if (match) {
            botBubble.innerHTML = `
                ${match.answer}<br>
                <a href="#${match.sectionId}" class="route-btn" onclick="closeBotModal()">Jump to ${match.sectionLabel} &rarr;</a>
            `;
        } else {
            botBubble.innerHTML = `
                I couldn't find a direct match. You can transmit a direct dispatch to Pavan's inbox below:<br>
                <a href="#connection" class="route-btn" onclick="closeBotModal()">Open Contact Form &rarr;</a>
            `;
        }

        chat.appendChild(botBubble);
        chat.scrollTop = chat.scrollHeight;
    }, 250);

    chat.scrollTop = chat.scrollHeight;
}
