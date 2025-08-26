"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Queue_1 = require("../../Core/Container/Queue");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const CharacterDitherEffectController_1 = require("../NewWorld/Character/Common/Component/Effect/CharacterDitherEffectController");
const CustomMovementDefine_1 = require("../NewWorld/Character/Common/Component/Move/CustomMovementDefine");
const MOVEMENT_MODE_MAX_COUNT = 3;
class TsBaseCharacter extends UE.BaseCharacter {
  constructor() {
    super(...arguments);
    this.CharRenderingComponent = undefined;
    this.RenderType = 0;
    this.TsCharacterDebugComponent = undefined;
    this.NavigationInvoker = undefined;
    this.InputComponentClass = undefined;
    this.BasePlatform = undefined;
    this.EntityId = 0;
    this.FightManager = undefined;
    this.DtHitEffect = undefined;
    this.DtBaseMovementSetting = undefined;
    this.DtNewBulletDataMain = undefined;
    this.DtCharacterPart = undefined;
    this.DtCameraConfig = undefined;
    this.BattleSockets = undefined;
    this.NormalSockets = undefined;
    this.WeaponInEffect = undefined;
    this.WeaponHideEffect = undefined;
    this.FkData = undefined;
    this.CharacterData = undefined;
    this.Camp = 0;
    this.PhysicsClothSimulateEnable = true;
    this.PhysicsClothSimulateDisableOneFrame = false;
    this.CachePoseEnableOneFrame = false;
    this.CacheTime = 0.6;
    this.OnMovementModeChanged = false;
    this.CharacterActorComponent = undefined;
    this.SimpleNpcActorComponent = undefined;
    this.DitherEffectControllerInternal = undefined;
    this.MovementModeInfoUid = 0;
    this.Count = 0;
    this.Mutex = false;
    this.MovementModeLayer = [new Queue_1.Queue(), new Queue_1.Queue(), new Queue_1.Queue(), new Queue_1.Queue()];
    this.CurrentMovementParam = undefined;
  }
  Constructor() {
    this.OnMovementModeChanged = false;
    this.CharacterActorComponent = undefined;
    this.SimpleNpcActorComponent = undefined;
    this.DitherEffectControllerInternal = undefined;
    this.MovementModeInfoUid = 0;
    this.Count = 0;
    this.Mutex = false;
    this.MovementModeLayer = [new Queue_1.Queue(), new Queue_1.Queue(), new Queue_1.Queue(), new Queue_1.Queue()];
    this.CurrentMovementParam = undefined;
  }
  SetEntityId(e) {
    this.EntityId = e;
    this.EntityIdInternal = e;
  }
  TryAddTsAbilitySystemComponent() {
    this.AbilitySystemComponent ||= this.AddComponentByClass(UE.BaseAbilitySystemComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
  }
  SetCamp(e) {
    this.Camp = e;
  }
  K2_OnMovementModeChanged(e, t, i, s) {
    if (this.CharacterActorComponent) {
      this.OnMovementModeChanged = true;
      EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.CharacterActorComponent.Entity.Id, e, t, i, s);
      this.OnMovementModeChanged = false;
    }
  }
  ReceivePossessed(e) {
    super.ReceivePossessed(e);
    if (this.CharacterActorComponent && UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_CHARACTERCONTROLLER)) {
      EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CharPossessed, this.CharacterActorComponent.Entity, e);
    }
  }
  ReceiveUnpossessed(e) {
    super.ReceiveUnpossessed(e);
    if (this.CharacterActorComponent && UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_CHARACTERCONTROLLER)) {
      EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CharUnpossessed, this.CharacterActorComponent.Entity, e);
    }
  }
  GetEntityId() {
    if (this.CharacterActorComponent) {
      return this.CharacterActorComponent.Entity.Id;
    } else if (this.SimpleNpcActorComponent) {
      return this.SimpleNpcActorComponent.Entity.Id;
    } else {
      return 0;
    }
  }
  GetEntityIdNoBlueprint() {
    if (this.CharacterActorComponent) {
      return this.CharacterActorComponent.Entity.Id;
    } else if (this.SimpleNpcActorComponent) {
      return this.SimpleNpcActorComponent.Entity.Id;
    } else {
      return 0;
    }
  }
  GetEntityNoBlueprint() {
    if (this.CharacterActorComponent) {
      return this.CharacterActorComponent.Entity;
    } else if (this.SimpleNpcActorComponent) {
      return this.SimpleNpcActorComponent.Entity;
    } else {
      return undefined;
    }
  }
  Initialize() {}
  set DitherEffectController(e) {
    this.DitherEffectControllerInternal = e;
  }
  get DitherEffectController() {
    this.DitherEffectControllerInternal ||= new CharacterDitherEffectController_1.CharacterDitherEffectController(this, this.CharRenderingComponent);
    return this.DitherEffectControllerInternal;
  }
  get HasDitherEffectController() {
    return this.DitherEffectControllerInternal !== undefined;
  }
  SetDitherEffect(e, t = 3) {
    if (this.HasDitherEffectController) {
      this.DitherEffectController?.SetDitherEffect(e, t);
    }
  }
  K2_UpdateCustomMovement(e) {
    super.K2_UpdateCustomMovement(e);
    switch (this.CharacterMovement.CustomMovementMode) {
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_CLIMB:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveClimb, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveSwim, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveGlide, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_PENDULUM:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMovePendulum, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveSlide, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_UP_TO_WALK_ON_WATER:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveWalkOnWater, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveCatapult, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveSoar, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveSki, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveRoll, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_KITE:
        this.CharacterActorComponent?.Entity.GetComponent(38)?.KiteMove(e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RAIL_SLIDE:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveRailSlide, e);
        break;
      case CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_RIDE:
        EventSystem_1.EventSystem.EmitWithTarget(this.CharacterActorComponent.Entity, EventDefine_1.EEventName.CustomMoveRide, e);
    }
  }
  FightCommand(e) {}
  ReceiveDestroyed() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this)) {
      this.CharRenderingComponent = undefined;
      this.NavigationInvoker = undefined;
      this.InputComponentClass = undefined;
      this.FightManager = undefined;
      this.DtHitEffect = undefined;
      this.DtBaseMovementSetting = undefined;
      this.DtNewBulletDataMain = undefined;
      this.DtCharacterPart = undefined;
      this.BattleSockets = undefined;
      this.NormalSockets = undefined;
      this.WeaponInEffect = undefined;
      this.WeaponHideEffect = undefined;
      this.FkData = undefined;
      this.CharacterData = undefined;
      this.CharacterActorComponent = undefined;
      this.DitherEffectControllerInternal = undefined;
      this.TsCharacterDebugComponent?.Destroy();
      this.TsCharacterDebugComponent = undefined;
      super.ReceiveDestroyed();
    }
  }
  KuroSetMovementMode(i) {
    if (this.CharacterMovement) {
      let t = 0;
      if (this.CharacterActorComponent) {
        t = this.CharacterActorComponent.Entity.Id;
      } else if (this.SimpleNpcActorComponent) {
        t = this.SimpleNpcActorComponent.Entity.Id;
      }
      if (this.Mutex) {
        if (this.Count > MOVEMENT_MODE_MAX_COUNT) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 42, "[SetMovementMode] 产生嵌套循环层数过高，不往后执行", ["EntityId", t]);
          }
          return;
        } else {
          i.Uid = this.MovementModeInfoUid++;
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 42, "[SetMovementMode] 产生嵌套设置，加入队列", ["EntityId", t], ["UID", i.Uid], ["Count", this.Count], ["Mode", i.Mode], ["Context", i.Context], ["CustomMode", i.CustomMode], ["now Mode", this.CurrentMovementParam?.Mode], ["now Context", this.CurrentMovementParam?.Context], ["now CustomMode", this.CurrentMovementParam?.CustomMode]);
          }
          this.MovementModeLayer[this.Count].Push(i);
          return;
        }
      }
      this.Mutex = true;
      this.Count++;
      this.CurrentMovementParam = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[SetMovementMode] 设置MovementMode", ["EntityId", t], ["Count", this.Count], ["Mode", this.CurrentMovementParam?.Mode], ["Context", this.CurrentMovementParam?.Context], ["CustomMode", this.CurrentMovementParam?.CustomMode]);
      }
      if (i.Mode === 3 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 6, "1117317 Bug追踪，移动模式继承", ["Name", this.GetName()], ["Velocity", this.CharacterMovement.Velocity]);
      }
      this.CharacterMovement.SetMovementMode(i.Mode, i.CustomMode);
      if (i.Callback) {
        try {
          i.Callback();
        } catch (e) {
          if (e instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Character", 42, "[SetMovementMode] 回调执行异常", e, ["EntityId", t], ["Error", e.message], ["Context", i.Context]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 42, "[SetMovementMode] 回调执行异常", ["EntityId", t], ["stack", e], ["Context", i.Context]);
          }
        }
      }
      this.Mutex = false;
      var e = this.Count;
      if (e <= MOVEMENT_MODE_MAX_COUNT) {
        while (!this.MovementModeLayer[e].Empty) {
          var s = this.MovementModeLayer[e].Pop();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[SetMovementMode] 执行队列中的MovementMode", ["EntityId", t], ["UID", s.Uid], ["Count", this.Count], ["Mode", s.Mode], ["Context", s.Context], ["CustomMode", s.CustomMode]);
          }
          this.KuroSetMovementMode(s);
        }
      }
      this.Count--;
      this.CurrentMovementParam = undefined;
    }
  }
}
exports.default = TsBaseCharacter;
//# sourceMappingURL=TsBaseCharacter.js.map