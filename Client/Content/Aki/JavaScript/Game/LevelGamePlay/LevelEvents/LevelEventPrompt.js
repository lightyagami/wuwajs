"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPrompt = undefined;
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const GameplayViewDefine_1 = require("../../../Game/Module/LevelPlay/GameplayView/GameplayViewDefine");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../Module/Activity/ActivityControllerHolder");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPrompt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, i) {
    var t = e;
    if (t) {
      if (i.Type === 3) {
        i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(i.LevelPlayId);
        if (i && i.OnlineType === "Hang" && ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          return;
        }
      }
      var o = t.TipOption;
      if (o) {
        let e = undefined;
        let i = undefined;
        let r = 0;
        let a = undefined;
        let n = undefined;
        switch (o.Type) {
          case IAction_1.ECommonTipType.TipId:
            a = o.Id;
            r = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(a).TypeId;
            e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(a).TipsText);
            break;
          case IAction_1.ECommonTipType.ChallengeFail:
            e = o.TidMainText;
            r = 4;
            break;
          case IAction_1.ECommonTipType.ChallengeCondition:
            e = o.TidMainText;
            i = o.TidSubText;
            r = 0;
            break;
          case IAction_1.ECommonTipType.ChallengeSuccess:
            e = o.TidMainText;
            r = 3;
            break;
          case IAction_1.ECommonTipType.GeneralFloatingTip:
            e = o.TidMainText;
            r = 9;
            break;
          case IAction_1.ECommonTipType.MissionComplete:
            e = o.TidMainText;
            i = o.TidSubText;
            r = 7;
            break;
          case IAction_1.ECommonTipType.ReachChallenge:
            e = o.TidMainText;
            r = 5;
            break;
          case IAction_1.ECommonTipType.TriggerDelegation:
            e = o.TidMainText;
            i = o.TidSubText;
            r = 6;
            break;
          case IAction_1.ECommonTipType.PrepareCountdown:
            r = 13;
            break;
          case IAction_1.ECommonTipType.EnterInRange:
            var l = o.TidText;
            if (l) {
              (_ = new GameplayViewDefine_1.GameplayEnterViewData()).InfoId = "GameplayEnter";
              _.TitleId = l;
              UiManager_1.UiManager.OpenView("GameplayEnterView", _);
              return;
            } else {
              return undefined;
            }
          case IAction_1.ECommonTipType.FirstComplete:
            l = o.TidText;
            if (l) {
              (_ = new GameplayViewDefine_1.GameplayFirstPassViewData()).InfoId = "GameplayFirstPass";
              _.TitleId = l;
              UiManager_1.UiManager.OpenView("GameplayFirstPassView", _);
              return;
            } else {
              return undefined;
            }
          case IAction_1.ECommonTipType.RemainStarWarning:
            r = 18;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.DreamlessWarning:
            r = 20;
            var _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.PunishReport:
            l = o;
            UiManager_1.UiManager.OpenView("PunishReportView", l);
            return;
          case IAction_1.ECommonTipType.GreatSwordChallenge:
            _ = o;
            UiManager_1.UiManager.OpenView("GreatSwordOpenTipsView", _);
            return;
          case IAction_1.ECommonTipType.WhiteCatWarning:
            r = 22;
            l = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(l);
            break;
          case IAction_1.ECommonTipType.BlackCatWarning:
            r = 23;
            _ = o.WarningText;
            n = new LguiUtil_1.TableTextArgNew(_);
            break;
          case IAction_1.ECommonTipType.SlashAndTowerTip:
            l = o.WarningText;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerBattleTip, l);
            return;
          case IAction_1.ECommonTipType.BadBuKingChallengeTip:
            _ = o.WarningText;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowBadDangoTip, _);
            return;
          case IAction_1.ECommonTipType.MoraleAreaTip:
            l = {
              AreaId: o.AreaType
            };
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(31, undefined, undefined, [PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidAreaNameText)], [PublicUtil_1.PublicUtil.GetConfigTextByKey(o.TidRecommendText)], undefined, undefined, l);
            return;
          case IAction_1.ECommonTipType.NightmareLord:
            r = 32;
            e = o.TidMainText;
            i = o.TidSubText;
            break;
          case IAction_1.ECommonTipType.NightmareSpawnPoint:
            r = 33;
            e = o.TidMainText;
            i = o.TidSubText;
            break;
          case IAction_1.ECommonTipType.PhotographicTip:
            e = o.MainText;
            ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController?.ShowFightPhotoTips(e);
            return;
          default:
            return;
        }
        e = e && PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
        i = i && PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(r, n, undefined, [e], [i], a, undefined, undefined, t.Duration, false, t.Token);
      } else {
        i = e.GeneralTextId;
        t = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(i).TypeId;
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(t, undefined, undefined, undefined, undefined, i);
      }
    }
  }
}
exports.LevelEventPrompt = LevelEventPrompt;
//# sourceMappingURL=LevelEventPrompt.js.map