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
    title: "B.Tech (Electronics and Communication Engineering)",
    institution: "Sri Padmavathi Mahila Vishvavidyalayam, Tirupati, Andhra Pradesh",
    period: "2020-2024",
    description: "Completing B.Tech in Electronics and Communication Engineering with coursework in programming, statistics, and data analysis.",
    certificateUrl: null
  },
  {
    type: "certification",
    title: "DATA SCIENCE Certification",
    institution: "Excel-R",
    period: "2023",
    description: "Comprehensive data science program covering advanced analytics, machine learning, and data visualization techniques.",
    certificateUrl: "#"
  },
  {
    type: "internship",
    title: "DATA SCIENCE Internship",
    institution: "Excel-R",
    period: "2023",
    description: "Hands-on experience in implementing data science concepts, developing ML models, and data analysis.",
    certificateUrl: "#"
  },
  {
    type: "internship",
    title: "ARTIFICIAL INTELLIGENCE Internship",
    institution: "LOOMA IT SOLUTION",
    period: "2023",
    description: "Worked on AI projects implementing machine learning algorithms and deep learning models.",
    certificateUrl: "#"
  },
  {
    type: "internship",
    title: "PYTHON PROGRAMMING Internship",
    institution: "APSSDC",
    period: "2023",
    description: "Developed strong programming fundamentals and practical experience in Python development.",
    certificateUrl: "#"
  },
  {
    type: "certification",
    title: "Pattern Recognition and Its Applications",
    institution: "NPTEL",
    period: "2023",
    description: "Advanced course in pattern recognition techniques and their practical applications in data science.",
    certificateUrl: "#"
  }
];

// Contact information
export const contactInfo = {
  email: "goddatibhavyasri@gmail.com",
  linkedin: "https://www.linkedin.com/in/goddati-bhavyasri-02ab37308",
  github: "https://github.com/Bhavyasri0088",
  resumeUrl: "/assets/resume.pdf"
};
