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
  GitBranch,
  Clock,
  Plus,
  Pencil,
  Trash2,
  X,
  ExternalLink,
} from 'lucide-react'

// Mock data
const versionData = [
  {
    index: 1,
    versionId: '2054134171689537538',
    appType: '用户端',
    versionNo: '1229',
    description: '1.优化登录操作；2.短信限流',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/user.apk',
    systemType: 'Android',
    forceUpdate: '是',
    createTime: '2026-05-12 17:38:45',
  },
  {
    index: 2,
    versionId: '2054134171689537537',
    appType: '代理端',
    versionNo: '1228',
    description: '1.修复设备扫码异常；2.优化提现流程',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/agent.apk',
    systemType: 'Android',
    forceUpdate: '否',
    createTime: '2026-05-10 14:22:18',
  },
  {
    index: 3,
    versionId: '2054134171689537536',
    appType: '用户端',
    versionNo: '1227',
    description: '1.新增优惠券功能；2.修复支付异常',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/user_ios.ipa',
    systemType: 'iOS',
    forceUpdate: '否',
    createTime: '2026-05-08 09:15:33',
  },
  {
    index: 4,
    versionId: '2054134171689537535',
    appType: '代理端',
    versionNo: '1226',
    description: '1.优化网点管理；2.新增数据导出功能',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/agent.apk',
    systemType: 'Android',
    forceUpdate: '是',
    createTime: '2026-05-05 11:48:27',
  },
  {
    index: 5,
    versionId: '2054134171689537534',
    appType: '用户端',
    versionNo: '1225',
    description: '1.优化充电宝租借流程；2.修复地图定位偏差',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/user.apk',
    systemType: 'Android',
    forceUpdate: '否',
    createTime: '2026-05-02 16:30:09',
  },
  {
    index: 6,
    versionId: '2054134171689537533',
    appType: '用户端',
    versionNo: '1224',
    description: '1.新增Apple登录方式；2.优化UI界面',
    downloadUrl: 'https://app.baofengcharge.com/manager/static/user_ios.ipa',
    systemType: 'iOS',
    forceUpdate: '否',
    createTime: '2026-04-28 10:05:44',
  },
]

