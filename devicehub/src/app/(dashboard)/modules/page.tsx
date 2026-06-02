'use client'

import { useState, useRef, useEffect } from 'react'
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
  RefreshCw,
  ChevronRight,
  Clock,
  Search,
  RotateCcw,
  Plus,
  Pencil,
  Trash2,
  X,
  Blocks,
} from 'lucide-react'

// Mock modules data
const modulesData = [
  { id: 1, name: '货币管理', type: '模块', createTime: '2026-03-23 10:44:48', category1: 'PC平台', category2: '系统管理', category3: '货币管理', permissionKey: '/areaList', apiUrl: '' },
  { id: 2, name: '广告管理', type: '模块', createTime: '2025-06-26 14:52:16', category1: 'PC平台', category2: '系统管理', category3: '广告管理', permissionKey: '/adList', apiUrl: '' },
  { id: 3, name: '屏幕机管理', type: '模块', createTime: '2025-06-26 14:51:56', category1: 'PC平台', category2: '系统管理', category3: '屏幕机管理', permissionKey: '/screenList', apiUrl: '' },
  { id: 4, name: '屏幕机管理', type: '模块', createTime: '2025-06-26 14:50:19', category1: 'PC平台', category2: '系统管理', category3: '屏幕机管理', permissionKey: '/screenList2', apiUrl: '' },
]

// Dropdown options
const category1Options = ['PC平台']
const category2Options = ['系统管理', '财务管理']
const category3Options = ['货币管理', '广告管理', '屏幕机管理', '角色管理', '账号管理']
const typeOptions = ['模块', '菜单', '按钮']

type ModalType = 'add' | 'edit' | 'delete' | null

// Dropdown select component
function DropdownSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string
  value: string
  placeholder: string
  options: string[]
  onChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex items-center gap-4">
      <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">{label}</label>
      <div className="flex-1 relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className={`w-full h-10 flex items-center justify-between px-3 rounded-lg text-[13px] transition-all duration-200 border ${
            open
              ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/10 bg-white'
              : 'border-[#D1D5DB] bg-white hover:border-[#3B82F6]'
          }`}
        >
          <span className={value ? 'text-[#334155]' : 'text-[#9CA3AF]'}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 overflow-hidden max-h-[200px] overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-2.5 text-[13px] transition-colors duration-150 ${
                  value === opt
                    ? 'bg-[#EFF6FF] text-[#3B82F6] font-medium'
                    : 'text-[#334155] hover:bg-[#F8FAFC]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ModulesPage() {
  const [searchName, setSearchName] = useState('')
  const [modalType, setModalType] = useState<ModalType>(null)
  const [editForm, setEditForm] = useState({
    category1: '',
    category2: '',
    category3: '',
    type: '',
    name: '',
    permissionKey: '',
    apiUrl: '',
  })
  const [deleteTarget, setDeleteTarget] = useState('')

  const handleReset = () => setSearchName('')

  const openAddModal = () => {
    setEditForm({ category1: '', category2: '', category3: '', type: '', name: '', permissionKey: '', apiUrl: '' })
    setModalType('add')
  }

  const openEditModal = (item: typeof modulesData[0]) => {
    setEditForm({
      category1: item.category1,
      category2: item.category2,
      category3: item.category3,
      type: item.type,
      name: item.name,
      permissionKey: item.permissionKey,
      apiUrl: item.apiUrl,
    })
    setModalType('edit')
  }

  const openDeleteModal = (name: string) => {
    setDeleteTarget(name)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setEditForm({ category1: '', category2: '', category3: '', type: '', name: '', permissionKey: '', apiUrl: '' })
    setDeleteTarget('')
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">模块管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {modulesData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">模块管理</span>
        </div>

        {/* Filter + Action Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="模块名称"
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
              <Blocks className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">模块列表</h3>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">模块名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulesData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-4 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155] font-medium">{item.name}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EFF6FF] text-[12px] font-medium text-[#3B82F6]">
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span className="text-[12px] text-[#64748B]">{item.createTime}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                        >
                          <Pencil className="w-3 h-3" />
                          编辑
                        </button>
                        <button
                          onClick={() => openDeleteModal(item.name)}
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

      {/* ========== 新增/编辑弹窗 ========== */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[560px] max-h-[85vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Close button - top right */}
            <div className="flex items-center justify-end px-6 pt-4 shrink-0">
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors">
                <X className="w-5 h-5 text-[#94A3B8] hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
              {/* 一级分类 */}
              <DropdownSelect
                label="一级分类"
                value={editForm.category1}
                placeholder="请选择一级分类"
                options={category1Options}
                onChange={(val) => setEditForm({ ...editForm, category1: val })}
              />

              {/* 二级分类 */}
              <DropdownSelect
                label="二级分类"
                value={editForm.category2}
                placeholder="请选择二级分类"
                options={category2Options}
                onChange={(val) => setEditForm({ ...editForm, category2: val })}
              />

              {/* 三级分类 */}
              <DropdownSelect
                label="三级分类"
                value={editForm.category3}
                placeholder="请选择三级分类"
                options={category3Options}
                onChange={(val) => setEditForm({ ...editForm, category3: val })}
              />

              {/* 类型 */}
              <DropdownSelect
                label="类型"
                value={editForm.type}
                placeholder="请选择类型"
                options={typeOptions}
                onChange={(val) => setEditForm({ ...editForm, type: val })}
              />

              {/* 模块名称 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">模块名称</label>
                <Input
                  placeholder="请输入模块名称"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 权限标识 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">权限标识</label>
                <Input
                  placeholder="请输入权限标识"
                  value={editForm.permissionKey}
                  onChange={(e) => setEditForm({ ...editForm, permissionKey: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 接口地址 */}
              <div className="flex items-start gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0 pt-2.5">接口地址</label>
                <textarea
                  placeholder="请输入接口地址"
                  value={editForm.apiUrl}
                  onChange={(e) => setEditForm({ ...editForm, apiUrl: e.target.value })}
                  className="flex-1 min-h-[80px] text-[13px] border border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF] px-3 py-2.5 resize-none outline-none"
                />
              </div>
            </div>

            {/* Footer - 确定 and 取消 */}
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
                  <p className="text-[14px] text-[#334155] font-medium">确定要删除该模块吗？</p>
                  <p className="text-[13px] text-[#94A3B8] mt-1.5">
                    模块名称：<span className="text-[#334155] font-medium">{deleteTarget}</span>
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
