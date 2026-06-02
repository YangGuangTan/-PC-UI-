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
  DialogFooter,
} from '@/components/ui/dialog'
import {
  LayoutDashboard,
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronRight,
  BadgeDollarSign,
  Clock,
  Eye,
  X,
  CheckCircle2,
  HourglassIcon,
  XCircle,
} from 'lucide-react'

// Mock data
const depositRefundData = [
  {
    index: 1,
    nickname: '432343287',
    phone: '432343287',
    email: '-',
    deposit: '20',
    unit: 'USD',
    depositPayTime: '2026-02-26 11:12:03',
    applyRefundTime: '2026-02-27 12:01:13',
    status: '已退款',
  },
  {
    index: 2,
    nickname: '567823411',
    phone: '567823411',
    email: '-',
    deposit: '210',
    unit: 'USD',
    depositPayTime: '2026-02-25 09:30:45',
    applyRefundTime: '2026-02-26 15:22:08',
    status: '已退款',
  },
  {
    index: 3,
    nickname: '891245678',
    phone: '891245678',
    email: 'user891@example.com',
    deposit: '50',
    unit: 'HKD',
    depositPayTime: '2026-02-24 14:18:32',
    applyRefundTime: '2026-02-25 10:45:20',
    status: '已退款',
  },
  {
    index: 4,
    nickname: '234567891',
    phone: '234567891',
    email: '-',
    deposit: '100',
    unit: 'USD',
    depositPayTime: '2026-02-23 16:42:17',
    applyRefundTime: '2026-02-24 08:30:55',
    status: '待审核',
  },
  {
    index: 5,
    nickname: '678912345',
    phone: '678912345',
    email: '-',
    deposit: '30',
    unit: 'HKD',
    depositPayTime: '2026-02-22 11:05:44',
    applyRefundTime: '2026-02-23 14:18:30',
    status: '已退款',
  },
  {
    index: 6,
    nickname: '345678912',
    phone: '345678912',
    email: 'user345@example.com',
    deposit: '150',
    unit: 'USD',
    depositPayTime: '2026-02-21 08:55:22',
    applyRefundTime: '2026-02-22 17:33:09',
    status: '已拒绝',
  },
  {
    index: 7,
    nickname: '789123456',
    phone: '789123456',
    email: '-',
    deposit: '80',
    unit: 'KHR',
    depositPayTime: '2026-02-20 13:27:51',
    applyRefundTime: '2026-02-21 09:42:16',
    status: '已退款',
  },
  {
    index: 8,
    nickname: '123456789',
    phone: '123456789',
    email: '-',
    deposit: '60',
    unit: 'USD',
    depositPayTime: '2026-02-19 17:10:38',
    applyRefundTime: '2026-02-20 11:25:47',
    status: '待审核',
  },
]

export default function DepositRefundsPage() {
  const [filters, setFilters] = useState({
    nickname: '',
    email: '',
    phone: '',
    status: '',
  })

  const [auditDialogOpen, setAuditDialogOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<typeof depositRefundData[0] | null>(null)

  const handleAudit = (item: typeof depositRefundData[0]) => {
    setSelectedRecord(item)
    setAuditDialogOpen(true)
  }

  const handleReset = () => {
    setFilters({
      nickname: '',
      email: '',
      phone: '',
      status: '',
    })
  }

  const filteredData = depositRefundData.filter((item) => {
    if (filters.nickname && !item.nickname.includes(filters.nickname)) return false
    if (filters.email && !item.email.includes(filters.email)) return false
    if (filters.phone && !item.phone.includes(filters.phone)) return false
    if (filters.status && item.status !== filters.status) return false
    return true
  })

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">押金退款</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {filteredData.length} 条记录
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 relative group">
            <RefreshCw className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#3B82F6] group-hover:rotate-180 transition-all duration-500" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-[#F1F5F9] transition-all duration-200 relative group">
            <Globe className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#3B82F6] transition-colors" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white animate-pulse"></span>
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
          <span className="text-[#3B82F6] font-medium">押金退款</span>
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
              {/* 用户名称 */}
              <div className="space-y-2 w-[160px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户名称</Label>
                <Input
                  value={filters.nickname}
                  onChange={(e) => setFilters({ ...filters, nickname: e.target.value })}
                  placeholder="用户名称"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 电子邮件 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">电子邮件</Label>
                <Input
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                  placeholder="电子邮件"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 手机号 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">手机号</Label>
                <Input
                  value={filters.phone}
                  onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                  placeholder="手机号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 状态 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">状态</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="已退款">已退款</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                    <SelectItem value="已拒绝">已拒绝</SelectItem>
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
              <BadgeDollarSign className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">押金退款列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[60px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户昵称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">电子邮件</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">押金</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">单位</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">押金缴纳时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">申请退款时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.index}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.index}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                          {item.nickname.charAt(0)}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.nickname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#64748B]">{item.phone}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#94A3B8]">{item.email}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#D97706] font-semibold">{item.deposit}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-semibold text-[#334155] border border-[#E2E8F0]">
                        {item.unit}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.depositPayTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.applyRefundTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status === '已退款'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : item.status === '待审核'
                          ? 'bg-yellow-50 text-[#CA8A04] border border-yellow-100'
                          : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {item.status === '已退款' && <CheckCircle2 className="w-3 h-3" />}
                        {item.status === '待审核' && <HourglassIcon className="w-3 h-3" />}
                        {item.status === '已拒绝' && <XCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleAudit(item)}
                          className="h-6 px-1.5 text-[11px] text-[#3B82F6] hover:text-[#2563EB] font-medium p-0"
                        >
                          <Eye className="w-3 h-3 mr-0.5" />
                          审核
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
                共 <span className="text-[#334155] font-semibold">{filteredData.length}</span> 条
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

      {/* Audit Dialog */}
      <Dialog open={auditDialogOpen} onOpenChange={setAuditDialogOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#DC2626]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <BadgeDollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">审核退款</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">用户: {selectedRecord?.nickname || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-7 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">用户昵称</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedRecord?.nickname || '-'}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">手机号</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedRecord?.phone || '-'}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">押金金额</p>
                <p className="text-[13px] font-semibold text-[#D97706]">{selectedRecord?.deposit || '-'} {selectedRecord?.unit || ''}</p>
              </div>
              <div>
                <p className="text-[11px] text-[#94A3B8] mb-1">当前状态</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  selectedRecord?.status === '已退款'
                    ? 'bg-green-50 text-[#059669] border border-green-100'
                    : selectedRecord?.status === '待审核'
                    ? 'bg-yellow-50 text-[#CA8A04] border border-yellow-100'
                    : 'bg-red-50 text-[#DC2626] border border-red-100'
                }`}>
                  {selectedRecord?.status}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] text-[#94A3B8] mb-1">押金缴纳时间</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedRecord?.depositPayTime || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] text-[#94A3B8] mb-1">申请退款时间</p>
                <p className="text-[13px] font-semibold text-[#111827]">{selectedRecord?.applyRefundTime || '-'}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAuditDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              className="h-9 px-6 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-red-200/50 transition-all duration-200"
              onClick={() => setAuditDialogOpen(false)}
            >
              拒绝退款
            </Button>
            <Button
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-green-200/50 transition-all duration-200"
              onClick={() => setAuditDialogOpen(false)}
            >
              确认退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
