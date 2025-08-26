"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScreenShotManager_1 = require("../../ScreenShot/ScreenShotManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TrapDefenseResultItem_1 = require("./Item/TrapDefenseResultItem");
const TrapDefensePauseView_1 = require("./TrapDefensePauseView");
class TrapDefenseResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.BtnSkill = undefined;
    this.BtnOrgan = undefined;
    this.BtnGain = undefined;
    this.BtnContinue = undefined;
    this.BattleResultInfo = undefined;
    this.ShareItem = undefined;
    this.ExpLayout = undefined;
    this.UnlockLayout = undefined;
    this.PassTime = "";
    this.ResultData = undefined;
    this.NeedShowViewAnim = false;
    this.E$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewTalentTree();
    };
    this.I$c = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenOrganDevelop(false, this);
    };
    this.T$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewBdSum();
    };
    this.b$c = () => {
      const e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
      var t;
      if (e) {
        t = ModelManager_1.ModelManager.TrapDefenseModel.GetNextLevelData(e);
        if (this.ResultData.KRs && t && t.IsUnlock) {
          if (t.Config.ModeType === 1) {
            ModelManager_1.ModelManager.TrapDefenseModel.OpenViewMainLevelMode(t.Id, t.Config.Difficulty, false);
          } else {
            ModelManager_1.ModelManager.TrapDefenseModel.OpenViewRougeLevelMode(t.Id, false);
          }
        } else if (!ModelManager_1.ModelManager.TrapDefenseModel.CheckNextLevelThreshold(e, () => {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestChallenge(e);
        }, this)) {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestChallenge(e);
        }
      }
    };
    this.R$c = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.NeedOpenMainView = true;
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
    };
    this.w$c = () => {
      this.b_c();
    };
    this.Bqe = () => {
      return new TrapDefensePauseView_1.TrapDefenseResultInfoItem();
    };
    this.L$c = () => new TrapDefenseResultItem_1.TrapDefenseResultResultItem();
    this.A$c = () => new TrapDefenseResultItem_1.TrapDefenseResultUnlockTab();
    this.Z_d = e => {
      if (e === "Start") {
        for (const t of this.ExpLayout.GetLayoutItemList()) {
          t.PlayStarIn();
        }
        TimerSystem_1.TimerSystem.Delay(() => {
          for (const e of this.UnlockLayout.GetLayoutItemList()) {
            e.PlayUnlockAnim();
          }
        }, 500);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIVerticalLayout], [10, UE.UIItem], [11, UE.UIVerticalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UIText]];
    this.BtnBindInfo = [[15, this.R$c], [16, this.w$c]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Z_d);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Z_d);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.PassTime = TimeUtil_1.TimeUtil.DateFormat2(new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()));
    this.BtnSkill = new TrapDefenseResultItem_1.TrapDefenseResultButton();
    e.push(this.BtnSkill.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.BtnSkill.OnClickCb = this.E$c;
    this.BtnOrgan = new TrapDefenseResultItem_1.TrapDefenseResultButton();
    e.push(this.BtnOrgan.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.BtnOrgan.OnClickCb = this.I$c;
    this.BtnGain = new TrapDefenseResultItem_1.TrapDefenseResultButton();
    e.push(this.BtnGain.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.BtnGain.OnClickCb = this.T$c;
    this.BtnContinue = new TrapDefenseResultItem_1.TrapDefenseResultContinueButton();
    this.BtnContinue.OnClickCb = this.b$c;
    e.push(this.BtnContinue.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()));
    this.ShareItem = new TrapDefenseResultItem_1.TrapDefenseShareTips();
    e.push(this.ShareItem.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()));
    var t = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    var t = t.Config.ResultImage;
    this.SetTextureByPath(t, this.GetTexture(21));
    await Promise.all(e);
    this.BtnGain.SetUiActive(ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstIsRogue());
    var t = this.OpenParam;
    this.ResultData = t.Notify.j7n;
    var e = t.NeedShowViewAnim ? "ShowView" : "Start";
    this.NeedShowViewAnim = t.NeedShowViewAnim;
    this.UiViewSequence.StartSequenceName = e;
  }
  OnStart() {
    this.BattleResultInfo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.Bqe, this.GetItem(8).GetOwner());
    this.ExpLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(9), this.L$c);
    this.UnlockLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(11), this.A$c);
  }
  OnBeforeShow() {
    this.BindRedDot();
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    let t = "";
    t = e.Config.ModeType === 1 ? "TowerDefense_Ending_MainTypeTitle_Text" : "TowerDefense_Ending_RougeTypeTitle_Text";
    var i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e.Config.Name, e.Config.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t, i);
    this.OnSuccessResult(this.ResultData.KRs || e?.Config.ModeType === 3);
    this.P$c();
    this.frd();
    this.BtnContinue.SetUiActive(true);
    var i = ModelManager_1.ModelManager.TrapDefenseModel.GetNextLevelData(e);
    if (i && i.IsUnlock && this.ResultData.KRs) {
      this.BtnContinue.ShowText("TrapDefense_Result_Continue");
    } else {
      this.BtnContinue.ShowText("TrapDefense_Result_Retry");
    }
    var e = [];
    e.push({
      Type: 0,
      Value: this.ResultData.Hcd
    });
    e.push({
      Type: 2,
      Value: this.ResultData.jcd,
      MaxBatch: this.ResultData.oYc
    });
    this.BattleResultInfo.RefreshByData(e, undefined, true);
  }
  OnBeforeHide() {
    for (const e of this.ExpLayout.GetLayoutItemList()) {
      e.EndStarAnim();
    }
    this.UnbindRedDot();
  }
  OnBeforeDestroy() {
    this.BtnSkill = undefined;
    this.BtnOrgan = undefined;
    this.BtnGain = undefined;
    this.BattleResultInfo = undefined;
    this.ExpLayout = undefined;
    this.UnlockLayout = undefined;
    this.ShareItem = undefined;
    this.ResultData = undefined;
  }
  BindRedDot() {
    this.BtnSkill.BindRedDot("TrapDefenseTalentTree");
  }
  UnbindRedDot() {
    this.BtnSkill.UnBindRedDot();
  }
  OnSuccessResult(e) {
    this.GetItem(4)?.SetUIActive(e);
    if (e) {
      t = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData().Config.ModeType === 3 ? "TrapDefenseChallengeSuccess_Endless" : "TrapDefenseChallengeSuccess_Normal";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(22), t);
    }
    this.GetItem(5)?.SetUIActive(!e);
    var t = e ? "TrapDefenseResultSuccess1" : "TrapDefenseResultFail1";
    var i = e ? "TrapDefenseResultSuccess2" : "TrapDefenseResultFail2";
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(t, this.GetTexture(19));
    this.SetTextureByPath(i, this.GetTexture(20));
    var t = ControllerHolder_1.ControllerHolder.ChannelController.CouldShare();
    this.GetButton(16)?.RootUIComp.SetUIActive(e && t);
    var i = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(8);
    this.GetItem(18)?.SetUIActive(i && e);
  }
  async b_c() {
    this.x$c(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, false);
    try {
      await this.c2a();
      var e = {
        ScreenShot: false,
        IsHiddenBattleView: false,
        HandBookPhotoData: undefined,
        BabelTowerSettlementViewData: undefined,
        PrepareFullScreenShot: true,
        GachaData: undefined,
        FragmentMemory: undefined,
        RoleSkinData: undefined,
        ExternalTexture: await ScreenShotManager_1.ScreenShotManager.TakeFullScreenShotToTextureAsync(),
        DateText: this.PassTime,
        ShareId: 8,
        LogoConfigName: "TrapDefenseLogo",
        LogoLeft: true
      };
      await UiManager_1.UiManager.OpenViewAsync("PhotoSaveView", e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiCore", 43, "打开分享界面异常", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 43, "打开分享界面异常", ["error", e]);
      }
    } finally {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreparePhotoScreenShot, false);
      this.x$c(true);
    }
  }
  async c2a() {
    return new Promise(e => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        e();
      });
    });
  }
  x$c(e) {
    this.GetItem(0)?.SetUIActive(e);
    this.GetItem(13)?.SetUIActive(e);
    this.GetVerticalLayout(9)?.RootUIComp.SetUIActive(e);
    this.GetItem(18)?.SetUIActive(false);
    this.D$c(e);
  }
  P$c() {
    var e = [];
    var t = {
      Type: 0,
      Value: ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData().Config.StarRatingConditions.length,
      History: (this.NeedShowViewAnim ? this.ResultData.Gld : this.ResultData.qld).length,
      Total: this.ResultData.Gld.length
    };
    e.push(t);
    if (this.ResultData.Ghd > 0) {
      t = {
        Type: 1,
        Value: this.ResultData.Ghd
      };
      e.push(t);
    }
    this.ExpLayout?.RefreshByData(e, undefined, true);
  }
  frd() {
    var e = this.grd();
    var t = this.Crd();
    var e = [...e, ...t];
    this.UnlockLayout?.RefreshByData(e, () => {
      this.D$c(true);
    }, true);
  }
  grd() {
    var e = [];
    var t = [];
    var i = [];
    var s = !this.NeedShowViewAnim || undefined;
    for (const o of this.ResultData.z7u) {
      var r = {
        MachineType: 2,
        DataType: o,
        Level: 1,
        Branch: 0
      };
      var r = {
        Type: 0,
        Id: ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r),
        IsNewUnlock: s
      };
      t.push(r);
    }
    for (const h of this.ResultData.Y7u) {
      var a = {
        MachineType: 1,
        DataType: h,
        Level: 1,
        Branch: 0
      };
      var a = {
        Type: 0,
        Id: ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(a),
        IsNewUnlock: s
      };
      t.push(a);
    }
    if (t.length > 0) {
      e.push({
        Type: 0,
        DataList: t
      });
    }
    for (const l of this.ResultData.j7u) {
      var n = {
        Type: 1,
        Id: l,
        IsNewUnlock: s
      };
      i.push(n);
    }
    if (i.length > 0) {
      e.push({
        Type: 1,
        DataList: i
      });
    }
    return e;
  }
  Crd() {
    var e;
    var t;
    var i;
    var s = [];
    var r = [];
    var a = [];
    for (const o of ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData()) {
      var n = o.GetSlotData();
      if (n) {
        n = {
          MachineType: n.IsBuilding ? 1 : 2,
          DataType: n.GetDataType(),
          Level: n.GetLevel(),
          Branch: n.GetBranch()
        };
        n = {
          Type: 2,
          Id: ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(n)
        };
        r.push(n);
      }
    }
    if (r.length > 0) {
      s.push({
        Type: 2,
        DataList: r
      });
    }
    for ([e, t] of ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.BdDataMap) {
      if (t.GetCurrentActiveProgressNum() !== 0) {
        i = {
          Type: 3,
          Id: e,
          NeedUnlockBar: true
        };
        a.push(i);
      }
    }
    if (a.length > 0) {
      s.push({
        Type: 3,
        DataList: a
      });
    }
    return s;
  }
  D$c(e) {
    for (const t of this.UnlockLayout.GetLayoutItemList()) {
      t.SetUiActive(t.IsShared !== e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "HighestRecord" && (e = this.ExpLayout?.GetItemByIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.TrapDefenseResultView = TrapDefenseResultView;
//# sourceMappingURL=TrapDefenseResultView.js.map