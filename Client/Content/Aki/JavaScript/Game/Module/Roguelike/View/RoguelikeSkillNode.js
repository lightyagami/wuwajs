"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeSkillNode = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
class RoguelikeSkillLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite]];
  }
  Refresh(e, i, t) {
    if (e) {
      this.GetSprite(4).SetColor(UE.Color.FromHex("AA9B6AFF"));
    } else {
      this.GetSprite(4).SetColor(UE.Color.FromHex("43434380"));
    }
    this.GetItem(0).SetUIActive(i === 0);
    this.GetItem(3).SetUIActive(t === 1 && i === 1);
    this.GetItem(2).SetUIActive(t === 1 && i === -1);
  }
}
class RoguelikeSkillNode extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super();
    this.Data = undefined;
    this.PreItem = undefined;
    this.LineComponentList = [];
    this.GridPanelItem = undefined;
    this.OnToggleStateChange = e => {
      if (e === 1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeSelectSkill, this);
      }
    };
    this.Data = i;
    this.PreItem = e;
    this.GridPanelItem = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [9, UE.UISprite], [10, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [11, UE.UIExtendToggle], [12, UE.UIItem]];
  }
  OnStart() {
    this.GetExtendToggle(11).OnStateChange.Add(this.OnToggleStateChange);
    this.GetExtendToggle(11).bLockStateOnSelect = true;
  }
  Refresh(e) {
    this.Data = e || this.Data;
    e = this.RootItem.GetOwner().GetAttachParentActor().GetComponentByClass(UE.UIItem.StaticClass());
    const n = e.GetWidth();
    const o = e.GetHeight();
    const r = this.GetItem(4).GetAnchorOffsetX();
    const a = (n / 2 - r) * 2;
    const i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(this.Data.Id);
    e = i === this.Data.Consule.length;
    for (let h = 0; h < this.Data.PostId.length; h++) {
      var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(this.Data.PostId[h]);
      const l = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(t.Id);
      const E = t.Row - this.Data.Row;
      t = this.GetOutPosItem(E);
      if (this.LineComponentList[h] === undefined) {
        LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_RoguelikeSkillLine", t).then(e => {
          const i = new RoguelikeSkillLine();
          var t = e.GetComponentByClass(UE.UIItem.StaticClass());
          const s = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(this.Data.Id);
          if (E == 0) {
            t.SetWidth(a);
          } else {
            t.SetWidth(Math.sqrt(n * n + o * o) - r * 2);
          }
          i.CreateThenShowByActorAsync(e).then(() => {
            i.Refresh(s > 0 && l > 0, E, this.Data.Row);
          });
          this.LineComponentList[h] = i;
        });
      } else {
        t = this.LineComponentList[h];
        const i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(this.Data.Id);
        t.Refresh(i > 0 && l > 0, E, this.Data.Row);
      }
    }
    var s = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(this.Data.Describe);
    var h = ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(RoguelikeDefine_1.SKILL_POINT_ID) >= this.Data.Consule[i];
    this.SetSpriteByPath(s.TalentIcon, this.GetSprite(9), false);
    if (ModelManager_1.ModelManager.RoguelikeModel?.SelectSkillId === this.Data.Id) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeSelectSkill, this);
    }
    if (i < 0) {
      this.GetItem(6).SetUIActive(true);
      this.GetItem(7).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      this.GetItem(10).SetUIActive(false);
      this.GetItem(12).SetUIActive(true);
      this.GetSprite(9).SetColor(UE.Color.FromHex("808080"));
    } else {
      if (i === 0) {
        this.GetItem(6).SetUIActive(true);
        this.GetItem(7).SetUIActive(false);
        this.GetItem(8).SetUIActive(false);
        this.GetItem(10).SetUIActive(h);
      } else {
        this.GetItem(6).SetUIActive(false);
        this.GetItem(7).SetUIActive(!e);
        this.GetItem(8).SetUIActive(e);
        this.GetItem(10).SetUIActive(!e && h);
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
exports.RoguelikeSkillNode = RoguelikeSkillNode;
//# sourceMappingURL=RoguelikeSkillNode.js.map