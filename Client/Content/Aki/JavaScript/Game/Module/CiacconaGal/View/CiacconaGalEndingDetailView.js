"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalEndingDetailView = void 0;
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig");
class CiacconaGalEndingDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.dqc = void 0, this.wxc = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [3, UE.UIText],
      [2, UE.UIText],
      [4, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem, this.dqc.SetCloseCallBack(() => {
      this.CloseMe()
    }), await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var i = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_DETAIL_TITLE);
    this.dqc.SetTitleByTextIdAndArgNew(i)
  }
  OnStart() {
    var i = this.OpenParam;
    this.wxc = i.EndingData, this.wxc && (this.SetTextureByPath(this.wxc.DetailImagePath, this.GetTexture(1)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.wxc.Title), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.wxc.Desc), this.GetText(3).SetUIActive(!!i.LabelTextId), i.LabelTextId) && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.LabelTextId)
  }
}
exports.CiacconaGalEndingDetailView = CiacconaGalEndingDetailView;
//# sourceMappingURL=CiacconaGalEndingDetailView.js.map