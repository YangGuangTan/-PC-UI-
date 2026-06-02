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
  BatteryMedium,
  BatteryCharging,
  Zap,
  Clock,
  User,
  X,
  Hash,
  CalendarDays,
  History,
  Wifi,
  ArrowRightLeft,
} from 'lucide-react'

// Mock power bank data (based on screenshot)
const powerBankData = [
  {
    id: 1,
    batteryCode: 'bfa311260011',
    deviceCode: 'BF80Z31026000002',
    agent: 'Hem Thavorak',
    firstStorageTime: '2026-05-19 21:39:50',
    lastChangeTime: '2026-05-28 11:40:19',
    status: '充电中',
    firstRentTime: '2026-05-20 10:15:30',
    rentCount: 12,
    lastRentTime: '2026-05-27 18:22:05',
  },
  {
    id: 2,
    batteryCode: 'bfcc88660301',
    deviceCode: '02824BF00A000070',
    agent: '旺旺一级代理(美元)',
    firstStorageTime: '2026-05-06 15:03:40',
    lastChangeTime: '2026-05-28 11:40:19',
    status: '充电中',
    firstRentTime: '',
    rentCount: 0,
    lastRentTime: '',
  },
  {
    id: 3,
    batteryCode: 'bfa311260055',
    deviceCode: 'BF80Z31026000002',
    agent: 'Hem Thavorak',
    firstStorageTime: '2026-05-19 21:39:50',
    lastChangeTime: '2026-05-28 11:40:19',
    status: '充电中',
    firstRentTime: '2026-05-21 14:30:00',
    rentCount: 8,
    lastRentTime: '2026-05-26 09:45:12',
  },
  {
    id: 4,
    batteryCode: 'bfa311260003',
    deviceCode: 'BF80Z31026000002',
    agent: 'Hem Thavorak',
    firstStorageTime: '2026-04-29 19:50:44',
    lastChangeTime: '2026-05-28 11:40:18',
    status: '充电中',
    firstRentTime: '2026-04-30 08:20:15',
    rentCount: 23,
    lastRentTime: '2026-05-25 20:10:33',
  },
  {
    id: 5,
    batteryCode: 'bfa406250580',
    deviceCode: '01624BF00A000003',
    agent: 'dc_cml',
    firstStorageTime: '2025-06-24 22:50:19',
    lastChangeTime: '2026-05-28 11:30:21',
    status: '充电中',
    firstRentTime: '2025-06-25 11:00:00',
    rentCount: 156,
    lastRentTime: '2026-05-28 10:05:18',
  },
  {
    id: 6,
    batteryCode: 'bfa406250577',
    deviceCode: '01624BF00A000003',
    agent: 'dc_cml',
    firstStorageTime: '2025-06-24 22:43:56',
    lastChangeTime: '2026-05-28 11:30:21',
    status: '可借',
    firstRentTime: '2025-06-26 09:15:22',
    rentCount: 98,
    lastRentTime: '2026-05-27 16:30:45',
  },
  {
    id: 7,
    batteryCode: 'bfa406250523',
    deviceCode: '01624BF00A000003',
    agent: 'dc_cml',
    firstStorageTime: '2025-06-24 22:43:56',
    lastChangeTime: '2026-05-28 11:30:21',
    status: '异常',
    firstRentTime: '2025-07-01 13:22:10',
    rentCount: 45,
    lastRentTime: '2026-05-20 07:55:30',
  },
  {
    id: 8,
    batteryCode: 'bfa406250684',
    deviceCode: '01624BF00A000003',
    agent: 'dc_cml',
    firstStorageTime: '2025-06-24 23:15:37',
    lastChangeTime: '2026-05-28 11:30:21',
    status: '离线',
    firstRentTime: '',
    rentCount: 0,
    lastRentTime: '',
  },
]

