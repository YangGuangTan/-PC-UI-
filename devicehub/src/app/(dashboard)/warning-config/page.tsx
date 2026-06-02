'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  LayoutDashboard,
  Bell,
  Globe,
  ChevronDown,
  RefreshCw,
  ChevronRight,
  ShieldAlert,
  RotateCcw,
  Check,
} from 'lucide-react'

// Default config values matching the image
const defaultConfig = {
  deviceDailyRentLimit: '30',
  userRechargeTotalLimit: '20',
  userDailyRechargeLimit: '3',
  userDailyRentOrderLimit: '10',
  userRentOrderTotalLimit: '100',
  userDailyPayFailLimit: '10',
  userPayFailTotalLimit: '50',
  userSiteRentOrderLimit: '20',
  userSiteRentOrderTotalLimit: '100',
}

export default function WarningConfigPage() {
  const [config, setConfig] = useState({ ...defaultConfig })

  const handleReset = () => {
    setConfig({ ...defaultConfig })
  }

  const handleConfirm = () => {
    // Mock confirm action
    alert('配置已保存')
  }

  const configFields: Array<{
    key: keyof typeof defaultConfig
    label: string
  }> = [
    { key: 'deviceDailyRentLimit', label: '单个设备单日可租借次数上限' },
    { key: 'userRechargeTotalLimit', label: '用户充值钱包总次数' },
    { key: 'userDailyRechargeLimit', label: '用户单日充值钱包次数' },
    { key: 'userDailyRentOrderLimit', label: '用户单日可租借订单数' },
    { key: 'userRentOrderTotalLimit', label: '用户租借订单总上限' },
    { key: 'userDailyPayFailLimit', label: '用户单日支付失败次数' },
    { key: 'userPayFailTotalLimit', label: '用户单日支付失败总次数' },
    { key: 'userSiteRentOrderLimit', label: '单个用户单子在某网点下租借订单上限' },
    { key: 'userSiteRentOrderTotalLimit', label: '单个用户单子在某网点下租借订单总上限' },
  ]

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-[18px] font-bold text-[#111827] tracking-tight">预警配置</h1>
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
          <span className="text-[#3B82F6] font-medium">预警配置</span>
        </div>

        {/* Config Form */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Form Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="text-[14px] font-semibold text-[#111827]">预警参数配置</h3>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6">
            <div className="max-w-[680px] mx-auto space-y-5">
              {configFields.map((field) => (
                <div key={field.key} className="flex items-center gap-4">
                  <Label className="text-[13px] text-[#334155] font-medium min-w-[320px] shrink-0 text-right">
                    {field.label}
                  </Label>
                  <Input
                    type="number"
                    value={config[field.key]}
                    onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
                    className="h-9 w-[200px] text-[13px] border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 rounded-lg transition-all duration-200 text-center font-semibold text-[#334155]"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-[#F1F5F9]">
              <Button
                onClick={handleConfirm}
                className="h-10 px-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-[14px] font-semibold rounded-xl shadow-md shadow-blue-200/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50"
              >
                <Check className="w-4 h-4 mr-2" />
                确定
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-10 px-8 border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#EFF6FF] text-[14px] font-medium rounded-xl transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
