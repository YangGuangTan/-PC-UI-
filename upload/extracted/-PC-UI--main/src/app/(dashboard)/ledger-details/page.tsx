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
  Receipt,
} from 'lucide-react'

// Mock ledger data
const ledgerData = [
  {
    id: 1,
    orderNo: 'XKTW26050452350515',
    agentId: '1935971074215489537',
    agentName: 'dc_cml',
    currency: 'HKD',
    siteName: '美六',
    siteId: '1936379141126074369',
    shareRatio: 100,
    earnings: 10,
  },
  {
    id: 2,
    orderNo: 'XKTW26050471248537',
    agentId: '2027228960345767937',
    agentName: '妍妍宝贝',
    currency: 'AUD',
    siteName: '震電闪闪',
    siteId: '2027242402259615745',
    shareRatio: 100,
    earnings: 0,
  },
  {
    id: 3,
    orderNo: 'XKTW26050437654988',
    agentId: '1935971074215489537',
    agentName: 'dc_cml',
    currency: 'HKD',
    siteName: '美六',
    siteId: '1936379141126074369',
    shareRatio: 100,
    earnings: 0,
  },
  {
    id: 4,
    orderNo: 'XKTW26042437353369',
    agentId: '1935971074215489537',
    agentName: 'dc_cml',
    currency: 'HKD',
    siteName: '美六',
    siteId: '1936379141126074369',
    shareRatio: 100,
    earnings: 10,
  },
  {
    id: 5,
    orderNo: 'XKTW26042415506841',
    agentId: '1935971074215489537',
    agentName: 'dc_cml',
    currency: 'HKD',
    siteName: '美六',
    siteId: '1936379141126074369',
    shareRatio: 100,
    earnings: 15,
  },
  {
    id: 6,
    orderNo: 'XKTW26042185808076',
    agentId: '1935971074215489537',
    agentName: 'dc_cml',
    currency: 'HKD',
    siteName: '美六',
    siteId: '1936379141126074369',
    shareRatio: 100,
    earnings: 0,
  },
  {
    id: 7,
    orderNo: 'XKTW26041104063692',
    agentId: '2027228960345767937',
    agentName: '妍妍宝贝',
    currency: 'AUD',
    siteName: '震電闪闪',
    siteId: '2027242402259615745',
    shareRatio: 100,
    earnings: 0,
  },
  {
    id: 8,
    orderNo: 'XKTW26041199427481',
    agentId: '2027228960345767937',
    agentName: '妍妍宝贝',
    currency: 'AUD',
    siteName: '震電闪闪',
    siteId: '2027242402259615745',
    shareRatio: 100,
    earnings: 0,
  },
]

export default function LedgerDetailsPage() {
  const [filters, setFilters] = useState({
    orderNo: '',
    agentId: '',
    agentName: '',
    siteId: '',
    siteName: '',
    startDate: '',
    endDate: '',
  })

  const handleReset = () => {
    setFilters({
      orderNo: '',
      agentId: '',
      agentName: '',
      siteId: '',
      siteName: '',
      startDate: '',
      endDate: '',
    })
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">分账明细</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {ledgerData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">分账明细</span>
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
              {/* 订单编号 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">订单编号</Label>
                <Input
                  value={filters.orderNo}
                  onChange={(e) => setFilters({ ...filters, orderNo: e.target.value })}
                  placeholder="订单编号"
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
                    <SelectItem value="dc_cml">dc_cml</SelectItem>
                    <SelectItem value="妍妍宝贝">妍妍宝贝</SelectItem>
                    <SelectItem value="pagumi">pagumi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 网点ID */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点ID</Label>
                <Input
                  value={filters.siteId}
                  onChange={(e) => setFilters({ ...filters, siteId: e.target.value })}
                  placeholder="网点ID"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 网点名称 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
                <Select
                  value={filters.siteName}
                  onValueChange={(value) => setFilters({ ...filters, siteName: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点名称" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="美六">美六</SelectItem>
                    <SelectItem value="震電闪闪">震電闪闪</SelectItem>
                    <SelectItem value="Belyna Spa and salon 310">Belyna Spa and salon 310</SelectItem>
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
              <Receipt className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">分账明细列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-14">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">代理商名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">币种</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">分成比例(%)</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-right">收益金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledgerData.map((item, idx) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-3.5">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#3B82F6] font-mono tracking-tight font-medium hover:text-[#2563EB] cursor-pointer">{item.orderNo}</span>
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
                      <span className="text-[13px] text-[#334155] font-medium">{item.siteName}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.siteId}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155] font-semibold">{item.shareRatio}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-right">
                      <span className={`text-[13px] font-bold font-mono ${item.earnings > 0 ? 'text-[#059669]' : 'text-[#94A3B8]'}`}>{item.earnings.toFixed(2)}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
