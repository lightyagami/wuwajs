"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class MotorcycleDiyModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CurCanUseStickerIds = [];
    this.OwnedSkinIds = [];
    this.OwnedFrameIds = [];
    this.OwnedStickerIds = [];
    this.CurSkinId = 0;
    this.CurFrameId = 0;
    this.vHf = new Map();
    this.yHf = new Map();
    this.kCf = 0;
  }
  OnInit() {
    this.vHf.set(1, 0);
    this.vHf.set(2, 0);
    this.vHf.set(3, 0);
    return true;
  }
  pJf(t) {
    var e;
    var r;
    var o = [];
    for ([e, r] of t) {
      var i = {
        s5n: e,
        m9n: r,
        b9n: 0
      };
      o.push(i);
    }
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(o);
  }
  UpdateMotorCanUseSkinInfo(t) {
    if (t && t.b0f) {
      t = t.b0f;
      this.CurCanUseStickerIds = [];
      if (t.P0f) {
        for (const e of t.P0f) {
          this.CurCanUseStickerIds.push(e);
        }
      }
    }
  }
  UpdateMotorOutlookInfo(t) {
    if (t && t.y0f) {
      var t = t.y0f;
      var e = t?.M0f;
      var t = t?.E0f;
      if (e && (e.R0f && (this.OwnedSkinIds = [...e.R0f]), e.L0f)) {
        this.OwnedStickerIds = [...e.L0f];
      }
      if (t) {
        this.CurSkinId = t.w0f;
        var r = t.S0f;
        if (r) {
          for (let t = 0; t < r.length; t++) {
            var o = r[t];
            var i = t + 1;
            this.vHf.set(i, o);
          }
        }
      }
    }
  }
  AddMotorOutlookInfo(t) {
    if (t) {
      var e = new Map();
      if (t.I0f) {
        for (const r of t.I0f) {
          if (!this.OwnedSkinIds.includes(r)) {
            this.OwnedSkinIds.push(r);
          }
          e.set(r, 1);
        }
      }
      if (t.T0f) {
        for (const o of t.T0f) {
          if (!this.OwnedStickerIds.includes(o)) {
            this.OwnedStickerIds.push(o);
          }
          e.set(o, 1);
        }
      }
      this.pJf(e);
    }
  }
  UpdateMotorOutlookOwnedChange(t) {
    t = t.M0f;
    if (t && (t.R0f && (this.OwnedSkinIds = [...t.R0f]), t.L0f)) {
      this.OwnedStickerIds = [...t.L0f];
      t.L0f.forEach((t, e) => {
        this.UpdateItemNewUnlocked(t, true);
      });
    }
  }
  UpdateMotorOutlookEquippedChange(t) {
    t = t.E0f;
    if (t) {
      this.CurSkinId = t.w0f;
      var e = t.S0f;
      if (e) {
        for (let t = 0; t < e.length; t++) {
          var r = e[t];
          var o = t + 1;
          this.vHf.set(o, r);
          this.UpdateItemNewUnlocked(r, false);
        }
      }
    }
  }
  UpdateItemNewUnlocked(t, e) {
    let r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId);
    var o = (r = r || new Map()).get(t);
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(t);
    var i = i && i.FreeFlag;
    if (o !== false && !i) {
      r.set(t, e);
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId, r);
  }
  RedDotHasAnyNewItem() {
    return this.RedDotHasNewStickerByAnyPart();
  }
  RedDotHasNewStickerByAnyPart() {
    for (const t of [1, 2, 3]) {
      if (this.RedDotHasNewStickerByPart(t)) {
        return true;
      }
    }
    return false;
  }
  RedDotHasNewStickerByPart(t) {
    for (const o of this.CurCanUseStickerIds) {
      var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(o);
      var r = this.GetStickerState(o);
      if (e && e.PartId === t && this.HasSticker(o) && (r === 2 || r === 1)) {
        if (this.RedDotHasNewItem(o)) {
          return true;
        }
      }
    }
    return false;
  }
  RedDotHasNewItem(t) {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId);
    return !!e && (e.get(t) ?? false);
  }
  GetStickerState(t) {
    if (this.CurCanUseStickerIds.includes(t)) {
      if (this.IsBanSticker(t)) {
        return 4;
      } else if (Array.from(this.vHf.values()).includes(t)) {
        return 1;
      } else if (this.OwnedStickerIds.includes(t)) {
        return 2;
      } else {
        return 3;
      }
    } else {
      return 0;
    }
  }
  GetMotorDiyTabList() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("MotorcycleDiyRootView");
    var r = e.length;
    var o = [];
    for (let t = 0; t < r; t++) {
      var i = e[t];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(i.FunctionId)) {
        o.push(i);
      }
    }
    return o;
  }
  GetSelectedStickerIdList(t = false) {
    var e = [];
    for (const o of [1, 2, 3]) {
      var r = this.yHf.get(o) ?? 0;
      if (!t || this.HasSticker(r)) {
        e.push(r);
      } else {
        e.push(this.vHf.get(o) ?? 0);
      }
    }
    return e;
  }
  GetEquippedStickerIdList() {
    var t = [];
    for (const r of [1, 2, 3]) {
      var e = this.vHf.get(r) ?? 0;
      t.push(e);
    }
    return t;
  }
  GetSelectedStickerId(t) {
    return this.yHf.get(t);
  }
  GetEquippedStickerId(t) {
    t = this.vHf.get(t);
    return t || 0;
  }
  GetJumpStickerIndex() {
    return this.kCf;
  }
  IsEquipDefaultSticker(t) {
    return this.vHf.get(t) === 0;
  }
  HasSkin(t) {
    return this.OwnedSkinIds.includes(t);
  }
  HasSticker(t) {
    return t <= 0 || this.OwnedStickerIds.includes(t);
  }
  HasFrame(t) {
    return this.OwnedFrameIds.includes(t);
  }
  IsChangeSticker() {
    for (var [t, e] of this.vHf) {
      t = this.yHf.get(t) ?? 0;
      if (e !== t && this.HasSticker(t)) {
        return true;
      }
    }
    return false;
  }
  IsBanSticker(t) {
    if (t !== 0) {
      t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(t);
      if (t) {
        var e = t.PartId;
        var t = t.GroupId;
        var t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorComponentGroupConfig(t);
        if (t) {
          var r;
          var o;
          var i = t.ConflictGroup;
          for ([r, o] of this.yHf) {
            if (r !== e && o !== 0) {
              var a = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(o).GroupId;
              if (a !== undefined && i.includes(a)) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  ResetSelectStickerInfo() {
    this.yHf.clear();
    for (var [t, e] of this.vHf) {
      this.yHf.set(t, e);
    }
  }
  SetSelectStickerInfo(t, e) {
    this.yHf.set(t, e);
  }
  SetJumpStickerIndex(t) {
    this.kCf = t;
  }
}
exports.MotorcycleDiyModel = MotorcycleDiyModel;
//# sourceMappingURL=MotorcycleDiyModel.js.map