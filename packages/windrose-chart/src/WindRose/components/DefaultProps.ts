export const data = [
  {
    subject: "Language Arts",
    coreCompetency: "Reading/Verbal Comprehension",
    survey: 1.2,
    color: "#8e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Writing",
    survey: 2.3,
    color: "#7e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Textual Analysis",
    survey: 2.4,
    color: "#6e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Literary Knowledge",
    survey: 3.1,
    color: "#5e44ad",
  },
  {
    subject: "Language Arts",
    coreCompetency: "Foreign Language",
    survey: 1.7,
    color: "#4e44ad",
  },
  {
    subject: "Math",
    coreCompetency: "Arithmetic/ Algebra",
    survey: 4.2,
    color: "#c0392b",
  },
  {
    subject: "Math",
    coreCompetency: "Geometry/Trig/Spatial Orientation",
    survey: 5.6,
    color: "#c0492b",
  },
  {
    subject: "Math",
    coreCompetency: "Probability/Statistics/Modeling",
    survey: 1.6,
    color: "#c0592b",
  },
  {
    subject: "Math",
    coreCompetency: "Calculus/Other advanced math",
    survey: 2.3,
    color: "#c0692b",
  },
  {
    subject: "Math",
    coreCompetency: "Graphical Literacy",
    survey: 5.6,
    color: "#c0792b",
  },
  {
    subject: "Science",
    coreCompetency:
      "Application of Scientific method or deductive reasoning",
    survey: 5.8,
    color: "#27ae60",
  },
  {
    subject: "Science",
    coreCompetency: "Experimental/Prototype design and revision",
    survey: 5.2,
    color: "#27ae70",
  },
  {
    subject: "Science",
    coreCompetency:
      "Synthesis or inference based on multiple lines of evidence",
    survey: 5.1,
    color: "#27ae80",
  },
  {
    subject: "Science",
    coreCompetency:
      "Disciplinary Knowledge (Physics, biology, chemistry, medicine, engineering, etc.)",
    survey: 5.7,
    color: "#27ae90",
  },
  {
    subject: "Science",
    coreCompetency: "Data management/visualization",
    survey: 4.2,
    color: "#27aea0",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Constructing questions, gathering and synthesizing sources of cultural, geographical, and historical knowledge",
    survey: 1.3,
    color: "#2c3e50",
  },
  {
    subject: "Social Studies",
    coreCompetency: "Understanding of government, law, & politics",
    survey: 4.9,
    color: "#2c4e50",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "World history and geography: temporal and spatial views of the world, human-environmental interactions, (changing) spatial patterns and movement",
    survey: 1.2,
    color: "#2c5e50",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Higher-level analysis: Evaluating sources of cultural and historical knowledge; developing claims from evidence",
    survey: 2.3,
    color: "#2c6e50",
  },
  {
    subject: "Social Studies",
    coreCompetency:
      "Communicating and critiquing historical, political, economic, or cultural viewpoints",
    survey: 1.1,
    color: "#2c7e50",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Collaboration",
    survey: 5.6,
    color: "#0984e3",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Communication",
    survey: 5.1,
    color: "#0974e3",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Creativity",
    survey: 5.3,
    color: "#0964e3",
  },
  {
    subject: "21st Century Skills",
    coreCompetency: "Critical Thinking",
    survey: 4.5,
    color: "#0954e3",
  },
  {
    subject: "21st Century Skills",
    coreCompetency:
      "Tech Savvy (coding, touch-typing, troubleshooting abilities, software competency)",
    survey: 5.9,
    color: "#0944e3",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Physical Effort",
    survey: 1.9,
    color: "#e84393",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Mental Effort",
    survey: 5.8,
    color: "#d84393",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Emotional Effort",
    survey: 2.1,
    color: "#c84393",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency:
      "Specialized art or craft knowledge (sketching, painting, carpentry, hair cutting, welding, etc)",
    survey: 1.9,
    color: "#b84393",
  },
  {
    subject: "Arts, Crafts & Labor",
    coreCompetency: "Appreciation of or critique of art/craft/design",
    survey: 1.7,
    color: "#a84393",
  },
];

const angles = data.map((d) => d.coreCompetency);
const maxData = data.reduce((pre, cur) =>
  pre.survey > cur.survey ? pre : cur
);

export const DefaultProps = {
  width: 600,
  height: 500,
  dataMax: maxData.survey,
  data,
  columns: [
    "Language Arts",
    "Math",
    "Science",
    "Social Studies",
    "21st Century Skills",
    "Arts, Crafts & Labor",
  ],
  columnsColor: [
    "#8e44ad",
    "#c0392b",
    "#27ae60",
    "#2c3e50",
    "#0984e3",
    "#e84393",
  ],
  angles,
  dataKeys: ["survey"],
  mouseOverColor: "#1abc9c",
  mouseOverTitleColor: "#e67e22",
  mouseOverSurveyColor: "#e74c3c",
};
