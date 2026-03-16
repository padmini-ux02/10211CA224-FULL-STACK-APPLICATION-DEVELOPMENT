// Course data with content, quiz and metadata
export const COURSES = [
  {
    _id: "course1",
    title: "Full Stack Web Development",
    instructor: "Dr. John Smith",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    shortDesc: "Learn HTML, CSS, JavaScript, React, Node.js and MongoDB from scratch.",
    description: "Become a complete full stack developer. This course covers everything from basic HTML to deploying full-stack applications. You'll build real world projects you can show to employers.",
    duration: "40 hours",
    lessons: 56,
    level: "Beginner",
    content: [
      { chapter: "Chapter 1: HTML Basics", lessons: ["Introduction to HTML", "HTML Tags & Elements", "Forms and Tables", "Semantic HTML5"] },
      { chapter: "Chapter 2: CSS Styling", lessons: ["CSS Selectors", "Flexbox Layout", "CSS Grid", "Responsive Design & Media Queries"] },
      { chapter: "Chapter 3: JavaScript", lessons: ["Variables & Data Types", "Functions & Loops", "DOM Manipulation", "Async JS & Promises"] },
      { chapter: "Chapter 4: React.js", lessons: ["Components & Props", "State & Hooks", "React Router", "Context API"] },
      { chapter: "Chapter 5: Node.js & MongoDB", lessons: ["Express Server Setup", "REST API Design", "MongoDB with Mongoose", "Authentication with JWT"] },
    ],
    quiz: [
      { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: 0 },
      { q: "Which CSS property is used to change text color?", options: ["font-color", "text-color", "color", "background-color"], answer: 2 },
      { q: "Which keyword declares a variable in modern JavaScript?", options: ["var", "let", "const", "Both let and const"], answer: 3 },
      { q: "What is JSX in React?", options: ["A new database", "A syntax extension for JavaScript", "A CSS framework", "A Node.js module"], answer: 1 },
      { q: "Which method fetches data in JavaScript?", options: ["axios.get()", "fetch()", "getData()", "Both A and B"], answer: 3 },
      { q: "What is REST API?", options: ["A JavaScript library", "An architectural style for web services", "A database type", "A CSS preprocessor"], answer: 1 },
      { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1 },
      { q: "Which React hook manages state?", options: ["useEffect", "useState", "useContext", "useRef"], answer: 1 },
      { q: "What does MongoDB store data as?", options: ["Tables", "JSON-like documents", "XML files", "CSV rows"], answer: 1 },
      { q: "What is npm?", options: ["Node Package Manager", "Network Protocol Manager", "New Programming Method", "Node Plugin Module"], answer: 0 },
    ]
  },
  {
    _id: "course2",
    title: "React JS Complete Guide",
    instructor: "Sarah Wilson",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600",
    shortDesc: "Master React.js with hooks, context API, Redux, and real-world projects.",
    description: "Deep dive into React.js from fundamentals to advanced patterns. Build production-ready applications with industry best practices.",
    duration: "28 hours",
    lessons: 42,
    level: "Intermediate",
    content: [
      { chapter: "Chapter 1: React Fundamentals", lessons: ["What is React?", "Components & JSX", "Props & State", "Event Handling"] },
      { chapter: "Chapter 2: Hooks Deep Dive", lessons: ["useState & useEffect", "useContext & useReducer", "Custom Hooks", "useMemo & useCallback"] },
      { chapter: "Chapter 3: React Router", lessons: ["Route Configuration", "Dynamic Routes", "Protected Routes", "useNavigate & useParams"] },
      { chapter: "Chapter 4: State Management", lessons: ["Context API", "Redux Toolkit", "Zustand", "React Query for API data"] },
    ],
    quiz: [
      { q: "What is a React component?", options: ["A CSS class", "A reusable piece of UI", "A database table", "A server endpoint"], answer: 1 },
      { q: "What does useState return?", options: ["A value only", "A function only", "A value and a setter function", "An object"], answer: 2 },
      { q: "When does useEffect run?", options: ["Before render", "After every render", "Only once", "Based on dependency array"], answer: 3 },
      { q: "What is JSX?", options: ["Pure HTML", "A syntax extension for JavaScript", "A CSS preprocessor", "A package manager"], answer: 1 },
      { q: "How do you pass data to a child component?", options: ["Via state", "Via props", "Via context", "Via Redux"], answer: 1 },
      { q: "What is the purpose of key prop in lists?", options: ["Styling elements", "Help React identify changed items", "Required for all elements", "Adds accessibility"], answer: 1 },
      { q: "What hook subscribes to context?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: 2 },
      { q: "What does React.memo do?", options: ["Memoizes a component to prevent unnecessary re-renders", "Stores API data", "Creates refs", "Handles errors"], answer: 0 },
      { q: "What is the virtual DOM?", options: ["A copy of the real DOM kept in memory", "A CSS technique", "A backend concept", "A database"], answer: 0 },
      { q: "Which file is the entry point of a React app?", options: ["App.js", "index.js", "main.js", "root.js"], answer: 1 },
    ]
  },
  {
    _id: "course3",
    title: "Python for Data Science",
    instructor: "Michael Brown",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=600",
    shortDesc: "Learn Python, Pandas, NumPy, Matplotlib and machine learning fundamentals.",
    description: "Master Python for data analysis and machine learning. Go from Python basics to building predictive ML models with real datasets.",
    duration: "35 hours",
    lessons: 48,
    level: "Beginner",
    content: [
      { chapter: "Chapter 1: Python Basics", lessons: ["Python Installation & Setup", "Variables & Data Types", "Lists, Tuples, Dictionaries", "Functions & Modules"] },
      { chapter: "Chapter 2: Data Analysis", lessons: ["NumPy Arrays", "Pandas DataFrames", "Data Cleaning", "Data Visualization with Matplotlib"] },
      { chapter: "Chapter 3: Machine Learning", lessons: ["Intro to ML", "Linear Regression", "Classification with Scikit-learn", "Model Evaluation & Tuning"] },
    ],
    quiz: [
      { q: "What is Python primarily used for?", options: ["Game development only", "Web, data science, automation and more", "Operating systems only", "Mobile apps only"], answer: 1 },
      { q: "Which library is used for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], answer: 1 },
      { q: "What is a Pandas DataFrame?", options: ["A 1D array", "A 2D labeled data structure", "A chart type", "A ML model"], answer: 1 },
      { q: "What does NumPy stand for?", options: ["Numerical Python", "New Python", "Number Python", "None of the above"], answer: 0 },
      { q: "How do you define a function in Python?", options: ["function myFunc()", "def myFunc():", "func myFunc():", "void myFunc()"], answer: 1 },
      { q: "Which is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "PCA", "DBSCAN"], answer: 1 },
      { q: "What is overfitting?", options: ["Model is too simple", "Model performs well on new data", "Model learns training data too well and fails on new data", "Model has no parameters"], answer: 2 },
      { q: "What library visualizes data in Python?", options: ["TensorFlow", "Pandas", "Matplotlib", "Requests"], answer: 2 },
      { q: "What is the output of len([1,2,3])?", options: ["2", "3", "4", "Error"], answer: 1 },
      { q: "Which method removes missing values in Pandas?", options: ["drop()", "fillna()", "dropna()", "remove()"], answer: 2 },
    ]
  },
  {
    _id: "course4",
    title: "Artificial Intelligence & ML",
    instructor: "Emily Johnson",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600",
    shortDesc: "Dive into AI, neural networks, deep learning and NLP techniques.",
    description: "Explore the cutting edge of artificial intelligence. From neural networks to transformers, learn what powers modern AI systems.",
    duration: "45 hours",
    lessons: 60,
    level: "Advanced",
    content: [
      { chapter: "Chapter 1: AI Foundations", lessons: ["History of AI", "Types of AI", "Machine Learning vs Deep Learning", "AI Ethics"] },
      { chapter: "Chapter 2: Neural Networks", lessons: ["Perceptrons", "Backpropagation", "Activation Functions", "Building Neural Nets with TensorFlow"] },
      { chapter: "Chapter 3: Deep Learning", lessons: ["CNNs for Image Recognition", "RNNs for Sequential Data", "Transfer Learning", "GANs"] },
      { chapter: "Chapter 4: NLP", lessons: ["Text Preprocessing", "Word Embeddings", "Transformers & BERT", "Building a Chatbot"] },
    ],
    quiz: [
      { q: "What is Artificial Intelligence?", options: ["A robot", "Simulation of human intelligence in machines", "A programming language", "An operating system"], answer: 1 },
      { q: "What does CNN stand for?", options: ["Computer Neural Network", "Convolutional Neural Network", "Cognitive Neural Node", "Central Neural Net"], answer: 1 },
      { q: "What is the purpose of backpropagation?", options: ["Forward data flow", "Update weights to minimize loss", "Activate neurons", "Initialize the model"], answer: 1 },
      { q: "What is a transformer model?", options: ["A hardware device", "An attention-based deep learning architecture", "A type of RNN", "A CNN variant"], answer: 1 },
      { q: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Learning Protocol", "Network Layer Protocol", "Null Learning Procedure"], answer: 0 },
      { q: "Which loss function is used for classification?", options: ["MSE", "Cross-Entropy", "MAE", "Huber Loss"], answer: 1 },
      { q: "What is an epoch in training?", options: ["A type of layer", "One full pass through the training dataset", "A learning rate", "An optimizer"], answer: 1 },
      { q: "What is overfitting in ML?", options: ["Model is too simple", "Model memorizes training data and fails on new data", "Model underfits", "Model improves continuously"], answer: 1 },
      { q: "What problem do GANs solve?", options: ["Classification", "Generating new realistic data", "Regression", "Clustering"], answer: 1 },
      { q: "What is transfer learning?", options: ["Moving model to cloud", "Reusing a pre-trained model for a new task", "Training from scratch", "Sharing weights between layers"], answer: 1 },
    ]
  },
  {
    _id: "course5",
    title: "Cloud Computing with AWS",
    instructor: "David Lee",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
    shortDesc: "Master AWS services: EC2, S3, Lambda, and deploy scalable applications.",
    description: "Learn cloud computing concepts and AWS services hands-on. Deploy real applications, manage storage, and build serverless architectures.",
    duration: "32 hours",
    lessons: 44,
    level: "Intermediate",
    content: [
      { chapter: "Chapter 1: Cloud Fundamentals", lessons: ["What is Cloud Computing?", "AWS Global Infrastructure", "IAM Users & Roles", "Billing & Cost Management"] },
      { chapter: "Chapter 2: Compute Services", lessons: ["EC2 Instances", "Auto Scaling Groups", "Load Balancers", "Lambda Functions"] },
      { chapter: "Chapter 3: Storage & Database", lessons: ["S3 Buckets", "RDS Databases", "DynamoDB", "Elastic Cache"] },
      { chapter: "Chapter 4: DevOps on AWS", lessons: ["CI/CD with CodePipeline", "Docker on ECS", "CloudFormation", "Monitoring with CloudWatch"] },
    ],
    quiz: [
      { q: "What does AWS stand for?", options: ["Amazon Web Services", "Automated Web Systems", "Advanced Web Solutions", "Amazon Worldwide Services"], answer: 0 },
      { q: "What is EC2?", options: ["Elastic Compute Cloud", "Elastic Cache Container", "Email Cloud Computing", "External Cloud Component"], answer: 0 },
      { q: "What is S3 used for?", options: ["Computing", "Object storage", "Databases", "Networking"], answer: 1 },
      { q: "What is a serverless function in AWS?", options: ["EC2", "RDS", "Lambda", "ECS"], answer: 2 },
      { q: "What does IAM stand for?", options: ["Internet Access Management", "Identity and Access Management", "Internal Application Module", "Integrated AWS Module"], answer: 1 },
      { q: "What is a VPC?", options: ["Virtual Private Cloud", "Virtual Processing Core", "Verified Public Cloud", "Variable Protocol Container"], answer: 0 },
      { q: "Which AWS service provides managed databases?", options: ["EC2", "S3", "RDS", "CloudFront"], answer: 2 },
      { q: "What is auto-scaling?", options: ["Manual server management", "Automatically adjusting resources based on demand", "A storage policy", "A DNS service"], answer: 1 },
      { q: "What does CDN stand for?", options: ["Content Delivery Network", "Cloud Data Node", "Central Database Network", "Core Delivery Node"], answer: 0 },
      { q: "Which AWS tool monitors resources?", options: ["CloudTrail", "CloudWatch", "CloudFront", "CloudFormation"], answer: 1 },
    ]
  },
  {
    _id: "course6",
    title: "Cyber Security Essentials",
    instructor: "Alex Carter",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    shortDesc: "Learn ethical hacking, penetration testing, and network security.",
    description: "Understand how cyber attacks work and how to defend against them. Practical, hands-on security training for modern environments.",
    duration: "30 hours",
    lessons: 40,
    level: "Intermediate",
    content: [
      { chapter: "Chapter 1: Security Fundamentals", lessons: ["CIA Triad", "Types of Cyber Threats", "Security Policies", "Risk Assessment"] },
      { chapter: "Chapter 2: Network Security", lessons: ["Firewalls & IDS", "VPNs", "Wireless Security", "Network Scanning with Nmap"] },
      { chapter: "Chapter 3: Ethical Hacking", lessons: ["Penetration Testing Phases", "Reconnaissance", "Exploitation with Metasploit", "Reporting"] },
      { chapter: "Chapter 4: Web App Security", lessons: ["OWASP Top 10", "SQL Injection & Prevention", "XSS Attacks", "Secure Coding Practices"] },
    ],
    quiz: [
      { q: "What does CIA stand for in security?", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Computer Intelligence Architecture", "Cyber Infrastructure Assessment"], answer: 1 },
      { q: "What is phishing?", options: ["A fishing sport", "A social engineering attack to steal credentials", "A type of malware", "A network protocol"], answer: 1 },
      { q: "What is a firewall?", options: ["A physical barrier", "A network security system that monitors traffic", "An antivirus program", "A VPN service"], answer: 1 },
      { q: "What does SQL injection exploit?", options: ["Browser vulnerabilities", "Unvalidated user input in database queries", "Network packets", "Encryption flaws"], answer: 1 },
      { q: "What is a VPN used for?", options: ["Speeding up internet", "Creating a secure encrypted connection over the internet", "Blocking websites", "Increasing bandwidth"], answer: 1 },
      { q: "What does XSS stand for?", options: ["Cross-Site Scripting", "Extended Security System", "Cross-Server Synthesis", "eXtra Security Script"], answer: 0 },
      { q: "What is the aim of penetration testing?", options: ["Breaking systems illegally", "Finding vulnerabilities before attackers do", "Installing malware", "Monitoring network traffic"], answer: 1 },
      { q: "What is two-factor authentication?", options: ["Two passwords", "Using two different verification methods", "Two firewall layers", "Double encryption"], answer: 1 },
      { q: "What is ransomware?", options: ["A type of spyware", "Malware that encrypts files and demands payment", "A network attack", "A phishing email"], answer: 1 },
      { q: "What does OWASP stand for?", options: ["Online Web Application Security Protocol", "Open Web Application Security Project", "Official Web Application Standards Program", "Open Wireless Access Security Protocol"], answer: 1 },
    ]
  },
];

export const getUser = () => {
  try {
    const u = localStorage.getItem("user");
    if (!u || u === "undefined") return null;
    return JSON.parse(u);
  } catch { return null; }
};

export const getEnrolled = () => {
  try { return JSON.parse(localStorage.getItem("enrolledCourses") || "[]"); } catch { return []; }
};

export const saveEnrolled = (list) => {
  localStorage.setItem("enrolledCourses", JSON.stringify(list));
};

export const getCompleted = () => {
  try { return JSON.parse(localStorage.getItem("completedCourses") || "[]"); } catch { return []; }
};

export const saveCompleted = (list) => {
  localStorage.setItem("completedCourses", JSON.stringify(list));
};
