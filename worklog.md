---
Task ID: 1
Agent: Main Agent
Task: 在货币管理新增按钮弹窗中加入图片内容，要求有条理性

Work Log:
- 使用VLM分析了两张上传图片的内容
- 图片1：提现设置（提现方式复选框 + 提现次数/免征天数/提现范围/货币日限额输入框）
- 图片2：支付设置（支付方式8个复选框 + 预设数据1-6输入框 + 最小/最大金额/押金设置输入框）
- 更新了editForm状态，添加了paymentMethods、withdrawMethods、presetData1-6、paymentMinAmount、paymentMaxAmount、depositSetting、dailyLimit等新字段
- 添加了Checkbox和Wallet、CreditCard组件的import
- 重新设计了新增弹窗的布局，分为三个清晰的部分：
  1. 基本信息（蓝色标识）：货币名称、代码/符号、最小金额、图标
  2. 支付设置（绿色标识）：支付方式8个复选框、预设数据1-6、金额设置
  3. 提现设置（橙色标识）：提现方式3个复选框、提现次数/免征天数、提现范围、货币日限额
- 弹窗宽度从520px扩展到700px以容纳更多内容
- 各部分之间用虚线分隔，每部分带有彩色竖条标识和图标
- 修复了openEditModal和openDetailModal中的类型错误

Stage Summary:
- 货币管理新增弹窗已成功重构，包含三部分内容
- 服务器已启动，页面可正常访问 http://localhost:3000/currency
- 所有修改保存在 /home/z/my-project/src/app/(dashboard)/currency/page.tsx
