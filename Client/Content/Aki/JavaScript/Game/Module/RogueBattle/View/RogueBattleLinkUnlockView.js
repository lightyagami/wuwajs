"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleLinkUnlockView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleLinkUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.NOe = 0, this.OnClickConfirm = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
      e && (!(e = e.Data.rE1.Cn1) || this.NOe >= e.length - 1 ? ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam) : (this.NOe++, this.RefreshLinkInfo(), this.UiViewSequence.HasSequenceNameInPlaying("Start") ? this.UiViewSequence.ReplaySequence("Start") : this.UiViewSequence.PlaySequence("Start")))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [5, this.OnClickConfirm]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lqe.SetCloseBtnActive(!1), this.RefreshLinkInfo()
  }
  OnBeforeHide() {
    this.UiViewSequence.HasSequenceNameInPlaying("Start") && this.UiViewSequence.StopSequenceByKey("Start", !1, !0)
  }
  RefreshLinkInfo() {
    var e, i, t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    !t || !(t = t.Data.rE1.Cn1) || this.NOe >= t.length || (t = t[this.NOe], (i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)) && (this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(3)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name), t = ModelManager_1.ModelManager.RogueBattleModel?.GetRoleBondDataById(t)) && (e = i.LinkEffectDesc.get(t.F6n), i = i.LinkEffectDescParam.get(t.F6n), e) && i && LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e, ...i.split("#")))
  }
}
exports.RogueBattleLinkUnlockView = RogueBattleLinkUnlockView;
//# sourceMappingURL=RogueBattleLinkUnlockView.js.map