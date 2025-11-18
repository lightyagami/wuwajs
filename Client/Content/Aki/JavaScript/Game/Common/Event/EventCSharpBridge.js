"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventCSharpBridge = undefined;
const cpp_1 = require("cpp");
const Entity_1 = require("../../../Core/Entity/Entity");
const ModelManager_1 = require("../../Manager/ModelManager");
const EventSystem_1 = require("./EventSystem");
class EventCSharpBridge {
  static InitializeEnvironment() {
    cpp_1.FEventSystem.Init(this.Yum);
  }
  static DestroyEnvironment() {
    cpp_1.FEventSystem.Clear();
  }
  static Emit(t, ...e) {
    if (e.length === 0) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0);
    } else if (e.length === 1) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0, e[0]);
    } else if (e.length === 2) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0, e[0], e[1]);
    } else if (e.length === 3) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0, e[0], e[1], e[2]);
    } else if (e.length === 4) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0, e[0], e[1], e[2], e[3]);
    } else if (e.length === 5) {
      cpp_1.FEventSystem.EmitFromJavaScript(t, 0, e[0], e[1], e[2], e[3], e[4]);
    }
    return true;
  }
  static EmitWithTarget(t, e, ...p) {
    if (t instanceof Entity_1.Entity) {
      if (p.length === 0) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id);
      } else if (p.length === 1) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id, p[0]);
      } else if (p.length === 2) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id, p[0], p[1]);
      } else if (p.length === 3) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id, p[0], p[1], p[2]);
      } else if (p.length === 4) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id, p[0], p[1], p[2], p[3]);
      } else if (p.length === 5) {
        cpp_1.FEventSystem.EmitFromJavaScript(e, t.Id, p[0], p[1], p[2], p[3], p[4]);
      }
    }
    return true;
  }
  static Yum(t, e, ...p) {
    if (e === 0) {
      EventSystem_1.EventSystem.Emit(t, ...p);
    } else if ((e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))?.Entity) {
      EventSystem_1.EventSystem.EmitWithTarget(e.Entity, t, ...p);
    }
  }
}
exports.EventCSharpBridge = EventCSharpBridge;
//# sourceMappingURL=EventCSharpBridge.js.map