// =====================================================================
// ESTE ARCHIVO YA NO CONTIENE LA DATA DE ORGAN_DATA.
// La data se encuentra en 'organ_templates.js' y se asume cargada globalmente.
// =====================================================================

// ---------------------------------------------------------------------
// DATA DE MÉDICOS PARA AUTOCOMPLETAR LA FIRMA
// ---------------------------------------------------------------------
const PHYSICIAN_DETAILS = {
    "Dr. Esmayanson de León": {
        specialty: "Médico Sonografista",
        code: "Exq.: 321-23"
    },
    "Dr. Ibrahim Pérez": {
        specialty: "Médico Sonografista",
        code: "Exq.: 000-02"
    },
    "Dr. Randy Báez": {
        specialty: "Médico Sonografista",
        code: "Exq.: 000-3"
    },
    "Dr. Julio Peralta": {
        specialty: "Médico Sonografista",
        code: "Exq.: 000-23"
    }
    // Añade más médicos aquí con sus respectivos datos
};


// ---------------------------------------------------------------------
// FUNCIONES DE UTILIDAD
// ---------------------------------------------------------------------

/**
 * Ejecuta un comando de edición en el contenido editable.
 * @param {string} command - El comando a ejecutar (ej: 'bold', 'justifyCenter').
 * @param {string|null} value - El valor opcional para el comando (ej: color o tamaño).
 */
function executeCommand(command, value = null) {
    document.execCommand(command, false, value);
    // ✅ CORRECCIÓN DE ID: Asegura que el foco vuelva al ID correcto del editor.
    document.getElementById('report-output')?.focus(); 
}

/**
 * Genera el HTML de los datos del paciente.
 */
