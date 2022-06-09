// import { segment } from "oicq";
// import fetch from "node-fetch";
// import fs from "fs";
// import { pipeline } from "stream";
// import { promisify } from "util";
// import sizeOf from "image-size";
// import { render } from "../render.js";
// import lodash from "lodash";

// const _path = process.cwd();

// Bot.addListener(`notice.group`, (e) => {
//   e.isGroup = true;
//   welcome(e);
// });

// let faceArr = {}; //所有表情对象
// let context = {}; //添加图片上下文
// let textArr = {};

// export const rule = {
//   define: {
//     reg: "^定义欢迎仪式$",
//     priority: 100,
//     describe: "定义此群的欢迎仪式",
//   },
//   defineAccount: {
//     reg: "^定义(自我介绍|默认欢迎)$",
//     priority: 100,
//     describe: "定义机器人加群时发送的消息，仅主人可以设置",
//   },
// };

// export async function defineAccount(e) {
//   console.log(e);
//   if (e.isMaster) {
//     let flag = /自我介绍/.自我介绍(e.msg);
//     if (flag) {
//       context[`${e.user_id}defineAccount`] = "account";
//     } else {
//       context[`${e.user_id}defineAccount`] = "default";
//     }
//     define(e);
//   } else {
//     let m = ['只有', segment.at(BotConfig.masterQQ[1966174908]), " 等管理员可以定义"]
//     e.reply(m);
//   }
//   return true;
// }

// //添加哈哈[图片] or 添加哈哈 哈哈哈
// export async function define(e) {
//   if (!e.message) {
//     return false;
//   }
//   let Msg = e.group_id;

//   var re = new RegExp("{at:" + BotConfig.account.qq + "}", "g");

//   //上下文添加
//   context[e.user_id] = {
//     text: e.group_id
//       .toString(),
//     msg: Msg,
//   };

//   let name = lodash.truncate(e.sender.card, { length: 8 });

//   if (!context[e.user_id].text) {
//     delete context[e.user_id];
//     e.reply([segment.at(e.user_id, name), "\n没有输入关键字"]);
//     return true;
//   }

//   Bot.logger.mark(`[${e.group_name}] 添加:${context[e.user_id].text}`);

//   e.reply([segment.at(e.user_id, name), `请发送内容`]);

//   return true;
// }

// //上下文添加
// export async function addContext(e) {
//   if (!context[e.user_id] || !e.message) {
//     return;
//   }

//   let group_id = e.group_id;
//   if (e.isPrivate) {
//     group_id = await getGroupId(e);
//   }

//   textArr[group_id] = new Map();

//   //添加消息处理
//   for (let i in e.message) {
//     if (e.message[i].type == "at") {
//       if (e.message[i].qq == BotConfig.account.qq) {
//         e.reply("不能@我！");
//         return true;
//       }
//       e.message[i].text = e.message[i].text.replace(/^@/, "");
//     }
//   }

//   textArr[group_id].set(context[e.user_id].text.trim(), e.message);
//   let name = lodash.truncate(e.sender.card, { length: 8 });
//   e.reply([segment.at(e.user_id, name), "\n定义欢迎仪式成功！"]);
//   Bot.logger.mark(`[${e.group_name}] 添加成功:${context[e.user_id].text}`);

//   //覆盖删除下载的图片表情
//   if (faceArr[group_id] && faceArr[group_id].get(context[e.user_id].text)) {
//     let face = faceArr[group_id].get(context[e.user_id].text);
//     let img = `./resources/welcome/${group_id}/${context[e.user_id].text}.${face.suffix}`;
//     fs.unlinkSync(img);
//     faceArr[group_id].delete(context[e.user_id].text);
//   }

//   delete context[e.user_id];

//   let path = "./resources/welcome/";
//   if (!fs.existsSync(path)) {
//     fs.mkdirSync(path);
//   }

//   let obj = textArr[group_id].get(group_id.toString());
//   let src = `${path}${group_id}.json`;
//   if (context[`${e.user_id}defineAccount`]) {
//     src = `${path}${context[`${e.user_id}defineAccount`]}.json`;
//   }

//   fs.writeFileSync(src, JSON.stringify(obj, "", "\t"));

//   return true;
// }

// function getImg(e, group_id) {
//   if (!faceArr[group_id]) {
//     getFileData(group_id);
//   }

//   if (faceArr[group_id].size <= 0) {
//     return false;
//   }

//   if (!e.msg || e.img) {
//     return;
//   }

//   let msg = e.msg.replace(/#|＃|\./g, "");

//   let face = faceArr[group_id].get(msg);

//   if (!face) {
//     return false;
//   }

//   setGroupId(e);

//   let img = `/data/face/${group_id}/${msg}.${face.suffix}`;

//   var dimensions = sizeOf(`.${img}`);
//   let tmp = dimensions.width / dimensions.height;

//   if (dimensions.height > 150 && ((tmp > 0.6 && tmp < 1.4) || tmp > 2.5)) {
//     msg = segment.image(`file:///${_path}${img}`);
//     msg.asface = true;
//     e.reply(msg);
//   } else {
//     e.reply(segment.image(`file:///${_path}${img}`));
//   }

//   return true;
// }

// function getFileData(group_id) {
//   faceArr[group_id] = new Map();

//   let path = `./data/face/${group_id}/`;

//   if (!fs.existsSync(path)) {
//     return;
//   }

//   let file = fs.readdirSync(path);

//   if (file.length <= 0) {
//     return;
//   }

//   for (let val of file) {
//     let tmp = val.split(".");

//     faceArr[group_id].set(tmp[0], {
//       suffix: tmp[1],
//     });
//   }
// }

// export async function welcome(e) {

//   if (e.sub_type != "increase") {

//     return;
//   }

//   let group_id = e.group_id;
//   if (e.isPrivate) {
//     group_id = await getGroupId(e);
//   }

//   if (!group_id) {
//     return false;
//   }

//   let res = getImg(e, group_id);

//   if (!res) {

//     let key = e.group_id;

//     if (BotConfig.account.qq == e.user_id) {
//       key = "account";
//     }
//     let path = `./resources/welcome/${key}.json`;

//     if (!fs.existsSync(path)) {
//       path = `./resources/welcome/default.json`;
//       if (!fs.existsSync(path)) {
//         let m = "欢迎新人";
//         if (key == "account") {
//           m = `你们好，我叫${e.nickname}，请多关照！`;
//         }
//         e.reply(m);
//         return true;
//       } else {
//         send(e, path);
//       }
//     } else {
//       send(e, path);
//     }
//   }
//   return true;
// }

// async function send(e, path) {
//   let text = JSON.parse(fs.readFileSync(path, `utf-8`));
//   if (text.length > 0) {
//     let sendMsg = [];
//     for (let val of text) {
//       //避免风控。。
//       if (val.type == "image") {
//         let tmp = segment.image(val.url);
//         tmp.asface = val.asface;
//         sendMsg.push(tmp);
//       } else if (val.type == "at") {
//         let tmp = segment.at(val.qq);
//         sendMsg.push(tmp);
//       } else {
//         sendMsg.push(val);
//       }
//     }
//     e.reply(sendMsg);
//     setGroupId(e);
//     return true;
//   }
// }

// async function setGroupId(e) {
//   if (!e.isGroup) {
//     return;
//   }

//   let key = `Yunzai:group_id:${e.user_id}`;
//   global.redis.set(key, e.group_id.toString(), {
//     EX: 1209600,
//   });
// }
