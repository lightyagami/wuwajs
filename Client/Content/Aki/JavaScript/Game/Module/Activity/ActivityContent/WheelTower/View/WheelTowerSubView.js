"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerProgressBar = exports.WheelTowerSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
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
    this.Dlf = undefined;
    this.Ulf = undefined;
    this.xlf = undefined;
    this.DIf = e => {
      if (e === this.ActivityBaseData?.Id) {
        this.OnRefreshView();
      }
    };
    this.VWu = () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.ActivityData.IsTowerUnlocked()) {
        UiManager_1.UiManager.OpenView("WheelTowerModeSelectView");
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelTower_TowerLocked");
      }
    };
    this.hoc = () => {
      UiManager_1.UiManager.OpenView("WheelTowerRewardView", undefined, (e, i) => {
        if (e) {
          UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(i);
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var i = this.GetItem(0);
    this.P4c = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.P4c.SetData(this.ActivityBaseData);
    e.push(this.P4c.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(1);
    this.Dlf = new ActivityCircleButtonItem_1.ActivityCircleButtonItem();
    e.push(this.Dlf.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(2);
    this.Ulf = new WheelTowerProgressBar();
    e.push(this.Ulf.CreateThenShowByActorAsync(i.GetOwner()));
    var i = this.GetItem(3);
    this.xlf = new WheelTowerProgressBar();
    e.push(this.xlf.CreateThenShowByActorAsync(i.GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.P4c?.SetClickFunc(this.VWu);
    this.P4c?.SetBtnText("PrefabTextItem_3920397242_Text");
    this.Dlf?.SetOnClick(this.hoc);
    this.ActivityBaseData?.ReadRedDot();
    this.OnRefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.DIf);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.DIf);
  }
  OnRefreshView() {
    this.ZDo();
    this.Dlf?.SetRedDotVisible(this.ActivityBaseData.HasAnyRewardCanReceive());
  }
  ZDo() {
    var e;
    var i = this.ActivityBaseData?.IsUnLock() ?? false;
    this.Dlf?.SetUiActive(i);
    if (i) {
      e = (i = ModelManager_1.ModelManager.WheelTowerModel).ActivityData.GetCurrentRewardProgress();
      i = i.ActivityData.GetTotalRewardProgress();
      this.Dlf?.SetSubText(e + "/" + i);
    }
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
//# sourceMappingURL=WheelTowerSubView.js.map