'use client'

import { useState } from 'react'
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
  ChevronLeft,
  Monitor,
  Settings,
  Wallet,
} from 'lucide-react'

// Permission tree data structure
interface PermissionItem {
  key: string
  label: string
  children?: PermissionItem[]
}

const permissionTree: PermissionItem[] = [
  {
    key: 'pc',
    label: 'PC平台',
    children: [
      { key: 'pc_home', label: '首页' },
    ],
  },
  {
    key: 'system',
    label: '系统管理',
    children: [
      { key: 'system_role', label: '角色管理' },
      { key: 'system_account', label: '账号管理' },
      { key: 'system_module', label: '模块管理' },
      { key: 'system_currency', label: '货币管理' },
      { key: 'system_agent', label: '代理商管理' },
      { key: 'system_branch', label: '网点管理' },
    ],
  },
  {
    key: 'finance',
    label: '财务管理',
    children: [
      { key: 'finance_account', label: '财务账号' },
      { key: 'finance_split', label: '分账明细' },
      { key: 'finance_withdraw', label: '代提提现' },
      { key: 'finance_setting', label: '提现设置' },
    ],
  },
]

// Mock roles data with permissions
const rolesData = [
  { id: 1, name: '硬件开发', creator: '旺旺', createTime: '2025-09-18 14:31:57', permissions: ['pc', 'pc_home'] },
  { id: 2, name: '财务', creator: '张锐', createTime: '2025-03-20 14:41:41', permissions: ['finance', 'finance_account', 'finance_split', 'finance_withdraw', 'finance_setting'] },
  { id: 3, name: '售后', creator: '曹慧', createTime: '2024-11-01 09:08:32', permissions: ['pc', 'pc_home', 'system', 'system_role'] },
  { id: 4, name: '销售', creator: '曹慧', createTime: '2024-07-27 09:35:20', permissions: ['pc', 'pc_home'] },
  { id: 5, name: '产品', creator: '曹慧', createTime: '2024-02-02 09:32:57', permissions: ['pc', 'pc_home', 'system', 'system_module'] },
  { id: 6, name: '开发', creator: '曹慧', createTime: '2024-02-01 14:22:04', permissions: ['pc', 'pc_home', 'system', 'system_account', 'system_module'] },
  { id: 7, name: '系统管理员', creator: '曹慧', createTime: '2024-01-23 17:11:40', permissions: ['pc', 'pc_home', 'system', 'system_role', 'system_account', 'system_module', 'system_currency', 'system_agent', 'system_branch', 'finance', 'finance_account', 'finance_split', 'finance_withdraw', 'finance_setting'] },
]

type ModalType = 'add' | 'edit' | 'delete' | null

