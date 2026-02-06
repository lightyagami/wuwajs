"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var n;
  var a = arguments.length;
  var i = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, r, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        i = (a < 3 ? n(i) : a > 3 ? n(t, r, i) : n(t, r)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, r, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerAttributeComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseAttributeComponent_1 = require("../../Character/Common/Component/Abilities/BaseAttributeComponent");
let PlayerAttributeComponent = class PlayerAttributeComponent extends BaseAttributeComponent_1.BaseAttributeComponent {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0);
    this.PlayerId = e?.GetPlayerId() ?? 0;
    return true;
  }
  UpdateCurrentValue(e) {
    super.UpdateCurrentValue(e);
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(this.PlayerId)) {
      ModelManager_1.ModelManager.CreatureModel.GetEntity(t.GetCreatureDataId())?.Entity?.GetComponent(183)?.UpdateCurrentValue(e);
    }
  }
};
PlayerAttributeComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(210)], PlayerAttributeComponent);
exports.PlayerAttributeComponent = PlayerAttributeComponent; //# sourceMappingURL=PlayerAttributeComponent.js.map