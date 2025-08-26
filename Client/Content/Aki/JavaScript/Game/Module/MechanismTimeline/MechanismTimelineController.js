"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismTimelineController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class MechanismTimelineController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e = super.OnInit();
    UE.KuroMechanismTimelineSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance).BindMechanismEvent((0, puerts_1.toManualReleaseDelegate)(MechanismTimelineController.jFu));
    return e;
  }
  static OnClear() {
    var e = super.OnClear();
    (0, puerts_1.releaseManualReleaseDelegate)(MechanismTimelineController.jFu);
    return e;
  }
  static RequestSceneItemSequenceFrameStart(e, r, o, t) {
    e = Protocol_1.Aki.Protocol.G8u.create({
      ORs: e,
      F4n: r,
      Pju: o,
      Dju: t
    });
    Net_1.Net.Call(21231, e, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.RequestSceneItemSequenceFrameStart", ["ErrorCode", e.Cvs]);
      }
    });
  }
  static RequestSceneItemSequenceFrameEnd(e, r, o, t) {
    e = Protocol_1.Aki.Protocol.d8u.create({
      ORs: e,
      F4n: r,
      Pju: o,
      Dju: t
    });
    Net_1.Net.Call(23451, e, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.RequestSceneItemSequenceFrameEnd", ["ErrorCode", e.Cvs]);
      }
    });
  }
}
(exports.MechanismTimelineController = MechanismTimelineController).jFu = (e, r, o, t, n) => {
  var a;
  var i = ModelManager_1.ModelManager.MechanismTimelineModel.GetContextByPlayer(t);
  if (i) {
    if (i.ContextType === 1) {
      if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i.PbDataId))?.IsInit) {
        if (a = a.Entity?.GetComponent(300)) {
          a.ExecuteEvent(t, e.toString(), r.toString(), o, i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 18, "MechanismTimelineController.OnTriggerMechanismEvent:找不到SceneItemEventListenerComponent组件", ["eventName", r], ["executeType", o], ["sectionId", n], ["pbDataId", i.PbDataId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 18, "MechanismTimelineController.OnTriggerMechanismEvent:实体还未初始化", ["eventName", r], ["executeType", o], ["sectionId", n], ["pbDataId", i.PbDataId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.OnTriggerMechanismEvent:暂未支持的上下文类型", ["eventName", r], ["executeType", o], ["sectionId", n]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.OnTriggerMechanismEvent:找不到上下文", ["eventName", r], ["executeType", o], ["sectionId", n]);
  }
};
//# sourceMappingURL=MechanismTimelineController.js.map