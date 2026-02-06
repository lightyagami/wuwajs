"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowCollectionItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleArrowCollectionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CollectionData = undefined;
    this.TextureQualityBg = undefined;
    this.TextTitle = undefined;
    this.TextureIcon = undefined;
    this.TextCollectionType = undefined;
    this.SpriteTypeIcon = undefined;
    this.TextCollectionDesc = undefined;
    this.LockItem = undefined;
    this.$pt = undefined;
    this.OnSelectCallback = undefined;
    this.OnClickToggleRoot = i => {
      this.OnSelectCallback?.(this.CollectionData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggleRoot]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.TextTitle = this.GetText(2);
    this.TextCollectionType = this.GetText(4);
    this.SpriteTypeIcon = this.GetSprite(5);
    this.TextCollectionDesc = this.GetText(6);
    this.TextureIcon = this.GetTexture(3);
    this.TextureQualityBg = this.GetTexture(1);
    this.LockItem = this.GetItem(7);
    this.LockItem.SetUIActive(false);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.$pt.PlaySequencePurely("Start");
  }
  UpdateData(i, t) {
    this.CollectionData = i;
    this.i8u();
    this.Zhg();
    if (t) {
      this.$pt.PlaySequencePurely("Start");
    }
  }
  i8u() {
    var i = this.CollectionData.Config.Quality;
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightQuality(i);
    this.SetTextureByPath(i.DetailCardBg, this.TextureQualityBg);
  }
  Zhg() {
    var i = this.CollectionData.Config;
    this.GetText(2).ShowTextNew(i.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.TextCollectionDesc, i.Desc, ...i.DescParam);
    var t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionTypeConfigById(i.Type);
    this.TextCollectionType.ShowTextNew(t.Name);
    this.SetSpriteByPath(t.Icon, this.SpriteTypeIcon, false);
    this.SetTextureByPath(i.IconBig, this.TextureIcon);
  }
  SetTextureBgByResId(i, t) {
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(i, t);
  }
  SetSelect(i) {
    this.GetExtendToggle(0)?.SetToggleStateForce(i ? 1 : 0, false);
  }
}
exports.MotorcycleArrowCollectionItem = MotorcycleArrowCollectionItem;
//# sourceMappingURL=MotorcycleArrowCollectionItem.js.map