"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackTitleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const titleName = new Map([[1, "HonamiStory_WareHouse"], [2, "HonamiStory_BackPack"], [3, "HonamiStory_FallingPile"]]);
const resourceMap = new Map([[1, "SP_TipsTitleIcon2"], [2, "SP_TipsTitleIcon1"], [3, "SP_TipsTitleIcon3"]]);
class HonamiStoryBackpackTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Backpack = 1;
    this.Backpack = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), titleName.get(this.Backpack));
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(resourceMap.get(this.Backpack)) ?? "";
    this.SetSpriteByPath(e, this.GetSprite(0), false);
    this.Refresh();
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(this.Backpack);
    var i = e.GetCapacity();
    var a = e.GetOccupy();
    if (this.Backpack === 1 && e.GetOverflowCapacity() > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HonamiStory_OverflowCapacity", a, i);
    } else {
      this.GetText(2)?.SetText(a + "/" + i);
    }
  }
}
exports.HonamiStoryBackpackTitleItem = HonamiStoryBackpackTitleItem;
//# sourceMappingURL=HonamiStoryBackpackTitleItem.js.map