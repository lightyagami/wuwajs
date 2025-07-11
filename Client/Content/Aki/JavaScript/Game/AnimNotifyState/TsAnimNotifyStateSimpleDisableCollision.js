"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const collisionDisableHandleMap = new Map();
class TsAnimNotifyStateSimpleDisableCollision extends UE.KuroAnimNotifyState {
  Constructor() {}
  GetActorComponent(e) {
    return e.CharacterActorComponent || e.SimpleNpcActorComponent;
  }
  K2_NotifyBegin(a, i, e) {
    var r = a.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var t = this.GetActorComponent(r);
      if (!t?.Valid) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 20, "禁用Actor碰撞ANS开始", ["蒙太奇路径", UE.KismetSystemLibrary.GetPathName(i)], ["蓝图名称", r?.GetName()], ["实体ID", r?.GetEntityIdNoBlueprint() ?? ""]);
        }
        return true;
      }
      i = t.DisableCollision("TsAnimNotifyStateSimpleDisableCollision.K2_NotifyBegin");
      let e = collisionDisableHandleMap.get(a);
      if (!e) {
        e = new Map();
        collisionDisableHandleMap.set(a, e);
      }
      e.set(this, i);
    }
    return true;
  }
  K2_NotifyEnd(e, a) {
    var i = e.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      var r = collisionDisableHandleMap.get(e);
      if (r) {
        var t = r.get(this);
        if (!t) {
          return true;
        }
        if (ModelManager_1.ModelManager.CharacterModel.GetHandle(i.EntityId)?.Valid) {
          this.GetActorComponent(i)?.EnableCollision(t);
        }
        r.delete(this);
        if (!r.size) {
          collisionDisableHandleMap.delete(e);
        }
      }
    }
    return true;
  }
  GetNotifyName() {
    return "禁用Actor碰撞";
  }
}
exports.default = TsAnimNotifyStateSimpleDisableCollision;
//# sourceMappingURL=TsAnimNotifyStateSimpleDisableCollision.js.map