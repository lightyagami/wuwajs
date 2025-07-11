"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBuffEffectAddBuff = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class PhantomArenaBuffEffectAddBuff {
  constructor(f, t) {
    this.Data = f;
    this.Manager = t;
  }
  ShowBuffEffect() {
    for (const t of this.Data.Effect.tD1._C1) {
      var f = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBuffConfig(t);
      if (f.BuffShowType !== 0) {
        this.Manager.Proxy.ShowAddBuffEffect(f.BuffShowType, this.Data.SelectFightIdList);
      }
    }
  }
}
exports.PhantomArenaBuffEffectAddBuff = PhantomArenaBuffEffectAddBuff;
//# sourceMappingURL=PhantomArenaBuffEffectAddBuff.js.map