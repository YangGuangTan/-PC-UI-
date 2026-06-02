'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  RefreshCw,
  ChevronRight,
  Megaphone,
  Clock,
  ImageOff,
  X,
  Upload,
  Pencil,
  Eye,
} from 'lucide-react'

// Mock ad data
const adsData = [
  {
    id: 1,
    homeAd: true,
    rentalBannerAd: true,
    rentalInterstitialAd: false,  // no image (load failed)
    storeDetailAd: true,
    rentalCompleteAd: true,
    createTime: '2024-07-16 12:12:14',
  },
]

// Ad slot labels
const adSlots = [
  { key: 'homeAd', label: '首页广告', gradient: 'from-blue-400 to-blue-600', text: '首页\n广告图' },
  { key: 'rentalBannerAd', label: '租借页横幅广告', gradient: 'from-indigo-400 to-indigo-600', text: 'Experience the\nPower of Speed' },
  { key: 'rentalInterstitialAd', label: '租借页插屏广告', gradient: '', text: '' },
  { key: 'storeDetailAd', label: '店铺详情页广告', gradient: 'from-cyan-400 to-blue-500', text: '店铺详情\n广告图' },
  { key: 'rentalCompleteAd', label: '租借完成页广告', gradient: 'from-violet-400 to-purple-600', text: '租借完成\n广告图' },
]

