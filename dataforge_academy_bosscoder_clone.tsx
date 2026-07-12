import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Code, Database, Server, Layout, 
  ChevronRight, Star, Menu, X, PlayCircle, 
  CheckCircle, User, Phone, Mail, ArrowRight, 
  Briefcase, TrendingUp, Users, Shield, Target, Award,
  LogOut, Plus, Edit, Trash2, ChevronDown
} from 'lucide-react';

// --- MOCK DATABASE ---
const PROGRAMS = [
  {
    id: 'p1',
    title: 'Data Engineering Bootcamp',
    duration: '6 Months',
    mode: 'Live Classes',
    level: 'Intermediate to Advanced',
    fee: '$999',
    description: 'Master Python, SQL, ETL, and Snowflake. Crack top product-based companies.',
    highlights: ['1:1 Mentorship', '10+ Industry Projects', 'Placement Assistance']
  },
  {
    id: 'p2',
    title: 'Data Analytics & Power BI',
    duration: '4 Months',
    mode: 'Live + Recorded',
    level: 'Beginner to Intermediate',
    fee: '$699',
    description: 'Transform raw data into business insights. Learn Excel, SQL, and Advanced Power BI.',
    highlights: ['Real-world Datasets', 'Dashboard Portfolio', 'Resume Reviews']
  }
];

const ALUMNI = [
  { name: 'Rahul Sharma', role: 'Data Engineer', company: 'Amazon', prevCompany: 'TCS', hike: '150%' },
  { name: 'Priya Patel', role: 'Data Analyst', company: 'Microsoft', prevCompany: 'Infosys', hike: '120%' },
  { name: 'Amit Kumar', role: 'Senior DE', company: 'Snowflake', prevCompany: 'Wipro', hike: '200%' },
];

