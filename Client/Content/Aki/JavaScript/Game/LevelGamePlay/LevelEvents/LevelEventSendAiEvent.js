"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSendAiEvent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendAiEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "参数不合法");
      }
    }
    var n = t;
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "上下文不合法");
      }
    }
    switch (e.EventType) {
      case IAction_1.EAiEventType.CatAndDogPlayFlow:
      case IAction_1.EAiEventType.AnimalRandomAction:
        this.gRe(n.EntityId);
        break;
      case IAction_1.EAiEventType.AnimalStandUp:
        this.fRe(n.EntityId);
        break;
      case IAction_1.EAiEventType.AnimalSitDown:
        this.pRe(n.EntityId);
    }
  }
  fRe(e) {
    var t;
    var n;
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (e?.Valid) {
      if (e.Entity.GetComponent(47)) {
        t = (e = e.Entity.GetComponent(205))?.HasTag(393622611);
        n = e?.HasTag(276015887);
        this.vRe(e);
        if (!t && n) {
          e?.AddTag(379545977);
        } else {
          e?.AddTag(1900394806);
        }
        e?.AddTag(351576188);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "Entity不合法，缺少CharacterAiComponent");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 29, "对象Entity不合法");
    }
  }
  pRe(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (e?.Valid) {
      if (e.Entity.GetComponent(47)) {
        e = e.Entity.GetComponent(205);
        this.vRe(e);
        if (Math.random() < 0.5) {
          e?.AddTag(393622611);
        } else {
          e?.AddTag(276015887);
        }
        e?.AddTag(351576188);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "Entity不合法，缺少CharacterAiComponent");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 29, "对象Entity不合法");
    }
  }
  gRe(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    if (e?.Valid) {
      if (e.Entity.GetComponent(47)) {
        e = e.Entity.GetComponent(205);
        this.vRe(e);
        e?.AddTag(502364103);
        e?.AddTag(351576188);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "Entity不合法，缺少CharacterAiComponent");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 29, "对象Entity不合法");
    }
  }
  vRe(e) {
    if (e?.Valid) {
      e.RemoveTag(502364103);
      e.RemoveTag(393622611);
      e.RemoveTag(276015887);
      e.RemoveTag(1900394806);
      e.RemoveTag(379545977);
    }
  }
}
exports.LevelEventSendAiEvent = LevelEventSendAiEvent;
//# sourceMappingURL=LevelEventSendAiEvent.js.map