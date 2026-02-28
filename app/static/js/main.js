document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const queryForm = document.getElementById('queryForm');
    const userInput = document.getElementById('userInput');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const progressContainer = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const statusMessage = document.getElementById('uploadStatus');
    const clearChatBtn = document.getElementById('clearChat');
    const fileList = document.getElementById('fileList');

    // Handle Query Submission
    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const question = userInput.value.trim();
        if (!question) return;

        // Add user message to UI
        addMessage(question, 'user');
        userInput.value = '';

        // Show typing indicator or assistant placeholder
        const assistantMessageId = addMessage('Thinking...', 'assistant', true);

        try {
            const response = await fetch('/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();

            if (data.error) {
                updateMessage(assistantMessageId, `Error: ${data.error}`);
            } else {
                updateMessage(assistantMessageId, data.response);
            }
        } catch (error) {
            updateMessage(assistantMessageId, 'Sorry, I encountered an error connecting to the server.');
            console.error('Fetch error:', error);
        }
    });

    // Handle Upload Zone Interaction
    uploadZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            uploadFile(fileInput.files[0]);
        }
    });

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        progressContainer.classList.remove('hidden');
        statusMessage.textContent = 'Processing document...';
        progressFill.style.width = '30%';

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                progressFill.style.width = '100%';
                statusMessage.textContent = 'Success! Document indexed.';
                statusMessage.style.color = '#10b981';
                addToFileList(file.name);
                setTimeout(() => {
                    progressContainer.classList.add('hidden');
                    progressFill.style.width = '0%';
                }, 3000);
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            statusMessage.textContent = `Error: ${error.message}`;
            statusMessage.style.color = '#ef4444';
        }
    }

    function addMessage(text, sender, isLoading = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        const id = Date.now();
        messageDiv.id = `msg-${id}`;

        const icon = sender === 'assistant' ? 'fa-robot' : 'fa-user';

        messageDiv.innerHTML = `
            <div class="avatar">
                <i class="fas ${icon}"></i>
            </div>
            <div class="content">${text}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function updateMessage(id, text) {
        const messageDiv = document.getElementById(`msg-${id}`);
        if (messageDiv) {
            messageDiv.querySelector('.content').textContent = text;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function addToFileList(filename) {
        const emptyState = fileList.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const li = document.createElement('li');
        li.style.padding = '0.5rem 0';
        li.style.borderBottom = '1px solid var(--border)';
        li.style.fontSize = '0.875rem';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '0.5rem';
        li.innerHTML = `<i class="far fa-file-alt" style="color: var(--primary)"></i> ${filename}`;
        fileList.appendChild(li);
    }

    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message assistant">
                <div class="avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="content">
                    Chat cleared. How else can I help you?
                </div>
            </div>
        `;
    });
});
