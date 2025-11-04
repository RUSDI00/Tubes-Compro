import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const academicData = [
    { tingkat: "I", sks: 38, status: "Lulus tanggal 22/08/2023", ips: "3.60" },
    { tingkat: "II", sks: 20, status: "Belum Lulus", ips: "3.70" },
    { tingkat: "III", sks: 15, status: "Belum Lulus", ips: "3.65" },
    { tingkat: "IV", sks: 11, status: "Belum Lulus", ips: "3.75" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Sidebar Toggle */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-aira-primary to-aira-secondary py-6 px-4 md:px-8 relative overflow-hidden shadow-lg">
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
            Dashboard
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
            <button className="w-full text-left py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
              Profile
            </button>
            <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium">
              Simulasi IPK
            </button>
            <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/20 transition-colors font-medium">
              Integrasi Minat
            </button>
            <div className="flex-1"></div>
            <button 
              onClick={() => navigate("/")}
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

        {/* Main Dashboard Content */}
        <main className="flex-1 px-4 md:px-8 py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden">
                  <img
                    src="/assets/images/profile-photo.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-black">John Doe</h2>
                <p className="text-sm text-gray-600 underline">
                  JohnDoe@student.telkomuniversity.ac.id
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value="Salma Safira Ramandha"
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Email SSO */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email SSO
                  </label>
                  <input
                    type="email"
                    value="salmasafira@student.telkomuniversity.ac.id"
                    readOnly
                    className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                  />
                </div>

                {/* NIM and Major */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIM
                    </label>
                    <input
                      type="text"
                      value="1301223383"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Major
                    </label>
                    <input
                      type="text"
                      value="S1 Informatika"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>

                {/* Student Year and Faculty */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Year
                    </label>
                    <input
                      type="text"
                      value="2022"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty
                    </label>
                    <input
                      type="text"
                      value="Informatika"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>

                {/* SKS Total and IPK */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKS Total
                    </label>
                    <input
                      type="text"
                      value="84"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IPK
                    </label>
                    <input
                      type="text"
                      value="3.50"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>

                {/* Academic Status Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Academic Status
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-gray-50 rounded-lg">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Tingkat
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            SKS
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            IPS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {academicData.map((row, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.tingkat}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.sks}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.status}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {row.ips}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* TAK and IKK */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TAK
                    </label>
                    <input
                      type="text"
                      value="60"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IKK
                    </label>
                    <input
                      type="text"
                      value="3.00"
                      readOnly
                      className="w-full px-6 py-4 rounded-[20px] border border-gray-300 bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
