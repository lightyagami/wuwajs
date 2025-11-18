"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
class StareDetectParams {
  constructor() {
    this.NowTime = 0;
  }
}
class TsAnimNotifyStateStareDetect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.发送GameplayEvent = undefined;
    this.持续时间 = 0;
    this.距离区间 = undefined;
    this.水平区间 = undefined;
    this.垂直区间 = undefined;
    this.ParamsMap = new Map();
  }
  Constructor() {
    this.ParamsMap = new Map();
  }
  K2_NotifyBegin(t, e, s) {
    var r;
    return t.GetOwner() instanceof TsBaseCharacter_1.default && (r = new StareDetectParams(), this.ParamsMap.set(t, r), true);
  }
  K2_NotifyTick(t, e, s) {
    var r;
    var i;
    var a = t.GetOwner();
    return a instanceof TsBaseCharacter_1.default && !!(r = this.ParamsMap.get(t)) && (i = a.CharacterActorComponent, this.StareDetect(i) && (r.NowTime += s), r.NowTime > this.持续时间 && (this.ParamsMap.delete(t), this.SendGameplayEvent(a.EntityId)), true);
  }
  K2_NotifyEnd(t, e) {
    return t.GetOwner() instanceof TsBaseCharacter_1.default && (this.ParamsMap.delete(t), true);
  }
  GetNotifyName() {
    return "发送动画广播通知（基于相机位置）";
  }
  StareDetect(t) {
    var e = t.ActorForward;
    var t = t.ActorLocation;
    var t = Global_1.Global.CharacterCameraManager.D_GetCameraLocation().op_Subtraction(t);
    var s = UE.VectorDouble.CrossProduct(e, Vector_1.Vector.UpVectorDouble);
    var r = MathUtils_1.MathUtils.SignedAngleOnPlaneDeg(e, t, Vector_1.Vector.UpVectorDouble);
    var e = MathUtils_1.MathUtils.SignedAngleOnPlaneDeg(e, t, s);
    var s = t.Size();
    var t = this.AngleInRangeDeg(r, this.水平区间);
    var r = this.AngleInRangeDeg(e, this.垂直区间);
    var e = this.DistanceInRange(s, this.距离区间);
    return !!t && !!r && !!e;
  }
  SendGameplayEvent(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 17)?.SendGameplayEventToActor(this.发送GameplayEvent);
  }
  AngleInRangeDeg(t, e) {
    var t = MathUtils_1.MathUtils.NormalizeDeg180(t);
    var s = MathUtils_1.MathUtils.NormalizeDeg180(e?.X ?? 0);
    var e = MathUtils_1.MathUtils.NormalizeDeg180(e?.Y ?? 0);
    return MathUtils_1.MathUtils.IsAngleInRange(t, s, e);
  }
  DistanceInRange(t, e) {
    var s = e?.X ?? 0;
    var e = e?.Y ?? 0;
    return (s === -1 || s <= t) && (e === -1 || t <= e);
  }
}
exports.default = TsAnimNotifyStateStareDetect;
//# sourceMappingURL=TsAnimNotifyStateStareDetect.js.map