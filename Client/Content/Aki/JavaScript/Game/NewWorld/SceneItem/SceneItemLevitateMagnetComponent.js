"use strict";

var SceneItemLevitateMagnetComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(t, i, r) : s(t, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemLevitateMagnetComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent");
const COS_45 = Math.cos(Math.PI * 45 / 180);
let SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent_1 = class SceneItemLevitateMagnetComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.Xln = undefined;
    this.Ffn = undefined;
    this.Lie = undefined;
    this.Vfn = undefined;
    this.sxr = -1;
    this.xEr = undefined;
    this.Hfn = undefined;
    this.Hme = (0, puerts_1.$ref)(undefined);
    this.jfn = 0;
    this.Wfn = undefined;
    this.Nnr = Vector_1.Vector.Create();
    this.GTn = e => {
      if (e.Attacker.Id === Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.Id) {
        LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.Hfn);
      }
    };
    this.Zln = e => {
      if (!this.Gce.IsMoving && this.Hte?.IsAutonomousProxy) {
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          switch (this.Hfn) {
            case 2:
              return;
            case 0:
              var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e.Attacker.Id, {
                ParamType: 1
              });
              if (t && !t.IsMyRole()) {
                return;
              }
              if (e.Attacker.GetComponent(3).IsAutonomousProxy) {
                break;
              }
              return;
          }
        }
        var i;
        var n;
        var s = e.Attacker.GetComponent(1).ActorLocationProxy;
        var o = Vector_1.Vector.Create();
        this.Hte.ActorLocationProxy.Subtraction(s, o);
        o.Normalize();
        if (this.Ffn?.Valid && ([s, i, n] = this.Ffn.GetNextMoveTargetOnHit(o), s)) {
          s = Vector_1.Vector.Dist2D(i, this.Hte.ActorLocationProxy) / this.Config.MoveSpeed;
          this.Gce.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(i, s));
          this.Vfn = n;
          this.Enable(this.sxr, "SceneItemLevitateMagnetComponent.OnHit");
          this.Ffn.RemoveMagnetTipsTag();
          this.Lie.RemoveTag(-1063846162);
          this.Kfn(o);
        }
      }
    };
    this.wJa = (e, t) => {
      if (t) {
        EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, this.GTn);
      }
    };
    this.Qfn = () => {
      this.xEr = UE.NewObject(UE.TraceBoxElement.StaticClass());
      this.xEr.WorldContextObject = this.Hte.Owner;
      this.xEr.bIsSingle = true;
      this.xEr.bIgnoreSelf = true;
      this.xEr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.xEr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
      this.xEr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
      this.xEr.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible);
      this.xEr.DrawTime = 0.5;
      this.Wfn = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.Hte.GetSceneInteractionLevelHandleId());
      var t = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
      for (let e = 0; e < t.Num(); e++) {
        this.xEr.ActorsToIgnore.Add(t.Get(e));
      }
      this.jfn = this.Wfn.D_K2_GetActorLocation().Z - this.Hte.ActorLocationProxy.Z;
      var e = Vector_1.Vector.Create();
      this.Hte?.ActorUpProxy.Multiply(this.jfn, e);
      this.Nnr = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy);
      this.Nnr.AdditionEqual(e);
      var e = this.Hte.ActorRotation;
      this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator);
      this.Wfn.D_GetActorBounds(false, undefined, this.Hme);
      TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(this.xEr, (0, puerts_1.$unref)(this.Hme));
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.xEr, this.Nnr);
      TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.xEr, e);
      this.Hte.SetActorRotation(e);
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemLevitateMagnetComponent_1)[0];
    this.Config = e;
    e = this.Entity.GetComponent(0).GetBaseInfo();
    this.Hfn = e?.OnlineInteractType;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    this.Gce = this.Entity.GetComponent(129);
    this.Xln = this.Entity.GetComponent(155);
    this.Xln.RegisterComponent(this);
    this.Ffn = this.Entity.GetComponent(139);
    this.Lie = this.Entity.GetComponent(197);
    this.Lie.AddTag(-1063846162);
    this.Lie.AddTagAddOrRemoveListener(-709838471, this.wJa);
    if (!this.Lie.ContainsTag(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-709838471))) {
      EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, this.GTn);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Qfn);
    this.sxr = this.Disable("[SceneItemHitMoveComp]初始化关闭Tick");
    return true;
  }
  OnEnd() {
    this.Lie.RemoveTagAddOrRemoveListener(-709838471, this.wJa);
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, this.GTn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, this.GTn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Qfn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Qfn);
    }
    return true;
  }
  OnTick(e) {
    if (!this.Gce.IsMoving) {
      this.sxr = this.Disable("[SceneItemHitMoveComp]运动结束关闭Tick");
      if (this.Ffn?.Valid) {
        this.Ffn.OnMove(this.Vfn);
      }
      this.Xfn();
      this.Lie.AddTag(-1063846162);
    }
  }
  Kfn(e) {
    var t = Vector_1.Vector.Create(e);
    var i = Vector_1.Vector.Create(this.Hte.ActorUpProxy);
    i.Normalize();
    var n = Vector_1.Vector.Create();
    const s = e.DotProduct(i);
    i.Multiply(s, n);
    t.SubtractionEqual(n);
    t.Normalize();
    e = Vector_1.Vector.Create(0, 0, 0);
    this.Hte.ActorQuatProxy.RotateVector(Vector_1.Vector.BackwardVectorProxy, e);
    i = Vector_1.Vector.Create(0, 0, 0);
    this.Hte.ActorQuatProxy.RotateVector(Vector_1.Vector.LeftVectorProxy, i);
    n = [{
      Direction: this.Hte.ActorForwardProxy,
      TagId: 503743627
    }, {
      Direction: this.Hte.ActorRightProxy,
      TagId: -1945582411
    }, {
      Direction: e,
      TagId: 1594082526
    }, {
      Direction: i,
      TagId: 1996023206
    }];
    for (const o of n) {
      const s = MathUtils_1.MathUtils.DotProduct(t, o.Direction);
      if (s > COS_45) {
        this.Lie.AddTag(o.TagId);
        return;
      }
    }
  }
  Xfn() {
    this.Lie.RemoveTag(503743627);
    this.Lie.RemoveTag(1594082526);
    this.Lie.RemoveTag(1996023206);
    this.Lie.RemoveTag(-1945582411);
  }
  UpdateBoxTrace(e, t) {
    var i;
    if (this.xEr) {
      i = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.Hte.GetSceneInteractionLevelHandleId());
      e = Vector_1.Vector.Create(e.GetBlockLocationByIndex(t));
      t = Vector_1.Vector.Create();
      this.Hte?.ActorUpProxy.Multiply(this.jfn, t);
      e?.AdditionEqual(t);
      t = Rotator_1.Rotator.Create(this.Hte.ActorRotation);
      this.Hte.SetActorRotation(Rotator_1.Rotator.ZeroRotator);
      i.D_GetActorBounds(false, undefined, this.Hme);
      TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(this.xEr, (0, puerts_1.$unref)(this.Hme));
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.xEr, e);
      TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(this.xEr, t);
      this.Hte.SetActorRotation(t.ToUeRotator());
      this.Nnr = Vector_1.Vector.Create(this.Wfn.D_K2_GetActorLocation());
    }
  }
  StartBoxTrace(e) {
    if (!this.xEr) {
      return false;
    }
    if (SceneItemLevitateMagnetComponent_1.TraceDebug) {
      this.xEr.SetDrawDebugTrace(2);
    }
    var t = Vector_1.Vector.Create(this.Nnr);
    var e = Vector_1.Vector.Create(e);
    e.SubtractionEqual(t);
    var e = Vector_1.Vector.Create(e);
    var i = Vector_1.Vector.Create(this.Hte.ActorUpProxy);
    i.Normalize();
    var n = Vector_1.Vector.Create();
    var s = e.DotProduct(i);
    i.Multiply(s, n);
    e.SubtractionEqual(n);
    var i = Vector_1.Vector.Create(t);
    i.AdditionEqual(e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.xEr, i);
    return TraceElementCommon_1.TraceElementCommon.BoxTrace(this.xEr, "[SceneItemLevitateMagnetComponent.StartBoxTrace]");
  }
};
SceneItemLevitateMagnetComponent.TraceDebug = false;
SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(156)], SceneItemLevitateMagnetComponent);
exports.SceneItemLevitateMagnetComponent = SceneItemLevitateMagnetComponent; //# sourceMappingURL=SceneItemLevitateMagnetComponent.js.map