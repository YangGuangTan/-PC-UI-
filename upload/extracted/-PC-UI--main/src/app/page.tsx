'use client'

import { useState, useEffect, ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import all dashboard pages
const pageComponents: Record<string, ComponentType> = {}

const DevicesPage = dynamic(
  () => import('@/app/(dashboard)/devices/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const AdsPage = dynamic(
  () => import('@/app/(dashboard)/ads/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const SitesPage = dynamic(
  () => import('@/app/(dashboard)/sites/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const OrdersPage = dynamic(
  () => import('@/app/(dashboard)/orders/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const WarehousePage = dynamic(
  () => import('@/app/(dashboard)/warehouse/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const PowerbankPage = dynamic(
  () => import('@/app/(dashboard)/powerbank/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const RefundsPage = dynamic(
  () => import('@/app/(dashboard)/refunds/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const WorkordersPage = dynamic(
  () => import('@/app/(dashboard)/workorders/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const AgentAccountsPage = dynamic(
  () => import('@/app/(dashboard)/agent-accounts/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const LedgerDetailsPage = dynamic(
  () => import('@/app/(dashboard)/ledger-details/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const AgentWithdrawalsPage = dynamic(
  () => import('@/app/(dashboard)/agent-withdrawals/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const BannersPage = dynamic(
  () => import('@/app/(dashboard)/banners/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const MembersPage = dynamic(
  () => import('@/app/(dashboard)/members/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const SubscriptionsPage = dynamic(
  () => import('@/app/(dashboard)/subscriptions/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const CouponsPage = dynamic(
  () => import('@/app/(dashboard)/coupons/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const FaqPage = dynamic(
  () => import('@/app/(dashboard)/faq/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const PaymentMethodsPage = dynamic(
  () => import('@/app/(dashboard)/payment-methods/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const WarningRecordsPage = dynamic(
  () => import('@/app/(dashboard)/warning-records/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const WarningConfigPage = dynamic(
  () => import('@/app/(dashboard)/warning-config/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const UsersPage = dynamic(
  () => import('@/app/(dashboard)/users/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const DepositRefundsPage = dynamic(
  () => import('@/app/(dashboard)/deposit-refunds/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const PaymentRecordsPage = dynamic(
  () => import('@/app/(dashboard)/payment-records/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const VersionManagementPage = dynamic(
  () => import('@/app/(dashboard)/version-management/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const ScreenMachinesPage = dynamic(
  () => import('@/app/(dashboard)/screen-machines/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const InvestmentPage = dynamic(
  () => import('@/app/(dashboard)/investment/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const RolesPage = dynamic(
  () => import('@/app/(dashboard)/roles/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const AccountsPage = dynamic(
  () => import('@/app/(dashboard)/accounts/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const ModulesPage = dynamic(
  () => import('@/app/(dashboard)/modules/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)
const CurrencyPage = dynamic(
  () => import('@/app/(dashboard)/currency/page').then(mod => mod.default),
  { ssr: false, loading: () => <LoadingState /> }
)

// Map menu index to page component
const pageMap: Record<number, ComponentType> = {
  0: DevicesPage,      // Dashboard (show devices as default)
  1: DevicesPage,       // 设备管理
  2: WarehousePage,     // 设备仓库
  3: PowerbankPage,     // 单宝管理
  4: OrdersPage,        // 订单列表
  5: RefundsPage,       // 退款订单
  6: WorkordersPage,    // 工单管理
  7: SitesPage,         // 网点管理
  8: UsersPage,         // 代理商管理
  9: AgentAccountsPage, // 代理账号
  10: LedgerDetailsPage, // 分账明细
  11: AgentWithdrawalsPage, // 代理提现
  12: BannersPage,       // 轮播图管理
  13: MembersPage,       // 会员管理
  14: AdsPage,              // 广告管理
  15: SubscriptionsPage,    // 订阅管理
  16: InvestmentPage,        // 招商管理
  17: CouponsPage,          // 优惠券管理
  18: RolesPage,              // 角色管理
  19: AccountsPage,           // 账号管理
  20: ModulesPage,            // 模块管理
  21: CurrencyPage,           // 货币管理
  22: FaqPage,              // 常见问题
  23: PaymentMethodsPage,   // 支付方式
  24: WarningRecordsPage,   // 预警记录
  25: WarningConfigPage,    // 预警配置
  26: UsersPage,            // 用户管理
  27: DepositRefundsPage,   // 押金退款
  28: PaymentRecordsPage,   // 支付记录
  29: VersionManagementPage, // 版本管理
  30: ScreenMachinesPage,    // 屏幕机管理
  31: DevicesPage,           // 系统设置 (placeholder)
}

// Map menu index to URL slug
const urlMap: Record<number, string> = {
  0: '/',
  1: '/devices',
  2: '/warehouse',
  3: '/powerbank',
  4: '/orders',
  5: '/refunds',
  6: '/workorders',
  7: '/sites',
  8: '/agents',
  9: '/agent-accounts',
  10: '/ledger-details',
  11: '/agent-withdrawals',
  12: '/banners',
  13: '/members',
  14: '/ads',
  15: '/subscriptions',
  16: '/investment',
  17: '/coupons',
  18: '/roles',
  19: '/accounts',
  20: '/modules',
  21: '/currency',
  22: '/faq',
  23: '/payment-methods',
  24: '/warning-records',
  25: '/warning-config',
  26: '/users',
  27: '/deposit-refunds',
  28: '/payment-records',
  29: '/version-management',
  30: '/screen-machines',
  31: '/settings',
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-full bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-500">加载中...</p>
      </div>
    </div>
  )
}

function ComingSoonPage({ title }: { title: string }) {
  return (
    <>
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0">
        <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">{title}</h1>
      </header>
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[#334155] mb-2">{title}</h3>
          <p className="text-sm text-[#94A3B8]">该功能模块正在开发中，敬请期待...</p>
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [activeMenuIdx, setActiveMenuIdx] = useState(15) // 订阅管理 = index 15

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      setIsOpen(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Get the current page component
  const CurrentPage = pageMap[activeMenuIdx] || DevicesPage
  const currentUrl = urlMap[activeMenuIdx] || '/devices'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div className="flex flex-col items-center gap-6" style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30" style={{ animation: 'floatSlow 2s ease-in-out infinite' }}>
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight">DeviceHub</h1>
              <p className="text-sm text-blue-300/70 mt-1">Management System</p>
            </div>
            <div className="flex gap-1.5 mt-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" style={{ animation: 'dotBounce 1.4s ease-in-out infinite' }} />
              <div className="w-2 h-2 rounded-full bg-blue-400" style={{ animation: 'dotBounce 1.4s ease-in-out 0.15s infinite' }} />
              <div className="w-2 h-2 rounded-full bg-blue-400" style={{ animation: 'dotBounce 1.4s ease-in-out 0.3s infinite' }} />
            </div>
          </div>
        </div>
      )}

      {/* Landing Page Content (behind popup) */}
      <div className="relative z-0 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-blue-200/80">项目已就绪</span>
          </div>

          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">DeviceHub</h1>
          <p className="text-lg text-blue-200/60 mb-8">PC 端后台管理系统</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-lg mx-auto">
            {[
              { label: '页面模块', value: '22+' },
              { label: 'UI 组件', value: '30+' },
              { label: '数据表格', value: '15+' },
              { label: '表单弹窗', value: '20+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-blue-300/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            打开项目预览
          </button>

          <p className="text-xs text-blue-300/30 mt-6">
            点击上方按钮以弹窗形式预览完整项目
          </p>
        </div>
      </div>

      {/* Popup Modal - Project Preview */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); setIsFullscreen(false) }}
          />

          {/* Popup Container */}
          <div
            className={`relative bg-[#F8FAFC] overflow-hidden shadow-2xl border border-slate-200/80 transition-all duration-500 ease-out ${
              isFullscreen
                ? 'w-full h-full rounded-none'
                : 'w-[95vw] h-[92vh] max-w-[1500px] rounded-2xl'
            }`}
            style={{ animation: 'popupEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Browser-style Title Bar */}
            <div className="h-11 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 select-none">
              <div className="flex items-center gap-3">
                {/* Traffic light buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setIsOpen(false); setIsFullscreen(false) }}
                    className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all flex items-center justify-center group"
                  >
                    <svg className="w-[6px] h-[6px] text-[#FF5F57] group-hover:text-white/80" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 1l6 6M7 1l-6 6" />
                    </svg>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-90 transition-all" />
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-90 transition-all flex items-center justify-center group"
                  >
                    {isFullscreen ? (
                      <svg className="w-[6px] h-[6px] text-[#28C840] group-hover:text-white/80" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 3v-2h2M7 5v2h-2M3 1l-2 2M5 7l2-2" />
                      </svg>
                    ) : (
                      <svg className="w-[6px] h-[6px] text-[#28C840] group-hover:text-white/80" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 1h6v6H1z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="h-4 w-px bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-slate-700">DeviceHub</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* URL Bar */}
                <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-3 py-1 border border-slate-200 min-w-[180px]">
                  <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[11px] text-slate-400 font-mono truncate">
                    devicehub.com{currentUrl}
                  </span>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title={isFullscreen ? '退出全屏' : '全屏'}
                >
                  {isFullscreen ? (
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Project Content - The full dashboard with sidebar */}
            <div className="flex" style={{ height: isFullscreen ? 'calc(100vh - 44px)' : 'calc(92vh - 44px)' }}>
              {/* Sidebar */}
              <Sidebar activeIdx={activeMenuIdx} setActiveIdx={setActiveMenuIdx} />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <CurrentPage />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popupEnter {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Sidebar Component
function Sidebar({ activeIdx, setActiveIdx }: { activeIdx: number; setActiveIdx: (idx: number) => void }) {

  const sections = [
    {
      label: '',
      items: [
        { icon: LayoutDashboardIcon, label: 'Dashboard' },
      ],
    },
    {
      label: '业务管理',
      items: [
        { icon: MonitorIcon, label: '设备管理' },
        { icon: PackageIcon, label: '设备仓库' },
        { icon: BatteryIcon, label: '单宝管理' },
        { icon: ClipboardIcon, label: '订单列表' },
        { icon: RotateIcon, label: '退款订单' },
        { icon: WrenchIcon, label: '工单管理' },
        { icon: BuildingIcon, label: '网点管理' },
        { icon: UsersIcon, label: '代理商管理' },
        { icon: WalletIcon, label: '代理账号' },
        { icon: ReceiptIcon, label: '分账明细' },
        { icon: BanknoteIcon, label: '代理提现' },
        { icon: ImageIcon, label: '轮播图管理' },
        { icon: CreditCardIcon, label: '会员管理' },
        { icon: MegaphoneIcon, label: '广告管理' },
        { icon: MailIcon, label: '订阅管理' },
        { icon: BriefcaseIcon, label: '招商管理' },
        { icon: TicketIcon, label: '优惠券管理' },
        { icon: ShieldCheckIcon, label: '角色管理' },
        { icon: AccountIcon, label: '账号管理' },
        { icon: ModuleIcon, label: '模块管理' },
        { icon: CurrencyIcon, label: '货币管理' },
        { icon: HelpIcon, label: '常见问题' },
        { icon: LandmarkIcon, label: '支付方式' },
        { icon: AlertIcon, label: '预警记录' },
        { icon: ShieldIcon, label: '预警配置' },
        { icon: UserCogIcon, label: '用户管理' },
        { icon: DepositIcon, label: '押金退款' },
        { icon: PaymentIcon, label: '支付记录' },
        { icon: VersionIcon, label: '版本管理' },
        { icon: ScreenIcon, label: '屏幕机管理' },
      ],
    },
    {
      label: '系统',
      items: [
        { icon: SettingsIcon, label: '系统设置' },
      ],
    },
  ]

  let globalIdx = 0

  return (
    <aside className="w-[240px] bg-white border-r border-[#E2E8F0] flex flex-col shrink-0 overflow-hidden">
      {/* Logo */}
      <div className="h-[52px] flex items-center px-5 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-[14px] font-bold text-[#111827] tracking-tight">DeviceHub</span>
            <span className="block text-[9px] text-[#9CA3AF] font-medium -mt-0.5">Management System</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto custom-scrollbar">
        {sections.map((section, sIdx) => {
          const startIdx = globalIdx
          const sectionItems = section.items.map((item, iIdx) => {
            const idx = startIdx + iIdx
            return { ...item, idx }
          })
          globalIdx += section.items.length

          return (
            <div key={sIdx} className={sIdx > 0 ? 'mt-4' : ''}>
              {section.label && (
                <h3 className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider px-3 mb-1.5">
                  {section.label}
                </h3>
              )}
              <ul className="space-y-0.5">
                {sectionItems.map((item) => {
                  const Icon = item.icon
                  const active = activeIdx === item.idx
                  return (
                    <li key={item.idx}>
                      <button
                        onClick={() => setActiveIdx(item.idx)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] transition-all duration-200 relative group ${
                          active
                            ? 'bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#2563EB] font-semibold shadow-sm'
                            : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155] font-normal'
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#3B82F6] rounded-r-full" />
                        )}
                        <Icon className={`w-[16px] h-[16px] ${active ? 'text-[#3B82F6]' : 'text-[#94A3B8] group-hover:text-[#64748B]'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white text-[11px] font-semibold shadow-md shadow-blue-100">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#111827] truncate">Admin</p>
            <p className="text-[10px] text-[#9CA3AF] truncate">admin@devicehub.com</p>
          </div>
          <svg className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-[#EF4444] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </div>
    </aside>
  )
}

// Minimal SVG icon components to avoid importing 30+ icons
function LayoutDashboardIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 6a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5zM4 13a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" /></svg> }
function MonitorIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
function PackageIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> }
function BatteryIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 10H3m18 0a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2v-2a2 2 0 012-2m18 0V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3" /></svg> }
function ClipboardIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> }
function RotateIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> }
function WrenchIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> }
function BuildingIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> }
function UsersIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
function WalletIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> }
function ReceiptIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg> }
function BanknoteIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> }
function ImageIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> }
function CreditCardIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> }
function MegaphoneIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg> }
function TicketIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg> }
function HelpIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function LandmarkIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10zm4 0v11m4-11v11m4-11v11" /></svg> }
function AlertIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> }
function ShieldIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> }
function UserCogIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function DepositIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function PaymentIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg> }
function VersionIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
function ScreenIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
function MailIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
function BriefcaseIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM9 4h6v3H9V4z" /></svg> }
function ShieldCheckIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> }
function AccountIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function ModuleIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" /></svg> }
function CurrencyIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
function SettingsIcon(p: React.SVGProps<SVGSVGElement>) { return <svg {...p} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> }
