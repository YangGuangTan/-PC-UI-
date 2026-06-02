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
  Ticket,
  Plus,
  QrCode,
  FileText,
  Trash2,
  Clock,
  X,
} from 'lucide-react'

// Mock claim records per coupon
const claimRecords: Record<string, Array<{
  userId: string
  nickname: string
  phone: string
  claimTime: string
}>> = {
  '2007719409884020737': [
    { userId: 'U100231', nickname: 'Sokha Chan', phone: '+855 12 345 678', claimTime: '2026-01-06 08:30:12' },
    { userId: 'U100445', nickname: 'Mony Rotha', phone: '+855 97 222 333', claimTime: '2026-01-08 15:42:37' },
    { userId: 'U100567', nickname: 'Dara Phan', phone: '+855 11 666 777', claimTime: '2026-01-10 11:18:45' },
  ],
  '1995680677882433537': [
    { userId: 'U100861', nickname: 'Hem Thavorak', phone: '+855 15 888 999', claimTime: '2025-12-03 09:15:22' },
  ],
  '1985324961506201601': [
    { userId: 'U100523', nickname: 'Vuthy Lay', phone: '+855 97 654 321', claimTime: '2025-11-05 14:22:08' },
    { userId: 'U100612', nickname: 'Chenda Sros', phone: '+855 12 111 222', claimTime: '2025-11-08 10:05:33' },
    { userId: 'U100734', nickname: 'Piseth Ngin', phone: '+855 69 333 444', claimTime: '2025-11-12 16:48:19' },
  ],
  '1953409070350970882': [
    { userId: 'U100891', nickname: 'Srey Pich', phone: '+855 10 555 666', claimTime: '2025-08-09 09:30:41' },
    { userId: 'U100922', nickname: 'Bopha Khut', phone: '+855 96 777 888', claimTime: '2025-08-12 14:12:55' },
  ],
  '1945408050878459906': [
    { userId: 'U100312', nickname: 'Ratanak Kim', phone: '+855 15 888 999', claimTime: '2025-07-18 11:40:55' },
  ],
  '1920050366511820802': [
    { userId: 'U100456', nickname: 'Sothea Yim', phone: '+855 92 444 555', claimTime: '2025-05-09 17:22:08' },
    { userId: 'U100789', nickname: 'Thy Mok', phone: '+855 17 666 777', claimTime: '2025-05-11 08:55:30' },
  ],
  '1912484970548146177': [
    { userId: 'U100198', nickname: 'Virak Oeun', phone: '+855 11 999 000', claimTime: '2025-04-18 20:10:05' },
    { userId: 'U100345', nickname: 'Sopheak Tep', phone: '+855 98 123 456', claimTime: '2025-04-22 13:35:48' },
    { userId: 'U100567', nickname: 'Nary Chea', phone: '+855 14 789 012', claimTime: '2025-04-25 09:18:22' },
  ],
}

// Mock coupon data matching the image
const couponData = [
  {
    id: '2007719409884020737',
    siteName: '123',
    discount: '30分钟',
    claimed: 3,
    total: 100,
    addTime: '2026-01-04 15:43:04',
  },
  {
    id: '1995680677882433537',
    siteName: '旺旺 港币网点',
    discount: '30分钟',
    claimed: 1,
    total: 1,
    addTime: '2025-12-02 10:25:26',
  },
  {
    id: '1985324961506201601',
    siteName: 'Tn Club',
    discount: '180分钟',
    claimed: 3,
    total: 10,
    addTime: '2025-11-03 20:35:31',
  },
  {
    id: '1953409070350970882',
    siteName: 'Room10F',
    discount: '60分钟',
    claimed: 2,
    total: 5,
    addTime: '2025-08-07 18:53:10',
  },
  {
    id: '1945408050878459906',
    siteName: '美元ym网点',
    discount: '30分钟',
    claimed: 1,
    total: 1,
    addTime: '2025-07-16 16:59:58',
  },
  {
    id: '1920050366511820802',
    siteName: 'Test',
    discount: '120分钟',
    claimed: 2,
    total: 2,
    addTime: '2025-05-07 17:37:35',
  },
  {
    id: '1912484970548146177',
    siteName: '温情自助旅店',
    discount: '180分钟',
    claimed: 3,
    total: 9999,
    addTime: '2025-04-16 20:35:24',
  },
]

