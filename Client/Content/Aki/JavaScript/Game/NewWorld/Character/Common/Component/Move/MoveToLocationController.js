"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToLocationController = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const BaseMoveCharacter_1 = require("./BaseMoveCharacter");
const KeepFollowingMoveLogic_1 = require("./KeepFollowingMoveLogic");
const MoveToLocationLogic_1 = require("./MoveToLocationLogic");
class MoveToLocationController {
  constructor(o) {
    this.Y2l = new Queue_1.Queue();
    this.H4u = undefined;
    this.$4u = undefined;
    this.W4u = undefined;
    this.Jh = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.PushMoveInfo = () => {
      var o = Protocol_1.Aki.Protocol.ecs.create();
      var t = Protocol_1.Aki.Protocol.Zks.create();
      t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
      t.P5n = this.Hte.ActorLocationProxy;
      t.g8n = undefined;
      o.iVn = [t];
      Net_1.Net.Send(17569, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "向服务器同步NPC位置", ["EntityId", this.Jh.Id], ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["X", t.P5n.X], ["Y", t.P5n.Y], ["Z", t.P5n.Z]);
      }
    };
    this.Jh = o;
    this.Hte = o.GetComponent(3);
    this.mBe = o.GetComponent(102);
  }
  get oqn() {
    if (!this.$4u) {
      this.$4u = new BaseMoveCharacter_1.BaseMoveCharacter();
      this.$4u.Init(this.Hte.Entity);
    }
    return this.$4u;
  }
  get rqn() {
    if (!this.H4u) {
      this.H4u = new MoveToLocationLogic_1.MoveToLocation();
      this.H4u.Init(this.Hte.Entity);
    }
    return this.H4u;
  }
  get Q4u() {
    if (!this.W4u) {
      this.W4u = new KeepFollowingMoveLogic_1.KeepFollowingMoveLogic();
      this.W4u.Init(this.Hte.Entity);
    }
    return this.W4u;
  }
  UpdateMove(o) {
    if (this.oqn?.IsRunning) {
      this.oqn?.UpdateMove(o);
    } else if (this.rqn?.GetCurrentMoveToLocation() !== undefined) {
      this.rqn?.UpdateMove(o);
    } else if (this.Q4u.IsMoving()) {
      this.Q4u.UpdateMove(o);
    }
  }
  IsMoving() {
    return this.Q4u.IsMoving() || (this.oqn?.IsRunning ?? false) || this.rqn?.GetCurrentMoveToLocation() !== undefined;
  }
  MoveEnd(o) {
    if (this.oqn?.IsRunning) {
      this.oqn.MoveEnd(o);
    }
    if (this.rqn?.GetCurrentMoveToLocation() !== undefined) {
      this.rqn.MoveEnd(o);
    }
    if (this.Q4u.IsMoving()) {
      this.Q4u.MoveEnd(o);
    }
  }
  StopMove() {
    if (this.oqn?.IsRunning) {
      this.oqn.StopMove();
    }
    if (this.rqn?.GetCurrentMoveToLocation() !== undefined) {
      this.rqn.StopMove();
    }
    if (this.Q4u.IsMoving()) {
      this.Q4u.StopMove();
    }
  }
  Dispose() {
    this.oqn?.Dispose();
    this.rqn?.Dispose();
    this.Q4u?.Dispose();
  }
  GetCurrentToLocation() {
    if (this.oqn?.IsRunning) {
      return this.oqn.CurrentToLocation;
    } else if (this.rqn?.GetLastMoveToLocation() !== undefined) {
      return this.rqn.GetLastMoveToLocation();
    } else {
      return undefined;
    }
  }
  GetFollowingPosition(o, t) {
    this.Q4u?.GetTargetFollowingPosition(o, t);
  }
  StartKeepFollowingWithDataAsset(o, t, i, e = false, r, s = undefined) {
    this.Q4u.StartKeepFollowingWithDataAsset(o, t, i, e, r, s);
  }
  StartKeepFollowingWithDataAssetPath(o, t, i, e = false, r, s = undefined) {
    this.Q4u.StartKeepFollowingWithDataAssetPath(o, t, i, e, r, s);
  }
  StopKeepHoldingHands() {
    this.Q4u.StopMove();
  }
  MoveAlongPath(o) {
    this.oqn.MoveAlongPath(o);
  }
  IsMovingAlongPath() {
    return this.oqn?.IsRunning ?? false;
  }
  StopMoveAlongPath() {
    this.oqn?.StopMove();
  }
  IsMovingToLocation() {
    return this.rqn?.GetCurrentMoveToLocation() !== undefined;
  }
  StopMoveToLocation() {
    this.rqn.StopMove();
  }
  GetMoveToLocationLogic() {
    if (this.rqn?.GetCurrentMoveToLocation()) {
      return this.rqn;
    }
  }
  MoveToLocation(o, t = true) {
    if (!this.rqn) {
      return false;
    }
    var i = this.Hte.ActorLocationProxy;
    var e = o.Distance ?? MoveToLocationLogic_1.MoveToPointConfig.DefaultDistance;
    if (GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, i, o.Position) < e * e) {
      if (o.CallbackList && o.CallbackList.length !== 0) {
        for (const r of o.CallbackList) {
          if (r) {
            r(1);
          }
        }
      }
      return true;
    }
    if (t) {
      this.nqn();
    }
    return this.rqn.SetMoveToLocation(o);
  }
  NavigateMoveToLocation(o, t, i = true) {
    if (!this.rqn) {
      return false;
    }
    if (this.Hte?.WanderDirectionType === 2) {
      o.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
    }
    var e = this.Hte.ActorLocationProxy;
    var r = o.Distance ?? MoveToLocationLogic_1.MoveToPointConfig.DefaultDistance;
    if (GravityUtils_1.GravityUtils.GetDistSquared2dForActor(this.Hte, e, o.Position) < r * r) {
      if (o.CallbackList && o.CallbackList.length !== 0) {
        for (const s of o.CallbackList) {
          if (s) {
            s(1);
          }
        }
      }
      return true;
    }
    if (this.mBe?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      MoveToLocationController.jye.DeepCopy(this.Hte.FloorLocation);
    } else {
      MoveToLocationController.jye.DeepCopy(e);
    }
    e = MoveToLocationController.K4u(this.Hte, MoveToLocationController.jye, o.Position, this.Y2l, r);
    if (t && !e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "寻路失败或起点终点不在NavMesh上。", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["EntityId", this.Hte.Entity.Id]);
      }
      return false;
    } else {
      if (i) {
        this.nqn();
      }
      if (!this.Y2l.Empty) {
        o.Position.DeepCopy(this.Y2l.Pop());
        o.NextMovePointConfig = this.Y2l;
      }
      return this.rqn.SetMoveToLocation(o);
    }
  }
  nqn() {
    if (this.rqn?.GetCurrentMoveToLocation() !== undefined && (this.rqn.StopMove(), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("AI", 42, "正在移动中，停止移动。", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["EntityId", this.Hte.Entity.Id]);
    }
  }
  static K4u(o, t, i, e, r) {
    e.Clear();
    MoveToLocationController.Zxl.length = 0;
    var s = o.ActorLocationProxy;
    if (!AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(o.Owner.GetWorld(), t.ToUeVector(), i.ToUeVector(), MoveToLocationController.Zxl, true, true) || MoveToLocationController.Zxl.length === 0) {
      return false;
    }
    if (MoveToLocationController.Zxl.length > 0) {
      if (Vector_1.Vector.Dist2D(MoveToLocationController.Zxl[0], s) > r) {
        e.Push(MoveToLocationController.Zxl[0]);
      }
      for (let o = 1; o < MoveToLocationController.Zxl.length; o++) {
        e.Push(MoveToLocationController.Zxl[o]);
      }
    }
    return true;
  }
}
(exports.MoveToLocationController = MoveToLocationController).DebugDraw = false;
MoveToLocationController.jye = Vector_1.Vector.Create();
MoveToLocationController.Zxl = []; //# sourceMappingURL=MoveToLocationController.js.map