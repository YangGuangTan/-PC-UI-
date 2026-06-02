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
  Mail,
  Clock,
  XCircle,
  CheckCircle2,
  UserCheck,
} from 'lucide-react'

// Mock subscription data
const subscriptionsData = [
  {
    id: 1,
    userId: 'BF80Z82225000003#/pages/login/login',
    userName: 'Tiger',
    account: '',
    email: '',
    operationTime: '2026-03-20 18:25:27',
    status: '已取消',
  },
  {
    id: 2,
    userId: 'BF60Z82225000010#/pages/login/login',
    userName: 'FRED FOO',
    account: '',
    email: '',
    operationTime: '2026-03-19 16:11:09',
    status: '已取消',
  },
  {
    id: 3,
    userId: 'A0724BF00A000026#/pages/login/login',
    userName: '22',
    account: '',
    email: '',
    operationTime: '2026-03-16 18:11:12',
    status: '已取消',
  },
  {
    id: 4,
    userId: '26325BF00A000001#/pages/login/login',
    userName: '张锐',
    account: '',
    email: '',
    operationTime: '2026-03-16 14:54:50',
    status: '已取消',
  },
  {
    id: 5,
    userId: '80524BF00A000092#/pages/login/login',
    userName: 'John Doe',
    account: 'johndoe@email.com',
    email: 'johndoe@email.com',
    operationTime: '2026-03-15 10:30:22',
    status: '已订阅',
  },
  {
    id: 6,
    userId: '52224BF00A000018#/pages/login/login',
    userName: 'Alice Wang',
    account: 'alice@email.com',
    email: 'alice@email.com',
    operationTime: '2026-03-14 09:15:33',
    status: '已订阅',
  },
  {
    id: 7,
    userId: '82224BF00A000129#/pages/login/login',
    userName: 'Bob Li',
    account: '',
    email: '',
    operationTime: '2026-03-13 14:20:45',
    status: '未订阅',
  },
  {
    id: 8,
    userId: '52725BF00B000001#/pages/login/login',
    userName: 'Emma Chen',
    account: 'emma@email.com',
    email: 'emma@email.com',
    operationTime: '2026-03-12 11:05:18',
    status: '已订阅',
  },
  {
    id: 9,
    userId: 'A0724BF00A000030#/pages/login/login',
    userName: 'David Zhang',
    account: '',
    email: '',
    operationTime: '2026-03-11 16:45:00',
    status: '已取消',
  },
  {
    id: 10,
    userId: '26325BF00A000005#/pages/login/login',
    userName: 'Sarah Liu',
    account: 'sarah@email.com',
    email: 'sarah@email.com',
    operationTime: '2026-03-10 08:30:12',
    status: '已订阅',
  },
]

export default function SubscriptionsPage() {
  const [filters, setFilters] = useState({
    account: '',
    email: '',
    status: '',
  })

  const handleReset = () => {
    setFilters({
      account: '',
      email: '',
      status: '',
    })
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">订阅管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {subscriptionsData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">订阅管理</span>
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
              {/* 用户账号 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">用户账号</Label>
                <Input
                  placeholder="用户账号"
                  value={filters.account}
                  onChange={(e) => setFilters({ ...filters, account: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 邮箱地址 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">邮箱地址</Label>
                <Input
                  placeholder="邮箱地址"
                  value={filters.email}
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 订阅状态 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">订阅状态</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({ ...filters, status: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="订阅状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="已订阅">已订阅</SelectItem>
                    <SelectItem value="未订阅">未订阅</SelectItem>
                    <SelectItem value="已取消">已取消</SelectItem>
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
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">订阅列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">用户账号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">邮箱地址</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">操作时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订阅状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionsData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-4 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[12px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2 py-1 rounded-md break-all">
                        {item.userId}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.userName}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.account || '-'}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.email || '-'}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.operationTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.status === '已订阅'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : item.status === '未订阅'
                          ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                          : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {item.status === '已订阅' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : item.status === '未订阅' ? (
                          <UserCheck className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#94A3B8]">
                共 <span className="text-[#334155] font-semibold">{subscriptionsData.length}</span> 条
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-[#64748B]">10条/页</span>
              </div>
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
              <div className="flex items-center gap-1 ml-2">
                <span className="text-[12px] text-[#64748B]">前往</span>
                <Input
                  className="h-8 w-[48px] text-[12px] text-center border-[#E2E8F0] rounded-lg p-0"
                  defaultValue={1}
                />
                <span className="text-[12px] text-[#64748B]">页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
