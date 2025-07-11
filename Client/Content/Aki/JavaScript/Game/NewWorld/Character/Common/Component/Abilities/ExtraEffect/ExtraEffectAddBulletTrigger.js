"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddBulletTrigger = undefined;
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const ExtraEffectPassiveEffects_1 = require("./ExtraEffectPassiveEffects");
class AddBulletTrigger extends ExtraEffectPassiveEffects_1.PassiveEffects {
  constructor() {
    super(...arguments);
    this.BulletIds = [];
    this.BulletDtType = -1;
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.EventType = Number(e[0]);
    this.TargetType = Number(e[1]);
    this.BulletIds = e[2].split("#").map(e => BigInt(e));
    this.BulletDtType = Number(e[3] ?? -1);
  }
  OnExecute() {
    var e = this.GetEffectTarget()?.GetEntity();
    var t = e?.CheckGetComponent(3)?.ActorTransform;
    var r = this.InstigatorBuffComponent?.ActorComponent?.Entity;
    if (e && r && t) {
      var s = this.Buff.MessageId;
      for (const i of this.BulletIds) {
        BulletController_1.BulletController.CreateBulletCustomTarget(r, String(i), t, {
          SyncType: 1,
          DtType: this.BulletDtType,
          CreateOnAuthority: false
        }, s);
      }
    }
  }
}
exports.AddBulletTrigger = AddBulletTrigger;
//# sourceMappingURL=ExtraEffectAddBulletTrigger.js.map