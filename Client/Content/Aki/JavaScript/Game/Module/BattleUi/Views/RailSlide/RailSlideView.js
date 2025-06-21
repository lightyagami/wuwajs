"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RailSlideView = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputEnums_1 = require("../../../../Input/InputEnums"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  MoveSkillItem_1 = require("../MoveSkillItem"),
  actionNameList = [InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动],
  tag1 = 1819726244,
  tag2 = -1158672660,
  forbidMoveTagId = -82341994,
  EFFECT_ID = 1003;
class RailSlideView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.det = [], this.Wst = void 0, this.ldt = [], this.bMe = (e, t) => {
      if (0 === t)
        for (let t = 0; t < actionNameList.length; t++)
          if (e === actionNameList[t]) {
            this.det[t].OnInputAction();
            break
          }
    }, this.Lhu = () => {
      this.Hwc()
    }, this.whu = (t, e) => {
      this.det[0].SetCustomDynamicEffectId(e ? EFFECT_ID : 0)
    }, this.Ahu = (t, e) => {
      this.det[1].SetCustomDynamicEffectId(e ? EFFECT_ID : 0)
    }, this.ogu = (t, e) => {
      this.det[0].SetUiActive(!e), this.det[1].SetUiActive(!e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await this.NewAllSkillItems(), this.Cet()
  }
  OnStart() {
    super.OnStart(), this.Hwc(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Lhu)
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(13, 12, !1)
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(13, 12, !0)
  }
  async NewAllSkillItems() {
    var t = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner()];
    await Promise.all(t.map(async (t, e) => this.fet(t, e)))
  }
  async fet(t, e) {
    var i = new MoveSkillItem_1.MoveSkillItem;
    return await i.NewByRootActorAsync(t, e), this.det.push(i), i
  }
  Cet() {
    this.det[0].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, -1, !1), this.det[1].RefreshByMoveType(InputEnums_1.EInputAxis.MoveRight, 1, !1), this.det[0].RefreshKeyByActionName(actionNameList[0]), this.det[1].RefreshKeyByActionName(actionNameList[1])
  }
  OnAddEventListener() {
    Info_1.Info.IsInTouch() || InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe)
  }
  OnRemoveEventListener() {
    Info_1.Info.IsInTouch() || InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe)
  }
  OnBeforeDestroy() {
    for (const t of this.det) t.Destroy();
    this.det.length = 0, this.m$e(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Lhu)
  }
  Hwc() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    this.Wst !== t && (this.m$e(), this.Wst = t, this.c$e())
  }
  c$e() {
    var t;
    this.Wst && (t = this.Wst.GameplayTagComponent) && (this.mdt(t, tag1, this.whu, !0), this.mdt(t, tag2, this.Ahu, !0), this.mdt(t, forbidMoveTagId, this.ogu, !0))
  }
  m$e() {
    for (const t of this.ldt) t.EndTask();
    this.ldt.length = 0, this.Wst = void 0
  }
  mdt(t, e, i, s = !1) {
    s && t.HasTag(e) && i(e, !0);
    s = t.ListenForTagAddOrRemove(e, i);
    s && this.ldt.push(s)
  }
  OnTick(t) {
    for (const e of this.det) e.Tick(t)
  }
}
exports.RailSlideView = RailSlideView;
//# sourceMappingURL=RailSlideView.js.map