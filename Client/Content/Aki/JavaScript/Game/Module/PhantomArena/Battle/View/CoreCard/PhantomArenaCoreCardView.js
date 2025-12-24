"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCoreCardView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const CommonCardItem_1 = require("../../../Common/CardItem/Item/CommonCardItem");
class PhantomArenaCoreCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CardItem = undefined;
    this.Pe = undefined;
    this.lPe = () => {
      this.CloseMe();
    };
    this._1u = (e, i) => {
      if (e === "Start" && i === "Update") {
        this.UiViewSequence?.PlaySequencePurely("Update");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.lPe]];
  }
  async OnBeforeStartAsync() {
    await this.Ki1();
  }
  OnStart() {
    this.Pe = this.OpenParam;
    this.Li1();
    this.DTu();
    this.u1u();
  }
  OnBeforeDestroy() {
    this.Pe.Callback?.();
  }
  async Ki1() {
    this.CardItem = new CommonCardItem_1.CommonCardItem();
    await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Li1() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.TaskCardConfigId;
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    this.CardItem.Refresh(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
  }
  DTu() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.IsAllFinish;
    this.GetText(1)?.SetUIActive(!e);
    if (!e) {
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.TaskCardConfigId;
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaFourTask(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.CoreDesc);
    }
  }
  u1u() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData.IsAllFinish) {
      this.RootActor.OnSequencePlayEvent.Bind(this._1u);
    }
  }
  GetExtraResourceId(e) {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      return "UiView_CoreCard";
    } else {
      return "UiView_CoreCardNew";
    }
  }
}
exports.PhantomArenaCoreCardView = PhantomArenaCoreCardView;
//# sourceMappingURL=PhantomArenaCoreCardView.js.map