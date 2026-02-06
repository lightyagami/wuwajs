"use strict";

var BaseAbilityComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        r = (s < 3 ? n(r) : s > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAbilityComponent = exports.EBuffApplyType = exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = exports.DEFAULT_SOURCE_SKILL_LEVEL = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
exports.DEFAULT_SOURCE_SKILL_LEVEL = 1;
exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = -1;
exports.EBuffApplyType = Protocol_1.Aki.Protocol.uFs;
let BaseAbilityComponent = BaseAbilityComponent_1 = class BaseAbilityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.Pbr = undefined;
    this.Xte = undefined;
    this.xbr = "";
    this._7_ = () => {
      this.RefreshMeshAnim();
    };
    this.vVs = undefined;
    this.GameplayEventCallbacks = new Map();
    this.SVs = (t, e) => {
      var i = t?.TagId;
      if (i !== undefined) {
        t = this.GameplayEventCallbacks.get(i);
        if (t) {
          var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i);
          for (const n of [...t]) {
            try {
              n(i, e);
            } catch (t) {
              if (t instanceof Error) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.ErrorWithStack("Event", 28, "gameplayEvent事件回调执行异常", t, ["gameplayEvent", o], ["error", t.message]);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Event", 28, "gameplayEvent事件回调执行异常", ["gameplayEvent", o], ["error", t]);
              }
            }
          }
        }
      }
    };
  }
  OnStart() {
    this.n$t = this.Entity.GetComponent(1);
    this.Pbr = this.GetAbilitySystemComponent();
    if (this.Pbr.IsValid()) {
      this.Pbr.SetComponentTickEnabled(false);
      this.RefreshMeshAnim();
      this.InitClass();
      this.Xte = this.Entity.CheckGetComponent(217);
      this.vVs = this.CreateGameplayEventTask(this.SVs);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "技能组件TsAbilityComponentInternal Add失败，AbilityComponent Start失败");
      }
      return false;
    }
  }
  OnEnd() {
    if (this.vVs) {
      this.vVs.EndTask();
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    return true;
  }
  OnClear() {
    if (this.Pbr) {
      this.Pbr.K2_DestroyComponent(this.Pbr);
      this.Pbr = undefined;
    }
    return true;
  }
  OnTick(t) {
    this.Pbr.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * this.n$t.Owner.CustomTimeDilation);
  }
  RefreshMeshAnim() {
    var t;
    var e = this.n$t.Owner;
    if (e instanceof UE.Character) {
      t = CharacterNameDefines_1.CharacterNameDefines.ABP_BASE;
      if (e.Mesh.GetLinkedAnimGraphInstanceByTag(t)) {
        this.Pbr.BP_InitAbilityActorInfo(t);
      } else {
        this.Pbr.BP_InitAbilityActorInfo(FNameUtil_1.FNameUtil.NONE);
      }
    }
  }
  GetAbilitySystemComponent() {}
  AddPerformanceTag(t) {
    this.xbr = t;
    this.Xte.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
  }
  ClearLastPerformanceTag() {
    if (this.xbr) {
      this.Xte.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.xbr));
    }
  }
  SendGameplayEventToActor(t, e = undefined) {
    UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(this.n$t.Owner, t, e || BaseAbilityComponent_1.Bbr);
  }
  TryActivateAbilityByClass(t, e = true) {
    return this.Pbr.TryActivateAbilityByClass(t, e);
  }
  GetCurrentWaitAndPlayedMontageCorrespondingGa() {
    return this.Pbr.LocalAnimMontageInfo.AnimatingAbility;
  }
  GetAbility(t) {
    return this.Pbr.GetAbility(t);
  }
  ClearAbility(t) {
    this.Pbr.RemoveAbility(t);
  }
  GetAbilityScopeLockCount() {
    return this.Pbr.GetAbilityScopeLockCount();
  }
  InitClass() {
    if (!BaseAbilityComponent_1.bbr) {
      BaseAbilityComponent_1.Bbr = new UE.GameplayEventData();
      BaseAbilityComponent_1.bbr = true;
    }
  }
  CreateGameplayEventTask(t) {
    var e = UE.AsyncTaskWaitGameplayEvent.ListenForGameplayEvent(this.Pbr);
    e.EventReceived.Add(t);
    return e;
  }
  AddGameplayEventListener(e, i) {
    if (e !== undefined && i) {
      let t = this.GameplayEventCallbacks.get(e);
      if (!t) {
        this.GameplayEventCallbacks.set(e, t = new Set());
      }
      if (t.has(i)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 28, "重复添加回调函数", ["gameplayEvent", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", i.name]);
        }
      } else {
        t.add(i);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 28, "回调函数添加失败", ["gameplayEvent", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", i?.name]);
    }
  }
  RemoveGameplayEventListener(t, e) {
    t = this.GameplayEventCallbacks.get(t);
    if (t) {
      t.delete(e);
    }
  }
};
BaseAbilityComponent.Bbr = undefined;
BaseAbilityComponent.bbr = false;
BaseAbilityComponent = BaseAbilityComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(17)], BaseAbilityComponent);
exports.BaseAbilityComponent = BaseAbilityComponent; //# sourceMappingURL=BaseAbilityComponent.js.map