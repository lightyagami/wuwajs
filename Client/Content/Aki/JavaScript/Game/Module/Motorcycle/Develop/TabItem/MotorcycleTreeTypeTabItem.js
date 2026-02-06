"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTreeTypeTabItemData = exports.MotorcycleTreeTypeTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class MotorcycleTreeTypeTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.N5g = undefined;
    this.emf = 0;
    this.V5g = 0;
    this.Hea = undefined;
    this.kqe = e => {
      if (e === 1) {
        this.SelectedCallBack?.(this.GridIndex);
        this.GetItem(6).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    super.OnStart();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(6));
  }
  OnRefresh(e, t, o) {
    var i = e.TreeType;
    var e = e.IsFinish;
    var s = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(i);
    var i = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(i);
    if (i && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name), this.SetTextureByPath(i.Icon, this.GetTexture(1)), this.GetItem(3).SetUIActive(e), this.GetItem(6).SetUIActive(s), s)) {
      this.Hea.StopSequenceByKey("Loop");
      this.Hea.PlayLevelSequenceByName("Loop");
    }
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  BindRedDot(e, t) {
    this.UnBindRedDot();
    var o = this.GetItem(4);
    this.l4e = e;
    this.emf = t;
    RedDotController_1.RedDotController.BindRedDot(e, o, undefined, t);
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(4), this.emf);
      this.l4e = undefined;
      this.emf = 0;
    }
  }
  BindNewRedDot(e, t) {
    this.UnBindNewRedDot();
    var o = this.GetItem(5);
    this.N5g = e;
    this.V5g = t;
    RedDotController_1.RedDotController.BindRedDot(e, o, undefined, t);
  }
  UnBindNewRedDot() {
    if (this.N5g) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.N5g, this.GetItem(5), this.V5g);
      this.N5g = undefined;
      this.V5g = 0;
    }
  }
}
exports.MotorcycleTreeTypeTabItem = MotorcycleTreeTypeTabItem;
class MotorcycleTreeTypeTabItemData extends CommonTabItemBase_1.CommonTabItemData {
  constructor() {
    super(...arguments);
    this.TreeType = 0;
    this.IsFinish = false;
  }
}
exports.MotorcycleTreeTypeTabItemData = MotorcycleTreeTypeTabItemData;
//# sourceMappingURL=MotorcycleTreeTypeTabItem.js.map