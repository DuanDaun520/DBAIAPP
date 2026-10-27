import { FormEvent, ReactNode, useState } from "react"

type Tab = "today" | "insights" | "ai" | "learning" | "profile"
type DetailKind =
  | "editorial"
  | "industry"
  | "hypothesis"
  | "attention"
  | "attentionReview"
type Perspective = "strategy" | "competition" | "organization" | "risk"
type InsightCategory = "problem" | "opportunity" | "risk"
type InsightStatus =
  | "新发现"
  | "分析中"
  | "待验证"
  | "已确认"
  | "跟进行动"
  | "已解决"
type LearningCategory =
  | "recommended"
  | "ai"
  | "management"
  | "people"
  | "quotes"

type IconName =
  | "home"
  | "insights"
  | "plus"
  | "learning"
  | "profile"
  | "arrow"
  | "back"
  | "spark"
  | "send"
  | "shield"
  | "history"
  | "model"

const navItems: { id: Tab label: string icon: IconName }[] = [
  { id: "today", label: "今日", icon: "home" },
  { id: "insights", label: "工作", icon: "insights" },
  { id: "ai", label: "+AI", icon: "plus" },
  { id: "learning", label: "学习", icon: "learning" },
  { id: "profile", label: "我的", icon: "profile" },
]

type InsightItem = {
  id: string
  category: InsightCategory
  categoryLabel: string
  severity: "重大" | "高" | "中"
  title: string
  finding: string
  evidence: { label: string value: string note: string }[]
  impact: string
  judgment: string
  action: string
  object: string
  discovered: string
  status: InsightStatus
  causes: {
    name: string
    contribution: string
    confidence: string
    evidence: string
    missing: string
  }[]
}

const insightItems: InsightItem[] = [
  {
    id: "east-sales",
    category: "problem",
    categoryLabel: "经营问题",
    severity: "重大",
    title: "华东区域销售下滑，主要集中在少数门店与重点商品",
    finding:
      "最近 7 天华东区域销售额同比下降。下降并非均匀发生，而是集中在部分门店及核心 SKU。",
    evidence: [
      {
        label: "区域销售额",
        value: "-8.6%",
        note: "与可比周期相比的模拟值，已排除新增与闭店门店。",
      },
      {
        label: "重点门店贡献",
        value: "62%",
        note: "12 家重点门店贡献了区域销售降幅的 62%。",
      },
      {
        label: "缺货相关 SKU",
        value: "18 个",
        note: "缺货与销售下降同时出现，仅代表相关性，尚未确认因果。",
      },
    ],
    impact: "存在可恢复销售空间，金额需完成门店与 SKU 级归因后确认。",
    judgment:
      "可能与重点商品供应不足、部分门店客流变化及商品结构变化有关，各因素的实际贡献仍待验证。",
    action: "优先排查影响最大的 12 家门店与 18 个缺货商品，评估补货和调拨收益。",
    object: "华东区域 · 12 家门店",
    discovered: "今天 08:40",
    status: "待验证",
    causes: [
      {
        name: "重点商品缺货",
        contribution: "可能贡献 35%–45%",
        confidence: "中高",
        evidence: "18 个核心 SKU 同期出现库存不足与销售下降",
        missing: "在途库存、替代购买与实际补货时间",
      },
      {
        name: "门店客流变化",
        contribution: "可能贡献 20%–30%",
        confidence: "中",
        evidence: "重点门店到店客流模拟指标较可比期下降",
        missing: "商圈变化、天气与竞店活动信息",
      },
      {
        name: "商品结构变化",
        contribution: "尚待估算",
        confidence: "低",
        evidence: "高贡献品类销售占比发生变化",
        missing: "价格、促销及顾客需求数据",
      },
    ],
  },
  {
    id: "basket-growth",
    category: "opportunity",
    categoryLabel: "增长机会",
    severity: "高",
    title: "部分门店的关联购药表现突出，存在可复制的增长机会",
    finding:
      "部分门店在相关商品推荐、联合购买及顾客需求满足方面，持续优于同类门店。",
    evidence: [
      {
        label: "关联购买率",
        value: "+12.4%",
        note: "高表现门店相对同类门店的模拟差异。",
      },
      {
        label: "高表现门店",
        value: "26 家",
        note: "连续三个观察周期高于同类门店中位数。",
      },
      {
        label: "可验证门店",
        value: "80 家",
        note: "业务结构相似、适合开展小范围验证的候选门店。",
      },
    ],
    impact: "若验证有效，可形成新的同店增长空间；当前不展示为确定收益。",
    judgment:
      "优秀门店的商品组合和服务流程可能值得研究，但需排除商圈与顾客结构差异。",
    action: "选择 10 家相似门店开展小范围验证，对比商品组合、陈列与服务流程。",
    object: "集团 · 106 家门店",
    discovered: "昨天 16:20",
    status: "分析中",
    causes: [
      {
        name: "商品组合更匹配",
        contribution: "潜在主要因素",
        confidence: "中",
        evidence: "高表现门店的联合购买组合更集中",
        missing: "顾客需求与商圈结构校准",
      },
      {
        name: "服务流程差异",
        contribution: "待验证",
        confidence: "低",
        evidence: "部分门店推荐转化表现更高",
        missing: "一线服务过程与人员排班数据",
      },
    ],
  },
  {
    id: "stock-risk",
    category: "risk",
    categoryLabel: "潜在风险",
    severity: "高",
    title: "部分高周转商品的库存保障能力正在减弱",
    finding:
      "部分门店重点商品库存覆盖天数持续下降，若补货未及时跟上，可能影响后续销售。",
    evidence: [
      {
        label: "低于目标 SKU",
        value: "31 个",
        note: "库存覆盖天数低于模拟目标水平的重点商品。",
      },
      {
        label: "涉及门店",
        value: "47 家",
        note: "至少有一个重点 SKU 低于目标库存覆盖。",
      },
      {
        label: "需求缺口",
        value: "待核实",
        note: "需结合在途库存、供应商交期与最新需求确认。",
      },
    ],
    impact: "可能影响重点商品后续销售，当前仅为风险敞口估算。",
    judgment:
      "需结合在途库存、供应商交期和近期需求，进一步判断实际缺货概率。",
    action: "优先检查高销售贡献商品，形成补货或跨店调拨的备选方案。",
    object: "华中区域 · 47 家门店",
    discovered: "今天 09:05",
    status: "新发现",
    causes: [
      {
        name: "补货周期延长",
        contribution: "主要风险信号",
        confidence: "中",
        evidence: "部分门店补货间隔高于近期均值",
        missing: "供应商确认交期与在途库存",
      },
      {
        name: "短期需求上升",
        contribution: "待验证",
        confidence: "低",
        evidence: "部分重点商品近期销量高于预测",
        missing: "活动、季节与区域需求信息",
      },
    ],
  },
  {
    id: "slow-stock",
    category: "problem",
    categoryLabel: "经营问题",
    severity: "中",
    title: "部分门店慢动销库存增加，需要核查商品结构",
    finding: "模拟监测显示，部分门店慢动销商品占用增加，但区域间差异明显。",
    evidence: [
      { label: "涉及门店", value: "34 家", note: "模拟筛选结果。" },
      { label: "观察周期", value: "30 天", note: "最近 30 天演示数据。" },
      { label: "影响估算", value: "分析中", note: "尚未形成可靠金额。" },
    ],
    impact: "可能增加库存与临期管理压力，具体影响尚待商品级核实。",
    judgment: "可能与商品结构、区域需求及调拨效率有关，目前不能认定单一原因。",
    action: "先核对高占用商品与临期批次，再决定促销或调拨。",
    object: "西南区域 · 34 家门店",
    discovered: "2 天前",
    status: "分析中",
    causes: [
      {
        name: "商品结构错配",
        contribution: "待估算",
        confidence: "中",
        evidence: "同类门店动销表现差异较大",
        missing: "区域需求与历史调拨记录",
      },
    ],
  },
  {
    id: "chronic-growth",
    category: "opportunity",
    categoryLabel: "增长机会",
    severity: "中",
    title: "慢病服务触达率差异，提示区域改善空间",
    finding: "相似会员结构的门店之间，慢病服务触达表现存在持续差异。",
    evidence: [
      { label: "候选门店", value: "42 家", note: "模拟相似门店分组。" },
      { label: "表现差距", value: "9.8pt", note: "演示口径下的触达率差异。" },
      { label: "验证周期", value: "4 周", note: "建议的小范围验证周期。" },
    ],
    impact: "可能改善服务连续性与会员关系，销售价值暂不做确定估算。",
    judgment: "门店服务流程可能是影响因素，也需校准会员结构与区域差异。",
    action: "提炼高表现门店流程，在 6 家门店开展四周验证。",
    object: "华南区域 · 42 家门店",
    discovered: "3 天前",
    status: "跟进行动",
    causes: [
      {
        name: "服务流程差异",
        contribution: "潜在主要因素",
        confidence: "中",
        evidence: "高表现门店服务触达更稳定",
        missing: "人员能力与会员需求差异",
      },
    ],
  },
  {
    id: "supplier-risk",
    category: "risk",
    categoryLabel: "潜在风险",
    severity: "中",
    title: "关键供应商交付波动可能放大重点商品缺货风险",
    finding: "部分重点商品的供应商交付周期出现波动，需要结合在途订单继续观察。",
    evidence: [
      { label: "关联供应商", value: "4 家", note: "模拟供应商范围。" },
      { label: "重点商品", value: "22 个", note: "高销售贡献商品示例。" },
      { label: "当前状态", value: "待验证", note: "尚未形成风险结论。" },
    ],
    impact: "若交付继续延迟，可能扩大重点商品库存缺口。",
    judgment: "当前仅观察到交付周期波动，尚不能判断是否会造成实际缺货。",
    action: "确认在途订单与供应商交期，为高贡献商品准备替代方案。",
    object: "供应链 · 22 个商品",
    discovered: "4 天前",
    status: "待验证",
    causes: [
      {
        name: "供应商交付波动",
        contribution: "主要风险信号",
        confidence: "中",
        evidence: "近期模拟交付周期偏离历史区间",
        missing: "供应商确认与采购订单明细",
      },
    ],
  },
]

const perspectiveOrder: Perspective[] = [
  "strategy",
  "competition",
  "organization",
  "risk",
]

const editorialPerspectives: Record<
  Perspective,
  {
    label: string
    title: string
    whyToday: string
    summary: string
    source: string
    evidence: string[]
    causes: string[]
    questions: string[]
  }
