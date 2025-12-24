"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographConfig = undefined;
const PhonographAlbumAll_1 = require("../../../Core/Define/ConfigQuery/PhonographAlbumAll");
const PhonographAlbumById_1 = require("../../../Core/Define/ConfigQuery/PhonographAlbumById");
const PhonographMusicAll_1 = require("../../../Core/Define/ConfigQuery/PhonographMusicAll");
const PhonographMusicById_1 = require("../../../Core/Define/ConfigQuery/PhonographMusicById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PhonographConfig extends ConfigBase_1.ConfigBase {
  GetMusicList() {
    return PhonographMusicAll_1.configPhonographMusicAll.GetConfigList();
  }
  GetMusicById(e) {
    return PhonographMusicById_1.configPhonographMusicById.GetConfig(e);
  }
  GetMusicAlbumList() {
    return PhonographAlbumAll_1.configPhonographAlbumAll.GetConfigList();
  }
  GetMusicAlbumById(e) {
    return PhonographAlbumById_1.configPhonographAlbumById.GetConfig(e);
  }
}
exports.PhonographConfig = PhonographConfig;
//# sourceMappingURL=PhonographConfig.js.map