"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionGridItemData = exports.CollectionGridItem = exports.CollectionGridItemPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const SyncGridProxyAbstract_1 = require("../../../Util/Grid/SyncGridProxyAbstract");
class CollectionGridItemPanel extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.NeedSelectedState = true;
    this.OnClickCallBack = t => {};
    this.kqe = () => {
      this.OnClickCallBack(this.Data);
      if (!this.NeedSelectedState) {
        this.SetToggleState(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIExtendToggle]];
    this.BtnBindInfo = [[7, this.kqe]];
  }
  OnRefresh(t, e, i) {
    this.Refresh(t);
  }
  Refresh(t) {
    var e = (this.Data = t).Config;
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightQuality(e.Quality);
    this.SetSpriteByPath(i.SmallGridBg, this.GetSprite(0), false);
    this.SetTextureByPath(e.Icon, this.GetTexture(1));
    this.GetText(3).SetText("x" + t.Num.toString());
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemType(e.Type);
    this.SetLeftTopIconVisible(i.Icon);
  }
  SetToggleState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(7).SetToggleState(t);
  }
}
exports.CollectionGridItemPanel = CollectionGridItemPanel;
class CollectionGridItem extends SyncGridProxyAbstract_1.SyncGridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Q$l = undefined;
    this.OnClickCb = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.Q$l = new CollectionGridItemPanel();
    this.Q$l.CreateThenShowByActor(this.GetItem(0).GetOwner());
    this.Q$l.OnClickCallBack = this.OnClickCb;
  }
  Refresh(t) {
    this.Q$l?.Refresh(t);
  }
  SetToggleState(t) {
    this.Q$l?.SetToggleState(t);
  }
}
exports.CollectionGridItem = CollectionGridItem;
class CollectionGridItemData {
  constructor() {
    this.Data = undefined;
    this.OnClickCb = undefined;
  }
  GetTemplateIndex() {
    return 1;
  }
  CreateProxy() {
    const e = new CollectionGridItem();
    e.OnClickCb = t => {
      this.OnClickCb(t, e);
    };
    return e;
  }
}
exports.CollectionGridItemData = CollectionGridItemData;
//# sourceMappingURL=MotorcycleArrowCollectionGridItem.js.map