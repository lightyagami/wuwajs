"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const HudUnitUtils_1 = require("../../HudUnit/Utils/HudUnitUtils");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryMainButtonItem_1 = require("./Items/HonamiStoryMainButtonItem");
const HonamiStoryProfitPanel_1 = require("./Items/HonamiStoryProfitPanel");
const HonamiStoryQuestPanel_1 = require("./Items/HonamiStoryQuestPanel");
const showWhenMainTask = [1, 2];
class HonamiStoryMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zJa = undefined;
    this.S9_ = undefined;
    this.Vwm = undefined;
    this.YEm = undefined;
    this.$5d = new Map();
    this.W5d = [];
    this.TDe = undefined;
    this.$hm = "";
    this.Whm = 0;
    this.Kkm = false;
    this.Xkm = false;
    this.$An = t => {
      for (const i of this.$5d.values()) {
        if (i.SpecialParamName === t) {
          i.SetText();
          i.SetRedDot();
        }
      }
    };
    this.IMf = () => {
      this.zkm(true);
    };
    this.l7i = t => {
      if (t.ViewName === "HonamiStoryMainView") {
        this.Qhm(false);
      }
    };
    this.ZOm = () => {
      this.RefreshSpecialButtonsStates();
    };
    this.Khm = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("剧情对话");
    };
    this.Ykm = () => {
      this.Xkm = !this.Xkm;
      this.zkm(!this.Xkm);
    };
    this.Q5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryTechnologyView");
    };
    this.K5d = () => {
      ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(10102);
    };
    this.X5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryShopView");
    };
    this.Y5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryMascotCollectBookView");
    };
    this.z5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryItemCollectView");
    };
    this.J5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryPermanentTaskView");
    };
    this.Z5d = () => {
      UiManager_1.UiManager.OpenView("HonamiStoryLimitTaskView");
    };
    this._eh = async () => {
      var t;
      var i;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10112)) {
        UiManager_1.UiManager.OpenView("HonamiStoryLevelInfoView");
      } else if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInActivityQuest()) {
        if ((t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData()) && (i = t.GetCurrentProgressAreaDataId(), t = t.GetHonamiStoryAreaData(i))) {
          i = t.Config.DangerLevel;
          t = t.Config.MainBTId;
          HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByBtId(t);
          HonamiStoryController_1.HonamiStoryController.SendHonamiStoryItemEnterRequest(false, i, false);
        }
      } else {
        t = HonamiStoryUtil_1.HonamiStoryUtil.GetMainLineInstId();
        i = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("HonamiStory", 78, "主线进穗波物语副本:", ["instId", t], ["roleIdList", i.join(",")]);
        }
        HonamiStoryController_1.HonamiStoryController.SetHonamiStoryLoadingInfoByTimingOnly(1);
        await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t, [], HonamiStoryDefine_1.HONAMI_DUNGEON_ENTRANCE_ID, 0);
      }
    };
    this.V2i = () => {
      this.CloseMe();
      UiManager_1.UiManager.OpenView("HonamiStorySmallLoadingView");
    };
    this.rJd = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      return !!t && (t.CanMascotCollectGetReward() || t.CanAreaCollectGetReward());
    };
    this.Dom = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      return !!t && t.IsPermanentTaskHasRedDot();
    };
    this.Uom = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      return !!t && t.IsLimitTaskHasRedDot();
    };
    this.SEm = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      return !!t && t.IsItemCollectionHasRedDot();
    };
    this.zEm = () => ModelManager_1.ModelManager.HonamiStoryModel.CheckIsNewInInventory();
    this.jgf = () => ModelManager_1.ModelManager.HonamiStoryModel.IsShopHasRedDot();
    this.MEm = () => ModelManager_1.ModelManager.HonamiStoryModel.IsTechHasRedDot();
    this.xom = t => {
      var i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      if (i) {
        i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i.EndRewardTime, "{0}") ?? "";
        t?.SetText(i);
      }
    };
    this.Bom = t => {
      var i;
      var e = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
      if (e) {
        i = e.GetPermanentTaskIdsByState(2).length;
        e = e.GetPermanentTaskTotalNum();
        t?.SetText(i + "/" + e);
      }
    };
    this.hDm = t => {
      var i;
      var e;
      var n = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
      if (n) {
        i = n.GetCapacity();
        e = n.GetOccupy();
        if (n.GetOverflowCapacity() > 0) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(t, "HonamiStory_OverflowCapacity", e, i);
        } else {
          t?.SetText(e + "/" + i);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIExtendToggle], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIButtonComponent]];
    this.BtnBindInfo = [[12, this.Khm], [14, this.Ykm]];
  }
  async OnBeforeStartAsync() {
    var t;
    if (this.OpenParam) {
      t = this.OpenParam;
      this.$hm = t.UiCameraName;
      this.Whm = t.TalkEntityId;
    }
    await super.OnBeforeStartAsync();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.V2i);
    this.S9_ = new HonamiStoryQuestPanel_1.HonamiStoryQuestPanel();
    await this.S9_.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.Vwm = new HonamiStoryProfitPanel_1.HonamiStoryProfitPanel();
    await this.Vwm.CreateThenShowByActorAsync(this.GetItem(13).GetOwner());
    this.YEm = new HonamiStoryMainButtonGoItem();
    this.YEm.SetOnBtnEnterCallback(() => {
      this.eGm(this._eh);
    });
    await this.YEm.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.CZm();
    this.HVd();
    await this.$Vd();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStorySetVisible, this.IMf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUiBlendInTimeCameraFinished, this.l7i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStorySetVisible, this.IMf);
  }
  OnBeforeShow() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.DisablePlayerActor();
    if (!HonamiStoryUtil_1.HonamiStoryUtil.CheckInMainQuest()) {
      this.sSt();
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        this.sSt();
      }, TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    var t = this.pZm();
    if (t) {
      this.S9_.Refresh(false);
      this.Vwm.Refresh();
    }
    this.S9_.SetActive(t);
    this.Vwm.SetActive(t);
    this.tGm();
    this.YEm.RefreshButtonState();
    this.Qhm(false);
    this.Bim();
    this.Xkm = false;
    this.zkm(!this.Xkm);
  }
  OnStart() {
    this.UiViewSequence?.AddSequenceFinishEvent("ShowView", this.ZOm);
  }
  OnBeforeHide() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.Zkm();
  }
  OnBeforeDestroy() {
    for (const t of this.$5d.values()) {
      t.Clear();
    }
    this.$5d.clear();
    this.W5d = [];
  }
  OnAfterDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.EnablePlayerActor();
  }
  RefreshSpecialButtonsStates() {
    for (const t of this.$5d.values()) {
      if (t.CheckIsSpecialSet()) {
        t.SetButtonState();
        this.UiViewSequence.PlaySequence(t.SpecialSequenceName);
      }
    }
    if (ModelManager_1.ModelManager.HonamiStoryModel.LastRecordRevenue !== ModelManager_1.ModelManager.HonamiStoryModel.TotalRevenue) {
      this.Vwm.PlayChangeSequence();
    }
  }
  tGm() {
    for (const t of this.$5d.values()) {
      t.SetButtonState();
      t.SetText();
      t.SetRedDot();
    }
  }
  sSt() {
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (t) {
      t = t.CheckIfInLimitTime();
      this.GetItem(11).SetUIActive(t && !this.Xkm);
      if (!t && this.TDe) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      } else if (t = this.$5d.get(7)) {
        t.SetText();
        t.SetRedDot();
      }
    }
  }
  Qhm(t) {
    var i;
    var e = this.GetButton(12);
    e.RootUIComp.SetUIActive(false);
    if (t) {
      t = undefined;
      i = new Array();
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(this.Whm, i);
      if (t = i[0]?.Entity) {
        i = t.GetComponent(1).ActorLocation;
        t = new Vector2D_1.Vector2D();
        if (HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(i, t)) {
          e.RootUIComp.SetAnchorOffset(t.ToUeVector2D());
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "RefreshTalkButton: entity is null");
      }
    }
  }
  Bim() {
    var t = this.$5d.get(6);
    if (t) {
      t.SetButtonState();
      t.SetText();
      t.SetRedDot();
    }
  }
  PushCameraHandle(t, i, e) {
    if (this.$hm.length > 0) {
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(this.$hm, i, e);
    }
  }
  PopCameraHandle(t, i, e, n) {
    if (this.$hm.length > 0) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(this.$hm, i, e, n);
    }
  }
  eqm() {
    return !this.Kkm;
  }
  tqm() {
    this.Kkm = true;
  }
  Zkm() {
    this.Kkm = false;
  }
  Jkm(t) {
    if (this.eqm()) {
      this.tqm();
      t();
      this.Zkm();
    }
  }
  async eGm(t) {
    if (this.eqm()) {
      this.tqm();
      await t();
      this.Zkm();
    }
  }
  zkm(t) {
    this.GetExtendToggle(14).SetToggleState(t ? 0 : 1);
    this.GetItem(15).SetUIActive(t);
    this.GetButton(16).RootUIComp.SetUIActive(t);
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInMainQuest();
    this.GetButton(18).RootUIComp.SetUIActive(!i && t);
    this.S9_.SetActive(this.pZm() && t);
    this.Vwm.SetActive(this.pZm() && t);
    for (const e of this.$5d.values()) {
      if (t) {
        e.SetButtonState();
      } else {
        e.SetUiActive(t);
      }
    }
    this.YEm.SetUiActive(t);
  }
  pZm() {
    return !HonamiStoryUtil_1.HonamiStoryUtil.CheckInMainQuest();
  }
  CZm() {
    for (let t = 5; t <= 11; t++) {
      var i = this.GetItem(t);
      if (i) {
        i.SetUIActive(false);
      }
    }
  }
  HVd() {
    if (!(this.W5d.length > 0)) {
      this.W5d = [{
        Type: 1,
        ComponentId: 5,
        FunctionId: 10107,
        OnClickCallback: this.Q5d,
        ShowRedDot: this.MEm
      }, {
        Type: 2,
        ComponentId: 6,
        OnClickCallback: this.K5d,
        SetTextCallback: this.hDm,
        ShowRedDot: this.zEm,
        SpecialParamName: "Enter",
        SpecialSequenceName: "Acquire"
      }, {
        Type: 3,
        ComponentId: 7,
        FunctionId: 10117,
        OnClickCallback: this.X5d,
        ShowRedDot: this.jgf
      }, {
        Type: 4,
        ComponentId: 8,
        FunctionId: 10116,
        OnClickCallback: this.Y5d,
        ShowRedDot: this.rJd
      }, {
        Type: 5,
        ComponentId: 9,
        FunctionId: 10118,
        OnClickCallback: this.z5d,
        ShowRedDot: this.SEm
      }, {
        Type: 6,
        ComponentId: 10,
        OnClickCallback: this.J5d,
        SetTextCallback: this.Bom,
        ShowRedDot: this.Dom
      }, {
        Type: 7,
        ComponentId: 11,
        OnClickCallback: this.Z5d,
        SetTextCallback: this.xom,
        ShowRedDot: this.Uom
      }];
    }
  }
  async $Vd() {
    var t;
    var i = [];
    for (const e of this.W5d) {
      if (!!this.oJd(e.Type) && !this.$5d.has(e.Type)) {
        (t = new HonamiStoryMainButtonItem_1.HonamiStoryMainButtonItem()).SetConfigData(e);
        if (e.OnClickCallback !== undefined) {
          t.SetClickCallback(() => {
            this.Jkm(e.OnClickCallback);
          });
        }
        this.$5d.set(e.Type, t);
        i.push(t.CreateThenShowByActorAsync(this.GetItem(e.ComponentId).GetOwner()));
      }
    }
    await Promise.all(i);
  }
  oJd(t) {
    var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInMainQuest();
    return !i || showWhenMainTask.includes(t);
  }
}
exports.HonamiStoryMainView = HonamiStoryMainView;
class HonamiStoryMainButtonGoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.iqm = undefined;
    this._eh = () => {
      this.iqm?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this._eh]];
  }
  RefreshButtonState() {
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10112);
    this.GetItem(3).SetUIActive(!t);
    this.GetItem(4).SetUIActive(t);
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (t) {
      t = t.IsLevelSelectHasViewRedDot();
      this.GetItem(2).SetUIActive(t);
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  SetOnBtnEnterCallback(t) {
    this.iqm = t;
  }
}
//# sourceMappingURL=HonamiStoryMainView.js.map