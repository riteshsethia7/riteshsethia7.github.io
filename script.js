// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const output = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');

let commandHistory = [];
let historyIndex = -1;

// Command data
const commands = {
    help: {
        description: 'Show available commands',
        action: showHelp
    },
    about: {
        description: 'Learn more about me',
        action: showAbout
    },
    experience: {
        description: 'View my work experience',
        action: showExperience
    },
    skills: {
        description: 'Check out my technical skills',
        action: showSkills
    },
    projects: {
        description: 'See my personal projects',
        action: showProjects
    },
    contact: {
        description: 'Get in touch with me',
        action: showContact
    },
    education: {
        description: 'View my educational background',
        action: showEducation
    },
    achievements: {
        description: 'See my achievements',
        action: showAchievements
    },
    clear: {
        description: 'Clear the terminal',
        action: clearTerminal
    },
    whoami: {
        description: 'Who am I?',
        action: whoami
    },
    ls: {
        description: 'List available sections',
        action: listSections
    },
    social: {
        description: 'View my social media links',
        action: showSocial
    },
    linkedin: {
        description: 'Visit my LinkedIn profile',
        action: openLinkedin
    }
};

// Event listeners
terminalInput.addEventListener('keydown', handleInput);

// Keep input focused
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
});

// Handle input
function handleInput(e) {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();

        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;

            addOutput(`<span class="prompt">ritesh@portfolio:~$</span> ${command}`);
            executeCommand(command);
        } else {
            addOutput(`<span class="prompt">ritesh@portfolio:~$</span>`);
        }

        terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete();
    }
}

// Execute command
function executeCommand(command) {
    const cmd = command.split(' ')[0];

    if (commands[cmd]) {
        commands[cmd].action();
    } else if (command === '') {
        return;
    } else {
        addOutput(`<div class="error">Command not found: ${command}</div><div>Type <span class="highlight">help</span> to see available commands.</div>`);
    }

    scrollToBottom();
}

// Add output to terminal
function addOutput(html) {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = html;
    output.appendChild(line);
}

// Scroll to bottom
function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Autocomplete
function autocomplete() {
    const input = terminalInput.value.toLowerCase();
    const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));

    if (matches.length === 1) {
        terminalInput.value = matches[0];
    } else if (matches.length > 1) {
        addOutput(`<div class="info">${matches.join('  ')}</div>`);
    }
}

// Command functions
function showHelp() {
    const helpText = `
        <div class="command-output">
            <h3>Available Commands:</h3>
            <div class="help-table">
                ${Object.entries(commands).map(([cmd, data]) => `
                    <div class="help-row">
                        <span class="help-command">${cmd}</span>
                        <span class="help-description">${data.description}</span>
                    </div>
                `).join('')}
            </div>
            <p style="margin-top: 15px;">
                <span class="info">💡 Tip:</span> Use <span class="highlight">Tab</span> for autocomplete and <span class="highlight">↑/↓</span> for command history
            </p>
        </div>
    `;
    addOutput(helpText);
}

function showAbout() {
    const aboutText = `
        <div class="command-output">
            <h3>$ whoami</h3>
            <p>Hey there! 👋 I'm <span class="highlight">Ritesh Sethia</span></p>
            <p></p>
            <p>I'm a <span class="success">Software Development Engineer II</span> at <span class="info">FlyCT (Flyin X Cleartrip)</span>, where I work on building scalable microservices and supplier management systems.</p>
            <p></p>
            <p>🚀 <strong>What I do:</strong></p>
            <ul>
                <li>Build high-performance backend systems using Spring Boot & Java</li>
                <li>Design and implement microservices architectures</li>
                <li>Work with AI/LLM integration using Claude Code & Anthropic Claude</li>
                <li>Optimize system performance and reduce operational overhead</li>
                <li>Lead automation initiatives that save time and money</li>
            </ul>
            <p></p>
            <p>💡 <strong>Recent Win:</strong> Rewrote the supplier management system from scratch using Claude Code - what used to take 2 months now takes 2-3 weeks. Already onboarded 3 new suppliers using a graph-based mapping approach!</p>
            <p></p>
            <p>🔧 <strong>Tech I love:</strong> Java, Python, Spring Boot, Kafka, GCP, Kubernetes, Docker, MySQL, MongoDB</p>
            <p></p>
            <p>When I'm not coding, you'll find me playing badminton, chess, gaming, or exploring new places! ✈️</p>
        </div>
    `;
    addOutput(aboutText);
}

