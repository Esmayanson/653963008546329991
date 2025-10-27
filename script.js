// =====================================================================
// ESTE ARCHIVO YA NO CONTIENE LA DATA DE ORGAN_DATA.
// La data se encuentra en 'organ_templates.js' y se asume cargada globalmente.
// =====================================================================


// ---------------------------------------------------------------------
// FUNCIONES CLAVE DE LA NUEVA FUNCIONALIDAD (Impresión Diagnóstica)
// ---------------------------------------------------------------------

/**
 * Función principal para compilar todas las secciones y actualizar el editor.
 */
function updateReportContent() {
    const organDescriptionsArea = document.getElementById('organ-descriptions');
    let reportText = '';
    
    // 1. CREAR ARRAY PARA RECOLECTAR HALLAZGOS Y SUGERENCIAS AUTOMÁTICAS
    const collectedPathologies = []; 

    // 2. COMPILACIÓN DE DATOS DEL PACIENTE AÑADIDO
    document.getElementById('patient-data-output').innerHTML = generatePatientDataHtml(); // ✅ MODIFICADO: Usa la estructura simple para CSS Grid

    // 3. COMPILACIÓN DE DESCRIPCIONES DE ÓRGANOS
    document.querySelectorAll('#organ-list .organ-item').forEach(organItem => {
        const organName = organItem.dataset.organ;
        // Asume que ORGAN_DATA está disponible globalmente desde organ_templates.js
        const organData = ORGAN_DATA[organName]; 
        
        // Obtener datos del input y rango
        const measureInput = organItem.querySelector('.measure-input');
        const measureValue = measureInput ? measureInput.value || '___' : '___';
        const rangeText = organData ? organData.range : 'ND';

        if (!organData) return; 

        const isPatologico = organItem.querySelector('.toggle-btn.patologico').classList.contains('active');
        let description = '';
        
        if (!isPatologico) {
            // ESTADO NORMAL
            description = organData.normal
                .replace('[MEDIDA]', measureValue)
                .replace('[RANGE]', rangeText);
        } else {
            // ESTADO PATOLÓGICO
            const selectedPathologyInputs = organItem.querySelectorAll('.patology-checkbox:checked');
            
            if (selectedPathologyInputs.length > 0) {
                // Compilar el texto de las patologías seleccionadas
                description = Array.from(selectedPathologyInputs).map(input => {
                    const patologyKey = input.value;
                    const patologyData = organData.patologies[patologyKey];
                    
                    // COLECTAR HALLAZGOS Y SUGERENCIAS
                    if (patologyData) {
                        collectedPathologies.push({
                            organ: organName,
                            finding: patologyKey, 
                            suggestion: patologyData.suggestion || '' 
                        });
                    }

                    const patologyTemplate = patologyData?.text || `[Descripción no definida para ${patologyKey}]`;
                    return patologyTemplate
                        .replace('[MEDIDA]', measureValue)
                        .replace('[RANGE]', rangeText);
                }).join('<br> • '); 
                
                description = `Hallazgos: ${description}`;
            } else {
                // Si está Patológico pero no seleccionó nada, usar la plantilla normal para tener texto
                description = organData.normal
                    .replace('[MEDIDA]', measureValue)
                    .replace('[RANGE]', rangeText);
            }
        }

        reportText += `<p><strong>${organName.toUpperCase()}:</strong> ${description}</p>\n`;
    });

    organDescriptionsArea.innerHTML = reportText;
    
    // 4. COMPILACIÓN DE CONCLUSIONES (Impresión Diagnóstica)
    const conclusionsSection = document.getElementById('report-conclusions-final');
    const notesBox = document.getElementById('notes-box');
    const staticHeading = conclusionsSection.querySelector('.report-heading');

    // 1. Limpiar el contenido dinámico anterior: eliminamos todos los elementos entre el título estático y el textarea.
    let current = staticHeading.nextElementSibling;
    while (current && current !== notesBox) {
        const next = current.nextElementSibling;
        current.remove();
        current = next;
    }
    
    // 2. Generar e insertar la sección de conclusiones (solo findings y suggestions) justo antes del textarea.
    notesBox.insertAdjacentHTML('beforebegin', generateConclusionSection(collectedPathologies));

    // 5. ACTUALIZAR VISTA PREVIA DE FIRMA
    const sonografista = document.getElementById('sonografista').value || '__________________________';
    document.getElementById('sonografista-signature-preview').textContent = sonografista !== '__________________________' ? `Dr(a). ${sonografista}` : sonografista;
}


