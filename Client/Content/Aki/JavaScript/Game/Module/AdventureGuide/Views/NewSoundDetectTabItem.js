"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundDetectTabItemDungeonItem = exports.NewSoundDetectTabItemDungeonData = exports.NewSoundDetectTabItemTitleItem = exports.NewSoundDetectTabItemTitleData = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const SyncGridProxyAbstract_1 = require("../../Util/Grid/SyncGridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const NewSoundDetectItem_1 = require("./NewSoundDetectItem");
class NewSoundDetectTabItemTitleData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 0;
    this.OnClickCallBack = undefined;
    this.CreateProxy = () => {
      var t = new NewSoundDetectTabItemTitleItem();
      t.OnClickCallBack = this.OnClickCallBack;
      return t;
    };
  }
}
exports.NewSoundDetectTabItemTitleData = NewSoundDetectTabItemTitleData;
class NewSoundDetectTabItemTitleItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.s7g = 0;
    this.Lrt = false;
    this.OnClickCallBack = undefined;
    this.Yai = t => {
      this.OnClickCallBack?.(this.s7g, !this.Lrt);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Yai]];
  }
  OnStart() {}
  Refresh(t) {
    this.s7g = t.Area;
    this.Lrt = t.IsVisible;
    var e = t.IsVisible ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(e, false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TabTextId);
    if (t.IconPath) {
      this.SetSpriteByPath(t.IconPath, this.GetSprite(2), false);
    }
    this.GetSprite(2)?.SetUIActive(t.IconPath !== undefined && !StringUtils_1.StringUtils.IsBlank(t.IconPath));
    this.GetItem(3)?.SetUIActive(t.IconPath !== undefined && !StringUtils_1.StringUtils.IsBlank(t.IconPath));
    this.GetItem(4)?.SetUIActive(t.IconPath === undefined || StringUtils_1.StringUtils.IsBlank(t.IconPath));
  }
}
exports.NewSoundDetectTabItemTitleItem = NewSoundDetectTabItemTitleItem;
class NewSoundDetectTabItemDungeonData {
  constructor(t) {
    this.Data = t;
    this.GetTemplateIndex = () => 1;
    this.CreateProxy = () => {
      return new NewSoundDetectTabItemDungeonItem();
    };
  }
}
exports.NewSoundDetectTabItemDungeonData = NewSoundDetectTabItemDungeonData;
class NewSoundDetectTabItemDungeonItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.a7g = undefined;
  }
  OnStart() {
    this.a7g = new NewSoundDetectItem_1.NewSoundDetectItem();
    this.a7g.CreateThenShowByActor(this.RootItem.GetOwner());
    this.a7g.SyncStart();
  }
  Refresh(t) {
    if (t.Dungeon) {
      this.a7g?.Refresh(t.Dungeon, false, 0);
    }
  }
}
exports.NewSoundDetectTabItemDungeonItem = NewSoundDetectTabItemDungeonItem;
//# sourceMappingURL=NewSoundDetectTabItem.js.map