"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolMovePointsLogic = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const MAX_DISTANCE = 200;
class PatrolMovePointsLogic {
  constructor() {
    this.Hte = undefined;
    this.szo = false;
    this.azo = false;
    this.ooe = false;
    this.XJo = -1;
    this.TargetIndex = 0;
    this.TargetPoint = undefined;
    this.MovePoint = [];
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
  }
  Init(t) {
    this.Hte = t;
  }
  Reset() {
    this.TargetIndex = 0;
    this.XJo = -1;
  }
  CheckMoveLastPoint() {
    return !this.szo && this.TargetIndex === this.MovePoint.length - 1;
  }
  GetPreviousLocation() {
    if (this.XJo >= 0) {
      return this.MovePoint[this.XJo].Position;
    } else {
      return undefined;
    }
  }
  UpdateMovePoints(t) {
    let i = [];
    i = Array.isArray(t.Points) ? t.Points : [t.Points];
    let e = true;
    if (this.hzo(this.MovePoint, i)) {
      e = false;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "移动路径变更", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["PreviousIndex", this.XJo], ["MovePathLength", this.MovePoint.length], ["NewMovePathLength", i.length]);
      }
      this.XJo = -1;
      if (t.Loop && !t.CircleMove && t.StartWithInversePath !== undefined) {
        this.ooe = t.StartWithInversePath;
      }
    }
    this.MovePoint = i;
    this.szo = t.Loop;
    this.azo = t.CircleMove ?? false;
    if (t.StartIndex !== undefined && t.StartIndex >= 0 && t.StartIndex < this.MovePoint.length) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 50, "使用起始点移动", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["初始点Index", t.StartIndex], ["TargetIndex", this.TargetIndex]);
      }
      this.lzo(t.StartIndex);
    } else if (t.UsePreviousIndex && this.XJo >= 0 && this.XJo < this.MovePoint.length) {
      this.lzo(this.XJo);
      if (this.GetNextPoint() < this.MovePoint.length) {
        this.lzo(this.GetNextPoint());
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "使用上次的移动点", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["PreviousIndex", this.XJo], ["TargetIndex", this.TargetIndex]);
      }
    } else if (t.UseNearestPoint && e) {
      this._zo();
    } else {
      this.lzo(0);
    }
  }
  ChangeToNextPoint() {
    return this.uzo(this.GetNextPoint());
  }
  GetNextPoint() {
    let t = 0;
    var i;
    if (this.szo) {
      if (this.azo) {
        t = (this.TargetIndex + 1) % this.MovePoint.length;
      } else if (this.ooe) {
        if (this.TargetIndex === 0) {
          this.ooe = false;
          t = 0;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("AI", 50, "往返式巡逻：回到起点", ["PbDataID", this.Hte.CreatureData.GetPbDataId()]);
          }
          (i = Protocol_1.Aki.Protocol.Jes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
          i.V4n = true;
          Net_1.Net.Call(16567, i, () => {});
        } else {
          t = this.TargetIndex - 1;
        }
      } else if (this.TargetIndex === this.MovePoint.length - 1) {
        this.ooe = true;
        t = this.MovePoint.length - 2;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 50, "往返式巡逻：走到终点", ["PbDataID", this.Hte.CreatureData.GetPbDataId()]);
        }
        (i = Protocol_1.Aki.Protocol.Jes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId());
        i.V4n = false;
        Net_1.Net.Call(16567, i, () => {});
      } else {
        t = this.TargetIndex + 1;
      }
    } else {
      t = this.TargetIndex + 1;
    }
    return t;
  }
  OnArriveMovePoint() {
    var t = this.TargetPoint;
    if (t?.Index !== -1 && (t?.Actions && t.Actions.length > 0 && ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t.Actions, LevelGeneralContextDefine_1.EntityContext.Create(this.Hte.Entity.Id)), t?.Callback && t.Callback(), t?.IsHide)) {
      this.czo(t);
    }
  }
  czo(t) {
    this.Hte.SkeletalMesh?.SetVisibility(!t.IsHide);
    var i;
    var e = this.Hte.Entity.GetComponent(217);
    if (e) {
      i = -841499802;
      if (t.IsHide) {
        if (!e.HasTag(i)) {
          e.AddTag(i);
        }
      } else if (e.HasTag(i)) {
        e.RemoveTag(i);
      }
    }
  }
  UpdatePreIndex() {
    if (this.XJo < 0) {
      if (this.ooe) {
        this.XJo = Math.min(this.MovePoint.length, this.TargetIndex + 1);
      } else {
        this.XJo = Math.max(0, this.TargetIndex - 1);
      }
    }
    return this.XJo;
  }
  mzo(t, i) {
    return t === i || !!t && !!i && t.Index === i.Index && !!t.Position.Equals(i.Position);
  }
  hzo(i, e) {
    if (i !== e) {
      if (!i || !e) {
        return false;
      }
      if (i.length !== e.length) {
        return false;
      }
      var s = i.length;
      for (let t = 0; t < s; ++t) {
        if (!this.mzo(i[t], e[t])) {
          return false;
        }
      }
    }
    return true;
  }
  uzo(t) {
    this.XJo = this.TargetIndex;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "更新移动路径经过点下标", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["PreviousIndex", this.XJo], ["MovePoint.length", this.MovePoint.length]);
    }
    return this.lzo(t);
  }
  lzo(t) {
    this.TargetIndex = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "更新移动路径目标点下标", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["TargetIndex", t], ["MovePoint.length", this.MovePoint.length]);
    }
    if (this.TargetIndex < this.MovePoint.length) {
      this.TargetPoint = this.MovePoint[this.TargetIndex];
      return true;
    } else {
      this.TargetPoint = undefined;
      return false;
    }
  }
  _zo() {
    var t = this.UTe();
    this.TargetIndex = t - 1 >= 0 ? t - 1 : 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "使用最近的移动点", ["实体ID", this.Hte.CreatureData.GetPbDataId()], ["当前最近的点Index", t], ["TargetIndex", this.TargetIndex]);
    }
    this.lzo(t);
  }
  UTe() {
    let e = 0;
    let s = Number.MAX_VALUE;
    var h = this.Hte.ActorLocationProxy;
    for (let t = 0, i = this.MovePoint.length; t < i; t++) {
      var r = this.MovePoint[t];
      if (r.Index >= 0 && (r = Vector_1.Vector.Dist(h, r.Position)) < s) {
        s = r;
        e = t;
      }
    }
    if (e === 0 || e === this.MovePoint.length - 1 && s < MAX_DISTANCE && Vector_1.Vector.Dist(this.MovePoint[0].Position, this.MovePoint[this.MovePoint.length - 1].Position) < MAX_DISTANCE) {
      return 0;
    }
    for (let t = 0; t < this.MovePoint.length - 1; t++) {
      var i = this.MovePoint[t].Position;
      var o = this.MovePoint[t + 1].Position;
      this.jye.Set(o.X, o.Y, o.Z);
      this.jye.Subtraction(i, this.jye);
      var n = this.jye.Size();
      this.RTe.Set(h.X, h.Y, h.Z);
      this.RTe.Subtraction(o, this.RTe);
      if (!(this.jye.DotProduct(this.RTe) > 0) && !(this.RTe.Set(h.X, h.Y, h.Z), this.RTe.Subtraction(i, this.RTe), this.jye.DotProduct(this.RTe) < 0)) {
        this.jye.CrossProduct(this.RTe, this.jye);
        if ((o = this.jye.Size() / n) < s) {
          s = o;
          e = this.ooe ? t : t + 1;
        }
      }
    }
    return e;
  }
}
exports.PatrolMovePointsLogic = PatrolMovePointsLogic;
//# sourceMappingURL=PatrolMovePointsLogic.js.map