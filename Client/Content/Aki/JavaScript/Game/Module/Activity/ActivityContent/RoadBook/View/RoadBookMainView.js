"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivitySmallItemGrid_1 = require("../../UniversalComponents/ActivitySmallItemGrid");
const ActivityButtonItem_1 = require("../../UniversalComponents/Functional/ActivityButtonItem");
const ActivityRoadBookController_1 = require("../ActivityRoadBookController");
class RoadBookMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Otl = undefined;
    this.ActivityBaseData = undefined;
    this.qVl = -1;
    this.UVl = undefined;
    this.DVl = new Map();
    this.Cjl = false;
    this.RVl = undefined;
    this.BVl = 0;
    this.FV_ = undefined;
    this.GV_ = undefined;
    this.OnOpenSubView = t => {
      switch (t) {
        case 1:
          UiManager_1.UiManager.OpenView("RoadBookTravelTaskView", this.ActivityBaseData);
          break;
        case 4:
          UiManager_1.UiManager.OpenView("RoadBookVehicleTaskView", this.ActivityBaseData);
          break;
        case 3:
          UiManager_1.UiManager.OpenView("RoadBookPhantomTaskView", this.ActivityBaseData);
      }
    };
    this.NVl = () => {
      ActivityRoadBookController_1.ActivityRoadBookController.RequestRoadBookLevelUp(t => {
        this.Cjl = t;
        this.VVl();
      });
    };
    this.dvt = t => {
      if (this.BVl === 0 && (t === "CommonRewardView" && this.VVl(), t === "RoleLevelUpSuccessAttributeView")) {
        this.VVl();
      }
    };
    this.OVl = () => {
      this.qVl = this.qVl - 1;
      this._Vl(this.qVl);
      this.UiViewSequence.PlaySequence("Switch", true);
    };
    this.FVl = () => {
      this.qVl = this.qVl + 1;
      this._Vl(this.qVl);
      this.UiViewSequence.PlaySequence("Switch", true);
    };
    this.kVl = () => {
      this.CloseMe();
    };
    this.$_f = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.ActivityBaseData.LocalConfig.HelpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIArtText], [3, UE.UIArtText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [9, UE.UIItem], [8, UE.UIItem], [7, UE.UIItem], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UIText], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t;
    this.ActivityBaseData = this.OpenParam;
    if (this.ActivityBaseData) {
      t = [];
      this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
      t.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
      this.Otl.SetCloseCallBack(this.kVl);
      this.Otl.SetHelpCallBack(this.$_f);
      this.UVl = new ActivityButtonItem_1.ActivityButtonItem();
      t.push(this.UVl.CreateByActorAsync(this.GetItem(11).GetOwner()));
      this.UVl.SetFunction(this.NVl);
      this.UVl.SetUiActive(true);
      t.push(this.HVl());
      this.GV_ = new ButtonWithRedDot();
      this.GV_.SetFunction(this.OVl);
      t.push(this.GV_.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
      this.FV_ = new ButtonWithRedDot();
      this.FV_.SetFunction(this.FVl);
      t.push(this.FV_.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
      this.RVl = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid());
      await Promise.all(t);
    }
  }
  OnStart() {
    this.qVl = this.ActivityBaseData.TravelLevel;
  }
  OnBeforeShow() {
    this._Vl(this.qVl);
    this.WVl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.dvt);
  }
  OnBeforeDestroy() {}
  async HVl() {
    var t;
    var i;
    var e = [];
    for ([t, i] of [[1, 7], [3, 8], [4, 9]]) {
      var s = new RoadBookSubViewButton(t);
      e.push(s.CreateThenShowByActorAsync(this.GetItem(i).GetOwner()));
      this.DVl.set(t, s);
      s.SetFunction(this.OnOpenSubView);
    }
    await Promise.all(e);
  }
  VVl() {
    if (this.Cjl) {
      this.UiViewSequence.PlaySequence("LevelUp", false);
      if (this.qVl < this.ActivityBaseData.MaxTravelLevel) {
        this.qVl = this.qVl + 1;
      }
      this._Vl(this.qVl);
      this.WVl();
      this.Cjl = false;
    }
  }
  _Vl(t) {
    var i = t < this.ActivityBaseData.TravelLevel;
    if (t < this.ActivityBaseData.TravelLevel) {
      this.QVl(t);
    } else if (t === this.ActivityBaseData.TravelLevel) {
      this.KVl(t);
    } else {
      this.$Vl(t);
    }
    if (this.ActivityBaseData.CanTravelLevelUp()) {
      this.GV_.SetRedDotVisible(t > this.ActivityBaseData.TravelLevel);
      this.FV_.SetRedDotVisible(t < this.ActivityBaseData.TravelLevel);
    } else {
      this.GV_.SetRedDotVisible(false);
      this.FV_.SetRedDotVisible(false);
    }
    var e = this.ActivityBaseData.TravelLevelData.get(t);
    if (e) {
      var e = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetLevelExpConfig(e.Id);
      this.GetArtText(2).SetText(t.toString());
      this.GetArtText(3).SetText(t.toString());
      var e = e.RewardDropId > 0 ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.RewardDropId) : [];
      var s = [];
      for (const o of e) {
        var h = {
          Item: o,
          HasClaimed: i
        };
        s.push(h);
      }
      this.RVl.RefreshByData(s);
      this.GetText(12)?.SetText("Lv." + (t + 1));
      this.GetItem(6).SetUIActive(t > 0);
      this.GetItem(5).SetUIActive(t < this.ActivityBaseData.MaxTravelLevel);
    }
  }
  WVl() {
    for (var [t, i] of this.DVl.entries()) {
      var [e, s] = this.ActivityBaseData.GetTypeProgress(t);
      var e = Math.ceil(e / s * 100);
      i.SetProgressText(e + "%");
      var s = this.ActivityBaseData.GetTypeRedDotState(t);
      var e = this.ActivityBaseData.GetTypeNewState(t);
      i.RefreshRedDot(s || e);
    }
  }
  XVl(t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RoadBookExp_Text", t, i);
    this.GetText(4).SetUIActive(true);
  }
  QVl(t) {
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    this.GetItem(15).SetUIActive(true);
    this.GetItem(16).SetUIActive(false);
    if (t !== this.ActivityBaseData.TravelLevel) {
      this.UVl.SetEnableClick(false);
      this.UVl.SetRedDotVisible(false);
      this.UVl.SetShowText("RoadBookClaimed_Text");
    } else {
      this.UVl.SetShowText("RoadBookLevelUp_Text");
      this.UVl.SetRedDotVisible(false);
      this.UVl.SetEnableClick(false);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RoadBookLevelMax_Text");
  }
  KVl(t) {
    var t = this.ActivityBaseData.MaxTravelLevel === t;
    var i = !t && this.ActivityBaseData.CanTravelLevelUp();
    var e = this.ActivityBaseData.GetCurrentExp();
    var s = this.ActivityBaseData.GetCurrentTargetExp();
    this.GetItem(17).SetUIActive(true);
    this.GetItem(19).SetUIActive(true);
    if (t) {
      this.GetItem(15).SetUIActive(true);
      this.GetItem(16).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), "PrefabTextItem_2612260890_Text");
      this.GetItem(20).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RoadBookLevelMax_Text");
      this.GetText(4).SetUIActive(true);
    } else {
      this.XVl(e, s);
      this.GetItem(15).SetUIActive(false);
      this.GetItem(16).SetUIActive(false);
    }
    if (i) {
      this.UiViewSequence.PlaySequence("PreLevelUp");
      this.UVl.SetShowText("RoadBookLevelUp_Text");
      this.UVl.SetRedDotVisible(true);
      this.UVl.SetEnableClick(true);
    } else {
      this.UVl.SetShowText("RoadBookExpNotEnough_Text");
      this.UVl.SetRedDotVisible(false);
      this.UVl.SetEnableClick(false);
    }
  }
  $Vl(t) {
    var i = this.ActivityBaseData.TravelLevelData.get(t);
    var t = this.ActivityBaseData.MaxTravelLevel === t;
    var i = t ? i.AccumulateExp : i.TargetExp;
    this.GetItem(17).SetUIActive(true);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RoadBookLevelMax_Text");
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), "RoadBookLevelNotReach_Text");
      this.GetItem(19).SetUIActive(false);
      this.GetItem(16).SetUIActive(true);
      this.GetItem(20).SetUIActive(false);
    } else {
      this.XVl(0, i);
      this.GetItem(19).SetUIActive(true);
      this.GetItem(16).SetUIActive(false);
      this.GetItem(20).SetUIActive(true);
    }
    this.UVl.SetShowText("RoadBookLevelNotReach_Text");
    this.UVl.SetRedDotVisible(false);
    this.UVl.SetEnableClick(false);
  }
}
exports.RoadBookMainView = RoadBookMainView;
class RoadBookSubViewButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Type = t;
    this.cVl = undefined;
    this.UFe = () => {
      this.cVl?.(this.Type);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  SetProgressText(t) {
    this.GetText(1).SetText(t);
  }
  RefreshRedDot(t) {
    this.GetItem(2).SetUIActive(t);
  }
  SetFunction(t) {
    this.cVl = t;
  }
}
class ButtonWithRedDot extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gke = undefined;
    this.ije = () => {
      if (this.Gke) {
        this.Gke();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetRedDotVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
}
//# sourceMappingURL=RoadBookMainView.js.map