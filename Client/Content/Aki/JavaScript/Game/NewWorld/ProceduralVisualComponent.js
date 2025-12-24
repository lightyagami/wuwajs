"use strict";

var ProceduralVisualComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, r) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, r);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        s = (n < 3 ? i(s) : n > 3 ? i(e, o, s) : i(e, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProceduralVisualComponent = undefined;
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const IComponent_1 = require("../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../Common/TimeUtil");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const DEFAULT_ROTATION_LERP_SPEED = 0.1;
let ProceduralVisualComponent = ProceduralVisualComponent_1 = class ProceduralVisualComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.Wwf = Vector_1.Vector.Create(1, 0, 0);
  }
  OnInitData(t) {
    t = t.GetParam(ProceduralVisualComponent_1)[0];
    this.Lo = t;
    return !!this.Lo;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(212);
    return !!this.Hte && (this.Wwf.DeepCopy(this.Hte.ActorForwardProxy), true);
  }
  OnTick(t) {
    if (this.Lo) {
      for (const e of this.Lo.Configs) {
        if (e.Type === IComponent_1.EProceduralVisualType.LookAt) {
          this.Tnf(t, e);
        }
      }
    }
  }
  Tnf(r, i) {
    if (this.Hte && i) {
      var n = ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(i.Condition, this.Hte?.Owner);
      var s = i.RotateNode;
      let o = undefined;
      if (o = s ? this.Hte.GetReferenceActor(s) : this.Hte.Owner) {
        let t = DEFAULT_ROTATION_LERP_SPEED;
        if (i.MaxAngleSpeed && i.MaxAngleSpeed > 0) {
          t = i.MaxAngleSpeed / TimeUtil_1.TimeUtil.InverseMillisecond;
        }
        s = Rotator_1.Rotator.Create();
        if (!n) {
          n = Rotator_1.Rotator.Create();
          this.Wwf.Rotation(n);
          if (o !== this.Hte.Owner) {
            this.Wwf.DeepCopy(this.Hte.ActorForwardProxy);
          }
          const l = Rotator_1.Rotator.Create(o.K2_GetActorRotation());
          if (l.Equals2(n)) {
            return undefined;
          } else {
            MathUtils_1.MathUtils.RotatorInterpConstantTo(l, n, r, t, s);
            o.K2_SetActorRotation(s.ToUeRotator(), true);
            return;
          }
        }
        n = Vector_1.Vector.Create();
        let e = undefined;
        switch (i.Target.Type) {
          case IComponent_1.ELookAtTargetType.Entity:
            e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i.Target.EntityId)?.Entity;
            break;
          case IComponent_1.ELookAtTargetType.Player:
            e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
        }
        if (e) {
          var a = e.GetComponent(1);
          if (a) {
            n.DeepCopy(a.ActorLocation);
          }
          n.SubtractionEqual(this.Hte.ActorLocationProxy);
          n.Z = 0;
          n.Normalize();
          const l = Rotator_1.Rotator.Create();
          n.Rotation(l);
          MathUtils_1.MathUtils.RotatorInterpConstantTo(Rotator_1.Rotator.Create(o.K2_GetActorRotation()), l, r, t, s);
          o.K2_SetActorRotation(s.ToUeRotator(), true);
        }
      }
    }
  }
};
ProceduralVisualComponent = ProceduralVisualComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(341)], ProceduralVisualComponent);
exports.ProceduralVisualComponent = ProceduralVisualComponent; //# sourceMappingURL=ProceduralVisualComponent.js.map