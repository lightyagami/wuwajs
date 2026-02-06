"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerProgressBar = exports.WheelTowerSubView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
const ActivityCircleButtonItem_1 = require("../../UniversalComponents/Functional/ActivityCircleButtonItem");
class WheelTowerSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.P4c = undefined;
    this.Y_f = undefined;
    this.z_f = undefined;
    this.J_f = undefined;
    this.MRf = e => {
      if (e === this.ActivityBaseData?.Id) {
        this.OnRefreshView();
      }
    };
    this.ABg = false;
    this.VWu = () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.ActivityData.IsTowerUnlocked()) {
        UiManager_1.UiManager.OpenView("WheelTowerModeSelectView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelTower_TowerLocked");
      }
    };
    this.hoc = () => {
      UiManager_1.UiManager.OpenView("WheelTowerRewardView", undefined, (e, t) => {
        if (e) {
          UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(t);
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = this.GetItem(0);
    this.P4c = new WheelTowerSubViewGeneralInfo();
    this.P4c.SetData(this.ActivityBaseData);
    e.push(this.P4c.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(1);
    this.Y_f = new ActivityCircleButtonItem_1.ActivityCircleButtonItem();
    e.push(this.Y_f.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(2);
    this.z_f = new WheelTowerProgressBar();
    e.push(this.z_f.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(3);
    this.J_f = new WheelTowerProgressBar();
    e.push(this.J_f.CreateThenShowByActorAsync(t.GetOwner()));
    e.push(this.DBg());
    await Promise.all(e);
  }
  OnStart() {
    this.P4c?.SetClickFunc(this.VWu);
    this.P4c?.SetBtnText("PrefabTextItem_3920397242_Text");
    this.Y_f?.SetOnClick(this.hoc);
    this.ActivityBaseData?.ReadRedDot();
    this.OnRefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.MRf);
  }
  OnRefreshView() {
    var e = this.ActivityBaseData?.IsUnLock();
    var t = this.ActivityBaseData?.IsInCycle();
    if (e && t) {
      this.Kwn();
      this.WGd();
      this.P4c?.RefreshView();
    } else {
      this.UBg();
    }
  }
  OnTimer(e) {
    this.RefreshUnlockTimeText();
    this.xBg();
  }
  BBg() {
    var e;
    var t;
    var i;
    return !this.ABg && !(e = this.ActivityBaseData.CycleBeginTime, t = this.ActivityBaseData.CycleEndTime, e === -1 && t === -1) && (!!(t < TimeUtil_1.TimeUtil.GetServerTime()) || !(e = this.ActivityBaseData?.IsUnLock(), t = this.ActivityBaseData?.IsInCycleTime() ?? false, i = this.ActivityBaseData?.IsInCycle(), !e || !t || i));
  }
  xBg() {
    if (this.BBg()) {
      this.ABg = true;
      ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData().then(() => {
        this.ABg = false;
      });
    }
  }
  async DBg() {
    if (this.BBg()) {
      await ControllerHolder_1.ControllerHolder.ActivityController.RequestActivityData();
    }
  }
  UBg() {
    this.Y_f?.SetUiActive(false);
    var e = this.P4c?.GetFunctional();
    e?.FunctionButton?.SetUiActive(false);
    e?.PanelLock?.SetUiActive(true);
    this.RefreshUnlockTimeText();
  }
  RefreshUnlockTimeText() {
    var e;
    if (this.ActivityBaseData?.IsInCycleTime() ?? false) {
      this.P4c?.RefreshFunction();
    } else {
      this.P4c?.GetFunctional()?.SetLockConditionButtonVisible(false);
      if ((e = ModelManager_1.ModelManager.WheelTowerModel.GetNextCycleRemainTime()) === undefined) {
        this.P4c?.GetFunctional()?.SetLockTextByTextId("WheelTower_NonCycle");
      } else {
        this.P4c?.GetFunctional()?.SetLockTextByTextId("WheelTower_TimeLimit", e);
      }
    }
  }
  Kwn() {
    var e;
    var t = this.ActivityBaseData?.IsUnLock() ?? false;
    this.Y_f?.SetUiActive(t);
    if (t) {
      e = (t = ModelManager_1.ModelManager.WheelTowerModel).ActivityData.GetCurrentRewardProgress();
      t = t.ActivityData.GetTotalRewardProgress();
      this.Y_f?.SetSubText(e + "/" + t);
      this.Y_f?.SetRedDotVisible(this.ActivityBaseData.ShouldShowRewardRedDot());
    }
  }
  WGd() {
    this.P4c?.SetFunctionRedDotVisible(this.ActivityBaseData.HasAnyLevelRedDot());
  }
}
exports.WheelTowerSubView = WheelTowerSubView;
class WheelTowerProgressBar extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    this.GetText(1)?.SetText(e.toString());
  }
}
exports.WheelTowerProgressBar = WheelTowerProgressBar;
class WheelTowerSubViewGeneralInfo extends ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo {
  GetTimeVisibleAndRemainTime() {
    return ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityBaseData, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("WheelTower_ActivityLimitTimeText"));
  }
}
//# sourceMappingURL=WheelTowerSubView.js.map