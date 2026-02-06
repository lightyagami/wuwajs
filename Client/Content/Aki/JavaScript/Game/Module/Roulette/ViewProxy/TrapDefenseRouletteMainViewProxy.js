"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRouletteMainViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain");
const TrapDefenseRouletteItemTips_1 = require("../View/TrapDefenseRouletteItemTips");
const RouletteMainViewProxyBase_1 = require("./RouletteMainViewProxyBase");
class TrapDefenseRouletteMainViewProxy extends RouletteMainViewProxyBase_1.RouletteMainViewProxyBase {
  constructor() {
    super(...arguments);
    this.hFm = [[[1], 4, 0], [[2], 5, 0], [[3], 6, 0], [[4], 7, 0], [[5], 8, 0], [[6], 9, 0], [[7], 10, 0], [[8], 11, 0]];
    this.Cpo = undefined;
    this.ItemTips = undefined;
  }
  async OnBeforeStartAsync() {
    this.ItemTips = new TrapDefenseRouletteItemTips_1.TrapDefenseRouletteItemTips();
    await this.ItemTips.CreateByResourceIdAsync("UiItem_PropEffect", this.View.GetRootItem());
  }
  OnBeforeShow() {
    var e;
    if (!Info_1.Info.IsInTouch() && !(e = this.GetActionName(), ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(e))) {
      this.View.CloseSelf();
    }
  }
  OnCanOpenView() {
    return ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(true) && ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelDataHasShop();
  }
  OnGetRouletteComponent() {
    if (!this.Cpo) {
      this.Cpo = new RouletteComponentMain_1.RouletteComponentMainExplore();
      this.Cpo.RegisterViewProxy(this);
      this.Cpo.SetRootActor(this.View.RouletteUiItem.GetOwner(), true);
    }
    return this.Cpo;
  }
  OnGetRouletteType() {
    return 0;
  }
  OnGetCanSwitchType() {
    return false;
  }
  OnGetPanelSwitchOpen() {
    return false;
  }
  OnGetCanOpenAssembly(e) {
    return false;
  }
  OnGetExploreRouletteDataMap() {
    return this.hFm;
  }
  OnGetRouletteGridId(e, t) {
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(this.RouletteType).GetRouletteGridId(e, t, true);
  }
  OnGetActionName() {
    return InputMappingsDefine_1.actionMappings.塔防轮盘;
  }
  OnRefreshTips() {
    var e = this.Cpo?.GetCurrentGrid();
    if (e && e.Data && e.Data.Id > 0) {
      e = e.Data.Id;
      e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseItemByExploreToolId(e);
      this.ItemTips.RefreshTips(e?.Desc);
    } else {
      this.ItemTips.RefreshTips(undefined);
    }
  }
  OnDestroy() {
    if (this.Cpo) {
      this.Cpo.Destroy();
      this.Cpo = undefined;
    }
  }
}
exports.TrapDefenseRouletteMainViewProxy = TrapDefenseRouletteMainViewProxy;
//# sourceMappingURL=TrapDefenseRouletteMainViewProxy.js.map