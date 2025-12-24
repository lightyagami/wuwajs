"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemDataBase = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
class HonamiStoryItemDataBase {
  constructor() {
    this._Xe = 0;
    this.ETt = 0;
    this.l4i = 2;
    this.Position = 0;
    this.QualityId = -1;
    this.SubType = -1;
    this.SellPrice = -1;
    this.IsCross = false;
    this.OldCross = false;
    this.IsDragCross = false;
    this.FillPositionList = [];
    this.BackpackWidth = 0;
    this.FuncValue = 0;
    this.IsSelected = false;
    this.BaseWidth = -1;
    this.BaseHeight = -1;
    this.IsNewInBackpack = false;
  }
  Init(t) {
    this._Xe = t.b9n;
    this.ETt = t.A$d;
    this.FuncValue = t.Vws;
    t = this.GetBaseConfig(this.ETt);
    this.l4i = t.ItemType;
  }
  IsLock() {
    return (this.FuncValue & 1) > 0;
  }
  SetIsLock(t) {
    this.FuncValue = t ? this.FuncValue | 1 : this.FuncValue & -2;
  }
  GetBaseConfig(t) {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryItem(this.ETt);
  }
  UpdatePositionInfo(t) {
    if (t === undefined) {
      this.Position = -1;
      this.IsCross = false;
      this.IsDragCross = false;
    } else {
      this.Position = t.l9_;
      this.IsCross = t.Gmd;
      this.IsDragCross = this.IsCross;
    }
    this.FillPositionList.length = 0;
  }
  Ifd() {
    this.FillPositionList = this.GetGridFillPositionByPosition(this.Position, this.IsCross);
  }
  SetBackpackWidth(t) {
    this.BackpackWidth = t;
  }
  GetItemId() {
    return this.ETt;
  }
  GetIncId() {
    return this._Xe;
  }
  GetName() {
    return this.GetBaseConfig(this.ETt).Name;
  }
  GetQuality() {
    var t;
    if (this.QualityId === -1) {
      t = this.GetBaseConfig(this.ETt);
      this.QualityId = t.QualityId;
    }
    return this.QualityId;
  }
  GetQualityConfig() {
    var t = this.GetBaseConfig(this.ETt);
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryQuality(t.QualityId);
  }
  GetDesc() {
    return this.GetBaseConfig(this.ETt).AttributesDescription;
  }
  GetItemType() {
    return this.l4i;
  }
  GetSellPrice() {
    var t;
    if (this.SellPrice === -1) {
      t = this.GetBaseConfig(this.ETt);
      this.SellPrice = t.SellPrice;
    }
    return this.SellPrice;
  }
  GetItemTypeText() {
    return HonamiStoryDefine_1.honamiItemTypeMap.get(this.l4i) ?? "";
  }
  GetSubType() {
    var t;
    if (this.SubType === -1) {
      t = this.GetBaseConfig(this.ETt);
      this.SubType = t.SubType;
    }
    return this.SubType;
  }
  GetPosition() {
    return this.Position;
  }
  GetIsCross() {
    return this.IsCross;
  }
  GetIsDragCross() {
    return this.IsDragCross;
  }
  SetIsDragCross(t) {
    this.IsDragCross = t;
  }
  GetOldCross() {
    return this.OldCross;
  }
  SetOldCross(t) {
    this.OldCross = t;
  }
  GetGridHeight() {
    var t;
    if (this.BaseWidth === -1 || this.BaseHeight === -1) {
      t = this.GetBaseConfig(this.ETt);
      this.BaseWidth = t.GridOccupy[0];
      this.BaseHeight = t.GridOccupy[1];
    }
    if (this.IsCross) {
      return this.BaseWidth;
    } else {
      return this.BaseHeight;
    }
  }
  GetGridWidth() {
    var t;
    if (this.BaseWidth === -1 || this.BaseHeight === -1) {
      t = this.GetBaseConfig(this.ETt);
      this.BaseWidth = t.GridOccupy[0];
      this.BaseHeight = t.GridOccupy[1];
    }
    if (this.IsCross) {
      return this.BaseHeight;
    } else {
      return this.BaseWidth;
    }
  }
  GetBaseGridHeight(t) {
    var i;
    if (this.BaseWidth === -1 || this.BaseHeight === -1) {
      i = this.GetBaseConfig(this.ETt);
      this.BaseWidth = i.GridOccupy[0];
      this.BaseHeight = i.GridOccupy[1];
    }
    if (t) {
      return this.BaseWidth;
    } else {
      return this.BaseHeight;
    }
  }
  GetBaseGridWidth(t) {
    var i;
    if (this.BaseWidth === -1 || this.BaseHeight === -1) {
      i = this.GetBaseConfig(this.ETt);
      this.BaseWidth = i.GridOccupy[0];
      this.BaseHeight = i.GridOccupy[1];
    }
    if (t) {
      return this.BaseHeight;
    } else {
      return this.BaseWidth;
    }
  }
  GetRow() {
    return Math.floor(this.GetPosition() / this.BackpackWidth);
  }
  GetColumn() {
    return this.GetPosition() % this.BackpackWidth;
  }
  GetGridFillPositionList() {
    if (this.FillPositionList.length <= 0) {
      this.Ifd();
    }
    return this.FillPositionList;
  }
  GetGridFillPositionByPosition(s, h) {
    var e = [];
    for (let i = 0; i < this.GetBaseGridWidth(h); i++) {
      for (let t = 0; t < this.GetBaseGridHeight(h); t++) {
        e.push(s + i + t * this.BackpackWidth);
      }
    }
    return e;
  }
  GetIconTexture() {
    return this.GetBaseConfig(this.ETt).Icon;
  }
  GetIconBackpack() {
    return this.GetBaseConfig(this.ETt).IconBackpack;
  }
  GetIsSelected() {
    return this.IsSelected;
  }
  SetIsSelected(t) {
    this.IsSelected = t;
  }
  GetNewInBackpack() {
    return this.IsNewInBackpack;
  }
  SetNewInBackpack(t) {
    this.IsNewInBackpack = t;
  }
  GetTransPosIndex(t) {
    var i = this.IsDragCross;
    var s = Math.floor(t / this.GetBaseGridHeight(i));
    return t % this.GetBaseGridHeight(i) * this.GetBaseGridWidth(i) + s;
  }
}
exports.HonamiStoryItemDataBase = HonamiStoryItemDataBase;
//# sourceMappingURL=HonamiStoryItemDataBase.js.map