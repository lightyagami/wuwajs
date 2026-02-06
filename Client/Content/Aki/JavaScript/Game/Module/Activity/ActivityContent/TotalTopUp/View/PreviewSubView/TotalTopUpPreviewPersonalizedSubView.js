"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPreviewPersonalizedSubView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ItemController_1 = require("../../../../../Item/ItemController");
const TotalTopUpDefine_1 = require("../../TotalTopUpDefine");
const TotalTopUpPreviewSubViewBase_1 = require("./TotalTopUpPreviewSubViewBase");
class TotalTopUpPreviewPersonalizedSubView extends TotalTopUpPreviewSubViewBase_1.TotalTopUpPreviewSubViewBase {
  constructor() {
    super(...arguments);
    this.nqg = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
  }
  ShowPreview(o) {
    if ((o?.RewardData?.PreviewButtonRegistry.length ?? 0) !== 0) {
      this.nqg = [...o.RewardData.ItemIdList];
      for (let e = 0; e < o.RewardData.PreviewButtonRegistry.length; e++) {
        var r;
        var i = o.RewardData.ItemIdList[e];
        if (o.RewardData.ItemMap.get(i) && (r = o.RewardData.PreviewButtonRegistry[e], TotalTopUpDefine_1.TotalTopUpUtil.Debug("设置个性化饰品预览按钮", ["Index", e], ["道具ID", i], ["按钮索引", r]), i = this.GetButton(r))) {
          i.OnClickCallBack.Bind(() => {
            this.eTt(e);
          });
        }
      }
    }
  }
  eTt(e) {
    var o = this.nqg[e];
    var r = ConfigManager_1.ConfigManager.InventoryConfig?.GetItemConfigData(o);
    if (r) {
      for (var [i, t] of TotalTopUpDefine_1.itemTipsFunctionList) {
        if (i(o, r)) {
          t(o, r);
          return;
        }
      }
      ItemController_1.ItemController.OpenItemTipsByItemId(o, false);
    } else {
      TotalTopUpDefine_1.TotalTopUpUtil.Error("未找到个性化饰品道具配置", ["ItemId", o]);
    }
  }
}
exports.TotalTopUpPreviewPersonalizedSubView = TotalTopUpPreviewPersonalizedSubView;
//# sourceMappingURL=TotalTopUpPreviewPersonalizedSubView.js.map