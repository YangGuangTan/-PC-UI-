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
  Eye,
  X,
  ScrollText,
  CheckCircle2,
  XCircle,
  Server,
  Activity,
  Timer,
} from 'lucide-react'

// Mock agent log data
const agentLogData = [
  {
    id: 1,
    agentName: 'Hem Thavorak',
    requestIP: '118.31.144.100, 0:0:0:0:0:0:0:1',
    operationDesc: '代理端 - 修改计费规则',
    status: '成功',
    processTime: '40',
    operationTime: '2026-05-23 12:44:15',
    logs: [
      { time: '2026-05-23 12:43:35', content: '进入计费规则页面' },
      { time: '2026-05-23 12:43:52', content: '修改基础费率：5元/小时 → 6元/小时' },
      { time: '2026-05-23 12:44:10', content: '修改封顶金额：50元/天 → 60元/天' },
      { time: '2026-05-23 12:44:15', content: '提交修改，执行成功' },
    ],
  },
  {
    id: 2,
    agentName: 'Hem Thavorak',
    requestIP: '118.31.144.100, 0:0:0:0:0:0:0:1',
    operationDesc: '代理端 - 扫码绑定设备',
    status: '成功',
    processTime: '43',
    operationTime: '2026-05-23 12:46:08',
    logs: [
      { time: '2026-05-23 12:45:25', content: '打开设备扫码绑定页面' },
      { time: '2026-05-23 12:45:50', content: '扫描设备二维码：DH-20260523-001' },
      { time: '2026-05-23 12:46:05', content: '验证设备信息通过，网点：金边中央商场' },
      { time: '2026-05-23 12:46:08', content: '绑定成功，设备已分配至网点' },
    ],
  },
  {
    id: 3,
    agentName: 'Sok Chen',
    requestIP: '118.31.144.29, 127.0.0.1',
    operationDesc: '代理端 - 修改计费规则',
    status: '失败',
    processTime: '120',
    operationTime: '2026-05-23 13:10:22',
    logs: [
      { time: '2026-05-23 13:08:02', content: '进入计费规则页面' },
      { time: '2026-05-23 13:09:15', content: '修改基础费率：6元/小时 → 8元/小时' },
      { time: '2026-05-23 13:09:40', content: '修改封顶金额：60元/天 → 80元/天' },
      { time: '2026-05-23 13:10:22', content: '提交失败：费率超出允许范围上限，操作回滚' },
    ],
  },
  {
    id: 4,
    agentName: 'Sok Chen',
    requestIP: '118.31.144.29, 127.0.0.1',
    operationDesc: '代理端 - 修改网点信息',
    status: '成功',
    processTime: '25',
    operationTime: '2026-05-23 14:05:33',
    logs: [
      { time: '2026-05-23 14:05:08', content: '进入网点管理页面' },
      { time: '2026-05-23 14:05:20', content: '修改网点名称：暹粒分店A → 暹粒中央分店' },
      { time: '2026-05-23 14:05:33', content: '提交修改成功' },
    ],
  },
  {
    id: 5,
    agentName: 'Lim Sotheara',
    requestIP: '103.216.80.45',
    operationDesc: '代理端 - 新增设备',
    status: '成功',
    processTime: '55',
    operationTime: '2026-05-23 15:20:41',
    logs: [
      { time: '2026-05-23 15:19:46', content: '进入设备管理页面' },
      { time: '2026-05-23 15:20:10', content: '填写设备信息：型号DH-500，数量10台' },
      { time: '2026-05-23 15:20:30', content: '分配至网点：西哈努克港分店' },
      { time: '2026-05-23 15:20:41', content: '新增成功，设备已入库' },
    ],
  },
  {
    id: 6,
    agentName: 'Lim Sotheara',
    requestIP: '103.216.80.45',
    operationDesc: '代理端 - 提现申请',
    status: '成功',
    processTime: '30',
    operationTime: '2026-05-23 16:35:18',
    logs: [
      { time: '2026-05-23 16:34:48', content: '进入提现页面' },
      { time: '2026-05-23 16:35:05', content: '发起提现申请：金额 $500.00，提至银行卡 ****4521' },
      { time: '2026-05-23 16:35:18', content: '提现申请提交成功，预计1-3个工作日到账' },
    ],
  },
  {
    id: 7,
    agentName: 'Hem Thavorak',
    requestIP: '118.31.144.100, 0:0:0:0:0:0:0:1',
    operationDesc: '代理端 - 删除设备',
    status: '失败',
    processTime: '88',
    operationTime: '2026-05-23 17:50:09',
    logs: [
      { time: '2026-05-23 17:48:41', content: '进入设备管理页面' },
      { time: '2026-05-23 17:49:20', content: '选择设备：DH-20260515-007，执行删除操作' },
      { time: '2026-05-23 17:50:09', content: '删除失败：设备当前处于租借中状态，无法删除' },
    ],
  },
  {
    id: 8,
    agentName: 'Sok Chen',
    requestIP: '118.31.144.29, 127.0.0.1',
    operationDesc: '代理端 - 修改密码',
    status: '成功',
    processTime: '15',
    operationTime: '2026-05-23 18:22:55',
    logs: [
      { time: '2026-05-23 18:22:40', content: '进入账户安全设置页面' },
      { time: '2026-05-23 18:22:55', content: '密码修改成功，已发送确认邮件' },
    ],
  },
]

