'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Clock,
  X,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Hash,
  Building2,
  Monitor,
  CalendarDays,
  User,
  Eye,
  XCircle,
  Hourglass,
  Users,
  FileText,
} from 'lucide-react'

// Mock work order data
const workOrderData = [
  {
    id: 1,
    orderNo: 'BF80Z31026000002',
    deviceSerial: 'BF80Z31026000002',
    siteName: 'Belyna Spa and salon 310',
    faultType: '机柜',
    faultDescription: '机柜无法开机，电源指示灯不亮',
    agent: '深圳星链科技',
    status: '已处理',
    createTime: '2026-05-23 22:30:00',
    processTime: '2026-05-27 14:53:29',
    processor: '张锐',
  },
  {
    id: 2,
    orderNo: 'BF80Z31026000008',
    deviceSerial: 'BF80Z31026000008',
    siteName: 'Dr.EB',
    faultType: '机柜',
    faultDescription: '机柜显示屏异常，触控无响应',
    agent: '广州充动互联',
    status: '已处理',
    createTime: '2026-05-23 18:30:01',
    processTime: '2026-05-27 14:53:29',
    processor: '旺旺',
  },
  {
    id: 3,
    orderNo: 'BF80ZB2825000001',
    deviceSerial: 'BF80ZB2825000001',
    siteName: '震電闪闪',
    faultType: '机柜',
    faultDescription: '机柜风扇异响，散热异常',
    agent: '上海闪充网络',
    status: '待处理',
    createTime: '2026-05-22 12:30:00',
    processTime: '',
    processor: '',
  },
  {
    id: 4,
    orderNo: 'BF80Z31026000015',
    deviceSerial: 'BF80Z31026000015',
    siteName: 'Toni',
    faultType: '充电宝',
    faultDescription: '充电宝无法归还，卡槽卡住',
    agent: '北京能量站科技',
    status: '待处理',
    createTime: '2026-05-21 09:15:30',
    processTime: '',
    processor: '',
  },
  {
    id: 5,
    orderNo: '01624BF00A000003',
    deviceSerial: '01624BF00A000003',
    siteName: '快捷便利店',
    faultType: '网络',
    faultDescription: '设备离线，网络模块无法连接',
    agent: '深圳星链科技',
    status: '已处理',
    createTime: '2026-05-19 16:45:22',
    processTime: '2026-05-20 10:20:15',
    processor: '张锐',
  },
  {
    id: 6,
    orderNo: 'BF80Z31026000022',
    deviceSerial: 'BF80Z31026000022',
    siteName: '海景度假酒店',
    faultType: '充电宝',
    faultDescription: '充电宝充不进电，指示灯闪烁',
    agent: '广州充动互联',
    status: '已处理',
    createTime: '2026-05-18 14:22:10',
    processTime: '2026-05-19 09:30:45',
    processor: '旺旺',
  },
  {
    id: 7,
    orderNo: 'BF80ZB2825000008',
    deviceSerial: 'BF80ZB2825000008',
    siteName: '星光KTV',
    faultType: '机柜',
    faultDescription: '机柜门锁损坏，无法正常关闭',
    agent: '上海闪充网络',
    status: '待处理',
    createTime: '2026-05-17 20:10:05',
    processTime: '',
    processor: '',
  },
  {
    id: 8,
    orderNo: '01624BF00A000010',
    deviceSerial: '01624BF00A000010',
    siteName: 'Inspirer Area',
    faultType: '网络',
    faultDescription: '4G信号弱，频繁掉线断连',
    agent: '北京能量站科技',
    status: '已处理',
    createTime: '2026-05-15 11:05:33',
    processTime: '2026-05-16 08:45:20',
    processor: '张锐',
  },
  {
    id: 9,
    orderNo: 'BF80Z31026000030',
    deviceSerial: 'BF80Z31026000030',
    siteName: '蓝色海岸咖啡厅',
    faultType: '机柜',
    faultDescription: '机柜主板故障，设备无响应',
    agent: '深圳星链科技',
    status: '已撤销',
    createTime: '2026-05-14 08:20:00',
    processTime: '2026-05-15 10:00:00',
    processor: '旺旺',
  },
  {
    id: 10,
    orderNo: '01624BF00A000018',
    deviceSerial: '01624BF00A000018',
    siteName: '阳光健身中心',
    faultType: '充电宝',
    faultDescription: '充电宝外壳破损，存在安全隐患',
    agent: '广州充动互联',
    status: '已撤销',
    createTime: '2026-05-12 15:30:45',
    processTime: '2026-05-13 09:10:30',
    processor: '张锐',
  },
]

