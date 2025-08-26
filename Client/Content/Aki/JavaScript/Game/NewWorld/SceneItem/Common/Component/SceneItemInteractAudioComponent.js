"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemInteractAudioComponent = undefined;
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const InteractAudioMaterialByCollisionMaterial_1 = require("../../../../../Core/Define/ConfigQuery/InteractAudioMaterialByCollisionMaterial");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const TsBaseItem_1 = require("../../BaseItem/TsBaseItem");
const RTPC_MAX = 100;
let SceneItemInteractAudioComponent = class SceneItemInteractAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.Rln = undefined;
    this.Uln = false;
    this.Mass = -0;
    this.Aln = -0;
    this.BY = -0;
    this.bY = -0;
    this.Pln = -0;
    this.Anr = Vector_1.Vector.Create();
    this.xln = -0;
    this.wln = Vector_1.Vector.Create();
    this.Bln = "";
    this.bln = "physical_obj_mass";
    this.qln = "physical_obj_velocity";
  }
  static get Dependencies() {
    return [203, 0];
  }
  OnStart() {
    this.mFr();
    if (this.Uln) {
      this.n$t = this.Entity.GetComponent(203);
      this.Rln = this.n$t.StaticMesh;
      if (this.Rln) {
        this.Rln.OnComponentHit.Add((t, e, i, o, s) => {
          this.Gln(s);
        });
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 33, "未开启控物碰撞音效");
    }
    return true;
  }
  mFr() {
    var t;
    var e = this.Entity.GetComponent(0);
    var i = e.GetPbEntityInitData();
    var i = (0, IComponent_1.getComponent)(i.ComponentsData, "InteractAudioComponent");
    if (i.CollisionMaterial || i.InteractEventConfig) {
      if (i.CollisionMaterial) {
        i = i.CollisionMaterial;
        if (t = InteractAudioMaterialByCollisionMaterial_1.configInteractAudioMaterialByCollisionMaterial.GetConfig(i)) {
          this.Uln = t.IsActiveImpacter;
          this.Mass = t.ImpactMass;
          this.Aln = t.MinimumTimeBetweenAkevent * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          this.BY = t.Maxforce;
          this.bY = t.MinimumPosteventForce;
          this.Bln = t.AudioEvent;
          AudioController_1.AudioController.SetRTPCValue(this.Mass, this.bln);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 33, "该类型未配置在 交互材质音频表 中", ["type", i]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 33, "该组件未配置音效相关配置", ["PbDataId", e.GetPbDataId()]);
    }
  }
  Gln(t) {
    var e = new Date().getTime();
    if (this.Pln && e - this.Pln < this.Aln) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 33, "跳过该次碰撞音效", ["LastTime", this.Pln], ["CurTime", e], ["Interval", this.Aln]);
      }
    } else {
      this.Pln = e;
      if ((e = t.Actor) !== this.n$t.Owner) {
        this.GetVelocity();
        this.xln = this.Anr.Size();
        if (this.xln < this.bY) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 33, "速度太小 不触发碰撞音效", ["Velocity", this.xln]);
          }
        } else {
          this.Anr.MultiplyEqual(this.Mass);
          this.xln = this.Anr.Size();
          if (e instanceof TsBaseItem_1.default) {
            t = ActorUtils_1.ActorUtils.GetEntityByActor(e);
            this.wln = Vector_1.Vector.Create(t.Entity.GetComponent(128).GetVelocity());
            this.wln.MultiplyEqual(t.Entity.GetComponent(128).Mass);
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 33, "碰撞物及被碰撞物动量", ["myMomentum", this.xln], ["otherMomentum", this.wln.Size()]);
          }
          this.Anr.AdditionEqual(this.wln);
          this.xln = this.Anr.Size();
          e = MathUtils_1.MathUtils.RangeClamp(this.xln, 0, this.BY, 0, RTPC_MAX);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 33, "总动量及Rtpc值", ["totalMomentum", this.xln], ["rtpcValue", e]);
          }
          t = this.n$t.Owner;
          AudioController_1.AudioController.SetRTPCValue(e, this.qln);
          AudioController_1.AudioController.PostEvent(this.Bln, t);
        }
      }
    }
  }
  GetVelocity() {
    var t = this.n$t.Owner;
    if (t?.IsValid()) {
      this.Anr.FromUeVector(t.D_GetVelocity());
      return this.Anr;
    } else {
      return Vector_1.Vector.ZeroVectorProxy;
    }
  }
  OnClear() {
    this.Rln?.OnComponentHit.Clear();
    return true;
  }
};
SceneItemInteractAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(128)], SceneItemInteractAudioComponent);
exports.SceneItemInteractAudioComponent = SceneItemInteractAudioComponent; //# sourceMappingURL=SceneItemInteractAudioComponent.js.map