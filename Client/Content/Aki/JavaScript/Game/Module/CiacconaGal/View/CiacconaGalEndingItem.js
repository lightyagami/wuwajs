"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaGalEndingItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class CiacconaGalEndingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(), this.wxc = e, this.cR1 = t, this.Sxc = void 0, this.FKa = () => {
      var e;
      this.wxc.IsFinished ? (e = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id, ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetActivityEndingReward(e, this.wxc.Id)) : (e = {
        RewardLists: ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.wxc.RewardId).map(e => ({
          Id: e[0].ItemId,
          Num: e[1],
          Received: !1
        })),
        MountItem: this.GetItem(5),
        PosBias: new UE.Vector(0, 0, 0)
      }, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, e))
    }, this.IFc = () => {
      this.wxc.IsFinished ? ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingDetailView(this.wxc.Id, this.cR1) : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("EndingUnfinished")
    }, this.uVc = () => {
      this.PKt()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UINiagara]
    ], this.BtnBindInfo = [
      [0, this.IFc]
    ]
  }
  async OnBeforeStartAsync() {
    this.Sxc = new ButtonSpriteItem_1.ButtonSpriteItem, this.Sxc.SetFunction(this.FKa), await this.Sxc.CreateByActorAsync(this.GetItem(5).GetOwner())
  }
  OnStart() {
    this.PKt(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.uVc)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.uVc)
  }
  PKt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.cR1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.wxc.Title), this.Sxc.SetActive(!this.wxc.IsRewarded), this.Sxc.SetRedDotVisible(this.wxc.IsFinished && !this.wxc.IsRewarded), this.GetSprite(4).SetUIActive(this.wxc.IsRewarded);
    var e = 1 === this.wxc.Type ? "T_PlotReasoningFinalLockGold" : "T_PlotReasoningFinalLock",
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e),
      e = this.wxc.IsFinished ? this.wxc.ImagePath : e;
    this.SetTextureByPath(e, this.GetTexture(1)), this.GetTexture(6).SetUIActive(!this.wxc.IsFinished), this.GetTexture(7).SetUIActive(this.wxc.IsFinished), this.GetUiNiagara(8).SetUIActive(!this.wxc.IsFinished && 1 === this.wxc.Type)
  }
}
exports.CiacconaGalEndingItem = CiacconaGalEndingItem;
//# sourceMappingURL=CiacconaGalEndingItem.js.map