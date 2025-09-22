"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleAttributeItem = exports.SurvivorsAttributeDetailView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class SurvivorsAttributeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NWe = undefined;
    this.OWe = () => {
      return new SurvivorsRoleAttributeItem();
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
    this.NWe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.OWe);
    this.NWe.RefreshByData(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AttributeComponentEvent, true);
  }
  OnBeforeDestroy() {
    this.lqe.Destroy();
    this.NWe &&= undefined;
  }
}
exports.SurvivorsAttributeDetailView = SurvivorsAttributeDetailView;
class SurvivorsRoleAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
  }
  OnStart() {
    this.GetText(5)?.SetUIActive(false);
    this.GetItem(6)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
  }
  Update(e) {
    this.GetSprite(1).useChangeColor = this.GridIndex % 2 == 1;
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e.AttrId);
    this.SetTextureByPath(t.Icon, this.GetTexture(2));
    this.GetText(3).ShowTextNew(t.Name);
    this.SetValue(e.Value, t.IsPercent);
  }
  SetValue(e, t = false) {
    this.GetText(4).SetText(t ? (e * 100).toString() + "%" : e.toString());
  }
}
exports.SurvivorsRoleAttributeItem = SurvivorsRoleAttributeItem;
//# sourceMappingURL=SurvivorsAttributeDetailView.js.map