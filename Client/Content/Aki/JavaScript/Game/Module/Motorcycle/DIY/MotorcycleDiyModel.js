"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyModel = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MotorcycleDiyDefine_1 = require("./MotorcycleDiyDefine");
class MotorcycleDiyModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nEg = [];
    this.sEg = [];
    this.aEg = [];
    this.hEg = [];
    this._Eg = [];
    this.uEg = [];
    this.cEg = [];
    this.dEg = 0;
    this.mEg = 0;
    this.Atg = new Map();
    this.fEg = new Map();
    this.gEg = 0;
    this.Dtg = new Map();
    this.CEg = new Map();
    this.pEg = 0;
    this.vEg = new Set();
    this.yEg = new Map();
    this.SEg = false;
  }
  OnInit() {
    this.Atg.set(1, 0);
    this.Atg.set(2, 0);
    this.Atg.set(3, 0);
    this.fEg.set(1, 0);
    return true;
  }
  cCg(t) {
    var e;
    var i;
    var r = [];
    for ([e, i] of t) {
      var s = {
        s5n: e,
        m9n: i,
        b9n: 0
      };
      r.push(s);
    }
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(r);
  }
  S3g() {
    var t;
    if (!(this.yEg.size > 0)) {
      if (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId)) {
        this.yEg = t;
      }
    }
  }
  MEg(t, e) {
    let i = undefined;
    let r = undefined;
    let s = false;
    for (const a of e) {
      var o;
      if (!this.vEg.has(a) && a !== 0) {
        if (t === 1) {
          i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(a);
          r = i && i.DefaultFlag;
        } else if (t === 2) {
          i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(a);
          r = i && i.FreeFlag;
        } else if (t === 3) {
          i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(a);
          r = i && i.FreeFlag;
        }
        if (i) {
          this.vEg.add(a);
          o = this.yEg.get(a);
          if (r) {
            if (o !== false) {
              this.yEg.set(a, false);
              s = true;
            }
          } else if (o === undefined) {
            this.yEg.set(a, true);
            s = true;
          }
        }
      }
    }
    if (s) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId, this.yEg);
    }
  }
  EEg(t) {
    this.S3g();
    if (t.Apf) {
      this.hEg = [...t.Apf];
    }
    if (t.Dpf) {
      this._Eg = [...t.Dpf];
      this.MEg(2, this._Eg);
    }
    if (t.Lvg) {
      this.uEg = [...t.Lvg];
      this.MEg(1, this.uEg);
    }
    if (t.Rvg) {
      this.cEg = [...t.Rvg];
      this.MEg(3, this.cEg);
    }
  }
  IEg(t) {
    this.dEg = t.Ppf;
    var e = t.Ipf;
    if (e) {
      for (let t = 0; t < e.length; t++) {
        var i = e[t];
        var r = t + 1;
        this.Atg.set(r, i);
      }
    }
    this.mEg = t.Ivg;
    var s = t.Evg;
    if (s) {
      for (let t = 0; t < s.length; t++) {
        var o = s[t];
        var a = t + 1;
        this.fEg.set(a, o);
      }
    }
    if (!this.SEg) {
      this.ResetSelectedItemInfo();
      this.SEg = true;
    }
  }
  UpdateMotorCanUseOutlookInfo(t) {
    if (t && t.Lpf) {
      t = t.Lpf;
      this.sEg = [];
      this.nEg = [];
      this.aEg = [];
      if (t.Pvg) {
        for (const e of t.Pvg) {
          this.sEg.push(e);
        }
      }
      if (t.Upf) {
        for (const i of t.Upf) {
          this.nEg.push(i);
        }
      }
      if (t.wvg) {
        for (const r of t.wvg) {
          this.aEg.push(r);
        }
      }
    }
  }
  UpdateMotorOutlookInfo(t) {
    var e;
    if (t && t.Epf && (e = (t = t.Epf)?.Tpf, t = t?.bpf, e && this.EEg(e), t)) {
      this.IEg(t);
    }
  }
  AddMotorOutlookInfo(t) {
    if (t) {
      var e = new Map();
      if (t.wpf) {
        for (const i of t.wpf) {
          e.set(i, 1);
        }
      }
      if (t.Rpf) {
        for (const r of t.Rpf) {
          e.set(r, 1);
        }
      }
      if (t.bvg) {
        for (const s of t.bvg) {
          e.set(s, 1);
        }
      }
      if (t.Tvg) {
        for (const o of t.Tvg) {
          e.set(o, 1);
        }
      }
      this.cCg(e);
    }
  }
  UpdateMotorOutlookOwnedChange(t) {
    t = t.Tpf;
    if (t) {
      this.EEg(t);
    }
  }
  UpdateMotorOutlookEquippedChange(t) {
    t = t.bpf;
    if (t) {
      this.IEg(t);
    }
  }
  GetMotorDiyTabList() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("MotorcycleDiyRootView");
    var i = e.length;
    var r = [];
    for (let t = 0; t < i; t++) {
      var s = e[t];
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(s.FunctionId)) {
        r.push(s);
      }
    }
    return r;
  }
  GetDefaultFrameId() {
    if (this.pEg === 0) {
      for (const e of this.uEg) {
        var t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e);
        if (t && t.DefaultFlag) {
          this.pEg = e;
          break;
        }
      }
    }
    return this.pEg;
  }
  GetDefaultDecorationIdList() {
    const i = [];
    MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART.forEach((t, e) => {
      i.push(0);
    });
    return i;
  }
  GetItemState(t, e) {
    let i = [];
    let r = 0;
    let s = new Map();
    let o = [];
    let a = t => false;
    switch (t) {
      case 2:
        i = this.nEg;
        s = this.Atg;
        o = this._Eg;
        a = () => this.IsBanSticker(e);
        break;
      case 3:
        i = this.aEg;
        s = this.fEg;
        o = this.cEg;
        a = () => this.IsBanDecoration(e);
        break;
      case 1:
        i = this.sEg;
        r = this.mEg;
        o = this.uEg;
        a = () => this.IsBanFrame(e);
    }
    if (i.includes(e)) {
      if (a(e)) {
        return 4;
      } else if (Array.from(s.values()).includes(e) || r === e) {
        return 1;
      } else if (o.includes(e)) {
        return 2;
      } else {
        return 3;
      }
    } else {
      return 0;
    }
  }
  TEg(t, e) {
    var i = {};
    if (e !== 0) {
      switch (t) {
        case 2:
          var r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
          i.GroupId = r?.GroupId;
          i.PartId = r?.PartId;
          break;
        case 3:
          r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e);
          i.GroupId = r?.GroupId;
          i.PartId = r?.PartId;
          break;
        case 1:
          r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e);
          i.GroupId = r?.GroupId;
      }
    }
    return i;
  }
  bEg(r, t) {
    var t = this.TEg(r, t);
    var e = t.GroupId;
    const s = t.PartId;
    if (e === undefined) {
      return false;
    }
    t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorComponentGroupConfig(e);
    if (!t || !t.ConflictGroup) {
      return false;
    }
    const o = t.ConflictGroup;
    var i;
    var a;
    var n;
    var h;
    var c = (t, e, i) => {
      return e !== 0 && (t !== r || i !== s) && (i = this.TEg(t, e).GroupId) !== undefined && o.includes(i);
    };
    for ([i, a] of this.Dtg) {
      if (c(2, a, i)) {
        return true;
      }
    }
    for ([n, h] of this.CEg) {
      if (c(3, h, n)) {
        return true;
      }
    }
    return !!c(1, this.gEg);
  }
  GetBanTips(r, t) {
    var e = this.TEg(r, t);
    var i = e.GroupId;
    const s = e.PartId;
    if (i !== undefined) {
      e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorComponentGroupConfig(i);
      if (e && e.ConflictGroup) {
        const f = e.ConflictGroup;
        const u = (t, e) => {
          let i = "";
          switch (t) {
            case 2:
              i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e)?.Title ?? "";
              break;
            case 3:
              i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e)?.Title ?? "";
              break;
            case 1:
              i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorFrameConfig(e)?.Title ?? "";
          }
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i) ?? "";
        };
        e = new StringBuilder_1.StringBuilder();
        const d = new StringBuilder_1.StringBuilder();
        t = u(r, t);
        e.Append("\"");
        e.Append(t);
        e.Append("\"");
        const l = [i];
        var o;
        var a;
        var n;
        var h;
        var c = (t, e, i) => {
          if (e !== 0 && (t !== r || i !== s)) {
            if ((i = this.TEg(t, e)).GroupId !== undefined && f.includes(i.GroupId) && !l.includes(i.GroupId) && (l.push(i.GroupId), i = u(t, e))) {
              d.Append("\"");
              d.Append(i);
              d.Append("\"");
            }
          }
        };
        for ([o, a] of this.Dtg) {
          c(2, a, o);
        }
        for ([n, h] of this.CEg) {
          c(3, h, n);
        }
        c(1, this.gEg);
        return [e.ToString(), d.ToString()];
      }
    }
  }
  GetSelectedItemIdList(t, e = false) {
    var i = [];
    let r = [];
    let s = new Map();
    let o = new Map();
    let a = t => false;
    switch (t) {
      case 2:
        r = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
        s = this.Dtg;
        o = this.Atg;
        a = t => this.HasSticker(t);
        break;
      case 3:
        r = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
        s = this.CEg;
        o = this.fEg;
        a = t => this.HasDecoration(t);
    }
    for (const h of r) {
      var n = s.get(h) ?? 0;
      if (!e || a(n)) {
        i.push(n);
      } else {
        i.push(o.get(h) ?? 0);
      }
    }
    return i;
  }
  LEg(t) {
    var e = [];
    let i = [];
    let r = new Map();
    switch (t) {
      case 2:
        i = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
        r = this.Atg;
        break;
      case 3:
        i = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
        r = this.fEg;
    }
    for (const o of i) {
      var s = r.get(o) ?? 0;
      e.push(s);
    }
    return e;
  }
  GetSelectedItemId(t, e) {
    let i = 0;
    switch (t) {
      case 2:
        i = e ? this.Dtg.get(e) ?? 0 : 0;
        break;
      case 3:
        i = e ? this.CEg.get(e) ?? 0 : 0;
        break;
      case 1:
        i = this.gEg;
    }
    return i;
  }
  GetEquippedItemId(t, e) {
    let i = 0;
    switch (t) {
      case 2:
        i = this.Atg.get(e) ?? 0;
        break;
      case 3:
        i = this.fEg.get(e) ?? 0;
    }
    return i;
  }
  ResetSelectedItemInfo() {
    this.Dtg.clear();
    this.CEg.clear();
    for (var [t, e] of this.Atg) {
      this.Dtg.set(t, e);
    }
    for (var [i, r] of this.fEg) {
      this.CEg.set(i, r);
    }
    this.gEg = this.mEg;
  }
  RedDotHasNewItemByAnyPart(t) {
    let e = [];
    switch (t) {
      case 2:
        e = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
        break;
      case 3:
        e = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
    }
    for (const i of e) {
      if (this.RedDotHasNewItemByPart(t, i)) {
        return true;
      }
    }
    return false;
  }
  RedDotHasNewItemByPart(e, i) {
    let t = [];
    let r = t => false;
    switch (e) {
      case 2:
        t = this.nEg;
        r = t => this.HasSticker(t);
        break;
      case 3:
        t = this.aEg;
        r = t => this.HasDecoration(t);
    }
    for (const n of t) {
      let t = undefined;
      if (e === 2) {
        t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(n);
      } else if (e === 3) {
        t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(n);
      }
      var s = this.GetItemState(e, n);
      var o = t && t.PartId === i;
      var a = r(n);
      var s = s === 2 || s === 1;
      if (o && a && s) {
        if (this.RedDotHasNewItem(n)) {
          return true;
        }
      }
    }
    return false;
  }
  GetCanUseStickerIdsInRegion() {
    return this.nEg;
  }
  GetCanUseFrameIdsInRegion() {
    return this.sEg;
  }
  GetCanUseDecorationsIdsInRegion() {
    return this.aEg;
  }
  GetEquippedSkinId() {
    return this.dEg;
  }
  IsEquipDefaultSkin() {
    let t = false;
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorSkinConfig(this.dEg);
    return t = e && e.DefaultFlag ? true : t;
  }
  HasSkin(t) {
    return this.hEg.includes(t);
  }
  GetFrameState(t) {
    return this.GetItemState(1, t);
  }
  GetSelectedFrameId() {
    return this.gEg;
  }
  GetEquippedFrameId() {
    return this.mEg;
  }
  SetSelectFrame(t) {
    this.gEg = t;
  }
  HasFrame(t) {
    return this.uEg.includes(t);
  }
  IsBanFrame(t) {
    return this.bEg(1, t);
  }
  IsEquipFrameLockedByPlayer() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(217);
    var e = t.HasTag(346080557);
    var t = t.HasTag(229891237) || t.HasTag(959024484);
    return e || t;
  }
  GetStickerState(t) {
    return this.GetItemState(2, t);
  }
  GetSelectedStickerIdList(t = false) {
    return this.GetSelectedItemIdList(2, t);
  }
  GetSelectedStickerId(t) {
    return this.Dtg.get(t) ?? 0;
  }
  GetEquippedStickerIdList() {
    return this.LEg(2);
  }
  GetEquippedStickerId(t) {
    return this.Atg.get(t) ?? 0;
  }
  SetSelectStickerInfo(t, e) {
    this.Dtg.set(t, e);
  }
  IsEquipDefaultSticker(t) {
    return this.Atg.get(t) === 0;
  }
  IsBanSticker(t) {
    return this.bEg(2, t);
  }
  HasSticker(t) {
    return t <= 0 || this._Eg.includes(t);
  }
  GetDecorationState(t) {
    return this.GetItemState(3, t);
  }
  GetSelectedDecorationIdList(t = false) {
    return this.GetSelectedItemIdList(3, t);
  }
  GetSelectedDecorationId(t) {
    return this.CEg.get(t) ?? 0;
  }
  GetEquippedDecorationIdList() {
    return this.LEg(3);
  }
  GetEquippedDecorationId(t) {
    return this.fEg.get(t) ?? 0;
  }
  SetSelectDecorationInfo(t, e) {
    this.CEg.set(t, e);
  }
  IsEquipDefaultDecoration(t) {
    return this.fEg.get(t) === 0;
  }
  IsBanDecoration(t) {
    return this.bEg(3, t);
  }
  HasDecoration(t) {
    return t <= 0 || this.cEg.includes(t);
  }
  UpdateItemNewUnlocked(t, e) {
    if (this.yEg.get(t) !== false) {
      this.yEg.set(t, e);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorDiyNewUnlockId, this.yEg);
    }
  }
  RedDotHasAnyNewItem() {
    return this.RedDotHasNewFrame() || this.RedDotHasNewStickerByAnyPart() || this.RedDotHasNewDecorationByAnyPart();
  }
  RedDotHasNewFrame() {
    for (const t of this.uEg) {
      if (this.RedDotHasNewItem(t)) {
        return true;
      }
    }
    return false;
  }
  RedDotHasNewStickerByAnyPart() {
    return this.RedDotHasNewItemByAnyPart(2);
  }
  RedDotHasNewStickerByPart(t) {
    return this.RedDotHasNewItemByPart(2, t);
  }
  RedDotHasNewDecorationByAnyPart() {
    return this.RedDotHasNewItemByAnyPart(3);
  }
  RedDotHasNewDecorationByPart(t) {
    return this.RedDotHasNewItemByPart(3, t);
  }
  RedDotHasNewItem(t) {
    return this.yEg.get(t) ?? false;
  }
  RedDotIsPreviewInAnyPart(t) {
    let e = [];
    if (t === 2) {
      e = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART;
    } else if (t === 3) {
      e = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART;
    }
    for (const i of e) {
      if (this.RedDotIsPreview(t, i)) {
        return true;
      }
    }
    return false;
  }
  RedDotIsPreview(t, e) {
    e = this.GetSelectedItemId(t, e);
    return this.GetItemState(t, e) === 3;
  }
}
exports.MotorcycleDiyModel = MotorcycleDiyModel;
//# sourceMappingURL=MotorcycleDiyModel.js.map