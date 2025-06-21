"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.XiaKongQteView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  XiaKongQteBar_1 = require("./XiaKongQteBar"),
  XiaKongQteSkillItem_1 = require("./XiaKongQteSkillItem"),
  XIA_KONG_ROLE_ID = 1407,
  inputTypeList = [1, 2];
class XiaKongQteView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.det = [], this.Vwc = void 0, this.EX1 = [], this.Wst = void 0, this.hBa = void 0, this.Lrt = !1, this.zD1 = !1, this.Kco = () => {
      this.Hwc()
    }, this.Etl = (t, i) => {
      for (const e of this.det) e.RefreshOnInputControllerMainTypeChange();
      this.Vwc?.RefreshOnInputControllerMainTypeChange()
    }, this.Dwc = (t, i, e) => {
      1407 !== i || e || this.CloseMe()
    }, this.bMe = (t, i) => {
      i = 0 === i;
      if (i && this.hBa) switch (t) {
        case InputMappingsDefine_1.actionMappings.向左移动:
          this.hBa.SetInputType(2);
          break;
        case InputMappingsDefine_1.actionMappings.向右移动:
          this.hBa.SetInputType(1);
          break;
        case InputMappingsDefine_1.actionMappings.大招:
          this.hBa.SetInputType(4)
      }
    }, this.f1c = t => {
      this.hBa && this.hBa.SetInputType(t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    await this.fet(1), await this.fet(4), await this.FL1(), await this.$wc(0), await this.$wc(3)
  }
  async $wc(t) {
    var t = this.GetItem(t).GetOwner(),
      i = new XiaKongQteBar_1.XiaKongQteBar;
    await i.CreateThenShowByActorAsync(t), this.EX1.push(i)
  }
  async fet(t) {
    var t = this.GetItem(t).GetOwner(),
      i = new XiaKongQteSkillItem_1.XiaKongQteSkillItem;
    await i.NewByRootActorAsync(t), await i.ShowAsync(), this.det.push(i)
  }
  async FL1() {
    var t = this.GetItem(2).GetOwner(),
      i = new XiaKongQteSkillItem_1.XiaKongQteSkillItem;
    await i.NewByRootActorAsync(t), await i.ShowAsync(), this.Vwc = i
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Kco), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    for (let t = 0; t < this.det.length; t++) this.EX1[t].Init(this.det[t]), this.det[t].SetPressCallback(this.f1c), this.det[t].RefreshType(inputTypeList[t]);
    this.Hwc(), this.Vwc && (this.Vwc.SetPressCallback(this.f1c), this.Vwc.RefreshType(4), this.Vwc.SetSkillIconName("SkillButton_1407200_Name")), this.RootItem?.SetAlpha(0), this.zD1 = !1
  }
  Hwc() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t?.RoleConfig?.Id !== XIA_KONG_ROLE_ID) {
      this.Wst = void 0, this.hBa = void 0;
      for (const i of this.EX1) i.Refresh(void 0);
      this.CloseMe()
    } else {
      this.Wst = t;
      t = this.Wst.EntityHandle?.Entity?.GetComponent(252);
      if (this.hBa = t?.SpecialSkill, this.hBa.GetIsUltraSkillState()) {
        this.ehr(!0);
        for (const e of this.EX1) e.Refresh(this.hBa)
      } else this.CloseMe()
    }
  }
  ehr(t) {
    this.Lrt !== t && (this.Lrt = t, this.SetActive(t), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(12, [9, 10, 17], !t), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Battle", 17, "夏空QTE界面可见性改变", ["visible", t])
  }
  OnAddEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动, InputMappingsDefine_1.actionMappings.大招], this.bMe)
  }
  OnRemoveEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动, InputMappingsDefine_1.actionMappings.大招], this.bMe)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Kco), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    for (const t of this.EX1) t.Destroy();
    this.EX1.length = 0;
    for (const i of this.det) i.Destroy();
    this.det.length = 0, this.Vwc && (this.Vwc.Destroy(), this.Vwc = void 0), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(12, [9, 10, 17], !0)
  }
  OnTick(t) {
    for (const i of this.EX1) i.Tick(t);
    for (const e of this.det) e.Tick(t);
    this.Vwc?.Tick(t), this.zD1 || this.hBa && 0 < this.hBa.GetNextGenCircleIndex() && .3 <= this.hBa.GetNextEndCircleAttrValue() / this.hBa.GetMinAttrValue() && (this.RootItem?.SetAlpha(1), this.PlaySequence("Start01"), this.zD1 = !0)
  }
}
exports.XiaKongQteView = XiaKongQteView;
//# sourceMappingURL=XiaKongQteView.js.map