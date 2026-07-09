# AceInterview (Resume Analyzer)

AceInterview is an AI-powered full-stack web application that helps job seekers prepare for interviews more effectively. It analyzes a candidate's resume, self-description, and a target job description to generate personalized interview questions, identify skill gaps, estimate ATS compatibility, and create a structured preparation plan.

The goal of this project is to make interview preparation more focused and tailored to the role a candidate is applying for.

## Features

* Upload a resume in PDF format along with a job description and self-description
* Generate personalized technical and behavioral interview questions using Google Gemini
* Analyze the resume against the job description and estimate an ATS match score
* Identify missing skills and highlight areas that need improvement
* Generate a week-by-week interview preparation roadmap
* Save all interview reports so users can access them later
* Secure user authentication using JWT
* Responsive and modern user interface built with React and Tailwind CSS

## Tech Stack

### Frontend

* React (Vite)
* React Router v7
* Tailwind CSS
* Axios
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Google Gemini API
* Multer
* pdf-parse
* bcryptjs
* JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Before running the project, make sure you have:

* Node.js installed
* A MongoDB database (local or MongoDB Atlas)
* A Google Gemini API key from Google AI Studio

### Clone the repository

```bash
git clone https://github.com/meetp200547/AceInterview.git
cd AceInterview
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Start the backend server.

```bash
npm run dev
```

### Frontend Setup

Open a new terminal.

```bash
cd Frontend
npm install
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## How It Works

1. Sign up or log in to your account.
2. Upload your resume.
3. Paste the job description.
4. Write a short self-description.
5. Generate your interview report.
6. Review your match score, skill gaps, interview questions, and personalized preparation plan.
7. Access previous reports anytime from the dashboard.

## Project Structure

```text
AceInterview
├── Backend
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.js
│
├── Frontend
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md
```

## Future Improvements

Some features planned for future development include:

* AI-generated optimized resumes
* Mock interview mode
* Company-specific interview preparation
* Progress tracking and analytics
* Export interview reports as PDF

## What I Learned

This project helped me gain hands-on experience with:

* Building full-stack applications using the MERN stack
* Designing REST APIs
* JWT authentication and route protection
* File uploads and PDF parsing
* Integrating Google Gemini into real-world applications
* Prompt engineering for structured AI responses
* MongoDB data modeling
* React Context API
* Creating responsive user interfaces with Tailwind CSS

## License

This project was built for learning, portfolio, and educational purposes.
