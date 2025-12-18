import type { Scores } from '../views/CoffeeIdTest/type';
import { coffeePersonas } from '../views/CoffeeIdTest/assets/data/coffeeTypes';

// 方案 3：為每個角色定義理想分數配置
const personaProfiles: Record<string, Scores> = {
  A1: { acidity: 85, clarity: 75, sweetness: 40, body: 20, aftertaste: 30 },
  A2: { acidity: 80, sweetness: 70, clarity: 50, body: 30, aftertaste: 35 },
  A3: { acidity: 75, body: 65, sweetness: 45, clarity: 40, aftertaste: 40 },
  A4: { acidity: 80, aftertaste: 70, sweetness: 40, body: 35, clarity: 45 },

  B1: { sweetness: 85, acidity: 65, clarity: 50, body: 40, aftertaste: 35 },
  B2: { sweetness: 85, body: 70, acidity: 30, aftertaste: 50, clarity: 35 },
  B3: { sweetness: 85, aftertaste: 75, body: 50, acidity: 30, clarity: 40 },
  B4: { sweetness: 80, clarity: 70, acidity: 45, body: 35, aftertaste: 40 },

  C1: { body: 85, acidity: 60, sweetness: 40, aftertaste: 55, clarity: 25 },
  C2: { body: 85, sweetness: 70, acidity: 25, aftertaste: 55, clarity: 30 },
  C3: { body: 90, aftertaste: 80, sweetness: 40, acidity: 20, clarity: 20 },
  C4: { body: 80, clarity: 65, sweetness: 45, acidity: 35, aftertaste: 50 },

  D1: { aftertaste: 85, acidity: 65, body: 50, sweetness: 40, clarity: 35 },
  D2: { aftertaste: 85, sweetness: 70, body: 55, acidity: 30, clarity: 35 },
  D3: { aftertaste: 85, body: 75, sweetness: 45, acidity: 25, clarity: 25 },
  D4: { aftertaste: 85, clarity: 65, sweetness: 45, body: 50, acidity: 35 },

  E1: { clarity: 90, acidity: 75, sweetness: 35, body: 15, aftertaste: 30 },
  E2: { clarity: 80, sweetness: 65, acidity: 40, body: 25, aftertaste: 35 },
  E3: { clarity: 85, body: 60, sweetness: 45, acidity: 30, aftertaste: 45 },
  E4: { clarity: 85, aftertaste: 70, sweetness: 40, body: 35, acidity: 35 },
};

export function getPersona(normalizedScores: { value: Scores }) {
  const scores = normalizedScores.value;

  // 計算與每個角色配置的歐氏距離
  const distances = Object.entries(personaProfiles).map(([id, profile]) => {
    const distance = Math.sqrt(
      Math.pow(scores.acidity - profile.acidity, 2) +
        Math.pow(scores.sweetness - profile.sweetness, 2) +
        Math.pow(scores.body - profile.body, 2) +
        Math.pow(scores.aftertaste - profile.aftertaste, 2) +
        Math.pow(scores.clarity - profile.clarity, 2)
    );

    return { id, distance };
  });

  // 找出距離最小的角色（最匹配）
  distances.sort((a, b) => a.distance - b.distance);
  const bestMatch = distances[0];

  return coffeePersonas.find((p) => p.id === bestMatch.id);
}
