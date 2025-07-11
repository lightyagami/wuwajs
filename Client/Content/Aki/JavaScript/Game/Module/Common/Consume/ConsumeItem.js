"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumeItemData = exports.ConsumeItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const ConsumeItemUtil_1 = require("./ConsumeItemUtil");
class ConsumeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = undefined, s = undefined) {
    super();
    this.BelongView = s;
    this.Data = undefined;
    this.ButtonFunction = undefined;
    this.ije = () => {
      if (this.ButtonFunction) {
        this.ButtonFunction(this.Data?.IncId, this.Data?.ItemId);
      }
    };
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UITexture], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.ije]];
  }
  SetIconState() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(this.Data)[0];
    var s = this.GetTexture(4);
    this.SetItemIcon(s, t.GetConfigId(), this.BelongView);
    var s = this.GetSprite(5);
    this.SetItemQualityIcon(s, t.GetConfigId(), this.BelongView);
    var s = this.GetText(6);
    var t = this.GetItem(7);
    if (this.Data.ResonanceLevel) {
      t.SetUIActive(true);
      s.SetText(this.Data.ResonanceLevel.toString());
    } else {
      t.SetUIActive(false);
    }
    var s = this.GetSprite(3);
    if (this.Data.ChipPath) {
      s.SetUIActive(true);
      this.SetSpriteByPath(this.Data.ChipPath, s, false);
    } else {
      s.SetUIActive(false);
    }
  }
  Refresh(t, s, i) {
    let e = undefined;
    if (t) {
      e = ConsumeItemUtil_1.ConsumeItemUtil.GetConsumeItemData(t[0], t[1]);
    }
    this.UpdateItem(e);
  }
  UpdateItem(t) {
    var s = this.GetItem(1);
    var i = this.GetItem(2);
    if (t) {
      this.Data = t;
      this.SetIconState();
      s.SetUIActive(false);
      i.SetUIActive(true);
      this.GetText(8).SetText(this.Data.BottomText);
    } else {
      this.Data = t;
      s.SetUIActive(true);
      i.SetUIActive(false);
    }
  }
  SetButtonFunction(t) {
    this.ButtonFunction = t;
  }
}
exports.ConsumeItem = ConsumeItem;
class ConsumeItemData {
  constructor() {
    this.IncId = 0;
    this.ItemId = 0;
    this.BottomText = "";
    this.ResonanceLevel = 0;
    this.ChipPath = "";
  }
}
exports.ConsumeItemData = ConsumeItemData;
//# sourceMappingURL=ConsumeItem.js.map