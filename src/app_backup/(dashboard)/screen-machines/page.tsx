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
  Tv,
  Link2,
  Unlink,
  X,
} from 'lucide-react'

// Mock data
const screenMachineData = [
  {
    index: 1,
    screenMachineNo: '456',
    isBound: '已绑定',
    boundMachineNo: 'A0724BF0A000026',
    version: 'V102',
  },
  {
    index: 2,
    screenMachineNo: '123',
    isBound: '已绑定',
    boundMachineNo: '52725BF00B000001',
    version: 'V101',
  },
  {
    index: 3,
    screenMachineNo: '789',
    isBound: '未绑定',
    boundMachineNo: '-',
    version: 'V103',
  },
  {
    index: 4,
    screenMachineNo: '352',
    isBound: '已绑定',
    boundMachineNo: 'C0918BF0A000048',
    version: 'V102',
  },
  {
    index: 5,
    screenMachineNo: '641',
    isBound: '未绑定',
    boundMachineNo: '-',
    version: 'V101',
  },
]

export default function ScreenMachinesPage() {
  const [filters, setFilters] = useState({
    screenMachineNo: '',
    bindStatus: '',
    boundMachineNo: '',
  })

  const [unbindDialogOpen, setUnbindDialogOpen] = useState(false)
  const [selectedMachine, setSelectedMachine] = useState<typeof screenMachineData[0] | null>(null)

  const handleReset = () => {
    setFilters({ screenMachineNo: '', bindStatus: '', boundMachineNo: '' })
  }

  const handleUnbind = (item: typeof screenMachineData[0]) => {
    setSelectedMachine(item)
    setUnbindDialogOpen(true)
  }

  const filteredData = screenMachineData.filter((item) => {
    if (filters.screenMachineNo && !item.screenMachineNo.includes(filters.screenMachineNo)) return false
    if (filters.boundMachineNo && !item.boundMachineNo.includes(filters.boundMachineNo)) return false
    if (filters.bindStatus === '已绑定' && item.isBound !== '已绑定') return false
    if (filters.bindStatus === '未绑定' && item.isBound !== '未绑定') return false
    return true
  })

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">屏幕机管理</h1>
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
          <span className="text-[#3B82F6] font-medium">屏幕机管理</span>
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
              {/* 屏幕机编号 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">屏幕机编号</Label>
                <Input
                  value={filters.screenMachineNo}
                  onChange={(e) => setFilters({ ...filters, screenMachineNo: e.target.value })}
                  placeholder="屏幕机编号"
                  className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 绑定状态 */}
              <div className="space-y-2 w-[150px]">
                <Label className="text-[12px] text-[#64748B] font-medium">绑定状态</Label>
                <Select
                  value={filters.bindStatus}
                  onValueChange={(value) => setFilters({ ...filters, bindStatus: value === 'all' ? '' : value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="绑定状态" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="已绑定">已绑定</SelectItem>
                    <SelectItem value="未绑定">未绑定</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 绑定机器编号 */}
              <div className="space-y-2 w-[200px]">
                <Label className="text-[12px] text-[#64748B] font-medium">绑定机器编号</Label>
                <Input
                  value={filters.boundMachineNo}
                  onChange={(e) => setFilters({ ...filters, boundMachineNo: e.target.value })}
                  placeholder="绑定的机器编号"
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
              <Tv className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">屏幕机列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[60px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">屏幕机器编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">是否绑定机器</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">所绑定机器编号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">版本</TableHead>
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
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shrink-0">
                          <Tv className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[13px] text-[#334155] font-semibold">{item.screenMachineNo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.isBound === '已绑定'
                          ? 'bg-green-50 text-[#059669] border border-green-100'
                          : 'bg-gray-50 text-[#64748B] border border-gray-200'
                      }`}>
                        {item.isBound === '已绑定' ? <Link2 className="w-3 h-3" /> : <Unlink className="w-3 h-3" />}
                        {item.isBound}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className={`text-[12px] font-mono tracking-tight ${
                        item.boundMachineNo === '-' ? 'text-[#CBD5E1]' : 'text-[#334155]'
                      }`}>
                        {item.boundMachineNo}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-[11px] font-semibold text-[#2563EB] border border-blue-100">
                        {item.version}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center">
                        {item.isBound === '已绑定' ? (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleUnbind(item)}
                            className="h-6 px-1.5 text-[11px] text-[#EF4444] hover:text-[#DC2626] font-medium p-0"
                          >
                            <Unlink className="w-3 h-3 mr-0.5" />
                            解绑
                          </Button>
                        ) : (
                          <span className="text-[11px] text-[#CBD5E1]">-</span>
                        )}
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

      {/* Unbind Confirmation Dialog */}
      <Dialog open={unbindDialogOpen} onOpenChange={setUnbindDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden">
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#DC2626]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <Unlink className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">确认解绑</DialogTitle>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="px-7 py-6">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-[13px] text-[#92400E] leading-relaxed">
                确定要将屏幕机 <span className="font-semibold">{selectedMachine?.screenMachineNo || ''}</span> 与机器 <span className="font-semibold font-mono">{selectedMachine?.boundMachineNo || ''}</span> 解绑吗？解绑后屏幕机将不再显示该机器的信息。
              </p>
            </div>
          </div>

          <DialogFooter className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setUnbindDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setUnbindDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] hover:from-[#EF4444] hover:to-[#DC2626] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-orange-200/50 transition-all duration-200"
            >
              确认解绑
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
