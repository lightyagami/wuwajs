"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getAkiExcelPath = exports.getAkiExcelExportJsonFileName = exports.getAkiExcelPairConfig = exports.akiExcelToKeyValuePairConfigs = exports.EAkiExcelType = void 0;
const File_1 = require("../Misc/File"),
  Util_1 = require("../Misc/Util");
var EAkiExcelType;

function getAkiExcelPairConfig(e) {
  return exports.akiExcelToKeyValuePairConfigs[e]
}

function getAkiExcelExportJsonFileName(e) {
  const a = getAkiExcelPairConfig(e);
  e = a.ExcelSheets.map(e => e.SheetName.split("|"));
  return e.forEach((e, t) => {
    if (e.length < 1) throw new Error(`配置表${a.ExcelSheets[t]?.ExcelRelativePath}的Sheet名${a.ExcelSheets[t]?.SheetName}不合法`)
  }), e.map(e => e[1])
}

function getAkiExcelPath(e) {
  const t = exports.akiExcelToKeyValuePairConfigs[e];
  return t.ExcelSheets.map(e => "AkiBase" === t.SheetWorkspace ? (0, File_1.getAbsolutePath)(`${(0,Util_1.getAkiBaseLocalPath)()}/Source/Config/Raw/BaseTables/${e.ExcelRelativePath}.xlsx`) : (0, File_1.getAbsolutePath)(`${(0,File_1.getProjectPath)("")}/../Config/Raw/Tables/${e.ExcelRelativePath}.xlsx`))
}! function(e) {
  e.ItemInfo = "ItemInfo", e.WeaponBaseInfo = "WeaponBaseInfo", e.FunctionCondition = "FunctionCondition", e.GmAddRoleConfig = "GmAddRoleConfig", e.TeleporterForGM = "TeleporterForGM", e.Teleporter = "Teleporter", e.PhantomItemSkillId = "VisionSkillId", e.TaskMark = "TaskMark", e.MapMark = "MapMark", e.MapMarkDetail = "MapMarkDetail", e.Weather = "Weather", e.TrialRoleInfo = "TrialRoleInfo", e.TrialRoleGroupInfo = "TrialRoleGroupInfo", e.PhantomFormation = "PhantomFormation", e.Role = "Role", e.ScanType = "ScanType", e.DungeonEntrance = "DungeonEntrance", e.ExploreTools = "ExploreTools", e.Damage = "Damage", e.TimePeriod = "TimePeriod", e.DropPackage = "DropPackage", e.AreaLevel = "AreaLevel", e.PhotoMemoryCollect = "PhotoMemoryCollect", e.QuestTag = "QuestTag", e.VisionCapture = "VisionCapture", e.Attribute = "Attribute", e.MonsterAttributeRate = "MonsterAttributeRate", e.WorldLevelBonusForMonster = "WorldLevelBonusForMonster", e.HardnessMode = "HardnessMode", e.CookProcessMsg = "CookProcessMsg", e.GeographyHandBook = "GeographyHandBook", e.PhotographHandBook = "PhotographHandBook", e.InfoDisplay = "InfoDisplay", e.ReviveRegion = "ReviveRegion", e.FunctionOpen = "FunctionOpen", e.RiskHarvestEffect = "RiskHarvestEffect", e.NounHandBook = "NounHandBook", e.ComboTeaching = "ComboTeaching", e.GuideGroup = "GuideGroup", e.MapFog = "MapFog", e.MapLevelExp = "MapLevelExp", e.GameplayCue = "GameplayCue", e.FishingPosition = "FishingPosition", e.FishingDelivery = "FishingDelivery", e.FishingPort = "FishingPort", e.FishingTech = "FishingTech", e.DangoAbyss = "DangoAbyss", e.MoralePlay = "MoralePlay", e.MoraleMonsterGrowth = "MoraleMonsterGrowth", e.BvbPhantomBattleFactor = "BvbPhantomBattleFactor", e.BvbPhantomBattleChallenge = "BvbPhantomBattleChallenge", e.BvbPhantomBattleCard = "BvbPhantomBattleCard", e.EffectBuff = "EffectBuff", e.SpecialItem = "SpecialItem", e.Reigns = "Reigns"
}(EAkiExcelType = exports.EAkiExcelType || (exports.EAkiExcelType = {})), exports.akiExcelToKeyValuePairConfigs = {
  [EAkiExcelType.ItemInfo]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "d.道具",
      SheetName: "道具|ItemInfo"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.WeaponBaseInfo]: {
    KeyName: "ItemId",
    ExcelSheets: [{
      ExcelRelativePath: "w.武器基础配置",
      SheetName: "武器基础配置|WeaponConf"
    }],
    PromptKeyList: ["ItemId", "NameDesc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FunctionCondition]: {
    KeyName: "FunctionId",
    ExcelSheets: [{
      ExcelRelativePath: "g.功能开启",
      SheetName: "功能条件|FunctionCondition"
    }],
    PromptKeyList: ["FunctionId", "Name"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "开启全部"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.GmAddRoleConfig]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "g.GM添加配置角色",
      SheetName: "GM指令|GmAddRoleConfig"
    }],
    PromptKeyList: ["Id", "字段名", "RoleLevel"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.TeleporterForGM]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "c.传送",
      SheetName: "传送|Teleporter"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "开启全部"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Teleporter]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "c.传送",
      SheetName: "传送|Teleporter"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.PhantomItemSkillId]: {
    KeyName: "SkillId",
    ExcelSheets: [{
      ExcelRelativePath: "h.幻象",
      SheetName: "幻象道具|PhantomItem"
    }],
    PromptKeyList: ["SkillId", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.TaskMark]: {
    KeyName: "MarkId",
    ExcelSheets: [{
      ExcelRelativePath: "d.地图标记",
      SheetName: "任务标记|TaskMark"
    }],
    CustomKeyMapping: {
      Desc: 6
    },
    PromptKeyList: ["MarkId", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MapMark]: {
    KeyName: "MarkId",
    ExcelSheets: [{
      ExcelRelativePath: "d.地图标记",
      SheetName: "地图标记|MapMark"
    }],
    PromptKeyList: ["MarkId"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MapMarkDetail]: {
    KeyName: "MarkId",
    ExcelSheets: [{
      ExcelRelativePath: "d.地图标记",
      SheetName: "地图标记|MapMark"
    }],
    PromptKeyList: ["MarkId", "Desc", "MarkVector", "MapId"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Weather]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.天气系统",
      SheetName: "天气|Weather"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.TrialRoleInfo]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.试用角色",
      SheetName: "试用角色信息|TrialRoleInfo"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.TrialRoleGroupInfo]: {
    KeyName: "GroupId",
    ExcelSheets: [{
      ExcelRelativePath: "s.试用角色",
      SheetName: "试用角色信息|TrialRoleInfo"
    }],
    PromptKeyList: ["GroupId", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.PhantomFormation]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "b.编队",
      SheetName: "声骸编队|PhantomFormation"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Role]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "j.角色",
      SheetName: "角色总表|RoleInfo"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.ScanType]: {
    KeyName: "UId",
    ExcelSheets: [{
      ExcelRelativePath: "g.关卡玩法数据",
      SheetName: "扫描组合|GamePlayScanComposite"
    }],
    PromptKeyList: ["UId", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.DungeonEntrance]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "f.副本",
      SheetName: "副本入口|InstanceDungeonEntrance"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.ExploreTools]: {
    KeyName: "PhantomSkillId",
    ExcelSheets: [{
      ExcelRelativePath: "t.探索工具",
      SheetName: "探索工具|ExploreTools"
    }],
    PromptKeyList: ["字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Damage]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "j.结算",
      SheetName: "结算表|Damage"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.TimePeriod]: {
    KeyName: "TimeId",
    ExcelSheets: [{
      ExcelRelativePath: "s.时间表/q.区间时间",
      SheetName: "区间时间|TimeQuantum"
    }],
    PromptKeyList: ["TimeId", "BeginTime", "EndTime"],
    SeparatorInPrompt: " ~ ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.DropPackage]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "d.掉落",
      SheetName: "掉落包|DropPackage"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "0"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.AreaLevel]: {
    KeyName: "AreaId",
    ExcelSheets: [{
      ExcelRelativePath: "q.区域",
      SheetName: "区域|Area"
    }],
    PromptKeyList: ["Title", "Level"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.PhotoMemoryCollect]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "j.记忆手册",
      SheetName: "记忆收集|PhotoMemoryCollect"
    }],
    PromptKeyList: ["Id", "Title"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.QuestTag]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "r.任务标签",
      SheetName: "任务标签表|QuestTag"
    }],
    PromptKeyList: ["Id", "Name"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.VisionCapture]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "g.怪物",
      SheetName: "怪物|MonsterConf"
    }],
    PromptKeyList: ["Id", "Name"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "0"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Attribute]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.属性",
      SheetName: "基础属性|BaseProperty"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MonsterAttributeRate]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.属性",
      SheetName: "怪物属性倍率|MonsterPropExtraRate"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "0"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.WorldLevelBonusForMonster]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.世界等级",
      SheetName: "世界等级对怪物等级|WorldLevelMonster"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "0"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.HardnessMode]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "z.战斗/b.白条/b.白条_common",
      SheetName: "白条|HardnessMode"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    ExtraValidValue: [{
      StartBranch: "branch_1.0",
      Key: 0,
      Prompt: "0"
    }],
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.CookProcessMsg]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "p.烹饪",
      SheetName: "食材加工文本|CookProcessMsg"
    }],
    PromptKeyList: ["Id"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.GeographyHandBook]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.图鉴系统",
      SheetName: "地理图鉴|GeographyHandBook"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.PhotographHandBook]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.图鉴系统",
      SheetName: "留影图鉴|PhotographHandBook"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.NounHandBook]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.图鉴系统",
      SheetName: "名词图鉴|NounHandBook"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.InfoDisplay]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "x.信息展示",
      SheetName: "信息展示|InfoDisplay"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.ReviveRegion]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "f.复活范围",
      SheetName: "范围触发|ReviveRegion"
    }],
    PromptKeyList: ["Id", "Position"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FunctionOpen]: {
    KeyName: "FunctionId",
    ExcelSheets: [{
      ExcelRelativePath: "g.功能开启",
      SheetName: "功能条件|FunctionCondition"
    }],
    PromptKeyList: ["FunctionId", "Name"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.RiskHarvestEffect]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "h.活动/g.割草冒险活动",
      SheetName: "割草buff投放|RiskHarvestBuffDrop"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.ComboTeaching]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "j.角色出招教学",
      SheetName: "角色出招总表|ComboTeaching"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.GuideGroup]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "y.引导(新)",
      SheetName: "引导组数据|GuideGroup"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MapFog]: {
    KeyName: "Fog",
    ExcelSheets: [{
      ExcelRelativePath: "d.地图迷雾",
      SheetName: "地图迷雾配置|MapFog"
    }],
    PromptKeyList: ["Fog", "备注"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MapLevelExp]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "h.活动/d.地图主题活动",
      SheetName: "升级经验|MapLevelExp"
    }],
    PromptKeyList: ["Id"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.GameplayCue]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "z.战斗/b.Buff特效/b.buff特效",
      SheetName: "Buff特效表|GameplayCue"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FishingPosition]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "b.捕鱼/b.捕鱼船坞",
      SheetName: "码头位置|FishingPosition"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FishingDelivery]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "b.捕鱼/b.捕鱼委托",
      SheetName: "捕鱼交付|FishingDelivery"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FishingPort]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "b.捕鱼/b.捕鱼船坞",
      SheetName: "捕鱼码头|FishingPort"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.FishingTech]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "b.捕鱼/b.捕鱼船坞",
      SheetName: "科技树|FishingTech"
    }],
    PromptKeyList: ["Id", "Desc"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.DangoAbyss]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.团子深渊/s.深渊爬塔",
      SheetName: "团子配置|AbyssLittleRole"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MoralePlay]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "c.插旗玩法",
      SheetName: "士气开启配置|MoralePlay"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.MoraleMonsterGrowth]: {
    KeyName: "Level",
    ExcelSheets: [{
      ExcelRelativePath: "c.插旗玩法",
      SheetName: "怪物士气属性成长|MoraleMonsterGrowth"
    }],
    PromptKeyList: ["Level"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.BvbPhantomBattleFactor]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.声骸大作战/s.声骸大作战战斗",
      SheetName: "声骸竞技场卡牌因子|PhantomBattleFactor"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.BvbPhantomBattleChallenge]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.声骸大作战/s.声骸大作战外围",
      SheetName: "挑战|PhantomBattleChallenge"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.BvbPhantomBattleCard]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "s.声骸大作战/s.声骸大作战外围",
      SheetName: "卡牌|PhantomBattleCard"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.EffectBuff]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "z.战斗/b.Buff特效/b.Buff特效_common",
      SheetName: "Buff特效表|GameplayCue"
    }, {
      ExcelRelativePath: "z.战斗/b.Buff特效/b.Buff特效_LevelNew",
      SheetName: "Buff特效表|GameplayCue"
    }],
    PromptKeyList: ["Id"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.SpecialItem]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "t.特殊道具",
      SheetName: "特殊道具|SpecialItem"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  },
  [EAkiExcelType.Reigns]: {
    KeyName: "Id",
    ExcelSheets: [{
      ExcelRelativePath: "w.王权",
      SheetName: "王权属性|KingShipAttribute"
    }],
    PromptKeyList: ["Id", "字段名"],
    SeparatorInPrompt: " - ",
    IsFilterByWell: !0,
    SheetWorkspace: "AkiBase"
  }
}, exports.getAkiExcelPairConfig = getAkiExcelPairConfig, exports.getAkiExcelExportJsonFileName = getAkiExcelExportJsonFileName, exports.getAkiExcelPath = getAkiExcelPath;
//# sourceMappingURL=AkiExcelDefine.js.map