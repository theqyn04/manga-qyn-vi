import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

const AuthPage = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authService.login({ email: formData.email, password: formData.password });
      } else {
        await authService.signup(formData);
      }
      window.location.href = '/'; // Chuyển hướng khi thành công
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-notion-black text-white mb-6 shadow-notion">
            <span className="text-xl font-bold italic">Q</span>
          </div>
          <h1 className="text-[40px] font-bold leading-tight tracking-notion-tight text-notion-warm-dark mb-3">
            {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
          </h1>
          <p className="text-notion-gray-500 text-lg tracking-notion-card">
            {isLogin ? 'Tiếp tục hành trình đọc truyện.' : 'Tham gia cộng đồng Manga QYN.'}
          </p>
        </header>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-notion-gray-300 uppercase ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-notion-gray-300 group-focus-within:text-notion-blue transition-colors" />
                <input 
                  required
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="qyn_manga_fan"
                  className="w-full pl-10 pr-4 py-2.5 bg-notion-warm-white border border-notion-border rounded-lg outline-none focus:ring-2 focus:ring-notion-blue/20 focus:border-notion-blue transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[12px] font-semibold text-notion-gray-300 uppercase ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-notion-gray-300 group-focus-within:text-notion-blue transition-colors" />
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="nhan@qyn.com"
                className="w-full pl-10 pr-4 py-2.5 bg-notion-warm-white border border-notion-border rounded-lg outline-none focus:ring-2 focus:ring-notion-blue/20 focus:border-notion-blue transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[12px] font-semibold text-notion-gray-300 uppercase">Mật khẩu</label>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-notion-gray-300 group-focus-within:text-notion-blue transition-colors" />
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-notion-warm-white border border-notion-border rounded-lg outline-none focus:ring-2 focus:ring-notion-blue/20 focus:border-notion-blue transition-all"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full mt-4 bg-notion-blue hover:bg-notion-blue-active text-white font-semibold py-3 rounded-lg shadow-notion transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <footer className="mt-8 pt-8 border-t border-notion-border text-center">
          <p className="text-notion-gray-500 text-sm">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản rồi?'}
            <a href={isLogin ? '/signup' : '/login'} className="ml-2 text-notion-blue font-semibold hover:underline">
              {isLogin ? 'Đăng ký miễn phí' : 'Đăng nhập ngay'}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthPage;