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
  UserCog,
  Clock,
  FileText,
  AlertTriangle,
  Ban,
  Eye,
  X,
  Wallet,
  Shield,
  User,
} from 'lucide-react'

// Mock wallet data per user
const walletData: Record<string, Array<{
  index: number
  currency: string
  balance: string
}>> = {
  '4777381': [
    { index: 1, currency: 'USD', balance: '$12.50' },
    { index: 2, currency: 'KHR', balance: '50,000 ៛' },
  ],
  '3672398': [
    { index: 1, currency: 'USD', balance: '$8.30' },
  ],
  '1815551': [
    { index: 1, currency: 'USD', balance: '$25.00' },
    { index: 2, currency: 'KHR', balance: '120,000 ៛' },
  ],
  '2302263': [
    { index: 1, currency: 'USD', balance: '$3.75' },
    { index: 2, currency: 'KHR', balance: '15,000 ៛' },
  ],
}

// Mock deposit data per user
const depositData: Record<string, Array<{
  index: number
  currency: string
  deposit: string
  status: string
  payTime: string
}>> = {
  '4777381': [
    { index: 1, currency: 'USD', deposit: '$5.00', status: '已缴纳', payTime: '2026-03-15 10:22:33' },
  ],
  '3672398': [
    { index: 1, currency: 'USD', deposit: '$5.00', status: '已退还', payTime: '2026-02-20 14:15:08' },
    { index: 2, currency: 'KHR', deposit: '20,000 ៛', status: '已缴纳', payTime: '2026-03-18 09:30:45' },
  ],
  '1815551': [
    { index: 1, currency: 'USD', deposit: '$10.00', status: '已缴纳', payTime: '2026-03-10 16:42:17' },
  ],
  '2302263': [
    { index: 1, currency: 'KHR', deposit: '30,000 ៛', status: '已缴纳', payTime: '2026-03-12 11:08:55' },
    { index: 2, currency: 'USD', deposit: '$5.00', status: '已退还', payTime: '2026-02-28 08:55:30' },
  ],
}

// Mock warning records data per user
const warningRecordsData: Record<string, Array<{
  index: number
  reason: string
  time: string
}>> = {
  '4777381': [
    { index: 1, reason: '交易异常', time: '2026-03-20 18:33:50' },
    { index: 2, reason: '账户异常', time: '2026-03-19 10:15:22' },
    { index: 3, reason: '设备故障', time: '2026-03-18 14:28:09' },
    { index: 4, reason: '交易异常', time: '2026-03-17 09:42:31' },
    { index: 5, reason: '库存不足', time: '2026-03-16 16:55:18' },
  ],
  '3672398': [
    { index: 1, reason: '设备故障', time: '2026-03-20 18:25:27' },
    { index: 2, reason: '交易异常', time: '2026-03-15 11:38:44' },
    { index: 3, reason: '库存不足', time: '2026-03-14 08:20:16' },
  ],
  '1815551': [
    { index: 1, reason: '账户异常', time: '2026-03-19 16:11:09' },
    { index: 2, reason: '交易异常', time: '2026-03-18 22:05:33' },
    { index: 3, reason: '设备故障', time: '2026-03-17 13:47:51' },
    { index: 4, reason: '库存不足', time: '2026-03-16 09:30:28' },
    { index: 5, reason: '账户异常', time: '2026-03-15 17:22:45' },
    { index: 6, reason: '交易异常', time: '2026-03-14 20:18:07' },
  ],
  '2302263': [
    { index: 1, reason: '库存不足', time: '2026-03-16 18:11:12' },
    { index: 2, reason: '设备故障', time: '2026-03-15 15:33:59' },
  ],
}

// Mock user data matching the image
const userData = [
  {
    index: 1,
    nickname: '2034941',
    userId: '4777381',
    loginMethod: 'Apple',
    phone: '27362',
    email: '-',
    brand: '豹风',
    isAbnormal: '否',
    accountStatus: '正常',
    latestWarningTime: '2026-03-20 18:33:50',
  },
  {
    index: 2,
    nickname: '2034939',
    userId: '3672398',
    loginMethod: 'Apple',
    phone: '52033',
    email: '-',
    brand: '豹风',
    isAbnormal: '否',
    accountStatus: '正常',
    latestWarningTime: '2026-03-20 18:25:27',
  },
  {
    index: 3,
    nickname: '2034543',
    userId: '1815551',
    loginMethod: 'Apple',
    phone: '79521',
    email: '-',
    brand: '豹风',
    isAbnormal: '否',
    accountStatus: '正常',
    latestWarningTime: '2026-03-19 16:11:09',
  },
  {
    index: 4,
    nickname: '2033486',
    userId: '2302263',
    loginMethod: 'Apple',
    phone: '45986',
    email: '-',
    brand: '豹风飞充',
    isAbnormal: '否',
    accountStatus: '正常',
    latestWarningTime: '2026-03-16 18:11:12',
  },
]

