'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import {
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronRight,
  Image as ImageIcon,
  X,
  Plus,
  Pencil,
  Trash2,
  Clock,
  Eye,
  EyeOff,
  Hash,
  Upload,
} from 'lucide-react'

// Mock banner data
const bannerData = [
  {
    id: '1202621302356185088',
    siteName: 'echo',
    images: [
      'https://placehold.co/80x80/3B82F6/FFFFFF?text=Banner1',
      'https://placehold.co/80x80/60A5FA/FFFFFF?text=Banner2',
      'https://placehold.co/80x80/818CF8/FFFFFF?text=App',
    ],
    isShow: true,
    uploadTime: '2024-02-01 14:27:42',
    updateTime: '2024-02-01 14:27:42',
  },
  {
    id: '1200405561196285952',
    siteName: 'asd大晚上',
    images: [
      'https://placehold.co/80x80/1F2937/FFFFFF?text=QR',
    ],
    isShow: true,
    uploadTime: '2024-01-26 11:43:08',
    updateTime: '2024-01-26 11:43:08',
  },
  {
    id: '1198374562196285441',
    siteName: 'Belyna Spa',
    images: [
      'https://placehold.co/80x80/10B981/FFFFFF?text=Ad1',
      'https://placehold.co/80x80/34D399/FFFFFF?text=Ad2',
    ],
    isShow: false,
    uploadTime: '2024-01-20 09:15:30',
    updateTime: '2024-01-21 16:30:00',
  },
  {
    id: '1196253780096283329',
    siteName: '震電闪闪',
    images: [
      'https://placehold.co/80x80/F59E0B/FFFFFF?text=Promo',
    ],
    isShow: true,
    uploadTime: '2024-01-15 18:42:10',
    updateTime: '2024-01-16 08:20:45',
  },
  {
    id: '1194132997996281217',
    siteName: '快捷便利店',
    images: [
      'https://placehold.co/80x80/8B5CF6/FFFFFF?text=Sale',
      'https://placehold.co/80x80/A78BFA/FFFFFF?text=Hot',
    ],
    isShow: false,
    uploadTime: '2024-01-10 12:05:55',
    updateTime: '2024-01-12 14:10:20',
  },
]

export default function BannersPage() {
  const [filters, setFilters] = useState({
    isShow: '',
    siteName: '',
  })
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof bannerData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      isShow: '',
      siteName: '',
    })
  }

  const handleEdit = (item: typeof bannerData[0]) => {
    setSelectedItem(item)
    setEditDialogOpen(true)
  }

  const handleAdd = () => {
    setAddDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">轮播图管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {bannerData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">轮播图管理</span>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Filter Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">筛选条件</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-3 text-[12px] text-[#64748B] hover:text-[#3B82F6] rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              清空筛选
            </Button>
          </div>

          {/* Filter Fields */}
          <div className="p-6">
            <div className="flex items-end gap-4 flex-wrap">
              {/* 是否展示 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">是否展示</Label>
                <Select
                  value={filters.isShow}
                  onValueChange={(value) => setFilters({ ...filters, isShow: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="是否展示" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="展示">展示</SelectItem>
                    <SelectItem value="不展示">不展示</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 网点名称 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
                <Select
                  value={filters.siteName}
                  onValueChange={(value) => setFilters({ ...filters, siteName: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点名称" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="echo">echo</SelectItem>
                    <SelectItem value="asd大晚上">asd大晚上</SelectItem>
                    <SelectItem value="Belyna Spa">Belyna Spa</SelectItem>
                    <SelectItem value="震電闪闪">震電闪闪</SelectItem>
                    <SelectItem value="快捷便利店">快捷便利店</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
                >
                  <Search className="w-4 h-4 mr-2" />
                  搜索
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重置
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">轮播图列表</h3>
            </div>
            <Button
              onClick={handleAdd}
              className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              新增
            </Button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">图片</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">是否展示</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">上传时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">更新时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bannerData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#334155] font-medium">{item.siteName}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        {item.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-12 h-12 rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] shadow-sm"
                          >
                            <img
                              src={img}
                              alt={`Banner ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        <span className="text-[11px] text-[#94A3B8] ml-1">({item.images.length})</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.isShow
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : 'bg-gray-50 text-[#64748B] border border-gray-200'
                      }`}>
                        {item.isShow ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {item.isShow ? '展示' : '不展示'}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.uploadTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.updateTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          编辑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2.5 text-[11px] border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          删除
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#94A3B8]">
                共 <span className="text-[#334155] font-semibold">{bannerData.length}</span> 条
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-8 px-3 text-[12px] border-[#E2E8F0] text-[#CBD5E1] rounded-lg shadow-none font-medium"
              >
                上一页
              </Button>
              <Button
                size="sm"
                className="h-8 w-8 p-0 text-[12px] bg-gradient-to-b from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-lg shadow-sm shadow-blue-200/50 font-semibold"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-8 px-3 text-[12px] border-[#E2E8F0] text-[#CBD5E1] rounded-lg shadow-none font-medium"
              >
                下一页
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">编辑轮播图</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">ID: {selectedItem?.id || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            {/* 网点名称 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
              <Input
                defaultValue={selectedItem?.siteName || ''}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>

            {/* 是否展示 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">是否展示</Label>
              <Select defaultValue={selectedItem?.isShow ? '展示' : '不展示'}>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="展示">展示</SelectItem>
                  <SelectItem value="不展示">不展示</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 图片上传 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">轮播图片</Label>
              <div className="grid grid-cols-3 gap-3">
                {selectedItem?.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-square rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] group"
                  >
                    <img
                      src={img}
                      alt={`Banner ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-white hover:bg-white/20 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {/* Upload placeholder */}
                <div className="w-full aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  <Upload className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  <span className="text-[10px] text-[#94A3B8] group-hover:text-[#3B82F6] mt-1 transition-colors">上传图片</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增轮播图</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">添加新的轮播图配置</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            {/* 网点名称 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
              <Select>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue placeholder="请选择网点名称" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="echo">echo</SelectItem>
                  <SelectItem value="asd大晚上">asd大晚上</SelectItem>
                  <SelectItem value="Belyna Spa">Belyna Spa</SelectItem>
                  <SelectItem value="震電闪闪">震電闪闪</SelectItem>
                  <SelectItem value="快捷便利店">快捷便利店</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 是否展示 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">是否展示</Label>
              <Select defaultValue="展示">
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="展示">展示</SelectItem>
                  <SelectItem value="不展示">不展示</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 图片上传 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">轮播图片</Label>
              <div className="grid grid-cols-3 gap-3">
                <div className="w-full aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  <Upload className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  <span className="text-[10px] text-[#94A3B8] group-hover:text-[#3B82F6] mt-1 transition-colors">上传图片</span>
                </div>
                <div className="w-full aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  <Upload className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  <span className="text-[10px] text-[#94A3B8] group-hover:text-[#3B82F6] mt-1 transition-colors">上传图片</span>
                </div>
                <div className="w-full aspect-square rounded-xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  <Upload className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
                  <span className="text-[10px] text-[#94A3B8] group-hover:text-[#3B82F6] mt-1 transition-colors">上传图片</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
