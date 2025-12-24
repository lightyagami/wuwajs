"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractSummonView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const PhantomInteractController_1 = require("../PhantomInteractController");
const PhantomInteractViewModel_1 = require("../PhantomInteractViewModel");
const PhantomInteractDetailPanel_1 = require("./PhantomInteractDetailPanel");
const PhantomInteractListPanel_1 = require("./PhantomInteractListPanel");
const POST_FX_PATH = "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Post_SimpleLight.DA_Fx_Group_Post_SimpleLight";
class PhantomInteractSummonView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.mgf = undefined;
    this.P5f = undefined;
    this.bgf = false;
    this.Rgf = new PhantomInteractViewModel_1.PhantomInteractDetailViewModel();
    this.rGi = undefined;
    this.Hea = undefined;
    this.NUf = undefined;
    this.aQf = 0;
    this.Vgt = () => {
      this.CloseMe();
    };
    this.pgf = t => {
      this.mgf.SetSelectedItem(t.ItemIndex);
      if (t.MonsterId > 0) {
        PhantomInteractController_1.PhantomInteractController.BeginVisionSkill(t.MonsterId);
        this.CloseMe();
      } else {
        PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionEditView(t.ItemIndex, true);
      }
    };
    this.hQf = (t, e) => {
      if (!!e && (!this.bgf || this.aQf !== t.MonsterId)) {
        e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.GridViewModelMap.get(t.MonsterId);
        this.mgf?.SetSelectedItem(t.ItemIndex);
        this.Rgf.RefreshData(e);
        this.P5f?.RefreshDetailPanel(true, this.Rgf);
        this.aQf = t.MonsterId;
        this.bgf = true;
      }
    };
    this.Tgf = (t, e) => {
      e = e && (t?.MonsterId ?? 0) > 0;
      if (e && !this.bgf) {
        t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.GridViewModelMap.get(t.MonsterId);
        this.Rgf.RefreshData(t);
        this.P5f?.RefreshDetailPanel(true, this.Rgf);
      } else {
        this.P5f?.RefreshDetailPanel(false);
      }
      this.bgf = e;
    };
    this.x4f = () => {
      if (this.bgf) {
        this.bgf = false;
        this.P5f?.RefreshDetailPanel(false);
        this.mgf?.SetSelectedItem(-1);
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, PhantomInteractSummonView.Lgf], [7, this.x4f]];
  }
  async OnBeforeStartAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 95, "PhantomVisionEditView OnBeforeStartAsync");
    }
    var t = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetCloseCallBack(this.Vgt);
    this.mgf = new PhantomInteractListPanel_1.PhantomInteractListPanel(Info_1.Info.IsInTouch());
    var e = this.GetItem(0);
    if (e) {
      e = this.mgf.CreateByActorAsync(e.GetOwner());
      t.push(e);
    }
    this.P5f = new PhantomInteractDetailPanel_1.PhantomInteractDetailPanelGroup();
    var e = this.P5f.CreateWithParent(this.GetItem(5));
    t.push(e);
    this.rGi = this.GetItem(6);
    t.push(this.cLf(POST_FX_PATH));
    await Promise.all(t);
    this.mgf.SetUiActive(true);
    this.mgf.OnClickCb = this.pgf;
    var e = Info_1.Info.IsInTouch() ? this.hQf : this.Tgf;
    this.mgf.OnHoverCb = e;
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async cLf(t) {
    const i = new CustomPromise_1.CustomPromise();
    var e = new UE.TransformDouble();
    var o = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (o) {
      e.SetLocation(o.GetComponent(1).ActorLocation);
    }
    this.NUf = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, t, "PhantomInteractSummonView_PreloadSceneEffect", undefined, 3, undefined, (t, e) => {
      if (t === 5) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PhantomInteraction", 95, "特效加载成功", ["result", t], ["handle", e]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("PhantomInteraction", 95, "[PhantomInteractSummonView.PreloadSceneEffect] 特效预加载失败", ["result", t], ["handle", e]);
      }
      i.SetResult();
    }, undefined, false);
    if (this.NUf === 0) {
      i.SetResult();
    }
    await i.Promise;
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
    if (this.NUf) {
      EffectSystem_1.EffectSystem.StopEffectById(this.NUf, "PhantomInteractSummonView_Destroy", true);
      this.NUf = undefined;
    }
  }
  OnStart() {
    var t = Info_1.Info.IsInTouch();
    this.GetItem(3).SetUIActive(t);
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    this.Refresh(t.InteractInfoData);
    this.P5f?.RefreshDetailPanel(false);
    this.mgf?.SetSelectedItem(-1);
    if (this.rGi) {
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomInteractEditEntry", this.rGi);
    }
    t.DisableAutoExposureOnViewOpen();
  }
  OnAfterHide() {
    if (this.rGi) {
      RedDotController_1.RedDotController.UnBindGivenUi("RedDotPhantomInteractEditEntry", this.rGi);
    }
  }
  OnAfterDestroy() {
    ModelManager_1.ModelManager.PhantomInteractModel?.ReEnableAutoExposureOnViewClose();
  }
  Refresh(t) {
    this.mgf.Refresh(t.EquippedVisionData, false, false);
  }
}
(exports.PhantomInteractSummonView = PhantomInteractSummonView).Lgf = () => {
  PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionEditView(0, true);
};
//# sourceMappingURL=PhantomInteractSummonView.js.map