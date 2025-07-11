"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueGridEvent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SPECIAL_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeStar_Start_Color.NS_Fx_LGUI_RouGeStar_Start_Color";
const NORMAL_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeStar_Start.NS_Fx_LGUI_RouGeStar_Start";
const SPECIAL_SPRITE_PATH = "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventVfx2.SP_EventVfx2";
const NORMAL_SPRITE_PATH = "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventVfx1.SP_EventVfx1";
const SPECIAL_NIAGARA_COLOR = "FFFFFFFF";
const STAR_MAX_COUNT = 3;
const LOW_LEVEL_COLOR = "c25757";
const SKIP_LEVEL_COLOR = "5cc35e";
const starSpriteMap = new Map([[1, "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar1.SP_EventStar1"], [2, "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar2.SP_EventStar2"], [3, "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar3.SP_EventStar3"]]);
class MapRogueGridEvent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.WN1 = -1;
    this.LevelSequencePlayer = undefined;
    this.kvu = () => {
      this.RefreshLv();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIText]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.OnAddEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResTeamLvChange, this.kvu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResTeamLvChange, this.kvu);
  }
  async OnHideAsyncImplementImplement() {
    var e;
    if (this.Pe && ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().EventDisappearEventType.includes(this.Pe.EventType)) {
      e = new CustomPromise_1.CustomPromise();
      await this.LevelSequencePlayer.PlaySequenceAsync("EventComplete", e);
    }
  }
  OnBeforeDestroy() {
    this.OnRemoveEventListener();
  }
  Refresh(e) {
    var t;
    if (this.WN1 !== e.GridEventId && (this.Pe = e, this.WN1 = e.GridEventId, e = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(e.GridEventId)) && (t = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueResEventCueByType(e.Fx))) {
      if (t.IsSpecial) {
        this.n91();
      } else {
        this.s91(t.FxColor, t.SpriteColor);
      }
      this.SetTextureShowUntilLoaded(t.IconPath, this.GetTexture(1));
      this.aqe(e.Star > 0, e.Star);
      this.RefreshLv();
    }
  }
  n91() {
    const e = this.GetSprite(2);
    const t = this.GetSprite(3);
    var i = this.GetUiNiagara(0);
    this.SetNiagaraSystemByPath(SPECIAL_NIAGARA_PATH, i);
    i.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(SPECIAL_NIAGARA_COLOR));
    i.SetUIActive(true);
    this.SetSpriteByPath(SPECIAL_SPRITE_PATH, e, false, undefined, () => {
      e.SetUIActive(true);
    });
    this.SetSpriteByPath(SPECIAL_SPRITE_PATH, t, false, undefined, () => {
      t.SetUIActive(true);
    });
  }
  s91(e, t) {
    var i = this.GetSprite(2);
    var s = this.GetSprite(3);
    var r = this.GetUiNiagara(0);
    var _ = !StringUtils_1.StringUtils.IsEmpty(e);
    if (_) {
      this.SetNiagaraSystemByPath(NORMAL_NIAGARA_PATH, r);
      r.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(UE.Color.FromHex(e));
    }
    r.SetUIActive(_);
    var e = !StringUtils_1.StringUtils.IsEmpty(t);
    if (e) {
      this.SetSpriteByPath(NORMAL_SPRITE_PATH, i, false);
      this.SetSpriteByPath(NORMAL_SPRITE_PATH, s, false);
      i.SetColor(UE.Color.FromHex(t));
      s.SetColor(UE.Color.FromHex(t));
    }
    i.SetUIActive(e);
    s.SetUIActive(e);
  }
  aqe(e, t) {
    var i = this.GetSprite(4);
    if (e) {
      t = Math.min(STAR_MAX_COUNT, t);
      this.SetSpriteByPath(starSpriteMap.get(t), i, false);
    }
    i.SetUIActive(e);
  }
  Dxu(e, t, i, s) {
    this.GetItem(5).SetUIActive(e);
    if (e) {
      this.GetText(6).SetChangeColor(i, UE.Color.FromHex(s));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "RogueRes_MapPointLvl", t);
    }
  }
  RefreshLv(e = true) {
    var t;
    if (this.Pe) {
      if ((t = ModelManager_1.ModelManager.MapRogueModel.GameInfo).IsOverEventRecommendLv(this.Pe.GridIndex)) {
        if (t.IsGridCanSkipBattle(this.Pe.GridIndex)) {
          this.Dxu(this.Pe.Lv > 0 && e, this.Pe.Lv, true, SKIP_LEVEL_COLOR);
        } else {
          this.Dxu(this.Pe.Lv > 0 && e, this.Pe.Lv, false, SKIP_LEVEL_COLOR);
        }
      } else {
        this.Dxu(this.Pe.Lv > 0 && e, this.Pe.Lv, true, LOW_LEVEL_COLOR);
      }
    }
  }
  SetVision(e) {
    this.SetActive(e);
  }
}
exports.MapRogueGridEvent = MapRogueGridEvent;
//# sourceMappingURL=MapRogueGridEvent.js.map