export default function AgentLogsPage() {
  const [searchName, setSearchName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<typeof agentLogData[0] | null>(null)
  const [showLogModal, setShowLogModal] = useState(false)

  const handleReset = () => {
    setSearchName('')
    setStartDate('')
    setEndDate('')
  }

  const openLogModal = (item: typeof agentLogData[0]) => {
    setSelectedAgent(item)
    setShowLogModal(true)
  }

  const closeModal = () => {
    setSelectedAgent(null)
    setShowLogModal(false)
  }

  // Filter data by search and date range
  const filteredData = agentLogData.filter((item) => {
    const nameMatch = !searchName || item.agentName.toLowerCase().includes(searchName.toLowerCase())
    const startMatch = !startDate || item.operationTime >= startDate
    const endMatch = !endDate || item.operationTime <= endDate + ' 23:59:59'
    return nameMatch && startMatch && endMatch
  })

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">代理端日志</h1>
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
          <span className="text-[#3B82F6] font-medium">代理端日志</span>
        </div>

        {/* Filter + Action Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="请输入代理姓名"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="h-9 w-[180px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#64748B] shrink-0">开始日期</span>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-9 w-[160px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#64748B] shrink-0">结束日期</span>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-9 w-[160px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
                />
              </div>
              <Button className="h-9 px-5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200">
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
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <ScrollText className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">代理端日志列表</h3>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider w-[60px] text-center">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider">代理姓名</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Group by agent name */}
                {(() => {
                  const grouped: Record<string, typeof agentLogData> = {}
                  filteredData.forEach((item) => {
                    if (!grouped[item.agentName]) {
                      grouped[item.agentName] = []
                    }
                    grouped[item.agentName].push(item)
                  })

                  const entries = Object.entries(grouped)
                  if (entries.length === 0) {
                    return (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-12">
                          <div className="flex flex-col items-center gap-2">
                            <ScrollText className="w-10 h-10 text-[#CBD5E1]" />
                            <span className="text-[13px] text-[#94A3B8]">暂无数据</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  }

                  return entries.map(([name, items], idx) => (
                    <TableRow
                      key={name}
                      className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                    >
                      <TableCell className="py-4 text-center">
                        <span className="text-[13px] text-[#334155] font-medium">{idx + 1}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-[11px] font-semibold shadow-sm">
                            {name.charAt(0)}
                          </div>
                          <div>
                            <span className="text-[13px] text-[#334155] font-medium">代理:{name}</span>
                            <span className="block text-[11px] text-[#94A3B8]">{items.length} 条操作记录</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => openLogModal(items[0])}
                            className="inline-flex items-center gap-1 text-[12px] text-[#3B82F6] font-semibold hover:underline transition-all duration-200"
                          >
                            <Eye className="w-3 h-3" />
                            查看
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                })()}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ========== 日志详情弹窗 ========== */}
      {showLogModal && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div
            className="relative bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] w-[780px] max-h-[85vh] overflow-hidden flex flex-col"
            style={{ animation: 'modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-purple-200/50">
                  <ScrollText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111827]">代理端日志详情</h3>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">代理:{selectedAgent.agentName}</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-[#F1F5F9] transition-colors group">
                <X className="w-5 h-5 text-[#94A3B8] group-hover:text-[#334155] transition-colors" />
              </button>
            </div>

            {/* Body - Timeline log content */}
            <div className="px-6 py-5 overflow-y-auto flex-1 custom-scrollbar">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#6366F1] to-[#8B5CF6]" />
                <h4 className="text-[14px] font-semibold text-[#111827]">操作时间线</h4>
                <Activity className="w-3.5 h-3.5 text-[#8B5CF6] ml-0.5" />
              </div>

              <div className="pl-3 space-y-0">
                {agentLogData
                  .filter((item) => item.agentName === selectedAgent.agentName)
                  .sort((a, b) => a.operationTime.localeCompare(b.operationTime))
                  .map((item, opIdx, opArr) => (
                    <div key={item.id} className="relative">
                      {/* Operation group: header + sub-logs */}
                      <div className="flex gap-4 relative">
                        {/* Timeline line & dot */}
                        <div className="flex flex-col items-center w-[14px] shrink-0">
                          <div className={`w-[12px] h-[12px] rounded-full border-[2.5px] shrink-0 z-10 mt-1 ${
                            item.status === '成功'
                              ? 'bg-[#10B981] border-[#10B981] shadow-md shadow-emerald-200/50'
                              : 'bg-[#EF4444] border-[#EF4444] shadow-md shadow-red-200/50'
                          }`} />
                          <div className="w-[2px] flex-1 bg-[#E2E8F0] mt-1" />
                        </div>
                        {/* Operation header */}
                        <div className="pb-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-[12px] text-[#94A3B8] font-mono">
                              <Clock className="w-3 h-3 inline -mt-0.5 mr-0.5" />
                              {item.operationTime}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[11px] text-[#64748B] font-semibold">
                              {item.operationDesc}
                            </span>
                            {/* 请求IP */}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F0F9FF] text-[11px] text-[#0369A1] font-medium">
                              <Server className="w-3 h-3" />
                              {item.requestIP}
                            </span>
                            {/* 执行状态 */}
                            {item.status === '成功' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[11px] font-semibold text-[#059669]">
                                <CheckCircle2 className="w-3 h-3" />
                                成功
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF2F2] text-[11px] font-semibold text-[#DC2626]">
                                <XCircle className="w-3 h-3" />
                                失败
                              </span>
                            )}
                            {/* 处理时间 */}
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[11px] text-[#6D28D9] font-medium">
                              <Timer className="w-3 h-3" />
                              {item.processTime}s
                            </span>
                          </div>

                          {/* Sub-log steps */}
                          <div className="pl-2 space-y-0">
                            {item.logs.map((log, logIdx, logArr) => (
                              <div key={logIdx} className="flex gap-3 relative">
                                {/* Sub timeline line */}
                                <div className="flex flex-col items-center w-[14px] shrink-0">
                                  <div className={`w-[7px] h-[7px] rounded-full border-2 shrink-0 z-10 mt-2 ${
                                    log.content.includes('成功')
                                      ? 'bg-[#10B981] border-[#10B981]'
                                      : log.content.includes('失败')
                                      ? 'bg-[#EF4444] border-[#EF4444]'
                                      : 'bg-white border-[#CBD5E1]'
                                  }`} />
                                  {logIdx < logArr.length - 1 && (
                                    <div className="w-[1.5px] flex-1 bg-[#E2E8F0] mt-0.5" />
                                  )}
                                </div>
                                {/* Sub log content */}
                                <div className={`pb-3 flex-1 min-w-0 ${logIdx === logArr.length - 1 ? 'pb-1' : ''}`}>
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[10px] text-[#94A3B8] font-mono">{log.time}</span>
                                  </div>
                                  <p className={`text-[12px] leading-relaxed ${
                                    log.content.includes('成功')
                                      ? 'text-[#059669]'
                                      : log.content.includes('失败')
                                      ? 'text-[#DC2626]'
                                      : 'text-[#475569]'
                                  }`}>
                                    {log.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#FAFBFC] shrink-0">
              <Button
                variant="outline"
                onClick={closeModal}
                className="h-10 px-8 border-[#E2E8F0] text-[#64748B] hover:border-[#6366F1] hover:text-[#6366F1] hover:bg-[#F5F3FF] text-[13px] font-medium rounded-xl transition-all duration-200"
              >
                关闭
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
