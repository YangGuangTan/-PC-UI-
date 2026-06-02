'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
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
  Wallet,
  X,
  Eye,
  DollarSign,
  Coins,
  TrendingUp,
  ShieldAlert,
  Clock,
  FileText,
} from 'lucide-react'

// Mock agent wallet data
const agentWalletData = [
  {
    id: 1,
    agentName: 'pagumi',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 2,
    agentName: '詹三',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 3,
    agentName: 'tb_2991211',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 4,
    agentName: '清陈',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 5,
    agentName: 'Hem Thavorak',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 6,
    agentName: 'yatchung',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 7,
    agentName: '加州',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 8,
    agentName: '土士力架',
    currency: 'USD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
  {
    id: 9,
    agentName: '张三',
    currency: 'HKD',
    totalEarnings: 0,
    riskAmount: 0,
    withdrawn: 0,
    pendingWithdraw: 0,
    pendingReview: 0,
  },
]

// Mock wallet log data
const walletLogData = [
  { id: 1, type: '收益入账', amount: '+12.50', balance: '125.00', time: '2026-05-28 14:30:00', remark: '订单 BF80Z31026000002 分润' },
  { id: 2, type: '提现', amount: '-50.00', balance: '112.50', time: '2026-05-27 10:15:00', remark: '提现至银行账户' },
  { id: 3, type: '收益入账', amount: '+8.30', balance: '162.50', time: '2026-05-26 18:22:00', remark: '订单 01624BF00A000003 分润' },
  { id: 4, type: '风控扣除', amount: '-5.00', balance: '154.20', time: '2026-05-25 09:00:00', remark: '异常订单风控扣款' },
  { id: 5, type: '收益入账', amount: '+15.80', balance: '159.20', time: '2026-05-24 21:45:00', remark: '订单 BF80Z31026000008 分润' },
]

export default function AgentAccountsPage() {
  const [searchName, setSearchName] = useState('')
  const [walletLogOpen, setWalletLogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<typeof agentWalletData[0] | null>(null)

  const handleReset = () => {
    setSearchName('')
  }

  const handleViewWalletLog = (item: typeof agentWalletData[0]) => {
    setSelectedAgent(item)
    setWalletLogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">代理商钱包</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {agentWalletData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">代理账号</span>
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
              {/* 代理商名称 */}
              <div className="space-y-2 w-[240px]">
                <Label className="text-[12px] text-[#64748B] font-medium">代理商名称</Label>
                <Input
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="请输入代理商名称"
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
              <Wallet className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">代理商钱包列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">币种</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">总收益</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">风控金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">已提现</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">待提现</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">待审核</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentWalletData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
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
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#334155] font-semibold font-mono">{item.totalEarnings.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#EF4444] font-semibold font-mono">{item.riskAmount.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#10B981] font-semibold font-mono">{item.withdrawn.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#F59E0B] font-semibold font-mono">{item.pendingWithdraw.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className="text-[13px] text-[#8B5CF6] font-semibold font-mono">{item.pendingReview.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewWalletLog(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          钱包日志
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

      {/* Wallet Log Dialog */}
      <Dialog open={walletLogOpen} onOpenChange={setWalletLogOpen}>
        <DialogContent className="sm:max-w-[700px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">钱包日志</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">代理商：{selectedAgent?.agentName || ''}</p>
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
            {/* Wallet Summary */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
                <DollarSign className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">账户概览</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-3.5 border border-[#E2E8F0]/60 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <TrendingUp className="w-3 h-3 text-[#10B981]" />
                  <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">总收益</span>
                </div>
                <p className="text-[16px] font-bold text-[#334155] font-mono">{selectedAgent?.totalEarnings.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-3.5 border border-[#E2E8F0]/60 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <ShieldAlert className="w-3 h-3 text-[#EF4444]" />
                  <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">风控金额</span>
                </div>
                <p className="text-[16px] font-bold text-[#EF4444] font-mono">{selectedAgent?.riskAmount.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-3.5 border border-[#E2E8F0]/60 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Coins className="w-3 h-3 text-[#10B981]" />
                  <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">已提现</span>
                </div>
                <p className="text-[16px] font-bold text-[#10B981] font-mono">{selectedAgent?.withdrawn.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-3.5 border border-[#E2E8F0]/60 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Clock className="w-3 h-3 text-[#F59E0B]" />
                  <span className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">待提现</span>
                </div>
                <p className="text-[16px] font-bold text-[#F59E0B] font-mono">{selectedAgent?.pendingWithdraw.toFixed(2)}</p>
              </div>
            </div>

            {/* Transaction Log */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">交易记录</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="space-y-2.5">
              {walletLogData.map((log) => (
                <div
                  key={log.id}
                  className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        log.type === '收益入账'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : log.type === '提现'
                            ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                            : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-[12px] text-[#94A3B8]">{log.time}</span>
                    </div>
                    <span className={`text-[14px] font-bold font-mono ${
                      log.amount.startsWith('+') ? 'text-[#059669]' : 'text-[#DC2626]'
                    }`}>
                      {log.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#64748B]">{log.remark}</span>
                    <span className="text-[12px] text-[#94A3B8]">余额：<span className="text-[#334155] font-semibold font-mono">{log.balance}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
