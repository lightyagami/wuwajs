"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoguePlayerHpHandle = undefined;
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LOW_HP_CUE_ID = 2710000002;
const HURT_CUE_ID = 2710000001;
const LOW_HP_PERCENT = 0.3;
class SurvivorsRoguePlayerHpHandle {
  constructor() {
    this.gU = false;
    this.zna = 0;
    this.aeu = undefined;
    this.u9d = 0;
    this.c9d = 0;
    this.IRe = undefined;
    this.r1t = 500;
    this.q7e = () => {
      this.IRe = undefined;
      this.d9d();
    };
  }
  Init() {
    this.gU = true;
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (i?.Valid) {
      this.aeu = i.Entity.GetComponent(21);
    }
  }
  OnPlayerHpChange(i) {
    if (!!this.gU && !(i.MaxHp <= 0)) {
      if (i.Hp < this.zna) {
        this.m9d();
      }
      this.zna = i.Hp;
      if (i.Hp / i.MaxHp <= LOW_HP_PERCENT) {
        this.f9d();
      } else {
        this.g9d();
      }
    }
  }
  f9d() {
    if (!(this.u9d > 0)) {
      if (this.aeu) {
        this.u9d = this.aeu.AddCue(LOW_HP_CUE_ID);
      }
    }
  }
  g9d() {
    if (!(this.u9d <= 0)) {
      this.aeu?.RemoveCueByHandle(this.u9d);
      this.u9d = 0;
    }
  }
  m9d() {
    if (!(this.c9d > 0)) {
      if (this.aeu) {
        this.c9d = this.aeu.AddCue(HURT_CUE_ID);
        this.kot();
      }
    }
  }
  d9d() {
    if (!(this.c9d <= 0)) {
      this.aeu?.RemoveCueByHandle(this.c9d);
      this.c9d = 0;
    }
  }
  kot() {
    this.IRe = TimerSystem_1.TimerSystem.Delay(this.q7e, this.r1t);
  }
  xHe() {
    if (this.IRe) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
  Clear() {
    this.g9d();
    this.d9d();
    this.xHe();
    this.gU = false;
  }
}
exports.SurvivorsRoguePlayerHpHandle = SurvivorsRoguePlayerHpHandle;
//# sourceMappingURL=SurvivorsRoguePlayerHpHandle.js.map