export default function PowerBankPage() {
  const [filters, setFilters] = useState({
    batteryCode: '',
    deviceCode: '',
    status: '',
  })
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedPowerBank, setSelectedPowerBank] = useState<typeof powerBankData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      batteryCode: '',
      deviceCode: '',
      status: '',
    })
  }

  const handleOpenDetail = (item: typeof powerBankData[0]) => {
    setSelectedPowerBank(item)
    setDetailDialogOpen(true)
  }

  const chargingCount = powerBankData.filter(d => d.status === '充电中').length

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">单宝管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {powerBankData.length} 条记录
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[12px] font-medium text-[#F59E0B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
              {chargingCount} 充电中
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
          <span className="text-[#3B82F6] font-medium">单宝管理</span>
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
              {/* Battery Code */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">电池编号</Label>
                <Input
                  placeholder="电池编号"
                  value={filters.batteryCode}
                  onChange={(e) => setFilters({ ...filters, batteryCode: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Device ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备ID</Label>
                <Input
                  placeholder="设备ID"
                  value={filters.deviceCode}
                  onChange={(e) => setFilters({ ...filters, deviceCode: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">状态</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="充电中">充电中</SelectItem>
                    <SelectItem value="可借">可借</SelectItem>
                    <SelectItem value="异常">异常</SelectItem>
                    <SelectItem value="离线">离线</SelectItem>
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
              <BatteryMedium className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">充电宝列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {powerBankData.length}
              </Badge>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">电池编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">首次入库时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">最近变更时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {powerBankData.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-4">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-[#F59E0B]" />
                        </div>
                        <span className="text-[13px] text-[#334155] font-mono tracking-tight font-medium">{item.batteryCode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                        {item.deviceCode}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {item.agent.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.agent}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#64748B]">{item.firstStorageTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#64748B]">{item.lastChangeTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                        item.status === '充电中'
                          ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                          : item.status === '可借'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                            : item.status === '异常'
                              ? 'bg-red-50 text-[#DC2626] border border-red-100'
                              : 'bg-gray-50 text-[#64748B] border border-gray-100'
                      }`}>
                        {item.status === '充电中' && (
                          <BatteryCharging className="w-3.5 h-3.5" />
                        )}
                        {item.status === '可借' && (
                          <BatteryMedium className="w-3.5 h-3.5" />
                        )}
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetail(item)}
                          className="h-8 px-3 text-[12px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          详情
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
                共 <span className="text-[#334155] font-semibold">{powerBankData.length}</span> 条记录
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

      {/* Power Bank Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[620px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200/50">
                  <BatteryCharging className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">详细信息</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedPowerBank?.batteryCode || ''}</p>
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
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">基本信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* 电池状态 */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <BatteryCharging className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">电池状态</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                  selectedPowerBank?.status === '充电中'
                    ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                    : selectedPowerBank?.status === '可借'
                      ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                      : selectedPowerBank?.status === '异常'
                        ? 'bg-red-50 text-[#DC2626] border border-red-100'
                        : 'bg-gray-50 text-[#64748B] border border-gray-100'
                }`}>
                  {selectedPowerBank?.status === '充电中' && <BatteryCharging className="w-3 h-3" />}
                  {selectedPowerBank?.status === '可借' && <BatteryMedium className="w-3 h-3" />}
                  {selectedPowerBank?.status || '-'}
                </span>
              </div>
              {/* 电池编号 */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">电池编号</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedPowerBank?.batteryCode || '-'}</p>
              </div>
              {/* 代理商 */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">代理商</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                    {(selectedPowerBank?.agent || '-').charAt(0).toUpperCase()}
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold">{selectedPowerBank?.agent || '-'}</p>
                </div>
              </div>
              {/* 首次租借时间 */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <History className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">首次租借时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedPowerBank?.firstRentTime || <span className="text-[#CBD5E1]">暂无记录</span>}</p>
              </div>
              {/* 电池租借次数 */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <ArrowRightLeft className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">电池租借次数</span>
                </div>
                <p className="text-[16px] text-[#1E293B] font-bold">{selectedPowerBank?.rentCount || <span className="text-[14px] text-[#CBD5E1] font-normal">暂无记录</span>} {selectedPowerBank?.rentCount ? <span className="text-[12px] text-[#94A3B8] font-normal">次</span> : null}</p>
              </div>

            </div>

            {/* 设备信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <Wifi className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">设备信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-2">
              {/* 所在设备ID */}
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">所在设备ID</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedPowerBank?.deviceCode || '-'}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
