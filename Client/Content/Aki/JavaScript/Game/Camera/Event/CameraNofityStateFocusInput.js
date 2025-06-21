"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const UE = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/CharacterLockOnComponent"),
  ActorUtils_1 = require("../../Utils/ActorUtils");
class CameraNofityStateFocusInput extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), this.MinDistance = -0, this.MaxDistance = 1e3, this.LockOnPart = "", this.LockOnMap = new Map
  }
  Constructor() {
    this.LockOnMap = new Map
  }
  K2_NotifyBegin(e, t, r) {
    e = e?.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && !this.LockOnMap.has(e.EntityId)) {
      var a = ActorUtils_1.ActorUtils.GetEntityByActor(e),
        o = e.GetEntityNoBlueprint();
      if (o?.Valid) {
        var s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (!s) return !1;
        var o = o.GetComponent(1)?.ActorLocationProxy,
          n = s.Entity.GetComponent(1)?.ActorLocationProxy,
          o = Vector_1.Vector.Dist(o, n);
        if (o < this.MinDistance || o > this.MaxDistance) return !1;
        n = s?.Entity?.GetComponent(32);
        n && ((o = new CharacterLockOnComponent_1.LockOnInfo).EntityHandle = a, o.SocketName = "None" === this.LockOnPart ? "" : this.LockOnPart, this.LockOnMap.set(e.EntityId, o), n.ForceLookAt(o, !0))
      }
    }
    return !1
  }
  K2_NotifyEnd(e, t) {
    var r, a, e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !(!(r = this.LockOnMap.get(e.EntityId)) || !e?.IsValid() || !(a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) || ((a = a.Entity?.GetComponent(32)) && a.ForceLookAt(r, !1), this.LockOnMap.delete(e.EntityId), 0))
  }
  GetNotifyName() {
    return "强制锁定目标"
  }
}
exports.default = CameraNofityStateFocusInput;
//# sourceMappingURL=CameraNofityStateFocusInput.js.map