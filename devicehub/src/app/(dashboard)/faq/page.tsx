'use client'

import { useState } from 'react'
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
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronRight,
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  Clock,
  X,
} from 'lucide-react'

// Mock FAQ data
const faqData = [
  {
    id: 1,
    zhQuestion: '扫码之后充电宝未弹出？',
    zhAnswer: '如您在扫码租借成功后充电宝未弹出，可联系店员或自己重启设备，仍无法弹出建议您拍照记录相关情况，及时联系在线客服或电话客服寻求帮助！',
    enQuestion: "The power bank didn't pop up after scanning the code?",
    enAnswer: "If the power bank does not pop up after scanning the code and renting it successfully, you can contact the clerk or restart the device by yourself. If it still can't pop up, it is recommended that you take photos to record the relevant situation, and contact online customer service or telephone customer service for help in time!",
    type: '弹出失败',
    createDate: '2024-07-26 11:33:57',
    updateDate: '2024-07-26 11:33:57',
  },
  {
    id: 2,
    zhQuestion: '充电宝无法正常充电？',
    zhAnswer: '请检查充电线是否连接牢固，更换其他充电线尝试。如仍无法充电，可能是充电宝本身故障，建议归还后重新租借一个新的充电宝，并联系客服反馈问题。',
    enQuestion: 'The power bank cannot charge normally?',
    enAnswer: 'Please check if the charging cable is securely connected and try replacing it with another cable. If it still cannot charge, it may be a fault with the power bank itself. It is recommended to return it and rent a new one, and contact customer service to report the issue.',
    type: '充电异常',
    createDate: '2024-07-28 09:15:30',
    updateDate: '2024-07-28 09:15:30',
  },
  {
    id: 3,
    zhQuestion: '如何退还充电宝？',
    zhAnswer: '您可以将充电宝归还至任意网点的设备中，插入任意空闲插槽即可完成归还。归还成功后系统会自动结算费用，请确认设备指示灯亮起以确认归还成功。',
    enQuestion: 'How to return the power bank?',
    enAnswer: 'You can return the power bank to the device at any site by inserting it into any empty slot. After successful return, the system will automatically settle the fee. Please confirm that the device indicator light is on to ensure the return is successful.',
    type: '归还问题',
    createDate: '2024-08-01 14:22:18',
    updateDate: '2024-08-05 10:30:42',
  },
  {
    id: 4,
    zhQuestion: '扣费金额异常怎么办？',
    zhAnswer: '如发现扣费金额异常，请先查看订单详情确认计费时长。如有疑问，请截图订单详情并联系在线客服，客服将在核实后为您处理退款或调整费用。',
    enQuestion: 'What should I do if the deduction amount is abnormal?',
    enAnswer: 'If you find the deduction amount abnormal, please check the order details first to confirm the billing duration. If you have any questions, please screenshot the order details and contact online customer service. Customer service will process a refund or adjust the fee after verification.',
    type: '费用问题',
    createDate: '2024-08-10 16:45:09',
    updateDate: '2024-08-12 11:20:33',
  },
  {
    id: 5,
    zhQuestion: '充电宝丢失如何处理？',
    zhAnswer: '充电宝丢失后，订单将持续计费。建议您尽快联系客服处理，客服将协助您结束订单并按丢失标准收取费用。同时您也可以尝试回到租借网点寻找。',
    enQuestion: 'How to handle a lost power bank?',
    enAnswer: 'After the power bank is lost, the order will continue to be billed. It is recommended that you contact customer service as soon as possible. Customer service will help you end the order and charge according to the loss standard. At the same time, you can also try to go back to the rental site to look for it.',
    type: '丢失问题',
    createDate: '2024-08-15 08:55:27',
    updateDate: '2024-08-15 08:55:27',
  },
]

const faqTypes = ['弹出失败', '充电异常', '归还问题', '费用问题', '丢失问题']

