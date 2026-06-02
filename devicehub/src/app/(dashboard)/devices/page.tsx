'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  Wifi,
  WifiOff,
  BatteryCharging,
  ChevronRight,
  Plus,
  Download,
  RefreshCw,
  MapPin,
  Clock,
  Activity,
  HardDrive,
  MoreHorizontal,
  X,
  QrCode,
  Signal,
  ArrowUpCircle,
} from 'lucide-react'

// Mock device data
const deviceData = [
  {
    id: 1,
    deviceCode: '1',
    screenCode: 'BF80Z31026000008',
    hasScreen: false,
    status: '离线',
    deviceType: '超级快充机柜',
    rentalInfo: { totalSlots: 8, available: 8, returnable: 0 },
    owner: 'Hem Thavorak',
    siteName: 'Dr.EB',
    lastOnlineTime: '2026-05-22 13:23:57',
  },
  {
    id: 2,
    deviceCode: '2',
    screenCode: 'BF80Z31026000002',
    hasScreen: false,
    status: '在线',
    deviceType: '超级快充机柜',
    rentalInfo: { totalSlots: 8, available: 8, returnable: 0 },
    owner: 'Hem Thavorak',
    siteName: 'Belyna Spa and salon 310',
    lastOnlineTime: '2026-05-28 11:39:42',
  },
  {
    id: 3,
    deviceCode: '3',
    screenCode: 'BF80Z31026000001',
    hasScreen: false,
    status: '离线',
    deviceType: '超级快充机柜',
    rentalInfo: { totalSlots: 8, available: 0, returnable: 8 },
    owner: 'yatchung',
    siteName: 'Inspirer Area',
    lastOnlineTime: '2026-03-28 16:58:13',
  },
  {
    id: 4,
    deviceCode: '4',
    screenCode: 'BF80Z30926000001',
    hasScreen: false,
    status: '离线',
    deviceType: '超级快充机柜',
    rentalInfo: { totalSlots: 8, available: 0, returnable: 8 },
    owner: '加州',
    siteName: 'WTZ Poker Room',
    lastOnlineTime: '2026-05-18 09:12:30',
  },
]

// Stats data
const statsCards = [
  {
    title: '设备总数',
    value: '128',
    change: '+12',
    changeType: 'increase' as const,
    icon: HardDrive,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#3B82F6]',
    trend: '较上月',
  },
  {
    title: '在线设备',
    value: '96',
    change: '+8',
    changeType: 'increase' as const,
    icon: Wifi,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#10B981]',
    trend: '较上月',
  },
  {
    title: '离线设备',
    value: '32',
    change: '+4',
    changeType: 'increase' as const,
    icon: WifiOff,
    iconBg: 'bg-red-50',
    iconColor: 'text-[#EF4444]',
    trend: '较上月',
  },
  {
    title: '活跃网点',
    value: '45',
    change: '+3',
    changeType: 'increase' as const,
    icon: MapPin,
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#F59E0B]',
    trend: '较上月',
  },
]

