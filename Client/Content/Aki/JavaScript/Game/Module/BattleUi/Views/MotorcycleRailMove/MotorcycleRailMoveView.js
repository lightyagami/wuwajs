"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailMoveView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const MoveSkillItem_1 = require("../MoveSkillItem");
const actionNameList = [InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动];
const switchLeftTag = 1284083505;
const switchRightTag = 578211242;
const EFFECT_ID = 1003;
class MotorcycleRailMoveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.det = [];
    this.ldt = [];
    this.bMe = (t, e) => {
      if (e === 0) {
        for (let e = 0; e < actionNameList.length; e++) {
          if (t === actionNameList[e]) {
            this.det[e].OnInputAction();
            break;
          }
        }
      }
    };
    this.CRm = (e, t) => {
      this.det[0].SetCustomSkillItemEnable(t);
      this.det[0].SetCustomDynamicEffectId(t ? EFFECT_ID : 0);
    };
    this.pRm = (e, t) => {
      this.det[1].SetCustomSkillItemEnable(t);
      this.det[1].SetCustomDynamicEffectId(t ? EFFECT_ID : 0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems();
    this.Cet();
  }
  OnStart() {
    super.OnStart();
    this.Hwc();
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(13, [12, 7, 8, 39, 40], false);
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(13, [12, 7, 8, 39, 40], true);
  }
  async NewAllSkillItems() {
    var e = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner()];
    await Promise.all(e.map(async (e, t) => this.fet(e, t)));
  }
  async fet(e, t) {
    var i = new MoveSkillItem_1.MoveSkillItem();
    await i.NewByRootActorAsync(e, t);
    this.det.push(i);
    return i;
  }
  Cet() {
    this.det[0].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, -1, false);
    this.det[1].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, 1, false);
    this.det[0].RefreshKeyByActionName(actionNameList[0]);
    this.det[1].RefreshKeyByActionName(actionNameList[1]);
    this.det[0].SetCustomSkillItemEnable(false);
    this.det[1].SetCustomSkillItemEnable(false);
  }
  OnAddEventListener() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe);
    }
  }
  OnRemoveEventListener() {
    if (!Info_1.Info.IsInTouch()) {
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe);
    }
  }
  OnBeforeDestroy() {
    for (const e of this.det) {
      e.Destroy();
    }
    this.det.length = 0;
    this.m$e();
  }
  Hwc() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(e)) {
      this.m$e();
      this.c$e();
    }
  }
  c$e() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController.IsPlayerExist(e) && (e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(210))) {
      this.mdt(e, switchLeftTag, this.CRm, true);
      this.mdt(e, switchRightTag, this.pRm, true);
    }
  }
  m$e() {
    for (const e of this.ldt) {
      e.EndTask();
    }
    this.ldt.length = 0;
  }
  mdt(e, t, i, s = false) {
    if (s && e.HasTag(t)) {
      i(t, true);
    }
    s = e.ListenForTagAddOrRemove(t, i);
    if (s) {
      this.ldt.push(s);
    }
  }
  OnTick(e) {
    for (const t of this.det) {
      t.Tick(e);
    }
  }
}
exports.MotorcycleRailMoveView = MotorcycleRailMoveView;
//# sourceMappingURL=MotorcycleRailMoveView.js.map