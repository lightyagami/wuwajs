"use strict";

var SceneItemMonsterGachaItemComponent_1;
var __decorate = this && this.__decorate || function (e, t, n, r) {
  var o;
  var a = arguments.length;
  var i = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, n, r);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (o = e[s]) {
        i = (a < 3 ? o(i) : a > 3 ? o(t, n, i) : o(t, n)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, n, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMonsterGachaItemComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ItemMaterialManager_1 = require("../../Render/Scene/Item/MaterialController/ItemMaterialManager");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
let SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent_1 = class SceneItemMonsterGachaItemComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.Rnn = () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(this.Lo.MaterialDataPath, UE.ItemMaterialControllerActorData_C, t => {
        if (t) {
          var n = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.Hte.GetSceneInteractionLevelHandleId());
          for (let e = 0; e < n.Num(); e++) {
            var r = n.Get(e);
            ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(r, t);
          }
        }
      });
    };
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemMonsterGachaItemComponent_1)[0];
    this.Lo = e;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(206);
    EventSystem_1.EventSystem.OnceWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    return true;
  }
};
SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(161)], SceneItemMonsterGachaItemComponent);
exports.SceneItemMonsterGachaItemComponent = SceneItemMonsterGachaItemComponent; //# sourceMappingURL=SceneItemMonsterGachaItemComponent.js.map