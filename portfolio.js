'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ===== KNOWLEDGE BASE DATA =====
    const knowledgeBase = [
        {
            keywords: ['who', 'about', 'manifesto', 'recruiter', 'philosophy', 'value', 'brief', 'narrative'],
            sectionId: 'narrative',
            sectionLabel: '01 // EXECUTIVE BRIEF',
            answer: "Pavan views mastery as an obsession rather than an academic checklist. He deconstructs systems, eliminates waste, and builds autonomous solutions."
        },
        {
            keywords: ['skills', 'tools', 'revit', 'autocad', 'python', 'spss', 'gis', 'staad', 'leadership', 'competencies', 'capabilities'],
            sectionId: 'capabilities',
            sectionLabel: '02 // CORE COMPETENCIES',
            answer: "Pavan commands 5 core pillars: Autonomous Leadership, Operational 5S Efficiency, Rapid Tech Absorption (Revit/QGIS/Python/SPSS), Commercial Acumen, and Stakeholder Trust."
        },
        {
            keywords: ['amazon', 'experience', 'work', 'track', 'geospatial', 'remote sensing', 'lead', 'execution', 'job'],
            sectionId: 'execution',
            sectionLabel: '03 // OPERATIONAL TRACK RECORD',
            answer: "Pavan served as a 5S Proxy Lead & Instructor at Amazon UK, architected a solo satellite NDVI geospatial research project, and led multidisciplinary BIM designs."
        },
        {
            keywords: ['degree', 'msc', 'btech', 'education', 'coventry', 'nebosh', 'pitman', 'distinction', 'credentials', 'pedigree'],
            sectionId: 'credentials',
            sectionLabel: '04 // ACADEMIC PEDIGREE',
            answer: "Holds an MSc with Distinction in Construction Management & BIM (Coventry), B.Tech in Civil Engineering (First Class with Distinction), and certifications in NEBOSH, HR, Web Dev, and IT Support."
        },
        {
            keywords: ['services', 'freelance', 'hire', 'contract', 'house design', 'cad', 'windows', 'consulting', 'solutions', 'engagements'],
            sectionId: 'engagements',
            sectionLabel: '05 // CONSULTING & SOLUTIONS',
            answer: "Pavan offers 7 specialized solutions including 2D/3D BIM drafting, 5S floor optimization, NEBOSH compliance, SPSS data analytics, and Web/IT systems setup."
        },
        {
            keywords: ['contact', 'email', 'phone', 'call', 'reach', 'message', 'hire him', 'connect', 'dialogue'],
            sectionId: 'connection',
            sectionLabel: '06 // DIRECT ENGAGEMENT',
            answer: "Direct Line: +44 7767 710809 | Email: pavanbedamsetty@gmail.com | Location: United Kingdom."
        }
    ];

    // ===== MODAL CONTROLS =====
    const aiModal = document.getElementById('aiModal');
    const navBotBtn = document.getElementById('navBotBtn');
    const tileBotBtn = document.getElementById('tileBotBtn');
    const aiCloseBtn = document.getElementById('aiCloseBtn');
    const aiSendBtn = document.getElementById('aiSendBtn');
    const aiInput = document.getElementById('aiInput');
    const aiChat = document.getElementById('aiChat');

    function openModal() {
        if (aiModal) {
            aiModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => aiInput?.focus(), 100);
        }
    }

    function closeModal() {
        if (aiModal) {
            aiModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Bind click events
    navBotBtn?.addEventListener('click', openModal);
    tileBotBtn?.addEventListener('click', openModal);
    aiCloseBtn?.addEventListener('click', closeModal);

    // Close when clicking outside modal window
    aiModal?.addEventListener('click', (e) => {
        if (e.target === aiModal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiModal?.classList.contains('active')) {
            closeModal();
        }
    });

    // ===== QUERY EXECUTION =====
    function runQuery() {
        if (!aiInput || !aiChat) return;
        const query = aiInput.value.trim().toLowerCase();
        if (!query) return;

        // Append User Bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'ai-bubble outgoing';
        userBubble.textContent = aiInput.value;
        aiChat.appendChild(userBubble);
        aiInput.value = '';

        // Match Query in Knowledge Base
        let match = null;
        for (const item of knowledgeBase) {
            if (item.keywords.some(k => query.includes(k))) {
                match = item;
                break;
            }
        }

        // Response with artificial micro-delay
        setTimeout(() => {
            const botBubble = document.createElement('div');
            botBubble.className = 'ai-bubble incoming';

            if (match) {
                botBubble.innerHTML = `
                    ${match.answer}<br>
                    <a href="#${match.sectionId}" class="route-btn" data-target="${match.sectionId}">Jump to ${match.sectionLabel} &rarr;</a>
                `;
            } else {
                botBubble.innerHTML = `
                    I couldn't find a direct match for that query. You can transmit a message directly to Pavan's inbox:<br>
                    <a href="#connection" class="route-btn" data-target="connection">Open Contact Form &rarr;</a>
                `;
            }

            aiChat.appendChild(botBubble);
            aiChat.scrollTop = aiChat.scrollHeight;

            // Bind route jump buttons
            botBubble.querySelectorAll('.route-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = btn.getAttribute('data-target');
                    closeModal();
                    const targetElem = document.getElementById(targetId);
                    if (targetElem) {
                        targetElem.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }, 220);

        aiChat.scrollTop = aiChat.scrollHeight;
    }

    aiSendBtn?.addEventListener('click', runQuery);
    aiInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runQuery();
        }
    });
});