> = {
  strategy: {
    label: "战略与增长",
    title: "增长之外，我们是否正在积累新的竞争优势？",
    whyToday:
      "在下一阶段战略规划的模拟场景中，仅讨论规模增长，可能不足以回答长期竞争力从哪里来。",
    summary:
      "值得进一步思考：慢病服务、会员关系与自有品牌，能否形成彼此增强、难以复制的长期能力？",
    source: "行业公开信息 + 集团已有材料（均为演示）",
    evidence: [
      "行业竞争正逐渐从单一商品与门店规模，转向持续服务能力",
      "慢病服务、会员关系与自有品牌，可能形成彼此增强的长期组合",
      "现有演示材料仅提供方向性线索，尚不足以形成经营结论",
    ],
    causes: [
      "更深的会员关系可能改善服务连续性",
      "慢病场景可能提升自有品牌的信任基础",
      "三者协同的价值可能高于各自独立增长",
    ],
    questions: [
      "集团最难被复制的能力究竟是什么？",
      "哪些信息能够验证协同效应是否真实存在？",
    ],
  },
  competition: {
    label: "竞争与行业",
    title: "竞争加剧时，我们真正应该守住什么？",
    whyToday:
      "公开行业信息持续讨论专业服务与会员价值，单纯比较门店规模和价格，可能遗漏竞争方式的变化。",
    summary:
      "可以重新审视：哪些能力直接影响顾客长期信任，哪些优势只是短期资源投入带来的结果？",
    source: "公开政策与行业研究（模拟摘要）",
    evidence: [
      "外部研究逐渐增加对专业服务能力的讨论",
      "价格与区位仍然重要，但未必足以构成长期差异",
      "本视角仅基于公开信息示例，不代表实时行业判断",
    ],
    causes: ["专业服务深度", "长期会员信任", "区域经营适配能力"],
    questions: [
      "未来三年最容易被复制的优势是什么？",
      "哪些能力值得提前投入并长期积累？",
    ],
  },
  organization: {
    label: "组织与人才",
    title: "组织能力，是否跟得上下一阶段的战略要求？",
    whyToday:
      "当战略从规模扩张转向精细服务，组织所需的专业能力、协同方式与评价标准也可能随之改变。",
    summary:
      "建议把战略目标翻译为关键岗位与组织能力，再判断现有机制是否足以支持长期执行。",
    source: "长期战略思考 · 模拟内容",
    evidence: [
      "不同战略重点对应不同的组织能力要求",
      "专业服务需要跨业务、门店与人才体系的持续协同",
      "当前没有真实组织数据支撑，仅作为管理讨论框架",
    ],
    causes: ["关键岗位能力", "跨部门协同机制", "长期评价与激励"],
    questions: [
      "哪些组织能力会成为战略执行的瓶颈？",
      "哪些关键人才需要提前培养与配置？",
    ],
  },
  risk: {
    label: "风险与长期发展",
    title: "哪些今天看似不紧迫的问题，可能决定长期韧性？",
    whyToday:
      "年度经营通常更关注短期结果，也需要留出一个视角，识别影响长期发展的慢变量与潜在约束。",
    summary:
      "可以定期检视政策、人才、供应链与顾客信任等慢变量，避免重要风险只在结果显现后才被看见。",
    source: "长期风险框架 · 模拟内容",
    evidence: [
      "长期风险往往在早期缺少明显的财务信号",
      "政策、人才与信任变化可能通过多条路径影响经营",
      "本视角为模拟风险框架，不代表已识别真实风险",
    ],
    causes: ["政策与合规变化", "关键人才连续性", "供应链与顾客信任"],
    questions: [
      "哪些慢变量值得进入季度战略复盘？",
      "哪些风险需要建立更早的观察信号？",
    ],
  },
}

const details: Record<DetailKind, {
  eyebrow: string
  title: string
  summary: string
  evidence: string[]
  causes: string[]
  questions: string[]
  tone: string
  evidenceLabel: string
  causesLabel: string
}> = {
  editorial: {
    eyebrow: "今日导读",
    title: "增长之外，我们是否正在积累新的竞争优势？",
    summary:
      "结合近期行业趋势与集团已有材料，AI 提出一个值得思考的问题：未来的竞争优势，是否会更多来自慢病服务、会员关系与自有品牌的协同？",
    evidence: [
      "行业竞争正逐渐从单一商品与门店规模，转向持续服务能力",
      "慢病服务、会员关系与自有品牌，可能形成彼此增强的长期组合",
      "现有材料提供了一些线索，但尚不足以形成确定结论",
    ],
    causes: [
      "更深的会员关系能够改善服务连续性",
      "慢病场景可能提升自有品牌的信任基础",
      "三者协同的价值可能高于各自独立增长",
    ],
    questions: [
      "集团最难被复制的能力究竟是什么？",
      "哪些区域已经出现协同效应的早期信号？",
    ],
    tone: "editorial",
    evidenceLabel: "相关背景",
    causesLabel: "尚待验证的假设",
  },
  industry: {
    eyebrow: "行业观察",
    title: "零售药房的竞争，正在从交易走向持续服务",
    summary:
      "以下内容为基于带时间标记的公开来源所制作的模拟摘要，用于演示外部变化筛选，不代表实时行业结论。",
    evidence: [
      "来源示例：2024 年公开政策文件与行业研究（模拟内容）",
      "行业材料持续讨论专业健康管理与长期服务能力",
      "AI 推测：门店价值的评价维度可能从覆盖数量延伸至服务深度",
    ],
    causes: [
      "重新审视门店专业服务能力",
      "会员运营关注长期健康关系",
      "数字化真正服务于线下专业场景",
    ],
    questions: ["这一变化将首先影响哪些业务？", "集团应提前建立什么能力？"],
    tone: "opportunity",
    evidenceLabel: "信息来源与信号",
    causesLabel: "可能影响",
  },
  hypothesis: {
    eyebrow: "集团新进展 · 待研究议题",
    title: "一个值得管理层进一步讨论的问题",
    summary:
      "从演示材料中提炼出一个待研究观点：会员关系质量可能比规模更值得关注。当前没有可靠的集团内部材料支撑，不应视为真实内部进展。",
    evidence: [
      "已知：演示材料更强调会员数量与活跃规模",
      "已知：关于连续服务与长期信任的信息仍不完整",
      "AI 推测：关系质量可能影响长期价值，仍需真实材料验证",
    ],
    causes: ["高质量互动能够提升信任", "持续服务可能改善复购", "不同区域的表现可能存在差异"],
    questions: ["如何定义会员关系的深度？", "还需要补充哪些材料才能验证？"],
    tone: "watch",
    evidenceLabel: "已知信息与推测",
    causesLabel: "AI 推测（待验证）",
  },
  attention: {
    eyebrow: "待您关注",
    title: "战略研讨会前，建议先阅读这份议题摘要",
    summary:
      "下次战略研讨将讨论长期服务能力。AI 已将现有材料整理成一份简短议题摘要，便于会前快速形成问题框架。",
    evidence: [
      "事项来源示例：模拟战略研讨会议程",
      "摘要聚焦慢病服务、会员关系与专业能力三个主题",
      "当前演示环境未连接真实日程、会议或报告系统",
    ],
    causes: ["先明确需要形成的关键判断", "区分已知事实与工作假设", "带着问题进入讨论"],
    questions: ["会议最需要形成哪项共识？", "哪些判断需要更多一线证据？"],
    tone: "editorial",
    evidenceLabel: "事项背景",
    causesLabel: "建议阅读方式",
  },
  attentionReview: {
    eyebrow: "待您关注",
    title: "区域经营复盘前，建议先确认三个关键异常",
    summary:
      "近期模拟经营材料中出现了几项值得进一步核实的区域差异。AI 已整理为简短清单，便于复盘前快速确认事实与信息缺口。",
    evidence: [
      "事项来源示例：模拟区域经营复盘材料",
      "清单聚焦客流、会员活跃与重点品类表现三个维度",
      "当前演示环境未连接真实经营数据或内部报告系统",
    ],
    causes: ["先核实指标口径是否一致", "区分短期波动与趋势变化", "补充一线经营反馈"],
    questions: ["哪些异常最需要优先解释？", "是否存在可复制的区域改善经验？"],
    tone: "watch",
    evidenceLabel: "事项背景",
    causesLabel: "建议核实方式",
  },
}

