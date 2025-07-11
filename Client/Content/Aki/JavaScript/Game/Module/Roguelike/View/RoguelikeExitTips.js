"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeExitTips = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const ActivityManager_1 = require("../../Activity/ActivityManager");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeExitTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vho = () => {
      if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly)?.InstanceSettleRequest();
        });
      } else {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(0);
        });
      }
    };
    this.Hho = () => {
      if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
        });
      } else {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          var i = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
          if (i === undefined || i.GetRogueActivityState() === 0) {
            RoguelikeController_1.RoguelikeController.RoguelikeQuitRequest();
          } else {
            RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(0);
          }
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Vho], [2, this.Hho]];
  }
  OnStart() {
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer, ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount, ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount);
    }
    this.GetButton(1).RootUIComp.SetUIActive(!ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon());
  }
}
exports.RoguelikeExitTips = RoguelikeExitTips;
//# sourceMappingURL=RoguelikeExitTips.js.map