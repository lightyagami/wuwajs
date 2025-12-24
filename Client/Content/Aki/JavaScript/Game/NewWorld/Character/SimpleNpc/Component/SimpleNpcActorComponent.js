"use strict";

var __decorate = this && this.__decorate || function (t, e, r, o) {
  var i;
  var a = arguments.length;
  var n = a < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, r, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (i = t[s]) {
        n = (a < 3 ? i(n) : a > 3 ? i(e, r, n) : i(e, r)) || n;
      }
    }
  }
  if (a > 3 && n) {
    Object.defineProperty(e, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcActorComponent = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const JsModelManager_1 = require("../../../../../Core/Model/JsModelManager");
const CameraController_1 = require("../../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const BaseCharacterComponent_1 = require("../../Common/Component/BaseCharacterComponent");
const INIT_LOCATION_KEY = "InitLocation";
let SimpleNpcActorComponent = class SimpleNpcActorComponent extends BaseCharacterComponent_1.BaseCharacterComponent {
  constructor() {
    super(...arguments);
    this.v9e = () => {
      if (!this.CreatureDataInternal.GetRemoveState()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外", ["CreatureData", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()]);
        }
      }
    };
  }
  HasMesh() {
    return !!this.SkeletalMesh?.SkeletalMesh;
  }
  OnInitData() {
    super.OnInitData();
    return !!this.InitCreatureData();
  }
  OnInit() {
    super.OnInit();
    this.EntityType = this.CreatureData.GetEntityType();
    this.SubEntityType = this.CreatureData.GetSubEntityType();
    var t;
    var e;
    var r = undefined;
    var o = this.CreatureData.GetPbModelConfig();
    if (o) {
      o = o.ModelId;
      if ((r = this.InitActorNew(o)) && UE.KismetSystemLibrary.IsValid(r)) {
        if (r.IsA(UE.TsBaseCharacter_C.StaticClass())) {
          (t = r).SetPrimitiveBlueprintTypeName(new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId));
          this.SetCamp(t);
          t.SimpleNpcActorComponent = this;
          t.SetEntityId(this.Entity.Id);
          t.CharacterMovement.SetDefaultMovementMode();
          t.CharacterMovement.SetKuroOnlyTickOutside(true);
          this.ActorInternal = t;
          this.ActorInternal.OnDestroyed.Add(this.v9e);
          t.RenderType = 3;
          this.SetActorVisible(false, "[CharacterActorComponent.OnInit] 默认隐藏");
          this.SetCollisionEnable(false, "[CharacterActorComponent.OnInit] 默认关闭碰撞");
          this.SetTickEnable(false, "[CharacterActorComponent.OnInit] 默认关闭Tick");
          t.FightManager = GlobalData_1.GlobalData.BpFightManager;
          t.CharRenderingComponent.Init(t.RenderType);
          t.CharRenderingComponent.UpdateNpcDitherComponent();
          t.AutoPossessAI = 3;
          if (e = this.CreatureDataInternal.GetInitLocation()) {
            this._Fr(e);
          } else {
            this._Fr(this.ActorLocation);
          }
          this.InitSizeInternal();
          if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
            if (this.Entity.GameBudgetManagedToken !== undefined) {
              cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, t);
            } else {
              this.Entity.RegisterToGameBudgetController(t);
            }
          }
          JsModelManager_1.JsModelManager.UpdateEntityActor(this.Entity.Id, this.ActorInternal);
          return true;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 6, "[CharacterActorComponent.OnInit] Actor不是TsBaseCharacter", ["Name", r.GetName()], ["Class", r.GetClass().GetName()], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", o], ["PbDataId", this.CreatureData.GetPbDataId()]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 3, "[CharacterActorComponent.OnInit] 加载actor失败。", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", o], ["PbDataId", this.CreatureData.GetPbDataId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[CharacterActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ModelId", 0], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnStart() {
    super.OnStart();
    var t;
    var e = this.Actor;
    this.DebugMovementComp = this.Entity.GetComponent(30);
    if (e) {
      GlobalData_1.GlobalData.BpFightManager.添加Debug的对象(this.Actor);
      e.SetPrimitiveEntityType(RenderConfig_1.RenderConfig.GetEntityRenderPriority(false, Protocol_1.Aki.Protocol.kks.Proto_Npc));
      if (GlobalData_1.GlobalData.IsPlayInEditor && (t = e.TsCharacterDebugComponent)) {
        t.DebugCreatureId = this.CreatureDataInternal.GetOwnerId();
        t.DebugEntityId = this.Entity.Id;
      }
      CameraController_1.CameraController.LoadCharacterCameraConfig(e.DtCameraConfig);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[CharacterActorComponent.OnInit] 加载actor失败。", ["EntityId", this.Entity.Id], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PlayerId", this.CreatureDataInternal.GetPlayerId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    super.OnActivate();
    this.SetActorVisible(true, "[CharacterActorComponent.OnActivate] Visible");
    this.SetCollisionEnable(true, "[CharacterActorComponent.OnActivate] Visible");
    this.SetTickEnable(true, "[CharacterActorComponent.OnActivate] Visible");
    ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(this.CreatureDataInternal, this.ActorInternal);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Entity.Id, this.Actor.CharacterMovement.DefaultLandMovementMode, this.Actor.CharacterMovement.MovementMode, 0, 0);
    this.CFr();
  }
  OnTick(t) {
    super.OnTick(t);
    this.Actor.DitherEffectController?.Update(t);
  }
  OnEnd() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnEndPlay, this.Entity);
    GlobalData_1.GlobalData.BpFightManager.删除Debug的对象(this.Actor);
    if (this.ActorInternal?.IsValid() && (this.ActorInternal.OnDestroyed.Remove(this.v9e), this.ActorInternal instanceof TsBaseCharacter_1.default)) {
      this.ActorInternal.DitherEffectController?.Clear();
      this.ActorInternal.DitherEffectController = undefined;
      this.ActorInternal.CharacterActorComponent = undefined;
      this.ActorInternal.SimpleNpcActorComponent = undefined;
    }
    this.IsInSequenceBinding = false;
    CameraController_1.CameraController.UnloadCharacterCameraConfig(this.Actor.DtCameraConfig);
    this.Actor.CharRenderingComponent?.Destroy();
    return true;
  }
  OnEnable() {
    this.OnSetActorActive(true);
    this.ResetAllCachedTime();
  }
  OnDisable(t) {
    this.OnSetActorActive(false, t);
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(131)?.CurrentTimeScale ?? 1;
    this.ActorInternal.CustomTimeDilation = t * e;
  }
  OnSetActorActive(e, t) {
    super.OnSetActorActive(e, t);
    if (this.Actor?.IsValid()) {
      var t = this.Actor.GetComponentByClass(UE.NavigationInvokerComponent.StaticClass());
      if (t) {
        t.SetActive(e);
      }
      var t = (0, puerts_1.$ref)(undefined);
      this.Actor.GetAttachedActors(t, true);
      var r = (0, puerts_1.$unref)(t);
      for (let t = 0; t < r.Num(); ++t) {
        r.Get(t).SetActorHiddenInGame(!e);
      }
      t = this.Actor.DitherEffectController;
      if (t) {
        if (e) {
          t.SetIsDisable(false, 1);
        } else {
          t.SetIsDisable(true);
        }
      }
    }
  }
  CFr() {
    var t = this.CreatureDataInternal.GetModelConfig();
    if (t && t?.IsHiddenWithCamera) {
      this.Actor.CharRenderingComponent.SetCapsuleDither(1);
    }
  }
  _Fr(t) {
    BlackboardController_1.BlackboardController.SetVectorValueByEntity(this.Entity.Id, INIT_LOCATION_KEY, t.X, t.Y, t.Z);
  }
};
SimpleNpcActorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(204)], SimpleNpcActorComponent);
exports.SimpleNpcActorComponent = SimpleNpcActorComponent; //# sourceMappingURL=SimpleNpcActorComponent.js.map