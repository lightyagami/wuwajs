"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskFollowTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Source = undefined;
    this.Angle = 0;
    this.Length = 0;
    this.Speed = 0;
    this.StandSpeed = 0;
    this.Radius = 0;
    this.NavigationRadius = 0;
    this.NavigationPath = undefined;
    this.MaxNavigationMillisecond = 0;
    this.NavigationEndTime = -0;
    this.FoundPath = false;
    this.CurrentNavigationIndex = 0;
    this.FollowPointName = "FollowPoint";
    this.IsShowCube = false;
    this.Tags = undefined;
    this.WaitTimeName = "WaitTimeName";
    this.WaitTime = 0;
    this.BeginTimeName = "BeginTimeName";
    this.BeginTime = 0;
    this.IsHasName = "IsHasName";
    this.IsHas = false;
    this.IsInTag = false;
    this.IsInitTsVariables = false;
    this.TsAngle = 0;
    this.TsLength = 0;
    this.TsSpeed = 0;
    this.TsStandSpeed = 0;
    this.TsRadius = 0;
    this.TsNavigationRadius = 0;
    this.TsMaxNavigationMillisecond = -0;
    this.TsFollowPointName = "";
    this.TsIsShowCube = false;
    this.TsTags = undefined;
    this.TsWaitTime = 0;
    this.TsBeginTimeName = "";
    this.TsIsHasName = "";
    this.TsIsInTag = false;
  }
  Constructor() {
    super.Constructor();
    this.Source = undefined;
    this.NavigationPath = undefined;
    this.NavigationEndTime = -0;
    this.FoundPath = false;
    this.CurrentNavigationIndex = 0;
    this.BeginTime = 0;
    this.IsHas = false;
    this.IsInitTsVariables = false;
    this.TsAngle = 0;
    this.TsLength = 0;
    this.TsSpeed = 0;
    this.TsStandSpeed = 0;
    this.TsRadius = 0;
    this.TsNavigationRadius = 0;
    this.TsMaxNavigationMillisecond = -0;
    this.TsFollowPointName = "";
    this.TsIsShowCube = false;
    this.TsTags = undefined;
    this.TsWaitTime = 0;
    this.TsBeginTimeName = "";
    this.TsIsHasName = "";
    this.TsIsInTag = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsAngle = this.Angle;
      this.TsLength = this.Length;
      this.TsSpeed = this.Speed;
      this.TsStandSpeed = this.StandSpeed;
      this.TsRadius = this.Radius;
      this.TsNavigationRadius = this.NavigationRadius;
      this.TsMaxNavigationMillisecond = this.MaxNavigationMillisecond;
      this.TsFollowPointName = this.FollowPointName;
      this.TsIsShowCube = this.IsShowCube;
      this.TsTags = new Array();
      for (let t = 0, i = this.Tags.Num(); t < i; t++) {
        this.TsTags.push(this.Tags.Get(t));
      }
      this.TsWaitTime = this.WaitTime;
      this.TsBeginTimeName = this.BeginTimeName;
      this.TsIsHasName = this.IsHasName;
      this.TsIsInTag = this.IsInTag;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    this.GetPath(t, i);
  }
  ReceiveTickAI(t, i, s) {
    var e = t.AiController;
    if (e) {
      this.DelayDie(t);
      if ((e = e.CharActorComp).Entity.CheckGetComponent(215).HasTag(-1371021686)) {
        e.SetInputDirect(Vector_1.Vector.ZeroVector);
        this.OnClear();
      } else {
        this.GetPath(t, i);
        if (this.FoundPath) {
          if (Time_1.Time.WorldTime > this.NavigationEndTime) {
            this.Finish(false);
          } else {
            (t = Vector_1.Vector.Create(this.NavigationPath[this.CurrentNavigationIndex])).Subtraction(e.ActorLocationProxy, t);
            t.Z = 0;
            if ((i = t.Size()) < (e.Owner.GetMovementComponent()?.Velocity.Size() ?? 0) / ((this.TsSpeed ?? 1) * MathUtils_1.MathUtils.DegToRad) + NAVIGATION_COMPLETE_DISTANCE && (this.CurrentNavigationIndex++, this.CurrentNavigationIndex === this.NavigationPath.length)) {
              this.Finish(true);
            } else {
              t.DivisionEqual(i);
              e.SetInputDirect(t, true);
              AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(e, t, this.TsSpeed);
            }
          }
        }
      }
    } else {
      this.FinishExecute(false);
    }
  }
  GetPath(t, i) {
    var s = t.AiController;
    if (s) {
      var e = s.CharActorComp;
      var h = e.Entity.CheckGetComponent(0);
      var h = ModelManager_1.ModelManager.CreatureModel.GetEntityId(h.GetSummonerId());
      if (h !== 0) {
        this.Source = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(h);
        var h = Vector_1.Vector.Create();
        this.Source.ActorForwardProxy.RotateAngleAxis(this.TsAngle, Vector_1.Vector.UpVectorProxy, h);
        h.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
        h.Multiply(this.TsLength, h);
        h.Addition(this.Source.ActorLocationProxy, h);
        if (this.TsIsShowCube) {
          this.DrawCube(new UE.TransformDouble(h.ToUeVector()), 5, 156);
        }
        var r = Vector_1.Vector.DistSquared(h, e.ActorLocationProxy);
        if (this.TsIsShowCube) {
          this.DrawCube(new UE.TransformDouble(e.ActorLocation), 5, 0);
        }
        if (r > this.TsNavigationRadius * this.TsNavigationRadius || e.Entity.CheckGetComponent(215).HasTag(498191540)) {
          this.NavigationPath ||= new Array();
          this.NavigationPath.length = 0;
          if (r <= this.TsRadius * this.TsRadius) {
            ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(s.CharAiDesignComp.Entity.Id, "FollowIsCanInput", true);
            e.Entity.CheckGetComponent(184).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
            this.OnClear();
            return;
          }
          this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(t, e.ActorLocation, h.ToUeVector(), this.NavigationPath);
          if (this.NavigationPath.length > 0) {
            ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(s.CharAiDesignComp.Entity.Id, this.TsFollowPointName, this.NavigationPath[this.NavigationPath.length - 1].X, this.NavigationPath[this.NavigationPath.length - 1].Y, this.NavigationPath[this.NavigationPath.length - 1].Z);
          }
          this.CurrentNavigationIndex = 1;
          this.NavigationEndTime = Time_1.Time.WorldTime + this.TsMaxNavigationMillisecond;
          e.Entity.CheckGetComponent(184).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(s.CharAiDesignComp.Entity.Id, "FollowIsCanInput", false);
        }
        if (r <= this.TsRadius * this.TsRadius && e.Entity.CheckGetComponent(215).HasTag(248240472)) {
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(e, this.Source.ActorForwardProxy, this.TsStandSpeed);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 22, "没有召唤Source对象 或者没有setRole", ["Type", t.GetClass().GetName()]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  DelayDie(t) {
    if (!(t instanceof TsAiController_1.default)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 22, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    var i = t.AiController.CharActorComp;
    if (!i) {
      return false;
    }
    var s;
    var i = i.Entity.CheckGetComponent(0);
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(i.GetSummonerId());
    this.IsHas = !!ControllerHolder_1.ControllerHolder.BlackboardController.GetBooleanValueByEntity(t.AiController.CharAiDesignComp.Entity.Id, this.TsIsHasName);
    if (!this.Source && i) {
      this.Source = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(i);
    }
    if (!this.Source) {
      return false;
    }
    let e = false;
    for (const r of this.TsTags) {
      var h = this.Source.Entity.CheckGetComponent(215).HasTag(r?.TagId);
      if (this.TsIsInTag && h || !this.TsIsInTag && !h) {
        if (!this.IsHas) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(t.AiController.CharAiDesignComp.Entity.Id, this.TsBeginTimeName, Time_1.Time.WorldTime);
          ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(t.AiController.CharAiDesignComp.Entity.Id, this.TsIsHasName, true);
          this.IsHas = true;
        }
        e = true;
      }
    }
    if (e) {
      s = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t.AiController.CharAiDesignComp.Entity.Id, this.TsBeginTimeName);
      return (s = Time_1.Time.WorldTime - (s || 0)) >= this.TsWaitTime && (i !== 0 && ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(i) && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClearFollowData, t.AiController.CharAiDesignComp.Entity.Id), true);
    } else {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(t.AiController.CharAiDesignComp.Entity.Id, this.TsIsHasName, false);
      return false;
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    }
    this.NavigationPath = undefined;
    this.Source = undefined;
    this.FoundPath = false;
  }
  DrawCube(t, i, s) {
    var e;
    var h;
    var r;
    if (t) {
      s = new UE.LinearColor(s, s, s, s);
      r = t.GetLocation();
      e = new UE.Vector(10, 10, 10);
      e = new UE.VectorDouble(e.X * 0.5, e.Y * 0.5, e.Z * 0.5);
      h = t.Rotator();
      UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, r, e, s, h, i, 30);
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(0.5, 0.5, 0.5));
      e = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-0.5, -0.5, -0.5));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, r, e, s, i, 15);
      h = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(0.5, -0.5, 0.5));
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-0.5, 0.5, 0.5));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, h, r, s, i, 15);
    }
  }
}
exports.default = TsTaskFollowTarget;
//# sourceMappingURL=TsTaskFollowTarget.js.map