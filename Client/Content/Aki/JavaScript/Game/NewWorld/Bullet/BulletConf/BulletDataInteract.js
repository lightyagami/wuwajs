"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataInteract = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataInteract {
  constructor(t) {
    this.Oqc = "";
    this.qqc = false;
    this.Gqc = false;
    this.Pe = t;
  }
  get SceneInteract() {
    this.Fqc();
    return this.Oqc;
  }
  get IsSceneInteract() {
    this.Fqc();
    return this.qqc;
  }
  Fqc() {
    if (!this.Gqc) {
      this.Gqc = true;
      this.Oqc = this.Pe.场景物件交互.ToAssetPathName();
      this.qqc = !StringUtils_1.StringUtils.IsEmpty(this.Oqc) && this.Oqc !== "None";
    }
  }
}
exports.BulletDataInteract = BulletDataInteract;
//# sourceMappingURL=BulletDataInteract.js.map