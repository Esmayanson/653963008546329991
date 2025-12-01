// =====================================================================
// PLANTILLAS Y RANGOS DE ÓRGANOS - VERSIÓN COMPLETA CON TODAS LAS PATOLOGÍAS
// =====================================================================

const ORGAN_DATA = {
    'Higado': {
        range: '10-15',
        label: 'Lóbulo derecho (cm)',
        normal: "Morfología y dimensiones conservadas. Contornos regulares. Parénquima de ecogenicidad homogénea. Sin evidencia de lesiones focales (masas o tumores). Midiendo [MEDIDA] cm.",
        patologies: {
            'Hepatomegalia': {
                text: "Se observa hígado con eje craneocaudal del lóbulo derecho aumentado para los valores de referencia (normal 10-15 cm). Parénquima con ecotextura homogénea y ecogenicidad normal según correlación clínica. Bordes regulares. Relaciones vasculares y permeabilidad del sistema porta conservadas. No se identifican lesiones focales en el campo explorado. Midiendo [MEDIDA] cm.",
                suggestion: "Correlación bajo contexto clínico-laboratorial y considerar estudio de función hepática.",
                diagnostic_impression: "Hepatomegalia."
            },
            'Esteatosis Hepática (Hígado Graso)': {
                text: "Aumento difuso de la ecogenicidad del parénquima hepático con pérdida de la visualización normal de las paredes vasculares y del diafragma. Patrón sugestivo de infiltración grasa difusa (esteatosis). Midiendo [MEDIDA] cm.",
                suggestion: "Correlación con perfil lipídico. Modificación de estilo de vida y control metabólico.",
                diagnostic_impression: "Esteatosis Hepática (Hígado graso)."
            },
            'Hepatitis Aguda': {
                text: "Parénquima con ecogenicidad disminuida, ecotextura finamente heterogénea y refuerzo periportal marcado. Aumento de la penetración acústica. Bordes levemente rectificados. Midiendo [MEDIDA] cm.",
                suggestion: "Referir para estudio de etiología viral, tóxica o autoinmune. Evaluación de transaminasas.",
                diagnostic_impression: "Hallazgos sugestivos de Hepatitis Aguda."
            },
            'Hepatitis Crónica': {
                text: "Ecogenicidad levemente aumentada, ecotextura heterogénea con patrón granular, bordes discretamente irregulares. Refuerzo periportal moderado. Puede mostrar signos iniciales de fibrosis. Midiendo [MEDIDA] cm.",
                suggestion: "Control y seguimiento. Evaluación de fibrosis por elastografía o biopsia si es pertinente.",
                diagnostic_impression: "Hallazgos compatibles con Hepatitis Crónica."
            },
            'Cirrosis Hepática': {
                text: "Morfología compatible con cirrosis, con contornos irregulares, lobularidad aumentada y ecotextura heterogénea de aspecto nodular. Ecogenicidad elevada. Arquitectura vascular distorsionada con refuerzo periportal. Evaluación Doppler sin evidencia de trombosis portal. No se identifican lesiones focales en el estudio actual. Midiendo [MEDIDA] cm.",
                suggestion: "Referencia a gastroenterología/hepatología. Evaluación de várices esofágicas y despistaje de hepatocarcinoma (HCC).",
                diagnostic_impression: "Hallazgos compatibles con Cirrosis Hepática."
            },
            'Nódulo Hepático': {
                text: "Se identifica nódulo hepático de [MEDIDA] cm de diámetro. Lesión con bordes regulares y patrón interno homogéneo. Evaluación Doppler con vascularidad periférica. Resto del parénquima sin lesiones adicionales.",
                suggestion: "Clasificación con sistema LI-RADS si aplica. Control con TC o RM con contraste para caracterización.",
                diagnostic_impression: "Nódulo Hepático (pendiente de caracterización)."
            },
            'Hemangioma Hepático': {
                text: "Se identifica lesión hiperecogénica de bordes bien definidos, con patrón homogéneo y refuerzo acústico posterior leve. No se observa vascularidad interna significativa en Doppler. Mide [MEDIDA] cm.",
                suggestion: "Generalmente benigno, seguimiento ecográfico si es de gran tamaño o atípico.",
                diagnostic_impression: "Hemangioma Hepático (probable)."
            },
            'Quiste Hepático Simple': {
                text: "Se identifica quiste simple de [MEDIDA] cm, contenido anecoico, contornos bien definidos, paredes finas y refuerzo acústico posterior prominente. Sin septos ni vascularidad al Doppler.",
                suggestion: "Generalmente no requiere seguimiento, salvo que sea sintomático o de gran tamaño.",
                diagnostic_impression: "Quiste Hepático Simple."
            },
            'Absceso Hepático': {
                text: "Se identifica colección heterogénea de [MEDIDA] cm, con contenido hipoecoico a mixto, bordes mal definidos y ecos internos compatibles con material purulento. Presenta refuerzo posterior y engrosamiento parietal. Doppler con vascularidad periférica aumentada.",
                suggestion: "Hemocultivos y aspiración/drenaje guiado por imagen. Tratamiento antibiótico empírico.",
                diagnostic_impression: "Colección/Absceso Hepático (pendiente de etiología)."
            },
            'Metástasis Hepáticas': {
                text: "Se identifican múltiples lesiones focales hepáticas de tamaños variables, con patrón ecográfico heterogéneo. Algunas presentan halo hipoecoico periférico (patrón en diana). La mayor mide [MEDIDA] cm.",
                suggestion: "Búsqueda de tumor primario. Estudios de extensión con TC o RM. Biopsia guiada si es necesario.",
                diagnostic_impression: "Lesiones focales hepáticas sugestivas de Metástasis."
            },
            'Trombosis de Vena Porta': {
                text: "Presencia de material ecogénico dentro del lumen de la vena porta, con ausencia completa o parcial de flujo al Doppler color. Vaso distendido.",
                suggestion: "Urgencia. Evaluación inmediata para inicio de anticoagulación y descartar causa subyacente.",
                diagnostic_impression: "Trombosis de Vena Porta."
            }
        }
    },
    'Vesicula Biliar': {
        range: 'ND', 
        label: 'Pared (mm)',
        normal: "Vesícula biliar distendida con paredes finas (< 3 mm). Contenido anecoico, sin evidencia de litiasis ni colecciones perivesiculares. Pared midiendo [MEDIDA] mm.",
        patologies: {
            'Colelitiasis (Litiasis Simple)': {
                text: "Se observan múltiples imágenes ecogénicas en su interior con sombra acústica posterior, móviles con el cambio de posición, compatibles con litiasis biliar. Pared vesicular de grosor normal.",
                suggestion: "Referir a cirugía o gastroenterología para evaluación de colecistectomía.",
                diagnostic_impression: "Colelitiasis (Litiasis biliar)."
            },
            'Colecistitis Aguda': {
                text: "Pared vesicular difusamente engrosada midiendo [MEDIDA] mm (normal menor a 3 mm), con líquido perivesicular. Signo de Murphy ecográfico positivo. Compatible con Colecistitis Aguda.", 
                suggestion: "Referir a urgencias quirúrgicas inmediatamente.",
                diagnostic_impression: "Colecistitis Aguda." 
            },
            'Colecistitis Crónica': {
                text: "Pared vesicular engrosada de manera irregular midiendo [MEDIDA] mm, con vesícula de tamaño reducido y contenido ecogénico. Puede presentar litiasis asociada.",
                suggestion: "Evaluación quirúrgica electiva. Control de síntomas.",
                diagnostic_impression: "Colecistitis Crónica."
            },
            'Pólipos Vesiculares': {
                text: "Se identifican imágenes ecogénicas fijas en la pared vesicular, sin sombra acústica posterior, que no se movilizan con los cambios de posición. Compatible con pólipos vesiculares. Miden aproximadamente [MEDIDA] mm.",
                suggestion: "Seguimiento ecográfico si son menores de 10 mm. Considerar colecistectomía si son mayores de 10 mm.",
                diagnostic_impression: "Pólipos Vesiculares."
            },
            'Barro Biliar': {
                text: "Se observa material ecogénico en declive dentro de la vesícula, que se moviliza lentamente con los cambios de posición, sin sombra acústica posterior. Compatible con barro biliar (sedimento).",
                suggestion: "Control clínico. Puede evolucionar a litiasis o resolverse espontáneamente.",
                diagnostic_impression: "Barro Biliar (sedimento vesicular)."
            },
            'Vesícula en Porcelana': {
                text: "Pared vesicular con calcificación completa o parcial, creando una sombra acústica posterior marcada. Vesícula con escasa distensibilidad.",
                suggestion: "Alto riesgo de malignidad. Referir a cirugía para colecistectomía.",
                diagnostic_impression: "Vesícula en Porcelana (calcificada)."
            }
        }
    },
    'Pancreas': {
        range: 'ND', 
        label: 'Cabeza/Cuerpo (cm)',
        normal: "El páncreas muestra una morfología conservada. Contornos regulares, ecogenicidad y ecotextura homogéneas. Conducto pancreático principal sin dilatación. Visualización parcial debido a interposición gaseosa.",
        patologies: {
             'Pancreatitis Aguda': {
                text: "El páncreas se encuentra aumentado de tamaño, de ecogenicidad disminuida y contornos irregulares. Compatible con edema por Pancreatitis Aguda. Puede presentar colecciones peripancreáticas.",
                suggestion: "Correlación clínica y laboratorial (amilasa/lipasa). Manejo médico urgente.",
                diagnostic_impression: "Signos ecográficos de Pancreatitis Aguda."
            },
            'Pancreatitis Crónica': {
                text: "Páncreas de ecogenicidad aumentada de manera difusa, con contornos irregulares y atrofia glandular. Puede presentar calcificaciones y dilatación del conducto pancreático principal.",
                suggestion: "Manejo de insuficiencia pancreática exocrina y endocrina. Control del dolor.",
                diagnostic_impression: "Hallazgos compatibles con Pancreatitis Crónica."
            },
            'Pseudoquiste Pancreático': {
                text: "Se identifica colección líquida anecoica o con ecos internos finos, bien delimitada, adyacente al páncreas. Mide [MEDIDA] cm. Compatible con pseudoquiste pancreático.",
                suggestion: "Control evolutivo. Drenaje si es sintomático o de gran tamaño.",
                diagnostic_impression: "Pseudoquiste Pancreático."
            },
            'Masa Pancreática': {
                text: "Se identifica masa sólida hipoecoica en la cabeza/cuerpo/cola del páncreas, de bordes irregulares, que mide [MEDIDA] cm. Puede causar dilatación del conducto pancreático y/o biliar.",
                suggestion: "TC o RM con contraste urgente. Biopsia guiada. Evaluación oncológica.",
                diagnostic_impression: "Masa Pancreática (sospecha de neoplasia)."
            }
        }
    },
    'Bazo': {
        range: '7-12',
        label: 'Longitud (cm)',
        normal: "Bazo de tamaño normal. Contornos lisos. Parénquima de ecogenicidad y ecotextura homogéneas. Midiendo [MEDIDA] cm.",
        patologies: {
            'Esplenomegalia Leve': {
                text: "Bazo aumentado de tamaño (Esplenomegalia) con una longitud máxima de [MEDIDA] cm (normal hasta 12 cm). Parénquima homogéneo sin lesiones focales.", 
                suggestion: "Correlación con el cuadro clínico (Ej: procesos infecciosos o hematológicos).",
                diagnostic_impression: "Esplenomegalia leve." 
            },
            'Esplenomegalia Moderada-Severa': {
                text: "Bazo marcadamente aumentado de tamaño con una longitud de [MEDIDA] cm (normal hasta 12 cm). Parénquima de ecogenicidad conservada.",
                suggestion: "Estudio hematológico completo. Descartar enfermedad hematológica o hipertensión portal.",
                diagnostic_impression: "Esplenomegalia moderada a severa."
            },
            'Quiste Esplénico': {
                text: "Se identifica imagen anecoica de bordes bien definidos, con refuerzo acústico posterior, dentro del parénquima esplénico. Mide [MEDIDA] cm. Compatible con quiste esplénico.",
                suggestion: "Control ecográfico. Considerar punción o exéresis si es sintomático.",
                diagnostic_impression: "Quiste Esplénico."
            },
            'Infarto Esplénico': {
                text: "Se observa área hipoecoica triangular o en cuña, con base hacia la cápsula, sin flujo al Doppler color. Compatible con infarto esplénico.",
                suggestion: "Evaluación de causas embólicas o trombóticas. Manejo del dolor y anticoagulación según causa.",
                diagnostic_impression: "Infarto Esplénico."
            }
        }
    },
    'Riñon Derecho': {
        range: '9-12',
        label: 'Longitud (cm)',
        normal: "Riñón de tamaño conservado. Contornos regulares. Buena diferenciación corticomedular. No se evidencia hidronefrosis ni litiasis. Longitud: [MEDIDA] cm.",
        patologies: {
            'Litiasis Renal': {
                text: "Se visualiza una imagen ecogénica con sombra acústica posterior en el sistema pielocalicial, compatible con litiasis renal. Longitud: [MEDIDA] cm.",
                suggestion: "Referir a urología para manejo. Se sugiere análisis de orina y química sanguínea.",
                diagnostic_impression: "Litiasis renal derecha."
            },
            'Hidronefrosis Grado I (Leve)': {
                text: "Dilatación leve del sistema pielocalicial (Grado I), con cálices y pelvis renal ligeramente distendidos, sin compromiso parenquimal significativo. Longitud: [MEDIDA] cm.",
                suggestion: "Control ecográfico en 4 semanas para evaluar progresión y descartar obstrucción.",
                diagnostic_impression: "Hidronefrosis derecha Grado I."
            },
            'Hidronefrosis Grado II (Moderada)': {
                text: "Dilatación moderada del sistema pielocalicial (Grado II), con pelvis y cálices distendidos de manera más evidente. Adelgazamiento cortical leve. Longitud: [MEDIDA] cm.",
                suggestion: "Búsqueda de causa obstructiva. Evaluación urológica urgente.",
                diagnostic_impression: "Hidronefrosis derecha Grado II."
            },
            'Hidronefrosis Grado III (Severa)': {
                text: "Dilatación severa del sistema pielocalicial (Grado III), con marcada distensión de pelvis y cálices. Adelgazamiento cortical importante. Longitud: [MEDIDA] cm.",
                suggestion: "Urgencia urológica. Riesgo de daño renal irreversible.",
                diagnostic_impression: "Hidronefrosis derecha Grado III."
            },
            'Quiste Renal Simple': {
                text: "Se identifica imagen anecoica de bordes bien definidos, sin ecos internos ni vascularidad, con refuerzo acústico posterior. Compatible con quiste renal simple. Longitud renal: [MEDIDA] cm.",
                suggestion: "Control ecográfico en caso de ser mayor de 3 cm o sintomático.",
                diagnostic_impression: "Quiste renal simple derecho."
            },
            'Quiste Renal Complejo': {
                text: "Se identifica lesión quística con características atípicas (septos, calcificaciones, ecos internos o engrosamiento parietal). Requiere clasificación de Bosniak. Longitud renal: [MEDIDA] cm.",
                suggestion: "TC o RM con contraste para clasificación. Seguimiento o biopsia según categoría.",
                diagnostic_impression: "Quiste Renal Complejo (requiere caracterización)."
            },
            'Enfermedad Renal Poliquística': {
                text: "Se identifican múltiples quistes bilaterales de tamaños variables, con distorsión de la arquitectura renal normal. Compatible con enfermedad poliquística autosómica dominante. Longitud: [MEDIDA] cm.",
                suggestion: "Estudios genéticos. Evaluación de función renal. Despistaje de complicaciones.",
                diagnostic_impression: "Enfermedad Renal Poliquística."
            },
            'Atrofia Renal': {
                text: "Riñón de tamaño reducido ([MEDIDA] cm, normal 9-12 cm), con adelgazamiento cortical marcado y pérdida de la diferenciación corticomedular. Compatible con atrofia renal.",
                suggestion: "Evaluación de función renal. Búsqueda de causa de daño crónico.",
                diagnostic_impression: "Atrofia Renal derecha."
            },
            'Masa Renal': {
                text: "Se identifica masa sólida de [MEDIDA] cm en el riñón derecho, con patrón ecográfico heterogéneo. Requiere caracterización urgente.",
                suggestion: "TC o RM con contraste urgente. Evaluación urológica inmediata para descartar malignidad.",
                diagnostic_impression: "Masa Renal derecha (sospecha de neoplasia)."
            }
        }
    },
    'Riñon Izquierdo': {
        range: '9-12',
        label: 'Longitud (cm)',
        normal: "Riñón de tamaño conservado. Contornos regulares. Buena diferenciación corticomedular. No se evidencia hidronefrosis ni litiasis. Longitud: [MEDIDA] cm.",
        patologies: {
            'Litiasis Renal': {
                text: "Se visualiza una imagen ecogénica con sombra acústica posterior en el sistema pielocalicial, compatible con litiasis renal. Longitud: [MEDIDA] cm.",
                suggestion: "Referir a urología para manejo. Se sugiere análisis de orina y química sanguínea.",
                diagnostic_impression: "Litiasis renal izquierda."
            },
            'Hidronefrosis Grado I (Leve)': {
                text: "Dilatación leve del sistema pielocalicial (Grado I), con cálices y pelvis renal ligeramente distendidos, sin compromiso parenquimal significativo. Longitud: [MEDIDA] cm.",
                suggestion: "Control ecográfico en 4 semanas para evaluar progresión y descartar obstrucción.",
                diagnostic_impression: "Hidronefrosis izquierda Grado I."
            },
            'Hidronefrosis Grado II (Moderada)': {
                text: "Dilatación moderada del sistema pielocalicial (Grado II), con pelvis y cálices distendidos de manera más evidente. Adelgazamiento cortical leve. Longitud: [MEDIDA] cm.",
                suggestion: "Búsqueda de causa obstructiva. Evaluación urológica urgente.",
                diagnostic_impression: "Hidronefrosis izquierda Grado II."
            },
            'Hidronefrosis Grado III (Severa)': {
                text: "Dilatación severa del sistema pielocalicial (Grado III), con marcada distensión de pelvis y cálices. Adelgazamiento cortical importante. Longitud: [MEDIDA] cm.",
                suggestion: "Urgencia urológica. Riesgo de daño renal irreversible.",
                diagnostic_impression: "Hidronefrosis izquierda Grado III."
            },
            'Quiste Renal Simple': {
                text: "Se identifica imagen anecoica de bordes bien definidos, sin ecos internos ni vascularidad, con refuerzo acústico posterior. Compatible con quiste renal simple. Longitud renal: [MEDIDA] cm.",
                suggestion: "Control ecográfico en caso de ser mayor de 3 cm o sintomático.",
                diagnostic_impression: "Quiste renal simple izquierdo."
            },
            'Quiste Renal Complejo': {
                text: "Se identifica lesión quística con características atípicas (septos, calcificaciones, ecos internos o engrosamiento parietal). Requiere clasificación de Bosniak. Longitud renal: [MEDIDA] cm.",
                suggestion: "TC o RM con contraste para clasificación. Seguimiento o biopsia según categoría.",
                diagnostic_impression: "Quiste Renal Complejo (requiere caracterización)."
            },
            'Enfermedad Renal Poliquística': {
                text: "Se identifican múltiples quistes bilaterales de tamaños variables, con distorsión de la arquitectura renal normal. Compatible con enfermedad poliquística autosómica dominante. Longitud: [MEDIDA] cm.",
                suggestion: "Estudios genéticos. Evaluación de función renal. Despistaje de complicaciones.",
                diagnostic_impression: "Enfermedad Renal Poliquística."
            },
            'Atrofia Renal': {
                text: "Riñón de tamaño reducido ([MEDIDA] cm, normal 9-12 cm), con adelgazamiento cortical marcado y pérdida de la diferenciación corticomedular. Compatible con atrofia renal.",
                suggestion: "Evaluación de función renal. Búsqueda de causa de daño crónico.",
                diagnostic_impression: "Atrofia Renal izquierda."
            },
            'Masa Renal': {
                text: "Se identifica masa sólida de [MEDIDA] cm en el riñón izquierdo, con patrón ecográfico heterogéneo. Requiere caracterización urgente.",
                suggestion: "TC o RM con contraste urgente. Evaluación urológica inmediata para descartar malignidad.",
                diagnostic_impression: "Masa Renal izquierda (sospecha de neoplasia)."
            }
        }
    },
    'Grandes Vasos': {
        range: 'ND', 
        label: 'Diámetro (cm)',
        normal: "La aorta y la vena cava inferior presentan diámetros conservados. Flujo vascular sin alteraciones significativas. Aorta abdominal con diámetro menor a 3.0 cm.",
        patologies: {
             'Aneurisma Aórtico Abdominal': {
                text: "Dilatación de la aorta abdominal con un diámetro máximo de [MEDIDA] cm (normal menor a 3.0 cm). Compatible con Aneurisma de la Aorta Abdominal.",
                suggestion: "Referir a cirugía vascular inmediatamente. Control de presión arterial. Evaluación quirúrgica urgente si es mayor de 5.5 cm.",
                diagnostic_impression: "Aneurisma de la Aorta Abdominal."
            },
            'Aterosclerosis Aórtica': {
                text: "Se observan placas ateroscleróticas calcificadas en las paredes de la aorta abdominal, con irregularidad en los contornos. Diámetro: [MEDIDA] cm.",
                suggestion: "Control de factores de riesgo cardiovascular. Evaluación cardiológica.",
                diagnostic_impression: "Aterosclerosis Aórtica."
            },
            'Dilatación de Vena Cava Inferior': {
                text: "Vena cava inferior dilatada con diámetro de [MEDIDA] cm (normal menor a 2.0 cm), con colapso respiratorio disminuido. Compatible con sobrecarga de volumen o falla cardíaca derecha.",
                suggestion: "Evaluación cardiológica. Ecocardiograma para evaluación de función ventricular derecha.",
                diagnostic_impression: "Dilatación de Vena Cava Inferior."
            }
        }
    },
    'Cavidad Peritoneal': {
        range: 'ND',
        label: 'Líquido libre',
        normal: "Ausencia de líquido libre (ascitis) o colecciones focales. El peritoneo presenta apariencia normal. No se identifica líquido en espacios de Morrison, Douglas ni en canales parietocólicos.",
        patologies: {
             'Ascitis Leve': {
                text: "Se observa presencia de líquido libre anecoico en pequeña cantidad en la cavidad peritoneal, predominantemente en los espacios de Morrison y Douglas.",
                suggestion: "Referir a medicina interna o gastroenterología. Evaluación de función hepática y paracentesis diagnóstica si es necesario.",
                diagnostic_impression: "Ascitis leve."
            },
            'Ascitis Moderada': {
                text: "Se observa presencia de líquido libre anecoico en moderada cantidad en la cavidad peritoneal, en espacios de Morrison, Douglas y canales parietocólicos bilaterales.",
                suggestion: "Paracentesis diagnóstica. Estudio citológico y bioquímico del líquido. Evaluación de causa subyacente.",
                diagnostic_impression: "Ascitis moderada."
            },
            'Ascitis Severa (A tensión)': {
                text: "Se observa gran cantidad de líquido libre anecoico en la cavidad peritoneal, con distensión abdominal marcada. Líquido rodeando vísceras abdominales.",
                suggestion: "Paracentesis terapéutica urgente. Evaluación de complicaciones (síndrome hepatorrenal, peritonitis bacteriana espontánea).",
                diagnostic_impression: "Ascitis severa (a tensión)."
            },
            'Colección Intraabdominal': {
                text: "Se identifica colección líquida focal de [MEDIDA] cm, con contenido heterogéneo y ecos internos. Puede presentar tabiques o engrosamiento parietal.",
                suggestion: "Descartar absceso. Punción guiada para estudio microbiológico si hay sospecha de infección.",
                diagnostic_impression: "Colección Intraabdominal (requiere caracterización)."
            },
            'Adenopatías Peritoneales': {
                text: "Se identifican adenopatías de aspecto redondeado, hipoecoicas, en la región peritoneal/retroperitoneal, algunas con pérdida del hilio graso. La mayor mide [MEDIDA] cm.",
                suggestion: "Estudio de extensión. Considerar biopsia guiada. Descartar proceso linfoproliferativo o metastásico.",
                diagnostic_impression: "Adenopatías Peritoneales/Retroperitoneales."
            }
        }
    }
};