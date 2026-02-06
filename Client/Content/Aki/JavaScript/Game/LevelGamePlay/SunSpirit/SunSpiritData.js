"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritData = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const SunSpiritNonePerform_1 = require("./SunSpiritPerform/SunSpiritNonePerform");
const SunSpiritNoneState_1 = require("./SunSpiritState/SunSpiritNoneState");
const SunSpiritOccupiedByGearState_1 = require("./SunSpiritState/SunSpiritOccupiedByGearState");
const SunSpiritOccupiedByPlayerState_1 = require("./SunSpiritState/SunSpiritOccupiedByPlayerState");
class SunSpiritData {
  constructor(t) {
    this.SunSpiritId = t;
    this.InstId = 0;
    this.ConfigId = 0;
    this.AreaId = 0;
    this.PlayerId = 0;
    this.PbData = undefined;
    this.ac = new SunSpiritNoneState_1.SunSpiritNoneState(this);
    this.nsm = new Queue_1.Queue();
    this.wQm = new SunSpiritNonePerform_1.SunSpiritNonePerform(this, MathUtils_1.MathUtils.DefaultTransformProxy);
    this.LHo = undefined;
    this.asm = 0;
    this.hsm = undefined;
    this.zti = undefined;
    this.lsm = 0;
    this.LQm = undefined;
    this.PQm = 0;
    this.AQm = undefined;
    this.DQm = 0;
  }
  get StateType() {
    return this.ac.StateType;
  }
  StopCurrentSunSpiritState() {
    this.ac.IsFinished = true;
  }
  StopAllSunSpiritState() {
    this.ac.IsFinished = true;
    this.nsm.Clear();
  }
  SetNextSunSpiritState(t) {
    this.nsm.Push(t);
  }
  StopAllAndSetNextSunSpiritState(t, i = false) {
    if (!i && this.nsm.Size === 0 && this.ac.IsSameState(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SunSpirit", 39, "日灵: 当前状态和目标状态相同，不执行切换");
      }
    } else {
      this.StopAllSunSpiritState();
      this.SetNextSunSpiritState(t);
    }
  }
  GetSunSpiritState() {
    return this.ac;
  }
  TickState(t) {
    if (this.ac.IsFinished) {
      this.ac.Exit();
      if (this.nsm.Size > 0) {
        this.ac = this.nsm.Pop();
      } else {
        this.ac = new SunSpiritNoneState_1.SunSpiritNoneState(this);
      }
      if (!this.ac.Enter()) {
        this.ac.IsFinished = true;
      }
    }
    if (!this.ac.IsFinished) {
      this.ac.Tick(t);
    }
  }
  GetSunSpiritPerform() {
    return this.wQm;
  }
  ChangeSunSpiritPerform(t) {
    var i = this.wQm;
    this.wQm = t;
    var t = Transform_1.Transform.Create();
    i.GetTransform(t);
    i.Destroy();
    var i = this.wQm.Init();
    if (!i) {
      this.wQm = new SunSpiritNonePerform_1.SunSpiritNonePerform(this, t);
      this.wQm.Init();
    }
  }
  SetOrUpdateSunSpiritBasicDataByProto(t) {
    this.PbData = t;
    this.ConfigId = t.A5n;
    this.PlayerId = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    this.InstId = t.r6n;
    this.AreaId = ModelManager_1.ModelManager.SunSpiritModel.GetSunSpiritAreaIdByConfigId(this.InstId, this.ConfigId);
  }
  RefreshSunSpiritStateByCachedProto(t) {
    if (this.PbData) {
      if (ModelManager_1.ModelManager.SunSpiritModel.GetIsSunSpiritEnable()) {
        if (this.PbData.oom?.rom) {
          this.StopAllAndSetNextSunSpiritState(new SunSpiritOccupiedByGearState_1.SunSpiritOccupiedByGearState(this, this.PbData.oom?.rom ?? 0, this.PbData.oom?.c5n ?? 0), t);
        } else {
          this.StopAllAndSetNextSunSpiritState(new SunSpiritOccupiedByPlayerState_1.SunSpiritOccupiedByPlayerState(this), t);
        }
      } else {
        this.StopAllAndSetNextSunSpiritState(new SunSpiritNoneState_1.SunSpiritNoneState(this), t);
      }
    }
  }
  get Location() {
    if (this.asm < Time_1.Time.Frame) {
      this.LHo ||= Vector_1.Vector.Create();
      if (!this.wQm.GetTransformData(this.LHo)) {
        return;
      }
      this.asm = Time_1.Time.Frame;
    }
    return this.LHo;
  }
  get Rotator() {
    if (this.lsm < Time_1.Time.Frame) {
      this.zti ||= Rotator_1.Rotator.Create();
      this.hsm ||= Quat_1.Quat.Create();
      if (!this.wQm.GetTransformData(undefined, this.zti)) {
        return;
      }
      this.zti.Quaternion(this.hsm);
      this.lsm = Time_1.Time.Frame;
    }
    return this.zti;
  }
  get Quaternion() {
    return this.Rotator?.Quaternion(this.hsm);
  }
  get Scale3D() {
    if (this.PQm < Time_1.Time.Frame) {
      this.LQm ||= Vector_1.Vector.Create();
      if (!this.wQm.GetTransformData(undefined, undefined, this.LQm)) {
        return;
      }
      this.PQm = Time_1.Time.Frame;
    }
    return this.LQm;
  }
  get Transform() {
    if (this.DQm < Time_1.Time.Frame) {
      this.AQm ||= Transform_1.Transform.Create();
      if (!this.wQm.GetTransform(this.AQm)) {
        return;
      }
      this.DQm = Time_1.Time.Frame;
    }
    return this.AQm;
  }
  SetLocation(t) {
    this.LHo ||= Vector_1.Vector.Create();
    this.LHo.FromUeVector(t);
    this.asm = Time_1.Time.Frame;
    this.wQm.SetTransformData(this.LHo);
  }
  SetRotation(t) {
    this.zti ||= Rotator_1.Rotator.Create();
    this.hsm ||= Quat_1.Quat.Create();
    var i = t;
    if (i instanceof Quat_1.Quat || i instanceof UE.Quat || i.X !== undefined && i.Y !== undefined && i.Z !== undefined && i.W !== undefined) {
      this.hsm.FromUeQuat(i);
      this.hsm.Rotator(this.zti);
    } else if (t instanceof Rotator_1.Rotator || t instanceof UE.Rotator || t.Pitch !== undefined && t.Roll !== undefined && t.Yaw !== undefined) {
      this.zti.FromUeRotator(t);
    }
    this.zti.Quaternion(this.hsm);
    this.lsm = Time_1.Time.Frame;
    this.wQm.SetTransformData(undefined, this.zti);
  }
  SetLocationAndRotation(t, i) {
    this.zti ||= Rotator_1.Rotator.Create();
    this.hsm ||= Quat_1.Quat.Create();
    this.LHo ||= Vector_1.Vector.Create();
    this.LHo.FromUeVector(t);
    t = i;
    if (t instanceof Quat_1.Quat || t instanceof UE.Quat || t.X !== undefined && t.Y !== undefined && t.Z !== undefined && t.W !== undefined) {
      this.hsm.FromUeQuat(t);
      this.hsm.Rotator(this.zti);
    } else if (i instanceof Rotator_1.Rotator || i instanceof UE.Rotator || i.Pitch !== undefined && i.Roll !== undefined && i.Yaw !== undefined) {
      this.zti.FromUeRotator(i);
    }
    this.zti.Quaternion(this.hsm);
    this.lsm = Time_1.Time.Frame;
    this.wQm.SetTransformData(this.LHo, this.zti);
  }
  SetScale3D(t) {
    this.LQm ||= Vector_1.Vector.Create();
    this.LQm.FromUeVector(t);
    this.PQm = Time_1.Time.Frame;
    this.wQm.SetTransformData(undefined, undefined, this.LQm);
  }
  SetTransform(t) {
    this.AQm ||= Transform_1.Transform.Create();
    this.AQm.Set(t.GetLocation(), t.GetRotation(), t.GetScale3D());
    this.DQm = Time_1.Time.Frame;
    this.wQm.SetTransform(this.AQm);
  }
}
exports.SunSpiritData = SunSpiritData;
//# sourceMappingURL=SunSpiritData.js.map