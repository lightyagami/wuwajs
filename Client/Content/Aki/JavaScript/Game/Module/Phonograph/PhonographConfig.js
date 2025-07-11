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
const ModelManager_1 = require("../../Manager/ModelManager");
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
  GetUnlockItemIds() {
    const e = this.GetMusicList();
    if (!e) {
      return [];
    }
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(60004);
    const o = [];
    r.forEach(r => {
      if (e.some(e => e.ItemId === r.GetConfigId())) {
        o.push(r.GetConfigId());
      }
    });
    return o;
  }
}
exports.PhonographConfig = PhonographConfig;
//# sourceMappingURL=PhonographConfig.js.map