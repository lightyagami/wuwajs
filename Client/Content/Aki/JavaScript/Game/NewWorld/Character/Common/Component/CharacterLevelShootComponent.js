"use strict";

var CharacterLevelShootComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var h = arguments.length;
  var s = h < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        s = (h < 3 ? r(s) : h > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (h > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLevelShootComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../../../Global");
const LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PROFILE_BULLECT_TRACK = "CharacterLevelShootComponent_PreCalculateBulletTrack";
const DEMO_LEVEL_AIM_LINE_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/BigWorld/DA_Fx_Group_SignalSpline.DA_Fx_Group_SignalSpline";
const REFLECT_START_OFFSET = 0.1;
const BULLET_FIRE_BONE_NAME = "WeaponProp01_2";
const MAX_HIT_COUNT_ON_ONE = 10;
let CharacterLevelShootComponent = CharacterLevelShootComponent_1 = class CharacterLevelShootComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.h9r = 5000;
    this.dce = false;
    this.l9r = undefined;
    this._9r = undefined;
    this.u9r = undefined;
    this.c9r = undefined;
    this.m9r = undefined;
    this.cz = undefined;
    this.d9r = undefined;
    this.C9r = undefined;
    this.g9r = undefined;
    this.f9r = (t, e) => {};
  }
  OnInitData() {
    this.Hte = this.Entity.GetComponent(3);
    this.Lie = this.Entity.GetComponent(217);
    this._9r = new Array();
    this.u9r = Vector_1.Vector.Create();
    this.c9r = Vector_1.Vector.Create();
    this.m9r = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.g9r = Vector_1.Vector.Create();
    this.d9r = new Map();
    return true;
  }
  OnActivate() {
    this.p9r();
    this.C9r = this.Lie.ListenForTagAddOrRemove(-1167409290, this.f9r);
  }
  End() {
    this.Hte = undefined;
    this.Lie = undefined;
    this.l9r = undefined;
    this._9r = undefined;
    this.u9r = undefined;
    this.c9r = undefined;
    this.m9r = undefined;
    this.cz = undefined;
    this.C9r?.EndTask();
    this.C9r = undefined;
    this.g9r = undefined;
    return !(this.d9r = undefined);
  }
  p9r() {
    if (!this.l9r) {
      this.l9r = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.l9r.bIsSingle = true;
      this.l9r.bIgnoreSelf = true;
      this.l9r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    }
    this.l9r.WorldContextObject = this.Hte.Owner;
  }
  OnEnterAimShoot() {
    if (!!this.Lie.HasTag(1441683476) && !this.dce) {
      this.dce = true;
      LevelAimLineController_1.LevelAimLineController.PlayEffect(DEMO_LEVEL_AIM_LINE_EFFECT_PATH);
    }
  }
  OnExitAimShoot() {
    if (this.dce) {
      this.dce = false;
      LevelAimLineController_1.LevelAimLineController.StopEffect();
    }
  }
  OnTick(t) {
    if (this.dce) {
      this.v9r();
    }
  }
  GetEndPointPosition(t, e) {
    e.Multiply(this.h9r, this.m9r);
    t.Addition(this.m9r, this.m9r);
    return this.m9r;
  }
  M9r() {
    if (CharacterLevelShootComponent_1.Mz.length < 1) {
      return Vector_1.Vector.Create();
    } else {
      return CharacterLevelShootComponent_1.Mz.pop();
    }
  }
  E9r(t) {
    t.Set(0, 0, 0);
    CharacterLevelShootComponent_1.Mz.push(t);
  }
  S9r() {
    if (CharacterLevelShootComponent_1.y9r.length < 1) {
      return new Array();
    } else {
      return CharacterLevelShootComponent_1.y9r.pop();
    }
  }
  Ez(t) {
    for (const e of t) {
      this.E9r(e);
    }
    t.length = 0;
    CharacterLevelShootComponent_1.y9r.push(t);
  }
  v9r() {
    var t = this.Hte.SkeletalMesh.D_GetSocketTransform(new UE.FName(BULLET_FIRE_BONE_NAME), 0);
    var e = Global_1.Global.CharacterCameraManager;
    this.c9r.FromUeVector(e.GetActorForwardVector());
    this.c9r.Multiply(CharacterLevelShootComponent_1.I9r, this.cz);
    this.u9r.FromUeVector(e.D_GetCameraLocation());
    this.u9r.Addition(this.cz, this.u9r);
    this.m9r = this.GetEndPointPosition(this.u9r, this.c9r);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.l9r, this.u9r);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.l9r, this.m9r);
    this.u9r.FromUeVector(t ? t.GetLocation() : e.D_GetCameraLocation());
    this._9r.push(this.u9r);
    var t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.l9r, PROFILE_BULLECT_TRACK);
    let i = false;
    let o = false;
    if (t) {
      for (var r = this.l9r.HitResult; r.GetHitCount() > 0;) {
        var h = this.M9r();
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(r, 0, h);
        this._9r.push(h);
        this._9r[this._9r.length - 1].Subtraction(this._9r[this._9r.length - 2], this.c9r);
        this.c9r.Normalize();
        var s = r.Actors.Get(0);
        var n = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(s);
        if (!n) {
          i = true;
          break;
        }
        var a = n.Entity.GetComponent(173);
        if (!a) {
          i = true;
          break;
        }
        if (this.d9r.has(n.Id)) {
          var _ = this.d9r.get(n.Id);
          for (let t = 0; t < _.length; t += 2) {
            var l = _[t];
            var C = _[t + 1];
            if (h.Equals(l) && this.c9r.Equals(C)) {
              o = true;
              break;
            }
          }
          if (o) {
            break;
          }
          _.push(h);
          var v = this.M9r();
          v.DeepCopy(this.c9r);
          _.push(v);
          if (_.length > MAX_HIT_COUNT_ON_ONE) {
            o = true;
            break;
          }
        } else {
          var v = this.S9r();
          v.push(h);
          var c = this.M9r();
          c.DeepCopy(this.c9r);
          v.push(c);
          this.d9r.set(n.Id, v);
        }
        if (!a.CalculateReflectDir(this.c9r, this.c9r, s)) {
          i = true;
          break;
        }
        this.c9r.Multiply(REFLECT_START_OFFSET, this.cz);
        h.Addition(this.cz, this.cz);
        this.m9r = this.GetEndPointPosition(h, this.c9r);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.l9r, this.cz);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.l9r, this.m9r);
        TraceElementCommon_1.TraceElementCommon.LineTrace(this.l9r, PROFILE_BULLECT_TRACK);
      }
    }
    let m = -1;
    if (!i && !o) {
      m = this._9r.push(this.m9r);
    }
    if (this._9r.length > 1) {
      this._9r[1].Subtraction(this._9r[0], this.g9r);
      this.g9r.Normalize();
      LevelAimLineController_1.LevelAimLineController.UpdatePoints(this._9r, 0);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 36, "[LevelShoot]Length of SplinePoints less then 2");
    }
    if (m > -1 && m < this._9r.length) {
      this._9r.splice(m, 1);
    }
    for (let t = 1; t < this._9r.length; t++) {
      this.E9r(this._9r[t]);
    }
    for (const E of this.d9r.values()) {
      this.Ez(E);
    }
    this._9r.length = 0;
    this.d9r.clear();
  }
};
CharacterLevelShootComponent.I9r = Vector_1.Vector.ForwardVectorProxy;
CharacterLevelShootComponent.Mz = new Array();
CharacterLevelShootComponent.y9r = new Array();
CharacterLevelShootComponent = CharacterLevelShootComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(68)], CharacterLevelShootComponent);
exports.CharacterLevelShootComponent = CharacterLevelShootComponent; //# sourceMappingURL=CharacterLevelShootComponent.js.map