/**
 * Formatea y genera el HTML para mostrar los datos del paciente.
 * Versión optimizada para impresión (usa divs simples para display: grid en CSS) y
 * elimina las líneas de relleno si el campo está vacío.
 * @returns {string} El HTML formateado para la sección de datos del paciente.
 */
function generatePatientDataHtml() {
    // Obtener valores de los campos
    // MODIFICACIÓN CLAVE: Si el valor está vacío, se usa un espacio ' ' en lugar de la línea larga.
    let nombre = document.getElementById('nombre').value;
    nombre = nombre.toUpperCase() || ' '; 

    const edad = document.getElementById('edad').value || ' ';
    const sexo = document.getElementById('sexo').value || ' ';
    const identificacion = document.getElementById('identificacion').value || ' ';
    
    let medicoSolicitante = document.getElementById('medico-solicitante').value;
    medicoSolicitante = medicoSolicitante.toUpperCase() || ' ';
    
    const fechaInput = document.getElementById('fecha-estudio').value;
    
    // Formatear la fecha para la presentación (DD/MM/YYYY)
    let fechaFormateada = ' ';
    if (fechaInput) {
        const [year, month, day] = fechaInput.split('-');
        fechaFormateada = `${day}/${month}/${year}`;
    }

    // Estructura simple con clases para CSS Grid
    // Esta estructura es compacta y se convierte en 3 columnas en la impresión (ver CSS).
    return `
        <div class="patient-info-block print-grid-container" id="patient-data-print-container">
            <div class="patient-info-line"><strong>Nombre:</strong> ${nombre}</div>
            <div class="patient-info-line"><strong>Edad:</strong> ${edad}</div>
            <div class="patient-info-line"><strong>Sexo:</strong> ${sexo}</div>
            <div class="patient-info-line"><strong>Identificación:</strong> ${identificacion}</div>
            <div class="patient-info-line"><strong>Médico Solicitante:</strong> ${medicoSolicitante}</div>
            <div class="patient-info-line"><strong>Fecha de Estudio:</strong> ${fechaFormateada}</div>
        </div>
    `;
}

/**
 * Genera la sección de Impresión Diagnóstica (Conclusiones) con las sugerencias y notas.
 * ❌ No genera el título IMPRESIÓN DIAGNÓSTICA (es estático en HTML).
 */
function generateConclusionSection(collectedPathologies) {
    const notesBox = document.getElementById('notes-box').value.trim();
    const sugerenciaClinico = document.getElementById('sugerencia-clinico').checked;
    const sugerenciaComplementario = document.getElementById('sugerencia-complementario').checked;
    
    let findingsHTML = '';
    const suggestionsSet = new Set(); // Usamos Set para evitar sugerencias duplicadas

    // 1. Procesar Hallazgos Patológicos Específicos (Impresión Diagnóstica)
    if (collectedPathologies.length > 0) {
        findingsHTML += '<p style="font-weight: bold; margin-bottom: 5px;">HALLAZGOS PATOLÓGICOS ESPECÍFICOS:</p>';
        findingsHTML += '<ul style="padding-left: 20px; margin-top: 0; margin-bottom: 15px; font-size: 11pt;">'; 
        
        collectedPathologies.forEach(p => {
            findingsHTML += `<li style="margin-bottom: 3px;"><strong>${p.organ}:</strong> ${p.finding}</li>`;
            
            if (p.suggestion) {
                suggestionsSet.add(p.suggestion);
            }
        });
        findingsHTML += '</ul>';
    }

    // 2. Añadir la nota adicional del usuario (Si la hay)
    if (notesBox) {
        // En lugar de añadir la nota al findingsHTML, la añadimos como una nota general en el cuerpo.
        findingsHTML += `<p style="margin-bottom: 15px; font-size: 11pt;"><strong>Nota Adicional:</strong> ${notesBox}</p>`;
    }

    // 3. Procesar Sugerencias Predefinidas (Checkboxes)
    if (sugerenciaClinico) {
        suggestionsSet.add("Correlacionar con el cuadro clínico del paciente.");
    }
    if (sugerenciaComplementario) {
        suggestionsSet.add("Se sugiere complementar con un estudio de imagen o laboratorio de seguimiento.");
    }
    
    const finalSuggestions = Array.from(suggestionsSet);
    let suggestionsHTML = '';

    // 4. Construir la Sección de Sugerencias
    if (finalSuggestions.length > 0) {
        suggestionsHTML += '<p style="font-weight: bold; margin-top: 20px; margin-bottom: 5px; border-top: 1px solid #ddd; padding-top: 10px;">SUGERENCIAS DEL ESTUDIO:</p>';
        suggestionsHTML += '<ul style="padding-left: 20px; margin-top: 0; margin-bottom: 10px; font-size: 11pt;">';
        finalSuggestions.forEach(s => {
            suggestionsHTML += `<li style="margin-bottom: 3px;">${s}</li>`;
        });
        suggestionsHTML += '</ul>';
    }


    // 5. Compilar la salida final
    // ❌ MODIFICACIÓN DEL PASO 2: Se ELIMINA el título dinámico.
    let conclusionHTML = ''; 
    
    // Contenido a mostrar
    if (collectedPathologies.length === 0 && !notesBox && finalSuggestions.length === 0) {
        conclusionHTML += '<p style="margin-bottom: 5px; font-size: 11pt;"><strong>Sin hallazgos patológicos relevantes.</strong></p>';
    } else {
        conclusionHTML += findingsHTML;
        conclusionHTML += suggestionsHTML;
    }
    
    return conclusionHTML;
}

