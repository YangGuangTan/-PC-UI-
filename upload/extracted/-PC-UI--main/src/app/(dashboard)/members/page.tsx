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
  CreditCard,
  X,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Clock,
  Hash,
  CheckCircle2,
  XCircle,
  Timer,
  Repeat,
  Building2,
  QrCode,
  ScanLine,
  Activity,
} from 'lucide-react'

// Mock member data
const memberData = [
  {
    id: 1,
    cardName: '会员卡',
    bindSite: '123',
    siteId: '1999779212793942018',
    discountDuration: '30分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1999779212793942018',
    usageCount: 0,
  },
  {
    id: 2,
    cardName: 'test',
    bindSite: '测试',
    siteId: '1998289379495972866',
    discountDuration: '30分钟',
    discountCount: 3,
    joinTime: '2025-12-10 11:27:26',
    isActivated: true,
    qrCode: 'MEMBER-1998289379495972866',
    usageCount: 5,
  },
  {
    id: 3,
    cardName: 'jeffrey',
    bindSite: '金紫荆廣場',
    siteId: '1967230529766625282',
    discountDuration: '60分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1967230529766625282',
    usageCount: 0,
  },
  {
    id: 4,
    cardName: 'jeffrey',
    bindSite: '金紫荆廣場',
    siteId: '1967230529766625282',
    discountDuration: '60分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1967230529766625282',
    usageCount: 0,
  },
  {
    id: 5,
    cardName: '11',
    bindSite: 'echo',
    siteId: '1748528268359479298',
    discountDuration: '30分钟',
    discountCount: 1,
    joinTime: '2025-09-10 12:12:28',
    isActivated: true,
    qrCode: 'MEMBER-1748528268359479298',
    usageCount: 3,
  },
  {
    id: 6,
    cardName: 'Coco',
    bindSite: 'Room10F',
    siteId: '1909906928655118337',
    discountDuration: '30分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1909906928655118337',
    usageCount: 0,
  },
  {
    id: 7,
    cardName: 'vip',
    bindSite: '美元ym网点',
    siteId: '1945398914031792129',
    discountDuration: '30分钟',
    discountCount: 1,
    joinTime: '2025-07-16 17:02:14',
    isActivated: true,
    qrCode: 'MEMBER-1945398914031792129',
    usageCount: 8,
  },
  {
    id: 8,
    cardName: 'Jeff1',
    bindSite: 'Test',
    siteId: '1914198455359352834',
    discountDuration: '120分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1914198455359352834',
    usageCount: 0,
  },
  {
    id: 9,
    cardName: '测试',
    bindSite: 'fac测试联系电话',
    siteId: '1815199624886743041',
    discountDuration: '30分钟',
    discountCount: 1,
    joinTime: '',
    isActivated: false,
    qrCode: 'MEMBER-1815199624886743041',
    usageCount: 0,
  },
]

