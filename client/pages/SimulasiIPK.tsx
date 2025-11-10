import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Home, ChevronRight, Plus } from "lucide-react";
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
  const [editingCourse, setEditingCourse] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    mataKuliah: "",
    sks: "",
    tingkat: "",
    prediksi: "A",
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
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEditCourse = (course: {
    id: number;
    mataKuliah: string;
    sks: number;
    tingkat: string;
    prediksi: string;
  }) => {
    setEditingCourse(course.id);
    setFormData({
      mataKuliah: course.mataKuliah,
      sks: course.sks.toString(),
      tingkat: course.tingkat,
      prediksi: course.prediksi,
    });
    setIsDialogOpen(true);
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setFormData({
      mataKuliah: "",
      sks: "",
      tingkat: "",
      prediksi: "A",
    });
    setIsDialogOpen(true);
  };

  const handleSaveCourse = () => {
    if (!formData.mataKuliah || !formData.sks || !formData.tingkat) {
      return;
    }

    if (editingCourse) {
      // Update existing course
      setCourses(
        courses.map((course) =>
          course.id === editingCourse
            ? {
                ...course,
                mataKuliah: formData.mataKuliah,
                sks: parseInt(formData.sks),
                tingkat: formData.tingkat,
                prediksi: formData.prediksi,
              }
            : course
        )
      );
    } else {
      // Add new course
      const newId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
      setCourses([
        ...courses,
        {
          id: newId,
          mataKuliah: formData.mataKuliah,
          sks: parseInt(formData.sks),
          tingkat: formData.tingkat,
          prediksi: formData.prediksi,
        },
      ]);
    }
    setIsDialogOpen(false);
    setFormData({
      mataKuliah: "",
      sks: "",
      tingkat: "",
      prediksi: "A",
    });
  };

  const handleUpdatePrediksi = (id: number, newPrediksi: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, prediksi: newPrediksi } : course
      )
    );
  };

  const totalSKS = courses.reduce((sum, course) => sum + course.sks, 0);

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

                {/* Generate Button */}
                <div className="flex-1 md:flex-none">
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedSemester || !selectedStudyPlan}
                    className="w-full md:w-auto px-8 py-3 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-[20px] transition-colors"
                  >
                    Generate
                  </button>
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
              <div className="mt-4 flex justify-between items-center">
                {courses.length > 0 && (
                  <p className="text-sm font-medium text-gray-700">
                    Total SKS: {totalSKS}
                  </p>
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
        </main>
      </div>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Edit Mata Kuliah" : "Add Mata Kuliah"}
            </DialogTitle>
            <DialogDescription>
              {editingCourse
                ? "Update informasi mata kuliah"
                : "Tambahkan mata kuliah baru ke daftar"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">
                Mata Kuliah*
              </label>
              <input
                type="text"
                value={formData.mataKuliah}
                onChange={(e) =>
                  setFormData({ ...formData, mataKuliah: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
                placeholder="Masukkan nama mata kuliah"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">SKS*</label>
                <input
                  type="number"
                  value={formData.sks}
                  onChange={(e) =>
                    setFormData({ ...formData, sks: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
                  placeholder="SKS"
                  min="1"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Tingkat*
                </label>
                <select
                  value={formData.tingkat}
                  onChange={(e) =>
                    setFormData({ ...formData, tingkat: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
                >
                  <option value="">Pilih Tingkat</option>
                  {tingkatOptions.map((tingkat) => (
                    <option key={tingkat} value={tingkat}>
                      {tingkat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">
                Prediksi
              </label>
              <select
                value={formData.prediksi}
                onChange={(e) =>
                  setFormData({ ...formData, prediksi: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aira-primary"
              >
                {prediksiOptions.map((prediksi) => (
                  <option key={prediksi} value={prediksi}>
                    {prediksi}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCourse}
              disabled={
                !formData.mataKuliah || !formData.sks || !formData.tingkat
              }
              className="px-4 py-2 bg-aira-primary hover:bg-aira-secondary disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {editingCourse ? "Update" : "Add"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}

