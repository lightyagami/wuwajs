"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalConfig = undefined;
const BirthDayTextByDateAndType_1 = require("../../../../Core/Define/ConfigQuery/BirthDayTextByDateAndType");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PlayerHeadReAll_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReAll");
const PlayerHeadReById_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class PersonalConfig extends ConfigBase_1.ConfigBase {
  GetPlayerHeadConfig(e) {
    return PlayerHeadReById_1.configPlayerHeadReById.GetConfig(e);
  }
  GetAllPlayerHeadConfig() {
    return PlayerHeadReAll_1.configPlayerHeadReAll.GetConfigList();
  }
  GetBirthLocalText(e, r) {
    r = BirthDayTextByDateAndType_1.configBirthDayTextByDateAndType.GetConfig(e, r);
    let a = "";
    return a = (a = r ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.TextId) ?? "" : a) === "" ? String(e) : a;
  }
}
exports.PersonalConfig = PersonalConfig;
//# sourceMappingURL=PersonalConfig.js.map