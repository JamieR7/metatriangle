// SEHS Questions Database
// Option D is ALWAYS "I don't know" (worth 0 points)
// Only options i, ii, iii, and iv are in the questions
// The app will show 3 of these options in positions A, B, C
// Position D always shows "I don't know"

const QUESTIONS_DB = [
    {
        "id": "Q001",
        "topic": "Inter-system Communication (A.1.1)",
        "level": "SL",
        "theme": "A",
        "question": "Which division controls involuntary functions like heart rate?",
        "options": {
            "i": "Somatic nervous system",
            "ii": "Central nervous system",
            "iii": "Autonomic nervous system",
            "iv": "The nervous Nelly system"
        },
        "correct": "iii",
        "explanation": "The autonomic nervous system regulates involuntary bodily functions, divided into sympathetic and parasympathetic divisions."
    },
    {
        "id": "Q002",
        "topic": "Inter-system Communication (A.1.1)",
        "level": "SL",
        "theme": "A",
        "question": "Which hormone lowers blood glucose?",
        "options": {
            "i": "Glucagon from pancreas",
            "ii": "Cortisol from adrenals",
            "iii": "Insulin from pancreas",
            "iv": "Sugar police hormone"
        },
        "correct": "iii",
        "explanation": "Insulin, secreted by pancreatic beta cells, facilitates glucose uptake into cells."
    },
    {
        "id": "Q111",
        "topic": "Anatomical Position, Planes and Movement (B.1.1)",
        "level": "SL",
        "theme": "B",
        "question": "Which plane divides body into left and right?",
        "options": {
            "i": "Frontal plane",
            "ii": "Transverse plane",
            "iii": "Sagittal plane",
            "iv": "The airplane"
        },
        "correct": "iii",
        "explanation": "The sagittal plane divides the body into left and right; movements include flexion and extension."
    },
    {
        "id": "Q201",
        "topic": "Individual Differences in Sport (C.1.1)",
        "level": "SL",
        "theme": "C",
        "question": "What is personality in psychology?",
        "options": {
            "i": "Temporary emotional states",
            "ii": "Learned skills and abilities",
            "iii": "Consistent behavioral patterns",
            "iv": "How fun you are at parties"
        },
        "correct": "iii",
        "explanation": "Personality refers to consistent patterns of behavior, thought, and emotion across situations."
    },
    {
        "id": "Q025",
        "topic": "Transport (A.1.3)",
        "level": "SL",
        "theme": "A",
        "question": "What is cardiac output?",
        "options": {
            "i": "Force of contraction",
            "ii": "Blood in ventricle",
            "iii": "Heart rate × stroke volume",
            "iv": "How loud heart beats"
        },
        "correct": "iii",
        "explanation": "Cardiac output (Q) = HR × SV, total blood pumped per minute."
    },
    {
        "id": "Q143",
        "topic": "Levers (B.1.4)",
        "level": "SL",
        "theme": "B",
        "question": "Fulcrum between effort and load?",
        "options": {
            "i": "Second-class lever",
            "ii": "Third-class lever",
            "iii": "First-class lever",
            "iv": "See-saw lever"
        },
        "correct": "iii",
        "explanation": "First-class levers have fulcrum between effort and load (e.g., head on atlas, scissors)."
    },
    {
        "id": "Q245",
        "topic": "Achievement Motivation (C.3.1)",
        "level": "SL",
        "theme": "C",
        "question": "What is achievement motivation?",
        "options": {
            "i": "Fear of failure only",
            "ii": "External rewards only",
            "iii": "Striving for success",
            "iv": "Collecting achievement badges"
        },
        "correct": "iii",
        "explanation": "Achievement motivation is the drive to pursue and attain goals in achievement contexts."
    },
    {
        "id": "Q097",
        "topic": "Fatigue and Recovery (A.3.3)",
        "level": "HL",
        "theme": "A",
        "question": "Example of peripheral fatigue?",
        "options": {
            "i": "Reduced central nervous drive",
            "ii": "Decreased motivation",
            "iii": "Metabolite accumulation in muscle",
            "iv": "Muscles getting bored"
        },
        "correct": "iii",
        "explanation": "Peripheral fatigue involves muscle-level factors like metabolite accumulation and substrate depletion."
    },
    {
        "id": "Q195",
        "topic": "Causes of Injury (B.3.1)",
        "level": "HL",
        "theme": "B",
        "question": "Biomechanical factor increasing female knee injury?",
        "options": {
            "i": "Wider shoulders",
            "ii": "Longer arms",
            "iii": "Greater Q-angle and valgus",
            "iv": "Being too flexible everywhere"
        },
        "correct": "iii",
        "explanation": "Females typically have larger Q-angle (femur-tibia angle) and greater knee valgus during landing, increasing ACL risk."
    },
    {
        "id": "Q289",
        "topic": "Psychological Skills Training (C.5.1)",
        "level": "SL",
        "theme": "C",
        "question": "What is imagery?",
        "options": {
            "i": "Watching video recordings",
            "ii": "Reading about movements",
            "iii": "Creating mental sensory experiences",
            "iv": "Making images in Photoshop"
        },
        "correct": "iii",
        "explanation": "Imagery involves creating or recreating experiences in mind using multiple senses."
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUESTIONS_DB;
}

/*
==================================================================================
TO COMPLETE THIS FILE:
==================================================================================

1. Copy all 300 questions from your Python-generated JSON files
2. Each question should follow this exact structure
3. Make sure all questions have:
   - theme property (A, B, or C)
   - level property (SL or HL)
   - correct answer is always "iii"
   - funny answer is always "iv"

4. IMPORTANT: Do NOT include "I don't know" in your questions
   The app automatically adds this as option D worth 0 points

==================================================================================