function Icon({ name, size = 22 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: (
      <>
        <path d="M3.8 10.4 12 3.8l8.2 6.6" />
        <path d="M5.8 9.2v10h12.4v-10M9.2 19.2v-5.8h5.6v5.8" />
      </>
    ),
    insights: (
      <>
        <path d="M4 18.5V13m5.3 5.5V8.2m5.4 10.3v-8m5.3 8V4.8" />
        <path d="m3.5 9.5 5.6-4 5.2 2.1L20.5 3" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    learning: (
      <>
        <path d="M4.5 5.2c2.6-.8 5.1-.2 7.5 1.6v12c-2.4-1.8-4.9-2.3-7.5-1.6z" />
        <path d="M19.5 5.2c-2.6-.8-5.1-.2-7.5 1.6v12c2.4-1.8 4.9-2.3 7.5-1.6z" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 20c.4-4 2.6-6 6.5-6s6.1 2 6.5 6" />
      </>
    ),
    arrow: <path d="m9 5 7 7-7 7" />,
    back: <path d="m15 5-7 7 7 7" />,
    spark: (
      <>
        <path d="M12 2.8c.5 5.1 2.1 7 6.4 7.6-4.3.6-5.9 2.5-6.4 7.6-.5-5.1-2.1-7-6.4-7.6 4.3-.6 5.9-2.5 6.4-7.6Z" />
        <path d="M19 16.3c.2 2 .9 2.8 2.5 3-1.6.2-2.3 1-2.5 3-.2-2-.9-2.8-2.5-3 1.6-.2 2.3-1 2.5-3Z" />
      </>
    ),
    send: (
      <>
        <path d="m4 5 17 7-17 7 3.2-7Z" />
        <path d="M7.2 12H21" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5.5 5.6v5.7c0 4.2 2.2 7.3 6.5 9.7 4.3-2.4 6.5-5.5 6.5-9.7V5.6Z" />
        <path d="m9.2 12 1.8 1.8 4-4" />
      </>
    ),
    history: (
      <>
        <path d="M4 5.5h12.5A2.5 2.5 0 0 1 19 8v7.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3v-3H4A2.5 2.5 0 0 1 1.5 15.5V8A2.5 2.5 0 0 1 4 5.5Z" />
        <path d="M6 10h8M6 13.5h5" />
      </>
    ),
    model: (
      <>
        <path d="m12 3 7 4-7 4-7-4Z" />
        <path d="m5 11 7 4 7-4M5 15l7 4 7-4" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function DemoBadge() {
  return (
    <div className="demo-badge">
      <span />
      演示数据
    </div>
  )
}

function TodayPage({
  onOpen,
  perspective,
  onChangePerspective,
}: {
  onOpen: (kind: DetailKind) => void
  perspective: Perspective
  onChangePerspective: () => void
}) {
  const attentionItem: DetailKind | null = "attention"
  const editorial = editorialPerspectives[perspective]

  return (
    <div className="page today-page">
      <header className="greeting">
        <div>
          <div className="greeting-line">
            <span>大白，下午好</span>
            <DemoBadge />
          </div>
          <div className="date">10月21日 · 星期三</div>
          <p>今天有几件事，值得您花一点时间。</p>
        </div>
      </header>

      <main>
        <section className="daily-editorial">
          <div className="editorial-meta">
            <span>今日导读</span>
            <button onClick={onChangePerspective} type="button">
              试着换一下
            </button>
          </div>
          <div className="editorial-rule" />
          <div className="editorial-number">01</div>
          <div className="editorial-title">{editorial.title}</div>
          <div className="editorial-context">
            <span>为什么是今天 · {editorial.label}</span>
            <p>{editorial.whyToday}</p>
          </div>
          <p className="editorial-summary">
            {editorial.summary}
          </p>
          <div className="editorial-source">信息依据：{editorial.source}</div>
          <button
            className="editorial-action"
            onClick={() => onOpen("editorial")}
            type="button"
          >
            看看 AI 的思考
            <Icon name="arrow" size={16} />
          </button>
        </section>

        <section className="secondary-reading">
          <div className="reading-list">
            <button onClick={() => onOpen("industry")} type="button">
              <span className="reading-meta">
                <span className="reading-index">02</span>
                <span className="reading-kicker">行业变化</span>
              </span>
              <span className="reading-content">
                <strong>零售药房的竞争，正在从交易走向持续服务</strong>
                <span className="reading-summary">
                  公开政策与行业研究持续讨论药房专业服务能力。此处为带时间标记的模拟摘要，用于演示外部变化筛选。
                </span>
                <span className="reading-source">
                  来源示例：2024 年公开政策文件、行业研究 · 模拟内容
                </span>
              </span>
              <Icon name="arrow" size={16} />
            </button>
            <button onClick={() => onOpen("hypothesis")} type="button">
              <span className="reading-meta">
                <span className="reading-index">03</span>
                <span className="reading-kicker">集团新进展 · 待研究议题</span>
              </span>
              <span className="reading-content">
                <strong>一个值得管理层进一步讨论的问题</strong>
                <span className="reading-summary">
                  从演示材料中提炼值得核实的观点，并明确区分已有信息与
                  AI 推测；当前不代表真实内部进展。
                </span>
                <span className="reading-source">
                  依据：集团已有材料（演示） · 状态：待进一步核实
                </span>
              </span>
              <Icon name="arrow" size={16} />
            </button>
          </div>
        </section>

        {attentionItem && (
          <section className="attention-section">
            <div className="attention-heading">
              <div>待您关注</div>
              <span>条件提醒 · 演示</span>
            </div>
            <div className="attention-rule" />
            <button onClick={() => onOpen(attentionItem)} type="button">
              <span className="attention-mark">
                <Icon name="spark" size={17} />
              </span>
              <span>
                <strong>战略研讨会前，建议先阅读这份议题摘要</strong>
                <small>模拟会议事项 · 当前未连接真实日程</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
            <button
              onClick={() => onOpen("attentionReview")}
              type="button"
            >
              <span className="attention-mark">
                <Icon name="spark" size={17} />
              </span>
              <span>
                <strong>区域经营复盘前，建议先确认三个关键异常</strong>
                <small>模拟经营事项 · 当前未连接真实数据</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
          </section>
        )}

        <div className="today-disclaimer">
          <Icon name="shield" size={14} />
          <span>
            今日内容均为产品演示示例，不代表真实经营结论，也未连接集团业务系统。
          </span>
        </div>
      </main>
    </div>
  )
}

const insightCategoryMeta: Record<
  InsightCategory,
  { label: string description: string }
> = {
  problem: {
    label: "经营问题",
    description: "识别已经发生、正在扩大或尚未充分暴露的经营问题",
  },
  opportunity: {
    label: "增长机会",
    description: "发现尚未被充分利用、值得验证和复制的增长空间",
  },
  risk: {
    label: "潜在风险",
    description: "提前识别可能影响未来经营结果的变化与约束",
  },
}

function InsightDetail({
  insight,
  onBack,
}: {
  insight: InsightItem
  onBack: () => void
}) {
  const [rootOpen, setRootOpen] = useState(true)
  const [actionsOpen, setActionsOpen] = useState(true)
  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceNote, setEvidenceNote] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")

  return (
    <div className="insight-detail">
      <div className="insight-detail-nav">
        <button onClick={onBack} type="button">
          <Icon name="back" size={18} />
          返回洞察列表
        </button>
        <div className="insight-analysis-stamp">
          AI 分析编号 INS-{insight.id.toUpperCase()}
        </div>
      </div>

      <div className="insight-detail-hero">
        <div className="insight-card-tags">
          <span className={`insight-type ${insight.category}`}>
            {insight.categoryLabel}
          </span>
          <span className="insight-severity">{insight.severity}重要度</span>
          <span className="insight-status">{insight.status}</span>
        </div>
        <div className="insight-detail-title">{insight.title}</div>
        <p>{insight.finding}</p>
        <div className="insight-detail-meta">
          <span>{insight.object}</span>
          <span>发现于 {insight.discovered}</span>
          <span>模拟分析 · 非真实经营结论</span>
        </div>
      </div>

      <div className="insight-detail-grid">
        <section className="analysis-panel core-judgment">
          <div className="analysis-panel-kicker">A · AI 的核心判断</div>
          <div className="analysis-question">为什么值得关注</div>
          <p>{insight.impact}</p>
          <div className="judgment-box">
            <Icon name="spark" size={18} />
            <div>
              <strong>当前最可能的解释</strong>
              <span>{insight.judgment}</span>
            </div>
          </div>
          <div className="certainty-row">
            <span><b />有证据支持：指标变化与影响范围</span>
            <span><b />仍需验证：原因贡献与可恢复空间</span>
          </div>
        </section>

        <section className="analysis-panel impact-panel">
          <div className="analysis-panel-kicker">C · 经营影响量化</div>
          <div className="impact-metrics">
            {insight.evidence.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  setEvidenceNote(
                    evidenceNote === item.note ? null : item.note,
                  )
                }
                type="button"
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>查看口径</small>
              </button>
            ))}
          </div>
          {evidenceNote && (
            <div className="metric-explanation">{evidenceNote}</div>
          )}
          <div className="estimate-note">
            已确认损失、估算影响与潜在改善空间将在完成归因后分别展示；当前数值均为演示。
          </div>
        </section>
      </div>

      <section className="analysis-panel root-panel">
        <button
          className="analysis-panel-heading"
          onClick={() => setRootOpen(!rootOpen)}
          type="button"
        >
          <span>
            <b>B · 根因分析</b>
            从经营结果逐层追溯到可验证的业务原因
          </span>
          <span>{rootOpen ? "收起根因" : "查看根因"}</span>
        </button>
        {rootOpen && (
          <div className="root-analysis">
            <div className="root-trunk">
              <span>经营结果</span>
              <strong>{insight.title}</strong>
            </div>
            <div className="root-branches">
              {insight.causes.map((cause, index) => (
                <div className="root-cause" key={cause.name}>
                  <div className="root-index">0{index + 1}</div>
                  <div>
                    <strong>{cause.name}</strong>
                    <span>{cause.contribution}</span>
                  </div>
                  <div className="root-confidence">
                    可信程度 <b>{cause.confidence}</b>
                  </div>
                  <p><b>支持证据：</b>{cause.evidence}</p>
                  <p><b>仍需补充：</b>{cause.missing}</p>
                </div>
              ))}
            </div>
            <div className="causality-note">
              指标同时变化不等于因果关系。AI 仅将以上因素列为待验证解释，不会直接认定原因。
            </div>
          </div>
        )}
      </section>

      <section className="analysis-panel action-panel">
        <button
          className="analysis-panel-heading"
          onClick={() => setActionsOpen(!actionsOpen)}
          type="button"
        >
          <span>
            <b>D · AI 行动建议</b>
            所有执行动作均需管理者确认
          </span>
          <span>{actionsOpen ? "收起方案" : "查看行动方案"}</span>
        </button>
        {actionsOpen && (
          <div className="action-plan">
            <div className="action-priority">优先级 P1</div>
            <div className="action-main">
              <strong>{insight.action}</strong>
              <div>
                <span>适用范围：{insight.object}</span>
                <span>协调部门：区域运营、商品、供应链</span>
                <span>验证指标：销售恢复、缺货率、毛利影响</span>
              </div>
            </div>
            <div className="action-buttons">
              <button onClick={() => setFeedback("已生成演示行动方案")} type="button">
                查看行动方案
              </button>
              <button onClick={() => setFeedback("需确认后才能交由团队跟进")} type="button">
                交由团队跟进
              </button>
              <button onClick={() => setFeedback("已记录为待人工验证")} type="button">
                标记为已验证
              </button>
            </div>
          </div>
        )}
        {feedback && <div className="action-feedback">{feedback}</div>}
      </section>

      <section className="analysis-panel evidence-panel">
        <button
          className="analysis-panel-heading"
          onClick={() => setEvidenceOpen(!evidenceOpen)}
          type="button"
        >
          <span>
            <b>E · 证据与分析过程</b>
            查看数据范围、对比周期与已排除原因
          </span>
          <span>{evidenceOpen ? "收起依据" : "展开依据"}</span>
        </button>
        {evidenceOpen && (
          <div className="evidence-process">
            <div><span>数据范围</span><strong>{insight.object}</strong></div>
            <div><span>对比周期</span><strong>最近 7 天 vs. 可比周期</strong></div>
            <div><span>检查维度</span><strong>区域、门店、商品、库存、客流</strong></div>
            <div><span>已排除</span><strong>新增门店与口径变化（演示）</strong></div>
          </div>
        )}
      </section>

      <div className="insight-feedback-bar">
        <span>这个判断对您有帮助吗？反馈将用于优化后续分析。</span>
        <div>
          <button onClick={() => setFeedback("已确认该洞察有价值")} type="button">确认</button>
          <button onClick={() => setFeedback("已记录您的质疑")} type="button">质疑</button>
          <button onClick={() => setFeedback("可在正式版本中补充材料")} type="button">补充信息</button>
        </div>
      </div>
    </div>
  )
}

