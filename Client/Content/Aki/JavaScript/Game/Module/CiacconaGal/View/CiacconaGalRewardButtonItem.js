"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalRewardButtonItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class CiacconaGalRewardButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.e0t = undefined;
    this.dVc = false;
    this.TDe = undefined;
    this.eTt = () => {};
    this.J_ = () => {
      this.mVc();
      if (!ModelManager_1.ModelManager.CiacconaGalModel.ActivityData?.IsInRewardTime) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
        this.SetActive(false);
      }
    };
    this.QUc = () => {
      this.eTt();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.e0t = new ButtonSpriteItem_1.ButtonSpriteItem();
    this.e0t.SetFunction(this.QUc);
    await this.e0t.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    if (this.dVc) {
      this.mVc();
      this.TDe = TimerSystem_1.TimerSystem.Forever(this.J_, TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.TimerSystem.Remove(this.TDe);
    }
  }
  SetNeedRemainTime(e) {
    this.dVc = e;
  }
  SetOnClick(e) {
    this.eTt = e;
  }
  BindRedDot(e, t) {
    this.e0t.BindRedDot(e, t);
  }
  UnBindRedDot() {
    this.e0t.UnBindRedDot();
  }
  SetRedDotVisible(e) {
    this.e0t.SetRedDotVisible(e);
  }
  SetProgressText(e) {
    this.GetText(2).SetText(e);
  }
  SetTitle(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
  mVc() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Xkjsx_Rewards_Timeless") + " " + ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.RewardRemainTimeStr;
    this.GetText(3)?.SetText(e);
  }
}
exports.CiacconaGalRewardButtonItem = CiacconaGalRewardButtonItem;
//# sourceMappingURL=CiacconaGalRewardButtonItem.js.map