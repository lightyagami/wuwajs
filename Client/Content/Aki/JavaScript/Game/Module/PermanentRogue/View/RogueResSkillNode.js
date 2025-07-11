"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResSkillNode = undefined;
const UE = require("ue");
const RogueResSortById_1 = require("../../../../Core/Define/ConfigQuery/RogueResSortById");
const RogueResTalentTreeDescById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeDescById");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueResSkillLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite]];
  }
  Refresh(e, t, s) {
    if (e) {
      this.GetSprite(4).SetColor(UE.Color.FromHex("AA9B6AFF"));
    } else {
      this.GetSprite(4).SetColor(UE.Color.FromHex("43434380"));
    }
    this.GetItem(0).SetUIActive(t === 0);
    this.GetItem(3).SetUIActive(s === 1 && t === 1);
    this.GetItem(2).SetUIActive(s === 1 && t === -1);
  }
}
class RogueResSkillNode extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, s) {
    super();
    this.Data = undefined;
    this.PreItem = undefined;
    this.LineComponentList = [];
    this.GridPanelItem = undefined;
    this.OnToggleStateChange = e => {
      if (e === 1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResSelectSkill, this);
      }
    };
    this.Data = t;
    this.PreItem = e;
    this.GridPanelItem = s;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [11, UE.UIExtendToggle], [12, UE.UIItem]];
  }
  OnStart() {
    this.GetExtendToggle(11).OnStateChange.Add(this.OnToggleStateChange);
    this.GetExtendToggle(11).bLockStateOnSelect = true;
  }
  Refresh(e) {
    this.Data = e ?? this.Data;
    e = this.RootItem.GetOwner().GetAttachParentActor().GetComponentByClass(UE.UIItem.StaticClass());
    const h = e.GetWidth();
    const o = e.GetHeight();
    const n = this.GetItem(4).GetAnchorOffsetX();
    const r = (h / 2 - n) * 2;
    const u = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(this.Data.Id);
    e = u === this.Data.Consule.length;
    const a = RogueResSortById_1.configRogueResSortById.GetConfig(this.Data.Id);
    for (let i = 0; i < a.PostId.length; i++) {
      var t = RogueResSortById_1.configRogueResSortById.GetConfig(a.PostId[i]);
      const E = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(a.PostId[i]);
      const U = t.Row - a.Row;
      t = this.GetOutPosItem(U);
      if (this.LineComponentList[i] === undefined) {
        LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_RoguelikeSkillLine", t).then(e => {
          const t = new RogueResSkillLine();
          var s = e.GetComponentByClass(UE.UIItem.StaticClass());
          if (U == 0) {
            s.SetWidth(r);
          } else {
            s.SetWidth(Math.sqrt(h * h + o * o) - n * 2);
          }
          s.SetAnchorOffsetX(0);
          t.CreateThenShowByActorAsync(e).then(() => {
            t.Refresh(u > 0 && E > 0, U, a.Row);
          });
          this.LineComponentList[i] = t;
        });
      } else {
        this.LineComponentList[i].Refresh(u > 0 && E > 0, U, a.Row);
      }
    }
    var s = RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(this.Data.Describe);
    var i = RogueResThemeById_1.configRogueResThemeById.GetConfig(this.Data.SeasonId);
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(i.SkillItem) >= this.Data.Consule[u];
    this.SetSpriteByPath(s.TalentIcon, this.GetSprite(9), false);
    if (ModelManager_1.ModelManager.ActivityPermanentRogueModel?.SelectSkillId === this.Data.Id) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResSelectSkill, this);
    }
    if (u < 0) {
      this.GetItem(6).SetUIActive(true);
      this.GetItem(7).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      this.GetItem(10).SetUIActive(false);
      this.GetItem(12).SetUIActive(true);
      this.GetSprite(9).SetColor(UE.Color.FromHex("808080"));
    } else {
      if (u === 0) {
        this.GetItem(6).SetUIActive(true);
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(false);
        this.GetItem(10).SetUIActive(i);
      } else {
        this.GetItem(6).SetUIActive(false);
        this.GetItem(7).SetUIActive(!e);
        this.GetItem(8).SetUIActive(e);
        this.GetItem(10).SetUIActive(!e && i);
      }
      this.GetItem(12).SetUIActive(false);
      this.GetSprite(9).SetColor(UE.Color.FromHex("FFFFFF"));
    }
  }
  GetOutPosItem(e) {
    if (e > 0) {
      return this.GetItem(5);
    } else if (e < 0) {
      return this.GetItem(3);
    } else {
      return this.GetItem(4);
    }
  }
  SetToggleState(e) {
    this.GetExtendToggle(11).SetToggleState(e, false);
  }
}
exports.RogueResSkillNode = RogueResSkillNode;
//# sourceMappingURL=RogueResSkillNode.js.map