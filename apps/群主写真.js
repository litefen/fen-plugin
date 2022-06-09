import { segment } from "oicq";
import fetch from "node-fetch";
//项目路径
const _path = process.cwd();
//1.定义命令规则
export const rule = {
  群主: {
    reg: "^#?(小粉|群主)(女装|写真|私房|涩涩|色色|泡水|瑟瑟|涩涩，|照片|私房照|女装照|是男同|是男酮)$", //匹配消息正则，命令正则
    priority: 80, //优先级，越小优先度越高
    describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
  },
  调戏: {
    reg: "^#?(女装|写真|私房|涩涩|色色|泡水|男同)小粉$", //匹配消息正则，命令正则
    priority: 80, //优先级，越小优先度越高
    describe: "给发送群主：女装|写真|私房的人 自动禁言一分钟", //【命令】功能说明【#例子】开发简单示例演示
  },
};
//2.编写功能方法
export async function 群主(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "\n调戏群主，通通禁闭室报道！",
    //图片
    segment.image(`file:///${_path}/plugins/fen-plugin/resources/global/img/番茄炒蛋拳.gif`),
  ];
  if (e.isGroup) {
    e.group.muteMember(e.user_id, 300);
    // 禁言功能默认五分钟
  }
  e.reply(msg);
  return true;
  //返回true 阻挡消息不再往下
}
export async function 调戏(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "\n调戏群主，通通禁闭室报道！",
    segment.image(`file:///${_path}/plugins/fen-plugin/global/img/找骂是吧.png`),
  ];
  if (e.isGroup) {
    e.group.muteMember(e.user_id, 600);
    // 禁言功能默认十分钟
  }
  e.reply(msg);
  return true; //返回true 阻挡消息不再往下
}
// 半成品 第二个还么写好
