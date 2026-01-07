// IB SEHS 2026 - Complete Question Bank (300 Questions)
// Theme A: Exercise Physiology & Nutrition (110Q)
// Theme B: Biomechanics (90Q)
// Theme C: Sports Psychology & Motor Learning (100Q)

const QUESTIONS_DB = [
  {
    id: 'Q001',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `Which division controls involuntary functions like heart rate?`,
    options: {
      i: `Somatic nervous system`,
      ii: `Central nervous system`,
      iii: `Autonomic nervous system`,
      iv: `The nervous Nelly system`
    }
  },
  {
    id: 'Q002',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `Which hormone lowers blood glucose?`,
    options: {
      i: `Glucagon from pancreas`,
      ii: `Cortisol from adrenals`,
      iii: `Insulin from pancreas`,
      iv: `Sugar police hormone`
    }
  },
  {
    id: 'Q003',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `What do proprioceptors detect?`,
    options: {
      i: `Changes in blood pressure`,
      ii: `Chemical blood composition`,
      iii: `Body position and movement`,
      iv: `If someone is watching you`
    }
  },
  {
    id: 'Q004',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `Which system promotes 'rest and digest' functions?`,
    options: {
      i: `Sympathetic nervous system`,
      ii: `Somatic nervous system`,
      iii: `Parasympathetic nervous system`,
      iv: `The chill-out nervous system`
    }
  },
  {
    id: 'Q005',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `What does epinephrine do to the heart?`,
    options: {
      i: `Decreases heart rate significantly`,
      ii: `Has no significant cardiac effect`,
      iii: `Increases heart rate and force`,
      iv: `Makes heart do the cha-cha`
    }
  },
  {
    id: 'Q006',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `What is glucagon's primary action?`,
    options: {
      i: `Promotes cellular glucose uptake`,
      ii: `Inhibits all metabolic processes`,
      iii: `Stimulates glycogen breakdown`,
      iv: `Emails your liver angrily`
    }
  },
  {
    id: 'Q007',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `Which receptors detect blood gas levels?`,
    options: {
      i: `Proprioceptors in muscles`,
      ii: `Baroreceptors in arteries`,
      iii: `Chemoreceptors in vessels`,
      iv: `The breathing police`
    }
  },
  {
    id: 'Q008',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `What do baroreceptors detect?`,
    options: {
      i: `Body temperature changes`,
      ii: `Muscle length and tension`,
      iii: `Blood pressure changes`,
      iv: `Exam stress levels`
    }
  },
  {
    id: 'Q009',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `How does progesterone affect body temperature?`,
    options: {
      i: `Decreases core temperature`,
      ii: `Has no thermal effect`,
      iii: `Raises core temperature`,
      iv: `Makes you hot and bothered`
    }
  },
  {
    id: 'Q010',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `The sympathetic system prepares the body for what?`,
    options: {
      i: `Rest and digest functions`,
      ii: `Sleep and recovery processes`,
      iii: `Fight or flight responses`,
      iv: `Netflix and chill time`
    }
  },
  {
    id: 'Q011',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `What does testosterone increase?`,
    options: {
      i: `Decreases protein synthesis`,
      ii: `Reduces red blood cells`,
      iii: `Increases muscle mass`,
      iv: `Gives instant abs`
    }
  },
  {
    id: 'Q012',
    topic: `Inter-system Communication (A.1.1)`,
    level: 'SL',
    question: `Mechanoreceptors include which receptors?`,
    options: {
      i: `Chemoreceptors only`,
      ii: `Thermoreceptors only`,
      iii: `Proprioceptors and baroreceptors`,
      iv: `The touchy-feely receptors`
    }
  },
  {
    id: 'Q013',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `How is homeostasis primarily maintained?`,
    options: {
      i: `Through positive feedback loops`,
      ii: `By random cellular adjustments`,
      iii: `Via negative feedback loops`,
      iv: `Through wishful thinking`
    }
  },
  {
    id: 'Q014',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `What is the normal core temperature range?`,
    options: {
      i: `Range of 35-36°C`,
      ii: `Range of 38-40°C`,
      iii: `Range of 36-38°C`,
      iv: `Whatever feels comfortable`
    }
  },
  {
    id: 'Q015',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `Which promotes heat loss during exercise?`,
    options: {
      i: `Vasoconstriction and shivering`,
      ii: `Decreased cardiac output`,
      iii: `Vasodilation and sweating`,
      iv: `Complaining about heat`
    }
  },
  {
    id: 'Q016',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `How does breathing maintain blood pH?`,
    options: {
      i: `By producing bicarbonate buffer`,
      ii: `By directly neutralizing acids`,
      iii: `By adjusting ventilation rate`,
      iv: `By holding breath strategically`
    }
  },
  {
    id: 'Q017',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `What is the hypothalamus's role in thermoregulation?`,
    options: {
      i: `It produces heat directly`,
      ii: `Has no temperature control`,
      iii: `Acts as body thermostat`,
      iv: `Checks weather forecast`
    }
  },
  {
    id: 'Q018',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `Which mechanism produces heat in cold conditions?`,
    options: {
      i: `Vasodilation of vessels`,
      ii: `Sweating and evaporation`,
      iii: `Shivering thermogenesis`,
      iv: `Warm jacket purchases`
    }
  },
  {
    id: 'Q019',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `What happens to skin blood flow during heat loss?`,
    options: {
      i: `Decreases via vasoconstriction`,
      ii: `Remains unchanged always`,
      iii: `Increases via vasodilation`,
      iv: `Takes ear detour`
    }
  },
  {
    id: 'Q020',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'SL',
    question: `Which systems maintain thermoregulation during exercise?`,
    options: {
      i: `Only muscular system`,
      ii: `Only nervous system`,
      iii: `Multiple integrated systems`,
      iv: `Complaining system primarily`
    }
  },
  {
    id: 'Q021',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'HL',
    question: `What's a short-term altitude response?`,
    options: {
      i: `Increased red blood cells`,
      ii: `Decreased ventilation rate`,
      iii: `Hyperventilation response`,
      iv: `Growing emergency gills`
    }
  },
  {
    id: 'Q022',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'HL',
    question: `What's a long-term altitude adaptation?`,
    options: {
      i: `Decreased lung capacity`,
      ii: `Reduced cardiac output`,
      iii: `Increased RBC production`,
      iv: `Permanent oxygen superpowers`
    }
  },
  {
    id: 'Q023',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'HL',
    question: `What challenges hot, humid exercise?`,
    options: {
      i: `Increased oxygen availability`,
      ii: `Enhanced muscle function`,
      iii: `Reduced evaporative cooling`,
      iv: `Hair getting frizzy`
    }
  },
  {
    id: 'Q024',
    topic: `Maintaining Homeostasis (A.1.2)`,
    level: 'HL',
    question: `What does heat acclimatization cause?`,
    options: {
      i: `Decreased sweat production`,
      ii: `Increased resting temperature`,
      iii: `Earlier sweating onset`,
      iv: `Friendship with sun`
    }
  },
  {
    id: 'Q025',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What is cardiac output?`,
    options: {
      i: `Force of contraction`,
      ii: `Blood in ventricle`,
      iii: `Heart rate × stroke volume`,
      iv: `How loud heart beats`
    }
  },
  {
    id: 'Q026',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `Where does blood flow decrease during intense exercise?`,
    options: {
      i: `Cardiovascular system`,
      ii: `Muscular system`,
      iii: `Digestive system`,
      iv: `Gossip distribution network`
    }
  },
  {
    id: 'Q027',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What is tidal volume?`,
    options: {
      i: `Total lung capacity`,
      ii: `Breathing rate per minute`,
      iii: `Air per single breath`,
      iv: `Air surfers breathe`
    }
  },
  {
    id: 'Q028',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `How is minute ventilation calculated?`,
    options: {
      i: `Tidal volume ÷ frequency`,
      ii: `Tidal volume only`,
      iii: `Tidal volume × frequency`,
      iv: `Asking lungs nicely`
    }
  },
  {
    id: 'Q029',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What is stroke volume?`,
    options: {
      i: `Rate of contractions`,
      ii: `Total blood volume`,
      iii: `Blood per heartbeat`,
      iv: `Blood getting offended`
    }
  },
  {
    id: 'Q030',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What increases during aerobic exercise?`,
    options: {
      i: `Digestive blood flow`,
      ii: `Parasympathetic activity`,
      iii: `Cardiac output and ventilation`,
      iv: `Ability to sit still`
    }
  },
  {
    id: 'Q031',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What is the a-vO₂ difference?`,
    options: {
      i: `Arterial-atmospheric O₂ difference`,
      ii: `Oxygen consumed by lungs`,
      iii: `Arterial-venous O₂ difference`,
      iv: `Confused oxygen location`
    }
  },
  {
    id: 'Q032',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What mechanisms aid venous return?`,
    options: {
      i: `Gravity only`,
      ii: `Decreased blood pressure`,
      iii: `Muscle and respiratory pumps`,
      iv: `Blood's sense of duty`
    }
  },
  {
    id: 'Q033',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `What happens to breathing frequency during exercise?`,
    options: {
      i: `Decreases to conserve energy`,
      ii: `Remains constant throughout`,
      iii: `Increases to meet demands`,
      iv: `Becomes very judgmental`
    }
  },
  {
    id: 'Q034',
    topic: `Transport (A.1.3)`,
    level: 'SL',
    question: `Which variable increases most during maximal exercise?`,
    options: {
      i: `Stroke volume (plateaus early)`,
      ii: `Blood pressure (moderate increase)`,
      iii: `Heart rate (linear increase)`,
      iv: `Enthusiasm for stopping`
    }
  },
  {
    id: 'Q035',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What is cardiovascular drift?`,
    options: {
      i: `Gradual HR decrease in recovery`,
      ii: `Blood vessels moving position`,
      iii: `Gradual HR increase in prolonged exercise`,
      iv: `Heart going for casual float`
    }
  },
  {
    id: 'Q036',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What results from excessive water without electrolytes?`,
    options: {
      i: `Dehydration state`,
      ii: `Hypernatremia (high sodium)`,
      iii: `Hyponatremia (low sodium)`,
      iv: `Over-hydration syndrome`
    }
  },
  {
    id: 'Q037',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `Which hormone regulates kidney water retention?`,
    options: {
      i: `Insulin from pancreas`,
      ii: `Glucagon from pancreas`,
      iii: `ADH from pituitary`,
      iv: `Hydration fairy hormone`
    }
  },
  {
    id: 'Q038',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What dehydration level impairs performance?`,
    options: {
      i: `Less than 0.5%`,
      ii: `Greater than 10%`,
      iii: `2% or more`,
      iv: `Thirsty for excuses amount`
    }
  },
  {
    id: 'Q039',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What's the primary electrolyte lost in sweat?`,
    options: {
      i: `Potassium from cells`,
      ii: `Calcium from bones`,
      iii: `Sodium from blood`,
      iv: `Sadness molecules`
    }
  },
  {
    id: 'Q040',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What does aldosterone regulate?`,
    options: {
      i: `Calcium absorption`,
      ii: `Magnesium retention`,
      iii: `Sodium and potassium`,
      iv: `All ions simultaneously`
    }
  },
  {
    id: 'Q041',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What's the recommended hydration strategy?`,
    options: {
      i: `Drink only after exercise`,
      ii: `Drink maximum water possible`,
      iii: `Drink to thirst with electrolytes`,
      iv: `Wait until really dehydrated`
    }
  },
  {
    id: 'Q042',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What triggers thirst sensation?`,
    options: {
      i: `Low blood pressure only`,
      ii: `High blood glucose levels`,
      iii: `Increased blood osmolality`,
      iv: `Water bottle looking lonely`
    }
  },
  {
    id: 'Q043',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `What's a consequence of dehydration?`,
    options: {
      i: `Improved thermoregulation`,
      ii: `Increased stroke volume`,
      iii: `Reduced blood volume`,
      iv: `Enhanced excuse ability`
    }
  },
  {
    id: 'Q044',
    topic: `Water and Electrolyte Balance (A.2.1)`,
    level: 'SL',
    question: `Why include carbs in hydration drinks?`,
    options: {
      i: `To improve taste only`,
      ii: `To slow water absorption`,
      iii: `To provide fuel and aid absorption`,
      iv: `For Instagram worthiness`
    }
  },
  {
    id: 'Q045',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `Primary fuel for high-intensity exercise?`,
    options: {
      i: `Proteins for energy`,
      ii: `Lipids and fats`,
      iii: `Carbohydrates`,
      iv: `Caffeine molecules`
    }
  },
  {
    id: 'Q046',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `What does LOW energy availability mean?`,
    options: {
      i: `Low muscle glycogen pre-competition`,
      ii: `Temporary fatigue after workout`,
      iii: `Insufficient energy for functions`,
      iv: `Phone battery dying mid-workout`
    }
  },
  {
    id: 'Q047',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `Most important for muscle repair?`,
    options: {
      i: `Carbohydrates for energy`,
      ii: `Vitamins for health`,
      iii: `Protein for synthesis`,
      iv: `Instagram supplements`
    }
  },
  {
    id: 'Q048',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `Optimal carb timing post-exercise?`,
    options: {
      i: `24 hours after exercise`,
      ii: `Only before next workout`,
      iii: `Within 30-60 minutes`,
      iv: `Whenever you remember`
    }
  },
  {
    id: 'Q049',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `Most beneficial fat type?`,
    options: {
      i: `Trans fats for health`,
      ii: `Saturated fats primarily`,
      iii: `Unsaturated fats`,
      iv: `Fried food fats`
    }
  },
  {
    id: 'Q050',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `What is glycogen?`,
    options: {
      i: `Simple sugar in blood`,
      ii: `A type of protein`,
      iii: `Storage form of carbohydrate`,
      iv: `Energy's hiding spot`
    }
  },
  {
    id: 'Q051',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'SL',
    question: `Which is a RED-S symptom?`,
    options: {
      i: `Increased bone density`,
      ii: `Enhanced immune function`,
      iii: `Menstrual dysfunction`,
      iv: `Superpowers and energy`
    }
  },
  {
    id: 'Q052',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `What's iron's primary role?`,
    options: {
      i: `Muscle protein synthesis`,
      ii: `Bone mineral density`,
      iii: `Oxygen transport`,
      iv: `Iron willpower`
    }
  },
  {
    id: 'Q053',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `How does gut microbiome affect performance?`,
    options: {
      i: `Only affects digestion`,
      ii: `Decreases nutrient absorption`,
      iii: `Affects nutrient metabolism`,
      iv: `Gives intestines pep talks`
    }
  },
  {
    id: 'Q054',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `Recommended protein for strength athletes?`,
    options: {
      i: `0.8 g/kg/day`,
      ii: `1.0 g/kg/day`,
      iii: `1.6-2.2 g/kg/day`,
      iv: `Maximum hashtag protein`
    }
  },
  {
    id: 'Q055',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `Which vitamin for calcium absorption?`,
    options: {
      i: `Vitamin C`,
      ii: `Vitamin B12`,
      iii: `Vitamin D`,
      iv: `Vitamin Sea`
    }
  },
  {
    id: 'Q056',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `What is carbohydrate loading?`,
    options: {
      i: `Eating carbs immediately before competition`,
      ii: `Avoiding all carbohydrates completely`,
      iii: `Maximizing glycogen stores pre-event`,
      iv: `Filling pockets with pasta`
    }
  },
  {
    id: 'Q057',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `Most common female athlete deficiency?`,
    options: {
      i: `Vitamin C`,
      ii: `Zinc`,
      iii: `Iron`,
      iv: `Common sense (kidding)`
    }
  },
  {
    id: 'Q058',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `What is glycemic index?`,
    options: {
      i: `Total carbohydrate content`,
      ii: `Sugar content only`,
      iii: `Blood glucose raise rate`,
      iv: `Guilty feeling measure`
    }
  },
  {
    id: 'Q059',
    topic: `Fuelling for Health and Performance (A.2.2)`,
    level: 'HL',
    question: `Why combine carbs and protein post-exercise?`,
    options: {
      i: `Protein slows glycogen resynthesis`,
      ii: `Carbs impair protein absorption`,
      iii: `Enhances both resynthesis and repair`,
      iv: `Better social media posts`
    }
  },
  {
    id: 'Q060',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Primary system for 400m sprint?`,
    options: {
      i: `Phosphagen system only`,
      ii: `Oxidative system only`,
      iii: `Glycolytic system`,
      iv: `Sprint fairy magic dust`
    }
  },
  {
    id: 'Q061',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Fuel for phosphagen system?`,
    options: {
      i: `Glucose and glycogen`,
      ii: `Fatty acids`,
      iii: `ATP and creatine phosphate`,
      iv: `Leftover pizza energy`
    }
  },
  {
    id: 'Q062',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `What does VO₂max represent?`,
    options: {
      i: `Maximum heart rate`,
      ii: `Maximum breathing frequency`,
      iii: `Maximum oxygen consumption`,
      iv: `Maximum volume of excuses`
    }
  },
  {
    id: 'Q063',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `When is oxidative system dominant?`,
    options: {
      i: `100m sprint`,
      ii: `Powerlifting single rep`,
      iii: `Marathon running`,
      iv: `Speed texting championship`
    }
  },
  {
    id: 'Q064',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Primary glycolytic system limitation?`,
    options: {
      i: `Too much ATP production`,
      ii: `Only works in cold`,
      iii: `H⁺ and lactate accumulation`,
      iv: `Gets tired of blame`
    }
  },
  {
    id: 'Q065',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Highest ATP production capacity?`,
    options: {
      i: `Phosphagen system`,
      ii: `Glycolytic system`,
      iii: `Oxidative system`,
      iv: `Wishful thinking system`
    }
  },
  {
    id: 'Q066',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Phosphagen system duration?`,
    options: {
      i: `1-3 seconds only`,
      ii: `2-3 minutes`,
      iii: `Up to 10 seconds`,
      iv: `As long as belief`
    }
  },
  {
    id: 'Q067',
    topic: `Energy Systems (A.2.3)`,
    level: 'SL',
    question: `Where does glycolysis occur?`,
    options: {
      i: `Mitochondria`,
      ii: `Nucleus`,
      iii: `Cytoplasm`,
      iv: `Cellular break room`
    }
  },
  {
    id: 'Q068',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `What is lactate threshold?`,
    options: {
      i: `When lactate production begins`,
      ii: `Maximum lactate concentration`,
      iii: `When production equals clearance`,
      iv: `When legs start screaming`
    }
  },
  {
    id: 'Q069',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `What is EPOC?`,
    options: {
      i: `Oxygen debt during warm-up`,
      ii: `Pre-exercise oxygen loading`,
      iii: `Elevated post-exercise O₂ consumption`,
      iv: `Extra Panting On Couch`
    }
  },
  {
    id: 'Q070',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `Primary substrate at moderate intensity?`,
    options: {
      i: `Amino acids`,
      ii: `Creatine phosphate`,
      iii: `Fatty acids`,
      iv: `Motivational quotes`
    }
  },
  {
    id: 'Q071',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `Oxidative contribution as intensity increases?`,
    options: {
      i: `Remains constant throughout`,
      ii: `Increases with intensity`,
      iii: `Decreases as glycolysis increases`,
      iv: `Takes break to rest`
    }
  },
  {
    id: 'Q072',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `ATP from one glucose aerobically?`,
    options: {
      i: `2 ATP`,
      ii: `8-10 ATP`,
      iii: `32-34 ATP`,
      iv: `Unlimited with trying`
    }
  },
  {
    id: 'Q073',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `What is RER?`,
    options: {
      i: `Volume oxygen consumed`,
      ii: `Heart rate ÷ ventilation`,
      iii: `CO₂ produced ÷ O₂ consumed`,
      iv: `Breathing complaint ratio`
    }
  },
  {
    id: 'Q074',
    topic: `Energy Systems (A.2.3)`,
    level: 'HL',
    question: `Rate-limiting enzyme in glycolysis?`,
    options: {
      i: `ATP synthase`,
      ii: `Lactate dehydrogenase`,
      iii: `Phosphofructokinase`,
      iv: `Procrastination enzyme`
    }
  },
  {
    id: 'Q075',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What does specificity principle state?`,
    options: {
      i: `All training produces same adaptations`,
      ii: `Training must be maximal always`,
      iii: `Adaptations match training type`,
      iv: `Train Tuesdays specifically`
    }
  },
  {
    id: 'Q076',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What is a macrocycle?`,
    options: {
      i: `Single training session`,
      ii: `Week of training`,
      iii: `Season or year period`,
      iv: `Really big bicycle`
    }
  },
  {
    id: 'Q077',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `Overreaching vs overtraining difference?`,
    options: {
      i: `Overreaching only in endurance`,
      ii: `They're the same condition`,
      iii: `Overreaching temporary, overtraining chronic`,
      iv: `Overreaching means can't reach shelf`
    }
  },
  {
    id: 'Q078',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What does progressive overload require?`,
    options: {
      i: `Maintaining same load indefinitely`,
      ii: `Decreasing intensity over time`,
      iii: `Gradually increasing training stress`,
      iv: `Loading bar to look cool`
    }
  },
  {
    id: 'Q079',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `Typical mesocycle duration?`,
    options: {
      i: `One training session`,
      ii: `24 hours`,
      iii: `2-6 weeks`,
      iv: `Breakfast to lunch`
    }
  },
  {
    id: 'Q080',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What is a microcycle?`,
    options: {
      i: `Yearly training plan`,
      ii: `Single exercise repetition`,
      iii: `Week or days of training`,
      iv: `Training on tiny bicycle`
    }
  },
  {
    id: 'Q081',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What does reversibility state?`,
    options: {
      i: `Adaptations are permanent`,
      ii: `Can reverse time with training`,
      iii: `Adaptations lost without training`,
      iv: `You can train backwards`
    }
  },
  {
    id: 'Q082',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `Which principle addresses individual differences?`,
    options: {
      i: `Specificity`,
      ii: `Reversibility`,
      iii: `Individuality`,
      iv: `Snowflake principle`
    }
  },
  {
    id: 'Q083',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What is periodization?`,
    options: {
      i: `Training at certain times only`,
      ii: `Random training variation`,
      iii: `Systematic phase planning`,
      iv: `Training during period only`
    }
  },
  {
    id: 'Q084',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What is tapering?`,
    options: {
      i: `Increasing volume before competition`,
      ii: `Maintaining constant training load`,
      iii: `Reducing volume, maintaining intensity`,
      iv: `Making muscles pointy`
    }
  },
  {
    id: 'Q085',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `Goal of recovery microcycle?`,
    options: {
      i: `Maximize training load`,
      ii: `Test maximal performance`,
      iii: `Allow adaptation, reduce fatigue`,
      iv: `Instagram rest photos`
    }
  },
  {
    id: 'Q086',
    topic: `Qualities of Training (A.3.1)`,
    level: 'SL',
    question: `What involves alternating intensity?`,
    options: {
      i: `Continuous training`,
      ii: `Resistance training only`,
      iii: `Interval training`,
      iv: `Mood swing training`
    }
  },
  {
    id: 'Q087',
    topic: `Benefits to Health (A.3.2)`,
    level: 'SL',
    question: `What does aerobic exercise reduce?`,
    options: {
      i: `Bone mineral density`,
      ii: `Muscle mass`,
      iii: `CVD and diabetes risk`,
      iv: `Having fun`
    }
  },
  {
    id: 'Q088',
    topic: `Benefits to Health (A.3.2)`,
    level: 'SL',
    question: `Primary resistance training benefit?`,
    options: {
      i: `Lung capacity only`,
      ii: `Flexibility only`,
      iii: `Strength, bone, metabolism`,
      iv: `Intimidating jar opening`
    }
  },
  {
    id: 'Q089',
    topic: `Benefits to Health (A.3.2)`,
    level: 'SL',
    question: `Key mental health benefit?`,
    options: {
      i: `Increased anxiety`,
      ii: `Reduced cognition`,
      iii: `Reduced depression and anxiety`,
      iv: `Thinking you're superhero`
    }
  },
  {
    id: 'Q090',
    topic: `Benefits to Health (A.3.2)`,
    level: 'SL',
    question: `How does exercise affect bones?`,
    options: {
      i: `Decreases bone density`,
      ii: `Has no bone effect`,
      iii: `Increases bone density`,
      iv: `Makes bones Instagram famous`
    }
  },
  {
    id: 'Q091',
    topic: `Benefits to Health (A.3.2)`,
    level: 'SL',
    question: `WHO weekly activity recommendation?`,
    options: {
      i: `30 minutes per week`,
      ii: `60 minutes per week`,
      iii: `150 min moderate or 75 vigorous`,
      iv: `However long excuses last`
    }
  },
  {
    id: 'Q092',
    topic: `Benefits to Health (A.3.2)`,
    level: 'HL',
    question: `Exercise effect on insulin sensitivity?`,
    options: {
      i: `Decreases insulin sensitivity`,
      ii: `Has no effect`,
      iii: `Increases insulin sensitivity`,
      iv: `Makes cells emotionally sensitive`
    }
  },
  {
    id: 'Q093',
    topic: `Benefits to Health (A.3.2)`,
    level: 'HL',
    question: `Aerobic training effect on resting HR?`,
    options: {
      i: `Increases resting heart rate`,
      ii: `No change in heart rate`,
      iii: `Decreases resting heart rate`,
      iv: `Makes heart more chill`
    }
  },
  {
    id: 'Q094',
    topic: `Benefits to Health (A.3.2)`,
    level: 'HL',
    question: `Which cardiovascular adaptation occurs?`,
    options: {
      i: `Decreased cardiac output`,
      ii: `Reduced capillary density`,
      iii: `Increased capillary density`,
      iv: `Heart growing tiny muscles`
    }
  },
  {
    id: 'Q095',
    topic: `Benefits to Health (A.3.2)`,
    level: 'HL',
    question: `Exercise effect on HDL?`,
    options: {
      i: `Decreases HDL levels`,
      ii: `No effect on HDL`,
      iii: `Increases HDL levels`,
      iv: `Makes cholesterol happier`
    }
  },
  {
    id: 'Q096',
    topic: `Benefits to Health (A.3.2)`,
    level: 'HL',
    question: `Physical activity and mortality relationship?`,
    options: {
      i: `Increased activity increases mortality`,
      ii: `No relationship exists`,
      iii: `Increased activity decreases mortality`,
      iv: `Activity makes you immortal (not)`
    }
  },
  {
    id: 'Q097',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Example of peripheral fatigue?`,
    options: {
      i: `Reduced central nervous drive`,
      ii: `Decreased motivation`,
      iii: `Metabolite accumulation in muscle`,
      iv: `Muscles getting bored`
    }
  },
  {
    id: 'Q098',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `What is central fatigue?`,
    options: {
      i: `Fatigue in muscles`,
      ii: `Fuel depletion fatigue`,
      iii: `Reduced CNS neural drive`,
      iv: `Being tired of everything`
    }
  },
  {
    id: 'Q099',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Strongest evidence for reducing soreness?`,
    options: {
      i: `Complete rest only`,
      ii: `Ice baths exclusively`,
      iii: `Active recovery and massage`,
      iv: `Complaining to everyone loudly`
    }
  },
  {
    id: 'Q100',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `What is glycogen depletion?`,
    options: {
      i: `Loss of muscle protein`,
      ii: `Excess carbohydrate storage`,
      iii: `Exhaustion of carb stores`,
      iv: `Muscles forgetting energy location`
    }
  },
  {
    id: 'Q101',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Sleep's role in recovery?`,
    options: {
      i: `Sleep impairs recovery`,
      ii: `Sleep has no effect`,
      iii: `Sleep promotes repair and hormones`,
      iv: `Muscles dream of being stronger`
    }
  },
  {
    id: 'Q102',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `What is DOMS?`,
    options: {
      i: `Immediate pain during exercise`,
      ii: `Chronic muscle inflammation`,
      iii: `Soreness 24-72h post-exercise`,
      iv: `Muscles holding a grudge`
    }
  },
  {
    id: 'Q103',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Which contraction causes most DOMS?`,
    options: {
      i: `Isometric contractions`,
      ii: `Concentric contractions`,
      iii: `Eccentric contractions`,
      iv: `Complaining contractions`
    }
  },
  {
    id: 'Q104',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Primary purpose of active recovery?`,
    options: {
      i: `Maximize training adaptation`,
      ii: `Test maximal performance`,
      iii: `Enhance blood flow and clearance`,
      iv: `Look busy while resting`
    }
  },
  {
    id: 'Q105',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `How might cold immersion aid recovery?`,
    options: {
      i: `By increasing muscle temperature`,
      ii: `By promoting inflammation`,
      iii: `By reducing inflammation markers`,
      iv: `By being really uncomfortable`
    }
  },
  {
    id: 'Q106',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Recovery time between resistance sessions?`,
    options: {
      i: `6-12 hours`,
      ii: `24 hours`,
      iii: `48-72 hours`,
      iv: `Until forgetting the pain`
    }
  },
  {
    id: 'Q107',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Which hormone promotes muscle recovery during sleep?`,
    options: {
      i: `Cortisol`,
      ii: `Adrenaline`,
      iii: `Growth hormone`,
      iv: `Sweet dreams hormone`
    }
  },
  {
    id: 'Q108',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `What might compression garments do?`,
    options: {
      i: `Increase muscle temperature significantly`,
      ii: `Decrease blood flow`,
      iii: `Enhance venous return`,
      iv: `Make you look like superhero`
    }
  },
  {
    id: 'Q109',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `What is 'repeated bout effect'?`,
    options: {
      i: `Increased soreness each workout`,
      ii: `No adaptation to training`,
      iii: `Reduced damage from subsequent exercise`,
      iv: `Making same training mistakes`
    }
  },
  {
    id: 'Q110',
    topic: `Fatigue and Recovery (A.3.3)`,
    level: 'HL',
    question: `Sign of inadequate recovery?`,
    options: {
      i: `Improved performance`,
      ii: `Decreased resting heart rate`,
      iii: `Elevated resting heart rate`,
      iv: `Wanting to train more`
    }
  },
  {
    id: 'Q111',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `Which plane divides body into left and right?`,
    options: {
      i: `Frontal plane`,
      ii: `Transverse plane`,
      iii: `Sagittal plane`,
      iv: `The airplane`
    }
  },
  {
    id: 'Q112',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `What movement occurs during lateral arm raise?`,
    options: {
      i: `Flexion`,
      ii: `Adduction`,
      iii: `Abduction`,
      iv: `Arm kidnapping`
    }
  },
  {
    id: 'Q113',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `Which movement occurs during bicep curl?`,
    options: {
      i: `Extension`,
      ii: `Abduction`,
      iii: `Flexion`,
      iv: `Gun show`
    }
  },
  {
    id: 'Q114',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `What is the anatomical position?`,
    options: {
      i: `Lying face down`,
      ii: `Sitting arms crossed`,
      iii: `Standing palms forward`,
      iv: `The surrender pose`
    }
  },
  {
    id: 'Q115',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `Which plane divides into upper and lower?`,
    options: {
      i: `Sagittal plane`,
      ii: `Frontal plane`,
      iii: `Transverse plane`,
      iv: `The equator`
    }
  },
  {
    id: 'Q116',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `What movement brings part toward midline?`,
    options: {
      i: `Abduction`,
      ii: `Flexion`,
      iii: `Adduction`,
      iv: `Clingy movement`
    }
  },
  {
    id: 'Q117',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `Dorsiflexion occurs at which joint?`,
    options: {
      i: `Shoulder`,
      ii: `Knee`,
      iii: `Ankle`,
      iv: `Flex joint`
    }
  },
  {
    id: 'Q118',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `Which axis runs front to back?`,
    options: {
      i: `Longitudinal axis`,
      ii: `Sagittal axis`,
      iii: `Frontal axis`,
      iv: `Straight-through axis`
    }
  },
  {
    id: 'Q119',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'SL',
    question: `What movement increases joint angle?`,
    options: {
      i: `Flexion`,
      ii: `Rotation`,
      iii: `Extension`,
      iv: `Stretch it out`
    }
  },
  {
    id: 'Q120',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'HL',
    question: `What is circumduction?`,
    options: {
      i: `Movement in one plane`,
      ii: `Rotation around axis`,
      iii: `Combination of four movements`,
      iv: `Arm helicopter`
    }
  },
  {
    id: 'Q121',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'HL',
    question: `What describes sole turning inward?`,
    options: {
      i: `Eversion`,
      ii: `Pronation`,
      iii: `Inversion`,
      iv: `Twisted ankle move`
    }
  },
  {
    id: 'Q122',
    topic: `Anatomical Position, Planes and Movement (B.1.1)`,
    level: 'HL',
    question: `Pronation vs supination of forearm?`,
    options: {
      i: `No difference`,
      ii: `Only foot movements`,
      iii: `Pronation palm down, supination up`,
      iv: `Soup vs pro`
    }
  },
  {
    id: 'Q123',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What is ligaments' primary function?`,
    options: {
      i: `Connect muscle to bone`,
      ii: `Provide bone cushioning`,
      iii: `Connect bone to bone`,
      iv: `Hold life together`
    }
  },
  {
    id: 'Q124',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What is the function of tendons?`,
    options: {
      i: `Connect bone to bone`,
      ii: `Provide joint lubrication`,
      iii: `Connect muscle to bone`,
      iv: `Tend to muscles`
    }
  },
  {
    id: 'Q125',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `Which joint type has greatest ROM?`,
    options: {
      i: `Fibrous joints`,
      ii: `Cartilaginous joints`,
      iii: `Synovial joints`,
      iv: `Party joints`
    }
  },
  {
    id: 'Q126',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What is articular cartilage's role?`,
    options: {
      i: `Produces synovial fluid`,
      ii: `Connects muscles`,
      iii: `Reduces friction and shock`,
      iv: `Makes joints artistic`
    }
  },
  {
    id: 'Q127',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What produces synovial fluid?`,
    options: {
      i: `Articular cartilage`,
      ii: `Ligaments`,
      iii: `Synovial membrane`,
      iv: `Joint juice factory`
    }
  },
  {
    id: 'Q128',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `Which cartilage in intervertebral discs?`,
    options: {
      i: `Hyaline cartilage`,
      ii: `Elastic cartilage`,
      iii: `Fibrocartilage`,
      iv: `Squishy spine cartilage`
    }
  },
  {
    id: 'Q129',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What is a sprain?`,
    options: {
      i: `Damage to tendon`,
      ii: `Fracture of bone`,
      iii: `Ligament stretching or tearing`,
      iv: `Pulling a Spain`
    }
  },
  {
    id: 'Q130',
    topic: `Structure and Function of Connective Tissues (B.1.2)`,
    level: 'SL',
    question: `What is a strain?`,
    options: {
      i: `Injury to ligament`,
      ii: `Damage to cartilage`,
      iii: `Muscle or tendon stretching`,
      iv: `Exercise pain`
    }
  },
  {
    id: 'Q131',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `Which fiber type resists fatigue most?`,
    options: {
      i: `Type IIx fast-twitch`,
      ii: `Type IIa intermediate`,
      iii: `Type I slow-twitch`,
      iv: `Type LOL fibers`
    }
  },
  {
    id: 'Q132',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `Contraction with no length change?`,
    options: {
      i: `Isotonic concentric`,
      ii: `Isotonic eccentric`,
      iii: `Isometric`,
      iv: `Statue contraction`
    }
  },
  {
    id: 'Q133',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `Which fiber produces most force rapidly?`,
    options: {
      i: `Type I slow-twitch`,
      ii: `Cardiac muscle fibers`,
      iii: `Type IIx fast-twitch`,
      iv: `Hulk fibers`
    }
  },
  {
    id: 'Q134',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `What is concentric contraction?`,
    options: {
      i: `Muscle lengthens under tension`,
      ii: `Muscle length constant`,
      iii: `Muscle shortens while contracting`,
      iv: `Showing off concentrically`
    }
  },
  {
    id: 'Q135',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `What is eccentric contraction?`,
    options: {
      i: `Muscle shortens under load`,
      ii: `No length change`,
      iii: `Muscle lengthens under tension`,
      iv: `Acting weird and eccentric`
    }
  },
  {
    id: 'Q136',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `Agonist during elbow flexion?`,
    options: {
      i: `Triceps brachii`,
      ii: `Deltoid`,
      iii: `Biceps brachii`,
      iv: `Show-off muscle`
    }
  },
  {
    id: 'Q137',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `What role does antagonist play?`,
    options: {
      i: `Assists the agonist`,
      ii: `Stabilizes the joint`,
      iii: `Opposes agonist action`,
      iv: `Antagonizes during workouts`
    }
  },
  {
    id: 'Q138',
    topic: `Muscular Function (B.1.3)`,
    level: 'SL',
    question: `What is muscle hypertrophy?`,
    options: {
      i: `Decrease in size`,
      ii: `Muscle fatigue`,
      iii: `Increase in size`,
      iv: `Winning muscle trophies`
    }
  },
  {
    id: 'Q139',
    topic: `Muscular Function (B.1.3)`,
    level: 'HL',
    question: `Which filaments slide in contraction?`,
    options: {
      i: `Myosin and collagen`,
      ii: `Actin and troponin`,
      iii: `Actin and myosin`,
      iv: `Slippery filaments`
    }
  },
  {
    id: 'Q140',
    topic: `Muscular Function (B.1.3)`,
    level: 'HL',
    question: `Which ion triggers contraction?`,
    options: {
      i: `Sodium ions`,
      ii: `Potassium ions`,
      iii: `Calcium ions`,
      iv: `Magic ions`
    }
  },
  {
    id: 'Q141',
    topic: `Muscular Function (B.1.3)`,
    level: 'HL',
    question: `What is neuromuscular junction?`,
    options: {
      i: `Connection between muscles`,
      ii: `Junction between bones`,
      iii: `Synapse between neuron and muscle`,
      iv: `Coffee meeting spot`
    }
  },
  {
    id: 'Q142',
    topic: `Muscular Function (B.1.3)`,
    level: 'HL',
    question: `What is a motor unit?`,
    options: {
      i: `Single muscle fiber`,
      ii: `Brain's motor cortex`,
      iii: `Neuron and all fibers innervated`,
      iv: `Smallest driving unit`
    }
  },
  {
    id: 'Q143',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Fulcrum between effort and load?`,
    options: {
      i: `Second-class lever`,
      ii: `Third-class lever`,
      iii: `First-class lever`,
      iv: `See-saw lever`
    }
  },
  {
    id: 'Q144',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Load between fulcrum and effort?`,
    options: {
      i: `First-class lever`,
      ii: `Third-class lever`,
      iii: `Second-class lever`,
      iv: `Wheelbarrow class`
    }
  },
  {
    id: 'Q145',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Most common lever in body?`,
    options: {
      i: `First-class levers`,
      ii: `Second-class levers`,
      iii: `Third-class levers`,
      iv: `Awkward class`
    }
  },
  {
    id: 'Q146',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Where is effort in third-class?`,
    options: {
      i: `Beyond the load`,
      ii: `At the fulcrum`,
      iii: `Between fulcrum and load`,
      iv: `Wherever it feels like`
    }
  },
  {
    id: 'Q147',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `What represents fulcrum in body?`,
    options: {
      i: `The muscle`,
      ii: `The bone`,
      iii: `The joint`,
      iv: `Patience pivot point`
    }
  },
  {
    id: 'Q148',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `What is mechanical advantage?`,
    options: {
      i: `Speed of movement`,
      ii: `Range of motion`,
      iii: `Ratio of load to effort`,
      iv: `Robot workout help`
    }
  },
  {
    id: 'Q149',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Load during bicep curl?`,
    options: {
      i: `Biceps muscle`,
      ii: `Elbow joint`,
      iii: `Weight in hand`,
      iv: `Emotional baggage`
    }
  },
  {
    id: 'Q150',
    topic: `Levers (B.1.4)`,
    level: 'SL',
    question: `Greatest mechanical advantage?`,
    options: {
      i: `First-class always`,
      ii: `Third-class levers`,
      iii: `Second-class levers`,
      iv: `Cheater class`
    }
  },
  {
    id: 'Q151',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `What does Newton's First Law state?`,
    options: {
      i: `Force equals mass times acceleration`,
      ii: `Actions have equal reactions`,
      iii: `Objects resist motion changes`,
      iv: `What goes up comes down`
    }
  },
  {
    id: 'Q152',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `Impulse is product of which quantities?`,
    options: {
      i: `Mass and velocity`,
      ii: `Mass and acceleration`,
      iii: `Force and time`,
      iv: `Enthusiasm and recklessness`
    }
  },
  {
    id: 'Q153',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `What does Newton's Second Law state?`,
    options: {
      i: `Objects at rest stay at rest`,
      ii: `Equal and opposite reactions`,
      iii: `Force = mass × acceleration`,
      iv: `Bigger muscles = better athlete`
    }
  },
  {
    id: 'Q154',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `What is momentum?`,
    options: {
      i: `Force over time`,
      ii: `Rate of velocity change`,
      iii: `Mass × velocity`,
      iv: `What you lose after bad workout`
    }
  },
  {
    id: 'Q155',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `Newton's Third Law: forces occur how?`,
    options: {
      i: `Randomly`,
      ii: `Only when moving`,
      iii: `Equal and opposite pairs`,
      iv: `Dramatically with sound effects`
    }
  },
  {
    id: 'Q156',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'SL',
    question: `Sprinter pushes back on blocks, what happens?`,
    options: {
      i: `Nothing happens`,
      ii: `Blocks move backward`,
      iii: `Blocks push forward on sprinter`,
      iv: `Blocks complain about treatment`
    }
  },
  {
    id: 'Q157',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is center of mass?`,
    options: {
      i: `Always geometric center`,
      ii: `Heaviest body part`,
      iii: `Point where mass concentrated`,
      iv: `Mass existential crisis location`
    }
  },
  {
    id: 'Q158',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is inertia?`,
    options: {
      i: `Force to move object`,
      ii: `Speed of object`,
      iii: `Resistance to motion changes`,
      iv: `Desire to stay on couch`
    }
  },
  {
    id: 'Q159',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `How to reduce impact force?`,
    options: {
      i: `By reducing mass`,
      ii: `By increasing velocity`,
      iii: `By increasing contact time`,
      iv: `By yelling loudly`
    }
  },
  {
    id: 'Q160',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is angular momentum?`,
    options: {
      i: `Same as linear momentum`,
      ii: `Mass times angular velocity`,
      iii: `Moment of inertia × angular velocity`,
      iv: `Spin before dizzy speed`
    }
  },
  {
    id: 'Q161',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `Diver tucks during somersault, angular velocity?`,
    options: {
      i: `Decreases`,
      ii: `Remains constant`,
      iii: `Increases`,
      iv: `Becomes unpredictable`
    }
  },
  {
    id: 'Q162',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is torque?`,
    options: {
      i: `Linear force only`,
      ii: `Mass times velocity`,
      iii: `Force × perpendicular distance`,
      iv: `Gym talk topic`
    }
  },
  {
    id: 'Q163',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is moment of inertia?`,
    options: {
      i: `Same as mass`,
      ii: `Linear motion resistance`,
      iii: `Rotational resistance based on mass distribution`,
      iv: `How lazy about spinning`
    }
  },
  {
    id: 'Q164',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `Conservation of momentum principle?`,
    options: {
      i: `Momentum always increases`,
      ii: `Momentum always zero`,
      iii: `Total momentum before equals after`,
      iv: `What goes around comes around`
    }
  },
  {
    id: 'Q165',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `What is projectile motion?`,
    options: {
      i: `Straight line motion only`,
      ii: `Circular motion`,
      iii: `Motion under gravity after release`,
      iv: `Throwing and hoping for best`
    }
  },
  {
    id: 'Q166',
    topic: `Newton's Laws of Motion (B.2.1)`,
    level: 'HL',
    question: `Angle for maximum projectile range?`,
    options: {
      i: `90 degrees vertical`,
      ii: `0 degrees horizontal`,
      iii: `45 degrees`,
      iv: `Whatever looks coolest`
    }
  },
  {
    id: 'Q167',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'SL',
    question: `What is drag?`,
    options: {
      i: `Force helping motion`,
      ii: `Friction between solids only`,
      iii: `Resistive force in fluid`,
      iv: `Slows you besides excuses`
    }
  },
  {
    id: 'Q168',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'SL',
    question: `Which position minimizes drag?`,
    options: {
      i: `Upright position`,
      ii: `Spread-out position`,
      iii: `Streamlined position`,
      iv: `Starfish position`
    }
  },
  {
    id: 'Q169',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'SL',
    question: `What are two main drag types?`,
    options: {
      i: `Fast and slow drag`,
      ii: `Air and water drag`,
      iii: `Surface and form drag`,
      iv: `Good and bad drag`
    }
  },
  {
    id: 'Q170',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'SL',
    question: `How does velocity affect drag?`,
    options: {
      i: `Drag decreases with velocity`,
      ii: `No relationship exists`,
      iii: `Drag increases with velocity squared`,
      iv: `Drag judges excessive speed`
    }
  },
  {
    id: 'Q171',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is lift in fluid mechanics?`,
    options: {
      i: `Upward force only`,
      ii: `Same as drag`,
      iii: `Force perpendicular to flow`,
      iv: `What elevators provide`
    }
  },
  {
    id: 'Q172',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is Magnus effect?`,
    options: {
      i: `Drag on non-rotating objects`,
      ii: `Lift on stationary wings`,
      iii: `Curved path from spinning object`,
      iv: `Magnus Carlsen playing sports`
    }
  },
  {
    id: 'Q173',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `Which direction does topspin ball curve?`,
    options: {
      i: `Upward`,
      ii: `Sideways`,
      iii: `Downward`,
      iv: `Whichever confuses opponent`
    }
  },
  {
    id: 'Q174',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is Bernoulli's principle?`,
    options: {
      i: `Faster fluid = higher pressure`,
      ii: `Pressure always constant`,
      iii: `Faster flow = lower pressure`,
      iv: `Makes airplane food taste bad`
    }
  },
  {
    id: 'Q175',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is boundary layer?`,
    options: {
      i: `Edge of object`,
      ii: `Protective coating`,
      iii: `Thin fluid layer with reduced velocity`,
      iv: `Fluids' boundary issues layer`
    }
  },
  {
    id: 'Q176',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is laminar flow?`,
    options: {
      i: `Turbulent chaotic motion`,
      ii: `No fluid motion`,
      iii: `Smooth orderly flow`,
      iv: `Fluids being chill and organized`
    }
  },
  {
    id: 'Q177',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What is turbulent flow?`,
    options: {
      i: `Smooth parallel motion`,
      ii: `Absence of flow`,
      iii: `Chaotic motion with eddies`,
      iv: `Fluids having bad day`
    }
  },
  {
    id: 'Q178',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `How do golf ball dimples affect flight?`,
    options: {
      i: `Increase drag significantly`,
      ii: `Have no effect`,
      iii: `Create turbulence reducing drag`,
      iv: `Make ball fashionable`
    }
  },
  {
    id: 'Q179',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `What creates lift on discus?`,
    options: {
      i: `Weight distribution`,
      ii: `Magnetic fields`,
      iii: `Angle of attack and airflow`,
      iv: `Thrower's wishes and dreams`
    }
  },
  {
    id: 'Q180',
    topic: `Fluid Mechanics (B.2.2)`,
    level: 'HL',
    question: `Which sport benefits most from drafting?`,
    options: {
      i: `Swimming`,
      ii: `Archery`,
      iii: `Cycling`,
      iv: `Chess (mental drafting)`
    }
  },
  {
    id: 'Q181',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `What are force diagrams used for?`,
    options: {
      i: `Showing muscle anatomy`,
      ii: `Calculating velocity`,
      iii: `Representing forces on body`,
      iv: `Forcing physics understanding`
    }
  },
  {
    id: 'Q182',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `Vertical velocity at projectile peak?`,
    options: {
      i: `Maximum`,
      ii: `Equal to horizontal`,
      iii: `Zero`,
      iv: `Depends on throw height`
    }
  },
  {
    id: 'Q183',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `What remains constant in projectile motion?`,
    options: {
      i: `Vertical velocity`,
      ii: `Total velocity`,
      iii: `Horizontal velocity`,
      iv: `Thrower's confidence`
    }
  },
  {
    id: 'Q184',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `Runner's center of mass motion during sprint?`,
    options: {
      i: `Perfectly horizontal line`,
      ii: `Circular path`,
      iii: `Parabolic trajectory repeated`,
      iv: `Zigzag pattern`
    }
  },
  {
    id: 'Q185',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `What forces act on swimmer?`,
    options: {
      i: `Gravity only`,
      ii: `Thrust only`,
      iii: `Thrust, drag, gravity, buoyancy`,
      iv: `Forces of determination`
    }
  },
  {
    id: 'Q186',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `What can athlete control during flight?`,
    options: {
      i: `Trajectory of center of mass`,
      ii: `Horizontal velocity`,
      iii: `Body position and rotation`,
      iv: `Gravity itself`
    }
  },
  {
    id: 'Q187',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `Net force at constant velocity?`,
    options: {
      i: `Maximum force`,
      ii: `Equal to mass times velocity`,
      iii: `Zero (forces balanced)`,
      iv: `Whatever force shows up`
    }
  },
  {
    id: 'Q188',
    topic: `Movement Analysis (B.2.3)`,
    level: 'SL',
    question: `What doesn't affect projectile range?`,
    options: {
      i: `Release angle`,
      ii: `Release velocity`,
      iii: `Projectile mass`,
      iv: `Motivational state`
    }
  },
  {
    id: 'Q189',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `Which is internal risk factor?`,
    options: {
      i: `Playing surface quality`,
      ii: `Weather conditions`,
      iii: `Previous injury history`,
      iv: `Coach's mood swings`
    }
  },
  {
    id: 'Q190',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `Which is external risk factor?`,
    options: {
      i: `Age of athlete`,
      ii: `Flexibility level`,
      iii: `Poor playing surface`,
      iv: `Opponent's annoying celebrations`
    }
  },
  {
    id: 'Q191',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `What type of injury is strain?`,
    options: {
      i: `Acute traumatic only`,
      ii: `Chronic degenerative only`,
      iii: `Acute or chronic overuse`,
      iv: `The 'I lifted too much' injury`
    }
  },
  {
    id: 'Q192',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `Common mechanism for ACL tears?`,
    options: {
      i: `Gradual degeneration over time`,
      ii: `Overuse from running`,
      iii: `Sudden deceleration with knee valgus`,
      iv: `Tying shoes too tight`
    }
  },
  {
    id: 'Q193',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `What is overuse injury?`,
    options: {
      i: `Single traumatic impact`,
      ii: `Injury from excessive rest`,
      iii: `Repetitive microtrauma over time`,
      iv: `Using excuses too much`
    }
  },
  {
    id: 'Q194',
    topic: `Causes of Injury (B.3.1)`,
    level: 'SL',
    question: `What increases concussion risk?`,
    options: {
      i: `High cardiovascular fitness`,
      ii: `Increased muscle mass`,
      iii: `Previous concussion history`,
      iv: `Thinking about physics too hard`
    }
  },
  {
    id: 'Q195',
    topic: `Causes of Injury (B.3.1)`,
    level: 'HL',
    question: `Biomechanical factor increasing female knee injury?`,
    options: {
      i: `Wider shoulders`,
      ii: `Longer arms`,
      iii: `Greater Q-angle and valgus`,
      iv: `Being too flexible everywhere`
    }
  },
  {
    id: 'Q196',
    topic: `Causes of Injury (B.3.1)`,
    level: 'HL',
    question: `Training load and injury relationship?`,
    options: {
      i: `Linear: more training increases risk`,
      ii: `No relationship exists`,
      iii: `U-shaped: very low or high increases risk`,
      iv: `Inverse: more training prevents injury`
    }
  },
  {
    id: 'Q197',
    topic: `Injury Interventions (B.3.2)`,
    level: 'SL',
    question: `Primary purpose of protective equipment?`,
    options: {
      i: `To look professional`,
      ii: `To increase performance`,
      iii: `To absorb and distribute forces`,
      iv: `To intimidate opponents`
    }
  },
  {
    id: 'Q198',
    topic: `Injury Interventions (B.3.2)`,
    level: 'SL',
    question: `What does neuromuscular training improve?`,
    options: {
      i: `Maximum strength only`,
      ii: `Aerobic capacity`,
      iii: `Movement patterns and proprioception`,
      iv: `Ability to name all nerves`
    }
  },
  {
    id: 'Q199',
    topic: `Injury Interventions (B.3.2)`,
    level: 'SL',
    question: `Most effective warm-up for injury prevention?`,
    options: {
      i: `Static stretching only`,
      ii: `Standing still visualizing`,
      iii: `Dynamic sport-specific movements`,
      iv: `Complaining about warming up`
    }
  },
  {
    id: 'Q200',
    topic: `Injury Interventions (B.3.2)`,
    level: 'SL',
    question: `Proper technique's role in prevention?`,
    options: {
      i: `Purely aesthetic`,
      ii: `Only important for beginners`,
      iii: `Reduces biomechanical stress`,
      iv: `Makes you look knowledgeable`
    }
  },
  {
    id: 'Q201',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `What is personality in psychology?`,
    options: {
      i: `Temporary emotional states`,
      ii: `Learned skills and abilities`,
      iii: `Consistent behavioral patterns`,
      iv: `How fun you are at parties`
    }
  },
  {
    id: 'Q202',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `Which personality approach emphasizes traits?`,
    options: {
      i: `Social learning theory`,
      ii: `Interactional approach`,
      iii: `Trait approach`,
      iv: `The label-everyone approach`
    }
  },
  {
    id: 'Q203',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `What does interactional approach emphasize?`,
    options: {
      i: `Only personality traits`,
      ii: `Only environmental factors`,
      iii: `Person-situation interaction`,
      iv: `Everyone getting along`
    }
  },
  {
    id: 'Q204',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `What is mental toughness?`,
    options: {
      i: `Ignoring all emotions`,
      ii: `Being physically strong`,
      iii: `Resilience under pressure`,
      iv: `Never admitting defeat (stubbornly)`
    }
  },
  {
    id: 'Q205',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `What is self-confidence in sport?`,
    options: {
      i: `Overestimating abilities`,
      ii: `Ignoring weaknesses`,
      iii: `Belief in abilities`,
      iv: `Thinking you're superhuman`
    }
  },
  {
    id: 'Q206',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'SL',
    question: `Which is NOT a Big Five personality trait?`,
    options: {
      i: `Openness to experience`,
      ii: `Conscientiousness`,
      iii: `Mental toughness`,
      iv: `Procrastination (wishful thinking)`
    }
  },
  {
    id: 'Q207',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `What is self-efficacy?`,
    options: {
      i: `Global self-confidence`,
      ii: `Physical ability level`,
      iii: `Task-specific confidence`,
      iv: `Ego size measurement`
    }
  },
  {
    id: 'Q208',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `Which source builds self-efficacy most?`,
    options: {
      i: `Verbal persuasion only`,
      ii: `Vicarious experiences`,
      iii: `Performance accomplishments`,
      iv: `Social media likes`
    }
  },
  {
    id: 'Q209',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `What is attribution theory about?`,
    options: {
      i: `Personality trait development`,
      ii: `Skill acquisition stages`,
      iii: `Explaining success and failure`,
      iv: `Giving credit where due (literally)`
    }
  },
  {
    id: 'Q210',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `Optimal attribution pattern after failure?`,
    options: {
      i: `Stable, internal, uncontrollable`,
      ii: `Stable, external, uncontrollable`,
      iii: `Unstable, internal, controllable`,
      iv: `Everyone else's fault always`
    }
  },
  {
    id: 'Q211',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `What is learned helplessness?`,
    options: {
      i: `Asking for help appropriately`,
      ii: `Strategic dependence on others`,
      iii: `Believing effort is futile`,
      iv: `Learning to be lazy (not really)`
    }
  },
  {
    id: 'Q212',
    topic: `Individual Differences in Sport (C.1.1)`,
    level: 'HL',
    question: `What does locus of control measure?`,
    options: {
      i: `Self-confidence levels`,
      ii: `Arousal regulation ability`,
      iii: `Internal vs external control beliefs`,
      iv: `Where you left your keys`
    }
  },
  {
    id: 'Q213',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `What is group cohesion?`,
    options: {
      i: `Number of group members`,
      ii: `Group's skill level`,
      iii: `Unity and togetherness`,
      iv: `Standing really close together`
    }
  },
  {
    id: 'Q214',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `What is task cohesion?`,
    options: {
      i: `Friendship among members`,
      ii: `Social activities together`,
      iii: `Unity toward goal achievement`,
      iv: `Cohesive to-do lists`
    }
  },
  {
    id: 'Q215',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `What is social cohesion?`,
    options: {
      i: `Working together toward goals`,
      ii: `Following team rules`,
      iii: `Interpersonal attraction`,
      iv: `Having group social media`
    }
  },
  {
    id: 'Q216',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `What is social loafing?`,
    options: {
      i: `Relaxing after performance`,
      ii: `Team building activities`,
      iii: `Reduced effort in groups`,
      iv: `Lounging on team couch`
    }
  },
  {
    id: 'Q217',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `Which leadership style is most democratic?`,
    options: {
      i: `Autocratic leadership style`,
      ii: `Laissez-faire leadership style`,
      iii: `Democratic leadership style`,
      iv: `The voting-on-everything style`
    }
  },
  {
    id: 'Q218',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'SL',
    question: `What does autocratic leadership involve?`,
    options: {
      i: `Shared decision making`,
      ii: `Minimal coach involvement`,
      iii: `Coach-controlled decisions`,
      iv: `Ruling with iron whistle`
    }
  },
  {
    id: 'Q219',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'HL',
    question: `What is Ringelmann effect?`,
    options: {
      i: `Improved group performance`,
      ii: `Individual skill development`,
      iii: `Decreased performance in groups`,
      iv: `Circus performer syndrome`
    }
  },
  {
    id: 'Q220',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'HL',
    question: `How to reduce social loafing?`,
    options: {
      i: `Increase group size`,
      ii: `Reduce performance feedback`,
      iii: `Increase individual accountability`,
      iv: `Hide in larger groups`
    }
  },
  {
    id: 'Q221',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'HL',
    question: `What is Carron's cohesion model about?`,
    options: {
      i: `Only task cohesion`,
      ii: `Leadership styles exclusively`,
      iii: `Factors influencing cohesion`,
      iv: `How to make team sandwiches`
    }
  },
  {
    id: 'Q222',
    topic: `Group Dynamics and Leadership (C.1.2)`,
    level: 'HL',
    question: `What does Chelladurai's model explain?`,
    options: {
      i: `Group cohesion development`,
      ii: `Motivation theories`,
      iii: `Leadership effectiveness`,
      iv: `How to spell Chelladurai`
    }
  },
  {
    id: 'Q223',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What defines a motor skill?`,
    options: {
      i: `Cognitive knowledge only`,
      ii: `Emotional regulation`,
      iii: `Learned movement pattern`,
      iv: `Car-related ability`
    }
  },
  {
    id: 'Q224',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What characterizes open skills?`,
    options: {
      i: `Stable predictable environment`,
      ii: `Self-paced execution`,
      iii: `Unpredictable environment`,
      iv: `Playing with eyes open`
    }
  },
  {
    id: 'Q225',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What characterizes closed skills?`,
    options: {
      i: `Unpredictable opponent actions`,
      ii: `Externally paced movements`,
      iii: `Stable predictable environment`,
      iv: `Playing with eyes closed (not really)`
    }
  },
  {
    id: 'Q226',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What are discrete skills?`,
    options: {
      i: `Continuous repetitive movements`,
      ii: `Long duration movements`,
      iii: `Brief with clear endpoints`,
      iv: `Skills you're discreet about`
    }
  },
  {
    id: 'Q227',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What are continuous skills?`,
    options: {
      i: `Brief single movements`,
      ii: `Multiple separate actions`,
      iii: `Repetitive with no clear end`,
      iv: `Skills that never stop (help)`
    }
  },
  {
    id: 'Q228',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What is the cognitive stage?`,
    options: {
      i: `Automatic skill execution`,
      ii: `Refined consistent performance`,
      iii: `Understanding and early attempts`,
      iv: `Overthinking everything (relatable)`
    }
  },
  {
    id: 'Q229',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What is the autonomous stage?`,
    options: {
      i: `Conscious attention to details`,
      ii: `Frequent performance errors`,
      iii: `Automatic skilled performance`,
      iv: `Independence from coach (wishful)`
    }
  },
  {
    id: 'Q230',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What is massed practice?`,
    options: {
      i: `Short practice with long rests`,
      ii: `Practicing many different skills`,
      iii: `Continuous practice minimal rest`,
      iv: `Church practice (wrong context)`
    }
  },
  {
    id: 'Q231',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'SL',
    question: `What is distributed practice?`,
    options: {
      i: `Continuous extended practice`,
      ii: `Practicing one skill only`,
      iii: `Practice with rest intervals`,
      iv: `Sharing practice with everyone`
    }
  },
  {
    id: 'Q232',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'HL',
    question: `What is transfer of learning?`,
    options: {
      i: `Moving between practice locations`,
      ii: `Changing sports completely`,
      iii: `Previous learning influencing new`,
      iv: `Transferring to new school`
    }
  },
  {
    id: 'Q233',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'HL',
    question: `What is positive transfer?`,
    options: {
      i: `Previous learning hinders new`,
      ii: `No effect from previous learning`,
      iii: `Previous learning facilitates new`,
      iv: `Positive attitude during practice`
    }
  },
  {
    id: 'Q234',
    topic: `Skill Acquisition (C.2.1)`,
    level: 'HL',
    question: `What is negative transfer?`,
    options: {
      i: `Previous learning helps new skills`,
      ii: `No effect from experience`,
      iii: `Previous learning interferes with new`,
      iv: `Bad vibes during practice`
    }
  },
  {
    id: 'Q235',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What is reaction time?`,
    options: {
      i: `Time to complete movement`,
      ii: `Processing speed during movement`,
      iii: `Time from stimulus to response start`,
      iv: `How fast you get angry`
    }
  },
  {
    id: 'Q236',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What is response time?`,
    options: {
      i: `Stimulus detection only`,
      ii: `Movement execution only`,
      iii: `Reaction time plus movement time`,
      iv: `How long excuses take`
    }
  },
  {
    id: 'Q237',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What is selective attention?`,
    options: {
      i: `Attending to everything`,
      ii: `Not paying attention`,
      iii: `Focusing on relevant information`,
      iv: `Being choosy about listening`
    }
  },
  {
    id: 'Q238',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What affects reaction time?`,
    options: {
      i: `Shoe color worn`,
      ii: `Time of day only`,
      iii: `Stimulus intensity and complexity`,
      iv: `Breakfast cereal choice`
    }
  },
  {
    id: 'Q239',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What is Hick's Law?`,
    options: {
      i: `Practice improves performance`,
      ii: `Arousal affects performance`,
      iii: `More choices increase reaction time`,
      iv: `Country folk's law (not that)`
    }
  },
  {
    id: 'Q240',
    topic: `Information Processing (C.2.2)`,
    level: 'SL',
    question: `What is anticipation?`,
    options: {
      i: `Reacting after stimulus`,
      ii: `Random guessing movements`,
      iii: `Predicting upcoming events`,
      iv: `Getting excited before events`
    }
  },
  {
    id: 'Q241',
    topic: `Information Processing (C.2.2)`,
    level: 'HL',
    question: `What is the psychological refractory period?`,
    options: {
      i: `Rest period between practices`,
      ii: `Time to recover from stress`,
      iii: `Delay when processing second stimulus`,
      iv: `When psychology takes break`
    }
  },
  {
    id: 'Q242',
    topic: `Information Processing (C.2.2)`,
    level: 'HL',
    question: `What are the information processing stages?`,
    options: {
      i: `Only stimulus detection`,
      ii: `Input and output only`,
      iii: `Input, decision, output`,
      iv: `Download, process, upload`
    }
  },
  {
    id: 'Q243',
    topic: `Information Processing (C.2.2)`,
    level: 'HL',
    question: `What is the speed-accuracy trade-off?`,
    options: {
      i: `Speed and accuracy independent`,
      ii: `Always prioritize speed`,
      iii: `Faster movements decrease accuracy`,
      iv: `Trading speed for looking accurate`
    }
  },
  {
    id: 'Q244',
    topic: `Information Processing (C.2.2)`,
    level: 'HL',
    question: `What is schema theory?`,
    options: {
      i: `Specific movement programs stored`,
      ii: `No memory for movements`,
      iii: `Generalized motor programs stored`,
      iv: `Movement conspiracy theories`
    }
  },
  {
    id: 'Q245',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `What is achievement motivation?`,
    options: {
      i: `Fear of failure only`,
      ii: `External rewards only`,
      iii: `Striving for success`,
      iv: `Collecting achievement badges`
    }
  },
  {
    id: 'Q246',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `What is task orientation?`,
    options: {
      i: `Comparing to others`,
      ii: `Avoiding challenges`,
      iii: `Focusing on personal improvement`,
      iv: `Getting things done (literally)`
    }
  },
  {
    id: 'Q247',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `What is ego orientation?`,
    options: {
      i: `Personal improvement focus`,
      ii: `Avoiding social comparison`,
      iii: `Comparing to others`,
      iv: `Being self-centered (not quite)`
    }
  },
  {
    id: 'Q248',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `Which orientation promotes long-term motivation?`,
    options: {
      i: `Ego orientation primarily`,
      ii: `Neither orientation`,
      iii: `Task orientation`,
      iv: `Disorientation (kidding)`
    }
  },
  {
    id: 'Q249',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `What is intrinsic motivation?`,
    options: {
      i: `Motivated by external rewards`,
      ii: `Motivated by coach pressure`,
      iii: `Motivated by inherent satisfaction`,
      iv: `Motivated by Instagram likes`
    }
  },
  {
    id: 'Q250',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'SL',
    question: `What is extrinsic motivation?`,
    options: {
      i: `Internal satisfaction only`,
      ii: `No external influences`,
      iii: `External rewards and outcomes`,
      iv: `Motivation from outside sources (literally)`
    }
  },
  {
    id: 'Q251',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'HL',
    question: `What is self-determination theory?`,
    options: {
      i: `Only extrinsic rewards matter`,
      ii: `Motivation is fixed trait`,
      iii: `Three basic psychological needs`,
      iv: `Being determined = being motivated`
    }
  },
  {
    id: 'Q252',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'HL',
    question: `What is competence in SDT?`,
    options: {
      i: `Comparing to others`,
      ii: `External validation only`,
      iii: `Feeling effective and capable`,
      iv: `Being really competitive (not quite)`
    }
  },
  {
    id: 'Q253',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'HL',
    question: `What is autonomy in SDT?`,
    options: {
      i: `Complete independence from coach`,
      ii: `Following all external rules`,
      iii: `Sense of choice and volition`,
      iv: `Being self-sufficient completely`
    }
  },
  {
    id: 'Q254',
    topic: `Achievement Motivation (C.3.1)`,
    level: 'HL',
    question: `What is relatedness in SDT?`,
    options: {
      i: `Task completion focus`,
      ii: `Individual achievement focus`,
      iii: `Connection and belonging`,
      iv: `Being related to everyone`
    }
  },
  {
    id: 'Q255',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `What are outcome goals?`,
    options: {
      i: `Personal performance standards`,
      ii: `Technique improvements`,
      iii: `Winning and competitive results`,
      iv: `Whatever outcomes happen`
    }
  },
  {
    id: 'Q256',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `What are performance goals?`,
    options: {
      i: `Beating specific opponents`,
      ii: `Social comparison focus`,
      iii: `Personal standards achievement`,
      iv: `Acting performance quality`
    }
  },
  {
    id: 'Q257',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `What are process goals?`,
    options: {
      i: `Winning competitions`,
      ii: `Comparing to others`,
      iii: `Technique and strategy execution`,
      iv: `Processing information quickly`
    }
  },
  {
    id: 'Q258',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `What does 'S' in SMART goals mean?`,
    options: {
      i: `Strategic`,
      ii: `Simple`,
      iii: `Specific`,
      iv: `Super amazing`
    }
  },
  {
    id: 'Q259',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `What type of goals are most controllable?`,
    options: {
      i: `Outcome goals primarily`,
      ii: `Winning-focused goals`,
      iii: `Process goals`,
      iv: `Goals you can boss around`
    }
  },
  {
    id: 'Q260',
    topic: `Goal Setting (C.3.2)`,
    level: 'SL',
    question: `Why set short-term goals?`,
    options: {
      i: `To avoid long-term planning`,
      ii: `Because they're easier`,
      iii: `To maintain motivation toward long-term`,
      iv: `For immediate gratification only`
    }
  },
  {
    id: 'Q261',
    topic: `Goal Setting (C.3.2)`,
    level: 'HL',
    question: `What is goal proximity?`,
    options: {
      i: `How difficult goals are`,
      ii: `How specific goals are`,
      iii: `Timeframe for goal achievement`,
      iv: `How close goals are physically`
    }
  },
  {
    id: 'Q262',
    topic: `Goal Setting (C.3.2)`,
    level: 'HL',
    question: `What is goal commitment?`,
    options: {
      i: `Writing goals down`,
      ii: `Sharing with others`,
      iii: `Determination to achieve goals`,
      iv: `Marriage to your goals (metaphorically)`
    }
  },
  {
    id: 'Q263',
    topic: `Goal Setting (C.3.2)`,
    level: 'HL',
    question: `How does goal difficulty affect motivation?`,
    options: {
      i: `Easy goals maximize motivation`,
      ii: `Difficulty level irrelevant`,
      iii: `Moderate challenge optimizes motivation`,
      iv: `Impossibly hard = most motivating`
    }
  },
  {
    id: 'Q264',
    topic: `Goal Setting (C.3.2)`,
    level: 'HL',
    question: `What is a common goal-setting mistake?`,
    options: {
      i: `Setting too many specific goals`,
      ii: `Making goals too measurable`,
      iii: `Focusing only on outcome goals`,
      iv: `Actually achieving your goals`
    }
  },
  {
    id: 'Q265',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What is arousal?`,
    options: {
      i: `Always negative state`,
      ii: `Only physical activation`,
      iii: `General physiological activation`,
      iv: `Waking up in morning (technically)`
    }
  },
  {
    id: 'Q266',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What is anxiety?`,
    options: {
      i: `Same as arousal`,
      ii: `Always beneficial`,
      iii: `Negative emotional state with worry`,
      iv: `Being anxious about everything`
    }
  },
  {
    id: 'Q267',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What is cognitive anxiety?`,
    options: {
      i: `Physical tension symptoms`,
      ii: `Optimal activation level`,
      iii: `Negative thoughts and worry`,
      iv: `Anxiety about thinking too much`
    }
  },
  {
    id: 'Q268',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What is somatic anxiety?`,
    options: {
      i: `Mental worry components`,
      ii: `Confidence loss`,
      iii: `Physical symptoms and tension`,
      iv: `Body anxiety (literal translation)`
    }
  },
  {
    id: 'Q269',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What does Drive Theory propose?`,
    options: {
      i: `Inverted-U relationship`,
      ii: `Anxiety always harms performance`,
      iii: `Linear arousal-performance relationship`,
      iv: `More drive = more driving (not that)`
    }
  },
  {
    id: 'Q270',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What does Inverted-U Hypothesis propose?`,
    options: {
      i: `Linear arousal-performance relationship`,
      ii: `Low arousal always optimal`,
      iii: `Moderate arousal optimal`,
      iv: `U-shaped like horseshoe`
    }
  },
  {
    id: 'Q271',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'SL',
    question: `What is optimal arousal level?`,
    options: {
      i: `Always maximum arousal`,
      ii: `Same for all tasks`,
      iii: `Varies by task complexity`,
      iv: `Whatever feels right`
    }
  },
  {
    id: 'Q272',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'HL',
    question: `What is catastrophe theory?`,
    options: {
      i: `Performance always decreases gradually`,
      ii: `Arousal doesn't affect performance`,
      iii: `High anxiety causes performance collapse`,
      iv: `Theory about actual catastrophes`
    }
  },
  {
    id: 'Q273',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'HL',
    question: `What is Zone of Optimal Functioning?`,
    options: {
      i: `Same zone for everyone`,
      ii: `Only one optimal point`,
      iii: `Individualized optimal arousal range`,
      iv: `Geographic optimal training location`
    }
  },
  {
    id: 'Q274',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'HL',
    question: `What is state anxiety?`,
    options: {
      i: `Stable personality characteristic`,
      ii: `Geographic location anxiety`,
      iii: `Temporary situational response`,
      iv: `Anxiety about current state`
    }
  },
  {
    id: 'Q275',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'HL',
    question: `What is trait anxiety?`,
    options: {
      i: `Temporary emotional state`,
      ii: `Situation-specific response`,
      iii: `Stable personality disposition`,
      iv: `Anxious personality traits specifically`
    }
  },
  {
    id: 'Q276',
    topic: `Arousal and Anxiety (C.4.1)`,
    level: 'HL',
    question: `How does anxiety affect attention?`,
    options: {
      i: `Improves focus always`,
      ii: `No effect on attention`,
      iii: `Narrows attentional focus`,
      iv: `Makes you pay attention (forcefully)`
    }
  },
  {
    id: 'Q277',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is problem-focused coping?`,
    options: {
      i: `Avoiding the problem`,
      ii: `Managing emotions only`,
      iii: `Addressing source of stress`,
      iv: `Focusing really hard on problems`
    }
  },
  {
    id: 'Q278',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is emotion-focused coping?`,
    options: {
      i: `Solving the problem directly`,
      ii: `Avoiding all emotions`,
      iii: `Managing emotional response`,
      iv: `Being emotionally focused (generally)`
    }
  },
  {
    id: 'Q279',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is progressive muscle relaxation?`,
    options: {
      i: `Stretching exercises`,
      ii: `Cardiovascular training`,
      iii: `Tensing then releasing muscles`,
      iv: `Progressively getting more relaxed`
    }
  },
  {
    id: 'Q280',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is controlled breathing?`,
    options: {
      i: `Hyperventilation technique`,
      ii: `Holding breath extended periods`,
      iii: `Regulating breath rate and depth`,
      iv: `Controlling others' breathing (creepy)`
    }
  },
  {
    id: 'Q281',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is cognitive restructuring?`,
    options: {
      i: `Physical relaxation technique`,
      ii: `Avoiding negative thoughts`,
      iii: `Changing negative thought patterns`,
      iv: `Restructuring brain physically`
    }
  },
  {
    id: 'Q282',
    topic: `Coping Strategies (C.4.2)`,
    level: 'SL',
    question: `What is positive self-talk?`,
    options: {
      i: `Ignoring problems`,
      ii: `Criticizing performance`,
      iii: `Using encouraging statements`,
      iv: `Talking to yourself positively (literally)`
    }
  },
  {
    id: 'Q283',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `What is systematic desensitization?`,
    options: {
      i: `One-time exposure to fear`,
      ii: `Avoiding anxiety-inducing situations`,
      iii: `Gradual exposure with relaxation`,
      iv: `Becoming systematically less sensitive`
    }
  },
  {
    id: 'Q284',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `What is stress inoculation training?`,
    options: {
      i: `Getting medical vaccinations`,
      ii: `Avoiding all stress`,
      iii: `Preparing for stress through practice`,
      iv: `Injecting stress resistance (not literally)`
    }
  },
  {
    id: 'Q285',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `What is mindfulness?`,
    options: {
      i: `Overthinking everything`,
      ii: `Avoiding present moment`,
      iii: `Non-judgmental present awareness`,
      iv: `Being mindful of mind (recursively)`
    }
  },
  {
    id: 'Q286',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `What is centering?`,
    options: {
      i: `Physical center of mass focus`,
      ii: `Avoiding distractions completely`,
      iii: `Controlling arousal and attention`,
      iv: `Being center of attention`
    }
  },
  {
    id: 'Q287',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `When is emotion-focused coping most effective?`,
    options: {
      i: `When stressor is controllable`,
      ii: `Never effective`,
      iii: `When stressor is uncontrollable`,
      iv: `When emotions run high`
    }
  },
  {
    id: 'Q288',
    topic: `Coping Strategies (C.4.2)`,
    level: 'HL',
    question: `What is biofeedback?`,
    options: {
      i: `Biological meal timing`,
      ii: `Verbal coaching feedback`,
      iii: `Monitoring physiological responses`,
      iv: `Feeding back biological information (literally)`
    }
  },
  {
    id: 'Q289',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `What is imagery?`,
    options: {
      i: `Watching video recordings`,
      ii: `Reading about movements`,
      iii: `Creating mental sensory experiences`,
      iv: `Making images in Photoshop`
    }
  },
  {
    id: 'Q290',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `What is internal imagery?`,
    options: {
      i: `Coach's perspective`,
      ii: `External observer view`,
      iii: `First-person performer perspective`,
      iv: `Imagery inside your body (literally)`
    }
  },
  {
    id: 'Q291',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `What is external imagery?`,
    options: {
      i: `Imagining outside environment`,
      ii: `Someone else performing`,
      iii: `Third-person observer perspective`,
      iv: `Imagery outside your body (literally)`
    }
  },
  {
    id: 'Q292',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `When is imagery most effective?`,
    options: {
      i: `Without any practice`,
      ii: `Only before competition`,
      iii: `Combined with physical practice`,
      iv: `While sleeping`
    }
  },
  {
    id: 'Q293',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `What is a pre-performance routine?`,
    options: {
      i: `Warm-up exercises only`,
      ii: `Random preparation activities`,
      iii: `Consistent preparation sequence`,
      iv: `Routine before routines`
    }
  },
  {
    id: 'Q294',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'SL',
    question: `Why use pre-performance routines?`,
    options: {
      i: `To waste time`,
      ii: `To confuse opponents`,
      iii: `To enhance focus and consistency`,
      iv: `Because everyone does it`
    }
  },
  {
    id: 'Q295',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What is attentional focus?`,
    options: {
      i: `Only external focus`,
      ii: `Avoiding distractions only`,
      iii: `Directing attention strategically`,
      iv: `Focusing attention intensely`
    }
  },
  {
    id: 'Q296',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What is associative attention?`,
    options: {
      i: `Focusing on external environment`,
      ii: `Avoiding bodily sensations`,
      iii: `Monitoring internal body sensations`,
      iv: `Associating with training partners`
    }
  },
  {
    id: 'Q297',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What is dissociative attention?`,
    options: {
      i: `Monitoring body sensations`,
      ii: `Focusing on technique`,
      iii: `Distracting from discomfort`,
      iv: `Dissociating from everyone`
    }
  },
  {
    id: 'Q298',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What does PETTLEP model address?`,
    options: {
      i: `Goal setting only`,
      ii: `Motivation enhancement`,
      iii: `Imagery effectiveness`,
      iv: `Pet training techniques`
    }
  },
  {
    id: 'Q299',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What is simulation training?`,
    options: {
      i: `Imagining competition only`,
      ii: `Video game training`,
      iii: `Recreating competitive conditions`,
      iv: `Simulating having trained`
    }
  },
  {
    id: 'Q300',
    topic: `Psychological Skills Training (C.5.1)`,
    level: 'HL',
    question: `What is mental practice?`,
    options: {
      i: `Studying sport psychology theory`,
      ii: `Discussing strategy with coach`,
      iii: `Cognitive rehearsal without movement`,
      iv: `Practicing being mental`
    }
  }
];

// All available topics
const ALL_TOPICS = [
  `Achievement Motivation (C.3.1)`,
  `Anatomical Position, Planes and Movement (B.1.1)`,
  `Arousal and Anxiety (C.4.1)`,
  `Benefits to Health (A.3.2)`,
  `Causes of Injury (B.3.1)`,
  `Coping Strategies (C.4.2)`,
  `Energy Systems (A.2.3)`,
  `Fatigue and Recovery (A.3.3)`,
  `Fluid Mechanics (B.2.2)`,
  `Fuelling for Health and Performance (A.2.2)`,
  `Goal Setting (C.3.2)`,
  `Group Dynamics and Leadership (C.1.2)`,
  `Individual Differences in Sport (C.1.1)`,
  `Information Processing (C.2.2)`,
  `Injury Interventions (B.3.2)`,
  `Inter-system Communication (A.1.1)`,
  `Levers (B.1.4)`,
  `Maintaining Homeostasis (A.1.2)`,
  `Movement Analysis (B.2.3)`,
  `Muscular Function (B.1.3)`,
  `Newton's Laws of Motion (B.2.1)`,
  `Psychological Skills Training (C.5.1)`,
  `Qualities of Training (A.3.1)`,
  `Skill Acquisition (C.2.1)`,
  `Structure and Function of Connective Tissues (B.1.2)`,
  `Transport (A.1.3)`,
  `Water and Electrolyte Balance (A.2.1)`
];
