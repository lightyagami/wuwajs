"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsMaterialComponent = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
const ItemTipsGetWay_1 = require("./ItemTipsGetWay");
class TipsMaterialComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(i) {
    super(i);
    this.Pe = undefined;
    this.Axt = undefined;
    this.CreateThenShowByResourceIdAsync("UiItem_TipsMaterial", i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
  }
  OnStart() {
    var i = this.GetItem(6);
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(i);
  }
  OnBeforeDestroy() {
    if (this.Pe) {
      this.Pe = undefined;
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(undefined);
    }
  }
  Refresh(i) {
    var e = () => {
      var i = this.Pe;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.MaterialType);
      this.GetSprite(1).SetUIActive(i.FunctionSpritePath !== undefined);
      if (i.FunctionSpritePath) {
        this.SetSpriteByPath(i.FunctionSpritePath, this.GetSprite(1), false);
      }
      var e = !StringUtils_1.StringUtils.IsEmpty(i.TxtEffect);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TxtEffect);
      }
      this.GetText(4).SetUIActive(e);
      var e = !StringUtils_1.StringUtils.IsEmpty(i.TxtDescription);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.TxtDescription);
      }
      this.GetText(5).SetUIActive(e);
      this.xxt(i.LimitTimeTxt);
      var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i.ConfigId);
      var t = e?.ItemType === 60000 || e?.ItemType === 60002 || e?.ItemType === 60005 || e?.ItemType === 60003 || e?.ItemType === 22;
      this.SetPanelNumVisible(!t);
      this.Pxt(this.GetWayDataList(i, e?.ItemType));
      if (!t) {
        e = i.Num;
        this.GetText(3).SetText(e.toString());
        this.GetText(3).useChangeColor = e === 0;
      }
    };
    this.Pe = i;
    ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i);
    if (this.InAsyncLoading()) {
      this.OperationMap.set("Refresh", e);
    } else {
      e();
    }
  }
  GetWayDataList(i, e) {
    var t = i.Num > 0;
    if (e === 60005 && t) {
      return [];
    } else {
      return i.GetWayData ?? [];
    }
  }
  Pxt(i) {
    this.GetItem(6).SetUIActive(i.length !== 0);
    if (i) {
      this.Axt.Refresh(i);
    }
  }
  xxt(i) {
    this.GetItem(7).SetUIActive(i !== undefined);
    if (i) {
      this.GetText(8).SetText(i);
    }
  }
  SetPanelNumVisible(i) {
    var e = () => {
      this.GetItem(2).SetUIActive(i);
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("SetPanelNumVisible", e);
    } else {
      e();
    }
  }
}
exports.TipsMaterialComponent = TipsMaterialComponent;
//# sourceMappingURL=ItemTipsMaterialComponent.js.map