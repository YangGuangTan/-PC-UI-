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
  XCircle,
  RotateCcw as RefundIcon,
  DollarSign,
  Hash,
  User,
  CalendarDays,
} from 'lucide-react'

// Mock refund order data
const refundData = [
  {
    id: 1,
    refundNo: 'XKT@25122555510528',
    orderNo: 'XKTW25122521729996',
    transactionNo: 'XKTPAY25122554887014',
    refundReason: '河里',
    orderAmount: 0,
    refundAmount: 1,
    refundStatus: '退款成功',
    refundTime: '2025-12-25 18:20:21',
    operator: '旺旺',
  },
  {
    id: 2,
    refundNo: 'XKT@25122555510482',
    orderNo: 'XKTW25122521729980',
    transactionNo: 'XKTPAY25122554887006',
    refundReason: '9.9',
    orderAmount: 9.9,
    refundAmount: 9.9,
    refundStatus: '退款成功',
    refundTime: '2025-12-25 18:18:15',
    operator: '旺旺',
  },
  {
    id: 3,
    refundNo: 'XKT@25122555509998',
    orderNo: 'XKTW25122521729952',
    transactionNo: 'XKTPAY25122554886990',
    refundReason: '员工代借',
    orderAmount: 16.5,
    refundAmount: 16,
    refundStatus: '退款成功',
    refundTime: '2025-12-25 17:55:33',
    operator: '张锐',
  },
  {
    id: 4,
    refundNo: 'XKT@25121555508776',
    orderNo: 'XKTW25121521729901',
    transactionNo: 'XKTPAY25121554886942',
    refundReason: '1',
    orderAmount: 0.5,
    refundAmount: 1,
    refundStatus: '退款成功',
    refundTime: '2025-12-15 17:12:14',
    operator: '旺旺',
  },
  {
    id: 5,
    refundNo: 'XKT@25121555508750',
    orderNo: 'XKTW25121521729885',
    transactionNo: 'XKTPAY25121554886928',
    refundReason: '测试',
    orderAmount: 6,
    refundAmount: 3.5,
    refundStatus: '退款成功',
    refundTime: '2025-12-15 16:48:09',
    operator: '张锐',
  },
  {
    id: 6,
    refundNo: 'XKT@25121555508612',
    orderNo: 'XKTW25121521729862',
    transactionNo: 'XKTPAY25121554886910',
    refundReason: '卡卡',
    orderAmount: 3,
    refundAmount: 3,
    refundStatus: '退款成功',
    refundTime: '2025-12-15 15:30:42',
    operator: '旺旺',
  },
  {
    id: 7,
    refundNo: 'XKT@25121555508588',
    orderNo: 'XKTW25121521729841',
    transactionNo: 'XKTPAY25121554886902',
    refundReason: '设备故障',
    orderAmount: 6,
    refundAmount: 6,
    refundStatus: '退款成功',
    refundTime: '2025-12-15 14:22:18',
    operator: '张锐',
  },
  {
    id: 8,
    refundNo: 'XKT@25121555508456',
    orderNo: 'XKTW25121521729820',
    transactionNo: 'XKTPAY25121554886890',
    refundReason: '1',
    orderAmount: 1,
    refundAmount: 1,
    refundStatus: '退款成功',
    refundTime: '2025-12-15 13:15:07',
    operator: '旺旺',
  },
  {
    id: 9,
    refundNo: 'XKT@25121555508390',
    orderNo: 'XKTW25121521729798',
    transactionNo: 'XKTPAY25121554886876',
    refundReason: '充电慢',
    orderAmount: 0.5,
    refundAmount: 0.5,
    refundStatus: '退款中',
    refundTime: '2025-12-15 11:50:33',
    operator: '张锐',
  },
  {
    id: 10,
    refundNo: 'XKT@25121555508255',
    orderNo: 'XKTW25121521729776',
    transactionNo: 'XKTPAY25121554886860',
    refundReason: '未归还',
    orderAmount: 16.5,
    refundAmount: 6,
    refundStatus: '退款中',
    refundTime: '2025-12-15 10:35:21',
    operator: '旺旺',
  },
]

