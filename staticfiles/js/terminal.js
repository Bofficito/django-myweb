document.addEventListener('DOMContentLoaded', () => {
    const terminalInputs = document.querySelectorAll('.terminal-input, #terminalInput');
    const pages = document.querySelectorAll('.page');
    
    const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why do backend developers prefer coffee? Because they hate Java!",
        "What's a backend developer's favorite exercise? Database queries, they really help with table relations!",
        "Why did the backend developer go broke? Because he used up all his cache!",
        "What's a backend developer's favorite drink? SQL-ite!",
    ];
    
    const commands = {
        'help': 'Available commands:\n  cd home - Go to home page\n  cd about - Go to about page\n  cd skills - Go to skills page\n  cd contact - Go to contact page\n  joke - Tell a programming joke\n  delete all - ⚠️ Danger zone\n  clear - Clear terminal\n  help - Show this help message',
        'clear': () => {
            const outputs = document.querySelectorAll('.command-output');
            outputs.forEach(output => output.innerHTML = '');
            return '';
        },
        'joke': () => {
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        'delete all': () => {
            document.body.classList.add('glitch');
            
            // Simulate system crash
            const terminalContent = document.querySelector('.terminal-content');
            terminalContent.style.opacity = '0.1';
            
            // Show scary message
            setTimeout(() => {
                terminalContent.innerHTML = `
                    <p style="color: red; font-weight: bold;">⚠️ CRITICAL ERROR: SYSTEM FAILURE</p>
                    <p>Deleting system32...</p>
                    <p>Corrupting database...</p>
                    <p>Launching nuclear missiles...</p>
                `;
                terminalContent.style.opacity = '1';
            }, 500);
            
            // Restore everything after a brief moment
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
            return 'Initiating system meltdown...';
        }
    };

    function navigateTo(pageId) {
        window.location.hash = pageId;
        
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
                const input = page.querySelector('.terminal-input, #terminalInput');
                if (input) {
                    setTimeout(() => input.focus(), 100);
                }
            }
        });
    }

    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        if (['home', 'about', 'skills', 'contact'].includes(pageId)) {
            navigateTo(pageId);
        }
    }

    window.addEventListener('hashchange', () => {
        const pageId = window.location.hash.substring(1);
        if (['home', 'about', 'skills', 'contact'].includes(pageId)) {
            navigateTo(pageId);
        }
    });

    function processCommand(command, outputElement) {
        const cmd = command.toLowerCase().trim();
        let response = '';
    
        if (cmd.startsWith('cd ')) {
            const page = cmd.split(' ')[1];
            if (page === 'home') {
                response = `
                    <span class="error-message"><i class="fas fa-exclamation-triangle"></i> bash: cd:/home: Already in this directory. Try 'help' for other commands...</span>
                `;
            } else if (['about', 'skills', 'contact'].includes(page)) {
                window.location.href = `/${page}`;
                response = `Navigating to ${page}... (in the same tab)`;
            } else {
                response = `bash: cd:/${page}: No such directory`;
            }
        } else if (commands[cmd]) {
            response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
        } else if (cmd === '') {
            return;
        } else {
            response = `bash: command not found: ${command}`;
        }
    
        const outputHtml = `
            <p><span class="prompt">$</span> ${command}</p>
            <p class="response">${response}</p>
        `;
        outputElement.innerHTML += outputHtml;  // Agregar contenido
    
        // Asegurarse de que el contenido esté completamente renderizado antes de hacer scroll
        setTimeout(() => {
            outputElement.scrollTop = outputElement.scrollHeight;  // Desplazar al final
        }, 50);  // Esperamos 50ms para que el DOM se actualice
    }

    terminalInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = input.value;
                const outputElement = input.parentElement.parentElement.querySelector('.command-output');
                processCommand(command, outputElement);
                input.value = '';
            }
        });
    });

    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const input = activePage.querySelector('.terminal-input, #terminalInput');
        if (input) {
            input.focus();
        }
    }
});