"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const FRONT_RANDOM_RAD = 0.26;
const HALF_PI_DEG = 90;
const DOUBLE_PI_DEG = 360;
const INSPECTION_INTERVAL = 200;
const DEBUG_SEGMENTS = 10;
const DEBUG_RADIUS = 30;
const DEBUG_TIME = 2.5;
const TURN_COMPLETE_DEG = 30;
const NAVIGATION_COMPLETE_DISTANCE = 2500;
const DEBUG_MODE = true;
class TsTaskBigAnimalEscape extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.EnemyKey = "";
    this.TurnSpeed = 0;
    this.IsInitTsVariables = false;
    this.TsEnemyKey = "";
    this.TsTurnSpeed = 0;
    this.ActorComp = undefined;
    this.TargetActorComp = undefined;
    this.Initialized = false;
    this.AngleMin = 0;
    this.AngleMax = 0;
    this.InnerDiameter = 0;
    this.OuterDiameter = 0;
    this.EscapeEndTime = 0;
    this.FoundLocation = false;
    this.EscapeLocation = undefined;
    this.OptimalDirections = undefined;
    this.FoundPath = false;
    this.MovePath = undefined;
    this.CurrentMoveIndex = 0;
    this.NeedTurn = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsEnemyKey = "";
    this.TsTurnSpeed = 0;
    this.ActorComp = undefined;
    this.TargetActorComp = undefined;
    this.Initialized = false;
    this.AngleMin = 0;
    this.AngleMax = 0;
    this.InnerDiameter = 0;
    this.OuterDiameter = 0;
    this.EscapeEndTime = 0;
    this.FoundLocation = false;
    this.EscapeLocation = undefined;
    this.OptimalDirections = undefined;
    this.FoundPath = false;
    this.MovePath = undefined;
    this.CurrentMoveIndex = 0;
    this.NeedTurn = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsEnemyKey = this.EnemyKey;
      this.TsTurnSpeed = this.TurnSpeed;
    }
  }
  ReceiveExecuteAI(t, i) {
    var s;
    var h;
    if (t instanceof TsAiController_1.default) {
      s = t.AiController;
      if (this.InitConfig(s)) {
        this.InitTsVariables();
        this.ActorComp = s.CharActorComp;
        if (this.TsEnemyKey && (h = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(this.ActorComp.Entity.Id, this.TsEnemyKey)) && (h = EntitySystem_1.EntitySystem.Get(h))) {
          this.TargetActorComp = h.GetComponent(3);
        }
        this.TargetActorComp ||= Global_1.Global.BaseCharacter.CharacterActorComponent;
        this.InitData();
        h = Vector_1.Vector.Create();
        this.ActorComp.ActorLocationProxy.Subtraction(this.TargetActorComp.ActorLocationProxy, h);
        h.Z = 0;
        h.Normalize();
        this.FindOptimalDirections(h);
        if (this.OptimalDirections.length === 0) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("BehaviorTree", 29, "无可行方向，请检查逻辑和配置", ["EntityId: ", this.ActorComp.Entity.Id]);
          }
          this.Finish(true);
        } else {
          this.FindEscapeLocation();
          this.FindMovePath();
          this.EscapeEndTime = Time_1.Time.WorldTime + s.AiFlee.TimeMilliseconds;
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  InitConfig(t) {
    if (!this.Initialized) {
      var i = t.AiFlee;
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 29, "没有配置逃跑", ["AiBaseId", t.AiBase.Id]);
        }
        return false;
      }
      this.AngleMin = i.FleeAngle.Min;
      this.AngleMax = i.FleeAngle.Max;
      this.InnerDiameter = i.FleeDistance.Min;
      this.OuterDiameter = i.FleeDistance.Max;
      this.Initialized = true;
    }
    return true;
  }
  InitData() {
    this.OptimalDirections ||= new Array();
    this.EscapeLocation ||= new UE.VectorDouble();
    this.MovePath ||= new Array();
    this.CurrentMoveIndex = 1;
  }
  FindOptimalDirections(i) {
    var s = this.ActorComp.ActorForwardProxy;
    var h = Math.max(this.AngleMax - this.AngleMin, HALF_PI_DEG);
    var e = Vector_1.Vector.Create();
    i.Multiply(-1, e);
    var r = DOUBLE_PI_DEG / HALF_PI_DEG;
    var o = new Array();
    for (let t = 0; t < r; t++) {
      var a = t * HALF_PI_DEG;
      var _ = Vector_1.Vector.Create();
      s.RotateAngleAxis(a, this.ActorComp.ActorUpProxy, _);
      var a = MathUtils_1.MathUtils.GetAngleByVectorDot(e, _);
      if (!(a < HALF_PI_DEG) && !(h < (a = MathUtils_1.MathUtils.GetAngleByVectorDot(i, _)))) {
        o.push([_, a]);
      }
    }
    o.sort((t, i) => t[1] - i[1]);
    for (const t of o) {
      this.OptimalDirections.push(t[0]);
    }
  }
  FindEscapeLocation() {
    var i = Vector_1.Vector.Create();
    var s = (0, puerts_1.$ref)(undefined);
    for (const r of this.OptimalDirections) {
      for (let t = this.OuterDiameter; t >= this.InnerDiameter; t -= INSPECTION_INTERVAL) {
        r.Multiply(t, i);
        i.AdditionEqual(this.ActorComp.ActorLocationProxy);
        var h = t * Math.sin(FRONT_RANDOM_RAD);
        this.FoundLocation = UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(GlobalData_1.GlobalData.World, i.ToUeVectorOld(), s, h);
        if (this.FoundLocation) {
          break;
        }
      }
      if (this.FoundLocation) {
        this.EscapeLocation.X = (0, puerts_1.$unref)(s).X;
        this.EscapeLocation.Y = (0, puerts_1.$unref)(s).Y;
        this.EscapeLocation.Z = (0, puerts_1.$unref)(s).Z;
        break;
      }
    }
    if (!this.FoundLocation) {
      var e = this.OptimalDirections[0];
      for (let t = this.InnerDiameter; t > 0; t -= INSPECTION_INTERVAL) {
        e.Multiply(t, i);
        i.AdditionEqual(this.ActorComp.ActorLocationProxy);
        this.FoundLocation = UE.NavigationSystemV1.K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, i.ToUeVectorOld(), s, undefined, undefined);
        if (this.FoundLocation) {
          this.EscapeLocation.X = (0, puerts_1.$unref)(s).X;
          this.EscapeLocation.Y = (0, puerts_1.$unref)(s).Y;
          this.EscapeLocation.Z = (0, puerts_1.$unref)(s).Z;
          break;
        }
      }
    }
  }
  FindMovePath() {
    if (this.FoundLocation) {
      this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(GlobalData_1.GlobalData.World, this.ActorComp.ActorLocation, this.EscapeLocation, this.MovePath);
      if (DEBUG_MODE && GlobalData_1.GlobalData.IsPlayInEditor && this.FoundPath) {
        for (let t = 0, i = this.MovePath.length; t < i; ++t) {
          UE.KismetSystemLibrary.D_DrawDebugSphere(this, this.MovePath[t].ToUeVector(), DEBUG_RADIUS, DEBUG_SEGMENTS, ColorUtils_1.ColorUtils.LinearGreen, DEBUG_TIME);
        }
      }
      if (!this.FoundPath) {
        this.GenerateFailurePath();
      }
    } else {
      this.GenerateFailurePath();
    }
  }
  GenerateFailurePath() {
    var t = Vector_1.Vector.Create();
    this.OptimalDirections[0].Multiply(INSPECTION_INTERVAL, t);
    t.AdditionEqual(this.ActorComp.ActorLocationProxy);
    var i = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy);
    this.MovePath.splice(0, this.MovePath.length);
    this.MovePath.push(i);
    this.MovePath.push(t);
    this.FoundPath = true;
    if (DEBUG_MODE && GlobalData_1.GlobalData.IsPlayInEditor) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(this, this.EscapeLocation, DEBUG_RADIUS, DEBUG_SEGMENTS, ColorUtils_1.ColorUtils.LinearRed, DEBUG_TIME);
    }
  }
  ReceiveTickAI(t, i, s) {
    var h;
    var e;
    var r;
    if (t.AiController && this.ActorComp?.Valid) {
      if (Time_1.Time.WorldTime > this.EscapeEndTime) {
        this.Finish(true);
      } else {
        t = this.ActorComp.Entity.GetComponent(104);
        (h = Vector_1.Vector.Create(this.MovePath[this.CurrentMoveIndex])).SubtractionEqual(this.ActorComp.ActorLocationProxy);
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, h);
        e = h.SizeSquared();
        h.Normalize();
        r = MathUtils_1.MathUtils.GetAngleByVectorDot(this.ActorComp.ActorForwardProxy, h);
        this.NeedTurn = r > TURN_COMPLETE_DEG;
        if (this.CurrentMoveIndex === 1 && this.NeedTurn) {
          if (t?.Valid) {
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
          }
          this.ActorComp.ClearInput();
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.ActorComp, h, this.TsTurnSpeed);
        } else {
          if (t?.Valid) {
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
          }
          if (e < NAVIGATION_COMPLETE_DISTANCE && (this.CurrentMoveIndex++, this.CurrentMoveIndex === this.MovePath.length)) {
            this.Finish(true);
          } else {
            this.ActorComp.SetInputDirect(h);
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(this.ActorComp, h, this.TsTurnSpeed);
          }
        }
      }
    } else {
      this.Finish(false);
    }
  }
  OnClear() {
    this.OptimalDirections.length = 0;
    this.FoundLocation = false;
    this.FoundPath = false;
    this.MovePath.length = 0;
  }
}
exports.default = TsTaskBigAnimalEscape;
//# sourceMappingURL=TsTaskBigAnimalEscape.js.map