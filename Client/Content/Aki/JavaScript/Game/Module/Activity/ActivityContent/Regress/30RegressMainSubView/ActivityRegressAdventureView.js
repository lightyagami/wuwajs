"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressAdventureView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const AdventureDefine_1 = require("../../../../AdventureGuide/AdventureDefine");
const NewSoundDetectRewardItem_1 = require("../../../../AdventureGuide/Views/NewSoundDetectRewardItem");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ConditionGroupData_1 = require("../../../ConditionGroupData");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
class ActivityRegressAdventureView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.zo_ = 0;
    this.ebl = undefined;
    this.tFe = undefined;
    this.Gjf = undefined;
    this.Fjf = undefined;
    this.RFg = () => {
      const t = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpRole();
      var e = t.length > 0;
      this.GetItem(5).SetUIActive(e);
      this.GetItem(6).SetUIActive(!e);
      if (e) {
        this.tFe?.RefreshByData(t, () => {
          var e = this.zo_ ? t.indexOf(this.zo_) : 0;
          this.tFe?.GetLayoutItemByIndex(e >= 0 ? e : 0)?.SelectToggle();
        });
      } else {
        this.zo_ = 0;
        this.ebl = undefined;
        this.Gjf?.RefreshByData([], undefined, true);
        this.Fjf?.RefreshByData([], undefined, true);
      }
    };
    this.nFe = () => {
      var e = new ActivityRegressAdventureRoleItem();
      e.OnClickToggleCallBack = this.Njf;
      return e;
    };
    this.Vjf = () => {
      var e = new ActivityRegressAdventureAdventureItem();
      e.OnClickJumpToCallBack = this.RFg;
      return e;
    };
    this.Njf = (e, t) => {
      this.RFg();
      if (this.zo_ !== e) {
        this.zo_ = e;
        this.ebl?.SetToggleState(0);
        this.ebl = t;
        var i = [];
        var r = [];
        for (const n of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopInsByRoleId(e) ?? []) {
          if (n.Type === 1) {
            i.push(n.Id);
          }
          if (n.Type === 2) {
            r.push(n.Id);
          }
        }
        this.Gjf?.RefreshByData(i, undefined, true);
        this.Fjf?.RefreshByData(r, undefined, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e;
    var t;
    var i = [];
    var [, r] = ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(63);
    r.push(...ModelManager_1.ModelManager.AdventureGuideModel.GetCanShowDungeonRecordsByType(64)[1]);
    for (const n of r) {
      if (n.SilentAreaDetectionRecord && (e = n.SilentAreaDetectionRecord.Conf.MapId, t = n.SilentAreaDetectionRecord.Conf.LevelPlayList[0], ModelManager_1.ModelManager.AdventureGuideModel.IsNightMareHaveConfig(e, t))) {
        i.push(ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestLevelPlayVarAsync(e, t));
      }
    }
    i.push(ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.NewTrialRoleGetNightmarePhantomInstInfoRequest());
    await Promise.all(i);
  }
  OnStart() {
    super.OnStart();
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.nFe);
    this.Gjf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Vjf, this.GetItem(3).GetOwner());
    this.Fjf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.Vjf, this.GetItem(3).GetOwner());
    this.RFg();
  }
}
exports.ActivityRegressAdventureView = ActivityRegressAdventureView;
class ActivityRegressAdventureRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.OnClickToggleCallBack = undefined;
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.dFe, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (r) {
      this.dFe = e;
      this.SetTextureShowUntilLoaded(r.RoleHeadIcon, this.GetTexture(1));
    }
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
}
class ActivityRegressAdventureAdventureItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Hjf = 0;
    this.H3e = undefined;
    this.jjf = undefined;
    this.OnClickJumpToCallBack = undefined;
    this.jWt = () => {
      return new NewSoundDetectRewardItem_1.NewSoundDetectRewardItem();
    };
    this.ru_ = () => {
      var e = this.Pe?.Conf?.Secondary;
      var e = e !== undefined ? ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(e)?.ConditionGroupId ?? 0 : 0;
      if (this.Pe && !(e <= 0)) {
        var t = [];
        for (const n of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(e)) {
          var i = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(n);
          let e = -1;
          if (i?.AccessId) {
            r = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(i.AccessId);
            e = r.SkipName;
          }
          var r = {
            ConditionId: n,
            ConditionTextId: i.Description,
            IsFinished: false,
            AccessId: i.AccessId ?? 0,
            AccessType: e
          };
          t.push(r);
        }
        e = new ConditionGroupData_1.ConditionGroupData(e, t);
        UiManager_1.UiManager.OpenView("CommonConditionView", e);
      }
    };
    this.Ykt = () => {
      var e;
      var t;
      this.OnClickJumpToCallBack?.();
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
      } else {
        e = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(this.Pe);
        t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
        if (this.Pe.Conf.Secondary === 22 && e && t) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_2000015_Text");
        } else if (this.Pe instanceof AdventureDefine_1.DungeonDetectionRecord) {
          this.iql();
        } else {
          this.rql();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.Ykt], [8, this.ru_]];
  }
  async OnBeforeStartAsync() {
    this.jjf = new AdventureTag();
    await this.jjf.CreateByActorAsync(this.GetItem(6).GetOwner());
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.jWt);
  }
  Refresh(e, t, i) {
    var r;
    var n;
    var o;
    var s;
    var a = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopIns(e);
    if (a) {
      this.Hjf = e;
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetRecordById(a.AdventureGuide);
      this.Pe = e;
      if (this.Pe.Conf.Secondary === 22) {
        r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(a.DungeonDetection)?.MapName ?? "";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Conf.Name);
      }
      r = this.GetTexture(0);
      s = this.GetText(2);
      n = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(this.Pe);
      o = (o = this.Pe?.Conf?.Secondary) !== undefined && (ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(o) ?? false);
      this.SetButtonUiActive(5, o);
      this.GetItem(7).SetUIActive(!o);
      if (e instanceof AdventureDefine_1.SilentAreaDetectionRecord && (e.Conf.Secondary === 63 || e.Conf.Secondary === 64)) {
        if ((o = n ? ModelManager_1.ModelManager.AdventureGuideModel.GetNightMarePreOpenTarget(a.DungeonDetection) : ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(e.Conf?.MapId, e.Conf?.LevelPlayList?.[0]))[1] < 0) {
          s?.SetUIActive(false);
        } else {
          s?.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(s, "NightMareLeftTimes", o[0], o[1]);
        }
      } else {
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Conf.InstanceSubTypeDescription) ?? "";
        if (StringUtils_1.StringUtils.IsEmpty(a)) {
          s?.SetUIActive(false);
        } else {
          s?.SetUIActive(true);
          s?.SetText(a);
        }
      }
      this.SetTextureShowUntilLoaded(e.Conf.BigIcon, r);
      if (this.Pe.Conf.Secondary === 22) {
        o = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.Pe.Conf.Id);
        s = ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(o.Conf.MarkId);
        this.GetItem(6).SetUIActive(!s);
        this.jjf?.RefreshItem(true);
      } else {
        this.GetItem(6).SetUIActive(n);
        this.jjf?.RefreshItem(false);
      }
      this.Z3e(e);
    }
  }
  Z3e(e) {
    var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var i = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(e);
    let r = undefined;
    if (e.Conf.Secondary === 22) {
      var n = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopIns(this.Hjf);
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(n.DungeonDetection);
      var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(n);
      const a = new Array();
      for (const h of n) {
        var o = {
          ItemData: h,
          HaveFinish: i
        };
        a.push(o);
      }
      this.H3e.RefreshByData(a);
    } else if (r = e.Conf.Secondary === 63 || e.Conf.Secondary === 64 ? ConfigManager_1.ConfigManager.AdventureModuleConfig.GetNightMareShowReward(e.Conf.ShowRewardMapCalabash) : ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(e.Conf.ShowRewardMap, t)) {
      const a = new Array();
      for (const l of r.keys()) {
        var s = [{
          IncId: 0,
          ItemId: l
        }, r.get(l)];
        a.push({
          ItemData: s,
          HaveFinish: i
        });
      }
      this.H3e.RefreshByData(a);
    }
  }
  iql() {
    var e;
    var t;
    var i;
    if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(this.Pe)) {
      this.oql();
    } else {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(this.Pe.Conf.Id);
      t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e.Conf.DungeonId);
      i = ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(t.MarkId);
      if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(t.MarkId) && i) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(e.Conf.Secondary !== 2 ? Protocol_1.Aki.Protocol.r8n.sxu : Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, [e.Conf.DungeonId], this.Pe.Conf.Id);
      } else {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.HandleRegressDetection(this.Hjf);
      }
    }
  }
  rql() {
    var e;
    if (ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(this.Pe)) {
      this.oql();
    } else {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.Pe.Conf.Id);
      if (ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(e.Conf.MarkId) || this.Pe.Conf.Secondary !== 22) {
        if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(e.Conf.MarkId)) {
          ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, e.Conf.LevelPlayList, this.Pe.Conf.Id);
        }
      } else {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.HandleRegressDetection(this.Hjf);
      }
    }
  }
  oql() {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode");
    } else {
      let e = false;
      var t = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(this.Pe.Conf.Id, this.Pe instanceof AdventureDefine_1.DungeonDetectionRecord ? 0 : 1, this.Pe.Conf.PreOpenId);
      if (e = t ? t.Spoiler : e) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(238)).FunctionMap.set(2, () => {
          this.nql();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.nql();
      }
    }
  }
  nql() {
    ControllerHolder_1.ControllerHolder.AdventureGuideController.HandlePreOpenDetection(this.Pe.Conf.Id, this.Pe instanceof AdventureDefine_1.DungeonDetectionRecord ? 0 : 1, this.Pe.Conf.PreOpenId);
  }
}
class AdventureTag extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  RefreshItem(e) {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e ? "SP_TagFrameBgOrange" : "SP_TagFrameBgYellow");
    this.SetSpriteByPath(t, this.GetSprite(0), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e ? "Regress_Adventure_Tag_Activity" : "Regress_Adventure_Tag_PreOpen");
  }
}
//# sourceMappingURL=ActivityRegressAdventureView.js.map