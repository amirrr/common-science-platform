import type { CorrelationData } from "@/types/correlation";

export const MOCK_CORRELATIONS: CorrelationData[] = [
  {
    id: "ice-cream-drowning",
    title: "Ice Cream Sales vs. Drowning Incidents",
    description:
      "A classic example of spurious correlation. Both ice cream sales and drowning incidents tend to increase in the summer. The underlying cause is warmer weather, not one directly causing the other.",
    series1Name: "Ice Cream Sales (Units)",
    series2Name: "Drowning Incidents",
    data: [
      { label: "Jan", value1: 100, value2: 5 },
      { label: "Feb", value1: 120, value2: 4 },
      { label: "Mar", value1: 150, value2: 6 },
      { label: "Apr", value1: 200, value2: 10 },
      { label: "May", value1: 300, value2: 15 },
      { label: "Jun", value1: 500, value2: 25 },
      { label: "Jul", value1: 600, value2: 30 },
      { label: "Aug", value1: 550, value2: 28 },
      { label: "Sep", value1: 350, value2: 18 },
      { label: "Oct", value1: 220, value2: 12 },
      { label: "Nov", value1: 150, value2: 7 },
      { label: "Dec", value1: 110, value2: 6 },
    ],
    suggestedExplanations: [
      {
        id: "icd-exp1",
        text: "Eating ice cream makes people more likely to swim and therefore drown.",
        persuasionMode: "pathos",
      },
      {
        id: "icd-exp2",
        text: "Hot weather causes both increased ice cream sales and more swimming, leading to more drowning incidents.",
        persuasionMode: "logos",
        isCorrect: true,
      },
      {
        id: "icd-exp3",
        text: "Drowning incidents are heavily reported, making people stressed, thus they buy more ice cream.",
        persuasionMode: "pathos",
      },
      {
        id: "icd-exp4",
        text: "There is no real connection; it is just a coincidence in the data patterns for this specific period.",
        persuasionMode: "logos",
      },
    ],
  },
  {
    id: "pirates-global-warming",
    title: "Number of Pirates vs. Global Average Temperature",
    description:
      "A humorous example often used to illustrate that correlation does not imply causation. As the number of pirates has decreased over centuries, global temperatures have increased. These are independent trends.",
    series1Name: "Global Temperature (°C)",
    series2Name: "Approx. Number of Pirates",
    data: [
      { label: "1820", value1: 13.5, value2: 20000 },
      { label: "1850", value1: 13.7, value2: 5000 },
      { label: "1880", value1: 13.8, value2: 1000 },
      { label: "1920", value1: 14.0, value2: 500 },
      { label: "1950", value1: 14.2, value2: 200 },
      { label: "1980", value1: 14.4, value2: 100 },
      { label: "2000", value1: 14.6, value2: 50 },
      { label: "2020", value1: 15.0, value2: 20 },
    ],
    suggestedExplanations: [
      {
        id: "pgw-exp1",
        text: "A lack of pirates is causing global warming due to their cooling effect on the seas.",
        persuasionMode: "pathos",
      },
      {
        id: "pgw-exp2",
        text: "Technological advancements and societal changes led to a decrease in piracy, while industrialization and greenhouse gas emissions, separate phenomena, led to rising global temperatures.",
        persuasionMode: "logos",
        isCorrect: true,
      },
      {
        id: "pgw-exp3",
        text: "Global warming made the seas too hot for pirates, forcing them to retire.",
        persuasionMode: "pathos",
      },
      {
        id: "pgw-exp4",
        text: "This is purely coincidental; the two trends are unrelated.",
        persuasionMode: "logos",
      },
    ],
  },
  {
    id: "cheese-bedsheet-deaths",
    title: "Cheese Consumption vs. Deaths by Bedsheet Entanglement",
    description:
      "This correlation highlights how unrelated variables can sometimes show similar trends purely by chance or due to other complex, unobserved factors.",
    series1Name: "Per Capita Cheese Consumption (lbs)",
    series2Name: "Deaths by Bedsheet Entanglement (per 100k)",
    data: [
      { label: "2000", value1: 29.8, value2: 0.21 },
      { label: "2001", value1: 30.1, value2: 0.23 },
      { label: "2002", value1: 30.5, value2: 0.25 },
      { label: "2003", value1: 30.6, value2: 0.28 },
      { label: "2004", value1: 31.3, value2: 0.3 },
      { label: "2005", value1: 31.7, value2: 0.31 },
      { label: "2006", value1: 32.6, value2: 0.33 },
      { label: "2007", value1: 33.0, value2: 0.35 },
      { label: "2008", value1: 32.7, value2: 0.32 },
      { label: "2009", value1: 32.9, value2: 0.34 },
    ],
    suggestedExplanations: [
      {
        id: "cbd-exp1",
        text: "Eating more cheese leads to nightmares, causing people to thrash in bed and get entangled in their bedsheets.",
        persuasionMode: "pathos",
      },
      {
        id: "cbd-exp2",
        text: "Both trends might be influenced by broader economic or lifestyle factors that are not immediately obvious.",
        persuasionMode: "logos",
      },
      {
        id: "cbd-exp3",
        text: "The data is flawed or collected from unreliable sources.",
        persuasionMode: "ethos",
      }, // Appeals to data authority/quality
      {
        id: "cbd-exp4",
        text: "This is a random coincidence with no meaningful link between the two variables.",
        persuasionMode: "logos",
        isCorrect: true,
      },
    ],
  },
];
