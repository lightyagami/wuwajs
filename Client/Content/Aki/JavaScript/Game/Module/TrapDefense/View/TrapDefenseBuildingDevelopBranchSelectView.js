"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopBranchSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefenseBuildingDevelopBranchSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CurSelectedId = -1;
    this.CaptionItem = undefined;
    this.DataList = [];
    this.Layout = undefined;
    this.IsInDungeon = false;
    this.iGu = () => {
      if (this.CurSelectedId !== -1) {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseDevelopBranch(this.CurSelectedId).then(i => {
          if (i) {
            this.CloseMe();
          }
        });
      }
    };
    this.J2i = () => {
      this.CloseMe();
    };
    this.GIl = i => {
      this.CurSelectedId = i === this.CurSelectedId ? -1 : i;
      this.GetButton(6)?.SetSelfInteractive(this.CurSelectedId !== -1);
      this.UpdateSelected();
    };
    this.Bqe = () => {
      var i = new TrapDefenseBuildingDevelopBranchSelectItem();
      i.OnClickCb = this.GIl;
      return i;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.iGu]];
  }
  OnStart() {
    var i = this.OpenParam;
    this.IsInDungeon = i.IsInDungeon;
    this.GetItem(5)?.SetUIActive(this.IsInDungeon);
    this.GetButton(6)?.RootUIComp.SetUIActive(!this.IsInDungeon);
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(this.J2i);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.Bqe);
    this.Data = i.Data;
    this.CurSelectedId = this.Data.Id;
    this.UpdateData();
  }
  OnBeforeDestroy() {
    this.CaptionItem = undefined;
    this.Data = undefined;
  }
  UpdateData() {
    if (this.Data.GetHasBranch()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Data.GetName());
      this.SetTextureByPath(this.Data.GetIconPath(), this.GetTexture(1));
      var t = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.CurSelectedId);
      var e = this.Data.GetBranchCount();
      for (let i = 1; i <= e; i++) {
        var s = {
          MachineType: t.MachineType,
          DataType: t.DataType,
          Level: t.Level,
          Branch: i
        };
        var s = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(s);
        var s = {
          Id: s,
          IsCurLevel: this.Data.Id === s,
          IsSelected: this.Data.Id === s
        };
        this.DataList.push(s);
      }
      this.Layout.RefreshByData(this.DataList, () => {
        this.UpdateSelected();
        for (const i of this.Layout.GetLayoutItemList()) {
          i.GetRootItem().SetRaycastTarget(!this.IsInDungeon);
        }
      }, true);
      this.CurSelectedId = t.Branch > 0 ? this.Data.Id : -1;
      this.GetButton(6)?.SetSelfInteractive(this.CurSelectedId !== -1);
    } else {
      this.CloseMe();
    }
  }
  UpdateSelected() {
    for (const i of this.DataList) {
      i.IsSelected = this.CurSelectedId === i.Id;
    }
    for (const t of this.Layout.GetLayoutItemList()) {
      t.UpdateSelected();
    }
  }
}
exports.TrapDefenseBuildingDevelopBranchSelectView = TrapDefenseBuildingDevelopBranchSelectView;
class TrapDefenseBuildingDevelopBranchSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnClickCb = undefined;
    this.EXu = () => {
      if (this.OnClickCb) {
        this.OnClickCb(this.Data.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIText]];
    this.BtnBindInfo = [[1, this.EXu]];
  }
  Refresh(i, t, e) {
    this.Data = i;
    var s = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(i.Id);
    var h = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetBranchName(s.Branch);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h);
    if (s.MachineType === 1) {
      h = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingById(i.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), h.DescDetail, ...h.DescArgs);
    } else {
      s = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(i.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.DescDetail, ...s.DescArgs);
    }
    if (i.IsSelected) {
      this.GetExtendToggle(1)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(1)?.SetToggleState(0);
    }
  }
  UpdateSelected() {
    if (this.Data.IsSelected) {
      this.GetExtendToggle(1)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(1)?.SetToggleState(0);
    }
  }
}
//# sourceMappingURL=TrapDefenseBuildingDevelopBranchSelectView.js.map