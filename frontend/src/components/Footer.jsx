import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-notion-white border-t border-notion-border py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[18px] font-bold mb-4 tracking-tight">MangaQyn</h3>
            <p className="text-notion-gray500 text-[14px] leading-relaxed max-w-sm">
              Trải nghiệm đọc truyện tinh tế, tối giản và tập trung. Chúng tôi xây dựng không gian cho những người yêu thích sự ngăn nắp và chất lượng.
            </p>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-notion-gray300 uppercase tracking-widest mb-4">Khám phá</h4>
            <ul className="space-y-2 text-[14px] text-notion-gray500">
              <li><a href="#" className="hover:text-notion-blue">Truyện mới</a></li>
              <li><a href="#" className="hover:text-notion-blue">Xếp hạng</a></li>
              <li><a href="#" className="hover:text-notion-blue">Bộ sưu tập</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold text-notion-gray300 uppercase tracking-widest mb-4">Cộng đồng</h4>
            <ul className="space-y-2 text-[14px] text-notion-gray500">
              <li><a href="#" className="hover:text-notion-blue">Discord</a></li>
              <li><a href="#" className="hover:text-notion-blue">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-notion-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-notion-gray300">© 2026 MangaQyn. Built for readers.</p>
          <div className="flex gap-6 text-[12px] text-notion-gray300">
            <a href="#" className="hover:underline">Điều khoản</a>
            <a href="#" className="hover:underline">Quyền riêng tư</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;