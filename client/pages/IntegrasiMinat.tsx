import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Search, ArrowLeft, Menu, Home, ChevronRight, LogOut } from "lucide-react";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Skill {
  id: string;
  name: string;
}

interface SelectedSkill {
  id: string;
  name: string;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
}

export default function IntegrasiMinat() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedHardskills, setSelectedHardskills] = useState<SelectedSkill[]>([]);
  const [selectedSoftskills, setSelectedSoftskills] = useState<SelectedSkill[]>([]);
  const [hardskillSearch, setHardskillSearch] = useState("");
  const [softskillSearch, setSoftskillSearch] = useState("");
  const [isHardskillDialogOpen, setIsHardskillDialogOpen] = useState(false);
  const [isSoftskillDialogOpen, setIsSoftskillDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [error, setError] = useState("");

  // Mock data untuk hardskills
  const hardskills: Skill[] = [
    { id: "1", name: "Matematika Diskrit" },
    { id: "2", name: "Machine Learning" },
    { id: "3", name: "Algoritma Pemograman" },
    { id: "4", name: "Natural Language Processing" },
    { id: "5", name: "Artificial Intelligence" },
    { id: "6", name: "Data Visualization" },
    { id: "7", name: "UI/UX Design" },
    { id: "8", name: "Web Development" },
    { id: "9", name: "Database Management" },
    { id: "10", name: "Mobile Development" }
  ];

  // Mock data untuk softskills
  const softskills: Skill[] = [
    { id: "1", name: "Project Management" },
    { id: "2", name: "Detail-Oriented" },
    { id: "3", name: "Communication" },
    { id: "4", name: "Leadership" },
    { id: "5", name: "Critical Thinking" },
    { id: "6", name: "Problem Solving" },
    { id: "7", name: "Teamwork" },
    { id: "8", name: "Time Management" },
    { id: "9", name: "Creativity" },
    { id: "10", name: "Adaptability" }
  ];

  // Mock recommendations
  const mockRecommendations: Recommendation[] = [
    {
      id: 1,
      title: "Machine Learning",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      title: "Data Visualization",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      title: "Natural Language Processing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 4,
      title: "Big Data",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  const filteredHardskills = hardskills.filter(skill =>
    skill.name.toLowerCase().includes(hardskillSearch.toLowerCase())
  );

  const filteredSoftskills = softskills.filter(skill =>
    skill.name.toLowerCase().includes(softskillSearch.toLowerCase())
  );

  const canGenerate = selectedHardskills.length > 0 && selectedSoftskills.length > 0;

  const addHardskill = (skill: Skill) => {
    if (selectedHardskills.length >= 5) {
      setError("Maksimal 5 skill per kategori.");
      return;
    }
    
    if (!selectedHardskills.find(s => s.id === skill.id)) {
      setSelectedHardskills([...selectedHardskills, skill]);
      setError("");
    }
  };

  const addSoftskill = (skill: Skill) => {
    if (selectedSoftskills.length >= 5) {
      setError("Maksimal 5 skill per kategori.");
      return;
    }
    
    if (!selectedSoftskills.find(s => s.id === skill.id)) {
      setSelectedSoftskills([...selectedSoftskills, skill]);
      setError("");
    }
  };

  const removeHardskill = (skillId: string) => {
    setSelectedHardskills(selectedHardskills.filter(s => s.id !== skillId));
  };

  const removeSoftskill = (skillId: string) => {
    setSelectedSoftskills(selectedSoftskills.filter(s => s.id !== skillId));
  };

  const handleGenerate = () => {
    if (!canGenerate) {
      setError("Tambahkan minimal satu hardskill dan satu softskill untuk melanjutkan.");
      return;
    }

    setIsGenerating(true);
    setError("");

    // Simulate processing time
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setShowResults(true);
      setIsGenerating(false);
    }, 3000);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  const handleEndSession = () => {
    setShowEndSessionDialog(true);
  };

  const confirmEndSession = () => {
    // Reset all state
    setSelectedHardskills([]);
    setSelectedSoftskills([]);
    setShowResults(false);
    setShowEndSessionDialog(false);
    // Navigate to dashboard or home
    window.location.href = "/dashboard";
  };

  // Show warning before page unload if data exists
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if ((selectedHardskills.length > 0 || selectedSoftskills.length > 0) && !showResults) {
        e.preventDefault();
        e.returnValue = "Apakah kamu yakin ingin keluar? Data belum disimpan.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [selectedHardskills, selectedSoftskills, showResults]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header with Sidebar Toggle */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-aira-primary to-aira-secondary py-6 px-4 md:px-8 relative overflow-hidden shadow-lg">
          {/* Decorative gradient circles */}
          <div className="absolute right-0 top-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] bg-gradient-to-br from-white via-white/50 to-transparent pointer-events-none" />
          <div className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-[0.1] pointer-events-none">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-transparent" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none" />
          <div className="relative max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <img
                src="/assets/images/logo-aira-footer.png"
                alt="AIRA Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
              Integrasi Minat
            </h1>
            <div className="w-12 md:w-16"></div>
          </div>
        </header>

        {/* Main Content with Sidebar */}
        <div className="flex-1 flex relative">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed left-0 top-[96px] md:top-[112px] bottom-0 z-40 w-64 bg-gradient-to-b from-aira-primary to-aira-secondary transition-transform duration-300 ease-in-out shadow-xl`}
          >
            <nav className="p-6 space-y-4 text-white h-full flex flex-col">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/simulasi-ipk");
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium"
              >
                Simulasi IPK
              </button>
              <button className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
                Integrasi Minat
              </button>
              <div className="flex-1"></div>
              <button
                onClick={() => {
                  navigate("/");
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium text-white"
              >
                Log Out
              </button>
            </nav>
          </aside>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 px-4 md:px-8 py-8 bg-white">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link
                  to="/dashboard"
                  className="hover:text-aira-primary transition-colors flex items-center gap-1"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Integrasi Minat</span>
              </div>

              <h2 className="text-2xl font-semibold mb-8 text-gray-800">AIRA's Recommendation:</h2>
              
              <div className="space-y-4 mb-8">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="flex items-start space-x-4">
                    <div className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {String(rec.id).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-full px-6 py-3 border border-gray-300">
                        <h3 className="text-lg font-medium text-gray-800">{rec.title}</h3>
                      </div>
                      <p className="text-gray-600 mt-2 ml-2">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleEndSession}
                  className="px-6 py-3 bg-aira-primary text-white rounded-lg hover:bg-aira-secondary transition-colors"
                >
                  End Session
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* End Session Confirmation Dialog */}
        {showEndSessionDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Konfirmasi</h3>
              <p className="text-gray-600 mb-6">Apakah kamu yakin ingin mengakhiri sesi?</p>
              <div className="flex space-x-4 justify-end">
                <button
                  onClick={() => setShowEndSessionDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={confirmEndSession}
                  className="px-4 py-2 bg-[#8B2635] text-white rounded hover:bg-[#7A2230]"
                >
                  Ya, Akhiri
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Sidebar Toggle */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-aira-primary to-aira-secondary py-6 px-4 md:px-8 relative overflow-hidden shadow-lg">
        {/* Decorative gradient circles */}
        <div className="absolute right-0 top-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] bg-gradient-to-br from-white via-white/50 to-transparent pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-[500px] h-[500px] opacity-[0.1] pointer-events-none">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <img
              src="/assets/images/logo-aira-footer.png"
              alt="AIRA Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </div>
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
            Integrasi Minat
          </h1>
          <div className="w-12 md:w-16"></div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex relative">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-[96px] md:top-[112px] bottom-0 z-40 w-64 bg-gradient-to-b from-aira-primary to-aira-secondary transition-transform duration-300 ease-in-out shadow-xl`}
        >
          <nav className="p-6 space-y-4 text-white h-full flex flex-col">
            <button
              onClick={() => {
                navigate("/dashboard");
                setIsSidebarOpen(false);
              }}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              Profile
            </button>
            <button
              onClick={() => {
                navigate("/simulasi-ipk");
                setIsSidebarOpen(false);
              }}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              Simulasi IPK
            </button>
            <button className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
              Integrasi Minat
            </button>
            <div className="flex-1"></div>
            <button
              onClick={() => {
                navigate("/");
                setIsSidebarOpen(false);
              }}
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium text-white"
            >
              Log Out
            </button>
          </nav>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-8 bg-white">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link
                to="/dashboard"
                className="hover:text-aira-primary transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Integrasi Minat</span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {/* Technical Potential Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  AIRA is ready to analyze your <span className="font-bold">technical potential.</span>
                </h2>
                <p className="text-gray-600 mb-2">
                  Select the Hard Skills that best represent you, so our system can calibrate your unique intelligence profile.
                </p>
                <p className="text-red-500 text-sm mb-4">*Maximum 5 skills allowed. Choose wisely, every skill defines your profile.</p>
              </div>
              
              <div className="flex items-center justify-start mb-4">
                <Dialog open={isHardskillDialogOpen} onOpenChange={setIsHardskillDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-aira-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-aira-secondary transition-colors">
                      Add Hard Skill
                    </button>
                  </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Pencarian Hardskill</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Matematika Diskrit"
                        value={hardskillSearch}
                        onChange={(e) => setHardskillSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredHardskills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border"
                        >
                          <span className="text-gray-800">{skill.name}</span>
                          <button
                            onClick={() => addHardskill(skill)}
                            disabled={selectedHardskills.find(s => s.id === skill.id) !== undefined || selectedHardskills.length >= 5}
                            className="p-1 bg-blue-200 rounded-full hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-blue-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

              {/* Selected Hardskills */}
              <div className="flex flex-wrap gap-3 mt-4">
                {selectedHardskills.map((skill) => (
                  <div key={skill.id} className="flex items-center bg-gray-100 border border-gray-300 px-4 py-2 rounded-full">
                    <span className="text-gray-800 mr-2">{skill.name}</span>
                    <button
                      onClick={() => removeHardskill(skill.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Side Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Now, let AIRA understand your <span className="font-bold">human side.</span>
                </h2>
                <p className="text-gray-600 mb-2">
                  Select the Soft Skills that best represent you, so our system can calibrate your unique intelligence profile.
                </p>
                <p className="text-red-500 text-sm mb-4">*Maximum 5 skills allowed. Choose wisely, every skill defines your profile.</p>
              </div>
              
              <div className="flex items-center justify-start mb-4">
                <Dialog open={isSoftskillDialogOpen} onOpenChange={setIsSoftskillDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-aira-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-aira-secondary transition-colors">
                      Add Soft Skill
                    </button>
                  </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Pencarian Softskill</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Matematika Diskrit"
                        value={softskillSearch}
                        onChange={(e) => setSoftskillSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B2635] focus:border-transparent"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredSoftskills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border"
                        >
                          <span className="text-gray-800">{skill.name}</span>
                          <button
                            onClick={() => addSoftskill(skill)}
                            disabled={selectedSoftskills.find(s => s.id === skill.id) !== undefined || selectedSoftskills.length >= 5}
                            className="p-1 bg-blue-200 rounded-full hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4 text-blue-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

              {/* Selected Softskills */}
              <div className="flex flex-wrap gap-3 mt-4">
                {selectedSoftskills.map((skill) => (
                  <div key={skill.id} className="flex items-center bg-gray-100 border border-gray-300 px-4 py-2 rounded-full">
                    <span className="text-gray-800 mr-2">{skill.name}</span>
                    <button
                      onClick={() => removeSoftskill(skill.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end mt-12">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className={`px-12 py-3 rounded-full font-semibold text-lg transition-colors ${
                  canGenerate && !isGenerating
                    ? 'bg-aira-primary text-white hover:bg-aira-secondary'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
