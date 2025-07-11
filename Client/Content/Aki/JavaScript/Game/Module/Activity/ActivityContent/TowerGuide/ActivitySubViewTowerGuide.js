"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTowerGuide = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleController_1 = require("../../../RoleUi/RoleController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityTowerGuideController_1 = require("./ActivityTowerGuideController");
const ActivityTowerGuideRewardGrid_1 = require("./ActivityTowerGuideRewardGrid");
class ActivitySubViewTowerGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.V3e = 0;
    this.ViewState = 0;
    this.H3e = undefined;
    this.mNe = undefined;
    this.dNe = true;
    this.j3e = undefined;
    this.W3e = undefined;
    this.K3e = () => {
      var e = new ActivityTowerGuideRewardGrid_1.ActivityTowerGuideRewardGrid();
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(e => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.Item[0].ItemId);
      });
      return e;
    };
    this.wNe = e => {
      if (e === this.ActivityBaseData.Id) {
        this.OnRefreshView();
      }
    };
    this.X2e = () => {
      RoleController_1.RoleController.OpenRoleMainView(1, 0, [this.V3e]);
    };
    this.Q3e = () => {
      if (this.ActivityBaseData.GetTowerProgressState(1) === 2) {
        ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(1);
      }
    };
    this.X3e = () => {
      if (this.ActivityBaseData.GetTowerProgressState(2) === 2) {
        ActivityTowerGuideController_1.ActivityTowerGuideController.RequestTowerReward(2);
      }
    };
    this.$3e = () => {
      var e;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        e = {
          MarkId: this.ActivityBaseData.MapMarkId,
          MarkType: 0,
          OpenFogId: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      } else {
        e = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
      ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.ActivityBaseData);
    };
    this.hhh = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(this.ActivityBaseData.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIHorizontalLayout], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [20, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIText], [18, UE.UIText], [19, UE.UIText], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.X2e], [16, this.X2e], [6, this.Q3e], [11, this.X3e], [12, this.$3e], [23, this.hhh]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    this.j3e = new TowerGuideProgress();
    await this.j3e.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.W3e = new TowerGuideProgress();
    await this.W3e.CreateByActorAsync(this.GetItem(10).GetOwner());
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.K3e);
    this.mNe = this.GetText(22);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnStart() {
    this.Y3e();
    this.J3e();
    this.OnRefreshView();
  }
  OnBeforeDestroy() {
    for (const e of this.H3e.GetLayoutItemList()) {
      this.AddChild(e);
    }
  }
  OnRefreshView() {
    var e = this.ActivityBaseData.GetViewState();
    this.fNe();
    this.z3e(e);
  }
  Y3e() {
    this.GetText(18).SetText(this.ActivityBaseData.GetTitle());
    this.GetText(19).ShowTextNew(this.ActivityBaseData.LocalConfig.Desc);
  }
  J3e() {
    this.V3e = this.ActivityBaseData.TrialRoleId;
    var e = this.ActivityBaseData.GetTrialRoleData();
    if (e) {
      this.GetText(17).SetText(e.GetName());
    }
  }
  z3e(e) {
    var i;
    var t = (this.ViewState = e) === 0;
    var r = e === 1;
    var e = e === 2;
    this.GetItem(0).SetUIActive(t);
    this.GetItem(1).SetUIActive(t);
    this.GetItem(2).SetUIActive(t);
    this.GetItem(8).SetUIActive(t);
    this.GetItem(13).SetUIActive(t);
    this.GetButton(23).RootUIComp.SetUIActive(t);
    if (t) {
      this.GetText(14).ShowTextNew(this.GetCurrentLockConditionText());
    }
    var s = this.ActivityBaseData.GetTowerProgressState(1);
    var h = this.ActivityBaseData.GetTowerProgressState(2);
    this.Z3e(t, h === 2);
    this.j3e.SetUiActive(s === 1);
    if (s === 1) {
      [t, i] = this.ActivityBaseData.GetTowerProgress(1);
      this.j3e.Refresh(t, i);
    }
    this.GetItem(3).SetUIActive(s === 3);
    this.GetButton(6).RootUIComp.SetUIActive(s === 2);
    this.W3e.SetUiActive(h === 1);
    if (h === 1) {
      [t, i] = this.ActivityBaseData.GetTowerProgress(2);
      this.W3e.Refresh(t, i);
    }
    this.GetItem(7).SetUIActive(h === 3);
    this.GetButton(11).RootUIComp.SetUIActive(h === 2);
    this.GetButton(12).RootUIComp.SetUIActive(r);
    if (r) {
      let e = "";
      s = this.ActivityBaseData.GetPreGuideQuestFinishState();
      e = s ? "ReadyToFightText" : "JumpToQuestText";
      this.GetText(20).ShowTextNew(e);
    }
    this.GetItem(15).SetUIActive(e);
  }
  OnTimer(e) {
    this.fNe();
  }
  pNe(e) {
    if (this.dNe !== e) {
      this.dNe = e;
      this.GetItem(21).SetUIActive(e);
    }
  }
  fNe() {
    var [e, i] = this.GetTimeVisibleAndRemainTime();
    this.pNe(e);
    if (e) {
      this.mNe.SetText(i);
    }
  }
  Z3e(e, i) {
    var t = ConfigManager_1.ConfigManager.ActivityTowerGuideConfig.GetTowerGuideById(2);
    if (t) {
      var r;
      var s;
      var h = [];
      for ([r, s] of t.RewardItem) {
        var o = [{
          IncId: 0,
          ItemId: r
        }, s];
        h.push({
          Item: o,
          IsLock: e,
          IsReceivableVisible: i
        });
      }
      this.H3e.RefreshByData(h);
    }
  }
}
exports.ActivitySubViewTowerGuide = ActivitySubViewTowerGuide;
class TowerGuideProgress extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e, i) {
    this.GetText(0).SetText(e.toString());
    this.GetText(1).SetText("/" + i.toString());
  }
}
//# sourceMappingURL=ActivitySubViewTowerGuide.js.map