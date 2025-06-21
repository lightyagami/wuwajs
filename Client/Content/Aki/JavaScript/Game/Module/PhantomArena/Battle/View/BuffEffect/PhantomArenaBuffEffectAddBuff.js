"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBuffEffectAddBuff = void 0;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class PhantomArenaBuffEffectAddBuff {
  constructor(f, t) {
    this.Data = f, this.Manager = t
  }
  ShowBuffEffect() {
    for (const t of this.Data.Effect.bx1.Ng1) {
      var f = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBuffConfig(t);
      0 !== f.BuffShowType && this.Manager.Proxy.ShowAddBuffEffect(f.BuffShowType, this.Data.SelectFightIdList)
    }
  }
}
exports.PhantomArenaBuffEffectAddBuff = PhantomArenaBuffEffectAddBuff;
//# sourceMappingURL=PhantomArenaBuffEffectAddBuff.js.map