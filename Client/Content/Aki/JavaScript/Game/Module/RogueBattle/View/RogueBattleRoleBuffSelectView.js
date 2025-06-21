"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleRoleBuffSelectView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleRoleBuffItem_1 = require("../Component/RogueBattleRoleBuffItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleRoleBuffSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.OVc = void 0, this.clo = void 0, this.ilo = () => {
      ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Select(this.OVc.GetSelectedGridIndex())
    }, this.nlo = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.rE1.W_1.Lm1,
        e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e);
      e && RoleController_1.RoleController.OpenRoleMainView(1, 0, [e.TrialRoleId])
    }, this.Xho = e => {
      e === this.OVc.GetSelectedGridIndex() ? (this.OVc?.DeselectCurrentGridProxy(), this.GetButton(4).SetSelfInteractive(!1)) : (this.OVc?.SelectGridProxy(e), this.GetButton(4).SetSelfInteractive(!0))
    }, this.UOe = e => {
      var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam),
        i = t.GetGainDataList(),
        a = [];
      for (let e = 0; e < i.length; e++) {
        var r = i[e];
        r.cIc && a.push(r.cIc.v9n)
      }
      e = {
        Index: e,
        AffixIds: a,
        RoleId: t.Data.rE1.QEc.Q6n
      };
      UiManager_1.UiManager.OpenView("RogueBattleRoleAffixDetailView", e)
    }, this.Bqe = () => {
      var e = new RogueBattleRoleBuffItem_1.RogueBattleRoleBuffItem;
      return e.OnSelectCallback = this.Xho, e.OnClickBtnDetailCallback = this.UOe, e
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [4, this.ilo],
      [5, this.nlo]
    ]
  }
  async OnBeforeStartAsync() {
    this.OVc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.Bqe), this.clo = new RogueBattleTopPanel_1.RogueBattleTopPanel;
    var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (t) {
      t.UpdateViewFunc = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
        this.OVc?.DeselectCurrentGridProxy(), this.OVc?.RefreshByDataAsync(e.GetGainDataList(), !0), this.GetButton(4).SetSelfInteractive(!1)
      };
      var i = t.Data.rE1.W_1.Lm1,
        a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
      let e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i).FormationRoleCard;
      a && -1 !== (i = a.GetRoleSkinId()) && (a = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i), e = a.FormationRoleCard), this.SetTextureByPath(e, this.GetTexture(1)), this.GetButton(4).SetSelfInteractive(!1), await Promise.all([this.OVc.RefreshByDataAsync(t.Data.rE1.QEc.fIc), this.clo.CreateByActorAsync(this.GetItem(0).GetOwner())]), this.AddChild(this.clo), this.clo.SetCloseBtnActive(!1)
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length) return (this.OVc?.GetLayoutItemByIndex(0))?.GetGuideUiItemAndUiItemForShowEx(e)
  }
}
exports.RogueBattleRoleBuffSelectView = RogueBattleRoleBuffSelectView;
//# sourceMappingURL=RogueBattleRoleBuffSelectView.js.map