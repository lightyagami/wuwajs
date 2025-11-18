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
  static p7d() {
    return Info_1.Info.IsInGamepad();
  }
  static v7d() {
    return Info_1.Info.IsInKeyBoard() && TsLguiEventSystemActor_1.TsLguiEventSystemActor.IsInNavigationInputType();
  }
  static y7d() {
    return Info_1.Info.IsInKeyBoard() && TsLguiEventSystemActor_1.TsLguiEventSystemActor.IsInPointerInputType();
  }
  static ReportSpaceKeyInteract(e) {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (this.p7d() || this.y7d()) {
        (t = new LogReportDefine_1.UiInteractSpaceKeyLogEvent()).i_type = e;
        t.i_status = 1;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      } else if (this.v7d()) {
        (t = new LogReportDefine_1.UiInteractSpaceKeyLogEvent()).i_type = e;
        t.i_status = 2;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      }
    }
  }
  static RecordRouletteOpen() {
    if (!this.orm.IsStart) {
      if (ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()) {
        this.orm.TriggerOpen();
      }
    }
  }
  static RecordRouletteClose() {
    var e;
    if (this.orm.IsStart) {
      this.orm.TriggerClose();
      (e = new LogReportDefine_1.UiInteractRouletteLogEvent()).i_old_count = this.orm.OldRound;
      e.i_new_count = this.orm.NewRound;
      e.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      e.i_cost_time = this.orm.DurationTime;
      e.i_skill_id = this.orm.UseSkillId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
  static RecordChatOpen() {
    if (!this.nrm.IsStart) {
      if (ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower()) {
        this.nrm.TriggerOpen();
      }
    }
  }
  static RecordChatClose() {
    var e;
    if (this.nrm.IsStart) {
      this.nrm.TriggerClose();
      (e = new LogReportDefine_1.UiInteractChatLogEvent()).i_old_count = this.nrm.OldRound;
      e.i_new_count = this.nrm.NewRound;
      e.i_inst_id = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      e.i_cost_time = this.nrm.DurationTime;
      e.i_skill_id = this.nrm.UseSkillId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    }
  }
}
(exports.UiInteractLogReport = UiInteractLogReport).orm = new UiInteractRouletteData_1.UiInteractRouletteData();
UiInteractLogReport.nrm = new UiInteractChatData_1.UiInteractChatData(); //# sourceMappingURL=UiInteractLogReport.js.map