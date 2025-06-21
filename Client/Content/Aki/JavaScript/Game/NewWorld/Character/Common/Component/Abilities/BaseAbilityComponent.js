"use strict";
var BaseAbilityComponent_1, __decorate = this && this.__decorate || function(t, e, i, o) {
  var n, s = arguments.length,
    r = s < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, o);
  else
    for (var a = t.length - 1; 0 <= a; a--)(n = t[a]) && (r = (s < 3 ? n(r) : 3 < s ? n(e, i, r) : n(e, i)) || r);
  return 3 < s && r && Object.defineProperty(e, i, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseAbilityComponent = exports.EBuffApplyType = exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = exports.DEFAULT_SOURCE_SKILL_LEVEL = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines");
exports.DEFAULT_SOURCE_SKILL_LEVEL = 1, exports.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND = -1, exports.EBuffApplyType = Protocol_1.Aki.Protocol.uFs;
let BaseAbilityComponent = BaseAbilityComponent_1 = class BaseAbilityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.n$t = void 0, this.Pbr = void 0, this.Xte = void 0, this.xbr = "", this._7_ = () => {
      this.RefreshMeshAnim()
    }, this.vVs = void 0, this.GameplayEventCallbacks = new Map, this.SVs = t => {
      var e = t?.TagId;
      if (void 0 !== e) {
        t = this.GameplayEventCallbacks.get(e);
        if (t) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
          for (const o of [...t]) try {
            o(e)
          } catch (t) {
            t instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("Event", 28, "gameplayEvent事件回调执行异常", t, ["gameplayEvent", i], ["error", t.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("Event", 28, "gameplayEvent事件回调执行异常", ["gameplayEvent", i], ["error", t])
          }
        }
      }
    }
  }
  OnStart() {
    return this.n$t = this.Entity.GetComponent(1), this.Pbr = this.GetAbilitySystemComponent(), this.Pbr.IsValid() ? (this.Pbr.SetComponentTickEnabled(!1), this.RefreshMeshAnim(), this.InitClass(), this.Xte = this.Entity.CheckGetComponent(205), this.vVs = this.CreateGameplayEventTask(this.SVs), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 19, "技能组件TsAbilityComponentInternal Add失败，AbilityComponent Start失败"), !1)
  }
  OnEnd() {
    return this.vVs && this.vVs.EndTask(), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_), !0
  }
  OnClear() {
    return this.Pbr && (this.Pbr.K2_DestroyComponent(this.Pbr), this.Pbr = void 0), !0
  }
  OnTick(t) {
    this.Pbr.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond * this.n$t.Owner.CustomTimeDilation)
  }
  RefreshMeshAnim() {
    var t, e = this.n$t.Owner;
    e instanceof UE.Character && (t = CharacterNameDefines_1.CharacterNameDefines.ABP_BASE, e.Mesh.GetLinkedAnimGraphInstanceByTag(t) ? this.Pbr.BP_InitAbilityActorInfo(t) : this.Pbr.BP_InitAbilityActorInfo(FNameUtil_1.FNameUtil.NONE))
  }
  GetAbilitySystemComponent() {}
  AddPerformanceTag(t) {
    this.xbr = t, this.Xte.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t))
  }
  ClearLastPerformanceTag() {
    this.xbr && this.Xte.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(this.xbr))
  }
  SendGameplayEventToActor(t, e = void 0) {
    UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(this.n$t.Owner, t, e || BaseAbilityComponent_1.Bbr)
  }
  TryActivateAbilityByClass(t, e = !0) {
    return this.Pbr.TryActivateAbilityByClass(t, e)
  }
  GetCurrentWaitAndPlayedMontageCorrespondingGa() {
    return this.Pbr.LocalAnimMontageInfo.AnimatingAbility
  }
  GetAbility(t) {
    return this.Pbr.GetAbility(t)
  }
  ClearAbility(t) {
    this.Pbr.RemoveAbility(t)
  }
  GetAbilityScopeLockCount() {
    return this.Pbr.GetAbilityScopeLockCount()
  }
  InitClass() {
    BaseAbilityComponent_1.bbr || (BaseAbilityComponent_1.Bbr = new UE.GameplayEventData, BaseAbilityComponent_1.bbr = !0)
  }
  CreateGameplayEventTask(t) {
    var e = UE.AsyncTaskWaitGameplayEvent.ListenForGameplayEvent(this.Pbr);
    return e.EventReceived.Add(t), e
  }
  AddGameplayEventListener(e, i) {
    if (void 0 !== e && i) {
      let t = this.GameplayEventCallbacks.get(e);
      t || this.GameplayEventCallbacks.set(e, t = new Set), t.has(i) ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("Character", 28, "重复添加回调函数", ["gameplayEvent", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", i.name]) : t.add(i)
    } else Log_1.Log.CheckError() && Log_1.Log.Error("Character", 28, "回调函数添加失败", ["gameplayEvent", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["callbackName", i?.name])
  }
  RemoveGameplayEventListener(t, e) {
    t = this.GameplayEventCallbacks.get(t);
    t && t.delete(e)
  }
};
BaseAbilityComponent.Bbr = void 0, BaseAbilityComponent.bbr = !1, BaseAbilityComponent = BaseAbilityComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(17)], BaseAbilityComponent), exports.BaseAbilityComponent = BaseAbilityComponent;
//# sourceMappingURL=BaseAbilityComponent.js.map