"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataDestroyBullet extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.BulletOwner = 0;
    this.DestroyBulletRowName = "None";
    this.SummonChildBullet = false;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataDestroyBullet;
//# sourceMappingURL=LogicDataDestroyBullet.js.map