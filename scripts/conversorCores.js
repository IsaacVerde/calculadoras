// scripts/conversorCores.js (VERSÃO COM PALETA DE CORES)
{
    // Seleção dos elementos, incluindo o novo seletor
    const previewCor = document.getElementById('preview-cor');
    const colorPickerInput = document.getElementById('color-picker-input'); // NOVO
    const hexInput = document.getElementById('hex-input');
    const rgbRInput = document.getElementById('rgb-r-input');
    const rgbGInput = document.getElementById('rgb-g-input');
    const rgbBInput = document.getElementById('rgb-b-input');
    const hslHInput = document.getElementById('hsl-h-input');
    const hslSInput = document.getElementById('hsl-s-input');
    const hslLInput = document.getElementById('hsl-l-input');
    
    let isUpdating = false;

    function updateAllFields(source) {
        if (isUpdating) return;
        isUpdating = true;

        let r, g, b;

        try {
            // Lógica principal de conversão (igual a antes)
            if (source === 'hex' && hexInput.value.match(/^#?([0-9a-fA-F]{3}){1,2}$/)) {
                [r, g, b] = hexToRgb(hexInput.value);
            } else if (source === 'rgb') {
                r = parseInt(rgbRInput.value || 0);
                g = parseInt(rgbGInput.value || 0);
                b = parseInt(rgbBInput.value || 0);
            } else if (source === 'hsl') {
                const h = parseInt(hslHInput.value || 0);
                const s = parseInt(hslSInput.value || 0);
                const l = parseInt(hslLInput.value || 0);
                [r, g, b] = hslToRgb(h, s, l);
            } else {
                isUpdating = false;
                return;
            }

            r = Math.min(255, Math.max(0, r));
            g = Math.min(255, Math.max(0, g));
            b = Math.min(255, Math.max(0, b));

            // Atualiza os campos
            const hexValue = rgbToHex(r, g, b); // Guarda o valor HEX
            if (source !== 'hex') {
                hexInput.value = hexValue;
            }
            // ATUALIZA A PALETA DE CORES! (NOVO)
            colorPickerInput.value = hexValue;

            if (source !== 'rgb') {
                rgbRInput.value = r;
                rgbGInput.value = g;
                rgbBInput.value = b;
            }
            if (source !== 'hsl') {
                const [h, s, l] = rgbToHsl(r, g, b);
                hslHInput.value = h;
                hslSInput.value = s;
                hslLInput.value = l;
            }

            previewCor.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        } catch (error) {
            console.error("Erro de conversão:", error);
        } finally {
            isUpdating = false;
        }
    }

    // --- Listeners de Evento ---

    // NOVO LISTENER PARA A PALETA DE CORES
    colorPickerInput.addEventListener('input', () => {
        // Quando a paleta muda, ela define o valor HEX...
        hexInput.value = colorPickerInput.value.toUpperCase();
        // ...e chama a função principal para atualizar todo o resto.
        updateAllFields('hex');
    });

    hexInput.addEventListener('input', () => updateAllFields('hex'));
    rgbRInput.addEventListener('input', () => updateAllFields('rgb'));
    rgbGInput.addEventListener('input', () => updateAllFields('rgb'));
    rgbBInput.addEventListener('input', () => updateAllFields('rgb'));
    hslHInput.addEventListener('input', () => updateAllFields('hsl'));
    hslSInput.addEventListener('input', () => updateAllFields('hsl'));
    hslLInput.addEventListener('input', () => updateAllFields('hsl'));

    // --- Funções Auxiliares de Conversão (permanecem as mesmas) ---
    // ... (todo o resto do código, de hexToRgb até hslToRgb, continua aqui igual)
    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        hex = hex.startsWith('#') ? hex.slice(1) : hex;
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        return [r, g, b];
    }
    function rgbToHex(r, g, b) {
        const toHex = c => ('0' + c.toString(16)).slice(-2);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }
    function hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h / 360 + 1/3);
            g = hue2rgb(p, q, h / 360);
            b = hue2rgb(p, q, h / 360 - 1/3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}