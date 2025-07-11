"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherModel = undefined;
const UE = require("ue");
const CipherGameplayById_1 = require("../../../Core/Define/ConfigQuery/CipherGameplayById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LEN = 4;
const INVLID = -1;
class CipherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Pye = "";
    this.xye = undefined;
    this.wye = undefined;
    this.Bye = undefined;
  }
  InitCipherConfig(e) {
    this.Pye = e;
    if (this.GetCipherConfig(e)) {
      this.xye ||= new Array();
      this.wye ||= new Array();
      this.Bye ||= new Map();
      this.xye.length = 0;
      this.wye.length = 0;
      this.Bye.clear();
      var t = this.GetCipherConfig(e).Password.toString().padStart(LEN, "0");
      for (let e = 0; e < LEN; e++) {
        var i = UE.KismetStringLibrary.Conv_StringToInt(t[e]);
        this.xye.push(i);
        this.wye.push(INVLID);
        this.Bye.set(i, false);
      }
    }
  }
  GetCipherConfig(e) {
    return CipherGameplayById_1.configCipherGameplayById.GetConfig(e);
  }
  IsPasswordCorrect() {
    for (let e = 0; e < LEN; e++) {
      this.Bye.set(e, this.xye[e] === this.wye[e]);
    }
    for (let e = 0; e < LEN; e++) {
      if (!this.Bye.get(e)) {
        return false;
      }
    }
    return true;
  }
  GetCheckResultByIndex(e) {
    return this.Bye.get(e) ?? false;
  }
  SetCurPassword(e, t) {
    if (!(e >= this.wye.length)) {
      this.wye[e] = t;
    }
  }
  GetCipherConfigId() {
    return this.Pye;
  }
}
exports.CipherModel = CipherModel;
//# sourceMappingURL=CipherModel.js.map