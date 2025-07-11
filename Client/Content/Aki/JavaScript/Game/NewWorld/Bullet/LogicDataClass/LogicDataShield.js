"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataShield extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.DefenseCanDodgeBullet = false;
    this.DefenseCaughtTrigger = true;
    this.DefenseBulletIdList = undefined;
    this.NotDefenseBulletIdList = undefined;
    this.SelfCampType = 0;
    this.FriendCampType = 0;
    this.EnemyCampType = 0;
    this.DefenseAngle = 0;
    this.AddBuffToSelf = undefined;
    this.AddBuffToEnemy = undefined;
    this.DecreaseBulletHitCount = 0;
    this.SelfCalcTypeArray = undefined;
    this.FriendCalcTypeArray = undefined;
    this.EnemyCalcTypeArray = undefined;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataShield;
//# sourceMappingURL=LogicDataShield.js.map