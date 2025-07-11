"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsCharacterComponent = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
class ItemTipsCharacterComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e);
    this.Pe = undefined;
    this.CreateThenShowByResourceIdAsync("UiItem_TipsRole", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.Pe) {
      this.Pe = undefined;
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(undefined);
    }
  }
  Refresh(i) {
    var e = () => {
      this.Pe = i;
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(i);
      var e = i.GetElementConfig();
      var t = this.GetTexture(1);
      this.SetElementIcon(e.Icon, t, e.Id);
      t.SetColor(UE.Color.FromHex(e.ElementColor));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.GetRoleIntroduction());
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("Refresh", e);
    } else {
      e();
    }
  }
}
exports.ItemTipsCharacterComponent = ItemTipsCharacterComponent;
//# sourceMappingURL=ItemTipsCharacterComponent.js.map