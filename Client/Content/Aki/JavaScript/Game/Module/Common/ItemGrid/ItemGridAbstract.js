"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGridAbstract = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomItemData_1 = require("../../Inventory/ItemData/PhantomItemData");
const WeaponItemData_1 = require("../../Inventory/ItemData/WeaponItemData");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ItemGridAbstract extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined, e = undefined, i = undefined) {
    super();
    this.apt = undefined;
    this.ETt = 0;
    this.hPt = 0;
    this.wTt = 0;
    this.GTt = undefined;
    this.wqe = e;
    this.SetBelongViewName(i);
    if (t) {
      this.CreateThenShowByActor(t);
    }
  }
  GetItemConfig() {
    if (this.wqe) {
      return this.wqe.GetItemConfig();
    } else {
      return this.apt;
    }
  }
  GetItemId() {
    if (this.wqe) {
      return this.wqe.GetItemId();
    } else {
      return this.ETt;
    }
  }
  GetBelongView() {
    if (this.wqe) {
      return this.wqe.GetBelongView();
    } else {
      return this.GTt;
    }
  }
  Refresh(t, e, i) {
    var r = t[0];
    this.RefreshByItemId(r.ItemId);
    this.hPt = t[1];
    this.wTt = r.IncId;
  }
  RefreshByItemId(t) {
    this.ETt = t;
    this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    if (this.lPt(this)) {
      this.RefreshQualitySprite();
      this.RefreshTextureIcon();
    }
  }
  ShowDefaultDownText() {
    if (this.lPt(this)) {
      this.RefreshTextDown(true, this.GetDefaultDownText());
    }
  }
  GetDefaultDownText() {
    var t;
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.wTt);
    if (!(this.hPt > 1) && !StringUtils_1.StringUtils.IsEmpty(e?.GetDefaultDownText())) {
      if (e instanceof PhantomItemData_1.PhantomItemData) {
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(this.wTt).GetPhantomLevel();
        return StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString());
      }
      if (e instanceof WeaponItemData_1.WeaponItemData) {
        t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.wTt).GetLevel();
        return StringUtils_1.StringUtils.Format(e.GetDefaultDownText(), t.toString());
      }
    }
    return this.hPt.toString();
  }
  lPt(t) {
    return t.IsItemGrid === true;
  }
  SetBelongViewName(t) {
    this.GTt = t;
  }
}
exports.ItemGridAbstract = ItemGridAbstract;
//# sourceMappingURL=ItemGridAbstract.js.map