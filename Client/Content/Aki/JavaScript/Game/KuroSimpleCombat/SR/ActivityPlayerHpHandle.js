"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPlayerHpHandle = undefined;
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LOW_HP_CUE_ID = 2710000002;
const HURT_CUE_ID = 2710000001;
const LOW_HP_PERCENT = 0.3;
class ActivityPlayerHpHandle {
  constructor() {
    this.gU = false;
    this.zna = 0;
    this.aeu = undefined;
    this.wem = 0;
    this.Lem = 0;
    this.IRe = undefined;
    this.r1t = 500;
    this.LowHpCueId = LOW_HP_CUE_ID;
    this.HurtCueId = HURT_CUE_ID;
    this.LowHpPercent = LOW_HP_PERCENT;
    this.q7e = () => {
      this.IRe = undefined;
      this.Pem();
    };
  }
  Init(i, t, s, e) {
    this.gU = true;
    if (i !== undefined) {
      this.LowHpCueId = i;
    }
    if (s !== undefined) {
      this.HurtCueId = s;
    }
    if (t !== undefined) {
      this.LowHpPercent = t;
    }
    if (e !== undefined) {
      this.r1t = e;
    }
    i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (i?.Valid) {
      this.aeu = i.Entity.GetComponent(21);
    }
  }
  OnPlayerHpChange(i) {
    if (!!this.gU && !(i.MaxHp <= 0)) {
      if (i.Hp < this.zna && i.Hp < i.MaxHp) {
        this.Aem();
      }
      this.zna = i.Hp;
      if (i.Hp / i.MaxHp <= this.LowHpPercent) {
        this.Dem();
      } else {
        this.Uem();
      }
    }
  }
  Dem() {
    if (!(this.wem > 0)) {
      if (this.aeu && this.LowHpCueId > 0) {
        this.wem = this.aeu.AddCue(this.LowHpCueId);
      }
    }
  }
  Uem() {
    if (!(this.wem <= 0)) {
      this.aeu?.RemoveCueByHandle(this.wem);
      this.wem = 0;
    }
  }
  Aem() {
    if (!(this.Lem > 0)) {
      if (this.aeu && this.HurtCueId > 0) {
        this.Lem = this.aeu.AddCue(this.HurtCueId);
        this.kot();
      }
    }
  }
  Pem() {
    if (!(this.Lem <= 0)) {
      this.aeu?.RemoveCueByHandle(this.Lem);
      this.Lem = 0;
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
    this.Uem();
    this.Pem();
    this.xHe();
    this.gU = false;
  }
}
exports.ActivityPlayerHpHandle = ActivityPlayerHpHandle;
//# sourceMappingURL=ActivityPlayerHpHandle.js.map