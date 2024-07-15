function toggleMenu() {
    const menuContent = document.getElementById('menu-content');
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    document.getElementById('menu-content').style.display = 'none';
}

function hexEncode(data) {
    rfunction hexEncode(data) {
    return data.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

function obfuscateScript(scriptContent) {
    const hexDecodeFunc = `
        return function(data)
            return (data:gsub('..', function(cc)
                return string.char(tonumber(cc, 16))
            end))
        end
    `;
    const dumpedDecodeFunc = hexEncode(btoa(hexDecodeFunc));
    const dumpedScript = hexEncode(btoa(scriptContent));

    return `
        local SansLimited="${dumpedDecodeFunc}";
        local sanslimited=assert(load(SansLimited));
        local Limited="${dumpedScript}";
        local limited=sanslimited(Limited);
        local SANSLIMITED=assert(load(limited));
        SANSLIMITED()
    `;
}

function processFile() {
    const input = document.getElementById('fileInput').files[0];
    if (!input) {
        alert('Please select a file to process.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        const obfuscatedScript = obfuscateScript(fileContent);
        const blob = new Blob([obfuscatedScript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const fileName = input.name.replace(/\.lua$/, '') + '_processed.lua';
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    reader.readAsText(input);
            }
