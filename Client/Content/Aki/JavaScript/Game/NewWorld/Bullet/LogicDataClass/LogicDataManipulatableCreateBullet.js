"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataManipulatableCreateBullet extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.ExistTagsCondition = undefined;
    this.UnExistTagsCondition = undefined;
    this.BulletOwner = 0;
    this.CreateBulletRowName = undefined;
    this.BulletTransform = 0;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataManipulatableCreateBullet;
//# sourceMappingURL=LogicDataManipulatableCreateBullet.js.map