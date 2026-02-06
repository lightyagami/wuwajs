"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificScanEffectData = undefined;
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SCAN_EFFECT_STOP_TIME = 1.6;
const TIMER_PERIOD = 5000;
class SpecificScanEffectData {
  constructor(e, t, i, a = 1) {
    this.Id = 0;
    this.EffectActor = undefined;
    this.nQ1 = undefined;
    this.zZt = 0;
    this.sQ1 = 0;
    this.Ejd = 1;
    this.aQ1 = new Set();
    this.hQ1 = new Set();
    this.Id = e;
    this.EffectActor = t;
    this.nQ1 = i;
    this.zZt = 0;
    this.sQ1 = 0;
    this.Ejd = a;
  }
  Update(e) {
    this.zZt += e * TimeUtil_1.TimeUtil.Millisecond;
    if (this.sQ1 >= SpecificScanEffectData.GetScanMaxDistance()) {
      return false;
    }
    var e = UE.KismetMathLibrary.D_FInterpTo(0, SpecificScanEffectData.GetScanMaxDistance(), this.zZt, 1 / SCAN_EFFECT_STOP_TIME);
    this.sQ1 = e;
    if (SpecificScanEffectData.bsr === undefined) {
      SpecificScanEffectData.lQ1();
    }
    SpecificScanEffectData.bsr.Radius = this.sQ1;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(SpecificScanEffectData.bsr, this.nQ1);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(SpecificScanEffectData.bsr, this.nQ1);
    var e = TraceElementCommon_1.TraceElementCommon.SphereTrace(SpecificScanEffectData.bsr, "ChargeSlashScanEffectData");
    SpecificScanEffectData._Q1 = true;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Owner;
    if (e) {
      var i = SpecificScanEffectData.bsr.HitResult.Actors;
      for (let e = 0; e < i.Num(); e++) {
        var a = i.Get(e);
        if (a !== undefined && a !== t && !this.aQ1.has(a) && !(ControllerHolder_1.ControllerHolder.LevelGamePlayController.HandleScanResponse(a, this.Ejd) && this.aQ1.add(a), !a.IsA(TsBaseCharacter_1.default.StaticClass())) && (a = a).Camp !== 0 && !this.hQ1.has(a)) {
          this.hQ1.add(a);
          if ((a = EntitySystem_1.EntitySystem.GetComponent(a.EntityId, 217))?.Valid) {
            a.AddTag(184255089);
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
  static get MaxScanDistance() {
    if (this.cQ1 === undefined) {
      this.cQ1 = ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanMaxDistance ?? 0;
      this.cQ1 *= 100;
    }
    return this.cQ1;
  }
  static get MaxScanInteractionEffectDistance() {
    if (this.dQ1 === undefined) {
      this.dQ1 = ConfigManager_1.ConfigManager.LevelGamePlayConfig?.ScanShowInteractionEffectMaxDistance ?? 0;
      this.dQ1 *= 100;
    }
    return this.dQ1;
  }
  static GetScanMaxDistance() {
    return Math.max(this.MaxScanDistance, this.MaxScanInteractionEffectDistance);
  }
}
exports.SpecificScanEffectData = SpecificScanEffectData;
(_a = SpecificScanEffectData).bsr = undefined;
SpecificScanEffectData._Q1 = false;
SpecificScanEffectData.j3 = undefined;
SpecificScanEffectData.zye = () => {
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
};
SpecificScanEffectData.cQ1 = undefined;
SpecificScanEffectData.dQ1 = undefined; //# sourceMappingURL=SpecificScanEffectData.js.map