import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../hooks/useAuth';



const Dashboard = () => {
   const { loading, generateReport, reports } = useInterview()
   const { handleLogout } = useAuth()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFile, setResumeFile ] = useState(null)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        if( !jobDescription || !selfDescription || !resumeFile ) {
            alert("Please fill all the fields")
            return
        }
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        }
    }
  if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }  

  return (
    <div className="min-h-screen bg-[#f9f9fb] font-sans text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tight text-[#2e42ff]">
              AceInterview
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm font-bold text-slate-600 hover:text-[#2e42ff] transition-colors">
                Dashboard
              </a>
            </nav>
          </div>
          <button
            onClick={async () => {
              await handleLogout();
              navigate('/login');
            }}
            className="text-sm font-bold text-slate-700 hover:text-[#2e42ff] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Interview Intelligence Dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Ready to ace your next round? Provide the job context and your profile below to 
            generate a tailored preparation report including likely questions and AI feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column: Text Inputs */}
          <div className="space-y-8">
            {/* Job Description Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <span className="material-icons-outlined text-[#2e42ff]">work_outline</span>
                <h3 className="font-semibold text-slate-800">Job Description</h3>
              </div>
              <div className="p-6">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 placeholder-slate-400 focus:border-[#2e42ff] focus:outline-none focus:ring-1 focus:ring-[#2e42ff] transition-all"
                  placeholder="Paste the full job description here... (e.g. key responsibilities, required technical skills, and company culture descriptions)"
                />
              </div>
            </div>

            {/* About Yourself Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                <span className="material-icons-outlined text-[#2e42ff]">person_outline</span>
                <h3 className="font-semibold text-slate-800">About Yourself / Experience</h3>
              </div>
              <div className="p-6">
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 placeholder-slate-400 focus:border-[#2e42ff] focus:outline-none focus:ring-1 focus:ring-[#2e42ff] transition-all"
                  placeholder="Briefly describe your relevant experience, key achievements, and what makes you a great fit for this specific role..."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Upload and Summary */}
          <div className="space-y-8 flex flex-col justify-between">
            <div>
              {/* Upload Resume Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md mb-8">
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                  <span className="material-icons-outlined text-[#2e42ff]">file_upload</span>
                  <h3 className="font-semibold text-slate-800">Upload Resume</h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 px-4 transition-colors hover:border-[#2e42ff]/50">
                    <input 
                      type="file" 
                      ref={resumeInputRef} 
                      onChange={(e)=>setResumeFile(e.target.files[0])}
                      className="hidden" 
                      accept=".pdf,.docx"
                    />
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2e42ff]/10 text-[#2e42ff]">
                      <span className="material-icons-outlined text-2xl">cloud_upload</span>
                    </div>
                    <p className="text-xl font-bold text-slate-900">Drag and drop resume</p>
                    <p className="mt-1 text-sm text-slate-500">Support PDF, DOCX (Max 3MB)</p>
                    {resumeFile && <p className="mt-3 font-medium text-[#2e42ff] truncate max-w-full px-4">{resumeFile.name}</p>}
                    <button 
                      onClick={() => resumeInputRef.current?.click()}
                      className="mt-6 rounded-lg bg-[#2e42ff]/10 px-8 py-2.5 text-sm font-semibold text-[#2e42ff] transition-colors hover:bg-[#2e42ff]/20">
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Analysis Summary Card */}
              <div className="overflow-hidden rounded-2xl bg-[#2e42ff] p-8 text-white shadow-lg shadow-[#2e42ff]/20">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-icons-outlined">auto_awesome</span>
                  <h3 className="text-xl font-bold">AI Analysis Ready</h3>
                </div>
                <p className="mb-8 text-[#f0f2ff] text-sm leading-relaxed">
                  Our AI will map your experience against the job requirements to generate:
                </p>
                <ul className="space-y-4">
                  {[
                    "Tailored Technical Questions",
                    "Behavioral Questions (STAR guidance)",
                    "Match Score (0-100)",
                    "Skill Gap & Severity Analysis",
                    "Day-by-day Preparation Plan"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                      <span className="material-icons-outlined text-[18px] text-[#8692ff]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Final CTA Button */}
            <button 
              onClick={handleGenerateReport}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2e42ff] py-5 text-lg font-bold text-white shadow-xl shadow-[#2e42ff]/30 transition-all hover:scale-[1.01] active:scale-[0.98] hover:bg-[#2034e6] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed">
              {loading ? 'GENERATING REPORT...' : 'GENERATE INTERVIEW REPORT'}
              {!loading && <span className="material-icons-outlined">arrow_forward</span>}
            </button>
          </div>
        </div>

        {/* Recent Reports Section */}
          {reports && reports.length > 0 && (
          <div className="mt-20">
            <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-bold text-slate-900">Recent Interview Reports</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {reports.length} Reports
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <div 
                  key={report._id} 
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2e42ff] hover:shadow-lg hover:shadow-[#2e42ff]/10"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2e42ff]">
                      {new Date(report.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <div className={`flex items-center gap-1 text-sm font-bold ${report.matchScore >= 80 ? 'text-[#2e42ff]' : report.matchScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      <span className="material-icons-outlined text-[16px]">score</span>
                      {report.matchScore || 0}% Match
                    </div>
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#2e42ff] transition-colors">{report.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {report.jobDescription}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4 text-sm font-semibold text-slate-400 transition-colors group-hover:text-[#2e42ff]">
                    <span>View Full Report</span>
                    <span className="material-icons-outlined transform transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} AceInterview. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-slate-500 hover:text-[#2e42ff] transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-[#2e42ff] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;