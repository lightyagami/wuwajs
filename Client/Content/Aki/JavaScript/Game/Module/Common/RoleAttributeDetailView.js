"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAttributeDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const RoleAttrListScrollItem_1 = require("../RoleUi/View/RoleAttrListScrollItem");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class RoleAttributeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NWe = undefined;
    this.OWe = (e, t, i) => {
      t = new RoleAttrListScrollItem_1.RoleAttrListScrollItem(t, e.AttributeType);
      t.ShowTemp(e, i);
      return {
        Key: i,
        Value: t
      };
    };
    this.xpt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.xpt);
    this.lqe.SetTitleLocalText("PrefabTextItem_1302715335_Text");
    var e = this.OpenParam;
    this.NWe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(1), this.OWe);
    this.NWe.RefreshByData(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AttributeComponentEvent, true);
  }
  OnBeforeDestroy() {
    this.lqe.Destroy();
    if (this.NWe) {
      this.NWe.ClearChildren();
      this.NWe = undefined;
    }
  }
}
exports.RoleAttributeDetailView = RoleAttributeDetailView;
//# sourceMappingURL=RoleAttributeDetailView.js.map