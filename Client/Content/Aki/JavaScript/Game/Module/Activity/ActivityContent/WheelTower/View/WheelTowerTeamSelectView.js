"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerTeamSelectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const WheelTowerRoleInfoPanel_1 = require("../Component/TeamSelect/WheelTowerRoleInfoPanel");
const WheelTowerStrShowPanel_1 = require("../Component/TeamSelect/WheelTowerStrShowPanel");
const WheelTowerTeamSelectMainPanel_1 = require("../Component/TeamSelect/WheelTowerTeamSelectMainPanel");
class WheelTowerTeamSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.mof = undefined;
    this.LSc = undefined;
    this.$df = undefined;
    this.Hea = undefined;
    this._a_ = e => {
      const t = ModelManager_1.ModelManager.WheelTowerModel.GetRealRoleId(e);
      var i;
      if (t !== 0 && ModelManager_1.ModelManager.WheelTowerModel.IsSelectRole(t)) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(407)).FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.WheelTowerModel.TryAddOrDeleteRole(t);
          ModelManager_1.ModelManager.WheelTowerModel.TryAddOrDeleteRole(e);
          this.mof?.RefreshPanel();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        if ((i = ModelManager_1.ModelManager.WheelTowerModel.GetTemplateRoleId(e)) !== 0 && ModelManager_1.ModelManager.WheelTowerModel.IsSelectRole(i)) {
          ModelManager_1.ModelManager.WheelTowerModel.TryAddOrDeleteRole(i);
        }
        ModelManager_1.ModelManager.WheelTowerModel.TryAddOrDeleteRole(e);
      }
      this.KVm(e);
    };
    this.Frf = e => {
      const t = [];
      for (let e = 0; e < ModelManager_1.ModelManager.WheelTowerModel.GetTeamMaxRoleCount(); e++) {
        t.push(0);
      }
      e = ModelManager_1.ModelManager.EditFormationModel.GetFormationData(e);
      let i = 0;
      e?.GetRoleDataMapWithTrial(false).forEach(e => {
        t[i] = e.ConfigId;
        i++;
      });
      ModelManager_1.ModelManager.WheelTowerModel.SetTmpSelectRoleList(t.filter(e => e > 0));
      this.$df?.Refresh();
    };
    this.fof = (e, t) => {
      this.KVm(t, true);
      this.$df?.Refresh();
      this.$df?.SetUiActive(e === 1);
      this.LSc?.SetUiActive(e !== 1);
    };
    this.p5t = () => {
      ModelManager_1.ModelManager.WheelTowerModel.TmpToSelect();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.mof = new WheelTowerTeamSelectMainPanel_1.WheelTowerTeamSelectMainPanel();
    e.push(this.mof.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.LSc = new WheelTowerRoleInfoPanel_1.WheelTowerRoleInfoPanel();
    e.push(this.LSc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.$df = new WheelTowerStrShowPanel_1.WheelTowerStrShowPanel();
    e.push(this.$df.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.mof.OnRoleSelect = this._a_;
    this.mof.OnTeamSelect = this.Frf;
    this.mof.OnSelectModeChange = this.fof;
    this.LSc.OnClickConfirm = this.p5t;
    this.$df.OnClickConfirm = this.p5t;
    ModelManager_1.ModelManager.WheelTowerModel.SelectToTmp();
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.mof?.RefreshPanel();
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
  }
  KVm(e, t = false) {
    if (e !== ModelManager_1.ModelManager.WheelTowerModel.TmpSelectRoleId && e > 0 || t) {
      this.Hea?.PlayOrReplaySequenceByName("Switch");
      this.LSc?.Refresh(e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "RoleTab") {
      e = Number(e[1]);
      if (e = this.mof?.GetTabItem(e)) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.WheelTowerTeamSelectView = WheelTowerTeamSelectView;
//# sourceMappingURL=WheelTowerTeamSelectView.js.map