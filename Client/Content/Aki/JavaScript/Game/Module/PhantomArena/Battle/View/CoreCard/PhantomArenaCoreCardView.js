"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCoreCardView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  CommonCardItem_1 = require("../../../Common/CardItem/Item/CommonCardItem");
class PhantomArenaCoreCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.CardItem = void 0, this.Pe = void 0, this.lPe = () => {
      this.CloseMe()
    }, this.Cnu = (e, t) => {
      "Start" === e && "Update" === t && this.UiViewSequence?.PlaySequencePurely("Update")
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [3, this.lPe]
    ]
  }
  async OnBeforeStartAsync() {
    await this.Ri1()
  }
  OnStart() {
    this.Pe = this.OpenParam, this.ai1(), this.Vcu(), this.pnu()
  }
  OnBeforeDestroy() {
    this.Pe.Callback?.()
  }
  async Ri1() {
    this.CardItem = new CommonCardItem_1.CommonCardItem, await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  ai1() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.TaskCardConfigId,
      t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    this.CardItem.Refresh(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Name)
  }
  Vcu() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.IsAllFinish;
    this.GetText(1)?.SetUIActive(!e), e || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.TaskCardConfigId, e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaFourTask(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.CoreDesc))
  }
  pnu() {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.IsAllFinish && this.RootActor.OnSequencePlayEvent.Bind(this.Cnu)
  }
}
exports.PhantomArenaCoreCardView = PhantomArenaCoreCardView;
//# sourceMappingURL=PhantomArenaCoreCardView.js.map