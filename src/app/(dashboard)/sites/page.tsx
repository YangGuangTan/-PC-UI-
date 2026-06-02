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
  Building2,
  Clock,
  X,
  MapPin,
  User,
  Eye,
  Trash2,
  Plus,
  List,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Store,
  Tag,
  Hash,
  CalendarDays,
  Settings2,
  Wifi,
  WifiOff,
  Undo2,
  Zap,
  Signal,
  Upload,
  Timer,
} from 'lucide-react'

// Mock site data
const siteData = [
  {
    id: 1,
    siteId: '2057694419725529089',
    siteName: 'Dr.EB',
    owner: 'Hem Thavorak',
    siteType: '其他',
    status: '启用',
    joinTime: '2026-05-22 13:25:54',
    location: 'Phnom Penh, Cambodia',
    deviceCount: 3,
    image: 'clinic',
  },
  {
    id: 2,
    siteId: '2050185256560701442',
    siteName: 'Toni',
    owner: '清陈',
    siteType: '酒店',
    status: '启用',
    joinTime: '2026-05-01 20:07:10',
    location: '上海浦东新区',
    deviceCount: 5,
    image: 'hotel',
  },
  {
    id: 3,
    siteId: '2046564504926105602',
    siteName: 'Belyna Spa and salon 310',
    owner: 'Hem Thavorak',
    siteType: '其他',
    status: '启用',
    joinTime: '2026-04-21 20:19:36',
    location: 'Belyna Spa & Salon - 310, Phnom Penh',
    deviceCount: 2,
    image: 'salon',
  },
  {
    id: 4,
    siteId: '2041094501116358657',
    siteName: 'Inspirer Area',
    owner: 'yatchung',
    siteType: '其他',
    status: '启用',
    joinTime: '2026-04-06 18:03:45',
    location: '深圳南山区',
    deviceCount: 4,
    image: 'office',
  },
  {
    id: 5,
    siteId: '2039508708300058626',
    siteName: 'WTZ Poker Room',
    owner: '加州',
    siteType: '其他',
    status: '启用',
    joinTime: '2026-04-02 09:02:23',
    location: '北京朝阳区',
    deviceCount: 1,
    image: 'entertainment',
  },
  {
    id: 6,
    siteId: '2038001234567890123',
    siteName: '星光KTV',
    owner: '李明',
    siteType: '娱乐',
    status: '停用',
    joinTime: '2026-03-15 16:30:00',
    location: '广州天河区',
    deviceCount: 6,
    image: 'ktv',
  },
  {
    id: 7,
    siteId: '2037509876543210987',
    siteName: '海景度假酒店',
    owner: '王芳',
    siteType: '酒店',
    status: '启用',
    joinTime: '2026-03-10 09:15:22',
    location: '三亚海棠湾',
    deviceCount: 8,
    image: 'resort',
  },
  {
    id: 8,
    siteId: '2036005555555555555',
    siteName: '快捷便利店',
    owner: '张伟',
    siteType: '零售',
    status: '停用',
    joinTime: '2026-02-28 14:22:10',
    location: '杭州西湖区',
    deviceCount: 2,
    image: 'store',
  },
]

// Image placeholder colors
const imageColors: Record<string, string> = {
  clinic: 'from-teal-400 to-cyan-500',
  hotel: 'from-amber-400 to-orange-500',
  salon: 'from-pink-400 to-rose-500',
  office: 'from-blue-400 to-indigo-500',
  entertainment: 'from-purple-400 to-violet-500',
  ktv: 'from-fuchsia-400 to-pink-500',
  resort: 'from-cyan-400 to-blue-500',
  store: 'from-emerald-400 to-green-500',
}

const imageIcons: Record<string, string> = {
  clinic: '🏥',
  hotel: '🏨',
  salon: '💆',
  office: '🏢',
  entertainment: '🎮',
  ktv: '🎤',
  resort: '🏖️',
  store: '🏪',
}

