"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var r;
  var s = arguments.length;
  var o = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, n, i);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        o = (s < 3 ? r(o) : s > 3 ? r(t, n, o) : r(t, n)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(t, n, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAiInteractionComponent = undefined;
const Time_1 = require("../../../Core/Common/Time");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const AiInteractionItemQueryManager_1 = require("./AiInteraction/AiInteractionItemQueryManager");
const AI_USED_COLD_DOWN = 2000;
let SceneItemAiInteractionComponent = class SceneItemAiInteractionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IsSearchByAi = undefined;
    this.SearchEntity = undefined;
    this.IsUsingByAi = undefined;
    this.LastUsedTime = -AI_USED_COLD_DOWN;
    this.EnableHandler = undefined;
    this.MoveComp = undefined;
    this.OnEntityDeadEvent = undefined;
  }
  static get Dependencies() {
    return [212];
  }
  OnStart() {
    this.LastUsedTime = -AI_USED_COLD_DOWN;
    this.IsUsingByAi = false;
    this.Emn();
    this.OnEntityDeadEvent = () => {
      this.OnEntityDead();
    };
    var e = this.Entity.GetComponent(0).GetVisible();
    this.EnableHandler = e ? -1 : this.Entity.Disable("[SceneItemAiInteractionComponent.OnStart] visible为false");
    this.MoveComp = this.Entity.GetComponent(132);
    AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().RegisterItem(this.Entity);
    return true;
  }
  OnEnd() {
    AiInteractionItemQueryManager_1.AiInteractionItemQueryManager.Get().UnRegisterItem(this.Entity);
    return true;
  }
  Emn() {
    this.IsSearchByAi = false;
    this.SearchEntity = undefined;
  }
  OnEntityDead() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.SearchEntity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnEntityDeadEvent);
    this.Emn();
  }
  SetSearched(e) {
    if (!this.IsSearchByAi) {
      this.IsSearchByAi = true;
      this.SearchEntity = e;
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnEntityDeadEvent);
    }
  }
  SetUnSearched() {
    if (this.IsSearchByAi) {
      this.OnEntityDead();
    }
  }
  OnLastUsed() {
    this.SetUnSearched();
    this.LastUsedTime = Time_1.Time.WorldTime;
  }
  CanBeUsed() {
    if (this.MoveComp) {
      return !this.MoveComp.EnableMovement;
    } else {
      return Time_1.Time.WorldTime - this.LastUsedTime > AI_USED_COLD_DOWN;
    }
  }
  HiddenItem(e) {
    return e !== (this.EnableHandler !== -1) && (e ? this.EnableHandler = this.Entity.Disable("[SceneItemAiInteractionComponent.HiddenItem] bHidden为true") : (this.Entity.Enable(this.EnableHandler, "[SceneItemAiInteractionComponent.HiddenItem] bHidden为false"), this.EnableHandler = -1), true);
  }
  ItemAttachEntity(e) {}
  IsSearchByOther(e) {
    return !!this.IsSearchByAi && this.SearchEntity.Id !== e;
  }
};
SceneItemAiInteractionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(153)], SceneItemAiInteractionComponent);
exports.SceneItemAiInteractionComponent = SceneItemAiInteractionComponent; //# sourceMappingURL=SceneItemAiInteractionComponent.js.map