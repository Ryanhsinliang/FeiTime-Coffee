import type { Scores } from '../views/CoffeeIdTest/type';
import { coffeePersonas } from '../views/CoffeeIdTest/assets/data/coffeeTypes';

export function getPersona(normalizedScores: { value: Scores }) {
  const arr = Object.entries(normalizedScores.value) as [string, number][];
  arr.sort((a, b) => b[1] - a[1]);

  const mainFlavor = arr[0]?.[0];
  const subFlavor = arr[1]?.[0];

  const key = `${mainFlavor}-${subFlavor}`;

  const mapping: Record<string, string> = {
    'acidity-clarity': 'A1',
    'acidity-sweetness': 'A2',
    'acidity-body': 'A3',
    'acidity-aftertaste': 'A4',

    'sweetness-acidity': 'B1',
    'sweetness-body': 'B2',
    'sweetness-aftertaste': 'B3',
    'sweetness-clarity': 'B4',

    'body-acidity': 'C1',
    'body-sweetness': 'C2',
    'body-aftertaste': 'C3',
    'body-clarity': 'C4',

    'aftertaste-acidity': 'D1',
    'aftertaste-sweetness': 'D2',
    'aftertaste-body': 'D3',
    'aftertaste-clarity': 'D4',

    'clarity-acidity': 'E1',
    'clarity-sweetness': 'E2',
    'clarity-body': 'E3',
    'clarity-aftertaste': 'E4',
  };

  return coffeePersonas.find((p) => p.id === mapping[key]);
}
