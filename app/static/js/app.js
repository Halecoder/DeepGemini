// Global variables
let models = [];
let configurations = [];
let stepCounter = 0;
let availableModels = [];
let isManualModelInput = false;
let apiKeys = [];
let paramCounter = 0;

// Translations object
const translations = {
    en: {
        chatInterface: "Chat Interface",
        modelManagement: "Model Management",
        workflowManagement: "Workflow Management",
        roleManagement: "Role Management",
        groupManagement: "Group Management",
        systemSettings: "System Settings",
        singleModel: "Single Model",
        relayChain: "Relay Chain",
        roleChat: "Role Chat",
        discussionGroup: "Discussion Group",
        welcomeToChat: "Welcome to DeepGemini",
        addNewModel: "Add New Model",
        addNewWorkflow: "Add New Workflow",
        addRole: "Add Role",
        addGroup: "Add Group",
        apiKeyManagement: "API Key Management",
        generalSettings: "General Settings",
        adminCredentials: "Admin Credentials",
        currentPassword: "Current Password",
        newUsername: "New Username",
        newPassword: "New Password",
        updateCredentials: "Update Credentials",
        customName: "Custom Name",
        addNewRole: "Add New Role",
        roleName: "Role Name",
        roleDescription: "Description",
        personality: "Personality",
        skills: "Skills",
        isHuman: "Human Role",
        model: "Model",
        hostRole: "Host Role",
        addNewGroup: "Add New Group",
        groupName: "Group Name",
        meetingMode: "Mode",
        speakingAs: "Speaking as",
        workflowDescription: "Configure and manage your AI model workflows",
        groupDescription: "Create and manage discussion groups",
        roleDescription: "Create and manage AI roles"
    },
    zh: {
        chatInterface: "聊天界面",
        modelManagement: "模型管理",
        workflowManagement: "工作流管理",
        roleManagement: "角色管理",
        groupManagement: "群组管理",
        systemSettings: "系统设置",
        singleModel: "单一模型",
        relayChain: "接力链",
        roleChat: "角色对话",
        discussionGroup: "讨论组",
        welcomeToChat: "欢迎使用 DeepGemini",
        addNewModel: "添加新模型",
        addNewWorkflow: "添加新工作流",
        addRole: "添加角色",
        addGroup: "添加群组",
        apiKeyManagement: "API 密钥管理",
        generalSettings: "通用设置",
        adminCredentials: "管理员凭证",
        currentPassword: "当前密码",
        newUsername: "新用户名",
        newPassword: "新密码",
        updateCredentials: "更新凭证",
        customName: "自定义名称",
        addNewRole: "添加新角色",
        roleName: "角色名称",
        roleDescription: "描述",
        personality: "性格",
        skills: "技能",
        isHuman: "人类角色",
        model: "模型",
        hostRole: "主持人角色",
        addNewGroup: "添加新群组",
        groupName: "群组名称",
        meetingMode: "模式",
        speakingAs: "发言身份",
        workflowDescription: "配置和管理 AI 模型工作流",
        groupDescription: "创建和管理讨论组",
        roleDescription: "创建和管理 AI 角色"
    }
};

