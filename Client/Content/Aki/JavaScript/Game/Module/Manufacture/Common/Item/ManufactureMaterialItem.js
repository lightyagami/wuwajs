"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManufactureMaterialItem = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ManufactureMaterialItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.BIi = 0;
  }
  OnRefresh(e, t, i) {
    if ((this.fGt = e).IsEmpty) {
      const r = {
        Type: 1
      };
      this.Apply(r);
      this.SetSelected(false);
    } else {
      const r = {
        Type: 4,
        Data: e,
        BottomText: this.bIi()
      };
      if (e.K6n) {
        r.ItemConfigId = e.L8n;
      }
      this.Apply(r);
      this.SetIsPhantomLock(!e.K6n);
      this.SetSelected(false);
    }
  }
  bIi(t) {
    if (!this.fGt) {
      return "";
    }
    if (this.fGt.K6n) {
      var t = t ?? this.fGt.UVn * this.BIi;
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.fGt.L8n);
      let e = "";
      return e = i < t ? StringUtils_1.StringUtils.Format(CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN, i.toString(), t.toString()) : StringUtils_1.StringUtils.Format(CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN, i.toString(), t.toString());
    }
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemSelectCookUnlock_text");
  }
  SetTimes(e) {
    this.BIi = e;
    this.SetBottomText(this.bIi());
  }
  SetNeedNum(e) {
    this.SetBottomText(this.bIi(e));
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.ManufactureMaterialItem = ManufactureMaterialItem;
//# sourceMappingURL=ManufactureMaterialItem.js.map