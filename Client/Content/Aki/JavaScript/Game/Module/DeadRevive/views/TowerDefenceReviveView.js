"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenceReviveView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TIPS_TEXT_ID = "TowerDefence_dead1";
const TIPS_TEXT_ID_NEW = "ReviveCountdownTime";
const TIPS_UNDER_BUTTON_TEXT_ID = "TowerDefence_dead2";
const BUTTON_TEXT_ID = "TowerDefence_end";
class TowerDefenceReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.pIl = undefined;
    this.YNi = () => {
      var e;
      if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(108)).FunctionMap.set(1, this.rsa);
        e.FunctionMap.set(2, this.osa);
        e.SetCloseFunction(this.PNo);
        e.FinishOpenFunction = this.jSl;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.rsa = () => {};
    this.osa = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
    };
    this.jSl = (e, i) => {
      if (UiManager_1.UiManager.IsViewOpen("TowerDefenceReviveView") && e) {
        this.pIl = i;
      } else {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(i);
      }
    };
    this.PNo = () => {
      if (UiManager_1.UiManager.IsViewOpen("TowerDefenceReviveView")) {
        this.pIl = undefined;
      }
    };
    this.o1a = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.YNi]];
  }
  async OnBeforeStartAsync() {
    await new TowerDefenceReviveItem().CreateThenShowByActorAsync(this.GetButton(7).RootUIComp.GetOwner());
  }
  OnBeforeShow() {
    this.GetButton(1).RootUIComp.SetUIActive(false);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetButton(7).RootUIComp.SetUIActive(true);
    this.GetButton(9).RootUIComp.SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
  }
  OnStart() {
    this.B2t();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), TIPS_UNDER_BUTTON_TEXT_ID);
  }
  OnBeforeDestroy() {
    if ((ModelManager_1.ModelManager.TowerDefenseModel.SelfReviveTargetTimestampForUi = undefined) !== this.pIl) {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(this.pIl);
    }
    this.pIl = undefined;
  }
  OnTick(e) {
    this.B2t();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify, this.o1a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify, this.o1a);
  }
  B2t() {
    var e;
    var i = ModelManager_1.ModelManager.TowerDefenseModel.SelfReviveTargetTimestampForUi;
    if (i === undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TIPS_TEXT_ID);
    } else if (i < (e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp())) {
      this.GetText(0)?.SetUIActive(false);
    } else {
      this.GetText(0)?.SetUIActive(true);
      i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(0.5 + TimeUtil_1.TimeUtil.Millisecond * (i - e));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TIPS_TEXT_ID_NEW, i.CountDownText);
    }
  }
}
exports.TowerDefenceReviveView = TowerDefenceReviveView;
class TowerDefenceReviveItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), BUTTON_TEXT_ID);
  }
}
//# sourceMappingURL=TowerDefenceReviveView.js.map