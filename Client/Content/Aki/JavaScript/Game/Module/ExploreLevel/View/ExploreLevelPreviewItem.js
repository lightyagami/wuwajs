"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreLevelPreviewItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreLevelPreviewItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.gVt = (e, r, i) => {
      var t = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      t.Initialize(r.GetOwner());
      t.RefreshByConfigId(e[0], e[1]);
      return {
        Key: i,
        Value: t
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UISprite], [6, UE.UIText]];
  }
  OnStart() {
    this.bOe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(4), this.gVt);
  }
  OnBeforeDestroy() {
    this.bOe = undefined;
  }
  Refresh(e, r, i) {
    var t = e.GetDropItemNumMap();
    var o = [];
    if (t) {
      for (var [l, s] of t) {
        o.push([l, s]);
      }
    }
    this.bOe.RefreshByData(o);
    this.SetTextureByPath(e.GetScoreTexturePath(), this.GetTexture(0));
    var t = ModelManager_1.ModelManager.ExploreLevelModel.GetCurrentCountryExploreLevelData().GetExploreLevel() >= e.GetExploreLevel();
    this.GetSprite(1).SetUIActive(t);
    this.GetText(2).SetUIActive(!t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetScoreNameId());
    var t = e.GetRewardNameId();
    var n = this.GetText(6);
    if (t) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(n, "ExploreUnlockPreviewText", t);
      n.SetUIActive(true);
    } else {
      n.SetUIActive(false);
    }
    this.GetSprite(5).SetUIActive(e.IsShowUnlockSprite());
  }
}
exports.ExploreLevelPreviewItem = ExploreLevelPreviewItem;
//# sourceMappingURL=ExploreLevelPreviewItem.js.map