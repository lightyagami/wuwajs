"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTeamInfoPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const RoleController_1 = require("../../RoleUi/RoleController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueInfoViewRoleItem_1 = require("./WeeklyRogueInfoViewRoleItem");
class WeeklyRogueTeamInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleListLayout = undefined;
    this.AttributeItemList = [];
    this.uyi = () => {
      var e = new WeeklyRogueInfoViewRoleItem_1.WeeklyRogueInfoViewRoleItem();
      e.OnSelectedCallback = this.b5t;
      return e;
    };
    this.b5t = e => {
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      if (t.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 34, "肉鸽属性展示面板, 找不到主控角色实体!");
        }
      } else {
        t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t[e].GetConfigId);
        RoleController_1.RoleController.OnSelectedRoleChange(t.GetRoleConfig().Id, t.GetRoleSkinId());
        this.RoleListLayout?.SelectGridProxy(e, false);
        this.UpdateAttribute();
      }
    };
    this.nlo = () => {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      if (e.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("WeeklyRogue", 34, "肉鸽属性展示面板, 找不到主控角色实体!");
        }
      } else {
        e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e[this.RoleListLayout.GetSelectedGridIndex()].GetConfigId);
        UiManager_1.UiManager.OpenView("RogueAttributeDetailView", e.GetShowAttrList());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.nlo]];
  }
  async OnBeforeStartAsync() {
    this.RoleListLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.uyi);
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems().map(e => e.GetConfigId);
    await this.RoleListLayout.RefreshByDataAsync(e);
    await this.Uho();
    this.RoleListLayout.SelectGridProxy(0, true);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData.GetCycleConfig();
    if (e && e.BuffPR !== 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.BuffDesc, ...e.BuffDescParam);
    }
  }
  async Uho() {
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    var o = this.GetItem(1);
    var r = this.GetItem(2);
    var a = [];
    const n = i.length;
    for (let t = 0; t < n; ++t) {
      let e = undefined;
      e = t === 0 ? r : LguiUtil_1.LguiUtil.CopyItem(r, o);
      const s = i[t];
      const u = new AttributeItem_1.AttributeItem();
      var l = u.CreateThenShowByActorAsync(e.GetOwner()).then(() => {
        var e = {
          Id: s,
          IsRatio: false,
          CurValue: 0,
          BgActive: n > 2 && t % 2 == 0
        };
        u.Refresh(e, false, t);
      });
      this.AttributeItemList.push(u);
      a.push(l);
    }
    await Promise.all(a);
  }
  UpdateAttribute() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    if (e.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WeeklyRogue", 34, "肉鸽属性展示面板, 找不到主控角色实体!");
      }
    } else {
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e[this.RoleListLayout.GetSelectedGridIndex()].GetConfigId);
      var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
      for (let e = 0; e < this.AttributeItemList.length; ++e) {
        var o = this.AttributeItemList[e];
        var r = i[e];
        var r = t.GetShowAttributeValueById(r);
        o.SetCurrentValue(r);
        o.SetActive(true);
      }
    }
  }
}
exports.WeeklyRogueTeamInfoPanel = WeeklyRogueTeamInfoPanel;
//# sourceMappingURL=WeeklyRogueTeamInfoPanel.js.map