export default function RefundsPage() {
  const [filters, setFilters] = useState({
    refundNo: '',
    orderNo: '',
    refundStatus: '',
    startDate: '',
    endDate: '',
  })
  const [currentPage, setCurrentPage] = useState(1)

  const handleReset = () => {
    setFilters({
      refundNo: '',
      orderNo: '',
      refundStatus: '',
      startDate: '',
      endDate: '',
    })
  }

  const successCount = refundData.filter(d => d.refundStatus === '退款成功').length
  const pendingCount = refundData.filter(d => d.refundStatus === '退款中').length
  const totalRefundAmount = refundData.reduce((sum, d) => sum + d.refundAmount, 0)

  const totalPages = 21
  const totalRecords = 207

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">退款订单</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {totalRecords} 条记录
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              {successCount} 退款成功
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[12px] font-medium text-[#F59E0B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
              {pendingCount} 退款中
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
          <span className="text-[#3B82F6] font-medium">退款订单</span>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">退款总数</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">{totalRecords}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                <RefundIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#10B981] font-semibold">● {successCount} 成功</span>
              <span className="text-[12px] text-[#F59E0B] font-semibold">● {pendingCount} 处理中</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">退款总额</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">¥{totalRefundAmount.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#64748B]">平均每笔 ¥{(totalRefundAmount / refundData.length).toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">成功率</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">{((successCount / refundData.length) * 100).toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200/50">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#64748B]">{successCount} 成功 / {refundData.length} 总计</span>
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
              {/* 退款单号 */}
              <div className="space-y-2 flex-1 min-w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">退款单号</Label>
                <Input
                  placeholder="请输入退款单号"
                  value={filters.refundNo}
                  onChange={(e) => setFilters({ ...filters, refundNo: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 订单编号 */}
              <div className="space-y-2 flex-1 min-w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">订单编号</Label>
                <Input
                  placeholder="请输入订单编号"
                  value={filters.orderNo}
                  onChange={(e) => setFilters({ ...filters, orderNo: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 退款状态 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">退款状态</Label>
                <Select
                  value={filters.refundStatus}
                  onValueChange={(value) => setFilters({ ...filters, refundStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="退款状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="退款成功">退款成功</SelectItem>
                    <SelectItem value="退款中">退款中</SelectItem>
                    <SelectItem value="退款失败">退款失败</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 开始时间 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">开始时间</Label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 结束时间 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">结束时间</Label>
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
              <RefundIcon className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">退款列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {totalRecords}
              </Badge>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-14">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">退款单号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">交易单号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">退款原因</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">订单金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">退款金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">退款状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">退款时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">操作人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {refundData.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-3.5">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#3B82F6] font-mono tracking-tight font-medium hover:text-[#2563EB] cursor-pointer">{item.refundNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] font-mono tracking-tight">{item.orderNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] font-mono tracking-tight">{item.transactionNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#334155]">{item.refundReason}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#64748B]">¥{item.orderAmount.toFixed(1)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#EF4444] font-semibold">¥{item.refundAmount.toFixed(1)}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.refundStatus === '退款成功'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : item.refundStatus === '退款中'
                            ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                            : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {item.refundStatus === '退款成功' && <CheckCircle2 className="w-3 h-3" />}
                        {item.refundStatus === '退款中' && <Clock className="w-3 h-3" />}
                        {item.refundStatus === '退款失败' && <XCircle className="w-3 h-3" />}
                        {item.refundStatus}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.refundTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                          {item.operator.charAt(0)}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.operator}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          size="sm"
                          className="h-7 px-2.5 text-[11px] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          通过
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2.5 text-[11px] border-[#E2E8F0] text-[#64748B] hover:border-[#EF4444] hover:text-[#EF4444] hover:bg-red-50 rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          不通过
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
                共 <span className="text-[#334155] font-semibold">{totalRecords}</span> 条记录
              </span>
              <span className="text-[13px] text-[#CBD5E1] mx-1">|</span>
              <span className="text-[13px] text-[#94A3B8]">
                每页 <span className="text-[#334155] font-semibold">10</span> 条
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="h-8 px-3 text-[12px] border-[#E2E8F0] text-[#64748B] rounded-lg shadow-none font-medium hover:bg-[#F1F5F9]"
              >
                上一页
              </Button>
              {[1, 2, 3, 4, 5, 6].map(page => (
                <Button
                  key={page}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 p-0 text-[12px] rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white shadow-sm shadow-blue-200/50'
                      : 'border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] shadow-none'
                  }`}
                >
                  {page}
                </Button>
              ))}
              <span className="text-[12px] text-[#94A3B8] px-1">...</span>
              <Button
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                className={`h-8 w-8 p-0 text-[12px] rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gradient-to-b from-[#3B82F6] to-[#2563EB] text-white shadow-sm shadow-blue-200/50'
                    : 'border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] shadow-none'
                }`}
              >
                {totalPages}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="h-8 px-3 text-[12px] border-[#E2E8F0] text-[#64748B] rounded-lg shadow-none font-medium hover:bg-[#F1F5F9]"
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
