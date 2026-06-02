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
  ClipboardList,
  Clock,
  BatteryCharging,
  FileText,
  X,
  MapPin,
  User,
  CreditCard,
  DollarSign,
  Phone,
  CalendarCheck,
  Wallet,
  Hash,
  Building2,
  Route,
  ArrowLeftRight,
  Cpu,
  Tag,
  Percent,
  PiggyBank,
  RotateCcw as RefundIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

// Mock order data (based on screenshot)
const orderData = [
  {
    id: 1,
    orderNo: 'XKTW26052135173273',
    siteName: 'Belyna Spa and salon 310',
    owner: 'Hem Thavorak',
    deviceId: 'BF80Z31026000002',
    rentTime: '2026-05-21 19:20:54',
    deviceType: '超级快充机柜',
    status: 'TOBEUSE',
    dueAmount: 0,
    paidAmount: 0,
    // Detail fields
    userNickname: 'Heang',
    userPhone: '99555528',
    paymentTime: '',
    paymentMethod: '',
    transactionNo: 'XKTPAY26052138528716',
    returnTime: '',
    siteLocation: 'Belyna Spa & Salon - 310, Phnom Penh',
    returnSite: '',
    deviceSubId: '',
    siteType: '其他',
    returnDeviceId: '',
    billingMethod: '免费时长5分钟,0$/30分钟,每天封顶$0',
    agent: 'Hem Thavorak',
  },
  {
    id: 2,
    orderNo: 'XKTW26052181563648',
    siteName: 'Belyna Spa and salon 310',
    owner: 'Hem Thavorak',
    deviceId: 'BF80Z31026000002',
    rentTime: '2026-05-21 19:20:42',
    deviceType: '超级快充机柜',
    status: '已完成',
    dueAmount: 0,
    paidAmount: 0,
    userNickname: 'Heang',
    userPhone: '99555528',
    paymentTime: '2026-05-21 19:45:10',
    paymentMethod: '微信',
    transactionNo: 'XKTPAY26052138528729',
    returnTime: '2026-05-21 19:45:10',
    siteLocation: 'Belyna Spa & Salon - 310, Phnom Penh',
    returnSite: 'Belyna Spa and salon 310',
    deviceSubId: 'PB002',
    siteType: '其他',
    returnDeviceId: 'BF80Z31026000002',
    billingMethod: '免费时长5分钟,0$/30分钟,每天封顶$0',
    agent: 'Hem Thavorak',
  },
  {
    id: 3,
    orderNo: 'XKTW26050471248537',
    siteName: '震電闪闪',
    owner: '妍妍宝贝',
    deviceId: 'BF80ZB2825000001',
    rentTime: '2026-05-04 10:17:09',
    deviceType: '超级快充机柜',
    status: '已完成',
    dueAmount: 0,
    paidAmount: 0,
    userNickname: '妍妍宝贝',
    userPhone: '138****6789',
    paymentTime: '2026-05-04 11:30:22',
    paymentMethod: '微信',
    transactionNo: 'XKTPAY26050471249888',
    returnTime: '2026-05-04 11:30:22',
    siteLocation: '震電闪闪 - 北京朝阳',
    returnSite: '震電闪闪',
    deviceSubId: 'PB005',
    siteType: '餐饮',
    returnDeviceId: 'BF80ZB2825000001',
    billingMethod: '免费时长5分钟,1$/30分钟,每天封顶$10',
    agent: '妍妍宝贝',
  },
  {
    id: 4,
    orderNo: 'XKTW26050452350515',
    siteName: '美六',
    owner: 'dc_cml',
    deviceId: '01624BF00A000003',
    rentTime: '2026-05-04 01:16:42',
    deviceType: '超级快充机柜',
    status: '已完成',
    dueAmount: 10,
    paidAmount: 10,
    userNickname: 'dc_cml',
    userPhone: '156****2345',
    paymentTime: '2026-05-04 03:20:15',
    paymentMethod: '支付宝',
    transactionNo: 'XKTPAY26050452351678',
    returnTime: '2026-05-04 03:20:15',
    siteLocation: '美六 - 上海浦东',
    returnSite: '美六',
    deviceSubId: 'PB008',
    siteType: '商场',
    returnDeviceId: '01624BF00A000003',
    billingMethod: '免费时长5分钟,2$/30分钟,每天封顶$20',
    agent: 'dc_cml',
  },
  {
    id: 5,
    orderNo: 'XKTW26050437654988',
    siteName: '美六',
    owner: 'dc_cml',
    deviceId: '01624BF00A000003',
    rentTime: '2026-05-04 00:20:20',
    deviceType: '超级快充机柜',
    status: '已完成',
    dueAmount: 0,
    paidAmount: 0,
    userNickname: 'dc_cml',
    userPhone: '156****2345',
    paymentTime: '2026-05-04 00:55:33',
    paymentMethod: '微信',
    transactionNo: 'XKTPAY26050437655102',
    returnTime: '2026-05-04 00:55:33',
    siteLocation: '美六 - 上海浦东',
    returnSite: '美六',
    deviceSubId: 'PB003',
    siteType: '商场',
    returnDeviceId: '01624BF00A000003',
    billingMethod: '免费时长5分钟,2$/30分钟,每天封顶$20',
    agent: 'dc_cml',
  },
  {
    id: 6,
    orderNo: 'XKTW26043075906150',
    siteName: 'Belyna Spa and salon 310',
    owner: 'Hem Thavorak',
    deviceId: 'BF80Z31026000002',
    rentTime: '2026-04-30 14:59:22',
    deviceType: '超级快充机柜',
    status: '已完成',
    dueAmount: 0,
    paidAmount: 0,
    userNickname: 'Heang',
    userPhone: '99555528',
    paymentTime: '2026-04-30 15:30:18',
    paymentMethod: '现金',
    transactionNo: 'XKTPAY26043075907234',
    returnTime: '2026-04-30 15:30:18',
    siteLocation: 'Belyna Spa & Salon - 310, Phnom Penh',
    returnSite: 'Belyna Spa and salon 310',
    deviceSubId: 'PB001',
    siteType: '其他',
    returnDeviceId: 'BF80Z31026000002',
    billingMethod: '免费时长5分钟,0$/30分钟,每天封顶$0',
    agent: 'Hem Thavorak',
  },
]

