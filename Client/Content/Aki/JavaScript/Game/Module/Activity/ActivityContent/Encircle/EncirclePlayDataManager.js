"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncirclePlayDataManager = exports.LimitWall = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EncircleHexType_1 = require("../../../../../Core/Define/Config/SubType/EncircleHexType");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const EncirclePlayLevelController_1 = require("./EncirclePlayLevelController");
const EncircleUtils_1 = require("./EncircleUtils");
const LIMIT_WALL_ID = 5;
class HexMap {
  constructor() {
    this.FTg = undefined;
    this.ona = undefined;
    this.nna = undefined;
    this.HTg = {
      UpLeft: {
        PosX: -1,
        PosY: -1
      },
      UpRight: {
        PosX: 1,
        PosY: -1
      },
      Left: {
        PosX: -2,
        PosY: 0
      },
      Right: {
        PosX: 2,
        PosY: 0
      },
      DownLeft: {
        PosX: -1,
        PosY: 1
      },
      DownRight: {
        PosX: 1,
        PosY: 1
      }
    };
  }
  GetHexes() {
    return this.FTg;
  }
  SetHexes(e) {
    this.FTg = e;
  }
  Clear() {
    this.FTg = undefined;
    this.ona = undefined;
    this.nna = undefined;
  }
  GetWidth() {
    return this.ona;
  }
  GetHeight() {
    return this.nna;
  }
  SetWidth(e) {
    this.ona = e;
  }
  SetHeight(e) {
    this.nna = e;
  }
  SetHex(e, t) {
    this.FTg.set(EncircleUtils_1.EncircleUtils.HexPosToKey(e), t);
  }
  GetHex(e) {
    return this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e));
  }
  CheckCanAddObstacle(e) {
    return this.GetHex(e)?.Type === EncircleHexType_1.EncircleHexType.Plain;
  }
  CheckInTrap(e, t) {
    t = this.GetHex(t);
    if (t && t.Type === EncircleHexType_1.EncircleHexType.Trap) {
      e.BeTrapped = true;
      t.Type = EncircleHexType_1.EncircleHexType.Plain;
      this.SetHex(e.Pos, t);
    }
  }
  IsValidPos(e) {
    return e.PosX >= 0 && e.PosX < this.ona && e.PosY >= 0 && e.PosY < this.nna;
  }
  GetAllHexes() {
    return Array.from(this.FTg.values());
  }
  jTg(e) {
    return e.PosX >= 0 && e.PosX < this.ona * 2 && e.PosY >= 0 && e.PosY < this.nna;
  }
  IsBoundary(e) {
    return e.PosX === 0 || e.PosX === 1 || e.PosX === this.ona * 2 - 3 || e.PosX === this.ona * 2 - 2 || e.PosY === 0 || e.PosY === this.nna - 1;
  }
  $Tg(e) {
    return this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e))?.Type === EncircleHexType_1.EncircleHexType.Wall || this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e))?.Type === EncircleHexType_1.EncircleHexType.InitialWall || this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e))?.Type === EncircleHexType_1.EncircleHexType.DifficultyWall;
  }
  YUg(e) {
    return this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e))?.Type === EncircleHexType_1.EncircleHexType.LimitWall || this.FTg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(e))?.Type === EncircleHexType_1.EncircleHexType.Monster;
  }
  WTg(e) {
    var t = this.HTg;
    if (e === 1) {
      return [t.UpLeft, t.UpRight, t.Left, t.Right, t.DownLeft, t.DownRight];
    } else {
      return [t.DownRight, t.DownLeft, t.Right, t.Left, t.UpRight, t.UpLeft];
    }
  }
  GetOptimalEscapeRoutes(e) {
    var t = this.WTg(e.Priority);
    var e = e.Pos;
    let i = [];
    let r = [];
    var s;
    var n;
    var l;
    var o = new Map();
    var h = EncircleUtils_1.EncircleUtils.HexPosToKey(e);
    o.set(h, undefined);
    i.push(e);
    while (i.length > 0 || r.length > 0) {
      if (i.length === 0) {
        i = r;
        r = [];
      }
      s = i.shift();
      if (this.IsBoundary(s)) {
        return this.QTg(o, s);
      }
      for (const c of t) {
        n = {
          PosX: s.PosX + c.PosX,
          PosY: s.PosY + c.PosY
        };
        l = EncircleUtils_1.EncircleUtils.HexPosToKey(n);
        if (!!this.jTg(n) && !o.has(l) && !this.$Tg(n)) {
          (this.YUg(n) ? r : i).push(n);
          o.set(l, s);
        }
      }
    }
  }
  QTg(e, t) {
    var i = [];
    let r = t;
    while (r) {
      i.push(r);
      var s = EncircleUtils_1.EncircleUtils.HexPosToKey(r);
      r = e.get(s);
    }
    return i.reverse();
  }
  AddObstacle(e) {
    this.ChangeMapType(e, EncircleHexType_1.EncircleHexType.Wall);
  }
  ChangeMapType(e, t) {
    var i = this.GetHex(e);
    i.Type = t;
    this.SetHex(e, i);
  }
}
class MapMonster {
  constructor(e, t, i) {
    this.dch = undefined;
    this.KTg = undefined;
    this.XTg = false;
    this.RVg = false;
    this.cui = 1;
    this.dch = e;
    this.KTg = t;
    this.cui = i;
  }
  get Priority() {
    return this.cui;
  }
  get Pos() {
    return this.dch;
  }
  set Pos(e) {
    this.dch = e;
  }
  get BeTrapped() {
    return this.XTg;
  }
  set BeTrapped(e) {
    this.XTg = e;
  }
  get BeCaught() {
    return this.RVg;
  }
  set BeCaught(e) {
    this.RVg = e;
  }
  get MapItemId() {
    return this.KTg;
  }
  set MapItemId(e) {
    this.KTg = e;
  }
}
class LimitWall {
  constructor(e, t) {
    this.dch = undefined;
    this.YTg = 0;
    this.dch = e;
    this.YTg = t;
  }
  get Pos() {
    return this.dch;
  }
  set Pos(e) {
    this.dch = e;
  }
  get LimitRound() {
    return this.YTg;
  }
  set LimitRound(e) {
    this.YTg = e;
  }
}
exports.LimitWall = LimitWall;
class EncirclePlayDataManager {
  constructor() {
    this.JTg = new HexMap();
    this.fGg = 0;
    this.bVg = 0;
    this.NTg = [];
    this.VTg = undefined;
  }
  InitHexMap(e) {
    var i = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleMap(e);
    var r = this.ZTg(i);
    var s = i.length;
    var n = new Map();
    var l = [];
    var o = new Map();
    for (let t = 0; t < s; t++) {
      for (let e = 0; e < r; e++) {
        var h;
        var c;
        var a;
        var _ = EncircleUtils_1.EncircleUtils.PlanePosToHexPos(e, t);
        var p = this.gGg(i, t, e);
        if (p !== undefined && (a = {
          HexPos: _,
          Type: h = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetMapItemType(p),
          MapId: p
        }, c = EncircleUtils_1.EncircleUtils.HexPosToKey(_), n.set(c, a), h === EncircleHexType_1.EncircleHexType.Monster && (a = parseInt(ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetMapItemMemo(p)), l.push(new MapMonster(_, p, a))), h === EncircleHexType_1.EncircleHexType.LimitWall)) {
          a = parseInt(ConfigManager_1.ConfigManager.ActivityEncircleConfig.GetMapItemMemo(p));
          o.set(c, new LimitWall(_, a));
        }
      }
    }
    this.JTg.SetHexes(n);
    this.JTg.SetHeight(s);
    this.JTg.SetWidth(r);
    this.NTg = l;
    this.VTg = o;
    return n;
  }
  ZTg(e) {
    let t = 1;
    if (!e) {
      return 0;
    }
    while (!this.tbg(e, t)) {
      t += 1;
    }
    return t - 1;
  }
  GetLimitWall(e) {
    return this.VTg?.get(e);
  }
  tbg(e, t) {
    let i = true;
    var r = this.ibg(t);
    if (e.length <= 0) {
      return true;
    }
    if (!(r in e[0])) {
      return true;
    }
    for (const s of e) {
      if (s[r].length > 0) {
        i = false;
      }
    }
    return i;
  }
  gGg(e, t, i) {
    e = e[t][this.ibg(i + 1)];
    if (Array.isArray(e) && e.length !== 0) {
      return e[Math.min(EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentDifficulty(), e.length - 1)];
    }
  }
  ibg(e) {
    return StringUtils_1.StringUtils.Format("Column{0}", e.toString());
  }
  GetMapHeight() {
    return this.JTg.GetHeight();
  }
  GetMapWidth() {
    return this.JTg.GetWidth();
  }
  rbg(e, t) {
    return EncircleUtils_1.EncircleUtils.PlanePosToHexPos(e, t);
  }
  CheckCanAddObstacle(e, t) {
    return this.JTg.CheckCanAddObstacle(this.rbg(e, t));
  }
  Clear() {
    this.JTg.Clear();
    this.fGg = 0;
    this.bVg = 0;
  }
  TryMoveMonster() {
    let e = false;
    this.fGg = this.fGg % this.NTg.length;
    var t;
    var i = this.NTg[this.fGg];
    if (this.obg(i)) {
      e = true;
    } else {
      t = !i.BeCaught;
      i.BeCaught = true;
      if (!this.LVg()) {
        if (t) {
          EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().SetMonsterDead(i.MapItemId);
        }
        this.fGg += 1;
        e = this.TryMoveMonster();
      }
    }
    this.fGg += 1;
    return e;
  }
  LVg() {
    for (const e of this.NTg) {
      if (!e.BeCaught) {
        return false;
      }
    }
    return true;
  }
  TryShowMonsterMoveEffect() {
    if (!(this.NTg.length < 2)) {
      for (const t of this.NTg) {
        if (t.BeCaught) {
          EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ShowItemMoveEffect(t.Pos, false);
        }
      }
      let e = this.bVg % this.NTg.length;
      if (this.NTg[e].BeCaught) {
        this.bVg += 1;
        e = this.bVg % this.NTg.length;
      }
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ShowItemMoveEffect(this.NTg[e].Pos, true);
      this.bVg += 1;
    }
  }
  obg(e) {
    var t = this.JTg.GetOptimalEscapeRoutes(e);
    if (t === undefined) {
      return false;
    }
    if (EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetGmLog()) {
      var i = [];
      for (const r of t) {
        i.push(EncircleUtils_1.EncircleUtils.HexPosToPlanePos(r));
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 99, "RoutePath", ["RoutePath", i]);
      }
    }
    this.nbg(e, t);
    return true;
  }
  nbg(e, t) {
    var i = e.Pos;
    if (e.BeTrapped) {
      e.BeTrapped = false;
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(e.MapItemId, i, i);
    } else if (this.JTg.GetHex(t[1]).Type === EncircleHexType_1.EncircleHexType.LimitWall || this.JTg.GetHex(t[1]).Type === EncircleHexType_1.EncircleHexType.Monster) {
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(e.MapItemId, i, i);
    } else {
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(e.MapItemId, t[1], i);
      e.Pos = t[1];
      this.JTg.CheckInTrap(e, t[1]);
      this.JTg.ChangeMapType(t[1], EncircleHexType_1.EncircleHexType.Monster);
      if (i) {
        this.JTg.ChangeMapType(i, EncircleHexType_1.EncircleHexType.Plain);
      }
    }
  }
  AddObstacle(e, t) {
    e = EncircleUtils_1.EncircleUtils.PlanePosToHexPos(e, t);
    this.JTg.AddObstacle(e);
    EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(EncircleHexType_1.EncircleHexType.Wall, e, undefined);
  }
  CheckMonsterEscape() {
    let e = false;
    for (const t of this.NTg) {
      if (this.JTg.IsBoundary(t.Pos)) {
        e = true;
      }
    }
    return e;
  }
  CheckIsBoundary(e) {
    return this.JTg.IsBoundary(e);
  }
  PushWallLimit() {
    var e = [];
    for (const t of this.VTg.values()) {
      if (EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentRound() >= t.LimitRound) {
        e.push(t);
      }
    }
    for (const i of e) {
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(EncircleHexType_1.EncircleHexType.Plain, i.Pos, undefined);
      this.JTg.ChangeMapType(i.Pos, EncircleHexType_1.EncircleHexType.Plain);
      this.VTg?.delete(EncircleUtils_1.EncircleUtils.HexPosToKey(i.Pos));
    }
    for (const r of this.VTg.values()) {
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ChangeViewMapType(LIMIT_WALL_ID, r.Pos, undefined);
    }
  }
  GetAllMonsterId() {
    var e = [];
    for (const t of this.NTg) {
      e.push(t.MapItemId);
    }
    return e;
  }
}
exports.EncirclePlayDataManager = EncirclePlayDataManager;
//# sourceMappingURL=EncirclePlayDataManager.js.map