"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteExploreSkillController = undefined;
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomInteractController_1 = require("../Phantom/PhantomInteract/PhantomInteractController");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
class RouletteExploreSkillController extends ControllerBase_1.ControllerBase {
  static UseRouletteExploreId(l) {
    var e;
    var o;
    if (ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().IsExploreSkillIdAllowEquip(l) && (e = PhantomUtil_1.PhantomUtil.GetVisionData(l)) && (o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && o.Entity && this.UseExploreSkillId(o.Id, e.技能ID)) {
      ModelManager_1.ModelManager.RouletteModel.TrySendExploreToolGeneralUseLogData(l);
    }
  }
  static UseExploreSkillId(l, e) {
    var o = this.BOm.get(e);
    return !!o && (o(l, e), true);
  }
}
exports.RouletteExploreSkillController = RouletteExploreSkillController;
(_a = RouletteExploreSkillController).kOm = () => {
  ControllerHolder_1.ControllerHolder.RouletteController.OnUseEquipItem();
};
RouletteExploreSkillController.qOm = () => {
  ControllerHolder_1.ControllerHolder.RouletteController.OpenEmptyTips();
};
RouletteExploreSkillController.OOm = (l, e) => {
  ControllerHolder_1.ControllerHolder.MapExploreToolController.CheckUseMapExploreTool(l, e);
};
RouletteExploreSkillController.GOm = () => {
  ControllerHolder_1.ControllerHolder.AdviceController.OpenAdviceCreateView();
};
RouletteExploreSkillController.FOm = () => {
  ControllerHolder_1.ControllerHolder.PhotographController.PhotographFastScreenShot();
};
RouletteExploreSkillController.NOm = () => {
  ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(3);
};
RouletteExploreSkillController.z6m = () => {
  ControllerHolder_1.ControllerHolder.AutoPilotController.EnterAutoPilot();
};
RouletteExploreSkillController.ZRf = () => {
  ControllerHolder_1.ControllerHolder.AutoPilotController.SummonMotorAndEnterAutoPilot();
};
RouletteExploreSkillController.bHm = () => {
  ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.OpenMusicPlayerView();
};
RouletteExploreSkillController.VUf = (l, e) => {
  PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionSummonView(l, e);
};
RouletteExploreSkillController.BOm = new Map([[210013, _a.kOm], [210018, _a.qOm], [210015, _a.OOm], [210016, _a.OOm], [210017, _a.OOm], [210011, _a.GOm], [210012, _a.FOm], [700103, _a.NOm], [10001007, _a.z6m], [10001008, _a.bHm], [800003, _a.ZRf], [2100081, _a.VUf], [10001012, _a.VUf]]); //# sourceMappingURL=RouletteExploreSkillController.js.map