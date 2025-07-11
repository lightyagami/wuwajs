"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueInfoOverview = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhantomSelectItem_1 = require("./PhantomSelectItem");
const RoleSelectItem_1 = require("./RoleSelectItem");
class RogueInfoOverview extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.PhantomItem = undefined;
    this.RoleItem = undefined;
    this.AttributeItemList = [];
    this.UiViewSequence = undefined;
    this.Rho = () => {
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
      if (e.length <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Roguelike", 34, "肉鸽界面打开属性面板，找不到主控的角色");
        }
      } else {
        e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e[0].GetConfigId);
        UiManager_1.UiManager.OpenView("RogueAttributeDetailView", e.GetShowAttrList());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.Rho]];
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    this.RoleItem = new RoleSelectItem_1.RoleSelectItem();
    await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.PhantomItem = new PhantomSelectItem_1.PhantomSelectItem(false);
    await this.PhantomItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.PhantomItem?.Update(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry);
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguePhantomConfig(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry.ConfigId);
    this.PhantomItem?.GetRootItem().SetUIActive(e !== undefined);
    this.PhantomItem?.SetToggleRaycastTarget(false);
    this.RoleItem?.Update(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry);
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCharacterConfig(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.RoleEntry.ConfigId);
    this.RoleItem?.GetRootItem().SetUIActive(e !== undefined);
    this.Uho();
  }
  Uho() {
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    var r = this.GetItem(2);
    var a = this.GetItem(3);
    var o = [];
    const n = i.length;
    for (let t = 0; t < n; ++t) {
      let e = undefined;
      e = t === 0 ? a : LguiUtil_1.LguiUtil.CopyItem(a, r);
      const l = i[t];
      const g = new AttributeItem_1.AttributeItem();
      var s = g.CreateThenShowByActorAsync(e.GetOwner()).then(() => {
        var e = {
          Id: l,
          IsRatio: false,
          CurValue: 0,
          BgActive: n > 2 && t % 2 == 0
        };
        g.Refresh(e, false, t);
      });
      this.AttributeItemList.push(g);
      o.push(s);
    }
    Promise.all(o).then(() => {
      this.UpdateAttribute();
    });
  }
  UpdateAttribute() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    if (e.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 8, "肉鸽属性展示面板, 找不到主控角色实体!");
      }
    } else {
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e[0].GetConfigId);
      var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
      for (let e = 0; e < this.AttributeItemList.length; ++e) {
        var r = this.AttributeItemList[e];
        var a = i[e];
        var a = t.GetShowAttributeValueById(a);
        r.SetCurrentValue(a);
        r.SetActive(true);
      }
    }
  }
  RefreshPanel() {
    this.RoleItem?.RefreshPanel();
    this.PhantomItem?.RefreshPanel();
  }
}
exports.RogueInfoOverview = RogueInfoOverview;
//# sourceMappingURL=RogueInfoOverview.js.map