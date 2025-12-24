"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, o, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(e, o, h) : s(e, o)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbBlockComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stack_1 = require("../../../Core/Container/Stack");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const RbBaseComponent_1 = require("./RbBaseComponent");
const RbIdleState_1 = require("./States/RbIdleState");
const RbJumpState_1 = require("./States/RbJumpState");
const RbRollState_1 = require("./States/RbRollState");
let RbBlockComponent = class RbBlockComponent extends RbBaseComponent_1.RbBaseComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.EIe = undefined;
    this.SizeX = 1;
    this.SizeY = 1;
    this.SizeZ = 1;
    this._Sm = undefined;
    this.MIm = undefined;
    this.Xtn = undefined;
    this.EIm = undefined;
    this.l_l = false;
    this.AvailableInputDirs = [];
    this.Rne = -1;
    this.IsVisionBlock = false;
    this.Kbm = new Stack_1.Stack();
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(212);
    if (this.Hte === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbBlockComponent] OnStart ActorComp is undefined");
      }
      return false;
    }
    this.EIe = this.Entity.GetComponent(0);
    if (this.EIe === undefined) {
      return false;
    }
    this.dSm();
    var t = this.EIe.RbBlockInfo;
    if (t === undefined) {
      return false;
    }
    this.SizeX = t.rtm;
    this.SizeY = t.otm;
    this.SizeZ = t.ntm;
    this.IsVisionBlock = t.bIm !== undefined;
    if (!this.IsVisionBlock && t.TIm !== undefined) {
      this.IsMainController = t.TIm.htm;
    }
    if (this.IncId !== undefined) {
      this.ChangeMoveState(t.Y4n, true);
      if (this.Kbm.Size > 0 && this._Sm?.IsFinished()) {
        this.ChangeMoveState(this.Kbm.Pop(), true);
      }
    } else {
      this.Rkf(t.Y4n);
    }
    t = this.Entity.GetComponent(212);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RollBlock", 31, "[RbBlockComponent] OnStart", ["SizeX", this.SizeX], ["SizeY", this.SizeY], ["location", t?.ActorLocation]);
    }
    t = this.EIe?.RbBlockInfo?.idf;
    if (t) {
      for (const e of t) {
        this.OccupiedCellIndex.push(new SceneItemJigsawBaseComponent_1.JigsawIndex(e.iPs, e.rPs));
      }
    }
    return true;
  }
  RegisterToGameplay(t) {
    super.RegisterToGameplay(t);
    if (this.IsVisionBlock) {
      ControllerHolder_1.ControllerHolder.RollBlockController.RegisterVisionRollBlockToGameplay(this.IncId);
    }
    ControllerHolder_1.ControllerHolder.RollBlockController.RegisterRollBlockToGameplay(this, this.IncId);
    if (this.Kbm.Size > 0 && this.IncId !== undefined && this._Sm?.IsFinished()) {
      this.ChangeMoveState(this.Kbm.Pop(), true);
    }
  }
  OnTick(t) {
    if (this.l_l) {
      return !(this.l_l = false);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnTick] CurMoveState", ["State", this._Sm?.StateName], ["IsFinished", this._Sm?.IsFinished()], ["CacheStateInfo.Size", this.Kbm.Size]);
      }
      if ((this._Sm === undefined || this._Sm?.IsFinished()) && this.Kbm.Size > 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnTick] CurMoveState is finished, pop state", ["CacheStateInfo.Size", this.Kbm.Size], ["State", this.Kbm.Peek()]);
        }
        this.ChangeMoveState(this.Kbm.Pop(), true);
      }
      if (this._Sm?.NeedUpdate) {
        this._Sm?.Update(t);
      }
      if (!this._Sm?.NeedUpdate && this.Kbm.Size === 0 && this.Rne === -1) {
        this.Rne = this.Disable("[RollBlock] CurMoveState no need update");
      }
      return true;
    }
  }
  OnEnd() {
    if (this.IsVisionBlock) {
      ControllerHolder_1.ControllerHolder.RollBlockController.UnRegisterVisionRollBlockToGameplay(this.IncId);
    }
    return true;
  }
  dSm() {
    this.Xtn = new RbIdleState_1.RbIdleState(this);
    this.MIm = new RbRollState_1.RbRollState(this);
    this.EIm = new RbJumpState_1.RbJumpState(this);
  }
  CalculateRotationCenter(t, e) {
    var o = this.Hte.ActorTransform;
    var i = Vector_1.Vector.Create();
    var s = Vector_1.Vector.Create();
    s.FromUeVector(o.GetLocation());
    var r = Vector_1.Vector.Create(o.GetRotation().GetAxisZ());
    var h = Vector_1.Vector.Create(o.GetRotation().GetAxisX());
    var o = Vector_1.Vector.Create(o.GetRotation().GetAxisY());
    var n = Math.abs(Vector_1.Vector.DotProduct(r, Vector_1.Vector.UpVectorProxy)) > 0.9;
    var a = Vector_1.Vector.DotProduct(h, e);
    var l = Vector_1.Vector.DotProduct(o, e);
    var c = Vector_1.Vector.DotProduct(r, e);
    var _ = Math.abs(a) > 0.9;
    var d = Math.abs(c) > 0.9;
    if (n) {
      s.SubtractionEqual(Vector_1.Vector.Create(0, 0, t * this.SizeZ));
      n = _ ? Math.sign(a) : Math.sign(l);
      s.AdditionEqual((_ ? h : o).MultiplyEqual(t * (_ ? this.SizeX : this.SizeY) * n));
    } else {
      a = Math.abs(Vector_1.Vector.DotProduct(h, this.OriginRight)) > 0.9;
      s.SubtractionEqual(Vector_1.Vector.Create(0, 0, t * (a ? this.SizeX : this.SizeY)));
      if (d) {
        l = Math.sign(c);
        s.AdditionEqual(r.MultiplyEqual(t * this.SizeZ * l));
      } else {
        Vector_1.Vector.CrossProduct(r, e, i);
        s.AdditionEqual(e.MultiplyEqual(t * (a ? this.SizeY : this.SizeX)));
      }
    }
    return s;
  }
  UpdateAvailableMovement() {}
  PbDirToVector(t) {
    if (this.Hte !== undefined) {
      var e = Vector_1.Vector.Create();
      switch (t) {
        case Protocol_1.Aki.Protocol.DIm.Proto_RbForward:
          e.DeepCopy(this.OriginForward);
          break;
        case Protocol_1.Aki.Protocol.DIm.Proto_RbBackward:
          e.DeepCopy(this.OriginForward);
          e.MultiplyEqual(-1);
          break;
        case Protocol_1.Aki.Protocol.DIm.Proto_RbLeft:
          e.DeepCopy(this.OriginRight);
          e.MultiplyEqual(-1);
          break;
        case Protocol_1.Aki.Protocol.DIm.Proto_RbRight:
          e.DeepCopy(this.OriginRight);
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[PbDirToVector] 未知的方向", ["Dir", t]);
          }
          return;
      }
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "[PbDirToVector] ActorComp is undefined");
    }
  }
  ChangeMoveState(t, e = false) {
    if (this.MIm === undefined || this.Xtn === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[ChangeMoveState] MoveStates are undefined");
      }
      if (!this.Entity.IsStart) {
        this.Rkf(t);
      }
    } else if (e || ControllerHolder_1.ControllerHolder.RollBlockController.IsCurrentIncId(this.IncId) || this._Sm?.IsFinished()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[ChangeMoveState]", ["State", t]);
      }
      if (t.NSm !== undefined) {
        this.mSm(this.Xtn, t.NSm);
      } else if (t.FSm !== undefined) {
        if (t.FSm.SL_?.XDs !== undefined) {
          this.mSm(this.MIm, t.FSm.SL_.XDs);
        } else if (t.FSm.SL_?.RIm !== undefined) {
          this.mSm(this.EIm, t.FSm.SL_.RIm);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[ChangeMoveState] 未知的状态", ["State", t]);
      }
    } else {
      this.Rkf(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[ChangeMoveState] 当前IncId不是当前IncId，不改变状态, 缓存起来", ["IncId", this.IncId], ["Active", this.Active], ["CacheStateInfo.Size", this.Kbm.Size]);
      }
      if (this.Rne !== -1) {
        this.Enable(this.Rne, "[RollBlock] CurMoveState need update");
        this.Rne = -1;
      }
    }
  }
  mSm(t, e) {
    if (t !== undefined && this._Sm !== t) {
      this._Sm?.Exit();
      this._Sm = t;
      this._Sm?.Enter(e);
      if (this._Sm?.NeedUpdate && this.Rne !== -1) {
        this.Enable(this.Rne, "[RollBlock] CurMoveState need update");
        this.Rne = -1;
        this.l_l = true;
      } else if (!this._Sm?.NeedUpdate && this.Rne === -1 && this.Kbm.Size === 0) {
        this.Rne = this.Disable("[RollBlock] CurMoveState no need update");
      }
    }
  }
  Rkf(t) {
    if (this.IncId === undefined || !ControllerHolder_1.ControllerHolder.RollBlockController.IsCurrentIncId(this.IncId)) {
      if (t.NSm !== undefined) {
        this.Kbm.Clear();
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[CacheNewMoveState] RemoveCacheStateInfo");
      }
    }
    this.Kbm.Push(t);
  }
  get Transform() {
    return this.Hte.ActorTransform;
  }
  get CreatureDataId() {
    return this.EIe.GetCreatureDataId();
  }
  SetActorTransform(t) {
    var e = this.Hte;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[SetActorLocationAndRotation] ActorComp is undefined");
      }
    } else {
      e.SetActorTransform(t, "RollBlockController");
    }
  }
  GetActor() {
    return this.Hte?.Owner;
  }
  get CurState() {
    return this._Sm?.StateName ?? 1;
  }
  IsMoving() {
    return !this.IsVisionBlock && this.CurState !== 1;
  }
  SetActorLocationAndRotation(t, e) {
    var o = this.Hte;
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[SetActorLocation] ActorComp is undefined");
      }
    } else {
      o.SetActorLocationAndRotation(t.ToUeVector(), e.ToUeRotator(), "RollBlockController");
    }
  }
};
RbBlockComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(329)], RbBlockComponent);
exports.RbBlockComponent = RbBlockComponent; //# sourceMappingURL=RbBlockComponent.js.map