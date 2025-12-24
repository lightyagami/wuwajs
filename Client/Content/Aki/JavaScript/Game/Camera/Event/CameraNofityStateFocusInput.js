"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const ModelManager_1 = require("../../Manager/ModelManager");
const BaseLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/BaseLockOnComponent");
const ActorUtils_1 = require("../../Utils/ActorUtils");
class CameraNofityStateFocusInput extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MinDistance = -0;
    this.MaxDistance = 1000;
    this.LockOnPart = "";
    this.LockOnMap = new Map();
  }
  Constructor() {
    this.LockOnMap = new Map();
  }
  K2_NotifyBegin(e, t, r) {
    e = e?.GetOwner();
    if (e instanceof TsBaseCharacter_1.default && !this.LockOnMap.has(e.EntityId)) {
      var a = ActorUtils_1.ActorUtils.GetEntityByActor(e);
      var s = e.GetEntityNoBlueprint();
      if (s?.Valid) {
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        if (!o) {
          return false;
        }
        var s = s.GetComponent(1)?.ActorLocationProxy;
        var n = o.Entity.GetComponent(1)?.ActorLocationProxy;
        var s = Vector_1.Vector.Dist(s, n);
        if (s < this.MinDistance || s > this.MaxDistance) {
          return false;
        }
        n = o?.Entity?.GetComponent(33);
        if (n) {
          (s = new BaseLockOnComponent_1.LockOnInfo()).EntityHandle = a;
          s.SocketName = this.LockOnPart === "None" ? "" : this.LockOnPart;
          this.LockOnMap.set(e.EntityId, s);
          n.ForceLookAt(s, true);
        }
      }
    }
    return false;
  }
  K2_NotifyEnd(e, t) {
    var r;
    var a;
    var e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(r = this.LockOnMap.get(e.EntityId)) && !!e?.IsValid() && !!(a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && !((a = a.Entity?.GetComponent(33)) && a.ForceLookAt(r, false), this.LockOnMap.delete(e.EntityId), 0);
  }
  GetNotifyName() {
    return "强制锁定目标";
  }
}
exports.default = CameraNofityStateFocusInput;
//# sourceMappingURL=CameraNofityStateFocusInput.js.map