import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/authContext';
import { 
    Trash2, CheckCircle, Circle, LogOut, Plus, 
    Loader2, User, BookOpen, GraduationCap, Target, ExternalLink 
} from 'lucide-react';

const Dashboard = () => {
    const { logout } = useAuth();
    const [assignments, setAssignments] = useState([]);
    const [profile, setProfile] = useState(null);
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                //Requirement: Fetch profile (populated with mentor) and task list
                const [profileRes, assignmentsRes] = await Promise.all([
                    API.get('/auth/profile'),
                    API.get('/assignments')
                ]);
                setProfile(profileRes.data);
                setAssignments(assignmentsRes.data);
            } catch (err) {
                console.error("Data fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Requirement 5: Progress derived from assignment completion
    const totalTasks = assignments.length;
    const completedTasks = assignments.filter(a => a.status === 'completed').length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const handleAddAssignment = async (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        try {
            const res = await API.post('/assignments', { title: task });
            setAssignments([res.data, ...assignments]);
            setTask('');
        } catch (err) { 
            alert("Failed to submit assignment. Check if your backend server is running."); 
        }
    };

    const toggleStatus = async (id) => {
        try {
            const res = await API.put(`/assignments/${id}`);
            setAssignments(assignments.map(a => (a._id === id ? res.data : a)));
        } catch (err) { alert("Update failed"); }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await API.delete(`/assignments/${id}`);
            setAssignments(assignments.filter(a => a._id !== id));
        } catch (err) { alert("Delete failed"); }
    };

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-500 font-medium">Loading your student workspace...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header / Navbar */}
            <nav className="bg-white border-b p-4 px-8 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <GraduationCap size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                        Student<span className="text-blue-600">Portal</span>
                    </h1>
                </div>
                <button 
                    onClick={logout} 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                >
                    <LogOut size={18} /> Logout
                </button>
            </nav>

            <main className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Section: Profile & Courses (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Requirement 3: View student profile & Mentor details */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><User size={20}/></div>
                            <h2 className="font-bold text-lg text-gray-800">My Profile</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Full Name</label>
                                <p className="text-gray-900 font-semibold text-lg">{profile?.name}</p>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Email Address</label>
                                <p className="text-gray-600 text-sm">{profile?.email}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-50">
                                <label className="text-[10px] uppercase font-bold text-blue-400 tracking-widest mb-2 block">Assigned Mentor</label>
                                {profile?.mentor ? (
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                                        <p className="font-bold text-blue-900">{profile.mentor.name}</p>
                                        <p className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1">
                                            <ExternalLink size={12}/> {profile.mentor.expertise}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="animate-pulse bg-orange-50 p-4 rounded-2xl border border-orange-100">
                                        <p className="text-xs text-orange-600 italic font-medium">Currently assigning your mentor...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Requirement 3: View Enrolled Courses */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-100 p-2 rounded-xl text-purple-600"><BookOpen size={20}/></div>
                            <h2 className="font-bold text-lg text-gray-800">My Courses</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {profile?.enrolledCourses?.length > 0 ? (
                                profile.enrolledCourses.map((course, i) => (
                                    <div key={i} className="text-sm bg-gray-50 p-3 rounded-xl text-gray-700 border border-gray-100 font-medium hover:border-purple-200 transition-colors">
                                        {course}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">No courses enrolled yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section: Progress & Tasks (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Requirement 5: Progress Bar Visualization */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-tighter mb-1">
                                        <Target size={16}/> Learning Milestone
                                    </div>
                                    <h2 className="text-4xl font-black text-gray-800">{progress}%</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-800">{completedTasks} / {totalTasks}</p>
                                    <p className="text-[10px] text-gray-400 uppercase">Tasks Completed</p>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4">
                                <div 
                                    className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-50 rounded-full opacity-50 z-0"></div>
                    </div>

                    {/* Requirement 4: Submit & View Assignments */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="font-bold text-gray-800 text-lg mb-4">Assignment Submission</h2>
                            <form onSubmit={handleAddAssignment} className="flex gap-3">
                                <input 
                                    className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    placeholder="Enter assignment title..."
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />
                                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95">
                                    <Plus size={20} /> Submit
                                </button>
                            </form>
                        </div>

                        <div className="bg-gray-50/50 p-2">
                            <div className="space-y-2 p-4">
                                {assignments.length > 0 ? (
                                    assignments.map((item) => (
                                        <div key={item._id} className="bg-white p-4 rounded-2xl flex justify-between items-center border border-gray-100 hover:shadow-md transition-shadow group">
                                            <div className="flex items-center gap-4">
                                                <button 
                                                    onClick={() => toggleStatus(item._id)}
                                                    className="transition-transform active:scale-90"
                                                >
                                                    {item.status === 'completed' ? 
                                                        <CheckCircle className="text-green-500" size={28} /> : 
                                                        <Circle className="text-gray-200 hover:text-blue-400" size={28} />}
                                                </button>
                                                <div>
                                                    <p className={`font-bold transition-all ${item.status === 'completed' ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                                                        {item.title}
                                                    </p>
                                                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded-md font-black tracking-wider ${item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => deleteTask(item._id)} 
                                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-400 text-sm">No assignments submitted yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;