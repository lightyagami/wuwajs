"use strict";
var __decorate = this && this.__decorate || function(t, e, o, i) {
  var r, s = arguments.length,
    n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, o, i);
  else
    for (var h = t.length - 1; 0 <= h; h--)(r = t[h]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, o, n) : r(e, o)) || n);
  return 3 < s && n && Object.defineProperty(e, o, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterAudioComponent = void 0;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Global_1 = require("../../../../Global"),
  GameAudioController_1 = require("../../../../Module/Audio/GameAudioController"),
  BaseAudioComponent_1 = require("./BaseAudioComponent");
let CharacterAudioComponent = class CharacterAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments), this.SummonerId = 0, this.ActorComp = void 0, this.CurrentPriority = 0
  }
  OnInit() {
    return super.OnInit(), this.ActorComp = this.Entity.CheckGetComponent(3), !0
  }
  OnEnd() {
    return super.OnEnd(), 0 !== this.SummonerId && GameAudioController_1.GameAudioController.RemoveRolePrioritySummon(this.SummonerId, this.Entity.Id), !0
  }
  OnStart() {
    return super.OnStart(), !(!this.ActorComp?.Valid || !this.ActorComp.Owner || (this.Rvl(), 0))
  }
  OnAkComponentCreated() {
    super.OnAkComponentCreated(), this.Rvl()
  }
  Rvl() {
    var t;
    this.ActorComp?.Owner && (t = Global_1.Global.BaseCharacter?.EntityId ?? 0, this.ActorComp.IsMyRoleAndCtrlByMe() ? this.Entity.Id === t ? (this.CurrentPriority = 0, GameAudioController_1.GameAudioController.SetRolePriority(0, this.ActorComp.Owner)) : (this.CurrentPriority = 1, GameAudioController_1.GameAudioController.SetRolePriority(1, this.ActorComp.Owner)) : this.ActorComp.IsMySummonsAndCtrlByMe() ? (this.SummonerId = this.ActorComp.GetSummonerId(), this.SummonerId === t ? (this.CurrentPriority = 0, GameAudioController_1.GameAudioController.SetRolePriority(0, this.ActorComp.Owner)) : (this.CurrentPriority = 1, GameAudioController_1.GameAudioController.SetRolePriority(1, this.ActorComp.Owner)), GameAudioController_1.GameAudioController.AddRolePrioritySummon(this.SummonerId, this.Entity.Id, this.ActorComp.Owner)) : (this.CurrentPriority = 2, GameAudioController_1.GameAudioController.SetRolePriority(2, this.ActorComp.Owner)))
  }
};
CharacterAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(51)], CharacterAudioComponent), exports.CharacterAudioComponent = CharacterAudioComponent;
//# sourceMappingURL=CharacterAudioComponent.js.map