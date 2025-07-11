"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundAreaPlayTipsModel = undefined;
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
class SoundAreaPlayTipsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.FO_ = new Map();
  }
  OnLeaveLevel() {
    this.FO_.clear();
    return true;
  }
  NO_(e) {
    return SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e)?.MaxCountType ?? 0;
  }
  AddShowInfoIdCount(e) {
    var o;
    var r;
    var a = this.NO_(e);
    if (a === 0) {
      r = (o = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips) ?? new Map()).get(e) ?? 0;
      o.set(e, r += 1);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips, o);
    } else if (a === 1) {
      r = this.FO_.get(e) ?? 0;
      this.FO_.set(e, r += 1);
    }
  }
  GetInfoIdShowCount(e) {
    var o = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    var r = this.NO_(e);
    if (o?.MaxCount) {
      if (r === 0) {
        return (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips) ?? new Map()).get(e) ?? 0;
      }
      if (r === 1) {
        return this.FO_.get(e) ?? 0;
      }
    }
    return 0;
  }
  CheckInfoIdCanShow(e) {
    var o = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    if (o?.MaxCount && this.GetInfoIdShowCount(e) >= o?.MaxCount) {
      return false;
    }
    return true;
  }
}
exports.SoundAreaPlayTipsModel = SoundAreaPlayTipsModel;
//# sourceMappingURL=SoundAreaPlayTipsModel.js.map