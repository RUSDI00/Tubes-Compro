import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Home, ChevronRight, Plus, Search, Trash2, Download, ArrowLeft, LogOut } from "lucide-react";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SimulasiIPK() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedStudyPlan, setSelectedStudyPlan] = useState("");
  const [courses, setCourses] = useState<
    Array<{
      id: number;
      mataKuliah: string;
      sks: number;
      tingkat: string;
      prediksi: string;
    }>
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [editingCourse, setEditingCourse] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTingkat, setFilterTingkat] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock data untuk daftar mata kuliah yang tersedia
  const availableCourses = [
    { id: 1, nama: "Matematika Diskrit", tingkat: "II", sks: 3 },
    { id: 2, nama: "Matematika Diskrit", tingkat: "I", sks: 4 },
    { id: 3, nama: "Algoritma dan Struktur Data", tingkat: "II", sks: 4 },
    { id: 4, nama: "Basis Data", tingkat: "II", sks: 3 },
    { id: 5, nama: "Pemrograman Web", tingkat: "III", sks: 3 },
    { id: 6, nama: "Sistem Operasi", tingkat: "III", sks: 3 },
    { id: 7, nama: "Jaringan Komputer", tingkat: "III", sks: 3 },
    { id: 8, nama: "Kalkulus", tingkat: "I", sks: 4 },
    { id: 9, nama: "Fisika Dasar", tingkat: "I", sks: 3 },
    { id: 10, nama: "Pemrograman Berorientasi Objek", tingkat: "II", sks: 4 },
  ];

  // Filter courses berdasarkan search dan tingkat
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch = course.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTingkat = !filterTingkat || course.tingkat === filterTingkat;
    return matchesSearch && matchesTingkat;
  });

  const semesterOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const studyPlanOptions = ["Reguler", "Fast Track", "MBKM"];

  const prediksiOptions = ["A", "AB", "B", "C", "D", "E"];

  const tingkatOptions = ["I", "II", "III", "IV"];

  const handleGenerate = () => {
    // Mock data for demonstration
    if (selectedSemester && selectedStudyPlan) {
      setCourses([
        {
          id: 1,
          mataKuliah: "Matematika Diskret",
          sks: 2,
          tingkat: "II",
          prediksi: "A",
        },
        {
          id: 2,
          mataKuliah: "Matematika Diskret",
          sks: 3,
          tingkat: "II",
          prediksi: "B",
        },
        {
          id: 3,
          mataKuliah: "Matematika Diskret",
          sks: 3,
          tingkat: "II",
          prediksi: "AB",
        },
        {
          id: 4,
          mataKuliah: "Matematika Diskret",
          sks: 3,
          tingkat: "II",
          prediksi: "E",
        },
      ]);
      setIsGenerated(true);
    }
  };

  const handleSubmit = () => {
    setIsLoadingDialogOpen(true);
    // Simulate loading process
    setTimeout(() => {
      setIsLoadingDialogOpen(false);
      setIsSubmitted(true);
    }, 3000); // 3 seconds loading
  };

  // Convert prediksi to numeric value
  const getNilaiFromPrediksi = (prediksi: string): number => {
    const nilaiMap: { [key: string]: number } = {
      A: 4.0,
      AB: 3.5,
      B: 3.0,
      C: 2.0,
      D: 1.0,
      E: 0.0,
    };
    return nilaiMap[prediksi] || 0;
  };

  // Calculate IPS (Indeks Prestasi Semester)
  const calculateIPS = (): number => {
    if (courses.length === 0) return 0;
    let totalNilai = 0;
    let totalSKS = 0;
    courses.forEach((course) => {
      const nilai = getNilaiFromPrediksi(course.prediksi);
      totalNilai += nilai * course.sks;
      totalSKS += course.sks;
    });
    return totalSKS > 0 ? totalNilai / totalSKS : 0;
  };

  // Calculate IPK (Indeks Prestasi Kumulatif) - Mock data
  const calculateIPK = (): number => {
    // For now, return a mock value. In real app, this would be calculated from all semesters
    return 3.68;
  };

  // Mock total SKS selesai (completed credits)
  const totalSKSSelesai = 120;

  const handleDeleteCourse = (id: number) => {
    setCourseToDelete(id);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete));
      setIsDeleteConfirmationOpen(false);
      setIsDeleteSuccessOpen(true);
      setCourseToDelete(null);
    }
  };

  const handleEditCourse = (course: {
    id: number;
    mataKuliah: string;
    sks: number;
    tingkat: string;
    prediksi: string;
  }) => {
    setEditingCourse(course.id);
    setIsConfirmationDialogOpen(true);
  };

  const handleUpdateCourseFromList = (course: {
    id: number;
    nama: string;
    tingkat: string;
    sks: number;
  }) => {
    if (editingCourse) {
      // Update existing course
      setCourses(
        courses.map((c) =>
          c.id === editingCourse
            ? {
                ...c,
                mataKuliah: course.nama,
                sks: course.sks,
                tingkat: course.tingkat,
              }
            : c
        )
      );
      setIsDialogOpen(false);
      setEditingCourse(null);
      setSearchQuery("");
      setFilterTingkat("");
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setSearchQuery("");
    setFilterTingkat("");
    setIsDialogOpen(true);
  };

  const handleAddCourseFromList = (course: {
    id: number;
    nama: string;
    tingkat: string;
    sks: number;
  }) => {
    const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([
      ...courses,
      {
        id: newId,
        mataKuliah: course.nama,
        sks: course.sks,
        tingkat: course.tingkat,
        prediksi: "A",
      },
    ]);
  };


  const handleUpdatePrediksi = (id: number, newPrediksi: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, prediksi: newPrediksi } : course
      )
    );
  };

  const totalSKS = courses.reduce((sum, course) => sum + course.sks, 0);
  const ips = calculateIPS();
  const ipk = calculateIPK();

  // Result Page (after submit)
  if (isSubmitted) {
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
            </div>
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
              Simulasi IPK
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
              <button className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
                Simulasi IPK
              </button>
              <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium">
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
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Breadcrumbs with Download PDF Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Link
                    to="/dashboard"
                    className="hover:text-aira-primary transition-colors flex items-center gap-1"
                  >
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-900 font-medium">Simulasi IPK</span>
                </div>
                <button
                  onClick={() => {
                    // Handle PDF download
                    window.print();
                  }}
                  className="px-4 py-2 bg-aira-primary hover:bg-aira-secondary text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download pdf
                </button>
              </div>

              {/* Summary Boxes */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* IPS Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IPS
                  </label>
                  <input
                    type="text"
                    value={ips.toFixed(2)}
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700 text-lg font-medium"
                  />
                </div>

                {/* IPK Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IPK
                  </label>
                  <input
                    type="text"
                    value={ipk.toFixed(2)}
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700 text-lg font-medium"
                  />
                </div>

                {/* Total SKS Semester Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total SKS Semester
                  </label>
                  <input
                    type="text"
                    value={totalSKS}
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700 text-lg font-medium"
                  />
                </div>

                {/* Total SKS Selesai Box */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total SKS Selesai
                  </label>
                  <input
                    type="text"
                    value={totalSKSSelesai}
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700 text-lg font-medium"
                  />
                </div>
              </div>

              {/* Academic Status Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Academic Status
                </h3>
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Mata Kuliah
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            SKS
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Tingkat
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Prediksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-4 py-8 text-center text-gray-500 bg-white"
                            >
                              No courses available
                            </td>
                          </tr>
                        ) : (
                          courses.map((course, index) => (
                            <tr
                              key={course.id}
                              className={`${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {course.mataKuliah}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {course.sks}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {course.tingkat || ""}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700">
                                {course.prediksi || ""}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>made by</span>
                  <img
                    src="/assets/images/logo-aira-footer.png"
                    alt="AIRA"
                    className="w-6 h-6"
                  />
                </div>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="px-6 py-2 bg-aira-primary hover:bg-aira-secondary text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  End session
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Form Page (before submit)
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
            Simulasi IPK
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
            <button className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
              Simulasi IPK
            </button>
            <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium">
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
          <div className="max-w-7xl mx-auto space-y-6">
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
              <span className="text-gray-900 font-medium">Simulasi IPK</span>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-end">
                {/* Semester Dropdown */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester*
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-[20px] border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-aira-primary focus:border-transparent cursor-pointer"
                    >
                      <option value="" disabled>
                        Choose your semester prediction
                      </option>
                      {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Study Plan Dropdown */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Study Plan*
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStudyPlan}
                      onChange={(e) => setSelectedStudyPlan(e.target.value)}
                      className="w-full px-4 py-3 pr-10 rounded-[20px] border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-aira-primary focus:border-transparent cursor-pointer"
                    >
                      <option value="" disabled>
                        Choose your study plan
                      </option>
                      {studyPlanOptions.map((plan) => (
                        <option key={plan} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Generate/Submit Button */}
                <div className="flex-1 md:flex-none">
                  {!isGenerated ? (
                    <button
                      onClick={handleGenerate}
                      disabled={!selectedSemester || !selectedStudyPlan}
                      className="w-full md:w-auto px-8 py-3 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-[20px] transition-colors"
                    >
                      Generate
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="w-full md:w-auto px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-[20px] transition-colors"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Mata Kuliah
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        SKS
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Tingkat
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Prediksi
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          No courses available. Please select semester and study
                          plan, then click Generate.
                        </td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr
                          key={course.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.mataKuliah}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.sks}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.tingkat}
                          </td>
                          <td className="px-4 py-3">
                            <div className="relative inline-block">
                              <select
                                value={course.prediksi}
                                onChange={(e) =>
                                  handleUpdatePrediksi(course.id, e.target.value)
                                }
                                className="pl-3 pr-8 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-aira-primary focus:border-transparent cursor-pointer text-sm min-w-[70px]"
                              >
                                {prediksiOptions.map((prediksi) => (
                                  <option key={prediksi} value={prediksi}>
                                    {prediksi}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditCourse(course)}
                                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-bold text-sm rounded-lg transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm rounded-lg transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  {courses.length > 0 && (
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-700">
                        Total SKS: {totalSKS}
                      </p>
                      {totalSKS > 24 && (
                        <p className="text-sm font-medium text-red-600 mt-1">
                          ⚠️ Warning: Total SKS melebihi 24 SKS
                        </p>
                      )}
                    </div>
                  )}
                  {courses.length === 0 && <div />}
                  <button
                    onClick={handleAddCourse}
                    className="px-6 py-2 bg-aira-primary hover:bg-aira-secondary text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Mata Kuliah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Course Dialog - Search & Select */}
      {!editingCourse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Tambah Mata Kuliah
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Filter/Search Section */}
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tingkat
                  </label>
                  <div className="relative">
                    <select
                      value={filterTingkat}
                      onChange={(e) => setFilterTingkat(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-aira-primary focus:border-transparent cursor-pointer"
                    >
                      <option value="">Semua Tingkat</option>
                      {tingkatOptions.map((tingkat) => (
                        <option key={tingkat} value={tingkat}>
                          Tingkat {tingkat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cari Mata Kuliah
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
                      placeholder="Masukkan nama mata kuliah"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Search className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Course List Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Nama Mata Kuliah
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Tingkat
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        SKS
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Add
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Tidak ada mata kuliah yang ditemukan
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course, index) => (
                        <tr
                          key={course.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-blue-50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.nama}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.tingkat}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.sks}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                handleAddCourseFromList(course);
                                setIsDialogOpen(false);
                                setSearchQuery("");
                                setFilterTingkat("");
                              }}
                              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-5 h-5 text-white" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Course Dialog - Search & Select */}
      {editingCourse && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Edit Mata Kuliah
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Filter/Search Section */}
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tingkat
                  </label>
                  <div className="relative">
                    <select
                      value={filterTingkat}
                      onChange={(e) => setFilterTingkat(e.target.value)}
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-aira-primary focus:border-transparent cursor-pointer"
                    >
                      <option value="">Semua Tingkat</option>
                      {tingkatOptions.map((tingkat) => (
                        <option key={tingkat} value={tingkat}>
                          Tingkat {tingkat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cari Mata Kuliah
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
                      placeholder="Masukkan nama mata kuliah"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Search className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Course List Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Nama Mata Kuliah
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Tingkat
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        SKS
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        Add
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Tidak ada mata kuliah yang ditemukan
                        </td>
                      </tr>
                    ) : (
                      filteredCourses.map((course, index) => (
                        <tr
                          key={course.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-blue-50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.nama}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.tingkat}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {course.sks}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                handleUpdateCourseFromList(course);
                              }}
                              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-5 h-5 text-white" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmationOpen}
        onOpenChange={setIsDeleteConfirmationOpen}
      >
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <div className="relative bg-white rounded-lg text-center">
            {/* Trash Icon */}
            <div className="flex justify-center items-center pt-8 pb-4">
              <Trash2 className="w-20 h-20 text-aira-primary" />
            </div>
            {/* Question Text */}
            <div className="px-6 pb-2">
              <DialogTitle className="text-xl font-bold text-gray-800">
                Delete Mata Kuliah?
              </DialogTitle>
            </div>
            {/* Subtitle */}
            <div className="px-6 pb-6">
              <DialogDescription className="text-sm text-gray-600">
                You can always add it back later on.
              </DialogDescription>
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => {
                  setIsDeleteConfirmationOpen(false);
                  setCourseToDelete(null);
                }}
                className="px-8 py-2 bg-aira-primary hover:bg-aira-secondary text-white font-medium rounded-lg transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmDeleteCourse}
                className="px-8 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <div className="relative bg-white rounded-lg text-center">
            {/* Illustration */}
            <div className="flex justify-center items-center pt-8 pb-4">
              <img
                src="/assets/images/edit-ilustration.png"
                alt="Confirmation"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            {/* Question Text */}
            <div className="px-6 pb-6">
              <DialogTitle className="text-xl font-bold text-gray-800">
                Edit Mata Kuliah ?
              </DialogTitle>
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-4 px-6 pb-6">
              <button
                onClick={() => setIsConfirmationDialogOpen(false)}
                className="px-8 py-2 bg-aira-primary hover:bg-aira-secondary text-white font-medium rounded-lg transition-colors"
              >
                No
              </button>
              <button
                onClick={() => {
                  setIsConfirmationDialogOpen(false);
                  setSearchQuery("");
                  setFilterTingkat("");
                  setIsDialogOpen(true);
                }}
                className="px-8 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Success Dialog */}
      <Dialog
        open={isDeleteSuccessOpen}
        onOpenChange={setIsDeleteSuccessOpen}
      >
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <div className="relative bg-white rounded-lg text-center">
            {/* Trash Icon */}
            <div className="flex justify-center items-center pt-8 pb-4">
              <Trash2 className="w-20 h-20 text-aira-primary" />
            </div>
            {/* Success Message */}
            <div className="px-6 pb-2">
              <DialogTitle className="text-xl font-bold text-gray-800">
                Mata Kuliah successfully deleted
              </DialogTitle>
            </div>
            {/* Subtitle */}
            <div className="px-6 pb-6">
              <DialogDescription className="text-sm text-gray-600">
                The selected mata kuliah has been removed from the system. This
                action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading Dialog */}
      <Dialog 
        open={isLoadingDialogOpen} 
        onOpenChange={() => {
          // Prevent closing during loading - do nothing
        }}
      >
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 [&>button]:hidden">
          <div className="relative bg-white rounded-lg">
            {/* Illustration */}
            <div className="flex justify-center items-center pt-8 pb-4">
              <img
                src="/assets/images/generate-ilustration.png"
                alt="Generating Study Plan"
                className="w-full max-w-md h-auto"
              />
            </div>
            {/* Loading Text */}
            <div className="px-6 pb-8 text-center">
              <p className="text-lg font-medium text-gray-700">
                Generating Your Study Plan.....
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}

