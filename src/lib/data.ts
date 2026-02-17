import "server-only";
import type { SeriesDataPoint } from "@/types/correlation";

/**
 * Proposed structure for BIDIRECTIONAL correlation data
 * to support the A/B experiment where directions are swapped.
 */

export interface BidirectionalExplanation {
  confounderType: string; // Explains A <- C -> B
  twoSeperateMediatorType: string; // Explains A -> M1 -> B and A -> M2 -> B
  chainMediatorsType: string; // Explains B -> M1' -> M2' -> M3' -> A
}

export interface BidirectionalDirectionData {
  title: string;
  explanations: BidirectionalExplanation;
}

export interface BidirectionalCorrelation {
  id: string;
  labels: {
    A: string;
    B: string;
  };
  // Plot data shared between both directions
  data: SeriesDataPoint[];
  // Direction 1: A correlates with B
  forward: BidirectionalDirectionData;
  // Direction 2: B correlates with A
  backward: BidirectionalDirectionData;
}

export const MOCK_BIDIRECTIONAL_DATA: BidirectionalCorrelation[] = [
  {
    id: "correlation-26",
    labels: {
      A: "Cigarette Smoking Rate for US adults (Percentage)",
      B: "Arson in United States (Arson rate)",
    },
    data: [
      {
        label: "2001",
        value1: 22.8,
        value2: 27.7,
      },
      {
        label: "2002",
        value1: 22.5,
        value2: 26.8,
      },
      {
        label: "2003",
        value1: 21.6,
        value2: 25.0,
      },
      {
        label: "2004",
        value1: 20.9,
        value2: 23.6,
      },
      {
        label: "2005",
        value1: 20.9,
        value2: 23.1,
      },
      {
        label: "2006",
        value1: 20.8,
        value2: 24.4,
      },
      {
        label: "2007",
        value1: 19.8,
        value2: 22.6,
      },
      {
        label: "2008",
        value1: 20.6,
        value2: 21.6,
      },
      {
        label: "2009",
        value1: 20.6,
        value2: 19.5,
      },
      {
        label: "2010",
        value1: 19.3,
        value2: 18.1,
      },
      {
        label: "2011",
        value1: 19.0,
        value2: 17.5,
      },
      {
        label: "2012",
        value1: 18.1,
        value2: 17.6,
      },
      {
        label: "2013",
        value1: 17.8,
        value2: 14.9,
      },
      {
        label: "2014",
        value1: 16.8,
        value2: 14.5,
      },
      {
        label: "2015",
        value1: 15.1,
        value2: 13.7,
      },
      {
        label: "2016",
        value1: 15.5,
        value2: 14.1,
      },
      {
        label: "2017",
        value1: 14.0,
        value2: 13.2,
      },
      {
        label: "2018",
        value1: 13.7,
        value2: 12.0,
      },
      {
        label: "2019",
        value1: 14.0,
        value2: 11.0,
      },
      {
        label: "2020",
        value1: 12.5,
        value2: 13.9,
      },
      {
        label: "2021",
        value1: 11.5,
        value2: 8.9,
      },
    ],
    forward: {
      title:
        "Cigarette Smoking Rate for US adults (Percentage) correlates with Arson in United States (Arson rate)",
      explanations: {
        confounderType:
          "Economic hardship and weak community support can lead to more people smoking and also to more destructive or criminal behavior. In places with higher stress and fewer resources, both smoking and arson can rise together.",
        twoSeperateMediatorType:
          "Smoking can increase careless fire risks, such as improperly discarded cigarettes, which can ignite buildings or brush and be recorded as arson in some cases. Smoking can also worsen mental health and impulsive behavior for some people, which may increase the chance of intentionally setting fires.",
        chainMediatorsType:
          "After a fire-setting incident, neighborhoods can become more stressful and feel less safe, disrupting daily life. That ongoing stress can contribute to anxiety and financial strain, and more adults may turn to smoking as a coping habit.",
      },
    },
    backward: {
      title:
        "Arson in United States (Arson rate) correlates with Cigarette Smoking Rate for US adults (Percentage)",
      explanations: {
        confounderType:
          "Places with higher poverty and fewer opportunities often have both more fires set on purpose and higher smoking rates. The same underlying hardship can push both behaviors up at the same time.",
        twoSeperateMediatorType:
          "More deliberate fires can damage homes and communities, causing stress and disruption that leads some people to smoke more. They can also strain local services and routines, making healthy habits harder to keep and smoking more likely.",
        chainMediatorsType:
          "Higher smoking can increase nicotine dependence, which can be linked with more impulsive or risky behavior. That can lead to more dangerous actions around fire and, in some cases, intentionally setting fires.",
      },
    },
  },
  {
    id: "correlation-160",
    labels: {
      A: "Master's degrees awarded in Engineering technologies (Degrees awarded)",
      B: "Hydopower energy generated in Vietnam (Billion kWh)",
    },
    data: [
      {
        label: "2012",
        value1: 4793.0,
        value2: 52.267,
      },
      {
        label: "2013",
        value1: 4908.0,
        value2: 51.435,
      },
      {
        label: "2014",
        value1: 4967.0,
        value2: 59.243,
      },
      {
        label: "2015",
        value1: 5324.0,
        value2: 56.602,
      },
      {
        label: "2016",
        value1: 6067.0,
        value2: 63.941,
      },
      {
        label: "2017",
        value1: 7403.0,
        value2: 85.94,
      },
      {
        label: "2018",
        value1: 7246.0,
        value2: 83.081,
      },
      {
        label: "2019",
        value1: 6232.0,
        value2: 66.117,
      },
      {
        label: "2020",
        value1: 6219.0,
        value2: 72.892,
      },
      {
        label: "2021",
        value1: 6375.0,
        value2: 74.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Engineering technologies (Degrees awarded) correlates with Hydopower energy generated in Vietnam (Billion kWh)",
      explanations: {
        confounderType:
          "Vietnam may be investing more in national development, which increases both university programs in engineering technologies and the building or upgrading of hydropower plants. In that case, both trends rise together because of the same push, not because one directly causes the other.",
        twoSeperateMediatorType:
          "More graduates can strengthen the local workforce that designs and runs power projects, helping hydropower output grow. They can also boost research and innovation that improves turbines, controls, and maintenance, leading to higher generation.",
        chainMediatorsType:
          "Higher hydropower output can make electricity cheaper and more reliable, encouraging factories and tech industries to expand. As those industries grow, they create stronger demand for advanced engineering training, leading more people to earn master\u2019s degrees in engineering technologies.",
      },
    },
    backward: {
      title:
        "Hydopower energy generated in Vietnam (Billion kWh) correlates with Master's degrees awarded in Engineering technologies (Degrees awarded)",
      explanations: {
        confounderType:
          "Vietnam\u2019s overall economic growth can increase investment in hydropower projects and also expand universities and scholarships that lead to more engineering technology master\u2019s graduates. When the economy slows, both hydropower expansion and advanced degree awards may drop together.",
        twoSeperateMediatorType:
          "More hydropower generation can mean more power and investment for industry and tech companies, creating stronger demand for specialized engineering training and more master\u2019s graduates. It can also bring more hydropower construction and operations work, encouraging universities to open or enlarge engineering technology programs, leading to more degrees awarded.",
        chainMediatorsType:
          "When more people earn engineering technology master\u2019s degrees, the country gains more skilled experts who can improve energy planning and project management. That can lead to better designs, smoother approvals, and more upgrades and buildouts that ultimately increase hydropower generation.",
      },
    },
  },
  {
    id: "correlation-229",
    labels: {
      A: "Number of International Tourist Arrivals Worldwide (Million)",
      B: "Jet fuel used in Australia (Million Barrels/Day)",
    },
    data: [
      {
        label: "1995",
        value1: 528000000.0,
        value2: 77.7918,
      },
      {
        label: "1996",
        value1: 563000000.0,
        value2: 82.4754,
      },
      {
        label: "1997",
        value1: 589000000.0,
        value2: 84.1863,
      },
      {
        label: "1998",
        value1: 605000000.0,
        value2: 83.274,
      },
      {
        label: "1999",
        value1: 627000000.0,
        value2: 83.7836,
      },
      {
        label: "2000",
        value1: 677000000.0,
        value2: 90.5792,
      },
      {
        label: "2001",
        value1: 678000000.0,
        value2: 88.3096,
      },
      {
        label: "2002",
        value1: 698000000.0,
        value2: 76.8986,
      },
      {
        label: "2003",
        value1: 689000000.0,
        value2: 71.3589,
      },
      {
        label: "2004",
        value1: 760000000.0,
        value2: 78.2486,
      },
      {
        label: "2005",
        value1: 807000000.0,
        value2: 85.1233,
      },
      {
        label: "2006",
        value1: 851000000.0,
        value2: 99.7836,
      },
      {
        label: "2007",
        value1: 911000000.0,
        value2: 100.901,
      },
      {
        label: "2008",
        value1: 929000000.0,
        value2: 105.872,
      },
      {
        label: "2009",
        value1: 894000000.0,
        value2: 109.877,
      },
      {
        label: "2010",
        value1: 948000000.0,
        value2: 120.718,
      },
      {
        label: "2011",
        value1: 1008740000.0,
        value2: 124.436,
      },
      {
        label: "2012",
        value1: 1059260000.0,
        value2: 129.672,
      },
      {
        label: "2013",
        value1: 1110830000.0,
        value2: 138.803,
      },
      {
        label: "2014",
        value1: 1154750000.0,
        value2: 139.389,
      },
      {
        label: "2015",
        value1: 1207080000.0,
        value2: 142.334,
      },
      {
        label: "2016",
        value1: 1248120000.0,
        value2: 151.03,
      },
      {
        label: "2017",
        value1: 1347570000.0,
        value2: 157.707,
      },
      {
        label: "2018",
        value1: 1414070000.0,
        value2: 162.545,
      },
      {
        label: "2019",
        value1: 1465460000.0,
        value2: 161.762,
      },
      {
        label: "2020",
        value1: 406890000.0,
        value2: 69.8169,
      },
      {
        label: "2021",
        value1: 455770000.0,
        value2: 61.5014,
      },
      {
        label: "2022",
        value1: 962800000.0,
        value2: 103.43,
      },
    ],
    forward: {
      title:
        "Number of International Tourist Arrivals Worldwide (Million) correlates with Jet fuel used in Australia (Million Barrels/Day)",
      explanations: {
        confounderType:
          "When the global economy is doing well, more people can afford to travel internationally and airlines also fly more routes and carry more cargo. That same boom can increase flight activity to and within Australia, raising jet fuel use there.",
        twoSeperateMediatorType:
          "More international tourists can lead airlines to add more flights to Australia and increase flight frequency, which burns more jet fuel in Australia. It can also drive growth in supporting air travel like connecting domestic flights and airport operations, which further increases jet fuel use.",
        chainMediatorsType:
          "Higher jet fuel use in Australia can signal more flights and expanded airline capacity, which makes it easier and cheaper to travel. That extra capacity can attract more international visitors and contribute to a rise in worldwide tourist arrivals.",
      },
    },
    backward: {
      title:
        "Jet fuel used in Australia (Million Barrels/Day) correlates with Number of International Tourist Arrivals Worldwide (Million)",
      explanations: {
        confounderType:
          "Global economic growth can increase both air travel demand and leisure travel, so more tourists travel internationally while airlines also burn more jet fuel on routes serving Australia. In downturns, both tourism and jet fuel use tend to fall together.",
        twoSeperateMediatorType:
          "When airlines use more jet fuel, it often reflects that they are running more flights and adding seats, which makes it easier for people to travel internationally. It can also mean more direct routes and lower fares due to higher flight frequency, encouraging more people to take overseas trips.",
        chainMediatorsType:
          "When international tourist trips rise worldwide, airlines expand their global networks and schedule more long-haul services. That leads to more international flights to and from Australia and greater overall jet fuel consumption there.",
      },
    },
  },
  {
    id: "correlation-370",
    labels: {
      A: "Bachelor's degrees awarded in Engineering (Degrees awarded)",
      B: "Electricity generation in Cambodia (Billion kWh)",
    },
    data: [
      {
        label: "2012",
        value1: 81371.0,
        value2: 1.37266,
      },
      {
        label: "2013",
        value1: 85987.0,
        value2: 1.72742,
      },
      {
        label: "2014",
        value1: 92169.0,
        value2: 2.9839,
      },
      {
        label: "2015",
        value1: 97852.0,
        value2: 4.25994,
      },
      {
        label: "2016",
        value1: 106789.0,
        value2: 5.4275,
      },
      {
        label: "2017",
        value1: 115671.0,
        value2: 6.76582,
      },
      {
        label: "2018",
        value1: 121953.0,
        value2: 7.96357,
      },
      {
        label: "2019",
        value1: 126692.0,
        value2: 8.45234,
      },
      {
        label: "2020",
        value1: 128337.0,
        value2: 8.44419,
      },
      {
        label: "2021",
        value1: 126037.0,
        value2: 8.69423,
      },
    ],
    forward: {
      title:
        "Bachelor's degrees awarded in Engineering (Degrees awarded) correlates with Electricity generation in Cambodia (Billion kWh)",
      explanations: {
        confounderType:
          "As Cambodia\u2019s economy grows, the country invests more in universities and students choose engineering more often. The same economic growth also drives higher electricity demand and investment in power plants, increasing electricity generation.",
        twoSeperateMediatorType:
          "More engineering graduates means more skilled people who can design, build, and run power plants and the power grid, which can raise electricity generation. It can also attract factories and tech businesses that need reliable power, pushing the country to generate more electricity.",
        chainMediatorsType:
          "When electricity generation increases, homes and schools get more reliable power and equipment like computers and lab tools become easier to use. That improved learning environment and expanded technical programs can lead more students to complete engineering degrees.",
      },
    },
    backward: {
      title:
        "Electricity generation in Cambodia (Billion kWh) correlates with Bachelor's degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "As Cambodia\u2019s economy grows, it tends to produce more electricity and also invests more in universities and engineering programs. That shared growth can make both numbers rise together even if one doesn\u2019t directly cause the other.",
        twoSeperateMediatorType:
          "More electricity can make factories, labs, and campuses run more reliably, which can help universities expand engineering training and graduate more students. More electricity can also attract new tech and industrial companies, increasing demand for engineers and pushing more students to earn engineering degrees.",
        chainMediatorsType:
          "When more people graduate with engineering degrees, the country gains more skilled workers who can plan and build infrastructure projects. That can lead to more power plants and grid upgrades being developed and operated, increasing total electricity generation.",
      },
    },
  },
  {
    id: "correlation-700",
    labels: {
      A: "Master's degrees awarded in Physical sciences (Degrees awarded)",
      B: "Professor salaries in the US (Salary)",
    },
    data: [
      {
        label: "2012",
        value1: 6911.0,
        value2: 131745.0,
      },
      {
        label: "2013",
        value1: 7014.0,
        value2: 132028.0,
      },
      {
        label: "2014",
        value1: 6984.0,
        value2: 134443.0,
      },
      {
        label: "2015",
        value1: 7100.0,
        value2: 136755.0,
      },
      {
        label: "2016",
        value1: 7131.0,
        value2: 138492.0,
      },
      {
        label: "2017",
        value1: 7136.0,
        value2: 138746.0,
      },
      {
        label: "2018",
        value1: 7196.0,
        value2: 138826.0,
      },
      {
        label: "2019",
        value1: 7121.0,
        value2: 139640.0,
      },
      {
        label: "2020",
        value1: 6978.0,
        value2: 136906.0,
      },
      {
        label: "2021",
        value1: 6778.0,
        value2: 130262.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Physical sciences (Degrees awarded) correlates with Professor salaries in the US (Salary)",
      explanations: {
        confounderType:
          "When the economy and state funding for higher education are strong, universities can afford to pay professors more and also run more graduate programs that produce more physical science master\u2019s degrees. So both numbers rise and fall together because of the same underlying budget conditions.",
        twoSeperateMediatorType:
          "More physical science master\u2019s graduates can increase research output and grant income at universities, which can lead to higher professor pay. It can also increase demand for teaching and advising in those programs, prompting universities to raise salaries to hire and retain enough faculty.",
        chainMediatorsType:
          "Higher professor salaries help universities attract and keep strong faculty, which improves course offerings and research opportunities. That boosts the program\u2019s reputation and student interest, leading to larger enrollments and ultimately more physical science master\u2019s degrees awarded.",
      },
    },
    backward: {
      title:
        "Professor salaries in the US (Salary) correlates with Master's degrees awarded in Physical sciences (Degrees awarded)",
      explanations: {
        confounderType:
          "When the economy and state funding for education are strong, universities can pay professors more and also expand science programs that produce more master's graduates. When budgets tighten, both salaries and the number of degrees can drop.",
        twoSeperateMediatorType:
          "Higher professor pay helps universities attract and keep better faculty, which can strengthen physical science departments and lead to more students finishing master's degrees. Higher pay can also let departments offer more courses, lab supervision, and research opportunities, making it easier for more students to complete the program.",
        chainMediatorsType:
          "When more physical science master's degrees are awarded, more trained graduates enter research and industry and contribute to scientific and economic growth. That growth increases demand and funding for university science work, which puts upward pressure on professor salaries.",
      },
    },
  },
  {
    id: "correlation-727",
    labels: {
      A: "Number of games won by Miami Marlins in the National League (East Division) (Games Won)",
      B: "Runs scored by the Miami Marlins (Runs scored)",
    },
    data: [
      {
        label: "1993",
        value1: 64.0,
        value2: 581.0,
      },
      {
        label: "1994",
        value1: 51.0,
        value2: 468.0,
      },
      {
        label: "1995",
        value1: 67.0,
        value2: 673.0,
      },
      {
        label: "1996",
        value1: 80.0,
        value2: 688.0,
      },
      {
        label: "1997",
        value1: 92.0,
        value2: 740.0,
      },
      {
        label: "1998",
        value1: 54.0,
        value2: 667.0,
      },
      {
        label: "1999",
        value1: 64.0,
        value2: 691.0,
      },
      {
        label: "2000",
        value1: 79.0,
        value2: 731.0,
      },
      {
        label: "2001",
        value1: 76.0,
        value2: 742.0,
      },
      {
        label: "2002",
        value1: 79.0,
        value2: 699.0,
      },
      {
        label: "2003",
        value1: 91.0,
        value2: 751.0,
      },
      {
        label: "2004",
        value1: 83.0,
        value2: 718.0,
      },
      {
        label: "2005",
        value1: 83.0,
        value2: 717.0,
      },
      {
        label: "2006",
        value1: 78.0,
        value2: 758.0,
      },
      {
        label: "2007",
        value1: 71.0,
        value2: 790.0,
      },
      {
        label: "2008",
        value1: 84.0,
        value2: 770.0,
      },
      {
        label: "2009",
        value1: 87.0,
        value2: 772.0,
      },
      {
        label: "2010",
        value1: 80.0,
        value2: 719.0,
      },
      {
        label: "2011",
        value1: 72.0,
        value2: 625.0,
      },
      {
        label: "2012",
        value1: 69.0,
        value2: 609.0,
      },
      {
        label: "2013",
        value1: 62.0,
        value2: 513.0,
      },
      {
        label: "2014",
        value1: 77.0,
        value2: 645.0,
      },
      {
        label: "2015",
        value1: 71.0,
        value2: 613.0,
      },
      {
        label: "2016",
        value1: 79.0,
        value2: 655.0,
      },
      {
        label: "2017",
        value1: 77.0,
        value2: 778.0,
      },
      {
        label: "2018",
        value1: 63.0,
        value2: 589.0,
      },
      {
        label: "2019",
        value1: 57.0,
        value2: 615.0,
      },
      {
        label: "2020",
        value1: 31.0,
        value2: 263.0,
      },
      {
        label: "2021",
        value1: 67.0,
        value2: 623.0,
      },
      {
        label: "2022",
        value1: 69.0,
        value2: 586.0,
      },
    ],
    forward: {
      title:
        "Number of games won by Miami Marlins in the National League (East Division) (Games Won) correlates with Runs scored by the Miami Marlins (Runs scored)",
      explanations: {
        confounderType:
          "When the team has better overall player talent and coaching, they tend to score more runs and also win more games. A healthy roster all season can also boost both run production and wins at the same time.",
        twoSeperateMediatorType:
          "Winning more games can create a more relaxed, confident clubhouse, and players may hit better as a result, leading to more runs. Winning can also lead to more stable lineups and smarter in-game decisions, which can help the offense produce more runs.",
        chainMediatorsType:
          "Scoring more runs can build team confidence and reduce pressure on pitchers and defenders. That can lead to fewer late-game mistakes and better closing out games, which results in more wins.",
      },
    },
    backward: {
      title:
        "Runs scored by the Miami Marlins (Runs scored) correlates with Number of games won by Miami Marlins in the National League (East Division) (Games Won)",
      explanations: {
        confounderType:
          "When the team has better overall hitting talent and stays healthier, they tend to score more runs and also win more games. So the same underlying team quality can drive both numbers up at the same time.",
        twoSeperateMediatorType:
          "Scoring more runs often lets the team build leads, which reduces pressure on the bullpen and helps close out wins. It can also boost player confidence and game strategy choices, leading to better late-game decisions that turn close games into wins.",
        chainMediatorsType:
          "Winning more games can increase attendance and excitement, which can bring in more revenue and support. That can translate into better resources and improved player performance, which then shows up as more runs scored.",
      },
    },
  },
  {
    id: "correlation-730",
    labels: {
      A: "Number of Movies Released Annually (Number of movies)",
      B: "Number of International Tourist Arrivals Worldwide (Million)",
    },
    data: [
      {
        label: "1995",
        value1: 411.0,
        value2: 528000000.0,
      },
      {
        label: "1996",
        value1: 471.0,
        value2: 563000000.0,
      },
      {
        label: "1997",
        value1: 510.0,
        value2: 589000000.0,
      },
      {
        label: "1998",
        value1: 509.0,
        value2: 605000000.0,
      },
      {
        label: "1999",
        value1: 461.0,
        value2: 627000000.0,
      },
      {
        label: "2000",
        value1: 478.0,
        value2: 677000000.0,
      },
      {
        label: "2001",
        value1: 482.0,
        value2: 678000000.0,
      },
      {
        label: "2002",
        value1: 479.0,
        value2: 698000000.0,
      },
      {
        label: "2003",
        value1: 506.0,
        value2: 689000000.0,
      },
      {
        label: "2004",
        value1: 551.0,
        value2: 760000000.0,
      },
      {
        label: "2005",
        value1: 547.0,
        value2: 807000000.0,
      },
      {
        label: "2006",
        value1: 608.0,
        value2: 851000000.0,
      },
      {
        label: "2007",
        value1: 631.0,
        value2: 911000000.0,
      },
      {
        label: "2008",
        value1: 608.0,
        value2: 929000000.0,
      },
      {
        label: "2009",
        value1: 521.0,
        value2: 894000000.0,
      },
      {
        label: "2010",
        value1: 536.0,
        value2: 948000000.0,
      },
      {
        label: "2011",
        value1: 601.0,
        value2: 1008740000.0,
      },
      {
        label: "2012",
        value1: 669.0,
        value2: 1059260000.0,
      },
      {
        label: "2013",
        value1: 686.0,
        value2: 1110830000.0,
      },
      {
        label: "2014",
        value1: 708.0,
        value2: 1154750000.0,
      },
      {
        label: "2015",
        value1: 707.0,
        value2: 1207080000.0,
      },
      {
        label: "2016",
        value1: 737.0,
        value2: 1248120000.0,
      },
      {
        label: "2017",
        value1: 742.0,
        value2: 1347570000.0,
      },
      {
        label: "2018",
        value1: 872.0,
        value2: 1414070000.0,
      },
      {
        label: "2019",
        value1: 792.0,
        value2: 1465460000.0,
      },
      {
        label: "2020",
        value1: 333.0,
        value2: 406890000.0,
      },
      {
        label: "2021",
        value1: 408.0,
        value2: 455770000.0,
      },
      {
        label: "2022",
        value1: 454.0,
        value2: 962800000.0,
      },
    ],
    forward: {
      title:
        "Number of Movies Released Annually (Number of movies) correlates with Number of International Tourist Arrivals Worldwide (Million)",
      explanations: {
        confounderType:
          "When the global economy is doing well, more movies get funded and made, and more people can afford to travel internationally. When the economy slows down, both movie production and international travel tend to drop.",
        twoSeperateMediatorType:
          "More new movies make people curious about the places they see on screen, so they decide to visit those countries. More new movies also create more film festivals and celebrity events around the world, which leads to extra international trips.",
        chainMediatorsType:
          "When international travel increases, more people share photos, stories, and trends from different countries, raising interest in global cultures. That demand encourages studios to invest in more internationally themed projects, which results in more movies being released each year.",
      },
    },
    backward: {
      title:
        "Number of International Tourist Arrivals Worldwide (Million) correlates with Number of Movies Released Annually (Number of movies)",
      explanations: {
        confounderType:
          "When the global economy is doing well, more people can afford to travel internationally and movie studios also have more money to produce and release films. When the economy is weak, both travel and film releases tend to drop.",
        twoSeperateMediatorType:
          "More international travel increases demand for in-flight and hotel entertainment, which pushes companies to license and distribute more films, encouraging more releases. More travel also spreads trends and stories across countries, prompting filmmakers to make and release more movies that appeal to worldwide audiences.",
        chainMediatorsType:
          "When more movies are released, more films showcase attractive places and cultures, which raises interest in visiting those locations. That interest leads people to plan trips, book travel and accommodations, and ultimately results in more international arrivals.",
      },
    },
  },
  {
    id: "correlation-732",
    labels: {
      A: "US Annual Tax Revenue (Trillions of Dollars)",
      B: "Automotive recalls for issues with Suspension (Recalls)",
    },
    data: [
      {
        label: "1975",
        value1: 0.279,
        value2: 17.0,
      },
      {
        label: "1976",
        value1: 0.298,
        value2: 15.0,
      },
      {
        label: "1977",
        value1: 0.356,
        value2: 18.0,
      },
      {
        label: "1978",
        value1: 0.399,
        value2: 18.0,
      },
      {
        label: "1979",
        value1: 0.463,
        value2: 26.0,
      },
      {
        label: "1980",
        value1: 0.517,
        value2: 6.0,
      },
      {
        label: "1981",
        value1: 0.599,
        value2: 17.0,
      },
      {
        label: "1982",
        value1: 0.618,
        value2: 10.0,
      },
      {
        label: "1983",
        value1: 0.601,
        value2: 10.0,
      },
      {
        label: "1984",
        value1: 0.666,
        value2: 15.0,
      },
      {
        label: "1985",
        value1: 0.734,
        value2: 12.0,
      },
      {
        label: "1986",
        value1: 0.769,
        value2: 16.0,
      },
      {
        label: "1987",
        value1: 0.854,
        value2: 27.0,
      },
      {
        label: "1988",
        value1: 0.909,
        value2: 14.0,
      },
      {
        label: "1989",
        value1: 0.991,
        value2: 23.0,
      },
      {
        label: "1990",
        value1: 1.03,
        value2: 10.0,
      },
      {
        label: "1991",
        value1: 1.05,
        value2: 10.0,
      },
      {
        label: "1992",
        value1: 1.09,
        value2: 10.0,
      },
      {
        label: "1993",
        value1: 1.15,
        value2: 16.0,
      },
      {
        label: "1994",
        value1: 1.26,
        value2: 22.0,
      },
      {
        label: "1995",
        value1: 1.35,
        value2: 15.0,
      },
      {
        label: "1996",
        value1: 1.45,
        value2: 31.0,
      },
      {
        label: "1997",
        value1: 1.58,
        value2: 39.0,
      },
      {
        label: "1998",
        value1: 1.72,
        value2: 23.0,
      },
      {
        label: "1999",
        value1: 1.82,
        value2: 39.0,
      },
      {
        label: "2000",
        value1: 2.03,
        value2: 60.0,
      },
      {
        label: "2001",
        value1: 1.99,
        value2: 52.0,
      },
      {
        label: "2002",
        value1: 1.85,
        value2: 30.0,
      },
      {
        label: "2003",
        value1: 1.72,
        value2: 32.0,
      },
      {
        label: "2004",
        value1: 1.88,
        value2: 30.0,
      },
      {
        label: "2005",
        value1: 2.15,
        value2: 40.0,
      },
      {
        label: "2006",
        value1: 2.4,
        value2: 42.0,
      },
      {
        label: "2007",
        value1: 2.57,
        value2: 27.0,
      },
      {
        label: "2008",
        value1: 2.52,
        value2: 42.0,
      },
      {
        label: "2009",
        value1: 2.1,
        value2: 19.0,
      },
      {
        label: "2010",
        value1: 2.16,
        value2: 25.0,
      },
      {
        label: "2011",
        value1: 2.3,
        value2: 16.0,
      },
      {
        label: "2012",
        value1: 2.45,
        value2: 29.0,
      },
      {
        label: "2013",
        value1: 2.78,
        value2: 26.0,
      },
      {
        label: "2014",
        value1: 3.02,
        value2: 54.0,
      },
      {
        label: "2015",
        value1: 3.25,
        value2: 74.0,
      },
      {
        label: "2016",
        value1: 3.27,
        value2: 64.0,
      },
      {
        label: "2017",
        value1: 3.32,
        value2: 48.0,
      },
      {
        label: "2018",
        value1: 3.33,
        value2: 59.0,
      },
      {
        label: "2019",
        value1: 3.46,
        value2: 42.0,
      },
      {
        label: "2020",
        value1: 3.42,
        value2: 34.0,
      },
      {
        label: "2021",
        value1: 4.05,
        value2: 51.0,
      },
    ],
    forward: {
      title:
        "US Annual Tax Revenue (Trillions of Dollars) correlates with Automotive recalls for issues with Suspension (Recalls)",
      explanations: {
        confounderType:
          "When the economy is strong, people buy more cars and drive more, which can lead to more suspension problems being discovered and more recalls. At the same time, a strong economy boosts jobs and profits, which increases the government\u2019s tax collections.",
        twoSeperateMediatorType:
          "Higher tax collections often happen when there\u2019s more overall spending, and that can mean more new cars sold, raising the number of vehicles that could end up in suspension recalls. Higher tax collections can also reflect more industrial output and faster production schedules, which can increase the chances of manufacturing issues that later trigger recalls.",
        chainMediatorsType:
          "A wave of suspension recalls can reduce driving confidence and disrupt car availability, which can slow car sales and related spending. Lower spending and weaker business activity can then reduce incomes and profits, leading to lower tax collections.",
      },
    },
    backward: {
      title:
        "Automotive recalls for issues with Suspension (Recalls) correlates with US Annual Tax Revenue (Trillions of Dollars)",
      explanations: {
        confounderType:
          "A strong economy can both increase how many cars are sold and on the road, and also raise tax revenue. With more vehicles in use and more production, problems get noticed and reported more often, leading to more suspension-related recalls.",
        twoSeperateMediatorType:
          "Suspension recalls can push manufacturers to spend more on repairs and replacements, which increases business activity and can lead to higher tax collections. They can also result in more service work and parts sales at repair shops, and that extra income gets taxed too.",
        chainMediatorsType:
          "When tax revenue rises, governments may spend more on transportation and road projects. Better monitoring and reporting systems that come with that spending can help detect safety issues faster, which can increase suspension-related recalls.",
      },
    },
  },
  {
    id: "correlation-749",
    labels: {
      A: "Associates degrees awarded in Precision production (Degrees awarded)",
      B: "The number of avionics technicians in Maryland (Avionics Technicians)",
    },
    data: [
      {
        label: "2011",
        value1: 3254.0,
        value2: 110.0,
      },
      {
        label: "2012",
        value1: 3320.0,
        value2: 70.0,
      },
      {
        label: "2013",
        value1: 3345.0,
        value2: 190.0,
      },
      {
        label: "2014",
        value1: 3903.0,
        value2: 250.0,
      },
      {
        label: "2015",
        value1: 4382.0,
        value2: 590.0,
      },
      {
        label: "2016",
        value1: 4794.0,
        value2: 580.0,
      },
      {
        label: "2017",
        value1: 5251.0,
        value2: 610.0,
      },
      {
        label: "2018",
        value1: 5334.0,
        value2: 300.0,
      },
      {
        label: "2019",
        value1: 5386.0,
        value2: 710.0,
      },
      {
        label: "2020",
        value1: 4763.0,
        value2: 410.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Precision production (Degrees awarded) correlates with The number of avionics technicians in Maryland (Avionics Technicians)",
      explanations: {
        confounderType:
          "A growing aerospace/manufacturing sector in Maryland can both encourage more students to enroll in precision production programs and increase hiring of avionics technicians. So both numbers rise together because the same local industry growth is pushing them up.",
        twoSeperateMediatorType:
          "More precision production graduates can lead to more local employers expanding high-tech manufacturing operations, which then creates more avionics technician jobs. It can also raise the supply of hands-on technical workers overall, making it easier for companies to staff avionics roles and prompting more hiring.",
        chainMediatorsType:
          "When there are more avionics technicians in Maryland, related companies may grow and win more contracts, increasing demand for skilled manufacturing support. That can lead community colleges to add programs and seats, which results in more precision production degrees being awarded.",
      },
    },
    backward: {
      title:
        "The number of avionics technicians in Maryland (Avionics Technicians) correlates with Associates degrees awarded in Precision production (Degrees awarded)",
      explanations: {
        confounderType:
          "When Maryland\u2019s aerospace and advanced-manufacturing sector is booming, employers hire more avionics technicians and schools expand or attract more students into precision production associate programs. So both numbers rise and fall together because of the same underlying economic demand.",
        twoSeperateMediatorType:
          "Having more avionics technicians can lead local employers to partner more with community colleges for training programs, which results in more precision production associate degrees being awarded. It can also raise awareness of technical careers and encourage more people to enroll in related hands-on programs, increasing the number of degrees.",
        chainMediatorsType:
          "More precision production associate degrees can increase the pool of skilled entry-level workers, which helps manufacturers and repair shops expand operations. As those businesses grow and take on more aircraft electronics work, they hire more avionics technicians in Maryland.",
      },
    },
  },
  {
    id: "correlation-1850",
    labels: {
      A: "Master's degrees awarded in Engineering (Degrees awarded)",
      B: "The number of patternmakers, metal and plastic in Tennessee (Laborers)",
    },
    data: [
      {
        label: "2012",
        value1: 40323.0,
        value2: 50.0,
      },
      {
        label: "2013",
        value1: 40420.0,
        value2: 30.0,
      },
      {
        label: "2014",
        value1: 42376.0,
        value2: 50.0,
      },
      {
        label: "2015",
        value1: 46117.0,
        value2: 40.0,
      },
      {
        label: "2016",
        value1: 51646.0,
        value2: 150.0,
      },
      {
        label: "2017",
        value1: 52826.0,
        value2: 120.0,
      },
      {
        label: "2018",
        value1: 51723.0,
        value2: 100.0,
      },
      {
        label: "2019",
        value1: 49701.0,
        value2: 60.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Engineering (Degrees awarded) correlates with The number of patternmakers, metal and plastic in Tennessee (Laborers)",
      explanations: {
        confounderType:
          "Tennessee\u2019s overall manufacturing and engineering investment grows in some years. That same growth leads to more engineering master\u2019s graduates and also more hiring of patternmakers in metal and plastic.",
        twoSeperateMediatorType:
          "More engineering master\u2019s graduates help companies adopt new product designs and production methods, which increases the need for people who make precise patterns for manufacturing. More graduates also attract or expand factories in the state, which directly raises demand for those patternmaking jobs.",
        chainMediatorsType:
          "When patternmaking jobs rise, more people train for skilled manufacturing work and related technical roles. That growth boosts enrollment in advanced engineering programs, and after a few steps in education and career progression, more engineering master\u2019s degrees get awarded.",
      },
    },
    backward: {
      title:
        "The number of patternmakers, metal and plastic in Tennessee (Laborers) correlates with Master's degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "When Tennessee\u2019s manufacturing sector grows, it tends to hire more patternmakers and also increases demand for advanced engineering skills. That same growth can push universities to expand engineering programs and produce more master\u2019s graduates.",
        twoSeperateMediatorType:
          "Having more patternmakers can lead local companies to take on more complex production projects, which then encourages universities to offer more advanced engineering training and results in more master\u2019s degrees. It can also attract more manufacturing investment to the area, which boosts funding and partnerships for engineering departments and increases the number of master\u2019s graduates.",
        chainMediatorsType:
          "When more engineering master\u2019s degrees are awarded, more highly trained engineers join local firms and improve product design and manufacturing methods. That can lead factories to expand and open new lines that require more tooling and mold work, increasing the need for patternmakers.",
      },
    },
  },
  {
    id: "correlation-2037",
    labels: {
      A: "Gasoline pumped in Singapore (Million Barrels/Day)",
      B: "Hess Corporation's stock price (HES) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 15.6111,
        value2: 20.8,
      },
      {
        label: "2003",
        value1: 15.5877,
        value2: 18.13,
      },
      {
        label: "2004",
        value1: 16.0,
        value2: 17.75,
      },
      {
        label: "2005",
        value1: 16.429,
        value2: 27.33,
      },
      {
        label: "2006",
        value1: 17.4105,
        value2: 42.83,
      },
      {
        label: "2007",
        value1: 18.6024,
        value2: 48.85,
      },
      {
        label: "2008",
        value1: 19.4838,
        value2: 100.07,
      },
      {
        label: "2009",
        value1: 19.1399,
        value2: 53.91,
      },
      {
        label: "2010",
        value1: 19.6073,
        value2: 61.84,
      },
      {
        label: "2011",
        value1: 19.7475,
        value2: 77.94,
      },
      {
        label: "2012",
        value1: 19.9733,
        value2: 58.72,
      },
      {
        label: "2013",
        value1: 20.1215,
        value2: 54.13,
      },
      {
        label: "2014",
        value1: 19.9111,
        value2: 82.95,
      },
      {
        label: "2015",
        value1: 18.0,
        value2: 73.19,
      },
      {
        label: "2016",
        value1: 17.0,
        value2: 48.4,
      },
      {
        label: "2017",
        value1: 17.1535,
        value2: 63.38,
      },
      {
        label: "2018",
        value1: 17.5535,
        value2: 47.97,
      },
      {
        label: "2019",
        value1: 17.1301,
        value2: 39.29,
      },
      {
        label: "2020",
        value1: 18.4155,
        value2: 67.51,
      },
      {
        label: "2021",
        value1: 18.4155,
        value2: 53.85,
      },
    ],
    forward: {
      title:
        "Gasoline pumped in Singapore (Million Barrels/Day) correlates with Hess Corporation's stock price (HES) (Stock price)",
      explanations: {
        confounderType:
          "When global oil demand rises or falls, it can both change how much gasoline is pumped in Singapore and also push oil company stocks like Hess up or down. So both series move together because they are reacting to the same worldwide energy market conditions.",
        twoSeperateMediatorType:
          "More gasoline pumped in Singapore can signal stronger regional fuel demand, which can lift expectations for oil prices and improve how investors value Hess. It can also imply tighter shipping, refining, or storage conditions that affect fuel margins and broader energy-sector sentiment, moving the stock.",
        chainMediatorsType:
          "If Hess\u2019s stock rises, it can boost investor confidence in the energy sector and encourage more trading and risk-taking across oil-related markets. That can flow into higher oil and fuel activity in Asia, leading suppliers and traders to move and pump more gasoline through hubs like Singapore.",
      },
    },
    backward: {
      title:
        "Hess Corporation's stock price (HES) (Stock price) correlates with Gasoline pumped in Singapore (Million Barrels/Day)",
      explanations: {
        confounderType:
          "Global oil prices can move both together: when crude gets more expensive, Hess tends to be valued higher and fuel demand patterns in Singapore often shift. Big changes in the world economy can also raise or lower both energy company stock prices and how much gasoline is used.",
        twoSeperateMediatorType:
          "When Hess\u2019s stock rises, it can signal confidence in oil and fuel markets, which can influence trading and supply decisions that affect how much gasoline ends up being sold in Singapore. Separately, a rising stock can lead to more investment and production plans, which can change regional fuel availability and pricing and then shift gasoline pumping volumes.",
        chainMediatorsType:
          "If more gasoline is being pumped in Singapore, it can point to stronger regional fuel demand, which can lift Asian refining margins and increase demand for crude oil. Higher crude demand can push oil prices up, and that can raise expectations for Hess\u2019s earnings and its stock price.",
      },
    },
  },
  {
    id: "correlation-2195",
    labels: {
      A: "Arson in Massachusetts (Arson rate)",
      B: "Cigarette Smoking Rate for US adults (Percentage)",
    },
    data: [
      {
        label: "2001",
        value1: 10.8,
        value2: 22.8,
      },
      {
        label: "2002",
        value1: 10.4,
        value2: 22.5,
      },
      {
        label: "2003",
        value1: 10.5,
        value2: 21.6,
      },
      {
        label: "2004",
        value1: 9.3,
        value2: 20.9,
      },
      {
        label: "2005",
        value1: 9.7,
        value2: 20.9,
      },
      {
        label: "2006",
        value1: 10.3,
        value2: 20.8,
      },
      {
        label: "2007",
        value1: 10.6,
        value2: 19.8,
      },
      {
        label: "2008",
        value1: 10.6,
        value2: 20.6,
      },
      {
        label: "2009",
        value1: 10.7,
        value2: 20.6,
      },
      {
        label: "2010",
        value1: 10.0,
        value2: 19.3,
      },
      {
        label: "2011",
        value1: 8.5,
        value2: 19.0,
      },
      {
        label: "2012",
        value1: 9.3,
        value2: 18.1,
      },
      {
        label: "2013",
        value1: 7.6,
        value2: 17.8,
      },
      {
        label: "2014",
        value1: 7.1,
        value2: 16.8,
      },
      {
        label: "2015",
        value1: 5.7,
        value2: 15.1,
      },
      {
        label: "2016",
        value1: 6.5,
        value2: 15.5,
      },
      {
        label: "2017",
        value1: 5.6,
        value2: 14.0,
      },
      {
        label: "2018",
        value1: 4.3,
        value2: 13.7,
      },
      {
        label: "2019",
        value1: 4.5,
        value2: 14.0,
      },
      {
        label: "2020",
        value1: 6.3,
        value2: 12.5,
      },
      {
        label: "2021",
        value1: 4.5,
        value2: 11.5,
      },
    ],
    forward: {
      title:
        "Arson in Massachusetts (Arson rate) correlates with Cigarette Smoking Rate for US adults (Percentage)",
      explanations: {
        confounderType:
          "Economic stress and lack of access to support services can raise both smoking and destructive behaviors. When times are harder, more people may smoke and more fires may be set on purpose.",
        twoSeperateMediatorType:
          "More arson can make neighborhoods feel unsafe and stressful, leading some adults to smoke more to cope. It can also damage homes and disrupt routines, pushing more people into social settings where smoking is more common.",
        chainMediatorsType:
          "Higher smoking rates can lead to more smoking-related litter and careless handling of matches or lighters in public places. That normalizes playing with fire and increases chances that someone later intentionally sets a fire.",
      },
    },
    backward: {
      title:
        "Cigarette Smoking Rate for US adults (Percentage) correlates with Arson in Massachusetts (Arson rate)",
      explanations: {
        confounderType:
          "Economic hardship can rise and fall over time and across places, which can lead more people to smoke as a coping habit. The same hardship can also increase desperation or unrest that makes property crimes like arson more likely.",
        twoSeperateMediatorType:
          "Smoking can be linked with heavier drinking, and intoxication can lead to careless or aggressive behavior that increases the chance of setting fires. Smoking also involves more open flames and discarded cigarettes, which can accidentally start fires that are later recorded as arson.",
        chainMediatorsType:
          "A spike in deliberately set fires can make neighborhoods feel unsafe and stressful. That stress can disrupt sleep and mental health, which can push some adults to start smoking or smoke more to calm their nerves.",
      },
    },
  },
  {
    id: "correlation-2395",
    labels: {
      A: "Motor vehicle thefts in Kansas (Motor Vehicle Theft rate)",
      B: "The number of couriers and messengers in Kansas (Couriers And Messengers)",
    },
    data: [
      {
        label: "2003",
        value1: 287.4,
        value2: 1320.0,
      },
      {
        label: "2004",
        value1: 311.3,
        value2: 1370.0,
      },
      {
        label: "2005",
        value1: 339.8,
        value2: 1630.0,
      },
      {
        label: "2006",
        value1: 315.6,
        value2: 1600.0,
      },
      {
        label: "2007",
        value1: 309.8,
        value2: 1320.0,
      },
      {
        label: "2008",
        value1: 264.3,
        value2: 970.0,
      },
      {
        label: "2009",
        value1: 211.4,
        value2: 700.0,
      },
      {
        label: "2010",
        value1: 210.6,
        value2: 670.0,
      },
      {
        label: "2011",
        value1: 232.9,
        value2: 610.0,
      },
      {
        label: "2012",
        value1: 234.9,
        value2: 510.0,
      },
      {
        label: "2013",
        value1: 230.4,
        value2: 540.0,
      },
      {
        label: "2014",
        value1: 239.1,
        value2: 520.0,
      },
      {
        label: "2015",
        value1: 241.0,
        value2: 730.0,
      },
      {
        label: "2016",
        value1: 255.0,
        value2: 600.0,
      },
      {
        label: "2017",
        value1: 254.0,
        value2: 540.0,
      },
      {
        label: "2018",
        value1: 272.4,
        value2: 660.0,
      },
      {
        label: "2019",
        value1: 236.6,
        value2: 590.0,
      },
      {
        label: "2020",
        value1: 248.1,
        value2: 630.0,
      },
      {
        label: "2021",
        value1: 267.8,
        value2: 560.0,
      },
      {
        label: "2022",
        value1: 230.2,
        value2: 740.0,
      },
    ],
    forward: {
      title:
        "Motor vehicle thefts in Kansas (Motor Vehicle Theft rate) correlates with The number of couriers and messengers in Kansas (Couriers And Messengers)",
      explanations: {
        confounderType:
          "When the economy and population grow in Kansas, there are more deliveries and more courier jobs. The same growth also creates more cars and busier areas, which can lead to more vehicle thefts.",
        twoSeperateMediatorType:
          "More vehicle thefts can push businesses and households to replace cars and move goods around in different ways, increasing demand for delivery services and courier jobs. It can also raise the need to transport documents, parts, and paperwork related to insurance claims, repairs, and legal processes, creating more courier work.",
        chainMediatorsType:
          "More courier and messenger jobs mean more delivery vehicles on the road and more frequent stops in neighborhoods. That can create more chances for thieves to spot unattended cars or pick up patterns, leading to more vehicle thefts.",
      },
    },
    backward: {
      title:
        "The number of couriers and messengers in Kansas (Couriers And Messengers) correlates with Motor vehicle thefts in Kansas (Motor Vehicle Theft rate)",
      explanations: {
        confounderType:
          "When the economy is booming and cities are growing, businesses hire more delivery workers and there are also more cars around to steal. That shared growth can make both numbers rise together even if one doesn\u2019t cause the other.",
        twoSeperateMediatorType:
          "More delivery workers on the road can mean more vans and packages parked or left running, creating more chances for thieves to take vehicles. It can also increase traffic and time spent in busy pickup areas, giving thieves more opportunities to spot targets and act quickly.",
        chainMediatorsType:
          "If vehicle theft becomes more common, companies may invest in tracking, secure pickup procedures, and rapid response to missing vehicles. That can lead them to hire additional delivery and messenger staff to keep routes running despite disruptions.",
      },
    },
  },
  {
    id: "correlation-2549",
    labels: {
      A: "Arson in Delaware (Arson rate)",
      B: "Cigarette Smoking Rate for US adults (Percentage)",
    },
    data: [
      {
        label: "2001",
        value1: 54.5,
        value2: 22.8,
      },
      {
        label: "2002",
        value1: 42.6,
        value2: 22.5,
      },
      {
        label: "2003",
        value1: 44.6,
        value2: 21.6,
      },
      {
        label: "2004",
        value1: 44.1,
        value2: 20.9,
      },
      {
        label: "2005",
        value1: 45.7,
        value2: 20.9,
      },
      {
        label: "2006",
        value1: 45.0,
        value2: 20.8,
      },
      {
        label: "2007",
        value1: 36.1,
        value2: 19.8,
      },
      {
        label: "2008",
        value1: 41.5,
        value2: 20.6,
      },
      {
        label: "2009",
        value1: 34.8,
        value2: 20.6,
      },
      {
        label: "2010",
        value1: 33.5,
        value2: 19.3,
      },
      {
        label: "2011",
        value1: 32.2,
        value2: 19.0,
      },
      {
        label: "2012",
        value1: 24.6,
        value2: 18.1,
      },
      {
        label: "2013",
        value1: 18.6,
        value2: 17.8,
      },
      {
        label: "2014",
        value1: 22.9,
        value2: 16.8,
      },
      {
        label: "2015",
        value1: 17.1,
        value2: 15.1,
      },
      {
        label: "2016",
        value1: 19.0,
        value2: 15.5,
      },
      {
        label: "2017",
        value1: 14.4,
        value2: 14.0,
      },
      {
        label: "2018",
        value1: 14.2,
        value2: 13.7,
      },
      {
        label: "2019",
        value1: 13.1,
        value2: 14.0,
      },
      {
        label: "2020",
        value1: 0.0,
        value2: 12.5,
      },
      {
        label: "2021",
        value1: 15.5,
        value2: 11.5,
      },
    ],
    forward: {
      title:
        "Arson in Delaware (Arson rate) correlates with Cigarette Smoking Rate for US adults (Percentage)",
      explanations: {
        confounderType:
          "Economic hardship and high stress in some communities can make more people smoke and can also increase destructive behavior like setting fires. Places facing these pressures may end up with both higher smoking rates and more arson.",
        twoSeperateMediatorType:
          "More arson can lead to more smoke-damaged homes and disrupted neighborhoods, which raises stress and makes smoking more common. It can also reduce local business activity and jobs, and financial strain can push smoking rates upward.",
        chainMediatorsType:
          "Higher smoking can mean more discarded cigarette butts and careless use of lighters and matches. Those small fires can spread into larger intentional-looking blazes, increasing the number of reported arson cases.",
      },
    },
    backward: {
      title:
        "Cigarette Smoking Rate for US adults (Percentage) correlates with Arson in Delaware (Arson rate)",
      explanations: {
        confounderType:
          "Economic hardship can make people more likely to smoke and also increase stress, instability, and crime, which can include setting fires. So both trends can move together even if one doesn\u2019t directly cause the other.",
        twoSeperateMediatorType:
          "Higher smoking can lead to more careless handling of lit cigarettes, which can accidentally start fires that get counted as arson. It can also be linked with heavier substance use and risky behavior, which can raise the chances of intentional fire-setting.",
        chainMediatorsType:
          "More arson can damage homes and neighborhoods, making people feel less safe and more stressed. That stress can lead to more financial strain and mental health struggles, and some people may cope by smoking more.",
      },
    },
  },
  {
    id: "correlation-2671",
    labels: {
      A: "Annual US household spending on meats, poultry, fish, and eggs (Household spend)",
      B: "Tractor Supply Company's stock price (TSCO) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 798.0,
        value2: 2.14,
      },
      {
        label: "2003",
        value1: 825.0,
        value2: 4.76,
      },
      {
        label: "2004",
        value1: 880.0,
        value2: 9.74,
      },
      {
        label: "2005",
        value1: 764.0,
        value2: 9.38,
      },
      {
        label: "2006",
        value1: 797.0,
        value2: 13.34,
      },
      {
        label: "2007",
        value1: 777.0,
        value2: 11.24,
      },
      {
        label: "2008",
        value1: 846.0,
        value2: 8.92,
      },
      {
        label: "2009",
        value1: 841.0,
        value2: 9.22,
      },
      {
        label: "2010",
        value1: 784.0,
        value2: 13.3,
      },
      {
        label: "2011",
        value1: 832.0,
        value2: 24.54,
      },
      {
        label: "2012",
        value1: 852.0,
        value2: 35.42,
      },
      {
        label: "2013",
        value1: 856.0,
        value2: 45.41,
      },
      {
        label: "2014",
        value1: 892.0,
        value2: 77.6,
      },
      {
        label: "2015",
        value1: 896.0,
        value2: 78.8,
      },
      {
        label: "2016",
        value1: 890.0,
        value2: 83.5,
      },
      {
        label: "2017",
        value1: 944.0,
        value2: 76.9,
      },
      {
        label: "2018",
        value1: 961.0,
        value2: 75.35,
      },
      {
        label: "2019",
        value1: 980.0,
        value2: 81.81,
      },
      {
        label: "2020",
        value1: 1075.0,
        value2: 93.69,
      },
      {
        label: "2021",
        value1: 1115.0,
        value2: 140.9,
      },
      {
        label: "2022",
        value1: 1216.0,
        value2: 238.35,
      },
    ],
    forward: {
      title:
        "Annual US household spending on meats, poultry, fish, and eggs (Household spend) correlates with Tractor Supply Company's stock price (TSCO) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is strong and wages are rising, families tend to spend more on food like meat and eggs, and investors also bid up retail stocks like Tractor Supply. When the economy weakens, both spending and the stock price can fall together.",
        twoSeperateMediatorType:
          "If families spend more on meat and eggs, more people may buy backyard chickens and related feed and supplies, which can lift Tractor Supply\u2019s sales and stock price. Higher meat and egg spending can also signal strong overall consumer demand, encouraging investors to value the company more highly.",
        chainMediatorsType:
          "If Tractor Supply\u2019s stock price rises, the company can expand stores and marketing, making it easier for people to start or maintain backyard egg and meat production. That can increase demand for and spending on poultry, fish, and eggs over time.",
      },
    },
    backward: {
      title:
        "Tractor Supply Company's stock price (TSCO) (Stock price) correlates with Annual US household spending on meats, poultry, fish, and eggs (Household spend)",
      explanations: {
        confounderType:
          "A strong economy (rising wages and low unemployment) can make people spend more on meat and also make investors more optimistic about this retailer\u2019s future, lifting the stock price. When the economy slows, both can drop at the same time.",
        twoSeperateMediatorType:
          "If the stock price rises, the company may find it easier to raise money and expand stores and promotions, which can boost sales of feed and supplies that support backyard chickens and home meat production, nudging household meat-related spending upward. Also, a rising stock price can bring more media attention and customer interest in rural-lifestyle products, encouraging more at-home food production that leads to higher spending on meat, poultry, fish, and eggs.",
        chainMediatorsType:
          "When households spend more on meat and eggs, it can signal higher food prices and stronger demand for animal products. That can increase interest in raising animals at home, which boosts demand for farm-and-ranch supplies the retailer sells, improving its results and pushing the stock price higher.",
      },
    },
  },
  {
    id: "correlation-2691",
    labels: {
      A: "The number of agricultural equipment operators in South Carolina (Laborers)",
      B: "Annual growth rate of US Real GDP (Percentage)",
    },
    data: [
      {
        label: "2003",
        value1: 270.0,
        value2: 2.8,
      },
      {
        label: "2004",
        value1: 240.0,
        value2: 3.8,
      },
      {
        label: "2005",
        value1: 340.0,
        value2: 3.4,
      },
      {
        label: "2006",
        value1: 170.0,
        value2: 2.7,
      },
      {
        label: "2007",
        value1: 160.0,
        value2: 1.8,
      },
      {
        label: "2008",
        value1: 80.0,
        value2: -0.3,
      },
      {
        label: "2009",
        value1: 100.0,
        value2: -2.8,
      },
      {
        label: "2010",
        value1: 210.0,
        value2: 2.5,
      },
      {
        label: "2011",
        value1: 210.0,
        value2: 1.5,
      },
      {
        label: "2012",
        value1: 250.0,
        value2: 2.3,
      },
      {
        label: "2013",
        value1: 250.0,
        value2: 1.8,
      },
      {
        label: "2014",
        value1: 240.0,
        value2: 2.3,
      },
      {
        label: "2015",
        value1: 310.0,
        value2: 2.7,
      },
      {
        label: "2016",
        value1: 270.0,
        value2: 1.7,
      },
      {
        label: "2017",
        value1: 140.0,
        value2: 2.2,
      },
      {
        label: "2018",
        value1: 120.0,
        value2: 2.9,
      },
      {
        label: "2019",
        value1: 100.0,
        value2: 2.3,
      },
      {
        label: "2020",
        value1: 100.0,
        value2: -2.8,
      },
      {
        label: "2021",
        value1: 290.0,
        value2: 5.9,
      },
      {
        label: "2022",
        value1: 210.0,
        value2: 2.1,
      },
    ],
    forward: {
      title:
        "The number of agricultural equipment operators in South Carolina (Laborers) correlates with Annual growth rate of US Real GDP (Percentage)",
      explanations: {
        confounderType:
          "A strong nationwide economy can both boost demand for farm products and improve local hiring conditions, increasing operator jobs in South Carolina while also raising overall GDP growth. When the economy slows, farms may cut hiring and GDP growth also drops.",
        twoSeperateMediatorType:
          "More operators can increase farm output, leading to more food and agricultural goods sold across the country, which adds to economic growth. Separately, more operators can lead to more purchases and maintenance of machinery, fuel, and supplies, supporting related businesses and contributing to growth.",
        chainMediatorsType:
          "When the national economy grows faster, people spend more, pushing up demand for food and agricultural products. Farms then expand acreage and operations, buy more equipment, and finally hire more equipment operators in South Carolina.",
      },
    },
    backward: {
      title:
        "Annual growth rate of US Real GDP (Percentage) correlates with The number of agricultural equipment operators in South Carolina (Laborers)",
      explanations: {
        confounderType:
          "Nationwide shifts in interest rates and farm commodity prices can move the whole economy up or down while also changing how much farm work and hiring happens in South Carolina. When farming becomes more profitable and borrowing is easier, both economic growth and demand for equipment operators can rise together.",
        twoSeperateMediatorType:
          "When the national economy grows, farms and agricultural businesses often invest more in new machinery and expand operations, which increases the need for people to run equipment. At the same time, stronger growth can boost construction and land development in rural areas, creating more equipment-related work tied to agriculture and increasing operator jobs.",
        chainMediatorsType:
          "If more agricultural equipment operators are employed, farms may harvest and process more output and spend more on supplies and services. That extra production and spending can ripple through related industries and, in aggregate, slightly lift overall economic growth.",
      },
    },
  },
  {
    id: "correlation-2919",
    labels: {
      A: "Rain in Columbus (Precipitation days)",
      B: "Votes for the Republican Presidential candidate in Ohio (Total votes)",
    },
    data: [
      {
        label: "1980",
        value1: 79.0,
        value2: 2206540.0,
      },
      {
        label: "1984",
        value1: 86.0,
        value2: 2678560.0,
      },
      {
        label: "1992",
        value1: 65.0,
        value2: 1894310.0,
      },
      {
        label: "2000",
        value1: 79.0,
        value2: 2350360.0,
      },
      {
        label: "2004",
        value1: 90.0,
        value2: 2859760.0,
      },
      {
        label: "2008",
        value1: 91.0,
        value2: 2677820.0,
      },
      {
        label: "2012",
        value1: 84.0,
        value2: 2661410.0,
      },
      {
        label: "2016",
        value1: 86.0,
        value2: 2841000.0,
      },
      {
        label: "2020",
        value1: 95.0,
        value2: 3154830.0,
      },
    ],
    forward: {
      title:
        "Rain in Columbus (Precipitation days) correlates with Votes for the Republican Presidential candidate in Ohio (Total votes)",
      explanations: {
        confounderType:
          "Some third factor, like the time of year or broader weather patterns, can bring more rainy days in Columbus and also line up with when the election happens and who turns out to vote. That shared timing and environment can make rain and Republican vote totals move together even if rain isn\u2019t changing votes directly.",
        twoSeperateMediatorType:
          "More rainy days can change who shows up to vote, because some people decide it\u2019s not worth going out in bad weather. Rainy days can also change how campaigns operate\u2014fewer outdoor events and more reliance on mailers or TV\u2014which can shift which candidate gets more votes.",
        chainMediatorsType:
          "A strong Republican year can change what policies and spending are prioritized, including how a city manages drainage, flood control, and stormwater systems. Over time those choices can affect how often days end up recorded as precipitation days in Columbus.",
      },
    },
    backward: {
      title:
        "Votes for the Republican Presidential candidate in Ohio (Total votes) correlates with Rain in Columbus (Precipitation days)",
      explanations: {
        confounderType:
          "A long-term shift in the state\u2019s population and economy (like more rural residents or changes in major industries) can both increase support for the Republican candidate and also coincide with weather patterns that bring more rainy days in Columbus. So the same underlying change influences both election totals and precipitation.",
        twoSeperateMediatorType:
          "When the Republican candidate gets more votes, state leaders aligned with that party may prioritize different infrastructure spending, which can change drainage and runoff in ways that affect how often Columbus records measurable rain. Also, higher Republican vote totals can reflect different patterns of travel and development that change local land use around Columbus, which can influence local weather measurements.",
        chainMediatorsType:
          "More rainy days in Columbus can reduce outdoor activity and hurt sales for some local businesses, which can affect jobs and household finances. Those economic and mood changes can shape political attitudes over time and lead to different totals for the Republican presidential candidate across Ohio.",
      },
    },
  },
  {
    id: "correlation-2933",
    labels: {
      A: "Annual US household spending on transportation (Household spend)",
      B: "Brookfield's stock price (BN) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 7759.0,
        value2: 14.71,
      },
      {
        label: "2003",
        value1: 7781.0,
        value2: 16.54,
      },
      {
        label: "2004",
        value1: 7801.0,
        value2: 24.8,
      },
      {
        label: "2005",
        value1: 8344.0,
        value2: 29.54,
      },
      {
        label: "2006",
        value1: 8508.0,
        value2: 40.97,
      },
      {
        label: "2007",
        value1: 8758.0,
        value2: 39.26,
      },
      {
        label: "2008",
        value1: 8604.0,
        value2: 29.12,
      },
      {
        label: "2009",
        value1: 7658.0,
        value2: 12.32,
      },
      {
        label: "2010",
        value1: 7677.0,
        value2: 18.46,
      },
      {
        label: "2011",
        value1: 8293.0,
        value2: 27.25,
      },
      {
        label: "2012",
        value1: 8998.0,
        value2: 22.74,
      },
      {
        label: "2013",
        value1: 9004.0,
        value2: 30.35,
      },
      {
        label: "2014",
        value1: 9073.0,
        value2: 31.54,
      },
      {
        label: "2015",
        value1: 9503.0,
        value2: 40.76,
      },
      {
        label: "2016",
        value1: 9049.0,
        value2: 25.29,
      },
      {
        label: "2017",
        value1: 9576.0,
        value2: 26.96,
      },
      {
        label: "2018",
        value1: 9761.0,
        value2: 35.47,
      },
      {
        label: "2019",
        value1: 10742.0,
        value2: 30.89,
      },
      {
        label: "2020",
        value1: 9826.0,
        value2: 47.17,
      },
      {
        label: "2021",
        value1: 10961.0,
        value2: 33.43,
      },
      {
        label: "2022",
        value1: 12295.0,
        value2: 49.19,
      },
    ],
    forward: {
      title:
        "Annual US household spending on transportation (Household spend) correlates with Brookfield's stock price (BN) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, households tend to spend more on transportation and investors may bid up Brookfield\u2019s stock. When the economy cools, transportation spending and the stock can both fall.",
        twoSeperateMediatorType:
          "Higher transportation spending can signal stronger overall consumer demand, which can lift business activity and improve market sentiment, helping the stock rise. It can also push up fuel use and transportation-related prices, which can influence inflation and interest-rate expectations that move stock valuations.",
        chainMediatorsType:
          "If Brookfield\u2019s stock rises, it can boost retirement accounts and investment portfolios that hold it, making some households feel wealthier. Feeling wealthier can lead those households to spend more, including on transportation.",
      },
    },
    backward: {
      title:
        "Brookfield's stock price (BN) (Stock price) correlates with Annual US household spending on transportation (Household spend)",
      explanations: {
        confounderType:
          "Overall economic conditions (like interest rates, inflation, and growth) can lift or depress both Brookfield\u2019s share price and how much households spend on transportation. When the economy is strong, investors may bid up stocks and people may travel more and spend more on cars, fuel, and transit.",
        twoSeperateMediatorType:
          "If Brookfield\u2019s share price rises, it can improve consumer confidence and make people feel wealthier through retirement accounts, which can lead to more transportation spending. Separately, a higher share price can help the company raise money more easily and fund projects and jobs that increase household income, which can also boost transportation spending.",
        chainMediatorsType:
          "When households spend more on transportation, demand for fuel, roads, logistics, and travel services often rises, improving business results for many companies. That can push up sector profits and investor optimism, which can increase demand for large asset owners and infrastructure investors and lift Brookfield\u2019s share price.",
      },
    },
  },
  {
    id: "correlation-3058",
    labels: {
      A: "Master's degrees awarded in Agriculture and natural resources (Degrees awarded)",
      B: "Wind power generated in Lithuania (Billion kWh)",
    },
    data: [
      {
        label: "2012",
        value1: 6622.0,
        value2: 0.537,
      },
      {
        label: "2013",
        value1: 6601.0,
        value2: 0.6,
      },
      {
        label: "2014",
        value1: 7026.0,
        value2: 0.636001,
      },
      {
        label: "2015",
        value1: 6894.0,
        value2: 0.805999,
      },
      {
        label: "2016",
        value1: 7206.0,
        value2: 1.13,
      },
      {
        label: "2017",
        value1: 7373.0,
        value2: 1.3562,
      },
      {
        label: "2018",
        value1: 6967.0,
        value2: 1.1375,
      },
      {
        label: "2019",
        value1: 7544.0,
        value2: 1.4901,
      },
      {
        label: "2020",
        value1: 7405.0,
        value2: 1.49148,
      },
      {
        label: "2021",
        value1: 7404.0,
        value2: 1.35423,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Agriculture and natural resources (Degrees awarded) correlates with Wind power generated in Lithuania (Billion kWh)",
      explanations: {
        confounderType:
          "Government investment in green and rural development can both expand university programs in agriculture and natural resources and accelerate wind power projects. When that funding rises or falls, both numbers tend to move together.",
        twoSeperateMediatorType:
          "More graduates can lead to more skilled workers and better planning for land use and environmental permitting, which helps wind farms get approved and built faster. At the same time, graduates can strengthen research and innovation that improves site assessment and grid integration, boosting wind generation.",
        chainMediatorsType:
          "When wind power grows, new jobs appear in renewable energy and environmental management, and salaries and career prospects improve. That can increase interest in related university studies, leading more people to enroll and complete advanced degrees in agriculture and natural resources.",
      },
    },
    backward: {
      title:
        "Wind power generated in Lithuania (Billion kWh) correlates with Master's degrees awarded in Agriculture and natural resources (Degrees awarded)",
      explanations: {
        confounderType:
          "Government investment in green and rural development could increase wind farm construction while also funding university programs in agriculture and natural resources. When budgets rise or policies shift, both wind generation and degree counts can climb together even if neither directly affects the other.",
        twoSeperateMediatorType:
          "More wind power can bring new clean-energy jobs and local projects, which raises interest in environmental and land-management study and leads to more master\u2019s graduates in those fields. Separately, wind power growth can increase research funding and partnerships with universities, expanding programs and producing more graduates.",
        chainMediatorsType:
          "A growing number of agriculture and natural-resources master\u2019s graduates can lead to more environmental experts working in government and industry. Their work can improve planning, permitting, and site selection, which helps more wind turbines get built and increases wind electricity generation.",
      },
    },
  },
  {
    id: "correlation-3062",
    labels: {
      A: "Associates degrees awarded in Physical sciences (Degrees awarded)",
      B: "The number of statisticians in Michigan (Statisticians)",
    },
    data: [
      {
        label: "2011",
        value1: 3148.0,
        value2: 470.0,
      },
      {
        label: "2012",
        value1: 3652.0,
        value2: 440.0,
      },
      {
        label: "2013",
        value1: 4083.0,
        value2: 410.0,
      },
      {
        label: "2014",
        value1: 4518.0,
        value2: 490.0,
      },
      {
        label: "2015",
        value1: 5040.0,
        value2: 500.0,
      },
      {
        label: "2016",
        value1: 5528.0,
        value2: 660.0,
      },
      {
        label: "2017",
        value1: 5838.0,
        value2: 580.0,
      },
      {
        label: "2018",
        value1: 6692.0,
        value2: 780.0,
      },
      {
        label: "2019",
        value1: 7066.0,
        value2: 670.0,
      },
      {
        label: "2020",
        value1: 6762.0,
        value2: 790.0,
      },
      {
        label: "2021",
        value1: 6424.0,
        value2: 580.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Physical sciences (Degrees awarded) correlates with The number of statisticians in Michigan (Statisticians)",
      explanations: {
        confounderType:
          "When Michigan invests more in science and tech education and industry, more people earn physical science associate degrees and more statistician jobs get created in the state. When investment drops, both numbers tend to fall.",
        twoSeperateMediatorType:
          "More physical science associate degrees can lead to more graduates taking extra training in data analysis, which increases the number who work as statisticians in Michigan. It can also attract more science-heavy employers to Michigan, and those employers hire more statisticians.",
        chainMediatorsType:
          "If Michigan has more statisticians, companies and universities may do more data-driven research and projects. That can increase funding and enrollment in local physical science programs, leading to more associate degrees awarded.",
      },
    },
    backward: {
      title:
        "The number of statisticians in Michigan (Statisticians) correlates with Associates degrees awarded in Physical sciences (Degrees awarded)",
      explanations: {
        confounderType:
          "Michigan\u2019s overall investment in science and higher education could increase both hiring for data-focused jobs and the number of physical science associate degrees. When the state economy and funding are strong, both numbers tend to rise together.",
        twoSeperateMediatorType:
          "Having more statisticians can lead colleges to add more data-heavy courses and support services, making physical science programs stronger and boosting graduations. It can also help local science employers grow and offer more internships, encouraging more students to finish those degrees.",
        chainMediatorsType:
          "More physical science associate degrees can produce more technically trained workers who join research teams and labs. As those teams expand and take on more projects, they create more demand for professional statisticians in the state.",
      },
    },
  },
  {
    id: "correlation-3102",
    labels: {
      A: "Burglaries in Ohio (Burglary rate)",
      B: "The number of bill collectors in Ohio (Laborers)",
    },
    data: [
      {
        label: "2003",
        value1: 831.3,
        value2: 18970.0,
      },
      {
        label: "2004",
        value1: 842.9,
        value2: 20160.0,
      },
      {
        label: "2005",
        value1: 873.4,
        value2: 19380.0,
      },
      {
        label: "2006",
        value1: 920.4,
        value2: 18990.0,
      },
      {
        label: "2007",
        value1: 863.8,
        value2: 16660.0,
      },
      {
        label: "2008",
        value1: 891.8,
        value2: 16020.0,
      },
      {
        label: "2009",
        value1: 901.1,
        value2: 17430.0,
      },
      {
        label: "2010",
        value1: 928.5,
        value2: 17700.0,
      },
      {
        label: "2011",
        value1: 978.3,
        value2: 19390.0,
      },
      {
        label: "2012",
        value1: 911.6,
        value2: 16440.0,
      },
      {
        label: "2013",
        value1: 787.2,
        value2: 16650.0,
      },
      {
        label: "2014",
        value1: 685.2,
        value2: 15920.0,
      },
      {
        label: "2015",
        value1: 603.1,
        value2: 14690.0,
      },
      {
        label: "2016",
        value1: 577.2,
        value2: 13640.0,
      },
      {
        label: "2017",
        value1: 493.1,
        value2: 12900.0,
      },
      {
        label: "2018",
        value1: 423.6,
        value2: 11800.0,
      },
      {
        label: "2019",
        value1: 378.2,
        value2: 9890.0,
      },
      {
        label: "2020",
        value1: 318.8,
        value2: 8250.0,
      },
      {
        label: "2021",
        value1: 272.4,
        value2: 8150.0,
      },
      {
        label: "2022",
        value1: 255.3,
        value2: 8020.0,
      },
    ],
    forward: {
      title:
        "Burglaries in Ohio (Burglary rate) correlates with The number of bill collectors in Ohio (Laborers)",
      explanations: {
        confounderType:
          "When Ohio\u2019s economy is doing poorly, more people fall behind on debts and also more people may turn to theft to get by. That same downturn can increase both the need for bill collectors and the burglary rate at the same time.",
        twoSeperateMediatorType:
          "More burglaries can lead to more people losing property or facing unexpected costs, causing them to miss payments and creating more work for bill collectors. More burglaries can also push households and businesses to spend extra on repairs and security, leaving less money for bills and again increasing demand for bill collectors.",
        chainMediatorsType:
          "If there are more bill collectors, more people may feel financial pressure and stress. That stress can lead to housing instability and more vacant or poorly secured properties, which can make burglaries more likely.",
      },
    },
    backward: {
      title:
        "The number of bill collectors in Ohio (Laborers) correlates with Burglaries in Ohio (Burglary rate)",
      explanations: {
        confounderType:
          "Ohio\u2019s population and size of its cities could be driving both numbers at once: bigger urban areas tend to have more bill collectors and also more burglaries. So they rise and fall together even if one isn\u2019t causing the other.",
        twoSeperateMediatorType:
          "When more people fall behind on payments, more bill collectors are hired, and the same financial stress can push some people toward burglary. Also, increased debt collection can lead to damaged credit and housing instability for some, which may increase the chance of burglary in affected communities.",
        chainMediatorsType:
          "If burglaries increase, residents and businesses may spend more on security and insurance, raising costs and leaving more people behind on bills. More unpaid bills then lead companies to hire more bill collectors.",
      },
    },
  },
  {
    id: "correlation-3636",
    labels: {
      A: "Annual US household spending on household furnishings and equipment (Household spend)",
      B: "Lennar's stock price (LEN) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 1518.0,
        value2: 20.87,
      },
      {
        label: "2003",
        value1: 1497.0,
        value2: 22.86,
      },
      {
        label: "2004",
        value1: 1646.0,
        value2: 47.18,
      },
      {
        label: "2005",
        value1: 1767.0,
        value2: 55.71,
      },
      {
        label: "2006",
        value1: 1708.0,
        value2: 60.15,
      },
      {
        label: "2007",
        value1: 1797.0,
        value2: 50.67,
      },
      {
        label: "2008",
        value1: 1624.0,
        value2: 17.43,
      },
      {
        label: "2009",
        value1: 1506.0,
        value2: 8.45,
      },
      {
        label: "2010",
        value1: 1467.0,
        value2: 12.59,
      },
      {
        label: "2011",
        value1: 1514.0,
        value2: 18.57,
      },
      {
        label: "2012",
        value1: 1580.0,
        value2: 19.73,
      },
      {
        label: "2013",
        value1: 1542.0,
        value2: 39.27,
      },
      {
        label: "2014",
        value1: 1581.0,
        value2: 38.49,
      },
      {
        label: "2015",
        value1: 1818.0,
        value2: 44.22,
      },
      {
        label: "2016",
        value1: 1829.0,
        value2: 47.33,
      },
      {
        label: "2017",
        value1: 1987.0,
        value2: 42.66,
      },
      {
        label: "2018",
        value1: 2025.0,
        value2: 63.93,
      },
      {
        label: "2019",
        value1: 2098.0,
        value2: 38.56,
      },
      {
        label: "2020",
        value1: 2346.0,
        value2: 56.07,
      },
      {
        label: "2021",
        value1: 2701.0,
        value2: 76.68,
      },
      {
        label: "2022",
        value1: 2606.0,
        value2: 115.84,
      },
    ],
    forward: {
      title:
        "Annual US household spending on household furnishings and equipment (Household spend) correlates with Lennar's stock price (LEN) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is strong, people buy more home furnishings and investors also bid up homebuilder stocks like Lennar. When the economy weakens, both household furnishing purchases and the stock price can fall together.",
        twoSeperateMediatorType:
          "Higher spending on furnishings can signal that more homes are being bought and moved into, which can boost Lennar\u2019s sales outlook and stock price. It can also reflect greater consumer confidence and easier access to credit, making investors expect stronger housing demand and pushing the stock up.",
        chainMediatorsType:
          "If Lennar\u2019s stock price rises, it can encourage more construction and home buying activity as the company expands and the market gets more optimistic. That can lead to more people moving or upgrading homes, which increases purchases of household furnishings and equipment.",
      },
    },
    backward: {
      title:
        "Lennar's stock price (LEN) (Stock price) correlates with Annual US household spending on household furnishings and equipment (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is strong, more people buy homes and investors value homebuilders higher, which can lift Lennar\u2019s stock. That same strong economy also gives households more money and confidence to spend on furniture and home equipment.",
        twoSeperateMediatorType:
          "If Lennar\u2019s stock rises because investors expect more homebuilding, that can encourage more building activity and new-home deliveries, leading buyers to spend more on furnishing those homes. Separately, a rising stock can make it easier and cheaper for the company to raise money, helping it offer deals or expand supply, which can also result in more households buying and furnishing homes.",
        chainMediatorsType:
          "When households start spending more on home furnishings, it can signal stronger demand for housing-related goods and a healthier housing market. That can feed into higher home sales and construction activity, improving homebuilder profits and leading investors to bid up Lennar\u2019s stock.",
      },
    },
  },
  {
    id: "correlation-3643",
    labels: {
      A: "Robberies in Nebraska (Robbery rate)",
      B: "Cigarette Smoking Rate for US adults (Percentage)",
    },
    data: [
      {
        label: "2001",
        value1: 65.6,
        value2: 22.8,
      },
      {
        label: "2002",
        value1: 78.7,
        value2: 22.5,
      },
      {
        label: "2003",
        value1: 67.1,
        value2: 21.6,
      },
      {
        label: "2004",
        value1: 65.1,
        value2: 20.9,
      },
      {
        label: "2005",
        value1: 59.2,
        value2: 20.9,
      },
      {
        label: "2006",
        value1: 64.2,
        value2: 20.8,
      },
      {
        label: "2007",
        value1: 62.8,
        value2: 19.8,
      },
      {
        label: "2008",
        value1: 72.7,
        value2: 20.6,
      },
      {
        label: "2009",
        value1: 67.9,
        value2: 20.6,
      },
      {
        label: "2010",
        value1: 55.7,
        value2: 19.3,
      },
      {
        label: "2011",
        value1: 53.9,
        value2: 19.0,
      },
      {
        label: "2012",
        value1: 60.8,
        value2: 18.1,
      },
      {
        label: "2013",
        value1: 55.4,
        value2: 17.8,
      },
      {
        label: "2014",
        value1: 55.4,
        value2: 16.8,
      },
      {
        label: "2015",
        value1: 52.5,
        value2: 15.1,
      },
      {
        label: "2016",
        value1: 49.6,
        value2: 15.5,
      },
      {
        label: "2017",
        value1: 53.2,
        value2: 14.0,
      },
      {
        label: "2018",
        value1: 38.2,
        value2: 13.7,
      },
      {
        label: "2019",
        value1: 41.1,
        value2: 14.0,
      },
      {
        label: "2020",
        value1: 41.2,
        value2: 12.5,
      },
      {
        label: "2021",
        value1: 31.7,
        value2: 11.5,
      },
    ],
    forward: {
      title:
        "Robberies in Nebraska (Robbery rate) correlates with Cigarette Smoking Rate for US adults (Percentage)",
      explanations: {
        confounderType:
          "Economic hardship can lead to more robberies and also make more people smoke to cope with stress. If Nebraska is going through tougher times, both numbers could rise together.",
        twoSeperateMediatorType:
          "More robberies can make people feel less safe and more anxious, and some may smoke more to calm down. Robberies can also strain families and communities, leading to more stress-related habits like smoking.",
        chainMediatorsType:
          "Higher smoking rates can worsen health and increase medical bills, leaving some people with serious financial pressure. That pressure can lead to instability and desperation, which can increase robbery.",
      },
    },
    backward: {
      title:
        "Cigarette Smoking Rate for US adults (Percentage) correlates with Robberies in Nebraska (Robbery rate)",
      explanations: {
        confounderType:
          "Economic stress and unemployment can rise and fall across the country, affecting both how many adults smoke and how often robberies happen in Nebraska. When money is tight, some people smoke more to cope and more people may turn to theft.",
        twoSeperateMediatorType:
          "Higher smoking can be a sign of higher stress and heavier substance use in a community, which can make arguments, risky behavior, and theft more likely. It can also drain household budgets, pushing some people into financial desperation that increases the chance of robbery.",
        chainMediatorsType:
          "If robberies increase, people may feel less safe and more anxious, leading to more chronic stress. That stress can disturb sleep and mood and some adults may start smoking or smoke more as a way to cope.",
      },
    },
  },
  {
    id: "correlation-3769",
    labels: {
      A: "Associates degrees awarded in Engineering (Degrees awarded)",
      B: "The number of physicists in Michigan (Physicists)",
    },
    data: [
      {
        label: "2011",
        value1: 2825.0,
        value2: 210.0,
      },
      {
        label: "2012",
        value1: 3382.0,
        value2: 220.0,
      },
      {
        label: "2013",
        value1: 3732.0,
        value2: 260.0,
      },
      {
        label: "2014",
        value1: 4306.0,
        value2: 350.0,
      },
      {
        label: "2015",
        value1: 4875.0,
        value2: 380.0,
      },
      {
        label: "2016",
        value1: 5278.0,
        value2: 410.0,
      },
      {
        label: "2017",
        value1: 5915.0,
        value2: 580.0,
      },
      {
        label: "2018",
        value1: 6408.0,
        value2: 510.0,
      },
      {
        label: "2019",
        value1: 6367.0,
        value2: 530.0,
      },
      {
        label: "2020",
        value1: 6518.0,
        value2: 500.0,
      },
      {
        label: "2021",
        value1: 6316.0,
        value2: 500.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Engineering (Degrees awarded) correlates with The number of physicists in Michigan (Physicists)",
      explanations: {
        confounderType:
          "When Michigan\u2019s economy and public funding for technical education and research are strong, community colleges graduate more engineering students and the state also attracts and keeps more physicists. When funding and job opportunities drop, both numbers tend to fall.",
        twoSeperateMediatorType:
          "More engineering graduates can lead to more local high\u2011tech manufacturing and engineering firms setting up or expanding in the state, which then creates jobs for physicists. It can also lead to more research partnerships and lab projects at universities and companies, which increases demand for physicists.",
        chainMediatorsType:
          "A larger physicist workforce can help bring more research grants and advanced labs into the state. Those labs attract tech companies and internship programs, making engineering programs more appealing and increasing the number of associate engineering degrees awarded.",
      },
    },
    backward: {
      title:
        "The number of physicists in Michigan (Physicists) correlates with Associates degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "When Michigan invests more in science and technology overall, it tends to hire more physicists and also leads colleges to graduate more people with engineering associate degrees. When investment falls, both numbers drop.",
        twoSeperateMediatorType:
          "Having more physicists can create more local industry research projects and partnerships, which pushes community colleges to expand engineering programs and award more degrees. It can also raise interest in technical careers through outreach and visibility, leading more students to enroll and complete engineering associate degrees.",
        chainMediatorsType:
          "When more engineering associate degrees are awarded, local employers can grow and attract more high-tech companies. That growth can increase research activity and university funding, which eventually leads to hiring more physicists in Michigan.",
      },
    },
  },
  {
    id: "correlation-3784",
    labels: {
      A: "Number of Movies Released Annually (Number of movies)",
      B: "US hotel industry's revenue per available room (USD)",
    },
    data: [
      {
        label: "2001",
        value1: 482.0,
        value2: 49.91,
      },
      {
        label: "2002",
        value1: 479.0,
        value2: 48.71,
      },
      {
        label: "2003",
        value1: 506.0,
        value2: 48.92,
      },
      {
        label: "2004",
        value1: 551.0,
        value2: 52.8,
      },
      {
        label: "2005",
        value1: 547.0,
        value2: 57.37,
      },
      {
        label: "2006",
        value1: 608.0,
        value2: 61.79,
      },
      {
        label: "2007",
        value1: 631.0,
        value2: 65.57,
      },
      {
        label: "2008",
        value1: 608.0,
        value2: 64.25,
      },
      {
        label: "2009",
        value1: 521.0,
        value2: 53.57,
      },
      {
        label: "2010",
        value1: 536.0,
        value2: 56.48,
      },
      {
        label: "2011",
        value1: 601.0,
        value2: 61.07,
      },
      {
        label: "2012",
        value1: 669.0,
        value2: 65.16,
      },
      {
        label: "2013",
        value1: 686.0,
        value2: 68.69,
      },
      {
        label: "2014",
        value1: 708.0,
        value2: 73.37,
      },
    ],
    forward: {
      title:
        "Number of Movies Released Annually (Number of movies) correlates with US hotel industry's revenue per available room (USD)",
      explanations: {
        confounderType:
          "When the economy is doing well, studios can afford to release more films and more people travel, letting hotels charge more per room. When the economy is weak, both movie releases and hotel room revenue tend to drop.",
        twoSeperateMediatorType:
          "More film releases can lead to more premieres, festivals, and industry events, which bring crews and fans into cities and fill hotel rooms. More releases can also boost tourism to filming locations and theme attractions, increasing hotel demand and revenue per room.",
        chainMediatorsType:
          "When hotels make more money per room, it often reflects heavier travel and busier cities, which can draw more spending into local businesses and entertainment. With more money and demand flowing around, studios may ramp up production and end up releasing more movies.",
      },
    },
    backward: {
      title:
        "US hotel industry's revenue per available room (USD) correlates with Number of Movies Released Annually (Number of movies)",
      explanations: {
        confounderType:
          "In strong economic years, more people travel and pay higher hotel rates, and film studios also have more money and confidence to release more movies. In weaker years, both hotel revenue and movie releases tend to fall.",
        twoSeperateMediatorType:
          "When hotels are doing well, more big events and conventions get hosted and promoted, which can lead to more films being produced or scheduled to release around those events. Also, strong hotel business often signals booming tourism and local spending, encouraging studios to launch more movies to capture that demand.",
        chainMediatorsType:
          "If more movies are released, there are more premieres, press tours, and festival appearances. These bring more cast, crew, media, and fans to travel, which increases hotel bookings and allows hotels to charge more per room.",
      },
    },
  },
  {
    id: "correlation-3790",
    labels: {
      A: "The price of gold (In USD per ounce)",
      B: "BHP Group's stock price (BHP) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 309.73,
        value2: 8.69,
      },
      {
        label: "2003",
        value1: 363.38,
        value2: 9.72,
      },
      {
        label: "2004",
        value1: 409.72,
        value2: 15.55,
      },
      {
        label: "2005",
        value1: 444.74,
        value2: 20.41,
      },
      {
        label: "2006",
        value1: 603.46,
        value2: 28.91,
      },
      {
        label: "2007",
        value1: 695.39,
        value2: 33.53,
      },
      {
        label: "2008",
        value1: 871.96,
        value2: 60.05,
      },
      {
        label: "2009",
        value1: 972.35,
        value2: 37.08,
      },
      {
        label: "2010",
        value1: 1224.53,
        value2: 66.69,
      },
      {
        label: "2011",
        value1: 1571.52,
        value2: 79.32,
      },
      {
        label: "2012",
        value1: 1668.98,
        value2: 63.08,
      },
      {
        label: "2013",
        value1: 1411.23,
        value2: 67.8,
      },
      {
        label: "2014",
        value1: 1291.88,
        value2: 56.97,
      },
    ],
    forward: {
      title:
        "The price of gold (In USD per ounce) correlates with BHP Group's stock price (BHP) (Stock price)",
      explanations: {
        confounderType:
          "Big shifts in global investor fear or confidence can push people to buy more gold while also moving mining stocks like BHP up or down. When that overall mood changes, both prices can move together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "When gold becomes more valuable, it can lift overall interest and valuations in the mining sector, which can help BHP\u2019s share price. At the same time, higher gold prices can influence currency moves (like a weaker U.S. dollar), which can raise the U.S.-dollar value of BHP\u2019s internationally earned profits and support the stock.",
        chainMediatorsType:
          "If BHP\u2019s share price rises, it can signal strength in commodities and mining, drawing more money into the broader resources space. That shift can spill into precious metals trading, increasing demand for gold and pushing its price higher.",
      },
    },
    backward: {
      title:
        "BHP Group's stock price (BHP) (Stock price) correlates with The price of gold (In USD per ounce)",
      explanations: {
        confounderType:
          "Big global shifts in investor mood (like fear of recession or financial stress) can push people into safe-haven assets like gold while also dragging down mining and industrial stocks such as BHP. When risk appetite returns, gold can fall and BHP can rise at the same time, creating a correlation.",
        twoSeperateMediatorType:
          "If BHP rises, it can lift confidence in the mining and resources sector, which may attract more money into commodities broadly and support gold prices. If BHP rises, it can also strengthen the Australian dollar and affect currency moves that change the U.S. dollar gold price.",
        chainMediatorsType:
          "When gold prices jump, it can signal rising inflation worries and market stress, which can lead to expectations of higher interest rates. Higher expected rates can strengthen the U.S. dollar and tighten financial conditions, which can pressure global growth expectations and weigh on BHP\u2019s share price.",
      },
    },
  },
  {
    id: "correlation-4175",
    labels: {
      A: "Movie ticket sales in the U.S. and Canada by year (Millions)",
      B: "Number of Las Vegas Hotel Room Check-Ins (Rooms)",
    },
    data: [
      {
        label: "1980",
        value1: 1022000000000.0,
        value2: 45815.0,
      },
      {
        label: "1981",
        value1: 1067000000000.0,
        value2: 49614.0,
      },
      {
        label: "1982",
        value1: 1175000000000.0,
        value2: 50270.0,
      },
      {
        label: "1983",
        value1: 1197000000000.0,
        value2: 52529.0,
      },
      {
        label: "1984",
        value1: 1199000000000.0,
        value2: 54129.0,
      },
      {
        label: "1985",
        value1: 1056100000000.0,
        value2: 53067.0,
      },
      {
        label: "1986",
        value1: 1017200000000.0,
        value2: 56494.0,
      },
      {
        label: "1987",
        value1: 1088500000000.0,
        value2: 58494.0,
      },
      {
        label: "1988",
        value1: 1084800000000.0,
        value2: 61394.0,
      },
      {
        label: "1989",
        value1: 1262800000000.0,
        value2: 67391.0,
      },
      {
        label: "1990",
        value1: 1188600000000.0,
        value2: 73730.0,
      },
      {
        label: "1991",
        value1: 1140600000000.0,
        value2: 76879.0,
      },
      {
        label: "1992",
        value1: 1173200000000.0,
        value2: 76523.0,
      },
      {
        label: "1993",
        value1: 1244000000000.0,
        value2: 86053.0,
      },
      {
        label: "1994",
        value1: 1291700000000.0,
        value2: 88560.0,
      },
      {
        label: "1995",
        value1: 1262600000000.0,
        value2: 90046.0,
      },
      {
        label: "1996",
        value1: 1338600000000.0,
        value2: 99072.0,
      },
      {
        label: "1997",
        value1: 1387700000000.0,
        value2: 105347.0,
      },
      {
        label: "1998",
        value1: 1480700000000.0,
        value2: 109365.0,
      },
      {
        label: "1999",
        value1: 1465200000000.0,
        value2: 120294.0,
      },
      {
        label: "2000",
        value1: 1420800000000.0,
        value2: 124270.0,
      },
      {
        label: "2001",
        value1: 1487300000000.0,
        value2: 126610.0,
      },
      {
        label: "2002",
        value1: 1575700000000.0,
        value2: 126787.0,
      },
      {
        label: "2003",
        value1: 1532300000000.0,
        value2: 130482.0,
      },
      {
        label: "2004",
        value1: 1510500000000.0,
        value2: 131503.0,
      },
      {
        label: "2005",
        value1: 1379100000000.0,
        value2: 133186.0,
      },
      {
        label: "2006",
        value1: 1406000000000.0,
        value2: 132605.0,
      },
      {
        label: "2007",
        value1: 1404600000000.0,
        value2: 132947.0,
      },
      {
        label: "2008",
        value1: 1341300000000.0,
        value2: 140529.0,
      },
      {
        label: "2009",
        value1: 1412700000000.0,
        value2: 148941.0,
      },
      {
        label: "2010",
        value1: 1339100000000.0,
        value2: 148935.0,
      },
      {
        label: "2011",
        value1: 1282920000000.0,
        value2: 150161.0,
      },
      {
        label: "2012",
        value1: 1380920000000.0,
        value2: 150481.0,
      },
      {
        label: "2013",
        value1: 1329170000000.0,
        value2: 150593.0,
      },
    ],
    forward: {
      title:
        "Movie ticket sales in the U.S. and Canada by year (Millions) correlates with Number of Las Vegas Hotel Room Check-Ins (Rooms)",
      explanations: {
        confounderType:
          "When the economy is strong and people have more disposable income, they both go to the movies more and take more trips that include staying in Las Vegas hotels. When money is tight, both activities drop at the same time.",
        twoSeperateMediatorType:
          "A big year for movies can spark more people to plan vacations and weekend getaways, and some of those trips end up in Las Vegas hotels. It can also drive more promotion and hype around entertainment travel, nudging more people to book Vegas stays.",
        chainMediatorsType:
          "More Las Vegas hotel stays can lead to more people going to shows and attractions, which increases overall interest in entertainment. That rising interest can later translate into more people back home buying movie tickets.",
      },
    },
    backward: {
      title:
        "Number of Las Vegas Hotel Room Check-Ins (Rooms) correlates with Movie ticket sales in the U.S. and Canada by year (Millions)",
      explanations: {
        confounderType:
          "When the economy is doing well, more people can afford trips to Las Vegas and also spend more on going to the movies. When times are tight, both travel and movie-going drop, making them move together.",
        twoSeperateMediatorType:
          "More Las Vegas hotel check-ins can signal a surge in tourism and leisure spending, which often lines up with people also going to theaters more. More check-ins can also coincide with big conventions and events that boost travel and advertising buzz, which can increase movie attendance.",
        chainMediatorsType:
          "A year with strong movie ticket sales can reflect a general rise in entertainment excitement and social outings. That can lead to more people planning leisure trips, choosing Las Vegas as a destination, and ultimately booking hotel rooms there.",
      },
    },
  },
  {
    id: "correlation-4241",
    labels: {
      A: "The number of Breweries in the United States (Number of breweries)",
      B: "Monster Beverage's stock price (MNST) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 1575.0,
        value2: 0.04,
      },
      {
        label: "2003",
        value1: 1629.0,
        value2: 0.04,
      },
      {
        label: "2004",
        value1: 1635.0,
        value2: 0.09,
      },
      {
        label: "2005",
        value1: 1612.0,
        value2: 0.39,
      },
      {
        label: "2006",
        value1: 1741.0,
        value2: 1.68,
      },
      {
        label: "2007",
        value1: 1805.0,
        value2: 2.82,
      },
      {
        label: "2008",
        value1: 1896.0,
        value2: 3.7,
      },
      {
        label: "2009",
        value1: 1933.0,
        value2: 2.75,
      },
      {
        label: "2010",
        value1: 2131.0,
        value2: 3.22,
      },
      {
        label: "2011",
        value1: 2525.0,
        value2: 4.39,
      },
      {
        label: "2012",
        value1: 2670.0,
        value2: 7.8,
      },
      {
        label: "2013",
        value1: 3162.0,
        value2: 8.95,
      },
      {
        label: "2014",
        value1: 4014.0,
        value2: 11.31,
      },
      {
        label: "2015",
        value1: 4847.0,
        value2: 18.23,
      },
      {
        label: "2016",
        value1: 5780.0,
        value2: 24.42,
      },
      {
        label: "2017",
        value1: 6767.0,
        value2: 22.33,
      },
      {
        label: "2018",
        value1: 7722.0,
        value2: 31.7,
      },
      {
        label: "2019",
        value1: 8557.0,
        value2: 24.28,
      },
      {
        label: "2020",
        value1: 9092.0,
        value2: 31.98,
      },
      {
        label: "2021",
        value1: 9384.0,
        value2: 46.26,
      },
      {
        label: "2022",
        value1: 9709.0,
        value2: 47.76,
      },
    ],
    forward: {
      title:
        "The number of Breweries in the United States (Number of breweries) correlates with Monster Beverage's stock price (MNST) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, more people start or expand breweries, and investors also tend to bid up many consumer-brand stocks. So both numbers can rise together because they\u2019re reacting to the same broader economic conditions.",
        twoSeperateMediatorType:
          "More breweries can increase alcohol-focused social events and nightlife, which can raise demand for energy drinks as mixers or late-night pick-me-ups, helping the company\u2019s sales and stock price. Separately, a growing brewery scene can attract more convenience stores and bars to stock more beverage options, improving shelf presence and boosting revenue expectations.",
        chainMediatorsType:
          "A rising stock price can make the company seem like a hot growth story, pulling more attention and spending into the broader beverage scene. That increased buzz and investment can encourage entrepreneurs to open more breweries over time.",
      },
    },
    backward: {
      title:
        "Monster Beverage's stock price (MNST) (Stock price) correlates with The number of Breweries in the United States (Number of breweries)",
      explanations: {
        confounderType:
          "When the economy is strong and consumer spending rises, investors may bid up the stock while more entrepreneurs open breweries. When the economy weakens, the stock can fall and fewer breweries get started.",
        twoSeperateMediatorType:
          "If the stock does well, the company may spend more on marketing and promotions, which can boost interest in drinks and make the overall beverage scene look more attractive, encouraging more brewery openings. If the stock does well, it can also make the company seem like a successful part of a thriving industry, drawing more money and attention into beverages generally and helping new breweries get funded.",
        chainMediatorsType:
          "As more breweries open, the variety and visibility of drinks increases, which can pull more people into buying beverages at stores and events. That broader rise in beverage demand can lift sales expectations for large drink brands, leading investors to push the stock price higher.",
      },
    },
  },
  {
    id: "correlation-4395",
    labels: {
      A: "Master's degrees awarded in Communications technologies (Degrees awarded)",
      B: "The number of electrical engineers in Alabama (Electrical Engineers)",
    },
    data: [
      {
        label: "2012",
        value1: 497.0,
        value2: 4020.0,
      },
      {
        label: "2013",
        value1: 577.0,
        value2: 5290.0,
      },
      {
        label: "2014",
        value1: 577.0,
        value2: 5190.0,
      },
      {
        label: "2015",
        value1: 554.0,
        value2: 5030.0,
      },
      {
        label: "2016",
        value1: 491.0,
        value2: 4330.0,
      },
      {
        label: "2017",
        value1: 539.0,
        value2: 4440.0,
      },
      {
        label: "2018",
        value1: 529.0,
        value2: 4540.0,
      },
      {
        label: "2019",
        value1: 535.0,
        value2: 4600.0,
      },
      {
        label: "2020",
        value1: 539.0,
        value2: 4420.0,
      },
      {
        label: "2021",
        value1: 517.0,
        value2: 4130.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Communications technologies (Degrees awarded) correlates with The number of electrical engineers in Alabama (Electrical Engineers)",
      explanations: {
        confounderType:
          "A growing tech industry in Alabama could increase hiring of electrical engineers and also encourage more people to pursue master\u2019s programs in communications technologies. When the local economy shifts toward high-tech work, both numbers can rise together.",
        twoSeperateMediatorType:
          "More master\u2019s graduates in communications technologies can lead to more tech startups and telecom projects, which then hire more electrical engineers. It can also attract new research labs and company expansions to the state, which creates additional electrical engineering jobs.",
        chainMediatorsType:
          "When Alabama has more electrical engineers, companies may expand and win more communications-related contracts, growing the local tech sector. That growth can lead universities to add or enlarge graduate programs and draw more students, increasing the number of master\u2019s degrees awarded in communications technologies.",
      },
    },
    backward: {
      title:
        "The number of electrical engineers in Alabama (Electrical Engineers) correlates with Master's degrees awarded in Communications technologies (Degrees awarded)",
      explanations: {
        confounderType:
          "When Alabama\u2019s tech economy is doing well, companies hire more electrical engineers and universities expand communications technology master\u2019s programs. So both numbers can rise and fall together because of the same underlying boom or slowdown.",
        twoSeperateMediatorType:
          "Having more electrical engineers can lead to more industry partnerships and internships, which encourages more people to enroll and finish communications technology master\u2019s degrees. It can also attract more research funding and new university labs, which increases the capacity to award more of those degrees.",
        chainMediatorsType:
          "When more communications technology master\u2019s degrees are awarded, more graduates with advanced skills enter the local tech workforce. That growth can lead companies to expand communications-related projects, create more engineering roles, and ultimately employ more electrical engineers in the state.",
      },
    },
  },
  {
    id: "correlation-4559",
    labels: {
      A: "Bachelor's degrees awarded in Engineering technologies (Degrees awarded)",
      B: "Renewable energy production in Cameroon (Billion kWh)",
    },
    data: [
      {
        label: "2012",
        value1: 17283.0,
        value2: 4.21744,
      },
      {
        label: "2013",
        value1: 17010.0,
        value2: 4.33427,
      },
      {
        label: "2014",
        value1: 16807.0,
        value2: 4.33727,
      },
      {
        label: "2015",
        value1: 17253.0,
        value2: 4.32541,
      },
      {
        label: "2016",
        value1: 17159.0,
        value2: 4.34127,
      },
      {
        label: "2017",
        value1: 18119.0,
        value2: 5.0551,
      },
      {
        label: "2018",
        value1: 18728.0,
        value2: 4.99277,
      },
      {
        label: "2019",
        value1: 19620.0,
        value2: 5.36,
      },
      {
        label: "2020",
        value1: 19788.0,
        value2: 5.4544,
      },
      {
        label: "2021",
        value1: 19004.0,
        value2: 5.02,
      },
    ],
    forward: {
      title:
        "Bachelor's degrees awarded in Engineering technologies (Degrees awarded) correlates with Renewable energy production in Cameroon (Billion kWh)",
      explanations: {
        confounderType:
          "Periods of strong government investment and policy focus can lead to both more engineering-technology graduates and more renewable power projects. When the country prioritizes infrastructure and energy, both education output and clean electricity production rise together.",
        twoSeperateMediatorType:
          "More graduates can mean more skilled workers to design, build, and maintain solar, hydro, or wind facilities, which boosts renewable electricity. More graduates can also lead to more local startups and innovation that make renewable projects cheaper and easier to deploy, increasing output.",
        chainMediatorsType:
          "Higher renewable electricity production can make power more reliable and expand electrification, helping schools and training centers run better and attract more students. Over time this improves technical education capacity and completion, leading to more engineering-technology bachelor\u2019s degrees awarded.",
      },
    },
    backward: {
      title:
        "Renewable energy production in Cameroon (Billion kWh) correlates with Bachelor's degrees awarded in Engineering technologies (Degrees awarded)",
      explanations: {
        confounderType:
          "When the economy and government investment improve, the country can build more renewable power projects and also fund universities to graduate more engineering technology students. So both numbers rise together because of broader development, not because one directly causes the other.",
        twoSeperateMediatorType:
          "More renewable power can bring new clean\u2011energy companies and projects that create attractive jobs, which encourages more students to choose and finish engineering technology degrees. It can also improve electricity reliability on campuses and at home, helping students study and complete their programs.",
        chainMediatorsType:
          "Graduating more engineering technology students increases the supply of skilled workers, which helps companies and public agencies design and run more energy projects. That leads to more successful project approvals and construction, and eventually higher renewable electricity production.",
      },
    },
  },
  {
    id: "correlation-4700",
    labels: {
      A: "Global count of operating nuclear power plants (Plants)",
      B: "Nuclear power generation in Spain (Billion kWh)",
    },
    data: [
      {
        label: "1980",
        value1: 245.0,
        value2: 5.186,
      },
      {
        label: "1981",
        value1: 267.0,
        value2: 9.568,
      },
      {
        label: "1982",
        value1: 284.0,
        value2: 8.771,
      },
      {
        label: "1983",
        value1: 306.0,
        value2: 10.661,
      },
      {
        label: "1984",
        value1: 336.0,
        value2: 23.086,
      },
      {
        label: "1985",
        value1: 363.0,
        value2: 28.043,
      },
      {
        label: "1986",
        value1: 389.0,
        value2: 37.46,
      },
      {
        label: "1987",
        value1: 407.0,
        value2: 41.267,
      },
      {
        label: "1988",
        value1: 416.0,
        value2: 48.305,
      },
      {
        label: "1989",
        value1: 420.0,
        value2: 53.748,
      },
      {
        label: "1990",
        value1: 416.0,
        value2: 51.555,
      },
      {
        label: "1991",
        value1: 415.0,
        value2: 52.799,
      },
      {
        label: "1992",
        value1: 418.0,
        value2: 52.993,
      },
      {
        label: "1993",
        value1: 427.0,
        value2: 53.257,
      },
      {
        label: "1994",
        value1: 429.0,
        value2: 52.547,
      },
      {
        label: "1995",
        value1: 434.0,
        value2: 52.682,
      },
      {
        label: "1996",
        value1: 438.0,
        value2: 53.514,
      },
      {
        label: "1997",
        value1: 433.0,
        value2: 52.535,
      },
      {
        label: "1998",
        value1: 430.0,
        value2: 56.043,
      },
      {
        label: "1999",
        value1: 432.0,
        value2: 55.909,
      },
      {
        label: "2000",
        value1: 435.0,
        value2: 59.096,
      },
      {
        label: "2001",
        value1: 438.0,
        value2: 60.523,
      },
      {
        label: "2002",
        value1: 439.0,
        value2: 59.865,
      },
      {
        label: "2003",
        value1: 437.0,
        value2: 58.781,
      },
      {
        label: "2004",
        value1: 438.0,
        value2: 60.426,
      },
      {
        label: "2005",
        value1: 441.0,
        value2: 54.9856,
      },
      {
        label: "2006",
        value1: 435.0,
        value2: 57.4311,
      },
      {
        label: "2007",
        value1: 439.0,
        value2: 52.7145,
      },
      {
        label: "2008",
        value1: 438.0,
        value2: 56.4499,
      },
      {
        label: "2009",
        value1: 437.0,
        value2: 50.5849,
      },
      {
        label: "2010",
        value1: 441.0,
        value2: 59.387,
      },
      {
        label: "2011",
        value1: 435.0,
        value2: 55.236,
      },
      {
        label: "2012",
        value1: 437.0,
        value2: 58.827,
      },
      {
        label: "2013",
        value1: 434.0,
        value2: 54.473,
      },
      {
        label: "2014",
        value1: 438.0,
        value2: 54.961,
      },
      {
        label: "2015",
        value1: 441.0,
        value2: 54.755,
      },
      {
        label: "2016",
        value1: 447.0,
        value2: 56.1,
      },
      {
        label: "2017",
        value1: 448.0,
        value2: 55.54,
      },
      {
        label: "2018",
        value1: 450.0,
        value2: 53.234,
      },
      {
        label: "2019",
        value1: 443.0,
        value2: 55.824,
      },
      {
        label: "2020",
        value1: 442.0,
        value2: 55.757,
      },
      {
        label: "2021",
        value1: 447.0,
        value2: 54.0402,
      },
    ],
    forward: {
      title:
        "Global count of operating nuclear power plants (Plants) correlates with Nuclear power generation in Spain (Billion kWh)",
      explanations: {
        confounderType:
          "When energy demand rises and governments prioritize low-carbon electricity, many countries keep more nuclear plants running and Spain also produces more nuclear electricity. The same global push can increase both numbers at the same time.",
        twoSeperateMediatorType:
          "As more nuclear plants operate worldwide, the nuclear industry grows and components, fuel services, and know-how become easier and cheaper to obtain, helping Spain generate more. Also, a larger global fleet strengthens shared safety standards and operating experience, reducing downtime and allowing Spain\u2019s reactors to run more consistently.",
        chainMediatorsType:
          "If Spain produces more nuclear electricity, it can be seen as proof that nuclear power works well, which influences other countries\u2019 policies and investment decisions. Those decisions lead to new projects, then completed builds, and finally more operating plants worldwide.",
      },
    },
    backward: {
      title:
        "Nuclear power generation in Spain (Billion kWh) correlates with Global count of operating nuclear power plants (Plants)",
      explanations: {
        confounderType:
          "Worldwide energy demand and energy policy trends can rise and fall over time. When they push more nuclear investment globally, Spain may also run its reactors more, so both numbers move together.",
        twoSeperateMediatorType:
          "Higher nuclear output in Spain can be seen as proof that nuclear plants can provide steady power, which can encourage other countries to keep or expand their fleets. Separately, strong performance in Spain can support nuclear industry know-how and suppliers, making it easier for new plants abroad to be built or kept running.",
        chainMediatorsType:
          "When more nuclear plants are operating around the world, the nuclear supply chain gets larger and more reliable. That can improve access to fuel, parts, and expertise, which helps Spain keep its reactors available more often and generate more electricity.",
      },
    },
  },
  {
    id: "correlation-4742",
    labels: {
      A: "Associates degrees awarded in Mathematics and statistics (Degrees awarded)",
      B: "The number of electricians in Idaho (Electricians)",
    },
    data: [
      {
        label: "2011",
        value1: 1644.0,
        value2: 2780.0,
      },
      {
        label: "2012",
        value1: 1529.0,
        value2: 2710.0,
      },
      {
        label: "2013",
        value1: 1801.0,
        value2: 2780.0,
      },
      {
        label: "2014",
        value1: 2148.0,
        value2: 3060.0,
      },
      {
        label: "2015",
        value1: 2697.0,
        value2: 3390.0,
      },
      {
        label: "2016",
        value1: 3027.0,
        value2: 3660.0,
      },
      {
        label: "2017",
        value1: 3454.0,
        value2: 3880.0,
      },
      {
        label: "2018",
        value1: 4135.0,
        value2: 4270.0,
      },
      {
        label: "2019",
        value1: 4632.0,
        value2: 4580.0,
      },
      {
        label: "2020",
        value1: 4851.0,
        value2: 4950.0,
      },
      {
        label: "2021",
        value1: 4842.0,
        value2: 4630.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Mathematics and statistics (Degrees awarded) correlates with The number of electricians in Idaho (Electricians)",
      explanations: {
        confounderType:
          "Idaho\u2019s overall population growth and economic expansion can lead to both more college graduates in math and statistics and more jobs for electricians. When the state is growing, schools and construction both scale up at the same time.",
        twoSeperateMediatorType:
          "More math and statistics graduates can boost local tech and data-heavy businesses, which increases building and equipment needs and leads to hiring more electricians. Also, these graduates can help utilities and construction firms plan and optimize projects better, which can expand the amount of electrical work and raise electrician employment.",
        chainMediatorsType:
          "A larger electrician workforce can speed up new housing and commercial construction, making it easier for families and students to move into the state. That growth can increase college enrollment and funding, which can result in more math and statistics degrees being awarded.",
      },
    },
    backward: {
      title:
        "The number of electricians in Idaho (Electricians) correlates with Associates degrees awarded in Mathematics and statistics (Degrees awarded)",
      explanations: {
        confounderType:
          "When Idaho\u2019s economy is doing well, more people are hired into trades like electrical work and more people enroll in community college programs, including math and statistics. So both numbers rise and fall together because the state\u2019s overall job market and population are changing.",
        twoSeperateMediatorType:
          "If there are more electricians, local employers may partner with colleges and push for more technical coursework, leading schools to create or expand math-heavy programs and award more related degrees. Also, a bigger electrician workforce can mean more demand for planners, estimators, and tech support roles, encouraging students to choose math and statistics programs to qualify for those jobs.",
        chainMediatorsType:
          "When more math and statistics associate degrees are awarded, more graduates take data-focused jobs that help companies grow and bid on more projects across the state. That growth increases construction activity, which raises demand for electrical work and leads to more electricians being employed.",
      },
    },
  },
  {
    id: "correlation-4795",
    labels: {
      A: "US household spending on public transportation (Household spend)",
      B: "Visitors to Disney Worlds Magic Kingdom (Disney Visitors)",
    },
    data: [
      {
        label: "2007",
        value1: 1.08385,
        value2: 17.06,
      },
      {
        label: "2008",
        value1: 1.01612,
        value2: 17.063,
      },
      {
        label: "2009",
        value1: 0.976216,
        value2: 17.233,
      },
      {
        label: "2010",
        value1: 1.02476,
        value2: 16.972,
      },
      {
        label: "2011",
        value1: 1.03812,
        value2: 17.142,
      },
      {
        label: "2012",
        value1: 1.05361,
        value2: 17.536,
      },
      {
        label: "2013",
        value1: 1.05088,
        value2: 18.588,
      },
      {
        label: "2014",
        value1: 1.08608,
        value2: 19.332,
      },
      {
        label: "2015",
        value1: 1.18082,
        value2: 20.492,
      },
      {
        label: "2016",
        value1: 1.08705,
        value2: 20.395,
      },
      {
        label: "2017",
        value1: 1.18548,
        value2: 20.45,
      },
      {
        label: "2018",
        value1: 1.33608,
        value2: 20.859,
      },
      {
        label: "2019",
        value1: 1.23897,
        value2: 20.963,
      },
      {
        label: "2020",
        value1: 0.4288,
        value2: 6.941,
      },
      {
        label: "2021",
        value1: 0.675353,
        value2: 12.691,
      },
    ],
    forward: {
      title:
        "US household spending on public transportation (Household spend) correlates with Visitors to Disney Worlds Magic Kingdom (Disney Visitors)",
      explanations: {
        confounderType:
          "When the economy is doing well, families both spend more on getting around (including public transportation) and take more vacations, including trips to Disney\u2019s Magic Kingdom. When money is tighter, both tend to drop at the same time.",
        twoSeperateMediatorType:
          "Higher public transportation spending can reflect more city living and easier access to airports, which can make it simpler for families to fly to Orlando and visit Disney. It can also go along with higher overall travel habits, leading to more planning and budgeting for big trips like Disney vacations.",
        chainMediatorsType:
          "When Disney gets busier, Orlando sees more tourism and adds more transportation services like buses and shuttles. That growth can feed into national transportation demand and spending patterns, which shows up as higher household spending on public transportation.",
      },
    },
    backward: {
      title:
        "Visitors to Disney Worlds Magic Kingdom (Disney Visitors) correlates with US household spending on public transportation (Household spend)",
      explanations: {
        confounderType:
          "When the economy is doing well, more families can afford vacations to the Magic Kingdom and also spend more on buses, trains, and subways. When money is tight, both kinds of spending drop.",
        twoSeperateMediatorType:
          "Going to the Magic Kingdom can lead families to travel more often afterward, which increases their use of public transportation back home. It can also make people more comfortable using transit while traveling, so they keep using it more in daily life.",
        chainMediatorsType:
          "Higher household spending on public transportation often reflects more travel and mobility, which can expose people to more vacation ideas and destination advertising. That can raise interest in theme-park trips and lead more families to visit the Magic Kingdom.",
      },
    },
  },
  {
    id: "correlation-4828",
    labels: {
      A: "The number of truck drivers in Alabama (Laborers)",
      B: "Toyota Motor's stock price (TM) (Stock price)",
    },
    data: [
      {
        label: "2010",
        value1: 29080.0,
        value2: 84.75,
      },
      {
        label: "2011",
        value1: 29240.0,
        value2: 79.02,
      },
      {
        label: "2012",
        value1: 29030.0,
        value2: 67.39,
      },
      {
        label: "2013",
        value1: 30300.0,
        value2: 94.78,
      },
      {
        label: "2014",
        value1: 30750.0,
        value2: 121.6,
      },
      {
        label: "2015",
        value1: 31280.0,
        value2: 126.23,
      },
      {
        label: "2016",
        value1: 31890.0,
        value2: 121.52,
      },
      {
        label: "2017",
        value1: 30720.0,
        value2: 118.17,
      },
      {
        label: "2018",
        value1: 32170.0,
        value2: 127.43,
      },
      {
        label: "2019",
        value1: 31150.0,
        value2: 114.68,
      },
      {
        label: "2020",
        value1: 32310.0,
        value2: 142.0,
      },
      {
        label: "2021",
        value1: 34630.0,
        value2: 155.81,
      },
      {
        label: "2022",
        value1: 36730.0,
        value2: 186.81,
      },
    ],
    forward: {
      title:
        "The number of truck drivers in Alabama (Laborers) correlates with Toyota Motor's stock price (TM) (Stock price)",
      explanations: {
        confounderType:
          "Big changes in the overall economy or consumer demand can lead to more shipping jobs in Alabama while also pushing Toyota\u2019s stock up or down. When the same economic wave affects both at once, they can move together even without directly influencing each other.",
        twoSeperateMediatorType:
          "More truck drivers can mean more goods are being moved, which can signal stronger sales across retailers and manufacturers, helping Toyota\u2019s stock. More truck drivers can also ease delivery bottlenecks and reduce shipping delays, improving car availability and boosting investor confidence in Toyota.",
        chainMediatorsType:
          "If Toyota\u2019s stock rises, the company and its suppliers may expand production and parts orders. That expansion can increase freight demand through several steps\u2014more shipments, more logistics contracts, more hiring\u2014eventually raising the number of truck drivers in Alabama.",
      },
    },
    backward: {
      title:
        "Toyota Motor's stock price (TM) (Stock price) correlates with The number of truck drivers in Alabama (Laborers)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, Toyota\u2019s stock often rises and companies ship more goods, which increases demand for truck drivers in Alabama. When the economy slows, both can fall at the same time.",
        twoSeperateMediatorType:
          "If Toyota\u2019s stock rises because investors expect higher vehicle sales, Toyota and its suppliers may produce and move more cars and parts, creating more trucking work in Alabama. Separately, a rising stock can also make it easier for Toyota and related businesses to raise money and expand operations, which can indirectly increase transportation jobs.",
        chainMediatorsType:
          "If Alabama needs more truck drivers, that can signal stronger shipping demand and higher movement of vehicles and parts through the region. Investors may interpret that as a sign of improving business conditions for automakers and buy Toyota shares, pushing the stock price up.",
      },
    },
  },
  {
    id: "correlation-4863",
    labels: {
      A: "Number of public school students in 2nd grade (Students)",
      B: "The number of special education teachers in North Carolina (Laborers)",
    },
    data: [
      {
        label: "2012",
        value1: 3729460.0,
        value2: 8530.0,
      },
      {
        label: "2013",
        value1: 3791120.0,
        value2: 8990.0,
      },
      {
        label: "2014",
        value1: 3857200.0,
        value2: 9110.0,
      },
      {
        label: "2015",
        value1: 3842450.0,
        value2: 9950.0,
      },
      {
        label: "2016",
        value1: 3760770.0,
        value2: 9270.0,
      },
      {
        label: "2017",
        value1: 3684090.0,
        value2: 8030.0,
      },
      {
        label: "2018",
        value1: 3653760.0,
        value2: 7080.0,
      },
      {
        label: "2019",
        value1: 3638260.0,
        value2: 6570.0,
      },
      {
        label: "2020",
        value1: 3528800.0,
        value2: 6690.0,
      },
      {
        label: "2021",
        value1: 3519320.0,
        value2: 5160.0,
      },
      {
        label: "2022",
        value1: 3455510.0,
        value2: 4960.0,
      },
    ],
    forward: {
      title:
        "Number of public school students in 2nd grade (Students) correlates with The number of special education teachers in North Carolina (Laborers)",
      explanations: {
        confounderType:
          "North Carolina\u2019s overall school-age population size can raise both the number of 2nd graders and the number of special education teachers. In years or places with more children, schools need more staff across the board.",
        twoSeperateMediatorType:
          "When there are more 2nd graders, districts may get larger education budgets and funding, which lets them hire more special education teachers. Also, more 2nd graders can mean more students needing evaluations and support services, leading districts to add special education teaching positions.",
        chainMediatorsType:
          "If North Carolina hires more special education teachers, schools can expand special education programs and improve support for families. That can encourage more families to enroll their children in public schools, eventually increasing the number of 2nd graders.",
      },
    },
    backward: {
      title:
        "The number of special education teachers in North Carolina (Laborers) correlates with Number of public school students in 2nd grade (Students)",
      explanations: {
        confounderType:
          "When a county\u2019s overall population grows, it tends to have more 2nd graders and also hires more special education teachers to serve a larger student body. So both numbers rise and fall together because the county is bigger or smaller.",
        twoSeperateMediatorType:
          "Hiring more special education teachers can improve support for children with learning needs, which can encourage families to keep their kids enrolled in the local public schools through 2nd grade. It can also make the district more attractive to families moving in, which increases the number of 2nd graders.",
        chainMediatorsType:
          "If there are more 2nd graders, schools may create more classes and expand services. That expansion can increase the number of students who are identified as needing extra help, which then leads the district to hire more special education teachers.",
      },
    },
  },
  {
    id: "correlation-4873",
    labels: {
      A: "Average household spend on Christmas Gifts (Amount dollars)",
      B: "US GDP per capita (US Dollars)",
    },
    data: [
      {
        label: "2009",
        value1: 638.0,
        value2: 46999.0,
      },
      {
        label: "2010",
        value1: 714.0,
        value2: 48358.0,
      },
      {
        label: "2011",
        value1: 764.0,
        value2: 50066.0,
      },
      {
        label: "2012",
        value1: 770.0,
        value2: 51784.4,
      },
      {
        label: "2013",
        value1: 704.0,
        value2: 53291.1,
      },
      {
        label: "2014",
        value1: 720.0,
        value2: 55123.9,
      },
      {
        label: "2015",
        value1: 830.0,
        value2: 56762.7,
      },
      {
        label: "2016",
        value1: 752.0,
        value2: 57866.7,
      },
      {
        label: "2017",
        value1: 862.0,
        value2: 59907.8,
      },
      {
        label: "2018",
        value1: 794.0,
        value2: 62823.3,
      },
      {
        label: "2019",
        value1: 846.0,
        value2: 65120.4,
      },
      {
        label: "2020",
        value1: 852.0,
        value2: 63530.6,
      },
      {
        label: "2021",
        value1: 886.0,
        value2: 70248.6,
      },
      {
        label: "2022",
        value1: 942.0,
        value2: 76399.0,
      },
    ],
    forward: {
      title:
        "Average household spend on Christmas Gifts (Amount dollars) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "When the economy is doing well, many households have steadier jobs and higher incomes. That same prosperity also shows up as higher output per person and makes people more willing and able to spend more on Christmas gifts.",
        twoSeperateMediatorType:
          "Higher Christmas gift spending can boost sales for retailers and shipping companies, which raises business revenue and production overall. It can also lead companies to hire seasonal workers and extend hours, increasing total pay and output across the economy.",
        chainMediatorsType:
          "When output per person rises, businesses tend to raise wages or hire more, so households take home more money. With better finances and confidence, people feel comfortable allocating more of their budget to Christmas gifts.",
      },
    },
    backward: {
      title:
        "US GDP per capita (US Dollars) correlates with Average household spend on Christmas Gifts (Amount dollars)",
      explanations: {
        confounderType:
          "When the economy is generally doing well, companies hire more and pay more, which raises both income per person and what families feel comfortable spending on Christmas gifts. When times are tougher, both tend to drop.",
        twoSeperateMediatorType:
          "As income per person rises, wages and take-home pay often rise too, so households have more money available for gifts. At the same time, higher income per person can boost consumer confidence and make people more willing to spend on holiday shopping.",
        chainMediatorsType:
          "If families across the country spend more on Christmas gifts, retailers and delivery companies can see higher sales. That can lead to more hiring, more production, and higher overall output per person.",
      },
    },
  },
  {
    id: "correlation-5057",
    labels: {
      A: "Master's degrees awarded in Engineering (Degrees awarded)",
      B: "The number of civil engineers in Georgia (Civil Engineers)",
    },
    data: [
      {
        label: "2012",
        value1: 40323.0,
        value2: 6600.0,
      },
      {
        label: "2013",
        value1: 40420.0,
        value2: 6200.0,
      },
      {
        label: "2014",
        value1: 42376.0,
        value2: 6070.0,
      },
      {
        label: "2015",
        value1: 46117.0,
        value2: 7700.0,
      },
      {
        label: "2016",
        value1: 51646.0,
        value2: 9400.0,
      },
      {
        label: "2017",
        value1: 52826.0,
        value2: 9660.0,
      },
      {
        label: "2018",
        value1: 51723.0,
        value2: 9180.0,
      },
      {
        label: "2019",
        value1: 49701.0,
        value2: 7380.0,
      },
      {
        label: "2020",
        value1: 47277.0,
        value2: 6700.0,
      },
      {
        label: "2021",
        value1: 47257.0,
        value2: 6670.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Engineering (Degrees awarded) correlates with The number of civil engineers in Georgia (Civil Engineers)",
      explanations: {
        confounderType:
          "When Georgia\u2019s economy and construction activity are strong, more people enroll in and finish engineering master\u2019s programs, and more civil engineers are hired in the state. When it slows down, both numbers tend to drop.",
        twoSeperateMediatorType:
          "More engineering master\u2019s graduates can lead to more licensed engineers as graduates complete required experience and exams, increasing the civil engineering workforce in Georgia. It can also attract more engineering firms and projects to Georgia because a bigger talent pool is available, which creates more civil engineering jobs.",
        chainMediatorsType:
          "If Georgia has more civil engineers, more large projects get designed and built, and those projects bring in more engineering companies and funding. That growth expands university programs and scholarships, leading to more people earning engineering master\u2019s degrees.",
      },
    },
    backward: {
      title:
        "The number of civil engineers in Georgia (Civil Engineers) correlates with Master's degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "Georgia\u2019s overall economic growth and construction activity can increase the need for civil engineers and also encourage universities to expand and graduate more engineering master\u2019s students. When the state is booming, both numbers tend to rise together.",
        twoSeperateMediatorType:
          "A larger civil engineering workforce can create more mentoring, internships, and clear career paths, which motivates more students to pursue an engineering master\u2019s degree. It can also lead employers to partner with universities, funding programs and making it easier for students to enroll and finish.",
        chainMediatorsType:
          "When more engineering master\u2019s degrees are awarded, more highly trained engineers enter the job market and raise the state\u2019s technical capacity. That can attract more infrastructure projects and engineering firms to Georgia, which then increases the number of civil engineering jobs and workers in the state.",
      },
    },
  },
  {
    id: "correlation-5062",
    labels: {
      A: "US GDP per capita (US Dollars)",
      B: "The Hershey Company's stock price (HSY) (Stock price)",
    },
    data: [
      {
        label: "2009",
        value1: 46999.0,
        value2: 35.11,
      },
      {
        label: "2010",
        value1: 48358.0,
        value2: 36.01,
      },
      {
        label: "2011",
        value1: 50066.0,
        value2: 47.32,
      },
      {
        label: "2012",
        value1: 51784.4,
        value2: 62.1,
      },
      {
        label: "2013",
        value1: 53291.1,
        value2: 72.86,
      },
      {
        label: "2014",
        value1: 55123.9,
        value2: 97.18,
      },
      {
        label: "2015",
        value1: 56762.7,
        value2: 104.33,
      },
      {
        label: "2016",
        value1: 57866.7,
        value2: 88.16,
      },
      {
        label: "2017",
        value1: 59907.8,
        value2: 103.84,
      },
      {
        label: "2018",
        value1: 62823.3,
        value2: 113.48,
      },
      {
        label: "2019",
        value1: 65120.4,
        value2: 106.18,
      },
      {
        label: "2020",
        value1: 63530.6,
        value2: 147.23,
      },
      {
        label: "2021",
        value1: 70248.6,
        value2: 153.01,
      },
      {
        label: "2022",
        value1: 76399.0,
        value2: 192.88,
      },
    ],
    forward: {
      title:
        "US GDP per capita (US Dollars) correlates with The Hershey Company's stock price (HSY) (Stock price)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, investors feel more optimistic and buy more stocks, pushing up many companies\u2019 share prices. That same strong economy also raises average income per person, so both numbers move together.",
        twoSeperateMediatorType:
          "Higher income per person can lead people to spend more on snacks and candy, which can boost the company\u2019s sales and make the stock more valuable. Higher income can also make investors more willing to pay up for \u201csteady\u201d consumer brands, lifting the share price even if candy sales don\u2019t change much.",
        chainMediatorsType:
          "A rising share price can make the company look stronger and help it raise money more easily to expand factories, hire more workers, or buy other brands. Those expansions can add jobs and business activity that, over time, slightly increase the country\u2019s income per person.",
      },
    },
    backward: {
      title:
        "The Hershey Company's stock price (HSY) (Stock price) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "Overall economic conditions (like interest rates and investor optimism) can push up stock prices while also helping wages and business profits rise, which increases income per person. That shared backdrop can make the two move together even if one isn\u2019t directly driving the other.",
        twoSeperateMediatorType:
          "A higher stock price can make the company cheaper to fund and more willing to expand, leading to more hiring and spending that can raise income per person. It can also boost retirement and investment account values, leading people to spend more, which supports business activity and can lift income per person.",
        chainMediatorsType:
          "When income per person rises, people often have more money to spend on treats and branded snacks, which can increase the company\u2019s sales. Stronger sales can raise profits and investor expectations, which can lift the stock price.",
      },
    },
  },
  {
    id: "correlation-5213",
    labels: {
      A: "Annual US household spending on education (Household spend)",
      B: "Number of Lawyers in the United States (Lawyers)",
    },
    data: [
      {
        label: "2000",
        value1: 632.0,
        value2: 1022460.0,
      },
      {
        label: "2001",
        value1: 648.0,
        value2: 1048900.0,
      },
      {
        label: "2002",
        value1: 752.0,
        value2: 1049750.0,
      },
      {
        label: "2003",
        value1: 783.0,
        value2: 1058660.0,
      },
      {
        label: "2004",
        value1: 905.0,
        value2: 1084500.0,
      },
      {
        label: "2005",
        value1: 940.0,
        value2: 1104770.0,
      },
      {
        label: "2006",
        value1: 888.0,
        value2: 1116970.0,
      },
      {
        label: "2007",
        value1: 945.0,
        value2: 1143360.0,
      },
      {
        label: "2008",
        value1: 1046.0,
        value2: 1162120.0,
      },
      {
        label: "2009",
        value1: 1068.0,
        value2: 1180390.0,
      },
      {
        label: "2010",
        value1: 1074.0,
        value2: 1203100.0,
      },
      {
        label: "2011",
        value1: 1051.0,
        value2: 1225450.0,
      },
      {
        label: "2012",
        value1: 1207.0,
        value2: 1245200.0,
      },
      {
        label: "2013",
        value1: 1138.0,
        value2: 1268010.0,
      },
      {
        label: "2014",
        value1: 1236.0,
        value2: 1281430.0,
      },
      {
        label: "2015",
        value1: 1315.0,
        value2: 1300700.0,
      },
      {
        label: "2016",
        value1: 1329.0,
        value2: 1312870.0,
      },
      {
        label: "2017",
        value1: 1491.0,
        value2: 1335960.0,
      },
      {
        label: "2018",
        value1: 1407.0,
        value2: 1342380.0,
      },
      {
        label: "2019",
        value1: 1443.0,
        value2: 1352080.0,
      },
      {
        label: "2020",
        value1: 1271.0,
        value2: 1328740.0,
      },
    ],
    forward: {
      title:
        "Annual US household spending on education (Household spend) correlates with Number of Lawyers in the United States (Lawyers)",
      explanations: {
        confounderType:
          "When the economy is doing well and households earn more, families tend to spend more on education. The same economic boom also creates more business activity and legal work, which can increase the number of lawyers.",
        twoSeperateMediatorType:
          "Higher spending on education can produce more college and law-school graduates, which increases the number of people qualified to become lawyers. It can also lead to more complex schools and education programs (contracts, compliance, disputes), which creates additional demand for legal services and more lawyers.",
        chainMediatorsType:
          "If there are more lawyers, legal rules and paperwork can expand across society and workplaces. That can push employers and professions to require more formal credentials and training, leading families to spend more on education.",
      },
    },
    backward: {
      title:
        "Number of Lawyers in the United States (Lawyers) correlates with Annual US household spending on education (Household spend)",
      explanations: {
        confounderType:
          "When the economy grows and the population increases, there tend to be more legal disputes and business activity that require more lawyers. Those same conditions also give families more money and reasons to spend more on education.",
        twoSeperateMediatorType:
          "More lawyers can raise demand for legal training and credentials, pushing up costs for schooling and test prep that families pay for. More lawyers can also increase the need for compliance and paperwork in schools and childcare, which can raise fees that households end up paying.",
        chainMediatorsType:
          "When families spend more on education, more people finish college and consider professional careers. That can lead more people to apply to law school, graduate, and eventually work as lawyers, increasing the number of lawyers over time.",
      },
    },
  },
  {
    id: "correlation-5454",
    labels: {
      A: "Bachelor's degrees awarded in Engineering (Degrees awarded)",
      B: "Median US Household Income (USD)",
    },
    data: [
      {
        label: "2012",
        value1: 81371.0,
        value2: 53585.0,
      },
      {
        label: "2013",
        value1: 85987.0,
        value2: 53657.0,
      },
      {
        label: "2014",
        value1: 92169.0,
        value2: 56516.0,
      },
      {
        label: "2015",
        value1: 97852.0,
        value2: 59039.0,
      },
      {
        label: "2016",
        value1: 106789.0,
        value2: 61372.0,
      },
      {
        label: "2017",
        value1: 115671.0,
        value2: 61136.0,
      },
      {
        label: "2018",
        value1: 121953.0,
        value2: 63179.0,
      },
      {
        label: "2019",
        value1: 126692.0,
        value2: 68703.0,
      },
      {
        label: "2020",
        value1: 128337.0,
        value2: 68010.0,
      },
      {
        label: "2021",
        value1: 126037.0,
        value2: 70784.0,
      },
    ],
    forward: {
      title:
        "Bachelor's degrees awarded in Engineering (Degrees awarded) correlates with Median US Household Income (USD)",
      explanations: {
        confounderType:
          "When the local economy is strong, households earn more and the area also attracts more engineering programs and students. When the economy is weak, incomes are lower and fewer people finish engineering degrees.",
        twoSeperateMediatorType:
          "More engineering graduates can lead to more high-paying engineering jobs in the area, which raises typical household income. It can also help start new companies and bring in investment, which boosts pay across many kinds of jobs.",
        chainMediatorsType:
          "Higher household income makes it easier for families to afford college and extra support like tutoring and test prep. That can lead more students to do well in math and science, choose engineering in college, and finish those degrees.",
      },
    },
    backward: {
      title:
        "Median US Household Income (USD) correlates with Bachelor's degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "When the economy is strong in a region, it tends to raise household incomes and also leads to more funding and opportunities for engineering programs. That same strong economy can make both numbers rise together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "Higher household income can let more students afford tuition, tutoring, and time to study, which increases the number who finish engineering degrees. Higher household income can also come with better-resourced schools and stronger math/science preparation, which separately boosts engineering graduations.",
        chainMediatorsType:
          "More engineering graduates can lead to more engineers working locally and more tech and manufacturing activity starting or expanding. That growth can raise wages across many jobs and, over time, lift the typical household income.",
      },
    },
  },
  {
    id: "correlation-5468",
    labels: {
      A: "Robberies in Oregon (Robbery rate)",
      B: "The divorce rate in Oregon (Divorce rate)",
    },
    data: [
      {
        label: "1999",
        value1: 86.2,
        value2: 4.6,
      },
      {
        label: "2000",
        value1: 84.4,
        value2: 4.8,
      },
      {
        label: "2001",
        value1: 79.1,
        value2: 4.8,
      },
      {
        label: "2002",
        value1: 77.9,
        value2: 4.6,
      },
      {
        label: "2003",
        value1: 79.9,
        value2: 4.3,
      },
      {
        label: "2004",
        value1: 76.6,
        value2: 4.1,
      },
      {
        label: "2005",
        value1: 68.1,
        value2: 4.2,
      },
      {
        label: "2006",
        value1: 73.3,
        value2: 4.0,
      },
      {
        label: "2007",
        value1: 76.4,
        value2: 3.9,
      },
      {
        label: "2008",
        value1: 70.1,
        value2: 3.9,
      },
      {
        label: "2009",
        value1: 65.3,
        value2: 3.9,
      },
      {
        label: "2010",
        value1: 63.1,
        value2: 4.0,
      },
      {
        label: "2011",
        value1: 57.8,
        value2: 3.8,
      },
      {
        label: "2012",
        value1: 62.0,
        value2: 3.8,
      },
      {
        label: "2013",
        value1: 60.9,
        value2: 3.61902,
      },
      {
        label: "2014",
        value1: 57.2,
        value2: 3.42523,
      },
      {
        label: "2015",
        value1: 53.7,
        value2: 3.42295,
      },
      {
        label: "2016",
        value1: 56.5,
        value2: 3.35706,
      },
      {
        label: "2017",
        value1: 59.7,
        value2: 3.38107,
      },
      {
        label: "2018",
        value1: 60.1,
        value2: 3.36864,
      },
      {
        label: "2019",
        value1: 55.2,
        value2: 3.19128,
      },
      {
        label: "2020",
        value1: 51.4,
        value2: 2.57998,
      },
      {
        label: "2021",
        value1: 60.6,
        value2: 2.72341,
      },
    ],
    forward: {
      title:
        "Robberies in Oregon (Robbery rate) correlates with The divorce rate in Oregon (Divorce rate)",
      explanations: {
        confounderType:
          "Economic hardship in Oregon can push some people toward robbery while also putting heavy stress on marriages, leading to more divorces. When the economy improves, both robbery and divorce may fall.",
        twoSeperateMediatorType:
          "Higher robbery can make neighborhoods feel unsafe, and that ongoing fear and tension at home can contribute to breakups. Higher robbery can also lead to job loss or legal costs for families, and the resulting financial strain can increase the chance of divorce.",
        chainMediatorsType:
          "More divorces can lead to more households struggling financially, which can increase housing instability. That instability can raise stress and desperation, which can make robbery more likely.",
      },
    },
    backward: {
      title:
        "The divorce rate in Oregon (Divorce rate) correlates with Robberies in Oregon (Robbery rate)",
      explanations: {
        confounderType:
          "An economic downturn can put more financial strain on families while also pushing more people toward crime. That shared pressure could make both divorce and robbery rise and fall together.",
        twoSeperateMediatorType:
          "More divorces can lead to more households facing financial hardship, which can increase robbery. More divorces can also reduce neighborhood stability and informal supervision, which can make robberies easier to carry out.",
        chainMediatorsType:
          "When robberies increase, people may feel less safe and become more stressed. That stress can raise conflict at home, eventually contributing to more divorces.",
      },
    },
  },
  {
    id: "correlation-5507",
    labels: {
      A: "Bachelor's degrees awarded in Engineering (Degrees awarded)",
      B: "Total hydopower energy generated globally (Billion kWh)",
    },
    data: [
      {
        label: "2012",
        value1: 81371.0,
        value2: 3630.08,
      },
      {
        label: "2013",
        value1: 85987.0,
        value2: 3760.82,
      },
      {
        label: "2014",
        value1: 92169.0,
        value2: 3831.17,
      },
      {
        label: "2015",
        value1: 97852.0,
        value2: 3845.43,
      },
      {
        label: "2016",
        value1: 106789.0,
        value2: 3983.15,
      },
      {
        label: "2017",
        value1: 115671.0,
        value2: 4028.09,
      },
      {
        label: "2018",
        value1: 121953.0,
        value2: 4160.59,
      },
      {
        label: "2019",
        value1: 126692.0,
        value2: 4184.03,
      },
      {
        label: "2020",
        value1: 128337.0,
        value2: 4322.71,
      },
      {
        label: "2021",
        value1: 126037.0,
        value2: 4224.73,
      },
    ],
    forward: {
      title:
        "Bachelor's degrees awarded in Engineering (Degrees awarded) correlates with Total hydopower energy generated globally (Billion kWh)",
      explanations: {
        confounderType:
          "Economic growth and industrial development can lead countries to both expand hydropower plants and invest more in engineering education. As a result, hydropower generation and engineering degrees rise together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "More engineering graduates can lead to better design and construction of dams and turbines, which boosts hydropower output. They can also improve power-grid planning and maintenance, reducing losses and making it easier to add and use more hydropower.",
        chainMediatorsType:
          "When hydropower generation grows, it can lower electricity costs and improve energy reliability for factories and cities. This can expand engineering-related industries, which then increases demand for engineers and pushes more students to earn engineering degrees.",
      },
    },
    backward: {
      title:
        "Total hydopower energy generated globally (Billion kWh) correlates with Bachelor's degrees awarded in Engineering (Degrees awarded)",
      explanations: {
        confounderType:
          "As countries become richer and more industrialized, they can afford to build more hydropower plants and also fund larger universities that produce more engineering graduates. So both numbers rise together because overall development is increasing.",
        twoSeperateMediatorType:
          "More hydropower generation can lower electricity costs and improve grid reliability, making it easier for universities to run labs and expand engineering programs. It can also trigger new infrastructure and energy projects that create strong job demand, encouraging more students to choose engineering degrees.",
        chainMediatorsType:
          "When more engineering graduates enter the workforce, companies and governments gain more technical talent to plan and design large energy projects. That leads to more investment approvals and construction capacity, which eventually results in more hydropower being built and generating electricity.",
      },
    },
  },
  {
    id: "correlation-5679",
    labels: {
      A: "Restaurant spending in New Jersey (Per capita spend)",
      B: "Total Revenue of the NFL Teams (Billion US Dollars)",
    },
    data: [
      {
        label: "2001",
        value1: 1241.31,
        value2: 4.28,
      },
      {
        label: "2002",
        value1: 1246.4,
        value2: 4.94,
      },
      {
        label: "2003",
        value1: 1304.06,
        value2: 5.33,
      },
      {
        label: "2004",
        value1: 1410.05,
        value2: 6.03,
      },
      {
        label: "2005",
        value1: 1484.88,
        value2: 6.16,
      },
      {
        label: "2006",
        value1: 1565.56,
        value2: 6.54,
      },
      {
        label: "2007",
        value1: 1703.04,
        value2: 7.09,
      },
      {
        label: "2008",
        value1: 1700.15,
        value2: 7.57,
      },
      {
        label: "2009",
        value1: 1625.59,
        value2: 8.02,
      },
      {
        label: "2010",
        value1: 1660.53,
        value2: 8.35,
      },
      {
        label: "2011",
        value1: 1759.78,
        value2: 8.82,
      },
      {
        label: "2012",
        value1: 1869.6,
        value2: 9.17,
      },
      {
        label: "2013",
        value1: 2012.27,
        value2: 9.58,
      },
      {
        label: "2014",
        value1: 2146.24,
        value2: 11.09,
      },
      {
        label: "2015",
        value1: 2354.24,
        value2: 12.16,
      },
      {
        label: "2016",
        value1: 2513.53,
        value2: 13.16,
      },
      {
        label: "2017",
        value1: 2714.35,
        value2: 13.68,
      },
      {
        label: "2018",
        value1: 2826.82,
        value2: 14.48,
      },
      {
        label: "2019",
        value1: 2902.76,
        value2: 15.26,
      },
      {
        label: "2020",
        value1: 2495.27,
        value2: 12.2,
      },
    ],
    forward: {
      title:
        "Restaurant spending in New Jersey (Per capita spend) correlates with Total Revenue of the NFL Teams (Billion US Dollars)",
      explanations: {
        confounderType:
          "When the local economy is strong, people eat out more and they also spend more on tickets, merchandise, and media that boost football team revenue. When times are tougher, both restaurant spending and team revenue tend to drop.",
        twoSeperateMediatorType:
          "More eating out can go along with busier nightlife and entertainment habits, which leads to more game attendance and spending tied to football. It can also signal higher disposable income, which increases spending on subscriptions, merchandise, and sponsorships that raise team revenue.",
        chainMediatorsType:
          "When football teams bring in more money, they invest more in marketing and high-profile games, which increases local excitement. That draws more visitors and watch-parties, and those crowds end up spending more at restaurants.",
      },
    },
    backward: {
      title:
        "Total Revenue of the NFL Teams (Billion US Dollars) correlates with Restaurant spending in New Jersey (Per capita spend)",
      explanations: {
        confounderType:
          "A strong overall economy can raise incomes and business activity, which helps NFL teams bring in more money. The same strong economy also leads people in New Jersey to spend more when they eat out.",
        twoSeperateMediatorType:
          "When NFL teams earn more, they can spend more on marketing and big events that increase excitement and watch parties, leading to more restaurant visits in New Jersey. Higher team revenue can also mean more high-profile games and related travel and gatherings, which boosts local dining spending.",
        chainMediatorsType:
          "When people in New Jersey spend more at restaurants, restaurants hire more and order more from suppliers, which raises local business income. That can increase advertising budgets and sponsorship spending in the region, which can end up boosting money flowing to NFL teams.",
      },
    },
  },
  {
    id: "correlation-5693",
    labels: {
      A: "Total Points scored by the New England Patriots in the NFL season (Points)",
      B: "Season wins for the New England Patriots (Patriots wins)",
    },
    data: [
      {
        label: "1975",
        value1: 258.0,
        value2: 3.0,
      },
      {
        label: "1976",
        value1: 376.0,
        value2: 11.0,
      },
      {
        label: "1977",
        value1: 278.0,
        value2: 9.0,
      },
      {
        label: "1978",
        value1: 358.0,
        value2: 11.0,
      },
      {
        label: "1979",
        value1: 411.0,
        value2: 9.0,
      },
      {
        label: "1980",
        value1: 441.0,
        value2: 10.0,
      },
      {
        label: "1981",
        value1: 322.0,
        value2: 2.0,
      },
      {
        label: "1982",
        value1: 143.0,
        value2: 5.0,
      },
      {
        label: "1983",
        value1: 274.0,
        value2: 8.0,
      },
      {
        label: "1984",
        value1: 362.0,
        value2: 9.0,
      },
      {
        label: "1985",
        value1: 362.0,
        value2: 11.0,
      },
      {
        label: "1986",
        value1: 412.0,
        value2: 11.0,
      },
      {
        label: "1987",
        value1: 320.0,
        value2: 8.0,
      },
      {
        label: "1988",
        value1: 250.0,
        value2: 9.0,
      },
      {
        label: "1989",
        value1: 297.0,
        value2: 5.0,
      },
      {
        label: "1990",
        value1: 181.0,
        value2: 1.0,
      },
      {
        label: "1991",
        value1: 211.0,
        value2: 6.0,
      },
      {
        label: "1992",
        value1: 205.0,
        value2: 2.0,
      },
      {
        label: "1993",
        value1: 238.0,
        value2: 5.0,
      },
      {
        label: "1994",
        value1: 351.0,
        value2: 10.0,
      },
      {
        label: "1995",
        value1: 294.0,
        value2: 6.0,
      },
      {
        label: "1996",
        value1: 418.0,
        value2: 11.0,
      },
      {
        label: "1997",
        value1: 369.0,
        value2: 10.0,
      },
      {
        label: "1998",
        value1: 337.0,
        value2: 9.0,
      },
      {
        label: "1999",
        value1: 299.0,
        value2: 8.0,
      },
      {
        label: "2000",
        value1: 276.0,
        value2: 5.0,
      },
      {
        label: "2001",
        value1: 371.0,
        value2: 11.0,
      },
      {
        label: "2002",
        value1: 381.0,
        value2: 9.0,
      },
      {
        label: "2003",
        value1: 348.0,
        value2: 14.0,
      },
      {
        label: "2004",
        value1: 437.0,
        value2: 14.0,
      },
      {
        label: "2005",
        value1: 379.0,
        value2: 10.0,
      },
      {
        label: "2006",
        value1: 385.0,
        value2: 12.0,
      },
      {
        label: "2007",
        value1: 589.0,
        value2: 16.0,
      },
      {
        label: "2008",
        value1: 410.0,
        value2: 11.0,
      },
      {
        label: "2009",
        value1: 427.0,
        value2: 10.0,
      },
      {
        label: "2010",
        value1: 518.0,
        value2: 14.0,
      },
      {
        label: "2011",
        value1: 513.0,
        value2: 13.0,
      },
      {
        label: "2012",
        value1: 557.0,
        value2: 12.0,
      },
      {
        label: "2013",
        value1: 444.0,
        value2: 12.0,
      },
      {
        label: "2014",
        value1: 468.0,
        value2: 12.0,
      },
      {
        label: "2015",
        value1: 465.0,
        value2: 12.0,
      },
      {
        label: "2016",
        value1: 441.0,
        value2: 14.0,
      },
      {
        label: "2017",
        value1: 458.0,
        value2: 13.0,
      },
      {
        label: "2018",
        value1: 436.0,
        value2: 11.0,
      },
      {
        label: "2019",
        value1: 420.0,
        value2: 12.0,
      },
      {
        label: "2020",
        value1: 326.0,
        value2: 7.0,
      },
      {
        label: "2021",
        value1: 462.0,
        value2: 10.0,
      },
      {
        label: "2022",
        value1: 364.0,
        value2: 8.0,
      },
    ],
    forward: {
      title:
        "Total Points scored by the New England Patriots in the NFL season (Points) correlates with Season wins for the New England Patriots (Patriots wins)",
      explanations: {
        confounderType:
          "In seasons when the team is healthier and has fewer key injuries, they can score more points and also win more games. The same good health can drive both higher scoring and more wins.",
        twoSeperateMediatorType:
          "Scoring a lot can force opponents to abandon the run and take more risks, leading to more turnovers and easier game control that helps the Patriots win. Scoring a lot can also build early leads that let the Patriots dictate tempo and clock, making it easier to finish games with wins.",
        chainMediatorsType:
          "When the Patriots win more games, the coaching staff is more likely to keep the same game plan and quarterback approach that has been working. That stability can boost offensive rhythm over the season, which leads to more total points scored.",
      },
    },
    backward: {
      title:
        "Season wins for the New England Patriots (Patriots wins) correlates with Total Points scored by the New England Patriots in the NFL season (Points)",
      explanations: {
        confounderType:
          "In some seasons the team is simply stronger overall because of things like healthier starters, better coaching, or an easier schedule. Those same factors can lead to both scoring more total points and winning more games.",
        twoSeperateMediatorType:
          "Winning more games can mean the offense gets better field position and more chances to run out the clock, which can add points over a season. Winning can also boost confidence and allow game plans that take more scoring risks, leading to more points overall.",
        chainMediatorsType:
          "Scoring more points can build bigger leads, which makes the defense play more aggressively and force more turnovers. Those extra possessions and shortened fields can create even more scoring chances, which helps the team close out games and win more often.",
      },
    },
  },
  {
    id: "correlation-5710",
    labels: {
      A: "Milk consumption (Pounds per person)",
      B: "Per capita consumption of margarine (Pounds of margarine)",
    },
    data: [
      {
        label: "2000",
        value1: 196.0,
        value2: 8.2,
      },
      {
        label: "2001",
        value1: 192.0,
        value2: 7.0,
      },
      {
        label: "2002",
        value1: 191.0,
        value2: 6.5,
      },
      {
        label: "2003",
        value1: 188.0,
        value2: 5.3,
      },
      {
        label: "2004",
        value1: 185.0,
        value2: 5.2,
      },
      {
        label: "2005",
        value1: 185.0,
        value2: 4.0,
      },
      {
        label: "2006",
        value1: 185.0,
        value2: 4.6,
      },
      {
        label: "2007",
        value1: 183.0,
        value2: 4.5,
      },
      {
        label: "2008",
        value1: 181.0,
        value2: 4.2,
      },
      {
        label: "2009",
        value1: 181.0,
        value2: 3.7,
      },
    ],
    forward: {
      title:
        "Milk consumption (Pounds per person) correlates with Per capita consumption of margarine (Pounds of margarine)",
      explanations: {
        confounderType:
          "Overall eating habits and food prices can shift over time, making people buy more dairy products and also more butter substitutes at the same time. In that case, the two items move together because the same outside forces are pushing both.",
        twoSeperateMediatorType:
          "When people drink more milk, they may also buy more cereal and toast, which increases how often they use spreads like margarine. Milk drinking can also go along with more home baking and cooking, which can raise demand for margarine as an ingredient.",
        chainMediatorsType:
          "If people start using more margarine, they may eat more toast, sandwiches, and baked goods, which can increase how often they choose milk as a drink with those foods. Over time, that higher intake of those foods can become a regular meal pattern, leading to higher milk consumption.",
      },
    },
    backward: {
      title:
        "Per capita consumption of margarine (Pounds of margarine) correlates with Milk consumption (Pounds per person)",
      explanations: {
        confounderType:
          "When dairy prices are high or there are shortages, people may buy less milk and also switch from butter to margarine, making both move together. The same economic conditions can push both choices at the same time.",
        twoSeperateMediatorType:
          "If people start using margarine more, they may bake or cook different dishes that also use more milk, raising milk purchases. Margarine use can also go along with eating more breakfasts like toast or pancakes, which are often paired with milk.",
        chainMediatorsType:
          "If people drink more milk, they may buy more cereal and eat more toast or baked goods alongside it. Those foods often get spread with margarine, so margarine purchases rise later.",
      },
    },
  },
  {
    id: "correlation-5902",
    labels: {
      A: "Paypal's Number of Active Registered User Accounts (Active Accounts)",
      B: "Visa Inc.'s stock price (V) (Stock price)",
    },
    data: [
      {
        label: "2010",
        value1: 94.4,
        value2: 22.0,
      },
      {
        label: "2011",
        value1: 106.3,
        value2: 17.6,
      },
      {
        label: "2012",
        value1: 122.7,
        value2: 25.85,
      },
      {
        label: "2013",
        value1: 142.6,
        value2: 38.54,
      },
      {
        label: "2014",
        value1: 161.5,
        value2: 55.39,
      },
      {
        label: "2015",
        value1: 179.0,
        value2: 65.85,
      },
      {
        label: "2016",
        value1: 197.0,
        value2: 76.06,
      },
      {
        label: "2017",
        value1: 229.0,
        value2: 78.76,
      },
      {
        label: "2018",
        value1: 267.0,
        value2: 114.57,
      },
      {
        label: "2019",
        value1: 305.0,
        value2: 130.0,
      },
      {
        label: "2020",
        value1: 377.0,
        value2: 189.0,
      },
      {
        label: "2021",
        value1: 426.0,
        value2: 220.25,
      },
      {
        label: "2022",
        value1: 435.0,
        value2: 217.52,
      },
    ],
    forward: {
      title:
        "Paypal's Number of Active Registered User Accounts (Active Accounts) correlates with Visa Inc.'s stock price (V) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is strong and people spend more, more people use online payment apps and investors also bid up big payment-network stocks. When the economy weakens, both can fall at the same time.",
        twoSeperateMediatorType:
          "As more people use PayPal, online shopping and digital payments grow, which boosts overall card and payment-network transaction volumes and can lift Visa\u2019s stock. Also, growth in PayPal users can signal that cashless payments are becoming more common, improving investor expectations for the whole payments sector, including Visa.",
        chainMediatorsType:
          "If Visa\u2019s stock rises, it can attract attention and investment into the broader digital-payments space. That can lead to more partnerships, marketing, and consumer awareness across payment services, which can ultimately bring more people to sign up for PayPal and stay active.",
      },
    },
    backward: {
      title:
        "Visa Inc.'s stock price (V) (Stock price) correlates with Paypal's Number of Active Registered User Accounts (Active Accounts)",
      explanations: {
        confounderType:
          "Overall consumer spending and online shopping activity can rise and fall with the economy. When it\u2019s strong, Visa\u2019s stock often does better and PayPal tends to add more active accounts at the same time.",
        twoSeperateMediatorType:
          "If Visa\u2019s strong performance encourages more card perks and partnerships, more shoppers may find PayPal easier to use and sign up for it. Separately, if Visa\u2019s strength leads more merchants to upgrade checkout and accept more payment options, PayPal can become available in more places and gain active accounts.",
        chainMediatorsType:
          "As PayPal gains more active accounts, more purchases flow through PayPal and its connected checkout options. That can increase card-based spending and payment network volume, which can improve expectations for Visa\u2019s business and lift its stock price.",
      },
    },
  },
  {
    id: "correlation-5919",
    labels: {
      A: "Annual US household spending on gasoline (Household spend)",
      B: "US hotel industry's revenue per available room (USD)",
    },
    data: [
      {
        label: "2001",
        value1: 1279.0,
        value2: 49.91,
      },
      {
        label: "2002",
        value1: 1235.0,
        value2: 48.71,
      },
      {
        label: "2003",
        value1: 1333.0,
        value2: 48.92,
      },
      {
        label: "2004",
        value1: 1598.0,
        value2: 52.8,
      },
      {
        label: "2005",
        value1: 2013.0,
        value2: 57.37,
      },
      {
        label: "2006",
        value1: 2227.0,
        value2: 61.79,
      },
      {
        label: "2007",
        value1: 2384.0,
        value2: 65.57,
      },
      {
        label: "2008",
        value1: 2715.0,
        value2: 64.25,
      },
      {
        label: "2009",
        value1: 1986.0,
        value2: 53.57,
      },
      {
        label: "2010",
        value1: 2132.0,
        value2: 56.48,
      },
      {
        label: "2011",
        value1: 2655.0,
        value2: 61.07,
      },
      {
        label: "2012",
        value1: 2756.0,
        value2: 65.16,
      },
      {
        label: "2013",
        value1: 2611.0,
        value2: 68.69,
      },
      {
        label: "2014",
        value1: 2468.0,
        value2: 73.37,
      },
    ],
    forward: {
      title:
        "Annual US household spending on gasoline (Household spend) correlates with US hotel industry's revenue per available room (USD)",
      explanations: {
        confounderType:
          "When the economy is doing well, people both drive more and take more trips that require hotels. When the economy is weak, they cut back on both, so the two numbers move together.",
        twoSeperateMediatorType:
          "Higher gas spending can be a sign that people are traveling more by car, which leads to more hotel stays and higher hotel income per room. It can also reflect higher gas prices that raise overall travel costs, and hotels may charge more because travelers are already paying more to travel.",
        chainMediatorsType:
          "When hotels earn more per room, travel and tourism in general is stronger and more trips happen. That increases driving and road travel, which then raises household spending on gasoline.",
      },
    },
    backward: {
      title:
        "US hotel industry's revenue per available room (USD) correlates with Annual US household spending on gasoline (Household spend)",
      explanations: {
        confounderType:
          "When the economy is strong, more people take trips and stay in hotels, and they also drive more, which raises gasoline spending. When the economy is weak, both hotel revenue and gasoline spending tend to drop.",
        twoSeperateMediatorType:
          "Higher hotel revenue can signal a boom in travel, which often comes with more road trips and airport runs, increasing gasoline spending. It can also go along with more business activity and deliveries, which pushes up overall driving and fuel purchases by households.",
        chainMediatorsType:
          "If households spend more on gasoline, it often means they are driving more and traveling farther. More travel leads to more overnight trips and higher demand for hotel rooms, which allows hotels to charge more and earn more per available room.",
      },
    },
  },
  {
    id: "correlation-6003",
    labels: {
      A: "Restaurant spending in Colorado (Per capita spend)",
      B: "Total revenue generated by the National Hockey League (Billion US Dollars)",
    },
    data: [
      {
        label: "2006",
        value1: 1807.11,
        value2: 2.0,
      },
      {
        label: "2007",
        value1: 1881.66,
        value2: 2.44,
      },
      {
        label: "2008",
        value1: 1893.74,
        value2: 2.75,
      },
      {
        label: "2009",
        value1: 1869.42,
        value2: 2.82,
      },
      {
        label: "2010",
        value1: 1929.18,
        value2: 2.93,
      },
      {
        label: "2011",
        value1: 2059.87,
        value2: 3.09,
      },
      {
        label: "2012",
        value1: 2179.94,
        value2: 3.37,
      },
      {
        label: "2013",
        value1: 2333.46,
        value2: 2.63,
      },
      {
        label: "2014",
        value1: 2538.03,
        value2: 3.7,
      },
      {
        label: "2015",
        value1: 2819.31,
        value2: 3.98,
      },
      {
        label: "2016",
        value1: 3053.55,
        value2: 4.1,
      },
      {
        label: "2017",
        value1: 3266.1,
        value2: 4.43,
      },
      {
        label: "2018",
        value1: 3484.56,
        value2: 4.86,
      },
      {
        label: "2019",
        value1: 3586.48,
        value2: 5.09,
      },
      {
        label: "2020",
        value1: 3000.62,
        value2: 4.37,
      },
    ],
    forward: {
      title:
        "Restaurant spending in Colorado (Per capita spend) correlates with Total revenue generated by the National Hockey League (Billion US Dollars)",
      explanations: {
        confounderType:
          "When the economy is doing well, people in Colorado eat out more, and fans across the country also buy more tickets and merchandise, boosting league revenue. In weaker economic times, both restaurant spending and league revenue can drop together.",
        twoSeperateMediatorType:
          "Higher restaurant spending can reflect more tourism and nights out, which can also mean more people going to hockey games and buying team gear, raising league revenue. It can also signal more corporate entertaining and sponsorship spending, which can increase advertising and partnership dollars for the league.",
        chainMediatorsType:
          "When the league makes more money, it can invest more in marketing and media coverage that makes hockey feel like a bigger event. More fans then go to games and pre- or post-game gatherings, which can increase restaurant spending in Colorado.",
      },
    },
    backward: {
      title:
        "Total revenue generated by the National Hockey League (Billion US Dollars) correlates with Restaurant spending in Colorado (Per capita spend)",
      explanations: {
        confounderType:
          "When the economy is doing well, people have more money to spend on eating out in Colorado and also spend more on hockey through tickets, TV packages, and merchandise. In tougher economic times, both tend to drop.",
        twoSeperateMediatorType:
          "Bigger hockey revenues can mean more games and events that draw visitors into Colorado, and those visitors eat at local restaurants. Bigger hockey revenues can also boost sports marketing and fan excitement, leading to more watch parties and nights out that increase restaurant spending.",
        chainMediatorsType:
          "If people in Colorado spend more at restaurants, that can signal a busier social scene and more money circulating locally, which can support higher attendance at local hockey-related outings. Stronger local attendance and engagement can then add to overall hockey income through tickets, merchandise, and broadcast interest.",
      },
    },
  },
  {
    id: "correlation-6068",
    labels: {
      A: "Burglaries in Virginia (Burglary rate)",
      B: "The divorce rate in Virginia (Divorce rate)",
    },
    data: [
      {
        label: "1999",
        value1: 471.6,
        value2: 4.4,
      },
      {
        label: "2000",
        value1: 429.9,
        value2: 4.3,
      },
      {
        label: "2001",
        value1: 439.1,
        value2: 4.2,
      },
      {
        label: "2002",
        value1: 435.8,
        value2: 4.2,
      },
      {
        label: "2003",
        value1: 395.2,
        value2: 4.0,
      },
      {
        label: "2004",
        value1: 384.4,
        value2: 3.9,
      },
      {
        label: "2005",
        value1: 394.3,
        value2: 4.0,
      },
      {
        label: "2006",
        value1: 420.9,
        value2: 4.0,
      },
      {
        label: "2007",
        value1: 415.3,
        value2: 3.8,
      },
      {
        label: "2008",
        value1: 414.3,
        value2: 3.8,
      },
      {
        label: "2009",
        value1: 405.4,
        value2: 3.7,
      },
      {
        label: "2010",
        value1: 383.9,
        value2: 3.8,
      },
      {
        label: "2011",
        value1: 378.3,
        value2: 3.8,
      },
      {
        label: "2012",
        value1: 362.2,
        value2: 3.7,
      },
      {
        label: "2013",
        value1: 323.0,
        value2: 3.55891,
      },
      {
        label: "2014",
        value1: 278.7,
        value2: 3.48162,
      },
      {
        label: "2015",
        value1: 257.4,
        value2: 3.30097,
      },
      {
        label: "2016",
        value1: 239.6,
        value2: 3.37395,
      },
      {
        label: "2017",
        value1: 218.8,
        value2: 3.03577,
      },
      {
        label: "2018",
        value1: 184.2,
        value2: 3.07971,
      },
      {
        label: "2019",
        value1: 163.3,
        value2: 2.90152,
      },
      {
        label: "2020",
        value1: 133.5,
        value2: 2.56712,
      },
      {
        label: "2021",
        value1: 121.4,
        value2: 3.08773,
      },
    ],
    forward: {
      title:
        "Burglaries in Virginia (Burglary rate) correlates with The divorce rate in Virginia (Divorce rate)",
      explanations: {
        confounderType:
          "Economic hardship in some parts of Virginia can increase financial stress and instability. That same strain can lead to more break-ins and also put more marriages under pressure, raising divorces.",
        twoSeperateMediatorType:
          "When break-ins rise, people may feel less safe and argue more at home, which can push some couples toward divorce. Break-ins can also create financial losses and legal hassles that add stress to a relationship and increase the chance of splitting up.",
        chainMediatorsType:
          "When more couples split up, household income and stability can drop for some families. That can lead to more people struggling and then to more property crime, including burglaries.",
      },
    },
    backward: {
      title:
        "The divorce rate in Virginia (Divorce rate) correlates with Burglaries in Virginia (Burglary rate)",
      explanations: {
        confounderType:
          "When the economy gets worse, more couples face money stress that can lead to divorce, and more people may turn to theft. So both divorce and burglaries can rise at the same time because of shared financial pressure.",
        twoSeperateMediatorType:
          "After a divorce, a household may have less income and fewer adults at home, which can make some homes easier targets and reduce resources in the neighborhood. Divorce can also weaken community ties and informal watchfulness, making burglaries more likely.",
        chainMediatorsType:
          "When burglaries increase, people feel less safe and daily life becomes more stressful. That stress can lead to ongoing arguments and mental strain, which over time can push some marriages toward divorce.",
      },
    },
  },
  {
    id: "correlation-6093",
    labels: {
      A: "Annual US household spending on transportation (Household spend)",
      B: "American Express Company's stock price (AXP) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 7759.0,
        value2: 31.34,
      },
      {
        label: "2003",
        value1: 7781.0,
        value2: 31.47,
      },
      {
        label: "2004",
        value1: 7801.0,
        value2: 42.58,
      },
      {
        label: "2005",
        value1: 8344.0,
        value2: 49.76,
      },
      {
        label: "2006",
        value1: 8508.0,
        value2: 51.7,
      },
      {
        label: "2007",
        value1: 8758.0,
        value2: 61.18,
      },
      {
        label: "2008",
        value1: 8604.0,
        value2: 52.09,
      },
      {
        label: "2009",
        value1: 7658.0,
        value2: 18.57,
      },
      {
        label: "2010",
        value1: 7677.0,
        value2: 40.81,
      },
      {
        label: "2011",
        value1: 8293.0,
        value2: 43.3,
      },
      {
        label: "2012",
        value1: 8998.0,
        value2: 48.3,
      },
      {
        label: "2013",
        value1: 9004.0,
        value2: 58.33,
      },
      {
        label: "2014",
        value1: 9073.0,
        value2: 90.9,
      },
      {
        label: "2015",
        value1: 9503.0,
        value2: 93.17,
      },
      {
        label: "2016",
        value1: 9049.0,
        value2: 68.09,
      },
      {
        label: "2017",
        value1: 9576.0,
        value2: 74.89,
      },
      {
        label: "2018",
        value1: 9761.0,
        value2: 99.73,
      },
      {
        label: "2019",
        value1: 10742.0,
        value2: 93.91,
      },
      {
        label: "2020",
        value1: 9826.0,
        value2: 124.66,
      },
      {
        label: "2021",
        value1: 10961.0,
        value2: 121.3,
      },
      {
        label: "2022",
        value1: 12295.0,
        value2: 164.51,
      },
    ],
    forward: {
      title:
        "Annual US household spending on transportation (Household spend) correlates with American Express Company's stock price (AXP) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, families tend to spend more on transportation and investors also bid up the share price of big financial companies. When the economy weakens, both transportation spending and the share price can fall together.",
        twoSeperateMediatorType:
          "If families spend more on transportation, more of that spending gets paid with credit cards, which can raise card-company revenue and support the share price. Also, higher transportation spending can signal more travel and business activity, which can increase demand for premium cards and related services and lift the share price.",
        chainMediatorsType:
          "If the share price rises, the company may expand perks, partnerships, or marketing that encourage people to use its cards for travel and transit. That can make card-based travel spending easier or more attractive, which can gradually show up as higher household transportation spending.",
      },
    },
    backward: {
      title:
        "American Express Company's stock price (AXP) (Stock price) correlates with Annual US household spending on transportation (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is strong, investors bid up the company\u2019s stock and households also spend more on transportation. When the economy weakens, both the stock price and transportation spending tend to fall.",
        twoSeperateMediatorType:
          "A higher stock price can make customers and businesses feel more confident and spend more on flights, fuel, and other travel costs using credit cards. It can also make it cheaper for the company to raise money and offer better card rewards and promotions, which can encourage more transportation-related purchases.",
        chainMediatorsType:
          "If households start spending more on transportation, airlines, hotels, and related merchants can see higher sales and run more card-based promotions. That can increase card transaction volume and profits for the company, leading investors to push its stock price higher.",
      },
    },
  },
  {
    id: "correlation-6118",
    labels: {
      A: "Food spending in Arizona (Per capita spend)",
      B: "Dollar Tree's stock price (DLTR) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 2344.0,
        value2: 10.33,
      },
      {
        label: "2003",
        value1: 2423.18,
        value2: 8.17,
      },
      {
        label: "2004",
        value1: 2549.59,
        value2: 10.07,
      },
      {
        label: "2005",
        value1: 2703.91,
        value2: 9.68,
      },
      {
        label: "2006",
        value1: 2764.84,
        value2: 7.99,
      },
      {
        label: "2007",
        value1: 2934.63,
        value2: 10.12,
      },
      {
        label: "2008",
        value1: 3157.38,
        value2: 8.64,
      },
      {
        label: "2009",
        value1: 3281.05,
        value2: 13.97,
      },
      {
        label: "2010",
        value1: 3451.43,
        value2: 16.18,
      },
      {
        label: "2011",
        value1: 3771.43,
        value2: 28.33,
      },
      {
        label: "2012",
        value1: 4055.12,
        value2: 42.2,
      },
      {
        label: "2013",
        value1: 4196.69,
        value2: 41.07,
      },
      {
        label: "2014",
        value1: 4387.82,
        value2: 55.99,
      },
      {
        label: "2015",
        value1: 4564.82,
        value2: 70.94,
      },
      {
        label: "2016",
        value1: 4892.55,
        value2: 76.84,
      },
      {
        label: "2017",
        value1: 5044.77,
        value2: 77.57,
      },
      {
        label: "2018",
        value1: 5220.63,
        value2: 107.99,
      },
      {
        label: "2019",
        value1: 5341.04,
        value2: 89.8,
      },
      {
        label: "2020",
        value1: 5035.56,
        value2: 94.69,
      },
    ],
    forward: {
      title:
        "Food spending in Arizona (Per capita spend) correlates with Dollar Tree's stock price (DLTR) (Stock price)",
      explanations: {
        confounderType:
          "Arizona\u2019s economy (like job growth and wages) can raise how much people spend on food while also making investors more optimistic about discount retailers, pushing the stock up. So both numbers move together because they\u2019re reacting to the same broader economic conditions.",
        twoSeperateMediatorType:
          "When Arizona food spending rises, suppliers and stores may see higher demand and adjust pricing and promotions, which can change how attractive discount shopping becomes and affect the company\u2019s sales outlook. At the same time, higher food spending can squeeze some household budgets, leading more people to shop at cheaper stores, which can also boost expectations for the stock.",
        chainMediatorsType:
          "If the stock price climbs, the company can expand stores, hire more locally, or increase advertising, which can raise paychecks and local activity in places it operates. That extra income and activity can lead people in Arizona to spend more on everyday items like food.",
      },
    },
    backward: {
      title:
        "Dollar Tree's stock price (DLTR) (Stock price) correlates with Food spending in Arizona (Per capita spend)",
      explanations: {
        confounderType:
          "A broader economic trend like inflation could be pushing up everyday food costs in Arizona while also changing how investors value discount retailers like Dollar Tree. That shared trend can make the two move together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "If Dollar Tree\u2019s stock rises because the company is expanding and opening more stores, that can make it easier for people to buy groceries and household food items there, increasing measured food spending. Also, a rising stock can lead to more aggressive promotions and product expansion, which can pull more purchases into tracked food spending.",
        chainMediatorsType:
          "When Arizona food spending rises, retailers and suppliers may see stronger local demand and increase orders and distribution activity. That can lift sales expectations for discount chains and improve investor sentiment, which can push Dollar Tree\u2019s stock price up.",
      },
    },
  },
  {
    id: "correlation-6165",
    labels: {
      A: "The number of marketing managers in California (Marketing Managers)",
      B: "Microsoft's stock price (MSFT) (Stock price)",
    },
    data: [
      {
        label: "2003",
        value1: 31160.0,
        value2: 26.15,
      },
      {
        label: "2004",
        value1: 31240.0,
        value2: 27.58,
      },
      {
        label: "2005",
        value1: 31530.0,
        value2: 26.8,
      },
      {
        label: "2006",
        value1: 30320.0,
        value2: 26.25,
      },
      {
        label: "2007",
        value1: 32110.0,
        value2: 29.91,
      },
      {
        label: "2008",
        value1: 31340.0,
        value2: 35.79,
      },
      {
        label: "2009",
        value1: 32910.0,
        value2: 19.53,
      },
      {
        label: "2010",
        value1: 29730.0,
        value2: 30.62,
      },
      {
        label: "2011",
        value1: 30500.0,
        value2: 28.05,
      },
      {
        label: "2012",
        value1: 28260.0,
        value2: 26.55,
      },
      {
        label: "2013",
        value1: 29960.0,
        value2: 27.25,
      },
      {
        label: "2014",
        value1: 32520.0,
        value2: 37.35,
      },
      {
        label: "2015",
        value1: 32800.0,
        value2: 46.66,
      },
      {
        label: "2016",
        value1: 33390.0,
        value2: 54.32,
      },
      {
        label: "2017",
        value1: 33380.0,
        value2: 62.79,
      },
      {
        label: "2018",
        value1: 37410.0,
        value2: 86.13,
      },
      {
        label: "2019",
        value1: 40900.0,
        value2: 99.55,
      },
      {
        label: "2020",
        value1: 42140.0,
        value2: 158.78,
      },
      {
        label: "2021",
        value1: 47350.0,
        value2: 222.53,
      },
      {
        label: "2022",
        value1: 56920.0,
        value2: 335.35,
      },
    ],
    forward: {
      title:
        "The number of marketing managers in California (Marketing Managers) correlates with Microsoft's stock price (MSFT) (Stock price)",
      explanations: {
        confounderType:
          "A booming tech economy can both raise demand for marketing managers in California and push up Microsoft\u2019s stock price. When the tech sector cools, both can fall at the same time.",
        twoSeperateMediatorType:
          "More marketing managers can lead to more effective marketing campaigns and stronger product demand, which can improve Microsoft\u2019s sales and lift its stock price. Separately, more marketing managers can also boost ad spending and partnerships across the industry, which can increase investor optimism about big tech companies like Microsoft.",
        chainMediatorsType:
          "If Microsoft\u2019s stock rises, investors may pour more money into tech, leading companies to expand and hire more staff. That expansion can flow into more marketing budgets, more marketing team openings, and eventually more marketing managers in California.",
      },
    },
    backward: {
      title:
        "Microsoft's stock price (MSFT) (Stock price) correlates with The number of marketing managers in California (Marketing Managers)",
      explanations: {
        confounderType:
          "When the economy is strong, Microsoft\u2019s stock price often rises and companies in California also hire more marketing managers. When the economy weakens, both can drop at the same time.",
        twoSeperateMediatorType:
          "If Microsoft\u2019s stock rises, it can boost confidence in the tech sector and lead firms to expand, which can increase hiring of marketing managers in California. Separately, a higher Microsoft stock price can signal stronger consumer and business demand, pushing companies to spend more on advertising and hire more marketing managers.",
        chainMediatorsType:
          "If the number of marketing managers in California rises, companies may launch more marketing campaigns and attract more customers. That can lift sales and profits across the tech industry, improving investor optimism and pushing Microsoft\u2019s stock price higher.",
      },
    },
  },
  {
    id: "correlation-6288",
    labels: {
      A: "Annual US household spending on home maintenance (Household spend)",
      B: "The Procter & Gamble Company's stock price (PG) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 960.0,
        value2: 39.15,
      },
      {
        label: "2003",
        value1: 965.0,
        value2: 43.05,
      },
      {
        label: "2004",
        value1: 997.0,
        value2: 49.83,
      },
      {
        label: "2005",
        value1: 1101.0,
        value2: 55.65,
      },
      {
        label: "2006",
        value1: 1115.0,
        value2: 58.3,
      },
      {
        label: "2007",
        value1: 1131.0,
        value2: 63.72,
      },
      {
        label: "2008",
        value1: 1176.0,
        value2: 73.59,
      },
      {
        label: "2009",
        value1: 1138.0,
        value2: 61.69,
      },
      {
        label: "2010",
        value1: 1112.0,
        value2: 61.11,
      },
      {
        label: "2011",
        value1: 1120.0,
        value2: 64.39,
      },
      {
        label: "2012",
        value1: 1153.0,
        value2: 66.3,
      },
      {
        label: "2013",
        value1: 1182.0,
        value2: 68.65,
      },
      {
        label: "2014",
        value1: 1293.0,
        value2: 81.33,
      },
      {
        label: "2015",
        value1: 1438.0,
        value2: 90.84,
      },
      {
        label: "2016",
        value1: 1437.0,
        value2: 78.36,
      },
      {
        label: "2017",
        value1: 1616.0,
        value2: 83.88,
      },
      {
        label: "2018",
        value1: 1703.0,
        value2: 91.92,
      },
      {
        label: "2019",
        value1: 1879.0,
        value2: 91.03,
      },
      {
        label: "2020",
        value1: 2158.0,
        value2: 124.5,
      },
      {
        label: "2021",
        value1: 2335.0,
        value2: 139.66,
      },
      {
        label: "2022",
        value1: 2559.0,
        value2: 161.69,
      },
    ],
    forward: {
      title:
        "Annual US household spending on home maintenance (Household spend) correlates with The Procter & Gamble Company's stock price (PG) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, people have more money for home upkeep, and investors also tend to push up large, stable company stock prices. When the economy weakens, both home maintenance spending and the stock price can fall.",
        twoSeperateMediatorType:
          "Higher home-maintenance spending can go along with stronger demand for everyday household products and cleaning supplies, which can improve the company\u2019s sales outlook and lift the stock. It can also signal higher overall consumer confidence, attracting more investors to well-known brands and raising the stock price.",
        chainMediatorsType:
          "If the stock price rises, the value of many retirement accounts and index funds rises too, making some households feel wealthier. Feeling more financially secure can lead them to approve more repairs and upgrades around the home.",
      },
    },
    backward: {
      title:
        "The Procter & Gamble Company's stock price (PG) (Stock price) correlates with Annual US household spending on home maintenance (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, people tend to spend more on home maintenance and investors may also bid up the company\u2019s stock. When the economy weakens, both can fall at the same time.",
        twoSeperateMediatorType:
          "If the company\u2019s stock rises because it\u2019s launching popular household products, shoppers may end up buying more cleaning and upkeep items and report higher home-maintenance spending. Also, a rising stock can reflect aggressive promotions and wider store availability, which can make it easier and more tempting for households to spend more on upkeep supplies.",
        chainMediatorsType:
          "Higher home-maintenance spending can boost retailers\u2019 and brands\u2019 sales, which improves the company\u2019s revenue numbers. Better revenue can lead analysts to raise expectations and more investors to buy the stock, pushing the price up.",
      },
    },
  },
  {
    id: "correlation-6326",
    labels: {
      A: "Restaurant spending in California (Per capita spend)",
      B: "The Walt Disney Company's stock price (DIS) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 1325.63,
        value2: 20.61,
      },
      {
        label: "2003",
        value1: 1391.3,
        value2: 16.56,
      },
      {
        label: "2004",
        value1: 1494.8,
        value2: 23.16,
      },
      {
        label: "2005",
        value1: 1576.11,
        value2: 27.42,
      },
      {
        label: "2006",
        value1: 1686.33,
        value2: 23.74,
      },
      {
        label: "2007",
        value1: 1740.9,
        value2: 33.73,
      },
      {
        label: "2008",
        value1: 1764.18,
        value2: 32.32,
      },
      {
        label: "2009",
        value1: 1734.19,
        value2: 22.76,
      },
      {
        label: "2010",
        value1: 1756.79,
        value2: 32.5,
      },
      {
        label: "2011",
        value1: 1862.16,
        value2: 37.74,
      },
      {
        label: "2012",
        value1: 1931.6,
        value2: 37.97,
      },
      {
        label: "2013",
        value1: 2058.85,
        value2: 50.8,
      },
      {
        label: "2014",
        value1: 2204.21,
        value2: 76.04,
      },
      {
        label: "2015",
        value1: 2447.76,
        value2: 94.91,
      },
      {
        label: "2016",
        value1: 2631.08,
        value2: 103.12,
      },
      {
        label: "2017",
        value1: 2836.75,
        value2: 105.3,
      },
      {
        label: "2018",
        value1: 2894.7,
        value2: 108.95,
      },
      {
        label: "2019",
        value1: 3037.88,
        value2: 108.1,
      },
      {
        label: "2020",
        value1: 2670.79,
        value2: 145.29,
      },
    ],
    forward: {
      title:
        "Restaurant spending in California (Per capita spend) correlates with The Walt Disney Company's stock price (DIS) (Stock price)",
      explanations: {
        confounderType:
          "When California\u2019s economy is doing well, people tend to spend more on eating out and investors also become more optimistic about big entertainment companies, pushing the stock up. In a slowdown, both restaurant spending and the stock can drop together.",
        twoSeperateMediatorType:
          "Higher restaurant spending can signal strong tourism, and more tourists often means more visits and spending at Disney parks, improving the company\u2019s results and stock price. It can also reflect households feeling financially comfortable, which can lead to more spending on Disney streaming, movies, and merchandise, boosting investor expectations.",
        chainMediatorsType:
          "If Disney\u2019s stock rises, it can lead to upbeat business news and more confidence about the local job market in areas tied to entertainment and travel. That optimism can spread through more hiring and higher incomes, and then more people feel comfortable spending more at restaurants in California.",
      },
    },
    backward: {
      title:
        "The Walt Disney Company's stock price (DIS) (Stock price) correlates with Restaurant spending in California (Per capita spend)",
      explanations: {
        confounderType:
          "When the economy is strong and people feel confident, Disney\u2019s business outlook improves and its stock tends to rise. That same strong economy also leads Californians to spend more at restaurants.",
        twoSeperateMediatorType:
          "If Disney\u2019s stock rises because its theme parks and movies are doing well, more visitors may come to its California attractions and eat out more nearby. A rising stock can also boost household wealth for investors, leading some Californians to treat themselves to more restaurant meals.",
        chainMediatorsType:
          "When Californians spend more at restaurants, it can signal stronger consumer demand and higher sales for many businesses. That can lift expectations for the broader entertainment and travel market, which can improve sentiment about Disney and push its stock higher.",
      },
    },
  },
  {
    id: "correlation-6433",
    labels: {
      A: "Annual US household spending on food (Household spend)",
      B: "US production of cheese (other than cottage cheese) (million pounds)",
    },
    data: [
      {
        label: "2000",
        value1: 5158.0,
        value2: 8258.0,
      },
      {
        label: "2001",
        value1: 5321.0,
        value2: 8261.0,
      },
      {
        label: "2002",
        value1: 5375.0,
        value2: 8547.0,
      },
      {
        label: "2003",
        value1: 5340.0,
        value2: 8557.0,
      },
      {
        label: "2004",
        value1: 5781.0,
        value2: 8873.0,
      },
      {
        label: "2005",
        value1: 5931.0,
        value2: 9149.0,
      },
      {
        label: "2006",
        value1: 6111.0,
        value2: 9525.0,
      },
      {
        label: "2007",
        value1: 6133.0,
        value2: 9777.0,
      },
      {
        label: "2008",
        value1: 6443.0,
        value2: 9913.0,
      },
      {
        label: "2009",
        value1: 6372.0,
        value2: 10074.0,
      },
      {
        label: "2010",
        value1: 6129.0,
        value2: 10443.0,
      },
      {
        label: "2011",
        value1: 6458.0,
        value2: 10595.0,
      },
      {
        label: "2012",
        value1: 6599.0,
        value2: 10886.0,
      },
      {
        label: "2013",
        value1: 6602.0,
        value2: 11102.0,
      },
      {
        label: "2014",
        value1: 6759.0,
        value2: 11512.0,
      },
      {
        label: "2015",
        value1: 7023.0,
        value2: 11831.0,
      },
      {
        label: "2016",
        value1: 7203.0,
        value2: 12182.0,
      },
      {
        label: "2017",
        value1: 7729.0,
        value2: 12640.0,
      },
      {
        label: "2018",
        value1: 7923.0,
        value2: 13037.0,
      },
      {
        label: "2019",
        value1: 8169.0,
        value2: 13137.0,
      },
      {
        label: "2020",
        value1: 7316.0,
        value2: 13240.0,
      },
      {
        label: "2021",
        value1: 8289.0,
        value2: 13707.0,
      },
    ],
    forward: {
      title:
        "Annual US household spending on food (Household spend) correlates with US production of cheese (other than cottage cheese) (million pounds)",
      explanations: {
        confounderType:
          "As the economy grows and the population changes, people tend to spend more on food overall and companies also produce more cheese to meet higher demand. That shared backdrop can make the two move together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "When households spend more on food, grocery stores and restaurants order more dairy and cheese products, which leads producers to make more cheese. Also, higher food spending can encourage more eating out and more prepared foods, many of which use cheese, pushing production up through a separate path.",
        chainMediatorsType:
          "When more cheese is produced, it often becomes cheaper and more widely available, and companies put it into more foods and menu items. That can lead people to buy more cheese-containing products more often, which can raise overall household spending on food over time.",
      },
    },
    backward: {
      title:
        "US production of cheese (other than cottage cheese) (million pounds) correlates with Annual US household spending on food (Household spend)",
      explanations: {
        confounderType:
          "When the economy and population grow, people buy more food overall and producers make more cheese to meet higher demand. That shared growth makes both numbers rise together even if one doesn\u2019t directly cause the other.",
        twoSeperateMediatorType:
          "Making more cheese can lead to more cheese products and promotions in stores, which encourages households to spend more on food. It can also increase activity across farming, trucking, and retail, raising incomes in those sectors and letting households spend more on food.",
        chainMediatorsType:
          "When households spend more on food, grocery and restaurant sales rise and stores order more dairy ingredients. Those larger orders drive up milk production and processing capacity, which results in more cheese being produced.",
      },
    },
  },
  {
    id: "correlation-6452",
    labels: {
      A: "Annual US household spending on food (Household spend)",
      B: "McDonald's stock price (MCD) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 5375.0,
        value2: 26.47,
      },
      {
        label: "2003",
        value1: 5340.0,
        value2: 16.17,
      },
      {
        label: "2004",
        value1: 5781.0,
        value2: 24.95,
      },
      {
        label: "2005",
        value1: 5931.0,
        value2: 31.6,
      },
      {
        label: "2006",
        value1: 6111.0,
        value2: 34.29,
      },
      {
        label: "2007",
        value1: 6133.0,
        value2: 43.65,
      },
      {
        label: "2008",
        value1: 6443.0,
        value2: 59.48,
      },
      {
        label: "2009",
        value1: 6372.0,
        value2: 62.38,
      },
      {
        label: "2010",
        value1: 6129.0,
        value2: 62.63,
      },
      {
        label: "2011",
        value1: 6458.0,
        value2: 77.1,
      },
      {
        label: "2012",
        value1: 6599.0,
        value2: 101.33,
      },
      {
        label: "2013",
        value1: 6602.0,
        value2: 89.4,
      },
      {
        label: "2014",
        value1: 6759.0,
        value2: 96.81,
      },
      {
        label: "2015",
        value1: 7023.0,
        value2: 94.13,
      },
      {
        label: "2016",
        value1: 7203.0,
        value2: 117.25,
      },
      {
        label: "2017",
        value1: 7729.0,
        value2: 121.86,
      },
      {
        label: "2018",
        value1: 7923.0,
        value2: 173.73,
      },
      {
        label: "2019",
        value1: 8169.0,
        value2: 175.41,
      },
      {
        label: "2020",
        value1: 7316.0,
        value2: 198.0,
      },
      {
        label: "2021",
        value1: 8289.0,
        value2: 214.49,
      },
      {
        label: "2022",
        value1: 9343.0,
        value2: 269.49,
      },
    ],
    forward: {
      title:
        "Annual US household spending on food (Household spend) correlates with McDonald's stock price (MCD) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, families tend to spend more on food overall, and investors may also bid up McDonald\u2019s stock because they expect stronger business. When the economy is weak, both can fall, creating a correlation even if one doesn\u2019t directly drive the other.",
        twoSeperateMediatorType:
          "Higher overall food spending can mean more restaurant visits, which can boost McDonald\u2019s sales and push its stock price up. At the same time, higher food spending can reflect rising food prices, leading McDonald\u2019s to raise menu prices and revenue, which can also lift the stock.",
        chainMediatorsType:
          "A rising McDonald\u2019s stock price can attract more investment and expansion, leading to more locations and marketing that influence where people choose to eat. That can shift household budgets toward spending more on prepared food and dining out, raising overall food spending.",
      },
    },
    backward: {
      title:
        "McDonald's stock price (MCD) (Stock price) correlates with Annual US household spending on food (Household spend)",
      explanations: {
        confounderType:
          "When the economy is strong, people spend more on food overall and investors also feel more optimistic about big consumer brands, pushing the stock up. When the economy weakens, both food spending and the stock can fall together.",
        twoSeperateMediatorType:
          "If the stock rises, the company may have an easier time raising money and expanding stores or improving operations, which can lead to more people buying its food and lift overall food spending. Also, a higher stock price can trigger more advertising, promotions, and buzz, nudging more eating-out and increasing total household food spending.",
        chainMediatorsType:
          "When households start spending more on food, more of that can go toward eating out, which increases sales for large restaurant chains. Stronger sales can lead to better profits and upbeat forecasts, which can drive the stock price higher.",
      },
    },
  },
  {
    id: "correlation-6470",
    labels: {
      A: "Annual US household spending on food (Household spend)",
      B: "Inflation in the US (CPI)",
    },
    data: [
      {
        label: "2000",
        value1: 5158.0,
        value2: 172.2,
      },
      {
        label: "2001",
        value1: 5321.0,
        value2: 177.1,
      },
      {
        label: "2002",
        value1: 5375.0,
        value2: 179.9,
      },
      {
        label: "2003",
        value1: 5340.0,
        value2: 184.0,
      },
      {
        label: "2004",
        value1: 5781.0,
        value2: 188.9,
      },
      {
        label: "2005",
        value1: 5931.0,
        value2: 195.3,
      },
      {
        label: "2006",
        value1: 6111.0,
        value2: 201.6,
      },
      {
        label: "2007",
        value1: 6133.0,
        value2: 207.34,
      },
      {
        label: "2008",
        value1: 6443.0,
        value2: 215.3,
      },
      {
        label: "2009",
        value1: 6372.0,
        value2: 214.54,
      },
      {
        label: "2010",
        value1: 6129.0,
        value2: 218.06,
      },
      {
        label: "2011",
        value1: 6458.0,
        value2: 224.94,
      },
      {
        label: "2012",
        value1: 6599.0,
        value2: 229.59,
      },
      {
        label: "2013",
        value1: 6602.0,
        value2: 232.96,
      },
      {
        label: "2014",
        value1: 6759.0,
        value2: 236.74,
      },
      {
        label: "2015",
        value1: 7023.0,
        value2: 237.02,
      },
      {
        label: "2016",
        value1: 7203.0,
        value2: 240.01,
      },
      {
        label: "2017",
        value1: 7729.0,
        value2: 245.12,
      },
      {
        label: "2018",
        value1: 7923.0,
        value2: 251.11,
      },
      {
        label: "2019",
        value1: 8169.0,
        value2: 255.66,
      },
      {
        label: "2020",
        value1: 7316.0,
        value2: 258.81,
      },
      {
        label: "2021",
        value1: 8289.0,
        value2: 270.97,
      },
      {
        label: "2022",
        value1: 9343.0,
        value2: 292.56,
      },
    ],
    forward: {
      title:
        "Annual US household spending on food (Household spend) correlates with Inflation in the US (CPI)",
      explanations: {
        confounderType:
          "A strong economy can raise wages and employment, so families spend more on food. The same strong economy can also push prices up across the board, increasing inflation.",
        twoSeperateMediatorType:
          "When families spend more on food, stores and restaurants may need to order more and hire more workers, which can raise business costs and then prices. Also, higher food spending can increase demand for farm products and transportation, which can lift commodity and shipping prices and then show up as higher inflation.",
        chainMediatorsType:
          "When inflation rises, the cost of groceries and eating out increases. Higher prices squeeze budgets, leading many households to shift more of their yearly spending toward food even if they buy the same or less.",
      },
    },
    backward: {
      title:
        "Inflation in the US (CPI) correlates with Annual US household spending on food (Household spend)",
      explanations: {
        confounderType:
          "A strong economy can push prices up while also giving households more income and confidence to spend more on food. In a weak economy, prices may rise more slowly and households may cut back on food spending, so the two move together.",
        twoSeperateMediatorType:
          "When overall prices rise, grocery prices often rise too, so households spend more on food even if they buy the same amount. At the same time, rising prices can lead to wage increases or cost-of-living adjustments, giving households more dollars coming in, which can also raise food spending.",
        chainMediatorsType:
          "If households spend more on food, stores and producers may struggle to keep up and start charging higher prices. Those higher food prices then feed into the overall price index, making inflation look higher.",
      },
    },
  },
  {
    id: "correlation-6613",
    labels: {
      A: "Microsoft's Worldwide Earnings (Billion US Dollars)",
      B: "QUALCOMM's stock price (QCOM) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 28.37,
        value2: 25.49,
      },
      {
        label: "2003",
        value1: 32.19,
        value2: 18.31,
      },
      {
        label: "2004",
        value1: 36.84,
        value2: 27.01,
      },
      {
        label: "2005",
        value1: 39.79,
        value2: 42.7,
      },
      {
        label: "2006",
        value1: 44.28,
        value2: 43.25,
      },
      {
        label: "2007",
        value1: 51.12,
        value2: 37.76,
      },
      {
        label: "2008",
        value1: 60.42,
        value2: 38.23,
      },
      {
        label: "2009",
        value1: 58.44,
        value2: 35.65,
      },
      {
        label: "2010",
        value1: 62.48,
        value2: 46.79,
      },
      {
        label: "2011",
        value1: 69.94,
        value2: 49.89,
      },
      {
        label: "2012",
        value1: 73.72,
        value2: 55.88,
      },
      {
        label: "2013",
        value1: 77.85,
        value2: 63.58,
      },
      {
        label: "2014",
        value1: 86.83,
        value2: 73.61,
      },
      {
        label: "2015",
        value1: 93.58,
        value2: 74.51,
      },
      {
        label: "2016",
        value1: 85.32,
        value2: 49.43,
      },
      {
        label: "2017",
        value1: 89.95,
        value2: 65.86,
      },
      {
        label: "2018",
        value1: 110.36,
        value2: 64.38,
      },
      {
        label: "2019",
        value1: 125.84,
        value2: 56.2,
      },
      {
        label: "2020",
        value1: 143.02,
        value2: 89.05,
      },
      {
        label: "2021",
        value1: 168.09,
        value2: 153.01,
      },
      {
        label: "2022",
        value1: 198.27,
        value2: 182.91,
      },
    ],
    forward: {
      title:
        "Microsoft's Worldwide Earnings (Billion US Dollars) correlates with QUALCOMM's stock price (QCOM) (Stock price)",
      explanations: {
        confounderType:
          "Strong overall demand for consumer and business technology can boost both Microsoft\u2019s global earnings and investor optimism about major chip suppliers like Qualcomm. When the tech sector is hot, both companies often rise together even without directly affecting each other.",
        twoSeperateMediatorType:
          "When Microsoft earns more, it may spend more on devices, cloud infrastructure, and software ecosystems, which can increase demand for connected hardware that relies on Qualcomm\u2019s technology. Higher Microsoft earnings can also lift confidence in the broader tech market, attracting more investors to chip stocks like Qualcomm.",
        chainMediatorsType:
          "If Qualcomm\u2019s stock price rises, it can signal strength in smartphones and wireless demand, encouraging manufacturers and developers to expand products and services. That increased activity can lead to more Windows devices, cloud usage, and software subscriptions, which can eventually raise Microsoft\u2019s worldwide earnings.",
      },
    },
    backward: {
      title:
        "QUALCOMM's stock price (QCOM) (Stock price) correlates with Microsoft's Worldwide Earnings (Billion US Dollars)",
      explanations: {
        confounderType:
          "Broader tech market conditions and investor sentiment can lift or drag many big tech-related numbers at the same time. When the overall economy looks strong, investors may bid up QUALCOMM\u2019s stock while Microsoft\u2019s worldwide earnings also rise.",
        twoSeperateMediatorType:
          "If QUALCOMM\u2019s stock rises, it can boost confidence across the semiconductor and PC supply chain, leading to more device production and more Windows and cloud usage that helps Microsoft\u2019s earnings. Separately, a higher QUALCOMM stock price can signal stronger demand for smartphones and connected devices, which can increase software, services, and advertising activity that also supports Microsoft\u2019s earnings.",
        chainMediatorsType:
          "When Microsoft\u2019s worldwide earnings grow, businesses may increase spending on cloud services and new hardware to support that growth. That can raise demand for devices and connectivity components, improving expectations for chip makers and pushing QUALCOMM\u2019s stock price up.",
      },
    },
  },
  {
    id: "correlation-6636",
    labels: {
      A: "US household spending on mortgage interest and charges (Household spend)",
      B: "Robberies in the US (Robbery rate)",
    },
    data: [
      {
        label: "2000",
        value1: 6.93652,
        value2: 145.0,
      },
      {
        label: "2001",
        value1: 7.24227,
        value2: 148.5,
      },
      {
        label: "2002",
        value1: 7.28176,
        value2: 146.1,
      },
      {
        label: "2003",
        value1: 7.23718,
        value2: 142.5,
      },
      {
        label: "2004",
        value1: 6.76576,
        value2: 136.7,
      },
      {
        label: "2005",
        value1: 7.14732,
        value2: 140.8,
      },
      {
        label: "2006",
        value1: 7.75413,
        value2: 150.0,
      },
      {
        label: "2007",
        value1: 7.83674,
        value2: 148.3,
      },
      {
        label: "2008",
        value1: 7.57834,
        value2: 145.9,
      },
      {
        label: "2009",
        value1: 7.32468,
        value2: 133.1,
      },
      {
        label: "2010",
        value1: 6.96543,
        value2: 119.3,
      },
      {
        label: "2011",
        value1: 6.40579,
        value2: 113.9,
      },
      {
        label: "2012",
        value1: 5.96205,
        value2: 113.1,
      },
      {
        label: "2013",
        value1: 6.02348,
        value2: 109.0,
      },
      {
        label: "2014",
        value1: 5.52014,
        value2: 101.3,
      },
      {
        label: "2015",
        value1: 5.10736,
        value2: 102.2,
      },
      {
        label: "2016",
        value1: 5.04092,
        value2: 102.9,
      },
      {
        label: "2017",
        value1: 5.43623,
        value2: 98.6,
      },
      {
        label: "2018",
        value1: 4.53254,
        value2: 86.1,
      },
      {
        label: "2019",
        value1: 4.37845,
        value2: 81.8,
      },
      {
        label: "2020",
        value1: 4.8293,
        value2: 73.9,
      },
      {
        label: "2021",
        value1: 4.15521,
        value2: 65.5,
      },
      {
        label: "2022",
        value1: 4.24987,
        value2: 66.1,
      },
    ],
    forward: {
      title:
        "US household spending on mortgage interest and charges (Household spend) correlates with Robberies in the US (Robbery rate)",
      explanations: {
        confounderType:
          "When the overall economy worsens, interest rates and financial fees can rise and household budgets get squeezed. At the same time, financial stress and fewer opportunities can contribute to more robberies.",
        twoSeperateMediatorType:
          "Higher mortgage interest and fees can leave families with less money for necessities, which can increase desperation and lead some people to steal. Higher housing costs can also push more people into housing instability, which can increase street crime including robberies.",
        chainMediatorsType:
          "When robberies rise, people may feel less safe and property values can weaken in affected areas. That can make borrowing more expensive and lead households to pay more in interest and extra mortgage-related charges.",
      },
    },
    backward: {
      title:
        "Robberies in the US (Robbery rate) correlates with US household spending on mortgage interest and charges (Household spend)",
      explanations: {
        confounderType:
          "When the economy weakens and many people lose income, more people may turn to robbery while households also struggle with mortgages and end up paying more interest and fees. That shared economic stress can make both numbers rise or fall together.",
        twoSeperateMediatorType:
          "If robberies increase, lenders and insurers may see more risk and raise borrowing costs, which can increase the interest and charges households pay on their mortgages. Also, people may spend more on security or move to safer areas, which can push them into new loans or refinancing with higher fees and interest.",
        chainMediatorsType:
          "If mortgage interest and charges rise, households have less money left over and financial stress grows. That can lead to more missed bills and job instability, and in some communities more people may resort to robbery.",
      },
    },
  },
  {
    id: "correlation-6654",
    labels: {
      A: "US household spending on mortgage interest and charges (Household spend)",
      B: "Burglary rates in the US (Burglary rate)",
    },
    data: [
      {
        label: "2000",
        value1: 6.93652,
        value2: 728.8,
      },
      {
        label: "2001",
        value1: 7.24227,
        value2: 741.8,
      },
      {
        label: "2002",
        value1: 7.28176,
        value2: 747.0,
      },
      {
        label: "2003",
        value1: 7.23718,
        value2: 741.0,
      },
      {
        label: "2004",
        value1: 6.76576,
        value2: 730.3,
      },
      {
        label: "2005",
        value1: 7.14732,
        value2: 726.9,
      },
      {
        label: "2006",
        value1: 7.75413,
        value2: 733.1,
      },
      {
        label: "2007",
        value1: 7.83674,
        value2: 726.1,
      },
      {
        label: "2008",
        value1: 7.57834,
        value2: 733.0,
      },
      {
        label: "2009",
        value1: 7.32468,
        value2: 717.7,
      },
      {
        label: "2010",
        value1: 6.96543,
        value2: 701.0,
      },
      {
        label: "2011",
        value1: 6.40579,
        value2: 701.3,
      },
      {
        label: "2012",
        value1: 5.96205,
        value2: 672.2,
      },
      {
        label: "2013",
        value1: 6.02348,
        value2: 610.5,
      },
      {
        label: "2014",
        value1: 5.52014,
        value2: 537.2,
      },
      {
        label: "2015",
        value1: 5.10736,
        value2: 494.7,
      },
      {
        label: "2016",
        value1: 5.04092,
        value2: 468.9,
      },
      {
        label: "2017",
        value1: 5.43623,
        value2: 429.7,
      },
      {
        label: "2018",
        value1: 4.53254,
        value2: 378.0,
      },
      {
        label: "2019",
        value1: 4.37845,
        value2: 340.5,
      },
      {
        label: "2020",
        value1: 4.8293,
        value2: 314.2,
      },
      {
        label: "2021",
        value1: 4.15521,
        value2: 270.9,
      },
      {
        label: "2022",
        value1: 4.24987,
        value2: 269.8,
      },
    ],
    forward: {
      title:
        "US household spending on mortgage interest and charges (Household spend) correlates with Burglary rates in the US (Burglary rate)",
      explanations: {
        confounderType:
          "When the economy weakens, interest rates and financial stress can rise, pushing up mortgage interest costs while also making property crime more common. So both can move together because they\u2019re responding to the same broader economic conditions.",
        twoSeperateMediatorType:
          "Higher mortgage interest costs can squeeze household budgets, leading some people to cut back or fall behind, which can increase financial desperation and property crime. Separately, higher interest costs can slow the housing market and increase vacancies or foreclosures, creating more easy targets and less neighborhood stability, which can also raise burglary.",
        chainMediatorsType:
          "If burglaries increase, residents may feel less safe and move away, reducing neighborhood demand and lowering home prices. Lower prices can lead to more refinancing and riskier borrowing over time, which can raise the amount households end up paying in mortgage interest and fees.",
      },
    },
    backward: {
      title:
        "Burglary rates in the US (Burglary rate) correlates with US household spending on mortgage interest and charges (Household spend)",
      explanations: {
        confounderType:
          "When the economy worsens and unemployment rises, more people may turn to burglary, and at the same time more households struggle with housing costs and end up paying more interest and fees. This shared economic stress can make both numbers move together even if one doesn\u2019t directly cause the other.",
        twoSeperateMediatorType:
          "Higher burglary can push neighborhoods to feel less safe, which can lower home values and lead borrowers to refinance or face tighter loan terms, raising what they pay in interest and charges. It can also increase insurance and security-related costs that get folded into escrow or housing payments, making mortgage-related outlays rise.",
        chainMediatorsType:
          "When mortgage interest and fees rise, households have less money left after paying for housing, which increases financial strain. That strain can lead to more missed bills, housing instability, and community disruption, which can contribute to more burglary.",
      },
    },
  },
  {
    id: "correlation-6702",
    labels: {
      A: "US Employment Rate (Rate Percentage)",
      B: "AIG's stock price (AIG) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 62.7,
        value2: 1331.25,
      },
      {
        label: "2003",
        value1: 62.3,
        value2: 973.51,
      },
      {
        label: "2004",
        value1: 62.3,
        value2: 1114.26,
      },
      {
        label: "2005",
        value1: 62.7,
        value2: 1107.56,
      },
      {
        label: "2006",
        value1: 63.1,
        value2: 1155.14,
      },
      {
        label: "2007",
        value1: 63.0,
        value2: 1204.07,
      },
      {
        label: "2008",
        value1: 62.2,
        value2: 981.72,
      },
      {
        label: "2009",
        value1: 59.3,
        value2: 26.31,
      },
      {
        label: "2010",
        value1: 58.5,
        value2: 25.58,
      },
      {
        label: "2011",
        value1: 58.4,
        value2: 48.88,
      },
      {
        label: "2012",
        value1: 58.6,
        value2: 23.77,
      },
      {
        label: "2013",
        value1: 58.6,
        value2: 36.29,
      },
      {
        label: "2014",
        value1: 59.0,
        value2: 50.81,
      },
      {
        label: "2015",
        value1: 59.3,
        value2: 56.53,
      },
      {
        label: "2016",
        value1: 59.07,
        value2: 60.66,
      },
      {
        label: "2017",
        value1: 60.1,
        value2: 65.95,
      },
      {
        label: "2018",
        value1: 60.4,
        value2: 60.0,
      },
      {
        label: "2019",
        value1: 60.8,
        value2: 38.9,
      },
      {
        label: "2020",
        value1: 56.8,
        value2: 51.64,
      },
      {
        label: "2021",
        value1: 58.4,
        value2: 37.65,
      },
      {
        label: "2022",
        value1: 60.0,
        value2: 57.18,
      },
    ],
    forward: {
      title:
        "US Employment Rate (Rate Percentage) correlates with AIG's stock price (AIG) (Stock price)",
      explanations: {
        confounderType:
          "Overall economic strength can lift both hiring and demand for insurance and financial products. That same stronger economy can also improve investor optimism, pushing the company\u2019s stock price up.",
        twoSeperateMediatorType:
          "When more people are working, more households and employers buy or renew insurance, which can raise the company\u2019s sales and profits and lift its stock. Also, higher employment can reduce missed payments and claims stress, improving the company\u2019s financial stability and making investors value the stock more.",
        chainMediatorsType:
          "If the company\u2019s stock rises, it can become easier and cheaper for the company to raise money and expand. That expansion can lead to more business activity with partners and suppliers, which can eventually support more hiring and a higher employment rate.",
      },
    },
    backward: {
      title:
        "AIG's stock price (AIG) (Stock price) correlates with US Employment Rate (Rate Percentage)",
      explanations: {
        confounderType:
          "Overall economic strength can lift both AIG\u2019s stock price and the US employment rate at the same time. When the economy is doing well, companies tend to be valued higher and more people tend to have jobs.",
        twoSeperateMediatorType:
          "If AIG\u2019s stock price rises because investors expect stronger business activity, companies may feel more confident and expand, which can lead to more hiring and a higher employment rate. Separately, a rising AIG stock price can signal healthier financial conditions, making it easier for businesses and consumers to borrow and spend, which can also boost hiring.",
        chainMediatorsType:
          "When employment rises, households have more income and spend more, which supports business sales and profits. Stronger profits can improve insurers\u2019 results and investor confidence, which can push AIG\u2019s stock price higher.",
      },
    },
  },
  {
    id: "correlation-6789",
    labels: {
      A: "Kobe Bryant's total free throw count in NBA regular season (Free throws)",
      B: "Kobe Bryant's Regular Season Points (Points scored)",
    },
    data: [
      {
        label: "1997",
        value1: 136.0,
        value2: 539.0,
      },
      {
        label: "1998",
        value1: 363.0,
        value2: 1220.0,
      },
      {
        label: "1999",
        value1: 245.0,
        value2: 996.0,
      },
      {
        label: "2000",
        value1: 331.0,
        value2: 1485.0,
      },
      {
        label: "2001",
        value1: 475.0,
        value2: 1938.0,
      },
      {
        label: "2002",
        value1: 488.0,
        value2: 2019.0,
      },
      {
        label: "2003",
        value1: 601.0,
        value2: 2461.0,
      },
      {
        label: "2004",
        value1: 454.0,
        value2: 1557.0,
      },
      {
        label: "2005",
        value1: 542.0,
        value2: 1819.0,
      },
      {
        label: "2006",
        value1: 696.0,
        value2: 2832.0,
      },
      {
        label: "2007",
        value1: 667.0,
        value2: 2430.0,
      },
      {
        label: "2008",
        value1: 623.0,
        value2: 2323.0,
      },
      {
        label: "2009",
        value1: 483.0,
        value2: 2201.0,
      },
      {
        label: "2010",
        value1: 439.0,
        value2: 1970.0,
      },
      {
        label: "2011",
        value1: 483.0,
        value2: 2078.0,
      },
      {
        label: "2012",
        value1: 381.0,
        value2: 1616.0,
      },
      {
        label: "2013",
        value1: 525.0,
        value2: 2133.0,
      },
      {
        label: "2014",
        value1: 18.0,
        value2: 83.0,
      },
    ],
    forward: {
      title:
        "Kobe Bryant's total free throw count in NBA regular season (Free throws) correlates with Kobe Bryant's Regular Season Points (Points scored)",
      explanations: {
        confounderType:
          "In seasons when he played more minutes and more games, he both scored more total points and also got to the free-throw line more often. That extra time on the court boosts both totals together.",
        twoSeperateMediatorType:
          "Making lots of free throws directly adds points to his season total. Also, getting to the line can put key defenders in foul trouble and slow the game down, which can create easier scoring chances that raise his point total.",
        chainMediatorsType:
          "When he was putting up huge point totals, defenses focused more on stopping him, so he attacked the basket more to keep scoring. That led to more physical contact and more whistles, which increased his free-throw total.",
      },
    },
    backward: {
      title:
        "Kobe Bryant's Regular Season Points (Points scored) correlates with Kobe Bryant's total free throw count in NBA regular season (Free throws)",
      explanations: {
        confounderType:
          "When he plays more minutes and has the ball more, he both scores more points and gets sent to the line more often. So the same heavier workload can make both numbers rise together.",
        twoSeperateMediatorType:
          "Scoring more can happen because he attacks the basket more, and those drives often lead to fouls and more free throws. Scoring more can also come from taking more shots overall, and more shot attempts create more chances to be fouled and earn free throws.",
        chainMediatorsType:
          "Getting more free throws can make him feel in rhythm and more confident. That confidence can lead him to be more aggressive and take on more scoring chances, which increases his points.",
      },
    },
  },
  {
    id: "correlation-6805",
    labels: {
      A: "Burglaries in Maine (Burglary rate)",
      B: "The divorce rate in Maine (Divorce rate)",
    },
    data: [
      {
        label: "1999",
        value1: 601.1,
        value2: 5.1,
      },
      {
        label: "2000",
        value1: 531.4,
        value2: 5.0,
      },
      {
        label: "2001",
        value1: 537.0,
        value2: 4.7,
      },
      {
        label: "2002",
        value1: 537.9,
        value2: 4.6,
      },
      {
        label: "2003",
        value1: 502.5,
        value2: 4.4,
      },
      {
        label: "2004",
        value1: 482.2,
        value2: 4.3,
      },
      {
        label: "2005",
        value1: 479.7,
        value2: 4.1,
      },
      {
        label: "2006",
        value1: 518.0,
        value2: 4.2,
      },
      {
        label: "2007",
        value1: 512.1,
        value2: 4.2,
      },
      {
        label: "2008",
        value1: 498.2,
        value2: 4.2,
      },
      {
        label: "2009",
        value1: 510.4,
        value2: 4.1,
      },
      {
        label: "2010",
        value1: 554.8,
        value2: 4.2,
      },
      {
        label: "2011",
        value1: 592.0,
        value2: 4.2,
      },
      {
        label: "2012",
        value1: 562.7,
        value2: 3.9,
      },
      {
        label: "2013",
        value1: 487.7,
        value2: 3.96973,
      },
      {
        label: "2014",
        value1: 378.5,
        value2: 3.58172,
      },
      {
        label: "2015",
        value1: 353.1,
        value2: 3.42805,
      },
      {
        label: "2016",
        value1: 300.8,
        value2: 3.42852,
      },
      {
        label: "2017",
        value1: 250.0,
        value2: 3.22627,
      },
      {
        label: "2018",
        value1: 202.5,
        value2: 3.19709,
      },
      {
        label: "2019",
        value1: 175.4,
        value2: 3.033,
      },
      {
        label: "2020",
        value1: 148.8,
        value2: 2.40567,
      },
      {
        label: "2021",
        value1: 126.3,
        value2: 2.72837,
      },
    ],
    forward: {
      title:
        "Burglaries in Maine (Burglary rate) correlates with The divorce rate in Maine (Divorce rate)",
      explanations: {
        confounderType:
          "Economic hardship in Maine could push some people toward property crime while also putting stress on marriages. In years when money is tight, both burglaries and divorces can rise together.",
        twoSeperateMediatorType:
          "More burglaries can make people feel less safe and more anxious at home, which can increase conflict and lead to divorce. Burglaries can also cause financial losses and legal hassles, which can strain a relationship and contribute to divorce.",
        chainMediatorsType:
          "Higher divorce rates can lead to more single-parent or single-income households. That can increase financial strain, which may raise the number of vacant or less-supervised homes and make burglaries more likely.",
      },
    },
    backward: {
      title:
        "The divorce rate in Maine (Divorce rate) correlates with Burglaries in Maine (Burglary rate)",
      explanations: {
        confounderType:
          "When the economy gets worse and people feel more financial stress, relationship problems can increase and some people may also turn to theft. That same economic downturn can make both divorce and burglaries rise at the same time.",
        twoSeperateMediatorType:
          "More divorces can lead to more people living alone or moving frequently, which can leave homes less watched and easier to target. More divorces can also strain finances and parenting time, and some teens may drift into trouble that includes breaking into homes.",
        chainMediatorsType:
          "A rise in burglaries can make neighborhoods feel unsafe and raise fear and stress at home. That ongoing stress can fuel arguments, then emotional distance, and eventually some couples decide to split up.",
      },
    },
  },
  {
    id: "correlation-6915",
    labels: {
      A: "Inflation in the US (CPI)",
      B: "Caterpillar's stock price (CAT) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 179.9,
        value2: 26.18,
      },
      {
        label: "2003",
        value1: 184.0,
        value2: 22.98,
      },
      {
        label: "2004",
        value1: 188.9,
        value2: 41.59,
      },
      {
        label: "2005",
        value1: 195.3,
        value2: 48.05,
      },
      {
        label: "2006",
        value1: 201.6,
        value2: 57.87,
      },
      {
        label: "2007",
        value1: 207.34,
        value2: 61.71,
      },
      {
        label: "2008",
        value1: 215.3,
        value2: 72.56,
      },
      {
        label: "2009",
        value1: 214.54,
        value2: 44.91,
      },
      {
        label: "2010",
        value1: 218.06,
        value2: 57.65,
      },
      {
        label: "2011",
        value1: 224.94,
        value2: 94.38,
      },
      {
        label: "2012",
        value1: 229.59,
        value2: 92.77,
      },
      {
        label: "2013",
        value1: 232.96,
        value2: 92.95,
      },
      {
        label: "2014",
        value1: 236.74,
        value2: 90.41,
      },
      {
        label: "2015",
        value1: 237.02,
        value2: 91.77,
      },
      {
        label: "2016",
        value1: 240.01,
        value2: 66.88,
      },
      {
        label: "2017",
        value1: 245.12,
        value2: 94.0,
      },
      {
        label: "2018",
        value1: 251.11,
        value2: 158.3,
      },
      {
        label: "2019",
        value1: 255.66,
        value2: 124.03,
      },
      {
        label: "2020",
        value1: 258.81,
        value2: 149.0,
      },
      {
        label: "2021",
        value1: 270.97,
        value2: 183.0,
      },
      {
        label: "2022",
        value1: 292.56,
        value2: 207.33,
      },
    ],
    forward: {
      title:
        "Inflation in the US (CPI) correlates with Caterpillar's stock price (CAT) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is running hot, prices across the country tend to rise and investors also expect strong demand for heavy equipment, which can lift the company\u2019s stock. So the same broad economic strength can push both inflation and the stock price in the same direction.",
        twoSeperateMediatorType:
          "Rising inflation can lead the central bank to raise interest rates, making borrowing more expensive for customers and potentially reducing orders for heavy machinery, which can hurt the stock. At the same time, higher inflation can raise the company\u2019s costs and squeeze profit margins, which can also pressure the stock.",
        chainMediatorsType:
          "A big rise in the company\u2019s stock price can signal strong demand for construction and mining activity, encouraging more building and investment. That extra activity can increase demand for labor, fuel, and materials, which can eventually push consumer prices higher.",
      },
    },
    backward: {
      title:
        "Caterpillar's stock price (CAT) (Stock price) correlates with Inflation in the US (CPI)",
      explanations: {
        confounderType:
          "When the economy is booming, companies buy more heavy equipment and the stock tends to rise. The same boom can also push prices up across the country, making inflation look higher at the same time.",
        twoSeperateMediatorType:
          "If the company\u2019s stock rises because investors expect more construction and mining, those extra projects can increase demand for fuel, steel, and labor, which can lift prices. Separately, a rising stock can also reflect higher expected sales, and the increased business spending and wages tied to that activity can add to price increases in the economy.",
        chainMediatorsType:
          "When inflation rises, the central bank may raise interest rates, which makes borrowing more expensive. That can slow construction and equipment purchases, reducing expected profits and pushing the stock price down.",
      },
    },
  },
  {
    id: "correlation-6922",
    labels: {
      A: "US GDP per capita (US Dollars)",
      B: "Lululemon's stock price (LULU) (Stock price)",
    },
    data: [
      {
        label: "2009",
        value1: 46999.0,
        value2: 3.98,
      },
      {
        label: "2010",
        value1: 48358.0,
        value2: 15.44,
      },
      {
        label: "2011",
        value1: 50066.0,
        value2: 34.7,
      },
      {
        label: "2012",
        value1: 51784.4,
        value2: 47.5,
      },
      {
        label: "2013",
        value1: 53291.1,
        value2: 77.73,
      },
      {
        label: "2014",
        value1: 55123.9,
        value2: 59.08,
      },
      {
        label: "2015",
        value1: 56762.7,
        value2: 56.01,
      },
      {
        label: "2016",
        value1: 57866.7,
        value2: 53.71,
      },
      {
        label: "2017",
        value1: 59907.8,
        value2: 65.94,
      },
      {
        label: "2018",
        value1: 62823.3,
        value2: 77.31,
      },
      {
        label: "2019",
        value1: 65120.4,
        value2: 118.89,
      },
      {
        label: "2020",
        value1: 63530.6,
        value2: 232.9,
      },
      {
        label: "2021",
        value1: 70248.6,
        value2: 351.67,
      },
      {
        label: "2022",
        value1: 76399.0,
        value2: 392.2,
      },
    ],
    forward: {
      title:
        "US GDP per capita (US Dollars) correlates with Lululemon's stock price (LULU) (Stock price)",
      explanations: {
        confounderType:
          "Overall economic conditions (like strong consumer confidence and low unemployment) can lift incomes and also make investors more willing to buy retail stocks. That shared backdrop can move both numbers together even if one isn\u2019t directly driving the other.",
        twoSeperateMediatorType:
          "When average income rises, people often spend more on premium athletic clothing, which can boost the company\u2019s sales and push its stock price up. Higher incomes can also increase retirement and investment contributions, sending more money into the stock market and raising share prices, including this one.",
        chainMediatorsType:
          "If the stock price rises, the company can more easily raise money and expand, leading it to hire more people and pay more wages. Over time, that extra business activity can add a small amount to the nation\u2019s total output per person.",
      },
    },
    backward: {
      title:
        "Lululemon's stock price (LULU) (Stock price) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "Overall economic conditions and investor confidence can push up both household prosperity and stock prices at the same time. When the economy is strong, people earn more on average and investors are also willing to pay more for shares.",
        twoSeperateMediatorType:
          "A higher share price can make it easier for the company to raise money and expand stores and jobs, which adds to the economy and average income. A higher share price can also boost retirement accounts and investment wealth, leading to more spending and stronger economic output per person.",
        chainMediatorsType:
          "As average income rises, people have more discretionary money to spend on premium athletic clothing. That improves the company\u2019s sales and profits, which can lead investors to bid up the stock price.",
      },
    },
  },
  {
    id: "correlation-6968",
    labels: {
      A: "Annual U.S. inflation rate (Rate Percentage)",
      B: "US GDP per capita (US Dollars)",
    },
    data: [
      {
        label: "2009",
        value1: -0.4,
        value2: 46999.0,
      },
      {
        label: "2010",
        value1: 1.6,
        value2: 48358.0,
      },
      {
        label: "2011",
        value1: 3.2,
        value2: 50066.0,
      },
      {
        label: "2012",
        value1: 2.1,
        value2: 51784.4,
      },
      {
        label: "2013",
        value1: 1.5,
        value2: 53291.1,
      },
      {
        label: "2014",
        value1: 1.6,
        value2: 55123.9,
      },
      {
        label: "2015",
        value1: 0.1,
        value2: 56762.7,
      },
      {
        label: "2016",
        value1: 1.3,
        value2: 57866.7,
      },
      {
        label: "2017",
        value1: 2.1,
        value2: 59907.8,
      },
      {
        label: "2018",
        value1: 2.4,
        value2: 62823.3,
      },
      {
        label: "2019",
        value1: 1.8,
        value2: 65120.4,
      },
      {
        label: "2020",
        value1: 1.2,
        value2: 63530.6,
      },
      {
        label: "2021",
        value1: 4.7,
        value2: 70248.6,
      },
      {
        label: "2022",
        value1: 8.0,
        value2: 76399.0,
      },
    ],
    forward: {
      title:
        "Annual U.S. inflation rate (Rate Percentage) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "When the economy is running hot or cooling down, it can both change price increases and also raise or lower income per person. In other words, the same overall economic conditions can move both at the same time.",
        twoSeperateMediatorType:
          "Rising prices can lead employers to boost wages and salaries, which can increase income per person. Rising prices can also push people and businesses to spend sooner and invest differently, which can lift output and income per person.",
        chainMediatorsType:
          "When income per person rises, people buy more goods and services, increasing overall demand. Stronger demand can tighten the job market and raise costs, and those higher costs often show up later as faster price increases.",
      },
    },
    backward: {
      title:
        "US GDP per capita (US Dollars) correlates with Annual U.S. inflation rate (Rate Percentage)",
      explanations: {
        confounderType:
          "The overall pace of the economy can lift incomes per person while also pushing prices up or down. For example, when the economy is booming, people earn more and businesses raise prices faster; in a slowdown, both can weaken.",
        twoSeperateMediatorType:
          "When people earn more per person, they tend to spend more, and stronger demand can lead businesses to raise prices faster. Higher income can also coincide with tighter job markets and rising wages, which can increase companies\u2019 costs and show up as higher prices.",
        chainMediatorsType:
          "When prices rise quickly, the central bank may raise interest rates to cool things down. Higher rates can slow borrowing and investment, which can reduce business growth and, over time, lower income per person.",
      },
    },
  },
  {
    id: "correlation-7018",
    labels: {
      A: "Car crashes in the US (Car crashes)",
      B: "Carjackings in the US (Carjackings)",
    },
    data: [
      {
        label: "1995",
        value1: 6699.0,
        value2: 0.53,
      },
      {
        label: "1996",
        value1: 6770.0,
        value2: 0.48,
      },
      {
        label: "1997",
        value1: 6624.0,
        value2: 0.4,
      },
      {
        label: "1998",
        value1: 6335.0,
        value2: 0.3,
      },
      {
        label: "1999",
        value1: 6279.0,
        value2: 0.35,
      },
      {
        label: "2000",
        value1: 6394.0,
        value2: 0.31,
      },
      {
        label: "2001",
        value1: 6323.0,
        value2: 0.31,
      },
      {
        label: "2002",
        value1: 6316.0,
        value2: 0.19,
      },
      {
        label: "2003",
        value1: 6328.0,
        value2: 0.23,
      },
      {
        label: "2004",
        value1: 6181.0,
        value2: 0.19,
      },
      {
        label: "2005",
        value1: 6159.0,
        value2: 0.22,
      },
      {
        label: "2006",
        value1: 5973.0,
        value2: 0.185,
      },
      {
        label: "2007",
        value1: 6024.0,
        value2: 0.185,
      },
      {
        label: "2008",
        value1: 5811.0,
        value2: 0.185,
      },
      {
        label: "2009",
        value1: 5505.0,
        value2: 0.15,
      },
      {
        label: "2010",
        value1: 5419.0,
        value2: 0.13,
      },
      {
        label: "2011",
        value1: 5338.0,
        value2: 0.09,
      },
      {
        label: "2012",
        value1: 5615.0,
        value2: 0.09,
      },
      {
        label: "2013",
        value1: 5687.0,
        value2: 0.12,
      },
      {
        label: "2014",
        value1: 6064.0,
        value2: 0.15,
      },
    ],
    forward: {
      title:
        "Car crashes in the US (Car crashes) correlates with Carjackings in the US (Carjackings)",
      explanations: {
        confounderType:
          "In some areas there is more overall crime and disorder, which can also mean more unsafe driving and more carjackings. Places with fewer police resources or weaker traffic enforcement can see both problems rise together.",
        twoSeperateMediatorType:
          "More crashes can create more abandoned, damaged, or unattended vehicles, giving thieves more chances to take a car by force when someone returns to it. Crashes can also increase repair delays and parts shortages, making certain cars more valuable targets and encouraging more carjackings.",
        chainMediatorsType:
          "More carjackings can lead to more high-speed getaways and police chases. Those chases can increase dangerous driving, which can then result in more car crashes.",
      },
    },
    backward: {
      title:
        "Carjackings in the US (Carjackings) correlates with Car crashes in the US (Car crashes)",
      explanations: {
        confounderType:
          "When economic hardship and weak public safety hit an area, both carjackings and car crashes can rise. More desperation and less traffic-law enforcement can mean more theft and more dangerous driving at the same time.",
        twoSeperateMediatorType:
          "After a carjacking, the thief may drive recklessly to escape, which raises the chance of a crash. Carjackings can also leave people feeling unsafe, leading some drivers to speed up, take riskier routes, or drive more aggressively, increasing crashes.",
        chainMediatorsType:
          "More car crashes can flood police and emergency services, leaving less time to patrol and prevent theft. With fewer visible patrols and slower response times, carjackers may find it easier to strike, so carjackings go up.",
      },
    },
  },
  {
    id: "correlation-7053",
    labels: {
      A: "US household spending on new cars (Household spend)",
      B: "Car crashes in the US (Car crashes)",
    },
    data: [
      {
        label: "2000",
        value1: 4.21869,
        value2: 6394.0,
      },
      {
        label: "2001",
        value1: 4.26388,
        value2: 6323.0,
      },
      {
        label: "2002",
        value1: 4.30956,
        value2: 6316.0,
      },
      {
        label: "2003",
        value1: 5.02732,
        value2: 6328.0,
      },
      {
        label: "2004",
        value1: 4.02811,
        value2: 6181.0,
      },
      {
        label: "2005",
        value1: 4.16083,
        value2: 6159.0,
      },
      {
        label: "2006",
        value1: 3.71488,
        value2: 5973.0,
      },
      {
        label: "2007",
        value1: 3.16693,
        value2: 6024.0,
      },
      {
        label: "2008",
        value1: 2.58488,
        value2: 5811.0,
      },
      {
        label: "2009",
        value1: 2.64332,
        value2: 5505.0,
      },
      {
        label: "2010",
        value1: 2.53383,
        value2: 5419.0,
      },
      {
        label: "2011",
        value1: 2.54502,
        value2: 5338.0,
      },
      {
        label: "2012",
        value1: 3.18611,
        value2: 5615.0,
      },
      {
        label: "2013",
        value1: 3.05871,
        value2: 5687.0,
      },
      {
        label: "2014",
        value1: 2.9199,
        value2: 6064.0,
      },
    ],
    forward: {
      title:
        "US household spending on new cars (Household spend) correlates with Car crashes in the US (Car crashes)",
      explanations: {
        confounderType:
          "When the economy is doing well, people buy more new cars and they also drive more. More driving time on the road can lead to more crashes.",
        twoSeperateMediatorType:
          "Buying more new cars puts more vehicles on the road, which raises the chances of collisions. Also, buying new cars can encourage people to drive more often or take longer trips, which increases crash risk.",
        chainMediatorsType:
          "A rise in crashes can push insurance rates up and make older cars seem less safe or more costly to keep. That can lead more households to replace their cars sooner, increasing spending on new cars.",
      },
    },
    backward: {
      title:
        "Car crashes in the US (Car crashes) correlates with US household spending on new cars (Household spend)",
      explanations: {
        confounderType:
          "When the economy is strong, people buy more new cars and there are also more cars on the road, which can lead to more crashes. When the economy is weak, both new-car buying and driving tend to drop, and crashes can fall too.",
        twoSeperateMediatorType:
          "More crashes can make people worry about their car\u2019s safety or reliability, so they replace it sooner with a new one. More crashes can also raise repair costs or insurance issues, pushing some households to buy a new car instead of fixing the old one.",
        chainMediatorsType:
          "When households spend more on new cars, there tend to be more vehicles on the road and more miles driven. More driving increases traffic density and time spent behind the wheel, which can lead to more crashes.",
      },
    },
  },
  {
    id: "correlation-7065",
    labels: {
      A: "Master's degrees awarded in Education (Degrees awarded)",
      B: "The number of actuaries in Indiana (Actuaries)",
    },
    data: [
      {
        label: "2012",
        value1: 179047.0,
        value2: 510.0,
      },
      {
        label: "2013",
        value1: 164652.0,
        value2: 420.0,
      },
      {
        label: "2014",
        value1: 154655.0,
        value2: 320.0,
      },
      {
        label: "2015",
        value1: 146581.0,
        value2: 260.0,
      },
      {
        label: "2016",
        value1: 145792.0,
        value2: 230.0,
      },
      {
        label: "2017",
        value1: 145624.0,
        value2: 200.0,
      },
      {
        label: "2018",
        value1: 146368.0,
        value2: 210.0,
      },
      {
        label: "2019",
        value1: 146429.0,
        value2: 240.0,
      },
      {
        label: "2020",
        value1: 146989.0,
        value2: 290.0,
      },
      {
        label: "2021",
        value1: 153756.0,
        value2: 290.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Education (Degrees awarded) correlates with The number of actuaries in Indiana (Actuaries)",
      explanations: {
        confounderType:
          "When Indiana\u2019s population and overall economy grow, more people pursue graduate study in education and more insurance/finance businesses hire actuaries. Both numbers rise together because the state is getting bigger and busier.",
        twoSeperateMediatorType:
          "More people earning education master\u2019s degrees can lead to more school administrators and career counselors who promote quantitative careers, which can increase the number of actuaries. It can also lead to better math and statistics teaching in schools, producing more students who later qualify for actuarial jobs.",
        chainMediatorsType:
          "If the number of actuaries in Indiana rises, insurance and finance firms may expand and bring in more residents. A larger population can create more demand for teachers and school leadership, leading more people to earn master\u2019s degrees in education.",
      },
    },
    backward: {
      title:
        "The number of actuaries in Indiana (Actuaries) correlates with Master's degrees awarded in Education (Degrees awarded)",
      explanations: {
        confounderType:
          "Indiana\u2019s overall population and economy could be growing, which leads to more actuaries working there and also more people earning master\u2019s degrees in education. Both numbers rise together because the state is getting larger and more active, not because one directly affects the other.",
        twoSeperateMediatorType:
          "Having more actuaries can boost demand for math and data skills in local schools and training programs, which encourages more people to pursue advanced education degrees to teach those subjects. It can also increase local tax revenue and charitable support, which helps universities expand graduate education programs and award more education master\u2019s degrees.",
        chainMediatorsType:
          "More master\u2019s degrees in education can mean better schools and stronger training in math and analytics for students. That can lead to more people choosing finance and risk-related careers later on, and some of them end up working as actuaries in Indiana.",
      },
    },
  },
  {
    id: "correlation-7068",
    labels: {
      A: "The number of Breweries in the United States (Number of breweries)",
      B: "Starbucks' stock price (SBUX) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 1575.0,
        value2: 4.78,
      },
      {
        label: "2003",
        value1: 1629.0,
        value2: 5.12,
      },
      {
        label: "2004",
        value1: 1635.0,
        value2: 8.36,
      },
      {
        label: "2005",
        value1: 1612.0,
        value2: 15.82,
      },
      {
        label: "2006",
        value1: 1741.0,
        value2: 15.29,
      },
      {
        label: "2007",
        value1: 1805.0,
        value2: 17.8,
      },
      {
        label: "2008",
        value1: 1896.0,
        value2: 10.07,
      },
      {
        label: "2009",
        value1: 1933.0,
        value2: 4.71,
      },
      {
        label: "2010",
        value1: 2131.0,
        value2: 11.64,
      },
      {
        label: "2011",
        value1: 2525.0,
        value2: 16.25,
      },
      {
        label: "2012",
        value1: 2670.0,
        value2: 23.43,
      },
      {
        label: "2013",
        value1: 3162.0,
        value2: 27.3,
      },
      {
        label: "2014",
        value1: 4014.0,
        value2: 39.04,
      },
      {
        label: "2015",
        value1: 4847.0,
        value2: 41.07,
      },
      {
        label: "2016",
        value1: 5780.0,
        value2: 58.77,
      },
      {
        label: "2017",
        value1: 6767.0,
        value2: 55.91,
      },
      {
        label: "2018",
        value1: 7722.0,
        value2: 57.95,
      },
      {
        label: "2019",
        value1: 8557.0,
        value2: 63.68,
      },
      {
        label: "2020",
        value1: 9092.0,
        value2: 88.12,
      },
      {
        label: "2021",
        value1: 9384.0,
        value2: 107.66,
      },
      {
        label: "2022",
        value1: 9709.0,
        value2: 116.47,
      },
    ],
    forward: {
      title:
        "The number of Breweries in the United States (Number of breweries) correlates with Starbucks' stock price (SBUX) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, more people have money to spend, which can lead to more new breweries opening and investors feeling better about Starbucks. In tougher times, fewer breweries open and Starbucks\u2019 stock may also do worse.",
        twoSeperateMediatorType:
          "More breweries can boost local food-and-drink tourism and nightlife, which can increase overall foot traffic in busy areas where Starbucks also benefits. They can also raise demand for commercial space and staffing in certain neighborhoods, pushing Starbucks to expand or adjust pricing in ways that investors reward.",
        chainMediatorsType:
          "If Starbucks\u2019 stock rises, it can signal confidence in consumer spending and encourage more investment into food-and-beverage businesses. That extra investment can flow into small business lending and franchise activity, making it easier for new breweries to get funded and open.",
      },
    },
    backward: {
      title:
        "Starbucks' stock price (SBUX) (Stock price) correlates with The number of Breweries in the United States (Number of breweries)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, investors may bid up Starbucks\u2019 stock and more people have money to start or support new breweries. When the economy slows, the stock can drop and fewer breweries open.",
        twoSeperateMediatorType:
          "If Starbucks\u2019 stock rises, the company may expand and spend more on coffee marketing, which can push more people to explore craft beverages and indirectly boost brewery growth. Separately, a rising stock can make investors feel upbeat about consumer spending, leading them to fund more brewery startups.",
        chainMediatorsType:
          "As breweries become more common, neighborhoods can turn into more active social and dining areas. That can bring in more foot traffic and related retail spending nearby, which can help Starbucks sales and improve how investors value the company.",
      },
    },
  },
  {
    id: "correlation-7103",
    labels: {
      A: "Unemployment in the US (Percentage)",
      B: "US bank failures (Failed banks)",
    },
    data: [
      {
        label: "2000",
        value1: 4.0,
        value2: 2.0,
      },
      {
        label: "2001",
        value1: 4.7,
        value2: 4.0,
      },
      {
        label: "2002",
        value1: 5.8,
        value2: 11.0,
      },
      {
        label: "2003",
        value1: 6.0,
        value2: 3.0,
      },
      {
        label: "2004",
        value1: 5.5,
        value2: 4.0,
      },
      {
        label: "2005",
        value1: 5.1,
        value2: 0.0,
      },
      {
        label: "2006",
        value1: 4.6,
        value2: 0.0,
      },
      {
        label: "2007",
        value1: 4.6,
        value2: 3.0,
      },
      {
        label: "2008",
        value1: 5.8,
        value2: 25.0,
      },
      {
        label: "2009",
        value1: 9.3,
        value2: 140.0,
      },
      {
        label: "2010",
        value1: 9.6,
        value2: 157.0,
      },
      {
        label: "2011",
        value1: 8.9,
        value2: 92.0,
      },
      {
        label: "2012",
        value1: 8.1,
        value2: 51.0,
      },
      {
        label: "2013",
        value1: 7.4,
        value2: 24.0,
      },
      {
        label: "2014",
        value1: 6.2,
        value2: 18.0,
      },
      {
        label: "2015",
        value1: 5.3,
        value2: 8.0,
      },
      {
        label: "2016",
        value1: 4.9,
        value2: 5.0,
      },
      {
        label: "2017",
        value1: 4.4,
        value2: 8.0,
      },
      {
        label: "2018",
        value1: 3.9,
        value2: 0.0,
      },
      {
        label: "2019",
        value1: 3.7,
        value2: 4.0,
      },
      {
        label: "2020",
        value1: 8.1,
        value2: 4.0,
      },
      {
        label: "2021",
        value1: 5.3,
        value2: 0.0,
      },
      {
        label: "2022",
        value1: 3.6,
        value2: 0.0,
      },
    ],
    forward: {
      title:
        "Unemployment in the US (Percentage) correlates with US bank failures (Failed banks)",
      explanations: {
        confounderType:
          "During a recession, companies cut jobs and more people become unemployed. The same recession also leads to more loan defaults and investment losses, pushing some banks to fail.",
        twoSeperateMediatorType:
          "When unemployment rises, more households miss mortgage, credit card, and auto payments, which raises bank losses and can trigger failures. Unemployment can also reduce local spending and business revenue, causing more business loan failures that weaken banks.",
        chainMediatorsType:
          "When banks fail, credit becomes harder to get for households and businesses. Reduced borrowing leads to cutbacks and closures, which results in layoffs and higher unemployment.",
      },
    },
    backward: {
      title:
        "US bank failures (Failed banks) correlates with Unemployment in the US (Percentage)",
      explanations: {
        confounderType:
          "A major economic downturn can hurt businesses and borrowers at the same time. That raises job losses and also increases loan defaults, which can push more banks to fail.",
        twoSeperateMediatorType:
          "When banks fail, credit gets tighter and loans become harder to get, so businesses can\u2019t expand or even cover short-term costs, leading to layoffs. Bank failures can also shake confidence, causing people and companies to cut spending and investment, which slows the economy and raises unemployment.",
        chainMediatorsType:
          "When unemployment rises, many households struggle to pay mortgages, car loans, and credit cards. That increases bank losses, weakens banks\u2019 finances, and can eventually cause some banks to fail.",
      },
    },
  },
  {
    id: "correlation-7110",
    labels: {
      A: "Associates degrees awarded in Mathematics and statistics (Degrees awarded)",
      B: "The number of statisticians in North Carolina (Statisticians)",
    },
    data: [
      {
        label: "2011",
        value1: 1644.0,
        value2: 870.0,
      },
      {
        label: "2012",
        value1: 1529.0,
        value2: 830.0,
      },
      {
        label: "2013",
        value1: 1801.0,
        value2: 890.0,
      },
      {
        label: "2014",
        value1: 2148.0,
        value2: 950.0,
      },
      {
        label: "2015",
        value1: 2697.0,
        value2: 1040.0,
      },
      {
        label: "2016",
        value1: 3027.0,
        value2: 1170.0,
      },
      {
        label: "2017",
        value1: 3454.0,
        value2: 1330.0,
      },
      {
        label: "2018",
        value1: 4135.0,
        value2: 1500.0,
      },
      {
        label: "2019",
        value1: 4632.0,
        value2: 1640.0,
      },
      {
        label: "2020",
        value1: 4851.0,
        value2: 1820.0,
      },
      {
        label: "2021",
        value1: 4842.0,
        value2: 1620.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Mathematics and statistics (Degrees awarded) correlates with The number of statisticians in North Carolina (Statisticians)",
      explanations: {
        confounderType:
          "North Carolina may be investing more in data-related industries and education at the same time. That can lead to more math and statistics associate degrees being awarded and also more statistician jobs in the state.",
        twoSeperateMediatorType:
          "More associate degrees can increase the number of people qualified to apply for statistician roles, raising hiring. It can also attract employers to expand locally because they expect a stronger pipeline of trained workers.",
        chainMediatorsType:
          "If there are more statistician jobs in North Carolina, more people may move to the state or stay there for those opportunities. That can increase enrollment in local community colleges and lead to more math and statistics associate degrees being awarded.",
      },
    },
    backward: {
      title:
        "The number of statisticians in North Carolina (Statisticians) correlates with Associates degrees awarded in Mathematics and statistics (Degrees awarded)",
      explanations: {
        confounderType:
          "North Carolina\u2019s overall growth in universities and tech/analytics industries can both attract more statisticians and lead to more associate degrees in math and statistics being awarded. So both numbers rise together because the state is expanding in related education and jobs.",
        twoSeperateMediatorType:
          "When there are more statisticians, they may help create or improve college programs and courses, which results in more students completing associate degrees. Also, having more statisticians can increase local outreach like tutoring, internships, and career talks, encouraging more students to finish those degrees.",
        chainMediatorsType:
          "When more associate degrees in math and statistics are awarded, more people enter the local workforce with quantitative skills, which encourages companies to build data-focused teams. As those teams expand, they create more openings and incentives for statisticians to move to or stay in North Carolina.",
      },
    },
  },
  {
    id: "correlation-7117",
    labels: {
      A: "Associates degrees awarded in Engineering technologies (Degrees awarded)",
      B: "The number of aerospace engineers in California (Aerospace Engineers)",
    },
    data: [
      {
        label: "2011",
        value1: 60890.0,
        value2: 19990.0,
      },
      {
        label: "2012",
        value1: 63107.0,
        value2: 20770.0,
      },
      {
        label: "2013",
        value1: 59277.0,
        value2: 15400.0,
      },
      {
        label: "2014",
        value1: 56729.0,
        value2: 15140.0,
      },
      {
        label: "2015",
        value1: 56585.0,
        value2: 12950.0,
      },
      {
        label: "2016",
        value1: 52485.0,
        value2: 10800.0,
      },
      {
        label: "2017",
        value1: 53150.0,
        value2: 11450.0,
      },
      {
        label: "2018",
        value1: 53309.0,
        value2: 11440.0,
      },
      {
        label: "2019",
        value1: 53252.0,
        value2: 11440.0,
      },
      {
        label: "2020",
        value1: 49423.0,
        value2: 10200.0,
      },
      {
        label: "2021",
        value1: 48748.0,
        value2: 7860.0,
      },
    ],
    forward: {
      title:
        "Associates degrees awarded in Engineering technologies (Degrees awarded) correlates with The number of aerospace engineers in California (Aerospace Engineers)",
      explanations: {
        confounderType:
          "California\u2019s overall investment and growth in high-tech manufacturing and aerospace can lead to more engineering-technology associate degrees being awarded and also create more aerospace engineering jobs in the state. When the state economy and industry expand, both numbers can rise together even if one doesn\u2019t directly cause the other.",
        twoSeperateMediatorType:
          "More engineering-technology associate degrees can increase the pool of skilled technicians who support aerospace teams, which can encourage companies to hire and keep more aerospace engineers. Those degrees can also attract new aerospace firms to the state by signaling a strong workforce, leading to more aerospace engineering positions.",
        chainMediatorsType:
          "When there are more aerospace engineers in California, aerospace companies may expand projects and facilities, increasing demand for technical support roles. Community colleges respond by expanding engineering-technology programs and graduating more students to meet that demand.",
      },
    },
    backward: {
      title:
        "The number of aerospace engineers in California (Aerospace Engineers) correlates with Associates degrees awarded in Engineering technologies (Degrees awarded)",
      explanations: {
        confounderType:
          "When California\u2019s aerospace industry is booming, companies hire more aerospace engineers and local colleges expand engineering-technology programs to supply technicians. That shared industry boom can make both numbers rise together even if neither directly drives the other.",
        twoSeperateMediatorType:
          "A larger aerospace engineering workforce can attract more aerospace companies and suppliers to the state, which creates technician jobs that motivate students to earn engineering-technology associate degrees. It can also spur universities and community colleges to partner with industry and add or promote engineering-technology programs, increasing the number of degrees awarded.",
        chainMediatorsType:
          "More engineering-technology associate degrees means more technicians enter aerospace-related workplaces. That growth helps companies scale up and launch more projects, which eventually increases the need for and hiring of aerospace engineers in California.",
      },
    },
  },
  {
    id: "correlation-7125",
    labels: {
      A: "US GDP per capita (US Dollars)",
      B: "US milk fat used to produce cheese (excluding cottage cheese) (million pounds)",
    },
    data: [
      {
        label: "2009",
        value1: 46999.0,
        value2: 2833.0,
      },
      {
        label: "2010",
        value1: 48358.0,
        value2: 2918.0,
      },
      {
        label: "2011",
        value1: 50066.0,
        value2: 2945.2,
      },
      {
        label: "2012",
        value1: 51784.4,
        value2: 3037.3,
      },
      {
        label: "2013",
        value1: 53291.1,
        value2: 3098.1,
      },
      {
        label: "2014",
        value1: 55123.9,
        value2: 3207.0,
      },
      {
        label: "2015",
        value1: 56762.7,
        value2: 3299.1,
      },
      {
        label: "2016",
        value1: 57866.7,
        value2: 3391.8,
      },
      {
        label: "2017",
        value1: 59907.8,
        value2: 3534.3,
      },
      {
        label: "2018",
        value1: 62823.3,
        value2: 3640.2,
      },
      {
        label: "2019",
        value1: 65120.4,
        value2: 3659.7,
      },
      {
        label: "2020",
        value1: 63530.6,
        value2: 3699.1,
      },
      {
        label: "2021",
        value1: 70248.6,
        value2: 3836.2,
      },
    ],
    forward: {
      title:
        "US GDP per capita (US Dollars) correlates with US milk fat used to produce cheese (excluding cottage cheese) (million pounds)",
      explanations: {
        confounderType:
          "Over time, the country\u2019s population and overall economic activity can grow, which tends to raise average income and also increases total demand for cheese, so more milk fat gets used. In that case, both numbers rise together mainly because the country is getting bigger and producing/consuming more overall.",
        twoSeperateMediatorType:
          "When people have higher incomes, they often buy more restaurant meals and prepared foods like pizza and burgers, which use lots of cheese and therefore require more milk fat. Higher incomes can also expand food manufacturing and grocery variety, leading companies to make more cheese-heavy products and use more milk fat.",
        chainMediatorsType:
          "If more milk fat is used for cheese, dairy plants, trucking, packaging, and related services may grow and hire more workers. That extra business activity can boost local wages and profits, which adds up to a higher average income per person.",
      },
    },
    backward: {
      title:
        "US milk fat used to produce cheese (excluding cottage cheese) (million pounds) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "As the population grows, people buy more cheese overall and the economy also tends to produce more goods and services per person. So both cheese-making milk fat and income per person can rise together even if one isn\u2019t causing the other.",
        twoSeperateMediatorType:
          "More cheese production can support more jobs in farming, trucking, packaging, and food processing, which adds to economic output per person. It can also boost related businesses like restaurants and tourism around food products, increasing spending and incomes.",
        chainMediatorsType:
          "When people become wealthier, they tend to spend more on dining out and premium foods. That pushes restaurants and food brands to use more cheese, leading producers to use more milk fat to make it.",
      },
    },
  },
  {
    id: "correlation-7153",
    labels: {
      A: "Annual US household spending on major appliances (Household spend)",
      B: "Amazon.com's stock price (AMZN) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 188.0,
        value2: 0.55,
      },
      {
        label: "2003",
        value1: 196.0,
        value2: 0.96,
      },
      {
        label: "2004",
        value1: 204.0,
        value2: 2.64,
      },
      {
        label: "2005",
        value1: 223.0,
        value2: 2.25,
      },
      {
        label: "2006",
        value1: 241.0,
        value2: 2.37,
      },
      {
        label: "2007",
        value1: 231.0,
        value2: 1.93,
      },
      {
        label: "2008",
        value1: 204.0,
        value2: 4.77,
      },
      {
        label: "2009",
        value1: 194.0,
        value2: 2.57,
      },
      {
        label: "2010",
        value1: 209.0,
        value2: 6.81,
      },
      {
        label: "2011",
        value1: 194.0,
        value2: 9.07,
      },
      {
        label: "2012",
        value1: 197.0,
        value2: 8.79,
      },
      {
        label: "2013",
        value1: 214.0,
        value2: 12.8,
      },
      {
        label: "2014",
        value1: 233.0,
        value2: 19.94,
      },
      {
        label: "2015",
        value1: 268.0,
        value2: 15.63,
      },
      {
        label: "2016",
        value1: 283.0,
        value2: 32.81,
      },
      {
        label: "2017",
        value1: 280.0,
        value2: 37.9,
      },
      {
        label: "2018",
        value1: 304.0,
        value2: 58.6,
      },
      {
        label: "2019",
        value1: 322.0,
        value2: 73.26,
      },
      {
        label: "2020",
        value1: 354.0,
        value2: 93.75,
      },
      {
        label: "2021",
        value1: 464.0,
        value2: 163.5,
      },
      {
        label: "2022",
        value1: 408.0,
        value2: 167.55,
      },
    ],
    forward: {
      title:
        "Annual US household spending on major appliances (Household spend) correlates with Amazon.com's stock price (AMZN) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is strong, people feel comfortable buying big-ticket appliances and investors also bid up Amazon\u2019s stock. When the economy weakens, both appliance spending and the stock price tend to fall.",
        twoSeperateMediatorType:
          "Higher appliance spending can reflect households having more confidence and money, which can lead to more overall online shopping and help Amazon\u2019s results and stock price. It can also mean more appliances are being bought through Amazon or delivered using Amazon\u2019s logistics, boosting revenue and investor optimism.",
        chainMediatorsType:
          "If Amazon\u2019s stock rises, it can increase the wealth of shareholders and employees, making them more willing to spend on big purchases like appliances. The stronger stock performance can also encourage hiring and higher pay, which spreads into higher household budgets and more appliance spending.",
      },
    },
    backward: {
      title:
        "Amazon.com's stock price (AMZN) (Stock price) correlates with Annual US household spending on major appliances (Household spend)",
      explanations: {
        confounderType:
          "When the economy is strong, investors feel optimistic and bid up big tech stocks, and families also feel comfortable buying new appliances. When the economy weakens, both stock prices and appliance spending tend to fall.",
        twoSeperateMediatorType:
          "A higher stock price can boost retirement accounts and investment portfolios, making some households feel richer and more willing to replace appliances. It can also signal confidence in online shopping and faster delivery, nudging more people to buy appliances through e-commerce channels.",
        chainMediatorsType:
          "When households buy more major appliances, manufacturers and retailers see stronger sales, and shipping and delivery activity increases. That higher retail and delivery demand can improve expectations for large online retailers, which can push their stock price up.",
      },
    },
  },
  {
    id: "correlation-7195",
    labels: {
      A: "Rain in Miami (Inches precipitation)",
      B: "Votes for the Democratic Presidential candidate in Florida (Total votes)",
    },
    data: [
      {
        label: "1976",
        value1: 55.94,
        value2: 1636000.0,
      },
      {
        label: "1980",
        value1: 57.34,
        value2: 1419480.0,
      },
      {
        label: "1984",
        value1: 60.05,
        value2: 1448820.0,
      },
      {
        label: "1988",
        value1: 44.6,
        value2: 1656700.0,
      },
      {
        label: "1992",
        value1: 57.84,
        value2: 2071700.0,
      },
      {
        label: "1996",
        value1: 57.74,
        value2: 2546870.0,
      },
      {
        label: "2000",
        value1: 61.07,
        value2: 2912250.0,
      },
      {
        label: "2004",
        value1: 54.46,
        value2: 3583540.0,
      },
      {
        label: "2008",
        value1: 60.31,
        value2: 4282070.0,
      },
      {
        label: "2012",
        value1: 86.99,
        value2: 4237760.0,
      },
      {
        label: "2016",
        value1: 65.98,
        value2: 4504980.0,
      },
      {
        label: "2020",
        value1: 86.61,
        value2: 5297040.0,
      },
    ],
    forward: {
      title:
        "Rain in Miami (Inches precipitation) correlates with Votes for the Democratic Presidential candidate in Florida (Total votes)",
      explanations: {
        confounderType:
          "Years when Florida has a strong El Ni\u00f1o pattern can bring wetter weather to Miami and also change who turns out to vote and how different parts of the state vote. That shared climate pattern could make rainfall and Democratic vote totals rise and fall together even if one doesn\u2019t affect the other.",
        twoSeperateMediatorType:
          "Heavy rain in Miami can lead to more people using mail ballots or voting early to avoid bad weather, which can shift the final totals. Heavy rain can also cause disruptions like flooding and traffic that change how many people show up in person, which can affect the total votes counted for the Democratic candidate.",
        chainMediatorsType:
          "When Democrats do well statewide, it can lead to more federal attention and funding for South Florida in following years. That can change how the city manages drainage and water systems, which can affect how much rain ends up recorded as precipitation in Miami.",
      },
    },
    backward: {
      title:
        "Votes for the Democratic Presidential candidate in Florida (Total votes) correlates with Rain in Miami (Inches precipitation)",
      explanations: {
        confounderType:
          "The time of year can affect both how much it rains in Miami and how many people turn out to vote across Florida. Certain seasons bring wetter weather and also line up with higher or lower overall election participation, which changes the total votes.",
        twoSeperateMediatorType:
          "Higher totals for the Democratic candidate can reflect a larger turnout in big cities, which also tends to coincide with more local reporting and attention to Miami\u2019s weather, making rainfall measurements and reporting look more prominent. The same voting pattern can also track with population growth and development in South Florida, which can change local conditions and how rain is recorded at the main Miami station.",
        chainMediatorsType:
          "Heavier rain in Miami can disrupt travel and work schedules, which changes when and how many people can vote. That can shift turnout in South Florida, which then shifts the statewide total votes for the Democratic presidential candidate.",
      },
    },
  },
  {
    id: "correlation-7263",
    labels: {
      A: "Arson in Ohio (Arson rate)",
      B: "The divorce rate in Ohio (Divorce rate)",
    },
    data: [
      {
        label: "1999",
        value1: 29.6,
        value2: 3.9,
      },
      {
        label: "2000",
        value1: 29.4,
        value2: 4.2,
      },
      {
        label: "2001",
        value1: 37.1,
        value2: 4.0,
      },
      {
        label: "2002",
        value1: 34.5,
        value2: 4.0,
      },
      {
        label: "2003",
        value1: 28.3,
        value2: 3.7,
      },
      {
        label: "2004",
        value1: 30.4,
        value2: 3.6,
      },
      {
        label: "2005",
        value1: 29.0,
        value2: 3.5,
      },
      {
        label: "2006",
        value1: 34.8,
        value2: 3.5,
      },
      {
        label: "2007",
        value1: 34.1,
        value2: 3.4,
      },
      {
        label: "2008",
        value1: 31.8,
        value2: 3.3,
      },
      {
        label: "2009",
        value1: 30.1,
        value2: 3.3,
      },
      {
        label: "2010",
        value1: 28.2,
        value2: 3.4,
      },
      {
        label: "2011",
        value1: 26.7,
        value2: 3.4,
      },
      {
        label: "2012",
        value1: 30.8,
        value2: 3.4,
      },
      {
        label: "2013",
        value1: 23.0,
        value2: 3.29484,
      },
      {
        label: "2014",
        value1: 18.6,
        value2: 3.17479,
      },
      {
        label: "2015",
        value1: 21.1,
        value2: 3.07136,
      },
      {
        label: "2016",
        value1: 21.8,
        value2: 3.02987,
      },
      {
        label: "2017",
        value1: 12.5,
        value2: 2.92265,
      },
      {
        label: "2018",
        value1: 11.5,
        value2: 2.90596,
      },
      {
        label: "2019",
        value1: 10.7,
        value2: 2.76873,
      },
      {
        label: "2020",
        value1: 13.9,
        value2: 2.47289,
      },
      {
        label: "2021",
        value1: 9.2,
        value2: 2.62012,
      },
    ],
    forward: {
      title:
        "Arson in Ohio (Arson rate) correlates with The divorce rate in Ohio (Divorce rate)",
      explanations: {
        confounderType:
          "When the economy is doing poorly and people are under financial stress, more couples may split up and more people may act out destructively. That shared stress can make both divorce and arson rise and fall together.",
        twoSeperateMediatorType:
          "Arson can make neighborhoods feel unsafe and unstable, which can put extra strain on relationships and contribute to divorce. Arson can also lead to job loss, displacement, or big financial setbacks for families, which can separately increase the chances of divorce.",
        chainMediatorsType:
          "A divorce can create major financial strain and housing disruption, which can lead to more time in unstable living situations and with high-risk peers. That shift can increase the chance that someone ends up involved in destructive or illegal behavior like setting fires.",
      },
    },
    backward: {
      title:
        "The divorce rate in Ohio (Divorce rate) correlates with Arson in Ohio (Arson rate)",
      explanations: {
        confounderType:
          "When the economy is doing poorly, financial stress can lead to more breakups and also more desperate or reckless acts like setting fires. So both can rise and fall together because of the same underlying pressure.",
        twoSeperateMediatorType:
          "More breakups can lead to bitter disputes over property, and some people may retaliate by damaging a home or business with fire. Breakups can also increase heavy drinking or mental health crises for some people, which can raise the chance of dangerous behavior including arson.",
        chainMediatorsType:
          "More fires can destroy homes and possessions, forcing families into financial strain and unstable living situations. That stress can trigger ongoing conflict, which can eventually lead some couples to split up.",
      },
    },
  },
  {
    id: "correlation-7276",
    labels: {
      A: "Total solar power generated globally (Billion kWh)",
      B: "Xcel Energy's stock price (XEL) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 1.88448,
        value2: 27.8,
      },
      {
        label: "2003",
        value1: 2.34991,
        value2: 11.01,
      },
      {
        label: "2004",
        value1: 3.00012,
        value2: 17.08,
      },
      {
        label: "2005",
        value1: 4.17858,
        value2: 18.22,
      },
      {
        label: "2006",
        value1: 5.71197,
        value2: 18.52,
      },
      {
        label: "2007",
        value1: 7.70658,
        value2: 23.18,
      },
      {
        label: "2008",
        value1: 12.6478,
        value2: 22.51,
      },
      {
        label: "2009",
        value1: 21.0159,
        value2: 18.59,
      },
      {
        label: "2010",
        value1: 33.572,
        value2: 21.38,
      },
      {
        label: "2011",
        value1: 66.3206,
        value2: 23.67,
      },
      {
        label: "2012",
        value1: 104.216,
        value2: 27.89,
      },
      {
        label: "2013",
        value1: 146.678,
        value2: 27.03,
      },
      {
        label: "2014",
        value1: 202.22,
        value2: 27.91,
      },
      {
        label: "2015",
        value1: 260.179,
        value2: 36.02,
      },
      {
        label: "2016",
        value1: 341.478,
        value2: 35.61,
      },
      {
        label: "2017",
        value1: 445.051,
        value2: 40.74,
      },
      {
        label: "2018",
        value1: 569.838,
        value2: 48.22,
      },
      {
        label: "2019",
        value1: 701.027,
        value2: 49.16,
      },
      {
        label: "2020",
        value1: 849.135,
        value2: 63.55,
      },
      {
        label: "2021",
        value1: 1036.24,
        value2: 66.54,
      },
    ],
    forward: {
      title:
        "Total solar power generated globally (Billion kWh) correlates with Xcel Energy's stock price (XEL) (Stock price)",
      explanations: {
        confounderType:
          "Big shifts in energy policy and interest rates can both speed up solar build\u2011outs worldwide and change how investors value utility companies. That shared backdrop can make the two move together even if one isn\u2019t directly driving the other.",
        twoSeperateMediatorType:
          "As solar generation grows, equipment costs often fall and clean\u2011energy projects become easier to finance, which can improve expectations for utilities investing in renewables. Also, more solar can push utilities to modernize the grid and add new services, and investors may bid up the stock if they expect higher long\u2011term earnings.",
        chainMediatorsType:
          "If the stock rises, the company can raise money more easily and expand clean\u2011energy investments and partnerships. Those investments can help grow solar projects that add to the worldwide total over time.",
      },
    },
    backward: {
      title:
        "Xcel Energy's stock price (XEL) (Stock price) correlates with Total solar power generated globally (Billion kWh)",
      explanations: {
        confounderType:
          "Broad government energy and climate policy can both speed up solar adoption worldwide and change the outlook for a U.S. utility\u2019s profits. When policy shifts in a pro-clean-energy direction, both can move together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "If this utility\u2019s stock rises, the company can raise money more easily and invest more in clean-energy projects, which adds to global solar generation. Also, a strong stock price can boost investor confidence in the sector and help other solar projects get funded, increasing worldwide solar output.",
        chainMediatorsType:
          "As global solar generation grows, the cost of solar equipment tends to fall and the technology improves, making solar power cheaper and more competitive. That can lead utilities to add more solar and improve their long-term earnings outlook, pushing the stock price up.",
      },
    },
  },
  {
    id: "correlation-7331",
    labels: {
      A: "Total annual cinema attendance in the UK (Millions)",
      B: "Visitors to Disneyland (Disneyland Visitors)",
    },
    data: [
      {
        label: "2007",
        value1: 162400000.0,
        value2: 14.87,
      },
      {
        label: "2008",
        value1: 164200000.0,
        value2: 14.721,
      },
      {
        label: "2009",
        value1: 173500000.0,
        value2: 15.9,
      },
      {
        label: "2010",
        value1: 169200000.0,
        value2: 15.98,
      },
      {
        label: "2011",
        value1: 171600000.0,
        value2: 16.14,
      },
      {
        label: "2012",
        value1: 172500000.0,
        value2: 15.963,
      },
      {
        label: "2013",
        value1: 165500000.0,
        value2: 16.202,
      },
      {
        label: "2014",
        value1: 157500000.0,
        value2: 16.769,
      },
      {
        label: "2015",
        value1: 171500000.0,
        value2: 18.278,
      },
      {
        label: "2016",
        value1: 168300000.0,
        value2: 17.943,
      },
      {
        label: "2017",
        value1: 170600000.0,
        value2: 18.3,
      },
      {
        label: "2018",
        value1: 177000000.0,
        value2: 18.666,
      },
      {
        label: "2019",
        value1: 176100000.0,
        value2: 18.666,
      },
      {
        label: "2020",
        value1: 44000000.0,
        value2: 3.674,
      },
      {
        label: "2021",
        value1: 74000000.0,
        value2: 8.573,
      },
    ],
    forward: {
      title:
        "Total annual cinema attendance in the UK (Millions) correlates with Visitors to Disneyland (Disneyland Visitors)",
      explanations: {
        confounderType:
          "In years when people have more spare money and confidence about spending, they do more leisure activities. That can mean both more trips to the movies in the UK and more people taking expensive holidays to Disneyland.",
        twoSeperateMediatorType:
          "When lots of people go to the cinema, big family movies get more buzz and feel like must-see events, which can make a Disneyland trip seem more exciting and timely. Separately, popular films can boost interest in the characters and franchises that Disneyland is built around, encouraging more visits.",
        chainMediatorsType:
          "When Disneyland gets very busy, it creates more social media posts, news coverage, and word-of-mouth about themed entertainment. That attention can spill over into more interest in similar experiences back home, leading more people in the UK to go to the cinema.",
      },
    },
    backward: {
      title:
        "Visitors to Disneyland (Disneyland Visitors) correlates with Total annual cinema attendance in the UK (Millions)",
      explanations: {
        confounderType:
          "In years when people have more spare money and take more holidays, they both visit Disneyland more and also go to the cinema more. So both numbers rise and fall together because of the same underlying economic mood.",
        twoSeperateMediatorType:
          "People who visit Disneyland may come back more excited about entertainment and make cinema trips more often. Or the trip leads them to talk about films and characters with friends and family, which results in more group cinema outings.",
        chainMediatorsType:
          "When cinema attendance is high, big family films tend to do well and get more publicity. That publicity boosts interest in the characters and brands, then more people plan themed holidays, and some of those trips include visiting Disneyland.",
      },
    },
  },
  {
    id: "correlation-7509",
    labels: {
      A: "Yearly Total Gross Income of US Farms (Billion USD)",
      B: "Chipotle Mexican Grill's stock price (CMG) (Stock price)",
    },
    data: [
      {
        label: "2007",
        value1: 339.6,
        value2: 56.9,
      },
      {
        label: "2008",
        value1: 377.7,
        value2: 147.1,
      },
      {
        label: "2009",
        value1: 343.3,
        value2: 61.89,
      },
      {
        label: "2010",
        value1: 365.6,
        value2: 89.6,
      },
      {
        label: "2011",
        value1: 420.4,
        value2: 215.26,
      },
      {
        label: "2012",
        value1: 449.8,
        value2: 343.7,
      },
      {
        label: "2013",
        value1: 483.8,
        value2: 304.26,
      },
      {
        label: "2014",
        value1: 483.1,
        value2: 530.0,
      },
      {
        label: "2015",
        value1: 440.8,
        value2: 686.0,
      },
      {
        label: "2016",
        value1: 412.3,
        value2: 468.7,
      },
      {
        label: "2017",
        value1: 425.4,
        value2: 379.11,
      },
      {
        label: "2018",
        value1: 424.9,
        value2: 290.9,
      },
      {
        label: "2019",
        value1: 427.7,
        value2: 427.83,
      },
      {
        label: "2020",
        value1: 452.2,
        value2: 839.97,
      },
      {
        label: "2021",
        value1: 513.2,
        value2: 1386.68,
      },
      {
        label: "2022",
        value1: 604.1,
        value2: 1740.0,
      },
    ],
    forward: {
      title:
        "Yearly Total Gross Income of US Farms (Billion USD) correlates with Chipotle Mexican Grill's stock price (CMG) (Stock price)",
      explanations: {
        confounderType:
          "A strong overall economy can boost farm earnings through higher food demand while also pushing up restaurant stocks as investors expect better sales. When the economy weakens, both farm income and the stock price can fall together.",
        twoSeperateMediatorType:
          "When farms earn more, food supply is steadier and key ingredients can be more available, helping the restaurant keep menu items in stock and sell more. Higher farm earnings can also signal healthy food spending and strong conditions in the food sector, which can improve investor optimism and lift the stock price.",
        chainMediatorsType:
          "If the stock price rises, the company can more easily raise money and expand, which increases its purchases of ingredients like produce and meat. That extra buying can raise demand for farm products and contribute to higher total farm income over time.",
      },
    },
    backward: {
      title:
        "Chipotle Mexican Grill's stock price (CMG) (Stock price) correlates with Yearly Total Gross Income of US Farms (Billion USD)",
      explanations: {
        confounderType:
          "A strong overall economy can boost restaurant spending, pushing the stock up, while also increasing demand and prices for farm products, raising farm income. When the economy cools, both can fall for the same reason.",
        twoSeperateMediatorType:
          "When the stock rises, the company can more easily raise money and expand, buying more meat and produce, which supports higher sales for farms. A higher stock price can also attract more attention and customers, increasing ingredient purchases and helping farm income rise.",
        chainMediatorsType:
          "When farms earn more, food commodity prices and ingredient costs are often higher. Higher input costs can squeeze the restaurant chain\u2019s profit expectations, which can push the stock price down (or up if the company can pass prices on to customers).",
      },
    },
  },
  {
    id: "correlation-7689",
    labels: {
      A: "US GDP per capita (US Dollars)",
      B: "Annual Revenue of Walt Disney Company (US Dollars)",
    },
    data: [
      {
        label: "2009",
        value1: 46999.0,
        value2: 36149000.0,
      },
      {
        label: "2010",
        value1: 48358.0,
        value2: 38063000.0,
      },
      {
        label: "2011",
        value1: 50066.0,
        value2: 40893000.0,
      },
      {
        label: "2012",
        value1: 51784.4,
        value2: 42278000.0,
      },
      {
        label: "2013",
        value1: 53291.1,
        value2: 45041000.0,
      },
      {
        label: "2014",
        value1: 55123.9,
        value2: 48813000.0,
      },
      {
        label: "2015",
        value1: 56762.7,
        value2: 52465000.0,
      },
      {
        label: "2016",
        value1: 57866.7,
        value2: 55632000.0,
      },
      {
        label: "2017",
        value1: 59907.8,
        value2: 55137000.0,
      },
      {
        label: "2018",
        value1: 62823.3,
        value2: 59434000.0,
      },
      {
        label: "2019",
        value1: 65120.4,
        value2: 69607000.0,
      },
      {
        label: "2020",
        value1: 63530.6,
        value2: 65388000.0,
      },
      {
        label: "2021",
        value1: 70248.6,
        value2: 67418000.0,
      },
      {
        label: "2022",
        value1: 76399.0,
        value2: 82722000.0,
      },
    ],
    forward: {
      title:
        "US GDP per capita (US Dollars) correlates with Annual Revenue of Walt Disney Company (US Dollars)",
      explanations: {
        confounderType:
          "Both measures tend to rise when the overall economy is doing well, because strong business conditions lift wages and jobs and also boost spending on movies, parks, and streaming. When the economy weakens, both can fall for the same reason.",
        twoSeperateMediatorType:
          "When people earn more on average, they have more disposable income to spend on entertainment, travel, and subscriptions, which can increase the company\u2019s revenue. Higher average income also encourages businesses to spend more on advertising and partnerships, which can raise the company\u2019s revenue through more promotion and deals.",
        chainMediatorsType:
          "When the company brings in more revenue, it often hires more people and pays more wages and contractor fees, which increases household income. As those paychecks circulate and workers spend more, local businesses grow and productivity can rise, which can nudge average income per person upward.",
      },
    },
    backward: {
      title:
        "Annual Revenue of Walt Disney Company (US Dollars) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "Overall population growth and inflation over time can make both Disney\u2019s reported revenue and income-per-person in the U.S. rise together. They look linked mainly because both are moving with the general growth of the economy and prices.",
        twoSeperateMediatorType:
          "When Disney earns more, it hires more people and pays more in wages and contractor spending, which can raise average income levels. Also, higher Disney revenue often means more production, park investment, and tourism activity, which boosts related businesses and increases economic output per person.",
        chainMediatorsType:
          "When people have higher income per person, they spend more on entertainment and vacations. That increases attendance at theme parks and spending on movies/streaming and merchandise, leading to higher Disney revenue.",
      },
    },
  },
  {
    id: "correlation-7725",
    labels: {
      A: "US GDP per capita (US Dollars)",
      B: "US Wind Power Generation Capacity (Killowatt hours)",
    },
    data: [
      {
        label: "2009",
        value1: 46999.0,
        value2: 73890000000.0,
      },
      {
        label: "2010",
        value1: 48358.0,
        value2: 94650000000.0,
      },
      {
        label: "2011",
        value1: 50066.0,
        value2: 120180000000.0,
      },
      {
        label: "2012",
        value1: 51784.4,
        value2: 140820000000.0,
      },
      {
        label: "2013",
        value1: 53291.1,
        value2: 167670000000.0,
      },
      {
        label: "2014",
        value1: 55123.9,
        value2: 181660000000.0,
      },
      {
        label: "2015",
        value1: 56762.7,
        value2: 190720000000.0,
      },
      {
        label: "2016",
        value1: 57866.7,
        value2: 226990000000.0,
      },
      {
        label: "2017",
        value1: 59907.8,
        value2: 254300000000.0,
      },
      {
        label: "2018",
        value1: 62823.3,
        value2: 272680000000.0,
      },
      {
        label: "2019",
        value1: 65120.4,
        value2: 295990000000.0,
      },
      {
        label: "2020",
        value1: 63530.6,
        value2: 337940000000.0,
      },
      {
        label: "2021",
        value1: 70248.6,
        value2: 378200000000.0,
      },
      {
        label: "2022",
        value1: 76399.0,
        value2: 434810000000.0,
      },
    ],
    forward: {
      title:
        "US GDP per capita (US Dollars) correlates with US Wind Power Generation Capacity (Killowatt hours)",
      explanations: {
        confounderType:
          "Over time, improvements in technology and government policy can boost the economy and also make it easier and cheaper to build wind farms. That shared progress can make both numbers rise together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "When people earn more on average, there is more investment money available, which can be used to finance new wind projects. Higher incomes can also raise demand for cleaner energy, pushing utilities and lawmakers to add more wind power.",
        chainMediatorsType:
          "Building more wind power can create jobs in manufacturing, construction, and maintenance. Those jobs increase local spending, help businesses grow, and over time can raise average income per person.",
      },
    },
    backward: {
      title:
        "US Wind Power Generation Capacity (Killowatt hours) correlates with US GDP per capita (US Dollars)",
      explanations: {
        confounderType:
          "Over time, improvements in technology and supportive energy policies can both make wind power cheaper to build and help the economy become more productive. That shared push can make wind capacity and income per person rise together.",
        twoSeperateMediatorType:
          "More wind power can lower electricity costs, leaving households and businesses with more money to spend and invest, which can raise income per person. It can also create construction, manufacturing, and maintenance jobs, boosting wages and local economic activity.",
        chainMediatorsType:
          "When income per person grows, governments and companies often have more money to put into cleaner infrastructure. That can lead to more research and better grid upgrades, which then makes it easier and cheaper to add more wind power capacity.",
      },
    },
  },
  {
    id: "correlation-7743",
    labels: {
      A: "The number of mechanical engineers in California (Mechanical Engineers)",
      B: "Intel's stock price (INTC) (Stock price)",
    },
    data: [
      {
        label: "2003",
        value1: 21150.0,
        value2: 16.02,
      },
      {
        label: "2004",
        value1: 22140.0,
        value2: 32.36,
      },
      {
        label: "2005",
        value1: 22970.0,
        value2: 23.64,
      },
      {
        label: "2006",
        value1: 23220.0,
        value2: 25.19,
      },
      {
        label: "2007",
        value1: 22290.0,
        value2: 20.45,
      },
      {
        label: "2008",
        value1: 23070.0,
        value2: 26.28,
      },
      {
        label: "2009",
        value1: 21420.0,
        value2: 14.69,
      },
      {
        label: "2010",
        value1: 22000.0,
        value2: 20.79,
      },
      {
        label: "2011",
        value1: 21940.0,
        value2: 21.01,
      },
      {
        label: "2012",
        value1: 23900.0,
        value2: 24.62,
      },
      {
        label: "2013",
        value1: 23240.0,
        value2: 21.15,
      },
      {
        label: "2014",
        value1: 24030.0,
        value2: 25.78,
      },
      {
        label: "2015",
        value1: 23850.0,
        value2: 36.67,
      },
      {
        label: "2016",
        value1: 24830.0,
        value2: 33.88,
      },
      {
        label: "2017",
        value1: 25630.0,
        value2: 36.61,
      },
      {
        label: "2018",
        value1: 27330.0,
        value2: 46.38,
      },
      {
        label: "2019",
        value1: 27830.0,
        value2: 45.96,
      },
      {
        label: "2020",
        value1: 28130.0,
        value2: 60.24,
      },
      {
        label: "2021",
        value1: 28450.0,
        value2: 49.89,
      },
      {
        label: "2022",
        value1: 28100.0,
        value2: 51.65,
      },
    ],
    forward: {
      title:
        "The number of mechanical engineers in California (Mechanical Engineers) correlates with Intel's stock price (INTC) (Stock price)",
      explanations: {
        confounderType:
          "When the tech economy in California is booming, companies hire more mechanical engineers and investors also bid up Intel\u2019s stock. When the tech economy slows, hiring drops and the stock often falls too.",
        twoSeperateMediatorType:
          "More mechanical engineers can lead to more hardware product development and manufacturing activity that uses Intel chips, which can boost Intel\u2019s sales and stock price. More mechanical engineers can also mean more engineering startups and corporate labs forming in California, increasing demand for Intel\u2019s technology and lifting investor expectations.",
        chainMediatorsType:
          "If Intel\u2019s stock price rises, Intel and similar companies may expand budgets and launch more projects in California. That expansion can increase hiring by contractors and suppliers, and eventually raises the number of mechanical engineers working in the state.",
      },
    },
    backward: {
      title:
        "Intel's stock price (INTC) (Stock price) correlates with The number of mechanical engineers in California (Mechanical Engineers)",
      explanations: {
        confounderType:
          "When the U.S. economy is doing well, Intel often earns more and its stock can rise, and California companies also hire more mechanical engineers. When the economy slows down, both can fall at the same time.",
        twoSeperateMediatorType:
          "If Intel\u2019s stock rises, the company may expand and spend more on building and upgrading facilities, which can increase demand for mechanical engineers in California. Separately, a higher stock price can lift investor and tech-sector confidence, leading other California firms to expand and hire more mechanical engineers too.",
        chainMediatorsType:
          "If the number of mechanical engineers in California grows, it can boost factory and product-development capacity in the region, increasing output and innovation. That can strengthen the broader semiconductor supply network and results for Intel, which can push its stock price higher.",
      },
    },
  },
  {
    id: "correlation-7779",
    labels: {
      A: "Restaurant spending in Michigan (Per capita spend)",
      B: "Total Revenue of the NFL Teams (Billion US Dollars)",
    },
    data: [
      {
        label: "2001",
        value1: 1080.78,
        value2: 4.28,
      },
      {
        label: "2002",
        value1: 1107.97,
        value2: 4.94,
      },
      {
        label: "2003",
        value1: 1159.2,
        value2: 5.33,
      },
      {
        label: "2004",
        value1: 1235.77,
        value2: 6.03,
      },
      {
        label: "2005",
        value1: 1289.16,
        value2: 6.16,
      },
      {
        label: "2006",
        value1: 1345.29,
        value2: 6.54,
      },
      {
        label: "2007",
        value1: 1422.37,
        value2: 7.09,
      },
      {
        label: "2008",
        value1: 1465.96,
        value2: 7.57,
      },
      {
        label: "2009",
        value1: 1442.65,
        value2: 8.02,
      },
      {
        label: "2010",
        value1: 1475.41,
        value2: 8.35,
      },
      {
        label: "2011",
        value1: 1546.64,
        value2: 8.82,
      },
      {
        label: "2012",
        value1: 1627.83,
        value2: 9.17,
      },
      {
        label: "2013",
        value1: 1710.55,
        value2: 9.58,
      },
      {
        label: "2014",
        value1: 1793.21,
        value2: 11.09,
      },
      {
        label: "2015",
        value1: 1941.39,
        value2: 12.16,
      },
      {
        label: "2016",
        value1: 2061.08,
        value2: 13.16,
      },
      {
        label: "2017",
        value1: 2185.04,
        value2: 13.68,
      },
      {
        label: "2018",
        value1: 2282.34,
        value2: 14.48,
      },
      {
        label: "2019",
        value1: 2335.44,
        value2: 15.26,
      },
      {
        label: "2020",
        value1: 1979.61,
        value2: 12.2,
      },
    ],
    forward: {
      title:
        "Restaurant spending in Michigan (Per capita spend) correlates with Total Revenue of the NFL Teams (Billion US Dollars)",
      explanations: {
        confounderType:
          "When the economy is doing well and people have more disposable income, they tend to eat out more and also spend more on pro football (tickets, gear, and TV packages). When times are tougher, both kinds of spending drop.",
        twoSeperateMediatorType:
          "Higher dining spending can reflect more tourism and local outings, which also leads to more game-day attendance and related spending that boosts team revenue. It can also signal a stronger local business scene, leading companies to buy more sponsorships and premium seating that raise team revenue.",
        chainMediatorsType:
          "When pro football teams bring in more money, they can invest more in star players and marketing, which can increase fan excitement and game attendance. More people going to games often means more visits to nearby restaurants before and after, raising restaurant spending.",
      },
    },
    backward: {
      title:
        "Total Revenue of the NFL Teams (Billion US Dollars) correlates with Restaurant spending in Michigan (Per capita spend)",
      explanations: {
        confounderType:
          "When the economy is doing well, companies and fans spend more on tickets, merchandise, and TV packages, boosting NFL team revenue. At the same time, people in Michigan have more money to eat out, increasing restaurant spending.",
        twoSeperateMediatorType:
          "Higher NFL team revenue can reflect booming TV and marketing activity, and that extra advertising pushes more people to go out to sports bars and restaurants to watch games. It can also signal more big games and events, which draw visitors who spend money at Michigan restaurants.",
        chainMediatorsType:
          "When people in Michigan spend more at restaurants, those restaurants may hire more staff and buy more supplies, which boosts local business income. That can flow into higher spending on sports entertainment and sponsorships, eventually helping drive up NFL team revenue.",
      },
    },
  },
  {
    id: "correlation-7848",
    labels: {
      A: "Annual US household spending on home maintenance (Household spend)",
      B: "The Sherwin-Williams Company's stock price (SHW) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 960.0,
        value2: 9.17,
      },
      {
        label: "2003",
        value1: 965.0,
        value2: 9.5,
      },
      {
        label: "2004",
        value1: 997.0,
        value2: 11.4,
      },
      {
        label: "2005",
        value1: 1101.0,
        value2: 14.86,
      },
      {
        label: "2006",
        value1: 1115.0,
        value2: 14.7,
      },
      {
        label: "2007",
        value1: 1131.0,
        value2: 21.03,
      },
      {
        label: "2008",
        value1: 1176.0,
        value2: 19.2,
      },
      {
        label: "2009",
        value1: 1138.0,
        value2: 19.95,
      },
      {
        label: "2010",
        value1: 1112.0,
        value2: 20.71,
      },
      {
        label: "2011",
        value1: 1120.0,
        value2: 27.97,
      },
      {
        label: "2012",
        value1: 1153.0,
        value2: 30.13,
      },
      {
        label: "2013",
        value1: 1182.0,
        value2: 52.0,
      },
      {
        label: "2014",
        value1: 1293.0,
        value2: 60.68,
      },
      {
        label: "2015",
        value1: 1438.0,
        value2: 87.39,
      },
      {
        label: "2016",
        value1: 1437.0,
        value2: 85.77,
      },
      {
        label: "2017",
        value1: 1616.0,
        value2: 90.24,
      },
      {
        label: "2018",
        value1: 1703.0,
        value2: 136.86,
      },
      {
        label: "2019",
        value1: 1879.0,
        value2: 129.79,
      },
      {
        label: "2020",
        value1: 2158.0,
        value2: 195.01,
      },
      {
        label: "2021",
        value1: 2335.0,
        value2: 244.99,
      },
      {
        label: "2022",
        value1: 2559.0,
        value2: 348.48,
      },
    ],
    forward: {
      title:
        "Annual US household spending on home maintenance (Household spend) correlates with The Sherwin-Williams Company's stock price (SHW) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, households have more money to fix up their homes and investors also bid up paint-company stocks. When the economy is weak, both home maintenance spending and the stock price tend to fall.",
        twoSeperateMediatorType:
          "More home maintenance spending can drive up sales of paint and related supplies, which makes the company\u2019s revenue look stronger and can lift its stock price. It can also signal a healthier housing market, which boosts expectations for future demand and supports the stock price.",
        chainMediatorsType:
          "If the company\u2019s stock price rises, it can bring positive news coverage and confidence about home improvement and housing. That optimism can spread to consumers and lead more households to spend on home maintenance.",
      },
    },
    backward: {
      title:
        "The Sherwin-Williams Company's stock price (SHW) (Stock price) correlates with Annual US household spending on home maintenance (Household spend)",
      explanations: {
        confounderType:
          "A strong housing market can lift both Sherwin-Williams\u2019 sales expectations (pushing the stock up) and encourage homeowners to spend more on repairs and upkeep. When home prices and construction activity rise, both can move together even if neither directly causes the other.",
        twoSeperateMediatorType:
          "When Sherwin-Williams\u2019 stock rises, the company may expand stores, marketing, and product availability, making it easier for people to buy paint and related supplies and boosting home-maintenance spending. A higher stock price can also improve the company\u2019s ability to invest in discounts, promotions, or new products that prompt more household projects and spending.",
        chainMediatorsType:
          "When households spend more on home maintenance, retailers and contractors order more paint and supplies, which increases Sherwin-Williams\u2019 sales. Better sales lead analysts to raise profit forecasts, which can attract more investors and push the stock price higher.",
      },
    },
  },
  {
    id: "correlation-7900",
    labels: {
      A: "Annual US household spending on home maintenance (Household spend)",
      B: "The Home Depot's stock price (HD) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 960.0,
        value2: 51.01,
      },
      {
        label: "2003",
        value1: 965.0,
        value2: 24.21,
      },
      {
        label: "2004",
        value1: 997.0,
        value2: 35.75,
      },
      {
        label: "2005",
        value1: 1101.0,
        value2: 42.99,
      },
      {
        label: "2006",
        value1: 1115.0,
        value2: 40.39,
      },
      {
        label: "2007",
        value1: 1131.0,
        value2: 41.3,
      },
      {
        label: "2008",
        value1: 1176.0,
        value2: 27.13,
      },
      {
        label: "2009",
        value1: 1138.0,
        value2: 23.07,
      },
      {
        label: "2010",
        value1: 1112.0,
        value2: 29.15,
      },
      {
        label: "2011",
        value1: 1120.0,
        value2: 35.2,
      },
      {
        label: "2012",
        value1: 1153.0,
        value2: 42.41,
      },
      {
        label: "2013",
        value1: 1182.0,
        value2: 63.57,
      },
      {
        label: "2014",
        value1: 1293.0,
        value2: 82.11,
      },
      {
        label: "2015",
        value1: 1438.0,
        value2: 105.16,
      },
      {
        label: "2016",
        value1: 1437.0,
        value2: 130.11,
      },
      {
        label: "2017",
        value1: 1616.0,
        value2: 135.1,
      },
      {
        label: "2018",
        value1: 1703.0,
        value2: 190.21,
      },
      {
        label: "2019",
        value1: 1879.0,
        value2: 169.71,
      },
      {
        label: "2020",
        value1: 2158.0,
        value2: 219.08,
      },
      {
        label: "2021",
        value1: 2335.0,
        value2: 266.01,
      },
      {
        label: "2022",
        value1: 2559.0,
        value2: 416.57,
      },
    ],
    forward: {
      title:
        "Annual US household spending on home maintenance (Household spend) correlates with The Home Depot's stock price (HD) (Stock price)",
      explanations: {
        confounderType:
          "When the overall economy is strong, households feel comfortable spending more on home upkeep, and investors also bid up Home Depot\u2019s stock because they expect higher sales. When the economy weakens, both household spending and the stock price tend to fall.",
        twoSeperateMediatorType:
          "Higher home-maintenance spending can directly boost Home Depot\u2019s revenue because more people buy supplies there, which can raise the stock price. It can also signal a broader home-improvement trend that makes analysts upgrade expectations for the company, pushing the stock price up.",
        chainMediatorsType:
          "If Home Depot\u2019s stock rises a lot, it can lead to the company expanding stores, marketing, and promotions, making it easier and more tempting for people to buy maintenance supplies. Those promotions and expanded availability can then lead households to spend more on home maintenance.",
      },
    },
    backward: {
      title:
        "The Home Depot's stock price (HD) (Stock price) correlates with Annual US household spending on home maintenance (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is strong and people feel secure about their jobs and money, they both spend more on home upkeep and investors bid up the company\u2019s stock. When the economy weakens, both tend to fall for the same reason.",
        twoSeperateMediatorType:
          "As the company\u2019s stock rises, it becomes easier and cheaper for the company to raise money and open more stores or improve its services, which can make it more convenient for people to buy home-maintenance supplies and spend more. A higher stock price can also boost publicity and confidence in the brand, drawing in more customers and increasing home-maintenance spending through that route too.",
        chainMediatorsType:
          "When households spend more on home maintenance, the company sells more products and reports stronger revenue and profits. That leads analysts to raise forecasts and investors to buy the stock, pushing the share price up.",
      },
    },
  },
  {
    id: "correlation-8090",
    labels: {
      A: "Annual US household spending on home maintenance (Household spend)",
      B: "Costco Wholesale's stock price (COST) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 960.0,
        value2: 41.12,
      },
      {
        label: "2003",
        value1: 965.0,
        value2: 26.27,
      },
      {
        label: "2004",
        value1: 997.0,
        value2: 34.6,
      },
      {
        label: "2005",
        value1: 1101.0,
        value2: 44.88,
      },
      {
        label: "2006",
        value1: 1115.0,
        value2: 46.28,
      },
      {
        label: "2007",
        value1: 1131.0,
        value2: 49.63,
      },
      {
        label: "2008",
        value1: 1176.0,
        value2: 64.78,
      },
      {
        label: "2009",
        value1: 1138.0,
        value2: 48.79,
      },
      {
        label: "2010",
        value1: 1112.0,
        value2: 55.01,
      },
      {
        label: "2011",
        value1: 1120.0,
        value2: 67.68,
      },
      {
        label: "2012",
        value1: 1153.0,
        value2: 78.41,
      },
      {
        label: "2013",
        value1: 1182.0,
        value2: 93.59,
      },
      {
        label: "2014",
        value1: 1293.0,
        value2: 110.44,
      },
      {
        label: "2015",
        value1: 1438.0,
        value2: 131.99,
      },
      {
        label: "2016",
        value1: 1437.0,
        value2: 153.6,
      },
      {
        label: "2017",
        value1: 1616.0,
        value2: 154.41,
      },
      {
        label: "2018",
        value1: 1703.0,
        value2: 187.23,
      },
      {
        label: "2019",
        value1: 1879.0,
        value2: 200.5,
      },
      {
        label: "2020",
        value1: 2158.0,
        value2: 294.06,
      },
      {
        label: "2021",
        value1: 2335.0,
        value2: 377.43,
      },
      {
        label: "2022",
        value1: 2559.0,
        value2: 565.03,
      },
    ],
    forward: {
      title:
        "Annual US household spending on home maintenance (Household spend) correlates with Costco Wholesale's stock price (COST) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, people have more money to spend on fixing up their homes, and investors also feel more optimistic about big retailers, pushing the stock price up. In a weaker economy, both tend to fall.",
        twoSeperateMediatorType:
          "When people spend more on home maintenance, they often buy tools, storage, cleaning supplies, and other household items during those trips, which can lift the company\u2019s sales and stock price. Higher home-maintenance spending can also reflect greater overall consumer confidence, which can boost retail traffic and make investors value the company more.",
        chainMediatorsType:
          "If the company\u2019s stock price rises, it can make shareholders feel wealthier and more willing to spend money. That extra willingness can flow into bigger household budgets and eventually into more spending on home maintenance.",
      },
    },
    backward: {
      title:
        "Costco Wholesale's stock price (COST) (Stock price) correlates with Annual US household spending on home maintenance (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is strong, Costco tends to sell more and investors bid up the stock price. In those same good times, households also feel comfortable spending more on home maintenance.",
        twoSeperateMediatorType:
          "A rising Costco stock price can make some shareholders feel wealthier, so they\u2019re more willing to pay for home repairs and upgrades. It can also reflect Costco expanding home-related offerings and promotions, which nudges more households to buy maintenance supplies and services.",
        chainMediatorsType:
          "When households start spending more on home maintenance, demand increases for building materials, tools, and related goods across retailers. That higher demand can lift Costco\u2019s sales and profits, leading investors to push the stock price up.",
      },
    },
  },
  {
    id: "correlation-8167",
    labels: {
      A: "Annual US household spending on clothing (Household spend)",
      B: "Visitors to Disneyland (Disneyland Visitors)",
    },
    data: [
      {
        label: "2007",
        value1: 1881.0,
        value2: 14.87,
      },
      {
        label: "2008",
        value1: 1801.0,
        value2: 14.721,
      },
      {
        label: "2009",
        value1: 1725.0,
        value2: 15.9,
      },
      {
        label: "2010",
        value1: 1700.0,
        value2: 15.98,
      },
      {
        label: "2011",
        value1: 1740.0,
        value2: 16.14,
      },
      {
        label: "2012",
        value1: 1736.0,
        value2: 15.963,
      },
      {
        label: "2013",
        value1: 1604.0,
        value2: 16.202,
      },
      {
        label: "2014",
        value1: 1786.0,
        value2: 16.769,
      },
      {
        label: "2015",
        value1: 1846.0,
        value2: 18.278,
      },
      {
        label: "2016",
        value1: 1803.0,
        value2: 17.943,
      },
      {
        label: "2017",
        value1: 1833.0,
        value2: 18.3,
      },
      {
        label: "2018",
        value1: 1866.0,
        value2: 18.666,
      },
      {
        label: "2019",
        value1: 1883.0,
        value2: 18.666,
      },
      {
        label: "2020",
        value1: 1434.0,
        value2: 3.674,
      },
      {
        label: "2021",
        value1: 1754.0,
        value2: 8.573,
      },
    ],
    forward: {
      title:
        "Annual US household spending on clothing (Household spend) correlates with Visitors to Disneyland (Disneyland Visitors)",
      explanations: {
        confounderType:
          "When the economy is doing well, families have more money for both new clothes and vacations. When times are tough, they cut back on both, so the two tend to rise and fall together.",
        twoSeperateMediatorType:
          "Buying more clothes can be a sign that families are getting ready for travel, which makes them more likely to take a theme-park trip. It can also reflect a more outgoing, leisure-focused lifestyle, which goes along with taking more big family outings like Disneyland.",
        chainMediatorsType:
          "A Disneyland trip often leads families to buy photos and souvenirs and share them, which can create a \u201cwe need new outfits\u201d moment for future events and pictures. After that, families may spend more on clothing to match the upgraded vacation-and-social routine.",
      },
    },
    backward: {
      title:
        "Visitors to Disneyland (Disneyland Visitors) correlates with Annual US household spending on clothing (Household spend)",
      explanations: {
        confounderType:
          "When the economy is doing well, more people can afford vacations and also buy more clothing. When times are tight, both trips and clothing purchases tend to drop.",
        twoSeperateMediatorType:
          "A Disney trip often includes buying themed outfits, matching family shirts, or special shoes for the park, which raises clothing spending. It can also prompt people to buy new clothes afterward because they took lots of photos and want outfits for sharing or future trips.",
        chainMediatorsType:
          "Higher clothing spending can reflect that families have extra money and are in a \u201ctreat ourselves\u201d mode. That can lead to planning more leisure activities and then choosing a big trip like Disneyland.",
      },
    },
  },
  {
    id: "correlation-8404",
    labels: {
      A: "Inflation in the US (CPI)",
      B: "Annual Revenue of Walt Disney Company (US Dollars)",
    },
    data: [
      {
        label: "1992",
        value1: 140.3,
        value2: 7502000.0,
      },
      {
        label: "1993",
        value1: 144.5,
        value2: 8529000.0,
      },
      {
        label: "1994",
        value1: 148.2,
        value2: 10414000.0,
      },
      {
        label: "1995",
        value1: 152.4,
        value2: 12525000.0,
      },
      {
        label: "1996",
        value1: 156.9,
        value2: 18739000.0,
      },
      {
        label: "1997",
        value1: 160.5,
        value2: 22473000.0,
      },
      {
        label: "1998",
        value1: 163.0,
        value2: 22976000.0,
      },
      {
        label: "1999",
        value1: 166.6,
        value2: 23402000.0,
      },
      {
        label: "2000",
        value1: 172.2,
        value2: 25402000.0,
      },
      {
        label: "2001",
        value1: 177.1,
        value2: 25790000.0,
      },
      {
        label: "2002",
        value1: 179.9,
        value2: 25360000.0,
      },
      {
        label: "2003",
        value1: 184.0,
        value2: 27061000.0,
      },
      {
        label: "2004",
        value1: 188.9,
        value2: 30752000.0,
      },
      {
        label: "2005",
        value1: 195.3,
        value2: 31944000.0,
      },
      {
        label: "2006",
        value1: 201.6,
        value2: 34285000.0,
      },
      {
        label: "2007",
        value1: 207.34,
        value2: 35510000.0,
      },
      {
        label: "2008",
        value1: 215.3,
        value2: 37843000.0,
      },
      {
        label: "2009",
        value1: 214.54,
        value2: 36149000.0,
      },
      {
        label: "2010",
        value1: 218.06,
        value2: 38063000.0,
      },
      {
        label: "2011",
        value1: 224.94,
        value2: 40893000.0,
      },
      {
        label: "2012",
        value1: 229.59,
        value2: 42278000.0,
      },
      {
        label: "2013",
        value1: 232.96,
        value2: 45041000.0,
      },
      {
        label: "2014",
        value1: 236.74,
        value2: 48813000.0,
      },
      {
        label: "2015",
        value1: 237.02,
        value2: 52465000.0,
      },
      {
        label: "2016",
        value1: 240.01,
        value2: 55632000.0,
      },
      {
        label: "2017",
        value1: 245.12,
        value2: 55137000.0,
      },
      {
        label: "2018",
        value1: 251.11,
        value2: 59434000.0,
      },
      {
        label: "2019",
        value1: 255.66,
        value2: 69607000.0,
      },
      {
        label: "2020",
        value1: 258.81,
        value2: 65388000.0,
      },
      {
        label: "2021",
        value1: 270.97,
        value2: 67418000.0,
      },
      {
        label: "2022",
        value1: 292.56,
        value2: 82722000.0,
      },
    ],
    forward: {
      title:
        "Inflation in the US (CPI) correlates with Annual Revenue of Walt Disney Company (US Dollars)",
      explanations: {
        confounderType:
          "Overall economic conditions can push prices up across the country and also change how much people spend on movies, theme parks, and streaming. When the economy is strong and wages rise, both inflation and Disney\u2019s revenue may rise together.",
        twoSeperateMediatorType:
          "When prices rise, Disney may raise ticket prices, hotel rates, and subscription fees, which can increase revenue. Rising prices can also lead to higher wages and bigger paychecks in dollar terms, so families may spend more dollars on travel and entertainment, boosting Disney\u2019s sales.",
        chainMediatorsType:
          "If Disney has a very strong year, it may hire more, invest more, and drive more travel and local spending around its parks and productions. That extra spending can add to overall demand in parts of the economy and contribute a small amount to higher prices over time.",
      },
    },
    backward: {
      title:
        "Annual Revenue of Walt Disney Company (US Dollars) correlates with Inflation in the US (CPI)",
      explanations: {
        confounderType:
          "When the overall economy is booming, people spend more on entertainment and travel, and prices across the country also tend to rise. That shared economic boom can make Disney\u2019s revenue and inflation move together even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "Higher Disney revenue can mean more spending on wages, contractors, marketing, and big productions, which can push up some prices. It can also increase travel demand to Disney parks and related services, putting upward pressure on prices in tourism-heavy areas.",
        chainMediatorsType:
          "When prices rise, families often have less extra money after paying for essentials like groceries and rent. That can reduce discretionary spending on vacations, theme parks, movies, and merchandise, which eventually lowers Disney\u2019s revenue.",
      },
    },
  },
  {
    id: "correlation-8500",
    labels: {
      A: "Arson in Massachusetts (Arson rate)",
      B: "The number of fire inspectors in Massachusetts (Laborers)",
    },
    data: [
      {
        label: "2003",
        value1: 10.5,
        value2: 310.0,
      },
      {
        label: "2004",
        value1: 9.3,
        value2: 310.0,
      },
      {
        label: "2005",
        value1: 9.7,
        value2: 270.0,
      },
      {
        label: "2006",
        value1: 10.3,
        value2: 250.0,
      },
      {
        label: "2007",
        value1: 10.6,
        value2: 290.0,
      },
      {
        label: "2008",
        value1: 10.6,
        value2: 340.0,
      },
      {
        label: "2009",
        value1: 10.7,
        value2: 380.0,
      },
      {
        label: "2010",
        value1: 10.0,
        value2: 350.0,
      },
      {
        label: "2011",
        value1: 8.5,
        value2: 310.0,
      },
      {
        label: "2012",
        value1: 9.3,
        value2: 210.0,
      },
      {
        label: "2013",
        value1: 7.6,
        value2: 220.0,
      },
      {
        label: "2014",
        value1: 7.1,
        value2: 200.0,
      },
      {
        label: "2015",
        value1: 5.7,
        value2: 200.0,
      },
      {
        label: "2016",
        value1: 6.5,
        value2: 190.0,
      },
      {
        label: "2017",
        value1: 5.6,
        value2: 180.0,
      },
      {
        label: "2018",
        value1: 4.3,
        value2: 90.0,
      },
      {
        label: "2019",
        value1: 4.5,
        value2: 90.0,
      },
      {
        label: "2020",
        value1: 6.3,
        value2: 90.0,
      },
      {
        label: "2021",
        value1: 4.5,
        value2: 70.0,
      },
      {
        label: "2022",
        value1: 5.3,
        value2: 60.0,
      },
    ],
    forward: {
      title:
        "Arson in Massachusetts (Arson rate) correlates with The number of fire inspectors in Massachusetts (Laborers)",
      explanations: {
        confounderType:
          "When the state has more overall fire-related incidents or larger, denser cities, there tend to be more arson cases and the state also hires more fire inspectors. So both numbers rise and fall together because of the same underlying conditions.",
        twoSeperateMediatorType:
          "More arson leads to more fires and investigations, which increases the workload and pushes agencies to hire more fire inspectors. More arson also drives public concern and political pressure, which can increase budgets and result in more inspector positions.",
        chainMediatorsType:
          "Having more fire inspectors increases the number of inspections and reports of suspicious activity, which leads to more investigations and recorded arson cases. Over time, those recorded numbers can look like higher arson even if the real behavior changed less.",
      },
    },
    backward: {
      title:
        "The number of fire inspectors in Massachusetts (Laborers) correlates with Arson in Massachusetts (Arson rate)",
      explanations: {
        confounderType:
          "During periods when Massachusetts has more building activity and a larger population, the state may hire more fire inspectors. Those same busy periods can also create more opportunities for arson, making the two rise together.",
        twoSeperateMediatorType:
          "More fire inspectors can lead to more inspections and better detection, so more arson cases get found and recorded even if the true amount doesn\u2019t change. More inspectors can also increase public awareness and reporting, which can raise the measured arson rate.",
        chainMediatorsType:
          "When arson increases, it can trigger public concern and media attention. That pressure can lead lawmakers to approve more funding and positions, resulting in more fire inspectors being hired.",
      },
    },
  },
  {
    id: "correlation-8519",
    labels: {
      A: "Jet fuel used in France (Million Barrels/Day)",
      B: "Visitors to Disneyland (Disneyland Visitors)",
    },
    data: [
      {
        label: "2007",
        value1: 152.244,
        value2: 14.87,
      },
      {
        label: "2008",
        value1: 152.907,
        value2: 14.721,
      },
      {
        label: "2009",
        value1: 140.548,
        value2: 15.9,
      },
      {
        label: "2010",
        value1: 142.142,
        value2: 15.98,
      },
      {
        label: "2011",
        value1: 160.077,
        value2: 16.14,
      },
      {
        label: "2012",
        value1: 154.62,
        value2: 15.963,
      },
      {
        label: "2013",
        value1: 153.359,
        value2: 16.202,
      },
      {
        label: "2014",
        value1: 152.614,
        value2: 16.769,
      },
      {
        label: "2015",
        value1: 158.71,
        value2: 18.278,
      },
      {
        label: "2016",
        value1: 154.374,
        value2: 17.943,
      },
      {
        label: "2017",
        value1: 157.858,
        value2: 18.3,
      },
      {
        label: "2018",
        value1: 164.107,
        value2: 18.666,
      },
      {
        label: "2019",
        value1: 170.759,
        value2: 18.666,
      },
      {
        label: "2020",
        value1: 82.2951,
        value2: 3.674,
      },
      {
        label: "2021",
        value1: 91.1945,
        value2: 8.573,
      },
    ],
    forward: {
      title:
        "Jet fuel used in France (Million Barrels/Day) correlates with Visitors to Disneyland (Disneyland Visitors)",
      explanations: {
        confounderType:
          "During peak holiday seasons, more people travel around France and also take trips to Disneyland. That same seasonal travel surge increases overall jet fuel use because more flights are scheduled.",
        twoSeperateMediatorType:
          "Cheaper or more available flights can make it easier for tourists to reach the Paris area, which raises Disneyland attendance. Separately, a bigger flight schedule can lead to more travel deals and marketing tied to air travel, encouraging more people to plan a Disneyland visit.",
        chainMediatorsType:
          "When Disneyland gets busier, more tourists come to the region and local hotels and attractions fill up. That increased demand pushes airlines to add routes and flights, which raises jet fuel consumption.",
      },
    },
    backward: {
      title:
        "Visitors to Disneyland (Disneyland Visitors) correlates with Jet fuel used in France (Million Barrels/Day)",
      explanations: {
        confounderType:
          "Busy travel seasons like summer holidays increase tourism to theme parks and also increase air travel demand. With more flights operating to and within Europe, France ends up using more jet fuel.",
        twoSeperateMediatorType:
          "More people going to the theme park means more travelers flying to Southern California, which raises overall airline activity and fuel purchasing patterns that can show up in other countries\u2019 totals. It can also reflect stronger consumer spending, leading airlines to add routes and fly more, increasing jet fuel use in France.",
        chainMediatorsType:
          "When France uses more jet fuel, it often means airlines are flying more and offering more seats and connections. That makes international travel easier and sometimes cheaper, which can lead to more people taking long-haul trips that include visiting the theme park.",
      },
    },
  },
  {
    id: "correlation-8626",
    labels: {
      A: "Inflation in the US (CPI)",
      B: "Southern Copper's stock price (SCCO) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 179.9,
        value2: 1.98,
      },
      {
        label: "2003",
        value1: 184.0,
        value2: 2.39,
      },
      {
        label: "2004",
        value1: 188.9,
        value2: 7.82,
      },
      {
        label: "2005",
        value1: 195.3,
        value2: 7.83,
      },
      {
        label: "2006",
        value1: 201.6,
        value2: 11.05,
      },
      {
        label: "2007",
        value1: 207.34,
        value2: 17.48,
      },
      {
        label: "2008",
        value1: 215.3,
        value2: 35.04,
      },
      {
        label: "2009",
        value1: 214.54,
        value2: 16.07,
      },
      {
        label: "2010",
        value1: 218.06,
        value2: 32.99,
      },
      {
        label: "2011",
        value1: 224.94,
        value2: 48.95,
      },
      {
        label: "2012",
        value1: 229.59,
        value2: 30.83,
      },
      {
        label: "2013",
        value1: 232.96,
        value2: 38.9,
      },
      {
        label: "2014",
        value1: 236.74,
        value2: 28.78,
      },
      {
        label: "2015",
        value1: 237.02,
        value2: 28.06,
      },
      {
        label: "2016",
        value1: 240.01,
        value2: 25.4,
      },
      {
        label: "2017",
        value1: 245.12,
        value2: 32.28,
      },
      {
        label: "2018",
        value1: 251.11,
        value2: 47.94,
      },
      {
        label: "2019",
        value1: 255.66,
        value2: 30.11,
      },
      {
        label: "2020",
        value1: 258.81,
        value2: 42.96,
      },
      {
        label: "2021",
        value1: 270.97,
        value2: 67.38,
      },
      {
        label: "2022",
        value1: 292.56,
        value2: 61.52,
      },
    ],
    forward: {
      title:
        "Inflation in the US (CPI) correlates with Southern Copper's stock price (SCCO) (Stock price)",
      explanations: {
        confounderType:
          "Global economic conditions can affect both consumer prices in the US and demand for copper worldwide. When the world economy speeds up or slows down, both US inflation and Southern Copper\u2019s stock can move together.",
        twoSeperateMediatorType:
          "When US inflation rises, investors may seek \u201cinflation hedges\u201d like commodities, which can push up copper prices and then lift Southern Copper\u2019s stock. Inflation can also lead to higher interest rates and a stronger or weaker US dollar, which changes copper\u2019s pricing and the company\u2019s profits, affecting the stock.",
        chainMediatorsType:
          "If Southern Copper\u2019s stock rises, it can reflect higher copper prices and stronger mining activity, which can raise costs for manufacturers that use copper. Those higher input costs can be passed on into prices of finished goods, contributing to higher consumer inflation over time.",
      },
    },
    backward: {
      title:
        "Southern Copper's stock price (SCCO) (Stock price) correlates with Inflation in the US (CPI)",
      explanations: {
        confounderType:
          "When the global economy is running hot, copper demand tends to rise and prices (and Southern Copper\u2019s profits) can go up, while consumer prices in the US also rise. That shared economic boom can make the stock price and inflation move together even if neither directly causes the other.",
        twoSeperateMediatorType:
          "If Southern Copper\u2019s stock rises because copper prices and profits look stronger, that can help lift mining investment and related spending, which can add to overall price pressures. Separately, a rising stock price can improve investor and business confidence, encouraging more spending that can also nudge prices higher.",
        chainMediatorsType:
          "If US inflation rises, interest rates may go up and the US dollar can strengthen. A stronger dollar can pressure copper prices and earnings expectations, which can then pull Southern Copper\u2019s stock price down (or change its direction).",
      },
    },
  },
  {
    id: "correlation-8738",
    labels: {
      A: "US household spending on eggs (Household spend)",
      B: "Yearly Total Gross Income of US Farms (Billion USD)",
    },
    data: [
      {
        label: "2000",
        value1: 0.0893679,
        value2: 241.7,
      },
      {
        label: "2001",
        value1: 0.0885672,
        value2: 249.9,
      },
      {
        label: "2002",
        value1: 0.0835853,
        value2: 230.6,
      },
      {
        label: "2003",
        value1: 0.0906485,
        value2: 258.7,
      },
      {
        label: "2004",
        value1: 0.0967853,
        value2: 294.9,
      },
      {
        label: "2005",
        value1: 0.0711069,
        value2: 298.5,
      },
      {
        label: "2006",
        value1: 0.0764463,
        value2: 290.2,
      },
      {
        label: "2007",
        value1: 0.0866272,
        value2: 339.6,
      },
      {
        label: "2008",
        value1: 0.101018,
        value2: 377.7,
      },
      {
        label: "2009",
        value1: 0.0896733,
        value2: 343.3,
      },
      {
        label: "2010",
        value1: 0.0956162,
        value2: 365.6,
      },
      {
        label: "2011",
        value1: 0.100593,
        value2: 420.4,
      },
      {
        label: "2012",
        value1: 0.103029,
        value2: 449.8,
      },
      {
        label: "2013",
        value1: 0.109589,
        value2: 483.8,
      },
      {
        label: "2014",
        value1: 0.108421,
        value2: 483.1,
      },
      {
        label: "2015",
        value1: 0.112544,
        value2: 440.8,
      },
      {
        label: "2016",
        value1: 0.0977125,
        value2: 412.3,
      },
      {
        label: "2017",
        value1: 0.0915751,
        value2: 425.4,
      },
      {
        label: "2018",
        value1: 0.104534,
        value2: 424.9,
      },
      {
        label: "2019",
        value1: 0.0920109,
        value2: 427.7,
      },
      {
        label: "2020",
        value1: 0.104347,
        value2: 452.2,
      },
      {
        label: "2021",
        value1: 0.101602,
        value2: 513.2,
      },
      {
        label: "2022",
        value1: 0.119232,
        value2: 604.1,
      },
    ],
    forward: {
      title:
        "US household spending on eggs (Household spend) correlates with Yearly Total Gross Income of US Farms (Billion USD)",
      explanations: {
        confounderType:
          "Overall inflation and general food price changes can make households spend more on eggs while also boosting the dollar value of farms\u2019 total income. In that case, both numbers rise together because prices across the economy are rising.",
        twoSeperateMediatorType:
          "When people spend more on eggs, stores order more from suppliers, which increases sales revenue that flows back to farms and lifts total farm income. Also, higher egg spending can signal stronger demand for animal-based foods, leading producers to expand output and generate more farm income across related farm products.",
        chainMediatorsType:
          "If farms as a whole earn more, they can invest in better operations and expand production, increasing the supply of eggs. More supply can lower prices or increase availability, which can change how much households end up spending on eggs.",
      },
    },
    backward: {
      title:
        "Yearly Total Gross Income of US Farms (Billion USD) correlates with US household spending on eggs (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, farms tend to earn more and households also spend more on groceries like eggs. When the economy slows, both farm income and egg spending can drop at the same time.",
        twoSeperateMediatorType:
          "Higher farm income can lead to more investment in egg production and distribution, which increases availability and sales to households. It can also support lower prices through larger supply or efficiency, prompting households to buy more eggs or spend more on them overall.",
        chainMediatorsType:
          "If households spend more on eggs, stores order more and egg producers ramp up production. That increased demand boosts sales across farms and can raise total farm income as the ripple spreads through the agricultural supply chain.",
      },
    },
  },
  {
    id: "correlation-8786",
    labels: {
      A: "Solar power generated in South Korea (Billion kWh)",
      B: "Applied Materials' stock price (AMAT) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 0.007,
        value2: 20.43,
      },
      {
        label: "2003",
        value1: 0.008,
        value2: 13.45,
      },
      {
        label: "2004",
        value1: 0.01,
        value2: 22.61,
      },
      {
        label: "2005",
        value1: 0.015,
        value2: 17.2,
      },
      {
        label: "2006",
        value1: 0.031,
        value2: 18.04,
      },
      {
        label: "2007",
        value1: 0.07,
        value2: 18.32,
      },
      {
        label: "2008",
        value1: 0.285,
        value2: 17.73,
      },
      {
        label: "2009",
        value1: 0.566,
        value2: 10.12,
      },
      {
        label: "2010",
        value1: 0.772001,
        value2: 14.05,
      },
      {
        label: "2011",
        value1: 0.915999,
        value2: 14.13,
      },
      {
        label: "2012",
        value1: 1.101,
        value2: 10.93,
      },
      {
        label: "2013",
        value1: 1.595,
        value2: 11.64,
      },
      {
        label: "2014",
        value1: 2.547,
        value2: 17.69,
      },
      {
        label: "2015",
        value1: 3.88,
        value2: 24.99,
      },
      {
        label: "2016",
        value1: 5.068,
        value2: 18.31,
      },
      {
        label: "2017",
        value1: 7.05424,
        value2: 32.36,
      },
      {
        label: "2018",
        value1: 9.20712,
        value2: 51.68,
      },
      {
        label: "2019",
        value1: 12.995,
        value2: 32.04,
      },
      {
        label: "2020",
        value1: 17.9656,
        value2: 62.0,
      },
      {
        label: "2021",
        value1: 23.9501,
        value2: 87.24,
      },
    ],
    forward: {
      title:
        "Solar power generated in South Korea (Billion kWh) correlates with Applied Materials' stock price (AMAT) (Stock price)",
      explanations: {
        confounderType:
          "Global demand for semiconductors and clean-energy equipment can rise and fall with the overall economy, pushing up investment in solar generation in South Korea and also boosting Applied Materials\u2019 business outlook. When that shared economic cycle turns, both the solar numbers and the stock price can move together even without one causing the other.",
        twoSeperateMediatorType:
          "More solar generation in South Korea can signal larger solar and power-grid buildouts, which increases factory spending on electronics, sensors, and power chips that require advanced manufacturing tools. It can also reflect government support for clean tech, improving investor confidence in companies tied to chipmaking equipment and lifting the stock price.",
        chainMediatorsType:
          "If Applied Materials\u2019 stock rises, it can encourage chipmakers and suppliers to invest more, expanding production capacity and lowering costs for electronics used in renewable-energy systems. Cheaper and more available components can speed up solar installations and grid upgrades, increasing solar power generated in South Korea.",
      },
    },
    backward: {
      title:
        "Applied Materials' stock price (AMAT) (Stock price) correlates with Solar power generated in South Korea (Billion kWh)",
      explanations: {
        confounderType:
          "A global economic and investment cycle can lift demand for tech manufacturing equipment and also push South Korea to invest more in solar projects. When the cycle turns down, both can weaken at the same time.",
        twoSeperateMediatorType:
          "If the company\u2019s value rises because chipmakers spend more on new factories, that can increase purchases of power-hungry electronics and strengthen pressure to add more renewable electricity like solar. If the company\u2019s value rises because clean-tech manufacturing expands, that can directly support building more solar capacity and output in South Korea.",
        chainMediatorsType:
          "More solar electricity in South Korea can lower power costs and improve energy security for local manufacturers. That can encourage factories to expand, boosting demand for semiconductor equipment, which can raise the company\u2019s stock price.",
      },
    },
  },
  {
    id: "correlation-8827",
    labels: {
      A: "Jet fuel used in Germany (Million Barrels/Day)",
      B: "Number of International Tourist Arrivals Worldwide (Million)",
    },
    data: [
      {
        label: "1995",
        value1: 125.304,
        value2: 528000000.0,
      },
      {
        label: "1996",
        value1: 127.806,
        value2: 563000000.0,
      },
      {
        label: "1997",
        value1: 134.414,
        value2: 589000000.0,
      },
      {
        label: "1998",
        value1: 138.901,
        value2: 605000000.0,
      },
      {
        label: "1999",
        value1: 146.849,
        value2: 627000000.0,
      },
      {
        label: "2000",
        value1: 153.768,
        value2: 677000000.0,
      },
      {
        label: "2001",
        value1: 147.088,
        value2: 678000000.0,
      },
      {
        label: "2002",
        value1: 146.545,
        value2: 698000000.0,
      },
      {
        label: "2003",
        value1: 150.047,
        value2: 689000000.0,
      },
      {
        label: "2004",
        value1: 161.73,
        value2: 760000000.0,
      },
      {
        label: "2005",
        value1: 174.545,
        value2: 807000000.0,
      },
      {
        label: "2006",
        value1: 183.438,
        value2: 851000000.0,
      },
      {
        label: "2007",
        value1: 190.159,
        value2: 911000000.0,
      },
      {
        label: "2008",
        value1: 192.137,
        value2: 929000000.0,
      },
      {
        label: "2009",
        value1: 187.463,
        value2: 894000000.0,
      },
      {
        label: "2010",
        value1: 184.132,
        value2: 948000000.0,
      },
      {
        label: "2011",
        value1: 176.66,
        value2: 1008740000.0,
      },
      {
        label: "2012",
        value1: 186.992,
        value2: 1059260000.0,
      },
      {
        label: "2013",
        value1: 190.027,
        value2: 1110830000.0,
      },
      {
        label: "2014",
        value1: 184.068,
        value2: 1154750000.0,
      },
      {
        label: "2015",
        value1: 184.307,
        value2: 1207080000.0,
      },
      {
        label: "2016",
        value1: 197.623,
        value2: 1248120000.0,
      },
      {
        label: "2017",
        value1: 215.2,
        value2: 1347570000.0,
      },
      {
        label: "2018",
        value1: 221.052,
        value2: 1414070000.0,
      },
      {
        label: "2019",
        value1: 221.047,
        value2: 1465460000.0,
      },
      {
        label: "2020",
        value1: 102.033,
        value2: 406890000.0,
      },
      {
        label: "2021",
        value1: 132.323,
        value2: 455770000.0,
      },
      {
        label: "2022",
        value1: 195.984,
        value2: 962800000.0,
      },
    ],
    forward: {
      title:
        "Jet fuel used in Germany (Million Barrels/Day) correlates with Number of International Tourist Arrivals Worldwide (Million)",
      explanations: {
        confounderType:
          "When the global economy is doing well, more people can afford international travel, and airlines schedule more flights that buy and use more jet fuel in Germany. When the economy slows, both worldwide tourist trips and jet fuel use in Germany tend to drop.",
        twoSeperateMediatorType:
          "Higher jet fuel use in Germany can mean airlines are running more flights and adding seats, making it easier for people to travel internationally. It can also reflect cheaper or more reliable flight operations, which can reduce ticket prices and encourage more worldwide tourist trips.",
        chainMediatorsType:
          "When worldwide tourist trips increase, airlines respond by adding more international routes and increasing flight frequency. That leads to more planes stopping in or passing through Germany and more refueling there, which raises jet fuel use in Germany.",
      },
    },
    backward: {
      title:
        "Number of International Tourist Arrivals Worldwide (Million) correlates with Jet fuel used in Germany (Million Barrels/Day)",
      explanations: {
        confounderType:
          "When the global economy is strong, more people can afford international trips and airlines also fly more routes through and within Germany, which increases jet fuel use there. When the economy slows, both travel and jet fuel use drop.",
        twoSeperateMediatorType:
          "More international travel leads airlines to add more flights that depart from, arrive in, or connect through German airports, raising jet fuel use in Germany. It can also push airports and airlines in Germany to expand operations (more planes based there, more services and cargo flights), which further increases fuel use.",
        chainMediatorsType:
          "When airlines use more jet fuel in Germany, it often means German airports have more flights and better connections. Better connections make it easier and cheaper for people to travel internationally, so worldwide tourist arrivals rise.",
      },
    },
  },
  {
    id: "correlation-8944",
    labels: {
      A: "Master's degrees awarded in Legal professions and studies (Degrees awarded)",
      B: "University Lecturer salaries in the US (Salary)",
    },
    data: [
      {
        label: "2012",
        value1: 6614.0,
        value2: 64696.0,
      },
      {
        label: "2013",
        value1: 7013.0,
        value2: 65494.0,
      },
      {
        label: "2014",
        value1: 7654.0,
        value2: 65938.0,
      },
      {
        label: "2015",
        value1: 7924.0,
        value2: 67828.0,
      },
      {
        label: "2016",
        value1: 8181.0,
        value2: 68305.0,
      },
      {
        label: "2017",
        value1: 8674.0,
        value2: 69125.0,
      },
      {
        label: "2018",
        value1: 9203.0,
        value2: 69647.0,
      },
      {
        label: "2019",
        value1: 9487.0,
        value2: 70577.0,
      },
      {
        label: "2020",
        value1: 10024.0,
        value2: 70489.0,
      },
      {
        label: "2021",
        value1: 7038.0,
        value2: 67454.0,
      },
    ],
    forward: {
      title:
        "Master's degrees awarded in Legal professions and studies (Degrees awarded) correlates with University Lecturer salaries in the US (Salary)",
      explanations: {
        confounderType:
          "When the economy and public funding for higher education are strong, universities can pay lecturers more and also have the money and demand to run and expand graduate legal programs. In lean times, salaries stagnate and fewer students enroll or programs shrink, so fewer degrees are awarded.",
        twoSeperateMediatorType:
          "More graduates from these programs can push universities to expand law-related departments and course offerings, which can raise demand for lecturers and nudge salaries upward. At the same time, a larger graduate pipeline can boost research output and rankings, helping schools attract more tuition and grants that allow higher pay.",
        chainMediatorsType:
          "Higher lecturer pay can help universities attract and keep better faculty, which improves teaching quality and the school\u2019s reputation. That stronger reputation brings in more applicants and enrollment in graduate legal programs, leading to more degrees being awarded.",
      },
    },
    backward: {
      title:
        "University Lecturer salaries in the US (Salary) correlates with Master's degrees awarded in Legal professions and studies (Degrees awarded)",
      explanations: {
        confounderType:
          "When states have bigger budgets or booming economies, they often pay university lecturers more and also fund more graduate education programs, including legal studies. That shared financial strength can make both numbers rise together.",
        twoSeperateMediatorType:
          "Higher lecturer pay can help universities hire and keep strong faculty, which can improve programs and attract more students into legal master\u2019s tracks. Higher lecturer pay can also signal that universities are expanding overall, leading them to open more seats and programs that produce more legal master\u2019s graduates.",
        chainMediatorsType:
          "When more people earn legal master\u2019s degrees, the legal sector can grow and bring in more money and influence. That can push for larger public and private investment in higher education, eventually allowing universities to raise lecturer salaries.",
      },
    },
  },
  {
    id: "correlation-8999",
    labels: {
      A: "Mozzarella cheese consumption (Pounds)",
      B: "Annual US household spending on eggs (Household spend)",
    },
    data: [
      {
        label: "2000",
        value1: 9.0525,
        value2: 34.0,
      },
      {
        label: "2001",
        value1: 9.34643,
        value2: 35.0,
      },
      {
        label: "2002",
        value1: 9.38295,
        value2: 34.0,
      },
      {
        label: "2003",
        value1: 9.45126,
        value2: 37.0,
      },
      {
        label: "2004",
        value1: 9.67705,
        value2: 42.0,
      },
      {
        label: "2005",
        value1: 9.9311,
        value2: 33.0,
      },
      {
        label: "2006",
        value1: 10.1131,
        value2: 37.0,
      },
      {
        label: "2007",
        value1: 10.6562,
        value2: 43.0,
      },
      {
        label: "2008",
        value1: 10.1033,
        value2: 51.0,
      },
      {
        label: "2009",
        value1: 10.0818,
        value2: 44.0,
      },
      {
        label: "2010",
        value1: 10.5776,
        value2: 46.0,
      },
      {
        label: "2011",
        value1: 10.828,
        value2: 50.0,
      },
      {
        label: "2012",
        value1: 10.6908,
        value2: 53.0,
      },
      {
        label: "2013",
        value1: 10.7377,
        value2: 56.0,
      },
      {
        label: "2014",
        value1: 11.1739,
        value2: 58.0,
      },
      {
        label: "2015",
        value1: 11.2787,
        value2: 63.0,
      },
      {
        label: "2016",
        value1: 11.7387,
        value2: 56.0,
      },
      {
        label: "2017",
        value1: 11.6085,
        value2: 55.0,
      },
      {
        label: "2018",
        value1: 12.2093,
        value2: 64.0,
      },
      {
        label: "2019",
        value1: 12.4768,
        value2: 58.0,
      },
      {
        label: "2020",
        value1: 12.1951,
        value2: 64.0,
      },
      {
        label: "2021",
        value1: 12.2764,
        value2: 68.0,
      },
    ],
    forward: {
      title:
        "Mozzarella cheese consumption (Pounds) correlates with Annual US household spending on eggs (Household spend)",
      explanations: {
        confounderType:
          "When grocery prices rise or fall overall, people may end up buying different amounts of mozzarella and also spending more or less on eggs at the same time. So both numbers move together because the broader cost of groceries is changing.",
        twoSeperateMediatorType:
          "Buying more mozzarella might lead households to cook more pizza nights, and they may also buy eggs for side dishes or breakfasts that go with those meals. It could also push people to bake more cheesy dishes and desserts at home, which often increases egg purchases too.",
        chainMediatorsType:
          "When households spend more on eggs, it can reflect cooking more at home and making more breakfasts and baked foods. That can lead to buying more ingredients for varied meals, and eventually more mozzarella for things like casseroles, omelets, or homemade pizzas.",
      },
    },
    backward: {
      title:
        "Annual US household spending on eggs (Household spend) correlates with Mozzarella cheese consumption (Pounds)",
      explanations: {
        confounderType:
          "When food prices rise or fall, people may end up spending more or less on eggs, and they may also buy more or less mozzarella at the same time. So both can move together because of overall grocery costs and shopping habits, not because one directly affects the other.",
        twoSeperateMediatorType:
          "Spending more on eggs can be a sign that a household is cooking more meals at home, which often leads to buying more cheese for recipes. It can also reflect shopping more often or buying more ingredients overall, which increases mozzarella purchases too.",
        chainMediatorsType:
          "If people eat more mozzarella, they may cook more dishes like pizzas, casseroles, or baked meals that commonly use eggs as well. That extra cooking can lead to buying eggs more frequently, increasing annual spending on eggs.",
      },
    },
  },
  {
    id: "correlation-9048",
    labels: {
      A: "Annual US household spending on bakery products (Household spend)",
      B: "McDonald's stock price (MCD) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 296.0,
        value2: 26.47,
      },
      {
        label: "2003",
        value1: 292.0,
        value2: 16.17,
      },
      {
        label: "2004",
        value1: 307.0,
        value2: 24.95,
      },
      {
        label: "2005",
        value1: 302.0,
        value2: 31.6,
      },
      {
        label: "2006",
        value1: 304.0,
        value2: 34.29,
      },
      {
        label: "2007",
        value1: 317.0,
        value2: 43.65,
      },
      {
        label: "2008",
        value1: 337.0,
        value2: 59.48,
      },
      {
        label: "2009",
        value1: 334.0,
        value2: 62.38,
      },
      {
        label: "2010",
        value1: 337.0,
        value2: 62.63,
      },
      {
        label: "2011",
        value1: 356.0,
        value2: 77.1,
      },
      {
        label: "2012",
        value1: 356.0,
        value2: 101.33,
      },
      {
        label: "2013",
        value1: 359.0,
        value2: 89.4,
      },
      {
        label: "2014",
        value1: 343.0,
        value2: 96.81,
      },
      {
        label: "2015",
        value1: 346.0,
        value2: 94.13,
      },
      {
        label: "2016",
        value1: 353.0,
        value2: 117.25,
      },
      {
        label: "2017",
        value1: 388.0,
        value2: 121.86,
      },
      {
        label: "2018",
        value1: 392.0,
        value2: 173.73,
      },
      {
        label: "2019",
        value1: 400.0,
        value2: 175.41,
      },
      {
        label: "2020",
        value1: 428.0,
        value2: 198.0,
      },
      {
        label: "2021",
        value1: 462.0,
        value2: 214.49,
      },
      {
        label: "2022",
        value1: 497.0,
        value2: 269.49,
      },
    ],
    forward: {
      title:
        "Annual US household spending on bakery products (Household spend) correlates with McDonald's stock price (MCD) (Stock price)",
      explanations: {
        confounderType:
          "When the economy is doing well, families tend to spend more on bakery items, and investors also bid up large restaurant stocks. When the economy is weak, both household bakery spending and the stock price can fall.",
        twoSeperateMediatorType:
          "Higher spending on bakery products can signal that food costs and consumer demand are rising, which can influence how profitable big food chains are expected to be and move the stock. It can also reflect shifting eating habits toward quick, convenient foods, which can change expectations for fast-food sales and affect the stock price.",
        chainMediatorsType:
          "A rising stock price can lead to upbeat business news and more expansion, which increases hiring and wages in communities. With more income and confidence, households may end up buying more bakery products over the year.",
      },
    },
    backward: {
      title:
        "McDonald's stock price (MCD) (Stock price) correlates with Annual US household spending on bakery products (Household spend)",
      explanations: {
        confounderType:
          "When the overall economy is doing well, people may buy more baked goods and investors may also bid up the company\u2019s stock because they expect stronger sales. When the economy weakens, both can fall at the same time.",
        twoSeperateMediatorType:
          "If the company\u2019s stock rises because it\u2019s expanding and opening more locations, more customers may pick up items like cookies, muffins, and pies, which can lift national spending on bakery products. If the stock rises because the company launches popular dessert and coffee deals, those promotions can also push more bakery-item purchases across the country.",
        chainMediatorsType:
          "If households start spending more on bakery products, that can signal a broader shift toward convenient snacks and treat purchases. Seeing that trend, fast-food chains may sell more dessert items and report stronger results, which can lead investors to push the company\u2019s stock price up.",
      },
    },
  },
  {
    id: "correlation-9096",
    labels: {
      A: "Petroluem consumption in Ecuador (Million Barrels/Day)",
      B: "Exxon Mobil's stock price (XOM) (Stock price)",
    },
    data: [
      {
        label: "2002",
        value1: 156.664,
        value2: 39.3,
      },
      {
        label: "2003",
        value1: 163.805,
        value2: 35.0,
      },
      {
        label: "2004",
        value1: 179.292,
        value2: 41.02,
      },
      {
        label: "2005",
        value1: 193.874,
        value2: 51.02,
      },
      {
        label: "2006",
        value1: 203.395,
        value2: 56.42,
      },
      {
        label: "2007",
        value1: 209.201,
        value2: 76.26,
      },
      {
        label: "2008",
        value1: 215.415,
        value2: 94.15,
      },
      {
        label: "2009",
        value1: 231.412,
        value2: 80.06,
      },
      {
        label: "2010",
        value1: 245.558,
        value2: 68.72,
      },
      {
        label: "2011",
        value1: 245.874,
        value2: 73.72,
      },
      {
        label: "2012",
        value1: 249.619,
        value2: 85.97,
      },
      {
        label: "2013",
        value1: 260.756,
        value2: 87.79,
      },
      {
        label: "2014",
        value1: 284.166,
        value2: 100.6,
      },
      {
        label: "2015",
        value1: 272.514,
        value2: 92.25,
      },
      {
        label: "2016",
        value1: 256.942,
        value2: 77.5,
      },
      {
        label: "2017",
        value1: 245.79,
        value2: 90.94,
      },
      {
        label: "2018",
        value1: 262.728,
        value2: 83.82,
      },
      {
        label: "2019",
        value1: 258.981,
        value2: 67.35,
      },
      {
        label: "2020",
        value1: 210.905,
        value2: 70.24,
      },
      {
        label: "2021",
        value1: 211.249,
        value2: 41.45,
      },
    ],
    forward: {
      title:
        "Petroluem consumption in Ecuador (Million Barrels/Day) correlates with Exxon Mobil's stock price (XOM) (Stock price)",
      explanations: {
        confounderType:
          "When the world economy is strong, Ecuador tends to use more petroleum and investors also bid up major oil-company stocks. When the world economy weakens, both petroleum use and the stock price can fall.",
        twoSeperateMediatorType:
          "If Ecuador uses more petroleum, it can increase demand for crude and refined products, pushing oil prices higher and helping big oil-company profits and stock prices. At the same time, higher fuel use can signal a growing local economy and more energy investment in the region, which can improve expectations for oil companies and lift the stock.",
        chainMediatorsType:
          "If the stock price rises, it can reflect expectations of higher oil prices and more industry activity worldwide. That can flow through to higher prices and more supply and trade in fuels, which can later show up as higher petroleum use in Ecuador.",
      },
    },
    backward: {
      title:
        "Exxon Mobil's stock price (XOM) (Stock price) correlates with Petroluem consumption in Ecuador (Million Barrels/Day)",
      explanations: {
        confounderType:
          "When global oil prices rise or fall, Exxon Mobil\u2019s stock often moves with expected profits, and Ecuador\u2019s fuel use can change because gasoline and diesel become cheaper or more expensive. That shared oil-price swing can make the two look linked even if one isn\u2019t directly causing the other.",
        twoSeperateMediatorType:
          "A higher Exxon Mobil stock price can encourage more investment and expansion in oil production and shipping, which can increase fuel availability and lower costs in some markets, including Ecuador, leading to higher consumption. Separately, a higher stock price can boost confidence in the oil sector and influence regional energy deals or supply contracts that also affect how much fuel Ecuador uses.",
        chainMediatorsType:
          "If Ecuador\u2019s fuel use rises, it can signal stronger economic activity and higher demand for oil in that region, which can feed into broader expectations of global demand. Those expectations can lift oil prices and projected earnings for big oil companies, pushing Exxon Mobil\u2019s stock price up.",
      },
    },
  },
  {
    id: "correlation-9161",
    labels: {
      A: "Arson in Texas (Arson rate)",
      B: "The divorce rate in Texas (Divorce rate)",
    },
    data: [
      {
        label: "1999",
        value1: 42.2,
        value2: 3.8,
      },
      {
        label: "2000",
        value1: 39.5,
        value2: 4.0,
      },
      {
        label: "2001",
        value1: 39.5,
        value2: 4.0,
      },
      {
        label: "2002",
        value1: 38.1,
        value2: 3.9,
      },
      {
        label: "2003",
        value1: 34.7,
        value2: 3.8,
      },
      {
        label: "2004",
        value1: 29.7,
        value2: 3.6,
      },
      {
        label: "2005",
        value1: 29.6,
        value2: 3.3,
      },
      {
        label: "2006",
        value1: 27.8,
        value2: 3.4,
      },
      {
        label: "2007",
        value1: 24.7,
        value2: 3.3,
      },
      {
        label: "2008",
        value1: 26.0,
        value2: 3.3,
      },
      {
        label: "2009",
        value1: 24.2,
        value2: 3.3,
      },
      {
        label: "2010",
        value1: 21.9,
        value2: 3.3,
      },
      {
        label: "2011",
        value1: 19.7,
        value2: 3.2,
      },
      {
        label: "2012",
        value1: 17.0,
        value2: 3.0,
      },
      {
        label: "2013",
        value1: 14.9,
        value2: 2.88976,
      },
      {
        label: "2014",
        value1: 14.2,
        value2: 2.70005,
      },
      {
        label: "2015",
        value1: 12.9,
        value2: 2.5892,
      },
      {
        label: "2016",
        value1: 12.6,
        value2: 2.6,
      },
      {
        label: "2017",
        value1: 11.7,
        value2: 2.2496,
      },
      {
        label: "2018",
        value1: 9.4,
        value2: 2.58262,
      },
      {
        label: "2019",
        value1: 8.5,
        value2: 2.11582,
      },
      {
        label: "2020",
        value1: 10.2,
        value2: 1.47248,
      },
      {
        label: "2021",
        value1: 10.0,
        value2: 1.35827,
      },
    ],
    forward: {
      title:
        "Arson in Texas (Arson rate) correlates with The divorce rate in Texas (Divorce rate)",
      explanations: {
        confounderType:
          "When the economy gets worse, stress and instability rise in many households, which can increase divorces. The same stress and hardship can also lead to more property-related crimes like arson.",
        twoSeperateMediatorType:
          "After an arson event, families may lose housing or possessions and face major financial strain, which can push a marriage toward divorce. Separately, arson can bring legal trouble, injuries, or mental health strain that also makes relationships more likely to break apart.",
        chainMediatorsType:
          "After a divorce, a person may have to move out and take on new bills, creating serious money problems. That pressure can lead to drinking or other risky behavior, which raises the chance of someone setting a fire on purpose.",
      },
    },
    backward: {
      title:
        "The divorce rate in Texas (Divorce rate) correlates with Arson in Texas (Arson rate)",
      explanations: {
        confounderType:
          "When the economy is doing poorly, more couples may split up and more people may commit arson out of stress or desperation. That shared pressure can make both numbers rise and fall together.",
        twoSeperateMediatorType:
          "After a breakup, some people may start drinking heavily or using drugs, which can lead to reckless or violent behavior including setting fires. Separately, breakups can also trigger heated disputes over homes or property, and in some cases someone may set a fire out of anger or revenge.",
        chainMediatorsType:
          "A fire can destroy a home or business, creating major financial strain. The stress can lead to ongoing conflict, then separation, and eventually a divorce.",
      },
    },
  },
];

export function getAllCorrelations() {
  return MOCK_BIDIRECTIONAL_DATA;
}

export function getCorrelationById(id: string) {
  return MOCK_BIDIRECTIONAL_DATA.find((c) => c.id === id);
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ──────────────────────────────────────────────
// V1 (original): group-based explanation selection
// ──────────────────────────────────────────────

/**
 * V1 Design: All explanations from the assigned group direction.
 * Picks 2 of 3 types randomly (NOT seeded — can differ on refresh).
 */
export function getExplanationsForGroup(
  correlation: BidirectionalCorrelation,
  group: "forward" | "backward",
) {
  const directionData =
    group === "forward" ? correlation.forward : correlation.backward;

  const explanationPool = [
    { id: "confounderType", text: directionData.explanations.confounderType },
    {
      id: "twoSeperateMediatorType",
      text: directionData.explanations.twoSeperateMediatorType,
    },
    {
      id: "chainMediatorsType",
      text: directionData.explanations.chainMediatorsType,
    },
  ];

  const shuffledPool = shuffle(explanationPool);
  return shuffledPool.slice(0, 2);
}

// ──────────────────────────────────────────────
// V2 (new): within-subject mixed-direction selection
// ──────────────────────────────────────────────

/**
 * Simple seeded PRNG (deterministic from a string seed).
 * Used to make explanation selection reproducible per session+correlation.
 */
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

function seededShuffle<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export type ExplanationWithDirection = {
  id: string;
  text: string;
  direction: "forward" | "backward";
};

/**
 * V2 Design: Per-correlation explanation selection with mixed directions.
 *
 * 1. Picks 2 of 3 explanation types (seeded shuffle)
 * 2. Assigns one "forward", one "backward" randomly (seeded shuffle)
 * 3. Deterministic for the same sessionId + correlationId (refresh-safe)
 *
 * Example output:
 *   [
 *     { id: "confounderType",      direction: "forward",  text: "..." },
 *     { id: "chainMediatorsType",  direction: "backward", text: "..." }
 *   ]
 */
export function getExplanationsWithMixedDirections(
  correlation: BidirectionalCorrelation,
  sessionId: string,
): ExplanationWithDirection[] {
  const seed = `${sessionId}::${correlation.id}::explanationSelection`;
  const rng = seededRandom(seed);

  const types: (keyof BidirectionalCorrelation["forward"]["explanations"])[] = [
    "confounderType",
    "twoSeperateMediatorType",
    "chainMediatorsType",
  ];

  // Step 1: Pick 2 of 3 types
  const shuffledTypes = seededShuffle(types, rng);
  const selectedTypes = shuffledTypes.slice(0, 2);

  // Step 2: Randomly assign directions (exactly one forward, one backward)
  const directions: ("forward" | "backward")[] = ["forward", "backward"];
  const shuffledDirections = seededShuffle(directions, rng);

  // Step 3: Build the explanation options
  return [
    {
      id: selectedTypes[0],
      direction: shuffledDirections[0],
      text: correlation[shuffledDirections[0]].explanations[selectedTypes[0]],
    },
    {
      id: selectedTypes[1],
      direction: shuffledDirections[1],
      text: correlation[shuffledDirections[1]].explanations[selectedTypes[1]],
    },
  ];
}
