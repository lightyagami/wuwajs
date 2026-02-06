"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeTabView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../../Common/TabComponent/TabComponent");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeComNodeItem_1 = require("../Item/MotorcycleTechTreeComNodeItem");
const MotorcycleTechTreeFirstNodeItem_1 = require("../Item/MotorcycleTechTreeFirstNodeItem");
const MotorcycleTechTreeNodeListItem_1 = require("../Item/MotorcycleTechTreeNodeListItem");
const MotorcycleTreeTypeTabItem_1 = require("../TabItem/MotorcycleTreeTypeTabItem");
const MotorcycleTechTreeInfoPanel_1 = require("./MotorcycleTechTreeInfoPanel");
const MotorcycleUiModelUtil_1 = require("../../Model/MotorcycleUiModelUtil");
class MotorcycleTechTreeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.Nmf = undefined;
    this.Vmf = undefined;
    this.Hmf = undefined;
    this.jmf = undefined;
    this.ja_ = undefined;
    this.$mf = [];
    this.LSc = undefined;
    this.ebl = undefined;
    this.Wmf = undefined;
    this.Fmf = 0;
    this.Zwg = true;
    this.AXf = false;
    this.Qmf = e => {
      this.Xmf();
      if (e) {
        this.Ajd(false);
      } else {
        this.ePg();
        this.Kmf();
      }
    };
    this.Omf = () => {
      var e = new MotorcycleTechTreeNodeListItem_1.MotorcycleTechTreeNodeListItem();
      e.OnAfterRefreshOneNode = this.gVd;
      return e;
    };
    this.qmf = (e, t) => new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItem();
    this.gVd = e => {
      if (e) {
        e.OnClickToggleBack = this.Djd;
        this.$mf.push(e);
      }
    };
    this.Djd = (e, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      this.ebl.SetToggleState(1);
      this.Wmf = e;
      new UiAsyncTask_1.UiAsyncTask("UpdateNodeInfoPanel", async () => {
        await this.LSc.RefreshAsync(e);
        if (this.AXf) {
          this.LSc.PlayChangeTween();
        }
      }).Run();
    };
    this.pqe = e => {
      if (!this.Zwg) {
        this.sJf(e);
      }
    };
    this.zmf = () => {
      if (this.kAg) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorBike_TechTree_ChangeFail_Time");
      } else if (!this.BAg) {
        ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorTechTreeSwitch(this.Fmf, () => {
          var e = CommonParamById_1.configCommonParamById.GetIntConfig("SwitchMotorTechTreeCD");
          if (e) {
            ModelManager_1.ModelManager.MotorcycleDevelopModel.StartSwitchTechTreeLockTimer(e);
          }
        });
      }
    };
  }
  get kAg() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.IsSwitchTechTreeTimeLocked();
  }
  get BAg() {
    return ModelManager_1.ModelManager.MotorcycleDevelopModel.IsSwitchTechTreePlayerLocked();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem]];
    this.BtnBindInfo = [[8, this.zmf]];
  }
  async OnBeforeStartAsync() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetHorizontalLayout(10).RootUIComp, this.qmf, this.pqe, this.GetItem(11));
    this.Nmf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.Omf);
    this.Vmf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.Hmf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.jmf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.ja_ = new MotorcycleTechTreeFirstNodeItem_1.MotorcycleTechTreeFirstNodeItem();
    this.LSc = new MotorcycleTechTreeInfoPanel_1.MotorcycleTechTreeInfoPanel();
    var e = [this.Vmf.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.Hmf.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.jmf.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.ja_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.LSc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    await Promise.all(e);
    this.Vmf.OnClickToggleBack = this.Djd;
    this.Hmf.OnClickToggleBack = this.Djd;
    this.jmf.OnClickToggleBack = this.Djd;
    this.ja_.OnClickToggleBack = this.Djd;
  }
  OnBeforeShow() {
    this.Fmf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetSelectedTreeType();
    if (this.Fmf === 0) {
      this.Fmf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    }
    this.kmf();
    MotorcycleUiModelUtil_1.MotorcycleUiModelUtil.ShowMotorLoadingIcon(false);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, this.Qmf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, this.Qmf);
  }
  OnBeforeHide() {
    this.AXf = false;
  }
  async Ajd(e) {
    var t = [];
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.ja_.Node.NodeId);
    t.push(this.ja_.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.Vmf.Node.NodeId);
    t.push(this.Vmf.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.Hmf.Node.NodeId);
    t.push(this.Hmf.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.jmf.Node.NodeId);
    t.push(this.jmf.RefreshNodeAsyncByData(i));
    await Promise.all(t);
    for (const r of this.$mf) {
      i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(r.Node.NodeId);
      r.RefreshNodeData(i);
      if (e) {
        r.PlayNodeSequence();
      }
    }
    await this.LSc.RefreshAsync(this.Wmf);
  }
  async ePg() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    const r = [];
    e.forEach(e => {
      var t = new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItemData();
      var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() === e;
      t.IsFinish = i;
      t.TreeType = e;
      r.push(t);
    });
    await this.Ivt.RefreshTabItemAsync(r, false);
  }
  async kmf() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    const r = [];
    i.forEach(e => {
      var t = new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItemData();
      var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() === e;
      t.IsFinish = i;
      t.TreeType = e;
      r.push(t);
    });
    await this.Ivt.RefreshTabItemAsync(r);
    for ([e, t] of this.Ivt.GetTabItemMap()) {
      t.BindRedDot("MotorcycleTreeTypeTechTab", r[e].TreeType);
      t.BindNewRedDot("MotorcycleTreeTypeTechTabNew", r[e].TreeType);
    }
    let o = 0;
    for (let e = 0; e < r.length; e++) {
      if (r[e].TreeType === this.Fmf) {
        o = e;
        break;
      }
    }
    this.Ivt.SelectToggleByIndex(o, true);
    if (this.Zwg) {
      await this.sJf(o);
    }
  }
  async sJf(e) {
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    this.Fmf = t[e];
    this.$mf = [];
    this.Kmf();
    this.Xmf();
    await this.Ymf();
    this.Zwg = false;
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(this.Fmf);
    if (t) {
      ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechTreeNewUnlocked(this.Fmf, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate);
    }
  }
  Kmf() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() === this.Fmf;
    this.GetItem(7).SetUIActive(!e);
    this.GetItem(9).SetUIActive(e);
  }
  Xmf() {
    var e;
    if (ModelManager_1.ModelManager.MotorcycleDevelopModel.IsAllNodeMaxLevel(this.Fmf)) {
      e = {
        Currency: []
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopRootUpdate, e);
    } else {
      ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateSelectedTreeType(this.Fmf);
      if (e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.Fmf)) {
        e = {
          Currency: [e.TpItemId]
        };
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopRootUpdate, e);
      }
    }
  }
  async Ymf() {
    var e = [];
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCommonTechNodeIdList(this.Fmf);
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[0])) {
      e.push(this.Vmf.RefreshNodeAsyncByData(i));
    }
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[1])) {
      e.push(this.jmf.RefreshNodeAsyncByData(i));
    }
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[2])) {
      e.push(this.Hmf.RefreshNodeAsyncByData(i));
    }
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.FindTechNodeIdByCoord([0, 0], this.Fmf);
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t);
    e.push(this.ja_.RefreshNodeAsyncByData(i));
    await Promise.all(e);
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetExclusiveNodeParamList(this.Fmf);
    await this.Nmf.RefreshByDataAsync(t);
    this.ja_.SelectNode();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    var e = t[0];
    if (e === "ComNode") {
      let e = undefined;
      switch (Number(t[1])) {
        case 0:
          e = this.Vmf;
          break;
        case 1:
          e = this.Hmf;
          break;
        case 2:
          e = this.jmf;
      }
      if (e) {
        if (i = e.GetRootItem()) {
          return [i, i];
        } else {
          return undefined;
        }
      }
    }
    if (e === "moto_skill_tab") {
      i = Number(t[1]);
      if (e = this.Ivt?.GetTabItemByIndex(i)?.GetRootItem()) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.MotorcycleTechTreeTabView = MotorcycleTechTreeTabView;
//# sourceMappingURL=MotorcycleTechTreeTabView.js.map