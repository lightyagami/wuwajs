"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityEntranceMonsterPreviewData = exports.ActivityEntranceDropDownContentData = exports.ActivityEntranceDropDownData = exports.ActivityEntranceSelectItemSubData = exports.ActivityEntranceSelectItemBaseData = exports.ActivityEntranceItemData = exports.ActivityEntranceSelectItemData = exports.ActivityEntranceDescInfoData = exports.ActivityEntrancePointData = exports.ActivityEntranceCaptionItemData = exports.ActivityInstanceEntranceData = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityInstanceEntranceData {
  constructor() {
    this.Wwl = undefined;
    this.Qwl = undefined;
    this.Kwl = undefined;
    this.$wl = undefined;
    this.Xwl = undefined;
    this.rOl = undefined;
    this.Ywl = undefined;
  }
  GetActivityEntrancePointData() {
    return this.Wwl;
  }
  GetActivityEntranceDescInfoData() {
    return this.Qwl;
  }
  GetActivityEntranceSelectItemData() {
    return this.Kwl;
  }
  GetActivityEntranceCaptionItemData() {
    return this.$wl;
  }
  GetActivityEntranceDropDownData() {
    return this.Xwl;
  }
  GetClickConfirmCallBack() {
    return this.Ywl;
  }
  GetActivityEntranceMonsterPreviewData() {
    return this.rOl;
  }
  static Create(t, e, i, r, n, s, a) {
    var h = new ActivityInstanceEntranceData();
    h.Wwl = t;
    h.Qwl = e;
    h.Kwl = i;
    h.$wl = r;
    h.rOl = s;
    h.Xwl = n;
    h.Ywl = a;
    return h;
  }
}
exports.ActivityInstanceEntranceData = ActivityInstanceEntranceData;
class ActivityEntranceCaptionItemData {
  constructor() {
    this.he = "";
    this.zwl = "";
    this.t5e = 0;
  }
  GetName() {
    return this.he;
  }
  GetTitleSpritePath() {
    return this.zwl;
  }
  GetHelpId() {
    return this.t5e;
  }
  static Create(t, e, i) {
    var r = new ActivityEntranceCaptionItemData();
    r.he = t;
    r.zwl = e;
    r.t5e = i;
    return r;
  }
}
exports.ActivityEntranceCaptionItemData = ActivityEntranceCaptionItemData;
class ActivityEntrancePointData {
  constructor() {
    this.Jwl = 0;
    this.Zwl = 0;
    this.l4e = undefined;
    this.eBl = 0;
    this.$Tt = undefined;
    this.tBl = undefined;
    this.oOl = undefined;
  }
  GetCurrentPoint() {
    return this.Jwl;
  }
  GetRedDotName() {
    return this.l4e;
  }
  GetRedDotId() {
    return this.eBl;
  }
  GetPointRewardBtnClickCallBack() {
    return this.tBl;
  }
  GetLimitPoint() {
    return this.Zwl;
  }
  GetRewardData() {
    return this.$Tt;
  }
  GetScoreDesc() {
    if (this.oOl) {
      return this.oOl();
    } else {
      return "";
    }
  }
  static Create(t, e, i, r, n, s, a) {
    var h = new ActivityEntrancePointData();
    h.Jwl = t;
    h.l4e = i;
    h.eBl = r;
    h.Zwl = e;
    h.$Tt = n;
    h.oOl = s;
    h.tBl = a;
    return h;
  }
}
exports.ActivityEntrancePointData = ActivityEntrancePointData;
class ActivityEntranceDescInfoData {
  constructor() {
    this.iBl = undefined;
    this.rBl = undefined;
    this.oBl = undefined;
  }
  GetName(t) {
    if (this.iBl) {
      return this.iBl(t);
    } else {
      return "";
    }
  }
  GetDesc(t) {
    if (this.rBl) {
      return this.rBl(t);
    } else {
      return "";
    }
  }
  GetRecommendElement(t) {
    if (this.oBl) {
      return this.oBl(t);
    } else {
      return [];
    }
  }
  static Create(t, e, i) {
    var r = new ActivityEntranceDescInfoData();
    r.iBl = t;
    r.rBl = e;
    r.oBl = i;
    return r;
  }
}
exports.ActivityEntranceDescInfoData = ActivityEntranceDescInfoData;
class ActivityEntranceSelectItemData {
  constructor() {
    this.nBl = [];
    this.sBl = [];
  }
  static Create(t) {
    var e = new ActivityEntranceSelectItemData();
    e.nBl = t;
    e.aBl();
    return e;
  }
  GetCurrentSelectData() {
    let t = undefined;
    for (const e of this.sBl) {
      if (e.MainData) {
        if (e.MainData.GetSelectState()) {
          t = e;
        }
      } else if (e.SubData && e.SubData.GetSelectState()) {
        t = e;
      }
    }
    return t = t || this.sBl[0];
  }
  aBl() {
    this.sBl = [];
    for (let t = 0; t < this.nBl.length; t++) {
      var e = new ActivityEntranceItemData();
      e.MainData = this.nBl[t];
      this.sBl.push(e);
      var i = this.nBl[t].GetSubDataList();
      if (i) {
        for (let t = 0; t < i.length; t++) {
          var r = new ActivityEntranceItemData();
          r.SubData = i[t];
          this.sBl.push(r);
        }
      }
    }
  }
  GetShowDataBySelectElement(e, i) {
    this.sBl = [];
    for (let t = 0; t < this.nBl.length; t++) {
      var r = this.nBl[t].GetUiLogicIndex() === e;
      this.nBl[t].SetSelectState(r);
      var n = new ActivityEntranceItemData();
      n.MainData = this.nBl[t];
      this.sBl.push(n);
      if (r) {
        var s = this.nBl[t].GetSubDataList();
        if (s) {
          for (let t = 0; t < s.length; t++) {
            var a = s[t].GetUiLogicIndex() === i;
            s[t].SetSelectState(a);
            var a = new ActivityEntranceItemData();
            a.SubData = s[t];
            this.sBl.push(a);
          }
        }
      }
    }
    return this.sBl;
  }
}
exports.ActivityEntranceSelectItemData = ActivityEntranceSelectItemData;
class ActivityEntranceItemData {
  constructor() {
    this.MainData = undefined;
    this.SubData = undefined;
  }
  GetSelectDataIndex() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetDataIndex();
    } else {
      return 0;
    }
  }
  GetSelectUiLogicIndex() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetUiLogicIndex();
    } else {
      return 0;
    }
  }
  GetLockState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetLockState();
  }
  GetUnLockDesc() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetUnlockDesc();
    } else {
      return "";
    }
  }
  GetStyle() {
    if (this.MainData) {
      return 0;
    } else {
      return 1;
    }
  }
  GetSelectState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetSelectState();
  }
  GetFinishState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetFinishState();
  }
  GetInstanceDungeonId() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetInstanceDungeonId();
    } else {
      return 0;
    }
  }
  GetDesc() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetDesc();
    } else {
      return "";
    }
  }
  HaveChildData() {
    var t;
    return !!this.MainData && !!(t = this.MainData.GetSubDataList()) && t.length > 0;
  }
  GetInstanceConfig() {
    var t = this.GetInstanceDungeonId();
    if (t !== 0) {
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t);
    }
  }
  GetInstanceDifficultIconPath() {
    return this.GetInstanceConfig()?.DifficultyIcon ?? "";
  }
  GetInstanceName() {
    var t = this.GetInstanceConfig()?.MapName;
    if (t && t !== "") {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    } else {
      return "";
    }
  }
  GetSelectCallBack() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetClickCallBack();
    }
  }
  GetRedDotState() {
    var t = this.MainData || this.SubData;
    return !!t && t.GetRedDotState();
  }
  GetRecommendLevel() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetRecommendLevel();
    } else {
      return 0;
    }
  }
  GetSubTitle() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetSubTitle();
    } else {
      return "";
    }
  }
  GetDefaultDifficultIndex() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetDefaultDifficultIndex();
    } else {
      return 0;
    }
  }
  GetBgPath() {
    var t = this.MainData || this.SubData;
    if (t) {
      return t.GetBgPath();
    } else {
      return "";
    }
  }
}
exports.ActivityEntranceItemData = ActivityEntranceItemData;
class ActivityEntranceSelectItemBaseData {
  constructor() {
    this.lkn = false;
    this.lBl = 0;
    this.hBl = 0;
    this.iBl = undefined;
    this.rBl = undefined;
    this._Bl = undefined;
    this.uBl = undefined;
    this.cBl = undefined;
    this.mBl = undefined;
    this.dBl = undefined;
    this.CBl = undefined;
    this.gBl = undefined;
    this.pBl = undefined;
    this.U3l = undefined;
    this.rMt = undefined;
    this.fBl = [];
  }
  GetSelectState() {
    return this.lkn;
  }
  SetSelectState(t) {
    this.lkn = t;
  }
  GetUiLogicIndex() {
    return this.hBl;
  }
  GetSubDataList() {
    return this.fBl;
  }
  GetDataIndex() {
    return this.lBl;
  }
  GetName() {
    if (this.iBl) {
      return this.iBl(this.lBl);
    } else {
      return "";
    }
  }
  GetDesc() {
    if (this.rBl) {
      return this.rBl(this.lBl);
    } else {
      return "";
    }
  }
  GetLockState() {
    return !!this.uBl && this.uBl(this.lBl);
  }
  GetInstanceDungeonId() {
    if (this.mBl) {
      return this.mBl(this.lBl);
    } else {
      return 0;
    }
  }
  GetUnlockDesc() {
    if (this.cBl) {
      return this.cBl(this.lBl);
    } else {
      return "";
    }
  }
  GetRecommendLevel() {
    if (this.CBl) {
      return this.CBl(this.lBl);
    } else {
      return 0;
    }
  }
  GetFinishState() {
    return !!this.dBl && this.dBl(this.lBl);
  }
  GetRedDotState() {
    return !!this.gBl && this.gBl(this.lBl);
  }
  GetClickCallBack() {
    return this.rMt;
  }
  GetSubTitle() {
    if (this._Bl) {
      return this._Bl(this.lBl);
    } else {
      return "";
    }
  }
  GetDefaultDifficultIndex() {
    if (this.pBl) {
      return this.pBl(this.lBl);
    } else {
      return 0;
    }
  }
  GetBgPath() {
    if (this.U3l) {
      return this.U3l(this.lBl);
    } else {
      return "";
    }
  }
  static Create(t, e, i, r, n, s, a, h, c, o, v, u, D, l, G) {
    var d = new ActivityEntranceSelectItemBaseData();
    d.lkn = false;
    d.lBl = t;
    d.hBl = e;
    d.iBl = r;
    d.rBl = n;
    d._Bl = s;
    d.uBl = a;
    d.mBl = h;
    d.cBl = c;
    d.dBl = o;
    d.gBl = G;
    d.pBl = u;
    d.CBl = v;
    d.U3l = D;
    d.rMt = l;
    d.fBl = i;
    return d;
  }
}
class ActivityEntranceSelectItemSubData extends (exports.ActivityEntranceSelectItemBaseData = ActivityEntranceSelectItemBaseData) {}
exports.ActivityEntranceSelectItemSubData = ActivityEntranceSelectItemSubData;
class ActivityEntranceDropDownData {
  constructor() {
    this.vBl = 0;
    this.SBl = [];
  }
  GetDropDownContentDataList() {
    return this.SBl;
  }
  GetDefaultIndex() {
    return this.vBl;
  }
  SetDefaultIndex(t) {
    this.vBl = t;
  }
  static Create(t, e) {
    var i = new ActivityEntranceDropDownData();
    i.SBl = t;
    i.vBl = e;
    return i;
  }
}
exports.ActivityEntranceDropDownData = ActivityEntranceDropDownData;
class ActivityEntranceDropDownContentData {
  constructor() {
    this.lBl = 0;
    this.MBl = undefined;
    this.yBl = undefined;
    this.CBl = undefined;
    this.EBl = undefined;
  }
  GetDataIndex() {
    return this.lBl;
  }
  GetTogOptionText() {
    if (this.MBl) {
      return this.MBl(this.lBl);
    } else {
      return "";
    }
  }
  GetDropDownText() {
    if (this.yBl) {
      return this.yBl(this.lBl);
    } else {
      return "";
    }
  }
  GetRecommendLevel() {
    if (this.CBl) {
      return this.CBl(this.lBl);
    } else {
      return 0;
    }
  }
  GetOnSelectCallBack() {
    return this.EBl;
  }
  static Create(t, e, i, r, n) {
    var s = new ActivityEntranceDropDownContentData();
    s.lBl = t;
    s.MBl = e;
    s.yBl = i;
    s.CBl = r;
    s.EBl = n;
    return s;
  }
}
exports.ActivityEntranceDropDownContentData = ActivityEntranceDropDownContentData;
class ActivityEntranceMonsterPreviewData {
  constructor() {
    this.nOl = undefined;
    this.sOl = undefined;
    this.mBl = undefined;
    this.aOl = undefined;
  }
  GetMonsterTips(t) {
    if (this.nOl) {
      return this.nOl(t);
    } else {
      return "";
    }
  }
  GetMonsterPreviewState(t) {
    return !!this.sOl && this.sOl(t);
  }
  GetInstanceDungeonId(t) {
    if (this.mBl) {
      return this.mBl(t);
    } else {
      return 0;
    }
  }
  GetPreviewCallBack() {
    return this.aOl;
  }
  static Create(t, e, i, r) {
    var n = new ActivityEntranceMonsterPreviewData();
    n.nOl = t;
    n.sOl = e;
    n.mBl = i;
    n.aOl = r;
    return n;
  }
}
exports.ActivityEntranceMonsterPreviewData = ActivityEntranceMonsterPreviewData;
//# sourceMappingURL=ActivityInstanceEntranceData.js.map