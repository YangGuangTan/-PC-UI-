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
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronRight,
  FileClock,
  Clock,
  CheckCircle2,
  XCircle,
  HourglassIcon,
} from 'lucide-react'

// Mock data
const paymentRecordsData = [
  {
    index: 1,
    userId: '1507099404698529800',
    nickname: '99555528',
    phone: '99555528',
    orderId: 'pi_3TZUeoCM1ksC6Tvf1gHSNBpm',
    rentOrderNo: 'XKTW26052135173273',
    localOrderNo: 'XKTPAY26052138528716',
    amount: '20',
    currency: 'USD',
    payStatus: '支付成功',
    payType: 'Stripe',
    payMethod: 'Stripe',
    createTime: '2026-05-21 19:20:54',
  },
  {
    index: 2,
    userId: '1507099404698529800',
    nickname: '99555528',
    phone: '99555528',
    orderId: 'pi_3TZUebCM1ksC6Tvf1GtMO7Du',
    rentOrderNo: 'XKTW26052181563648',
    localOrderNo: 'XKTPAY26052186177382',
    amount: '20',
    currency: 'USD',
    payStatus: '取消支付',
    payType: 'Stripe',
    payMethod: 'Stripe',
    createTime: '2026-05-21 19:20:42',
  },
  {
    index: 3,
    userId: '1498807479226740700',
    nickname: '87494937',
    phone: '87494937',
    orderId: 'pi_3TRoZCCM1ksC6Tvf1RpOZ6Pf',
    rentOrderNo: 'XKTW26043075906150',
    localOrderNo: 'XKTPAY26043013654886',
    amount: '20',
    currency: 'USD',
    payStatus: '取消支付',
    payType: 'Stripe',
    payMethod: 'Stripe',
    createTime: '2026-04-30 14:59:22',
  },
  {
    index: 4,
    userId: '1498807479226740700',
    nickname: '87494937',
    phone: '87494937',
    orderId: '20260428154010800100188770211614320',
    rentOrderNo: '-',
    localOrderNo: 'XKTPAY26042898519500',
    amount: '20',
    currency: 'USD',
    payStatus: '取消支付',
    payType: '钱包充值',
    payMethod: '支付宝',
    createTime: '2026-04-28 22:08:21',
  },
  {
    index: 5,
    userId: '1512345678901234500',
    nickname: '66238911',
    phone: '66238911',
    orderId: 'pi_3TQmBaCM1ksC6Tvf2kLnX9Yq',
    rentOrderNo: 'XKTW26042561283901',
    localOrderNo: 'XKTPAY26042582391027',
    amount: '50',
    currency: 'KHR',
    payStatus: '支付成功',
    payType: 'Stripe',
    payMethod: 'Stripe',
    createTime: '2026-04-25 10:15:33',
  },
  {
    index: 6,
    userId: '1489076543210987600',
    nickname: '33456789',
    phone: '33456789',
    orderId: '20260422183020900100234567890123456',
    rentOrderNo: 'XKTW26042249102837',
    localOrderNo: 'XKTPAY26042273829104',
    amount: '100',
    currency: 'USD',
    payStatus: '支付成功',
    payType: '钱包充值',
    payMethod: '微信支付',
    createTime: '2026-04-22 18:30:20',
  },
  {
    index: 7,
    userId: '1523456789012345600',
    nickname: '78123456',
    phone: '78123456',
    orderId: 'pi_3TPxKaCM1ksC6Tvf5mNqR8Ws',
    rentOrderNo: 'XKTW26042018372645',
    localOrderNo: 'XKTPAY26042059281736',
    amount: '30',
    currency: 'USD',
    payStatus: '待支付',
    payType: 'Stripe',
    payMethod: 'Stripe',
    createTime: '2026-04-20 09:42:18',
  },
  {
    index: 8,
    userId: '1509876543210987600',
    nickname: '45987654',
    phone: '45987654',
    orderId: '20260418120530700100987654321098765',
    rentOrderNo: '-',
    localOrderNo: 'XKTPAY26041862391058',
    amount: '200',
    currency: 'KHR',
    payStatus: '支付成功',
    payType: '钱包充值',
    payMethod: '支付宝',
    createTime: '2026-04-18 12:05:30',
  },
]

