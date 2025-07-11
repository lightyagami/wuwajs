"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChargeSlashScanEffectData = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SCAN_EFFECT_STOP_TIME = 1.6;
const TIMER_PERIOD = 5000;
class ChargeSlashScanEffectData {
  constructor(e, a, t) {
    this.Id = 0;
    this.EffectActor = undefined;
    this.nQ1 = undefined;
    this.zZt = 0;
    this.sQ1 = 0;
    this.aQ1 = new Set();
    this.hQ1 = new Set();
    this.Id = e;
    this.EffectActor = a;
    this.nQ1 = t;
    this.zZt = 0;
    this.sQ1 = 0;
  }
  Update(e) {
    this.zZt += e * TimeUtil_1.TimeUtil.Millisecond;
    if (this.sQ1 >= ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.GetScanMaxDistance()) {
      return false;
    }
    var e = UE.KismetMathLibrary.D_FInterpTo(0, ControllerHolder_1.ControllerHolder.ChargeSlashGameplayController.GetScanMaxDistance(), this.zZt, 1 / SCAN_EFFECT_STOP_TIME);
    this.sQ1 = e;
    if (ChargeSlashScanEffectData.bsr === undefined) {
      ChargeSlashScanEffectData.lQ1();
    }
    ChargeSlashScanEffectData.bsr.Radius = this.sQ1;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(ChargeSlashScanEffectData.bsr, this.nQ1);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(ChargeSlashScanEffectData.bsr, this.nQ1);
    var e = TraceElementCommon_1.TraceElementCommon.SphereTrace(ChargeSlashScanEffectData.bsr, "ChargeSlashScanEffectData");
    ChargeSlashScanEffectData._Q1 = true;
    var a = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Owner;
    if (e) {
      var t = ChargeSlashScanEffectData.bsr.HitResult.Actors;
      for (let e = 0; e < t.Num(); e++) {
        var r = t.Get(e);
        if (r !== undefined && r !== a && !this.aQ1.has(r) && !(ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(r, 1) && this.aQ1.add(r), !r.IsA(TsBaseCharacter_1.default.StaticClass())) && (r = r).Camp !== 0 && !this.hQ1.has(r)) {
          this.hQ1.add(r);
          if ((r = EntitySystem_1.EntitySystem.GetComponent(r.EntityId, 205))?.Valid) {
            r.AddTag(184255089);
          }
        }
      }
    }
    return true;
  }
  static lQ1() {
    this.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.bsr.WorldContextObject = GlobalData_1.GlobalData.World;
    this.bsr.bIsSingle = false;
    this.bsr.bIgnoreSelf = true;
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.KuroTrigger);
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    this.bsr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    if (this.j3 === undefined) {
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD);
    }
  }
}
exports.ChargeSlashScanEffectData = ChargeSlashScanEffectData;
(_a = ChargeSlashScanEffectData).bsr = undefined;
ChargeSlashScanEffectData._Q1 = false;
ChargeSlashScanEffectData.j3 = undefined;
ChargeSlashScanEffectData.zye = () => {
  if (_a._Q1) {
    _a._Q1 = false;
  } else {
    if (_a.bsr) {
      _a.bsr.Dispose();
      _a.bsr = undefined;
    }
    TimerSystem_1.TimerSystem.Remove(_a.j3);
    _a.j3 = undefined;
  }
}; //# sourceMappingURL=ChargeSlashScanEffectData.js.map