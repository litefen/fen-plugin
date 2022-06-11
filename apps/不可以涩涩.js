import { segment } from "oicq";
import fetch from "node-fetch";
//项目路径
const _path = process.cwd();
//1.定义命令规则
export const rule = {
  sese: {
    reg: "^#?(涩涩|色色|瑟瑟|sese)$", //匹配消息正则，命令正则
    priority: 500, //优先级，越小优先度越高
    describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
  },
  sese1: {
    reg: "^#?(我要|就要|偏要|给我)(sese|色色|涩涩|色色)$", //匹配消息正则，命令正则
    priority: 500, //优先级，越小优先度越高
    describe: "不可以涩涩", //【命令】功能说明【#例子】开发简单示例演示
  },
};
//2.编写功能方法
export async function sese(e) {
  let msg = [
    segment.at(e.user_id),
    //文本消息
    "\n不可以涩涩！",
    segment.image(`file:///${_path}/plugins/fen-plugin/resources/global/img/不可以涩涩.gif`),

  ];
  e.reply(msg)
  return true; //返回true 阻挡消息不再往下
}
export async function sese1(e) {
  let msg = [
    //@用户
    segment.at(e.user_id),
    //文本消息
    "\n涩涩，通通禁闭室报道！",
    //图片
    segment.image(`file:///${_path}/plugins/fen-plugin/resources/global/img/番茄炒蛋拳.gif`),
  ];
  if (e.isGroup) {
    e.group.muteMember(e.user_id, 60);
    // 禁言功能默认一分钟
  }
  e.reply(msg);
  return true;
  //返回true 阻挡消息不再往下
}