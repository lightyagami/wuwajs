"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelAttrDetailView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const MotorcycleLevelAttrListScrollItem_1 = require("../Item/MotorcycleLevelAttrListScrollItem");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class MotorcycleLevelAttrDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NWe = undefined;
    this.OWe = () => new MotorcycleLevelAttrListScrollItem_1.MotorcycleLevelAttrListScrollItem();
    this.xpt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  OnStart() {
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("MotorAttributeIcon");
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.xpt);
    this.lqe.SetTitleLocalText("PrefabTextItem_1302715335_Text");
    if (e) {
      this.lqe.SetTitleIcon(e);
    }
    this.NWe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.OWe);
    var e = this.OpenParam;
    this.NWe.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.lqe.Destroy();
  }
}
exports.MotorcycleLevelAttrDetailView = MotorcycleLevelAttrDetailView;
//# sourceMappingURL=MotorcycleLevelAttrDetailView.js.map