"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerHeadItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerHpItem_1 = require("./GuessJokerHpItem");
class GuessJokerHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleData = undefined;
    this.Q2f = undefined;
    this.gQl = false;
    this.wmo = -1;
    this.Z8g = false;
    this.$pt = undefined;
    this.y9g = undefined;
    this.pDg = new Map();
    this.Mxe = e => {
      var i = this.pDg.get(e);
      if (i) {
        i();
        this.pDg.delete(e);
      }
    };
    this.K2f = () => new GuessJokerHpItem_1.GuessJokerHpItem();
    this._Cu = () => {
      var e;
      if (this.gQl || this.YLe) {
        if ((e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(this.wmo)) && (e = e.HelpId)) {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
        }
      } else if (!this.Z8g) {
        e = !this.GetItem(13).bIsUIActive;
        this.ShowLockSkillTips(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UISprite], [12, UE.UITexture], [13, UE.UIItem]];
    this.BtnBindInfo = [[10, this._Cu]];
  }
  OnStart() {
    this.Q2f = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.K2f, this.GetItem(3).GetOwner());
    this.GetItem(6).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.y9g = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(10).RootUIComp);
    this.$pt.BindSequenceCloseEvent(this.Mxe);
    this.y9g.BindSequenceCloseEvent(this.Mxe);
  }
  SetRoleData(e) {
    this.RoleData = e;
    this.InitView();
  }
  get Hp() {
    return this.RoleData?.GetHp() ?? 0;
  }
  InitView() {
    if (this.RoleData) {
      var i = this.RoleData.GetPlayerType();
      let e = 0;
      e = i === 0 ? ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() : ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleId();
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      if (i) {
        this.SetRoleIcon(i.RoleHeadIconCircle, this.GetTexture(1), e);
      }
      var i = ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsFinish;
      this.SetSkillUnlock(i);
      var t = new Array(this.RoleData?.GetMaxHp() ?? 0).fill(false);
      var s = this.RoleData?.GetHp() ?? 0;
      for (let e = 0; e < s; e++) {
        t[e] = true;
      }
      this.Q2f.RefreshByData(t);
      this.GetItem(5).SetUIActive(false);
    }
  }
  UpdateHp(e) {
    let i = "PlayerHit";
    if (this.YLe) {
      i = "MeHit";
    }
    this.PlayHeadSequence(i, () => {
      var i = new Array(this.RoleData?.GetMaxHp() ?? 0).fill(false);
      var t = this.RoleData?.GetHp() ?? 0;
      for (let e = 0; e < t; e++) {
        i[e] = true;
      }
      this.Q2f.RefreshByData(i);
      if (t <= 0) {
        this.PlayHeadSequence("Kill", e);
      } else {
        e?.();
      }
    });
  }
  SetSkillUnlock(e) {
    e = (this.gQl = e) || this.YLe;
    if (e) {
      this.e3g();
    }
    this.GetSprite(11).SetUIActive(!e);
    this.GetTexture(12).SetUIActive(e);
    if (e) {
      this.ShowLockSkillTips(false);
    }
  }
  e3g() {
    if (this.RoleData) {
      var i = this.RoleData.GetPlayerType();
      let e = -1;
      e = i === 0 ? GuessJokerDefine_1.GUESS_JOKER_PLAYER_SKILL_ID : ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetAiSkillId();
      this.wmo = e;
      i = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(e);
      if (i) {
        this.SetSpriteByPath(i.WhiteSkillIconPath, this.GetSprite(12), false);
      }
    }
  }
  PlayHeadSequence(e, i) {
    this.$pt?.PlaySequencePurely(e);
    if (i) {
      this.pDg.set(e, i);
    }
  }
  SetSelfRound(e) {
    if (e) {
      this.GetItem(5).SetUIActive(true);
      this.PlayHeadSequence("Sle");
    } else {
      this.PlayHeadSequence("Unsle", () => {
        this.GetItem(5).SetUIActive(false);
      });
    }
  }
  S9g(e, i) {
    this.y9g?.PlaySequencePurely(e);
    if (i) {
      this.pDg.set(e, i);
    }
  }
  SetDialogueText(e) {
    if (this.YLe) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
    }
  }
  SetDialogueItemActive(e, i) {
    if (this.YLe) {
      if (e) {
        this.GetItem(8).SetUIActive(true);
        this.PlayHeadSequence("WordShow", i);
      } else {
        this.PlayHeadSequence("WordHide", () => {
          this.GetItem(8).SetUIActive(false);
          i?.();
        });
      }
    }
  }
  ShowLockSkillTips(e) {
    if (!this.Z8g) {
      this.Z8g = true;
      if (e) {
        this.GetItem(13).SetUIActive(true);
        this.Z8g = false;
        this.S9g("TipsShow");
      } else {
        this.Z8g = false;
        this.S9g("TipsHide", () => {
          this.GetItem(13).SetUIActive(false);
        });
      }
    }
  }
  get YLe() {
    return this.RoleData?.GetPlayerType() === 0;
  }
}
exports.GuessJokerHeadItem = GuessJokerHeadItem;
//# sourceMappingURL=GuessJokerHeadItem.js.map