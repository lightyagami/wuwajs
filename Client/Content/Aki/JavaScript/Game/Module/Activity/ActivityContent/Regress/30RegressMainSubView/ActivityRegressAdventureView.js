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
const AdventureDefine_1 = require("../../../../AdventureGuide/AdventureDefine");
const NewSoundDetectRewardItem_1 = require("../../../../AdventureGuide/Views/NewSoundDetectRewardItem");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
class ActivityRegressAdventureView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.zo_ = 0;
    this.ebl = undefined;
    this.tFe = undefined;
    this.R3f = undefined;
    this.L3f = undefined;
    this.nFe = () => {
      var e = new ActivityRegressAdventureRoleItem();
      e.OnClickToggleCallBack = this.w3f;
      return e;
    };
    this.P3f = () => {
      return new ActivityRegressAdventureAdventureItem();
    };
    this.w3f = (e, t) => {
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
        this.R3f?.RefreshByData(i, undefined, true);
        this.L3f?.RefreshByData(r, undefined, true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIVerticalLayout]];
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
    await Promise.all(i);
  }
  OnStart() {
    super.OnStart();
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.nFe);
    this.R3f = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.P3f, this.GetItem(3).GetOwner());
    this.L3f = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.P3f, this.GetItem(3).GetOwner());
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpRole();
    this.tFe.RefreshByData(e, () => {
      this.tFe?.GetLayoutItemByIndex(0)?.SelectToggle();
    });
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
    this.A3f = 0;
    this.H3e = undefined;
    this.D3f = undefined;
    this.jWt = () => {
      return new NewSoundDetectRewardItem_1.NewSoundDetectRewardItem();
    };
    this.Ykt = () => {
      var e;
      var t;
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
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.Ykt]];
  }
  async OnBeforeStartAsync() {
    this.D3f = new AdventureTag();
    await this.D3f.CreateByActorAsync(this.GetItem(6).GetOwner());
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.jWt);
  }
  Refresh(e, t, i) {
    var r;
    var n;
    var s = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopIns(e);
    if (s) {
      this.A3f = e;
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetRecordById(s.AdventureGuide);
      this.Pe = e;
      if (this.Pe.Conf.Secondary === 22) {
        s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(s.DungeonDetection)?.MapName ?? "";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Conf.Name);
      }
      s = this.GetTexture(0);
      r = this.GetText(2);
      if (e instanceof AdventureDefine_1.SilentAreaDetectionRecord && (e.Conf.Secondary === 63 || e.Conf.Secondary === 64)) {
        if ((n = ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(e.Conf?.MapId, e.Conf?.LevelPlayList?.[0]))[1] < 0) {
          r?.SetUIActive(false);
        } else {
          r?.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(r, "NightMareLeftTimes", n[0], n[1]);
        }
      } else {
        n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Conf.InstanceSubTypeDescription) ?? "";
        if (StringUtils_1.StringUtils.IsEmpty(n)) {
          r?.SetUIActive(false);
        } else {
          r?.SetUIActive(true);
          r?.SetText(n);
        }
      }
      this.SetTextureShowUntilLoaded(e.Conf.BigIcon, s);
      if (this.Pe.Conf.Secondary === 22) {
        r = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.Pe.Conf.Id);
        n = ModelManager_1.ModelManager.MapModel.MapMarkIsCanTeleport(r.Conf.MarkId);
        this.GetItem(6).SetUIActive(!n);
        this.D3f?.RefreshItem(true);
      } else {
        s = ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByRecord(this.Pe);
        this.GetItem(6).SetUIActive(s);
        this.D3f?.RefreshItem(false);
      }
      this.Z3e(e);
    }
  }
  Z3e(e) {
    var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    var i = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(e);
    let r = undefined;
    if (e.Conf.Secondary === 22) {
      var n = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetGachaRoleDevelopIns(this.A3f);
      var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(n.DungeonDetection);
      var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(n);
      const a = new Array();
      for (const l of n) {
        var s = {
          ItemData: l,
          HaveFinish: i
        };
        a.push(s);
      }
      this.H3e.RefreshByData(a);
    } else if (r = e.Conf.Secondary === 63 || e.Conf.Secondary === 64 ? ConfigManager_1.ConfigManager.AdventureModuleConfig.GetNightMareShowReward(e.Conf.ShowRewardMapCalabash) : ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(e.Conf.ShowRewardMap, t)) {
      const a = new Array();
      for (const h of r.keys()) {
        var o = [{
          IncId: 0,
          ItemId: h
        }, r.get(h)];
        a.push({
          ItemData: o,
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
        ControllerHolder_1.ControllerHolder.AdventureGuideController.HandleRegressDetection(this.A3f);
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
        ControllerHolder_1.ControllerHolder.AdventureGuideController.HandleRegressDetection(this.A3f);
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