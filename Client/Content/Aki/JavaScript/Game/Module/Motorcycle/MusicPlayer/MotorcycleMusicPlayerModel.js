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
    this.ODm = [];
    this.GDm = -1;
    this.FDm = -1;
    this.UnlockMusicIds = new Set();
    this.e8f = 0;
    this.X2n = false;
    this.NDm = -1;
    this.x$f = undefined;
    this.CurrentPlayMusicTotalTime = 0;
    this.jDm = [];
    this.zyf = new Map();
    this.vW = 0;
    this.NSg = true;
  }
  get IsEnable() {
    return this.vW === 0 && this.NSg;
  }
  IncreaseDisableCount() {
    this.vW++;
  }
  DecreaseDisableCount() {
    this.vW = this.vW - 1;
  }
  SetFunctionEnable(e) {
    this.NSg = e;
  }
  LoadLocalStorageData() {
    this.x$f = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot) ?? new Set();
    this.e8f = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcyclePlayMode) ?? 0;
    return true;
  }
  IsMusicFavorite(e) {
    return this.ODm.includes(e);
  }
  ToggleMusicFavorite(e) {
    if (this.IsMusicFavorite(e)) {
      var t = this.ODm.indexOf(e);
      if (t !== -1) {
        this.ODm.splice(t, 1);
      }
    } else {
      if (this.ODm.length >= ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteCountLimit()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips06");
        return false;
      }
      this.ODm.unshift(e);
    }
    return true;
  }
  GetFavoriteMusicList() {
    return this.ODm;
  }
  SetFavoriteMusicList(e) {
    this.ODm = Array.from(e);
  }
  GetCurrentPlayList() {
    return this.jDm;
  }
  SetPlayList(e) {
    this.jDm = e;
  }
  IsMusicUnlock(e) {
    return ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e);
  }
  GetMusicByAlbum(t) {
    var e;
    if (t === ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFavoriteAlbumId()) {
      return this.ODm.map(e => ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e));
    } else if (this.zyf.has(t)) {
      return this.zyf.get(t);
    } else {
      e = (ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? []).filter(e => e.Album.includes(t));
      this.zyf.set(t, e);
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
    return this.GDm;
  }
  SetCurPlayMusic(e, t) {
    if (e === this.FDm) {
      this.NDm = this.GDm;
    } else {
      this.FDm = e;
      this.NDm = -1;
    }
    this.GDm = t;
    this.X2n = false;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayAlbumId, e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayMusicId, t);
  }
  GetPrevMusicId() {
    return this.NDm;
  }
  ClearPrevMusicId() {
    this.NDm = -1;
  }
  GetCurPlayAlbum() {
    return this.FDm;
  }
  GetIsPause() {
    return this.X2n;
  }
  SetIsPause(e) {
    this.X2n = e;
  }
  GetPlayMode() {
    return this.e8f;
  }
  SetCurPlayMode(e) {
    this.e8f = e;
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcyclePlayMode, e);
  }
  IsMusicNew(e) {
    if (this.x$f === undefined) {
      this.x$f = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot);
    }
    return this.IsMusicUnlock(e) && (this.x$f?.has(e) ?? false);
  }
  AddMusicListToNew(e) {
    if (this.x$f === undefined) {
      this.x$f = new Set();
    }
    for (const t of e) {
      if (!this.x$f.has(t)) {
        this.x$f.add(t);
      }
    }
    this.SaveCacheMusicNewData();
  }
  ClearMusicNew(e) {
    if (this.x$f !== undefined && this.x$f.has(e)) {
      this.x$f.delete(e);
      this.SaveCacheMusicNewData();
    }
  }
  SaveCacheMusicNewData() {
    if (this.x$f) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleMusicRedDot, this.x$f);
    }
  }
  CheckAlbumHasNewMusic(e) {
    return this.GetMusicByAlbum(e).some(e => this.IsMusicNew(e.Id));
  }
  ClearAlbum2MusicCache() {
    this.zyf.clear();
  }
}
exports.MotorcycleMusicPlayerModel = MotorcycleMusicPlayerModel;
//# sourceMappingURL=MotorcycleMusicPlayerModel.js.map