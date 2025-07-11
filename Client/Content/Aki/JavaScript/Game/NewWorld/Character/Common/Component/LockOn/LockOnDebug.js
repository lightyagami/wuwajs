"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockOnDebug = exports.LockOnDebugData = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../../GlobalData");
const ARROW_SIZE = 15;
class LockOnDebugData {
  constructor(t) {
    this.LAe = t;
    this.ShowTip = undefined;
    this.ColorType = 1;
    this.Due = Vector_1.Vector.Create();
  }
  DrawDebug(t) {
    var e = EntitySystem_1.EntitySystem.Get(this.LAe.EntityHandle.Id);
    if (this.LAe.SocketName) {
      this.Due.DeepCopy(this.JYo(e, this.LAe.SocketName)?.GetLocation());
    } else {
      this.Due.DeepCopy(e.GetComponent(1).ActorLocationProxy);
    }
    let a = undefined;
    switch (this.ColorType) {
      case 0:
        a = LockOnDebugData.zYo;
        break;
      case 2:
        a = LockOnDebugData.ZYo;
        break;
      case 1:
        a = LockOnDebugData.Fct;
        break;
      case 3:
        a = LockOnDebugData.eJo;
    }
    UE.KismetSystemLibrary.D_DrawDebugArrow(GlobalData_1.GlobalData.World, t.GetComponent(1)?.ActorLocationProxy.ToUeVector(), this.Due.ToUeVector(), ARROW_SIZE, a);
    if (this.ShowTip) {
      UE.KismetSystemLibrary.D_DrawDebugString(GlobalData_1.GlobalData.World, this.Due.ToUeVector(), this.ShowTip, undefined, a);
    }
  }
  JYo(t, e) {
    var t = t.GetComponent(3)?.Actor;
    if (t?.IsValid() && e && (t = t.Mesh, e = FNameUtil_1.FNameUtil.GetDynamicFName(e), t?.DoesSocketExist(e))) {
      return t.D_GetSocketTransform(e, 0);
    } else {
      return MathUtils_1.MathUtils.DefaultTransformDouble;
    }
  }
}
(exports.LockOnDebugData = LockOnDebugData).zYo = new UE.LinearColor(1, 0, 0, 1);
LockOnDebugData.Fct = new UE.LinearColor(0, 1, 0, 1);
LockOnDebugData.ZYo = new UE.LinearColor(0, 0, 1, 1);
LockOnDebugData.eJo = new UE.LinearColor(1, 1, 0, 1);
class LockOnDebug {
  static Clear() {
    LockOnDebug.tJo.clear();
  }
  static Push(t) {
    var e;
    if (LockOnDebug.IsShowDebugLine) {
      e = new LockOnDebugData(t);
      LockOnDebug.tJo.set(t, e);
    }
  }
  static SetDebugString(t, e, a, o, i) {
    if (LockOnDebug.IsShowDebugLine && (t = LockOnDebug.tJo.get(t)) && (t.ShowTip = "角度：" + e + "\n距离：" + a + "\n移动方向：" + o.ToString(), i)) {
      t.ShowTip += "\n实际方向：" + i.ToString();
    }
  }
  static SetDebugArrow(t) {
    if (LockOnDebug.IsShowDebugLine && (t = LockOnDebug.tJo.get(t))) {
      t.ColorType = 0;
    }
  }
  static Tick(t) {
    if (LockOnDebug.IsShowDebugLine) {
      for (var [e, a] of LockOnDebug.tJo) {
        if (e.EntityHandle?.Valid) {
          a.DrawDebug(t);
        } else {
          LockOnDebug.tJo.delete(e);
        }
      }
    }
  }
}
(exports.LockOnDebug = LockOnDebug).IsShowDebugLine = false;
LockOnDebug.tJo = new Map(); //# sourceMappingURL=LockOnDebug.js.map