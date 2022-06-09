
import lodash from "lodash";
import { segment } from "oicq";
import fs from "fs";
import { version, changelogs } from "../components/Changelog.js";
const _path = process.cwd();

export const rule = {
  //帮助说明
  about: {
    reg: "^#?(粉酱)?(详情|说明|使用说明)$",
    priority: 1,
    describe: "【#粉酱详情】 #粉酱详情",
  },
  help: {
    reg: "^#?(cookie|功能)?(详情|说明|使用说明|演示)$",
    priority: 1,
    describe: "",
  },
  fenversion: {
    reg: "^#?粉酱版本$",
    priority: 1,
    describe: "粉酱版本",
  }
};

let aboutImg, aboutMd5;

let useImg = false;

export async function about(e) {
  if (e.at && !e.atBot) {
    return;
  }
  let msg = [];
  if (!e.isMaster && e.isGroup && lodash.random(0, 3) <= 1) {
    msg.push("当前版本0.0.1");
  }
  e.reply(msg);
  return true;
}
export async function help(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "\ncookie绑定指南：https://blog.litefen.com/all/bbscookie.html\n所有功能详细使用指南：https://blog.litefen.com/all/yunzaihelp.html",
  ];
  e.reply(msg);
}
export function fenversion(e) {
  e.reply(`当前版本：v${version}`);
  return true;
}