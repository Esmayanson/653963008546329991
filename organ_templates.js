// =====================================================================
// 1. DATA STRUCTURE (PLANTILLAS Y RANGOS)
//    Este archivo contiene la única fuente de verdad para el contenido
//    del reporte.
// =====================================================================

const ORGAN_DATA = {
    'Higado': {
        range: '10-15',
        label: 'Lóbulo derecho (cm)',
        normal: "Morfología y dimensiones conservadas. Contornos regulares. Parénquima de ecogenicidad homogénea. Sin evidencia de lesiones focales (masas o tumores). Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
        patologies: {
            'Esteatosis Hepática Grado I': {
                text: "Esteatosis Hepática Grado I: Se observa un incremento difuso y tenue de la ecogenicidad hepática. Parénquima homogéneo. La permeabilidad y visibilidad de las estructuras vasculares y del diafragma se mantienen. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            },
            'Esteatosis Hepática Grado II': {
                text: "Esteatosis Hepática Grado II: Aumento marcado de la ecogenicidad parenquimal. Se inicia una ligera atenuación posterior con disminución en la visualización de las estructuras vasculares. Existe un claro gradiente con el riñón derecho. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            }, 
            'Esteatosis Hepática Grado III': {
                text: "Esteatosis Hepática Grado III: Se constata un marcado aumento difuso de la ecogenicidad hepática, lo que resulta en una significativa atenuación de los ultrasonidos. Hay escasa o nula visualización de la porción posterior del lóbulo hepático derecho, el diafragma y los bordes de la vena porta, indicativo de una infiltración grasa severa. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            },
            'Quiste Simple': {
                text: "Se identifica una formación quística simple de contornos nítidos y regulares, anecoica, con refuerzo acústico posterior típico. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "No requiere seguimiento específico si es un quiste simple típico." 
            }
        }
    },
    'Vesicula Biliar': {
        range: '<5.0',
        label: 'Pared (mm)',
        normal: "No se observa edema parietal. Ausencia de colelitiasis (cálculos) o barro biliar. Vías biliares no dilatadas. Pared: [MEDIDA] mm (rango normal: [RANGE] mm).",
        patologies: {
            'Colelitiasis (Cálculos)': {
                text: "Se observa la presencia de formación(es) hiperecogénica(s) (cálculo) en la luz vesicular. Proyecta una franca sombra acústica posterior. La lesión es móvil con los cambios de decúbito. Pared: [MEDIDA] mm (rango normal: [RANGE] mm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            },
            'Colecistitis Aguda': {
                text: "Engrosamiento difuso de la pared (medición: [MEDIDA] mm). Signo de Murphy ecográfico positivo. Se evidencia mínimo líquido pericolecístico adyacente a la serosa vesicular. (Rango normal: [RANGE] mm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio (leucocitos, bilirrubina)." 
            }
        }
    },
    'Páncreas': {
        range: 'ND', 
        label: 'Grosor (cm)',
        normal: "Tamaño y morfología normales. Textura ecogénica homogénea. Conducto pancreático principal no dilatado. Sin lesiones focales evidentes.",
        patologies: {
             'Pancreatitis Aguda': {
                text: "Páncreas aumentado de tamaño, con textura heterogénea y disminución de la ecogenicidad (hipoecogénico) debido al edema. Se evidencia colección líquida peripancreática. Grosor: [MEDIDA] cm.",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio (amilasa y lipasa sérica)." 
            }
        }
    },
    'Bazo': {
        range: '<12.0',
        label: 'Longitud (cm)',
        normal: "Tamaño conservado. Parénquima homogéneo. Sin esplenomegalia ni lesiones focales. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
        patologies: {
            'Esplenomegalia': {
                text: "El bazo presenta un aumento en sus dimensiones, con un diámetro longitudinal máximo de [MEDIDA] cm (fuera de rango: [RANGE] cm). Contornos y forma conservados, con parénquima homogéneo.",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            }
        }
    },
    'Riñon Derecho': {
        range: '9-12',
        label: 'Longitud (cm)',
        normal: "Localizado en su fosa. Conserva la relación córtico-medular (diferenciación). Ausencia de nefrolitiasis y de dilatación del sistema pielocalicial. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
        patologies: {
            'Nefrolitiasis': {
                text: "Se identifica una litiasis hiperecogénica en el sistema pielocalicial/cáliz (superior/medio/inferior), con sombra acústica posterior. Midiendo [MEDIDA] cm.",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio." 
            },
            'Hidronefrosis Grado I': {
                text: "Dilatación leve del sistema pielocalicial (Grado I), con cálices y pelvis renal ligeramente distendidos, sin compromiso parenquimal significativo. Longitud: [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "Hacer correlación bajo el contexto clínico y de laboratorio y Control ecográfico en 4 semanas para evaluar progresión y descartar obstrucción." 
            }
        }
    },
'Riñon Izquierdo': {
        range: '9-12',
        label: 'Longitud (cm)',
        normal: "Localizado en su fosa. Conserva la relación córtico-medular (diferenciación). Ausencia de nefrolitiasis y de dilatación del sistema pielocalicial. Midiendo [MEDIDA] cm (rango normal: [RANGE] cm).",
        patologies: {
            'Nefrolitiasis': {
                text: "Se identifica una litiasis hiperecogénica en el sistema pielocalicial/cáliz (superior/medio/inferior), con sombra acústica posterior. Midiendo [MEDIDA] cm.",
                suggestion: "Referir a urología para manejo. Se sugiere análisis de orina y química sanguínea." 
            },
            'Hidronefrosis Grado I': {
                text: "Dilatación leve del sistema pielocalicial (Grado I), con cálices y pelvis renal ligeramente distendidos, sin compromiso parenquimal significativo. Longitud: [MEDIDA] cm (rango normal: [RANGE] cm).",
                suggestion: "Control ecográfico en 4 semanas para evaluar progresión y descartar obstrucción." 
            }
        }
    },
    'Grandes Vasos': {
        range: 'ND', 
        label: 'Medida (mm)',
        normal: "La aorta y la vena cava inferior presentan diámetros conservados. Flujo vascular sin alteraciones significativas.",
        patologies: {}
    },
    'Cavidad Peritoneal': {
        range: 'ND',
        label: 'Espesor (mm)',
        normal: "Ausencia de líquido libre (ascitis) o colecciones focales. El peritoneo presenta apariencia normal.",
        patologies: {
             'Ascitis (Líquido Libre)': {
                text: "Se observa presencia de líquido libre anecoico en la cavidad peritoneal, predominantemente en los cuadrantes inferiores y espacio hepatorrenal (Morrison).",
                suggestion: "Referir a medicina interna o gastroenterología. Evaluación de función hepática y paracentesis diagnóstica." 
            }
        }
    },
    // Añade más órganos aquí siguiendo el formato...
};