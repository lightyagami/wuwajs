"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RailSlideView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const MoveSkillItem_1 = require("../MoveSkillItem");
const actionNameList = [InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动];
const tag1 = 1819726244;
const tag2 = -1158672660;
const forbidMoveTagId = -82341994;
const EFFECT_ID = 1003;
class RailSlideView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.det = [];
    this.Wst = undefined;
    this.ldt = [];
    this.bMe = (e, t) => {
      if (t === 0) {
        for (let t = 0; t < actionNameList.length; t++) {
          if (e === actionNameList[t]) {
            this.det[t].OnInputAction();
            break;
          }
        }
      }
    };
    this.lgu = () => {
      this.Hwc();
    };
    this._gu = (t, e) => {
      this.det[0].SetCustomDynamicEffectId(e ? EFFECT_ID : 0);
    };
    this.ugu = (t, e) => {
      this.det[1].SetCustomDynamicEffectId(e ? EFFECT_ID : 0);
    };
    this.N2u = (t, e) => {
      this.det[0].SetUiActive(!e);
      this.det[1].SetUiActive(!e);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.lgu);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(13, 12, false);
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(13, 12, true);
  }
  async NewAllSkillItems() {
    var t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner()];
    await Promise.all(t.map(async (t, e) => this.fet(t, e)));
  }
  async fet(t, e) {
    var i = new MoveSkillItem_1.MoveSkillItem();
    await i.NewByRootActorAsync(t, e);
    this.det.push(i);
    return i;
  }
  Cet() {
    this.det[0].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, -1, false);
    this.det[1].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, 1, false);
    this.det[0].RefreshKeyByActionName(actionNameList[0]);
    this.det[1].RefreshKeyByActionName(actionNameList[1]);
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
    for (const t of this.det) {
      t.Destroy();
    }
    this.det.length = 0;
    this.m$e();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.lgu);
  }
  Hwc() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (this.Wst !== t) {
      this.m$e();
      this.Wst = t;
      this.c$e();
    }
  }
  c$e() {
    var t;
    if (this.Wst && (t = this.Wst.GameplayTagComponent)) {
      this.mdt(t, tag1, this._gu, true);
      this.mdt(t, tag2, this.ugu, true);
      this.mdt(t, forbidMoveTagId, this.N2u, true);
    }
  }
  m$e() {
    for (const t of this.ldt) {
      t.EndTask();
    }
    this.ldt.length = 0;
    this.Wst = undefined;
  }
  mdt(t, e, i, s = false) {
    if (s && t.HasTag(e)) {
      i(e, true);
    }
    s = t.ListenForTagAddOrRemove(e, i);
    if (s) {
      this.ldt.push(s);
    }
  }
  OnTick(t) {
    for (const e of this.det) {
      e.Tick(t);
    }
  }
}
exports.RailSlideView = RailSlideView;
//# sourceMappingURL=RailSlideView.js.map