"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyEnableEntity extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.IsEnable = false;
  }
  Constructor() {}
  K2_Notify(t, e) {
    return true;
  }
  GetNotifyName() {
    return "启用实体";
  }
}
exports.default = TsAnimNotifyEnableEntity;
//# sourceMappingURL=TsAnimNotifyEnableEntity.js.map