import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: 'code' },
    { id: 'behavioral', label: 'Behavioral Questions', icon: 'psychology' },
    { id: 'roadmap', label: 'Preparation Plan', icon: 'event_note' },
];

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative border-l-[3px] border-[#2e42ff] pl-5 mb-8 transition-all">
            <div className="cursor-pointer group flex items-start justify-between" onClick={() => setOpen(o => !o)}>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#2e42ff] transition-colors pr-4">
                    <span className="text-[#2e42ff] mr-2">Q{index + 1}.</span>
                    {item.question}
                </p>
                <span className="material-icons-outlined text-slate-400 group-hover:text-[#2e42ff] transition-transform">
                    {open ? 'expand_less' : 'expand_more'}
                </span>
            </div>
            {open && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#2e42ff]">Intention / Why this matters:</p>
                        <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{item.intention}</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#2e42ff]">Model Answer / Strategy:</p>
                        <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const RoadMapWeek = ({ week }) => (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2e42ff]/10 text-sm font-bold text-[#2e42ff]">
                W{week.week}
            </span>
            <h3 className="text-[15px] font-semibold text-slate-900">{week.focus}</h3>
        </div>
        <ul className="list-inside list-disc space-y-2 text-sm text-slate-600 pl-1">
            {week.tasks.map((task, i) => (
                <li key={i}>{task}</li>
            ))}
        </ul>
    </div>
);

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical');
    const { report, getReportById, loading, getResumePdf } = useInterview();
    const { interviewId } = useParams();
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    const getSeverityColors = (severity) => {
        switch (severity?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-600';
            case 'medium': return 'bg-amber-50 text-amber-600';
            default: return 'bg-blue-50 text-[#2e42ff]';
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#f9f9fb] font-sans text-slate-900">
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

            <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {(loading || !report) ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <span className="material-icons-outlined animate-spin text-4xl text-[#2e42ff]">autorenew</span>
                            <h2 className="text-xl font-semibold text-slate-600">Loading your interview plan...</h2>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Page Header */}
                        <div className="mb-8">
                            <h2 className="text-[28px] font-semibold tracking-tight text-slate-900">
                                Interview Preparation Report
                            </h2>
                            <p className="mt-1 max-w-3xl text-sm text-slate-500">
                                AI-generated insights tailored to your profile and the <span className="font-semibold text-slate-700">{report.title}</span> candidate requirements.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left Sidebar - Navigation */}
                            <div className="flex flex-col gap-6 lg:col-span-3">
                                <nav className="flex flex-col gap-1">
                                    {NAV_ITEMS.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveNav(item.id)}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                                activeNav === item.id 
                                                ? 'bg-[#2e42ff] font-semibold text-white shadow-md shadow-[#2e42ff]/20' 
                                                : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                        >
                                            <span className="material-icons-outlined text-[20px]">{item.icon}</span>
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Actions</p>
                                    <button 
                                        onClick={() => getResumePdf(interviewId)}
                                        disabled={loading}
                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2e42ff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2034e6] hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                                        <span className="material-icons-outlined text-[18px]">{loading ? 'hourglass_empty' : 'download'}</span>
                                        {loading ? 'Generating...' : 'Download Resume'}
                                    </button>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex flex-col gap-6 lg:col-span-6">
                                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                    {activeNav === 'technical' && (
                                        <section>
                                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                                <h3 className="text-[19px] font-semibold text-slate-900">Technical Questions</h3>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{report.technicalQuestions?.length || 0} questions</span>
                                            </div>
                                            <div className="space-y-2">
                                                {report.technicalQuestions?.length > 0 ? report.technicalQuestions.map((q, i) => (
                                                    <QuestionCard key={i} item={q} index={i} />
                                                )) : <p className="text-sm text-slate-500 italic">No technical questions generated.</p>}
                                            </div>
                                        </section>
                                    )}

                                    {activeNav === 'behavioral' && (
                                        <section>
                                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                                <h3 className="text-[19px] font-semibold text-slate-900">Behavioral Questions</h3>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{report.behavioralQuestions?.length || 0} questions</span>
                                            </div>
                                            <div className="space-y-2">
                                                {report.behavioralQuestions?.length > 0 ? report.behavioralQuestions.map((q, i) => (
                                                    <QuestionCard key={i} item={q} index={i} />
                                                )) : <p className="text-sm text-slate-500 italic">No behavioral questions generated.</p>}
                                            </div>
                                        </section>
                                    )}

                                    {activeNav === 'roadmap' && (
                                        <section>
                                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                                <h3 className="text-[19px] font-semibold text-slate-900">Preparation Road Map</h3>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{report.preparationPlan?.length || 0}-week plan</span>
                                            </div>
                                            <div className="space-y-4">
                                                {report.preparationPlan?.length > 0 ? report.preparationPlan.map((weekItem) => (
                                                    <RoadMapWeek key={weekItem.week} week={weekItem} />
                                                )) : <p className="text-sm text-slate-500 italic">No roadmap generated.</p>}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </div>

                            {/* Right Sidebar - Insights */}
                            <div className="flex flex-col gap-6 lg:col-span-3">
                                {/* Match Score Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                                    <h3 className="text-[15px] font-semibold text-slate-900">Match Score</h3>
                                    
                                    <div className="relative mx-auto mt-6 flex h-[120px] w-[120px] items-center justify-center rounded-full border-[10px] border-slate-100">
                                        <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                                            <circle 
                                                cx="50" cy="50" r="45" fill="none" stroke={report.matchScore >= 80 ? '#2e42ff' : report.matchScore >= 60 ? '#f59e0b' : '#dc2626'} 
                                                strokeWidth="10" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (report.matchScore || 0)) / 100} 
                                                className="transition-all duration-1000 ease-out" 
                                            />
                                        </svg>
                                        <div className="absolute flex flex-col items-center justify-center">
                                            <span className={`text-3xl font-bold tracking-tight ${report.matchScore >= 80 ? 'text-[#2e42ff]' : report.matchScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                                                {report.matchScore || 0}<span className="text-lg font-semibold ml-0.5">%</span>
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="mt-5 text-[13px] leading-snug text-slate-600">
                                        {report.matchScore >= 80 ? "Strong match for this role" : report.matchScore >= 60 ? "Moderate match for this role" : "Low match for this role"}
                                    </p>
                                    <div className={`mx-auto mt-5 h-1 w-full max-w-[140px] rounded-full ${report.matchScore >= 80 ? 'bg-[#2e42ff]' : report.matchScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                </div>

                                {/* Skill Gaps Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h3 className="text-[15px] font-semibold text-slate-900 mb-6">Skill Gaps</h3>
                                    <div className="space-y-4">
                                        {report.skillGaps?.length > 0 ? report.skillGaps.map((gap, i) => (
                                            <div key={i} className="pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[13px] font-semibold text-slate-800">{gap.skill}</h4>
                                                    <span className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase ${getSeverityColors(gap.severity)}`}>
                                                        {gap.severity}
                                                    </span>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-xs text-slate-500">No critical skill gaps identified.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        
            </main>
            <footer className="border-t border-slate-200 bg-white py-6">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
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

export default Interview;