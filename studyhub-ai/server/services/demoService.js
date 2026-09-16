/**
 * Demo Service provides intelligent pre-formatted study outputs
 * when GEMINI_API_KEY is not configured or live API calls fail.
 */

export function generateDemoNotes(text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('photosynthesis') || lowerText.includes('chlorophyll')) {
    return `## Photosynthesis & Plant Energy

• **Primary Definition**: Photosynthesis is the biochemical process plants use to convert sunlight into chemical energy.
• **Role of Chlorophyll**: Pigments inside chloroplasts capture light energy from the sun.
• **Key Inputs**: Plants absorb carbon dioxide ($CO_2$) from the air and water ($H_2O$) from root systems.
• **Primary Outputs**: Glucose is synthesized for energy storage, and oxygen ($O_2$) is released into the atmosphere.
• **Importance**: Supports virtually all life on Earth by producing oxygen and primary organic matter.`;
  }

  if (lowerText.includes(' प्रकाश ') || lowerText.includes('संश्लेषण') || lowerText.includes('पौधे')) {
    return `## प्रकाश संश्लेषण (Photosynthesis in Hindi)

• **मुख्य परिभाषा**: प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश की उपस्थिति में अपना भोजन बनाते हैं।
• **क्लोरोफिल की भूमिका**: पत्तियों में उपस्थित क्लोरोफिल सूर्य के प्रकाश को अवशोषित करता है।
• **आवश्यक घटक**: पौधे कार्बन डाइऑक्साइड ($CO_2$) और जल ($H_2O$) का उपयोग करते हैं।
• **अंतिम उत्पाद**: इस प्रक्रिया में ग्लूकोज (ऊर्जा) बनता है और ऑक्सीजन ($O_2$) गैस बाहर निकलती है।
• **पर्यावरणीय महत्व**: यह पृथ्वी पर जीवन और ऑक्सीजन संतुलन के लिए अत्यंत आवश्यक है।`;
  }

  if (lowerText.includes('world war') || lowerText.includes('wwii') || lowerText.includes('1939')) {
    return `## World War II (1939–1945) Summary Notes

• **Global Conflict**: Major military conflict involving over 30 countries divided into Allies and Axis powers.
• **Key Triggers**: Invasion of Poland in 1939, unresolved tensions from WWI, and expansionist policies.
• **Turning Points**: Battle of Stalingrad (1942–1943), D-Day Normandy invasion (1944), and Pacific campaigns.
• **Consequences**: Establishment of the United Nations, start of the Cold War, and geopolitical redrawing of borders.
• **Human Impact**: Decisive push for international human rights standards and global peace treaties.`;
  }

  if (lowerText.includes('python') || lowerText.includes('function') || lowerText.includes('def ')) {
    return `## Python Functions & Code Structure

• **Definition**: Reusable blocks of code that execute specific tasks when called.
• **Syntax**: Defined using the \`def\` keyword followed by function name and parameters: \`def function_name(args):\`.
• **Return Values**: Functions return data using the \`return\` statement. If omitted, \`None\` is returned automatically.
• **Parameters & Arguments**: Enable passing dynamic data into functions for flexible execution.
• **Best Practice**: Keep functions modular, single-purposed, and well-documented with docstrings.`;
  }

  if (lowerText.includes('machine learning') || lowerText.includes('neural') || lowerText.includes('algorithm')) {
    return `## Introduction to Machine Learning

• **Core Concept**: Subfield of Artificial Intelligence where algorithms improve automatically through experience and data.
• **Supervised Learning**: Models train on labeled datasets to make accurate predictions (e.g., classification, regression).
• **Unsupervised Learning**: Models identify hidden patterns and clusters in unlabeled data (e.g., K-means, PCA).
• **Reinforcement Learning**: Agents learn optimal actions through reward and penalty feedback loops.
• **Practical Applications**: Recommendation engines, medical diagnostics, image recognition, and autonomous navigation.`;
  }

  if (lowerText.includes('solar system') || lowerText.includes('planet') || lowerText.includes('orbit')) {
    return `## The Solar System Architecture

• **Central Star**: The Sun holds 99.8% of the Solar System's total mass and provides gravitational force for orbits.
• **Inner Terrestrial Planets**: Mercury, Venus, Earth, and Mars — composed primarily of rock and metal with solid surfaces.
• **Outer Gas & Ice Giants**: Jupiter, Saturn, Uranus, and Neptune — vast atmospheres composed mainly of hydrogen, helium, and methane.
• **Asteroid & Kuiper Belts**: Regions containing remnants from planetary formation, dwarf planets (like Pluto), and comets.
• **Orbital Mechanics**: All planets orbit counter-clockwise around the Sun in elliptical paths defined by Kepler's laws.`;
  }

  // Dynamic structured output for arbitrary student notes
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const headings = ["Key Concepts", "Core Observations", "Important Details", "Summary Takeaways"];
  
  let result = `## Organized Study Notes\n\n`;
  let lineCount = 0;
  
  lines.forEach((line, index) => {
    if (index % 3 === 0 && index < 9) {
      const heading = headings[Math.floor(index / 3)] || "Additional Points";
      result += `\n### ${heading}\n`;
    }
    const cleanedLine = line.replace(/^[•\-\*\d\.\s]+/, '');
    result += `• ${cleanedLine.charAt(0).toUpperCase() + cleanedLine.slice(1)}\n`;
    lineCount++;
  });

  if (lineCount === 0) {
    result += `• Note points organized for clear revision.\n• Core concepts preserved and structured under clear headings.\n• Key formulas, definitions, and relationships emphasized for quick reference.`;
  }

  return result.trim();
}

