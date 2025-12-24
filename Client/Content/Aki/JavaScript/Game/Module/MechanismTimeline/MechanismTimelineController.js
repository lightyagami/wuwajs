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
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      UE.KuroMechanismTimelineSubsystem.GetSubSystem(GlobalData_1.GlobalData.GameInstance).BindMechanismEvent((0, puerts_1.toManualReleaseDelegate)(MechanismTimelineController.LNu));
    }
    return e;
  }
  static OnClear() {
    var e = super.OnClear();
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      (0, puerts_1.releaseManualReleaseDelegate)(MechanismTimelineController.LNu);
    }
    return e;
  }
  static RequestSceneItemSequenceFrameStart(e, o, r, t) {
    e = Protocol_1.Aki.Protocol.UXc.create({
      ORs: e,
      F4n: o,
      kXc: r,
      OXc: t
    });
    Net_1.Net.Call(25302, e, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.RequestSceneItemSequenceFrameStart", ["ErrorCode", e.Cvs]);
      }
    });
  }
  static RequestSceneItemSequenceFrameEnd(e, o, r, t) {
    e = Protocol_1.Aki.Protocol.DXc.create({
      ORs: e,
      F4n: o,
      kXc: r,
      OXc: t
    });
    Net_1.Net.Call(19564, e, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.RequestSceneItemSequenceFrameEnd", ["ErrorCode", e.Cvs]);
      }
    });
  }
}
(exports.MechanismTimelineController = MechanismTimelineController).LNu = (e, o, r, t, n) => {
  var a;
  var l = ModelManager_1.ModelManager.MechanismTimelineModel.GetContextByPlayer(t);
  if (l) {
    if (l.ContextType === 1) {
      if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l.PbDataId))?.IsInit) {
        if (a = a.Entity?.GetComponent(324)) {
          a.ExecuteEvent(t, e.toString(), o.toString(), r, l);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 18, "MechanismTimelineController.OnTriggerMechanismEvent:找不到SceneItemEventListenerComponent组件", ["eventName", o], ["executeType", r], ["sectionId", n], ["pbDataId", l.PbDataId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 18, "MechanismTimelineController.OnTriggerMechanismEvent:实体还未初始化", ["eventName", o], ["executeType", r], ["sectionId", n], ["pbDataId", l.PbDataId]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.OnTriggerMechanismEvent:暂未支持的上下文类型", ["eventName", o], ["executeType", r], ["sectionId", n]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("SceneItem", 18, "MechanismTimelineController.OnTriggerMechanismEvent:找不到上下文", ["eventName", o], ["executeType", r], ["sectionId", n]);
  }
};
//# sourceMappingURL=MechanismTimelineController.js.map