function showExperience() {
    const experienceText = `
        <div class="command-output">
            <h3>Work Experience</h3>

            <div class="job">
                <div class="job-title">Front End Technology Intern</div>
                <div class="company">Virtusa</div>
                <div class="date">Apr 2020 - July 2020</div>
                <ul>
                    <li>Built Java backend services with Spring, integrated Kafka for message queuing, MySQL for data operations, and added new payment gateway integrations to expand platform payment options</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-title">Software Development Engineer Intern</div>
                <div class="company">Cleartrip (Flipkart Group)</div>
                <div class="date">Oct 2020 - July 2021</div>
                <ul>
                    <li>Built Java backend services with Spring, wired up Kafka for message queuing and MySQL for storage, and plugged in new payment gateway integrations to broaden the platform's payment options</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-title">Software Development Engineer I</div>
                <div class="company">Cleartrip (Flipkart Group)</div>
                <div class="date">July 2021 - March 2024</div>
                <ul>
                    <li>Built and maintained Java-based microservices with Spring for air, hotel, and bus verticals, automating booking processes, improving system resilience & efficiency</li>
                    <li>Implemented web scraping solutions using Selenium and Scrapy, integrated directly with backend services to streamline data collection workflows</li>
                    <li>Collaborated cross-functionally on automation solutions, contributing to system design and scalability improvements that saved 1 Cr+ in expenses and 2000+ human hours for the finance team</li>
                    <li>Streamlined in-house tasks across business and finance teams, significantly boosting day-to-day productivity</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-title">Software Development Engineer II</div>
                <div class="company">Cleartrip (Flipkart Group)</div>
                <div class="date">March 2024 - July 2025</div>
                <ul>
                    <li>Led the Automation Team and contributed to building a comprehensive supplier management system for flight distribution and air supply chain operations, ensuring seamless integration with multiple airline suppliers</li>
                    <li>Designed and implemented resilient microservices with Spring for air, hotel, and bus verticals, and built internal financial APIs that powered the entire finance system</li>
                    <li>Deployed and monitored Spring applications on GCP, maintaining high availability and performance across critical services</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-title">Software Development Engineer II</div>
                <div class="company">FlyCT (Flyin X Cleartrip)</div>
                <div class="date">July 2025 - Present</div>
                <ul>
                    <li>Rewrote the supplier management system from scratch using Claude Code, what used to take 2 months to onboard a new airline supplier now takes 2–3 weeks. Brought in 3 new suppliers already using a graph-based mapping approach (Graphify) with clear sprint structure and AI usage guidelines to keep the process consistent</li>
                    <li>Figured out how to use Claude Code without burning unnecessary tokens, set up patterns the team could follow to get good output while keeping costs and context overhead low</li>
                    <li>Built an internal tool that lets anyone — including the business team — update flight sector configs, credentials, and operational settings without touching a single file or needing engineering help. What used to take a developer 30 minutes and risked breaking things from a stray typo, non-tech folks now do in under 2 minutes. Hit submit and forget about it</li>
                </ul>
            </div>
        </div>
    `;
    addOutput(experienceText);
}

function showSkills() {
    const skillsText = `
        <div class="command-output">
            <h3>Technical Skills</h3>

            <div class="skill-category">
                <h4>Languages</h4>
                <div class="skill-items">
                    <span class="skill-tag">Java</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">SQL</span>
                    <span class="skill-tag">JavaScript</span>
                </div>
            </div>

            <div class="skill-category">
                <h4>Frameworks & Technologies</h4>
                <div class="skill-items">
                    <span class="skill-tag">Spring Boot</span>
                    <span class="skill-tag">Flask</span>
                    <span class="skill-tag">Django</span>
                    <span class="skill-tag">Kafka</span>
                    <span class="skill-tag">REST APIs</span>
                    <span class="skill-tag">Microservices</span>
                </div>
            </div>

            <div class="skill-category">
                <h4>AI & LLM</h4>
                <div class="skill-items">
                    <span class="skill-tag">Anthropic Claude</span>
                    <span class="skill-tag">Claude Code</span>
                    <span class="skill-tag">Prompt Engineering</span>
                    <span class="skill-tag">LLM Integration</span>
                    <span class="skill-tag">ChatGPT</span>
                </div>
            </div>

            <div class="skill-category">
                <h4>Databases</h4>
                <div class="skill-items">
                    <span class="skill-tag">MySQL</span>
                    <span class="skill-tag">MongoDB</span>
                    <span class="skill-tag">Oracle</span>
                    <span class="skill-tag">PostgreSQL</span>
                </div>
            </div>

            <div class="skill-category">
                <h4>DevOps & Cloud</h4>
                <div class="skill-items">
                    <span class="skill-tag">GCP</span>
                    <span class="skill-tag">Kubernetes</span>
                    <span class="skill-tag">Docker</span>
                    <span class="skill-tag">CI/CD</span>
                    <span class="skill-tag">Git</span>
                </div>
            </div>

            <div class="skill-category">
                <h4>Other</h4>
                <div class="skill-items">
                    <span class="skill-tag">Selenium</span>
                    <span class="skill-tag">Scrapy</span>
                    <span class="skill-tag">Flutter</span>
                    <span class="skill-tag">ReactJS</span>
                    <span class="skill-tag">Firebase</span>
                </div>
            </div>
        </div>
    `;
    addOutput(skillsText);
}

