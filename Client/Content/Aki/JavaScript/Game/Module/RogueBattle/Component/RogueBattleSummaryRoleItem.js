"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSummaryRoleItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueBattleMapRoleListGrid_1 = require("./RogueBattleMapRoleListGrid");
class RogueBattleSummaryRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Spt = undefined;
    this.AttributeItemList = [];
    this.I2i = () => {
      return new RogueBattleMapRoleListGrid_1.RogueBattleMapRoleLayoutGrid();
    };
    this.zb1 = () => {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0];
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.GetConfigId);
      UiManager_1.UiManager.OpenView("RoleAttributeDetailView", e.GetShowAttrList());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[3, this.zb1]];
  }
  OnStart() {
    this.Spt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.I2i);
    this.Uho();
  }
  OnBeforeShow() {
    this.UpdateAttribute();
    this.Jb1();
  }
  OnBeforeHide() {}
  OnBeforeDestroy() {
    this.Spt = undefined;
    for (const e of this.AttributeItemList) {
      e.Destroy();
    }
    this.AttributeItemList = [];
  }
  Jb1() {
    var t = [];
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    var r = [i[0].GetConfigId];
    for (let e = 1; e < i.length; e++) {
      var a = {
        ConfigId: i[e].GetConfigId,
        IsGain: true,
        NeedLevel: false
      };
      t.push(a);
      r.push(i[e].GetConfigId);
    }
    ModelManager_1.ModelManager.RogueBattleModel.SummaryRoleList = r;
    this.Spt?.RefreshByData(t);
  }
  Uho() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    var i = this.GetItem(1);
    var r = this.GetItem(2);
    let a = undefined;
    var o = t.length;
    for (let e = 0; e < o; ++e) {
      a = e === 0 ? r : LguiUtil_1.LguiUtil.CopyItem(r, i);
      var s = t[e];
      var l = new AttributeItem_1.AttributeItem();
      l.CreateThenShowByActor(a.GetOwner());
      l.UpdateParam(s, false);
      if (o > 2 && e % 2 == 0) {
        l.SetBgActive(true);
      } else {
        l.SetBgActive(false);
      }
      this.AttributeItemList.push(l);
    }
  }
  UpdateAttribute() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0];
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.GetConfigId);
    for (let e = 0; e < this.AttributeItemList.length; ++e) {
      var r = this.AttributeItemList[e];
      var a = t[e];
      var a = i.GetShowAttributeValueById(a);
      r.SetCurrentValue(a);
      r.SetActive(true);
    }
  }
}
exports.RogueBattleSummaryRoleItem = RogueBattleSummaryRoleItem;
//# sourceMappingURL=RogueBattleSummaryRoleItem.js.map