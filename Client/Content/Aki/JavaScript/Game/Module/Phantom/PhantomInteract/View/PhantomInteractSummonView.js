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
    this.ZSf = undefined;
    this._Qf = undefined;
    this.uMf = false;
    this.cMf = new PhantomInteractViewModel_1.PhantomInteractDetailViewModel();
    this.rGi = undefined;
    this.Hea = undefined;
    this.MGf = undefined;
    this.Rsg = 0;
    this.Vgt = () => {
      this.CloseMe();
    };
    this.rMf = t => {
      this.ZSf.SetSelectedItem(t.ItemIndex);
      if (t.MonsterId > 0) {
        PhantomInteractController_1.PhantomInteractController.BeginVisionSkill(t.MonsterId);
        this.CloseMe();
      } else {
        PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionEditView(t.ItemIndex, true);
      }
    };
    this.Lsg = (t, e) => {
      if (!!e && (!this.uMf || this.Rsg !== t.MonsterId)) {
        e = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.GridViewModelMap.get(t.MonsterId);
        this.ZSf?.SetSelectedItem(t.ItemIndex);
        this.cMf.RefreshData(e);
        this._Qf?.RefreshDetailPanel(true, this.cMf);
        this.Rsg = t.MonsterId;
        this.uMf = true;
      }
    };
    this._Mf = (t, e) => {
      e = e && (t?.MonsterId ?? 0) > 0;
      if (e && !this.uMf) {
        t = ModelManager_1.ModelManager.PhantomInteractModel.EditViewModel.GridViewModelMap.get(t.MonsterId);
        this.cMf.RefreshData(t);
        this._Qf?.RefreshDetailPanel(true, this.cMf);
      } else {
        this._Qf?.RefreshDetailPanel(false);
      }
      this.uMf = e;
    };
    this.aWf = () => {
      if (this.uMf) {
        this.uMf = false;
        this._Qf?.RefreshDetailPanel(false);
        this.ZSf?.SetSelectedItem(-1);
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, PhantomInteractSummonView.mMf], [7, this.aWf]];
  }
  async OnBeforeStartAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 95, "PhantomVisionEditView OnBeforeStartAsync");
    }
    var t = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetCloseCallBack(this.Vgt);
    this.ZSf = new PhantomInteractListPanel_1.PhantomInteractListPanel(Info_1.Info.IsInTouch());
    var e = this.GetItem(0);
    if (e) {
      e = this.ZSf.CreateByActorAsync(e.GetOwner());
      t.push(e);
    }
    this._Qf = new PhantomInteractDetailPanel_1.PhantomInteractDetailPanelGroup();
    var e = this._Qf.CreateWithParent(this.GetItem(5));
    t.push(e);
    this.rGi = this.GetItem(6);
    t.push(this.EBf(POST_FX_PATH));
    await Promise.all(t);
    this.ZSf.SetUiActive(true);
    this.ZSf.OnClickCb = this.rMf;
    var e = Info_1.Info.IsInTouch() ? this.Lsg : this._Mf;
    this.ZSf.OnHoverCb = e;
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async EBf(t) {
    const o = new CustomPromise_1.CustomPromise();
    var e = new UE.TransformDouble();
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity;
    if (i) {
      e.SetLocation(i.GetComponent(1).ActorLocation);
    }
    this.MGf = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, t, "PhantomInteractSummonView_PreloadSceneEffect", undefined, 3, undefined, (t, e) => {
      if (t === 5) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PhantomInteraction", 95, "特效加载成功", ["result", t], ["handle", e]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("PhantomInteraction", 95, "[PhantomInteractSummonView.PreloadSceneEffect] 特效预加载失败", ["result", t], ["handle", e]);
      }
      o.SetResult();
    }, undefined, false);
    if (this.MGf === 0) {
      o.SetResult();
    }
    await o.Promise;
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
    this.Hea = undefined;
    if (this.MGf) {
      EffectSystem_1.EffectSystem.StopEffectById(this.MGf, "PhantomInteractSummonView_Destroy", true);
      this.MGf = undefined;
    }
  }
  OnStart() {
    var t = Info_1.Info.IsInTouch();
    this.GetItem(3).SetUIActive(t);
    ModelManager_1.ModelManager.PhantomInteractModel.DisableAutoExposureOnViewOpen();
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.PhantomInteractModel;
    this.Refresh(t.InteractInfoData);
    this._Qf?.RefreshDetailPanel(false);
    this.ZSf?.SetSelectedItem(-1);
    if (this.rGi) {
      RedDotController_1.RedDotController.BindRedDot("RedDotPhantomInteractEditEntry", this.rGi);
    }
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
    this.ZSf.Refresh(t.EquippedVisionData, false, false);
  }
}
(exports.PhantomInteractSummonView = PhantomInteractSummonView).mMf = () => {
  PhantomInteractController_1.PhantomInteractController.OpenPhantomVisionEditView(0, true);
};
//# sourceMappingURL=PhantomInteractSummonView.js.map