// --- MODAL HELPERS ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById('modalBackdrop');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    if (backdrop) {
        backdrop.classList.remove('hidden');
        backdrop.classList.add('opacity-100');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById('modalBackdrop');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    if (backdrop) {
        backdrop.classList.add('hidden');
        backdrop.classList.remove('opacity-100');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // if (!checkAuth()) return;
    
    // Bind "Add" buttons to openModal
    const addModelBtn = document.getElementById('add-model-btn');
    if (addModelBtn) addModelBtn.addEventListener('click', () => {
        document.getElementById('addModelForm').reset();
        openModal('addModelModal');
    });

    const addConfigBtn = document.getElementById('add-config-btn');
    if (addConfigBtn) addConfigBtn.addEventListener('click', () => {
        document.getElementById('addConfigForm').reset();
        document.getElementById('configSteps').innerHTML = '';
        stepCounter = 0;
        openModal('addConfigModal');
    });

    const addRoleBtn = document.getElementById('add-role-btn');
    if (addRoleBtn) addRoleBtn.addEventListener('click', () => {
        document.getElementById('addRoleForm').reset();
        openModal('addRoleModal');
    });

    const addGroupBtn = document.getElementById('add-group-btn');
    if (addGroupBtn) addGroupBtn.addEventListener('click', () => {
        document.getElementById('addGroupForm').reset();
        openModal('addGroupModal');
    });
    
    const addApiKeyBtn = document.getElementById('add-apikey-btn');
    if (addApiKeyBtn) addApiKeyBtn.addEventListener('click', () => {
        document.getElementById('addApiKeyForm').reset();
        openModal('addApiKeyModal');
    });

    // Sidebar and theme buttons
    const languageSelect = document.getElementById('languageSelect');
    if(languageSelect) languageSelect.addEventListener('change', (e) => changeLanguage(e.target.value));

    const toggleThemeBtn = document.getElementById('toggleThemeBtn');
    if(toggleThemeBtn) toggleThemeBtn.addEventListener('click', toggleTheme);

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) logoutBtn.addEventListener('click', logout);

    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    if(toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleSidebar);

    // Settings page
    const updateCredentialsBtn = document.getElementById('updateCredentialsBtn');
    if(updateCredentialsBtn) updateCredentialsBtn.addEventListener('click', updateCredentials);

    // Add Model Modal
    const closeAddModelBtn = document.getElementById('closeAddModelBtn');
    if(closeAddModelBtn) closeAddModelBtn.addEventListener('click', () => closeModal('addModelModal'));

    const apiKeyInput = document.querySelector('input[name="api_key"]');
    if(apiKeyInput) apiKeyInput.addEventListener('change', handleAPICredentialsChange);
    
    const apiUrlInput = document.querySelector('input[name="api_url"]');
    if(apiUrlInput) apiUrlInput.addEventListener('change', handleAPICredentialsChange);

    const modelNameSelect = document.getElementById('modelNameSelect');
    if(modelNameSelect) modelNameSelect.addEventListener('change', (e) => handleModelNameSelect(e.target));

    const toggleModelNameInputBtn = document.getElementById('toggleModelNameInputBtn');
    if(toggleModelNameInputBtn) toggleModelNameInputBtn.addEventListener('click', toggleModelNameInput);
    
    const addCustomParamBtn = document.getElementById('addCustomParamBtn');
    if(addCustomParamBtn) addCustomParamBtn.addEventListener('click', addCustomParameter);

    const cancelAddModelBtn = document.getElementById('cancelAddModelBtn');
    if(cancelAddModelBtn) cancelAddModelBtn.addEventListener('click', () => closeModal('addModelModal'));

    const saveModelBtn = document.getElementById('saveModelBtn');
    if(saveModelBtn) saveModelBtn.addEventListener('click', saveModel);

    // Add Config Modal
    const closeConfigModalBtn = document.getElementById('closeConfigModalBtn');
    if(closeConfigModalBtn) closeConfigModalBtn.addEventListener('click', () => closeModal('addConfigModal'));

    const addConfigStepBtn = document.getElementById('addConfigStepBtn');
    if(addConfigStepBtn) addConfigStepBtn.addEventListener('click', addConfigurationStep);
    
    const cancelConfigModalBtn = document.getElementById('cancelConfigModalBtn');
    if(cancelConfigModalBtn) cancelConfigModalBtn.addEventListener('click', () => closeModal('addConfigModal'));

    const saveConfigBtn = document.getElementById('saveConfigBtn');
    if(saveConfigBtn) saveConfigBtn.addEventListener('click', saveConfiguration);

    // Add Role Modal
    const closeRoleModalBtn = document.getElementById('closeRoleModalBtn');
    if(closeRoleModalBtn) closeRoleModalBtn.addEventListener('click', () => closeModal('addRoleModal'));

    const cancelRoleModalBtn = document.getElementById('cancelRoleModalBtn');
    if(cancelRoleModalBtn) cancelRoleModalBtn.addEventListener('click', () => closeModal('addRoleModal'));
    
    const saveRoleBtn = document.getElementById('saveRoleBtn');
    if(saveRoleBtn) saveRoleBtn.addEventListener('click', saveRole);

    // Add Group Modal
    const closeGroupModalBtn = document.getElementById('closeGroupModalBtn');
    if(closeGroupModalBtn) closeGroupModalBtn.addEventListener('click', () => closeModal('addGroupModal'));
    
    const cancelGroupModalBtn = document.getElementById('cancelGroupModalBtn');
    if(cancelGroupModalBtn) cancelGroupModalBtn.addEventListener('click', () => closeModal('addGroupModal'));

    const saveGroupBtn = document.getElementById('saveGroupBtn');
    if(saveGroupBtn) saveGroupBtn.addEventListener('click', saveGroup);

    // Add API Key Modal
    const closeApiKeyModalBtn = document.getElementById('closeApiKeyModalBtn');
    if(closeApiKeyModalBtn) closeApiKeyModalBtn.addEventListener('click', () => closeModal('addApiKeyModal'));
    
    const generateApiKeyBtn = document.getElementById('generateApiKeyBtn');
    if(generateApiKeyBtn) generateApiKeyBtn.addEventListener('click', generateApiKey);

    const cancelApiKeyModalBtn = document.getElementById('cancelApiKeyModalBtn');
    if(cancelApiKeyModalBtn) cancelApiKeyModalBtn.addEventListener('click', () => closeModal('addApiKeyModal'));

    const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
    if(saveApiKeyBtn) saveApiKeyBtn.addEventListener('click', saveApiKey);


    loadModels();
    loadConfigurations();
    loadRoles();
    loadGroups();
    loadApiKeys();
    
    setupNavigation();
    setupSettingsNavigation();
    
    // Initialize language
    const savedLang = localStorage.getItem('language') || 'en';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage(savedLang);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// API calls