function showProjects() {
    const projectsText = `
        <div class="command-output">
            <h3>Personal Projects</h3>

            <div class="project">
                <div class="project-title">🤖 Cleartrip Travel Bot</div>
                <div class="tech-stack">Python | ReactJS | ChatGPT 3.5 Turbo | SQL</div>
                <div class="date">Dec 2024 - Hackathon Winner for Use of Technology</div>
                <ul>
                    <li>Python & reactjs application powered with GPT-3.5 turbo to create an Ai travel planner integrated with cleartrip to provide end to end itinerary and one click booking of flights and hotels for the trip</li>
                </ul>
            </div>

            <div class="project">
                <div class="project-title">📚 Classroom Management App for Local Community</div>
                <div class="tech-stack">Flutter | Python | Flask | Firebase | Android Application</div>
                <div class="date">Feb 2025</div>
                <ul>
                    <li>Built a classroom management app which handles all basic needs of community location based class across hyderabad for teacher, student & management</li>
                </ul>
            </div>
        </div>
    `;
    addOutput(projectsText);
}

function showContact() {
    const contactText = `
        <div class="command-output">
            <h3>Get In Touch</h3>
            <p>I'd love to hear from you! Feel free to reach out through any of these channels:</p>
            <p></p>
            <div class="contact-item">📧 <strong>Email:</strong> <a href="mailto:riteshsethia7@gmail.com" target="_blank">riteshsethia7@gmail.com</a></div>
            <div class="contact-item">💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/riteshsethia" target="_blank">linkedin.com/in/riteshsethia</a></div>
            <div class="contact-item">📍 <strong>Location:</strong> Bengaluru, India</div>
            <p></p>
            <p class="info">💡 Type <span class="highlight">linkedin</span> to open my profile directly!</p>
        </div>
    `;
    addOutput(contactText);
}

function showEducation() {
    const educationText = `
        <div class="command-output">
            <h3>Education</h3>

            <div class="job">
                <div class="job-title">12th - Science</div>
                <div class="company">Narayana Junior College</div>
                <div class="date">2015 - 2017</div>
                <p><span class="success">Percentage: 93.4%</span></p>
            </div>

            <div class="job">
                <div class="job-title">B.Tech - Computer Science Engineering</div>
                <div class="company">CVR College Of Engineering</div>
                <div class="date">2017 - 2021</div>
                <p><span class="success">CGPA: 9.0/10.0</span></p>
            </div>
        </div>
    `;
    addOutput(educationText);
}

function showAchievements() {
    const achievementsText = `
        <div class="command-output">
            <h3>Achievements & Recognition</h3>
            <ul>
                <li>🏆 <strong>3rd Place</strong> - Cleartrip Hackathon 2023</li>
                <li>🎓 <strong>Infosys Certified Software Programmer</strong></li>
                <li>⭐ <strong>Virtusa Codelite 2020 Star Performer</strong> (Awarded with Internship)</li>
                <li>💼 <strong>Led Automation Team</strong> at Cleartrip</li>
                <li>💰 <strong>Saved 1 Cr+ in expenses</strong> through automation initiatives</li>
                <li>⏱️ <strong>Saved 2000+ human hours</strong> for finance team</li>
                <li>🚀 <strong>Reduced supplier onboarding time by 75%</strong> (2 months → 2-3 weeks)</li>
            </ul>
        </div>
    `;
    addOutput(achievementsText);
}

function clearTerminal() {
    output.innerHTML = '';
    addOutput('<div class="success">Terminal cleared!</div>');
}

function whoami() {
    addOutput(`
        <div class="command-output">
            <p class="success">ritesh@backend-dev</p>
            <p>Software Development Engineer II</p>
            <p>Backend Developer | Microservices Architect | AI Enthusiast</p>
            <p></p>
            <p>Type <span class="highlight">about</span> to learn more about me!</p>
        </div>
    `);
}

function listSections() {
    const sections = `
        <div class="command-output">
            <p>Available sections:</p>
            <ul>
                <li>about.md</li>
                <li>experience.json</li>
                <li>skills.yaml</li>
                <li>projects.md</li>
                <li>education.txt</li>
                <li>achievements.log</li>
                <li>contact.info</li>
            </ul>
            <p></p>
            <p class="info">💡 Type the section name without extension to view (e.g., <span class="highlight">about</span>, <span class="highlight">skills</span>)</p>
        </div>
    `;
    addOutput(sections);
}

function showSocial() {
    const socialText = `
        <div class="command-output">
            <h3>Social Media & Links</h3>
            <div class="contact-item">💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/riteshsethia" target="_blank">linkedin.com/in/riteshsethia</a></div>
            <div class="contact-item">📧 <strong>Email:</strong> <a href="mailto:riteshsethia7@gmail.com" target="_blank">riteshsethia7@gmail.com</a></div>
            <p></p>
            <p class="info">Click on any link to visit! 🚀</p>
        </div>
    `;
    addOutput(socialText);
}

function openLinkedin() {
    addOutput('<div class="success">Opening LinkedIn profile...</div>');
    window.open('https://linkedin.com/in/riteshsethia', '_blank');
}

// Initialize
terminalInput.focus();
