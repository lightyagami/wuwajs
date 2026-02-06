"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillBranchTipsItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleSkillBranchTipsContentItem_1 = require("./RoleSkillBranchTipsContentItem");
class RoleSkillBranchTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AZs = undefined;
    this.SPe = undefined;
    this.p_g = false;
    this.Bqe = () => new RoleSkillBranchTipsContentItem_1.RoleSkillBranchTipsContentItem();
    this.owt = e => {
      if (e === "Start") {
        this.GetRootItem().SetUIActive(true);
      }
    };
    this.yct = e => {
      if (e === "Close") {
        this.GetRootItem().SetUIActive(false);
      }
    };
  }
  get IsTipsVisible() {
    return this.p_g;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceStartEvent(this.owt);
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.AZs = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe);
  }
  RefreshView(e, i = true) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchId(e);
    var s = [];
    for (const n of ConfigManager_1.ConfigManager.RoleConfig.GetRoleBranchList(e)) {
      var r = {
        IconPath: n.Icon,
        TitleKey: n.Name,
        DescKey: n.Desc,
        IsHighlight: i && n.Id === t
      };
      s.push(r);
    }
    this.AZs.RefreshByData(s);
  }
  SetTipsVisible(e, i = true) {
    this.p_g = e;
    if (i) {
      this.SPe.StopCurrentSequence(false, true);
      if (e) {
        this.SPe.PlayLevelSequenceByName("Start");
      } else {
        this.SPe.PlayLevelSequenceByName("Close");
      }
    } else {
      this.GetRootItem().SetUIActive(e);
    }
  }
}
exports.RoleSkillBranchTipsItem = RoleSkillBranchTipsItem;
//# sourceMappingURL=RoleSkillBranchTipsItem.js.map