export default function SitesPage() {
  const [filters, setFilters] = useState({
    search: '',
    owner: '',
    siteType: '',
  })
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [deviceListDialogOpen, setDeviceListDialogOpen] = useState(false)
  const [billingDialogOpen, setBillingDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [billingTab, setBillingTab] = useState<'22.5w' | '66w'>('22.5w')
  const [selectedSite, setSelectedSite] = useState<typeof siteData[0] | null>(null)

  const handleReset = () => {
    setFilters({ search: '', owner: '', siteType: '' })
  }

  const handleView = (site: typeof siteData[0]) => {
    setSelectedSite(site)
    setDetailDialogOpen(true)
  }

  const handleDeviceList = (site: typeof siteData[0]) => {
    setSelectedSite(site)
    setDeviceListDialogOpen(true)
  }

  const handleBilling = (site: typeof siteData[0]) => {
    setSelectedSite(site)
    setBillingDialogOpen(true)
  }

  const handleDelete = (site: typeof siteData[0]) => {
    setSelectedSite(site)
    setDeleteDialogOpen(true)
  }

  const enabledCount = siteData.filter(s => s.status === '启用').length
  const disabledCount = siteData.filter(s => s.status === '停用').length
  const totalDevices = siteData.reduce((sum, s) => sum + s.deviceCount, 0)

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">网点管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {siteData.length} 个网点
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              {enabledCount} 启用
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-[12px] font-medium text-[#EF4444]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
              {disabledCount} 停用
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
          <span className="text-[#3B82F6] font-medium">网点管理</span>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">网点总数</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">{siteData.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#10B981] font-semibold">● {enabledCount} 启用</span>
              <span className="text-[12px] text-[#EF4444] font-semibold">● {disabledCount} 停用</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">设备总数</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">{totalDevices}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                <Wifi className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#64748B]">平均每网点 {siteData.length > 0 ? (totalDevices / siteData.length).toFixed(1) : 0} 台设备</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">网点类型</p>
                <p className="text-[28px] font-bold text-[#111827] mt-1 tracking-tight">
                  {new Set(siteData.map(s => s.siteType)).size}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200/50">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-[12px] text-[#64748B]">酒店、娱乐、零售、其他</span>
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
              {/* 搜索 */}
              <div className="space-y-2 flex-1 min-w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">搜索</Label>
                <Input
                  placeholder="请输入搜索内容"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 网点所属人 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点所属人</Label>
                <Select
                  value={filters.owner}
                  onValueChange={(value) => setFilters({ ...filters, owner: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点所属人" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Hem Thavorak">Hem Thavorak</SelectItem>
                    <SelectItem value="清陈">清陈</SelectItem>
                    <SelectItem value="yatchung">yatchung</SelectItem>
                    <SelectItem value="加州">加州</SelectItem>
                    <SelectItem value="李明">李明</SelectItem>
                    <SelectItem value="王芳">王芳</SelectItem>
                    <SelectItem value="张伟">张伟</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 网点类型 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">网点类型</Label>
                <Select
                  value={filters.siteType}
                  onValueChange={(value) => setFilters({ ...filters, siteType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="网点类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="酒店">酒店</SelectItem>
                    <SelectItem value="娱乐">娱乐</SelectItem>
                    <SelectItem value="零售">零售</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
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
              <Building2 className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">网点列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {siteData.length}
              </Badge>
            </div>
            <Button
              onClick={() => setAddDialogOpen(true)}
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
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-12">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#CBD5E1] text-[#3B82F6] focus:ring-[#3B82F6]/20 cursor-pointer" />
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点图片</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">所属人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">加入时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {siteData.map((site) => (
                  <TableRow
                    key={site.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#CBD5E1] text-[#3B82F6] focus:ring-[#3B82F6]/20 cursor-pointer" />
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[12px] text-[#64748B] font-mono tracking-tight bg-[#F1F5F9] px-2 py-1 rounded-md">{site.siteId.slice(-8)}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${imageColors[site.image] || 'from-gray-400 to-gray-500'} flex items-center justify-center text-[18px] shadow-md`}>
                        {imageIcons[site.image] || '🏢'}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#334155] font-semibold">{site.siteName}</span>
                        <span className="text-[11px] text-[#94A3B8] mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {site.location}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {site.owner.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{site.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                        site.siteType === '酒店'
                          ? 'bg-amber-50 text-[#D97706] border border-amber-100'
                          : site.siteType === '娱乐'
                            ? 'bg-fuchsia-50 text-[#C026D3] border border-fuchsia-100'
                            : site.siteType === '零售'
                              ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                              : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
                      }`}>
                        {site.siteType}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                        site.status === '启用'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : 'bg-red-50 text-[#DC2626] border border-red-100'
                      }`}>
                        {site.status === '启用' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {site.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#64748B] font-mono">{site.joinTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeviceList(site)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <List className="w-3 h-3 mr-1" />
                          设备列表
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBilling(site)}
                          className="h-7 px-2.5 text-[11px] border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981] hover:text-white hover:border-[#10B981] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <DollarSign className="w-3 h-3 mr-1" />
                          计费规则
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(site)}
                          className="h-7 px-2.5 text-[11px] border-[#64748B]/30 text-[#64748B] hover:bg-[#64748B] hover:text-white hover:border-[#64748B] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          查看
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(site)}
                          className="h-7 px-2.5 text-[11px] border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
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
                共 <span className="text-[#334155] font-semibold">{siteData.length}</span> 条记录
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

      {/* View Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[680px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">网点详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedSite?.siteName || ''}</p>
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
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-200/50">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">基本信息</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Hash className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点ID</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedSite?.siteId || '-'}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Building2 className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点名称</span>
                </div>
                <Input
                  defaultValue={selectedSite?.siteName || ''}
                  className="h-8 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 font-semibold"
                />
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <User className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">所属人</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold">
                    {(selectedSite?.owner || '-').charAt(0).toUpperCase()}
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedSite?.owner || '-'}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点类型</span>
                </div>
                <Select defaultValue={selectedSite?.siteType || '其他'}>
                  <SelectTrigger className="h-8 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="酒店">酒店</SelectItem>
                    <SelectItem value="娱乐">娱乐</SelectItem>
                    <SelectItem value="零售">零售</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <CalendarDays className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">加入时间</span>
                </div>
                <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedSite?.joinTime || '-'}</p>
              </div>
              <div className="col-span-2 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点位置</span>
                </div>
                <Input
                  defaultValue={selectedSite?.location || ''}
                  className="h-8 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 font-semibold"
                />
              </div>
            </div>

            {/* 设备信息 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
                <Wifi className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">设备信息</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Wifi className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">设备总数</span>
                </div>
                <p className="text-[16px] text-[#1E293B] font-bold">{selectedSite?.deviceCount || 0} <span className="text-[12px] text-[#94A3B8] font-normal">台</span></p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100/60 hover:border-emerald-200 transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Signal className="w-3 h-3 text-[#059669]" />
                  <span className="text-[11px] text-[#059669] font-medium uppercase tracking-wider">在线设备</span>
                </div>
                <p className="text-[16px] text-[#059669] font-bold">{selectedSite ? Math.floor(selectedSite.deviceCount * 0.75) : 0} <span className="text-[12px] text-[#059669]/70 font-normal">台</span></p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100/60 hover:border-red-200 transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <WifiOff className="w-3 h-3 text-[#DC2626]" />
                  <span className="text-[11px] text-[#DC2626] font-medium uppercase tracking-wider">离线设备</span>
                </div>
                <p className="text-[16px] text-[#DC2626] font-bold">{selectedSite ? Math.ceil(selectedSite.deviceCount * 0.25) : 0} <span className="text-[12px] text-[#DC2626]/70 font-normal">台</span></p>
              </div>
            </div>

            {/* 营业时间 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/50">
                <Clock className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">营业时间</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">开始时间</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    defaultValue="08:00"
                    className="h-9 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">结束时间</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    defaultValue="22:00"
                    className="h-9 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* 计费规则 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/50">
                <DollarSign className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">计费规则</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">22.5W快充宝</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#94A3B8] w-16 shrink-0">每小时</span>
                    <Input defaultValue="1" className="h-7 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 w-20 text-center font-semibold" />
                    <span className="text-[12px] text-[#64748B]">元</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#94A3B8] w-16 shrink-0">每日封顶</span>
                    <Input defaultValue="10" className="h-7 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 w-20 text-center font-semibold" />
                    <span className="text-[12px] text-[#64748B]">元</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-[#94A3B8]" />
                  <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">66W快充宝</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#94A3B8] w-16 shrink-0">每小时</span>
                    <Input defaultValue="2" className="h-7 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 w-20 text-center font-semibold" />
                    <span className="text-[12px] text-[#64748B]">元</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#94A3B8] w-16 shrink-0">每日封顶</span>
                    <Input defaultValue="20" className="h-7 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 w-20 text-center font-semibold" />
                    <span className="text-[12px] text-[#64748B]">元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 超时订单配置 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200/50">
                <Timer className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">超时订单配置</h4>
            </div>
            <div className="mb-6">
              <Select defaultValue="option1">
                <SelectTrigger className="h-10 text-[13px] border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all duration-200">
                  <SelectValue placeholder="请选择超时订单配置" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="option1">（1）代理人人按正常比例分润</SelectItem>
                  <SelectItem value="option2">（2）押金全归设备所有人，其他代理人不参与</SelectItem>
                  <SelectItem value="option3">（3）充电宝成本归设备所有人，其余按正常比例分成</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 网点图片 */}
            <div className="flex items-center gap-2.5 mb-5 mt-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md shadow-sky-200/50">
                <ImageIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-[14px] font-bold text-[#1E293B]">网点图片</h4>
              <span className="text-[11px] text-[#94A3B8] ml-1">（最多3张）</span>
            </div>
            <div className="mb-4">
              <div className="flex gap-3">
                {/* Image 1 - 已上传示例 */}
                <div className="relative group">
                  <div className={`w-[140px] h-[100px] rounded-xl bg-gradient-to-br ${imageColors[selectedSite?.image || 'office']} flex items-center justify-center text-[28px] shadow-md border border-white/20 overflow-hidden`}>
                    {imageIcons[selectedSite?.image || 'office']}
                  </div>
                  <button className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
                {/* Image 2 - 已上传示例 */}
                <div className="relative group">
                  <div className="w-[140px] h-[100px] rounded-xl bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center text-[28px] shadow-md border border-white/20 overflow-hidden">
                    🏢
                  </div>
                  <button className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
                {/* Image 3 - 上传占位 */}
                <div className="w-[140px] h-[100px] rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group">
                  <Upload className="w-6 h-6 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors duration-200 mb-1" />
                  <span className="text-[11px] text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors duration-200 font-medium">上传图片</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDetailDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setDetailDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Device List Dialog */}
      <Dialog open={deviceListDialogOpen} onOpenChange={setDeviceListDialogOpen}>
        <DialogContent className="sm:max-w-[680px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden max-h-[85vh] flex flex-col">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <List className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">设备列表</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedSite?.siteName || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto custom-scrollbar flex-1 p-6">
            {/* Summary Stats */}
            {selectedSite && (
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3.5 border border-blue-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-sm">
                      <Wifi className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[11px] text-[#64748B] font-medium">设备总数</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#1E293B]">{selectedSite.deviceCount} <span className="text-[12px] text-[#94A3B8] font-normal">台</span></p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3.5 border border-emerald-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-sm">
                      <Zap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[11px] text-[#64748B] font-medium">可租借</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#059669]">{Math.floor(selectedSite.deviceCount * 8 * 0.6)} <span className="text-[12px] text-[#94A3B8] font-normal">个</span></p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3.5 border border-amber-100/60">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-sm">
                      <Undo2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[11px] text-[#64748B] font-medium">可归还</span>
                  </div>
                  <p className="text-[20px] font-bold text-[#D97706]">{Math.floor(selectedSite.deviceCount * 8 * 0.4)} <span className="text-[12px] text-[#94A3B8] font-normal">个</span></p>
                </div>
              </div>
            )}

            {/* Device Cards */}
            {selectedSite && Array.from({ length: selectedSite.deviceCount }, (_, i) => {
              const totalSlots = [6, 8, 10, 6, 8, 12, 8, 10][i % 8]
              const rentable = Math.floor(totalSlots * (0.5 + (i * 0.07) % 0.3))
              const returnable = Math.floor(totalSlots * (0.1 + (i * 0.05) % 0.2))
              const onlineHours = [2, 5, 12, 1, 8, 24, 3, 48][i % 8]
              const lastOnline = new Date(Date.now() - onlineHours * 60 * 60 * 1000)
              const lastOnlineStr = `${lastOnline.getFullYear()}-${String(lastOnline.getMonth() + 1).padStart(2, '0')}-${String(lastOnline.getDate()).padStart(2, '0')} ${String(lastOnline.getHours()).padStart(2, '0')}:${String(lastOnline.getMinutes()).padStart(2, '0')}:${String(lastOnline.getSeconds()).padStart(2, '0')}`
              const isOnline = onlineHours <= 2

              return (
                <div key={i} className="p-4 bg-gradient-to-r from-[#F8FAFC] to-white rounded-xl border border-[#E2E8F0]/60 mb-3 hover:border-[#CBD5E1] hover:shadow-sm transition-all duration-200">
                  {/* Top Row: Device Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md shrink-0">
                      <Wifi className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] text-[#1E293B] font-semibold">BF80Z{selectedSite.siteId.slice(-6)}{String(i + 1).padStart(4, '0')}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          isOnline
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                            : 'bg-amber-50 text-[#D97706] border border-amber-100'
                        }`}>
                          {isOnline ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Signal className="w-2.5 h-2.5" />}
                          {isOnline ? '在线' : '离线'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8] mt-0.5">超级快充机柜 · {totalSlots}口</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      isOnline
                        ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                        : 'bg-red-50 text-[#DC2626] border border-red-100'
                    }`}>
                      {isOnline ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {isOnline ? '运行中' : '已离线'}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-[#E2E8F0] my-3"></div>

                  {/* Bottom Row: Stats */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center">
                        <Zap className="w-3 h-3 text-[#059669]" />
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">可租借</span>
                      <span className="text-[13px] font-bold text-[#059669]">{rentable}</span>
                    </div>
                    <div className="w-px h-4 bg-[#E2E8F0]"></div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
                        <Undo2 className="w-3 h-3 text-[#D97706]" />
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">可归还</span>
                      <span className="text-[13px] font-bold text-[#D97706]">{returnable}</span>
                    </div>
                    <div className="w-px h-4 bg-[#E2E8F0]"></div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center">
                        <Clock className="w-3 h-3 text-[#3B82F6]" />
                      </div>
                      <span className="text-[11px] text-[#94A3B8]">最后上线</span>
                      <span className="text-[12px] font-semibold text-[#3B82F6] font-mono">{lastOnlineStr}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Billing Rules Dialog */}
      <Dialog open={billingDialogOpen} onOpenChange={setBillingDialogOpen}>
        <DialogContent className="sm:max-w-[560px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden max-h-[85vh] flex flex-col">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] to-[#059669]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">计费设置</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">{selectedSite?.siteName || ''}</p>
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
            {/* Tab Switch */}
            <div className="flex items-center bg-[#F1F5F9] rounded-xl p-1 mb-6">
              <button
                onClick={() => setBillingTab('22.5w')}
                className={`flex-1 h-9 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  billingTab === '22.5w'
                    ? 'bg-white text-[#111827] shadow-md shadow-emerald-100/50'
                    : 'text-[#64748B] hover:text-[#334155]'
                }`}
              >
                22.5W快充宝
              </button>
              <button
                onClick={() => setBillingTab('66w')}
                className={`flex-1 h-9 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  billingTab === '66w'
                    ? 'bg-white text-[#111827] shadow-md shadow-emerald-100/50'
                    : 'text-[#64748B] hover:text-[#334155]'
                }`}
              >
                66W快充宝
              </button>
            </div>

            {/* 22.5W Billing Rules */}
            {billingTab === '22.5w' && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[14px] font-bold text-[#1E293B]">22.5W快充宝计费规则</span>
                </div>

                {/* 保证金 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">保证金 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="20"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">$</span>
                  </div>
                </div>

                {/* 每 X 分钟 Y $ */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">每 <span className="text-[#EF4444]">*</span></Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        defaultValue="60"
                        className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">分钟</span>
                    </div>
                    <span className="text-[13px] text-[#94A3B8] font-medium shrink-0">收费</span>
                    <div className="relative flex-1">
                      <Input
                        defaultValue="0.1"
                        className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">$</span>
                    </div>
                  </div>
                </div>

                {/* 免费时长 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">免费时长 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="5"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">分钟</span>
                  </div>
                </div>

                {/* 每天 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">每天 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="6"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium whitespace-nowrap">$封顶</span>
                  </div>
                </div>
              </div>
            )}

            {/* 66W Billing Rules */}
            {billingTab === '66w' && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[14px] font-bold text-[#1E293B]">66W快充宝计费规则</span>
                </div>

                {/* 保证金 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">保证金 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="20"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">$</span>
                  </div>
                </div>

                {/* 每 X 分钟 Y $ */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">每 <span className="text-[#EF4444]">*</span></Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        defaultValue="60"
                        className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">分钟</span>
                    </div>
                    <span className="text-[13px] text-[#94A3B8] font-medium shrink-0">收费</span>
                    <div className="relative flex-1">
                      <Input
                        defaultValue="0.1"
                        className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">$</span>
                    </div>
                  </div>
                </div>

                {/* 免费时长 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">免费时长 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="5"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium">分钟</span>
                  </div>
                </div>

                {/* 每天 */}
                <div className="space-y-2">
                  <Label className="text-[12px] text-[#64748B] font-medium">每天 <span className="text-[#EF4444]">*</span></Label>
                  <div className="relative">
                    <Input
                      defaultValue="6"
                      className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/10 rounded-lg transition-all duration-200 pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] font-medium whitespace-nowrap">$封顶</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="px-7 py-4 border-t border-[#F1F5F9] flex items-center justify-end gap-3 bg-[#F8FAFC]/50 shrink-0">
            <Button
              variant="outline"
              onClick={() => setBillingDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setBillingDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200"
            >
              提交
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-200/50">
                  <Trash2 className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[16px] font-bold text-[#111827]">确认删除</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="px-7 py-6">
            <p className="text-[14px] text-[#64748B]">
              确定要删除网点 <span className="text-[#1E293B] font-semibold">{selectedSite?.siteName}</span> 吗？此操作不可撤销，该网点下的所有设备关联将被解除。
            </p>
          </div>
          <div className="px-7 py-4 border-t border-[#F1F5F9] flex items-center justify-end gap-3 bg-[#F8FAFC]/50">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="h-9 px-5 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              className="h-9 px-5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-red-200/50 transition-all duration-200"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              确认删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Site Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden max-h-[85vh] flex flex-col">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增网点</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称 <span className="text-[#EF4444]">*</span></Label>
                <Input placeholder="请输入网点名称" className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">所属人 <span className="text-[#EF4444]">*</span></Label>
                <Input placeholder="请输入所属人" className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点类型 <span className="text-[#EF4444]">*</span></Label>
                <Select>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择网点类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="酒店">酒店</SelectItem>
                    <SelectItem value="娱乐">娱乐</SelectItem>
                    <SelectItem value="零售">零售</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点位置</Label>
                <Input placeholder="请输入网点位置" className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]" />
              </div>

              {/* 超时订单配置 */}
              <div className="col-span-2 space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">超时订单配置 <span className="text-[#EF4444]">*</span></Label>
                <Select>
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择超时订单配置" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="normal_split">代理人按正常比例分润</SelectItem>
                    <SelectItem value="deposit_to_owner">押金全归设备所有人，其他代理人不参与</SelectItem>
                    <SelectItem value="cost_to_owner">充电宝成本归设备所有人，其余按正常比例分成</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 营业时间 */}
              <div className="col-span-2 space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">营业时间</Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      type="time"
                      defaultValue="08:00"
                      className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                    />
                  </div>
                  <span className="text-[13px] text-[#94A3B8] font-medium shrink-0">至</span>
                  <div className="flex-1">
                    <Input
                      type="time"
                      defaultValue="22:00"
                      className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* 网点图片 - 3张 */}
              <div className="col-span-2 space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点图片 <span className="text-[11px] text-[#94A3B8] font-normal">（最多3张）</span></Label>
                <div className="flex items-start gap-3">
                  {/* Image slot 1 */}
                  <div className="flex-1 border-2 border-dashed border-[#E2E8F0] rounded-xl h-[100px] flex flex-col items-center justify-center hover:border-[#3B82F6]/40 hover:bg-[#F8FAFC] transition-all duration-200 cursor-pointer relative group">
                    <ImageIcon className="w-6 h-6 text-[#CBD5E1] mb-1 group-hover:text-[#3B82F6]/50 transition-colors" />
                    <p className="text-[11px] text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors">上传图片</p>
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#F1F5F9] text-[#94A3B8] text-[10px] font-bold flex items-center justify-center">1</span>
                  </div>
                  {/* Image slot 2 */}
                  <div className="flex-1 border-2 border-dashed border-[#E2E8F0] rounded-xl h-[100px] flex flex-col items-center justify-center hover:border-[#3B82F6]/40 hover:bg-[#F8FAFC] transition-all duration-200 cursor-pointer relative group">
                    <ImageIcon className="w-6 h-6 text-[#CBD5E1] mb-1 group-hover:text-[#3B82F6]/50 transition-colors" />
                    <p className="text-[11px] text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors">上传图片</p>
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#F1F5F9] text-[#94A3B8] text-[10px] font-bold flex items-center justify-center">2</span>
                  </div>
                  {/* Image slot 3 */}
                  <div className="flex-1 border-2 border-dashed border-[#E2E8F0] rounded-xl h-[100px] flex flex-col items-center justify-center hover:border-[#3B82F6]/40 hover:bg-[#F8FAFC] transition-all duration-200 cursor-pointer relative group">
                    <ImageIcon className="w-6 h-6 text-[#CBD5E1] mb-1 group-hover:text-[#3B82F6]/50 transition-colors" />
                    <p className="text-[11px] text-[#CBD5E1] group-hover:text-[#94A3B8] transition-colors">上传图片</p>
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#F1F5F9] text-[#94A3B8] text-[10px] font-bold flex items-center justify-center">3</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#CBD5E1] mt-1">支持 JPG、PNG 格式，每张最大 5MB</p>
              </div>
            </div>
          </div>
          <div className="px-7 py-4 border-t border-[#F1F5F9] flex items-center justify-end gap-3 bg-[#F8FAFC]/50">
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-5 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              确认新增
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
