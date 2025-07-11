"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQteTimeDilation = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const MAX_TIME_SCALE_TIME = 20;
const TIME_SCALE_PRIORITY = 100;
class PanelQteTimeDilation {
  constructor() {
    this.ROi = 0;
    this.UOi = 0;
    this.sDe = undefined;
    this.Hhn = 0;
  }
  Init() {
    this.ROi = 1;
    this.UOi = 1;
  }
  Clear() {}
  Start(t) {
    this.ROi = t.Config.WorldTimeDilation;
    if (this.ROi >= 1 || this.ROi < 0) {
      this.ROi = 1;
    } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 17, "联机下界面QTE只时停自己");
      }
      this.UOi = this.ROi;
      this.ROi = 1;
      this.sDe = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
      if (this.sDe?.IsInit && (t = this.sDe.Entity.GetComponent(122))) {
        this.Hhn = t.SetTimeScale(TIME_SCALE_PRIORITY, this.UOi, undefined, MAX_TIME_SCALE_TIME, 7);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 17, "界面QTE时停开始");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation, this.ROi);
    }
  }
  Stop() {
    var t;
    if (this.ROi !== 1) {
      this.ROi = 1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 17, "界面QTE时停结束");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation, this.ROi);
    }
    if (this.UOi !== 1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 17, "联机下界面QTE时停结束");
      }
      this.UOi = 1;
      if (this.sDe?.IsInit && this.Hhn > 0 && (t = this.sDe.Entity.GetComponent(122))) {
        t.RemoveTimeScale(this.Hhn);
      }
      this.sDe = undefined;
      this.Hhn = 0;
    }
  }
  GetWorldTimeDilation() {
    return this.ROi;
  }
  GetEntityTimeDilation() {
    return this.UOi;
  }
}
exports.PanelQteTimeDilation = PanelQteTimeDilation;
//# sourceMappingURL=PanelQteTimeDilation.js.map