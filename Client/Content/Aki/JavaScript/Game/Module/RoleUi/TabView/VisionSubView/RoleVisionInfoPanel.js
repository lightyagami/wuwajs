"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleVisionInfoPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const VisionDetailDescComponent_1 = require("../../../Phantom/Vision/View/VisionDetailDescComponent");
const AttrListScrollData_1 = require("../../View/ViewData/AttrListScrollData");
const RoleVisionAttribute_1 = require("./RoleVisionAttribute");
class RoleVisionInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.d1o = undefined;
    this.u9i = undefined;
    this.m9i = undefined;
    this.FCo = undefined;
    this.wqe = undefined;
    this.wCo = false;
    this.VCo = () => {
      const e = this.d1o.GetCurSelectRoleData();
      const t = [0, 0, 0, 0, 0];
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(144);
      i.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      i.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(e.GetRoleId(), t);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        UiManager_1.UiManager.CloseView("VisionRecommendView");
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.HCo = () => {
      var e = this.d1o.GetCurSelectRoleId();
      UiManager_1.UiManager.OpenView("VisionRecommendView", e);
    };
    this.D3e = () => {
      var e;
      var t = this.d1o.GetCurSelectRoleData();
      if (t) {
        e = [];
        e = ModelManager_1.ModelManager.PhantomBattleModel.GetExtraAttrList(t.GetDataId());
        UiManager_1.UiManager.OpenView("RoleAttributeDetailView", e);
      }
    };
    this.sOt = () => {
      this.FCo?.();
    };
    this.WCo = () => {
      this.Hqe();
    };
    this.wqe = e;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.D3e], [3, this.sOt], [4, this.VCo], [5, this.HCo]];
  }
  async OnBeforeStartAsync() {
    this.m9i = new VisionDetailDescComponent_1.VisionDetailDescComponent(this.GetItem(2));
    await this.m9i.Init();
  }
  OnStart() {
    this.m9i.SetActive(true);
    this.u9i = new RoleVisionAttribute_1.RoleVisionAttribute(this.GetItem(0));
    this.u9i.Init();
    this.AddEventListener();
  }
  K8e() {
    var e;
    if (!this.wCo) {
      this.wCo = true;
      e = this.d1o.GetCurSelectRoleId();
      RedDotController_1.RedDotController.BindRedDot("VisionOneKeyEquip", this.GetItem(6), undefined, e);
    }
  }
  Ovt() {
    if (this.wCo) {
      this.wCo = false;
      RedDotController_1.RedDotController.UnBindGivenUi("VisionOneKeyEquip", this.GetItem(6));
    }
  }
  GetTxtItemByIndex(e) {
    return this.m9i?.GetTxtItemByIndex(e);
  }
  SetConfirmButtonCall(e) {
    this.FCo = e;
  }
  RefreshButtonShowState() {
    var e = this.d1o.GetCurSelectRoleData().IsTrialRole();
    this.RefreshConfirmButtonState(!e);
    this.RefreshOneKeyButtonState(!e);
  }
  RefreshConfirmButtonState(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  RefreshOneKeyButtonState(e) {
    this.GetButton(5).RootUIComp.SetUIActive(e);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomEquip, this.WCo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomEquip, this.WCo);
  }
  RefreshView(e) {
    this.d1o = e;
    this.Hqe();
  }
  Hqe() {
    this.fvt();
    this.KCo();
    this.QCo();
    this.RefreshButtonShowState();
    this.Ovt();
    this.K8e();
  }
  fvt() {
    let i;
    var e = this.d1o.GetCurSelectRoleData();
    const n = (i = ModelManager_1.ModelManager.PhantomBattleModel.GetShowAttrList(e.GetDataId())).length;
    e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewShowAttribute");
    const o = [];
    let r = false;
    e.forEach(t => {
      var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(t);
      r = false;
      for (let e = 0; e < n; e++) {
        if (i[e].Id === t) {
          o.push(i[e]);
          r = true;
          break;
        }
      }
      if (!r) {
        o.push(new AttrListScrollData_1.AttrListScrollData(t, 0, 0, e.Priority, false, 1));
      }
    });
    this.u9i.Refresh(o, true);
  }
  KCo() {
    var e = this.d1o.GetCurSelectRoleData();
    var t = e.GetPhantomData().GetDataByIndex(0);
    const i = new Array();
    if (t) {
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(t.GetNormalSkillConfig(), t.GetPhantomLevel(), true, false, t.GetQuality()).forEach(e => {
        i.push(e);
      });
    } else {
      VisionDetailDescComponent_1.VisionDetailDesc.CreateEmptySkillDescData().forEach(e => {
        i.push(e);
      });
    }
    t = e.GetPhantomData().GetPhantomFettersData();
    if (t.length === 0) {
      VisionDetailDescComponent_1.VisionDetailDesc.CreateEmptyFetterDescData().forEach(e => {
        i.push(e);
      });
    } else {
      VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(t, false).forEach(e => {
        i.push(e);
      });
    }
    i.forEach(e => {
      e.DoNotNeedCheckSimplyState = true;
    });
    this.m9i.Refresh(i);
  }
  QCo() {
    var e = this.d1o.GetCurSelectRoleData();
    if (e.IsTrialRole()) {
      this.RefreshOneKeyButtonState(false);
      this.GetButton(4).RootUIComp.SetUIActive(false);
    } else {
      e = e.GetPhantomData().GetDataMap();
      let i = 0;
      e.forEach((e, t) => {
        if (e) {
          i++;
        }
      });
      this.GetButton(4).RootUIComp.SetUIActive(i >= 1);
    }
  }
  OnBeforeDestroy() {
    this.Ovt();
    this.RemoveEventListener();
  }
}
exports.RoleVisionInfoPanel = RoleVisionInfoPanel;
//# sourceMappingURL=RoleVisionInfoPanel.js.map