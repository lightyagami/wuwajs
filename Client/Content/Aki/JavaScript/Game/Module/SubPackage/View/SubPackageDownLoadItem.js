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
    this.pTm = undefined;
    this.vTm = undefined;
    this.yTm = undefined;
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
    this.pTm?.SetUiActive(false);
    this.vTm?.SetUiActive(false);
    this.yTm?.SetUiActive(false);
    if (t.Type) {
      this.pTm?.SetUiActive(true);
      this.pTm?.RefreshItem(t.Type);
    } else if (t.VersionId) {
      this.vTm?.SetUiActive(true);
      this.vTm?.RefreshItem(t.VersionId, t.IsShowItem);
    } else if (t.SubPackageId) {
      this.yTm?.SetUiActive(true);
      this.yTm?.RefreshItem(t.SubPackageId);
    }
  }
  async WZt() {
    this.pTm = new SubPackageDownLoadTitleItem();
    this.AddChild(this.pTm);
    this.vTm = new SubPackageDownLoadVersionItem();
    this.AddChild(this.vTm);
    this.yTm = new SubPackageDownLoadSubPackageItem();
    this.AddChild(this.yTm);
    await Promise.all([this.pTm.CreateByActorAsync(this.GetItem(0).GetOwner()), this.vTm.CreateByActorAsync(this.GetItem(1).GetOwner()), this.yTm.CreateByActorAsync(this.GetItem(2).GetOwner())]);
    this.vTm.OnClickCallBack = this.OnClickCallBack;
    this.vTm.OnClickHelpBtnCallBack = this.OnClickHelpBtnCallBack;
    this.vTm.OnClickBtn = this.OnChildItemClickBtn;
    this.yTm.OnClickBtn = this.OnChildItemClickBtn;
  }
  RefreshDownLoadState() {
    this.vTm?.RefreshDownLoadStateByTime();
    this.yTm?.RefreshDownLoadStateByTime();
  }
  ClearItem() {
    this.Destroy();
  }
  GetData() {
    return this.Data;
  }
  GetInteractItem() {
    if (this.Data?.VersionId) {
      return this.vTm.GetToggleItem();
    } else {
      return this.yTm.GetBtnItem();
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
    this.STm = 0;
    this.MTm = false;
    this.ETm = [];
    this.ac = 4;
    this.SPe = undefined;
    this.pcr = () => {
      this.OnClickHelpBtnCallBack?.(this.STm, this.GetButton(2).RootUIComp);
    };
    this.ITm = () => {
      this.OnClickBtn?.();
      for (const t of this.ETm) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(t) === 2) {
          ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(t, this.WF1);
          break;
        }
      }
    };
    this.TTm = () => {
      this.OnClickBtn?.();
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoading() && this.Type !== 1) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Des_WaitKeyItemDownLoad");
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.PushSubPackageDownLoading(this.ETm, () => {
        if (this.GetExtendToggle(17).ToggleState === 1 || this.MTm) {
          this.WF1();
        } else {
          this.OnClickCallBack?.(this.STm, true);
        }
      });
    };
    this.bTm = () => {
      this.OnClickBtn?.();
      for (const t of this.ETm) {
        if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(t) === 1) {
          ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(t, this.WF1);
        }
      }
    };
    this.uHe = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.CancelSubPackageDownLoadingList(this.ETm);
      this.WF1();
    };
    this.RTm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading(this.ETm, this.WF1);
    };
    this.kqe = t => {
      if (!this.MTm) {
        this.OnClickCallBack?.(this.STm, t === 1);
      }
    };
    this.WF1 = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState);
    };
    this.wTm = () => {
      this.RefreshState();
      this.RefreshTipsText();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIExtendToggle], [18, UE.UIItem]];
    this.BtnBindInfo = [[2, this.pcr], [9, this.ITm], [10, this.TTm], [11, this.bTm], [17, this.kqe], [12, this.uHe], [13, this.RTm]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.wTm);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.wTm);
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
  }
  RefreshItem(t, i) {
    this.STm = t;
    this.ETm = [];
    t = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadVersionByVersion(this.STm);
    if (t) {
      for (const s of ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageListByVersion(this.STm) ?? []) {
        this.ETm.push(s.Id);
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
      this.SetTextureByPath(t.Pic, this.GetTexture(0));
      this.GetItem(7).SetUIActive(t.IsRecommend);
      this.Type = t.Type;
      this.MTm = !ModelManager_1.ModelManager.SubPackageDownLoadModel.GetVersionShowArrowByType(this.Type);
      this.GetItem(6).SetUIActive(!this.MTm);
      this.GetExtendToggle(17).SetToggleState(i ? 1 : 0);
      this.RefreshState();
      this.RefreshTipsText();
    }
  }
  RefreshState() {
    this.ac = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadVersionStateById(this.STm);
    this.GetButton(9).RootUIComp.SetUIActive(this.ac === 2);
    this.GetButton(10).RootUIComp.SetUIActive(this.ac === 4);
    this.GetButton(11).RootUIComp.SetUIActive(this.ac === 1);
    this.GetItem(14).SetUIActive(this.ac === 3 && !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish());
    this.GetItem(15).SetUIActive(this.ac === 5);
    this.GetButton(12).RootUIComp.SetUIActive((this.ac === 1 || this.ac === 3 || this.ac === 2) && this.Type !== 1);
    this.GetButton(13).RootUIComp.SetUIActive(this.ac === 3 && ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish() && this.Type !== 1);
  }
  RefreshTipsText() {
    if (this.Type === 1 || ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish() || this.ac === 5) {
      this.GetText(4).SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "SubPackageDownLoad_Des_WaitKeyItemDownLoad");
      this.GetText(4).SetUIActive(true);
    }
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
    let s = BigInt(0);
    for (const o of this.ETm) {
      var e;
      var h = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(o);
      if (h) {
        e = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(o);
        i += e !== 5 ? ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(o) : h;
        s += h;
      }
    }
    this.GetText(3).SetUIActive(s > 0);
    this.GetText(3).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(i) + "/" + ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(s));
    var a;
    var t = this.GetItem(18).IsUIActiveSelf();
    if (this.ac === 5) {
      this.GetItem(18).SetUIActive(true);
      this.GetSprite(5).SetFillAmount(1);
      if (!t) {
        this.SPe?.PlayLevelSequenceByName("Load");
      }
    } else if (s) {
      this.GetItem(18).SetUIActive(i > 0);
      a = Number(i) / Number(s);
      this.GetSprite(5).SetFillAmount(a);
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
    this.LTm = 0;
    this.ac = 4;
    this.ITm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.RestartSubPackageDownLoading(this.LTm, this.WF1);
    };
    this.PTm = () => {
      this.OnClickBtn?.();
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoading()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SubPackageDownLoad_Des_WaitKeyItemDownLoad");
      }
      ControllerHolder_1.ControllerHolder.SubPackageController.PushSubPackageDownLoading([this.LTm], this.WF1);
    };
    this.bTm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.StopSubPackageDownLoading(this.LTm, this.WF1);
    };
    this.uHe = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.CancelSubPackageDownLoading(this.LTm);
      this.WF1();
    };
    this.RTm = () => {
      this.OnClickBtn?.();
      ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading([this.LTm], this.WF1);
    };
    this.WF1 = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState);
    };
    this.ATm = () => {
      if (this.LTm) {
        this.RefreshState();
        this.Qbe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[2, this.ITm], [3, this.PTm], [4, this.bTm], [5, this.uHe], [6, this.RTm]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.ATm);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.ATm);
  }
  RefreshItem(t) {
    this.LTm = t;
    t = ConfigManager_1.ConfigManager.SubPackageConfig.GetDownLoadSubPackageById(this.LTm);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
      this.RefreshState();
      this.Qbe();
    }
  }
  RefreshState() {
    this.ac = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadItemStateById(this.LTm);
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
    var t = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(this.LTm);
    var i = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(this.LTm);
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