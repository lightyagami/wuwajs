"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExitSkillItem = exports.ExitSkillItemData = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const EditFormationDefine_1 = require("../../EditFormationDefine");
class ExitSkillItemData {
  constructor() {
    this.RoleId = undefined;
    this.OnlineIndex = undefined;
    this.PlayerId = undefined;
  }
}
exports.ExitSkillItemData = ExitSkillItemData;
class ExitSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.dFe = undefined;
    this.j8 = undefined;
    this.R5t = false;
    this.SPe = undefined;
    this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [4, UE.UITexture], [3, UE.UITexture], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIHorizontalLayout], [14, UE.UIItem], [15, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var i = {
      UiText: this.GetText(10),
      ViewType: 0,
      Group: 2,
      ReportType: 6
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(i);
  }
  OnBeforeDestroy() {
    this.dFe = undefined;
    this.j8 = undefined;
    this.R5t = false;
    this.SPe?.Clear();
    this.SPe = undefined;
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(10));
  }
  Refresh(i, e) {
    var t = i?.RoleId;
    var r = i?.PlayerId;
    if (t) {
      this.U5t(t, i.OnlineIndex, r, e);
    } else {
      this.A5t(false);
    }
    let s = false;
    if (!!this.R5t && (this.dFe !== t || this.j8 !== r)) {
      s = true;
    }
    this.dFe = t;
    this.j8 = r;
    this.R5t = true;
    if (s) {
      this.SPe.PlayLevelSequenceByName("Switch");
    }
  }
  U5t(e, t, r, s) {
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (o) {
      this.A5t(true);
      var a = o.FormationRoleCard;
      this.SetRoleIcon(a, this.GetTexture(2), e);
      this.SetRoleIcon(a, this.GetTexture(3), e);
      this.SetRoleIcon(a, this.GetTexture(4), e);
      var a = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(o.SkillId);
      let i = undefined;
      for (const l of a) {
        if (l.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
          i = l;
          break;
        }
      }
      if (i) {
        this.SetSpriteByPath(i.Icon, this.GetSprite(7), false);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.SkillName);
        if (s) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.MultiSkillDescribe, ...i.MultiSkillDetailNum);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.SkillDescribe, ...i.SkillDetailNum);
        }
      }
      if (t) {
        this.GetSprite(5).SetUIActive(true);
        let i = undefined;
        i = r === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ? EditFormationDefine_1.SELF_ONLINE_INDEX : EditFormationDefine_1.OTHER_ONLINE_INDEX;
        e = StringUtils_1.StringUtils.Format(i, t.toString());
        o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
        this.SetSpriteByPath(o, this.GetSprite(5), false);
      } else {
        this.GetSprite(5).SetUIActive(false);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 48, "ExitSkillItem,找不到角色配置");
    }
  }
  A5t(i) {
    this.GetItem(0).SetUIActive(i);
    this.GetItem(1).SetUIActive(i);
    this.GetItem(6).SetUIActive(!i);
    this.GetSprite(7).SetUIActive(i);
    this.GetItem(11).SetUIActive(i);
    this.GetItem(12).SetUIActive(i);
    this.GetText(8).SetUIActive(i);
    this.GetText(10).SetUIActive(i);
    var e = this.GetText(15);
    e.SetUIActive(!i);
    if (!i) {
      LguiUtil_1.LguiUtil.SetLocalText(e, "EditBattleTeamEmpty");
    }
  }
}
exports.ExitSkillItem = ExitSkillItem;
//# sourceMappingURL=ExitSkillItem.js.map