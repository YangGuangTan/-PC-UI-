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
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Clock,
} from 'lucide-react'

// Mock warning records data matching the image
const warningRecordData = [
  {
    index: 1,
    userId: '1968952821978689500',
    deviceCode: '-',
    warningTime: '2025-09-19',
    siteId: '-',
    warningType: '用户单日租借订单超过预警值',
    createTime: '2025-09-19 17:45:48',
  },
  {
    index: 2,
    userId: '1793132744223096800',
    deviceCode: '-',
    warningTime: '2025-06-16',
    siteId: '-',
    warningType: '用户单日租借订单超过预警值',
    createTime: '2025-06-16 15:42:06',
  },
  {
    index: 3,
    userId: '1901153444459860000',
    deviceCode: '-',
    warningTime: '2025-03-16',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-03-16 14:27:42',
  },
  {
    index: 4,
    userId: '1900891023224754200',
    deviceCode: '-',
    warningTime: '2025-03-16',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-03-16 13:47:23',
  },
  {
    index: 5,
    userId: '1899807101124497400',
    deviceCode: '-',
    warningTime: '2025-03-13',
    siteId: '-',
    warningType: '用户单日租借订单超过预警值',
    createTime: '2025-03-13 15:24:24',
  },
  {
    index: 6,
    userId: '1899807101124497400',
    deviceCode: '-',
    warningTime: '2025-03-12',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-03-12 21:07:16',
  },
  {
    index: 7,
    userId: '1899803037250769000',
    deviceCode: '-',
    warningTime: '2025-03-12',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-03-12 20:48:03',
  },
  {
    index: 8,
    userId: '1881250387668390000',
    deviceCode: '-',
    warningTime: '2025-03-12',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-03-12 01:10:41',
  },
  {
    index: 9,
    userId: '1881250387668390000',
    deviceCode: '-',
    warningTime: '2025-02-06',
    siteId: '-',
    warningType: '用户单日充值次数超过预警',
    createTime: '2025-02-06 23:28:47',
  },
]

export default function WarningRecordsPage() {
  const [filters, setFilters] = useState({
    username: '',
    userId: '',
    warningTime: '',
    userType: '',
    warningType: '',
    siteName: '',
  })

  const handleReset = () => {
    setFilters({
      username: '',
      userId: '',
      warningTime: '',
      userType: '',
      warningType: '',
      siteName: '',
    })
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">预警记录</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {warningRecordData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">预警记录</span>
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
              {/* 用户名 */}
              <div className="space-y-2 w-[160px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户名</Label>
                <Input
                  value={filters.username}
                  onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                  placeholder="用户名"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 用户id */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户id</Label>
                <Input
                  value={filters.userId}
                  onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                  placeholder="用户id"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 预警时间 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">预警时间</Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={filters.warningTime}
                    onChange={(e) => setFilters({ ...filters, warningTime: e.target.value })}
                    placeholder="请选择预警时间"
                    className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                  />
                </div>
              </div>

              {/* 用户类型 */}
              <div className="space-y-2 w-[160px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户类型</Label>
                <Select
                  value={filters.userType}
                  onValueChange={(value) => setFilters({ ...filters, userType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择用户类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="personal">个人用户</SelectItem>
                    <SelectItem value="enterprise">企业用户</SelectItem>
                    <SelectItem value="agent">代理商</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 预警类型 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">预警类型</Label>
                <Select
                  value={filters.warningType}
                  onValueChange={(value) => setFilters({ ...filters, warningType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择预警类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="rental_over_limit">用户单日租借订单超过预警值</SelectItem>
                    <SelectItem value="recharge_over_limit">用户单日充值次数超过预警</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 网点名称 */}
              <div className="space-y-2 w-[160px]">
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
                    <SelectItem value="Tn Club">Tn Club</SelectItem>
                    <SelectItem value="Room10F">Room10F</SelectItem>
                    <SelectItem value="旺旺 港币网点">旺旺 港币网点</SelectItem>
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
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">预警记录列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[60px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户id</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">预警时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点id</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">预警类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warningRecordData.map((item) => (
                  <TableRow
                    key={item.index}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.index}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.userId}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#94A3B8]">{item.deviceCode}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.warningTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#94A3B8]">{item.siteId}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border ${
                        item.warningType === '用户单日租借订单超过预警值'
                          ? 'bg-amber-50 text-[#D97706] border-amber-100'
                          : 'bg-red-50 text-[#DC2626] border-red-100'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                        {item.warningType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
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
                共 <span className="text-[#334155] font-semibold">{warningRecordData.length}</span> 条
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
    </>
  )
}
