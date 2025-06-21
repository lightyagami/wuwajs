"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChargeSlashScanEffectData = void 0;
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  SCAN_EFFECT_STOP_TIME = 1.6,
  TIMER_PERIOD = 5e3;
class ChargeSlashScanEffectData {
  constructor(e, a, t) {
    this.Id = 0, this.EffectActor = void 0, this.MW1 = void 0, this.zZt = 0, this.EW1 = 0, this.IW1 = new Set, this.TW1 = new Set, this.Id = e, this.EffectActor = a, this.MW1 = t, this.zZt = 0, this.EW1 = 0
  }
  Update(e) {
    if (this.zZt += e * TimeUtil_1.TimeUtil.Millisecond, this.EW1 >= ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.GetScanMaxDistance()) return !1;
    var e = UE.KismetMathLibrary.D_FInterpTo(0, ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.GetScanMaxDistance(), this.zZt, 1 / SCAN_EFFECT_STOP_TIME),
      e = (this.EW1 = e, void 0 === ChargeSlashScanEffectData.bsr && ChargeSlashScanEffectData.bW1(), ChargeSlashScanEffectData.bsr.Radius = this.EW1, TraceElementCommon_1.TraceElementCommon.SetStartLocation(ChargeSlashScanEffectData.bsr, this.MW1), TraceElementCommon_1.TraceElementCommon.SetEndLocation(ChargeSlashScanEffectData.bsr, this.MW1), TraceElementCommon_1.TraceElementCommon.SphereTrace(ChargeSlashScanEffectData.bsr, "ChargeSlashScanEffectData")),
      a = (ChargeSlashScanEffectData.RW1 = !0, Global_1.Global.BaseCharacter?.CharacterActorComponent?.Owner);
    if (e) {
      var t = ChargeSlashScanEffectData.bsr.HitResult.Actors;
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e);
        void 0 === r || r === a || this.IW1.has(r) || (ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(r, 1) && this.IW1.add(r), !r.IsA(TsBaseCharacter_1.default.StaticClass())) || 0 === (r = r).Camp || this.TW1.has(r) || (this.TW1.add(r), (r = EntitySystem_1.EntitySystem.GetComponent(r.EntityId, 205))?.Valid && r.AddTag(184255089))
      }
    }
    return !0
  }
  static bW1() {
    this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.bsr.WorldContextObject = GlobalData_1.GlobalData.World, this.bsr.bIsSingle = !1, this.bsr.bIgnoreSelf = !0, this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic), this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn), this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.KuroTrigger), this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer), this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster), void 0 === this.j3 && (this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD))
  }
}
exports.ChargeSlashScanEffectData = ChargeSlashScanEffectData, (_a = ChargeSlashScanEffectData).bsr = void 0, ChargeSlashScanEffectData.RW1 = !1, ChargeSlashScanEffectData.j3 = void 0, ChargeSlashScanEffectData.zye = () => {
  _a.RW1 ? _a.RW1 = !1 : (_a.bsr && (_a.bsr.Dispose(), _a.bsr = void 0), TimerSystem_1.TimerSystem.Remove(_a.j3), _a.j3 = void 0)
};
//# sourceMappingURL=ChargeSlashScanEffectData.js.map