"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditTeamModule = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
const LoopScrollView_1 = require("../../../../../../Util/ScrollView/LoopScrollView");
const CharacterItem_1 = require("./Character/CharacterItem");
class EditTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CharacterList = [];
    this.OnClickEvent = undefined;
    this.CanExecuteChange = undefined;
    this.IsItemSelected = undefined;
    this.Data = undefined;
    this.RedDotState = false;
    this.Cke = t => {
      this.rfa();
      this.OnClickEvent(this.Data.Id, t === 1, this.GridIndex);
    };
    this.gke = () => {
      var t = this.GetExtendToggle(0).GetToggleState();
      return !this.CanExecuteChange || this.CanExecuteChange(this.Data.Id, t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  async dke(t) {
    var i = new CharacterItem_1.CharacterItem();
    this.CharacterList.push(i);
    await i.CreateThenShowByActorAsync(t.GetOwner());
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
    await Promise.all([this.dke(this.GetItem(5)), this.dke(this.GetItem(6)), this.dke(this.GetItem(7))]);
    this.GetItem(11).SetUIActive(false);
  }
  Refresh(t, i, e) {
    this.Data = t;
    this.GetItem(8).SetUIActive(!t.IsOwn);
    this.GetItem(10).SetUIActive(t.IsOwn);
    this.GetTexture(2).SetUIActive(!t.IsOwn);
    this.GetTexture(1).SetUIActive(t.IsOwn);
    var s = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.Data.Id);
    var h = t.GetTeamDataUnLockState();
    this.GetItem(12).SetUIActive(h === 1);
    if (t.IsOwn) {
      var h = this.IsItemSelected?.(this.Data.Id) ?? i;
      this.SetToggleState(h);
      var r = t.GetCharacterDataList();
      for (let t = 0, i = r.length; t < i; t++) {
        this.CharacterList[t].Refresh(r[t]);
      }
      this.SetTextureByPath(s.Icon, this.GetTexture(1));
      this.GetText(3).SetText(this.Data.Level.toString());
      this.GetText(4).SetText(this.Data.Name);
      this.RefreshRedDot(this.Data.Id);
    } else {
      this.SetToggleState(false);
      i = t.GetUnLockConditionDesc();
      this.GetText(9).SetText(i);
      this.SetTextureByPath(s.Icon, this.GetTexture(2));
    }
  }
  RefreshRedDot(t) {
    t = ModelManager_1.ModelManager.MoonChasingModel.CheckRoleIdRedDotState(t);
    if (this.RedDotState !== t) {
      this.RedDotState = t;
      this.GetItem(11).SetUIActive(this.RedDotState);
    }
  }
  rfa() {
    if (this.RedDotState && this.Data.IsOwn) {
      ModelManager_1.ModelManager.MoonChasingModel.ReadRoleIdUnlockFlag(this.Data.Id);
      this.RefreshRedDot(this.Data.Id);
    }
  }
  SetClickEvent(t) {
    this.OnClickEvent = t;
  }
  SetCanExecuteChange(t) {
    this.CanExecuteChange = t;
  }
  SetIsItemSelected(t) {
    this.IsItemSelected = t;
  }
  SetToggleState(t, i = false) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, i);
  }
  OnSelected(t) {
    this.SetToggleState(true, t);
  }
  OnDeselected(t) {
    this.SetToggleState(false);
  }
}
class EditTeamModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LoopScroll = undefined;
    this.OnClickEvent = undefined;
    this.CanExecuteChange = undefined;
    this.IsItemSelected = undefined;
    this.DataList = [];
    this.fke = () => {
      var t = new EditTeamItem();
      t.SetClickEvent(this.OnClickEvent);
      t.SetCanExecuteChange(this.CanExecuteChange);
      t.SetIsItemSelected(this.IsItemSelected);
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.LoopScroll = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.fke, true);
    await this.LoopScroll?.RefreshByDataAsync(this.DataList, false, true);
  }
  async RefreshEditTeamModule() {
    await this.LoopScroll?.RefreshByDataAsync(this.DataList, false, true);
  }
  SetClickEvent(t) {
    this.OnClickEvent = t;
  }
  SetCanExecuteChange(t) {
    this.CanExecuteChange = t;
  }
  SetIsItemSelected(t) {
    this.IsItemSelected = t;
  }
  SelectEditTeamItem(t, i = false) {
    this.LoopScroll?.SelectGridProxy(t, i);
  }
  SetEditTeamDataList(t) {
    this.DataList = t;
  }
  GetDataLength() {
    return this.DataList.length;
  }
  GetSelectGridIndex() {
    var t = this.LoopScroll.GetSelectedGridIndex();
    if (t === -1) {
      return 0;
    } else {
      return t;
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length < 1)) {
      var i = i[0];
      if (i !== "Helper") {
        if (i !== "Delegation" && i !== "HelperFirst" || (i = this.LoopScroll?.GetGrid(0)) === undefined) {
          return undefined;
        } else {
          return [i, i];
        }
      }
      {
        let t = -1;
        for (var [e, s] of this.DataList.entries()) {
          if (s.GetTeamDataUnLockState() === 1) {
            t = e;
            break;
          }
        }
        if (t < 0) {
          return undefined;
        } else if ((i = this.LoopScroll?.GetGrid(t)) === undefined) {
          return undefined;
        } else {
          this.LoopScroll?.ScrollToGridIndex(t);
          return [i, i];
        }
      }
    }
  }
  SetTitleItemActive(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
}
exports.EditTeamModule = EditTeamModule;
//# sourceMappingURL=EditTeamModule.js.map