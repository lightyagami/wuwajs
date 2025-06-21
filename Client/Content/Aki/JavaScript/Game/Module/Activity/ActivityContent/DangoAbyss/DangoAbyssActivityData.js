"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssActivityData = exports.AbyssChallengeData = exports.AbyssRewardInfo = exports.AbyssPluginItemInfo = exports.AbyssDangoRoleData = exports.AbyssDangoRoleSlotData = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  AbyssInstById_1 = require("../../../../../Core/Define/ConfigQuery/AbyssInstById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  DangoAbyssDefine_1 = require("../../../Dango/DangoAbyss/DangoAbyssDefine"),
  AttributeItemData_1 = require("../../../Inventory/ItemData/AttributeItemData"),
  AttrListScrollData_1 = require("../../../RoleUi/View/ViewData/AttrListScrollData"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
  ActivityData_1 = require("../../ActivityData"),
  DangoAbyssActivityController_1 = require("./DangoAbyssActivityController"),
  OPENTIPKEY = 1;
class AbyssDangoRoleSlotData {
  constructor() {
    this.wVi = -1, this.wTt = 0, this.ETt = 0, this.p5c = 0
  }
  GetSlotIndex() {
    return this.wVi
  }
  GetDangoId() {
    return this.p5c
  }
  GetIncId() {
    return this.wTt
  }
  GetEquipId() {
    return this.ETt
  }
  GetPassiveSkillDesc() {
    return 0 < this.ETt ? ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(this.wTt).GetPassiveSkillDesc() : ""
  }
  SetDangoRoleId(t) {
    this.p5c = t
  }
  Refresh(t, e, r) {
    this.wVi = t, this.wTt = e, this.ETt = r
  }
}
exports.AbyssDangoRoleSlotData = AbyssDangoRoleSlotData;
class AbyssDangoRoleData {
  constructor() {
    this.xe = 0, this.B8 = 0, this.vvc = [], this.Ujt = !0, this.yvc = new Map
  }
  GetId() {
    return this.xe
  }
  GetLevel() {
    return this.B8
  }
  GetEquipItems() {
    return this.vvc
  }
  GetEquipItemConfigIdList() {
    var t = new Array;
    for (const r of this.vvc) {
      var e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(r);
      e ? t.push(e.GetItemId()) : t.push(0)
    }
    return t
  }
  GetIfLock() {
    return this.Ujt
  }
  GetTexture() {
    return this.GetConfig().Icon
  }
  GetFormationIcon() {
    return this.GetConfig().FormationIcon
  }
  GetMeshId() {
    var t = this.GetPhantomId();
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(t).PhantomItem.MeshId
  }
  GetPhantomId() {
    return this.GetConfig().PhantomItemId
  }
  Init(t) {
    this.xe = t.Id, this.B8 = 1
  }
  Phrase(t, e) {
    this.xe = t.s5n, this.B8 = t.F6n, this.vvc = t.j0c, this.Ujt = !1, this.PhraseSlotData(t.j0c, e)
  }
  PhraseSlotData(e, r) {
    e.length < DangoAbyssDefine_1.SLOT_COUNT && Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 75, "团子插槽信息不足", ["dangoId", this.xe]);
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var i = e[t],
        s = r[t],
        n = new AbyssDangoRoleSlotData;
      n.SetDangoRoleId(this.xe), n.Refresh(t, i, s), this.yvc.set(t, n)
    }
  }
  GetQuality() {
    return this.GetConfig().Quality
  }
  GetQualitySpritePath() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(this.GetQuality()).Bg
  }
  GetEquipPluginMap() {
    var t, e = new Map;
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) e.set(t, 0);
    for ([, t] of this.yvc) e.set(t.GetSlotIndex(), t.GetEquipId());
    return e
  }
  GetPluginSlotData(t) {
    return this.yvc.get(t)
  }
  GetCurrentPluginSlotNum() {
    return this.GetLevelConfig().PluginNum
  }
  GetName() {
    return this.GetConfig().Name
  }
  GetCastTypeDesc() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoCastDescById(this.GetConfig().CastType)
  }
  GetSkillCastTypeName() {
    return this.GetCastTypeDesc().Name
  }
  GetSkillCastTypeIconPath() {
    return this.GetCastTypeDesc().Icon
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(this.xe)
  }
  Svc() {
    return this.GetConfig().LevelGroupId
  }
  GetLevelGroupConfigs() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(this.Svc())
  }
  GetSkillId() {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.GetConfig().PhantomItemId).GetPhantomSkillId()
  }
  GetSkillConfig() {
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(this.GetSkillId())
  }
  GetSkillDesc() {
    return this.GetSkillConfig().DescriptionEx
  }
  GetSkillDescAddition() {
    var t = this.GetSkillId(),
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.GetConfig().PhantomItemId).PhantomItem.QualityId;
    return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(t, e)
  }
  GetEffectPassiveSkillDescList() {
    const r = new Array;
    return this.yvc.forEach((t, e) => {
      t = t.GetPassiveSkillDesc();
      "" !== t && r.push(t)
    }), r
  }
  GetLevelConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(this.B8, this.Svc())
  }
  GetCurrentLevelUpConsume() {
    var t = this.GetLevelConfig();
    if (!t) return [];
    var t = t.Consume,
      e = new Array;
    for (const i of t) {
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i[0]),
        r = {
          ItemId: i[0],
          Cost: i[1],
          Count: r
        };
      e.push(r)
    }
    return e
  }
  GetIfLevelUpEnough() {
    for (const t of this.GetCurrentLevelUpConsume())
      if (t.Cost > t.Count) return !1;
    return !0
  }
  GetMaxLevel() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(this.Svc()).length
  }
  GetIfMaxLevel() {
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByGroupId(this.Svc());
    return this.B8 >= t.length
  }
  GetIfCanLevelUp() {
    var t = this.GetIfLock(),
      e = this.GetIfMaxLevel();
    return !t && !e
  }
  GetLevelUpPreviewData(t) {
    const i = new Array;
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(t - 1, this.Svc()).Prop.forEach(t => {
      let e = !1;
      for (const r of i) r.Id === t.Id && r.IsRatio === t.IsRatio && (r.BaseValue += t.Value, e = !0);
      e || i.push(new AttrListScrollData_1.AttrListScrollData(t.Id, t.Value, 0, 0, t.IsRatio, 0))
    }), t <= this.GetMaxLevel() && ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(t, this.Svc()).Prop.forEach(t => {
      let e = !1;
      for (const r of i) r.Id === t.Id && r.IsRatio === t.IsRatio && (r.AddValue += t.Value, e = !0);
      e || i.push(new AttrListScrollData_1.AttrListScrollData(t.Id, 0, t.Value, 0, t.IsRatio, 0))
    }), i
  }
  GetLevelUpPluginAddData(t) {
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(t, this.Svc()),
      r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoLevelConfigByLevelAndGroupId(t - 1, this.Svc());
    return e && r ? e.PluginNum - r.PluginNum : (Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 75, "获取团子升级信息错误，检查配置表", ["level", t]), 0)
  }
  zi1(t, e, r) {
    e = AttributeModel_1.TipsDataTool.GetPropRatioValue(e, r);
    return ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(t, e, r)
  }
  GetLevelUpViewAttributeInfo(t, r) {
    var e = this.GetLevelUpPreviewData(t);
    const i = new Array;
    e.forEach(t => {
      var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t.Id),
        e = {
          Name: e.Name,
          IconPath: e.Icon,
          ShowArrow: !r,
          PreText: this.zi1(t.Id, t.BaseValue, t.IsRatio)
        };
      r || (e.CurText = this.zi1(t.Id, t.AddValue, t.IsRatio)), i.push(e)
    });
    e = this.GetLevelUpPluginAddData(t);
    return e <= 0 || r || (t = {
      Name: "Ayess_Chajiancao_Text",
      IconPath: void 0,
      ShowArrow: !1,
      CurText: StringUtils_1.StringUtils.Format("+{0}", e.toString())
    }, i.push(t)), i
  }
  GetLevelUpViewData(t) {
    return {
      LevelInfo: {
        PreUpgradeLv: t - 1,
        UpgradeLv: t,
        FormatStringId: "Text_LevelShow_Text",
        IsMaxLevel: t >= this.GetMaxLevel()
      },
      AttributeInfo: this.GetLevelUpViewAttributeInfo(t)
    }
  }
}
exports.AbyssDangoRoleData = AbyssDangoRoleData;
class AbyssPluginItemInfo extends AttributeItemData_1.AttributeItemData {
  constructor(t) {
    super(t.L8n, t.b9n, t.Vws, 13), this.dFe = 0, this.Count = t.m9n
  }
  SetRoleId(t) {
    this.dFe = t
  }
  GetRoleId() {
    return this.dFe
  }
  GetItemId() {
    return this.ConfigId
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(this.ConfigId)
  }
  GetMainType() {}
  GetType() {
    return 60006
  }
  GetSortIndex() {
    var t = this.GetItemTypeConfig();
    return t ? t.SortIndex : 0
  }
  GetItemAccess() {
    return []
  }
  GetMaxStackCount() {
    return 1
  }
  GetUseCountLimit() {
    return 1
  }
  GetRedDotDisableRule() {
    return 1
  }
  IsValid() {
    return !0
  }
  HasRedDot() {
    return !1
  }
  GetQuality() {
    return this.GetConfig().QualityId
  }
  GetProp() {
    return this.GetConfig().Prop
  }
  GetBelongRole() {
    return this.GetConfig().BelongLittleRole
  }
  GetCanRecovery() {
    return this.dFe <= 0 && !this.GetIsLock()
  }
  GetFormationCoreBgPath() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(this.GetQuality())?.AbyssCoreItemFormationBg ?? ""
  }
  GetFormationBgPath() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(this.GetQuality())?.AbyssItemFormationBg ?? ""
  }
  GetFormationBgColor() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(this.GetQuality())?.AbyssItemFormationBgColor ?? ""
  }
  GetPassiveSkillDesc() {
    var t, e = this.GetConfig().PassiveBuffShowDesc;
    return "" === e ? "" : (t = this.XN1(), StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e), ...t))
  }
  GetBgDesc() {
    var t, e = this.GetConfig().BgDescription;
    return "" === e ? "" : (t = this.XN1(), StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e), ...t))
  }
  XN1() {
    var t = this.GetConfig();
    return 0 < t.LevelDescStrArray.length ? t.LevelDescStrArray[0].ArrayString : []
  }
}
exports.AbyssPluginItemInfo = AbyssPluginItemInfo;
class AbyssRewardInfo {
  constructor() {
    this.xe = 0, this.Tvc = !1, this.dbe = 0, this.bvc = 0, this.Lvc = !1
  }
  GetId() {
    return this.xe
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardById(this.xe)
  }
  GetHasGetReward() {
    return this.Tvc
  }
  GetCanGetReward() {
    return this.dbe === this.bvc
  }
  GetCurrentProgress() {
    return this.dbe
  }
  GetTargetProgress() {
    return this.bvc
  }
  GetIfUnlock() {
    return this.Lvc
  }
  GetRewardType() {
    var t = this.GetConfig().RewardType;
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTypeById(t).RewardType
  }
  GetTabId() {
    var t = this.GetConfig().RewardType;
    return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssRewardTypeById(t).TabId
  }
  GetAllSameRewardTypeRewardId() {
    var t, e = [];
    for (const r of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAllAbyssReward()) r.RewardType === this.GetConfig().RewardType && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetRewardInfoById(r.Id)) && 0 === t.GetRewardTaskState() && e.push(r.Id);
    return e
  }
  GetRewardTaskState() {
    let t = 1;
    return this.Tvc ? t = 2 : this.GetCanGetReward() && (t = 0), t
  }
  GetActivityRewardData() {
    var t = this.GetRewardTaskState(),
      e = this.dbe,
      r = this.bvc,
      i = this.GetConfig();
    return {
      Id: this.GetId(),
      NameText: StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Title), r.toString()),
      NameTextArgs: ["" + e, "" + r],
      RewardState: ActivityCommonDefine_1.taskStateToRewardStateResolver[t],
      ClickFunction: () => {
        DangoAbyssActivityController_1.DangoAbyssActivityController.RequestGetAbyssRewardList(this.GetAllSameRewardTypeRewardId())
      },
      RewardList: this.I2e(this.ZNc()),
      RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.kbn(ActivityCommonDefine_1.taskStateToRewardStateResolver[t]))
    }
  }
  kbn(t) {
    let e = "";
    switch (t) {
      case 0:
        e = "PrefabTextItem_1443074454_Text";
        break;
      case 1:
        e = "CollectActivity_state_CanRecive";
        break;
      case 2:
        e = "CollectActivity_state_recived"
    }
    return e
  }
  ZNc() {
    return this.GetConfig().DropId
  }
  I2e(t) {
    var e, r, i = [];
    for ([e, r] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t)) i.push([{
      ItemId: e,
      IncId: 0
    }, r]);
    return i
  }
  Pharse(t) {
    this.xe = t.s5n, this.Tvc = t.mLs, this.dbe = t.lMs, this.bvc = t.j6n, this.Lvc = t.CM_
  }
}
exports.AbyssRewardInfo = AbyssRewardInfo;
class AbyssChallengeData {
  constructor() {
    this.hyc = 0, this.Lvc = !1, this.o6c = !1, this.Gol = 0, this.$v1 = !1, this.Cbe = 0, this.ZF1 = !1
  }
  GetChallengeId() {
    return this.hyc
  }
  GetIfUnlock() {
    return this.Lvc
  }
  GetCanChallenge() {
    return this.o6c
  }
  GetConditionFinishState() {
    return this.$v1
  }
  GetUnlockTime() {
    return this.Gol
  }
  GetConfig() {
    return AbyssInstById_1.configAbyssInstById.GetConfig(this.hyc)
  }
  GetOverUnlockTime() {
    return TimeUtil_1.TimeUtil.GetServerTime() >= this.Gol
  }
  GetLeftTimeText() {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(this.Gol - t, 1);
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? ""
  }
  GetReward() {
    var t, e, r = [],
      i = this.GetConfig().DropPreviewId;
    if (0 < i)
      for ([t, e] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(i).DropPreview) {
        var s = [{
          IncId: 0,
          ItemId: t
        }, e];
        r.push(s)
      }
    return r
  }
  GetMaxProgress() {
    return this.Cbe
  }
  GetIfPass() {
    return this.ZF1
  }
  Phrase(t) {
    this.hyc = t.e8n, this.Lvc = t.CMs, this.o6c = t.E3c, this.Gol = Number(MathUtils_1.MathUtils.LongToBigInt(t.yzs)) / 1e3, this.$v1 = t.bxs, this.Cbe = t.fM_, this.ZF1 = t.Ezs
  }
}
exports.AbyssChallengeData = AbyssChallengeData;
class DangoAbyssActivityData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.wvc = !1, this.Rvc = new Map, this.e3c = new Map, this.Avc = new Map, this.Pvc = new Map, this.n6c = new Map, this.Dvc = 0, this.cp1 = 0, this.up1 = 0, this.SNe = (t, e) => {
      var r = this.wSn(e),
        i = this.wSn(t);
      return r === i ? t.Id - e.Id : r - i
    }
  }
  PhraseEx(t) {
    this.Uvc();
    var e = t.npc;
    for (const t of e.F0c) this.Bvc(t);
    for (const t of e.Y7n) this.Hdo(t);
    this.Dvc = e.V0c, this.s6c(e.M3c), this.kvc(e.ob_), this.cp1 = Number(MathUtils_1.MathUtils.LongToBigInt(e.CPs)) / 1e3, this.up1 = Number(MathUtils_1.MathUtils.LongToBigInt(e.gPs)) / 1e3
  }
  get RedPointShowState() {
    if (!this.CheckIfInShowTime()) return !1;
    if (this.IsUnLock() && ModelManager_1.ModelManager.DangoAbyssModel.GetAbyssDangoEnterNew()) return !0;
    return super.RedPointShowState
  }
  GetExDataRedPointShowState() {
    var t = this.GetRewardTypeIfHaveCanTakeReward(2),
      e = this.GetRewardTypeIfHaveCanTakeReward(1),
      r = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoNewRedDot();
    return this.GetPreGuideQuestFinishState() && (t || e || r)
  }
  CheckInLimitTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return t >= this.cp1 && t <= this.up1
  }
  GetRemainTimeText() {
    var t = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(this.up1 - t, 1);
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? ""
  }
  EntranceRedDot() {
    return this.GetExDataRedPointShowState()
  }
  s6c(t) {
    for (const r of t) {
      const t = this.n6c.get(r.e8n);
      var e;
      t ? t.Phrase(r) : ((e = new AbyssChallengeData).Phrase(r), this.n6c.set(e.GetChallengeId(), e))
    }
  }
  kvc(t) {
    for (const e of t) {
      let t = this.Rvc.get(e.s5n);
      t ? t.Pharse(e) : ((t = new AbyssRewardInfo).Pharse(e), this.Rvc.set(e.s5n, t)), this.t3c(t)
    }
  }
  GetRewardInfoById(t) {
    return this.Rvc.get(t)
  }
  OnRoleInfoUpdate(t) {
    for (const e of t.Y7n) this.Hdo(e)
  }
  OnAddRoleInfo(t) {
    for (const e of t.Y7n) this.Hdo(e, !0)
  }
  OnPluginInfoUpdate(t) {
    for (const e of t.F0c) this.Bvc(e)
  }
  OnPluginAdd(t) {
    for (const e of t.F0c) this.Bvc(e)
  }
  OnPluginEquip(t) {
    this.Hdo(t)
  }
  OnPluginRemove(t) {
    for (const e of t.izl) this.Pvc.delete(e)
  }
  OnUpdateRewardIdList(t) {
    for (const e of t.W0c) {
      let t = this.Rvc.get(e.s5n);
      t ? t.Pharse(e) : ((t = new AbyssRewardInfo).Pharse(e), this.Rvc.set(e.s5n, t)), this.t3c(t)
    }
  }
  GetRewardFinishProgressText() {
    let t = 0,
      e = 0;
    for (const r of this.GetRewardTypeTabList(2))
      for (const i of this.GetRewardInfoByRewardTypeAndTab(2, r)) e++, (i.GetHasGetReward() || i.GetCanGetReward()) && t++;
    return StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString())
  }
  GetRewardTypeIfHaveCanTakeReward(t) {
    if (1 !== t || this.CheckInLimitTime())
      for (const e of this.GetRewardTypeTabList(t))
        for (const r of this.GetRewardInfoByRewardTypeAndTab(t, e))
          if (!r.GetHasGetReward() && r.GetCanGetReward()) return !0;
    return !1
  }
  GetRewardTypeTabList(t) {
    var e = new Array,
      t = this.e3c.get(t);
    if (t)
      for (var [r] of t) e.push(r);
    return e
  }
  GetRewardInfoByRewardTypeAndTab(t, e) {
    t = this.e3c.get(t);
    return t && t.get(e) || []
  }
  GetTaskActivityRewardDataList(t, e) {
    var r = [];
    for (const s of this.GetRewardInfoByRewardTypeAndTab(t, e)) {
      var i = s.GetActivityRewardData();
      r.push(i)
    }
    return r.sort(this.SNe)
  }
  wSn(t) {
    let e = 0;
    switch (t.RewardState) {
      case 0:
        e = 2;
        break;
      case 1:
        e = 3;
        break;
      case 2:
        e = 1;
        break;
      default:
        e = 4
    }
    return e
  }
  t3c(e) {
    let t = this.e3c.get(e.GetRewardType());
    t || (t = new Map, this.e3c.set(e.GetRewardType(), t));
    var r = e.GetTabId();
    let i = t.get(r),
      s = (i || (i = new Array, t.set(r, i)), !1);
    for (let t = 0; t < i.length; t++)
      if (i[t].GetId() === e.GetId()) {
        i[t] = e, s = !0;
        break
      } s || i.push(e)
  }
  OnUpdateUnlockChallengeIdList(t) {
    this.s6c(t.M3c)
  }
  GetUnLockChallengeIdList() {
    var t, e = new Array;
    for ([, t] of this.n6c) t.GetIfUnlock() && e.push(t.GetChallengeId());
    return e
  }
  GetCanChallengeIdList() {
    var t, e = new Array;
    for ([, t] of this.n6c) t.GetCanChallenge() && e.push(t.GetChallengeId());
    return e
  }
  GetLikeCount() {
    return this.Dvc
  }
  Uvc() {
    if (!this.wvc) {
      this.wvc = !0;
      for (const r of ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssActivityData(this.Id).DangoList) {
        var t = new AbyssDangoRoleData,
          e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(r);
        t.Init(e), this.Avc.set(e.Id, t)
      }
    }
  }
  Hdo(t, e) {
    this.lNc(t);
    let r = this.Avc.get(t.s5n);
    r || (r = new AbyssDangoRoleData, this.Avc.set(t.s5n, r)), e && (ModelManager_1.ModelManager.DangoAbyssModel.SetDangoIfNew(t.s5n, !0), ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(t.s5n, !0));
    var i = [];
    for (const n of t.j0c) {
      var s = this.Pvc.get(n);
      !s && 0 < n && Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 75, "团子中含有未初始化的插件", ["dangoId", t.s5n]), i.push(s?.GetConfigId() ?? 0)
    }
    r.Phrase(t, i)
  }
  lNc(e) {
    var t = this.Avc.get(e.s5n),
      r = e.j0c,
      i = t.GetEquipItems(),
      s = r.length;
    for (let t = 0; t < s; t++) {
      var n = i[t],
        a = r[t];
      n !== a && (0 < a && this.Pvc.get(a).SetRoleId(e.s5n), 0 < n && !r.includes(n)) && this.Pvc.get(n).SetRoleId(0)
    }
  }
  GetRoleDataById(t) {
    return this.Avc.get(t)
  }
  GetAllDangoList() {
    return Array.from(this.Avc.values())
  }
  GetAbyssWorldProgressText() {
    let t = 0;
    for (var [, e] of this.Avc) e.GetIfLock() || t++;
    return StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), this.Avc.size.toString())
  }
  GetAbyssWorldProgressPercentage() {
    let t = 0;
    for (var [, e] of this.Avc) e.GetIfLock() || t++;
    return t / this.Avc.size
  }
  GetAbyssProgressText() {
    var t = this.GetCanChallengeIdList().length,
      e = this.n6c.size;
    return StringUtils_1.StringUtils.Format("{0}/{1}", t.toString(), e.toString())
  }
  GetPreChallengeFinishState(e) {
    var r = Array.from(this.n6c.values()),
      i = r.length;
    for (let t = 0; t < i; t++)
      if (r[t].GetChallengeId() === e) return 0 === t || r[t - 1].GetIfPass();
    return !1
  }
  GetCurrentLastFinishChallengeId() {
    let e = 0;
    var r = Array.from(this.n6c.values()),
      i = r.length;
    for (let t = 0; t < i; t++) 0 === t ? e = r[t].GetChallengeId() : r[t - 1].GetIfPass() && (e = r[t].GetChallengeId());
    return e = 0 === e ? this.GetFirstUnlockChallengeId() : e
  }
  GetCurrentCanSelectChallengeId() {
    let e = 0;
    var r, i, s = Array.from(this.n6c.values()),
      n = s.length;
    for (let t = 0; t < n; t++) 0 === t ? e = s[t].GetChallengeId() : (r = s[t - 1], i = s[t], r.GetIfPass() && this.sou(i) && (e = s[t].GetChallengeId()));
    return e = 0 === e ? this.GetFirstUnlockChallengeId() : e
  }
  sou(t) {
    var e = t.GetCanChallenge(),
      r = this.GetPreChallengeFinishState(t.GetChallengeId()),
      i = t.GetConditionFinishState(),
      t = t.GetOverUnlockTime();
    return e && r && i && t
  }
  GetFirstUnlockChallengeId() {
    for (var [, t] of this.n6c)
      if (t.GetIfUnlock()) return t.GetChallengeId();
    return 0
  }
  Bvc(t) {
    var e;
    this.Pvc.get(t.b9n) || (e = new AbyssPluginItemInfo(t), this.Pvc.set(t.b9n, e))
  }
  GetPluginItemInfoById(t) {
    return this.Pvc.get(t)
  }
  GetPluginItemInfoAll() {
    return Array.from(this.Pvc.values())
  }
  GetAbyssChallengeDataList() {
    return Array.from(this.n6c.values())
  }
  GetAbyssChallengeRankList() {
    var t = Array.from(this.n6c.values()),
      e = new Array;
    for (const i of t) {
      var r = i.GetChallengeId();
      ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoAbyssInstById(r)?.RankOpen && e.push(i)
    }
    return e
  }
  GetAbyssChallengeDataById(t) {
    return this.n6c.get(t)
  }
  GetActivityTipNeedShowState() {
    return !(!this.CheckIfInOpenTime() || !this.CheckIfInShowTime()) && 0 === ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, OPENTIPKEY, 0, 0)
  }
  CacheActivityTipShowState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(this.Id, OPENTIPKEY, 0, 0, 1)
  }
}
exports.DangoAbyssActivityData = DangoAbyssActivityData;
//# sourceMappingURL=DangoAbyssActivityData.js.map