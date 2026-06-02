'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
  WifiOff,
  BatteryCharging,
  Activity,
  HardDrive,
  Package,
  Trash2,
  Settings,
} from 'lucide-react'

// Mock warehouse device data (based on screenshot)
const warehouseData = [
  {
    id: 1,
    deviceId: 'BF80Z52726000001',
    status: '离线',
    deviceType: '超级快充机柜',
    batchNo: '2026052701',
    batchStatus: '库存',
  },
  {
    id: 2,
    deviceId: 'BF80Z50626000003',
    status: '离线',
    deviceType: '超级快充机柜',
    batchNo: '2026050601',
    batchStatus: '库存',
  },
  {
    id: 3,
    deviceId: 'BF80Z50626000002',
    status: '离线',
    deviceType: '超级快充机柜',
    batchNo: '2026050601',
    batchStatus: '库存',
  },
  {
    id: 4,
    deviceId: 'BF80Z50626000001',
    status: '离线',
    deviceType: '超级快充机柜',
    batchNo: '2026050601',
    batchStatus: '库存',
  },
  {
    id: 5,
    deviceId: 'BF60Z33126000009',
    status: '离线',
    deviceType: '六口超级快充机柜',
    batchNo: '2026033101',
    batchStatus: '库存',
  },
  {
    id: 6,
    deviceId: 'BF60Z33126000008',
    status: '离线',
    deviceType: '六口超级快充机柜',
    batchNo: '2026033101',
    batchStatus: '库存',
  },
  {
    id: 7,
    deviceId: 'BF60Z33126000007',
    status: '离线',
    deviceType: '六口超级快充机柜',
    batchNo: '2026033101',
    batchStatus: '库存',
  },
  {
    id: 8,
    deviceId: 'BF60Z33126000006',
    status: '离线',
    deviceType: '六口超级快充机柜',
    batchNo: '2026033101',
    batchStatus: '库存',
  },
  {
    id: 9,
    deviceId: 'BF60Z33126000005',
    status: '离线',
    deviceType: '六口超级快充机柜',
    batchNo: '2026033101',
    batchStatus: '库存',
  },
]

export default function WarehousePage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [filters, setFilters] = useState({
    deviceId: '',
    batchNo: '',
    deviceType: '',
    batchStatus: '',
    deviceStatus: '',
  })

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedRows.length === warehouseData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(warehouseData.map(d => d.id))
    }
  }

  const handleReset = () => {
    setFilters({
      deviceId: '',
      batchNo: '',
      deviceType: '',
      batchStatus: '',
      deviceStatus: '',
    })
  }

  const offlineCount = warehouseData.filter(d => d.status === '离线').length

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">设备仓库</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {warehouseData.length} 条记录
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-[12px] font-medium text-[#EF4444]">
              {offlineCount} 离线
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
          <span className="text-[#3B82F6] font-medium">设备仓库</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-5 gap-y-4">
              {/* Device ID */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备ID</Label>
                <Input
                  placeholder="设备ID"
                  value={filters.deviceId}
                  onChange={(e) => setFilters({ ...filters, deviceId: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Production Batch */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">生产批次</Label>
                <Input
                  placeholder="生产批次"
                  value={filters.batchNo}
                  onChange={(e) => setFilters({ ...filters, batchNo: e.target.value })}
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* Device Type */}
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

              {/* Batch Status */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">批次状态</Label>
                <Select
                  value={filters.batchStatus}
                  onValueChange={(value) => setFilters({ ...filters, batchStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="批次状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="库存">库存</SelectItem>
                    <SelectItem value="在用">在用</SelectItem>
                    <SelectItem value="维修中">维修中</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Device Status */}
              <div className="space-y-2">
                <Label className="text-[12px] text-[#64748B] font-medium">设备状态</Label>
                <Select
                  value={filters.deviceStatus}
                  onValueChange={(value) => setFilters({ ...filters, deviceStatus: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="设备状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="在线">在线</SelectItem>
                    <SelectItem value="离线">离线</SelectItem>
                  </SelectContent>
                </Select>
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
              <Package className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">仓库设备列表</h3>
              <Badge variant="secondary" className="text-[11px] font-semibold bg-[#F1F5F9] text-[#64748B] hover:bg-[#F1F5F9] rounded-md px-2">
                {warehouseData.length}
              </Badge>
              {selectedRows.length > 0 && (
                <Badge className="text-[11px] font-semibold bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#EFF6FF] rounded-md px-2 border-0">
                  已选 {selectedRows.length} 项
                </Badge>
              )}
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={selectedRows.length === warehouseData.length && warehouseData.length > 0}
                      onCheckedChange={toggleAll}
                      className="border-[#CBD5E1] data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                    />
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备ID</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">设备类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">生产批次</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">批次状态</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouseData.map((device, idx) => (
                  <TableRow
                    key={device.id}
                    className={`border-b border-[#F1F5F9] transition-all duration-200 ${
                      selectedRows.includes(device.id)
                        ? 'bg-[#EFF6FF]/70 hover:bg-[#EFF6FF]'
                        : 'hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <TableCell className="text-center py-4">
                      <Checkbox
                        checked={selectedRows.includes(device.id)}
                        onCheckedChange={() => toggleRow(device.id)}
                        className="border-[#CBD5E1] data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]"
                      />
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#64748B] font-medium">{idx + 1}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                        {device.deviceId}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full ${
                        device.status === '在线'
                          ? 'bg-emerald-50 text-[#059669]'
                          : 'bg-red-50 text-[#DC2626]'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          device.status === '在线'
                            ? 'bg-[#10B981] animate-pulse shadow-sm shadow-emerald-300'
                            : 'bg-[#EF4444]'
                        }`}></span>
                        {device.status === '在线' ? (
                          <Activity className="w-3.5 h-3.5" />
                        ) : (
                          <WifiOff className="w-3.5 h-3.5" />
                        )}
                        {device.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          device.deviceType.includes('六口')
                            ? 'bg-purple-50'
                            : 'bg-blue-50'
                        }`}>
                          <BatteryCharging className={`w-4 h-4 ${
                            device.deviceType.includes('六口')
                              ? 'text-[#8B5CF6]'
                              : 'text-[#3B82F6]'
                          }`} />
                        </div>
                        <span className="text-[13px] text-[#334155] font-medium">{device.deviceType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-mono tracking-tight bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                        {device.batchNo}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                        device.batchStatus === '库存'
                          ? 'bg-blue-50 text-[#3B82F6] border border-blue-100'
                          : device.batchStatus === '在用'
                            ? 'bg-emerald-50 text-[#059669] border border-emerald-100'
                            : 'bg-amber-50 text-[#D97706] border border-amber-100'
                      }`}>
                        {device.batchStatus === '库存' && (
                          <Package className="w-3 h-3 mr-1" />
                        )}
                        {device.batchStatus}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          className="h-8 px-3 text-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white rounded-lg font-semibold shadow-sm shadow-amber-200/50 transition-all duration-200"
                        >
                          <Settings className="w-3.5 h-3.5 mr-1.5" />
                          设备管理
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 text-[12px] border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white hover:border-[#EF4444] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
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
                共 <span className="text-[#334155] font-semibold">{warehouseData.length}</span> 条记录
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
    </>
  )
}
