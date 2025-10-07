"use strict";

var __decorate = this && this.__decorate || function (e, t, n, r) {
  var o;
  var a = arguments.length;
  var s = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, r);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (o = e[i]) {
        s = (a < 3 ? o(s) : a > 3 ? o(t, n, s) : o(t, n)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerGameplayCueComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BaseGameplayCueComponent_1 = require("../../Character/Common/Component/Abilities/BaseGameplayCueComponent");
let PlayerGameplayCueComponent = class PlayerGameplayCueComponent extends BaseGameplayCueComponent_1.BaseGameplayCueComponent {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
    this.xie = (e, t) => {
      for (const n of this.GetAllCurrentCueRef()) {
        if (n.EntityHandle !== e) {
          n.OnChangeRole(e);
        }
      }
    };
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0);
    this.PlayerId = e?.GetPlayerId() ?? 0;
    return true;
  }
  OnStart() {
    super.OnStart();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  GetEntityHandle() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.PlayerId)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(e ?? 0);
  }
};
PlayerGameplayCueComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(227)], PlayerGameplayCueComponent);
exports.PlayerGameplayCueComponent = PlayerGameplayCueComponent; //# sourceMappingURL=PlayerGameplayCueComponent.js.map