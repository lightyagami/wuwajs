"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPasserbyComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const GameSplineComponent_1 = require("../../../../LevelGamePlay/Common/GameSplineComponent");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NPC_PB = "Gys";
const END_DISTANCE = 30;
const ENTITY_REMOVE_DELAY = 3;
const DEFAULT_MOVE_SPEED = 100;
const DEFAULT_EXCEPTION_COUNTER_TIME = 5000;
const MIN_MOVE_SPEED = 20;
const ENABLE_IK_MIN_ANGLE_DEGREE = 5;
let NpcPasserbyComponent = class NpcPasserbyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.oRe = undefined;
    this.Gce = undefined;
    this.Htn = 0;
    this.jtn = 0;
    this.szo = false;
    this.sH1 = false;
    this.tu = undefined;
    this.jnr = undefined;
    this.JLe = undefined;
    this.SBu = undefined;
    this.lf1 = false;
    this.Ktn = Vector_1.Vector.Create();
    this._f1 = DEFAULT_EXCEPTION_COUNTER_TIME;
    this.cf1 = false;
  }
  OnCreate(t) {
    this.lf1 = false;
    this.Hte = this.Entity.CheckGetComponent(2);
    this.oRe = this.Entity.GetComponent(186);
    this.Gce = this.Entity.GetComponent(46);
    return !!this.Hte && !!this.Gce;
  }
  OnStart() {
    var t = this.Hte.CreatureData;
    var e = t.ComponentDataMap.get(NPC_PB)?.Gys;
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "特效NPC没有NpcPb相关配置数据", ["PbDataId", t.GetPbDataId()]);
      }
      return false;
    }
    this.Htn = e.dTs;
    this.jtn = e.Ejn;
    e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.jtn);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "特效NPC没有行人生成器相关配置数据", ["GeneratorEntityId", this.jtn]);
      }
      return false;
    }
    var i = (0, IComponent_1.getComponent)(e.ComponentsData, "PasserbyNpcSpawnComponent");
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "获取行人NPC生成器配置失败", ["PbDataId", t.GetPbDataId()], ["GeneratorId", e?.Id]);
      }
      return false;
    }
    for (const o of i.MoveConfig.Routes) {
      if (this.Htn === o.SplineEntityId) {
        this.szo = !!o.IsLoop;
        if (o.MoveState) {
          this.tu = o.MoveState.MoveState;
          this.jnr = o.MoveState.MoveSpeed;
        }
        break;
      }
    }
    this.SBu = i.NpcMaterialDa;
    t = this.Hte.Actor.CharacterMovement;
    t.KuroSetPredictionDataMaxMoveDeltaTime(1);
    t.MaxSimulationTimeStep = 1;
    return true;
  }
  OnActivate() {
    this.InitMatFromGenerator();
    this.TryMoveAlongPath();
  }
  OnTick(t) {
    var e;
    if (!this.szo && this.lf1 && ((e = Vector_1.Vector.Dist(this.Ktn, this.Hte.ActorLocationProxy)) < this.Gce.Speed * ENTITY_REMOVE_DELAY || e <= END_DISTANCE)) {
      this.SendMessage();
    }
    if (this.CheckMoveException(t) && this._f1 <= 0) {
      this.SendMessage();
    }
    this.TryEnableIK();
  }
  HC(t) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (!e.InitializeWithSubPoints(this.Hte.CreatureData.GetPbDataId())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "特效NPC找不到对应的样条实体或实体上没有样条组件", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["SplineId", t]);
      }
      return false;
    }
    var i = e.PathPoint;
    if (i.length < 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "特效NPC样条点数量小于2", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["SplineId", t]);
      }
      return false;
    }
    var o = [];
    var s = e.GetNumberOfSplinePoints();
    let r = 0;
    for (const h of i) {
      var n = {
        Index: h.IsMain ? r : -1,
        Position: h.Point,
        MoveState: this.tu ?? IComponent_1.EPatrolMoveState.Walk,
        MoveSpeed: this.jnr ?? this.Gce?.CurrentMovementSettings?.WalkSpeed ?? DEFAULT_MOVE_SPEED
      };
      if (h.IsMain) {
        if (!this.szo && r === s - 2) {
          n.Callback = () => {
            this.lf1 = true;
          };
        }
        r++;
      }
      o.push(n);
    }
    t = o[o.length - 1].Position;
    this.Ktn.Set(t.X, t.Y, t.Z);
    this.JLe = {
      Points: o,
      Navigation: false,
      IsFly: false,
      DebugMode: true,
      Loop: this.szo,
      CircleMove: this.szo,
      UsePreviousIndex: true,
      UseNearestPoint: true,
      ReturnFalseWhenNavigationFailed: false
    };
    if (!this.szo) {
      this.JLe.Callback = t => {
        if (this.lf1) {
          this.SendMessage();
        }
      };
    }
    return true;
  }
  CheckMoveException(t) {
    if (this.Hte) {
      if (Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, this.Hte.LastActorLocation) < MIN_MOVE_SPEED * t * MathUtils_1.MathUtils.MillisecondToSecond) {
        this._f1 -= t;
        return true;
      } else {
        this._f1 = DEFAULT_EXCEPTION_COUNTER_TIME;
        return false;
      }
    } else {
      return !(this._f1 = 0);
    }
  }
  SendMessage() {
    var t;
    this.lf1 = false;
    if (!this.cf1) {
      this.cf1 = true;
      (t = Protocol_1.Aki.Protocol.Zes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
      Net_1.Net.Call(22398, t, t => {
        if (t && t.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Cvs, 19959);
        }
      });
    }
  }
  TryMoveAlongPath() {
    if (this.HC(this.Htn) && this.JLe) {
      this.Gce.MoveAlongPath(this.JLe);
    }
  }
  InitMatFromGenerator() {
    if (this.SBu) {
      this.Entity.GetComponent(196)?.MaterialController?.ApplyMaterialEffect(this.SBu);
    }
  }
  TryEnableIK() {
    var t;
    var e;
    if (this.oRe && this.Hte?.Owner?.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t = this.Hte.Owner, (e = !!this.Hte?.MoveComp?.IsMoving && Math.abs(this.oRe.DegMovementSlope) > ENABLE_IK_MIN_ANGLE_DEGREE) !== this.sH1)) {
      this.sH1 = e;
      t.IsEnableIK = e;
    }
  }
};
NpcPasserbyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(95)], NpcPasserbyComponent);
exports.NpcPasserbyComponent = NpcPasserbyComponent; //# sourceMappingURL=NpcPasserbyComponent.js.map