export default function MembersPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    filterType: '',
  })
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof memberData[0] | null>(null)

  const handleReset = () => {
    setFilters({
      keyword: '',
      filterType: '',
    })
  }

  const handleView = (item: typeof memberData[0]) => {
    setSelectedItem(item)
    setViewDialogOpen(true)
  }

  const handleEdit = (item: typeof memberData[0]) => {
    setSelectedItem(item)
    setEditDialogOpen(true)
  }

  const handleAdd = () => {
    setAddDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">会员卡列表</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {memberData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">会员管理</span>
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
              {/* 关键词搜索 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">关键词</Label>
                <Input
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  placeholder="请输入关键词"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                />
              </div>

              {/* 筛选类型 */}
              <div className="space-y-2 w-[170px]">
                <Label className="text-[12px] text-[#64748B] font-medium">筛选类型</Label>
                <Select
                  value={filters.filterType}
                  onValueChange={(value) => setFilters({ ...filters, filterType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点名称" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="会员卡名称">会员卡名称</SelectItem>
                    <SelectItem value="网点名称">网点名称</SelectItem>
                    <SelectItem value="网点ID">网点ID</SelectItem>
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
              <CreditCard className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">会员卡列表</h3>
            </div>
            <Button
              onClick={handleAdd}
              className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              新增
            </Button>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">会员卡名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">绑定网点</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">优惠时长</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">优惠次数</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">入会时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">是否激活</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {item.cardName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{item.cardName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#334155]">{item.bindSite}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.siteId}</span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Timer className="w-3 h-3 text-[#64748B]" />
                        <span className="text-[13px] text-[#334155] font-medium">{item.discountDuration}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Repeat className="w-3 h-3 text-[#64748B]" />
                        <span className="text-[13px] text-[#334155] font-semibold">{item.discountCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      {item.joinTime ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#94A3B8]" />
                          <span className="text-[12px] text-[#64748B]">{item.joinTime}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-[#94A3B8]">未激活</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.isActivated
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : 'bg-gray-50 text-[#64748B] border border-gray-200'
                      }`}>
                        {item.isActivated ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {item.isActivated ? '激活' : '未激活'}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(item)}
                          className="h-7 px-2 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Eye className="w-3 h-3 mr-0.5" />
                          查看
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-7 px-2 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Pencil className="w-3 h-3 mr-0.5" />
                          编辑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 text-[11px] border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Trash2 className="w-3 h-3 mr-0.5" />
                          删除
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

      {/* View Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">会员卡详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedItem?.cardName || ''}</p>
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
                  <CreditCard className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">会员卡名称</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.cardName || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">绑定网点</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.bindSite || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点ID</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.siteId || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">是否激活</span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                  selectedItem?.isActivated
                    ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                    : 'bg-gray-50 text-[#64748B] border border-gray-200'
                }`}>
                  {selectedItem?.isActivated ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {selectedItem?.isActivated ? '激活' : '未激活'}
                </span>
              </div>
            </div>

            {/* 优惠信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <Timer className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">优惠信息</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Timer className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">优惠时长</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.discountDuration || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Repeat className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">优惠次数</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.discountCount || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">入会时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedItem?.joinTime || <span className="text-[#CBD5E1]">未激活</span>}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                <div className="flex items-center gap-1.5 mb-2">
                  <Activity className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">使用次数</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold">{selectedItem?.usageCount ?? 0}<span className="text-[11px] text-[#94A3B8] font-normal ml-1">次</span></p>
              </div>
            </div>

            {/* 二维码信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md shadow-purple-200/50">
                <QrCode className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">二维码</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-[#E2E8F0] to-transparent ml-2"></div>
            </div>
            <div className="flex items-center gap-6 mb-2">
              <div className="w-[140px] h-[140px] rounded-xl border-2 border-dashed border-[#E2E8F0] bg-gradient-to-br from-[#FAFAFE] to-[#F5F3FF] flex items-center justify-center relative overflow-hidden group hover:border-[#8B5CF6]/40 transition-all duration-300">
                <div className="absolute inset-2 rounded-lg bg-white flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-[#8B5CF6]/60" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ScanLine className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">二维码编码</span>
                  </div>
                  <p className="text-[12px] text-[#1E293B] font-semibold font-mono break-all">{selectedItem?.qrCode || '-'}</p>
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">扫描二维码可快速识别会员卡信息，进行绑定或核销操作</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">编辑会员卡</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedItem?.cardName || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">会员卡名称</Label>
              <Input
                defaultValue={selectedItem?.cardName || ''}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">绑定网点</Label>
              <Input
                defaultValue={selectedItem?.bindSite || ''}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">优惠时长</Label>
              <Select defaultValue={selectedItem?.discountDuration || '30分钟'}>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="30分钟">30分钟</SelectItem>
                  <SelectItem value="60分钟">60分钟</SelectItem>
                  <SelectItem value="90分钟">90分钟</SelectItem>
                  <SelectItem value="120分钟">120分钟</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">优惠次数</Label>
              <Input
                type="number"
                defaultValue={selectedItem?.discountCount || 1}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">是否激活</Label>
              <Select defaultValue={selectedItem?.isActivated ? '激活' : '未激活'}>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="激活">激活</SelectItem>
                  <SelectItem value="未激活">未激活</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增会员卡</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">添加新的会员卡配置</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">会员卡名称</Label>
              <Input
                placeholder="请输入会员卡名称"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">绑定网点</Label>
              <Select>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue placeholder="请选择网点" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="123">123</SelectItem>
                  <SelectItem value="测试">测试</SelectItem>
                  <SelectItem value="echo">echo</SelectItem>
                  <SelectItem value="金紫荆廣場">金紫荆廣場</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">优惠时长</Label>
              <Select defaultValue="30分钟">
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="30分钟">30分钟</SelectItem>
                  <SelectItem value="60分钟">60分钟</SelectItem>
                  <SelectItem value="90分钟">90分钟</SelectItem>
                  <SelectItem value="120分钟">120分钟</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">优惠次数</Label>
              <Input
                type="number"
                placeholder="请输入优惠次数"
                defaultValue={1}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">是否激活</Label>
              <Select defaultValue="未激活">
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="激活">激活</SelectItem>
                  <SelectItem value="未激活">未激活</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
