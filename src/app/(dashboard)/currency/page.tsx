'use client'

import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  RefreshCw,
  ChevronRight,
  Clock,
  Search,
  RotateCcw,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  Coins,
  Upload,
  Info,
} from 'lucide-react'

// Mock currency data
const currencyData = [
  { id: 1, currency: '美元', minAmount: '0.1', deposit: '20', brand: '豹风', agent: 'admin', withdrawMethod: '支付宝', withdrawTimes: '3', freeDays: '0', withdrawRange: '1 - 500', createTime: '2024-09-21 10:36:48' },
  { id: 2, currency: '港币', minAmount: '1', deposit: '120', brand: '豹风', agent: 'admin', withdrawMethod: '支付宝', withdrawTimes: '8', freeDays: '0', withdrawRange: '10 - 300', createTime: '2024-09-21 10:37:48' },
  { id: 3, currency: '人民币', minAmount: '1', deposit: '99', brand: '豹风', agent: 'admin', withdrawMethod: '-', withdrawTimes: '-', freeDays: '0', withdrawRange: '0 - 0', createTime: '2024-09-21 10:40:17' },
  { id: 4, currency: '欧元', minAmount: '1', deposit: '30', brand: '豹风', agent: 'admin', withdrawMethod: '-', withdrawTimes: '-', freeDays: '0', withdrawRange: '0 - 0', createTime: '2024-10-14 18:14:54' },
]

// 货币代码/符号选项
const currencyCodeOptions = [
  { label: 'CNY (¥) - 人民币', value: 'CNY' },
  { label: 'USD ($) - 美元', value: 'USD' },
  { label: 'EUR (€) - 欧元', value: 'EUR' },
  { label: 'GBP (£) - 英镑', value: 'GBP' },
  { label: 'JPY (¥) - 日元', value: 'JPY' },
  { label: 'HKD (HK$) - 港币', value: 'HKD' },
  { label: 'KRW (₩) - 韩元', value: 'KRW' },
  { label: 'SGD (S$) - 新加坡元', value: 'SGD' },
  { label: 'AUD (A$) - 澳大利亚元', value: 'AUD' },
  { label: 'THB (฿) - 泰铢', value: 'THB' },
]

// 货币最小金额参考映射
const currencyMinAmountMap: Record<string, string> = {
  CNY: '0.01',
  USD: '0.01',
  EUR: '0.01',
  GBP: '0.01',
  JPY: '1',
  HKD: '0.1',
  KRW: '1',
  SGD: '0.01',
  AUD: '0.01',
  THB: '0.01',
}

type ModalType = 'add' | 'edit' | 'delete' | 'detail' | null