const DEMO_USERS = {
  'student@test.com': { id: 'u1', name: 'Alex Student', email: 'student@test.com', role: 'STUDENT', password: 'password123' },
  'admin@dataforge.com': { id: 'u2', name: 'Admin User', email: 'admin@dataforge.com', role: 'ADMIN', password: 'admin' }
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); 
  const [authError, setAuthError] = useState('');
  
  // Data State
  const [enrollments, setEnrollments] = useState([{ userId: 'u1', courseId: 'p1', progress: 25 }]);

  // Force Dark Theme for Premium Look (Bosscoder style)
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const user = DEMO_USERS[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    } else {
      setAuthError('Invalid credentials. Use student@test.com (pw: password123)');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleEnroll = (courseId) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (currentUser.role === 'ADMIN') return;
    
    const isEnrolled = enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
    if (!isEnrolled) {
      setEnrollments([...enrollments, { userId: currentUser.id, courseId, progress: 0 }]);
    }
    setCurrentView('dashboard');
  };

  const Navbar = () => (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 px-4 text-sm font-semibold tracking-wide">
        🚀 Next Batch for Data Engineering Bootcamp starts on 15th August. Limited Seats!
      </div>
      
      <nav className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                DataForge<span className="text-orange-500">.</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentView('home')} className="text-gray-300 hover:text-white font-medium transition-colors">Programs</button>
              <button className="text-gray-300 hover:text-white font-medium transition-colors">Placements</button>
              <button className="text-gray-300 hover:text-white font-medium transition-colors">Masterclass</button>
              <button className="text-gray-300 hover:text-white font-medium transition-colors">Reviews</button>
              
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-800">
                {!currentUser ? (
                  <>
                    <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="text-gray-300 hover:text-white font-medium">
                      Login
                    </button>
                    <button className="px-5 py-2.5 text-sm font-bold rounded bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      Apply Now
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button onClick={() => setCurrentView('dashboard')} className="text-orange-500 hover:text-orange-400 font-bold">
                      {currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Dashboard'}
                    </button>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-white">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-gray-800 p-4 space-y-4">
            <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-white font-medium">Home</button>
            {!currentUser ? (
              <button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-left text-orange-500 font-medium">Login</button>
            ) : (
              <button onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-orange-500 font-medium">Dashboard</button>
            )}
          </div>
        )}
      </nav>
    </>
  );

  const HomeView = () => (
    <div className="animate-in fade-in duration-500 bg-[#0a0a0a] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Copy */}
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded border border-gray-800 bg-gray-900/50 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-xs font-semibold text-gray-300 tracking-wider uppercase">Rated 4.9/5 by 2000+ Students</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                Crack <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">FAANG</span><br />
                & Top Product Companies.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
                Highly structured Data Engineering & Analytics programs with 1:1 mentorship from industry experts. Your launchpad to a high-paying tech career.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
                <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold text-lg transition-all flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  Apply For Program <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="px-8 py-4 bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white rounded font-bold text-lg transition-all flex items-center justify-center">
                  Book Free Masterclass
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="flex items-center space-x-8 border-t border-gray-800 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">12 <span className="text-orange-500 text-lg">LPA</span></div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Avg Package</div>
                </div>
                <div className="w-px h-12 bg-gray-800"></div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">95<span className="text-orange-500">%</span></div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Placement Rate</div>
                </div>
                <div className="w-px h-12 bg-gray-800"></div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">300<span className="text-orange-500">+</span></div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Hiring Partners</div>
                </div>
              </div>
            </div>

            {/* Right Visual / Floating Cards */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl transform rotate-3 border border-gray-700 shadow-2xl"></div>
              <div className="relative bg-[#111] rounded-2xl p-6 border border-gray-800 shadow-xl z-10">
                {/* Mockup Video Interface */}
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer border border-gray-800">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-40 group-hover:opacity-50 transition-opacity"></div>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
                     <span className="bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded font-medium border border-gray-700">Live Architecture Session</span>
                     <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">LIVE</span>
                  </div>
                </div>

                {/* Floating Success Card */}
                <div className="absolute -bottom-10 -left-10 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-2xl flex items-center space-x-4 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul`} alt="Student" className="w-12 h-12 bg-gray-800 rounded-full" />
                  <div>
                    <p className="text-sm font-bold text-white">Rahul got placed at</p>
                    <p className="text-lg font-black text-orange-400 tracking-wider">AMAZON</p>
                    <p className="text-xs text-green-400 font-semibold">150% Salary Hike</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PLACEMENT MARQUEE */}
      <section className="py-10 border-y border-gray-900 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Our Alumni Work At</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70 grayscale">
            {/* Using text styled as logos for prototype */}
            <span className="text-2xl font-black text-white tracking-tighter">Google</span>
            <span className="text-2xl font-bold text-white tracking-tight">Microsoft</span>
            <span className="text-2xl font-black text-white tracking-widest uppercase">Amazon</span>
            <span className="text-2xl font-bold text-white tracking-tighter">Meta</span>
            <span className="text-2xl font-black text-blue-400">snowflake</span>
            <span className="text-2xl font-bold text-white italic">Uber</span>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US / HIGHLIGHTS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why <span className="text-orange-500">DataForge</span> is different</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">We focus on building scalable systems, not just writing syntax. Learn exactly what product companies ask in interviews.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-orange-500/50 transition-colors">
              <div className="w-14 h-14 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Structured Curriculum</h3>
              <p className="text-gray-400 leading-relaxed">Zero to One journey covering SQL, Python, Big Data, Cloud Data Warehousing, and System Design.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-blue-500/50 transition-colors">
              <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1:1 Mentorship</h3>
              <p className="text-gray-400 leading-relaxed">Weekly mock interviews, code reviews, and career guidance from engineers working at top tech firms.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl hover:border-green-500/50 transition-colors">
              <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Placement Support</h3>
              <p className="text-gray-400 leading-relaxed">Dedicated placement team, resume building, ATS optimization, and direct referrals to hiring partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS LIST */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our <span className="text-orange-500">Programs</span></h2>
            <p className="text-gray-400 text-lg">Select the path that matches your career goals.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {PROGRAMS.map(prog => (
              <div key={prog.id} className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-orange-500/30 transition-colors">
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white">{prog.title}</h3>
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wide">{prog.duration}</span>
                  </div>
                  <p className="text-gray-400 mb-8 h-12">{prog.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    {prog.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-orange-500 mr-3 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Mode</p>
                      <p className="font-semibold text-white">{prog.mode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Level</p>
                      <p className="font-semibold text-white">{prog.level}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-6 flex items-center justify-between border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Program Fee</p>
                    <p className="text-2xl font-bold text-white">{prog.fee}</p>
                  </div>
                  <button onClick={() => setAuthModalOpen(true)} className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALUMNI SUCCESS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Real Results. <span className="text-orange-500">Real Stories.</span></h2>
            <p className="text-gray-400 text-lg">Join thousands of students who have transformed their careers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ALUMNI.map((alumni, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative">
                <div className="absolute top-0 right-0 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" /> {alumni.hike} Hike
                </div>
                <div className="flex items-center space-x-4 mb-6 mt-2">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${alumni.name}`} alt={alumni.name} className="w-16 h-16 bg-gray-800 rounded-full" />
                  <div>
                    <h4 className="font-bold text-white text-lg">{alumni.name}</h4>
                    <p className="text-sm text-gray-400">{alumni.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">From</p>
                    <p className="font-semibold text-gray-300">{alumni.prevCompany}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">To</p>
                    <p className="font-bold text-orange-400">{alumni.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="text-orange-500 font-bold hover:text-orange-400 inline-flex items-center">
              Read all success stories <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">Take the first step towards a highly rewarding career.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-[#111] text-white font-bold rounded text-lg hover:bg-black transition-colors">
              Apply Now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded text-lg hover:bg-white hover:text-orange-600 transition-colors">
              Download Curriculum
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // --- STUDENT DASHBOARD ---
  const StudentDashboard = () => {
    const myEnrollments = enrollments
      .filter(e => e.userId === currentUser.id)
      .map(e => ({
        ...e,
        course: PROGRAMS.find(p => p.id === e.courseId)
      }));

    return (
      <div className="animate-in fade-in max-w-7xl mx-auto px-4 py-12 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name.split(' ')[0]}</h2>
        <p className="text-gray-400 mb-8">Let's continue crushing your learning goals.</p>
        
        {myEnrollments.length === 0 ? (
          <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No active programs</h3>
            <button onClick={() => setCurrentView('home')} className="text-orange-500 font-medium hover:underline">Explore Programs</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myEnrollments.map((enr, i) => (
              <div key={i} className="bg-[#111] border border-gray-800 rounded-xl p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{enr.course.title}</h3>
                  <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded">Active</span>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Completion</span>
                    <span className="font-bold text-white">{enr.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-auto">
                   <button className="flex-1 px-4 py-3 bg-white text-black rounded font-bold flex items-center justify-center hover:bg-gray-200">
                    <PlayCircle className="w-5 h-5 mr-2" /> Resume
                  </button>
                  <button className="px-4 py-3 bg-gray-800 text-white rounded font-bold border border-gray-700 hover:bg-gray-700">
                    Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- ADMIN DASHBOARD ---
  const AdminDashboard = () => (
    <div className="animate-in fade-in max-w-7xl mx-auto px-4 py-12 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold flex items-center">
            <Shield className="w-8 h-8 mr-3 text-orange-500" /> Admin Portal
          </h2>
          <p className="text-gray-400 mt-1">Manage programs, students, and placements.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded font-bold hover:bg-orange-600">
          <Plus className="w-5 h-5 mr-1" /> New Batch
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-gray-800">
              <th className="py-4 px-6 text-sm font-semibold text-gray-400">Program Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-400">Duration</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-400">Fee</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PROGRAMS.map(prog => (
              <tr key={prog.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="py-4 px-6 font-medium text-white">{prog.title}</td>
                <td className="py-4 px-6 text-sm text-gray-400">{prog.duration}</td>
                <td className="py-4 px-6 text-sm text-gray-400">{prog.fee}</td>
                <td className="py-4 px-6 flex space-x-3">
                  <button className="text-blue-400 hover:text-blue-300"><Edit className="w-5 h-5" /></button>
                  <button className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- AUTH MODAL (Custom, No Alerts) ---
  const AuthModal = () => {
    if (!isAuthModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAuthModalOpen(false)}></div>
        <div className="relative w-full max-w-md bg-[#111] border border-gray-800 rounded-xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
          <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Start Your Journey'}
            </h2>
            <p className="text-sm text-gray-400">
              {authMode === 'login' ? 'Login to access your dashboard' : 'Join the elite club of engineers'}
            </p>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-orange-500 transition-colors" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input name="email" type="email" defaultValue="student@test.com" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-orange-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input name="password" type="password" defaultValue="password123" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-orange-500 transition-colors" />
            </div>
            
            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors mt-4">
              {authMode === 'login' ? 'Login Securely' : 'Apply Now'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {authMode === 'login' ? "New here? " : "Already applied? "}
            <button onClick={() => {setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthError('');}} className="font-bold text-white hover:text-orange-500 transition-colors">
              {authMode === 'login' ? 'Apply Now' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- FOOTER ---
  const Footer = () => (
    <footer className="bg-[#050505] border-t border-gray-900 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Database className="w-6 h-6 text-orange-500" />
            <span className="font-bold text-xl text-white">DataForge<span className="text-orange-500">.</span></span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Refund Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} DataForge Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        {currentView === 'home' && <HomeView />}
        {currentView === 'dashboard' && currentUser?.role === 'STUDENT' && <StudentDashboard />}
        {currentView === 'dashboard' && currentUser?.role === 'ADMIN' && <AdminDashboard />}
      </main>

      {currentView !== 'dashboard' && <Footer />}
      <AuthModal />
    </div>
  );
}