function InsightsPage() {
  const [category, setCategory] = useState<InsightCategory>("problem")
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(
    null,
  )
  const [period, setPeriod] = useState("最近 7 天")
  const [scope, setScope] = useState("集团")
  const [sort, setSort] = useState("重要程度")

  const categoryItems = insightItems
    .filter((item) => item.category === category)
    .sort((a, b) =>
      sort === "发现时间"
        ? a.discovered.localeCompare(b.discovered)
        : ["重大", "高", "中"].indexOf(a.severity) -
          ["重大", "高", "中"].indexOf(b.severity),
    )

  if (selectedInsight) {
    return (
      <div className="page insights-page">
        <InsightDetail
          insight={selectedInsight}
          onBack={() => setSelectedInsight(null)}
        />
      </div>
    )
  }

  return (
    <div className="page insights-page">
      <header className="insights-header">
        <div>
          <div className="insights-eyebrow">董事长 AI · 主动经营判断</div>
          <div className="insights-title">经营洞察</div>
          <p>
            AI 正在持续分析集团经营数据，为您发现值得关注的问题、潜在机会与未来风险。
          </p>
        </div>
        <div className="analysis-status">
          <span className="analysis-live"><b />AI 分析已更新</span>
          <strong>今天 09:18</strong>
          <small>已分析 2,846 家门店 · 18,420 个商品（演示）</small>
        </div>
      </header>

      <div className="insight-filters">
        <label>
          <span>时间范围</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option>最近 7 天</option>
            <option>最近 30 天</option>
            <option>本季度</option>
          </select>
        </label>
        <label>
          <span>洞察范围</span>
          <select value={scope} onChange={(event) => setScope(event.target.value)}>
            <option>集团</option>
            <option>区域</option>
            <option>门店</option>
            <option>商品</option>
          </select>
        </label>
        <label>
          <span>洞察类型</span>
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as InsightCategory)
            }
          >
            <option value="problem">经营问题</option>
            <option value="opportunity">增长机会</option>
            <option value="risk">潜在风险</option>
          </select>
        </label>
        <div className="filter-context">
          当前显示：{period} · {scope}范围 · 模拟数据
        </div>
      </div>

      <section className="key-insights-section">
        <div className="insights-section-heading">
          <div>
            <span>01</span>
            <div className="insights-section-title">AI 发现的关键洞察</div>
            <p>此刻最值得管理者关注的判断，按潜在经营影响排序</p>
          </div>
          <DemoBadge />
        </div>
        <div className="key-insight-grid">
          {insightItems.slice(0, 3).map((insight) => (
            <article
              className={`key-insight-card ${insight.category}`}
              key={insight.id}
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="insight-card-tags">
                <span className={`insight-type ${insight.category}`}>
                  {insight.categoryLabel}
                </span>
                <span className="insight-severity">{insight.severity}重要度</span>
              </div>
              <div className="key-insight-title">{insight.title}</div>
              <p>{insight.finding}</p>
              <div className="evidence-strip">
                {insight.evidence.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <div className="card-analysis">
                <span>AI 判断</span>
                <p>{insight.judgment}</p>
              </div>
              <div className="card-impact">
                <span>经营影响</span>
                <p>{insight.impact}</p>
              </div>
              <div className="card-action">
                <div>
                  <span>建议行动</span>
                  <strong>{insight.action}</strong>
                </div>
                <button
                  onClick={() => setSelectedInsight(insight)}
                  type="button"
                >
                  查看深度分析 <Icon name="arrow" size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="insight-library">
        <div className="insights-section-heading compact">
          <div>
            <span>02</span>
            <div className="insights-section-title">经营洞察库</div>
            <p>从发现、验证到行动，持续追踪每一条洞察的经营价值</p>
          </div>
        </div>

        <div className="category-tabs">
          {(Object.keys(insightCategoryMeta) as InsightCategory[]).map(
            (categoryKey) => (
              <button
                className={category === categoryKey ? "active" : ""}
                key={categoryKey}
                onClick={() => setCategory(categoryKey)}
                type="button"
              >
                <span>{insightCategoryMeta[categoryKey].label}</span>
                <small>{insightCategoryMeta[categoryKey].description}</small>
                <b>
                  {
                    insightItems.filter(
                      (item) => item.category === categoryKey,
                    ).length
                  }
                </b>
              </button>
            ),
          )}
        </div>

        <div className="list-toolbar">
          <div>
            <strong>{insightCategoryMeta[category].label}</strong>
            <span>{categoryItems.length} 条洞察</span>
          </div>
          <label>
            排序
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option>重要程度</option>
              <option>发现时间</option>
            </select>
          </label>
        </div>

        <div className="insight-list">
          <div className="insight-list-head">
            <span>洞察判断</span>
            <span>关联业务对象</span>
            <span>影响程度</span>
            <span>发现时间</span>
            <span>分析进程</span>
            <span />
          </div>
          {categoryItems.map((insight) => (
            <button
              className="insight-list-row"
              key={insight.id}
              onClick={() => setSelectedInsight(insight)}
              type="button"
            >
              <span className="list-insight-name">
                <b className={`signal ${insight.category}`} />
                <span>
                  <strong>{insight.title}</strong>
                  <small>{insight.categoryLabel}</small>
                </span>
              </span>
              <span>{insight.object}</span>
              <span><b className="severity-dot" />{insight.severity}</span>
              <span>{insight.discovered}</span>
              <span className="process-state">
                <b>{insight.status}</b>
                <i><em /><em /><em /></i>
              </span>
              <span className="list-view">查看详情 <Icon name="arrow" size={14} /></span>
            </button>
          ))}
        </div>

        <div className="insight-data-disclaimer">
          <Icon name="shield" size={14} />
          页面数据、数值与分析结论均为产品演示内容，未连接真实集团经营系统。
        </div>
      </section>
    </div>
  )
}

type WorkTrackingType = "region" | "city" | "task"

function WorkPage() {
  const [trackingType, setTrackingType] =
    useState<WorkTrackingType>("region")
  const [notice, setNotice] = useState("")
  const trackingData: Record<
    WorkTrackingType,
    {
      title: string
      subtitle: string
      value: string
      change: string
      status: string
      update: string
      tone: "risk" | "watch" | "positive"
    }[]
  > = {
    region: [
      {
        title: "华东战区",
        subtitle: "销售恢复与核心商品保障",
        value: "目标达成 91.4%",
        change: "较模拟目标低 8.6%",
        status: "重点跟踪",
        update: "数据更新于今天 09:18",
        tone: "risk",
      },
      {
        title: "华中战区",
        subtitle: "重点门店增长质量",
        value: "目标达成 98.2%",
        change: "毛利结构需要关注",
        status: "持续观察",
        update: "数据更新于今天 09:18",
        tone: "watch",
      },
      {
        title: "华南战区",
        subtitle: "慢病服务与会员经营",
        value: "目标达成 103.6%",
        change: "高于模拟目标 3.6%",
        status: "表现积极",
        update: "数据更新于昨天 18:30",
        tone: "positive",
      },
    ],
    city: [
      {
        title: "杭州城市公司",
        subtitle: "重点门店销售与客流",
        value: "销售同比 -7.2%",
        change: "8 家门店贡献主要降幅",
        status: "等待反馈",
        update: "区域负责人反馈截止今天 17:00",
        tone: "risk",
      },
      {
        title: "武汉城市公司",
        subtitle: "库存周转与缺货改善",
        value: "缺货率 3.8%",
        change: "连续两周改善",
        status: "数据跟踪",
        update: "下一次更新：明天 09:00",
        tone: "positive",
      },
      {
        title: "广州城市公司",
        subtitle: "同店增长与会员转化",
        value: "同店增长 +2.4%",
        change: "会员转化仍有差距",
        status: "持续观察",
        update: "经营分析会后更新",
        tone: "watch",
      },
    ],
    task: [
      {
        title: "华东重点商品缺货排查",
        subtitle: "商品、供应链、区域运营",
        value: "已反馈 9 / 12 家",
        change: "3 家门店尚未反馈",
        status: "督办中",
        update: "反馈截止今天 16:00",
        tone: "risk",
      },
      {
        title: "高库存商品调拨方案",
        subtitle: "西南战区 · 商品中心",
        value: "方案完成 70%",
        change: "等待商品中心确认",
        status: "待确认",
        update: "最近反馈于 2 小时前",
        tone: "watch",
      },
      {
        title: "高表现门店经验复盘",
        subtitle: "华南战区 · 运营中心",
        value: "已完成首轮复盘",
        change: "准备 6 家门店验证",
        status: "按计划推进",
        update: "下周一进入验证",
        tone: "positive",
      },
    ],
  }

  const macroMetrics = [
    {
      label: "集团销售额",
      value: "¥ 28.64 亿",
      change: "较可比周期 -1.8%",
      tone: "risk",
    },
    {
      label: "集团毛利额",
      value: "¥ 8.17 亿",
      change: "毛利率保持稳定",
      tone: "positive",
    },
    {
      label: "同店销售",
      value: "-2.6%",
      change: "华东影响较明显",
      tone: "risk",
    },
    {
      label: "库存周转天数",
      value: "47.3 天",
      change: "较上期增加 1.6 天",
      tone: "watch",
    },
  ]

  const alerts = [
    {
      label: "重大关注",
      title: "华东零售板块销售低于模拟目标",
      detail: "降幅集中在少数城市公司、重点门店与核心商品。",
      impact: "影响范围仍在归因",
      tone: "risk",
    },
    {
      label: "需要关注",
      title: "部分重点商品库存保障能力减弱",
      detail: "31 个模拟重点 SKU 的库存覆盖天数低于目标。",
      impact: "可能影响后续销售",
      tone: "watch",
    },
    {
      label: "积极信号",
      title: "慢病服务板块出现可复制表现",
      detail: "部分城市公司的会员触达与关联购买持续改善。",
      impact: "建议开展小范围验证",
      tone: "positive",
    },
  ]

  return (
    <div className="page work-page">
      <header className="work-header">
        <div>
          <div className="work-eyebrow">董事长 AI · 经营工作台</div>
          <div className="work-title">工作</div>
          <p>关注重要经营数据、重点区域表现，以及需要持续跟踪的事项与反馈。</p>
        </div>
        <div className="work-header-status">
          <DemoBadge />
          <span>最近更新：今天 09:18</span>
          <small>当前未连接真实集团经营系统</small>
        </div>
      </header>

      <div className="work-filterbar">
        <button className="active" type="button">最近 7 天</button>
        <button type="button">最近 30 天</button>
        <button type="button">本季度</button>
        <span>集团口径 · 模拟数据</span>
      </div>

      <section className="macro-section">
        <div className="work-section-heading">
          <div>
            <span>01</span>
            <strong>经营宏观数据</strong>
            <p>快速理解集团整体表现，以及需要进一步关注的重要变化</p>
          </div>
          <button onClick={() => setNotice("宏观数据明细暂为演示入口")} type="button">
            查看数据口径
          </button>
        </div>

        <div className="macro-metric-grid">
          {macroMetrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small className={metric.tone}>{metric.change}</small>
            </article>
          ))}
        </div>

        <div className="business-alerts">
          <div className="business-alerts-title">
            <span>重要板块业绩异常与机会提示</span>
            <small>AI 初步筛选 · 仍需业务验证</small>
          </div>
          <div className="business-alert-grid">
            {alerts.map((alert) => (
              <button
                className={alert.tone}
                key={alert.title}
                onClick={() => setNotice(`${alert.title}：深度分析暂为演示入口`)}
                type="button"
              >
                <span>{alert.label}</span>
                <strong>{alert.title}</strong>
                <p>{alert.detail}</p>
                <div>
                  <small>{alert.impact}</small>
                  <span>查看分析 <Icon name="arrow" size={14} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tracking-section">
        <div className="work-section-heading">
          <div>
            <span>02</span>
            <strong>关注问题跟踪</strong>
            <p>持续跟踪重点战区、城市公司业绩和关键事项的数据与反馈</p>
          </div>
          <button onClick={() => setNotice("新增关注功能暂为演示入口")} type="button">
            新增关注
          </button>
        </div>

        <div className="tracking-tabs">
          <button
            className={trackingType === "region" ? "active" : ""}
            onClick={() => setTrackingType("region")}
            type="button"
          >
            关注战区
          </button>
          <button
            className={trackingType === "city" ? "active" : ""}
            onClick={() => setTrackingType("city")}
            type="button"
          >
            城市公司业绩
          </button>
          <button
            className={trackingType === "task" ? "active" : ""}
            onClick={() => setTrackingType("task")}
            type="button"
          >
            事项跟踪
          </button>
        </div>

        <div className="tracking-list">
          {trackingData[trackingType].map((item) => (
            <button
              key={item.title}
              onClick={() => setNotice(`${item.title}详情暂为演示入口`)}
              type="button"
            >
              <span className={`tracking-signal ${item.tone}`} />
              <span className="tracking-name">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
              <span className="tracking-value">
                <strong>{item.value}</strong>
                <small>{item.change}</small>
              </span>
              <span className={`tracking-status ${item.tone}`}>{item.status}</span>
              <span className="tracking-update">{item.update}</span>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </div>

        <div className="tracking-process-note">
          <Icon name="shield" size={14} />
          数据跟踪和业务反馈将分别标注来源与更新时间；当前内容均为界面演示。
        </div>
      </section>

      {notice && (
        <button
          className="work-notice"
          onClick={() => setNotice("")}
          type="button"
        >
          {notice} · 点击关闭
        </button>
      )}
    </div>
  )
}

const learningCategories: { id: LearningCategory label: string }[] = [
  { id: "recommended", label: "为你推荐" },
  { id: "ai", label: "AI 前沿" },
  { id: "management", label: "企业管理" },
  { id: "people", label: "人物观点" },
  { id: "quotes", label: "思想金句" },
]

const learningFeatures: Record<
  LearningCategory,
  { label: string title: string summary: string insight: string }
> = {
  recommended: {
    label: "今日深度阅读",
    title: "AI 正在改变企业的组织方式，真正的挑战不只是技术",
    summary:
      "AI 的价值不只是让员工更快地完成工作，而是重新思考企业如何分配任务、积累知识、协同决策，以及组织如何围绕新的能力重新设计流程。",
    insight: "AI 转型最终会落到工作方式与组织机制，而不只是工具采购。",
  },
  ai: {
    label: "AI 前沿精选",
    title: "从 AI Agent 到数字同事：企业工作流正在被重新定义",
    summary:
      "当 AI 从回答问题走向完成任务，企业需要重新设计权限、协作边界、知识沉淀与结果校验机制。",
    insight: "真正的门槛不是模型能力，而是企业能否建立可靠的人机协作流程。",
  },
  management: {
    label: "管理思想精选",
    title: "战略真正困难的部分，是决定哪些机会暂时不做",
    summary:
      "资源配置并不是把预算平均分配给所有重要事项，而是围绕少数关键判断形成清晰取舍。",
    insight: "战略清晰度可以从组织停止做什么，而不仅是准备做什么来判断。",
  },
  people: {
    label: "人物观点精选",
    title: "管理者的优势，正在从掌握更多信息转向提出更好的问题",
    summary:
      "当信息获取成本持续下降，识别真正问题、建立判断框架和组织高质量讨论变得更加重要。",
    insight: "提问质量决定了组织把注意力投向哪里，也影响 AI 能产生多大价值。",
  },
  quotes: {
    label: "思想金句精选",
    title: "衡量技术价值，也要看它是否改变了原有的工作方式",
    summary:
      "效率提升只是技术价值的一部分。更深层的变化，来自流程、角色与协作方式的重新设计。",
    insight: "如果流程完全不变，AI 很可能只是在旧方式上增加一层新工具。",
  },
}

type LearningQuote = {
  id: string
  text: string
  topics: string
  explanation: string
  logic: string
  inspiration: string
}

const learningQuotes: LearningQuote[] = [
  {
    id: "technology-value",
    text: "衡量技术价值，不只看它能节省多少时间，还要看它是否改变了原有的工作方式。",
    topics: "AI 转型 / 组织管理",
    explanation:
      "技术带来的效率提升容易衡量，但真正持续的价值往往来自任务分配、知识流动与决策方式的变化。",
    logic:
      "它挑战了“上线工具就等于完成转型”的常见认知，强调组织机制必须同步变化。",
    inspiration:
      "可以选择一条高频业务流程，比较“增加 AI 工具”和“重新设计人机协作流程”两种方案。",
  },
  {
    id: "strategy-choice",
    text: "战略的价值，不在于列出多少目标，而在于清楚地决定哪些事情不做。",
    topics: "战略管理 / 资源配置",
    explanation:
      "目标越多并不意味着战略越完整。清晰取舍才能让资源、人才与组织注意力形成合力。",
    logic:
      "它挑战了把战略等同于目标清单的做法，强调机会成本与资源集中。",
    inspiration:
      "在下一次战略讨论中，除了确认重点，也可以明确三件暂时不投入的事项及判断依据。",
  },
  {
    id: "better-question",
    text: "管理者不需要拥有所有答案，但需要帮助组织找到最值得回答的问题。",
    topics: "领导力 / 决策机制",
    explanation:
      "高层管理的价值越来越体现在定义问题、建立讨论框架与配置组织注意力。",
    logic:
      "它把领导力从答案供给转向问题识别，也为 AI 参与决策提供了更清晰的边界。",
    inspiration:
      "可以复盘近期会议：讨论时间是否集中在真正影响结果的关键问题上。",
  },
]

function LearningPage() {
  const [category, setCategory] = useState<LearningCategory>("recommended")
  const [selectedQuote, setSelectedQuote] = useState<LearningQuote | null>(null)
  const [articleOpen, setArticleOpen] = useState(false)
  const [savedQuotes, setSavedQuotes] = useState<string[]>(["strategy-choice"])
  const [following, setFollowing] = useState<string[]>(["Sam Altman", "Jim Collins"])
  const [enterpriseInsight, setEnterpriseInsight] = useState(false)
  const [note, setNote] = useState("")
  const [search, setSearch] = useState("")
  const feature = learningFeatures[category]

  const people = [
    {
      initials: "SA",
      name: "Sam Altman",
      role: "AI 与科技",
      update: "近期公开观点与访谈值得持续跟踪",
      source: "示例动态 · 原始来源待接入核实",
    },
    {
      initials: "JH",
      name: "Jensen Huang",
      role: "AI 与计算",
      update: "企业如何理解 AI 基础设施与行业应用",
      source: "示例动态 · 非实时内容",
    },
    {
      initials: "JC",
      name: "Jim Collins",
      role: "企业管理与战略",
      update: "长期主义、组织纪律与卓越企业研究",
      source: "经典内容追踪 · 示例",
    },
    {
      initials: "DG",
      name: "Demis Hassabis",
      role: "AI 研究",
      update: "科学发现与通用智能的长期进展",
      source: "示例动态 · 原始来源待核实",
    },
  ]

  const channelArticles = [
    {
      channel: "AI 前沿",
      title: "企业采用 AI Agent 前，最需要建立的不是更多提示词",
      meta: "研究摘要 · 8 分钟",
      point: "权限、评估与异常处理机制，是 Agent 进入真实流程的前提。",
      reason: "帮助管理者区分产品演示与可靠的企业级应用。",
    },
    {
      channel: "企业管理",
      title: "经典管理思想为什么仍值得在 AI 时代重新阅读",
      meta: "管理专题 · 10 分钟",
      point: "技术改变工具，但组织目标、责任边界与有效协作仍需被清晰定义。",
      reason: "把新技术放回长期管理问题中理解。",
    },
    {
      channel: "组织与人才",
      title: "人机协作之后，管理者应该重新设计哪些岗位能力",
      meta: "案例观察 · 6 分钟",
      point: "判断、提问、校验与跨部门协作可能成为新的关键能力。",
      reason: "连接 AI 应用与真实组织能力建设。",
    },
  ]

  function toggleSaved(id: string) {
    setSavedQuotes((current) =>
      current.includes(id)
        ? current.filter((quoteId) => quoteId !== id)
        : [...current, id],
    )
  }

  function toggleFollow(name: string) {
    setFollowing((current) =>
      current.includes(name)
        ? current.filter((person) => person !== name)
        : [...current, name],
    )
  }

  return (
    <div className="page learning-page">
      <header className="learning-header">
        <div>
          <div className="learning-eyebrow">您的私人思想空间</div>
          <div className="learning-title">学习</div>
          <p>持续追踪 AI 前沿与管理思想，让每一次阅读都产生新的启发。</p>
        </div>
        <div className="learning-tools">
          <label>
            <Icon name="spark" size={15} />
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索文章、人物、观点"
              value={search}
            />
          </label>
          <div>
            <button type="button">我的收藏 <span>{savedQuotes.length}</span></button>
            <button type="button">我的关注 <span>{following.length}</span></button>
            <button type="button">阅读记录</button>
          </div>
        </div>
      </header>

      {search && (
        <div className="learning-search-state">
          正在演示搜索“{search}” · 当前未连接真实内容索引
          <button onClick={() => setSearch("")} type="button">清除</button>
        </div>
      )}

      <nav className="learning-category-nav" aria-label="学习内容分类">
        {learningCategories.map((item) => (
          <button
            className={category === item.id ? "active" : ""}
            key={item.id}
            onClick={() => setCategory(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="thought-feature">
        <div className="learning-section-heading">
          <div>
            <span>01</span>
            <div>今日思想精选</div>
            <p>AI 从演示内容中筛选出的阅读与思考线索</p>
          </div>
          <DemoBadge />
        </div>
        <div className="thought-feature-grid">
          <article className="feature-reading">
            <div className="feature-image">
              <img
                alt="管理者在桌前阅读与思考的编辑场景示意图"
                src="https://images.unsplash.com/photo-1738566061977-fdd59ca5b08e?auto=format&fit=crop&w=1400&q=82"
              />
              <span>编辑场景示意图 · Unsplash</span>
            </div>
            <div className="feature-reading-content">
              <div className="feature-kicker">{feature.label}</div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-meta">
                <span>产品示例内容</span>
                <span>今天</span>
                <span>预计阅读 8 分钟</span>
              </div>
              <p>{feature.summary}</p>
              <div className="feature-ai-point">
                <Icon name="spark" size={17} />
                <div>
                  <span>AI 提炼的核心观点</span>
                  <strong>{feature.insight}</strong>
                </div>
              </div>
              <button onClick={() => setArticleOpen(true)} type="button">
                开始阅读 <Icon name="arrow" size={15} />
              </button>
            </div>
          </article>

          <aside className="short-thoughts">
            <div className="short-thoughts-title">值得思考的两个观点</div>
            {learningQuotes.slice(0, 2).map((quote, index) => (
              <button
                key={quote.id}
                onClick={() => setSelectedQuote(quote)}
                type="button"
              >
                <span>0{index + 1}</span>
                <strong>“{quote.text}”</strong>
                <small>原创界面示例 · 不归属于真实人物</small>
                <em>展开理解 <Icon name="arrow" size={14} /></em>
              </button>
            ))}
          </aside>
        </div>
      </section>

      <section className="people-section">
        <div className="learning-section-heading">
          <div>
            <span>02</span>
            <div>关注的人</div>
            <p>优先关注新内容与有思想价值的公开观点</p>
          </div>
          <div className="heading-actions">
            <button type="button">关注更多人物</button>
            <button type="button">管理关注</button>
          </div>
        </div>
        <div className="people-grid">
          {people.map((person) => (
            <article className="person-card" key={person.name}>
              <div className="person-top">
                <div className="person-avatar">{person.initials}</div>
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>
                <button
                  className={following.includes(person.name) ? "following" : ""}
                  onClick={() => toggleFollow(person.name)}
                  type="button"
                >
                  {following.includes(person.name) ? "已关注" : "关注"}
                </button>
              </div>
              <p>{person.update}</p>
              <div className="person-source">{person.source}</div>
              <button className="person-original" type="button">
                查看原文 <Icon name="arrow" size={13} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div className="learning-section-heading">
          <div>
            <span>03</span>
            <div>思想金句</div>
            <p>那些值得停下来思考、反复阅读的观点</p>
          </div>
        </div>
        <div className="quote-grid">
          {learningQuotes.map((quote) => (
            <article className="quote-card" key={quote.id}>
              <div className="quote-mark">“</div>
              <div className="quote-text">{quote.text}</div>
              <div className="quote-provenance">原创界面示例 · 无真实作者归属</div>
              <div className="quote-topics">{quote.topics}</div>
              <div className="quote-actions">
                <button onClick={() => setSelectedQuote(quote)} type="button">
                  为什么值得思考
                </button>
                <button
                  className={savedQuotes.includes(quote.id) ? "saved" : ""}
                  onClick={() => toggleSaved(quote.id)}
                  type="button"
                >
                  {savedQuotes.includes(quote.id) ? "已收藏" : "收藏"}
                </button>
                <button type="button">复制</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-channels">
        <div className="learning-section-heading">
          <div>
            <span>04</span>
            <div>AI 前沿与管理思想</div>
            <p>兼顾新趋势、经典思想与真实商业实践</p>
          </div>
          <button className="heading-link" type="button">查看更多</button>
        </div>
        <div className="channel-grid">
          {channelArticles.map((article) => (
            <article className="channel-article" key={article.title}>
              <span>{article.channel}</span>
              <div>{article.title}</div>
              <small>{article.meta} · 示例内容</small>
              <p>{article.point}</p>
              <div className="recommend-reason">
                <b>推荐理由</b>{article.reason}
              </div>
              <div className="channel-actions">
                <button onClick={() => setArticleOpen(true)} type="button">阅读并使用 AI</button>
                <button type="button">收藏</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="thought-clash">
        <div className="clash-intro">
          <span>思想碰撞</span>
          <div>同一个问题，不同思想视角的答案</div>
          <p>AI 时代，企业最重要的竞争优势是什么？</p>
          <button type="button">查看完整比较 <Icon name="arrow" size={14} /></button>
        </div>
        <div className="clash-perspectives">
          {[
            ["技术与创新", "持续实验并把新能力转化为产品与流程"],
            ["组织与人才", "形成能够快速学习和重新配置能力的组织"],
            ["战略与竞争", "在清晰取舍中积累难以复制的独特能力"],
            ["客户与业务", "更深地理解需求并持续创造真实价值"],
          ].map(([label, copy]) => (
            <div key={label}>
              <span>{label}</span>
              <p>{copy}</p>
            </div>
          ))}
          <div className="clash-summary">
            <b>AI 比较摘要</b>
            共识是持续学习与适应，分歧在于能力首先应沉淀在技术、组织还是客户关系中。以上为 AI
            生成的示例比较，不代表真实人物原话。
          </div>
        </div>
      </section>

      <div className="learning-bottom-grid">
        <section className="weekly-idea">
          <span>本周值得带回企业的一个想法</span>
          <div>AI 不只是工具升级，更可能是工作流程重构</div>
          <p>
            技术价值需要通过任务分配、协作方式与责任边界的重新设计，才能真正进入经营过程。
          </p>
          <blockquote>
            在集团现有业务流程中，哪些环节仍然默认由人完成，却可以重新设计成人机协作？
          </blockquote>
          <div>
            <button type="button">加入我的思考</button>
            <button type="button">生成讨论提纲</button>
          </div>
        </section>
        <section className="thought-map">
          <span>我的思想地图</span>
          <div className="map-nodes">
            <b>AI Agent</b><i />
            <b>工作流程</b><i />
            <b>组织协作</b><i />
            <b>知识沉淀</b>
          </div>
          <p>已关联 {savedQuotes.length + 4} 条收藏与思考，继续阅读将逐步形成您的认知网络。</p>
          <button type="button">进入思想地图 <Icon name="arrow" size={14} /></button>
        </section>
      </div>

      <div className="learning-disclaimer">
        <Icon name="shield" size={14} />
        当前文章、人物动态、观点与 AI 解读均为产品演示内容；真实运行时需连接并核实原始公开来源。
      </div>

      {selectedQuote && (
        <div className="learning-overlay" onClick={() => setSelectedQuote(null)}>
          <aside className="quote-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <span>思想解读</span>
              <button onClick={() => setSelectedQuote(null)} type="button">关闭</button>
            </div>
            <div className="drawer-quote">“{selectedQuote.text}”</div>
            <div className="drawer-source">原创界面示例 · 无真实作者归属</div>
            <section>
              <span>AI 对观点的解释</span>
              <p>{selectedQuote.explanation}</p>
            </section>
            <section>
              <span>背后的管理逻辑</span>
              <p>{selectedQuote.logic}</p>
            </section>
            <section>
              <span>对企业经营的启发</span>
              <p>{selectedQuote.inspiration}</p>
            </section>
            <section>
              <span>相关观点</span>
              <p>推荐继续比较“效率提升”与“组织能力重构”两种技术价值观。</p>
            </section>
            <label className="thought-note">
              <span>我的思考</span>
              <textarea
                onChange={(event) => setNote(event.target.value)}
                placeholder="记录您的理解与反思"
                value={note}
              />
            </label>
            <button
              className="connect-enterprise"
              onClick={() => setEnterpriseInsight(!enterpriseInsight)}
              type="button"
            >
              <Icon name="spark" size={16} />
              让 AI 联系我的企业
            </button>
            {enterpriseInsight && (
              <div className="enterprise-inference">
                <b>通用管理启发</b>
                当前未接入已授权的企业资料，因此仅提供通用推演：可选择一个高频流程，比较
                AI 作为辅助工具与重新设计人机协作两种方案的差异。
              </div>
            )}
          </aside>
        </div>
      )}

      {articleOpen && (
        <div className="learning-overlay" onClick={() => setArticleOpen(false)}>
          <aside className="article-reader" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <span>深度阅读 · 示例文章</span>
              <button onClick={() => setArticleOpen(false)} type="button">关闭</button>
            </div>
            <div className="reader-layout">
              <article>
                <span>{feature.label}</span>
                <div>{feature.title}</div>
                <small>产品示例内容 · 预计阅读 8 分钟</small>
                <p>{feature.summary}</p>
                <p>
                  当 AI 能够参与信息整理、分析与任务执行时，管理者需要重新思考哪些工作由人判断，哪些工作可以交由
                  AI 辅助，以及结果应如何被核验。这不是对真实文章的转载，而是一段用于展示阅读体验的示例正文。
                </p>
                <p>
                  原文观点与 AI 延伸分析应被清晰区分。正式产品会提供原文定位、来源链接与引用范围。
                </p>
              </article>
              <aside className="reading-companion">
                <span>AI 阅读伴侣</span>
                {[
                  "3 分钟读懂",
                  "提炼 3 个核心观点",
                  "最有启发的一句话",
                  "分析作者核心逻辑",
                  "提出进一步问题",
                  "联系企业经营场景",
                ].map((item) => (
                  <button key={item} type="button">{item}</button>
                ))}
                <div>
                  <b>AI 分析示例</b>
                  {feature.insight}
                  <small>以上为 AI 延伸分析，不属于原文内容。</small>
                </div>
              </aside>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

type ProfilePanel =
  | "preferences"
  | "understanding"
  | "correction"
  | "topic"
  | "asset"
  | "authorization"
  | null

function LegacyProfilePage() {
  const [panel, setPanel] = useState<ProfilePanel>(null)
  const [selectedTopic, setSelectedTopic] = useState("集团 AI 转型")
  const [reportStyle, setReportStyle] = useState("结论与证据型")
  const [analysisPreferences, setAnalysisPreferences] = useState([
    "优先解释根因",
    "优先量化经营影响",
    "优先识别风险",
  ])
  const [reminders, setReminders] = useState([
    "重大经营异常",
    "潜在增长机会",
    "长期战略议题的新进展",
  ])
  const [personalization, setPersonalization] = useState(true)
  const [savedState, setSavedState] = useState("")
  const [confirmRevoke, setConfirmRevoke] = useState(false)
  const [confirmTopicRemoval, setConfirmTopicRemoval] = useState(false)
  const [correction, setCorrection] = useState("")

  const topics = [
    {
      title: "集团 AI 转型",
      note: "关注 AI 如何真正进入经营流程，而不只是增加工具。",
      update: "长期议题 · 示例",
      links: "关联内容待接入",
      priority: "高优先级",
    },
    {
      title: "经营质量与利润提升",
      note: "持续理解增长质量、经营结构与利润改善之间的关系。",
      update: "关注中 · 示例",
      links: "关联内容待接入",
      priority: "常规关注",
    },
    {
      title: "组织效率与人机协作",
      note: "观察工作流程、关键岗位和组织协作方式的变化。",
      update: "关注中 · 示例",
      links: "关联内容待接入",
      priority: "常规关注",
    },
  ]

  const assets = [
    {
      title: "我的收藏",
      description: "文章、报告和公开内容",
      count: "2 条示例",
      updated: "演示内容",
    },
    {
      title: "我的金句",
      description: "思想观点与个人标注",
      count: "1 条示例",
      updated: "演示内容",
    },
    {
      title: "我的笔记",
      description: "阅读感悟与管理反思",
      count: "尚未连接",
      updated: "等待您的第一条笔记",
    },
    {
      title: "我的思想地图",
      description: "观点、主题与笔记的关联",
      count: "生成示意",
      updated: "基于示例收藏",
    },
  ]

  const analysisOptions = [
    "优先解释根因",
    "优先量化经营影响",
    "优先比较不同方案",
    "优先识别风险",
    "优先提出行动建议",
  ]

  const reminderOptions = [
    "重大经营异常",
    "潜在增长机会",
    "关键经营指标变化",
    "重要 AI 与行业动态",
    "长期战略议题的新进展",
  ]

  function toggleOption(
    item: string,
    current: string[],
    setter: (value: string[]) => void,
  ) {
    setter(
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    )
    setSavedState("设置已保存")
  }

  function openTopic(title: string) {
    setSelectedTopic(title)
    setPanel("topic")
  }

  return (
    <div className="page profile-page">
      <header className="profile-header">
        <div>
          <div className="profile-eyebrow">董事长 AI · 私人工作空间</div>
          <div className="profile-title">我的</div>
          <p>管理您的关注、思想资产，以及 AI 为您工作的方式。</p>
        </div>
        <div className="profile-header-actions">
          <button onClick={() => setPanel("understanding")} type="button">编辑个人资料</button>
          <button onClick={() => setPanel("preferences")} type="button">
            AI 个性化设置
          </button>
        </div>
      </header>

      <section className="identity-card">
        <div className="identity-avatar">董</div>
        <div className="identity-copy">
          <span>个人资料占位</span>
          <strong>董事长</strong>
          <p>集团名称占位 · 以长期价值为先，持续理解经营与组织。</p>
        </div>
        <div className="identity-privacy">
          <Icon name="shield" size={16} />
          <span>私人空间</span>
          <small>仅展示经您确认的信息</small>
        </div>
      </section>

      <div className="profile-layout">
        <main className="profile-main-column">
          <section className="my-ai-card">
            <div className="profile-section-heading inverted">
              <div>
                <span>01</span>
                <div>我的 AI</div>
                <p>让 AI 更了解您的工作方式、关注重点和决策偏好</p>
              </div>
              <span className="profile-demo-label">演示 · 待用户确认</span>
            </div>

            <div className="ai-understanding">
              <div className="understanding-intro">
                <Icon name="spark" size={22} />
                <div>
                  <span>AI 对我的工作理解</span>
                  <p>
                    以下均为个性化设置示例，不代表真实用户已确认，也不会自动作为正式决策依据。
                  </p>
                </div>
              </div>
              <div className="understanding-grid">
                <div><span>主要职责</span><strong>集团战略与经营决策</strong></div>
                <div><span>重点关注</span><strong>经营质量、组织效率、AI 转型</strong></div>
                <div><span>常用视角</span><strong>趋势、结构、异常、根因</strong></div>
                <div><span>汇报方式</span><strong>先结论，再证据，最后建议</strong></div>
                <div><span>决策辅助</span><strong>明确风险、比较方案、量化影响</strong></div>
              </div>
            </div>

            <div className="personalization-state">
              <div>
                <span>已确认偏好</span>
                <strong>等待本人确认</strong>
              </div>
              <div>
                <span>长期关注事项</span>
                <strong>3 项演示主题</strong>
              </div>
              <div>
                <span>配置更新时间</span>
                <strong>尚未保存真实配置</strong>
              </div>
            </div>

            <div className="my-ai-actions">
              <button onClick={() => setPanel("preferences")} type="button">
                调整我的偏好
              </button>
              <button onClick={() => setPanel("understanding")} type="button">
                查看 AI 如何理解我
              </button>
              <button onClick={() => setPanel("correction")} type="button">
                纠正一项理解
              </button>
            </div>
          </section>

          <section className="profile-section attention-topics">
            <div className="profile-section-heading">
              <div>
                <span>02</span>
                <div>我的关注</div>
                <p>持续追踪真正重要的战略方向和经营议题</p>
              </div>
              <button
                className="profile-heading-action"
                onClick={() => {
                  setSelectedTopic("新增关注事项")
                  setPanel("topic")
                }}
                type="button"
              >
                新增关注事项
              </button>
            </div>

            <article className="long-term-topic" onClick={() => openTopic("集团 AI 转型")}>
              <div>
                <span>长期议题</span>
                <strong>未来三年，如何让 AI 真正改变集团的经营与管理方式？</strong>
                <p>
                  获得相应数据与授权后，AI 可将该议题关联到今日、洞察、学习、历史讨论与个人笔记。
                </p>
              </div>
              <Icon name="arrow" size={18} />
            </article>

            <div className="topic-list">
              {topics.map((topic) => (
                <button key={topic.title} onClick={() => openTopic(topic.title)} type="button">
                  <span className="topic-priority">{topic.priority}</span>
                  <strong>{topic.title}</strong>
                  <p>{topic.note}</p>
                  <div>
                    <span>{topic.update}</span>
                    <span>{topic.links}</span>
                  </div>
                  <Icon name="arrow" size={15} />
                </button>
              ))}
            </div>
          </section>

          <section className="profile-section thought-assets">
            <div className="profile-section-heading">
              <div>
                <span>03</span>
                <div>我的思想资产</div>
                <p>收藏的不只是内容，更是值得持续思考的观点</p>
              </div>
            </div>
            <div className="asset-grid">
              {assets.map((asset, index) => (
                <button
                  key={asset.title}
                  onClick={() => setPanel("asset")}
                  type="button"
                >
                  <span>0{index + 1}</span>
                  <strong>{asset.title}</strong>
                  <p>{asset.description}</p>
                  <div>
                    <b>{asset.count}</b>
                    <small>{asset.updated}</small>
                  </div>
                  <em>查看全部 <Icon name="arrow" size={13} /></em>
                </button>
              ))}
            </div>
            <button className="organize-thoughts" onClick={() => setPanel("asset")} type="button">
              <Icon name="spark" size={18} />
              <span>
                <strong>让 AI 整理我的近期思考</strong>
                <small>仅基于您主动保存的内容，不会将收藏自动视为正式观点</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
          </section>
        </main>

        <aside className="profile-side-column">
          <section className="profile-side-card work-style-card">
            <div className="side-card-title">
              <span>04</span>
              <strong>AI 如何为我工作</strong>
              <p>用易理解的偏好管理 AI，而不是配置技术参数</p>
            </div>

            <div className="preference-group">
              <span>汇报风格</span>
              <div className="segmented-options">
                {["极简结论型", "结论与证据型", "深度分析型"].map((item) => (
                  <button
                    className={reportStyle === item ? "active" : ""}
                    key={item}
                    onClick={() => {
                      setReportStyle(item)
                      setSavedState("设置已保存")
                    }}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <span>分析方式</span>
              <div className="check-options">
                {analysisOptions.map((item) => (
                  <button
                    className={analysisPreferences.includes(item) ? "active" : ""}
                    key={item}
                    onClick={() =>
                      toggleOption(
                        item,
                        analysisPreferences,
                        setAnalysisPreferences,
                      )
                    }
                    type="button"
                  >
                    <b>{analysisPreferences.includes(item) ? "✓" : ""}</b>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="preference-group">
              <span>主动提醒</span>
              <div className="reminder-options">
                {reminderOptions.map((item) => (
                  <button
                    className={reminders.includes(item) ? "active" : ""}
                    key={item}
                    onClick={() => toggleOption(item, reminders, setReminders)}
                    type="button"
                  >
                    <span>{item}</span>
                    <b>{reminders.includes(item) ? "重要时提醒" : "关闭"}</b>
                  </button>
                ))}
              </div>
            </div>

            <div className="personalization-control">
              <div>
                <strong>个性化建议</strong>
                <p>根据您主动确认的偏好和历史交互调整建议方式。</p>
              </div>
              <button
                aria-pressed={personalization}
                className={personalization ? "active" : ""}
                onClick={() => {
                  setPersonalization(!personalization)
                  setSavedState("设置已保存")
                }}
                type="button"
              >
                <span />
              </button>
            </div>
            <div className="preference-links">
              <button onClick={() => setPanel("understanding")} type="button">查看已使用的信息</button>
              <button onClick={() => setPanel("correction")} type="button">修改或纠正偏好</button>
              <button onClick={() => setPanel("authorization")} type="button">管理数据与隐私</button>
            </div>
            {savedState && <div className="profile-saved-state">{savedState}</div>}
          </section>

          <section className="profile-side-card security-card">
            <div className="side-card-title">
              <span>05</span>
              <strong>授权与安全</strong>
              <p>清楚掌握 AI 的数据范围与操作边界</p>
            </div>

            <div className="authorization-group">
              <span>我的数据授权</span>
              {[
                ["个人收藏与笔记", "本地演示"],
                ["已连接的企业知识", "未连接"],
                ["已授权的经营数据", "未连接"],
                ["外部公开信息", "允许 · 演示设置"],
              ].map(([label, state]) => (
                <button
                  key={label}
                  onClick={() => setPanel("authorization")}
                  type="button"
                >
                  <span>{label}</span>
                  <b className={state === "未连接" ? "disconnected" : ""}>{state}</b>
                  <Icon name="arrow" size={13} />
                </button>
              ))}
            </div>

            <div className="authorization-group operations">
              <span>AI 操作权限</span>
              <div><span>阅读与总结</span><b>按授权范围执行</b></div>
              <div><span>生成分析和建议</span><b>允许</b></div>
              <div><span>创建待办或分派任务</span><b>需确认</b></div>
              <div><span>修改经营系统数据</span><b>需要明确授权</b></div>
              <div><span>发送重要通知</span><b>按审批规则执行</b></div>
            </div>

            <button className="manage-authorization" onClick={() => setPanel("authorization")} type="button">
              管理授权与安全设置
            </button>
          </section>

          <section className="profile-side-card account-settings">
            <div className="side-card-title">
              <span>06</span>
              <strong>账户与个人设置</strong>
            </div>
            {[
              ["个人资料", "姓名、职务与个人简介"],
              ["账号与登录安全", "登录设备与安全验证"],
              ["通知偏好", "提醒渠道与时间"],
              ["显示与语言设置", "界面与语言"],
              ["帮助与反馈", "产品支持与意见"],
              ["关于产品", "版本与服务说明"],
            ].map(([title, copy]) => (
              <button
                key={title}
                onClick={() => setSavedState(`${title}入口已打开（演示）`)}
                type="button"
              >
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
                <Icon name="arrow" size={14} />
              </button>
            ))}
            <button className="sign-out" type="button">退出登录</button>
          </section>
        </aside>
      </div>

      <div className="profile-disclaimer">
        <Icon name="shield" size={14} />
        当前身份、偏好、关注事项与授权状态均为设计演示，未连接真实个人资料或集团系统。
      </div>

      {savedState && !panel && (
        <button
          className="profile-toast"
          onClick={() => setSavedState("")}
          type="button"
        >
          {savedState} · 点击关闭
        </button>
      )}

      {panel && (
        <div className="profile-overlay" onClick={() => setPanel(null)}>
          <aside className="profile-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <span>
                {panel === "preferences"
                  ? "调整我的偏好"
                  : panel === "understanding"
                    ? "AI 如何理解我"
                    : panel === "correction"
                      ? "纠正一项理解"
                      : panel === "topic"
                        ? "关注主题详情"
                        : panel === "asset"
                          ? "我的思想资产"
                          : "授权与安全"}
              </span>
              <button onClick={() => setPanel(null)} type="button">关闭</button>
            </div>

            {panel === "preferences" && (
              <div className="profile-drawer-content">
                <div className="drawer-title">确认 AI 为您工作的基本方式</div>
                <p>这些偏好只影响信息组织与建议表达，不会扩大 AI 的数据访问或操作权限。</p>
                <label>
                  <span>首选汇报方式</span>
                  <select value={reportStyle} onChange={(event) => setReportStyle(event.target.value)}>
                    <option>极简结论型</option>
                    <option>结论与证据型</option>
                    <option>深度分析型</option>
                  </select>
                </label>
                <label>
                  <span>最希望 AI 帮助的事项</span>
                  <textarea defaultValue="识别重大经营问题，解释原因，比较方案并明确风险。" />
                </label>
                <button
                  className="drawer-primary-action"
                  onClick={() => {
                    setSavedState("偏好已保存")
                    setPanel(null)
                  }}
                  type="button"
                >
                  保存并确认
                </button>
              </div>
            )}

            {panel === "understanding" && (
              <div className="profile-drawer-content">
                <div className="drawer-title">AI 当前使用的信息</div>
                <p>仅使用您主动确认的偏好、关注主题和允许保留的历史交互。</p>
                {[
                  ["角色", "董事长 · 演示占位"],
                  ["职责", "集团战略与经营决策 · 待确认"],
                  ["关注重点", "经营质量、组织效率、AI 转型 · 待确认"],
                  ["表达偏好", reportStyle],
                  ["企业经营数据", "未连接"],
                ].map(([label, value]) => (
                  <div className="understanding-row" key={label}>
                    <span>{label}</span><strong>{value}</strong>
                  </div>
                ))}
                <button className="drawer-secondary-action" onClick={() => setPanel("correction")} type="button">
                  发现不准确？纠正一项理解
                </button>
              </div>
            )}

            {panel === "correction" && (
              <div className="profile-drawer-content">
                <div className="drawer-title">告诉 AI 哪里理解得不准确</div>
                <p>修改后将作为待确认信息保存，不会自动改变企业配置或正式决策。</p>
                <label>
                  <span>需要纠正的内容</span>
                  <select>
                    <option>重点关注</option>
                    <option>常用分析视角</option>
                    <option>偏好的汇报方式</option>
                    <option>决策辅助偏好</option>
                  </select>
                </label>
                <label>
                  <span>正确的理解应该是</span>
                  <textarea
                    onChange={(event) => setCorrection(event.target.value)}
                    placeholder="请输入您希望 AI 如何理解"
                    value={correction}
                  />
                </label>
                <button
                  className="drawer-primary-action"
                  disabled={!correction.trim()}
                  onClick={() => {
                    setSavedState("纠正内容已保存，等待确认")
                    setPanel(null)
                  }}
                  type="button"
                >
                  保存纠正
                </button>
              </div>
            )}

            {panel === "topic" && (
              <div className="profile-drawer-content">
                <div className="drawer-label">长期关注主题</div>
                <div className="drawer-title">{selectedTopic}</div>
                <p>
                  当前仅展示主题管理交互。接入真实内容后，可关联今日简报、经营洞察、学习内容和个人笔记。
                </p>
                <div className="topic-detail-links">
                  <div><span>相关洞察</span><strong>尚未连接</strong></div>
                  <div><span>相关文章</span><strong>示例内容待关联</strong></div>
                  <div><span>历史思考</span><strong>尚未记录</strong></div>
                </div>
                <div className="drawer-action-row">
                  <button
                    onClick={() => setSavedState("主题优先级已调整（演示）")}
                    type="button"
                  >
                    调整优先级
                  </button>
                  <button
                    onClick={() => setSavedState("已暂停关注该主题（演示）")}
                    type="button"
                  >
                    暂停关注
                  </button>
                  <button
                    className="danger"
                    onClick={() => setConfirmTopicRemoval(true)}
                    type="button"
                  >
                    移除主题
                  </button>
                </div>
                {confirmTopicRemoval && (
                  <div className="revoke-confirmation">
                    <strong>确认移除“{selectedTopic}”？</strong>
                    <p>移除后将停止主动追踪，但不会删除已保存的文章、笔记或历史讨论。</p>
                    <div>
                      <button onClick={() => setConfirmTopicRemoval(false)} type="button">
                        取消
                      </button>
                      <button
                        onClick={() => {
                          setSavedState("关注主题已移除（演示）")
                          setConfirmTopicRemoval(false)
                          setPanel(null)
                        }}
                        type="button"
                      >
                        确认移除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {panel === "asset" && (
              <div className="profile-drawer-content">
                <div className="drawer-title">近期思想资产整理</div>
                <p>
                  AI 只能整理您主动保存的内容。个人收藏代表关注线索，不等同于您的正式观点或企业决策。
                </p>
                <div className="asset-summary">
                  <span>近期反复出现的主题</span>
                  <strong>AI 转型 · 工作流程 · 战略取舍</strong>
                  <span>值得继续思考的问题</span>
                  <strong>如何把工具应用转化为组织能力？</strong>
                </div>
                <button
                  className="drawer-primary-action"
                  onClick={() => {
                    setSavedState("近期思考整理已生成（演示）")
                    setPanel(null)
                  }}
                  type="button"
                >
                  生成完整整理
                </button>
              </div>
            )}

            {panel === "authorization" && (
              <div className="profile-drawer-content">
                <div className="drawer-title">个人可管理的授权范围</div>
                <p>
                  此处仅管理个人授权。复杂的组织级权限、数据策略与审批规则由独立管理员界面管理。
                </p>
                <div className="authorization-detail">
                  <div><span>个人收藏与笔记</span><strong>仅用于个性化整理</strong></div>
                  <div><span>企业知识</span><strong>未连接</strong></div>
                  <div><span>经营数据</span><strong>未连接</strong></div>
                  <div><span>操作记录</span><strong>查看演示记录</strong></div>
                </div>
                {!confirmRevoke ? (
                  <button
                    className="drawer-danger-action"
                    onClick={() => setConfirmRevoke(true)}
                    type="button"
                  >
                    撤销个人内容授权
                  </button>
                ) : (
                  <div className="revoke-confirmation">
                    <strong>确认撤销个人内容授权？</strong>
                    <p>撤销后，AI 将不再使用个人收藏与笔记进行个性化整理。</p>
                    <div>
                      <button onClick={() => setConfirmRevoke(false)} type="button">取消</button>
                      <button
                        onClick={() => {
                          setSavedState("授权已撤销")
                          setConfirmRevoke(false)
                          setPanel(null)
                        }}
                        type="button"
                      >
                        确认撤销
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

function ProfilePage() {
  const [notice, setNotice] = useState("")
  const menuItems: {
    title: string
    description: string
    icon: IconName
  }[] = [
    {
      title: "每日推送",
      description: "管理每日简报与重要信息推送",
      icon: "send",
    },
    {
      title: "督办信息",
      description: "查看需要持续跟进的重要事项",
      icon: "insights",
    },
    {
      title: "我的日程",
      description: "会议、安排与待处理事项",
      icon: "learning",
    },
    {
      title: "我的智能硬件",
      description: "管理已连接的智能设备",
      icon: "model",
    },
    {
      title: "我的 Skills",
      description: "查看和管理 AI Skills",
      icon: "spark",
    },
    {
      title: "我的学习收藏/分享",
      description: "收藏、查看和分享文章与观点",
      icon: "learning",
    },
  ]

  return (
    <div className="page profile-simple-page">
      <div className="profile-simple-inner">
        <header className="profile-simple-header">
          <div className="profile-eyebrow">董事长 AI · 个人空间</div>
          <div className="profile-title">我的</div>
        </header>

        <section className="profile-welcome-card">
          <div className="profile-welcome-orbit" aria-hidden="true" />
          <div className="profile-welcome-avatar">白</div>
          <div className="profile-welcome-copy">
            <span>下午好，大白</span>
            <strong>您的个人工作空间</strong>
            <p>集中管理日程、督办、设备与学习内容。</p>
          </div>
          <div className="profile-secure-state">
            <Icon name="shield" size={15} />
            <span>私人空间</span>
          </div>
        </section>

        <div className="profile-menu-list">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setNotice(`${item.title}功能暂为演示入口`)}
              type="button"
            >
              <span className="profile-menu-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="profile-menu-copy">
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <Icon name="arrow" size={16} />
            </button>
          ))}
        </div>

        {notice && (
          <button
            className="profile-menu-notice"
            onClick={() => setNotice("")}
            type="button"
          >
            {notice} · 点击关闭
          </button>
        )}

        <button
          className="profile-simple-signout"
          onClick={() => setNotice("退出登录需再次确认，当前为演示状态")}
          type="button"
        >
          退出登录
        </button>
      </div>
    </div>
  )
}

function PlaceholderPage({
  title,
  copy,
  icon,
}: {
  title: string
  copy: string
  icon: IconName
}) {
  return (
    <div className="page placeholder-page">
      <DemoBadge />
      <div className="placeholder-center">
        <div className="placeholder-icon">
          <Icon name={icon} size={26} />
        </div>
        <div className="placeholder-kicker">董事长 AI</div>
        <div className="placeholder-title">{title}</div>
        <p>{copy}</p>
        <div className="coming-soon">功能正在精心准备中</div>
      </div>
    </div>
  )
}

function AiPage() {
  const [mode, setMode] = useState<"daily" | "work">("daily")
  const [value, setValue] = useState("")
  const [message, setMessage] = useState("")
  const prompts =
    mode === "daily"
      ? [
          "帮我整理一下今天的思考",
          "解释一个最近常被讨论的管理概念",
          "为一场重要讨论列出关键问题",
        ]
      : [
          "今天有哪些重大经营异常？",
          "华东区域销售下滑的主要原因是什么？",
          "哪些门店可能存在库存风险？",
        ]

  function changeMode(nextMode: "daily" | "work") {
    setMode(nextMode)
    setValue("")
    setMessage("")
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!value.trim()) return
    setMessage(
      mode === "work"
        ? "已收到经营问题。当前为演示环境，尚未连接或读取任何内部经营数据。"
        : "已收到您的问题。当前为日常对话演示，不会读取企业内部数据。",
    )
  }

  return (
    <div className="page ai-page">
      <div className="ai-topbar">
        <button aria-label="聊天历史记录，暂未开放" type="button">
          <Icon name="history" size={20} />
        </button>
        <DemoBadge />
      </div>

      <div className="ai-mode-tabs">
        <button
          className={mode === "daily" ? "active" : ""}
          onClick={() => changeMode("daily")}
          type="button"
        >
          日常对话
        </button>
        <button
          className={mode === "work" ? "active" : ""}
          onClick={() => changeMode("work")}
          type="button"
        >
          <Icon name="shield" size={14} />
          工作环境
        </button>
      </div>

      <header className="ai-header">
        <div className="ai-orb">
          <Icon name={mode === "work" ? "shield" : "spark"} size={30} />
        </div>
        <div className="ai-title">此刻，您想了解什么？</div>
        <div className={`ai-mode-note ${mode}`}>
          {mode === "work" ? (
            <>
              <Icon name="shield" size={13} />
              将在授权范围内使用内部数据
            </>
          ) : (
            "通用思考、学习与日常讨论"
          )}
        </div>
      </header>

      <div className="quick-prompts">
        <span>快捷提问</span>
        {prompts.map((prompt) => (
          <button key={prompt} onClick={() => setValue(prompt)} type="button">
            {prompt}
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </div>

      {message && <div className="demo-response">{message}</div>}

      <form className="ask-box" onSubmit={submit}>
        <div className="ask-toolbar">
          <button type="button">
            <Icon name="spark" size={14} />
            Skills
          </button>
          <button aria-label="选择模型" type="button">
            <Icon name="model" size={15} />
            模型
          </button>
        </div>
        <div className="ask-input-row">
          <input
            aria-label="向董事长 AI 提问"
            onChange={(event) => {
              setValue(event.target.value)
              setMessage("")
            }}
            placeholder={
              mode === "work"
                ? "询问经营、组织或内部业务问题"
                : "输入您想了解的问题"
            }
            value={value}
          />
          <button
            aria-label="发送问题"
            className="ask-send"
            disabled={!value.trim()}
            type="submit"
          >
            <Icon name="send" size={20} />
          </button>
        </div>
      </form>
      <div className="privacy-note">
        <Icon name="shield" size={14} />
        {mode === "work"
          ? "工作环境仅在授权范围内使用内部数据 · 当前演示未连接"
          : "日常对话不会主动读取企业内部数据"}
      </div>
    </div>
  )
}

function DetailPage({
  kind,
  onBack,
  perspective,
}: {
  kind: DetailKind
  onBack: () => void
  perspective: Perspective
}) {
  const detail =
    kind === "editorial"
      ? { ...details.editorial, ...editorialPerspectives[perspective] }
      : details[kind]
  return (
    <div className="page detail-page">
      <header className="detail-nav">
        <button aria-label="返回今日" onClick={onBack} type="button">
          <Icon name="back" size={22} />
        </button>
        <span>AI 思考详情</span>
        <DemoBadge />
      </header>

      <main>
        <div className={`detail-hero ${detail.tone}`}>
          <div className="detail-eyebrow">
            <span />
            {detail.eyebrow}
          </div>
          <div className="detail-title">{detail.title}</div>
          <p>{detail.summary}</p>
        </div>

        <section className="detail-section">
          <div className="detail-section-title">{detail.evidenceLabel}</div>
          <div className="evidence-list">
            {detail.evidence.map((item, index) => (
              <div key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <div className="detail-section-title">{detail.causesLabel}</div>
          <div className="cause-tags">
            {detail.causes.map((cause) => (
              <span key={cause}>{cause}</span>
            ))}
          </div>
        </section>

        <section className="detail-section questions-section">
          <div className="detail-section-title">建议继续追问</div>
          {detail.questions.map((question) => (
            <button key={question} onClick={onBack} type="button">
              <Icon name="spark" size={16} />
              <span>{question}</span>
              <Icon name="arrow" size={15} />
            </button>
          ))}
        </section>

        <div className="detail-disclaimer">
          本页内容基于模拟材料生成，仅用于产品功能展示，不代表真实经营结论。
        </div>
      </main>
    </div>
  )
}

function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <nav className="bottom-nav" aria-label="主要导航">
      {navItems.map((item) => {
        const isAi = item.id === "ai"
        return (
          <button
            aria-current={active === item.id ? "page" : undefined}
            className={`${active === item.id ? "active" : ""} ${
              isAi ? "ai-nav-item" : ""
            }`}
            key={item.id}
            onClick={() => onChange(item.id)}
            type="button"
          >
            <span className={isAi ? "ai-nav-button" : "nav-icon"}>
              <Icon name={item.icon} size={isAi ? 25 : 21} />
            </span>
            <span>{item.label}</span>
          </button>
        )
      })}
      <div className="home-indicator" />
    </nav>
  )
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons" aria-hidden="true">
        <i className="signal-bars">
          <b />
          <b />
          <b />
          <b />
        </i>
        <i className="wifi">⌁</i>
        <i className="battery">
          <b />
        </i>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState<Tab>("today")
  const [detail, setDetail] = useState<DetailKind | null>(null)
  const [perspective, setPerspective] = useState<Perspective>("strategy")

  function changeTab(nextTab: Tab) {
    setDetail(null)
    setTab(nextTab)
  }

  function changePerspective() {
    const currentIndex = perspectiveOrder.indexOf(perspective)
    setPerspective(
      perspectiveOrder[(currentIndex + 1) % perspectiveOrder.length],
    )
  }

  return (
    <div className="app-stage">
      <div
        className={`app-shell ${
          tab === "insights"
            ? "insights-mode"
            : tab === "learning"
              ? "learning-mode"
              : tab === "profile"
                ? "profile-mode"
              : ""
        }`}
      >
        <StatusBar />
        <div className="scroll-viewport" key={detail ?? tab}>
          {detail ? (
            <DetailPage
              kind={detail}
              onBack={() => setDetail(null)}
              perspective={perspective}
            />
          ) : tab === "today" ? (
            <TodayPage
              onChangePerspective={changePerspective}
              onOpen={setDetail}
              perspective={perspective}
            />
          ) : tab === "ai" ? (
            <AiPage />
          ) : tab === "insights" ? (
            <WorkPage />
          ) : tab === "learning" ? (
            <LearningPage />
          ) : (
            <ProfilePage />
          )}
        </div>
        {!detail && <BottomNav active={tab} onChange={changeTab} />}
      </div>
    </div>
  )
}
