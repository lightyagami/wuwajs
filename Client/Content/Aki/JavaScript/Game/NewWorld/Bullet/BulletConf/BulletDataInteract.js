"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletDataInteract = void 0;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataInteract {
  constructor(t) {
    this.Oqc = "", this.qqc = !1, this.Gqc = !1, this.Pe = t
  }
  get SceneInteract() {
    return this.Fqc(), this.Oqc
  }
  get IsSceneInteract() {
    return this.Fqc(), this.qqc
  }
  Fqc() {
    this.Gqc || (this.Gqc = !0, this.Oqc = this.Pe.场景物件交互.ToAssetPathName(), this.qqc = !StringUtils_1.StringUtils.IsEmpty(this.Oqc) && "None" !== this.Oqc)
  }
}
exports.BulletDataInteract = BulletDataInteract;
//# sourceMappingURL=BulletDataInteract.js.map