export default function CurrencyPage() {
  const [searchName, setSearchName] = useState('')
  const [modalType, setModalType] = useState<ModalType>(null)
  const [editForm, setEditForm] = useState({
    currency: '',
    currencyCode: '',
    minAmount: '',
    deposit: '',
    brand: '',
    agent: '',
    withdrawMethod: '',
    withdrawTimes: '',
    freeDays: '',
    withdrawRangeMin: '',
    withdrawRangeMax: '',
  })
  const [currencyIcon, setCurrencyIcon] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [deleteTarget, setDeleteTarget] = useState('')

  const handleReset = () => setSearchName('')

  const openAddModal = () => {
    setEditForm({ currency: '', currencyCode: '', minAmount: '', deposit: '', brand: '', agent: '', withdrawMethod: '', withdrawTimes: '', freeDays: '', withdrawRangeMin: '', withdrawRangeMax: '' })
    setCurrencyIcon(null)
    setModalType('add')
  }

  const openEditModal = (item: typeof currencyData[0]) => {
    const rangeParts = item.withdrawRange.split(' - ')
    setEditForm({
      currency: item.currency,
      currencyCode: '',
      minAmount: item.minAmount,
      deposit: item.deposit,
      brand: item.brand,
      agent: item.agent,
      withdrawMethod: item.withdrawMethod === '-' ? '' : item.withdrawMethod,
      withdrawTimes: item.withdrawTimes === '-' ? '' : item.withdrawTimes,
      freeDays: item.freeDays,
      withdrawRangeMin: rangeParts[0] || '',
      withdrawRangeMax: rangeParts[1] || '',
    })
    setCurrencyIcon(null)
    setModalType('edit')
  }

  const openDetailModal = (item: typeof currencyData[0]) => {
    const rangeParts = item.withdrawRange.split(' - ')
    setEditForm({
      currency: item.currency,
      currencyCode: '',
      minAmount: item.minAmount,
      deposit: item.deposit,
      brand: item.brand,
      agent: item.agent,
      withdrawMethod: item.withdrawMethod,
      withdrawTimes: item.withdrawTimes,
      freeDays: item.freeDays,
      withdrawRangeMin: rangeParts[0] || '',
      withdrawRangeMax: rangeParts[1] || '',
    })
    setModalType('detail')
  }

  const openDeleteModal = (name: string) => {
    setDeleteTarget(name)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setEditForm({ currency: '', currencyCode: '', minAmount: '', deposit: '', brand: '', agent: '', withdrawMethod: '', withdrawTimes: '', freeDays: '', withdrawRangeMin: '', withdrawRangeMax: '' })
    setCurrencyIcon(null)
    setDeleteTarget('')
  }

  const handleGetMinAmount = () => {
    if (editForm.currencyCode && currencyMinAmountMap[editForm.currencyCode]) {
      setEditForm({ ...editForm, minAmount: currencyMinAmountMap[editForm.currencyCode] })
    }
  }

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrencyIcon(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">货币管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {currencyData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">货币管理</span>
        </div>

        {/* Filter + Action Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="请输入货币名称"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="h-9 w-[200px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
              <Button
                className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                <Search className="w-4 h-4 mr-1.5" />
                搜索
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-9 px-5 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                重置
              </Button>
            </div>
            <Button
              onClick={openAddModal}
              className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              新增
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <Coins className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">货币列表</h3>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">货币</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">最小金额</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">押金</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">所属品牌</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">所属代理</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">提现方式</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">提现次数(天)</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">免征天数</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">提现范围</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencyData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-4 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-medium">{item.currency}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.minAmount}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.deposit}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.brand}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.agent}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.withdrawMethod}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.withdrawTimes}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.freeDays}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.withdrawRange}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => openDetailModal(item)}
                          className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                        >
                          <Eye className="w-3 h-3" />
                          详情
                        </button>
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                        >
                          <Pencil className="w-3 h-3" />
                          编辑
                        </button>
                        <button
                          onClick={() => openDeleteModal(item.currency)}
                          className="inline-flex items-center gap-1 text-[12px] text-[#EF4444] font-semibold hover:underline transition-all duration-200"
                        >
                          <Trash2 className="w-3 h-3" />
                          删除
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ========== 详情弹窗 ========== */}
      {modalType === 'detail' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[620px] max-h-[85vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/50">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">货币详情</h3>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="货币" value={editForm.currency} />
                <DetailField label="最小金额" value={editForm.minAmount} />
                <DetailField label="押金" value={editForm.deposit} />
                <DetailField label="所属品牌" value={editForm.brand} />
                <DetailField label="所属代理" value={editForm.agent} />
                <DetailField label="提现方式" value={editForm.withdrawMethod} />
                <DetailField label="提现次数(天)" value={editForm.withdrawTimes} />
                <DetailField label="免征天数" value={editForm.freeDays} />
                <DetailField label="提现范围" value={`${editForm.withdrawRangeMin} - ${editForm.withdrawRangeMax}`} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-8 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 新增弹窗 ========== */}
      {modalType === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[520px] max-h-[85vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/50">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">新增货币</h3>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
              {/* 货币名称 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[120px] shrink-0">
                  <span className="text-[#EF4444] mr-0.5">*</span>
                  货币名称:
                </label>
                <Input
                  placeholder="请输入货币名称"
                  value={editForm.currency}
                  onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 货币代码/符号 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[120px] shrink-0">
                  <span className="text-[#EF4444] mr-0.5">*</span>
                  货币代码/符号:
                </label>
                <Select
                  value={editForm.currencyCode}
                  onValueChange={(value) => setEditForm({ ...editForm, currencyCode: value })}
                >
                  <SelectTrigger className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200">
                    <SelectValue placeholder="请选择货币代码/符号" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyCodeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-[13px]">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 货币最小金额 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[120px] shrink-0">
                  <span className="text-[#EF4444] mr-0.5">*</span>
                  货币最小金额:
                </label>
                <Input
                  placeholder="请输入货币最小金额"
                  value={editForm.minAmount}
                  onChange={(e) => setEditForm({ ...editForm, minAmount: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 获取当前货币最小值按钮 */}
              <div className="flex items-center gap-4">
                <div className="w-[120px] shrink-0" />
                <div className="flex-1">
                  <Button
                    type="button"
                    onClick={handleGetMinAmount}
                    disabled={!editForm.currencyCode}
                    className="h-9 px-4 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white text-[12px] font-medium rounded-lg transition-all duration-200"
                  >
                    <Info className="w-3.5 h-3.5 mr-1.5" />
                    获取当前货币最小值(仅作参考)
                  </Button>
                </div>
              </div>

              {/* 货币图标 */}
              <div className="flex items-start gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[120px] shrink-0 pt-2">货币图标:</label>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleIconUpload}
                    className="hidden"
                  />
                  {currencyIcon ? (
                    <div
                      className="relative w-[100px] h-[100px] rounded-xl border-2 border-[#E2E8F0] overflow-hidden group cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        src={currencyIcon}
                        alt="货币图标"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[12px] font-medium">更换图标</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-[100px] h-[100px] rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#3B82F6] hover:bg-[#EFF6FF] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-5 h-5 text-[#94A3B8]" />
                      <span className="text-[12px] text-[#94A3B8] font-medium">货币图标</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 px-6 py-5 border-t border-[#F1F5F9] shrink-0">
              <Button
                onClick={closeModal}
                className="h-10 px-10 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-lg shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                确定
              </Button>
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-10 border-[#D1D5DB] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-lg transition-all duration-200"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 编辑弹窗 ========== */}
      {modalType === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[560px] max-h-[85vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/50">
                  <Pencil className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">编辑货币</h3>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              {/* 货币 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">货币</label>
                <Input
                  placeholder="请输入货币名称"
                  value={editForm.currency}
                  onChange={(e) => setEditForm({ ...editForm, currency: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 最小金额 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">最小金额</label>
                <Input
                  placeholder="请输入最小金额"
                  value={editForm.minAmount}
                  onChange={(e) => setEditForm({ ...editForm, minAmount: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 押金 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">押金</label>
                <Input
                  placeholder="请输入押金"
                  value={editForm.deposit}
                  onChange={(e) => setEditForm({ ...editForm, deposit: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 所属品牌 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">所属品牌</label>
                <Input
                  placeholder="请输入所属品牌"
                  value={editForm.brand}
                  onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 所属代理 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">所属代理</label>
                <Input
                  placeholder="请输入所属代理"
                  value={editForm.agent}
                  onChange={(e) => setEditForm({ ...editForm, agent: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 提现方式 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">提现方式</label>
                <Input
                  placeholder="请输入提现方式"
                  value={editForm.withdrawMethod}
                  onChange={(e) => setEditForm({ ...editForm, withdrawMethod: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 提现次数(天) */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">提现次数(天)</label>
                <Input
                  placeholder="请输入提现次数"
                  value={editForm.withdrawTimes}
                  onChange={(e) => setEditForm({ ...editForm, withdrawTimes: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 免征天数 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">免征天数</label>
                <Input
                  placeholder="请输入免征天数"
                  value={editForm.freeDays}
                  onChange={(e) => setEditForm({ ...editForm, freeDays: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 提现范围 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[90px] shrink-0">提现范围</label>
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    placeholder="最小值"
                    value={editForm.withdrawRangeMin}
                    onChange={(e) => setEditForm({ ...editForm, withdrawRangeMin: e.target.value })}
                    className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                  />
                  <span className="text-[14px] text-[#94A3B8]">-</span>
                  <Input
                    placeholder="最大值"
                    value={editForm.withdrawRangeMax}
                    onChange={(e) => setEditForm({ ...editForm, withdrawRangeMax: e.target.value })}
                    className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 px-6 py-5 border-t border-[#F1F5F9] shrink-0">
              <Button
                onClick={closeModal}
                className="h-10 px-10 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-lg shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                确定
              </Button>
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-10 border-[#D1D5DB] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-lg transition-all duration-200"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 删除确认弹窗 ========== */}
      {modalType === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[420px] overflow-hidden"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center shadow-md shadow-red-200/50">
                  <Trash2 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">删除确认</h3>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Trash2 className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div>
                  <p className="text-[14px] text-[#334155] font-medium">确定要删除该货币规则吗？</p>
                  <p className="text-[13px] text-[#94A3B8] mt-1.5">
                    货币名称：<span className="text-[#334155] font-medium">{deleteTarget}</span>
                  </p>
                  <p className="text-[12px] text-[#CBD5E1] mt-2">删除后不可恢复，请谨慎操作</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC]">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                取消
              </Button>
              <Button
                onClick={closeModal}
                className="h-10 px-8 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#B91C1C] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-red-200/50 transition-all duration-200"
              >
                确认删除
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal animation */}
      <style jsx global>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}

// Detail display field component
function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] text-[#94A3B8] font-medium">{label}</span>
      <div className="px-3 py-2.5 bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg">
        <span className="text-[13px] text-[#334155] font-medium">{value || '-'}</span>
      </div>
    </div>
  )
}
