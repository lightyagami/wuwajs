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
    var o = this.XGm.get(e);
    return !!o && (o(l, e), true);
  }
}
exports.RouletteExploreSkillController = RouletteExploreSkillController;
(_a = RouletteExploreSkillController).YGm = () => {
  ControllerHolder_1.ControllerHolder.RouletteController.OnUseEquipItem();
};
RouletteExploreSkillController.zGm = () => {
  ControllerHolder_1.ControllerHolder.RouletteController.OpenEmptyTips();
};
RouletteExploreSkillController.JGm = (l, e) => {
  ControllerHolder_1.ControllerHolder.MapExploreToolController.CheckUseMapExploreTool(l, e);
};
RouletteExploreSkillController.ZGm = () => {
  ControllerHolder_1.ControllerHolder.AdviceController.OpenAdviceCreateView();
};
RouletteExploreSkillController.eFm = () => {
  ControllerHolder_1.ControllerHolder.PhotographController.PhotographFastScreenShot();
};
RouletteExploreSkillController.tFm = () => {
  ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(3);
};
RouletteExploreSkillController.Z7m = () => {
  ControllerHolder_1.ControllerHolder.AutoPilotController.EnterAutoPilot();
};
RouletteExploreSkillController.uBf = () => {
  ControllerHolder_1.ControllerHolder.AutoPilotController.SummonMotorAndEnterAutoPilot();
};
RouletteExploreSkillController.oWm = () => {
  ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.OpenMusicPlayerView();
};
RouletteExploreSkillController.EGf = (l, e) => {
  PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionSummonView(l, e);
};
RouletteExploreSkillController.tPg = () => {
  ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.OpenMotorTechTreeSwitchView();
};
RouletteExploreSkillController.XGm = new Map([[210013, _a.YGm], [210018, _a.zGm], [210015, _a.JGm], [210016, _a.JGm], [210017, _a.JGm], [210011, _a.ZGm], [210012, _a.eFm], [700103, _a.tFm], [10001007, _a.Z7m], [10001008, _a.oWm], [800003, _a.uBf], [2100081, _a.EGf], [10001012, _a.EGf], [10001100, _a.tPg]]); //# sourceMappingURL=RouletteExploreSkillController.js.map