export default function CouponsPage() {
  const [filters, setFilters] = useState({
    couponId: '',
    siteName: '',
  })
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof couponData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      couponId: '',
      siteName: '',
    })
  }

  const handleQrCode = (item: typeof couponData[0]) => {
    setSelectedItem(item)
    setQrDialogOpen(true)
  }

  const handleDetail = (item: typeof couponData[0]) => {
    setSelectedItem(item)
    setDetailDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">优惠券管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {couponData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">优惠券管理</span>
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
              {/* 优惠券编号 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">优惠券编号</Label>
                <Input
                  value={filters.couponId}
                  onChange={(e) => setFilters({ ...filters, couponId: e.target.value })}
                  placeholder="请输入优惠券编号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
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
                    <SelectItem value="123">123</SelectItem>
                    <SelectItem value="旺旺 港币网点">旺旺 港币网点</SelectItem>
                    <SelectItem value="Tn Club">Tn Club</SelectItem>
                    <SelectItem value="Room10F">Room10F</SelectItem>
                    <SelectItem value="美元ym网点">美元ym网点</SelectItem>
                    <SelectItem value="Test">Test</SelectItem>
                    <SelectItem value="温情自助旅店">温情自助旅店</SelectItem>
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
              <Ticket className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">优惠券列表</h3>
            </div>
            <Button
              onClick={() => setAddDialogOpen(true)}
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
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">优惠券编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">优惠金额/时长</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">领取数量</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">添加时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {couponData.map((item) => (
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[12px] font-semibold text-[#3B82F6] border border-blue-100">
                        {item.discount}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155]">
                        <span className="font-semibold text-[#3B82F6]">{item.claimed}</span>
                        <span className="text-[#94A3B8] mx-1">/</span>
                        <span>{item.total}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.addTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQrCode(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <QrCode className="w-3 h-3 mr-1" />
                          二维码
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDetail(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          领用详情
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
                共 <span className="text-[#334155] font-semibold">{couponData.length}</span> 条
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

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <QrCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">优惠券二维码</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">编号: {selectedItem?.id || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-8 flex flex-col items-center gap-5">
            {/* QR Code Placeholder */}
            <div className="w-[200px] h-[200px] rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-[#CBD5E1]" />
              <span className="text-[11px] text-[#94A3B8] mt-2">扫码领取优惠券</span>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[14px] font-semibold text-[#111827]">{selectedItem?.siteName}</p>
              <p className="text-[13px] text-[#3B82F6] font-medium">{selectedItem?.discount}</p>
              <p className="text-[12px] text-[#94A3B8]">已领取 {selectedItem?.claimed} / {selectedItem?.total}</p>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setQrDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              关闭
            </Button>
            <Button
              onClick={() => setQrDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              下载二维码
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Claim Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">领用详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">优惠券编号: {selectedItem?.id || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6">
            {/* Coupon Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">网点名称</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedItem?.siteName}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">优惠金额/时长</p>
                <p className="text-[13px] font-semibold text-[#3B82F6]">{selectedItem?.discount}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">领取情况</p>
                <p className="text-[13px] font-semibold text-[#111827]">
                  <span className="text-[#3B82F6]">{selectedItem?.claimed}</span>
                  <span className="text-[#94A3B8]"> / {selectedItem?.total}</span>
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">添加时间</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedItem?.addTime}</p>
              </div>
            </div>

            {/* Claim Records */}
            <h4 className="text-[13px] font-semibold text-[#111827] mb-3">领用记录</h4>
            {selectedItem && claimRecords[selectedItem.id] && claimRecords[selectedItem.id].length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">用户ID</TableHead>
                    <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">用户昵称</TableHead>
                    <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">手机号</TableHead>
                    <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">领取时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimRecords[selectedItem.id].map((record) => (
                    <TableRow key={record.userId} className="border-b border-[#F1F5F9]">
                      <TableCell className="py-3">
                        <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{record.userId}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-[9px] font-semibold shrink-0">
                            {record.nickname.charAt(0)}
                          </div>
                          <span className="text-[12px] text-[#334155] font-medium">{record.nickname}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="text-[12px] text-[#64748B]">{record.phone}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          <span className="text-[12px] text-[#64748B]">{record.claimTime}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-[#94A3B8]">
                <FileText className="w-10 h-10 mb-2 text-[#CBD5E1]" />
                <p className="text-[13px]">暂无领用记录</p>
              </div>
            )}
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDetailDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Coupon Dialog */}
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
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增优惠券</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">添加新的优惠券配置</p>
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
                  <SelectItem value="123">123</SelectItem>
                  <SelectItem value="旺旺 港币网点">旺旺 港币网点</SelectItem>
                  <SelectItem value="Tn Club">Tn Club</SelectItem>
                  <SelectItem value="Room10F">Room10F</SelectItem>
                  <SelectItem value="美元ym网点">美元ym网点</SelectItem>
                  <SelectItem value="Test">Test</SelectItem>
                  <SelectItem value="温情自助旅店">温情自助旅店</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 优惠金额/时长 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">优惠金额/时长</Label>
              <Select>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue placeholder="请选择优惠类型" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="30分钟">30分钟</SelectItem>
                  <SelectItem value="60分钟">60分钟</SelectItem>
                  <SelectItem value="120分钟">120分钟</SelectItem>
                  <SelectItem value="180分钟">180分钟</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 发放数量 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">发放数量</Label>
              <Input
                type="number"
                placeholder="请输入发放数量"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
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
