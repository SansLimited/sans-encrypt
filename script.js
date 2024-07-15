function hexEncode(data) {
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
    
    const dumpedDecodeFunc = hexEncode(hexDecodeFunc);
    const dumpedScript = hexEncode(scriptContent);

    return `
        local SansLimited="${dumpedDecodeFunc}";
        local sanslimited=load(SansLimited)();
        local Limited="${dumpedScript}";
        local limited=sanslimited(Limited);
        local SANSLIMITED=load(limited);
        SANSLIMITED();
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

        const fileName = input.name.replace(/\.lua$/, '') + '.lua'; // Ensures .lua extension
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url); // Clean up
    };
    reader.readAsText(input);
}