export function generateDemoSummary(text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('photosynthesis') || lowerText.includes('chlorophyll')) {
    return {
      bullets: [
        "Photosynthesis converts solar light energy into stored chemical energy inside plant cells.",
        "Chlorophyll in chloroplasts absorbs solar radiation to drive the chemical reaction.",
        "Carbon dioxide and water are consumed to generate glucose and release oxygen into the atmosphere.",
        "This process forms the foundational food chain layer for almost all terrestrial ecosystem life."
      ],
      keyTakeaway: "Photosynthesis uses sunlight, water, and $CO_2$ to create plant energy (glucose) and vital oxygen for Earth's atmosphere."
    };
  }

  if (lowerText.includes(' प्रकाश ') || lowerText.includes('संश्लेषण') || lowerText.includes('पौधे')) {
    return {
      bullets: [
        "प्रकाश संश्लेषण हरे पौधों द्वारा सूर्य के प्रकाश की मदद से भोजन बनाने की प्राथमिक प्रक्रिया है।",
        "यह प्रक्रिया पत्तियों में मौजूद क्लोरोफिल के कारण संभव होती है जो धूप को सोखता है।",
        "पौधे जल और कार्बन डाइऑक्साइड का उपयोग करके ऊर्जा (ग्लूकोज) बनाते हैं।",
        "पर्यावरण के लिए सबसे महत्वपूर्ण उत्पाद ऑक्सीजन है जो जीवनदायी है।"
      ],
      keyTakeaway: "प्रकाश संश्लेषण पौधों का भोजन बनाने का तरीका है, जिससे हमें ऑक्सीजन प्राप्त होती है।"
    };
  }

  if (lowerText.includes('world war') || lowerText.includes('wwii') || lowerText.includes('1939')) {
    return {
      bullets: [
        "World War II was a global conflict spanning 1939 to 1945 between Allies and Axis alliances.",
        "Aggressive territorial expansions and unaddressed WWI issues triggered the outbreak.",
        "Major military turning points in Europe and Asia led to the collapse of totalitarian regimes.",
        "Post-war agreements established the United Nations and redefined the modern geopolitical order."
      ],
      keyTakeaway: "WWII transformed modern world geopolitics and led directly to international peacekeeping frameworks like the UN."
    };
  }

  if (lowerText.includes('python') || lowerText.includes('function') || lowerText.includes('def ')) {
    return {
      bullets: [
        "Functions in Python enable modular, reusable, and readable software construction.",
        "They take input parameters, perform specific computational tasks, and return output values.",
        "Using functions reduces code repetition, simplifies debugging, and enhances maintainability.",
        "Good Python functions adhere to single-responsibility principles and include descriptive docstrings."
      ],
      keyTakeaway: "Python functions break complex problems into manageable, reusable blocks of code."
    };
  }

  if (lowerText.includes('machine learning') || lowerText.includes('neural') || lowerText.includes('algorithm')) {
    return {
      bullets: [
        "Machine Learning allows computers to learn patterns directly from data without explicit programming.",
        "Three main paradigms exist: Supervised, Unsupervised, and Reinforcement Learning.",
        "High-quality data and feature selection are critical for model accuracy and generalization.",
        "ML applications range from automated diagnostic healthcare to natural language translation."
      ],
      keyTakeaway: "Machine Learning transforms raw data into predictive intelligence and automated decision-making."
    };
  }

  if (lowerText.includes('solar system') || lowerText.includes('planet') || lowerText.includes('orbit')) {
    return {
      bullets: [
        "Our Solar System consists of the Sun and celestial bodies bound by its gravitational mass.",
        "Eight planets are classified into inner rocky worlds and outer gas/ice giants.",
        "Asteroids, comets, and dwarf planets occupy outer belts and remnant zones.",
        "Elliptical planetary orbits around the Sun follow universal gravitational laws."
      ],
      keyTakeaway: "The Solar System is a gravitationally bound planetary system centered around the Sun."
    };
  }

  // Dynamic summary fallback for arbitrary input
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  const bullets = [];
  const count = Math.min(Math.max(sentences.length, 3), 5);
  
  for (let i = 0; i < count; i++) {
    if (sentences[i]) {
      bullets.push(sentences[i] + '.');
    } else {
      bullets.push(`Core point ${i + 1} extracted from key study material.`);
    }
  }

  return {
    bullets: bullets.slice(0, 4),
    keyTakeaway: sentences[0] 
      ? `Main Concept: ${sentences[0]}.` 
      : "Summary provides a quick revision breakdown of essential study ideas."
  };
}

