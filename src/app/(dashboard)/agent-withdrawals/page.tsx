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
  Banknote,
  X,
  Eye,
  Hash,
  User,
  DollarSign,
  Phone,
  Clock,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react'

// Mock withdrawal data
const withdrawalData = [
  {
    id: 1,
    applicationNo: 'WTXKT25122054146099',
    agentId: '1970033647214596097',
    agentName: 'tb2380374592',
    currency: 'USD',
    phone: '57256665',
    applicationAmount: 87,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 78.3,
    status: '提款成功',
    applicationTime: '2025-12-20 09:27:51',
    withdrawalMethod: '支付宝',
    paymentAccount: 'zhangsan@alipay.com',
  },
  {
    id: 2,
    applicationNo: 'WTXKT2511131282214',
    agentId: '1970033647214596097',
    agentName: 'tb2380374592',
    currency: 'USD',
    phone: '57256665',
    applicationAmount: 1,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 0.9,
    status: '提款成功',
    applicationTime: '2025-11-13 17:17:56',
    withdrawalMethod: '支付宝',
    paymentAccount: 'zhangsan@alipay.com',
  },
  {
    id: 3,
    applicationNo: 'WTXKT25111262590924',
    agentId: '1970033647214596097',
    agentName: 'tb2380374592',
    currency: 'USD',
    phone: '57256665',
    applicationAmount: 2,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 1.8,
    status: '提款失败',
    applicationTime: '2025-11-12 21:44:48',
    withdrawalMethod: '支付宝',
    paymentAccount: 'zhangsan@alipay.com',
  },
  {
    id: 4,
    applicationNo: 'WTXKT25110596918732',
    agentId: '1970033647214596097',
    agentName: 'tb2380374592',
    currency: 'USD',
    phone: '57256665',
    applicationAmount: 1,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 0.9,
    status: '拒绝',
    applicationTime: '2025-11-05 18:55:33',
    withdrawalMethod: 'PayPal',
    paymentAccount: 'tb2380374592@paypal.com',
  },
  {
    id: 5,
    applicationNo: 'WTXKT25040205067622',
    agentId: '1748526610023952385',
    agentName: 'ch',
    currency: 'USD',
    phone: '18092851579',
    applicationAmount: 26,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 23.4,
    status: '拒绝',
    applicationTime: '2025-04-02 09:56:15',
    withdrawalMethod: 'PayPal',
    paymentAccount: 'ch_agent@paypal.com',
  },
  {
    id: 6,
    applicationNo: 'WTXKT25040296157337',
    agentId: '1748526610023952385',
    agentName: 'ch',
    currency: 'USD',
    phone: '18092851579',
    applicationAmount: 10,
    withdrawalFee: '5%',
    tax: '5%',
    actualPayment: 9,
    status: '拒绝',
    applicationTime: '2025-04-02 09:54:30',
    withdrawalMethod: 'PayPal',
    paymentAccount: 'ch_agent@paypal.com',
  },
]

