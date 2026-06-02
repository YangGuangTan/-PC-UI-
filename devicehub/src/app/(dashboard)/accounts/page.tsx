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
  UserCog,
} from 'lucide-react'

// Mock accounts data
const accountsData = [
  { id: 1, name: '张锐', roleName: '财务', phone: '15911131831', createTime: '2024-01-31 09:21:52', status: 'enabled' },
  { id: 2, name: '旺旺', roleName: '开发', phone: '18888888888', createTime: '2024-01-31 09:22:52', status: 'enabled' },
  { id: 3, name: '屈艳丽', roleName: '销售', phone: '13891986714', createTime: '2024-05-20 15:17:18', status: 'enabled' },
  { id: 4, name: '勾浩', roleName: '系统管理员', phone: '18821796647', createTime: '2024-08-05 09:33:45', status: 'enabled' },
]

// Role options for dropdown
const roleOptions = ['财务', '开发', '销售', '系统管理员', '售后', '产品', '硬件开发']

type ModalType = 'add' | 'edit' | 'delete' | null

export default function AccountsPage() {
  const [searchName, setSearchName] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [modalType, setModalType] = useState<ModalType>(null)
  const [editForm, setEditForm] = useState({ name: '', roleName: '', phone: '', status: 'enabled' as 'enabled' | 'disabled' })
  const [deleteTarget, setDeleteTarget] = useState('')
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const roleDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleReset = () => {
    setSearchName('')
    setSearchPhone('')
  }

  const openAddModal = () => {
    setEditForm({ name: '', roleName: '', phone: '', status: 'enabled' })
    setRoleDropdownOpen(false)
    setModalType('add')
  }

  const openEditModal = (name: string, roleName: string, phone: string, status: string) => {
    setEditForm({ name, roleName, phone, status: status as 'enabled' | 'disabled' })
    setRoleDropdownOpen(false)
    setModalType('edit')
  }

  const openDeleteModal = (name: string) => {
    setDeleteTarget(name)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setEditForm({ name: '', roleName: '', phone: '', status: 'enabled' })
    setDeleteTarget('')
    setRoleDropdownOpen(false)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">账号管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {accountsData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">账号管理</span>
        </div>

        {/* Filter + Action Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="姓名"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="h-9 w-[180px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
              <Input
                placeholder="手机号"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="h-9 w-[180px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
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
              <UserCog className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">账号列表</h3>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">姓名</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">角色名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">手机号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accountsData.map((item) => (
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
                      <span className="text-[13px] text-[#334155]">{item.roleName}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-[13px] text-[#334155]">{item.phone}</span>
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
                          onClick={() => openEditModal(item.name, item.roleName, item.phone, item.status)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC]/50">
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#94A3B8]">
                共 <span className="text-[#334155] font-semibold">{accountsData.length}</span> 条
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

      {/* ========== 新增/编辑弹窗 ========== */}
      {(modalType === 'add' || modalType === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[500px] overflow-hidden"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Close button - top right */}
            <div className="flex items-center justify-end px-6 pt-4">
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors">
                <X className="w-5 h-5 text-[#94A3B8] hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 space-y-5">
              {/* 姓名 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">姓名</label>
                <Input
                  placeholder="请输入姓名"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 手机号 */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">手机号</label>
                <Input
                  placeholder="请输入手机号"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="h-10 flex-1 text-[13px] border-[#D1D5DB] bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#9CA3AF]"
                />
              </div>

              {/* 关联角色 - Dropdown Select */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">关联角色</label>
                <div className="flex-1 relative" ref={roleDropdownRef}>
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className={`w-full h-10 flex items-center justify-between px-3 rounded-lg text-[13px] transition-all duration-200 ${
                      roleDropdownOpen
                        ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/10 bg-white'
                        : 'border-[#D1D5DB] bg-white hover:border-[#3B82F6]'
                    } border`}
                  >
                    <span className={editForm.roleName ? 'text-[#334155]' : 'text-[#9CA3AF]'}>
                      {editForm.roleName || '请选择角色'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {roleDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 overflow-hidden">
                      {roleOptions.map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setEditForm({ ...editForm, roleName: role })
                            setRoleDropdownOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2.5 text-[13px] transition-colors duration-150 ${
                            editForm.roleName === role
                              ? 'bg-[#EFF6FF] text-[#3B82F6] font-medium'
                              : 'text-[#334155] hover:bg-[#F8FAFC]'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 状态 - Radio Buttons */}
              <div className="flex items-center gap-4">
                <label className="text-[14px] text-[#334155] font-medium w-[80px] shrink-0">状态</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        editForm.status === 'disabled'
                          ? 'border-[#3B82F6] bg-white'
                          : 'border-[#D1D5DB] bg-white hover:border-[#3B82F6]'
                      }`}
                      onClick={() => setEditForm({ ...editForm, status: 'disabled' })}
                    >
                      {editForm.status === 'disabled' && (
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                      )}
                    </span>
                    <span className="text-[13px] text-[#334155]">停用</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        editForm.status === 'enabled'
                          ? 'border-[#3B82F6] bg-white'
                          : 'border-[#D1D5DB] bg-white hover:border-[#3B82F6]'
                      }`}
                      onClick={() => setEditForm({ ...editForm, status: 'enabled' })}
                    >
                      {editForm.status === 'enabled' && (
                        <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                      )}
                    </span>
                    <span className="text-[13px] text-[#334155]">启用</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer - 确定 and 取消 */}
            <div className="flex items-center justify-center gap-3 px-6 py-5 border-t border-[#F1F5F9]">
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
                  <p className="text-[14px] text-[#334155] font-medium">确定要删除该账号吗？</p>
                  <p className="text-[13px] text-[#94A3B8] mt-1.5">
                    姓名：<span className="text-[#334155] font-medium">{deleteTarget}</span>
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