function generatePatientDataHtml() {
    // Lectura de los campos
    const name = document.getElementById('nombre')?.value || ' ';
    const age = document.getElementById('edad')?.value || ' ';
    const identification = document.getElementById('identificacion')?.value || ' ';
    const physician = document.getElementById('medico-solicitante')?.value || 'Dr/Dra. ';
    const date = document.getElementById('fecha-estudio')?.value || ' ';

    // Formato de fecha
    let formattedDate = ' ';
    if (date) {
        // Simple conversión de 'YYYY-MM-DD' a 'DD/MM/YYYY'
        const parts = date.split('-');
        if (parts.length === 3) {
            formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
    }

    // Genera el HTML con una tabla o estructura simple para impresión
    return `
        <style>
            .patient-data-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 0.9em; }
            .patient-data-table td { padding: 4px 0; border: none; }
            .patient-data-table .label { font-weight: bold; width: 30%; color: #333; }
        </style>
        <table class="patient-data-table">
            <tr>
                <td class="label">Paciente:</td><td>${name}</td>
                <td class="label">Edad:</td><td>${age}</td>
            </tr>
            <tr>
                <td class="label">Identificación/Exp.:</td><td>${identification}</td>
                <td class="label">Fecha Estudio:</td><td>${formattedDate}</td>
            </tr>
            <tr>
                <td class="label">Médico Solicitante:</td><td colspan="3">${physician}</td>
            </tr>
        </table>
    `;
}

/**
 * Actualiza los campos de Especialidad y Código profesional 
 * basándose en la selección del médico sonografista.
 */
function updatePhysicianDetails() {
    const sonografistaSelect = document.getElementById('sonografista');
    const especialidadInput = document.getElementById('especialidad');
    const codigoInput = document.getElementById('codigo-profesional');
    
    // Valores por defecto si no hay selección
    const DEFAULT_SPECIALTY = '[Seleccione Médico]';
    const DEFAULT_CODE = '[Exq.: XXXXXXX]';
    
    if (sonografistaSelect && especialidadInput && codigoInput) {
        const selectedName = sonografistaSelect.value;
        const details = PHYSICIAN_DETAILS[selectedName];
        
        if (details) {
            especialidadInput.value = details.specialty;
            codigoInput.value = details.code;
        } else {
            // No seleccionado, usa valores por defecto
            especialidadInput.value = DEFAULT_SPECIALTY;
            codigoInput.value = DEFAULT_CODE;
        }
    }
}


/**
 * Genera el HTML para el bloque de la firma del médico informante.
 */
function generateSignatureBlockHtml() {
    // Tomar los valores de los campos
    const name = document.getElementById('sonografista')?.value || '';
    const specialty = document.getElementById('especialidad')?.value || 'Médico Sonografista';
    const code = document.getElementById('codigo-profesional')?.value || 'C.P. XXXXXXX';

    // Texto a mostrar si no hay selección
    // Si no hay nombre seleccionado, muestra la línea para firma manual
    const signatureNameText = name || '__________________________';

    return `
        <div class="report-signature-block">
            <div class="signature-line"></div>
            <p class="signature-details">
                <strong>${signatureNameText}</strong><br>
                ${specialty}<br>
                ${code}
            </p>
        </div>
    `;
}

/**
 * Establece la fecha actual en el campo de fecha.
 */
function setTodayDate() {
    const today = new Date();
    const dateField = document.getElementById('fecha-estudio');
    if (dateField) {
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan en 0
        const dd = String(today.getDate()).padStart(2, '0');
        dateField.value = `${yyyy}-${mm}-${dd}`;
    }
}

// ---------------------------------------------------------------------
// 2. LÓGICA DE GESTIÓN DE ÓRGANOS
// ---------------------------------------------------------------------

// Objeto para almacenar el estado de la tabla de órganos
const ORGAN_STATE = {};

/**
 * Inicializa la tabla de órganos con el estado por defecto o el último guardado.
 */
function initOrgans() {
    const tableBody = document.getElementById('organ-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Limpiar el contenido anterior

    // Inicializar o limpiar el estado
    for (const organ in ORGAN_DATA) {
        ORGAN_STATE[organ] = {
            selected_patology: 'Normal', // Valor por defecto
            measure: '',
            select_values: {} // Para manejar las selecciones complejas
        };
    }

    // Llenar la tabla
    for (const organ in ORGAN_DATA) {
        const data = ORGAN_DATA[organ];
        const row = tableBody.insertRow();
        row.id = `row-${organ.replace(/\s/g, '-')}`;

        // Celda 1: Nombre del Órgano
        row.insertCell().textContent = organ;

        // Celda 2: Selector de Patología
        const patologyCell = row.insertCell();
        const select = document.createElement('select');
        select.id = `select-${organ.replace(/\s/g, '-')}`;
        select.className = 'patology-select';
        
        // Opción Normal por defecto
        let optionNormal = document.createElement('option');
        optionNormal.value = 'Normal';
        optionNormal.textContent = 'Normal';
        select.appendChild(optionNormal);

        // Opciones de Patologías
        if (data.patologies) {
            for (const patology in data.patologies) {
                let option = document.createElement('option');
                option.value = patology;
                option.textContent = patology;
                select.appendChild(option);
            }
        }

        // Event Listener para actualizar el estado y el reporte
        select.addEventListener('change', (e) => {
            ORGAN_STATE[organ].selected_patology = e.target.value;
            // Actualizar clase para destacar la fila si no es normal
            row.classList.toggle('patology-selected', e.target.value !== 'Normal');
            updateReportContent();
        });
        
        patologyCell.appendChild(select);

        // Celda 3: Campo de Medida y Selectores Adicionales
        const measureCell = row.insertCell();
        
        // Input de Medida
        const measureInput = document.createElement('input');
        measureInput.type = 'text'; // Cambiado a text para permitir "ND" u otras entradas, aunque la validación es mejor en number
        measureInput.placeholder = data.label;
        measureInput.title = `Rango normal: ${data.range}`;
        measureInput.style.width = '80px'; 
        measureInput.addEventListener('input', (e) => {
            ORGAN_STATE[organ].measure = e.target.value;
            updateReportContent();
        });
        measureCell.appendChild(measureInput);

        // Nota de Rango (si existe)
        if (data.range !== 'ND') {
            const rangeNote = document.createElement('span');
            rangeNote.className = 'range-note';
            rangeNote.textContent = `(${data.range} ${data.label.split('(')[1] || ''})`; // Muestra solo el rango y la unidad
            measureCell.appendChild(rangeNote);
        }

        // Selectores Adicionales (para patologías complejas)
        if (data.select_fields) {
            for (const key in data.select_fields) {
                const fieldContainer = document.createElement('div');
                fieldContainer.style.marginTop = '5px';
                
                const fieldLabel = document.createElement('label');
                fieldLabel.textContent = key.replace(/_/g, ' ') + ': ';
                fieldLabel.style.fontWeight = 'normal';
                fieldLabel.style.fontSize = '0.9em';
                fieldContainer.appendChild(fieldLabel);

                const complexSelect = document.createElement('select');
                complexSelect.id = `select-${organ.replace(/\s/g, '-')}-${key}`;
                
                data.select_fields[key].forEach(optionText => {
                    let option = document.createElement('option');
                    option.value = optionText;
                    option.textContent = optionText;
                    complexSelect.appendChild(option);
                });

                // Inicializar el estado de la selección
                ORGAN_STATE[organ].select_values[key] = data.select_fields[key][0]; 

                complexSelect.addEventListener('change', (e) => {
                    ORGAN_STATE[organ].select_values[key] = e.target.value;
                    updateReportContent();
                });

                fieldContainer.appendChild(complexSelect);
                measureCell.appendChild(fieldContainer);
            }
        }
    }
}


/**
 * Genera el texto de descripción para un órgano, reemplazando placeholders.
 * @param {string} organ - Nombre del órgano.
 * @returns {string} - El HTML de la descripción.
 */
function generateOrganDescription(organ) {
    const state = ORGAN_STATE[organ];
    const data = ORGAN_DATA[organ];
    let description = '';
    let isPatology = state.selected_patology !== 'Normal';

    if (isPatology) {
        // Usar la plantilla de patología
        const patologyData = data.patologies[state.selected_patology];
        description = patologyData ? patologyData.text : 'Descripción de patología no encontrada.';
    } else {
        // Usar la plantilla normal
        description = data.normal;
    }

    // 1. Reemplazar la medida
    description = description.replace(/\[MEDIDA\]/g, state.measure || 'S/M');

    // 2. Reemplazar selectores complejos (si existen)
    if (data.select_fields && isPatology) {
        for (const key in state.select_values) {
            const placeholder = `[${key}]`;
            const value = state.select_values[key];
            // Asegura que el placeholder se reemplace si la patología usa el campo
            description = description.replace(placeholder, value);
        }
    }
    
    // Devolver el texto envuelto en un párrafo (mejor para el editor)
    return `<p><strong>${organ}:</strong> ${description}</p>`;
}


// ---------------------------------------------------------------------
// 3. GENERACIÓN DEL REPORTE FINAL
// ---------------------------------------------------------------------

/**
 * Genera y actualiza el contenido completo del reporte en el DOM.
 */
function updateReportContent() {
    // Generar la data del paciente para impresión
    const patientDataHtml = generatePatientDataHtml();
    document.getElementById('report-patient-data-print').innerHTML = patientDataHtml;

    // --- 1. Generar Descripciones de Órganos ---
    let organDescriptionsHtml = '';
    
    for (const organ in ORGAN_STATE) {
        organDescriptionsHtml += generateOrganDescription(organ);
    }
    
    // Inyectar las descripciones en el div editable
    const organDescriptionsDiv = document.getElementById('organ-descriptions');
    if (organDescriptionsDiv) {
        organDescriptionsDiv.innerHTML = organDescriptionsHtml;
    }
    
    // --- 2. Generar Impresión Diagnóstica y Sugerencias ---
    let diagnosticImpressions = [];
    let suggestions = [];
    
    // Recolectar las impresiones y sugerencias de las patologías seleccionadas
    for (const organ in ORGAN_STATE) {
        const state = ORGAN_STATE[organ];
        if (state.selected_patology !== 'Normal') {
            const patology = ORGAN_DATA[organ]?.patologies?.[state.selected_patology];
            if (patology) {
                // Impresión Diagnóstica
                if (patology.diagnostic_impression) {
                    diagnosticImpressions.push(patology.diagnostic_impression);
                }
                // Sugerencia
                if (patology.suggestion) {
                    suggestions.push(patology.suggestion);
                }
            }
        }
    }
    
    // --- 3. Añadir Notas Extras a la Impresión Diagnóstica ---
    const extraNotes = document.getElementById('notes-box')?.value.trim();
    if (extraNotes) {
        diagnosticImpressions.push(extraNotes);
    }
    
    // Formatear la Impresión Diagnóstica
    const diagnosticOutput = document.getElementById('diagnostic-impression-output');
    if (diagnosticOutput) {
        if (diagnosticImpressions.length > 0) {
            // Un listado de las impresiones
            diagnosticOutput.innerHTML = '<ul>' + diagnosticImpressions.map(i => `<li>${i}</li>`).join('') + '</ul>';
        } else {
            // Si no hay patologías y no hay notas extras
            diagnosticOutput.innerHTML = '<p>Estudio sonográfico dentro de límites normales para la edad.</p>';
        }
    }

    // --- 4. Añadir Sugerencias Globales ---
    const sugClinico = document.getElementById('sugerencia-clinico')?.checked;
    const sugComplementario = document.getElementById('sugerencia-complementario')?.checked;

    if (sugClinico) {
        suggestions.push("Correlación bajo contexto clínico-laboratorial.");
    }
    if (sugComplementario) {
        suggestions.push("Considerar estudio complementario de imagen (TAC/RMN) según hallazgos y evolución clínica.");
    }
    
    // Formatear las Sugerencias
    const suggestionOutput = document.getElementById('suggestion-output');
    if (suggestionOutput) {
        if (suggestions.length > 0) {
            // Un listado de las sugerencias
            suggestionOutput.innerHTML = '<ul>' + suggestions.map(s => `<li>${s}</li>`).join('') + '</ul>';
        } else {
            suggestionOutput.innerHTML = '<p>No se requieren sugerencias adicionales.</p>';
        }
    }
    
    // --- 5. Generar Bloque de Firma ---
    const signatureHtml = generateSignatureBlockHtml();
    const signatureOutput = document.getElementById('signature-block-output');
    if (signatureOutput) {
        signatureOutput.innerHTML = signatureHtml;
    }
}


// ---------------------------------------------------------------------
// 4. GESTIÓN DE EVENTOS Y CONFIGURACIÓN
// ---------------------------------------------------------------------

/**
 * Configura los event listeners para la barra de herramientas WYSIWYG.
 */
function setupToolbarEventListeners() {
    // 1. Botones de Comando (Bold, Italic, Align, etc.)
    document.querySelectorAll('.report-toolbar .tool-btn').forEach(button => {
        const command = button.getAttribute('data-command');
        if (command) {
            button.addEventListener('click', () => executeCommand(command));
        }
    });

    // 2. Selector de Color
    const colorInput = document.getElementById('font-color');
    if (colorInput) {
        colorInput.addEventListener('change', (e) => {
            executeCommand('foreColor', e.target.value);
        });
    }
}


/**
 * Configuración de todos los Event Listeners principales
 */
function setupEventListeners() {
    
    // 1. Botón de Generar/Actualizar (Si se desea un control manual)
    document.getElementById('generate-report-btn')?.addEventListener('click', updateReportContent);

    // 2. Botón Nuevo Informe (Para limpiar)
    document.getElementById('new-report-btn')?.addEventListener('click', () => {
        // Limpiar el formulario de paciente
        document.getElementById('patient-form')?.reset(); 
        
        // Limpiar el select de médico y sus detalles
        const sonografistaSelect = document.getElementById('sonografista');
        if (sonografistaSelect) {
            sonografistaSelect.selectedIndex = 0;
            updatePhysicianDetails(); // Restablece los campos de solo lectura a los valores por defecto
        }
        
        // Limpiar campos finales
        document.getElementById('notes-box').value = '';
        document.getElementById('sugerencia-clinico').checked = false;
        document.getElementById('sugerencia-complementario').checked = false;

        // Limpiar el contenido del editor WYSIWYG
        const reportOutput = document.getElementById('report-output');
        if (reportOutput) {
             reportOutput.innerHTML = '<div id="organ-descriptions"></div>'; // Restablece solo el div interno
        }

        // Reinicia la tabla de órganos con el estado por defecto y recarga
        initOrgans(); 
        setTodayDate();
        updateReportContent(); // Carga el informe 'Normal' con los valores por defecto
        
        alert('Informe reiniciado con los valores por defecto.');
    });
    
    // 3. Configuración de la barra de herramientas
    setupToolbarEventListeners(); 
}

// =====================================================================
// 5. INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Se asegura que la data esté disponible
    if (typeof ORGAN_DATA === 'undefined' || Object.keys(ORGAN_DATA).length === 0) {
        console.error("Error FATAL: La constante ORGAN_DATA no está definida o está vacía. Asegúrese de cargar 'organ_templates.js' antes de 'script.js' en el HTML.");
        // Provee un objeto vacío para evitar fallos si la data no está cargada.
        window.ORGAN_DATA = {}; 
        return; 
    }
    
    setTodayDate();
    initOrgans();
    updatePhysicianDetails(); // Carga los valores de especialidad por defecto al inicio
    setupEventListeners();
    updateReportContent(); // Carga el informe 'Normal' predeterminado al inicio
});