export default function OrdersPage() {
  const [filters, setFilters] = useState({
    siteId: '',
    orderStatus: '',
    deviceId: '',
    transactionNo: '',
    rentStartTime: '',
    rentEndTime: '',
    siteOwner: '',
    siteName: '',
    orderNo: '',
    powerBankId: '',
    returnStartTime: '',
    returnEndTime: '',
    paymentMethod: '',
    deviceType: '',
    userNickname: '',
    userPhone: '',
  })
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof orderData[0] | null>(null)
  const [refundAmount, setRefundAmount] = useState('')

  const handleReset = () => {
    setFilters({
      siteId: '',
      orderStatus: '',
      deviceId: '',
      transactionNo: '',
      rentStartTime: '',
      rentEndTime: '',
      siteOwner: '',
      siteName: '',
      orderNo: '',
      powerBankId: '',
      returnStartTime: '',
      returnEndTime: '',
      paymentMethod: '',
      deviceType: '',
      userNickname: '',
      userPhone: '',
    })
  }

  const handleOpenDetail = (order: typeof orderData[0]) => {
    setSelectedOrder(order)
    setDetailDialogOpen(true)
  }

  const handleOpenLog = (order: typeof orderData[0]) => {
    setSelectedOrder(order)
    setLogDialogOpen(true)
  }

  const completedCount = orderData.filter(d => d.status === '已完成').length
  const tobeuseCount = orderData.filter(d => d.status === 'TOBEUSE').length

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">订单列表</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {orderData.length} 条记录
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[12px] font-medium text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              {completedCount} 已完成
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-[12px] font-medium text-[#64748B]">
              {tobeuseCount} 待使用
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
          <span className="text-[#3B82F6] font-medium">订单列表</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-4">
              {/* Row 1 */}
              {/* 网点ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点ID</Label>
                <Input
                  placeholder="网点ID"
                  value={filters.siteId}
                  onChange={(e) => setFilters({ ...filters, siteId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 订单状态 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">订单状态</Label>
                <Select
                  value={filters.orderStatus}
                  onValueChange={(value) => setFilters({ ...filters, orderStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="订单状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="TOBEUSE">TOBEUSE</SelectItem>
                    <SelectItem value="已完成">已完成</SelectItem>
                    <SelectItem value="已取消">已取消</SelectItem>
                    <SelectItem value="退款中">退款中</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 设备ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备ID</Label>
                <Input
                  placeholder="设备ID"
                  value={filters.deviceId}
                  onChange={(e) => setFilters({ ...filters, deviceId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 交易单号 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">交易单号</Label>
                <Input
                  placeholder="交易单号"
                  value={filters.transactionNo}
                  onChange={(e) => setFilters({ ...filters, transactionNo: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 租借时间 - 开始 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">租借开始时间</Label>
                <Input
                  type="datetime-local"
                  value={filters.rentStartTime}
                  onChange={(e) => setFilters({ ...filters, rentStartTime: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 租借时间 - 结束 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">租借结束时间</Label>
                <Input
                  type="datetime-local"
                  value={filters.rentEndTime}
                  onChange={(e) => setFilters({ ...filters, rentEndTime: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Row 2 */}
              {/* 网点所属人 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点所属人</Label>
                <Input
                  placeholder="网点所属人"
                  value={filters.siteOwner}
                  onChange={(e) => setFilters({ ...filters, siteOwner: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 网点名称 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">网点名称</Label>
                <Input
                  placeholder="网点名称"
                  value={filters.siteName}
                  onChange={(e) => setFilters({ ...filters, siteName: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 订单号 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">订单号</Label>
                <Input
                  placeholder="订单号"
                  value={filters.orderNo}
                  onChange={(e) => setFilters({ ...filters, orderNo: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 充电宝ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">充电宝ID</Label>
                <Input
                  placeholder="充电宝ID"
                  value={filters.powerBankId}
                  onChange={(e) => setFilters({ ...filters, powerBankId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 归还时间 - 开始 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">归还开始时间</Label>
                <Input
                  type="datetime-local"
                  value={filters.returnStartTime}
                  onChange={(e) => setFilters({ ...filters, returnStartTime: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 归还时间 - 结束 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">归还结束时间</Label>
                <Input
                  type="datetime-local"
                  value={filters.returnEndTime}
                  onChange={(e) => setFilters({ ...filters, returnEndTime: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Row 3 */}
              {/* 支付方式 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">支付方式</Label>
                <Select
                  value={filters.paymentMethod}
                  onValueChange={(value) => setFilters({ ...filters, paymentMethod: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="支付方式" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="微信">微信</SelectItem>
                    <SelectItem value="支付宝">支付宝</SelectItem>
                    <SelectItem value="现金">现金</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 设备类型 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备类型</Label>
                <Select
                  value={filters.deviceType}
                  onValueChange={(value) => setFilters({ ...filters, deviceType: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="设备类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="超级快充机柜">超级快充机柜</SelectItem>
                    <SelectItem value="六口超级快充机柜">六口超级快充机柜</SelectItem>
                    <SelectItem value="普通充电机柜">普通充电机柜</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 用户昵称 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">用户昵称</Label>
                <Input
                  placeholder="用户昵称"
                  value={filters.userNickname}
                  onChange={(e) => setFilters({ ...filters, userNickname: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 用户手机号 */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">用户手机号</Label>
                <Input
                  placeholder="用户手机号"
                  value={filters.userPhone}
                  onChange={(e) => setFilters({ ...filters, userPhone: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-[#F1F5F9]">
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

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">订单列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {orderData.length}
              </Badge>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">网点名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">所属人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">租借时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">订单状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">应付金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">实付</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.map((order, idx) => (
                  <TableRow
                    key={order.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="text-center py-4">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight font-medium">{order.orderNo}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                        <span className="text-[13px] text-[#334155] truncate max-w-[180px]">{order.siteName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                          {order.owner.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{order.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                        {order.deviceId}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[13px] text-[#64748B]">{order.rentTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                          <BatteryCharging className="w-4 h-4 text-[#3B82F6]" />
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{order.deviceType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                        order.status === '已完成'
                          ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                          : order.status === 'TOBEUSE'
                            ? 'bg-gray-100 text-[#64748B] border border-gray-200'
                            : order.status === '已取消'
                              ? 'bg-red-50 text-[#DC2626] border border-red-100'
                              : 'bg-amber-50 text-[#D97706] border border-amber-100'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="text-[13px] text-[#334155] font-semibold">{order.dueAmount}</span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className={`text-[13px] font-semibold ${order.paidAmount > 0 ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                        {order.paidAmount > 0 ? `¥${order.paidAmount}` : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetail(order)}
                          className="h-7 px-2.5 text-[12px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          详情
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenLog(order)}
                          className="h-7 px-2.5 text-[12px] border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          操作日志
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
                共 <span className="text-[#334155] font-semibold">{orderData.length}</span> 条记录
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

      {/* Order Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={(open) => { setDetailDialogOpen(open); if (!open) setRefundAmount('') }}>
        <DialogContent className="sm:max-w-[800px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[88vh] flex flex-col">
          {/* Header with gradient accent */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <ClipboardList className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">订单详情</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5 font-mono">{selectedOrder?.orderNo || ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                  selectedOrder?.status === '已完成'
                    ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                    : selectedOrder?.status === 'TOBEUSE'
                      ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                      : selectedOrder?.status === '已取消'
                        ? 'bg-red-50 text-[#DC2626] border border-red-100'
                        : 'bg-amber-50 text-[#D97706] border border-amber-100'
                }`}>
                  {selectedOrder?.status === '已完成' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {selectedOrder?.status === 'TOBEUSE' && <AlertCircle className="w-3.5 h-3.5" />}
                  {selectedOrder?.status}
                </span>
                <DialogClose asChild>
                  <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                    <X className="w-4 h-4 text-[#64748B]" />
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1">
            {/* 用户信息 Section */}
            <div className="px-7 pt-6 pb-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-200/50">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B]">用户信息</h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <User className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">用户昵称</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.userNickname || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Phone className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">手机号</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.userPhone || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CalendarCheck className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">支付时间</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.paymentTime || '-'}</p>
                </div>
              </div>
            </div>

            <div className="mx-7 border-t border-dashed border-[#E2E8F0]"></div>

            {/* 订单信息 Section */}
            <div className="px-7 pt-5 pb-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md shadow-blue-200/50">
                  <ClipboardList className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B]">订单信息</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Hash className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">订单编号</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono leading-tight break-all">{selectedOrder?.orderNo || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Wallet className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">支付方式</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.paymentMethod || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CreditCard className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">交易单号</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono leading-tight break-all">{selectedOrder?.transactionNo || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">创建时间</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.rentTime || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">实际金额</span>
                  </div>
                  <p className={`text-[16px] font-bold ${selectedOrder?.paidAmount ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                    {selectedOrder?.paidAmount ? `¥${selectedOrder.paidAmount}` : '¥0'}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <DollarSign className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">应付金额</span>
                  </div>
                  <p className="text-[16px] font-bold text-[#1E293B]">
                    ¥{selectedOrder?.dueAmount ?? 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">子宝归还时间</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.returnTime || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">订单状态</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                    selectedOrder?.status === '已完成'
                      ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                      : selectedOrder?.status === 'TOBEUSE'
                        ? 'bg-blue-50 text-[#2563EB] border border-blue-100'
                        : selectedOrder?.status === '已取消'
                          ? 'bg-red-50 text-[#DC2626] border border-red-100'
                          : 'bg-amber-50 text-[#D97706] border border-amber-100'
                  }`}>
                    {selectedOrder?.status === '已完成' && <CheckCircle2 className="w-3 h-3" />}
                    {selectedOrder?.status === 'TOBEUSE' && <AlertCircle className="w-3 h-3" />}
                    {selectedOrder?.status || '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-7 border-t border-dashed border-[#E2E8F0]"></div>

            {/* 网点和设备 Section */}
            <div className="px-7 pt-5 pb-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200/50">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B]">网点和设备</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Building2 className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点名称</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.siteName || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Route className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点位置</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold truncate" title={selectedOrder?.siteLocation || ''}>{selectedOrder?.siteLocation || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">归还网点</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.returnSite || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cpu className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">设备子ID</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.deviceSubId || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">网点类型</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.siteType || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BatteryCharging className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">借出设备ID</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.deviceId || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <ArrowLeftRight className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">归还设备ID</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold font-mono">{selectedOrder?.returnDeviceId || '-'}</p>
                </div>
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BatteryCharging className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">设备类型</span>
                  </div>
                  <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.deviceType || '-'}</p>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Percent className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">计费方式</span>
                  </div>
                  <p className="text-[13px] text-[#1E293B] font-semibold">{selectedOrder?.billingMethod || '-'}</p>
                </div>
              </div>
            </div>

            <div className="mx-7 border-t border-dashed border-[#E2E8F0]"></div>

            {/* 分成信息 Section */}
            <div className="px-7 pt-5 pb-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/50">
                  <PiggyBank className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B]">分成信息</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl p-4 border border-[#E2E8F0]/60 hover:border-[#CBD5E1] transition-colors duration-200">
                  <div className="flex items-center gap-1.5 mb-2">
                    <User className="w-3 h-3 text-[#94A3B8]" />
                    <span className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider">一级代理商</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[9px] font-bold">
                      {(selectedOrder?.agent || '-').charAt(0).toUpperCase()}
                    </div>
                    <p className="text-[14px] text-[#1E293B] font-semibold">{selectedOrder?.agent || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-7 border-t border-dashed border-[#E2E8F0]"></div>

            {/* 操作 Section - 退款 */}
            <div className="px-7 pt-5 pb-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-200/50">
                  <RefundIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <h4 className="text-[14px] font-bold text-[#1E293B]">操作</h4>
              </div>
              <div className="bg-gradient-to-r from-red-50/50 to-orange-50/50 rounded-xl p-5 border border-red-100/60">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0">
                    <DollarSign className="w-4 h-4 text-[#EF4444]" />
                    <span className="text-[13px] text-[#64748B] font-medium">退款</span>
                  </div>
                  <Input
                    placeholder="请输入退款金额"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    className="h-9 w-52 text-[13px] border-[#E2E8F0] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                  />
                  <Button
                    className="h-9 px-6 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-red-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-red-300/50 disabled:opacity-50 disabled:shadow-none"
                    disabled={!refundAmount}
                  >
                    <RefundIcon className="w-3.5 h-3.5 mr-1.5" />
                    退款
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Operation Log Dialog */}
      <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
        <DialogContent className="sm:max-w-[540px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
          <DialogHeader className="px-6 py-5 border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[16px] font-bold text-[#111827] tracking-tight">操作日志</DialogTitle>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-6 py-6">
            <div className="mb-4">
              <span className="text-[12px] text-[#94A3B8] font-medium">订单编号：</span>
              <span className="text-[13px] text-[#334155] font-mono font-semibold">{selectedOrder?.orderNo || '-'}</span>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 space-y-6">
              {/* Timeline line */}
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-[#E2E8F0]"></div>

              {/* Log entry 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-[18px] h-[18px] rounded-full bg-[#3B82F6] flex items-center justify-center ring-4 ring-[#EFF6FF]">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-[#334155] font-semibold">订单创建</span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">{selectedOrder?.rentTime || '-'}</span>
                  </div>
                  <p className="text-[12px] text-[#64748B]">用户发起租借，订单状态初始化</p>
                </div>
              </div>

              {/* Log entry 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-1 w-[18px] h-[18px] rounded-full bg-[#10B981] flex items-center justify-center ring-4 ring-emerald-50">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-[#334155] font-semibold">充电宝弹出</span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">{selectedOrder?.rentTime || '-'}</span>
                  </div>
                  <p className="text-[12px] text-[#64748B]">设备弹出充电宝，租借开始</p>
                </div>
              </div>

              {/* Log entry 3 */}
              <div className="relative">
                <div className={`absolute -left-6 top-1 w-[18px] h-[18px] rounded-full flex items-center justify-center ring-4 ${
                  selectedOrder?.status === '已完成'
                    ? 'bg-[#10B981] ring-emerald-50'
                    : 'bg-[#94A3B8] ring-gray-50'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#F1F5F9]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[13px] text-[#334155] font-semibold">
                      {selectedOrder?.status === '已完成' ? '归还完成' : '等待归还'}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] font-mono">
                      {selectedOrder?.status === '已完成' ? selectedOrder.rentTime : '待处理'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#64748B]">
                    {selectedOrder?.status === '已完成'
                      ? '充电宝已归还，订单完成结算'
                      : '充电宝尚未归还，订单进行中'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
