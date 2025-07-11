"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertAreaController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const ALERT_VAL_PROGRESS_INTERVAL = 1000;
class AlertAreaController extends ControllerBase_1.ControllerBase {
  static OnClear() {
    for (const e of Array.from(this.MMl.keys())) {
      this.DisableAlertValueProgressTimer(e);
    }
    this.MMl.clear();
    return true;
  }
  static UpdateAlertDataByServerNotify(e) {
    for (const r of e.BE_) {
      this.DisableAlertValueProgressTimer(r);
      ModelManager_1.ModelManager.AlertAreaModel?.DisableAlertArea(r);
    }
    for (const t of e.DE_) {
      if (ModelManager_1.ModelManager.AlertAreaModel?.GetAreaAlertEnabled(t.p6n)) {
        ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertValue(t.p6n, t.kE_);
        ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertUiEnabled(t.p6n, t.OE_);
        ModelManager_1.ModelManager.AlertAreaModel?.UpdateAreaAlertUiVisible(t.p6n, t.GE_);
        if (t.qE_ !== 0) {
          this.EnableAlertValueProgressTimer(t.p6n, t.qE_, ALERT_VAL_PROGRESS_INTERVAL);
        } else {
          this.DisableAlertValueProgressTimer(t.p6n);
        }
      } else {
        ModelManager_1.ModelManager.AlertAreaModel?.EnableAlertArea(t.p6n, t.kE_, t.OE_, t.GE_);
        if (t.qE_ !== 0) {
          this.EnableAlertValueProgressTimer(t.p6n, t.qE_, ALERT_VAL_PROGRESS_INTERVAL);
        }
      }
    }
  }
  static EnableAlertValueProgressTimer(r, t, e) {
    this.DisableAlertValueProgressTimer(r);
    e = TimerSystem_1.TimerSystem.Forever(() => {
      var e;
      if (ModelManager_1.ModelManager.AlertAreaModel?.GetAreaAlertEnabled(r)) {
        e = ModelManager_1.ModelManager.AlertAreaModel.GetAreaAlertValue(r);
        ModelManager_1.ModelManager.AlertAreaModel.UpdateAreaAlertValue(r, e + t);
      } else {
        this.DisableAlertValueProgressTimer(r);
      }
    }, e);
    this.MMl.set(r, e);
  }
  static DisableAlertValueProgressTimer(e) {
    var r = this.MMl.get(e);
    if (r) {
      if (TimerSystem_1.TimerSystem.Has(r)) {
        TimerSystem_1.TimerSystem.Remove(r);
      }
      this.MMl.delete(e);
    }
  }
}
(exports.AlertAreaController = AlertAreaController).MMl = new Map();
//# sourceMappingURL=AlertAreaController.js.map