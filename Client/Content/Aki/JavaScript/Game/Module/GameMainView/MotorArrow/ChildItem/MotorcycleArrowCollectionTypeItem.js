"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionTypeItemData = exports.CollectionTypeItem = undefined;
const UE = require("ue");
const SyncGridProxyAbstract_1 = require("../../../Util/Grid/SyncGridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CollectionTypeItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  Refresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name);
    this.SetSpriteByPath(e.Icon, this.GetSprite(1), false);
  }
}
exports.CollectionTypeItem = CollectionTypeItem;
class CollectionTypeItemData {
  constructor() {
    this.Data = undefined;
  }
  GetTemplateIndex() {
    return 0;
  }
  CreateProxy() {
    return new CollectionTypeItem();
  }
}
exports.CollectionTypeItemData = CollectionTypeItemData;
//# sourceMappingURL=MotorcycleArrowCollectionTypeItem.js.map