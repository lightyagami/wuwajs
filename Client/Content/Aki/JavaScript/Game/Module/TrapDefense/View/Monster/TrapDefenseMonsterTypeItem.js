"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterTypeItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseMonsterItem_1 = require("./TrapDefenseMonsterItem");
class TrapDefenseMonsterTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
    this.OnSelectMonsterCallBack = undefined;
    this.LayoutMonster = undefined;
    this.LastSelectMonsterIndex = CommonDefine_1.INVALID_VALUE;
    this.IsFireForBuffClick = false;
    this.CreateItemMonster = () => {
      var e = new TrapDefenseMonsterItem_1.TrapDefenseMonsterItem();
      e.OnSelectMonsterItemCallback = this.jjc;
      return e;
    };
    this.jjc = e => {
      this.IsFireForBuffClick = true;
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      this.OnSelectMonsterCallBack?.(e);
      this.IsFireForBuffClick = false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UILayoutBase], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(2);
    var t = this.GetItem(3)?.GetOwner();
    this.LayoutMonster = new GenericLayout_1.GenericLayout(e, this.CreateItemMonster, t);
  }
  async RefreshAsync(e) {
    this.ItemData = e;
    var t = this.GetSprite(0);
    this.SetSpriteByPath(e.Config.Icon, t, false);
    this.GetText(1)?.ShowTextNew(e.Config.Name);
    this.LastSelectMonsterIndex = this.LayoutMonster.GetSelectedGridIndex();
    await this.LayoutMonster.RefreshByDataAsync(e.GetMonsterDataList(), true);
  }
  OnSelected() {
    if (!this.IsFireForBuffClick) {
      this.LayoutMonster.SelectGridProxy(Math.max(this.LastSelectMonsterIndex, 0));
    }
  }
  OnDeselected() {
    this.LayoutMonster.DeselectCurrentGridProxy();
  }
}
exports.TrapDefenseMonsterTypeItem = TrapDefenseMonsterTypeItem;
//# sourceMappingURL=TrapDefenseMonsterTypeItem.js.map