export default function UsersPage() {
  const [filters, setFilters] = useState({
    nickname: '',
    email: '',
    isAbnormal: '',
    accountStatus: '',
    emailSearch: '',
    userId: '',
    phone: '',
  })

  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof userData[0] | null>(null)

  const [warningDialogOpen, setWarningDialogOpen] = useState(false)
  const [warningUser, setWarningUser] = useState<typeof userData[0] | null>(null)
  const [warningReasonFilter, setWarningReasonFilter] = useState('')

  const handleDetail = (item: typeof userData[0]) => {
    setSelectedUser(item)
    setDetailDialogOpen(true)
  }

  const handleWarningRecords = (item: typeof userData[0]) => {
    setWarningUser(item)
    setWarningReasonFilter('')
    setWarningDialogOpen(true)
  }

  const handleReset = () => {
    setFilters({
      nickname: '',
      email: '',
      isAbnormal: '',
      accountStatus: '',
      emailSearch: '',
      userId: '',
      phone: '',
    })
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">用户管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {userData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">用户管理</span>
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
              {/* 用户昵称 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户昵称</Label>
                <Input
                  value={filters.nickname}
                  onChange={(e) => setFilters({ ...filters, nickname: e.target.value })}
                  placeholder="用户昵称"
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

              {/* 是否异常用户 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">是否异常用户</Label>
                <Select
                  value={filters.isAbnormal}
                  onValueChange={(value) => setFilters({ ...filters, isAbnormal: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="是否异常用户" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="yes">是</SelectItem>
                    <SelectItem value="no">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 用户状态 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户状态</Label>
                <Select
                  value={filters.accountStatus}
                  onValueChange={(value) => setFilters({ ...filters, accountStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="用户状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="normal">正常</SelectItem>
                    <SelectItem value="suspended">暂停</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 用户id */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户id</Label>
                <Input
                  value={filters.userId}
                  onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                  placeholder="用户id"
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
              <UserCog className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">用户列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[60px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户昵称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">登录方式</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">电子邮件</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">全部品牌</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">疑似异常用户</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">账号状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">最新预警时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((item) => (
                  <TableRow
                    key={item.index}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.index}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                          {item.nickname.charAt(0)}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.nickname}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.userId}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] font-semibold text-[#334155] border border-[#E2E8F0]">
                        {item.loginMethod}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#64748B]">{item.phone}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#94A3B8]">{item.email}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#334155] font-medium">{item.brand}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.isAbnormal === '否'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {item.isAbnormal}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.accountStatus === '正常'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {item.accountStatus}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.latestWarningTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleDetail(item)}
                          className="h-6 px-1.5 text-[11px] text-[#3B82F6] hover:text-[#2563EB] font-medium p-0"
                        >
                          <Eye className="w-3 h-3 mr-0.5" />
                          详情
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleWarningRecords(item)}
                          className="h-6 px-1.5 text-[11px] text-[#3B82F6] hover:text-[#2563EB] font-medium p-0"
                        >
                          <FileText className="w-3 h-3 mr-0.5" />
                          预警记录
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 px-1.5 text-[11px] text-[#F59E0B] hover:text-[#D97706] font-medium p-0"
                        >
                          <AlertTriangle className="w-3 h-3 mr-0.5" />
                          标记为异常用户
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 px-1.5 text-[11px] text-[#EF4444] hover:text-[#DC2626] font-medium p-0"
                        >
                          <Ban className="w-3 h-3 mr-0.5" />
                          暂停
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
                共 <span className="text-[#334155] font-semibold">{userData.length}</span> 条
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

      {/* Warning Records Dialog */}
      <Dialog open={warningDialogOpen} onOpenChange={setWarningDialogOpen}>
        <DialogContent className="sm:max-w-[640px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">预警记录</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">用户: {warningUser?.nickname || ''} (ID: {warningUser?.userId || ''})</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          {/* Filter */}
          <div className="px-7 py-4 border-b border-[#F1F5F9] shrink-0">
            <div className="flex items-center gap-3">
              <Select
                value={warningReasonFilter}
                onValueChange={(value) => setWarningReasonFilter(value === 'all' ? '' : value)}
              >
                <SelectTrigger className="h-9 w-[180px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue placeholder="请选择预警原因" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="设备故障">设备故障</SelectItem>
                  <SelectItem value="库存不足">库存不足</SelectItem>
                  <SelectItem value="交易异常">交易异常</SelectItem>
                  <SelectItem value="账户异常">账户异常</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                <Search className="w-4 h-4 mr-1.5" />
                搜索
              </Button>
              <Button
                variant="outline"
                onClick={() => setWarningReasonFilter('')}
                className="h-9 px-5 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                重置
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-4">
            {warningUser && warningRecordsData[warningUser.userId] && warningRecordsData[warningUser.userId].length > 0 ? (
              <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-center w-[60px]">序号</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">预警原因</TableHead>
                      <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">预警时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warningRecordsData[warningUser.userId]
                      .filter((r) => !warningReasonFilter || r.reason === warningReasonFilter)
                      .map((r) => (
                      <TableRow key={r.index} className="border-b border-[#F1F5F9]">
                        <TableCell className="py-3 text-center">
                          <span className="text-[12px] text-[#334155] font-medium">{r.index}</span>
                        </TableCell>
                        <TableCell className="py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            r.reason === '设备故障'
                              ? 'bg-orange-50 text-[#EA580C] border border-orange-100'
                              : r.reason === '库存不足'
                              ? 'bg-yellow-50 text-[#CA8A04] border border-yellow-100'
                              : r.reason === '交易异常'
                              ? 'bg-red-50 text-[#DC2626] border border-red-100'
                              : 'bg-purple-50 text-[#7C3AED] border border-purple-100'
                          }`}>
                            {r.reason}
                          </span>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#94A3B8]" />
                            <span className="text-[12px] text-[#64748B]">{r.time}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-[#94A3B8] rounded-xl border border-[#F1F5F9] bg-[#F8FAFC]">
                <AlertTriangle className="w-10 h-10 mb-3 text-[#CBD5E1]" />
                <p className="text-[13px]">暂无数据</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#94A3B8]">
                共 <span className="text-[#334155] font-semibold">
                  {warningUser && warningRecordsData[warningUser.userId]
                    ? warningRecordsData[warningUser.userId].filter((r) => !warningReasonFilter || r.reason === warningReasonFilter).length
                    : 0}
                </span> 条
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
        </DialogContent>
      </Dialog>

      {/* User Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[640px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">个人信息</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">用户ID: {selectedUser?.userId || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-6">
            {/* 用户信息 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-[#3B82F6]" />
                <h4 className="text-[14px] font-semibold text-[#111827]">用户信息</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                <div>
                  <p className="text-[11px] text-[#94A3B8] mb-1">用户昵称</p>
                  <p className="text-[13px] font-semibold text-[#111827]">{selectedUser?.nickname || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#94A3B8] mb-1">登录方式</p>
                  <p className="text-[13px] font-semibold text-[#111827]">{selectedUser?.loginMethod || '-'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#94A3B8] mb-1">手机号</p>
                  <p className="text-[13px] font-semibold text-[#111827]">{selectedUser?.phone || '0'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#94A3B8] mb-1">电子邮件</p>
                  <p className="text-[13px] font-semibold text-[#111827]">{selectedUser?.email || '-'}</p>
                </div>
              </div>
            </div>

            {/* 钱包信息 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-4 h-4 text-[#10B981]" />
                <h4 className="text-[14px] font-semibold text-[#111827]">钱包信息</h4>
              </div>
              {selectedUser && walletData[selectedUser.userId] && walletData[selectedUser.userId].length > 0 ? (
                <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-center w-[60px]">序号</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">币种</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">余额</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {walletData[selectedUser.userId].map((w) => (
                        <TableRow key={w.index} className="border-b border-[#F1F5F9]">
                          <TableCell className="py-3 text-center">
                            <span className="text-[12px] text-[#334155] font-medium">{w.index}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            <span className="text-[12px] text-[#334155] font-medium">{w.currency}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            <span className="text-[12px] text-[#059669] font-semibold">{w.balance}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-[#94A3B8] rounded-xl border border-[#F1F5F9] bg-[#F8FAFC]">
                  <Wallet className="w-8 h-8 mb-2 text-[#CBD5E1]" />
                  <p className="text-[13px]">暂无数据</p>
                </div>
              )}
            </div>

            {/* 押金信息 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-[#F59E0B]" />
                <h4 className="text-[14px] font-semibold text-[#111827]">押金信息</h4>
              </div>
              {selectedUser && depositData[selectedUser.userId] && depositData[selectedUser.userId].length > 0 ? (
                <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-center w-[60px]">序号</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">币种</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">押金</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap text-center">状态</TableHead>
                        <TableHead className="text-[11px] font-semibold text-[#64748B] whitespace-nowrap">缴纳时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {depositData[selectedUser.userId].map((d) => (
                        <TableRow key={d.index} className="border-b border-[#F1F5F9]">
                          <TableCell className="py-3 text-center">
                            <span className="text-[12px] text-[#334155] font-medium">{d.index}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            <span className="text-[12px] text-[#334155] font-medium">{d.currency}</span>
                          </TableCell>
                          <TableCell className="py-3">
                            <span className="text-[12px] text-[#D97706] font-semibold">{d.deposit}</span>
                          </TableCell>
                          <TableCell className="py-3 text-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              d.status === '已缴纳'
                                ? 'bg-green-50 text-[#059669] border border-green-100'
                                : 'bg-blue-50 text-[#2563EB] border border-blue-100'
                            }`}>
                              {d.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-[#94A3B8]" />
                              <span className="text-[11px] text-[#64748B]">{d.payTime}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-[#94A3B8] rounded-xl border border-[#F1F5F9] bg-[#F8FAFC]">
                  <Shield className="w-8 h-8 mb-2 text-[#CBD5E1]" />
                  <p className="text-[13px]">暂无数据</p>
                </div>
              )}
            </div>
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
    </>
  )
}