// Permission tree node component
function PermissionTreeNode({
  item,
  checkedKeys,
  onToggle,
  expandedKeys,
  onToggleExpand,
  depth = 0,
}: {
  item: PermissionItem
  checkedKeys: Set<string>
  onToggle: (key: string, isParent: boolean, children?: PermissionItem[]) => void
  expandedKeys: Set<string>
  onToggleExpand: (key: string) => void
  depth?: number
}) {
  const hasChildren = item.children && item.children.length > 0
  const isChecked = checkedKeys.has(item.key)
  const isExpanded = expandedKeys.has(item.key)
  const isIndeterminate = hasChildren
    ? !isChecked && item.children!.some((c) => checkedKeys.has(c.key))
    : false

  // Get icon for top-level items
  const getIcon = () => {
    if (depth === 0) {
      switch (item.key) {
        case 'pc':
          return <Monitor className="w-4 h-4 text-[#64748B]" />
        case 'system':
          return <Settings className="w-4 h-4 text-[#64748B]" />
        case 'finance':
          return <Wallet className="w-4 h-4 text-[#64748B]" />
        default:
          return null
      }
    }
    return null
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#F8FAFC] transition-colors duration-150 cursor-pointer group"
        style={{ paddingLeft: `${depth * 24 + 8}px` }}
      >
        {/* Expand/collapse arrow */}
        {hasChildren ? (
          <button
            onClick={() => onToggleExpand(item.key)}
            className="w-4 h-4 flex items-center justify-center shrink-0 transition-transform duration-200"
          >
            <ChevronRight
              className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Checkbox */}
        <button
          onClick={() => onToggle(item.key, !!hasChildren, item.children)}
          className="shrink-0 flex items-center justify-center"
        >
          <span
            className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-all duration-200 ${
              isChecked
                ? 'bg-[#3B82F6] border-[#3B82F6]'
                : isIndeterminate
                ? 'bg-[#3B82F6] border-[#3B82F6]'
                : 'bg-white border-[#D1D5DB] group-hover:border-[#3B82F6]'
            }`}
          >
            {isChecked && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isIndeterminate && !isChecked && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>

        {/* Icon for top-level items */}
        {getIcon()}

        {/* Label */}
        <span
          className={`text-[13px] select-none ${
            depth === 0
              ? 'font-semibold text-[#334155]'
              : 'text-[#64748B]'
          } ${isChecked ? 'text-[#1E40AF]' : ''}`}
        >
          {item.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <PermissionTreeNode
              key={child.key}
              item={child}
              checkedKeys={checkedKeys}
              onToggle={onToggle}
              expandedKeys={expandedKeys}
              onToggleExpand={onToggleExpand}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function RolesPage() {
  const [searchName, setSearchName] = useState('')
  const [modalType, setModalType] = useState<ModalType>(null)
  const [editForm, setEditForm] = useState({ name: '' })
  const [deleteTarget, setDeleteTarget] = useState('')
  const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set())
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['pc', 'system', 'finance']))

  const handleReset = () => setSearchName('')

  const openAddModal = () => {
    setEditForm({ name: '' })
    setCheckedKeys(new Set())
    setExpandedKeys(new Set(['pc', 'system', 'finance']))
    setModalType('add')
  }

  const openEditModal = (name: string, permissions: string[]) => {
    setEditForm({ name })
    setCheckedKeys(new Set(permissions))
    setExpandedKeys(new Set(['pc', 'system', 'finance']))
    setModalType('edit')
  }

  const openDeleteModal = (name: string) => {
    setDeleteTarget(name)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setEditForm({ name: '' })
    setDeleteTarget('')
    setCheckedKeys(new Set())
  }

  const handleTogglePermission = (key: string, isParent: boolean, children?: PermissionItem[]) => {
    const newChecked = new Set(checkedKeys)
    if (isParent && children) {
      // Toggle parent: if checked, uncheck all; if unchecked, check all
      const allChildKeys = children.map((c) => c.key)
      const allChecked = allChildKeys.every((k) => newChecked.has(k))
      if (allChecked) {
        newChecked.delete(key)
        allChildKeys.forEach((k) => newChecked.delete(k))
      } else {
        newChecked.add(key)
        allChildKeys.forEach((k) => newChecked.add(k))
      }
    } else {
      // Toggle child
      if (newChecked.has(key)) {
        newChecked.delete(key)
        // Also uncheck parent if all children unchecked
        for (const parent of permissionTree) {
          if (parent.children?.some((c) => c.key === key)) {
            if (!parent.children.some((c) => newChecked.has(c.key))) {
              newChecked.delete(parent.key)
            }
            break
          }
        }
      } else {
        newChecked.add(key)
        // Also check parent
        for (const parent of permissionTree) {
          if (parent.children?.some((c) => c.key === key)) {
            newChecked.add(parent.key)
            break
          }
        }
      }
    }
    setCheckedKeys(newChecked)
  }

  const handleToggleExpand = (key: string) => {
    const newExpanded = new Set(expandedKeys)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedKeys(newExpanded)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">角色管理</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {rolesData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">角色管理</span>
        </div>

        {/* Filter + Action Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 角色名称搜索 */}
              <Input
                placeholder="请输入角色名称"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="h-9 w-[220px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
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
          {/* Table Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <UserCog className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">角色列表</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">角色名称</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建人</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">创建时间</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rolesData.map((item) => (
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
                      <span className="text-[13px] text-[#334155]">{item.creator}</span>
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
                          onClick={() => openEditModal(item.name, item.permissions)}
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
                共 <span className="text-[#334155] font-semibold">{rolesData.length}</span> 条
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
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[560px] max-h-[80vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] shrink-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
                  modalType === 'add'
                    ? 'bg-gradient-to-br from-[#10B981] to-[#059669] shadow-emerald-200/50'
                    : 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-blue-200/50'
                }`}>
                  {modalType === 'add' ? <Plus className="w-4 h-4 text-white" /> : <Pencil className="w-4 h-4 text-white" />}
                </div>
                <h3 className="text-[16px] font-bold text-[#111827]">
                  {modalType === 'add' ? '新增角色' : '编辑角色'}
                </h3>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {/* 角色名称 */}
              <div className="space-y-2 mb-6">
                <label className="text-[13px] font-semibold text-[#334155]">角色名称</label>
                <Input
                  placeholder="请输入角色名称"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ name: e.target.value })}
                  className="h-10 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-xl transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>

              {/* 权限管理 */}
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#334155]">权限管理</label>
                <div className="border border-[#E2E8F0] rounded-xl bg-[#FAFBFC] overflow-hidden">
                  <div className="p-3">
                    {permissionTree.map((item) => (
                      <PermissionTreeNode
                        key={item.key}
                        item={item}
                        checkedKeys={checkedKeys}
                        onToggle={handleTogglePermission}
                        expandedKeys={expandedKeys}
                        onToggleExpand={handleToggleExpand}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC] shrink-0">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                取消
              </Button>
              <Button
                onClick={closeModal}
                className="h-10 px-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200"
              >
                确定
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
                  <p className="text-[14px] text-[#334155] font-medium">确定要删除该角色吗？</p>
                  <p className="text-[13px] text-[#94A3B8] mt-1.5">
                    角色名称：<span className="text-[#334155] font-medium">{deleteTarget}</span>
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
