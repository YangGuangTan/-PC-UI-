'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  Phone,
} from 'lucide-react'

// Mock investment data
const investmentData = [
  {
    id: 1,
    email: '',
    phone: '+79140610669',
    name: 'любзнь да',
    info: 'ццуk',
    createTime: '2024-11-19 18:23:23',
    status: '已登记' as const,
  },
  {
    id: 2,
    email: '1106036508@qq.com',
    phone: '+8618092851579',
    name: '曹慧',
    info: '测试数据',
    createTime: '2024-07-26 11:27:12',
    status: '登记' as const,
  },
]

export default function InvestmentPage() {
  const [phone, setPhone] = useState('')

  const handleReset = () => {
    setPhone('')
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">招商管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {investmentData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">招商管理</span>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Filter Fields */}
          <div className="p-6">
            <div className="flex items-end gap-4 flex-wrap">
              {/* 手机号 */}
              <div className="flex items-center gap-3 w-[240px]">
                <Input
                  placeholder="手机号"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
              <Phone className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">招商列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">邮箱</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">姓名</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">信息</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-4 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.email || '-'}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[12px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2 py-1 rounded-md">
                        {item.phone}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.name}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.info}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {item.status === '已登记' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]">
                          已登记
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#3B82F6] cursor-pointer hover:bg-[#EFF6FF] transition-colors">
                          登记
                        </span>
                      )}
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
                共 <span className="text-[#334155] font-semibold">{investmentData.length}</span> 条
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
