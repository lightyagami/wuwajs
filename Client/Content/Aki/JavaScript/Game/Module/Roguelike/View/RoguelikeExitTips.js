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
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeExitTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.xYd = undefined;
    this.BYd = undefined;
    this.kYd = undefined;
    this.OYd = undefined;
    this.qYd = undefined;
    this.Vho = () => {
      if (this.xYd) {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      } else if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
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
      if (this.xYd) {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly)?.InstanceSettleRequest();
        });
      } else if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
        });
      } else {
        UiManager_1.UiManager.CloseView(this.Info.Name, e => {
          var t = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData();
          if (t === undefined || t.GetRogueActivityState() === 0) {
            RoguelikeController_1.RoguelikeController.RoguelikeQuitRequest();
          } else {
            RoguelikeController_1.RoguelikeController.RoguelikeResultRequest(0);
          }
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnBeforeCreate() {
    this.xYd = this.OpenParam?.IsLastLayer ?? false;
    this.BYd = this.OpenParam?.CurrentInGameScore ?? 0;
    this.kYd = this.OpenParam?.MaxInGameScore ?? 0;
  }
  async OnBeforeStartAsync() {
    this.OYd = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.qYd = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.OYd.SetFunction(this.Vho);
    this.qYd.SetFunction(this.Hho);
    if (this.xYd) {
      this.OYd.SetLocalTextNew("WeRougeEndButtonBack");
      this.qYd.SetLocalTextNew("WeRougeEndButtonQuit");
    }
    return Promise.resolve();
  }
  OnStart() {
    var e;
    var t;
    var i;
    var o;
    if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
      e = ModelManager_1.ModelManager.WeeklyRogueModel.CurrentLayer;
      t = ModelManager_1.ModelManager.WeeklyRogueModel.MaxLayer;
      if (this.xYd) {
        i = this.BYd;
        o = this.kYd;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WeRouge_ExitCopyPopup", i, o);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", e, t);
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount, ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount);
    }
    this.OYd.GetBtn().RootUIComp.SetUIActive(!ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon());
  }
}
exports.RoguelikeExitTips = RoguelikeExitTips;
//# sourceMappingURL=RoguelikeExitTips.js.map