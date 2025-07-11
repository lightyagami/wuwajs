"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalEndingItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CiacconaGalEndingItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.wxc = e;
    this.NR1 = t;
    this.Sxc = undefined;
    this.FKa = () => {
      var e;
      if (this.wxc.IsFinished) {
        e = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id;
        ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetActivityEndingReward(e, this.wxc.Id);
      } else {
        e = {
          RewardLists: ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.wxc.RewardId).map(e => ({
            Id: e[0].ItemId,
            Num: e[1],
            Received: false
          })),
          MountItem: this.GetItem(5),
          PosBias: new UE.Vector(0, 0, 0)
        };
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshRewardPopUp, e);
      }
    };
    this.IFc = () => {
      if (this.wxc.IsFinished) {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingDetailView(this.wxc.Id, this.NR1);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("EndingUnfinished");
      }
    };
    this.uVc = () => {
      this.PKt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UINiagara]];
    this.BtnBindInfo = [[0, this.IFc]];
  }
  async OnBeforeStartAsync() {
    this.Sxc = new ButtonSpriteItem_1.ButtonSpriteItem();
    this.Sxc.SetFunction(this.FKa);
    await this.Sxc.CreateByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.PKt();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.uVc);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCiacconaEndingDataUpdate, this.uVc);
  }
  PKt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.NR1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.wxc.Title);
    this.Sxc.SetActive(!this.wxc.IsRewarded);
    this.Sxc.SetRedDotVisible(this.wxc.IsFinished && !this.wxc.IsRewarded);
    this.GetSprite(4).SetUIActive(this.wxc.IsRewarded);
    var e = this.wxc.Type === 1 ? "T_PlotReasoningFinalLockGold" : "T_PlotReasoningFinalLock";
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    var e = this.wxc.IsFinished ? this.wxc.ImagePath : e;
    this.SetTextureByPath(e, this.GetTexture(1));
    this.GetTexture(6).SetUIActive(!this.wxc.IsFinished);
    this.GetTexture(7).SetUIActive(this.wxc.IsFinished);
    this.GetUiNiagara(8).SetUIActive(!this.wxc.IsFinished && this.wxc.Type === 1);
  }
}
exports.CiacconaGalEndingItem = CiacconaGalEndingItem;
//# sourceMappingURL=CiacconaGalEndingItem.js.map