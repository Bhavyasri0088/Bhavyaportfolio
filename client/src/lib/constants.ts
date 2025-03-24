// Project data
export const projects = [
  {
    id: 1,
    title: "Telecommunication Churn Prediction",
    description: "Developed a machine learning model to predict customer churn in the telecommunications industry, helping identify at-risk customers and reducing potential revenue loss.",
    insights: [
      "Identified contract type as a primary churn predictor with month-to-month contracts showing 43% higher churn rate",
      "Analyzed service usage patterns to determine customer segments most likely to churn",
      "Achieved 89% accuracy in predicting customer churn with XGBoost algorithm"
    ],
    technologies: ["Python", "SQL", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/Bhavyasri0088/Telecommunication-chrun",
    reportUrl: "#"
  },
  {
    id: 2,
    title: "Fake News Detection with NLP",
    description: "Built a machine learning model that identifies fake news articles using natural language processing techniques and advanced text classification algorithms.",
    insights: [
      "Implemented TF-IDF vectorization to extract meaningful features from text",
      "Identified linguistic patterns that distinguish fake news from credible sources",
      "Achieved 93% classification accuracy using ensemble learning techniques"
    ],
    technologies: ["Python", "NLTK", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/Bhavyasri0088/Fake-and-real-news",
    reportUrl: "#"
  },
  {
    id: 3,
    title: "Financial Time-Series Forecasting",
    description: "Created advanced time-series forecasting models to predict financial market trends, helping investors make data-driven decisions.",
    insights: [
      "Developed LSTM neural networks to capture complex patterns in stock prices",
      "Implemented ARIMA and Prophet models for comparison of forecasting accuracy",
      "Created interactive visualizations showing predicted vs. actual price movements"
    ],
    technologies: ["Python", "TensorFlow", "Pandas", "Plotly", "Prophet", "NumPy"],
    githubUrl: "#",
    reportUrl: "#"
  }
];

// Skills data
export const skills = [
  {
    category: "Programming Languages",
    icon: "Code",
    items: ["Python", "SQL"]
  },
  {
    category: "Libraries & Frameworks",
    icon: "Boxes",
    items: ["NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Plotly", "Seaborn"]
  },
  {
    category: "Data Visualization",
    icon: "BarChart",
    items: ["Tableau", "Power BI", "Plotly", "Matplotlib"]
  },
  {
    category: "Databases",
    icon: "Database",
    items: ["MySQL"]
  },
  {
    category: "Machine Learning",
    icon: "Brain",
    items: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Model Optimization"]
  },
  {
    category: "Version Control & Tools",
    icon: "GitBranch",
    items: ["Git", "GitHub", "Jupyter Notebook", "Google Colab", "VS Code"]
  }
];

// Education data
export const education = [
  {
    type: "degree",
    title: "Bachelor of Technology (ECE)",
    institution: "Sreenidhi Institute of Science and Technology, Hyderabad",
    period: "2018-2022",
    description: "Completed B.Tech in Electronics and Communication Engineering with coursework in programming, statistics, and data analysis.",
    certificateUrl: null
  },
  {
    type: "certification",
    title: "Data Science Certification",
    institution: "ExcelR Solutions",
    period: "2022",
    description: "Comprehensive data science program covering Python, SQL, machine learning, and data visualization techniques.",
    certificateUrl: "#"
  },
  {
    type: "internship",
    title: "Data Science Intern",
    institution: "LooMA, Hyderabad",
    period: "Jan 2023 - Mar 2023",
    description: "Worked on developing machine learning models for text classification, sentiment analysis, and customer segmentation. Collaborated with a team of data scientists to implement NLP algorithms.",
    certificateUrl: "#"
  },
  {
    type: "internship",
    title: "Data Analyst Intern",
    institution: "AccelerateBS, Hyderabad",
    period: "Oct 2022 - Dec 2022",
    description: "Analyzed large datasets to identify business trends and created visualizations using Power BI and Tableau. Developed Python scripts for data processing and cleaning.",
    certificateUrl: "#"
  },
  {
    type: "certification",
    title: "Certification in Data Science with Python and SQL",
    institution: "ExcelR Solutions",
    period: "2022",
    description: "Mastered data manipulation, analysis, and visualization techniques using Python and SQL. Developed skills in database management and data extraction.",
    certificateUrl: "#"
  }
];

// Contact information
export const contactInfo = {
  email: "goddatibhavyasri@gmail.com",
  linkedin: "https://www.linkedin.com/in/goddati-bhavyasri-b67a23253/",
  github: "https://github.com/Bhavyasri0088",
  resumeUrl: "/assets/resume.pdf"
};
