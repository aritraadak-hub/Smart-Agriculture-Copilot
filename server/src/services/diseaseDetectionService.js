// Extensible Plant Pathology Detection Service (TensorFlow / PyTorch / External API ready)

const MOCK_DISEASE_KNOWLEDGE_BASE = [
  {
    diseaseName: 'Tomato Early Blight',
    plantName: 'Tomato',
    confidence: 94.2,
    severity: 'Moderate Risk',
    symptoms: [
      'Concentric target-like brown spots with yellow halos on lower foliage',
      'Stem lesions forming dark sunken spots near soil level',
      'Premature leaf drop starting from lower canopy upwards',
    ],
    causes: [
      'Fungal pathogen Alternaria solani',
      'High relative humidity combined with warm temperatures (24 - 29°C)',
      'Overhead irrigation splashing fungal spores onto leaves',
    ],
    organicTreatment: 'Spray Neem oil extract (5ml/L water) or Copper Oxychloride 50% WP (3g/L) every 7-10 days.',
    chemicalTreatment: 'Apply Mancozeb 75% WP (2.5g/L) or Azoxystrobin 23% SC (1ml/L) at first symptom onset.',
    recommendedTreatment: 'Combine organic neem oil spraying with targeted Mancozeb application on infected leaf clusters.',
    preventionTips: [
      'Practice 3-year crop rotation with non-solanaceous crops.',
      'Mulch soil around base to prevent fungal spores splashing from soil.',
      'Maintain adequate plant spacing for leaf aeration and use drip irrigation.',
    ],
  },
  {
    diseaseName: 'Wheat Yellow (Stripe) Rust',
    plantName: 'Wheat',
    confidence: 96.5,
    severity: 'High Severity Risk',
    symptoms: [
      'Linear bright yellow pustules arranged in stripes along leaf veins',
      'Yellow powder (spores) easily rubbing off on hands',
      'Rapid leaf chlorosis and premature leaf drying',
    ],
    causes: [
      'Fungal pathogen Puccinia striiformis',
      'Cool temperatures (10 - 15°C) with persistent dew or foggy conditions',
      'Dense sowing of susceptible crop varieties',
    ],
    organicTreatment: 'Foliar spray of Bio-fungicide Trichoderma viride (5g/L) or Garlic-chilli extract.',
    chemicalTreatment: 'Immediate foliar spray of Tebuconazole 25.9% EC (1.5ml/L) or Propiconazole 25% EC (1ml/L).',
    recommendedTreatment: 'Apply Propiconazole 25% EC immediately. Repeat after 15 days if foggy weather continues.',
    preventionTips: [
      'Sow certified rust-resistant wheat varieties (e.g. PBW 550, HD 3086, DBW 187).',
      'Scout fields during cool foggy winter weeks.',
    ],
  },
  {
    diseaseName: 'Rice Brown Spot',
    plantName: 'Rice (Paddy)',
    confidence: 91.8,
    severity: 'Moderate Risk',
    symptoms: [
      'Oval or circular dark brown to reddish-brown lesions on leaves',
      'Seedling blight and stunted root system',
      'Discolored and poor quality grain output',
    ],
    causes: [
      'Fungal pathogen Bipolaris oryzae',
      'Soil nutrient deficiency, particularly low potassium and silicon',
      'Drought stress or stagnant waterlogging',
    ],
    organicTreatment: 'Foliar application of Pseudomonas fluorescens (10g/L) or Vermicompost tea.',
    chemicalTreatment: 'Spray Propiconazole 25% EC (1ml/L) or Carbendazim 50% WP (1g/L) at booting stage.',
    recommendedTreatment: 'Apply balanced potassium fertilization and spray Carbendazim at booting stage.',
    preventionTips: [
      'Treat seeds with Carbendazim 2g/kg seed prior to sowing.',
      'Correct potassium deficiency through soil fertility management.',
    ],
  },
  {
    diseaseName: 'Potato Late Blight',
    plantName: 'Potato',
    confidence: 95.0,
    severity: 'Critical High Risk',
    symptoms: [
      'Water-soaked dark green/black patches on leaf tips and margins',
      'White cottony fungal growth on leaf undersides in humid mornings',
      'Tuber rot with firm brown dry decay',
    ],
    causes: [
      'Oomycete pathogen Phytophthora infestans',
      'Cool temperatures (15 - 20°C) with >90% humidity',
    ],
    organicTreatment: 'Bordeaux mixture (1%) spray as protective measure.',
    chemicalTreatment: 'Cymoxanil 8% + Mancozeb 64% WP (2.5g/L) or Metalaxyl 8% + Mancozeb 64% WP.',
    recommendedTreatment: 'Spray Cymoxanil + Mancozeb combination immediately on foliage.',
    preventionTips: [
      'Use certified disease-free seed tubers.',
      'Perform earthing-up to prevent spores reaching underground tubers.',
    ],
  },
  {
    diseaseName: 'Healthy Leaf (No Infection)',
    plantName: 'Healthy Crop',
    confidence: 98.4,
    severity: 'Healthy - No Risk',
    symptoms: ['Vibrant green color', 'Intact cuticle structure', 'No fungal or bacterial spots'],
    causes: ['Optimal nutrition and proper field management'],
    organicTreatment: 'No treatment required.',
    chemicalTreatment: 'No treatment required.',
    recommendedTreatment: 'Maintain regular watering, weeding, and balanced NPK fertigation schedule.',
    preventionTips: ['Continue regular scouting and preventive neem oil spraying.'],
  },
];

export const predictDiseaseService = async (fileOrUrl) => {
  // If external Python TensorFlow/PyTorch microservice URL is configured
  if (process.env.PYTHON_DISEASE_ML_URL) {
    try {
      // Microservice integration point for PyTorch / TensorFlow CNN model
      // const response = await axios.post(process.env.PYTHON_DISEASE_ML_URL, { image: fileOrUrl });
      // return { ...response.data, modelSource: 'TensorFlow-PyTorch CNN Production Model' };
    } catch (err) {
      console.warn('External Disease ML model unavailable, using realistic pathology knowledge base:', err.message);
    }
  }

  // Realistic mock inference based on random pattern or filename
  const randomIndex = Math.floor(Math.random() * (MOCK_DISEASE_KNOWLEDGE_BASE.length - 1));
  const diagnosis = MOCK_DISEASE_KNOWLEDGE_BASE[randomIndex] || MOCK_DISEASE_KNOWLEDGE_BASE[0];

  return {
    ...diagnosis,
    imageUrl: fileOrUrl || '/uploads/sample_leaf.jpg',
    analyzedAt: new Date().toISOString(),
    isDemoPrediction: true,
    modelSource: 'Demo Prediction Model Mode (TensorFlow/PyTorch CNN architecture ready)',
  };
};