export default function AgentWithdrawalsPage() {
  const [filters, setFilters] = useState({
    applicationNo: '',
    agentId: '',
    agentName: '',
    phone: '',
    status: '',
    startDate: '',
    endDate: '',
  })
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof withdrawalData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      applicationNo: '',
      agentId: '',
      agentName: '',
      phone: '',
      status: '',
      startDate: '',
      endDate: '',
    })
  }

  const handleViewDetail = (item: typeof withdrawalData[0]) => {
    setSelectedItem(item)
    setDetailDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">代理提现</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {withdrawalData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">代理提现</span>
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
              {/* 申请编号 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">申请编号</Label>
                <Input
                  value={filters.applicationNo}
                  onChange={(e) => setFilters({ ...filters, applicationNo: e.target.value })}
                  placeholder="申请编号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 代理商ID */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商ID</Label>
                <Input
                  value={filters.agentId}
                  onChange={(e) => setFilters({ ...filters, agentId: e.target.value })}
                  placeholder="代理商ID"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 代理商名称 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商名称</Label>
                <Select
                  value={filters.agentName}
                  onValueChange={(value) => setFilters({ ...filters, agentName: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="代理商名称" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="tb2380374592">tb2380374592</SelectItem>
                    <SelectItem value="ch">ch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 手机号 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">手机号</Label>
                <Select
                  value={filters.phone}
                  onValueChange={(value) => setFilters({ ...filters, phone: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="手机号" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="57256665">57256665</SelectItem>
                    <SelectItem value="18092851579">18092851579</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 审核状态 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">审核状态</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="审核状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="提款成功">提款成功</SelectItem>
                    <SelectItem value="提款失败">提款失败</SelectItem>
                    <SelectItem value="拒绝">拒绝</SelectItem>
                    <SelectItem value="待审核">待审核</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 开始日期 */}
              <div className="space-y-2 w-[155px]">
                <Label className="text-[12px] text-[#64748B] font-medium">开始日期</Label>
                <Input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 结束日期 */}
              <div className="space-y-2 w-[155px]">
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
              <Banknote className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">提现记录</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-14">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">申请编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">币种</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">申请金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">提现手续费</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">税费</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">实际打款</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">申请时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">提现方式</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalData.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-3.5">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#3B82F6] font-mono tracking-tight font-medium hover:text-[#2563EB] cursor-pointer">{item.applicationNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.agentId}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-[9px] font-bold">
                          {item.agentName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.agentName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                        {item.currency}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] font-mono">{item.phone}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#334155] font-semibold font-mono">{item.applicationAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[12px] text-[#64748B] font-mono">{item.withdrawalFee}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[12px] text-[#64748B] font-mono">{item.tax}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className={`text-[13px] font-bold font-mono ${item.actualPayment > 0 ? 'text-[#059669]' : 'text-[#94A3B8]'}`}>{item.actualPayment.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.status === '提款成功'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : item.status === '提款失败'
                            ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                            : item.status === '拒绝'
                              ? 'bg-red-50 text-[#DC2626] border border-red-100'
                              : 'bg-blue-50 text-[#2563EB] border border-blue-100'
                      }`}>
                        {item.status === '提款成功' ? <CheckCircle2 className="w-3 h-3" /> : item.status === '提款失败' ? <AlertTriangle className="w-3 h-3" /> : item.status === '拒绝' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.applicationTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                        <CreditCard className="w-3 h-3" />
                        {item.withdrawalMethod}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetail(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          详情
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">提现详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedItem?.applicationNo || ''}</p>
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
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">申请编号</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.applicationNo || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">代理商名称</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.agentName || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">代理商ID</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.agentId || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Phone className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">手机号</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.phone || '-'}</p>
              </div>
            </div>

            {/* 提现信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <DollarSign className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">提现信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">申请金额</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.currency} {selectedItem?.applicationAmount.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">提现手续费</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.withdrawalFee}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">税费</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.tax}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">实际打款</span>
                </div>
                <p className="text-[13px] text-[#059669] font-bold font-mono">{selectedItem?.currency} {selectedItem?.actualPayment.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CreditCard className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">提现方式</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.withdrawalMethod || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CreditCard className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">打款账户</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.paymentAccount || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">状态</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  selectedItem?.status === '提款成功'
                    ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                    : selectedItem?.status === '提款失败'
                      ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                      : selectedItem?.status === '拒绝'
                        ? 'bg-red-50 text-[#DC2626] border border-red-100'
                        : 'bg-blue-50 text-[#2563EB] border border-blue-100'
                }`}>
                  {selectedItem?.status === '提款成功' ? <CheckCircle2 className="w-3 h-3" /> : selectedItem?.status === '提款失败' ? <AlertTriangle className="w-3 h-3" /> : selectedItem?.status === '拒绝' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {selectedItem?.status || '-'}
                </span>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">申请时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.applicationTime || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">币种</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                  {selectedItem?.currency || '-'}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
