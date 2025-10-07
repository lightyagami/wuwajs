"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiInteractLogReport = undefined;
const Info_1 = require("../../../Core/Common/Info");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const TsLguiEventSystemActor_1 = require("../LguiEventSystem/TsLguiEventSystemActor");
const UiInteractChatData_1 = require("./UiInteractChatData");
const UiInteractRouletteData_1 = require("./UiInteractRouletteData");
class UiInteractLogReport {
  static SNd() {
    return Info_1.Info.IsInGamepad();
  }
  static MNd() {
    return Info_1.Info.IsInKeyBoard() && TsLguiEventSystemActor_1.TsLguiEventSystemActor.IsInNavigationInputType();
  }
  static ENd() {
    return Info_1.Info.IsInKeyBoard() && TsLguiEventSystemActor_1.TsLguiEventSystemActor.IsInPointerInputType();
  }
  static ReportSpaceKeyInteract(e) {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (this.SNd() || this.ENd()) {
        (t = new LogReportDefine_1.UiInteractSpaceKeyLogEvent()).i_type = e;
        t.i_status = 1;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      } else if (this.MNd()) {
        (t = new LogReportDefine_1.UiInteractSpaceKeyLogEvent()).i_type = e;
        t.i_status = 2;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      }
    }
  }
  static RecordRouletteOpen() {
    if (!this.A$d.IsStart) {
      if (ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()) {
        this.A$d.TriggerOpen();
      }
    }
  }
  static RecordRouletteClose() {
    var e;
    if (this.A$d.IsStart) {
      this.A$d.TriggerClose();
      (e = new LogReportDefine_1.UiInteractRouletteLogEvent()).i_old_count = this.A$d.OldRound;
      e.i_new_count = this.A$d.NewRound;
      e.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      e.i_cost_time = this.A$d.DurationTime;
      e.i_skill_id = this.A$d.UseSkillId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
  static RecordChatOpen() {
    if (!this.D$d.IsStart) {
      if (ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()) {
        this.D$d.TriggerOpen();
      }
    }
  }
  static RecordChatClose() {
    var e;
    if (this.D$d.IsStart) {
      this.D$d.TriggerClose();
      (e = new LogReportDefine_1.UiInteractChatLogEvent()).i_old_count = this.D$d.OldRound;
      e.i_new_count = this.D$d.NewRound;
      e.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      e.i_cost_time = this.D$d.DurationTime;
      e.i_skill_id = this.D$d.UseSkillId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
}
(exports.UiInteractLogReport = UiInteractLogReport).A$d = new UiInteractRouletteData_1.UiInteractRouletteData();
UiInteractLogReport.D$d = new UiInteractChatData_1.UiInteractChatData(); //# sourceMappingURL=UiInteractLogReport.js.map