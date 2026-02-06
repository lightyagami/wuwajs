"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionBase = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class GameplayAbilityVisionBase {
  constructor(t) {
    this.VisionComponent = t;
  }
  static Spawn(t) {
    t = new this(t);
    t.Create();
    return t;
  }
  Create() {
    this.OnCreate();
  }
  Destroy() {
    this.OnDestroy();
  }
  Tick(t) {
    this.OnTick(t);
  }
  ActivateAbility() {
    return this.OnActivateAbility();
  }
  EndAbility() {
    return this.OnEndAbility();
  }
  HandlePress(t, e) {
    return false;
  }
  TeleportStart() {
    this.OnTeleportStart();
  }
  OnCreate() {}
  OnDestroy() {}
  OnTick(t) {}
  OnActivateAbility() {
    return true;
  }
  OnEndAbility() {
    return true;
  }
  OnTeleportStart() {}
  get Entity() {
    return this.VisionComponent.Entity;
  }
  get EntityHandle() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.VisionComponent.Entity.Id);
  }
  get CreatureDataComponent() {
    return this.Entity.GetComponent(0);
  }
  get ActorComponent() {
    return this.Entity.GetComponent(3);
  }
  get AttributeComponent() {
    return this.Entity.GetComponent(184);
  }
  get GameplayTagComponent() {
    return this.Entity.GetComponent(217);
  }
  get SkillComponent() {
    return this.Entity.GetComponent(43);
  }
  get BuffComponent() {
    return this.Entity.GetComponent(185);
  }
  get MoveComponent() {
    return this.Entity.GetComponent(189);
  }
  get AudioComponent() {
    return this.Entity.GetComponent(54);
  }
  get TeamComponent() {
    return this.Entity.GetComponent(101);
  }
  get CueComponent() {
    return this.Entity.GetComponent(21);
  }
}
exports.GameplayAbilityVisionBase = GameplayAbilityVisionBase;
//# sourceMappingURL=GameplayAbilityVisionBase.js.map