export default function AdsPage() {
  const [modalType, setModalType] = useState<'edit' | 'view' | null>(null)

  const currentAd = adsData[0]

  const closeModal = () => setModalType(null)

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">广告管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {adsData.length} 条记录
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 relative group">
            <RefreshCw className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#3B82F6] group-hover:rotate-180 transition-all duration-500" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 relative group">
            <Bell className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#3B82F6] transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-white animate-pulse"></span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 group">
            <Globe className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#3B82F6] transition-colors" />
            <span className="text-[13px] text-[#64748B] group-hover:text-[#334155] transition-colors">中文</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>
          <div className="w-px h-7 bg-[#E2E8F0] mx-1"></div>
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-[12px] font-semibold shadow-md shadow-blue-100">
              A
            </div>
            <span className="text-[13px] font-medium text-[#334155]">Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-6 text-[13px]">
          <LayoutDashboard className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#94A3B8]">Dashboard</span>
          <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
          <span className="text-[#3B82F6] font-medium">广告管理</span>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <Megaphone className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">广告列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">首页广告</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">租借页横幅广告</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">租借页插屏广告</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">店铺详情页广告</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">租借完成页广告</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adsData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-4 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    {/* 首页广告 */}
                    <TableCell className="py-4">
                      <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-[10px] font-medium text-center leading-tight px-2">首页<br/>广告图</span>
                      </div>
                    </TableCell>
                    {/* 租借页横幅广告 */}
                    <TableCell className="py-4">
                      <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                        <span className="text-white text-[10px] font-medium text-center leading-tight px-2">Experience the<br/>Power of Speed</span>
                      </div>
                    </TableCell>
                    {/* 租借页插屏广告 - 加载失败 */}
                    <TableCell className="py-4">
                      <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9] flex flex-col items-center justify-center">
                        <ImageOff className="w-5 h-5 text-[#CBD5E1] mb-1" />
                        <span className="text-[10px] text-[#CBD5E1]">加载失败</span>
                      </div>
                    </TableCell>
                    {/* 店铺详情页广告 */}
                    <TableCell className="py-4">
                      <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-medium text-center leading-tight px-2">店铺详情<br/>广告图</span>
                      </div>
                    </TableCell>
                    {/* 租借完成页广告 */}
                    <TableCell className="py-4">
                      <div className="w-[120px] h-[68px] rounded-lg overflow-hidden border border-[#E2E8F0] bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-[10px] font-medium text-center leading-tight px-2">租借完成<br/>广告图</span>
                      </div>
                    </TableCell>
                    {/* 创建时间 */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
                      </div>
                    </TableCell>
                    {/* 操作 */}
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setModalType('edit')}
                          className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                        >
                          <Pencil className="w-3 h-3" />
                          编辑
                        </button>
                        <button
                          onClick={() => setModalType('view')}
                          className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                        >
                          <Eye className="w-3 h-3" />
                          查看
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ========== 编辑弹窗 ========== */}
      {modalType === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[720px] max-h-[85vh] overflow-hidden"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/50">
                  <Pencil className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">编辑广告</h3>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">修改各广告位的图片素材</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group"
              >
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div className="grid grid-cols-2 gap-5">
                {adSlots.map((slot) => {
                  const hasAd = currentAd[slot.key as keyof typeof currentAd]
                  return (
                    <div key={slot.key} className="space-y-2.5">
                      <label className="text-[13px] font-semibold text-[#334155]">{slot.label}</label>
                      <div className={`w-full h-[140px] rounded-xl border-2 border-dashed overflow-hidden transition-all duration-200 ${
                        hasAd
                          ? 'border-[#E2E8F0] hover:border-[#3B82F6]'
                          : 'border-[#E2E8F0] hover:border-[#3B82F6] bg-[#FAFBFC]'
                      }`}>
                        {hasAd ? (
                          <div className={`w-full h-full bg-gradient-to-br ${slot.gradient} flex items-center justify-center relative group`}>
                            <span className="text-white text-[13px] font-medium text-center leading-tight px-3 whitespace-pre-line">{slot.text}</span>
                            {/* Hover overlay for replace */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-1">
                                <Upload className="w-6 h-6 text-white" />
                                <span className="text-[11px] text-white font-medium">点击替换</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#F1F5F9] transition-colors">
                            <Upload className="w-7 h-7 text-[#CBD5E1]" />
                            <span className="text-[12px] text-[#94A3B8]">点击上传图片</span>
                            <span className="text-[10px] text-[#CBD5E1]">支持 JPG、PNG 格式</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                取消
              </Button>
              <Button
                onClick={closeModal}
                className="h-10 px-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
              >
                保存修改
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 查看弹窗 ========== */}
      {modalType === 'view' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[720px] max-h-[85vh] overflow-hidden"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-md shadow-emerald-200/50">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">查看广告</h3>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">查看各广告位的图片详情</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group"
              >
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[65vh] custom-scrollbar">
              {/* Info row */}
              <div className="flex items-center gap-6 mb-5 pb-4 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#94A3B8]">编号</span>
                  <span className="text-[13px] text-[#334155] font-semibold">1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#94A3B8]">创建时间</span>
                  <span className="text-[13px] text-[#334155]">{currentAd.createTime}</span>
                </div>
              </div>

              {/* Ad images grid */}
              <div className="grid grid-cols-2 gap-5">
                {adSlots.map((slot) => {
                  const hasAd = currentAd[slot.key as keyof typeof currentAd]
                  return (
                    <div key={slot.key} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[13px] font-semibold text-[#334155]">{slot.label}</label>
                        {hasAd ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#059669] border border-emerald-100">
                            已配置
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-[#DC2626] border border-red-100">
                            未配置
                          </span>
                        )}
                      </div>
                      <div className={`w-full h-[140px] rounded-xl overflow-hidden border border-[#E2E8F0] ${
                        hasAd ? '' : 'bg-[#FAFBFC]'
                      }`}>
                        {hasAd ? (
                          <div className={`w-full h-full bg-gradient-to-br ${slot.gradient} flex items-center justify-center`}>
                            <span className="text-white text-[13px] font-medium text-center leading-tight px-3 whitespace-pre-line">{slot.text}</span>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <ImageOff className="w-7 h-7 text-[#CBD5E1]" />
                            <span className="text-[12px] text-[#CBD5E1]">暂无图片</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
              <Button
                onClick={closeModal}
                className="h-10 px-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal animation */}
      <style jsx global>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}
