"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaInfoSubItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const IQuest_1 = require("../../../../World/EntityReadCode/Interface/IQuest");
class SilentAreaInfoSubItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BO_ = IQuest_1.EInformationViewType.LevelPlay;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  SetCurrentShowType(e) {
    this.BO_ = e;
  }
  Initialize(e, t) {
    this.CreateByActorAsync(e).finally(() => {
      this.UpdateItem(t);
    });
  }
  UpdateItem(e) {
    var t = this.Fmt(e.TidTitle);
    this.Qmt(e.TidContent, t ? 32 : 36);
  }
  Fmt(e) {
    var t = this.GetText(0);
    let i = "";
    i = this.BO_ === IQuest_1.EInformationViewType.LevelPlay ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e) : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    if (StringUtils_1.StringUtils.IsBlank(i)) {
      t?.GetParentAsUIItem()?.SetUIActive(false);
      return false;
    } else {
      t?.SetText(i);
      t?.GetParentAsUIItem()?.SetUIActive(true);
      return true;
    }
  }
  Qmt(e, t) {
    var i = this.GetText(1);
    let r = "";
    r = this.BO_ === IQuest_1.EInformationViewType.LevelPlay ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e) : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    if (StringUtils_1.StringUtils.IsBlank(r)) {
      i?.SetUIActive(false);
    } else {
      i?.SetText(r);
      i?.SetFontSize(t);
      i?.SetUIActive(true);
    }
  }
}
exports.SilentAreaInfoSubItem = SilentAreaInfoSubItem;
//# sourceMappingURL=SilentAreaInfoSubItem.js.map