export default function WorkOrdersPage() {
  const [filters, setFilters] = useState({
    faultType: '',
    siteName: '',
    status: '',
    startDate: '',
    endDate: '',
  })
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [processDialogOpen, setProcessDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof workOrderData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      faultType: '',
      siteName: '',
      status: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleViewDetail = (item: typeof workOrderData[0]) => {
    setSelectedOrder(item)
    setDetailDialogOpen(true)
  }

  const handleProcess = (item: typeof workOrderData[0]) => {
    setSelectedOrder(item)
    setProcessDialogOpen(true)
  }

  const processedCount = workOrderData.filter(d => d.status === '已处理').length
  const pendingCount = workOrderData.filter(d => d.status === '待处理').length
  const cancelledCount = workOrderData.filter(d => d.status === '已撤销').length

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">工单管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {workOrderData.length} 条记录
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              {processedCount} 已处理
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[12px] font-medium text-[#F59E0B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
              {pendingCount} 待处理
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
          <span className="text-[#3B82F6] font-medium">工单管理</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {/* 待处理 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden relative group hover:shadow-[0_4px_16px_rgba(245,158,11,0.12)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309]"></div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#92400E]/70 font-medium mb-1">待处理</p>
                <p className="text-[32px] font-bold text-[#92400E] tracking-tight leading-none">{pendingCount}</p>
                <p className="text-[11px] text-[#D97706] mt-2 font-medium">等待处理中</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50 group-hover:scale-110 transition-transform duration-300">
                <Hourglass className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* 已处理 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden relative group hover:shadow-[0_4px_16px_rgba(16,185,129,0.12)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#065F46]/70 font-medium mb-1">已处理</p>
                <p className="text-[32px] font-bold text-[#065F46] tracking-tight leading-none">{processedCount}</p>
                <p className="text-[11px] text-[#059669] mt-2 font-medium">处理已完成</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* 已撤销 */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden relative group hover:shadow-[0_4px_16px_rgba(239,68,68,0.12)] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EF4444] via-[#DC2626] to-[#B91C1C]"></div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#991B1B]/70 font-medium mb-1">已撤销</p>
                <p className="text-[32px] font-bold text-[#991B1B] tracking-tight leading-none">{cancelledCount}</p>
                <p className="text-[11px] text-[#DC2626] mt-2 font-medium">工单已撤销</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-200/50 group-hover:scale-110 transition-transform duration-300">
                <XCircle className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
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
              {/* 故障类型 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">故障类型</Label>
                <Select
                  value={filters.faultType}
                  onValueChange={(value) => setFilters({ ...filters, faultType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="机柜">机柜</SelectItem>
                    <SelectItem value="充电宝">充电宝</SelectItem>
                    <SelectItem value="网络">网络</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 网点名称 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
                <Select
                  value={filters.siteName}
                  onValueChange={(value) => setFilters({ ...filters, siteName: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点名称" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Belyna Spa and salon 310">Belyna Spa and salon 310</SelectItem>
                    <SelectItem value="Dr.EB">Dr.EB</SelectItem>
                    <SelectItem value="Toni">Toni</SelectItem>
                    <SelectItem value="震電闪闪">震電闪闪</SelectItem>
                    <SelectItem value="快捷便利店">快捷便利店</SelectItem>
                    <SelectItem value="海景度假酒店">海景度假酒店</SelectItem>
                    <SelectItem value="星光KTV">星光KTV</SelectItem>
                    <SelectItem value="Inspirer Area">Inspirer Area</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 状态 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">状态</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="已处理">已处理</SelectItem>
                    <SelectItem value="待处理">待处理</SelectItem>
                    <SelectItem value="已撤销">已撤销</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 开始时间 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">开始日期</Label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 结束时间 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">结束日期</Label>
                <Input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
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
              <Wrench className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">工单列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {workOrderData.length}
              </Badge>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-14">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备序列号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">故障类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">处理时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">处理人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workOrderData.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-3.5">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#3B82F6] font-mono tracking-tight font-medium hover:text-[#2563EB] cursor-pointer">{item.orderNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] font-mono tracking-tight">{item.deviceSerial}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.siteName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.faultType === '机柜'
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                          : item.faultType === '充电宝'
                            ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                            : 'bg-purple-50 text-[#7C3AED] border border-purple-100'
                      }`}>
                        {item.faultType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.status === '已处理'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : item.status === '已撤销'
                            ? 'bg-red-50 text-[#DC2626] border border-red-100'
                            : 'bg-amber-50 text-[#D97706] border border-amber-100'
                      }`}>
                        {item.status === '已处理' ? <CheckCircle2 className="w-3 h-3" /> : item.status === '已撤销' ? <XCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      {item.processTime ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          <span className="text-[12px] text-[#64748B]">{item.processTime}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#CBD5E1]">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5">
                      {item.processor ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                            {item.processor.charAt(0)}
                          </div>
                          <span className="text-[13px] text-[#334155] font-medium">{item.processor}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#CBD5E1]">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          详情
                        </Button>
                        {item.status === '待处理' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleProcess(item)}
                            className="h-7 px-2.5 text-[11px] border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981] hover:text-white hover:border-[#10B981] rounded-lg font-semibold transition-all duration-200 shadow-none"
                          >
                            <Wrench className="w-3 h-3 mr-1" />
                            处理
                          </Button>
                        )}
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
                共 <span className="text-[#334155] font-semibold">{workOrderData.length}</span> 条记录
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

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[620px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">工单详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedOrder?.orderNo || ''}</p>
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
            {/* 基本信息 */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
                <Hash className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">基本信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">订单编号</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.orderNo || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Monitor className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">设备序列号</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.deviceSerial || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点名称</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedOrder?.siteName || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">故障类型</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  selectedOrder?.faultType === '机柜'
                    ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                    : selectedOrder?.faultType === '充电宝'
                      ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                      : 'bg-purple-50 text-[#7C3AED] border border-purple-100'
                }`}>
                  {selectedOrder?.faultType || '-'}
                </span>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">所属代理</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedOrder?.agent || '-'}</p>
              </div>
            </div>

            {/* 故障描述 - Full width */}
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 mb-6">
              <div className="flex items-center gap-1.5 mb-2">
                <FileText className="w-3 h-3 text-[#94A3B8]" />
                <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">故障描述</span>
              </div>
              <p className="text-[13px] text-[#1E293B] leading-relaxed">{selectedOrder?.faultDescription || '-'}</p>
            </div>

            {/* 处理信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">处理信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">状态</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  selectedOrder?.status === '已处理'
                    ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                    : selectedOrder?.status === '已撤销'
                      ? 'bg-red-50 text-[#DC2626] border border-red-100'
                      : 'bg-amber-50 text-[#D97706] border border-amber-100'
                }`}>
                  {selectedOrder?.status === '已处理' ? <CheckCircle2 className="w-3 h-3" /> : selectedOrder?.status === '已撤销' ? <XCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {selectedOrder?.status || '-'}
                </span>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">处理人</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedOrder?.processor || <span className="text-[#CBD5E1]">暂无</span>}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CalendarDays className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">创建时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.createTime || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">处理时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.processTime || <span className="text-[#CBD5E1]">暂无</span>}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Dialog */}
      <Dialog open={processDialogOpen} onOpenChange={setProcessDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">处理工单</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedOrder?.orderNo || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-6 space-y-5">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100/60">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-[#D97706]" />
                <span className="text-[13px] font-semibold text-[#92400E]">工单信息</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <span className="text-[#92400E]/70">设备序列号：</span>
                  <span className="text-[#92400E] font-medium font-mono">{selectedOrder?.deviceSerial}</span>
                </div>
                <div>
                  <span className="text-[#92400E]/70">网点名称：</span>
                  <span className="text-[#92400E] font-medium">{selectedOrder?.siteName}</span>
                </div>
                <div>
                  <span className="text-[#92400E]/70">故障类型：</span>
                  <span className="text-[#92400E] font-medium">{selectedOrder?.faultType}</span>
                </div>
                <div>
                  <span className="text-[#92400E]/70">创建时间：</span>
                  <span className="text-[#92400E] font-medium">{selectedOrder?.createTime}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100/60">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#DC2626]" />
                <span className="text-[13px] font-semibold text-[#991B1B]">故障描述</span>
              </div>
              <p className="text-[13px] text-[#7F1D1D] leading-relaxed">{selectedOrder?.faultDescription || '暂无故障描述'}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">处理备注</Label>
              <textarea
                className="w-full h-24 text-[13px] border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-xl transition-all duration-200 p-3 resize-none placeholder:text-[#CBD5E1]"
                placeholder="请输入处理备注..."
              />
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setProcessDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setProcessDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300/50"
            >
              确认处理
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
