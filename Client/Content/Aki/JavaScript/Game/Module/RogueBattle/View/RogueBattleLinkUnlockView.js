"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleLinkUnlockView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleLinkUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.NOe = 0;
    this.OnClickConfirm = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
      if (e) {
        if (!(e = e.Data.LE1.On1) || this.NOe >= e.length - 1) {
          ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam);
        } else {
          this.NOe++;
          this.RefreshLinkInfo();
          if (this.UiViewSequence.HasSequenceNameInPlaying("Start")) {
            this.UiViewSequence.ReplaySequence("Start");
          } else {
            this.UiViewSequence.PlaySequence("Start");
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.OnClickConfirm]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseBtnActive(false);
    this.RefreshLinkInfo();
  }
  OnBeforeHide() {
    if (this.UiViewSequence.HasSequenceNameInPlaying("Start")) {
      this.UiViewSequence.StopSequenceByKey("Start", false, true);
    }
  }
  RefreshLinkInfo() {
    var e;
    var i;
    var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (!!t && !!(t = t.Data.LE1.On1) && !(this.NOe >= t.length)) {
      t = t[this.NOe];
      if ((i = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)) && (this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(3)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name), t = ModelManager_1.ModelManager.RogueBattleModel?.GetRoleBondDataById(t)) && (e = i.LinkEffectDesc.get(t.F6n), i = i.LinkEffectDescParam.get(t.F6n), e) && i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e, ...i.split("#"));
      }
    }
  }
}
exports.RogueBattleLinkUnlockView = RogueBattleLinkUnlockView;
//# sourceMappingURL=RogueBattleLinkUnlockView.js.map