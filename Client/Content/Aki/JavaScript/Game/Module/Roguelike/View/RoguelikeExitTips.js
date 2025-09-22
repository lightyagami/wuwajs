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
    this.q8d = undefined;
    this.G8d = undefined;
    this.F8d = undefined;
    this.N8d = undefined;
    this.V8d = undefined;
    this.Vho = () => {
      if (this.q8d) {
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
      if (this.q8d) {
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
    this.q8d = this.OpenParam?.IsLastLayer ?? false;
    this.G8d = this.OpenParam?.CurrentInGameScore ?? 0;
    this.F8d = this.OpenParam?.MaxInGameScore ?? 0;
  }
  async OnBeforeStartAsync() {
    this.N8d = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.V8d = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.N8d.SetFunction(this.Vho);
    this.V8d.SetFunction(this.Hho);
    if (this.q8d) {
      this.N8d.SetLocalTextNew("WeRougeEndButtonBack");
      this.V8d.SetLocalTextNew("WeRougeEndButtonQuit");
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
      if (this.q8d) {
        i = this.G8d;
        o = this.F8d;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WeRouge_ExitCopyPopup", i, o);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", e, t);
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RoguelikeExitTipsCurRoom", ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount, ModelManager_1.ModelManager.RoguelikeModel.TotalRoomCount);
    }
    this.N8d.GetBtn().RootUIComp.SetUIActive(!ModelManager_1.ModelManager.RoguelikeModel?.CheckIsGuideDungeon());
  }
}
exports.RoguelikeExitTips = RoguelikeExitTips;
//# sourceMappingURL=RoguelikeExitTips.js.map