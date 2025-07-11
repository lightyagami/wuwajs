"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseInBattleTips = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TowerDefenceController_1 = require("../TowerDefenceController");
const WAITING_TO_CLOSE = 2000;
class TowerDefenseInBattleTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.DOt = undefined;
    this.ioa = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.DOt = new SmallItemGrid_1.SmallItemGrid();
    await this.DOt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.bl();
  }
  OnAfterDestroy() {
    TowerDefenceController_1.TowerDefenseController.TryReopenInBattleTip();
  }
  bl() {
    this.ioa = ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
    var e = TowerDefenceController_1.TowerDefenseController.BuildPhantomIconInBattleData();
    this.DOt.Apply(e);
    var e = TowerDefenceController_1.TowerDefenseController.BuildPhantomTipsInBattleData();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.TitleTextId);
    if (e.DescArgs) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.DescTextId, ...e.DescArgs);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.DescTextId);
    }
  }
  OnAfterPlayStartSequence() {
    this.ZMa().finally(() => {
      TowerDefenceController_1.TowerDefenseController.ResetCurrentPhantomLevelUpFlag(this.ioa);
      this.CloseMe();
    });
  }
  async ZMa() {
    await TimerSystem_1.TimerSystem.Wait(WAITING_TO_CLOSE);
  }
}
exports.TowerDefenseInBattleTips = TowerDefenseInBattleTips;
//# sourceMappingURL=TowerDefenceInBattleTips.js.map