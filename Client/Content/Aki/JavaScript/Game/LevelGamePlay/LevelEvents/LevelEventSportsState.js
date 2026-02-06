"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSportsState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Global_1 = require("../../Global");
const CharacterSlideComponent_1 = require("../../NewWorld/Character/Common/Component/Move/CharacterSlideComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventSportsState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      var r = e.Config;
      switch (r.Type) {
        case "Slide":
          CharacterSlideComponent_1.CharacterSlideComponent.SetSlideConfig(r.SlideId);
          break;
        case "Ski":
          switch (r.Config.Type) {
            case "Open":
              this.VRe(r.Config, t);
              break;
            case "Close":
              this.HRe(r.Config, t);
              break;
            case "Accelerate":
              this.jRe(r.Config, t);
          }
      }
    } else {
      this.FinishExecute(false);
    }
  }
  VRe(e, t) {
    switch (t.Type) {
      case 1:
      case 6:
      case 5:
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 6, "LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext | Entity | Trigger", ["ContextType", t.Type]);
        }
        return;
    }
    let r = undefined;
    var o;
    var a = this.thh(t);
    if (r = e.Target.Type === "Player" ? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint() : r) {
      o = a === "180700235";
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 50, "进入滑雪模式", ["Type", t.Type], ["ContextSource", a], ["NeedSetBase", o]);
      }
      r.GetComponent(37)?.EnterSkiMode(e, o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 50, "目前仅Role支持触发滑雪模式", ["ContextType", t.Type], ["ContextSource", a]);
    }
  }
  HRe(e, t) {
    switch (t.Type) {
      case 1:
      case 6:
      case 5:
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 6, "LevelEventSportsState Ski: 类型必须对应GeneralLogicTreeContext | Entity | Trigger", ["ContextType", t.Type]);
        }
        return;
    }
    let r = undefined;
    var o = this.thh(t);
    if (r = e.Target.Type === "Player" ? Global_1.Global.BaseCharacter?.GetEntityNoBlueprint() : r) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 50, "退出滑雪模式", ["Type", t.Type], ["ContextSource", o]);
      }
      r.GetComponent(37)?.ExitSkiMode();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 50, "目前仅Role支持关闭滑雪模式", ["ContextType", t.Type], ["ContextSource", o]);
    }
  }
  jRe(e, t) {
    if (t instanceof LevelGeneralContextDefine_1.TriggerContext) {
      EntitySystem_1.EntitySystem.GetComponent(t.OtherEntityId, 37)?.SetSkiAccel(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 6, "LevelEventSportsState Ski: Triggered类型必须对应TriggerContext", ["ContextType", t.Type]);
    }
  }
  thh(e) {
    let t = "";
    switch (e.Type) {
      case 1:
        var r = EntitySystem_1.EntitySystem.GetComponent(e.EntityId, 0);
        t = r?.GetPbDataId().toString() ?? "";
        break;
      case 6:
        t = e.TreeConfigId + "/" + e.NodeId;
        break;
      case 5:
        r = EntitySystem_1.EntitySystem.GetComponent(e.TriggerEntityId, 0);
        t = r?.GetPbDataId().toString() ?? "";
    }
    return t;
  }
}
exports.LevelEventSportsState = LevelEventSportsState;
//# sourceMappingURL=LevelEventSportsState.js.map