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
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NEAR_ZERO = 0.000001;
const NAVIGATION_COMPLETE_DISTANCE = 50;
const EDGE_Z = 100;
class TsTaskFlee extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.TargetKey = "";
    this.OverrideTurnSpeed = false;
    this.TurnSpeed = 0;
    this.ForceNavigation = false;
    this.LeapMode = false;
    this.LeapDistance = 0;
    this.IsInitTsVariables = false;
    this.TsTargetKey = "";
    this.TsOverrideTurnSpeed = false;
    this.TsTurnSpeed = 0;
    this.TsForceNavigation = false;
    this.TsLeapMode = false;
    this.TsLeapDistance = 0;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NavigationEndTime = -0;
    this.IsFlying = false;
    this.MoveComp = undefined;
    this.CompleteDistance = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsTargetKey = "";
    this.TsOverrideTurnSpeed = false;
    this.TsTurnSpeed = 0;
    this.TsForceNavigation = false;
    this.TsLeapMode = false;
    this.TsLeapDistance = 0;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.NavigationEndTime = -0;
    this.IsFlying = false;
    this.MoveComp = undefined;
    this.CompleteDistance = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsTargetKey = this.TargetKey;
      this.TsOverrideTurnSpeed = this.OverrideTurnSpeed;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsForceNavigation = this.ForceNavigation;
      this.TsLeapMode = this.LeapMode;
      this.TsLeapDistance = this.LeapDistance;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var s = e.AiController;
    if (s) {
      if (s.AiFlee) {
        let i = undefined;
        if (this.TsTargetKey) {
          var r = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(s.CharActorComp.Entity.Id, this.TsTargetKey);
          if (r) {
            const n = EntitySystem_1.EntitySystem.Get(r);
            if (n) {
              i = n.GetComponent(3);
            }
          }
        } else {
          r = s.AiHateList.GetCurrentTarget();
          i = r?.Entity?.GetComponent(3);
        }
        if (i) {
          r = s.CharActorComp;
          if (r) {
            const n = r.Entity;
            if (n) {
              this.MoveComp = n.GetComponent(189);
              if (this.MoveComp) {
                if (this.MoveComp.CharacterMovement.MovementMode === 5) {
                  this.IsFlying = true;
                }
                var r = r.ActorLocationProxy;
                var h = Vector_1.Vector.Create();
                r.Subtraction(i.ActorLocationProxy, h);
                h.Z = 0;
                h.Normalize(NEAR_ZERO);
                var o = new UE.Vector(-h.Y, h.X, 0);
                var a = MathUtils_1.MathUtils.GetRandomRange(s.AiFlee.FleeAngle.Min, s.AiFlee.FleeAngle.Max) * MathUtils_1.MathUtils.DegToRad;
                var l = Math.cos(a);
                var a = Math.sin(a);
                var _ = MathUtils_1.MathUtils.GetRandomRange(s.AiFlee.FleeDistance.Min, s.AiFlee.FleeDistance.Max);
                let t = 0;
                if (this.IsFlying) {
                  t = s.AiFlee.FleeHeight;
                }
                h = new UE.VectorDouble(r.X + (h.X * l + o.X * a) * _, r.Y + (h.Y * l + o.Y * a) * _, r.Z + t);
                this.NavigationPath ||= new Array();
                if (this.IsFlying) {
                  l = Vector_1.Vector.Create(r);
                  this.FoundPath = true;
                  this.NavigationPath.splice(0, this.NavigationPath.length);
                  this.NavigationPath.push(l);
                  this.NavigationPath.push(Vector_1.Vector.Create(h));
                } else {
                  this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, r.ToUeVector(), h, this.NavigationPath);
                }
                if (!this.TsForceNavigation && !this.FoundPath) {
                  o = Vector_1.Vector.Create(r);
                  this.FoundPath = true;
                  this.NavigationPath.splice(0, this.NavigationPath.length);
                  this.NavigationPath.push(o);
                  this.NavigationPath.push(Vector_1.Vector.Create(h));
                }
                if (!this.FoundPath) {
                  a = (0, puerts_1.$ref)(undefined);
                  if (UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, h, a, undefined, undefined, new UE.VectorDouble(_, _, EDGE_Z))) {
                    this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, r.ToUeVector(), (0, puerts_1.$unref)(a), this.NavigationPath);
                  }
                }
                if (this.FoundPath) {
                  this.CurrentNavigationIndex = 1;
                  this.NavigationEndTime = Time_1.Time.WorldTime + s.AiFlee.TimeMilliseconds;
                  if ((l = s.CharAiDesignComp.Entity.GetComponent(111))?.Valid) {
                    l.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
                  }
                } else {
                  this.Finish(true);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("BehaviorTree", 29, "CharacterMoveComponent Invalid", ["Type", e.GetClass().GetName()]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("BehaviorTree", 29, "Entity Invalid", ["Type", e.GetClass().GetName()]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 29, "CharacterActorComponent Invalid", ["Type", e.GetClass().GetName()]);
          }
        } else {
          this.FoundPath = false;
          this.Finish(true);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "没有配置逃跑", ["AiBaseId", s.AiBase.Id]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
  }
  ReceiveTickAI(t, i, e) {
    var s;
    var r;
    var h;
    var t = t.AiController;
    if (t) {
      if (Time_1.Time.WorldTime > this.NavigationEndTime || (s = t.CharActorComp, this.MoveComp.CharacterMovement.MovementMode === 5 ? this.IsFlying = true : this.IsFlying = false, (r = Vector_1.Vector.Create(this.NavigationPath[this.CurrentNavigationIndex])).Subtraction(s.ActorLocationProxy, r), this.IsFlying || GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(s, r), h = r.Size(), this.CompleteDistance = this.TsLeapMode ? this.TsLeapDistance : NAVIGATION_COMPLETE_DISTANCE, h < this.CompleteDistance && (this.CurrentNavigationIndex++, this.CurrentNavigationIndex === this.NavigationPath.length))) {
        this.Finish(true);
      } else {
        r.Z /= h;
        r.X /= h;
        r.Y /= h;
        s.SetInputDirect(r);
        if (this.TsOverrideTurnSpeed) {
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(s, r, this.TsTurnSpeed);
        } else {
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(s, r, t.AiWanderInfos?.AiWander ? t.AiWanderInfos.AiWander.TurnSpeed : 360);
        }
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    }
    this.MoveComp = undefined;
    this.NavigationPath = undefined;
    this.FoundPath = false;
  }
}
exports.default = TsTaskFlee;
//# sourceMappingURL=TsTaskFlee.js.map