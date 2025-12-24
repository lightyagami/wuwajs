"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XiaKongQteView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const XiaKongQteBar_1 = require("./XiaKongQteBar");
const XiaKongQteSkillItem_1 = require("./XiaKongQteSkillItem");
const XIA_KONG_ROLE_ID = 1407;
const inputTypeList = [1, 2];
class XiaKongQteView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.det = [];
    this.Vwc = undefined;
    this.VY1 = [];
    this.Wst = undefined;
    this.hBa = undefined;
    this.Lrt = false;
    this.bU1 = false;
    this.Kco = () => {
      this.Hwc();
    };
    this.Etl = (t, i) => {
      for (const e of this.det) {
        e.RefreshOnInputControllerMainTypeChange();
      }
      this.Vwc?.RefreshOnInputControllerMainTypeChange();
    };
    this.Dwc = (t, i, e) => {
      if (i === 1407 && !e) {
        this.CloseMe();
      }
    };
    this.bMe = (t, i) => {
      i = i === 0;
      if (i && this.hBa) {
        switch (t) {
          case InputMappingsDefine_1.actionMappings.向左移动:
            this.hBa.SetInputType(2);
            break;
          case InputMappingsDefine_1.actionMappings.向右移动:
            this.hBa.SetInputType(1);
            break;
          case InputMappingsDefine_1.actionMappings.大招:
            this.hBa.SetInputType(4);
        }
      }
    };
    this.f1c = t => {
      if (this.hBa) {
        this.hBa.SetInputType(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await this.fet(1);
    await this.fet(4);
    await this.cw1();
    await this.$wc(0);
    await this.$wc(3);
  }
  async $wc(t) {
    var t = this.GetItem(t).GetOwner();
    var i = new XiaKongQteBar_1.XiaKongQteBar();
    await i.CreateThenShowByActorAsync(t);
    this.VY1.push(i);
  }
  async fet(t) {
    var t = this.GetItem(t).GetOwner();
    var i = new XiaKongQteSkillItem_1.XiaKongQteSkillItem();
    await i.NewByRootActorAsync(t);
    await i.ShowAsync();
    this.det.push(i);
  }
  async cw1() {
    var t = this.GetItem(2).GetOwner();
    var i = new XiaKongQteSkillItem_1.XiaKongQteSkillItem();
    await i.NewByRootActorAsync(t);
    await i.ShowAsync();
    this.Vwc = i;
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Kco);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    for (let t = 0; t < this.det.length; t++) {
      this.VY1[t].Init(this.det[t]);
      this.det[t].SetPressCallback(this.f1c);
      this.det[t].RefreshType(inputTypeList[t]);
    }
    this.Hwc();
    if (this.Vwc) {
      this.Vwc.SetPressCallback(this.f1c);
      this.Vwc.RefreshType(4);
      this.Vwc.SetSkillIconName("SkillButton_1407200_Name");
    }
    this.RootItem?.SetAlpha(0);
    this.bU1 = false;
  }
  Hwc() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    if (t?.RoleConfig?.Id !== XIA_KONG_ROLE_ID) {
      this.Wst = undefined;
      this.hBa = undefined;
      for (const i of this.VY1) {
        i.Refresh(undefined);
      }
      this.CloseMe();
    } else {
      this.Wst = t;
      t = this.Wst.EntityHandle?.Entity?.GetComponent(278);
      this.hBa = t?.SpecialSkill;
      if (this.hBa.GetIsUltraSkillState()) {
        this.ehr(true);
        for (const e of this.VY1) {
          e.Refresh(this.hBa);
        }
      } else {
        this.CloseMe();
      }
    }
  }
  ehr(t) {
    if (this.Lrt !== t && (this.Lrt = t, this.SetActive(t), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(12, [9, 10, 17], !t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 17, "夏空QTE界面可见性改变", ["visible", t]);
    }
  }
  OnAddEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动, InputMappingsDefine_1.actionMappings.大招], this.bMe);
  }
  OnRemoveEventListener() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.向左移动, InputMappingsDefine_1.actionMappings.向右移动, InputMappingsDefine_1.actionMappings.大招], this.bMe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.Kco);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.Etl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    for (const t of this.VY1) {
      t.Destroy();
    }
    this.VY1.length = 0;
    for (const i of this.det) {
      i.Destroy();
    }
    this.det.length = 0;
    if (this.Vwc) {
      this.Vwc.Destroy();
      this.Vwc = undefined;
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildrenVisible(12, [9, 10, 17], true);
  }
  OnTick(t) {
    for (const i of this.VY1) {
      i.Tick(t);
    }
    for (const e of this.det) {
      e.Tick(t);
    }
    this.Vwc?.Tick(t);
    if (!this.bU1) {
      if (this.hBa && this.hBa.GetNextGenCircleIndex() > 0 && this.hBa.GetNextEndCircleAttrValue() / this.hBa.GetMinAttrValue() >= 0.3) {
        this.RootItem?.SetAlpha(1);
        this.PlaySequence("Start01");
        this.bU1 = true;
      }
    }
  }
}
exports.XiaKongQteView = XiaKongQteView;
//# sourceMappingURL=XiaKongQteView.js.map