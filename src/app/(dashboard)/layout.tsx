'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Monitor,
  Building2,
  Users,
  Settings,
  Bell,
  Globe,
  ChevronDown,
  Zap,
  ChevronRight,
  RefreshCw,
  LogOut,
  Package,
  BatteryMedium,
  ClipboardList,
  RotateCcw,
  Wrench,
  Wallet,
  Receipt,
  Banknote,
  Image,
  CreditCard,
  Megaphone,
  Ticket,
  HelpCircle,
  Landmark,
  AlertTriangle,
  ShieldAlert,
  UserCog,
  BadgeDollarSign,
  FileClock,
  GitBranch,
  Tv,
  Mail,
  Briefcase,
  ShieldCheck,
  Blocks,
  Coins,
  ScrollText,
} from 'lucide-react'
import { ReactNode } from 'react'

// Sidebar navigation items
const sidebarNavSections = [
  {
    label: '',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    ],
  },
  {
    label: '业务管理',
    items: [
      { icon: Monitor, label: '设备管理', href: '/devices' },
      { icon: Package, label: '设备仓库', href: '/warehouse' },
      { icon: BatteryMedium, label: '单宝管理', href: '/powerbank' },
      { icon: ClipboardList, label: '订单列表', href: '/orders' },
      { icon: RotateCcw, label: '退款订单', href: '/refunds' },
      { icon: Wrench, label: '工单管理', href: '/workorders' },
      { icon: Building2, label: '网点管理', href: '/sites' },
      { icon: Users, label: '代理商管理', href: '/agents' },
      { icon: Wallet, label: '代理账号', href: '/agent-accounts' },
      { icon: Receipt, label: '分账明细', href: '/ledger-details' },
      { icon: Banknote, label: '代理提现', href: '/agent-withdrawals' },
      { icon: Image, label: '轮播图管理', href: '/banners' },
      { icon: CreditCard, label: '会员管理', href: '/members' },
      { icon: Megaphone, label: '广告管理', href: '/ads' },
      { icon: Mail, label: '订阅管理', href: '/subscriptions' },
      { icon: Briefcase, label: '招商管理', href: '/investment' },
      { icon: Ticket, label: '优惠券管理', href: '/coupons' },
      { icon: ShieldCheck, label: '角色管理', href: '/roles' },
      { icon: UserCog, label: '账号管理', href: '/accounts' },
      { icon: Blocks, label: '模块管理', href: '/modules' },
      { icon: Coins, label: '货币管理', href: '/currency' },
      { icon: HelpCircle, label: '常见问题', href: '/faq' },
      { icon: Landmark, label: '支付方式', href: '/payment-methods' },
      { icon: AlertTriangle, label: '预警记录', href: '/warning-records' },
      { icon: ShieldAlert, label: '预警配置', href: '/warning-config' },
      { icon: UserCog, label: '用户管理', href: '/users' },
      { icon: BadgeDollarSign, label: '押金退款', href: '/deposit-refunds' },
      { icon: FileClock, label: '支付记录', href: '/payment-records' },
      { icon: GitBranch, label: '版本管理', href: '/version-management' },
      { icon: Tv, label: '屏幕机管理', href: '/screen-machines' },
      { icon: ScrollText, label: '代理端日志', href: '/agent-logs' },
    ],
  },
  {
    label: '系统',
    items: [
      { icon: Settings, label: '系统设置', href: '/settings' },
    ],
  },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-[#E2E8F0] flex flex-col shrink-0 shadow-[2px_0_8px_rgba(0,0,0,0.03)]">
        {/* Logo */}
        <div className="h-[64px] flex items-center px-6 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[15px] font-bold text-[#111827] tracking-tight">DeviceHub</span>
              <span className="block text-[10px] text-[#9CA3AF] font-medium -mt-0.5">Management System</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-4 overflow-y-auto custom-scrollbar">
          {sidebarNavSections.map((section, sIdx) => (
            <div key={sIdx} className={sIdx > 0 ? 'mt-5' : ''}>
              {section.label && (
                <h3 className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider px-3 mb-2">
                  {section.label}
                </h3>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-normal transition-all duration-200 relative group ${
                          active
                            ? 'bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#2563EB] font-semibold shadow-sm'
                            : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]'
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#3B82F6] rounded-r-full"></span>
                        )}
                        <Icon className={`w-[18px] h-[18px] ${active ? 'text-[#3B82F6]' : 'text-[#94A3B8] group-hover:text-[#64748B]'}`} />
                        {item.label}
                        {active && (
                          <ChevronRight className="w-4 h-4 ml-auto text-[#3B82F6] opacity-60" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer - User Info */}
        <div className="p-4 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-[13px] font-semibold shadow-md shadow-blue-100">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#111827] truncate">Admin</p>
              <p className="text-[11px] text-[#9CA3AF] truncate">admin@devicehub.com</p>
            </div>
            <LogOut className="w-4 h-4 text-[#9CA3AF] hover:text-[#EF4444] transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  )
}
