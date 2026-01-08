
import React from 'react';
import { LogOut, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: { name: string; email: string };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 no-print flex-shrink-0">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            N
          </div>
          <span className="text-xl font-bold text-gray-800">Nexus HR</span>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Top Header Mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 no-print">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              N
            </div>
            <span className="font-bold text-gray-800">Nexus HR</span>
          </div>
          <button onClick={onLogout} className="p-2 text-gray-500">
            <LogOut size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className={active ? 'text-indigo-600' : 'text-gray-400'}>{icon}</span>
    <span className="font-medium">{label}</span>
  </a>
);

export default Layout;