export default function PaymentRecordsPage() {
  const [filters, setFilters] = useState({
    rentOrderNo: '',
    localOrderNo: '',
    phone: '',
    payStatus: '',
    payType: '',
    payMethod: '',
  })

  const handleReset = () => {
    setFilters({
      rentOrderNo: '',
      localOrderNo: '',
      phone: '',
      payStatus: '',
      payType: '',
      payMethod: '',
    })
  }

  const filteredData = paymentRecordsData.filter((item) => {
    if (filters.rentOrderNo && !item.rentOrderNo.includes(filters.rentOrderNo)) return false
    if (filters.localOrderNo && !item.localOrderNo.includes(filters.localOrderNo)) return false
    if (filters.phone && !item.phone.includes(filters.phone)) return false
    if (filters.payStatus && item.payStatus !== filters.payStatus) return false
    if (filters.payType && item.payType !== filters.payType) return false
    if (filters.payMethod && item.payMethod !== filters.payMethod) return false
    return true
  })

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">支付记录</h1>
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
          <span className="text-[#3B82F6] font-medium">支付记录</span>
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
              {/* 租借订单编号 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">租借订单编号</Label>
                <Input
                  value={filters.rentOrderNo}
                  onChange={(e) => setFilters({ ...filters, rentOrderNo: e.target.value })}
                  placeholder="租借订单编号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 本地订单编号 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">本地订单编号</Label>
                <Input
                  value={filters.localOrderNo}
                  onChange={(e) => setFilters({ ...filters, localOrderNo: e.target.value })}
                  placeholder="本地订单编号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 用户手机号 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户手机号</Label>
                <Input
                  value={filters.phone}
                  onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
                  placeholder="用户手机号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 支付状态 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">支付状态</Label>
                <Select
                  value={filters.payStatus}
                  onValueChange={(value) => setFilters({ ...filters, payStatus: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择支付状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="支付成功">支付成功</SelectItem>
                    <SelectItem value="取消支付">取消支付</SelectItem>
                    <SelectItem value="待支付">待支付</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 支付类型 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">支付类型</Label>
                <Select
                  value={filters.payType}
                  onValueChange={(value) => setFilters({ ...filters, payType: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择支付类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="Stripe">Stripe</SelectItem>
                    <SelectItem value="钱包充值">钱包充值</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 支付方式 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">支付方式</Label>
                <Select
                  value={filters.payMethod}
                  onValueChange={(value) => setFilters({ ...filters, payMethod: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择支付方式" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="Stripe">Stripe</SelectItem>
                    <SelectItem value="支付宝">支付宝</SelectItem>
                    <SelectItem value="微信支付">微信支付</SelectItem>
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
              <FileClock className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">支付记录列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[50px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户Id</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户昵称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单Id</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">租借订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">本地订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">支付金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">币种</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">支付状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">支付类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">支付方式</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.index}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.index}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.userId}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-[9px] font-semibold shrink-0">
                          {item.nickname.charAt(0)}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.nickname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[13px] text-[#64748B]">{item.phone}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight max-w-[140px] truncate block">{item.orderId}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[11px] text-[#334155] font-mono tracking-tight">{item.rentOrderNo}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[11px] text-[#334155] font-mono tracking-tight">{item.localOrderNo}</span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="text-[13px] text-[#D97706] font-semibold">{item.amount}</span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-semibold text-[#334155] border border-[#E2E8F0]">
                        {item.currency}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.payStatus === '支付成功'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : item.payStatus === '取消支付'
                          ? 'bg-red-50 text-[#DC2626] border border-red-100'
                          : 'bg-yellow-50 text-[#CA8A04] border border-yellow-100'
                      }`}>
                        {item.payStatus === '支付成功' && <CheckCircle2 className="w-3 h-3" />}
                        {item.payStatus === '取消支付' && <XCircle className="w-3 h-3" />}
                        {item.payStatus === '待支付' && <HourglassIcon className="w-3 h-3" />}
                        {item.payStatus}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        item.payType === 'Stripe'
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                          : 'bg-purple-50 text-[#7C3AED] border border-purple-100'
                      }`}>
                        {item.payType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <span className="text-[12px] text-[#334155] font-medium">{item.payMethod}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8] shrink-0" />
                        <span className="text-[12px] text-[#64748B] whitespace-nowrap">{item.createTime}</span>
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
    </>
  )
}
