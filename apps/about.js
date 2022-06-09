import { segment } from "oicq";
import lodash from "lodash";
import fs from "fs";
import md5 from "md5";

const _path = process.cwd();

export const rule = {
  //帮助说明
  about: {
    reg: "^#*(命令|帮助|菜单|about|说明|功能|指令|使用说明)$",
    priority: 50,
    describe: "【#帮助】查看指令说明",
  }
};

let aboutImg, aboutMd5;

//是否使用本地帮助图片
///resources/about/about.png
let useImg = false;
export async function about(e) {
  if (e.at && !e.atBot) {
    return;
  }
  let msg = [];
  if (!e.isMaster && e.isGroup && lodash.random(0, 3) <= 1) {
    msg.push("功能使用演示发送#小影详情查看");
  }
  let img;
  if (useImg) {
    img = `file:///${_path}/resources/about/about.png`;
  }
  else {
    await getabout();
    if (aboutImg) {
      img = `base64://${aboutImg}`;
    } else {
      img = `file:///${_path}/resources/about/about.png`;
    }
  }

  msg.unshift(segment.image(img));

  e.reply(msg);
  return true;
}

async function getabout() {
  let path = "resources/about/about/about.json";

  let aboutData = fs.readFileSync(path, "utf8");
  let JsonMd5 = md5(aboutData);

  try {
    aboutData = JSON.parse(aboutData);
  } catch (error) {
    Bot.logger.error(`resources/about/about/about.json错误`);
    return false;
  }

  if (!aboutImg || JsonMd5 != aboutMd5) {

    let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

    aboutMd5 = JsonMd5;
    aboutImg = await render("about", "about", {
      aboutData,
      hd_bg: "神里绫人",
      version: packageJson.version,
    });
  }

  return aboutData;
}


export function version(e) {
  let packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  e.reply(`当前版本：v${packageJson.version}`);
  return true;
}