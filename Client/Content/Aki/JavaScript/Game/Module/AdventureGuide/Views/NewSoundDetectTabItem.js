"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewSoundDetectTabItem = void 0;
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  NewSoundDetectItem_1 = require("./NewSoundDetectItem");
class NewSoundDetectTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Pe = void 0, this.n8e = void 0, this.Yai = t => {
      t = 1 === t;
      this.GetVerticalLayout(0)?.RootUIComp.SetUIActive(t), this.Pe.IsVisible = t
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
      [2, UE.UIExtendToggle],
      [3, UE.UIText],
      [4, UE.UISprite]
    ]
  }
  OnStart() {
    this.n8e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), () => new NewSoundDetectItem_1.NewSoundDetectItem), this.GetExtendToggle(2)?.OnStateChange.Add(this.Yai)
  }
  Refresh(t, e, i) {
    this.Pe = t, this.n8e?.RefreshByData(this.Pe.DungeonList);
    var s = t.IsVisible ? 1 : 0;
    this.GetExtendToggle(2)?.SetToggleState(s), this.Yai(s), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TabTextId), t.IconPath && this.SetSpriteByPath(t.IconPath, this.GetSprite(4), !1)
  }
}
exports.NewSoundDetectTabItem = NewSoundDetectTabItem;
//# sourceMappingURL=NewSoundDetectTabItem.js.map