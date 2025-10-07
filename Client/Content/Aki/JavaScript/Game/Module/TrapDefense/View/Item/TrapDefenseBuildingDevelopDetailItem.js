"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingUpgradeItem = exports.TrapDefenseBuildingDevelopDetailInfoItem = exports.TrapDefenseBuildingDevelopDetailItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const MediaPlayer_1 = require("../../../Common/MediaPlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseBuildingDevelopDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.IsInDungeon = e;
    this.ParentView = t;
    this.InfoItem = undefined;
    this.BtnUpgrade = undefined;
    this.BtnSelect = undefined;
    this.CurData = undefined;
    this.CanLevelUp = true;
    this.gXu = () => {
      var e = {
        IsInDungeon: this.IsInDungeon,
        Data: this.CurData
      };
      UiManager_1.UiManager.OpenView("TrapDefenseBuildingDevelopBranchSelectView", e);
    };
    this.CXu = () => {
      var e = {
        IsInDungeon: this.IsInDungeon,
        Data: this.CurData
      };
      UiManager_1.UiManager.OpenView("TrapDefenseBuildingDevelopPreviewView", e, (e, t) => {
        this.ParentView.AddChildViewById(t);
      });
    };
    this.pXu = () => {
      if (this.CurData) {
        if (this.CanLevelUp) {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseDevelopLevelUp(this.CurData.Id);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Develop_NoEnoughGold");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.CXu]];
  }
  async OnBeforeStartAsync() {
    this.InfoItem = new TrapDefenseBuildingDevelopDetailInfoItem(!this.IsInDungeon);
    await this.InfoItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.BtnUpgrade = new TrapDefenseBuildingUpgradeItem();
    await this.BtnUpgrade.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.BtnUpgrade.OnClickCb = this.pXu;
    this.BtnSelect = new TrapDefenseBuildingBranchSelectBtnItem();
    this.BtnSelect.OnClickCb = this.gXu;
    await this.BtnSelect.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.BtnSelect.SetUiActive(true);
  }
  OnStart() {
    this.GetItem(3)?.SetUIActive(!this.IsInDungeon);
  }
  OnBeforeDestroy() {
    this.InfoItem = undefined;
    this.BtnUpgrade = undefined;
    this.BtnSelect = undefined;
  }
  UpdateDetail(e) {
    this.CurData = e;
    this.InfoItem.UpdateDetail(e);
    var t;
    var i = e.GetHasBranch() && e.GetIsUnlock();
    if (this.IsInDungeon) {
      this.CanLevelUp = false;
      t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e.Id);
      this.GetItem(1)?.SetUIActive(i && t.Branch > 0);
      if (i && t.Branch > 0) {
        this.BtnSelect?.RefreshButton(e);
      }
    } else {
      this.CanLevelUp = this.BtnUpgrade.RefreshButton(e);
      this.GetItem(1)?.SetUIActive(i);
      if (i) {
        this.BtnSelect?.RefreshButton(e);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingDevelopDetailUpdate, e);
  }
}
exports.TrapDefenseBuildingDevelopDetailItem = TrapDefenseBuildingDevelopDetailItem;
class TrapDefenseBuildingDevelopDetailInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.IsNeedResetBtn = e;
    this.Layout = undefined;
    this.Data = undefined;
    this.wNo = undefined;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.vXu = () => {
      var e;
      if (this.IsNeedResetBtn) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(368)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseDevelopResetOne(this.Data.Id);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.W2e = () => {
      return new TrapDefenseBuildingDevelopAttrItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIText], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UITexture]];
    this.BtnBindInfo = [[2, this.vXu]];
  }
  async OnBeforeStartAsync() {
    if (Info_1.Info.PlatformType === 2) {
      await this.pah();
    }
    this.wNo = new MediaPlayer_1.MediaPlayer(this.GetTexture(7));
  }
  OnStart() {
    this.GetButton(2)?.RootUIComp.SetUIActive(this.IsNeedResetBtn);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.W2e);
  }
  OnBeforeDestroy() {
    this.Layout = undefined;
    this.wNo?.Clear();
    this.wNo = undefined;
    this.X3i();
  }
  async pah() {
    const t = new CustomPromise_1.CustomPromise();
    this.X3i();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("M_VideoTextureMat_RectClip");
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName().includes("Vulkan")) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TextLanguageSearch", 47, "[not] switch material to M_VideoTextureMat_RectClip_InvY", ["GetRHIName()", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()], ["SupportVulkan()", UE.KuroRenderingRuntimeBPPluginBPLibrary.SupportVulkan()]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TextLanguageSearch", 47, "switch material to M_VideoTextureMat_RectClip", ["GetRHIName()", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName()], ["SupportVulkan()", UE.KuroRenderingRuntimeBPPluginBPLibrary.SupportVulkan()]);
      }
      this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInterface, e => {
        this.GetTexture(7).SetCustomUIMaterial(e);
        t.SetResult();
      }, 102);
    }
    await t.Promise;
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  UpdateDetail(e) {
    var t = e !== this.Data;
    this.Data = e;
    var i = this.IsNeedResetBtn && e.GetLevel() > 1;
    this.GetButton(2)?.RootUIComp.SetUIActive(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetName());
    var [i, s] = e.GetDesc();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i, ...s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerDefense_BuildingLv_Text", e.GetLevel());
    var [i, s] = e.GetVideo();
    if (t) {
      this.wNo.PlayVideo(i, s, true);
    }
    this.RefreshAttrList();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingDevelopDetailInfoItemUpdate, this.IsNeedResetBtn);
  }
  RefreshAttrList() {
    var e = this.Data.GetAttrItem();
    this.Layout.RefreshByData(e, undefined, true);
  }
}
exports.TrapDefenseBuildingDevelopDetailInfoItem = TrapDefenseBuildingDevelopDetailInfoItem;
class TrapDefenseBuildingDevelopAttrItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, t, i) {
    this.Data = e;
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    if (e.MultiTxt === true) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Value);
    } else {
      this.GetText(2)?.SetText(String(e.Value));
    }
  }
}
class TrapDefenseBuildingUpgradeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCb = undefined;
    this.Pe = undefined;
    this.jYe = () => {
      if (this.OnClickCb) {
        this.OnClickCb();
      }
    };
    this.IOe = () => {
      if (!this.Pe.GetIsUnlock()) {
        var e = (this.Pe.IsBuilding ? ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.LevelUnlockBuilding : ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.LevelUnlockAuxiliary).get(this.Pe.GetDataType());
        if (!e) {
          return;
        }
        var t = ModelManager_1.ModelManager.TrapDefenseModel.LevelDataFromIdMap.get(e);
        if (!t) {
          return;
        }
        if (t.Config.ModeType === 1) {
          ModelManager_1.ModelManager.TrapDefenseModel.OpenViewMainLevelMode(e, t.Config.Difficulty);
        } else {
          ModelManager_1.ModelManager.TrapDefenseModel.OpenViewRougeLevelMode(e);
        }
      }
      if (this.Pe.GetIsMaxLevel(true) || this.Pe.GetIsMaxLevel(false)) {
        t = {
          TalentFuncType: this.Pe.IsBuilding ? 6 : 7
        };
        ModelManager_1.ModelManager.TrapDefenseModel.OpenViewTalentTree(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.jYe], [6, this.IOe]];
  }
  RefreshButton(e) {
    this.Pe = e;
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.CurRecommendLevel !== undefined;
    var i = this.Pe.GetIsUnlock();
    this.GetButton(6).RootUIComp.SetUIActive(i || !t);
    var i = e.GetIsMaxLevel(false);
    var t = e.GetIsMaxLevel(true) && !i;
    this.GetButton(0)?.RootUIComp.SetUIActive(e.GetIsUnlock() && !e.GetIsMaxLevel(true));
    this.GetItem(3)?.SetUIActive(!e.GetIsUnlock() || t);
    this.GetItem(4)?.SetUIActive(e.GetIsUnlock() && i);
    var i = e.GetUpgradeCost();
    this.GetText(1)?.SetText(String(i));
    if (!e.GetIsUnlock() || e.GetIsMaxLevel(true)) {
      if (e.GetIsUnlock()) {
        if (t) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "TowerDefense_Building_CurMax_Text");
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "TowerDefense_Building_BdLock_Text");
      }
      return false;
    } else {
      e = i <= ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.RemainPoints;
      (t = this.GetText(1)).SetChangeColor(!e, t.changeColor);
      (i = this.GetText(2)).SetChangeColor(!e, i.changeColor);
      return e;
    }
  }
}
exports.TrapDefenseBuildingUpgradeItem = TrapDefenseBuildingUpgradeItem;
class TrapDefenseBuildingBranchSelectBtnItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCb = undefined;
    this.yXu = () => {
      if (this.OnClickCb) {
        this.OnClickCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.yXu]];
  }
  RefreshButton(e) {
    var t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e.Id);
    this.GetItem(3)?.SetUIActive(t.Branch === 0);
    this.GetItem(1)?.SetUIActive(t.Branch > 0);
    var t = t.Branch > 0 ? e.GetBranchDesc() : "TowerDefense_Building_BranchSelection_Text";
    var e = e.GetBranchDescArgs();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t, ...e);
  }
}
//# sourceMappingURL=TrapDefenseBuildingDevelopDetailItem.js.map