"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(e, o, n) : r(e, o)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAudioComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Global_1 = require("../../../../Global");
const GameAudioController_1 = require("../../../../Module/Audio/GameAudioController");
const BaseAudioComponent_1 = require("./BaseAudioComponent");
let CharacterAudioComponent = class CharacterAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments);
    this.SummonerId = 0;
    this.ActorComp = undefined;
    this.CurrentPriority = 0;
  }
  OnInit() {
    super.OnInit();
    this.ActorComp = this.Entity.CheckGetComponent(3);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    if (this.SummonerId !== 0) {
      GameAudioController_1.GameAudioController.RemoveRolePrioritySummon(this.SummonerId, this.Entity.Id);
    }
    return true;
  }
  OnStart() {
    super.OnStart();
    return !!this.ActorComp?.Valid && !!this.ActorComp.Owner && !(this.Rvl(), 0);
  }
  OnAkComponentCreated() {
    super.OnAkComponentCreated();
    this.Rvl();
  }
  Rvl() {
    var t;
    if (this.ActorComp?.Owner) {
      t = Global_1.Global.BaseCharacter?.EntityId ?? 0;
      if (this.ActorComp.IsMyRoleAndCtrlByMe()) {
        if (this.Entity.Id === t) {
          this.CurrentPriority = 0;
          GameAudioController_1.GameAudioController.SetRolePriority(0, this.ActorComp.Owner);
        } else {
          this.CurrentPriority = 1;
          GameAudioController_1.GameAudioController.SetRolePriority(1, this.ActorComp.Owner);
        }
      } else if (this.ActorComp.IsMySummonsAndCtrlByMe()) {
        this.SummonerId = this.ActorComp.GetSummonerId();
        if (this.SummonerId === t) {
          this.CurrentPriority = 0;
          GameAudioController_1.GameAudioController.SetRolePriority(0, this.ActorComp.Owner);
        } else {
          this.CurrentPriority = 1;
          GameAudioController_1.GameAudioController.SetRolePriority(1, this.ActorComp.Owner);
        }
        GameAudioController_1.GameAudioController.AddRolePrioritySummon(this.SummonerId, this.Entity.Id, this.ActorComp.Owner);
      } else {
        this.CurrentPriority = 2;
        GameAudioController_1.GameAudioController.SetRolePriority(2, this.ActorComp.Owner);
      }
    }
  }
};
CharacterAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(51)], CharacterAudioComponent);
exports.CharacterAudioComponent = CharacterAudioComponent; //# sourceMappingURL=CharacterAudioComponent.js.map