"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NounHandBookItem = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid");
class NounHandBookItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.L8a = undefined;
    this.A8a = undefined;
    this.GZt = undefined;
    this.FZt = undefined;
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), undefined, true);
    await this.WZt();
  }
  async WZt() {
    this.L8a = new HandBookNounToggleItem();
    this.AddChild(this.L8a);
    this.A8a = new HandBookNounDesItem();
    this.AddChild(this.A8a);
    var t = this.GetItem(0);
    t.SetUIActive(false);
    var i = this.GetItem(1);
    i.SetUIActive(false);
    await Promise.all([this.L8a.CreateByActorAsync(t.GetOwner()), this.A8a.CreateByActorAsync(i.GetOwner())]);
    this.L8a.BindToggleCallback(this.GZt);
    this.A8a.BindChildToggleCallback(this.FZt);
  }
  GetUsingItem(t) {
    return (t.HandBookNounConfigId ? this.GetItem(1) : this.GetItem(0)).GetOwner();
  }
  ClearItem() {
    this.Destroy();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  Update(t, i) {
    this.A8a?.SetUiActive(false);
    this.L8a?.SetUiActive(false);
    this.RootItem?.SetAlpha(1);
    if (t.HandBookNounConfigId) {
      this.A8a?.SetUiActive(true);
      this.A8a?.Refresh(t.HandBookNounConfigId, t.IsShowContent);
    } else if (t.HandBookCommonItemData) {
      this.L8a?.SetUiActive(true);
      this.L8a?.Refresh(t.HandBookCommonItemData, t.IsShowContent);
    }
  }
  RefreshNewState() {
    this.L8a?.RefreshNewState();
    this.A8a?.RefreshNewState();
  }
  BindChildToggleCallback(t) {
    this.FZt = t;
  }
  BindToggleCallback(t) {
    this.GZt = t;
  }
}
exports.NounHandBookItem = NounHandBookItem;
class HandBookNounToggleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GZt = undefined;
    this.sft = undefined;
    this.kZt = undefined;
    this.OZt = t => {
      var i;
      var s;
      var t = t === 1;
      if (t && (i = this.kZt.Config, s = this.CheckIsCanShowChildList(i.Id), this.GetItem(1).SetUIActive(s && true), this.GetItem(6).SetUIActive(false), this.GetItem(4).SetUIActive(!s), this.GZt) && t) {
        this.GZt(i.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem]];
    this.BtnBindInfo = [[5, this.OZt]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(0).GetOwner());
  }
  Refresh(t, i) {
    var s = (this.kZt = t).Config;
    var t = {
      Type: 4,
      Data: t,
      IconPath: t.Icon,
      QualityId: t.QualityId
    };
    this.sft.Apply(t);
    this.sft.BindOnCanExecuteChange(() => false);
    var t = this.CheckIsCanShowChildList(s.Id);
    this.GetText(2).SetText(t ? this.kZt.Title : MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Unknown_Text"));
    this.GetItem(4).SetUIActive(!t);
    this.GetItem(1).SetUIActive(t && i);
    this.GetItem(6).SetUIActive(t && !i);
    var t = this.CheckNewState(s.Id);
    this.GetItem(3).SetUIActive(t);
    this.GetExtendToggle(5).SetToggleState(i ? 1 : 0, false);
  }
  CheckIsCanShowChildList(t) {
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetNounHandBookConfigList(t);
    var s = i?.length ?? 0;
    let e = false;
    for (let t = 0; t < s; t++) {
      var h = i[t];
      if (ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, h.Id)) {
        e = true;
        break;
      }
    }
    return e;
  }
  CheckNewState(t) {
    var i = ConfigManager_1.ConfigManager.HandBookConfig.GetNounHandBookConfigList(t);
    var s = i?.length ?? 0;
    let e = false;
    for (let t = 0; t < s; t++) {
      var h = i[t];
      var h = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, h.Id);
      if (h !== undefined && !h.IsRead) {
        e = true;
        break;
      }
    }
    return e;
  }
  RefreshNewState() {
    var t;
    if (this.kZt) {
      t = this.kZt.Config;
      t = this.CheckNewState(t.Id);
      this.GetItem(3).SetUIActive(t);
    }
  }
  BindToggleCallback(t) {
    this.GZt = t;
  }
}
class HandBookNounDesItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.FZt = undefined;
    this.D8a = undefined;
    this.Rjt = false;
    this.H5e = undefined;
    this.OZt = t => {
      if (this.FZt && t === 1) {
        this.FZt(this.D8a, this.H5e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [3, UE.UIText], [2, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [0, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.OZt]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
  }
  Refresh(t, i) {
    var t = ConfigManager_1.ConfigManager.HandBookConfig.GetNounHandBookConfig(t);
    this.D8a = t;
    var s = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, t.Id);
    this.Rjt = s === undefined;
    this.GetItem(1).SetUIActive(this.Rjt);
    this.GetText(2).SetUIActive(!this.Rjt);
    var t = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(t.Id);
    this.GetText(2).SetText(t);
    this.GetText(3).SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Unknown_Text"));
    var t = this.GetItem(4);
    var e = this.GetItem(5);
    var s = s !== undefined && !s.IsRead;
    e.SetUIActive(this.Rjt);
    if (this.Rjt) {
      t.SetUIActive(false);
    } else {
      t.SetUIActive(s);
    }
    if (i) {
      this.H5e?.SetToggleStateForce(1, true, true);
    } else {
      this.H5e?.SetToggleStateForce(0, true, true);
    }
  }
  BindChildToggleCallback(t) {
    this.FZt = t;
  }
  RefreshNewState() {
    var t;
    if (this.D8a) {
      t = (t = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(11, this.D8a.Id)) !== undefined && !t.IsRead;
      this.GetItem(4).SetUIActive(t);
    }
  }
}
//# sourceMappingURL=NounHandBookItem.js.map