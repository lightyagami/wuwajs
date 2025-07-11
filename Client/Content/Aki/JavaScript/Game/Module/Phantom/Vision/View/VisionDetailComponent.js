"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDetailComponent = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const VisionDetailDescComponent_1 = require("./VisionDetailDescComponent");
const VisionDetailInfoComponent_1 = require("./VisionDetailInfoComponent");
const VisionDetailUnderComponent_1 = require("./VisionDetailUnderComponent");
class VisionDetailComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.H8i = false;
    this.dFe = 0;
    this.i6 = 0;
    this.j8i = undefined;
    this.wqe = undefined;
    this.W8i = undefined;
    this.K8i = undefined;
    this.OnClickMainItem = () => {};
    this.wqe = t;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.K8i = new VisionDetailInfoComponent_1.VisionDetailInfoComponent(this.GetItem(1));
    await this.K8i.Init();
  }
  OnStart() {
    this.W8i = new VisionDetailUnderComponent_1.VisionDetailUnderComponent(this.GetItem(0));
    this.K8i.SetClickCallBack(this.OnClickMainItem);
  }
  GetTxtItemByIndex(t) {
    return this.K8i?.GetTxtItemByIndex(t);
  }
  SetUnderLeftButtonText(t) {
    this.W8i.RefreshLeftButtonText(t);
  }
  Update(t, e, i, s = false) {
    this.j8i = t;
    this.dFe = e;
    this.i6 = i;
    this.H8i = s;
    this.Q8i();
    this.W8i.Update(t);
  }
  Q8i() {
    var t = this.H8i ? 1 : 0;
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(t);
    const e = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
    e.DataBase = this.j8i;
    e.RoleId = this.dFe;
    e.Cost = this.i6;
    let i = -1;
    if (!this.H8i) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex;
    }
    var s = this.j8i.GetPreviewShowFetterList(i, this.dFe);
    var n = this.j8i.IfEquipSameNameMonsterOnRole(i, this.dFe);
    var o = this.j8i.IfEquipOverNeedOnRole(s);
    let a = false;
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.dFe).GetPhantomData().GetDataByIndex(0);
    if (!r || r?.GetIncrId() !== this.j8i.GetUniqueId()) {
      a = true;
    }
    VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(this.j8i.GetNormalSkillConfig(), this.j8i.GetPhantomLevel(), i === 0 || i === -1, a, this.j8i.GetQuality()).forEach(t => {
      e.AddDescData(t);
    });
    VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(s, n, o, () => {
      ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(this.j8i.GetFetterGroupId(), this.dFe);
    }).forEach(t => {
      e.AddDescData(t);
    });
    if (this.H8i) {
      e.DescData?.forEach(t => {
        t.AnimationState = false;
        t.CompareState = this.H8i;
      });
    }
    if (n) {
      VisionDetailDescComponent_1.VisionDetailDesc.CreateSameMonsterTips().forEach(t => {
        e.AddDescData(t);
      });
    }
    if (o) {
      VisionDetailDescComponent_1.VisionDetailDesc.CreateOverNeedTips().forEach(t => {
        e.AddDescData(t);
      });
    }
    this.K8i.Refresh(e, this.H8i, t);
    this.K8i.SetActive(true);
  }
  SetButtonPanelShowState(t) {
    this.W8i.SetActive(t);
  }
  RefreshViewByCompareState(t) {
    this.W8i.RefreshViewByCompareState(t);
  }
  GetDetailUnderComponent() {
    return this.W8i;
  }
}
exports.VisionDetailComponent = VisionDetailComponent;
//# sourceMappingURL=VisionDetailComponent.js.map