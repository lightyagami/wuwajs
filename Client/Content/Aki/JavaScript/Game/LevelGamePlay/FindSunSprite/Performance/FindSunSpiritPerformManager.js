"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritPerformManager = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FindSunSpiritGuideLine_1 = require("./Level/FindSunSpiritGuideLine");
const FindSunSpiritLevelFloor_1 = require("./Level/FindSunSpiritLevelFloor");
const FindSunSpiritLevelModifier_1 = require("./Level/FindSunSpiritLevelModifier");
const FindSunSpiritShootEffect_1 = require("./Level/FindSunSpiritShootEffect");
const SunSpiritActionManager_1 = require("./SunSpiritMove/SunSpiritActionManager");
const NIAGARA_SCALE_SIZE = 0.185;
class FindSunSpiritPerformManager {
  constructor() {
    this.fJf = false;
    this.gJf = "";
    this.CJf = "";
    this.E9f = "";
    this.I9f = "";
    this.T9f = 0;
    this.pJf = 0;
    this.vJf = 0;
    this.p4f = undefined;
    this.v4f = new Map();
    this.b9f = new Map();
    this.p3g = undefined;
    this.SunSpiritEntityHandleList = [];
    this.y4f = undefined;
    this.S4f = [];
    this.M4f = new Map();
    this.cMg = new Set();
    this.R9f = [];
  }
  async RefreshPerformAsync(i, t) {
    if (t) {
      await this.dMg(true);
    }
    this.mMg();
    this.p3g ||= new FindSunSpiritShootEffect_1.FindSunSpiritShootEffect();
    this.Vi();
    await this.I4f();
    await this.eKf(i);
    this.L9f();
    await this.b4f();
    await this.R4f();
    if (t) {
      await this.dMg(false);
    }
  }
  async dMg(i) {
    const t = new CustomPromise_1.CustomPromise();
    var e = () => {
      t.SetResult();
    };
    if (i) {
      ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(23, 3, e);
    } else {
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(23, e);
    }
    await t.Promise;
  }
  mMg() {
    var i = this.y4f;
    if (i) {
      for (const e of this.cMg) {
        var t = this.M4f.get(e);
        if (t?.IsInit) {
          i.ExecuteSunSpiritStopEndMontage(t);
        }
      }
    }
    this.cMg.clear();
  }
  Vi() {
    var i;
    var t;
    if (!this.fJf) {
      if ((i = ModelManager_1.ModelManager.FindSunSpiritModel.GlobalConfig)?.IsValid() && (this.fJf = true, this.T9f = i.导航线持续时间, this.E9f = i.成功导航线特效.ToAssetPathName(), this.I9f = i.失败导航线特效.ToAssetPathName(), this.pJf = i.关卡地板单位大小, this.vJf = i.扩散触发持续时间, this.gJf = i.关卡地板Niagara.ToAssetPathName(), t = i.扩散装置路径, this.p3g?.InitConfig(i.射击轨迹特效.ToAssetPathName(), i.射击终点特效.ToAssetPathName()), ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(t))) {
        this.CJf = t.AssetPathName.toString();
      }
    }
  }
  async I4f() {
    var i;
    var t;
    var e;
    if (this.p4f) {
      this.p4f.RefreshFloor();
      this.p4f.RefreshOutline();
    } else {
      i = ModelManager_1.ModelManager.FindSunSpiritModel;
      this.p4f = new FindSunSpiritLevelFloor_1.FindSunSpiritLevelFloor();
      (t = Rotator_1.Rotator.Create(0, 0, 90)).AdditionEqual(i.LevelRotator);
      (e = Vector_1.Vector.Create()).Y += this.pJf / 2;
      i.LevelQuat.RotateVector(e, e);
      e.AdditionEqual(i.LevelPosition);
      await this.p4f.SpawnFloorAsync(this.gJf, Transform_1.Transform.Create(t.Quaternion(), e, Vector_1.Vector.Create(NIAGARA_SCALE_SIZE, NIAGARA_SCALE_SIZE, NIAGARA_SCALE_SIZE)));
    }
  }
  async b4f() {
    const r = ModelManager_1.ModelManager.FindSunSpiritModel.Config;
    if (r) {
      const o = new CustomPromise_1.CustomPromise();
      const s = r.SunSpiritEntityIds;
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("虚影找日灵", s, i => {
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 48, "虚影找日灵，等待日灵实体失败", ["pbDataIdList", s]);
          }
        }
        for (const e of r.SunSpiritEntityIds) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
          if (!t) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 48, "虚影找日灵，找不到日灵实体", ["pbDataId", e]);
            }
            return;
          }
          this.SunSpiritEntityHandleList.push(t);
        }
        o.SetResult();
      });
      await o.Promise;
    }
  }
  async R4f() {
    var i = ModelManager_1.ModelManager.FindSunSpiritModel;
    var t = i.LevelConfig;
    var e = i.LevelRotator;
    var r = this.SunSpiritEntityHandleList;
    this.M4f.clear();
    let o = this.y4f;
    let s = false;
    if (!o) {
      s = true;
      o = new SunSpiritActionManager_1.SunSpiritActionManager();
      this.y4f = o;
      if ((i = ModelManager_1.ModelManager.FindSunSpiritModel.GlobalConfig)?.IsValid()) {
        o.InitByConfig(i);
      }
    }
    o.Interrupt();
    var a = [];
    let n = 0;
    for (const d of t.SunSpiritStartGridIndices) {
      var h = r[n];
      if (!h.IsInit) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 48, "虚影找日灵初始化获取实体失败");
        }
        return;
      }
      var _;
      var f = h.Entity;
      var l = f.GetComponent(1);
      var v = l.ScaledHalfHeight;
      var c = Vector_1.Vector.Create();
      this.L4f(d, v, c);
      if (s) {
        v = Transform_1.Transform.Create(l.Owner.D_GetTransform());
        _ = f.GetComponent(48)?.Disable("虚影找日灵固定位置") ?? 0;
        f = f.GetComponent(124)?.Disable("虚影找日灵固定位置") ?? 0;
        this.S4f.push({
          EntityHandle: h,
          Transform: v,
          DisableMoveHandle: _,
          DisableMoveTickHandle: f
        });
        a.push({
          MoveTarget: h,
          PerformType: 0,
          TargetLocation: c,
          TargetRotator: e
        });
      } else {
        l.SetActorLocationAndRotation(c.ToUeVector(), e.ToUeRotator(), "RefreshSunSpirit");
      }
      this.M4f.set(d, h);
      n++;
    }
    if (a.length > 0) {
      const M = new CustomPromise_1.CustomPromise();
      o.ExecuteSunSpiritMove(a, () => {
        M.SetResult();
      });
      await M.Promise;
    }
  }
  async eKf(i) {
    var t = ModelManager_1.ModelManager.FindSunSpiritModel;
    var e = t.LevelConfig;
    var r = t.LevelPlay;
    if (i) {
      var o = this.CJf;
      var s = t.LevelRotator;
      var a = e.ModifierList;
      var n = a.length;
      const g = a[r.SelectedModifierIndex].GridIndex;
      var h;
      var _ = new Map();
      var f = [];
      var l = Vector_1.Vector.Create();
      var v = [];
      for (let i = 0; i < n; i++) {
        var c = a[i].GridIndex;
        var d = this.v4f.get(c);
        if (d) {
          this.w4f(c, l);
          v.push(d.RefreshAsync(o, c === g, l, s));
          _.set(c, d);
          this.v4f.delete(c);
        } else {
          f.push(i);
        }
      }
      for (const L of this.v4f.values()) {
        if (f.length <= 0) {
          L.Clear();
        } else {
          h = a[f.pop()].GridIndex;
          this.w4f(h, l);
          v.push(L.RefreshAsync(o, h === g, l, s));
          _.set(h, L);
        }
      }
      for (const m of f) {
        var M = a[m].GridIndex;
        var S = new FindSunSpiritLevelModifier_1.FindSunSpiritLevelModifier();
        this.w4f(M, l);
        v.push(S.RefreshAsync(o, M === g, l, s));
        _.set(M, S);
      }
      this.v4f = _;
      await Promise.all(v);
    } else {
      const g = e.ModifierList[r.SelectedModifierIndex].GridIndex;
      for (var [u, p] of this.v4f) {
        p.ResetState(u === g);
      }
    }
  }
  L9f() {
    var i = ModelManager_1.ModelManager.FindSunSpiritModel;
    var t = i.LevelConfig;
    var e = i.LevelQuat;
    var r = Vector_1.Vector.Create();
    var o = Transform_1.Transform.Create();
    for (const a of t.SunSpiritStartGridIndices) {
      var s = this.b9f.get(a);
      if (!s) {
        s = new FindSunSpiritGuideLine_1.FindSunSpiritGuideLine();
        this.b9f.set(a, s);
        this.w9f(a, 0, 0, r);
        o.SetLocation(r);
        o.SetRotation(e);
        o.SetScale3D(Vector_1.Vector.OneVectorProxy);
        s.Init(o);
      }
    }
  }
  SelectModifier(i, t) {
    this.v4f.get(i)?.UpdateSelect(false);
    this.v4f.get(t)?.UpdateSelect(true);
    this.p4f?.RefreshOutline();
  }
  TriggerModifier(i) {
    this.v4f.get(i)?.Trigger(this.vJf);
    let t = undefined;
    if (this.R9f.length > 0) {
      t = this.R9f[0];
    } else {
      t = Vector_1.Vector.Create();
      this.R9f.push(t);
    }
    this.w4f(i, t);
    this.p3g?.SpawnEffect(t);
    this.p4f?.RefreshFloor();
  }
  ShowGuideLine(o, i) {
    var t = o[0];
    var t = this.b9f.get(t);
    if (t) {
      var s = ModelManager_1.ModelManager.FindSunSpiritModel.LevelConfig.LevelWidth;
      var a = this.R9f.length;
      var n = [];
      var h = o.length - 1;
      for (let r = 0; r <= h; r++) {
        var _ = o[r];
        var f = r === h ? _ : o[r + 1];
        let i = undefined;
        if (r < a) {
          i = this.R9f[r];
        } else {
          i = Vector_1.Vector.Create();
          this.R9f.push(i);
        }
        let t = 0;
        let e = 0;
        f = f - _;
        if (s < f) {
          e = 0.25;
        } else if (f < 0 && Math.abs(f) > s - 1) {
          t = 0.5;
        }
        this.w9f(_, t, e, i);
        n.push(i);
      }
      t.SpawnGuideLine(i ? this.E9f : this.I9f, n, this.T9f);
    }
  }
  async PlaySunSpiritPerformAsync(t) {
    var e = this.y4f;
    if (e) {
      var i;
      var r;
      var o = [];
      var s = ModelManager_1.ModelManager.FindSunSpiritModel;
      var a = s.LevelRotator;
      var n = s.LevelConfig.LevelWidth;
      var h = s.LevelPlay;
      if (t && t.length > 0) {
        var _ = s.LevelEndTargetList;
        var f = _.length;
        let i = h.SunSpiritNum - h.SunSpiritIndexSet.size - t.length;
        for (const L of t) {
          var l = L[0];
          var v = this.M4f.get(l);
          if (v?.IsInit) {
            var c;
            var d;
            var M = [];
            var S = v.Entity.GetComponent(1).ScaledHalfHeight;
            for (let i = 1; i < L.length; i++) {
              var u = L[i - 1];
              var p = L[i];
              var u = Math.floor(u / n) === Math.floor(p / n) ? 1 : 0;
              var g = Vector_1.Vector.Create();
              this.L4f(p, S, g);
              M.push({
                MoveTarget: v,
                PerformType: u,
                TargetLocation: g,
                TargetRotator: a
              });
            }
            if (i < f) {
              c = _[i];
              (d = Vector_1.Vector.Create()).DeepCopy(c.TargetLocation);
              d.Z += S;
              M.push({
                MoveTarget: v,
                PerformType: 0,
                TargetLocation: d,
                TargetRotator: c.TargetRotator,
                SuccessPerform: true
              });
              this.cMg.add(l);
              i++;
            }
            if (M.length > 0) {
              const m = new CustomPromise_1.CustomPromise();
              e.ExecuteSunSpiritMove(M, () => {
                m.SetResult();
              });
              o.push(m.Promise);
            }
          }
        }
      }
      for ([i, r] of this.M4f) {
        if (!this.cMg.has(i)) {
          const w = new CustomPromise_1.CustomPromise();
          e.ExecuteSunSpiritFail(r, () => {
            w.SetResult();
          });
          o.push(w.Promise);
        }
      }
      await Promise.all(o);
    }
  }
  ClearPerform(i) {
    if (i) {
      this.mMg();
    }
    this.p4f?.ClearFloor();
    this.p4f = undefined;
    this.y4f?.Clear();
    this.y4f = undefined;
    if (!i) {
      for (const e of this.S4f) {
        var t = e.EntityHandle;
        if (t.Valid) {
          (t = t.Entity).GetComponent(48)?.Enable(e.DisableMoveHandle, "虚影找日灵固定位置");
          t.GetComponent(124)?.Enable(e.DisableMoveTickHandle, "虚影找日灵固定位置");
        }
      }
    }
    for (const r of this.b9f.values()) {
      r.Clear();
    }
    for (const o of this.v4f.values()) {
      o.Clear();
    }
    this.v4f.clear();
    this.b9f.clear();
    this.M4f.clear();
    this.cMg.clear();
    this.S4f.length = 0;
  }
  L4f(i, t, e) {
    var r = this.pJf;
    var o = ModelManager_1.ModelManager.FindSunSpiritModel;
    var s = o.LevelConfig.LevelWidth;
    var a = i % s;
    var i = Math.floor(i / s);
    e.Set(a * r, 0, i * r - r / 2 + t);
    o.LevelQuat.RotateVector(e, e);
    e.AdditionEqual(o.LevelPosition);
  }
  w4f(i, t) {
    var e = this.pJf;
    var r = ModelManager_1.ModelManager.FindSunSpiritModel;
    var o = r.LevelConfig.LevelWidth;
    var s = i % o;
    var i = Math.floor(i / o);
    t.Set(s * e, e, i * e);
    r.LevelQuat.RotateVector(t, t);
    t.AdditionEqual(r.LevelPosition);
  }
  w9f(i, t, e, r) {
    var o = this.pJf;
    var s = ModelManager_1.ModelManager.FindSunSpiritModel;
    var a = s.LevelConfig.LevelWidth;
    var t = i % a + t;
    var i = Math.floor(i / a) + e;
    r.Set(t * o, 0, i * o);
    s.LevelQuat.RotateVector(r, r);
    r.AdditionEqual(s.LevelPosition);
  }
}
exports.FindSunSpiritPerformManager = FindSunSpiritPerformManager;
//# sourceMappingURL=FindSunSpiritPerformManager.js.map