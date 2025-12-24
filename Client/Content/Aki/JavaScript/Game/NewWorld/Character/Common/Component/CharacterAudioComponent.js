"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var u = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    u = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        u = (r < 3 ? s(u) : r > 3 ? s(e, i, u) : s(e, i)) || u;
      }
    }
  }
  if (r > 3 && u) {
    Object.defineProperty(e, i, u);
  }
  return u;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAudioComponent = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Global_1 = require("../../../../Global");
const GameAudioController_1 = require("../../../../Module/Audio/GameAudioController");
const BulletStaticFunction_1 = require("../../../Bullet/BulletStaticMethod/BulletStaticFunction");
const BaseAudioComponent_1 = require("./BaseAudioComponent");
let CharacterAudioComponent = class CharacterAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments);
    this.SummonerId = 0;
    this.ActorComp = undefined;
    this.CurrentPriority = 0;
    this.BWf = undefined;
    this.kWf = 0;
    this.qWf = (t, e) => {
      if (e) {
        if (this.kWf === 3 || this.kWf === 2) {
          AudioSystem_1.AudioSystem.PostEvent("play_role_ui_execute_state_full_boss");
        } else if (this.kWf === 1) {
          AudioSystem_1.AudioSystem.PostEvent("play_role_ui_execute_state_full_elite", this.ActorComp?.Owner);
        } else {
          BulletStaticFunction_1.HitStaticFunction.PlayHitAudioByActor(this.ActorComp?.Owner, "play_role_ui_execute_state_full_ordinary", this.CurrentPriority);
        }
      }
    };
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
    this.OWf();
    return true;
  }
  OnStart() {
    super.OnStart();
    return !!this.ActorComp?.Valid && !!this.ActorComp.Owner && !(this.Rvl(), this.GWf(), 0);
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
  GWf() {
    var t = this.Entity.GetComponent(0);
    if (t?.IsMonster()) {
      this.kWf = t?.GetMonsterMatchType() ?? 0;
      t = this.Entity.GetComponent(215);
      this.BWf = t?.ListenForTagAddOrRemove(1100879485, this.qWf);
    }
  }
  OWf() {
    if (this.BWf) {
      this.BWf.EndTask();
      this.BWf = undefined;
    }
  }
};
CharacterAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(52)], CharacterAudioComponent);
exports.CharacterAudioComponent = CharacterAudioComponent; //# sourceMappingURL=CharacterAudioComponent.js.map