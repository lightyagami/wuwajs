"use strict";

var AnimalPerformComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var o = arguments.length;
  var h = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        h = (o < 3 ? r(h) : o > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalPerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent");
const DEFAULT_SIGHT_RANGE = 300;
const SIGHT_OPEN_DEGREE = 80;
const GAMEPLAY_TAG_DISAPPEAR = 1800978500;
const GAMEPLAY_TAG_BLUR = -1683566877;
const DESTROY_DISAPPEAR_TIME = 2000;
const GAMEPLAY_TAG_INVISIBILITY = -208062360;
const GAMEPLAY_TAG_ON_HIT = -1555907721;
const ALERT_RANGE = 500;
const GAMEPLAY_TAG_ALERT = 836814667;
let AnimalPerformComponent = AnimalPerformComponent_1 = class AnimalPerformComponent extends BasePerformComponent_1.BasePerformComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.jBr = undefined;
    this.WBr = undefined;
    this.KBr = false;
    this.QBr = Vector_1.Vector.Create();
    this.XBr = -1;
    this.$Br = false;
    this.tBr = undefined;
    this.VTl = undefined;
    this.HTl = undefined;
    this.YBr = false;
    this.PendingDestroy = true;
    this.JBr = (t, e) => {
      if (e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnimalDying, this.Entity);
      }
    };
    this.zBr = (t, e) => {
      if (e) {
        if (this.PendingDestroy) {
          this.WBr.AddTag(GAMEPLAY_TAG_INVISIBILITY);
          this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN);
          TimerSystem_1.TimerSystem.Delay(() => {
            if (this.Entity) {
              ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
            }
          }, DESTROY_DISAPPEAR_TIME);
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
        }
      }
    };
    this.ZBr = (t, e) => {
      var i = this.tBr.get(t);
      if (i) {
        if (e) {
          this.ebr(i);
          if (t === GAMEPLAY_TAG_DISAPPEAR) {
            this.WBr.AddTag(GAMEPLAY_TAG_INVISIBILITY);
            this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(CharacterNameDefines_1.CharacterNameDefines.VANISH_PAWN);
          }
        } else {
          this.tbr();
          if (t === GAMEPLAY_TAG_DISAPPEAR) {
            this.WBr.RemoveTag(GAMEPLAY_TAG_INVISIBILITY);
            this.Hte.Actor.CapsuleComponent.SetCollisionProfileName(CharacterNameDefines_1.CharacterNameDefines.PAWN);
          }
        }
      }
    };
    this.zYe = () => {
      if (this.Entity.GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          this.Hte.SetAutonomous(true);
          this.ibr();
        } else {
          this.obr();
        }
      }
    };
    this.rbr = e => {
      if (e.CollisionInfo.DamageId !== 0) {
        let t = false;
        e = e.Attacker.GetComponent(0);
        if (t = e?.IsRole() || e?.IsVision() || e && ModelManager_1.ModelManager.CreatureModel.GetEntity(e.GetSummonerId())?.Entity?.GetComponent(0)?.IsRole() ? true : t) {
          this.WBr.AddTag(GAMEPLAY_TAG_ON_HIT);
        }
      }
    };
    this.nbr = t => {
      if (!!t?.Valid && t.Id !== this.Entity.Id && !(t = t.GetComponent(3).ActorLocationProxy, this.Hte.ActorLocationProxy.Subtraction(t, this.QBr), this.QBr.Size() > ALERT_RANGE)) {
        this.WBr.AddTag(GAMEPLAY_TAG_ALERT);
      }
    };
    this.sbr = (t, e, i) => {
      if (!!this.abr(e) && !this.WBr.HasTag(GAMEPLAY_TAG_BLUR)) {
        this.WBr.AddTag(GAMEPLAY_TAG_BLUR);
      }
    };
    this.hbr = (t, e, i, s) => {
      if (this.abr(e) && this.WBr.HasTag(GAMEPLAY_TAG_BLUR)) {
        this.WBr.RemoveTag(GAMEPLAY_TAG_BLUR);
      }
    };
  }
  HandlePendingDestroy() {
    if (this.PendingDestroy) {
      this.Entity.GetComponent(217).AddTag(-1000614969);
    } else {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    }
  }
  OnInitData(t) {
    var t = t.GetParam(AnimalPerformComponent_1)[0];
    var t = t || undefined;
    var e = this.Entity.GetComponent(0);
    this.KBr = t?.IsStare ?? false;
    this.tBr = new Map();
    if (t?.SpecialAnimalConfig?.Type === "CollectAnimal") {
      this.VTl = new Map();
      this.HTl = new Map();
      for (const i of t.SpecialAnimalConfig.PartsMap) {
        this.VTl.set(i.Slot, i.Skeleton);
        this.HTl.set(i.Slot, !!e.PbAnimalInitialPartIds?.includes(i.Slot));
      }
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    this.Hte = this.Entity.GetComponent(3);
    if (!this.Hte) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Animal", 29, "[AnimalPerformComponent] 初始化失败 Actor Component Undefined");
      }
      return false;
    }
    this.AnimComp = this.Entity.GetComponent(188);
    if (!this.AnimComp) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Animal", 29, "[AnimalPerformComponent] 初始化失败 Animation Component Undefined", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
      }
      return false;
    }
    this.AnimComp.EnableSightDirect = this.KBr;
    var t = this.AnimComp.MainAnimInstance;
    if (t) {
      var e = t.材质配置;
      var i = e.Num();
      for (let t = 0; t < i; ++t) {
        var s;
        var r = e.GetKey(t);
        if (r.TagName.includes("动物.")) {
          s = e.Get(r);
          this.tBr.set(r.TagId, s.ToAssetPathName());
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Animal", 29, "[AnimalPerformComponent] 材质GameplayTag不符合规范", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
        }
      }
    }
    this.jBr = this.Entity.GetComponent(130);
    if (!this.jBr) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Animal", 29, "[AnimalPerformComponent] 初始化失败 Perception Component Undefined", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
      }
      return false;
    }
    this.jBr.SetSightRange(DEFAULT_SIGHT_RANGE);
    this.WBr = this.Entity.GetComponent(217);
    if (!this.WBr) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Animal", 29, "[AnimalPerformComponent] 初始化失败 GameplayTag Component Undefined", ["CreatureDataId", this.Hte.CreatureData.GetCreatureDataId()], ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["PlayerId", this.Hte.CreatureData.GetPlayerId()]);
      }
      return false;
    }
    for (const o of this.tBr) {
      this.WBr.AddTagAddOrRemoveListener(o[0], this.ZBr);
    }
    this.WBr.AddTagAddOrRemoveListener(-1000614969, this.zBr);
    this.WBr.AddTagAddOrRemoveListener(1008164187, this.JBr);
    this.Ore();
    return true;
  }
  OnActivate() {
    if (this.Entity.GetComponent(0).GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.Hte.SetAutonomous(true);
        this.ibr();
      }
      this.jTl();
    }
  }
  OnTick(t) {
    if (this.KBr) {
      if (this.jBr.IsInSightRange && this.lbr()) {
        this._br(Global_1.Global.BaseCharacter.CharacterActorComponent);
      } else {
        this._br(undefined);
      }
    }
  }
  lbr() {
    var t = Global_1.Global.BaseCharacter.CharacterActorComponent;
    this.QBr.FromUeVector(t.ActorLocationProxy);
    this.QBr.SubtractionEqual(this.Hte.ActorLocationProxy);
    this.QBr.Z = 0;
    this.QBr.Normalize();
    var t = MathUtils_1.MathUtils.GetAngleByVectorDot(this.QBr, this.Hte.ActorForwardProxy);
    return t <= SIGHT_OPEN_DEGREE;
  }
  _br(t) {
    if (this.KBr) {
      this.AnimComp.SetSightTargetItem(t);
    }
  }
  OnEnd() {
    this.obr();
    this.kre();
    for (const t of this.tBr) {
      this.WBr.RemoveTagAddOrRemoveListener(t[0], this.ZBr);
    }
    this.WBr.RemoveTagAddOrRemoveListener(1008164187, this.JBr);
    return true;
  }
  ebr(t) {
    if (this.XBr > -1) {
      this.tbr();
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.PD_CharacterControllerData_C, t => {
      if (t?.IsValid() && this && this.Hte && this.Hte.Actor?.IsValid()) {
        this.XBr = this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(t);
      }
    });
  }
  tbr() {
    if (this.XBr > -1) {
      this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(this.XBr);
    }
    this.XBr = -1;
  }
  ibr() {
    var t;
    if (!this.YBr) {
      if (this.Hte?.Valid && this.Hte.Actor?.IsValid() && UE.KuroStaticLibrary.IsObjectClassByName(this.Hte.Actor, CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET)) {
        (t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Add(this.sbr);
        t.OnComponentEndOverlap.Add(this.hbr);
        this.YBr = true;
      }
    }
  }
  obr() {
    var t;
    if (this.YBr && this.Hte?.Valid && this.Hte.Actor?.IsValid() && UE.KuroStaticLibrary.IsObjectClassByName(this.Hte.Actor, CharacterNameDefines_1.CharacterNameDefines.BP_COMMONPET)) {
      (t = this.Hte.Actor.BlurCollision).OnComponentBeginOverlap.Remove(this.sbr);
      t.OnComponentEndOverlap.Remove(this.hbr);
      this.YBr = false;
    }
  }
  SetUiOpenPerformance(t, e) {
    var i = this.Entity.GetComponent(14);
    if (i.CurrentState() === 6) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Animal", 29, "开启系统UI失败，系统UI已开启", ["ConfigID", this.Hte.CreatureData.GetPbDataId()], ["已开启系统UI", t]);
      }
    } else {
      i.GetState(7).SystemUiViewName = t;
      i.SwitchState(7);
    }
  }
  InitFeedingAnimalConfig(t, e) {
    this.Entity.GetComponent(14).GetState(7).InitFeedingAnimalConfig(t, e);
  }
  abr(t) {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(t, false);
    return !!t?.Valid && !!t.Entity.GetComponent(0).IsRole() && !!(t = t.Entity.GetComponent(3))?.Valid && !t.IsAutonomousProxy;
  }
  Ore() {
    if (!this.$Br) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletHitSpecialCharacter, this.rbr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAnimalDying, this.nbr);
      this.$Br = true;
    }
  }
  kre() {
    if (this.$Br) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletHitSpecialCharacter, this.rbr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.zYe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAnimalDying, this.nbr);
      this.$Br = false;
    }
  }
  GetIsPartShow(t) {
    return this.HTl?.get(t) ?? false;
  }
  jTl() {
    if (this.HTl && this.VTl) {
      for (var [t, e] of this.HTl) {
        t = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl.get(t));
        if (t) {
          this.WTl(t, !e);
        }
      }
    }
  }
  ShowPart(t) {
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl?.get(t));
    if (e) {
      this.WTl(e, false);
      this.HTl?.set(t, true);
    }
  }
  HidePart(t) {
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.VTl?.get(t));
    if (e) {
      this.WTl(e, true);
      this.HTl?.set(t, false);
    }
  }
  WTl(t, e) {
    if (this.Hte?.Actor?.Mesh?.IsValid() && t && this.Hte.Actor.Mesh.IsBoneHiddenByName(t) !== e) {
      if (e) {
        this.Hte.Actor.Mesh.HideBoneByName(t, 0);
      } else {
        this.Hte.Actor.Mesh.UnHideBoneByName(t);
      }
    }
  }
};
AnimalPerformComponent = AnimalPerformComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(182)], AnimalPerformComponent);
exports.AnimalPerformComponent = AnimalPerformComponent; //# sourceMappingURL=AnimalPerformComponent.js.map