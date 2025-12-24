"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicPlayerModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class MotorcycleMusicPlayerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.vPm = [];
    this.yPm = -1;
    this.SPm = -1;
    this.UnlockMusicIds = new Set();
    this.Wqf = 0;
    this.X2n = false;
    this.MPm = -1;
    this.M4f = undefined;
    this.CurrentPlayMusicTotalTime = 0;
    this.IPm = [];
    this.mpf = new Map();
    this.vW = 0;
    this.kZf = true;
  }
  get IsEnable() {
    return this.vW === 0 && this.kZf;
  }
  IncreaseDisableCount() {
    this.vW++;
  }
  DecreaseDisableCount() {
    this.vW = this.vW - 1;
  }
  SetFunctionEnable(e) {
    this.kZf = e;
  }
  LoadLocalStorageData() {
    this.M4f = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot) ?? new Set();
    this.Wqf = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcyclePlayMode) ?? 0;
    return true;
  }
  IsMusicFavorite(e) {
    return this.vPm.includes(e);
  }
  ToggleMusicFavorite(e) {
    if (this.IsMusicFavorite(e)) {
      var t = this.vPm.indexOf(e);
      if (t !== -1) {
        this.vPm.splice(t, 1);
      }
    } else {
      if (this.vPm.length >= ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteCountLimit()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips06");
        return false;
      }
      this.vPm.unshift(e);
    }
    return true;
  }
  GetFavoriteMusicList() {
    return this.vPm;
  }
  SetFavoriteMusicList(e) {
    this.vPm = Array.from(e);
  }
  GetCurrentPlayList() {
    return this.IPm;
  }
  SetPlayList(e) {
    this.IPm = e;
  }
  IsMusicUnlock(e) {
    return ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e);
  }
  GetMusicByAlbum(t) {
    var e;
    if (t === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      return this.vPm.map(e => ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e));
    } else if (this.mpf.has(t)) {
      return this.mpf.get(t);
    } else {
      e = (ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? []).filter(e => e.Album.includes(t));
      this.mpf.set(t, e);
      return e;
    }
  }
  GetUnlockMusicByAlbum(e) {
    var t = this.GetMusicByAlbum(e);
    if (e === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      return t;
    } else {
      return t.filter(e => this.IsMusicUnlock(e.Id)).sort((e, t) => {
        var i = this.IsMusicUnlock(e.Id);
        if (i !== this.IsMusicUnlock(t.Id)) {
          if (i) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return e.Id - t.Id;
        }
      });
    }
  }
  GetCurPlayMusicId() {
    return this.yPm;
  }
  SetCurPlayMusic(e, t) {
    if (e === this.SPm) {
      this.MPm = this.yPm;
    } else {
      this.SPm = e;
      this.MPm = -1;
    }
    this.yPm = t;
    this.X2n = false;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayAlbumId, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayMusicId, t);
  }
  GetPrevMusicId() {
    return this.MPm;
  }
  ClearPrevMusicId() {
    this.MPm = -1;
  }
  GetCurPlayAlbum() {
    return this.SPm;
  }
  GetIsPause() {
    return this.X2n;
  }
  SetIsPause(e) {
    this.X2n = e;
  }
  GetPlayMode() {
    return this.Wqf;
  }
  SetCurPlayMode(e) {
    this.Wqf = e;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcyclePlayMode, e);
  }
  IsMusicNew(e) {
    if (this.M4f === undefined) {
      this.M4f = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot);
    }
    return this.IsMusicUnlock(e) && (this.M4f?.has(e) ?? false);
  }
  AddMusicListToNew(e) {
    if (this.M4f === undefined) {
      this.M4f = new Set();
    }
    for (const t of e) {
      if (!this.M4f.has(t)) {
        this.M4f.add(t);
      }
    }
    this.SaveCacheMusicNewData();
  }
  ClearMusicNew(e) {
    if (this.M4f !== undefined && this.M4f.has(e)) {
      this.M4f.delete(e);
      this.SaveCacheMusicNewData();
    }
  }
  SaveCacheMusicNewData() {
    if (this.M4f) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot, this.M4f);
    }
  }
  CheckAlbumHasNewMusic(e) {
    return this.GetMusicByAlbum(e).some(e => this.IsMusicNew(e.Id));
  }
  ClearAlbum2MusicCache() {
    this.mpf.clear();
  }
}
exports.MotorcycleMusicPlayerModel = MotorcycleMusicPlayerModel;
//# sourceMappingURL=MotorcycleMusicPlayerModel.js.map