export default function VersionManagementPage() {
  const [filters, setFilters] = useState({
    forceUpdate: '',
    appType: '',
  })

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<typeof versionData[0] | null>(null)

  const [formData, setFormData] = useState({
    appType: '',
    versionNo: '',
    description: '',
    downloadUrl: '',
    systemType: '',
    forceUpdate: '',
  })

  const handleReset = () => {
    setFilters({ forceUpdate: '', appType: '' })
  }

  const handleEdit = (item: typeof versionData[0]) => {
    setSelectedVersion(item)
    setFormData({
      appType: item.appType,
      versionNo: item.versionNo,
      description: item.description,
      downloadUrl: item.downloadUrl,
      systemType: item.systemType,
      forceUpdate: item.forceUpdate,
    })
    setEditDialogOpen(true)
  }

  const handleDelete = (item: typeof versionData[0]) => {
    setSelectedVersion(item)
    setDeleteDialogOpen(true)
  }

  const handleAdd = () => {
    setFormData({
      appType: '',
      versionNo: '',
      description: '',
      downloadUrl: '',
      systemType: '',
      forceUpdate: '',
    })
    setAddDialogOpen(true)
  }

  const filteredData = versionData.filter((item) => {
    if (filters.forceUpdate && item.forceUpdate !== filters.forceUpdate) return false
    if (filters.appType && item.appType !== filters.appType) return false
    return true
  })

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">版本管理</h1>
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
          <span className="text-[#3B82F6] font-medium">版本管理</span>
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
              {/* 是否强制更新 */}
              <div className="space-y-2 w-[160px]">
                <Label className="text-[12px] text-[#64748B] font-medium">是否强制更新</Label>
                <Select
                  value={filters.forceUpdate}
                  onValueChange={(value) => setFilters({ ...filters, forceUpdate: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="是否强制更新" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 版本类型 */}
              <div className="space-y-2 w-[160px]">
                <Label className="text-[12px] text-[#64748B] font-medium">版本类型</Label>
                <Select
                  value={filters.appType}
                  onValueChange={(value) => setFilters({ ...filters, appType: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="版本类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="用户端">用户端</SelectItem>
                    <SelectItem value="代理端">代理端</SelectItem>
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
                <Button
                  onClick={handleAdd}
                  className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-green-200/50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新增
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
              <GitBranch className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">版本列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[50px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">版本id</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">app类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">版本号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">版本描述</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">版本下载列表</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">系统类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">是否强制更新</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建时间</TableHead>
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
                      <span className="text-[11px] text-[#64748B] font-mono tracking-tight">{item.versionId}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        item.appType === '用户端'
                          ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                          : 'bg-purple-50 text-[#7C3AED] border border-purple-100'
                      }`}>
                        {item.appType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[13px] text-[#334155] font-semibold">{item.versionNo}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] max-w-[200px] block leading-relaxed">{item.description}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#3B82F6] hover:text-[#2563EB] hover:underline font-medium max-w-[220px] truncate"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.downloadUrl}</span>
                      </a>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        item.systemType === 'Android'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : 'bg-gray-50 text-[#334155] border border-gray-200'
                      }`}>
                        {item.systemType}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.forceUpdate === '是'
                          ? 'bg-red-50 text-[#DC2626] border border-red-100'
                          : 'bg-green-50 text-[#059669] border border-green-100'
                      }`}>
                        {item.forceUpdate}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8] shrink-0" />
                        <span className="text-[12px] text-[#64748B] whitespace-nowrap">{item.createTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-6 px-1.5 text-[11px] text-[#3B82F6] hover:text-[#2563EB] font-medium p-0"
                        >
                          <Pencil className="w-3 h-3 mr-0.5" />
                          编辑
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleDelete(item)}
                          className="h-6 px-1.5 text-[11px] text-[#EF4444] hover:text-[#DC2626] font-medium p-0"
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

      {/* Add Version Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[540px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] to-[#059669]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-lg shadow-green-200/50">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增版本</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">App类型</Label>
                <Select value={formData.appType} onValueChange={(v) => setFormData({ ...formData, appType: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择App类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="用户端">用户端</SelectItem>
                    <SelectItem value="代理端">代理端</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">版本号</Label>
                <Input
                  value={formData.versionNo}
                  onChange={(e) => setFormData({ ...formData, versionNo: e.target.value })}
                  placeholder="请输入版本号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">系统类型</Label>
                <Select value={formData.systemType} onValueChange={(v) => setFormData({ ...formData, systemType: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择系统类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">是否强制更新</Label>
                <Select value={formData.forceUpdate} onValueChange={(v) => setFormData({ ...formData, forceUpdate: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="是否强制更新" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">版本描述</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请输入版本描述"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">版本下载链接</Label>
              <Input
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                placeholder="请输入版本下载链接"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>
          </div>

          <DialogFooter className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-green-200/50 transition-all duration-200"
            >
              确认新增
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Version Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[540px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">编辑版本</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">App类型</Label>
                <Select value={formData.appType} onValueChange={(v) => setFormData({ ...formData, appType: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择App类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="用户端">用户端</SelectItem>
                    <SelectItem value="代理端">代理端</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">版本号</Label>
                <Input
                  value={formData.versionNo}
                  onChange={(e) => setFormData({ ...formData, versionNo: e.target.value })}
                  placeholder="请输入版本号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">系统类型</Label>
                <Select value={formData.systemType} onValueChange={(v) => setFormData({ ...formData, systemType: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择系统类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="iOS">iOS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">是否强制更新</Label>
                <Select value={formData.forceUpdate} onValueChange={(v) => setFormData({ ...formData, forceUpdate: v })}>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="是否强制更新" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="是">是</SelectItem>
                    <SelectItem value="否">否</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">版本描述</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请输入版本描述"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">版本下载链接</Label>
              <Input
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                placeholder="请输入版本下载链接"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>
          </div>

          <DialogFooter className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
            >
              确认编辑
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#EF4444] to-[#DC2626]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center shadow-lg shadow-red-200/50">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">确认删除</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-6">
            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
              <p className="text-[13px] text-[#991B1B] leading-relaxed">
                确定要删除版本 <span className="font-semibold">{selectedVersion?.versionNo || ''}</span>（{selectedVersion?.appType || ''} - {selectedVersion?.systemType || ''}）吗？此操作不可恢复。
              </p>
            </div>
          </div>

          <DialogFooter className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-red-200/50 transition-all duration-200"
            >
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
