"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceItem = exports.InstanceSeriesItem = exports.InstanceDetectItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const ActivityMowingController_1 = require("../Activity/ActivityContent/Mowing/ActivityMowingController");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const LguiUtil_1 = require("../Util/LguiUtil");
const InstanceDungeonMapDefine_1 = require("./Define/InstanceDungeonMapDefine");
class InstanceDetectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.qai = undefined;
    this.Gai = undefined;
    this.Nai = undefined;
    this.Oai = undefined;
    this.kai = undefined;
    this.Fai = undefined;
    this.Vai = undefined;
    this.Rja = undefined;
    this.Uja = undefined;
    this.KD_ = undefined;
    this.N3_ = undefined;
    this.c_l = undefined;
    this.R$l = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async WZt() {
    this.qai = new InstanceSeriesItem();
    this.qai.OpenParam = this.R$l;
    this.Gai = new InstanceItem();
    this.Gai.OpenParam = this.R$l;
    this.Nai = new InstanceSeriesItem();
    this.Nai.OpenParam = this.R$l;
    this.Oai = new InstanceItem();
    this.Oai.OpenParam = this.R$l;
    this.AddChild(this.Gai);
    this.AddChild(this.qai);
    this.AddChild(this.Nai);
    this.AddChild(this.Oai);
    await Promise.all([this.qai.CreateByActorAsync(this.GetItem(0).GetOwner()), this.Gai.CreateByActorAsync(this.GetItem(1).GetOwner()).finally(), this.Nai.CreateByActorAsync(this.GetItem(2).GetOwner()), this.Oai.CreateByActorAsync(this.GetItem(3).GetOwner()).finally()]);
  }
  GetUsingItem(t) {
    var i = !ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(t.InstanceGirdId);
    if (t.InstanceSeriesTitle) {
      const e = i ? this.GetItem(0) : this.GetItem(2);
      return e.GetOwner();
    }
    const e = i ? this.GetItem(1) : this.GetItem(3);
    return e.GetOwner();
  }
  Update(t, i) {
    this.Data = t;
    this.XD_(t.InstanceGirdId);
    var e = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(t.InstanceGirdId);
    let s = this.qai;
    let h = this.Gai;
    this.qai.SetUiActive(!e);
    this.Gai.SetUiActive(!e);
    this.Nai.SetUiActive(e);
    this.Oai.SetUiActive(e);
    if (e) {
      h = this.Oai;
      s = this.Nai;
    }
    if (t.InstanceSeriesTitle) {
      h.SetUiActive(false);
      s.SetUiActive(true);
      s.CurrentData = t;
      s.BindCanShowRedDot(this.c_l);
      if (s) {
        this.YD_(s, t.InstanceGirdId);
      }
      if (this.N3_) {
        s.IconRightPath = this.N3_(t.InstanceGirdId);
      }
      if (t.IsOnlyOneGrid) {
        s.BindClickCallbackOnlyOneGrid(this.Fai);
        s.Update(t.InstanceGirdId, t.IsSelect, true);
      } else {
        s.BindClickCallback(this.kai);
        s.Update(t.InstanceSeriesTitle, t.IsSelect);
      }
    } else {
      s.SetUiActive(false);
      h.SetUiActive(true);
      h.BindClickCallback(this.Fai);
      h.BindCanExecuteChange(this.Vai);
      h.Update(t.InstanceGirdId, t.IsSelect, t.IsShow);
    }
  }
  UpdateSelf() {
    var t = this.Data;
    var i = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(t.InstanceGirdId);
    this.qai?.SetUiActive(!i);
    this.Nai?.SetUiActive(i);
    let e = this.qai;
    if (i) {
      e = this.Nai;
    }
    i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t.InstanceGirdId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e?.GetTitleText(), i.MapName);
    if (e) {
      this.YD_(e, t.InstanceGirdId);
    }
    e.RefreshSubtitleByIdAndArgs();
  }
  XD_(t) {
    let i = undefined;
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    if (t) {
      t = t.InstSubType;
      i = InstanceDungeonMapDefine_1.instanceDetectItemGetterDataMap[t];
    }
    this.BindSubtitleTextIdGetter(i?.SubtitleTextIdGetter);
    this.BindSubtitleArgsGetter(i?.SubtitleArgsGetter);
    this.BindInstanceCheckFinishedGetter(i?.CheckFinishedGetter);
  }
  YD_(t, i) {
    t.SubtitleTextId = this.Rja?.(i);
    t.SubtitleTextArgs = this.Uja?.(i);
    t.RefreshSubtitleByIdAndArgs();
    t.HasOverrideFinishState = this.KD_ !== undefined;
    if (this.KD_) {
      t.OverrideFinishState = this.KD_(i);
    }
  }
  UpdateSelfByText(t) {
    var i = this.Data;
    var i = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(i.InstanceGirdId);
    this.qai?.SetUiActive(!i);
    this.Nai?.SetUiActive(i);
    if (i) {
      this.Nai?.UpdateSubtitleByText(t);
    }
  }
  GetActiveNameText() {
    return (this.qai.IsUiActiveInHierarchy() ? this.qai : this.Gai.IsUiActiveInHierarchy() ? this.Gai : this.Nai.IsUiActiveInHierarchy() ? this.Nai : this.Oai).GetTitleText();
  }
  BindClickSeriesCallback(t) {
    this.kai = t;
  }
  BindClickInstanceCallback(t) {
    this.Fai = t;
  }
  BindCanExecuteChange(t) {
    this.Vai = t;
  }
  BindSubtitleTextIdGetter(t) {
    this.Rja = t;
  }
  BindSubtitleArgsGetter(t) {
    this.Uja = t;
  }
  BindInstanceCheckFinishedGetter(t) {
    this.KD_ = t;
  }
  BindCanShowRedDot(t) {
    this.c_l = t;
  }
  BindIconRightPathGetter(t) {
    this.N3_ = t;
  }
  ClearItem() {
    this.Destroy();
  }
  GetExtendToggleForGuide() {
    if (this.Gai.GetActive()) {
      return this.Gai.ExtendToggle;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Guide", 16, "聚焦引导索引到了副本标题, 检查extraParam字段是否配置错误");
    }
  }
  get InstanceId() {
    return this.Data.InstanceGirdId;
  }
}
exports.InstanceDetectItem = InstanceDetectItem;
class InstanceSeriesItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.$Ve = undefined;
    this.Zqe = undefined;
    this.Hai = undefined;
    this.c_l = undefined;
    this.TDe = undefined;
    this.jai = 0;
    this.Wai = false;
    this.Kai = false;
    this.Qai = undefined;
    this.Xai = false;
    this.CurrentData = undefined;
    this.SubtitleTextId = undefined;
    this.SubtitleTextArgs = undefined;
    this.HasOverrideFinishState = false;
    this.OverrideFinishState = false;
    this.IconRightPath = undefined;
    this.R$l = undefined;
    this.$ai = () => {
      var t = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (t && (t = t.GetActivityLevelCountdownText(this.jai), this.GetText(8).SetText(t), StringUtils_1.StringUtils.IsEmpty(t))) {
        this.Xai = false;
        this.Update(this.jai, this.Wai, this.Kai);
      }
    };
    this.m_l = t => {
      var i = this.R$l.InstanceByTitleMap.get(this.jai);
      if (i && i.includes(t)) {
        this.BNe();
      }
    };
    this.OnClickExtendToggle = t => {
      if (t === 1 && (this.Wai = true, this.Zqe && this.Zqe(this.jai, this.$Ve, this.Wai), this.Hai)) {
        this.Hai(this.jai, this.$Ve, this.CurrentData);
      }
    };
    this.Yai = t => {
      t = t === 1;
      this.Wai = t;
      this.GetItem(5)?.SetUIActive(t);
    };
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [5, UE.UIItem], [7, UE.UIItem], [6, UE.UIItem], [4, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UITexture]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.m_l);
    this.$Ve = this.GetExtendToggle(0);
    this.$Ve.SetToggleState(0);
    this.$Ve.OnStateChange.Add(this.Yai);
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.q7e();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.m_l);
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  q7e() {
    if (this.Xai) {
      this.Qai?.();
    }
  }
  GetTitleText() {
    return this.GetText(3);
  }
  GBl(t) {
    let i = undefined;
    let e = undefined;
    for (var [s, h] of t) {
      i = s;
      e = h;
    }
    if (i === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
    } else if (i === 2) {
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(this.jai, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "RecommendLevel", t);
    } else if (i === 3 && this.SubtitleTextId) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), this.SubtitleTextId, this.SubtitleTextArgs);
    }
  }
  xnc() {
    var t;
    var i;
    (TowerDefenceController_1.TowerDefenseController.CheckIsInstanceUnlock(this.jai) ? (t = TowerDefenceController_1.TowerDefenseController.CheckInstancePassedByInstanceId(this.jai), TowerDefenceController_1.TowerDefenseController.CheckIsChallengeInstanceByInstanceId(this.jai) ? (i = TowerDefenceController_1.TowerDefenseController.GetPassTimeContentByInstanceId(this.jai), t ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "TowerDefenceBestTime", i) : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Text_NotFinished_Text")) : (i = TowerDefenceController_1.TowerDefenseController.GetRecordByInstanceId(this.jai), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "TowerDefence_GPint", i)), this.GetItem(6).SetUIActive(t), this.GetItem(7)) : ((i = TowerDefenceController_1.TowerDefenseController.BuildInstanceCountDownText(this.jai)) && this.GetText(8)?.SetText(i), this.GetItem(7).SetUIActive(true), this.GetItem(6))).SetUIActive(false);
  }
  Unc(t) {
    var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.jai);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.MapName);
    if (t && this.Hai) {
      this.Hai(this.jai, this.$Ve, this.CurrentData);
    }
    var t = i.DifficultyIcon;
    this.GetSprite(2)?.SetUIActive(true);
    this.GetItem(1)?.SetUIActive(true);
    this.SetTextureByPath(t, this.GetTexture(2));
    this.GetText(8)?.SetUIActive(true);
    var t = i.SubTitle;
    if (t?.size > 0) {
      this.GBl(t);
    } else {
      if (TowerDefenceController_1.TowerDefenseController.CheckInUiFlow()) {
        this.xnc();
        return false;
      }
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), i?.SubInstanceTitle);
    }
    return true;
  }
  Dnc() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(this.jai);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.CommonText);
    this.GetText(8)?.SetUIActive(false);
    var t = t.IconTexture;
    if (t) {
      this.GetSprite(2)?.SetUIActive(true);
      this.GetItem(1)?.SetUIActive(true);
      this.SetTextureByPath(t, this.GetTexture(2));
    }
  }
  Update(t, i, e = false) {
    this.jai = t;
    this.Wai = i;
    this.Kai = e;
    this.$Ve.SetToggleStateForce(i ? 1 : 0);
    this.GetItem(5)?.SetUIActive(i);
    this.GetSprite(2)?.SetUIActive(false);
    this.TrySetTextureByPath(this.IconRightPath, this.GetTexture(10));
    this.GetItem(1)?.SetUIActive(false);
    this.BNe();
    if (e) {
      if (!this.Unc(i)) {
        return;
      }
    } else {
      this.Dnc();
    }
    this.Xai = this.Jai(this.jai);
    if (this.Xai) {
      this.Qai?.();
    }
    this.zai(e);
    this.zD_();
  }
  UpdateSubtitleByText(t) {
    this.GetText(8)?.SetText(t);
  }
  RefreshSubtitleByIdAndArgs() {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), this.SubtitleTextId, this.SubtitleTextArgs);
  }
  Jai(t) {
    if (ActivityMowingController_1.ActivityMowingController.IsMowingInstanceDungeon(t)) {
      var i = ActivityMowingController_1.ActivityMowingController.GetMowingActivityData();
      if (!i) {
        return false;
      }
      this.Qai = this.$ai;
      var e = i.GetActivityLevelUnlockState(t);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "ActivityMowing_Point", i.GetLevelMaxPoint(t));
      }
      return !e;
    }
    return false;
  }
  zD_() {
    if (this.HasOverrideFinishState) {
      this.GetItem(6).SetUIActive(this.OverrideFinishState);
    }
  }
  BindClickCallback(t) {
    this.Zqe = t;
  }
  BindClickCallbackOnlyOneGrid(t) {
    this.Hai = t;
  }
  BindCanShowRedDot(t) {
    this.c_l = t;
  }
  zai(t) {
    var i = ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(this.jai);
    this.GetItem(4).SetUIActive(!t);
    if (t) {
      if (i) {
        this.GetItem(7).SetUIActive(true);
        this.GetItem(6).SetUIActive(false);
      } else if (ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(this.jai)) {
        this.GetItem(7).SetUIActive(false);
        this.GetItem(6).SetUIActive(true);
      } else {
        this.GetItem(7).SetUIActive(false);
        this.GetItem(6).SetUIActive(false);
      }
    }
  }
  BNe() {
    if (this.c_l && this.c_l(this.jai)) {
      this.GetItem(9)?.SetUIActive(true);
    } else {
      this.GetItem(9)?.SetUIActive(false);
    }
  }
}
exports.InstanceSeriesItem = InstanceSeriesItem;
class InstanceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.ExtendToggle = undefined;
    this.Zqe = undefined;
    this.Vai = undefined;
    this.NUe = 0;
    this.R$l = undefined;
    this.m_l = t => {
      if (this.NUe === t) {
        this.GOl();
      }
    };
    this.Lke = () => !this.Vai || this.Vai(this.NUe);
    this.OnClickExtendToggle = t => {
      if (t === 1 && this.Zqe) {
        this.Zqe(this.NUe, this.ExtendToggle, undefined);
      }
    };
  }
  OnRegisterComponent() {
    this.R$l = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [2, UE.UIText], [1, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggleTextureTransition], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickExtendToggle]];
  }
  OnStart() {
    this.ExtendToggle = this.GetExtendToggle(0);
    this.ExtendToggle.SetToggleState(0);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.m_l);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChallengeInstanceRedDot, this.m_l);
  }
  GetTitleText() {
    return this.GetText(2);
  }
  Update(t, i, e) {
    this.NUe = t;
    this.ExtendToggle.SetToggleStateForce(i ? 1 : 0);
    this.ExtendToggle.CanExecuteChange.Unbind();
    this.ExtendToggle.CanExecuteChange.Bind(this.Lke);
    if (i && this.Zqe) {
      this.Zqe(this.NUe, this.ExtendToggle, undefined);
    }
    if (e) {
      this.zai();
      this.Zai();
      this.ehi();
      this.Bnc();
      this.GOl();
    }
  }
  zai() {
    if (ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.GetInstanceItemLockStateGetter(this.NUe)) {
      this.GetItem(3).SetUIActive(true);
      this.GetItem(4).SetUIActive(false);
    } else if (this.R$l.IsFinishInstance(this.NUe)) {
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(true);
    } else {
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(false);
    }
  }
  Zai() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(this.NUe, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    var e = e.SubTitle;
    if (e?.size > 0) {
      let t = undefined;
      let i = undefined;
      for (var [h, r] of e) {
        t = h;
        i = r;
      }
      if (t === 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i);
      } else if (t === 2) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RecommendLevel", s);
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "InstanceDungeonRecommendLevel", s);
    }
  }
  ehi() {
    var t = this.R$l.GetInstanceDetectItemIcon(this.NUe);
    if (StringUtils_1.StringUtils.IsBlank(t)) {
      this.GetItem(6)?.SetUIActive(false);
    } else {
      this.GetItem(6)?.SetUIActive(true);
      this.SetTextureByPath(t, this.GetTexture(1));
    }
  }
  Bnc() {
    var t = this.R$l?.GetInstanceItemTextureBg(this.NUe) ?? "";
    if (!StringUtils_1.StringUtils.IsBlank(t)) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
      this.SetExtendToggleTextureTransitionByPath(t, this.GetUiExtendToggleTextureTransition(5), 0);
    }
  }
  GOl() {
    var t = this.R$l?.CheckInstanceItemHasRedDot(this.NUe) ?? false;
    this.GetItem(7)?.SetUIActive(t);
  }
  BindClickCallback(t) {
    this.Zqe = t;
  }
  BindCanExecuteChange(t) {
    this.Vai = t;
  }
}
exports.InstanceItem = InstanceItem;
//# sourceMappingURL=InstanceDetectItem.js.map