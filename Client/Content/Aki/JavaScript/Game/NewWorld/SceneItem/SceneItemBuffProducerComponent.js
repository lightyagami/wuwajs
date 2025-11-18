"use strict";

var SceneItemBuffProducerComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        o = (r < 3 ? h(o) : r > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBuffProducerComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BulletController_1 = require("../Bullet/BulletController");
const SceneItemBuffController_1 = require("./Controller/SceneItemBuffController");
const DISTANCE_THRESHOLD = 100;
const NORMALIZE = 0.01;
const SPEED = 600;
const MAX_BULLET_HIT_TIME = 5000;
let SceneItemBuffProducerComponent = SceneItemBuffProducerComponent_1 = class SceneItemBuffProducerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.Hte = undefined;
    this.wsn = undefined;
    this.mBe = undefined;
    this.vtn = undefined;
    this.mdn = false;
    this.ddn = false;
    this.Cdn = 1;
    this.b1n = true;
    this.$Br = false;
    this._Mr = false;
    this.eHr = 0;
    this.Lo = undefined;
    this.JUn = undefined;
    this.gdn = t => {
      this.b1n = t;
      if (this._Mr && this.Cdn === 2 && !this.b1n) {
        this.fdn();
      }
    };
    this.g_n = () => {
      if (this._Mr) {
        this.Cdn = this.mBe.State;
        switch (this.mBe.State) {
          case 2:
            if (!this.udn()) {
              this.mdn = true;
            }
            break;
          case 1:
            this.fdn();
        }
      }
    };
    this.adn = (t, e) => {
      this.ddn = false;
    };
    this.fgt = undefined;
    this.LHo = undefined;
    this.pdn = undefined;
    this.odn = "";
    this.vdn = undefined;
    this.TDe = undefined;
    this.sjo = (t, e) => {
      var i = Global_1.Global.BaseCharacter;
      if (i && (i = i.CharacterActorComponent.Entity, t.Target === i)) {
        if (this.TDe) {
          TimerSystem_1.TimerSystem.Remove(this.TDe);
          this.TDe = undefined;
        }
        EventSystem_1.EventSystem.RemoveWithTarget(this.vdn, EventDefine_1.EEventName.BulletHit, this.sjo);
        this.vdn = undefined;
        this.ldn();
      }
    };
    this._dn = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this.vdn, EventDefine_1.EEventName.BulletHit, this.sjo)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.vdn, EventDefine_1.EEventName.BulletHit, this.sjo);
      }
      this.TDe = undefined;
      this.vdn = undefined;
      this.ldn();
    };
  }
  OnInitData(t) {
    var e = t.GetParam(SceneItemBuffProducerComponent_1)[0];
    this.Lo = e;
    this.eHr = e.BuffId;
    switch (e.AddBuffMode.Type) {
      case "Adsorb":
        this.fgt = Vector_1.Vector.Create();
        this.LHo = Vector_1.Vector.Create();
        break;
      case "Immediate":
        break;
      case "FireBullet":
        this.odn = e.AddBuffMode.BulletId.toString();
        this.pdn = Vector_1.Vector.Create(e.AddBuffMode.BulletOffset.X ?? 0, e.AddBuffMode.BulletOffset.Y ?? 0, e.AddBuffMode.BulletOffset.Z ?? 0);
    }
    t = this.Entity.GetComponent(0)?.ComponentDataMap.get("Qys");
    this.JUn = MathUtils_1.MathUtils.LongToBigInt(t?.Qys?._Vn);
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(206);
    if (this.Hte) {
      this.Mne = this.Hte.CreatureData.GetPbDataId();
      this.wsn = this.Entity.GetComponent(200);
      if (this.wsn) {
        this.mBe = this.Entity.GetComponent(137);
        if (this.mBe) {
          this.b1n = true;
          this._Mr = true;
          if (ModelManager_1.ModelManager.GameModeModel.IsMulti && ModelManager_1.ModelManager.PlayerInfoModel.GetId() !== ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) {
            return !(this._Mr = false);
          } else {
            this.vtn = this.Entity.GetComponent(86);
            if (this.vtn) {
              this.b1n = false;
              this.vtn.AddOnPlayerOverlapCallback(this.gdn);
            }
            this.Cdn = this.mBe.State;
            this.Ore();
            return true;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 39, "[BuffProducerComp] 组件初始化失败 实体缺少SceneItemStateComponent", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Mne], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 29, "[BuffProducerComp] 组件初始化失败 实体缺少LevelTagComponent", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Mne], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[BuffProducerComp] 组件初始化失败 Actor Component Undefined");
      }
      return false;
    }
  }
  OnActivate() {
    if (!this.mBe.IsInState(0)) {
      this.g_n();
    }
  }
  OnTick(t) {
    if (this._Mr && this.Cdn === 2) {
      if (this.mdn) {
        this.Mdn(t);
      } else if (!this.b1n) {
        this.fdn();
      }
    }
  }
  OnEnd() {
    if (this.vtn) {
      this.vtn.RemoveOnPlayerOverlapCallback(this.gdn);
    }
    this.kre();
    return true;
  }
  Ore() {
    if (!this.$Br) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      this.$Br = true;
    }
  }
  kre() {
    if (this.$Br) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
      this.$Br = false;
    }
  }
  Mdn(t) {
    switch (this.Lo?.AddBuffMode.Type) {
      case "Adsorb":
        this.Edn(t);
        break;
      case "Immediate":
        this.ldn();
        break;
      case "FireBullet":
        this.oZo(t);
    }
  }
  ldn() {
    this.mdn = false;
    this.Sdn();
  }
  udn() {
    var t = Global_1.Global.BaseCharacter;
    if (!t) {
      return false;
    }
    var t = t.CharacterActorComponent.Entity;
    var e = t.CheckGetComponent(178);
    if (!e) {
      return false;
    }
    let i = e.GetBuffTotalStackById(this.eHr) > 0;
    e = t.CheckGetComponent(194);
    if (e) {
      i ||= (e.GetFormationBuffComp()?.GetBuffTotalStackById(this.eHr) ?? 0) > 0;
    }
    return i;
  }
  fdn() {
    if (!this.ddn && this.udn()) {
      this.ddn = true;
      SceneItemBuffController_1.SceneItemBuffController.BuffOperate(this.Entity.Id, Protocol_1.Aki.Protocol.eFs.Proto_UndoBuff, this.adn);
    }
  }
  Sdn() {
    if (!this.ddn && !this.udn()) {
      this.ddn = true;
      SceneItemBuffController_1.SceneItemBuffController.BuffOperate(this.Entity.Id, Protocol_1.Aki.Protocol.eFs.jru, this.adn);
    }
  }
  Edn(t) {
    var e;
    var i;
    if (Global_1.Global.BaseCharacter && (i = Global_1.Global.BaseCharacter.CharacterActorComponent, this.Hte.Owner.IsValid()) && i.Owner.IsValid()) {
      t = t * MathUtils_1.MathUtils.MillisecondToSecond;
      e = this.Hte.ActorLocationProxy;
      i.ActorLocationProxy.Subtraction(e, this.fgt);
      if (this.fgt.SizeSquared() < DISTANCE_THRESHOLD) {
        i = this.Hte.CreatureData.GetInitLocation();
        this.LHo.X = i.X ?? 0;
        this.LHo.Y = i.Y ?? 0;
        this.LHo.Z = i.Z ?? 0;
        this.Hte.SetActorLocation(this.LHo.ToUeVector());
        this.fgt.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
        this.LHo.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
        this.ldn();
      } else {
        this.fgt.Normalize(NORMALIZE);
        this.fgt.MultiplyEqual(SPEED * t);
        this.LHo.DeepCopy(this.Hte.ActorLocationProxy);
        this.LHo.AdditionEqual(this.fgt);
        this.Hte.SetActorLocation(this.LHo.ToUeVector());
      }
    }
  }
  oZo(t) {
    var e;
    var i;
    var s;
    var h;
    if (this.odn && (e = Global_1.Global.BaseCharacter)) {
      e = e.CharacterActorComponent;
      i = this.Hte.ActorTransform;
      s = new UE.TransformDouble(i.GetRotation(), i.GetTranslation(), i.GetScale3D());
      (h = Vector_1.Vector.Create()).DeepCopy(i.GetRotation().RotateVectorDouble(this.pdn.ToUeVector()));
      s.AddToTranslation(h.ToUeVector());
      this.vdn = BulletController_1.BulletController.CreateBulletCustomTarget(e.Actor, this.odn, s, {}, this.JUn);
      this.TDe = TimerSystem_1.TimerSystem.Delay(this._dn, MAX_BULLET_HIT_TIME);
      EventSystem_1.EventSystem.AddWithTarget(this.vdn, EventDefine_1.EEventName.BulletHit, this.sjo);
      this.mdn = false;
    }
  }
};
SceneItemBuffProducerComponent = SceneItemBuffProducerComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(149)], SceneItemBuffProducerComponent);
exports.SceneItemBuffProducerComponent = SceneItemBuffProducerComponent; //# sourceMappingURL=SceneItemBuffProducerComponent.js.map