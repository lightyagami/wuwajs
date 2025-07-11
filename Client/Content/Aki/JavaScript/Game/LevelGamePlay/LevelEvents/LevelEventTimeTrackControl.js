"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTimeTrackControl = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTimeTrackControl extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.BJs = e => {
      this.FinishExecute(e);
    };
  }
  ExecuteNew(e, r) {
    var o;
    if (e) {
      o = e.EntityId;
      if (ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Valid) {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("TimeTrackControlView");
        ControllerHolder_1.ControllerHolder.TimeTrackController.OpenTimeTrackControlView(o, e.ConfigIndex, this.BJs);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:LevelEventTimeTrackControl entity不合法");
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:LevelEventTimeTrackControl params转换失败");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventTimeTrackControl = LevelEventTimeTrackControl;
//# sourceMappingURL=LevelEventTimeTrackControl.js.map