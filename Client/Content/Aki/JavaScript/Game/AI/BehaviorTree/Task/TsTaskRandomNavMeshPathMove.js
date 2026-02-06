"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const WorldGlobal_1 = require("../../../World/WorldGlobal");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskRandomNavMeshPathMove extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveState = 0;
    this.BlackboardLocation = "";
    this.Sampling = 0;
    this.RandomRange = 0;
    this.EndDistance = 0;
    this.TurnSpeed = 0;
    this.OpenDebugNode = false;
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.IsEditor = false;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsBlackboardLocation = "";
    this.TsSampling = 0;
    this.TsRandomRange = 0;
    this.TsEndDistance = 0;
    this.TsTurnSpeed = 0;
    this.TsOpenDebugNode = false;
  }
  Constructor() {
    super.Constructor();
    this.SelectedTargetLocation = undefined;
    this.FoundPath = false;
    this.NavigationPath = undefined;
    this.CurrentNavigationIndex = 0;
    this.IsInitTsVariables = false;
    this.TsMoveState = 0;
    this.TsBlackboardLocation = "";
    this.TsSampling = 0;
    this.TsRandomRange = 0;
    this.TsEndDistance = 0;
    this.TsTurnSpeed = 0;
    this.TsOpenDebugNode = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveState = this.MoveState;
      this.TsBlackboardLocation = this.BlackboardLocation;
      this.TsSampling = this.Sampling;
      this.TsRandomRange = this.RandomRange;
      this.TsEndDistance = this.EndDistance;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsOpenDebugNode = this.OpenDebugNode;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      var e = s.CharActorComp;
      var r = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(s.CharAiDesignComp.Entity.Id, this.TsBlackboardLocation);
      if (r) {
        this.SelectedTargetLocation = WorldGlobal_1.WorldGlobal.ToUeVector(r);
        this.FindRandomPath(t, e.ActorLocation, this.SelectedTargetLocation);
        this.FoundPath = this.NavigationPath.length > 0;
        this.CurrentNavigationIndex = 1;
        var o = s.CharAiDesignComp?.Entity.GetComponent(186);
        if (o?.Valid) {
          switch (this.TsMoveState) {
            case 1:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
              break;
            case 2:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
              break;
            case 3:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Sprint);
          }
        }
        this.IsEditor = GlobalData_1.GlobalData.IsPlayInEditor;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 6, "TsTaskMoveToLocation没有获取到目标坐标", ["BehaviorTree", this.TreeAsset.GetName()], ["BlackboardLocation", this.TsBlackboardLocation]);
        }
        this.FoundPath = false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  FindRandomPath(e, r, t) {
    this.NavigationPath ||= new Array();
    var i = Vector_1.Vector.Create(r);
    var o = Vector_1.Vector.Create(t);
    var h = Vector_1.Vector.Create(t);
    h.Subtraction(i, h);
    var i = Vector_1.Vector.Dist(i, o);
    if (i < this.TsRandomRange || this.TsSampling < 1) {
      this.FoundPath = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, r, t, this.NavigationPath);
    } else {
      let s = r;
      var a = i / (this.TsSampling + 1);
      for (let i = 0; i < this.TsSampling; i++) {
        let t = Vector_1.Vector.Create();
        h.Multiply((i + 1) * a, t);
        t.Addition(Vector_1.Vector.Create(r), t);
        t = this.CalculateRandomPosition(t);
        var l = new Array();
        if (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, s, t.ToUeVector(), l)) {
          this.NavigationPath.concat(l);
        }
        s = t.ToUeVector();
      }
      o = new Array();
      if (AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, s, t, o)) {
        this.NavigationPath.concat(o);
      }
    }
  }
  CalculateRandomPosition(t) {
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(0, MathUtils_1.PI_DEG_DOUBLE);
    var s = Vector_1.Vector.Create(Vector_1.Vector.ForwardVector);
    s.RotateAngleAxis(i, Vector_1.Vector.UpVectorProxy, s);
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.TsRandomRange);
    s.Multiply(i, s).Addition(t, s);
    return s;
  }
  ReceiveTickAI(t, i, s) {
    var e;
    var r;
    if (this.FoundPath && t instanceof TsAiController_1.default) {
      t = t.AiController.CharActorComp;
      e = this.NavigationPath[this.CurrentNavigationIndex];
      if (this.TsOpenDebugNode && this.IsEditor) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(this, e.ToUeVector(), 30, 10, ColorUtils_1.ColorUtils.LinearRed);
      }
      (e = Vector_1.Vector.Create(e)).Subtraction(t.ActorLocationProxy, e);
      e.Z = 0;
      r = e.Size();
      if (this.CurrentNavigationIndex === this.NavigationPath.length - 1 && r < this.TsEndDistance) {
        this.Finish(true);
      } else {
        if (r < NAVIGATION_COMPLETE_DISTANCE) {
          this.CurrentNavigationIndex++;
        }
        e.DivisionEqual(r);
        t.SetInputDirect(e, true);
        AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(t, e, this.TsTurnSpeed);
      }
    } else {
      this.Finish(false);
    }
  }
  OnClear() {
    if (this.AIOwner instanceof TsAiController_1.default) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
    }
  }
}
exports.default = TsTaskRandomNavMeshPathMove;
//# sourceMappingURL=TsTaskRandomNavMeshPathMove.js.map