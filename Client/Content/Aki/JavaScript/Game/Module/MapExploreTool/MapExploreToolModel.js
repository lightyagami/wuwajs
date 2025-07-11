"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreToolModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class MapExploreToolModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.BAi = new Map();
    this.bAi = new Map();
    this.tml = new Map();
    this.qAi = new Map();
    this.GAi = new Map();
    this.NAi = false;
    this.OAi = new Map();
    this.kAi = e => {
      switch (e.MarkType) {
        case 15:
          var o = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e.MarkType) ?? 0;
          this.SetToolPlaceNum(1010, o, true);
          break;
        case 17:
          o = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e.MarkType) ?? 0;
          this.SetToolPlaceNum(1012, o, true);
          break;
        case 16:
        case 21:
          var o = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(16) ?? 0;
          var t = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(21) ?? 0;
          this.SetToolPlaceNum(1011, o + t, true);
      }
    };
    this.FAi = (e, o) => {
      switch (e) {
        case 15:
          var t = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
          this.SetToolPlaceNum(1010, t, false);
          break;
        case 17:
          t = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(e) ?? 0;
          this.SetToolPlaceNum(1012, t, false);
          break;
        case 16:
        case 21:
          var t = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(16) ?? 0;
          var r = ModelManager_1.ModelManager.MapModel?.GetMarkCountByType(21) ?? 0;
          this.SetToolPlaceNum(1011, t + r, false);
      }
    };
  }
  OnInit() {
    this.BAi.set(210015, 1010);
    this.BAi.set(210016, 1011);
    this.BAi.set(210017, 1012);
    this.bAi.set(1010, new Map([[Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerNotInBigWorld, "ExplorePositionError"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrInFighting, "ExploreFighting"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotHostPlayer, "OnylHostUse"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrConsumeNotEnough, "ExploreTeleporterItemLack"]]));
    this.bAi.set(1011, new Map([[Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerNotInBigWorld, "ExplorePositionError"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrInFighting, "ExploreFighting"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotHostPlayer, "OnylHostUse"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotHaveCountryAccess, "ExploreUnauthorized"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect, "ShengXiaDetectTip"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNoSoundBox, "Exolore_ShengXiaNoDetect"], [Protocol_1.Aki.Protocol.Q4n.Proto_SoundBoxExploreFull, "ExploreShengXiaCollectAll"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrConsumeNotEnough, "ExploreShengXiaItemLack"]]));
    this.bAi.set(1012, new Map([[Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerNotInBigWorld, "ExplorePositionError"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrInFighting, "ExploreFighting"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotHostPlayer, "OnylHostUse"], [Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotHaveCountryAccess, "ExploreUnauthorized"]]));
    this.tml.set(1010, "ExploreTeleporterItemLack");
    this.tml.set(1011, "ExploreShengXiaItemLack");
    this.qAi.set(1011, new Set([Protocol_1.Aki.Protocol.Q4n.KRs, Protocol_1.Aki.Protocol.Q4n.Proto_ErrSkillIsEffect]));
    this.qAi.set(1012, new Set([Protocol_1.Aki.Protocol.Q4n.KRs, Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreasureBoxAllActive]));
    this.qAi.set(1010, new Set([Protocol_1.Aki.Protocol.Q4n.KRs]));
    this.GAi.set(1011, new Set([Protocol_1.Aki.Protocol.Q4n.Proto_ExploreToolNotConfirm]));
    this.GAi.set(1012, new Set([Protocol_1.Aki.Protocol.Q4n.Proto_ExploreToolNotConfirm, Protocol_1.Aki.Protocol.Q4n.Proto_ErrTreasureBoxAllActive]));
    this.GAi.set(1010, new Set([Protocol_1.Aki.Protocol.Q4n.Proto_ExploreToolNotConfirm]));
    this.NAi = false;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateMapMark, this.kAi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveMapMark, this.FAi);
    return true;
  }
  OnClear() {
    this.BAi.clear();
    this.bAi.clear();
    this.tml.clear();
    this.qAi.clear();
    this.OAi.clear();
    this.NAi = false;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateMapMark, this.kAi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveMapMark, this.FAi);
    return true;
  }
  OnLeaveLevel() {
    return !(this.NAi = false);
  }
  OnChangeMode() {
    return true;
  }
  GetPhantomSkillIdBySkillId(e) {
    return this.BAi.get(e);
  }
  GetRespTipsId(e, o) {
    return this.bAi.get(e.PhantomSkillId)?.get(o.Content.Cvs);
  }
  GetNotEnoughTipsId(e) {
    return this.tml.get(e.PhantomSkillId);
  }
  GetConfirmBoxId(e, o) {
    var t = o === undefined;
    switch (e.PhantomSkillId) {
      case 1010:
        if (t) {
          if (this.IsToolReachPlaceLimit(e.PhantomSkillId)) {
            return 142;
          } else {
            return 141;
          }
        } else {
          return undefined;
        }
      case 1011:
        if (t) {
          if (this.IsToolReachPlaceLimit(e.PhantomSkillId)) {
            return undefined;
          } else {
            return 139;
          }
        } else if (this.IsRespMeanCheckPass(e, o)) {
          return 139;
        } else {
          return undefined;
        }
      case 1012:
        if (t && this.IsToolReachPlaceLimit(e.PhantomSkillId)) {
          return 140;
        } else {
          return undefined;
        }
    }
  }
  ShowCostConfirmBox(e, o) {
    var t = o === undefined;
    switch (e.PhantomSkillId) {
      case 1010:
        if (t) {
          return true;
        }
        break;
      case 1011:
        if (!t && this.IsRespMeanCheckPass(e, o)) {
          return true;
        }
        break;
      case 1012:
        if (t) {
          return true;
        }
    }
    return false;
  }
  IsRespMeanSuccess(e, o) {
    return this.qAi.get(e.PhantomSkillId)?.has(o.Content.Cvs) ?? false;
  }
  IsRespMeanCheckPass(e, o) {
    return this.GAi.get(e.PhantomSkillId)?.has(o.Content.Cvs) ?? false;
  }
  SetCharExploreSkillBusy(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 设置CharExploreSkillBusy", ["OldVal", this.NAi], ["NewVal", e]);
    }
    this.NAi = e;
  }
  GetCharExploreSkillBusy() {
    return this.NAi ?? false;
  }
  GetToolPlaceLimit(e) {
    switch (e) {
      case 1010:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTempTeleporterPlaceLimit();
      case 1012:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetTreasureBoxDetectorPlaceLimit();
      case 1011:
        return ConfigManager_1.ConfigManager.RouletteConfig?.GetSoundBoxPlaceLimit();
    }
  }
  IsToolHasPlaceLimit(e) {
    return this.GetToolPlaceLimit(e) !== undefined;
  }
  IsToolReachPlaceLimit(e) {
    var o = this.GetToolPlaceLimit(e);
    return o !== undefined && !!(e = this.GetToolPlaceNum(e)) && !!(o <= e);
  }
  GetToolPlaceNum(e) {
    return this.OAi.get(e);
  }
  SetToolPlaceNum(e, o, t) {
    if (o !== this.OAi.get(e)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 39, "[MapExploreTool] 设置ToolPlaceNum", ["PhantomSkillId", e], ["PlaceNum", o]);
      }
      this.OAi.set(e, o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated, e, o);
    }
  }
}
exports.MapExploreToolModel = MapExploreToolModel;
//# sourceMappingURL=MapExploreToolModel.js.map