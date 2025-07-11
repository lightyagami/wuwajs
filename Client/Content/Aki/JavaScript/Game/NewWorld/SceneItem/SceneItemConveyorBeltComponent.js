"use strict";

var SceneItemConveyorBeltComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemConveyorBeltComponent = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const CharacterUnifiedStateTypes_1 = require("../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const NORMALIZE = 0.01;
const DELTATIMECHANGEVALUE = 10;
let SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent_1 = class SceneItemConveyorBeltComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Bdn = undefined;
    this.bdn = undefined;
    this.vtn = undefined;
    this.qdn = undefined;
    this.Gdn = undefined;
    this.Ndn = [];
    this.Odn = new Map();
    this.kdn = false;
    this.Fdn = false;
    this.iun = Vector_1.Vector.Create(0, 0, 0);
    this.jnr = 0;
    this.yVr = 0;
    this.lun = 0;
    this.cz = Vector_1.Vector.Create(0, 0, 0);
    this.kRe = Vector_1.Vector.Create(0, 0, 0);
    this.KHr = t => {
      if (this.Fdn && this.Bdn) {
        if (!this.lun || Math.abs(t - this.lun) > DELTATIMECHANGEVALUE) {
          this.lun = t;
        }
        var e;
        var i;
        var o;
        var s = this.Bdn.FieldType.Type === IComponent_1.EConveyorBeltFieldType.PointField;
        var n = s ? this.Entity.GetComponent(1).ActorLocationProxy : undefined;
        var h = this.lun * MathUtils_1.MathUtils.MillisecondToSecond;
        for (const r of this.Ndn) {
          if (s) {
            r.ActorLocationProxy.Subtraction(n, this.iun);
            this.iun.Normalize(NORMALIZE);
            this.iun.MultiplyEqual(this.jnr);
          }
          this.cz.DeepCopy(this.iun);
          this.cz.MultiplyEqual(h);
          this.kRe.DeepCopy(r.ActorLocationProxy);
          this.kRe.AdditionEqual(this.cz);
          if (!r.SetActorLocation(this.kRe.ToUeVector())) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("SceneItem", 35, "传送带设置位置失败", ["loc", r.ActorLocationProxy]);
            }
          }
        }
        for ([e, i] of this.Odn) {
          if (e.Valid) {
            if (s) {
              e.Entity.GetComponent(1).ActorLocationProxy.Subtraction(n, this.iun);
              this.iun.Normalize(NORMALIZE);
              this.iun.MultiplyEqual(this.jnr);
              e.DeltaConveyBeltSpeed = this.iun.ToUeVector();
            }
            o = e.SetAddMoveWorld(this.iun.ToUeVector(), h, undefined, i, undefined, undefined, undefined);
            this.Odn.set(e, o);
          }
        }
        if (this.kdn && this.qdn && this.qdn.Valid && this.Gdn.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
          if (s) {
            this.qdn.Entity.GetComponent(1).ActorLocationProxy.Subtraction(n, this.iun);
            this.iun.Normalize(NORMALIZE);
            this.iun.MultiplyEqual(this.jnr);
            this.qdn.DeltaConveyBeltSpeed = this.iun.ToUeVector();
          }
          this.yVr = this.qdn.SetAddMoveWorld(this.iun.ToUeVector(), h, undefined, this.yVr, undefined, undefined, undefined);
        }
      }
    };
    this.Vdn = (t, e) => {
      e = e.Entity;
      const i = e.GetComponent(1);
      var o = i?.CreatureData.GetEntityType();
      if (o === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        if (this.kdn = t) {
          this.qdn = e.GetComponent(178);
          this.Gdn = e.GetComponent(101);
          this.qdn.DeltaConveyBeltSpeed = this.iun.ToUeVector();
        } else {
          this.qdn.DeltaConveyBeltSpeed = undefined;
          this.qdn = undefined;
          this.Gdn = undefined;
        }
      } else if (o === Protocol_1.Aki.Protocol.kks.Proto_Npc || o === Protocol_1.Aki.Protocol.kks.Proto_Monster || o === Protocol_1.Aki.Protocol.kks.Proto_Animal || o === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        var s = e.GetComponent(45);
        if (s) {
          n = this.Odn.get(s);
          if (t) {
            if (!n) {
              this.Odn.set(s, -1);
            }
          } else if (n) {
            this.Odn.delete(s);
          }
        }
      } else if (o === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        if (e.GetComponent(156)) {
          const i = e.GetComponent(1);
          var n = this.Ndn.indexOf(i);
          if (t) {
            if (n === -1) {
              this.Ndn.push(i);
            }
          } else if (n !== -1) {
            this.Ndn.splice(n, 1);
          }
        }
      }
      this.Hdn();
    };
    this.jdn = (t, e) => {
      if (t === -1152559349 || t === -3775711) {
        this.Wdn();
      }
    };
  }
  OnInitData(t) {
    var e = t.GetParam(SceneItemConveyorBeltComponent_1)[0];
    var i = e.StateGroups.length;
    if (i > 2 || i < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 35, "状态组配置数量不对", ["num", i]);
      }
      return false;
    }
    this.bdn = e.StateGroups;
    for (let t = 0; t < i; t++) {
      var o = e.StateGroups[t];
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 35, "s", ["configGroup.EntityState", o.EntityState]);
      }
    }
    return true;
  }
  OnStart() {
    this.vtn = this.Entity.GetComponent(86);
    if (this.vtn) {
      this.vtn.AddOnEntityOverlapCallback(this.Vdn);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.jdn);
    this.Wdn();
    return true;
  }
  OnClear() {
    if (this.vtn) {
      this.vtn.RemoveOnEntityOverlapCallback(this.Vdn);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.jdn);
    return true;
  }
  OnForceTick(t) {
    this.KHr(t);
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnEnable() {
    if (!Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnEnd() {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    return true;
  }
  OnDisable(t) {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
  }
  Hdn() {
    this.Fdn = this.Ndn.length > 0 || this.kdn || this.Odn.size > 0;
    if (!this.Fdn) {
      this.lun = 0;
    }
  }
  Kdn() {
    this.Bdn = undefined;
    var t = this.Entity.GetComponent(133).State;
    let e = "";
    if (t === 1) {
      e = "常态";
    } else if (t === 2) {
      e = "激活";
    }
    for (const i of this.bdn) {
      if (i.EntityState.includes(e)) {
        this.Bdn = i;
      }
    }
    if (!this.Bdn) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 35, "传送带静止");
      }
    }
  }
  Wdn() {
    var t;
    var e;
    this.Kdn();
    if (this.Bdn) {
      if ((t = this.Bdn.FieldType.Type) === IComponent_1.EConveyorBeltFieldType.DirectionalField) {
        this.jnr = this.Bdn.MoveType.Speed;
        e = this.Bdn.FieldType.Direction;
        this.iun.X = e.X ?? 0;
        this.iun.Y = e.Y ?? 0;
        this.iun.Z = e.Z ?? 0;
        e = this.Entity.GetComponent(1).ActorRotation.RotateVectorDouble(this.iun.ToUeVector());
        this.iun.FromUeVector(e);
        this.iun.Normalize(NORMALIZE);
        this.iun.MultiplyEqual(this.jnr);
      } else if (t === IComponent_1.EConveyorBeltFieldType.PointField) {
        this.jnr = this.Bdn.MoveType.Speed;
      }
    }
  }
};
SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(147)], SceneItemConveyorBeltComponent);
exports.SceneItemConveyorBeltComponent = SceneItemConveyorBeltComponent; //# sourceMappingURL=SceneItemConveyorBeltComponent.js.map