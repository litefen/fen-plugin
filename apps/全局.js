﻿import { segment } from "oicq";
import fs from "fs";
import lodash from "lodash";
import sizeOf from "image-size";

//项目路径
const _path = process.cwd();
let fileArr = new Map();

/**
 * 全局表情，表情图片放到resources/global_img
 * 全局语音，语音文件放到resources/global_record
 * 【文件名】就是触发指令，多个命令可以用-隔开
 * 图片支持格式（jpg,png,gif,bmp）
 * 语音支持格式（amr,silk）
 */
export const rule = {
  全局: {
    reg: "", //匹配消息正则，命令正则
    priority: 200, //优先级，越小优先度越高
    describe: "【文件名】就是触发指令", //【命令】功能说明
  },
  voicelist: {
    reg: "^#?(语音)(列表|目录|有哪些)$",
    priority: 100,
    describe: "语音列表",
  },
  videolist: {
    reg: "^#?(视频)(列表|目录|有哪些)$",
    priority: 100,
    describe: "语音列表",
  },
  imglist: {
    reg: "^#?(全局表情|表情包)(列表|目录|有哪些)$",
    priority: 100,
    describe: "语音列表",
  },
};

init();

export async function 全局(e) {
  if (!e.msg || !e.message || e.hasReply) {
    return false;
  }

  let msg = e.msg.replace(/#|＃|\./g, "");

  let tmp = fileArr.get(msg);
  if (!tmp) return;

  let filePath = lodash.sample(tmp);

  if (!filePath.includes(msg)) return;

  Bot.logger.mark(`[${e.group_name}] 全局表情：${msg}`);

  if (/.(jpg|jpeg|png|gif|bmp)$/.test(filePath)) {
    let dimensions = sizeOf(filePath);
    let tmp = dimensions.width / dimensions.height;
    if (dimensions.height > 150 && ((tmp > 0.6 && tmp < 1.4) || tmp > 2.5)) {
      msg = segment.image(filePath);
      msg.asface = true;
      e.reply(msg);
    } else {
      e.reply(segment.image(filePath));
      return true;
    }
  }

  if (/.(amr|silk|slk|mp3)$/.test(filePath)) {
    e.reply(segment.record(filePath));
    return true;
  }
  if (/.(mp4|avi)$/.test(filePath)) {
    e.reply(segment.video(filePath));
    return true;
  }

  return false;
}
/**
自建文件夹/小粉/img/

 */
//获取所有资源文件
function init() {
  //表情、图片目录/resources/global/img/
  readdirectory("./plugins/fen-plugin/resources/global/img/", "img");
  watchFile("./plugins/fen-plugin/resources/global/img/", "img");
  //音频、语音文件/resources/global/voice/
  readdirectory("./plugins/fen-plugin/resources/global/voice/", "record");
  watchFile("./plugins/fen-plugin/resources/global/voice/", "record");
  //视频文件/resources/global/video/
  readdirectory("./plugins/fen-plugin/resources/global/video/", "video");
  watchFile("./plugins/fen-plugin/resources/global/video/", "video");

}
function readdirectory(dir, type) {
  let files = fs.readdirSync(dir, { withFileTypes: true });
  for (let val of files) {
    let filepath = dir + `/` + val.name;
    if (!val.isFile()) {
      readdirectory(filepath, type);
      continue;
    }
    let re;

    if (type == "img") {
      re = new RegExp(`.(jpg|jpeg|png|gif|bmp)$`, "i");
    }
    if (type == "record") {
      re = new RegExp(`.(amr|silk|mp3)$`, "i");
    }
    if (type == "video") {
      re = new RegExp(`.(mp4|avi)$`, "i");
    }
    if (!re.test(val.name)) {
      continue;
    }
    let name = val.name.replace(re, "");
    name = name.split("-");
    for (let v of name) {
      v = v.trim();
      let tmp = fileArr.get(v);
      if (tmp) {
        tmp.push(filepath);
      }
      else {
        fileArr.set(v, [filepath]);
      }
    }
  }
}

function watchFile(dir, type) {
  let fsTimeout = {};
  let recursive = false;
  // if (process.platform == "win32") {
  //   recursive = true;
  // }
  fs.watch(dir, { recursive: recursive }, async (eventType, filename) => {
    if (fsTimeout[type]) return;

    let re;
    if (type == "img") {
      Bot.logger.mark("更新全局图片");
      re = new RegExp(`.(jpg|jpeg|png|gif|bmp)$`, "i");
      fileArr.img = {};
    }

    if (type == "record") {
      Bot.logger.mark("更新全局语音");
      re = new RegExp(`.(amr|silk|mp3)$`, "i");
      fileArr.record = {};
    }
    if (type == "video") {
      Bot.logger.mark("更新全局视频");
      re = new RegExp(`.(mp4|avi)$`, "i");
      fileArr.video = {};
    }

    if (!re.test(filename)) return;

    fsTimeout[type] = true;

    setTimeout(async () => {
      readdirectory(dir, type);
      fsTimeout[type] = null;
    }, 5000);
  });
}
export async function voicelist(e) {
  // 同步读取example目录下的所有文件
    const files = fs.readdirSync('./plugins/fen-plugin/resources/global/voice/');
    let msg = files.map(file => {
    return ` \n${file.replace(/.amr|.silk|.mp3/, "")}` ;
    });
    e.reply("当前所有："+""+msg+""+"\n(A-B-C-D)【复制-前后都可以，直接发送名字即可】");
    return true;
}

export async function videolist(e) {
  // 同步读取example目录下的所有文件
    const files = fs.readdirSync('./plugins/fen-plugin/resources/global/video/');
    let msg = files.map(file => {
    return ` \n${file.replace(/.mp4/, "")}` ;
    });
    e.reply("当前所有："+""+msg+""+"\n(A-B-C-D)【复制-前后都可以，直接发送名字即可】");
    return true;
}

export async function imglist(e) {
  // 同步读取example目录下的所有文件
    const files = fs.readdirSync('./plugins/fen-plugin/resources/global/img/');
    let msg = files.map(file => {
    return ` \n${file.replace(/.jpg|.png|.gif/, "")}` ;
    });
    e.reply("当前所有："+""+msg+""+"\n(A-B-C-D)【直接发送名字：A或者B即可,复制-前后都可以】");
    return true;
}