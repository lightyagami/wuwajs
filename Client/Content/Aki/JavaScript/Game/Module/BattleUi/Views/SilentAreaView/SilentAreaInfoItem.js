"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaInfoItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const IQuest_1 = require("../../../../World/EntityReadCode/Interface/IQuest");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SilentAreaInfoSubItem_1 = require("./SilentAreaInfoSubItem");
class SilentAreaInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BO_ = IQuest_1.EInformationViewType.LevelPlay;
    this.kmt = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  Initialize(e, t) {
    this.CreateByActorAsync(e).finally(() => {
      this.UpdateItem(t);
    });
  }
  SetCurrentShowType(e) {
    this.BO_ = e;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(1);
    var t = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem();
    await t.CreateByActorAsync(e.GetOwner());
    this.kmt.push(t);
  }
  UpdateItem(e) {
    this.Fmt(e.TidMainTitle);
    this.Vmt(e.SubTitles);
  }
  Fmt(e) {
    var t = this.GetText(0);
    let i = "";
    i = this.BO_ === IQuest_1.EInformationViewType.LevelPlay ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e) : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    t?.SetText(i);
  }
  Vmt(i) {
    for (let t = 0; t < i.length; t++) {
      var s;
      var r = i[t];
      let e = undefined;
      if (t < this.kmt.length) {
        (e = this.kmt[t]).SetCurrentShowType(this.BO_);
        e.UpdateItem(r);
      } else {
        s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(1), this.GetItem(2));
        (e = new SilentAreaInfoSubItem_1.SilentAreaInfoSubItem()).SetCurrentShowType(this.BO_);
        e.Initialize(s.GetOwner(), r);
        this.kmt.push(e);
      }
    }
    this.kmt.forEach((e, t) => {
      e.SetActive(t < i.length);
    });
  }
}
exports.SilentAreaInfoItem = SilentAreaInfoItem;
//# sourceMappingURL=SilentAreaInfoItem.js.map