export function generateDemoPlan(goal, deadline, availableTime, difficulty) {
  const goalLower = (goal || '').toLowerCase();
  
  let steps = [];
  let suggestedNextAction = "";

  if (goalLower.includes('biology') || goalLower.includes('photosynthesis') || goalLower.includes('chapter')) {
    steps = [
      { stepNumber: 1, title: "Review Textbook Chapter & Key Definitions", estimatedTime: "25 minutes", notes: "Read through core concepts, focusing on bold vocabulary terms and diagrams." },
      { stepNumber: 2, title: "Create Flashcards & Key Diagrams", estimatedTime: "30 minutes", notes: "Draw chemical inputs/outputs and memorize key processes." },
      { stepNumber: 3, title: "Practice End-of-Chapter Questions", estimatedTime: "40 minutes", notes: "Answer self-assessment questions without checking notes." },
      { stepNumber: 4, title: "Formulate Summary Sheet & Self-Quiz", estimatedTime: "25 minutes", notes: "Synthesize all concepts onto a 1-page quick revision cheat sheet." }
    ];
    suggestedNextAction = "Open Chapter 4 of your biology textbook and read the first 3 subheadings while highlighting main terms.";
  } else if (goalLower.includes('python') || goalLower.includes('project') || goalLower.includes('code') || goalLower.includes('app')) {
    steps = [
      { stepNumber: 1, title: "Clarify Requirements & Data Structure", estimatedTime: "30 minutes", notes: "Sketch input/output flows and define required function signatures." },
      { stepNumber: 2, title: "Build Prototype Core Functions", estimatedTime: "50 minutes", notes: "Write base helper functions and test with sample inputs." },
      { stepNumber: 3, title: "Integrate Modules & Error Handling", estimatedTime: "40 minutes", notes: "Combine features and handle edge cases gracefully." },
      { stepNumber: 4, title: "Code Refactoring & User Testing", estimatedTime: "30 minutes", notes: "Clean up variable names, add docstrings, and run final checks." }
    ];
    suggestedNextAction = "Create your main project file and write out the skeleton function definitions.";
  } else {
    steps = [
      { stepNumber: 1, title: "Understand Project Requirements & Scope", estimatedTime: "30 minutes", notes: "Break goal down into main milestones and outline target deliverables." },
      { stepNumber: 2, title: "Gather Resources & Conduct Initial Research", estimatedTime: "45 minutes", notes: "Collect study materials, articles, and key references." },
      { stepNumber: 3, title: "Execute Core Tasks & Draft Main Content", estimatedTime: "60 minutes", notes: "Focus on primary construction phase without getting stuck on minor edits." },
      { stepNumber: 4, title: "Review, Polish & Verify Quality", estimatedTime: "30 minutes", notes: "Check against initial criteria, correct errors, and refine formatting." },
      { stepNumber: 5, title: "Final Polish & Submission Preparation", estimatedTime: "20 minutes", notes: "Prepare final presentation or document package for submission." }
    ];
    suggestedNextAction = "Spend 10 minutes writing down the top 3 deliverables for your project goal.";
  }

  const totalMinutes = steps.reduce((sum, s) => {
    const mins = parseInt(s.estimatedTime) || 30;
    return sum + mins;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;
  const totalFormatted = hours > 0 
    ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMins} minute${remainingMins !== 1 ? 's' : ''}`
    : `${remainingMins} minutes`;

  return {
    goal: goal || "Study Goal Plan",
    deadline: deadline || "Flexible",
    availableTime: availableTime || "30 min/day",
    difficulty: difficulty || "Beginner",
    totalEstimatedTime: totalFormatted,
    steps,
    suggestedNextAction
  };
}
