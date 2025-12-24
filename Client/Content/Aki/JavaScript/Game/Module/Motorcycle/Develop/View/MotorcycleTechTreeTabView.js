"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeTabView = undefined;
const UE = require("ue");
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
class MotorcycleTechTreeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.jcf = undefined;
    this.$cf = undefined;
    this.Wcf = undefined;
    this.Qcf = undefined;
    this.ja_ = undefined;
    this.Kcf = [];
    this.LSc = undefined;
    this.ebl = undefined;
    this.Xcf = undefined;
    this.Hcf = 0;
    this.V6f = false;
    this.Ycf = () => {
      this.Ajd(false);
      this.zcf();
    };
    this.Ncf = () => {
      var e = new MotorcycleTechTreeNodeListItem_1.MotorcycleTechTreeNodeListItem();
      e.OnAfterRefreshOneNode = this.gVd;
      return e;
    };
    this.Fcf = (e, t) => new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItem();
    this.gVd = e => {
      if (e) {
        e.OnClickToggleBack = this.Djd;
        this.Kcf.push(e);
      }
    };
    this.Djd = (e, t) => {
      if (this.ebl) {
        this.ebl.SetToggleState(0);
      }
      this.ebl = t;
      this.ebl.SetToggleState(1);
      this.Xcf = e;
      new UiAsyncTask_1.UiAsyncTask("UpdateNodeInfoPanel", async () => {
        await this.LSc.RefreshAsync(e);
        if (!this.UiViewSequence.HasSequenceNameInPlaying("Start")) {
          this.LSc.PlayChangeTween();
        }
      }).Run();
    };
    this.pqe = e => {
      this.H6f(e);
    };
    this.edf = () => {
      ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.RequestMotorTechTreeSwitch(this.Hcf);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIItem]];
    this.BtnBindInfo = [[8, this.edf]];
  }
  async OnBeforeStartAsync() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetHorizontalLayout(10).RootUIComp, this.Fcf, this.pqe, this.GetItem(11));
    this.jcf = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.Ncf);
    this.$cf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.Wcf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.Qcf = new MotorcycleTechTreeComNodeItem_1.MotorcycleTechTreeComNodeItem();
    this.ja_ = new MotorcycleTechTreeFirstNodeItem_1.MotorcycleTechTreeFirstNodeItem();
    this.LSc = new MotorcycleTechTreeInfoPanel_1.MotorcycleTechTreeInfoPanel();
    var e = [this.$cf.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.Wcf.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Qcf.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.ja_.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.LSc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())];
    this.Hcf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    await Promise.all(e);
    this.$cf.OnClickToggleBack = this.Djd;
    this.Wcf.OnClickToggleBack = this.Djd;
    this.Qcf.OnClickToggleBack = this.Djd;
    this.ja_.OnClickToggleBack = this.Djd;
    await this.Gcf();
  }
  OnBeforeShow() {
    if (this.Hcf === 0) {
      this.Hcf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    }
    if (this.V6f) {
      this.Ajd(true);
      this.zcf();
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, this.Ycf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, this.Ycf);
  }
  OnBeforeHide() {
    this.V6f = true;
  }
  async Ajd(e) {
    var t = [];
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.ja_.Node.NodeId);
    t.push(this.ja_.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.$cf.Node.NodeId);
    t.push(this.$cf.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.Wcf.Node.NodeId);
    t.push(this.Wcf.RefreshNodeAsyncByData(i));
    i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(this.Qcf.Node.NodeId);
    t.push(this.Qcf.RefreshNodeAsyncByData(i));
    await Promise.all(t);
    for (const s of this.Kcf) {
      i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(s.Node.NodeId);
      s.RefreshNodeData(i, e);
    }
    await this.LSc.RefreshAsync(this.Xcf);
  }
  async Gcf() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    const s = [];
    i.forEach(e => {
      var t = new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItemData();
      var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() === e;
      t.IsFinish = i;
      t.TreeType = e;
      s.push(t);
    });
    await this.Ivt.RefreshTabItemAsync(s);
    for ([e, t] of this.Ivt.GetTabItemMap()) {
      t.BindRedDot("MotorcycleTreeTypeTechTab", s[e].TreeType);
    }
    let r = 0;
    for (let e = 0; e < s.length; e++) {
      if (s[e].TreeType === this.Hcf) {
        r = e;
        break;
      }
    }
    this.Ivt.SelectToggleByIndex(r, true, false);
    await this.H6f(r);
  }
  async H6f(e) {
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    this.Hcf = t[e];
    this.Kcf = [];
    this.Jcf();
    this.zcf();
    await this.Zcf();
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(this.Hcf);
    if (t) {
      ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechTreeNewUnlocked(this.Hcf, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate);
    }
  }
  zcf() {
    var e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() === this.Hcf;
    this.GetItem(7).SetUIActive(!e);
    this.GetItem(9).SetUIActive(e);
  }
  Jcf() {
    var e;
    if (ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType() !== this.Hcf && (ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateSelectedTreeType(this.Hcf), e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.Hcf))) {
      e = {
        Currency: [e.TpItemId]
      };
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopRootUpdate, e);
    }
  }
  async Zcf() {
    var e = [];
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCommonTechNodeIdList(this.Hcf);
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[0])) {
      e.push(this.$cf.RefreshNodeAsyncByData(i));
    }
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[1])) {
      e.push(this.Qcf.RefreshNodeAsyncByData(i));
    }
    if (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t[2])) {
      e.push(this.Wcf.RefreshNodeAsyncByData(i));
    }
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.FindTechNodeIdByCoord([0, 0], this.Hcf);
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(t);
    e.push(this.ja_.RefreshNodeAsyncByData(i));
    await Promise.all(e);
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetExclusiveNodeParamList(this.Hcf);
    await this.jcf.RefreshByDataAsync(t);
    this.ja_.SelectNode();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t[0] === "ComNode") {
      let e = undefined;
      switch (Number(t[1])) {
        case 0:
          e = this.$cf;
          break;
        case 1:
          e = this.Wcf;
          break;
        case 2:
          e = this.Qcf;
      }
      if (e) {
        if (t = e.GetRootItem()) {
          return [t, t];
        } else {
          return undefined;
        }
      }
    }
  }
}
exports.MotorcycleTechTreeTabView = MotorcycleTechTreeTabView;
//# sourceMappingURL=MotorcycleTechTreeTabView.js.map