export default function FaqPage() {
  const [filters, setFilters] = useState({
    type: '',
  })
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof faqData[0] | null>(null)

  const handleReset = () => {
    setFilters({ type: '' })
  }

  const handleEdit = (item: typeof faqData[0]) => {
    setSelectedItem(item)
    setEditDialogOpen(true)
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">常见问题</h1>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#64748B]">
              共 {faqData.length} 条记录
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
          <span className="text-[#3B82F6] font-medium">常见问题</span>
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
              {/* 问题类型 */}
              <div className="space-y-2 w-[180px]">
                <Label className="text-[12px] text-[#64748B] font-medium">问题类型</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                    <SelectValue placeholder="请选择类型" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {faqTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
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
              <HelpCircle className="w-4 h-4 text-[#3B82F6]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">问题列表</h3>
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
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center w-[60px]">序号</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">中文问题</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">中文答案</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">英文问题</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">英文答案</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">类型</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">创建日期</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider">修改日期</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#64748B] whitespace-nowrap uppercase tracking-wider text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[#F1F5F9] transition-all duration-200 hover:bg-[#F8FAFC]"
                  >
                    <TableCell className="py-3.5 text-center">
                      <span className="text-[13px] text-[#334155] font-medium">{item.id}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#334155] line-clamp-2 max-w-[150px]">{item.zhQuestion}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] line-clamp-2 max-w-[200px]">{item.zhAnswer}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#334155] line-clamp-2 max-w-[150px]">{item.enQuestion}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="text-[12px] text-[#64748B] line-clamp-2 max-w-[200px]">{item.enAnswer}</span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-50 text-[11px] font-semibold text-[#D97706] border border-amber-100 whitespace-nowrap">
                        {item.type}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[11px] text-[#64748B] whitespace-nowrap">{item.createDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span className="text-[11px] text-[#64748B] whitespace-nowrap">{item.updateDate}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-7 px-2.5 text-[11px] border-[#3B82F6]/30 text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] rounded-lg font-semibold transition-all duration-200 shadow-none"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          编辑
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
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
                共 <span className="text-[#334155] font-semibold">{faqData.length}</span> 条
              </span>
              <Select defaultValue="10">
                <SelectTrigger className="h-8 w-[100px] text-[12px] border-[#E2E8F0] bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="10">10条/页</SelectItem>
                  <SelectItem value="20">20条/页</SelectItem>
                  <SelectItem value="50">50条/页</SelectItem>
                </SelectContent>
              </Select>
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
              <div className="flex items-center gap-1.5 ml-2">
                <span className="text-[12px] text-[#94A3B8]">前往</span>
                <Input
                  defaultValue="1"
                  className="h-8 w-[48px] text-[12px] text-center border-[#E2E8F0] bg-white rounded-lg px-1"
                />
                <span className="text-[12px] text-[#94A3B8]">页</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add FAQ Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[680px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200/50">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">新增常见问题</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">添加新的FAQ条目</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            {/* 中文问题 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">中文问题</Label>
              <Input
                placeholder="请输入中文问题"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* 中文答案 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">中文答案</Label>
              <Textarea
                placeholder="请输入中文答案"
                rows={3}
                className="text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1] resize-none"
              />
            </div>

            {/* 英文问题 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">英文问题</Label>
              <Input
                placeholder="Please enter the English question"
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1]"
              />
            </div>

            {/* 英文答案 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">英文答案</Label>
              <Textarea
                placeholder="Please enter the English answer"
                rows={3}
                className="text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 placeholder:text-[#CBD5E1] resize-none"
              />
            </div>

            {/* 类型 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">问题类型</Label>
              <Select>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue placeholder="请选择类型" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {faqTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setAddDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-emerald-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[680px] p-0 gap-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.1)] overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <DialogHeader className="px-7 py-5 border-b border-[#E2E8F0] shrink-0 bg-gradient-to-r from-[#F8FAFC] to-white relative">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-[17px] font-bold text-[#111827] tracking-tight">编辑常见问题</DialogTitle>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">序号: {selectedItem?.id || ''}</p>
                </div>
              </div>
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors duration-200">
                  <X className="w-4 h-4 text-[#64748B]" />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto custom-scrollbar flex-1 px-7 py-6 space-y-5">
            {/* 中文问题 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">中文问题</Label>
              <Input
                defaultValue={selectedItem?.zhQuestion || ''}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>

            {/* 中文答案 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">中文答案</Label>
              <Textarea
                defaultValue={selectedItem?.zhAnswer || ''}
                rows={3}
                className="text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 resize-none"
              />
            </div>

            {/* 英文问题 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">英文问题</Label>
              <Input
                defaultValue={selectedItem?.enQuestion || ''}
                className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200"
              />
            </div>

            {/* 英文答案 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">英文答案</Label>
              <Textarea
                defaultValue={selectedItem?.enAnswer || ''}
                rows={3}
                className="text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 resize-none"
              />
            </div>

            {/* 类型 */}
            <div className="space-y-2">
              <Label className="text-[12px] text-[#64748B] font-medium">问题类型</Label>
              <Select defaultValue={selectedItem?.type}>
                <SelectTrigger className="h-9 text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {faqTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-7 py-4 border-t border-[#E2E8F0] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] text-[13px] font-medium rounded-xl transition-all duration-200"
            >
              取消
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              className="h-9 px-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[13px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
            >
              确认
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