export default function DevicesPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [detailDevice, setDetailDevice] = useState<typeof deviceData[0] | null>(null)
  const [selectedDevice, setSelectedDevice] = useState<typeof deviceData[0] | null>(null)
  const [changeSiteForm, setChangeSiteForm] = useState({
    deviceCode: '',
    siteName: '',
  })
  const [filters, setFilters] = useState({
    deviceCode: '',
    siteId: '',
    siteName: '',
    agentId: '',
    agentName: '',
    agentPhone: '',
    deviceType: '',
    deviceStatus: '',
    screenCode: '',
    hasScreen: '',
  })

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === deviceData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(deviceData.map(d => d.id))
    }
  }

  const handleReset = () => {
    setFilters({
      deviceCode: '',
      siteId: '',
      siteName: '',
      agentId: '',
      agentName: '',
      agentPhone: '',
      deviceType: '',
      deviceStatus: '',
      screenCode: '',
      hasScreen: '',
    })
  }

  const onlineCount = deviceData.filter(d => d.status === '在线').length
  const offlineCount = deviceData.filter(d => d.status === '离线').length

  const handleOpenChangeSiteDialog = (device: typeof deviceData[0]) => {
    setSelectedDevice(device)
    setChangeSiteForm({
      deviceCode: device.screenCode,
      siteName: '',
    })
    setDialogOpen(true)
  }

  const handleChangeSiteConfirm = () => {
    setDialogOpen(false)
  }

  const handleOpenDetailDialog = (device: typeof deviceData[0]) => {
    setDetailDevice(device)
    setDetailDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">设备管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {deviceData.length} 条记录
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              {onlineCount} 在线
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-[12px] font-medium text-[#EF4444]">
              {offlineCount} 离线
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
          <span className="text-[#3B82F6] font-medium">设备管理</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {statsCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-[#64748B] mb-1">{card.title}</p>
                    <p className="text-[28px] font-bold text-[#111827] tracking-tight leading-tight">{card.value}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#F1F5F9]">
                  <span className={`inline-flex items-center text-[12px] font-semibold ${
                    card.changeType === 'increase' ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}>
                    {card.changeType === 'increase' ? '↑' : '↓'} {card.change}
                  </span>
                  <span className="text-[12px] text-[#94A3B8]">{card.trend}</span>
                </div>
              </div>
            )
          })}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4">
              {/* Device Code */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium flex items-center gap-1">
                  设备编号
                </Label>
                <Input
                  placeholder="请输入设备编号"
                  value={filters.deviceCode}
                  onChange={(e) => setFilters({ ...filters, deviceCode: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Site ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点ID</Label>
                <Input
                  placeholder="请输入网点ID"
                  value={filters.siteId}
                  onChange={(e) => setFilters({ ...filters, siteId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Site Name */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
                <Input
                  placeholder="请输入网点名称"
                  value={filters.siteName}
                  onChange={(e) => setFilters({ ...filters, siteName: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Agent ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商ID</Label>
                <Input
                  placeholder="请输入代理商ID"
                  value={filters.agentId}
                  onChange={(e) => setFilters({ ...filters, agentId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Agent Name */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商名称</Label>
                <Input
                  placeholder="请输入代理商名称"
                  value={filters.agentName}
                  onChange={(e) => setFilters({ ...filters, agentName: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Agent Phone */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商电话</Label>
                <Input
                  placeholder="请输入代理商电话"
                  value={filters.agentPhone}
                  onChange={(e) => setFilters({ ...filters, agentPhone: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Device Type */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备类型</Label>
                <Select
                  value={filters.deviceType}
                  onValueChange={(value) => setFilters({ ...filters, deviceType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择设备类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="超级快充机柜">超级快充机柜</SelectItem>
                    <SelectItem value="普通充电机柜">普通充电机柜</SelectItem>
                    <SelectItem value="小型充电站">小型充电站</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Device Status */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备状态</Label>
                <Select
                  value={filters.deviceStatus}
                  onValueChange={(value) => setFilters({ ...filters, deviceStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择设备状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="在线">在线</SelectItem>
                    <SelectItem value="离线">离线</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Screen Code */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">屏幕机编号</Label>
                <Input
                  placeholder="请输入屏幕机编号"
                  value={filters.screenCode}
                  onChange={(e) => setFilters({ ...filters, screenCode: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Has Screen */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">是否包含屏幕</Label>
                <Select
                  value={filters.hasScreen}
                  onValueChange={(value) => setFilters({ ...filters, hasScreen: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
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

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">设备列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {deviceData.length}
              </Badge>
              {selectedRows.length > 0 && (
                <Badge className="text-[11px] font-semibold bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#EFF6FF] rounded-md px-2 border-0">
                  已选 {selectedRows.length} 项
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-[12px] border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] rounded-lg font-medium"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                导出
              </Button>
              <Button
                size="sm"
                className="h-8 px-3 text-[12px] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-lg font-semibold shadow-sm shadow-blue-200/50"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                添加设备
              </Button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={selectedRows.length === deviceData.length && deviceData.length > 0}
                      onCheckedChange={toggleAll}
                      className="border-[#CBD5E1] data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                    />
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">屏幕机编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">包含屏幕</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">租借信息</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">所属人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">最后上线时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceData.map((device, idx) => (
                  <TableRow
                    key={device.id}
                    className={`border-b border-[#F1F5F9] transition-all duration-200 ${
                      selectedRows.includes(device.id)
                        ? 'bg-[#EFF6FF]/70 hover:bg-[#EFF6FF]'
                        : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <TableCell className="text-center py-4">
                      <Checkbox
                        checked={selectedRows.includes(device.id)}
                        onCheckedChange={() => toggleRow(device.id)}
                        className="border-[#CBD5E1] data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#F1F5F9] text-[13px] font-bold text-[#334155]">
                        {device.deviceCode}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2 py-1 rounded-md">
                        {device.screenCode}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[12px] font-medium ${
                        device.hasScreen
                          ? 'bg-blue-50 text-[#3B82F6]'
                          : 'bg-gray-50 text-[#94A3B8]'
                      }`}>
                        {device.hasScreen ? '是' : '否'}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full ${
                        device.status === '在线'
                          ? 'bg-emerald-50 text-[#059669]'
                          : 'bg-red-50 text-[#DC2626]'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          device.status === '在线'
                            ? 'bg-[#10B981] animate-pulse shadow-sm shadow-emerald-300'
                            : 'bg-[#EF4444]'
                        }`}></span>
                        {device.status === '在线' ? (
                          <Wifi className="w-3.5 h-3.5" />
                        ) : (
                          <WifiOff className="w-3.5 h-3.5" />
                        )}
                        {device.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                          <BatteryCharging className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{device.deviceType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="space-y-1.5 min-w-[140px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#94A3B8]">插口总数</span>
                          <span className="text-[12px] text-[#334155] font-semibold">{device.rentalInfo.totalSlots}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-500"
                            style={{ width: `${(device.rentalInfo.totalSlots - device.rentalInfo.available) / device.rentalInfo.totalSlots * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#10B981] font-medium">可用 {device.rentalInfo.available}</span>
                          <span className="text-[11px] text-[#F59E0B] font-medium">可还 {device.rentalInfo.returnable}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {device.owner.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{device.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#334155]">{device.siteName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#64748B]">{device.lastOnlineTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenChangeSiteDialog(device)}
                          className="h-8 px-3 text-[12px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          更换网点
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-2.5 text-[12px] border-[#E2E8F0] text-[#64748B] hover:border-[#64748B] hover:text-[#334155] rounded-lg font-medium transition-all duration-200 shadow-none"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl shadow-lg border-[#E2E8F0] min-w-[140px]">
                            <DropdownMenuItem
                              className="text-[13px] rounded-lg cursor-pointer"
                              onClick={() => handleOpenDetailDialog(device)}
                            >设备详情</DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] rounded-lg cursor-pointer">查看详情</DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] rounded-lg cursor-pointer text-[#EF4444] focus:text-[#EF4444]">删除设备</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                共 <span className="text-[#334155] font-semibold">{deviceData.length}</span> 条记录
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

      {/* Change Site Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
          <DialogHeader className="px-6 py-5 border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[16px] font-bold text-[#111827] tracking-tight">更换网点</DialogTitle>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-6 py-6 space-y-5">
            <div className="space-y-2.5">
              <Label className="text-[13px] text-[#334155] font-semibold flex items-center gap-1">
                设备编号
                <span className="text-[#EF4444] text-[14px]">*</span>
              </Label>
              <Input
                value={changeSiteForm.deviceCode}
                onChange={(e) => setChangeSiteForm({ ...changeSiteForm, deviceCode: e.target.value })}
                className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-xl transition-all duration-200 font-mono tracking-tight"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-[13px] text-[#334155] font-semibold flex items-center gap-1">
                网点名称
                <span className="text-[#EF4444] text-[14px]">*</span>
              </Label>
              <Select
                value={changeSiteForm.siteName}
                onValueChange={(value) => setChangeSiteForm({ ...changeSiteForm, siteName: value })}
              >
                <SelectTrigger className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-xl transition-all duration-200">
                  <SelectValue placeholder="请选择网点名称" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Dr.EB">Dr.EB</SelectItem>
                  <SelectItem value="Belyna Spa and salon 310">Belyna Spa and salon 310</SelectItem>
                  <SelectItem value="Inspirer Area">Inspirer Area</SelectItem>
                  <SelectItem value="WTZ Poker Room">WTZ Poker Room</SelectItem>
                  <SelectItem value="Central Mall Station">Central Mall Station</SelectItem>
                  <SelectItem value="Airport Terminal B">Airport Terminal B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
            <div className="flex items-center justify-end gap-3 w-full">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-white text-[13px] font-medium rounded-xl transition-all duration-200 shadow-none"
                >
                  取消
                </Button>
              </DialogClose>
              <Button
                onClick={handleChangeSiteConfirm}
                disabled={!changeSiteForm.siteName}
                className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] disabled:from-[#94A3B8] disabled:to-[#94A3B8] disabled:opacity-60 text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
              >
                确定
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Device Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[860px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
          <DialogHeader className="px-6 py-5 border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[16px] font-bold text-[#111827] tracking-tight">设备详情</DialogTitle>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="flex">
            <div className="w-[220px] shrink-0 border-r border-[#F1F5F9] p-6 flex flex-col items-center justify-start">
              <div className="w-[140px] h-[140px] bg-white border-2 border-[#E2E8F0] rounded-xl flex items-center justify-center shadow-sm">
                <QrCode className="w-24 h-24 text-[#334155]" strokeWidth={1} />
              </div>
              <p className="text-[12px] text-[#94A3B8] font-medium mt-3">设备二维码</p>

              <div className="flex flex-col gap-2.5 mt-6 w-full">
                <Button
                  className="h-9 w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
                >
                  <ArrowUpCircle className="w-4 h-4 mr-2" />
                  弹出所有
                </Button>
                <Button
                  className="h-9 w-full bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 min-w-0">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">部署时间</span>
                  </div>
                  <p className="text-[13px] text-[#334155] font-semibold font-mono">{detailDevice?.lastOnlineTime || '-'}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">设备ID</span>
                  </div>
                  <p className="text-[13px] text-[#334155] font-semibold font-mono">{detailDevice?.screenCode || '-'}</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Signal className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">流量卡号</span>
                  </div>
                  <p className="text-[13px] text-[#334155] font-semibold font-mono">89855082000726134788</p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#F1F5F9]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Wifi className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">信号强度</span>
                  </div>
                  <p className="text-[13px] text-[#334155] font-semibold">22</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">仓位</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">电量</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">温度</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">电流</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">充电宝ID</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">锁定</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider text-center h-9">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                            <BatteryCharging className="w-5 h-5 text-[#CBD5E1]" />
                          </div>
                          <span className="text-[13px] text-[#94A3B8] font-medium">暂无数据</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