// =====================================================================
// 2. FUNCIONES DE UTILIDAD Y COMPORTAMIENTO
// =====================================================================

/**
 * Establece la fecha actual en el campo de input type="date".
 */
function setTodayDate() {
    const dateInput = document.getElementById('fecha-estudio');
    if (!dateInput) return;
    const today = new Date();
    // Formato YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
}

/**
 * Maneja el cambio de estado Normal/Patológico y muestra/oculta el detalle.
 * @param {HTMLElement} organItem - El contenedor <li> del órgano.
 */
function handleOrganToggle(organItem) {
    const patologyDetails = organItem.querySelector('.patology-details');
    const patologicoBtn = organItem.querySelector('.toggle-btn.patologico');
    
    const isPatologico = patologicoBtn.classList.contains('active');

    if (isPatologico) {
        patologyDetails.classList.remove('hidden');
    } else {
        patologyDetails.classList.add('hidden');
        
        // ✅ SUGERENCIA IMPLEMENTADA: Desmarcar todos los checkboxes patológicos al ir a 'Normal'
        organItem.querySelectorAll('.patology-checkbox:checked').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // Asegurar que la medida se valida si el input ya tiene valor
    const measureInput = organItem.querySelector('.measure-input');
    if (measureInput && measureInput.value) {
        validateMeasurement(measureInput);
    }

    // Regenerar el informe para reflejar el cambio
    updateReportContent();
}

/**
 * Valida la medida con respecto al rango normal y aplica color rojo si está fuera.
 */
function validateMeasurement(input) {
    const organItem = input.closest('.organ-item');
    const rangeInfoElement = organItem.querySelector('.range-info');
    if (!rangeInfoElement) return; // Salir si no hay elemento de rango
    
    const rangeText = rangeInfoElement.textContent;
    const rangeMatch = rangeText.match(/(\d+\.?\d*)-?(\d+\.?\d*)?/);
    const value = parseFloat(input.value);
    
    let isOutsideRange = false;

    if (rangeMatch && !isNaN(value)) {
        if (rangeMatch[2]) { // Rango Mínimo-Máximo (ej. 10-15)
            const min = parseFloat(rangeMatch[1]);
            const max = parseFloat(rangeMatch[2]);
            if (value < min || value > max) {
                isOutsideRange = true;
            }
        } else if (rangeText.includes('<')) { // Máximo permitido (ej. <5.0)
            const max = parseFloat(rangeMatch[1]);
            if (value > max) {
                isOutsideRange = true;
            }
        }
        
        // Aplica el color rojo si está fuera de rango
        input.style.color = isOutsideRange ? 'var(--color-danger)' : 'black';
    } else {
        // Quita el color si no hay valor o no es un número válido
        input.style.color = 'black';
    }

    updateReportContent();
}

// =====================================================================
// 4. INICIALIZACIÓN Y MANEJO DE EVENTOS (SETUP)
// =====================================================================

/**
 * Inicializa la lista de órganos de forma dinámica.
 */
function initOrgans() {
    const organListContainer = document.getElementById('organ-list');
    organListContainer.innerHTML = ''; // Limpiar lista existente
    
    // Cargar los órganos de la DATA (Asume ORGAN_DATA global)
    Object.keys(ORGAN_DATA).forEach(organName => {
        const data = ORGAN_DATA[organName];
        const unit = data.label.includes('(cm)') ? ' cm' : (data.label.includes('(mm)') ? ' mm' : ''); // Determinar la unidad
        const rangeDisplay = data.range === 'ND' ? 'ND' : `Rango: ${data.range} ${unit.trim()}`;
        
        // Construir la lista de patologías como checkboxes
        let patologyOptionsHTML = '';
        if (data.patologies) {
            patologyOptionsHTML = Object.keys(data.patologies).map(key => `
                <div style="margin-bottom: 5px;">
                    <input type="checkbox" class="patology-checkbox" value="${key}" id="${organName}-${key}">
                    <label for="${organName}-${key}">${key}</label>
                </div>
            `).join('');
        }

        const organItemHTML = `
            <li class="organ-item" data-organ="${organName}">
                <label>${organName.replace('Biliar', ' Biliar').toUpperCase()}:</label>
                <div class="toggle-group">
                    <button class="toggle-btn normal active" data-estado="Normal">Normal</button>
                    <button class="toggle-btn patologico" data-estado="Patologico">Patológico</button>
                </div>
                <div class="patology-details hidden">
                    <div class="measurement-field">
                        <label>${data.label}:</label>
                        <input type="number" step="0.1" class="measure-input" 
                            placeholder="Ej. ${data.range.split('-')[0]} ${unit.trim()}">
                        <span class="range-info">${rangeDisplay}</span>
                    </div>
                    <p style="font-weight: bold; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 5px;">Hallazgos/Patologías:</p>
                    ${patologyOptionsHTML}
                </div>
            </li>
        `;
        organListContainer.insertAdjacentHTML('beforeend', organItemHTML);
    });
}

/**
 * Añade todos los Event Listeners necesarios para la interacción.
 */
function setupEventListeners() {
    // 1. Escuchar el cambio de estado (Normal/Patológico)
    document.getElementById('organ-list').addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('toggle-btn')) {
            const organItem = target.closest('.organ-item');
            
            // Toggle de clases 'active'
            organItem.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            
            handleOrganToggle(organItem);
        }
    });

    // 2. Escuchar cambios en mediciones y patologías
    document.getElementById('organ-list').addEventListener('input', (event) => {
        if (event.target.classList.contains('measure-input')) {
            validateMeasurement(event.target);
        } else if (event.target.classList.contains('patology-checkbox')) {
            updateReportContent();
        }
    });

    // 3. Escuchar cambios en los datos del paciente (para la firma) y en el notes-box
    document.getElementById('patient-form').addEventListener('input', updateReportContent);
    document.getElementById('notes-box').addEventListener('input', updateReportContent);

    // 4. Escuchar cambios en las casillas de sugerencias (que movimos al panel lateral)
    document.getElementById('conclusions-module-sidebar').addEventListener('change', updateReportContent);

    // 5. Botón Nuevo Informe (Amarillo)
    document.getElementById('new-report-btn').addEventListener('click', () => {
        if (confirm('¿Está seguro de que desea iniciar un nuevo informe? Se perderán todos los datos no guardados.')) {
            document.getElementById('patient-form').reset();
            document.getElementById('notes-box').value = '';
            
            document.getElementById('sugerencia-clinico').checked = false;
            document.getElementById('sugerencia-complementario').checked = false;
            
            setTodayDate();
            initOrgans(); 
            updateReportContent(); 
            alert('El informe ha sido reiniciado.');
        }
    });

    // 6. Botón Generar Informe (Azul) - Compilación/Previsualización
    document.getElementById('generate-report-btn').addEventListener('click', () => {
        updateReportContent();
        alert('Contenido del informe actualizado y listo para impresión.');
    });

    // 7. Botón Imprimir/PDF (Verde)
    document.getElementById('print-save-btn').addEventListener('click', () => {
        updateReportContent(); // Asegura la última compilación antes de imprimir
        
        // ✅ Sugerencia implementada: Enfocar el editor antes de imprimir
        const reportOutput = document.getElementById('report-output');
        if (reportOutput) {
            reportOutput.focus(); 
        }

        window.print(); // Llama a la función de impresión del navegador
    });
}

// =====================================================================
// 5. INICIALIZACIÓN AL CARGAR EL DOCUMENTO
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Se asume que 'organ_templates.js' ya cargó ORGAN_DATA.
    if (typeof ORGAN_DATA === 'undefined') {
        console.error("Error: La constante ORGAN_DATA no está definida. Asegúrese de cargar 'organ_templates.js' antes de 'script.js' en el HTML.");
        // Intentar una inicialización básica para evitar errores fatales.
        window.ORGAN_DATA = {};
    }
    
    setTodayDate();
    initOrgans();
    setupEventListeners();
    updateReportContent(); // Carga el informe 'Normal' predeterminado al inicio
});