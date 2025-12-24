"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SubPackageDownLoadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnClickBtnCallBack = undefined;
    this.OnClickCallBack = undefined;
    this.OnClickHelpBtnCallBack = undefined;
    this.BGm = undefined;
    this.kGm = undefined;
    this.qGm = undefined;
    this.OnChildItemClickBtn = () => {
      if (this.Data) {
        this.OnClickBtnCallBack?.(this.Data);
      }
    };
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  GetUsingItem(t) {
    return (t.Type ? this.GetItem(0) : t.VersionId ? this.GetItem(1) : this.GetItem(2)).GetOwner();
  }
  Update(t, i) {
    this.Data = t;
    this.BGm?.SetUiActive(false);
    this.kGm?.SetUiActive(false);
    this.qGm?.SetUiActive(false);
    if (t.Type) {
      this.BGm?.SetUiActive(true);
      this.BGm?.RefreshItem(t.Type);
    } else if (t.VersionId) {
      this.kGm?.SetUiActive(true);
      this.kGm?.RefreshItem(t.VersionId, t.IsShowItem);
    } else if (t.SubPackageId) {
      this.qGm?.SetUiActive(true);
      this.qGm?.RefreshItem(t.SubPackageId);
    }
  }
  async WZt() {
    this.BGm = new SubPackageDownLoadTitleItem();
    this.AddChild(this.BGm);
    this.kGm = new SubPackageDownLoadVersionItem();
    this.AddChild(this.kGm);
    this.qGm = new SubPackageDownLoadSubPackageItem();
    this.AddChild(this.qGm);
    await Promise.all([this.BGm.CreateByActorAsync(this.GetItem(0).GetOwner()), this.kGm.CreateByActorAsync(this.GetItem(1).GetOwner()), this.qGm.CreateByActorAsync(this.GetItem(2).GetOwner())]);
    this.kGm.OnClickCallBack = this.OnClickCallBack;
    this.kGm.OnClickHelpBtnCallBack = this.OnClickHelpBtnCallBack;
    this.kGm.OnClickBtn = this.OnChildItemClickBtn;
    this.qGm.OnClickBtn = this.OnChildItemClickBtn;
  }
  RefreshDownLoadState() {
    this.kGm?.RefreshDownLoadStateByTime();
    this.qGm?.RefreshDownLoadStateByTime();
  }
  ClearItem() {
    this.Destroy();
  }
  GetData() {
    return this.Data;
  }
  GetInteractItem() {
    if (this.Data?.VersionId) {
      return this.kGm.GetToggleItem();
    } else {
      return this.qGm.GetBtnItem();
    }
  }
}
exports.SubPackageDownLoadItem = SubPackageDownLoadItem;
class SubPackageDownLoadTitleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  RefreshItem(t) {
    if (t === 1) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoadTitle_Must");
    }
    if (t === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoadTitle_Optional");
    }
    if (t === 3) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoadTitle_Expand");
    }
  }
}
class SubPackageDownLoadVersionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickBtn = undefined;
    this.OnClickCallBack = undefined;
    this.OnClickHelpBtnCallBack = undefined;
    this.Type = 1;
    this.OGm = 0;
    this.GGm = false;
    this.FGm = [];
    this.ac = 4;
    this.SPe = undefined;
    this.pcr = () => {
      this.OnClickHelpBtnCallBack?.(this.OGm, this.GetButton(2).RootUIComp);
    };
    this.NGm = () => {
      this.OnClickBtn?.();
      for (const t of this.FGm) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(t) === 2) {
          ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(t, this.WF1);
          break;
        }
      }
    };
    this.VGm = () => {
      this.OnClickBtn?.();
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoading() && this.Type !== 1) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Des_WaitKeyItemDownLoad");
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.PushSubPackageDownLoading(this.FGm, () => {
        if (this.GetExtendToggle(17).ToggleState === 1 || this.GGm) {
          this.WF1();
        } else {
          this.OnClickCallBack?.(this.OGm, true);
        }
      });
    };
    this.jGm = () => {
      this.OnClickBtn?.();
      for (const t of this.FGm) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(t) === 1) {
          ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(t, this.WF1);
        }
      }
    };
    this.uHe = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.CancelSubPackageDownLoadingList(this.FGm);
      this.WF1();
    };
    this.HGm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(this.FGm, this.WF1);
    };
    this.kqe = t => {
      if (!this.GGm) {
        this.OnClickCallBack?.(this.OGm, t === 1);
      }
    };
    this.WF1 = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState);
    };
    this.$Gm = () => {
      this.RefreshState();
      this.RefreshTipsText();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIExtendToggle], [18, UE.UIItem]];
    this.BtnBindInfo = [[2, this.pcr], [9, this.NGm], [10, this.VGm], [11, this.jGm], [17, this.kqe], [12, this.uHe], [13, this.HGm]];
  }
  OnStart() {
    this.GetText(4).SetUIActive(false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.$Gm);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.$Gm);
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
  RefreshItem(t, i) {
    this.OGm = t;
    this.FGm = [];
    t = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByVersion(this.OGm);
    if (t) {
      for (const e of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(this.OGm) ?? []) {
        this.FGm.push(e.Id);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
      this.SetTextureByPath(t.Pic, this.GetTexture(0));
      this.GetItem(7).SetUIActive(t.IsRecommend);
      this.Type = t.Type;
      this.GGm = !ModelManager_1.ModelManager.SubPackageDownLoadModel.GetVersionShowArrowByType(this.Type);
      this.GetItem(6).SetUIActive(!this.GGm);
      this.GetExtendToggle(17).SetToggleState(i ? 1 : 0);
      this.RefreshState();
      this.RefreshTipsText();
    }
  }
  RefreshState() {
    this.ac = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadVersionStateById(this.OGm);
    this.GetButton(9).RootUIComp.SetUIActive(this.ac === 2);
    this.GetButton(10).RootUIComp.SetUIActive(this.ac === 4);
    this.GetButton(11).RootUIComp.SetUIActive(this.ac === 1);
    this.GetItem(14).SetUIActive(this.ac === 3 && !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish());
    this.GetItem(15).SetUIActive(this.ac === 5);
    this.GetButton(12).RootUIComp.SetUIActive((this.ac === 1 || this.ac === 3 || this.ac === 2) && this.Type !== 1);
    this.GetButton(13).RootUIComp.SetUIActive(this.ac === 3 && ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish() && this.Type !== 1);
  }
  RefreshTipsText() {
    var t = this.GetText(8);
    if (this.ac === 1) {
      t.SetUIActive(true);
      t.SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadSpeed()) + "/s");
    } else if (this.ac === 2) {
      t.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_Pausing_Text");
    } else {
      t.SetUIActive(false);
    }
    let i = BigInt(0);
    let e = BigInt(0);
    for (const r of this.FGm) {
      var s;
      var h = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(r);
      if (h) {
        s = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(r);
        i += s !== 5 ? ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(r) : h;
        e += h;
      }
    }
    this.GetText(3).SetUIActive(e > 0);
    if (i <= 0) {
      this.GetText(3).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i) + "/" + ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e));
    } else if (this.ac === 5 || this.ac === 4) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "ResDownLoadVersion_FinishTips", ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i) + "/" + ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e));
    } else {
      let t = BigInt(0);
      let i = BigInt(0);
      for (const l of this.FGm) {
        var o;
        var a = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(l);
        if (a && (o = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(l)) !== 5 && o !== 4) {
          t += ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(l);
          i += a;
        }
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "ResDownLoadVersion_DownLoadingTips", ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(t) + "/" + ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i), ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e));
    }
    var n;
    var t = this.GetItem(18).IsUIActiveSelf();
    if (this.ac !== 5 && this.ac !== 4 && e) {
      this.GetItem(18).SetUIActive(i > 0);
      n = Number(i) / Number(e);
      this.GetSprite(5).SetFillAmount(n);
      if (!t && i > 0) {
        this.SPe?.PlayLevelSequenceByName("Load");
      }
    } else {
      this.GetItem(18).SetUIActive(false);
      this.GetSprite(5).SetFillAmount(0);
    }
  }
  RefreshDownLoadStateByTime() {
    if (this.ac === 1) {
      this.RefreshTipsText();
    }
  }
  GetToggleItem() {
    return this.GetExtendToggle(17).RootUIComp;
  }
}
class SubPackageDownLoadSubPackageItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickBtn = undefined;
    this.WGm = 0;
    this.ac = 4;
    this.NGm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(this.WGm, this.WF1);
    };
    this.QGm = () => {
      this.OnClickBtn?.();
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoading()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Des_WaitKeyItemDownLoad");
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.PushSubPackageDownLoading([this.WGm], this.WF1);
    };
    this.jGm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(this.WGm, this.WF1);
    };
    this.uHe = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.CancelSubPackageDownLoading(this.WGm);
      this.WF1();
    };
    this.HGm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading([this.WGm], this.WF1);
    };
    this.WF1 = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState);
    };
    this.KGm = () => {
      if (this.WGm) {
        this.RefreshState();
        this.Qbe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[2, this.NGm], [3, this.QGm], [4, this.jGm], [5, this.uHe], [6, this.HGm]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.KGm);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.KGm);
  }
  RefreshItem(t) {
    this.WGm = t;
    t = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(this.WGm);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
      this.RefreshState();
      this.Qbe();
    }
  }
  RefreshState() {
    this.ac = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(this.WGm);
    this.GetButton(2).RootUIComp.SetUIActive(this.ac === 2);
    this.GetButton(3).RootUIComp.SetUIActive(this.ac === 4);
    this.GetButton(4).RootUIComp.SetUIActive(this.ac === 1);
    this.GetButton(5).RootUIComp.SetUIActive(this.ac === 1 || this.ac === 3 || this.ac === 2);
    this.GetButton(6).RootUIComp.SetUIActive(this.ac === 3 && ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish());
    this.GetItem(7).SetUIActive(this.ac === 3 && !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish());
    var t = this.ac === 5;
    this.GetItem(8).SetUIActive(t);
    var i = this.GetItem(9);
    i.SetChangeColor(t, i.changeColor);
    var i = this.GetText(0);
    i.SetChangeColor(t, i.changeColor);
    var i = this.GetText(1);
    i.SetChangeColor(t, i.changeColor);
  }
  Qbe() {
    var t = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(this.WGm);
    var i = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(this.WGm);
    if (t <= 0 || this.ac === 5) {
      this.GetText(1).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i));
    } else {
      this.GetText(1).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(t) + "/" + ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i));
    }
  }
  RefreshDownLoadStateByTime() {
    if (this.ac === 1) {
      this.Qbe();
    }
  }
  GetBtnItem() {
    return this.GetItem(10);
  }
}
//# sourceMappingURL=SubPackageDownLoadItem.js.map