async function fetchAPI(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(endpoint, options);
        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }
        return response;
    } catch (error) {
        console.error('API Error:', error);
        showToast('Network error occurred', 'error');
        throw error;
    }
}

// Navigation
function setupNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const contentPages = document.querySelectorAll('.content-page');
    const sidebar = document.getElementById('sidebar');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show content page
            const pageId = item.getAttribute('data-page');
            contentPages.forEach(page => {
                if (page.id === `${pageId}-page`) {
                    page.classList.remove('hidden');
                } else {
                    page.classList.add('hidden');
                }
            });
            
            // Close sidebar on mobile
            if (window.innerWidth < 1024) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });
}

function setupSettingsNavigation() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    const sections = document.querySelectorAll('.settings-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => {
                i.classList.remove('active', 'bg-white', 'text-primary', 'shadow-sm');
                i.classList.add('text-gray-600', 'hover:bg-white', 'hover:shadow-sm');
            });
            item.classList.add('active', 'bg-white', 'text-primary', 'shadow-sm');
            item.classList.remove('text-gray-600', 'hover:bg-white', 'hover:shadow-sm');
            
            const sectionId = item.getAttribute('data-section');
            sections.forEach(section => {
                if (section.id === `${sectionId}-section`) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

// Auth
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

async function updateCredentials() {
    const form = document.getElementById('credentialsForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetchAPI('/v1/auth/update-credentials', 'POST', data);
        if (response.ok) {
            showToast('Credentials updated successfully', 'success');
            form.reset();
        } else {
            const error = await response.json();
            showToast(error.detail || 'Failed to update credentials', 'error');
        }
    } catch (error) {
        showToast('Error updating credentials', 'error');
    }
}

// Models
async function loadModels() {
    try {
        const response = await fetchAPI('/v1/model_configs');
        if (response.ok) {
            models = await response.json();
            renderModelsList();
            updateModelSelects();
        }
    } catch (error) {
        console.error('Error loading models:', error);
    }
}

function renderModelsList() {
    const container = document.getElementById('modelsList');
    container.innerHTML = models.map(model => `
        <div class="bg-white rounded-xl p-6 shadow-sm border border-border-color hover:shadow-md transition-shadow relative group">
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="editModel(${model.id})" class="text-gray-400 hover:text-primary">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteModel(${model.id})" class="text-gray-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center mr-3">
                    <i class="fas fa-robot text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">${model.name}</h3>
                    <div class="flex gap-2 text-xs mt-1">
                        <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">${model.provider}</span>
                        <span class="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">${model.type}</span>
                    </div>
                </div>
            </div>
            <div class="space-y-2 text-sm text-gray-500">
                <div class="flex justify-between">
                    <span>Model:</span>
                    <span class="font-medium text-gray-700 truncate max-w-[150px]">${model.model_name}</span>
                </div>
                <div class="flex justify-between">
                    <span>API URL:</span>
                    <span class="font-medium text-gray-700 truncate max-w-[150px]">${model.api_url}</span>
                </div>
            </div>
        </div>
    `).join('');
}

async function saveModel() {
    const form = document.getElementById('addModelForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Handle checkboxes
    data.enable_tools = form.enable_tools.checked;
    data.enable_thinking = form.enable_thinking.checked;
    
    // Handle manual/select model name
    if (isManualModelInput) {
        data.model_name = document.getElementById('modelNameInput').value;
    } else {
        data.model_name = document.getElementById('modelNameSelect').value;
    }

    // Handle tools JSON
    if (data.tools) {
        try {
            data.tools = JSON.parse(data.tools);
        } catch (e) {
            data.tools = [];
        }
    } else {
        data.tools = [];
    }
    
    // Add required fields with defaults
    data.max_tokens = parseInt(data.max_tokens) || 2000;
    data.temperature = parseFloat(data.temperature) || 0.7;
    data.top_p = parseFloat(data.top_p) || 1.0;
    data.presence_penalty = parseFloat(data.presence_penalty) || 0.0;
    data.frequency_penalty = parseFloat(data.frequency_penalty) || 0.0;
    data.thinking_budget_tokens = parseInt(data.thinking_budget_tokens) || 16000;
    
    // Handle custom params
    const customParams = {};
    document.querySelectorAll('.custom-param-row').forEach(row => {
        const key = row.querySelector('.param-key').value;
        const value = row.querySelector('.param-value').value;
        const type = row.querySelector('.param-type').value;
        
        if (key) {
            if (type === 'number') customParams[key] = Number(value);
            else if (type === 'boolean') customParams[key] = value === 'true';
            else customParams[key] = value;
        }
    });
    data.custom_parameters = customParams;

    const method = data.model_id ? 'PUT' : 'POST';
    const url = data.model_id ? `/v1/models/${data.model_id}` : '/v1/models';
    
    try {
        const response = await fetchAPI(url, method, data);
        if (response.ok) {
            closeModal('addModelModal');
            loadModels();
            showToast('Model saved successfully', 'success');
        } else {
            const error = await response.json();
            showToast(error.detail || 'Failed to save model', 'error');
        }
    } catch (error) {
        showToast('Error saving model', 'error');
    }
}

async function deleteModel(id) {
    if (!confirm('Are you sure you want to delete this model?')) return;
    
    try {
        const response = await fetchAPI(`/v1/models/${id}`, 'DELETE');
        if (response.ok) {
            loadModels();
            showToast('Model deleted successfully', 'success');
        }
    } catch (error) {
        showToast('Error deleting model', 'error');
    }
}

function editModel(id) {
    const model = models.find(m => m.id === id);
    if (!model) return;
    
    const form = document.getElementById('addModelForm');
    form.model_id.value = model.id;
    form.name.value = model.name;
    form.api_key.value = model.api_key;
    form.api_url.value = model.api_url;
    form.type.value = model.type;
    form.provider.value = model.provider;
    form.temperature.value = model.temperature;
    form.top_p.value = model.top_p;
    form.enable_tools.checked = model.enable_tools;
    form.enable_thinking.checked = model.enable_thinking;
    form.thinking_budget_tokens.value = model.thinking_budget_tokens || 16000;
    
    // Handle tools
    if (model.tools) {
        form.tools.value = JSON.stringify(model.tools, null, 2);
    }
    
    // Handle model name
    handleAPICredentialsChange().then(() => {
        const select = document.getElementById('modelNameSelect');
        if ([...select.options].some(o => o.value === model.model_name)) {
            select.value = model.model_name;
            isManualModelInput = false;
        } else {
            toggleModelNameInput();
            document.getElementById('modelNameInput').value = model.model_name;
        }
    });

    // Handle custom params
    const container = document.getElementById('customParametersContainer');
    container.innerHTML = '';
    if (model.custom_parameters) {
        Object.entries(model.custom_parameters).forEach(([key, value]) => {
            addCustomParameter(key, value);
        });
    }

    openModal('addModelModal');
}

// Configurations (Workflows)
async function loadConfigurations() {
    try {
        const response = await fetchAPI('/v1/configurations');
        if (response.ok) {
            configurations = await response.json();
            renderConfigurationsList();
        }
    } catch (error) {
        console.error('Error loading configurations:', error);
    }
}

function renderConfigurationsList() {
    const container = document.getElementById('configurationsList');
    container.innerHTML = configurations.map(config => `
        <div class="bg-white rounded-xl p-6 shadow-sm border border-border-color hover:shadow-md transition-shadow relative group">
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="editConfiguration(${config.id})" class="text-gray-400 hover:text-primary">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteConfiguration(${config.id})" class="text-gray-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mr-3">
                    <i class="fas fa-project-diagram text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">${config.name}</h3>
                    <div class="flex gap-2 text-xs mt-1">
                        <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">${config.steps?.length || 0} Steps</span>
                        <span class="${config.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} px-2 py-0.5 rounded-full">
                            ${config.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                ${(config.steps || []).map((step, index) => {
                    const model = models.find(m => m.id === step.model_id);
                    return `
                        <div class="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                            <span class="w-6 h-6 rounded-full bg-white text-gray-500 flex items-center justify-center text-xs mr-2 border border-gray-200">${index + 1}</span>
                            <span class="font-medium flex-1">${model?.name || 'Unknown Model'}</span>
                            <span class="text-xs text-gray-400 uppercase">${step.step_type}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

function addConfigurationStep(stepData = null) {
    stepCounter++;
    const container = document.getElementById('configSteps');
    const stepDiv = document.createElement('div');
    stepDiv.className = 'bg-gray-50 p-4 rounded-xl border border-gray-200 relative group';
    stepDiv.id = `step-${stepCounter}`;
    
    const modelOptions = models.map(m => 
        `<option value="${m.id}" ${stepData?.model_id === m.id ? 'selected' : ''}>${m.name}</option>`
    ).join('');

    stepDiv.innerHTML = `
        <button type="button" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onclick="removeStep(${stepCounter})">
            <i class="fas fa-times"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Model</label>
                <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none step-model">
                    ${modelOptions}
                </select>
            </div>
            <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none step-type">
                    <option value="reasoning" ${stepData?.step_type === 'reasoning' ? 'selected' : ''}>Reasoning</option>
                    <option value="execution" ${stepData?.step_type === 'execution' ? 'selected' : ''}>Execution</option>
                    <option value="both" ${stepData?.step_type === 'both' ? 'selected' : ''}>Both</option>
                </select>
            </div>
        </div>
        <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">System Prompt</label>
            <textarea class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none step-prompt" rows="2">${stepData?.system_prompt || ''}</textarea>
        </div>
    `;
    
    container.appendChild(stepDiv);
}

function removeStep(id) {
    const step = document.getElementById(`step-${id}`);
    if (step) step.remove();
}

async function saveConfiguration() {
    const form = document.getElementById('addConfigForm');
    const formData = new FormData(form);
    
    const steps = [];
    document.querySelectorAll('#configSteps > div').forEach((stepDiv, index) => {
        steps.push({
            model_id: parseInt(stepDiv.querySelector('.step-model').value),
            step_type: stepDiv.querySelector('.step-type').value,
            system_prompt: stepDiv.querySelector('.step-prompt').value,
            step_order: index + 1
        });
    });

    const data = {
        name: formData.get('name'),
        is_active: formData.get('is_active') === 'true',
        steps: steps,
        transfer_content: true // Default to true
    };

    const configId = formData.get('config_id');
    const method = configId ? 'PUT' : 'POST';
    const url = configId ? `/v1/configurations/${configId}` : '/v1/configurations';

    try {
        const response = await fetchAPI(url, method, data);
        if (response.ok) {
            closeModal('addConfigModal');
            loadConfigurations();
            showToast('Configuration saved successfully', 'success');
        } else {
            const error = await response.json();
            showToast(error.detail || 'Failed to save configuration', 'error');
        }
    } catch (error) {
        showToast('Error saving configuration', 'error');
    }
}

async function deleteConfiguration(id) {
    if (!confirm('Are you sure you want to delete this configuration?')) return;
    
    try {
        const response = await fetchAPI(`/v1/configurations/${id}`, 'DELETE');
        if (response.ok) {
            loadConfigurations();
            showToast('Configuration deleted successfully', 'success');
        }
    } catch (error) {
        showToast('Error deleting configuration', 'error');
    }
}

async function editConfiguration(id) {
    try {
        const response = await fetchAPI(`/v1/configurations/${id}`);
        if (!response.ok) return;
        
        const config = await response.json();
        const form = document.getElementById('addConfigForm');
        
        form.config_id.value = config.id;
        form.name.value = config.name;
        form.is_active.checked = config.is_active;
        
        const container = document.getElementById('configSteps');
        container.innerHTML = '';
        stepCounter = 0;
        
        if (config.steps) {
            config.steps.forEach(step => addConfigurationStep(step));
        }
        
        openModal('addConfigModal');
    } catch (error) {
        console.error('Error fetching configuration details:', error);
    }
}

// Roles
async function loadRoles() {
    try {
        const response = await fetchAPI('/api/meeting/roles');
        if (response.ok) {
            const roles = await response.json();
            renderRolesList(roles);
            updateRoleSelects(roles);
        }
    } catch (error) {
        console.error('Error loading roles:', error);
    }
}

function renderRolesList(roles) {
    const container = document.getElementById('rolesList');
    container.innerHTML = roles.map(role => `
        <div class="bg-white rounded-xl p-6 shadow-sm border border-border-color hover:shadow-md transition-shadow relative group">
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="deleteRole(${role.id})" class="text-gray-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-lg ${role.is_human ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'} flex items-center justify-center mr-3">
                    <i class="fas ${role.is_human ? 'fa-user' : 'fa-robot'} text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">${role.name}</h3>
                    <p class="text-xs text-gray-500">${role.is_human ? 'Human Role' : 'AI Role'}</p>
                </div>
            </div>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">${role.description || 'No description'}</p>
            <div class="flex flex-wrap gap-1">
                ${(role.skills || '').split(',').map(skill => 
                    skill.trim() ? `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">${skill.trim()}</span>` : ''
                ).join('')}
            </div>
        </div>
    `).join('');
}

async function saveRole() {
    const form = document.getElementById('addRoleForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    data.is_human = form.is_human.checked;
    
    // Handle parameters JSON
    if (data.parameters) {
        try {
            data.parameters = JSON.parse(data.parameters);
        } catch (e) {
            data.parameters = {};
        }
    }

    try {
        const response = await fetchAPI('/api/meeting/roles', 'POST', data);
        if (response.ok) {
            closeModal('addRoleModal');
            loadRoles();
            showToast('Role created successfully', 'success');
        } else {
            showToast('Failed to create role', 'error');
        }
    } catch (error) {
        showToast('Error creating role', 'error');
    }
}

async function deleteRole(id) {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
        const response = await fetchAPI(`/api/meeting/roles/${id}`, 'DELETE');
        if (response.ok) {
            loadRoles();
            showToast('Role deleted successfully', 'success');
        }
    } catch (error) {
        showToast('Error deleting role', 'error');
    }
}

// Groups
async function loadGroups() {
    try {
        const response = await fetchAPI('/api/meeting/groups');
        if (response.ok) {
            const groups = await response.json();
            renderGroupsList(groups);
        }
    } catch (error) {
        console.error('Error loading groups:', error);
    }
}

function renderGroupsList(groups) {
    const container = document.getElementById('groupsList');
    container.innerHTML = groups.map(group => `
        <div class="bg-white rounded-xl p-6 shadow-sm border border-border-color hover:shadow-md transition-shadow relative group">
            <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="deleteGroup(${group.id})" class="text-gray-400 hover:text-red-500">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mr-3">
                    <i class="fas fa-users text-lg"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-800">${group.name}</h3>
                    <p class="text-xs text-gray-500">${group.topic || 'General Discussion'}</p>
                </div>
            </div>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between text-gray-600">
                    <span>Mode:</span>
                    <span class="font-medium text-gray-800 capitalize">${group.meeting_mode?.replace('_', ' ') || 'Discussion'}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                    <span>Members:</span>
                    <span class="font-medium text-gray-800">${group.roles?.length || 0}</span>
                </div>
            </div>
        </div>
    `).join('');
}

async function saveGroup() {
    const form = document.getElementById('addGroupForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected roles
    const selectedRoles = [];
    document.querySelectorAll('input[name="group_roles"]:checked').forEach(cb => {
        selectedRoles.push(parseInt(cb.value));
    });
    data.role_ids = selectedRoles;

    try {
        const response = await fetchAPI('/api/meeting/groups', 'POST', data);
        if (response.ok) {
            closeModal('addGroupModal');
            loadGroups();
            showToast('Group created successfully', 'success');
        } else {
            showToast('Failed to create group', 'error');
        }
    } catch (error) {
        showToast('Error creating group', 'error');
    }
}

async function deleteGroup(id) {
    if (!confirm('Are you sure you want to delete this group?')) return;
    
    try {
        const response = await fetchAPI(`/api/meeting/groups/${id}`, 'DELETE');
        if (response.ok) {
            loadGroups();
            showToast('Group deleted successfully', 'success');
        }
    } catch (error) {
        showToast('Error deleting group', 'error');
    }
}

// API Keys
async function loadApiKeys() {
    try {
        const response = await fetchAPI('/v1/api-keys');
        if (response.ok) {
            apiKeys = await response.json();
            renderApiKeysList();
        }
    } catch (error) {
        console.error('Error loading API keys:', error);
    }
}

function renderApiKeysList() {
    const container = document.querySelector('.api-keys-list');
    if (!container) return;
    
    container.innerHTML = apiKeys.map(key => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
                <div class="font-mono text-sm font-bold text-gray-800">${key.key}</div>
                <div class="text-xs text-gray-500">${key.description || 'No description'}</div>
            </div>
            <button onclick="deleteApiKey('${key.key}')" class="text-gray-400 hover:text-red-500">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

async function saveApiKey() {
    const form = document.getElementById('addApiKeyForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetchAPI('/v1/api-keys', 'POST', data);
        if (response.ok) {
            closeModal('addApiKeyModal');
            loadApiKeys();
            showToast('API Key added successfully', 'success');
        }
    } catch (error) {
        showToast('Error adding API Key', 'error');
    }
}

async function deleteApiKey(key) {
    if (!confirm('Are you sure you want to delete this API Key?')) return;
    
    try {
        const response = await fetchAPI(`/v1/api-keys/${key}`, 'DELETE');
        if (response.ok) {
            loadApiKeys();
            showToast('API Key deleted successfully', 'success');
        }
    } catch (error) {
        showToast('Error deleting API Key', 'error');
    }
}

function generateApiKey() {
    const key = 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    document.querySelector('input[name="api_key"]').value = key;
}

// Utils & Helpers
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    toast.className = `${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300 translate-y-10 opacity-0`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span class="text-sm font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    const t = translations[lang];
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

async function handleAPICredentialsChange() {
    const form = document.getElementById('addModelForm');
    const apiKey = form.api_key.value;
    const apiUrl = form.api_url.value;
    const statusDiv = document.getElementById('modelLoadStatus');
    
    if (!apiKey || !apiUrl) return;
    
    statusDiv.textContent = 'Loading models...';
    statusDiv.className = 'text-xs text-blue-500 mt-1';
    
    try {
        const response = await fetch(`${apiUrl}/models`, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            const select = document.getElementById('modelNameSelect');
            availableModels = data.data || [];
            
            select.innerHTML = '<option value="">Select a model</option>' + 
                availableModels.map(m => `<option value="${m.id}">${m.id}</option>`).join('');
                
            statusDiv.textContent = `Loaded ${availableModels.length} models`;
            statusDiv.className = 'text-xs text-green-500 mt-1';
        } else {
            throw new Error('Failed to load models');
        }
    } catch (error) {
        statusDiv.textContent = 'Could not load models. Please enter manually.';
        statusDiv.className = 'text-xs text-red-500 mt-1';
    }
}

function toggleModelNameInput() {
    isManualModelInput = !isManualModelInput;
    const select = document.getElementById('modelNameSelect');
    const input = document.getElementById('modelNameInput');
    const btn = input.nextElementSibling; // The toggle button
    
    if (isManualModelInput) {
        select.classList.add('hidden');
        input.classList.remove('hidden');
        btn.innerHTML = '<i class="fas fa-list"></i>';
    } else {
        select.classList.remove('hidden');
        input.classList.add('hidden');
        btn.innerHTML = '<i class="fas fa-pen"></i>';
    }
}

function addCustomParameter(key = '', value = '') {
    const container = document.getElementById('customParametersContainer');
    const div = document.createElement('div');
    div.className = 'flex gap-2 custom-param-row';
    div.innerHTML = `
        <input type="text" class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-primary param-key" placeholder="Key" value="${key}">
        <input type="text" class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-primary param-value" placeholder="Value" value="${value}">
        <select class="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-primary param-type">
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
        </select>
        <button type="button" class="text-red-500 hover:text-red-700" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function updateModelSelects() {
    const options = models.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
    
    // Update role model select
    const roleSelect = document.querySelector('#addRoleForm select[name="model_id"]');
    if (roleSelect) roleSelect.innerHTML = options;
    
    // Update group summary model select
    const summarySelect = document.querySelector('#addGroupForm select[name="summary_model_id"]');
    if (summarySelect) summarySelect.innerHTML = options;
}

function updateRoleSelects(roles) {
    const container = document.getElementById('roleCheckboxes');
    if (!container) return;
    
    container.innerHTML = roles.map(role => `
        <label class="flex items-center gap-2 p-1 bg-white rounded border border-gray-100 cursor-pointer">
            <input type="checkbox" name="group_roles" value="${role.id}" class="w-4 h-4 text-primary rounded focus:ring-primary">
            <span class="text-sm text-gray-700">${role.name}</span>
        </label>
    `).join('');

    const hostSelect = document.querySelector('#addRoleForm select[name="host_role_id"]');
    if (hostSelect) {
        hostSelect.innerHTML = '<option value="">None</option>' + 
            roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('');
    }
}

// ChatLLM Interface Logic
// Global variable for auto-scroll control
let autoScroll = true;

// Scroll to bottom function
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (autoScroll && chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (chatMessages) {
        // Show scroll control button
        const scrollControl = document.getElementById('scroll-control');
        if (scrollControl) {
            scrollControl.style.display = 'flex';
        }
    }
}

